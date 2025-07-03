import { Block } from 'payload'

export const FloatingNavBlock: Block = {
  slug: 'floating-nav',
  labels: {
    singular: 'Плавающая навигация',
    plural: 'Плавающие навигации',
  },
  fields: [
    {
      name: 'navigation',
      type: 'array',
      required: false,
      fields: [
        { name: 'nav', type: 'text' },
        { name: 'scrollTo', type: 'text' },
      ],
    },
    {
      name: 'button',
      type: 'text',
      defaultValue: 'Заказать',
    },
  ],
}
