import { createClient } from '@sanity/client';
import { Octokit } from "@octokit/rest";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-03-31',
});

const octokit = new Octokit({ auth: process.env.GH_PAT });
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME;

async function fetchLeetCodeCount(dateStr) {
  const query = `query userProfileCalendar($username: String!) {
    matchedUser(username: $username) { userCalendar { submissionCalendar } }
  }`;
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { username: LEETCODE_USERNAME } }),
    });
    const json = await res.json();
    const calendar = JSON.parse(json.data.matchedUser.userCalendar.submissionCalendar);
    const targetTs = Math.floor(new Date(dateStr).getTime() / 1000).toString();
    return calendar[targetTs] || 0;
  } catch (e) { return 0; }
}

async function syncDate(dateStr) {
  console.log(`--- Repairing Trace for ${dateStr} ---`);
  const [commits, prs, issues] = await Promise.all([
    octokit.search.commits({ q: `author:TheMikeKaisen author-date:${dateStr}` }),
    octokit.search.issuesAndPullRequests({ q: `author:TheMikeKaisen type:pr created:${dateStr}` }),
    octokit.search.issuesAndPullRequests({ q: `author:TheMikeKaisen type:issue created:${dateStr}` }),
  ]);
  const githubCount = (commits.data.total_count || 0) + (prs.data.total_count || 0) + (issues.data.total_count || 0);
  const leetcodeCount = await fetchLeetCodeCount(dateStr);
  const [articleCount, devLogCount] = await Promise.all([
    sanity.fetch(`count(*[!( _id in path("drafts.**") ) && _type == "article" && publishedAt match $today])`, { today: `${dateStr}*` }),
    sanity.fetch(`count(*[!( _id in path("drafts.**") ) && _type == "devLog" && publishedAt match $today])`, { today: `${dateStr}*` })
  ]);
  const total = githubCount + leetcodeCount + articleCount + devLogCount;
  await sanity.createOrReplace({
    _type: 'activityMetric',
    _id: `metric-${dateStr}`,
    date: dateStr,
    githubCommits: githubCount,
    leetcodeSolved: leetcodeCount,
    articlesPublished: articleCount,
    devLogs: devLogCount,
    totalActivity: total,
  });
  console.log(`✅ Repaired: GH(${githubCount}) + LC(${leetcodeCount}) + A(${articleCount}) + D(${devLogCount}) = ${total}`);
}

async function runRepair() {
  for (let i = 0; i <= 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    await syncDate(d.toISOString().split('T')[0]);
  }
}

runRepair();
