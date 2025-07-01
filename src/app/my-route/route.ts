import configPromise from '@/payload.config'
import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'users',
  })

  return Response.json(data)
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    const body = await request.json()

    // You may want to use body data for filtering, searching, etc.
    const solutionsRes = await payload.find({
      collection: 'solutions',
      ...body, // This allows admin UI to send filters/search
    })

    return NextResponse.json(solutionsRes)
  } catch (error) {
    console.error('Error fetching solutions (POST):', error)
    return NextResponse.json({ error: 'Failed to fetch solutions' }, { status: 500 })
  }
}
