import { DataTable } from '@/app/home/action-points/_components/data-table'
import { auth } from '@/auth'
import prisma from '@/lib/client'
import React from 'react'
import { columns } from './columns'
import ProgressTracker from './_components/progress-tracker'

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
  const resolvedActionPoints = actionPoints.filter(actionPoint => actionPoint.resolved)
  const resolvedPercentage = (resolvedActionPoints.length / actionPoints.length) * 100

  return (
    <div className="grid grid-cols-3 gap-4">
      <ProgressTracker
        className="col-span-3"
        value={resolvedPercentage}
        title="Resolved action-points"
        description={`${resolvedActionPoints.length} out of ${actionPoints.length} action-points resolved`}
      />

      <DataTable className="col-span-3" columns={columns} data={actionPoints} />
    </div>
  )
}

export default page
