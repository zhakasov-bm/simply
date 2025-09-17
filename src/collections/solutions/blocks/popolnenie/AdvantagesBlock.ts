import { Block } from 'payload'

export const AdvantagesBlock: Block = {
  slug: 'advantagesblock',
  fields: [
  {
    name: 'advantagesTitle',
    type: 'richText',
    required: true,
    label: 'Преимущества',
    localized: true,
  },
    {
      name: 'advantages',
      type: 'array',
      fields: [
        {
          name: 'advantage',
          type: 'richText',
          localized: true,
        },
      ],
    },
  ],
}
