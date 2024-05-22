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
import ActionPoint from '@/app/_components/action-point'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle } from '@/components/ui/alert'

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
      <p className="mb-8 font-mono text-sm text-gray-500">
        {reflection?.createdAt.toLocaleDateString()} -{' '}
        {reflection?.reflectionType} model
      </p>
      <ReflectionContent content={reflection?.content ?? []} />
      <div className="mt-4 flex gap-4">
        {reflection?.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-muted-foreground">
            #{tag}
          </Badge>
        ))}
      </div>
      <Separator className="mt-8" />
      <h2 className="mt-14 font-semibold mb-1">Unresolved action points</h2>
      <div className="flex flex-col gap-2">
        {unresolvedActionPoints?.map((ap, index) => (
          <ActionPoint key={ap.title} actionPoint={ap} index={index} />
        ))}
      </div>
      {unresolvedActionPoints?.length === 0 && (
        <Alert className='border-dashed'>
          <Zap className='stroke-muted-foreground' size={16}/>
          <AlertTitle>No unresolved action points</AlertTitle>
          <p className="text-sm text-muted-foreground">
            You have no unresolved action points. Keep up the good work!
          </p>
        </Alert>
      )}
      <h2 className="mt-14 font-semibold mb-1">Resolved action points</h2>
      <div className="flex flex-col gap-2">
        {resolvedActionPoints?.map((ap, index) => (
          <ActionPoint
            resolved
            key={ap.title}
            actionPoint={ap}
            index={index}
          />
        ))}
      </div>
      {resolvedActionPoints?.length === 0 && (
        <Alert className='border-dashed'>
          <Zap className='stroke-muted-foreground' size={16}/>
          <AlertTitle>No resolved action points</AlertTitle>
          <p className="text-sm text-muted-foreground">
            You have no resolved action points. Keep up the good work!
          </p>
        </Alert>
      )}
    </div>
  )
}

export default page
