'use client'

import { deleteActionPointById } from '@/app/server/actions/action-point'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ActionPoint } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import {
  Check,
  CheckCircle,
  CircleCheck,
  CircleDotDashed,
  EllipsisVertical,
  Hourglass,
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
    size: 10,
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
    size: 70,
    enableResizing: true,
  },
  {
    header: 'Status',
    accessorKey: 'resolved',
    cell: ({ row }) => (
      <Badge variant={row.original.resolved ? 'default' : 'outline'}>
        {row.original.resolved ? (
          <span className="flex items-center gap-2">
            <CircleCheck size={14} /> Resolved
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Hourglass size={14} />
            Open
          </span>
        )}
      </Badge>
    ),
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
              className={'flex w-full text-red-400'}
              onClick={() => {
                deleteActionPointById(row.original.id)
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
