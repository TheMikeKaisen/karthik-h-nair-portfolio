import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'institution',
      title: 'Institution Name',
      type: 'string',
      description: 'e.g., JECRC University',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
      description: 'e.g., Bachelor of Technology (B.Tech)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fieldOfStudy',
      title: 'Field of Study',
      type: 'string',
      description: 'e.g., Computer Science and Engineering',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Jaipur, India',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: { dateFormat: 'YYYY' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date (or Expected)',
      type: 'date',
      options: { dateFormat: 'YYYY' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gpa',
      title: 'GPA / Percentage',
      type: 'string',
      description: 'e.g., 8.5/10 or 85%',
    }),
    defineField({
      name: 'courses',
      title: 'Relevant Coursework',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List 4-6 key subjects (e.g., Data Structures, Operating Systems, DBMS).',
    }),
    defineField({
      name: 'institutionLogo',
      title: 'Institution Logo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'endDateDesc',
      by: [{ field: 'endDate', direction: 'desc' }],
    },
  ],
})