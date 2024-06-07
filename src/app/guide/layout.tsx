import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import GuideSideBar from './_components/guide-side-bar'
import NavBar from '../_components/nav-bar'
import { Separator } from '@/components/ui/separator'

type Props = {
  children: React.ReactNode
}

function layout({ children }: Props) {
  return (
    <div className='h-screen flex flex-col'>
      <NavBar />
      <Separator />
      <div className="flex w-full h-full">
        <GuideSideBar />
        <div className="w-full px-12">
          <div className="mx-auto w-full max-w-screen-lg pt-12">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default layout
