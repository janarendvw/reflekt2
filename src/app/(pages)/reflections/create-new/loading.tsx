import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

async function loading({}: Props) {
  return (
    <div className="flex flex-col gap-4 mx-auto items-center">
              <Skeleton className='h-10 w-56' />

      <div className='flex gap-4'>
        <Skeleton className='aspect-square w-56' />
        <Skeleton className='aspect-square w-56' />
        <Skeleton className='aspect-square w-56' />
      </div>
    </div>
  )
}

export default loading