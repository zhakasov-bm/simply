import { Block } from 'payload'

export const StepsBlock: Block = {
  slug: 'stepsblock',
  fields: [
    {
      name: 'stepTitle',
      type: 'text',
      defaultValue: 'Этапы работ',
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
        },
        {
          name: 'message',
          type: 'text',
        },
      ],
    },
  ],
}
