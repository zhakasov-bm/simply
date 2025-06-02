import { Block } from 'payload'

export const TeamBlock: Block = {
  slug: 'team',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'avatars',
      type: 'array',
      label: 'Наша команда',
      minRows: 1,
      fields: [
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
