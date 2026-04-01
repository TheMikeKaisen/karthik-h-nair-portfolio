import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// --- DEBUGGING: Check if variables are loaded ---
console.log("--- Environment Check ---");
console.log("Project ID:", process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "❌ MISSING");
console.log("Sanity Token:", process.env.SANITY_WRITE_TOKEN ? "✅ LOADED" : "❌ MISSING");
console.log("GitHub PAT:", process.env.GH_PAT ? "✅ LOADED" : "❌ MISSING");
console.log("-------------------------\n");

if (!process.env.GH_PAT || !process.env.SANITY_WRITE_TOKEN) {
  console.error("🛑 Stopping: Missing required tokens in .env.local");
  process.exit(1);
}

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-03-31',
});

const GH_PAT = process.env.GH_PAT;
const USERNAME = "TheMikeKaisen";

async function backfill() {
  console.log("--- Initializing Historical Backfill ---");

  const query = `
    query($userName:String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GH_PAT}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-Backfill-Script'
      },
      body: JSON.stringify({ query, variables: { userName: USERNAME } }),
    });

    const json = await response.json();
    
    // If the data property is missing, the API call failed
    if (!json.data) {
      console.error("❌ GitHub API Error. Full response below:");
      console.error(JSON.stringify(json, null, 2));
      return;
    }

    const weeks = json.data.user.contributionsCollection.contributionCalendar.weeks;
    console.log("📦 Data retrieved. Syncing to Sanity...");

    for (const week of weeks) {
      for (const day of week.contributionDays) {
        if (day.contributionCount > 0) {
          await sanity.createOrReplace({
            _type: 'activityMetric',
            _id: `metric-${day.date}`,
            date: day.date,
            githubCommits: day.contributionCount,
            totalActivity: day.contributionCount, 
          });
          console.log(`✅ ${day.date}: ${day.contributionCount} commits`);
        }
      }
    }

    console.log("\n--- Backfill Complete! ---");
  } catch (error) {
    console.error("❌ Execution Error:", error.message);
  }
}

backfill();