import { BrandsBlock } from '@/blocks/BrandsBlock'
import { FormBlock } from '@/blocks/FormBlock'
import { ReviewsBlock } from '@/blocks/ReviewsBlock'
import { CollectionConfig } from 'payload'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Креатив и Контент', value: 'content' },
        { label: 'Продвижение и PR', value: 'pr' },
        { label: 'Стратегия и Бренд', value: 'brand' },
        { label: 'Сайты и Технологии', value: 'website' },
      ],
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
      name: 'details',
      type: 'array',
      label: 'Подуслуги',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      localized: true,
      blocks: [BrandsBlock, ReviewsBlock, FormBlock],
    },
  ],
}
