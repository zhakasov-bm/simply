import { Field } from 'payload'

export const commonFieldsIfNoSubservices: Field[] = [
  {
    name: 'heading',
    type: 'text',
    required: true,
    label: 'Title of Block',
  },
  {
    name: 'title',
    type: 'text',
  },
  {
    name: 'description',
    type: 'textarea',
  },
  {
    name: 'availableServices',
    type: 'array',
    label: 'Доступные услуги (если нет подуслуг)',
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
        defaultValue: '684eae4c99f2b795a5ba8a2c',
      },
    ],
  },
].map((field) => ({
  ...field,
  admin: {
    condition: (data) => data?.hasSubservices !== true,
  },
})) as Field[]
