'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import ReflectionField from '../../_components/ReflectionField'
import { ReflectionModelType } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { createReflection } from '@/app/server/actions/reflection'
import { useSession } from 'next-auth/react'

type reflectionModelStructure = {
  DEFAULT: string[]
  STARR: string[]
  KORTHAGEN: string[]
}

const reflectionModelStructure = {
  DEFAULT: ['content'],
  STARR: ['situations', 'thoughts', 'actions', 'results', 'reflection'],
  KORTHAGEN: [
    'description',
    'thoughts',
    'feelings',
    'evaluation',
    'analysis',
    'conclusion',
  ],
}

function Page({ params }: { params: { model: ReflectionModelType } }) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string[]>([])
  const [pending, setPending] = useState<boolean>(false)
  const session = useSession()

  const handleSubmit = async () => {
    const reflection = {
      title: title,
      content: content,
      reflectionType: params.model,
      authorId: session?.data?.user?.id,
    }
    setPending(true)
    await createReflection(reflection).finally(() => setPending(false))
  }

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <Label htmlFor="reflection-title">Title</Label>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} id="reflection-title" className="max-w-screen-sm" />
      <div className="mt-8 flex flex-col gap-4">
        {reflectionModelStructure[params.model].map((field, index) => (
          <ReflectionField
            key={field}
            type="text"
            label={field}
            placeholder={`Enter ${field}`}
            content={content}
            setContent={setContent}
            index={index}
          />
        ))}
        <Button disabled={pending} onClick={() => handleSubmit()} className="w-32 self-end">Save</Button>
      </div>
    </div>
  )
}

export default Page
