import { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Solutions Block',
    plural: 'Solutions Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
    },
  ],
}
