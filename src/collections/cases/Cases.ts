import { CollectionConfig } from 'payload'

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: {
    singular: 'Кейс',
    plural: 'Кейсы',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Название',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      // required: true,
      defaultValue: 'Запрос',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      required: false,
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    { name: 'actionTitle', type: 'text', defaultValue: 'Решение', required: true },
    {
      name: 'actions',
      type: 'array',
      label: 'Решение',
      // required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    { name: 'resultTitle', type: 'text', defaultValue: 'Результаты', required: true },
    {
      name: 'results',
      type: 'array',
      label: 'Результаты',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
      // required: true,
    },
    {
      name: 'result-image',
      type: 'upload',
      relationTo: 'media',
      // required: true,
    },
  ],
}
