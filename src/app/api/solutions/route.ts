import { NextRequest, NextResponse } from 'next/server'
import config from '@/payload.config'
import { getPayload } from 'payload'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    const solutionsRes = await payload.find({
      collection: 'solutions',
      limit: 100,
      sort: 'name',
    })

    return NextResponse.json(solutionsRes)
  } catch (error) {
    console.error('Error fetching solutions:', error)
    return NextResponse.json({ error: 'Failed to fetch solutions' }, { status: 500 })
  }
}
