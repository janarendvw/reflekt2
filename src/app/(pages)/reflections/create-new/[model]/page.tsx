'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import ReflectionField from '../../_components/ReflectionField'
import { ActionPoint, ReflectionModelType } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { createReflection } from '@/app/server/actions/reflection'
import { useSession } from 'next-auth/react'
import {
  Info,
  PartyPopper,
  PlusCircle,
  Save,
  Sparkle,
  Sparkles,
  Zap,
} from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { set } from 'react-hook-form'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'

type reflectionModelStructure = {
  DEFAULT: string[]
  STARR: string[]
  KORTHAGEN: string[]
}

const reflectionModelStructure = {
  DEFAULT: ['content'],
  STARR: ['situations', 'thoughts', 'actions', 'results', 'reflection'],
  KORTHAGEN: [
    'description',
    'thoughts',
    'feelings',
    'evaluation',
    'analysis',
    'conclusion',
  ],
}

function Page({ params }: { params: { model: ReflectionModelType } }) {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string[]>([])
  const [pending, setPending] = useState<boolean>(false)
  const [acionPointTitle, setActionPointTitle] = useState<string>('')
  const [actionPointContent, setActionPointContent] = useState<string>('')
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

  const addActionPoint = () => {
    setActionPoints([
      ...actionPoints,
      { title: acionPointTitle, content: actionPointContent },
    ])
    setActionPointTitle('')
    setActionPointContent('')
  }

  const deleteActionPoint = (index: number) => {
    const newActionPoints = actionPoints.filter((_, i) => i !== index)
    setActionPoints(newActionPoints)
  }

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <h1 className="relative mb-8 flex items-center gap-2 text-2xl font-semibold">
        Create a new reflection <Sparkles />
        <div className="absolute -left-16 top-1/2 flex aspect-square -translate-y-1/2 items-center justify-center rounded-md border border-border px-2 text-sm text-muted-foreground">
          1
        </div>
      </h1>
      <Label htmlFor="reflection-title">Title</Label>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={'Enter a title'}
        id="reflection-title"
      />
      <div className="mt-4 flex flex-col gap-2">
        {reflectionModelStructure[params.model].map((field, index) => (
          <ReflectionField
            key={field}
            type="text"
            label={field}
            placeholder={`Enter ${field}`}
            content={content}
            setContent={setContent}
            index={index}
          />
        ))}
      </div>
      <h1 className="relative mb-8 mt-24 flex items-center gap-2 text-2xl font-semibold">
        Add action-points <Zap />
        <div className="absolute -left-16 top-1/2 flex aspect-square -translate-y-1/2 items-center justify-center rounded-md border border-border px-2 text-sm text-muted-foreground">
          2
        </div>
      </h1>
      <div className="my-8 flex flex-col gap-4">
        <AnimatePresence mode="sync">
          {actionPoints.length ? (
            actionPoints.map((actionPoint, index) => {
              return (
                <motion.div
                  key={actionPoint.title}
                  layoutId={actionPoint.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="line-clamp-1 flex items-center justify-between gap-2 rounded-md border border-border px-4 py-2"
                >
                  <div className="flex items-center gap-2">
                    <Zap />
                    <div>
                      <h4 className="line-clamp-1 font-semibold capitalize">
                        {actionPoint.title}
                      </h4>
                      <p className="line-clamp-1">{actionPoint.content}</p>
                    </div>
                  </div>
                  <Button
                    variant={'destructive'}
                    size={'sm'}
                    onClick={() => deleteActionPoint(index)}
                  >
                    Remove
                  </Button>
                </motion.div>
              )
            })
          ) : (
            <span className="text-muted-foreground">
              No action-points have been added yet...{' '}
            </span>
          )}
        </AnimatePresence>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant={actionPoints.length < 1 ? 'default' : 'outline'}
              className="flex w-fit items-center gap-2"
            >
              <PlusCircle size={16} /> {actionPoints.length > 0 ? 'Add another' : 'Add one'}
            </Button>
          </DialogTrigger>
          <DialogContent className="container">
            <DialogHeader>
              <DialogTitle>Create new action-point</DialogTitle>
              <DialogDescription>
                <Alert
                  variant={'default'}
                  className="text-info-foreground bg-info"
                >
                  <Info className="stroke-info-foreground" />
                  <AlertTitle>
                    Want a little help creating amazing and tangible goals?
                    {'//TODO: add link to action-point guide here'}
                  </AlertTitle>
                  <AlertDescription>
                    <u>Check it here</u>
                  </AlertDescription>
                </Alert>
              </DialogDescription>
            </DialogHeader>
            <div>
              <Label htmlFor="action-point-title">Title</Label>
              <Input
                value={acionPointTitle}
                onChange={(e) => setActionPointTitle(e.target.value)}
                placeholder={'Enter a title'}
                id="action-point-title"
              />
            </div>
            <div>
              <Label htmlFor="action-point-content">Content</Label>
              <Textarea
                id="action-point-content"
                placeholder="Describe your planned improvement well and make it concrete."
                className="h-56"
                value={actionPointContent}
                onChange={(e) => setActionPointContent(e.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={() => addActionPoint()}>
                  Save changes
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <h1 className="relative mb-8 mt-24 flex items-center gap-2 text-2xl font-semibold">
        Make it official <PartyPopper />
        <div className="absolute -left-16 top-1/2 flex aspect-square -translate-y-1/2 items-center justify-center rounded-md border border-border px-2 text-sm text-muted-foreground">
          3
        </div>
      </h1>
      <Button
        variant={actionPoints.length > 0 ? 'default' : 'outline'}
        onClick={() => handleSubmit()}
        className="flex w-32 items-center gap-2"
      >
        <Save size={16} /> Save
      </Button>
    </div>
  )
}

export default Page
