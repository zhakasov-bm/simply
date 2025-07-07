import { CompanyBlock } from '@/blocks/CompanyBlock'
import { OurMissionBlock } from '@/blocks/OurMissionBlock'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название страницы',
    },
    {
      name: 'heading',
      type: 'richText',
      required: true,
      label: 'Заголовок',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: false,
      minRows: 0,
      blocks: [CompanyBlock, OurMissionBlock],
    },
  ],
}
