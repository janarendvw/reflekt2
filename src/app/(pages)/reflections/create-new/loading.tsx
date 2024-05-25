import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

function loading({}: Props) {
  return (
    <div className="mx-auto flex flex-col items-center gap-4">
      <Skeleton className="h-10 w-56" />

      <div className="flex flex-col gap-4">
        <Skeleton className="aspect-square w-56 h-56" />
        <Skeleton className="aspect-square w-56 h-56" />
        <Skeleton className="aspect-square w-56 h-56" />
      </div>
    </div>
  )
}

export default loading
