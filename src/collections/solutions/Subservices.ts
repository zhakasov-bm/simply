import { CollectionConfig } from 'payload'
import { SeoBlock } from './blocks/SeoBlock'
import { TarifBlock } from './blocks/popolnenie/TarifBlock'
import { AdvantagesBlock } from './blocks/popolnenie/AdvantagesBlock'
import { StepsBlock } from './blocks/popolnenie/StepsBlock'

export const Subservices: CollectionConfig = {
  slug: 'subservices',
  labels: {
    singular: 'Подуслуга',
    plural: 'Подуслуги',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название услуги',
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'solutions',
      required: true,
    },
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
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'serviceTitle',
      type: 'text',
      defaultValue: 'Какие услуги мы можем вам оказать?',
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          defaultValue: '684eae4c99f2b795a5ba8a2c',
        },
      ],
    },
    {
      name: 'titleQA',
      type: 'text',
      defaultValue: 'Частые вопросы',
      required: true,
    },
    {
      name: 'questions',
      type: 'array',
      fields: [
        { name: 'question', type: 'text' },
        { name: 'answer', type: 'text' },
      ],
      required: true,
    },
    {
      name: 'additionalBlocks',
      type: 'blocks',
      blocks: [SeoBlock, AdvantagesBlock, TarifBlock, StepsBlock],
    },
  ],
}
