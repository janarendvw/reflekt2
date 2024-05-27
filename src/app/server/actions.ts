'use server'
import prisma from '@/lib/client'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

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
