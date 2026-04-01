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
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
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

async function sync() {
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() - 1); // Syncing yesterday's full data
  const dateStr = targetDate.toISOString().split('T')[0];

  console.log(`--- Syncing Trace for ${dateStr} ---`);

  // GitHub Commits
  const { data } = await octokit.search.commits({
    q: `author:TheMikeKaisen merge:false author-date:${dateStr}`,
  });
  const githubCount = data.total_count || 0;

  // LeetCode Logic
  const leetcodeCount = await fetchLeetCodeCount(dateStr);

  // Sanity Logs/Articles
  const sanityActivity = await sanity.fetch(
    `count(*[(_type == "post" || _type == "article" || _type == "log") && _createdAt match $date])`,
    { date: `${dateStr}*` }
  );

  const total = githubCount + leetcodeCount + sanityActivity;

  await sanity.createOrReplace({
    _type: 'activityMetric',
    _id: `metric-${dateStr}`,
    date: dateStr,
    githubCommits: githubCount,
    leetcodeSolved: leetcodeCount,
    articlesPublished: sanityActivity,
    totalActivity: total,
  });

  console.log(`✅ Finalized: GH(${githubCount}) + LC(${leetcodeCount}) + S(${sanityActivity}) = ${total}`);
}

sync();