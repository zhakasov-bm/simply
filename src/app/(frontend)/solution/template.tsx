import { redirect } from 'next/navigation'
import React, { FC, ReactNode } from 'react'

interface TemplateProps {
  children: ReactNode
}

const Template: FC<TemplateProps> = async ({ children }) => {
  return (
    <div>
      <div>Local</div>
      {children}
    </div>
  )
}

export default Template
