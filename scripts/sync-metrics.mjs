import { createClient } from '@sanity/client';
import { Octokit } from "@octokit/rest";
import dotenv from 'dotenv';
dotenv.config();

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // Needs Write Access
  apiVersion: '2024-03-31',
});

const octokit = new Octokit({ auth: process.env.GH_PAT });

async function sync() {
  const targetDate = new Date();
  // We sync data for "Today" so it shows up in the "Yesterday" view tomorrow
  const dateStr = targetDate.toISOString().split('T')[0];

  console.log(`--- Starting Sync for ${dateStr} ---`);

  // 1. Fetch GitHub Commits
  // Logic: Search for commits by you on this specific date
  const { data } = await octokit.search.commits({
    q: `author:TheMikeKaisen merge:false author-date:${dateStr}`,
  });
  const githubCount = data.total_count || 0;

  // 2. Fetch Sanity Activity (Articles + Logs)
  const sanityActivity = await sanity.fetch(
    `count(*[(_type == "post" || _type == "article" || _type == "log") && _createdAt match $date])`,
    { date: `${dateStr}*` }
  );

  // 3. Prepare the Document
  const total = githubCount + sanityActivity;

  const doc = {
    _type: 'activityMetric',
    _id: `metric-${dateStr}`, // Unique ID prevents duplicates
    date: dateStr,
    githubCommits: githubCount,
    articlesPublished: sanityActivity, // Simplified for this demo
    totalActivity: total,
  };

  // 4. Push to Sanity (Create or Replace)
  try {
    await sanity.createOrReplace(doc);
    console.log(`✅ Success: Generated ${total} total activity points.`);
  } catch (err) {
    console.error('❌ Sanity Sync Failed:', err.message);
  }
}

sync();