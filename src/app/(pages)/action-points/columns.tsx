'use client'

import { deleteActionpointById } from '@/app/server/actions/action-point'
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
  },
  {
    header: 'Title',
    accessorKey: 'title',
    cell: ({ row }) => (
      <Link
        href={`/action-points/${row.original.id.toString()}`}
        className="line-clamp-1 font-semibold"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    header: 'Status',
    accessorKey: 'resolved',
    cell: ({ row }) => (
      <Badge
        className={cn({
          'bg-green-600': row.original.resolved,
          'border border-foreground/50 bg-transparent text-foreground': !row.original.resolved,
        })}
      >
        {row.original.resolved ? 'Resolved' : 'Open'}
      </Badge>
    ),
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
                deleteActionpointById(row.original.id).then(() =>
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
