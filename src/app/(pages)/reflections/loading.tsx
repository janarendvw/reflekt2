import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

async function Loading({}: Props) {
  return (
    <Skeleton className="w-full h-96" />
  )
}

export default Loading