'use client'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { ActionPoint } from '@prisma/client'
import React from 'react'
import { resolveActionPointById } from '../server/actions/action-point'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DialogClose } from '@radix-ui/react-dialog'
import { Input } from '@/components/ui/input'

type ResolveActionPointFormProps = {
  actionPoint: ActionPoint
}

function ResolveActionPointForm({ actionPoint }: ResolveActionPointFormProps) {
  const router = useRouter()

  const [resolution, setResolution] = React.useState('')
  const [proof, setProof] = React.useState<string>()
  const [proofArray, setProofArray] = React.useState<string[]>([])

  const handleResolve = async () => {
    await resolveActionPointById(actionPoint.id, resolution, proofArray).then(() => {
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
        <div className="flex flex-col gap-2 pt-4">
          <Label htmlFor="resolution">Resolution</Label>
          <Textarea
            onChange={e => setResolution(e.target.value)}
            value={resolution}
            id="resolution"
            className="h-24"
            placeholder="Explain how you managed to hit your target"
          />
        </div>
        <div className="flex flex-col gap-2 py-4">
          <Label htmlFor="proof-of-resolution">Proof of resolution</Label>
          <div className="flex gap-2">
            <Input
              onChange={e => setProof(e.target.value)}
              value={proof}
              id="proof-of-resolution"
              placeholder="Add proof in the form of links to any evidence regarding your target"
            />
            <Button
              size={'sm'}
              onClick={() => {
                proof && setProofArray([...proofArray, proof])
                setProof('')
              }}
            >
              Add link
            </Button>
          </div>
          {proofArray.length > 0 && (
            <div className="flex flex-col gap-2">
              {proofArray.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input value={link} readOnly className='bg-secondary'/>
                  <Button
                    size={'sm'}
                    variant={'destructive'}
                    onClick={() => setProofArray(proofArray.filter(item => item !== link))}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
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
