import { defineType, defineField } from 'sanity'
import { EditIcon } from '@sanity/icons'

export const devLogType = defineType({
  name: 'devLog',
  title: 'Daily Dev Logs',
  type: 'document',
  icon: EditIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Summary of the Day',
      type: 'string',
      description: 'e.g., "Cracked the Redis caching logic" or "Solved a circular dependency bug"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        // This ensures the slug is unique within this document type
        isUnique: (slug, context) => context.defaultIsUnique(slug, context),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }], // Re-using your dynamic categories!
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'What did you do?',
      type: 'array', 
      of: [
        { type: 'block' }, // Allows for bold, lists, and links
        {
          type: 'code', // Allows you to paste bug-fixing snippets directly
          options: {
            withFilename: true,
          }
        }
      ],
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
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