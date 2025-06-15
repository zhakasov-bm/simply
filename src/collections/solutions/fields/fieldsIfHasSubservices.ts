import { Field } from 'payload'

export const fieldsIfHasSubservices: Field[] = [
  {
    name: 'whyServiceTitle',
    type: 'richText',
    label: 'Почему ваш сайт нуждается в',
    required: true,
  },
  {
    name: 'whyList',
    type: 'array',
    fields: [
      {
        name: 'title',
        type: 'text',
        required: true,
      },
      {
        name: 'icon',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
    ],
  },
].map((field) => ({
  ...field,
  admin: {
    condition: (_, siblingData) => siblingData.hasSubservices,
  },
})) as Field[]
