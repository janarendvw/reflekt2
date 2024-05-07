"use client"

import { Reflection } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Reflection>[] = [
    {
        header: "ID",
        accessorKey: "id",
    },
    {
        header: "Content",
        accessorKey: "content",
    },
    {
        header: "Created At",
        accessorKey: "createdAt",
    },
    {
        header: "Updated At",
        accessorKey: "updatedAt",
    },
]