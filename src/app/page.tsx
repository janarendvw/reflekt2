'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { getTotalActionPointCount } from './server/actions/action-point'
import MatrixBackgound from './_components/matrix-background'
import { useRouter } from 'next/navigation'
import { Book, ChevronRight, Redo, Rocket } from 'lucide-react'
import { use, useEffect, useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [title, setTitle] = useState<string>('REFLECT')

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="fixed left-0 top-0 -z-10 h-screen w-screen">
        <MatrixBackgound />
      </div>
      <main className="flex flex-col items-center">
        <h1 className="flex flex-col items-start justify-center text-center font-mono text-[5vw] font-bold leading-none tracking-widest">
          {title} <span>IMPROVE</span> <span className="text-primary">CONQUER</span>
        </h1>
        <div className="mt-16 flex items-center gap-4">
          <Button variant="outline" size="lg" onClick={() => router.push('/reflections')}>
            <Book size={16} className="mr-2" /> Learn more
          </Button>
          <Button variant="default" size="lg" onClick={() => router.push('/reflections')}>
            <Rocket size={16} className="mr-2" /> Get started
          </Button>
        </div>
      </main>
    </div>
  )
}
