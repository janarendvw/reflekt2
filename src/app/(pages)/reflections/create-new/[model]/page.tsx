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
import PageFinalize from './_page-components/page-finalize'

function Page({ params }: { params: { model: ReflectionModelType } }) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string[]>([])
  const [pending, setPending] = useState<boolean>(false)
  const [page, setPage] = useState<number>(0)
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
    <div className="mx-auto flex h-[80%] w-full max-w-screen-md flex-col justify-center">
      {page === 0 && <PageMetadata title={title} setTitle={setTitle} />}
      {page === 1 && (
        <PageReflection
          content={content}
          setContent={setContent}
          model={params.model}
        />
      )}
      {page === 2 && (
        <PageActionPoints
          actionPoints={actionPoints}
          setActionPoints={setActionPoints}
        />
      )}

      {page === 3 && (
        <PageFinalize actionPoints={actionPoints} handleSubmit={handleSubmit} />
      )}
      <div id="form-controls" className="w-full flex items-center justify-between my-8 ">
        {page !== 0 ? (
          <Button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            variant={'secondary'}
          >
            Previous
          </Button>
        ) : <span id='placeholder'></span>}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === 3}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Page
