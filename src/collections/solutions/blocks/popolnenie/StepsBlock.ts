import { Block } from 'payload'

export const StepsBlock: Block = {
  slug: 'stepsblock',
  fields: [
  {
    name: 'stepTitle',
    type: 'text',
    defaultValue: 'Этапы работ',
    localized: true,
  },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'message',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
