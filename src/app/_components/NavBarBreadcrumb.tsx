'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Props = {}

function NavbarBreadcrumb({}: Props) {
  const pathArray = usePathname()
    .split('/')
    .filter((path) => path !== '')
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathArray.map((path, index) => {
          const fullPath = '/' + pathArray.slice(0, index + 1).join('/')
          return (
            <React.Fragment key={index}>
              <motion.div
                layoutId={path}
                transition={{ duration: 0.1 }}
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: '-100%' }}
              >
                <BreadcrumbItem className="capitalize">
                  {index !== pathArray.length - 1 ? (
                    <BreadcrumbLink href={fullPath} className="hover:underline">
                      {path}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="font-semibold">
                      {path}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </motion.div>
              {index !== pathArray.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default NavbarBreadcrumb
