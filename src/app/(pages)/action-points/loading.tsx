import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

function loading({}: Props) {
  return <Skeleton className="h-screen w-full" />
}

export default loading
