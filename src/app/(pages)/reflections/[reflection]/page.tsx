import prisma from '@/lib/client'
import React from 'react'
import { ReflectionContent } from './_components/ReflectionContent'

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
    <div className='flex flex-col mx-auto max-w-screen-md w-full'>
      <h1 className='text-2xl font-semibold capitalize'>{reflection?.title}</h1>
      <p className='text-sm text-gray-500 mb-4 font-mono'>{reflection?.createdAt.toLocaleDateString()} - {reflection?.reflectionType} model</p>
     <ReflectionContent content={reflection?.content ?? []} />
      </div>
  )
}

export default page