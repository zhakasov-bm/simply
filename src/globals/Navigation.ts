// payload/globals/navigation.ts
import { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Навигация',
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'links',
      type: 'array',
      label: 'Nav',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'contactTitle',
      type: 'text',
      required: true,
      defaultValue: 'Контакты',
    },
    {
      name: 'contacts',
      type: 'array',
      fields: [{ name: 'item', type: 'text' }],
      required: true,
    },
    {
      name: 'socialMedia',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: ['telegram', 'instagram', 'facebook', 'linkedin', 'youtube'],
          required: true,
        },
        {
          name: 'url',
          label: 'Link URL',
          type: 'text',
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'languageSwitcher',
      type: 'checkbox',
      label: 'Показать языковой переключатель',
      defaultValue: true,
    },
  ],
}
