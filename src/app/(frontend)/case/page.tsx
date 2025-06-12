import { getPayload } from 'payload'
import { Case, Solution } from '@/payload-types'
import CasesBlock from '../_components/CasesBlock'
import config from '@/payload.config'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

export default async function page() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  let cases: Case[] = []
  const navigation = await payload.findGlobal({ slug: 'navigation' })

  try {
    let casesRes = await payload.find({
      collection: 'cases',
      limit: 10,
    })
    cases = casesRes.docs
  } catch (e) {
    console.log(e)
  }

  let solutions: Solution[] = []

  try {
    let solutionsRes = await payload.find({
      collection: 'solutions',
      limit: 10,
    })
    solutions = solutionsRes.docs
  } catch (e) {
    console.log(e)
  }

  return (
    <div>
      <Header nav={navigation} />
      <CasesBlock heading="Наши кейсы" cases={cases} type="loadMore" />
      <Footer nav={navigation} solutions={solutions} />
    </div>
  )
}
