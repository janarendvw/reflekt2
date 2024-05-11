import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import SessionProvider from '@/app/_components/SessionProvider'
import { redirect } from 'next/navigation'
import NavBar from '@/app/_components/NavBar'
import { Separator } from '@/components/ui/separator'
import SideBar from './_components/SideBar'
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable'
import { auth } from '@/auth'
import NavbarBreadcrumb from './_components/NavBarBreadcrumb'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (!session) {
    redirect('/api/auth/signin')
    return null
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
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
                {' '}
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
        </SessionProvider>
      </body>
    </html>
  )
}
