'use client'
import React, { useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NavbarBreadcrumb from './NavBarBreadcrumb'
import Image from 'next/image'
import Logo from './Logo'

function AuthButton() {
  const session = useSession()

  if (session) {
    return (
      <Button size={'sm'} variant={"outline"} onClick={() => signOut()}>
        Sign out
      </Button>
    )
  } else {
    return (
      <Button size={'sm'} variant={"outline"} onClick={() => signIn()}>
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
    <div className="flex items-center justify-between px-4 py-2">
      <Logo />
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>
            {session?.data?.user?.name?.[0] ?? ''}
          </AvatarFallback>
        </Avatar>
        <AuthButton />
      </div>
    </div>
  )
}

export default NavBar
