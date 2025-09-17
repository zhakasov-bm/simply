import { Block } from 'payload'

export const TarifBlock: Block = {
  slug: 'tarifblock',
  fields: [
  {
    name: 'tarifTitle',
    type: 'text',
    defaultValue: 'Тарифы на пополнение',
    localized: true,
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
          localized: true,
        },
        {
          name: 'price',
          type: 'text',
          localized: true,
        },
        {
          name: 'commission',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
