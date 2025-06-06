import { Block } from 'payload'

export const AvailableServices: Block = {
  slug: 'available-services',
  labels: {
    singular: 'Available Services',
    plural: 'Услуги внутри решения',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Какие услуги можно заказать у нас?',
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: false, // optional
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
