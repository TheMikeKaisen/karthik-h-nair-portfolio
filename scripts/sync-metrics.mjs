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

async function syncDate(dateStr) {
  console.log(`--- Syncing Trace for ${dateStr} ---`);

  // GitHub Activities (Commits, PRs, Issues)
  const [commits, prs, issues] = await Promise.all([
    octokit.search.commits({ q: `author:TheMikeKaisen author-date:${dateStr}` }),
    octokit.search.issuesAndPullRequests({ q: `author:TheMikeKaisen type:pr created:${dateStr}` }),
    octokit.search.issuesAndPullRequests({ q: `author:TheMikeKaisen type:issue created:${dateStr}` }),
  ]);

  const githubCount = (commits.data.total_count || 0) +
    (prs.data.total_count || 0) +
    (issues.data.total_count || 0);

  // LeetCode Logic
  const leetcodeCount = await fetchLeetCodeCount(dateStr);

  // Separate counts for Articles and Dev Logs
  // const [articleCount, devLogCount] = await Promise.all([
  //   sanity.fetch(
  //     `count(*[!( _id in path("drafts.**") ) && _type == "article" && publishedAt match $today])`,
  //     { today: `${dateStr}*` }
  //   ),
  //   sanity.fetch(
  //     `count(*[!( _id in path("drafts.**") ) && _type == "devLog" && publishedAt match $today])`,
  //     { today: `${dateStr}*` }
  //   )
  // ]);

  // Using string::startsWith is much more reliable for YYYY-MM-DD formats
  const [articleCount, devLogCount] = await Promise.all([
    sanity.fetch(
      `count(*[_type == "article" && !(_id in path("drafts.**")) && publishedAt >= $start && publishedAt < $end])`,
      {
        start: `${dateStr}T00:00:00Z`,
        end: `${dateStr}T23:59:59Z`
      }
    ),
    sanity.fetch(
      `count(*[_type == "devLog" && !(_id in path("drafts.**")) && publishedAt >= $start && publishedAt < $end])`,
      {
        start: `${dateStr}T00:00:00Z`,
        end: `${dateStr}T23:59:59Z`
      }
    )
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

  console.log(`✅ Finalized: GH(${githubCount}) + LC(${leetcodeCount}) + A(${articleCount}) + D(${devLogCount}) = ${total}`);
  const debugDocs = await sanity.fetch(
    `*[_type in ["article", "devLog"] && !(_id in path("drafts.**")) && publishedAt >= $start && publishedAt < $end]{ _id, _type, title, publishedAt }`,
    {
      start: `${dateStr}T00:00:00Z`,
      end:   `${dateStr}T23:59:59Z`,
    }
  );

  console.log("🔍 Documents found in Sanity for this date:");
  debugDocs.forEach(doc => {
    console.log(`- [${doc._type}] ID: ${doc._id} | Title: ${doc.title} | Date: ${doc.publishedAt}`);
  });
}

async function runSync() {
  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`Authenticated as: ${user.login}`);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const dates = [
    yesterday.toISOString().split('T')[0],
    today.toISOString().split('T')[0]
  ];

  for (const date of dates) {
    await syncDate(date);
  }
}

runSync();