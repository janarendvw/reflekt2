import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

async function loading({}: Props) {
  return (
    <Skeleton className='w-full h-screen' />
  )
}

export default loading