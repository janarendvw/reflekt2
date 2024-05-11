'use client'

import { deleteReflectionById } from '@/app/server/actions'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Reflection } from '@prisma/client'
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '@radix-ui/react-hover-card'
import { Separator } from '@radix-ui/react-separator'
import { ColumnDef } from '@tanstack/react-table'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { EllipsisVertical, Zap } from 'lucide-react'

export const columns: ColumnDef<Reflection>[] = [
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: ({ row }) => (
      <span
        suppressHydrationWarning
        className="font-mono text-muted-foreground"
      >
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
  {
    header: 'Type',
    accessorKey: 'reflectionType',
    cell: ({ row }) => row.original.reflectionType,
  },
  {
    header: 'Title',
    accessorKey: 'title',
    cell: ({ row }) => (
      <Link
        href={`/reflections/${row.original.id.toString()}`}
        className="line-clamp-1 font-semibold hover:underline"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    header: 'Skills',
    accessorKey: 'skills',
    cell: ({ row }) => (
      <>
        {row.original.skills.length ? (
          <Badge variant={'secondary'} className="font-semibold">
            {row.original.skills[0]}{' '}
            {row.original.skills.length > 1 &&
              `+${row.original.skills.length - 1}`}
          </Badge>
        ) : (
          '-'
        )}
      </>
    ),
  },
  {
    header: 'actionpoints',
    accessorKey: 'actionPoints',
    cell: ({ row }) => {
      const actionPoints: [] = row.getValue('actionPoints')
      return (
        <>
          {actionPoints && actionPoints.length > 0 ? (
            <HoverCard openDelay={1} closeDelay={0}>
              <HoverCardTrigger>
                <Badge className="flex w-fit items-center gap-2 font-mono hover:animate-pulse">
                  <Zap size={14} /> {actionPoints.length}
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ y: '-30%', opacity: 0 }}
                >
                  <div className="flex flex-col gap-1 rounded-xl border border-border bg-background/80 p-4">
                    {actionPoints.map((actionPoint: any, index) => {
                      return (
                        <motion.div
                          initial={{ y: '-30%', opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="rounded-md border border-border bg-background p-3 shadow hover:bg-secondary"
                          key={actionPoint.id}
                        >
                          {index !== 0 && <Separator />}
                          <Link href={`/action-points/${actionPoint.id}`}>
                            <span className="font-muted-foreground line-clamp-1 hover:underline">
                              <Zap className="mr-2 inline " size={14} />{' '}
                              {actionPoint.title}
                            </span>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </>
      )
    },
  },
  {
    header: 'Actions',
    accessorKey: 'id',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="font-bold">
            <EllipsisVertical size={14} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button
              className={'flex w-full text-red-400'}
              onClick={() => {
                deleteReflectionById(row.original.id).then(() =>
                  window.location.reload(),
                )
              }}
            >
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
