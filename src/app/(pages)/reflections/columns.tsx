"use client"

import { Reflection } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Reflection>[] = [
    {
        header: "Created At",
        accessorKey: "createdAt",
        cell: (({row}) => <span suppressHydrationWarning className="text-muted-foreground font-mono">{new Date(row.original.createdAt).toLocaleDateString()}</span>),
    },
    {
        header: "Updated At",
        accessorKey: "updatedAt",
        cell: (({row}) => <span suppressHydrationWarning className="text-muted-foreground font-mono">{new Date(row.original.createdAt).toLocaleDateString()}</span>), 

    },
    {
        header: "Title",
        accessorKey: "title",
        cell: (({row}) => <span className="font-semibold">{row.original.title}</span>),
    },
    {
        header: "Content",
        accessorKey: "content",
    },
  

]