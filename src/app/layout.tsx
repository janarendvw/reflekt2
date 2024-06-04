import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import SessionProvider from '@/app/_components/session-provider'
import { auth } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Reflekt',
  description: 'Create and share reflections with your team',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  )
}
