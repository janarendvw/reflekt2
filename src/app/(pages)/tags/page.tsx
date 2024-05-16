import { auth } from '@/auth'
import prisma from '@/lib/client'
import React from 'react'

type Props = {}

async function page({}: Props) {
    const session = await auth()
  return <div></div>
}

export default page
