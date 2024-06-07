import React from 'react'

type Props = {
  children: React.ReactNode
}

function PageContent({ children }: Props) {
  return <main className="my-12">{children}</main>
}

export default PageContent
