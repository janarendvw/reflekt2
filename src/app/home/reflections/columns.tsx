'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ActionPoint, Reflection } from '@prisma/client'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@radix-ui/react-hover-card'
import { Separator } from '@radix-ui/react-separator'
import { ColumnDef } from '@tanstack/react-table'
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { ArrowUpDown, EllipsisVertical, Zap } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { deleteReflectionById } from '@/app/server/actions/reflection'

export const columns: ColumnDef<Reflection>[] = [
  {
    header: ({ column }) => {
      return (
        <Button className="pl-0" variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown size={14} className="ml-2" />
        </Button>
      )
    },
    accessorKey: 'createdAt',
    cell: ({ row }) => (
      <span suppressHydrationWarning className="font-mono text-muted-foreground">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </span>
    ),
    maxSize: 1,
  },
  {
    header: ({ column }) => {
      return (
        <Button className="pl-0" variant={'ghost'} onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Title
          <ArrowUpDown size={14} className="ml-2" />
        </Button>
      )
    },
    enableSorting: true,
    accessorKey: 'title',
    cell: ({ row }) => (
      <Link
        href={`/home/reflections/${row.original.id.toString()}`}
        className="line-clamp-1 font-semibold hover:underline"
      >
        {row.original.title}
      </Link>
    ),
    enableResizing: true,
  },
  {
    header: 'Resolved',
    accessorKey: 'progress',
    cell: ({ row }) => {
      const actionPoints: [] = row.getValue('actionPoints')
      const resolvedActionPoints = actionPoints.filter((actionPoint: ActionPoint) => actionPoint.resolved)

      return (
        <div className="flex items-center gap-2">
          <Progress value={(resolvedActionPoints.length / actionPoints.length) * 100} className="min-w-[100px]" />
          <span className="text-xs text-muted-foreground">
            {resolvedActionPoints.length}/{actionPoints.length}
          </span>
        </div>
      )
    },
  },
  {
    header: 'Action points',
    accessorKey: 'actionPoints',
    cell: ({ row }) => {
      const actionPoints: [] = row.getValue('actionPoints')
      return (
        <>
          {actionPoints && actionPoints.length > 0 ? (
            <HoverCard openDelay={1} closeDelay={0}>
              <HoverCardTrigger>
                <Badge variant={'outline'} className="flex w-max items-center gap-2 font-mono hover:animate-pulse">
                  <Zap size={14} /> {actionPoints.length} points
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
                          <Link href={`/home/action-points/${actionPoint.id}`}>
                            <span className="font-muted-foreground line-clamp-1 hover:underline">
                              <Zap className="mr-2 inline " size={14} /> {actionPoint.title}
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
    header: '',
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
                deleteReflectionById(row.original.id)
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
