import { Block } from 'payload'

export const CertificateBlock: Block = {
  slug: 'certificate',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'descriptions',
      type: 'array',
      required: true,
      maxRows: 2,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'message',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'certificates',
      type: 'array',
      label: 'Наши сертификаты',
      minRows: 1,
      fields: [
        {
          name: 'certificate',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
