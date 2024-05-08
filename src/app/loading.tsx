'use server'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

async function loading({}: Props) {
  return <div className="flex flex-col h-screen w-screen gap-8">
    <Skeleton className='h-40 w-full' />
    <div className='h-full w-full'>
        <Skeleton className='h-full w-56' />
    </div>
  </div>
}

export default loading
