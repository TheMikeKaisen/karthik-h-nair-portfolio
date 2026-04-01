import { createClient } from '@sanity/client';
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

const GH_PAT = process.env.GH_PAT;
const USERNAME = "TheMikeKaisen";
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME;

async function backfill() {
  console.log("--- Initiating Unified History Merge ---");

  // 1. Fetch GitHub 365-day Calendar
  const ghQuery = `query($userName:String!){user(login:$userName){contributionsCollection{contributionCalendar{weeks{contributionDays{date contributionCount}}}}}}`;
  const ghRes = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${GH_PAT}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: ghQuery, variables: { userName: USERNAME } }),
  });
  const ghJson = await ghRes.json();
  const weeks = ghJson.data.user.contributionsCollection.contributionCalendar.weeks;

  // 2. Fetch LeetCode Calendar
  const lcQuery = `query userProfileCalendar($username:String!){matchedUser(username:$username){userCalendar{submissionCalendar}}}`;
  const lcRes = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: lcQuery, variables: { username: LEETCODE_USERNAME } }),
  });
  const lcJson = await lcRes.json();
  const leetcodeCalendar = JSON.parse(lcJson.data.matchedUser.userCalendar.submissionCalendar);

  // 3. Map GitHub dates to a helper object
  const historyMap = {};
  weeks.forEach(w => w.contributionDays.forEach(d => {
    historyMap[d.date] = { github: d.contributionCount, leetcode: 0 };
  }));

  // 4. Inject LeetCode history into that map
  Object.keys(leetcodeCalendar).forEach(ts => {
    const date = new Date(ts * 1000).toISOString().split('T')[0];
    const count = leetcodeCalendar[ts];
    if (historyMap[date]) {
      historyMap[date].leetcode = count;
    } else {
      historyMap[date] = { github: 0, leetcode: count };
    }
  });

  // 5. Push to Sanity
  for (const [date, metrics] of Object.entries(historyMap)) {
    const total = metrics.github + metrics.leetcode;
    if (total > 0) {
      await sanity.createOrReplace({
        _type: 'activityMetric',
        _id: `metric-${date}`,
        date: date,
        githubCommits: metrics.github,
        leetcodeSolved: metrics.leetcode,
        totalActivity: total,
      });
      console.log(`Synced ${date}: GH[${metrics.github}] LC[${metrics.leetcode}]`);
    }
  }
  console.log("--- Backfill Protocol Terminated Successfully ---");
}

backfill();