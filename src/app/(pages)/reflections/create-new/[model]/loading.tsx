import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

function loading({}: Props) {
  return (
   <>
    <Skeleton className='w-full h-10' />
    <Skeleton className='w-full h-10 mt-8' /></>
  )
}

export default loading