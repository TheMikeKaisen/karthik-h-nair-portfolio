import { defineField, defineType } from 'sanity'
import { Activity } from 'lucide-react'

export default defineType({
  name: 'activityMetric',
  title: 'Activity Metrics',
  type: 'document',
  icon: Activity,
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'The specific day this activity was recorded.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'githubCommits',
      title: 'GitHub Commits',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'leetcodeSolved',
      title: 'LeetCode Problems',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'gfgSolved',
      title: 'GFG Problems',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'articlesPublished',
      title: 'Articles',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'devLogs',
      title: 'Dev Logs',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'totalActivity',
      title: 'Total Weight',
      type: 'number',
      description: 'Calculated sum of all activities for heatmap intensity.',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'date',
      github: 'githubCommits',
      leetcode: 'leetcodeSolved',
    },
    prepare({ title, github, leetcode }) {
      return {
        title: title,
        subtitle: `Commits: ${github || 0} | LeetCode: ${leetcode || 0}`,
      };
    },
  },
})