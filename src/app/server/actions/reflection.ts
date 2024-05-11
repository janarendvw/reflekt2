'use server'

import prisma from '@/lib/client'
import { ActionPoint, Reflection } from '@prisma/client'
import { redirect } from 'next/navigation'

export const createReflection = async (
  input: Partial<Reflection>,
  actionPoints: { title: string; content: string }[],
) => {
  await prisma.reflection
    .create({
      data: {
        title: input.title ?? 'Untitled Reflection',
        content: input.content,
        reflectionType: input.reflectionType ?? 'DEFAULT',
        author: {
          connect: {
            id: input.authorId,
          },
        },
        actionPoints: {
          create: actionPoints.map((point) => ({
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
      redirect('/reflections')
    })
}
