'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import UniversalButton from '../../../_components/UniversalButton'
import { Solution } from '@/payload-types'
import { ConsultationForm } from '@/app/(frontend)/_components/Modal/ConsultationModal'
import { useState } from 'react'

export default function LeadBlock({ solution }: { solution: Solution }) {
  const [modalOpen, setModalOpen] = useState(false)
  const handleModalSubmit = (data: { name: string; email: string; phone: string }) => {
    // TODO: handle form submission (e.g., send to API)
    setModalOpen(false)
    // Optionally show a success message
  }
  return (
    <section id="contact" className="container mx-auto my-16 lg:my-20 px-6 lg:px-16">
      <div className="bg-greenBG text-black rounded-custom items-center text-center p-6 md:py-12 md:px-40 mt-20">
        <RichText data={solution.lead} />
      </div>
      <UniversalButton
        label="Обсудить проект"
        className="my-6 w-full"
        onClick={() => setModalOpen(true)}
      />
      <ConsultationForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </section>
  )
}
