'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ReflectionModelType } from '@prisma/client'
import { MotionConfig, motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {
  model: ReflectionModelType
  index: number
}

function BigButton({ model, index }: Props) {
  let content = ''
  if (model === ReflectionModelType.DEFAULT) {
    content = 'A clean slate to reflect on your experiences'
  }
  if (model === ReflectionModelType.STARR) {
    content = 'Situational factors, Task, Action, Results, Reflection'
  }
  if (model === ReflectionModelType.KORTHAGEN) {
    content =
      'Korthagen model for reflection on professional practice. observation, description, analysis, theory, experiment, evaluation, and integration'
  }
  return (
    <Link href={`./create-new/${model.toString()}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 * index }}
        whileTap={{ scale: 1 }}
      >
        <Card className="rounded-md shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-semibold capitalize">
              {model}
            </CardTitle>
            <CardDescription>
              Start a new reflection using the {model} model
            </CardDescription>
          </CardHeader>
          <CardContent>{content}</CardContent>
          <CardFooter>
            <Button variant="secondary" className="uppercase">
              Use {model} <ChevronRight size={16} className="ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  )
}

function Page() {
  const models = Object.values(ReflectionModelType)

  return (
    <div className="min-h-sreen flex w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-screen-md flex-col gap-8">
        <h1 className="text-2xl font-semibold">Select a model</h1>
        <div className="flex flex-col gap-4">
          {models.map((model, index) => (
            <BigButton key={model} model={model} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Page
