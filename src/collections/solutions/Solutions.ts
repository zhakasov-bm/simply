import { CollectionConfig } from 'payload'
import { fieldsIfHasSubservices } from './fields/fieldsIfHasSubservices'
import { commonFieldsIfNoSubservices } from './fields/commonFieldsIfNoSubservices'

export const Solutions: CollectionConfig = {
  slug: 'solutions',
  labels: {
    singular: 'Услуга',
    plural: 'Услуги',
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
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'maintenance',
      type: 'checkbox',
      label: 'Обслуживание брендов под ключ',
    },
    {
      name: 'category',
      type: 'select',
      admin: {
        condition: (data) => !data?.maintenance,
      },
      options: [
        { label: 'Креатив и Контент', value: 'content' },
        { label: 'Продвижение и PR', value: 'pr' },
        { label: 'Стратегия и Бренд', value: 'brand' },
        { label: 'Сайты и Технологии', value: 'website' },
      ],
    },
    {
      name: 'details',
      type: 'array',
      label: 'Details',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: 'servicesTitle',
      type: 'text',
      defaultValue: 'Какие услуги можно заказать у нас?',
      required: true,
    },
    {
      name: 'hasSubservices',
      type: 'checkbox',
      label: 'Подуслуги',
    },
    ...fieldsIfHasSubservices,
    ...commonFieldsIfNoSubservices,
    {
      name: 'titleWhy',
      type: 'text',
      required: true,
    },
    {
      name: 'problem',
      type: 'array',
      label: 'Проблемы',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
        },
      ],
      required: true,
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
      name: 'lead',
      type: 'richText',
      required: true,
    },
  ],
}
