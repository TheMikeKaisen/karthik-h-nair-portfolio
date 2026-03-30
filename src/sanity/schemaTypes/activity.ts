import { defineType, defineField } from 'sanity'
import { RocketIcon } from '@sanity/icons' // Great icon for growth/learning

export const activityType = defineType({
    name: 'activity',
    title: 'Learning Lab',
    type: 'document',
    icon: RocketIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Topic or Repo Name',
            type: 'string',
            description: 'e.g., "Redis Internals" or "LLD in Java"',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference', // 'reference' to category schema
            to: [{ type: 'category' }], // Point it to your new category document
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'repoUrl',
            title: 'GitHub Repository URL',
            type: 'url',
        }),
        defineField({
            name: 'difficulty',
            title: 'Difficulty',
            type: 'string',
            options: {
                list: [
                    { title: 'Beginner', value: 'beginner' },
                    { title: 'Intermediate', value: 'intermediate' },
                    { title: 'Advanced', value: 'advanced' },
                ],
            },
        }),
        defineField({
            name: 'dateStarted',
            title: 'Date Logged',
            type: 'date',
            initialValue: () => new Date().toISOString().split('T')[0],
        }),
        defineField({
            name: 'tags',
            title: 'Hashtags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'description',
            title: 'Quick Snippet',
            type: 'text',
            description: 'A 1-sentence hook about what you learned here.',
            validation: (Rule) => Rule.max(150),
        }),
        defineField({
            name: 'isTopSkill',
            title: 'Pin to Top?',
            type: 'boolean',
            description: 'Toggle this for your most valuable learning journeys (Redis, Java LLD, etc.)',
            initialValue: false,
        }),
    ],
})