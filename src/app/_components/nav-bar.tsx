'use client'
import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Logo from './logo'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DoorOpen } from 'lucide-react'

function AuthButton() {
  const session = useSession()

  if (session) {
    return (
      <Button size={'sm'} variant={'destructive'} className='w-full' onClick={() => signOut()}>
       <DoorOpen size={16} className='mr-2' /> Sign out
      </Button>
    )
  } else {
    return (
      <Button size={'sm'} variant={'outline'} className='w-full' onClick={() => signIn()}>
        Sign in
      </Button>
    )
  }
}

type Props = {}

function NavBar({}: Props) {
  const session = useSession()
  const [image, setImage] = React.useState<string>('')

  useEffect(() => {
    if (session?.data?.user?.image) {
      setImage(session.data.user.image)
    }
    console.log(image)
  }, [session, image])

  return (
    <div className="flex items-center justify-between px-4 py-2 min-h-[64px]">
      <Logo />
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={image} />
              <AvatarFallback>{session?.data?.user?.name?.[0].toUpperCase() ?? ''}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
          <AuthButton />

          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default NavBar
