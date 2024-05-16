'use client'
import React, { useState } from 'react'
import { ActionPoint, ReflectionModelType } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { createReflection } from '@/app/server/actions/reflection'
import { useSession } from 'next-auth/react'
import { PartyPopper, Save, Zap } from 'lucide-react'

import AddActionPoint from './_components/AddActionPoint'
import PageMetadata from './_page-components/page-metadata'
import PageReflection from './_page-components/page-reflection'
import PageActionPoints from './_page-components/page-actionpoints'

function Page({ params }: { params: { model: ReflectionModelType } }) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string[]>([])
  const [pending, setPending] = useState<boolean>(false)
  const [actionPoints, setActionPoints] = useState<
    { title: string; content: string }[]
  >([])
  const session = useSession()

  const handleSubmit = async () => {
    const reflection = {
      title: title,
      content: content,
      reflectionType: params.model,
      authorId: session?.data?.user?.id,
    }
    setPending(true)
    await createReflection(reflection, actionPoints).finally(() =>
      setPending(false),
    )
  }

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <PageMetadata title={title} setTitle={setTitle} />
      <PageReflection
        content={content}
        setContent={setContent}
        model={params.model}
      />
      <PageActionPoints
        actionPoints={actionPoints}
        setActionPoints={setActionPoints}
      />

      <h1 className="relative mb-8 mt-24 flex items-center gap-2 text-2xl font-semibold">
        Make it official <PartyPopper />
        <div className="absolute -left-16 top-1/2 flex aspect-square -translate-y-1/2 items-center justify-center rounded-md border border-border px-2 text-sm text-muted-foreground">
          3
        </div>
      </h1>
      <Button
        variant={actionPoints.length > 0 ? 'default' : 'outline'}
        onClick={() => handleSubmit()}
        className="flex w-32 items-center gap-2"
      >
        <Save size={16} /> Save
      </Button>
    </div>
  )
}

export default Page
