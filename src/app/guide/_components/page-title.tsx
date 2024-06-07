import { BookText } from 'lucide-react'
import React from 'react'

type Props = {
  children: React.ReactNode
}

function PageTitle({ children }: Props) {
  return (
    <h1 className="flex items-center text-4xl font-semibold">
      <BookText className="mr-2" />
      {children}
    </h1>
  )
}

export default PageTitle
