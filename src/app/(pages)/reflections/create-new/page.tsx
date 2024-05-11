'use client'
import { ReflectionModelType } from '@prisma/client'
import { MotionConfig, motion } from 'framer-motion'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {
  model: ReflectionModelType
  index: number
}

function BigButton({ model, index }: Props) {
  return (
    <Link href={`./create-new/${model.toString()}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05, shadow: '10px' }}
        whileTap={{ scale: 0.95 }}
        className="flex aspect-square w-56 items-center justify-center rounded-md bg-secondary text-lg font-semibold hover:bg-foreground hover:text-background"
      >
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
