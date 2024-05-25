import ActionPoint from '@/app/_components/action-point'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AnimatePresence, motion } from 'framer-motion'
import { PlusCircle, Info, Zap, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type AddActionPointProps = {
  actionPoints: { title: string; content: string }[]
  setActionPoints: (actionPoints: { title: string; content: string }[]) => void
}

function AddActionPoint({
  actionPoints,
  setActionPoints,
}: AddActionPointProps) {
  const [acionPointTitle, setActionPointTitle] = useState<string>('')
  const [actionPointContent, setActionPointContent] = useState<string>('')
  const addButtonRef = React.useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (addButtonRef.current) {
      addButtonRef.current.focus({focusVisible: true} as FocusOptions)
    }
  }
  , [])

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
    <>
      <AnimatePresence mode="popLayout">
        {actionPoints.length ? (
          actionPoints.map((actionPoint, index) => {
            return (
             <ActionPoint key={actionPoint.title} actionPoint={actionPoint} index={index} deleteActionPoint={deleteActionPoint} />
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
            ref={addButtonRef}
            variant={actionPoints.length < 1 ? 'default' : 'outline'}
            className="flex w-fit items-center gap-2"
          >
            <PlusCircle size={16} />{' '}
            {actionPoints.length > 0 ? 'Add another' : 'Add one'}
          </Button>
        </DialogTrigger>
        <DialogContent className="container">
          <DialogHeader>
            <DialogTitle>Create new action-point</DialogTitle>
            <DialogDescription>
              <Alert
                variant={'default'}
                className="bg-info text-info-foreground"
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
    </>
  )
}

export default AddActionPoint
