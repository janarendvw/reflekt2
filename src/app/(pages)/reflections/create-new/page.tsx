import { ReflectionModelType } from '@prisma/client'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

async function BigButton({
  model,
}: {
  model: ReflectionModelType
}) {
  return (
    <Link
      href={`./create-new/${model}`}
      className="flex aspect-square w-56 items-center justify-center rounded bg-secondary text-lg font-semibold hover:bg-foreground hover:text-background"
    >
      {model.toString()}
    </Link>
  )
}

async function Page({}: Props) {

  const models = Object.values(ReflectionModelType)

    return (
      <div className="min-h-sreen flex w-full flex-col items-center justify-center">
        <div className="mx-auto flex flex-col items-center gap-8">
          <h1 className="text-2xl font-semibold">Select a model</h1>
          <div className="flex gap-4">
            {models.map((model) => (
              <BigButton key={model} model={model} />
            ))}
          </div>
        </div>
      </div>
    )
}

export default Page
