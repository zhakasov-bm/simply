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

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    let body: any
    const contentType = request.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      body = await request.json()
    } else if (contentType && contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData()
      body = Object.fromEntries(formData.entries())
    } else {
      body = {}
    }

    const solutionsRes = await payload.find({
      collection: 'solutions',
      ...body,
    })

    return NextResponse.json(solutionsRes)
  } catch (error) {
    console.error('Error fetching solutions (POST):', error)
    return NextResponse.json({ error: 'Failed to fetch solutions' }, { status: 500 })
  }
}
