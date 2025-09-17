// payload/globals/team.ts
import PostBlock from '@/app/(frontend)/blogs/[postSlug]/components/PostBlock'
import { AboutUsBlock } from '@/blocks/AboutUsBlock'
import { BrandsBlock } from '@/blocks/BrandsBlock'
import { CertificateBlock } from '@/blocks/CertificateBlock'
import { CompanyBlock } from '@/blocks/CompanyBlock'
import { FormBlock } from '@/blocks/FormBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { PostsBlock } from '@/blocks/PostsBlock'
import { RequestFormBlock } from '@/blocks/RequestFormBlock'
import { ReviewsBlock } from '@/blocks/ReviewsBlock'
import { ServicesBlock } from '@/blocks/ServicesBlock'
import { TeamBlock } from '@/blocks/TeamBlock'
import { TrustedByBlock } from '@/blocks/TrustedByBlock'
import { WhyUsBlock } from '@/blocks/WhyUsBlock'
import { GlobalConfig } from 'payload'

export const Component: GlobalConfig = {
  slug: 'component',
  label: 'Компоненты',
  fields: [
    {
      name: 'globals',
      label: 'Blocks',
      type: 'blocks',
      required: true,
      blocks: [
        HeroBlock,
        AboutUsBlock,
        ServicesBlock,
        TeamBlock,
        FormBlock,
        ReviewsBlock,
        TrustedByBlock,
        CertificateBlock,
        BrandsBlock,
        WhyUsBlock,
        RequestFormBlock,
        PostsBlock,
        CompanyBlock,
      ],
    },
    {
      name: 'statistics',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
