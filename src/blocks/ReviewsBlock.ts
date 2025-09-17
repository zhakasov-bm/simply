import { Block } from 'payload'

export const ReviewsBlock: Block = {
  slug: 'reviews',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'reviews',
      type: 'array',
      label: 'Список отзывов',
      minRows: 1,
      fields: [
        {
          name: 'author',
          type: 'text',
          label: 'Имя клиента',
          required: true,
          localized: true,
        },
        {
          name: 'position',
          type: 'text',
          label: 'Должность или компания',
          required: true,
          localized: true,
        },
        {
          name: 'message',
          type: 'textarea',
          label: 'Сообщение отзыва',
          required: true,
          localized: true,
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
