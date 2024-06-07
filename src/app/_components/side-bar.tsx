'use client'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { BookMarked, FlipHorizontal2, Sparkle, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const links = [
  {
    name: 'Reflections',
    href: '/home/reflections',
    icon: <FlipHorizontal2 size={20} />,
  },
  {
    name: 'Action points',
    href: '/home/action-points',
    icon: <Zap size={20} className="" />,
  },
]

function SideBar({}: Props) {
  const pathname = usePathname()
  return (
    <div className="flex h-full w-full flex-col justify-between px-2 py-2">
      <div className="flex flex-col items-center gap-2">
        <Link
          href={'/home/reflections/create-new'}
          className="flex w-full items-center justify-start gap-2 bg-primary px-4 py-4 text-sm font-medium tracking-wide text-primary-foreground"
        >
          <Sparkle size={20} /> Create new
        </Link>
        <Separator />
        <div className="flex w-full flex-col gap-2">
          {links.map(link => (
            <React.Fragment key={link.href}>
              <Link
                className={cn(
                  'relative flex w-full justify-start rounded px-4 py-4 text-sm font-medium tracking-wide',
                  pathname.includes(link.href ?? ':::') ? 'text-foreground' : 'text-muted-foreground',
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
      </div>
      <Link
        href={'/guide'}
        className="relative flex w-full justify-start rounded-md bg-secondary px-4 py-4 text-sm border-l-4 border-info font-medium tracking-wide text-secondary-foreground"
      >
        <BookMarked className="mr-2" size={20} /> Guide
      </Link>
    </div>
  )
}

export default SideBar
