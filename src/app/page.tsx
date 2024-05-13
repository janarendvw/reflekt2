'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getTotalActionPointCount } from './server/actions/action-point'
import MatrixBackgound from './_components/matrix-background'
import { useRouter } from 'next/navigation'
import { Book, ChevronRight, Redo, Rocket } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [title, setTitle] = useState<string>('REFLECT')



  
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className='w-screen h-screen left-0 top-0 fixed -z-10'>
        <MatrixBackgound />
      </div>
      <main className='flex flex-col items-center'>
        <h1 className='text-[5vw] font-bold text-center font-mono tracking-widest leading-none flex flex-col justify-center items-start'>
        {title} <span>IMPROVE</span> <span className='text-primary'>CONQUER</span>
        </h1>
        <div className="flex items-center gap-4 mt-16">
          <Button variant='outline' size='lg' onClick={() => router.push('/reflections')}>
           <Book size={16}  className='mr-2'/> Learn more
          </Button>
          <Button variant='default' size='lg' onClick={() => router.push('/reflections')}>
           <Rocket size={16} className='mr-2'/> Get started
          </Button>
        </div>
      </main>
    </div>
  )
}
