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

type NavBarLinkProps = {
  data: Link[]
  level?: number
}

export default function NavBarLink({ data, level }: NavBarLinkProps) {
  const [linkArray, setLinkArray] = useState<Link[]>([])

  useEffect(() => {
    setLinkArray(data)
  }, [data])

  return (
    <div className="mb-4 flex items-stretch">
      {level && <div className="mx-4 my-6 min-h-full w-1 border-y border-l"></div>}

      <ul
        className={cn(' p-2')}
        style={{ fontSize: level ? 1 - level * 0.08 + 'rem' : '1rem', fontWeight: level ? 700 - level * 200 : 700 }}
      >
        {linkArray.map((link, index) => (
          <motion.li
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1, transition: { delay: 0.1 * index, type: 'spring' } }}
            whileHover={{ opacity: 1 }}
            key={link.title}
            className={cn('mt-1 w-max cursor-pointer')}
          >
            <Link href={link.href}>
              <span className="hover:underline">{link.title}</span>
              {link.children && <NavBarLink level={level ? level + 1 : 1} data={link.children} />}
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
