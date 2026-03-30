import { defineType, defineField } from 'sanity'
import { CaseIcon } from '@sanity/icons' // to show icon in studio

export const projectType = defineType({
  name: 'project',
  title: 'Major Projects',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used for the URL. Click "Generate" after typing the title.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Thumbnail/Cover Image',
      type: 'image',
      options: { hotspot: true }, // Allows you to crop the image inside Sanity
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Critical for accessibility (WCAG).',
        }
      ],
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'In Progress', value: 'progress' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'tags',
      title: 'Tech Stack Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }, // Makes them look like tags in the CMS UI
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub Repository URL',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Preview URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Home Page?',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle this to show/hide the project in your "Major Projects" section.',
    }),
    defineField({
      name: 'description',
      title: 'Project Summary',
      type: 'text',
      description: 'A punchy 2-3 sentence overview for the card.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'body',
      title: 'Project Deep Dive',
      type: 'array', 
      of: [{ type: 'block' }], // Standard Sanity Rich Text
      description: 'Write about the architecture, challenges, and LLD here.',
    }),
  ],
})