'use server'

import prisma from '@/lib/client'

export async function deleteActionpointById(id: number) {
  const res = await prisma.actionPoint.delete({
    where: {
      id,
    },
  })
  return res
}
