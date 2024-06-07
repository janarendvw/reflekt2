'use server'

import { auth } from '@/auth'
import prisma from '@/lib/client'
import { Reflection } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const createReflection = async (
  input: Partial<Reflection>,
  actionPoints: { title: string; content: string }[],
) => {
  await prisma.reflection
    .create({
      data: {
        title: input.title ?? 'Untitled Reflection',
        tags: input.tags,
        content: input.content,
        reflectionType: input.reflectionType ?? 'DEFAULT',
        author: {
          connect: {
            id: input.authorId,
          },
        },
        actionPoints: {
          create: actionPoints.map(point => ({
            title: point.title,
            content: point.content,
            resolved: false,
            author: {
              connect: {
                id: input.authorId,
              },
            },
          })),
        },
      },
    })
    .then(() => {
      redirect('/home/reflections')
    })
}

export const getReflections = async () => {
  const session = await auth()
  return prisma.reflection.findMany({
    take: 10,
    where: {
      authorId: session?.user?.id ?? '',
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      actionPoints: true,
    },
  })
}

export async function deleteReflectionById(id: number) {
  const res = await prisma.reflection
    .delete({
      where: {
        id,
      },
    })
    .then(res => {
      return revalidatePath('/reflections')
    })
}

