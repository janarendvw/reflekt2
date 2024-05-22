'use client'

import {
  deleteActionPointById,
  resolveActionPointById,
  unresolveActionPointById,
} from '@/app/server/actions/action-point'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ActionPoint } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import {
  ArrowLeftRight,
  CircleCheck,
  EllipsisVertical,
  FileSymlink,
  Hourglass,
  Trash2,
} from 'lucide-react'

export const columns: ColumnDef<ActionPoint>[] = [
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
    maxSize: 1,
  },
  {
    header: 'Title',
    accessorKey: 'title',
    cell: ({ row }) => (
      <Link
        href={`/action-points/${row.original.id.toString()}`}
        className="line-clamp-1 font-semibold hover:underline"
      >
        {row.original.title}
      </Link>
    ),
    enableResizing: true,
  },
  {
    header: 'Status',
    accessorKey: 'resolved',
    cell: ({ row }) => (
      <Badge variant={row.original.resolved ? 'default' : 'outline'}>
        {row.original.resolved ? (
          <span className="flex items-center gap-1">
            <CircleCheck size={14} /> Resolved
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <Hourglass size={14} />
            Open
          </span>
        )}
      </Badge>
    ),
    maxSize: 1,
  },
  {
    header: 'Reflection',
    accessorKey: 'reflection',
    cell: ({ row }) => (
      <Link
        href={`/reflections/${row.original.reflectionId.toString()}`}
        className="line-clamp-1 flex items-center gap-1 font-semibold hover:underline"
      >
        <FileSymlink size={14} /> Link
      </Link>
    ),
    maxSize: 1,
  },
  {
    header: '',
    accessorKey: 'id',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="font-bold">
            <EllipsisVertical size={14} />{' '}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button
              className={'flex w-full items-center gap-1 text-red-400'}
              onClick={() => {
                deleteActionPointById(row.original.id)
              }}
            >
              <Trash2 size={14} /> Delete
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              className={'flex w-full items-center gap-1'}
              onClick={() => {
                row.original.resolved
                  ? unresolveActionPointById(row.original.id)
                  : resolveActionPointById(row.original.id)
              }}
            >
              <ArrowLeftRight size={14} />{' '}
              {row.original.resolved ? 'Unresolve' : 'Resolve'}
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]
