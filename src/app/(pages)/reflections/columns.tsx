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
        className="font-semibold hover:underline line-clamp-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    header: 'Skills',
    accessorKey: 'skills',
    cell: ({ row }) => (
      <Badge className="font-semibold">
        {row.original.skills[0]}{' '}
        {row.original.skills.length > 1 && `+${row.original.skills.length - 1}`}
      </Badge>
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
            <HoverCard>
              <HoverCardTrigger>
                <Badge variant={'outline'} className="font-mono">
                  {actionPoints.length} points
                </Badge>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ y: '-30%', opacity: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Action Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-2">
                        {actionPoints.map((actionPoint: any, index) => {
                          return (
                            <React.Fragment key={actionPoint.id}>
                              {index !== 0 && <Separator />}
                              <Link href={`/action-points/${actionPoint.id}`}>
                                <span className="font-muted-foreground underline">
                                  {actionPoint.title}
                                </span>
                              </Link>
                            </React.Fragment>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
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
            &#8285;
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
