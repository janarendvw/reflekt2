'use client'
import React, { useState } from 'react'
import { ReflectionModelType } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { createReflection } from '@/app/server/actions/reflection'
import { useSession } from 'next-auth/react'

import PageMetadata from './_page-components/page-metadata'
import PageReflection from './_page-components/page-reflection'
import PageActionPoints from './_page-components/page-actionpoints'
import { Sparkle } from 'lucide-react'
import { motion } from 'framer-motion'
import Loader from '@/app/_components/loader/loader'

function Page({ params }: { params: { model: ReflectionModelType } }) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
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
      tags: tags,
    }
    setPending(true)
    await createReflection(reflection, actionPoints).finally(() =>
      setPending(false),
    )
  }

  return (
    <div className="mx-auto grid w-full max-w-screen-md auto-rows-max grid-cols-1 flex-col justify-center">
      <h1 className="row-start-1 mb-8 flex items-center gap-2 text-3xl font-bold">
        {page !== 0 && title.length > 3 ? (
          title
        ) : (
          <>
            New reflection <Sparkle size={24} />
          </>
        )}
      </h1>
      <div className="row-start-2">
        {page === 0 && (
          <PageMetadata
            title={title}
            setTitle={setTitle}
            tags={tags}
            setTags={setTags}
          />
        )}
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
      </div>

      <motion.div
        layoutId="form-controls"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        id="form-controls"
        className="row-start-3 my-8 flex w-full items-center justify-between gap-8 "
      >
        {page !== 0 ? (
          <Button
            tabIndex={1}
            className="w-1/6"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            variant={'secondary'}
          >
            Previous
          </Button>
        ) : (
          <span id="placeholder"></span>
        )}
        <Button
        tabIndex={0}
          disabled={pending}
          variant={!actionPoints.length && page === 2 ? 'secondary' : 'default'}
          className="flex w-1/3 items-center gap-2"
          onClick={() => (page < 2 ? setPage(page + 1) : handleSubmit())}
        >
          {pending && (
            <div>
              <Loader />
            </div>
          )}{' '}
          {page < 2 ? 'Next' : 'Submit'}
        </Button>
      </motion.div>
    </div>
  )
}

export default Page
