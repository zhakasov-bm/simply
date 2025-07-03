// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

import { s3Storage } from '@payloadcms/storage-s3'

import { Solutions } from './collections/solutions/Solutions'
import { Component } from './globals/Component'
import { Cases } from './collections/cases/Cases'
import { Navigation } from './globals/Navigation'
import { Subservices } from './collections/solutions/Subservices'
import { Pages } from './collections/Pages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [Navigation, Component],
  collections: [Users, Media, Solutions, Subservices, Cases, Pages],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  localization: {
    locales: [
      {
        label: {
          ru: 'Руский',
          kz: 'Орысша',
        },
        code: 'ru',
      },
      {
        label: {
          ru: 'Казахский',
          kz: 'Қазақша',
        },
        code: 'kz',
      },
    ],
    defaultLocale: 'ru',
    fallback: true,
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET_NAME || '',
      config: {
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT || '',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
      },
    }),
    formBuilderPlugin({}),
  ],
})
