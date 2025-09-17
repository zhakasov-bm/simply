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
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
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
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
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
          localized: true,
        },
      ],
    },
    {
      name: 'actionTitle',
      type: 'text',
      defaultValue: 'Решение',
      required: true,
      localized: true,
    },
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
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'resultTitle',
      type: 'text',
      defaultValue: 'Результаты',
      required: true,
      localized: true,
    },
    {
      name: 'results',
      type: 'array',
      label: 'Результаты',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          localized: true,
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
    {
      name: 'videos',
      type: 'array',
      fields: [
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          filterOptions: {
            mediaType: { equals: 'video' },
          },
          admin: {
            description: 'Выберите видео для этой страницы',
          },
        },
      ],
    },
  ],
}
