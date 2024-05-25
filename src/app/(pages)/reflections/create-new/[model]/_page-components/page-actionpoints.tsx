'use client'
import React from 'react'
import AddActionPoint from './_components/AddActionPoint'
import { Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  actionPoints: { title: string; content: string }[]
  setActionPoints: React.Dispatch<
    React.SetStateAction<{ title: string; content: string }[]>
  >
}

function PageActionPoints({ actionPoints, setActionPoints }: Props) {
  return (
    <>
      <h5 className="mb-2 mt-8 flex items-center gap-2 text-lg font-bold">
        Add action points to your reflection
        <Zap size={16} className="text-muted-foreground" />
      </h5>
      <div
        className={cn(
          'my-8 flex flex-col gap-4 rounded-md border border-border p-4 ',
          {
            'items-center py-12': actionPoints.length === 0,
          },
        )}
      >
        <AddActionPoint
          actionPoints={actionPoints}
          setActionPoints={setActionPoints}
        />
      </div>
    </>
  )
}

export default PageActionPoints
