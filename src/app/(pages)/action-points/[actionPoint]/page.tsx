'use server'

import ResolveActionPointForm from '@/app/_components/resolve-action-point-form'
import { getActionPointById } from '@/app/server/actions/action-point'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { CheckCircle } from 'lucide-react'

async function Page({ params }: { params: { actionPoint: string } }) {
  const actionPoint = await getActionPointById(Number(params.actionPoint))

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <h1 className="text-2xl font-semibold capitalize">{actionPoint?.title}</h1>
      <p className="mb-4 font-mono text-sm text-gray-500">
        {actionPoint?.createdAt.toLocaleDateString()} -{' '}
        {actionPoint?.resolved ? <span className="text-primary">Resolved</span> : 'Open'}
      </p>
      <p className="text-lg">{actionPoint?.content}</p>
      {actionPoint?.resolution ? (
        <>
          <Separator className="my-8" />
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold capitalize text-primary">
              <CheckCircle size={16} />
              Resolution
            </h2>
            <p>{actionPoint.resolution}</p>
          </div>
        </>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-8">Resolve</Button>
          </DialogTrigger>
          {actionPoint && <ResolveActionPointForm actionPoint={actionPoint} />}
        </Dialog>
      )}
    </div>
  )
}

export default Page
