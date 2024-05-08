'use client'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
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
    <div className="flex flex-col items-center gap-1 p-2">
      <Link
        href={'/reflections/create-new'}
        className="flex w-full justify-start rounded-md bg-orange-500 px-4 py-3 text-center text-sm font-medium tracking-wide text-white"
      >
        Create new
      </Link>
      <Separator />
      {links.map((link) => (
        <React.Fragment key={link.href}>
          <Link
            className={cn(
              'relative flex w-full justify-start rounded px-4 py-2 text-sm font-medium tracking-wide',
              pathname.includes(link.href ?? ':::')
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
            href={link.href}
          >
            <span className="z-10">{link.name}</span>
            {pathname.includes(link.href ?? ':::') && (
              <motion.span
                layoutId="active-link"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  duration: 0.2,
                }}
                className="absolute left-0 top-0 -z-10 h-full w-full rounded-md bg-accent"
              >
                <div className="h-full w-1 bg-foreground"></div>
              </motion.span>
            )}
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
}

export default SideBar
