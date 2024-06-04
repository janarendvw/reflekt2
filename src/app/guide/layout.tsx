import React from 'react'
import NavBar from './_components/NavBar'

type Props = {
  children: React.ReactNode
}

function layout({ children }: Props) {
  return (
    <div className="flex h-screen w-full">
      <div className="w-full">{children}</div>
      <NavBar />
    </div>
  )
}

export default layout
