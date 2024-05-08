"use server"
import prisma from '@/lib/client'

export async function deleteReflectionById(id: number) {
  const res = await prisma.reflection.delete({
    where: {
      id,
    },
  })
  return res
}

