import { Field } from 'payload'

export const brandFields: Field[] = [
  {
    name: 'heading',
    type: 'text',
    required: true,
    localized: true,
  },
  {
    name: 'logos',
    type: 'array',
    label: 'Логотипы компаний',
    minRows: 1,
    fields: [
      {
        name: 'logo',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
      {
        name: 'logoDark',
        label: 'Логотип (тёмная тема)',
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
]
