import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import NavBar from '../_components/nav-bar'
import NavbarBreadcrumb from '../_components/nav-bar-breadcrumb'
import SideBar from '../_components/side-bar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FlipHorizontal2, Plus, PlusCircle, Zap } from 'lucide-react'

type MainLayoutProps = {
  children: React.ReactNode
}

async function Layout({ children }: MainLayoutProps) {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
    return null
  }

  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <NavBar />

      <Separator />
      <div className="flex h-full">
        <SideBar />
        <div style={{ maxHeight: 'calc(100vh - 64px)' }} className="relative flex h-full w-full flex-col">
          <div className="md:flex w-full items-center border-b border-secondary bg-secondary/50 px-4 py-2 hidden">
            <NavbarBreadcrumb />
          </div>
          <main className="container flex w-full flex-1 flex-col overflow-y-auto py-20">{children}</main>
          <div className="flex h-[56px] w-full items-center justify-evenly border-t border-border px-4 md:hidden">
            <Link href="/home/reflections" className='p-2 rounded-full'>
              <FlipHorizontal2 />
            </Link>
            <Link href="/home/reflections/create-new" className='p-2 rounded-full bg-primary text-primary-foreground'>
              <Plus />
            </Link>
            <Link href="/home/action-points" className='p-2 rounded-full'>
              <Zap />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Layout
