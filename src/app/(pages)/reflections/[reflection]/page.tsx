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
    <div className='flex flex-col gap-4 mx-auto max-w-screen-md w-full'>
      <h1 className='text-2xl font-semibold'>{reflection?.title}</h1>
      <p className='text-sm text-gray-500'>{reflection?.createdAt.toLocaleDateString()} - {reflection?.reflectionType} model</p>
      {reflection?.content}</div>
  )
}

export default page