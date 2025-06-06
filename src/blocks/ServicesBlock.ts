import { Block } from 'payload'

export const ServicesBlock: Block = {
  slug: 'services',
  labels: {
    singular: 'Наша услуга',
    plural: 'Наши услуги',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: false,
    },
  ],
}
