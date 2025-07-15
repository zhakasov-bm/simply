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
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
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
    },
    {
      name: 'button',
      type: 'text',
      defaultValue: 'Откликнуться',
    },
  ],
}
