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
      <Accordion type="single" collapsible className="w-full">
        {unresolvedActionPoints?.map((ap) => (
          <AccordionItem key={ap.content} value={ap.title}>
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <Zap size={16} />
                {ap.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>{ap.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <h2 className="mb-4 mt-14 font-semibold">Resolved action points</h2>
      <Accordion type="single" collapsible className="w-full">
        {resolvedActionPoints?.map((ap) => (
          <AccordionItem key={ap.content} value={ap.title}>
            <AccordionTrigger>
              <span className="flex items-center gap-2">
                <Zap size={16} className="fill-foreground" />
                {ap.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>{ap.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default page
