import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'skill',
    title: 'Technical Skills',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Skill Name',
            type: 'string',
            description: 'e.g., C++, Node.js, or Redis',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            description: 'Select the architectural domain for this skill.',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isPrimary',
            title: 'Primary Skill?',
            type: 'boolean',
            description: 'Toggle this for your strongest skills to highlight them in the UI.',
            initialValue: false,
        }),
        defineField({
            name: 'icon',
            title: 'Skill Icon',
            type: 'image',
            description: 'SVG icons work best for a clean technical look.',
            options: { hotspot: true },
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category',
        },
    },
})