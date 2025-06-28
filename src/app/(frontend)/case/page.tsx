import { getPayload } from 'payload'
import { Case } from '@/payload-types'
import CasesBlock from '../_components/CasesBlock'
import config from '@/payload.config'

export default async function page() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  let cases: Case[] = []

  try {
    let casesRes = await payload.find({
      collection: 'cases',
      limit: 10,
    })
    cases = casesRes.docs
  } catch (e) {
    console.log(e)
  }

  return (
    <div>
      <CasesBlock heading="Наши кейсы" cases={cases} type="slider" />
    </div>
  )
}
