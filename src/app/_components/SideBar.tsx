'use client'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { FlipHorizontal2, Home, Sparkle, Zap } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: <Home size={20} />,
  },
  {
    name: 'Reflections',
    href: '/reflections',
    icon: <FlipHorizontal2 size={20} />,
  },
  {
    name: 'Action points',
    href: '/action-points',
    icon: <Zap size={20} />,
  },
]

function SideBar({}: Props) {
  const pathname = usePathname()
  return (
    <div className="flex flex-col items-center gap-1 p-1">
      <Link
        href={'/reflections/create-new'}
        className="flex w-full items-center justify-start gap-2 rounded-md bg-primary px-4 py-3 text-sm font-medium tracking-wide text-primary-foreground"
      >
        <Sparkle size={20} /> Create new
      </Link>
      <Separator />
      {links.map((link) => (
        <React.Fragment key={link.href}>
          <Link
            className={cn(
              'relative flex w-full justify-start rounded px-4 py-2 text-sm font-medium tracking-wide',
              pathname.includes(link.href ?? ':::')
                ? 'text-foreground'
                : 'text-muted-foreground',
            )}
            href={link.href}
          >
            <span className="z-10 flex items-center gap-2">
              {link.icon}
              {link.name}
            </span>
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
              ></motion.span>
            )}
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
}

export default SideBar
