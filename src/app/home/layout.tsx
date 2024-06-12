import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import NavBar from '../_components/nav-bar'
import NavbarBreadcrumb from '../_components/nav-bar-breadcrumb'
import SideBar from '../_components/side-bar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

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
    <main className="flex h-screen flex-col">
      <NavBar />

      <Separator />
      <div className='flex h-full'>
          <SideBar />
        <div style={{ maxHeight: 'calc(100vh - 70px)' }} className="relative w-full">
          <div className="flex w-full items-center border-b border-secondary bg-secondary/50 px-4 py-2">
            <NavbarBreadcrumb />
          </div>
          <main
            style={{ maxHeight: 'calc(100vh - 70px)' }}
            className="container flex h-full w-full flex-col overflow-y-auto py-20"
          >
            {children}
          </main>
        </div>
      </div>
    </main>
  )
}

export default Layout
