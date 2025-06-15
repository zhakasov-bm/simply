import { Block } from 'payload'

export const SeoBlock: Block = {
  slug: 'seoblock',
  fields: [
    {
      name: 'header',
      type: 'richText',
      required: true,
    },
    {
      name: 'designType',
      type: 'select',
      required: true,
      options: [
        { label: 'Layout 1', value: 'layout1' },
        { label: 'Layout 2', value: 'layout2' },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          // defaultValue: 'simply'
        },
      ],
      required: true,
    },
  ],
}
