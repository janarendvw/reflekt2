import { DataTable } from '@/app/_components/data-table'
import { auth } from '@/auth'
import prisma from '@/lib/client'
import React from 'react'
import { columns } from './columns'

async function page() {
  const session = await auth()
  const actionPoints = await prisma.actionPoint.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      authorId: session?.user?.id,
    },
  })

  return (
    <div>
      <DataTable columns={columns} data={actionPoints} />
    </div>
  )
}

export default page
