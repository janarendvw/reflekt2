"use server"
import prisma from '@/lib/client'

export async function getUserById(id: number) {
  const res = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  return res
}