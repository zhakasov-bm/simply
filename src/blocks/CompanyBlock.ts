import { Block } from 'payload'

export const CompanyBlock: Block = {
  slug: 'company',
  fields: [
    {
      name: 'title',
      label: 'Заголовок',
      type: 'text',
      defaultValue: 'Ваш надёжный партнёр в мире инноваций',
    },
    {
      name: 'statistics',
      label: 'Cтатистика',
      type: 'array',
      required: true,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        { name: 'bgColor', type: 'text', defaultValue: 'background' },
      ],
    },
    {
      name: 'about',
      label: 'О нас',
      type: 'richText',
      required: true,
    },
  ],
}
