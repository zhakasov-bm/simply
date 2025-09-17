import { Block } from 'payload'

export const PostsBlock: Block = {
  slug: 'posts',
  labels: {
    singular: 'Блог',
    plural: 'Блоги',
  },
  fields: [
    {
      name: 'heading',
      type: 'richText',
      required: true,
      localized: true,
    },
  ],
}
