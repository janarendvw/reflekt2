'use client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Link = {
  title: string
  href: string
  children?: Link[]
}

type GuideSideBarLinkProps = {
  data: Link[]
  level?: number
}

export default function GuideSideBarLink({ data, level }: GuideSideBarLinkProps) {
  const [linkArray, setLinkArray] = useState<Link[]>([])
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    setLinkArray(data)
  }, [data])

  return (
    <div className="mb-4 flex items-stretch gap-2 pr-4">
      {level && <div className="m-2 mt-4 min-h-full w-2 border-y border-l"></div>}

      <ul style={{ fontSize: level ? 1 - level * 0.08 + 'rem' : '1rem', fontWeight: level ? 700 - level * 200 : 700 }}>
        {linkArray.map((link, index) => (
          <motion.li
            initial={{ x: '-30%', opacity: 0 }}
            animate={{
              x: 0,
              opacity: 0.9,
              transition: { delay: 0.1 * (index + (level ? level : 0)), type: 'spring' },
            }}
            whileHover={{ opacity: 1 }}
            key={link.title}
            className={cn('my-1 w-max cursor-pointer')}
          >
            <Link href={link.href}>
              <span className="hover:underline">{link.title}</span>

              {link.children && <GuideSideBarLink level={level ? level + 1 : 1} data={link.children} />}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
