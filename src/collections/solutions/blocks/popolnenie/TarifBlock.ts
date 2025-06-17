import { Block } from 'payload'

export const TarifBlock: Block = {
  slug: 'tarifblock',
  fields: [
    {
      name: 'tarifTitle',
      type: 'text',
      defaultValue: 'Тарифы на пополнение',
    },
    {
      name: 'tarifs',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'type',
          type: 'text',
        },
        {
          name: 'price',
          type: 'text',
        },
        {
          name: 'commission',
          type: 'text',
        },
      ],
    },
  ],
}
