'use server'
import React, { Children } from 'react'
import NavBarLink from './NavBarLink'
import { Separator } from '@/components/ui/separator'

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
          { title: 'STARR', href: '/guide/reflections/starr' },
          { title: 'Korthagen', href: '/guide/reflections/Korthagen' },
          { title: 'Default', href: '/guide/reflections/default' },
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
      }
    ],
  },
]

async function NavBar({}: Props) {
  return (
    <div className="h-full border-l py-8 px-12 w-max">
      <h1 className="text-lg font-bold">Guide</h1>
      <Separator />
      <NavBarLink data={guideLinks} />
    </div>
  )
}

export default NavBar
