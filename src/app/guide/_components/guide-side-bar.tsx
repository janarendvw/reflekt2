'use server'
import React, { Children } from 'react'
import GuideSideBarLink from './guide-side-bar-link'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

type Props = {}

const guideLinks = [
  { title: 'Home', href: '/guide' },
  {
    title: 'Reflections',
    href: '/guide/reflections',
    children: [
      {
        title: 'Models',
        href: '/guide/reflections/models',
        children: [
          { title: 'STARR', href: '/guide/reflections/models/starr' },
          { title: 'Korthagen', href: '/guide/reflections/models/Korthagen' },
          { title: 'Default', href: '/guide/reflections/models/default' },
        ],
      },
      {
        title: 'Categorizing',
        href: '/guide/reflections/categorizing',
      },
    ],
  },
  {
    title: 'Action-Points',
    href: '/guide/action-points',
    children: [
      {
        title: 'SMART goals',
        href: '/guide/action-points/smart-goals',
        children: [
          { title: 'Specific', href: '/guide/action-points/smart-goals#specific' },
          { title: 'Measurable', href: '/guide/action-points/smart-goals#measurable' },
          { title: 'Achievable', href: '/guide/action-points/smart-goals#achievable' },
          { title: 'Relevant', href: '/guide/action-points/smart-goals#relevant' },
          { title: 'Time-bound', href: '/guide/action-points/smart-goals#time-bound' },
        ],
      },
      {
        title: 'Resolving',
        href: '/guide/action-points/resolving',
      },
    ],
  },
]

async function GuideSideBar({}: Props) {
  return (
    <div className="h-full w-max min-w-64 border-l bg-foreground/5 p-8">
      <Link href="/home/reflections" >
        <Button variant={'default'} className='w-full mb-8'>
          <ArrowLeft size={16} className="mr-2" />
          Back to Reflekt
        </Button>
      </Link>
      <h1 className="text-2xl font-bold">Guide</h1>
      <Separator className="mb-4 mt-0.5" />
      <GuideSideBarLink data={guideLinks} />
    </div>
  )
}

export default GuideSideBar
