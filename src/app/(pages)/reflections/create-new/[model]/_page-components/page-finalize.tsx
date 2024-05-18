import { Button } from '@/components/ui/button'
import { PartyPopper, Save } from 'lucide-react'
import React from 'react'

type Props = {
  actionPoints: { title: string; content: string }[]
  handleSubmit: () => void
}

function PageFinalize({ actionPoints, handleSubmit }: Props) {
  return (
    <>
      <h1 className="relative mb-8 mt-24 flex items-center gap-2 text-2xl font-semibold">
        Make it official <PartyPopper />
        <div className="absolute -left-16 top-1/2 flex aspect-square -translate-y-1/2 items-center justify-center rounded-md border border-border px-2 text-sm text-muted-foreground">
          3
        </div>
      </h1>
      <Button
        variant={actionPoints.length > 0 ? 'default' : 'outline'}
        onClick={() => handleSubmit()}
        className="flex w-32 items-center gap-2"
      >
        <Save size={16} /> Save
      </Button>
    </>
  )
}

export default PageFinalize
