import { sanityFetch } from "@/sanity/lib/client";
import { heatmapMetricsQuery } from "@/sanity/lib/queries";
// Import the TYPE, not the schema object
import { ActivityMetric } from "@/types"; 

export async function getHeatmapData() {
  const today = new Date().toISOString().split('T')[0];
  const oneYearAgoDate = new Date();
  oneYearAgoDate.setFullYear(oneYearAgoDate.getFullYear() - 1);
  const oneYearAgo = oneYearAgoDate.toISOString().split('T')[0];

  // sanityFetch now knows exactly what shape of data to expect
  const rawData = await sanityFetch<ActivityMetric[]>({ 
    query: heatmapMetricsQuery,
    params: { today, oneYearAgo }
  });

  const dataMap = new Map(rawData.map(item => [item.date, item]));

  const filledData: ActivityMetric[] = []; // Explicitly type the array
  for (let i = 0; i < 365; i++) {
    const d = new Date(oneYearAgoDate);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];

    const dayData = dataMap.get(dateStr) || {
      date: dateStr,
      githubCommits: 0,
      leetcodeSolved: 0,
      gfgSolved: 0,
      articlesPublished: 0,
      devLogs: 0,
      totalActivity: 0
    };

    filledData.push(dayData);
  }

  return filledData;
}