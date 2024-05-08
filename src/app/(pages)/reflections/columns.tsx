'use client'

import { deleteReflectionById } from '@/app/server/actions'
import { Button } from '@/components/ui/button'
import { Reflection } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'

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
    header: 'Title',
    accessorKey: 'title',
    cell: ({ row }) => (
      <Link
        href={`/reflections/${row.original.id.toString()}`}
        className="font-semibold"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    header: 'Content',
    accessorKey: 'content',
  },
  {
    header: 'Actions',
    accessorKey: 'id',
    cell: ({ row }) => (
      <Button
        variant="destructive"
        size="sm"
        onClick={() => {
          deleteReflectionById(row.original.id).then(() =>
            window.location.reload(),
          )
        }}
      >
        Delete
      </Button>
    ),
  },
]
