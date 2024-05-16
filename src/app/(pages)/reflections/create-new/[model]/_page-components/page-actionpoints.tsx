import React from 'react'
import AddActionPoint from '../_components/AddActionPoint'
import { Zap } from 'lucide-react'

type Props = {
  actionPoints: { title: string; content: string }[]
  setActionPoints: React.Dispatch<
    React.SetStateAction<{ title: string; content: string }[]>
  >
}

function PageActionPoints({ actionPoints, setActionPoints }: Props) {
  return (
    <>
      <h1 className="relative mb-8 mt-24 flex items-center gap-2 text-2xl font-semibold">
        Add action-points <Zap />
        <div className="absolute -left-16 top-1/2 flex aspect-square -translate-y-1/2 items-center justify-center rounded-md border border-border px-2 text-sm text-muted-foreground">
          2
        </div>
      </h1>
      <div className="my-8 flex flex-col gap-4">
        <AddActionPoint
          actionPoints={actionPoints}
          setActionPoints={setActionPoints}
        />
      </div>
    </>
  )
}

export default PageActionPoints
