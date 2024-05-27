'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { ActionPoint } from '@prisma/client'
import React from 'react'
import { resolveActionPointById } from '../server/actions/action-point'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DialogClose } from '@radix-ui/react-dialog'

type ResolveActionPointFormProps = {
  actionPoint: ActionPoint
}

function ResolveActionPointForm({ actionPoint }: ResolveActionPointFormProps) {
  const router = useRouter()

  const [resolution, setResolution] = React.useState('')

  const handleResolve = async () => {
    await resolveActionPointById(actionPoint.id, resolution).then(() => {
      router.refresh()
    })
  }

  return (
    <DialogPortal>
      <DialogContent className="max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>Resolve actionpoint</DialogTitle>
          <DialogDescription>
            Resolve the action point by defining the actions taken and their results
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Label htmlFor="resolution">Resolution</Label>
          <Textarea onChange={e => setResolution(e.target.value)} value={resolution} id="resolution" className="h-56" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" className="flex items-center gap-2" onClick={() => handleResolve()}>
              <CheckCircle size={16} />
              Resolve
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </DialogPortal>
  )
}

export default ResolveActionPointForm
