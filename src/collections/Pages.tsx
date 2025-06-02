import { HeroBlock } from '@/blocks/HeroBlock'
import { AboutUsBlock } from '@/blocks/AboutUsBlock'
import { CollectionConfig } from 'payload'
import { TrustedByBlock } from '@/blocks/TrustedByBlock'
import { FormBlock } from '@/blocks/FormBlock'
import { TeamBlock } from '@/blocks/TeamBlock'
import { CertificateBlock } from '@/blocks/CertificateBlock'
import { ReviewsBlock } from '@/blocks/ReviewsBlock'
import { BrandsBlock } from '@/blocks/BrandsBlock'
import { ServicesBlock } from '@/blocks/ServicesBlock'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'Pages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      localized: true,
      blocks: [
        HeroBlock,
        AboutUsBlock,
        TrustedByBlock,
        ServicesBlock,
        FormBlock,
        CertificateBlock,
        ReviewsBlock,
        BrandsBlock,
        TeamBlock,
      ],
    },
  ],
}

export default Pages
