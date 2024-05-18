import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Sparkles } from 'lucide-react'
import React from 'react'

type Props = {
  title: string
  setTitle: (title: string) => void
}

function PageMetadata({ title, setTitle }: Props) {
  return (
    <>
      <h1 className="relative mb-8 flex items-center gap-2 text-2xl font-semibold">
        Create a new title for your reflection <Sparkles />
        <div className="absolute -left-16 top-1/2 flex aspect-square -translate-y-1/2 items-center justify-center rounded-md border border-border px-2 text-sm text-muted-foreground">
          1
        </div>
      </h1>
      <Label htmlFor="reflection-title">Title</Label>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={'Enter a title'}
        id="reflection-title"
      />
    </>
  )
}

export default PageMetadata
