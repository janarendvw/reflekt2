import prisma from '@/lib/client'
import React from 'react'
import { ReflectionContent } from './_components/ReflectionContent'
import { Separator } from '@/components/ui/separator'

import { Zap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { auth } from '@/auth'
import ActionPointCard from '@/app/_components/action-point-card'

async function page({ params }: { params: { reflection: string } }) {
  const session = await auth()

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
      if (res?.authorId === session?.user?.id) {
        return res ?? undefined
      }
      return undefined
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
      <div className="min-h-[30vh]">
        <ReflectionContent content={reflection?.content ?? []} />
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        Tags:{' '}
        {reflection?.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-muted-foreground">
            #{tag}
          </Badge>
        ))}
      </div>

      <Separator className="my-8" />
      <h2 className="mb-2 font-semibold">Unresolved action points</h2>
      <div className="flex flex-col gap-2">
        {unresolvedActionPoints?.map((ap, index) => (
          <ActionPointCard key={ap.title} actionPoint={ap} index={index} />
        ))}
      </div>
      {unresolvedActionPoints?.length === 0 && (
        <Alert className="border-dashed">
          <Zap className="stroke-muted-foreground" size={16} />
          <AlertTitle>No unresolved action points</AlertTitle>
          <p className="text-sm text-muted-foreground">
            You have no unresolved action points. Keep up the good work!
          </p>
        </Alert>
      )}
      <h2 className="mb-2 mt-14 font-semibold">Resolved action points</h2>
      <div className="flex flex-col gap-2">
        {resolvedActionPoints?.map((ap, index) => (
          <ActionPointCard
            resolved
            key={ap.title}
            actionPoint={ap}
            index={index}
            resolution={ap.resolution}
          />
        ))}
      </div>
      {resolvedActionPoints?.length === 0 && (
        <Alert className="border-dashed">
          <Zap className="stroke-muted-foreground" size={16} />
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
