import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import NavBar from '../_components/NavBar'
import NavbarBreadcrumb from '../_components/NavBarBreadcrumb'
import SideBar from '../_components/SideBar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

type MainLayoutProps = {
    children: React.ReactNode
}

async function Layout({children}: MainLayoutProps) {
  const session = await auth()
  
  if (!session) {
    redirect('/api/auth/signin')
    return null
  }

  return (
    <main className="flex h-screen flex-col">
    <NavBar />

    <Separator />
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={10}>
        <SideBar />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        style={{ maxHeight: 'calc(100vh - 70px)' }}
        defaultSize={85}
        className="relative"
      >
        <div className="flex w-full items-center border-b border-secondary bg-secondary/50 shadow px-4 py-2">
          <NavbarBreadcrumb />
        </div>
        <main
          style={{ maxHeight: 'calc(100vh - 70px)' }}
          className="container flex flex-col overflow-y-auto py-20"
        >
          {children}
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  </main>
  )
}

export default Layout