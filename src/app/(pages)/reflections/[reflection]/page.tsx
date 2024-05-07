import prisma from '@/lib/client'
import React from 'react'


async function page({params}: {params: {reflection: string}}) {

    const reflection = await prisma.reflection.findUnique({
        where: {
            id: Number(params.reflection)
        }
    }).then((res) => {
        return res ?? undefined
    }
    )

  return (
    <div>{reflection && reflection.content}</div>
  )
}

export default page