import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

function loading({}: Props) {
  return (
    <>
      <Skeleton className="h-10 w-full" />
      <Skeleton className="mt-8 h-10 w-full" />
    </>
  )
}

export default loading
