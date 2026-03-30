import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const articleType = defineType({
    name: 'article',
    title: 'Technical Articles',
    type: 'document',
    icon: DocumentIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Featured Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),

        // SUBSCRIPTION SYSTEM LOGIC
        defineField({
            name: 'isPremium',
            title: 'Premium Content?',
            type: 'boolean',
            description: 'If checked, only subscribers can read the full article.',
            initialValue: false,
        }),
        defineField({
            name: 'excerpt',
            title: 'Article Excerpt',
            type: 'text',
            description: 'A short summary shown to everyone (including non-subscribers).',
            validation: (Rule) => Rule.required().max(200),
        }),
        // THE CORE CONTENT
        defineField({
            name: 'content',
            title: 'Article Content',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'code', options: { withFilename: true } },
                { type: 'image' } // Allows embedding diagrams inside the article
            ],
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time (Minutes)',
            type: 'number',
        }),
        defineField({
            name: 'isPublished',
            title: 'Published?',
            type: 'boolean',
            initialValue: true,
        }),
        defineField({
            name: 'featured',
            title: 'Feature on Homepage?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'difficultyLevel',
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
            name: 'tags',
            title: 'Hashtags',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
    ],
})