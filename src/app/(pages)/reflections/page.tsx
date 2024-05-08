import prisma from '@/lib/client'
import React, { Suspense } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { auth } from '@/auth'

type Props = {}

async function page({}: Props) {
  const session = await auth()

  const reflections = await prisma.reflection.findMany({
    where: {
      authorId: session?.user?.id ?? '',
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div>
      <Suspense fallback="beeep">
        <DataTable columns={columns} data={reflections} />
      </Suspense>
    </div>
  )
}

export default page
