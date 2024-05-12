'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getTotalActionPointCount } from './server/actions/action-point'
import MatrixBackgound from './_components/matrix-background'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className='w-screen h-screen left-0 top-0 fixed -z-10'>
        <MatrixBackgound />
      </div>
      <main className='flex flex-col items-center'>
        <h1 className='text-6xl font-bold font-mono text-center'>
        REFLECT / IMPROVE / <span className='text-primary'>PREVAIL</span>
        </h1>
        <div className="flex items-center gap-4 mt-16">
          <Button variant='outline' size='lg' onClick={() => router.push('/reflections')}>
           Learn more
          </Button>
          <Button variant='default' size='lg' onClick={() => router.push('/reflections')}>
            Get started
          </Button>
        </div>
      </main>
    </div>
  )
}
