'use server'

import prisma from '@/lib/client'
import { revalidatePath } from 'next/cache'

export async function getActionPointById(id: number) {
  const res = await prisma.actionPoint.findUnique({
    where: {
      id,
    },
  })
  return res
}

export async function deleteActionPointById(id: number) {
  const res = await prisma.actionPoint.delete({
    where: {
      id,
    },
  })
  return res
}

export async function getTotalActionPointCount() {
  const res = await prisma.actionPoint.count()
  return res
}

//* Action point status mutations

export async function resolveActionPointById(id: number, resolution: string) {
  const res = await prisma.actionPoint.update({
    where: {
      id,
    },
    data: {
      resolved: true,
      resolution,
    },
  })
  return res
}

export async function unresolveActionPointById(id: number) {
  const res = await prisma.actionPoint.update({
    where: {
      id,
    },
    data: {
      resolved: false,
      resolution: null,
    },
  })
  return revalidatePath('/action-points')
}
