import { Block } from 'payload'

export const OurMissionBlock: Block = {
  slug: 'mission',
  fields: [
    {
      name: 'title',
      label: 'Наша миссия',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'values',
      label: 'Контент',
      type: 'array',
      required: true,
      fields: [
        { name: 'adv', type: 'text', required: true, localized: true },
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text', required: true, localized: true },
      ],
    },
  ],
}
