import prisma from '@/lib/client'
import React from 'react'
import { ReflectionContent } from './_components/ReflectionContent'
import { Separator } from '@/components/ui/separator'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Zap } from 'lucide-react'

async function page({ params }: { params: { reflection: string } }) {
  const reflection = await prisma.reflection
    .findUnique({
      where: {
        id: Number(params.reflection),
      },
      include: {
        actionPoints: true,
      },
    })
    .then((res) => {
      return res ?? undefined
    })

  const resolvedActionPoints = reflection?.actionPoints.filter(
    (ap) => ap.resolved,
  )
  const unresolvedActionPoints = reflection?.actionPoints.filter(
    (ap) => !ap.resolved,
  )

  return (
    <div className="mx-auto flex w-full max-w-screen-md flex-col">
      <h1 className="text-2xl font-semibold capitalize">{reflection?.title}</h1>
      <p className="mb-4 font-mono text-sm text-gray-500">
        {reflection?.createdAt.toLocaleDateString()} -{' '}
        {reflection?.reflectionType} model
      </p>
      <ReflectionContent content={reflection?.content ?? []} />
      <h2 className="mb-4 mt-14 font-semibold">Unresolved action points</h2>
      {unresolvedActionPoints?.map((ap) => (
        <Card key={ap.content} className="mb-4">
          <CardHeader>
            <CardTitle>{ap.title}</CardTitle>
          </CardHeader>
          <CardContent>{ap.content}</CardContent>
        </Card>
      ))}
      <h2 className="mb-4 mt-14 font-semibold">Resolved action points</h2>
      {resolvedActionPoints?.map((ap) => (
        <Card key={ap.content} className="mb-4">
          <CardHeader>
            <CardTitle>{ap.title}</CardTitle>
          </CardHeader>
          <CardContent>{ap.content}</CardContent>
        </Card>
      ))}
    </div>
  )
}

export default page
