import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

function Loading({}: Props) {
  return <Skeleton className="h-96 w-full" />
}

export default Loading
