'use server'
import prisma from '@/lib/client'

export async function getUserById(id: string) {
  const res = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  return res
}
