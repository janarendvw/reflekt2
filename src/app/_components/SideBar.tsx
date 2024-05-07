'use client'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { headers } from 'next/headers'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Reflections',
    href: '/reflections',
  },
  {
    name: 'Action points',
    href: '/action-points',
  },
]

function SideBar({}: Props) {
  const pathname = usePathname()
  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <Link
        href={'/reflections/create-new'}
        className="flex w-full justify-start rounded bg-orange-500 px-4 py-3 text-center text-sm font-medium tracking-wide text-white"
      >
        Create new
      </Link>
      <Separator />
      {links.map((link) => (
        <Link
          className={cn(
            'flex w-full justify-start rounded px-4 py-1 text-sm font-medium tracking-wide hover:bg-accent',
            {
              'bg-accent': link.href.includes(pathname ?? ':::'),
            },
          )}
          key={link.href}
          href={link.href}
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}

export default SideBar
