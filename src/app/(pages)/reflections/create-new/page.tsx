'use client'
import { ReflectionModelType } from '@prisma/client'
import { MotionConfig, motion } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {
  model: ReflectionModelType
  index: number
}

function BigButton ({model, index}: Props) {
  return (
    <Link href={`./create-new/${model}`}>
      <motion.div initial={{opacity: 0}} animate={{opacity:1}} transition={{delay: index*0.1}} className="flex aspect-square w-56 items-center justify-center rounded bg-secondary text-lg font-semibold hover:bg-foreground hover:text-background">
      {model.toString()}
      </motion.div>

    </Link>
  )
}

function Page() {
  const models = Object.values(ReflectionModelType)

  return (
    <div className="min-h-sreen flex w-full flex-col items-center justify-center">
      <div className="mx-auto flex flex-col items-center gap-8">
        <h1 className="text-2xl font-semibold">Select a model</h1>
        <div className="flex gap-4">
          {models.map((model, index) => (
            <BigButton key={model} model={model} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
