import { CollectionConfig } from 'payload'

export const Vacancy: CollectionConfig = {
  slug: 'vacancy',
  labels: {
    singular: 'Вакансия',
    plural: 'Вакансии',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'city',
      type: 'text',
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      admin: {
        condition: (data) => !data?.maintenance,
      },
      options: [
        { label: 'IT-вакансии', value: 'IT' },
        { label: 'Маркетинг', value: 'marketing' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'button',
      type: 'text',
      defaultValue: 'Откликнуться',
      localized: true,
    },
  ],
}
