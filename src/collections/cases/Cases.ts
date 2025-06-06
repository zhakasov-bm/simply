import { CollectionConfig } from 'payload'

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: {
    singular: 'Case',
    plural: 'Cases',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Кейсы – истории, которые мы создали',
      required: true,
    },
    {
      name: 'cases',
      type: 'array',
      fields: [
        {
          name: 'category',
          type: 'select',
          hasMany: true,
          required: true,
          options: [
            { label: 'SMM', value: 'content' },
            { label: 'Продвижение и PR', value: 'pr' },
            { label: 'Стратегия и Бренд', value: 'brand' },
            { label: 'Сайты', value: 'website' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
