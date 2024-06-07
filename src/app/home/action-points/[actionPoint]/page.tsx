'use server'

import ResolveActionPointForm from '@/app/_components/resolve-action-point-form'
import { getActionPointById } from '@/app/server/actions/action-point'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { CheckCircle, FileCheck2 } from 'lucide-react'

async function Page({ params }: { params: { actionPoint: string } }) {
  const actionPoint = await getActionPointById(Number(params.actionPoint))

  return (
    <div className="mx-auto w-full max-w-screen-md">
      <h1 className="text-2xl font-semibold capitalize">{actionPoint?.title}</h1>
      <div className="mb-4 font-mono text-sm text-gray-500">
        {actionPoint?.createdAt.toLocaleDateString()} -{' '}
        {actionPoint?.resolved ? <Badge className="text-success font-bold bg-success/10">Resolved</Badge> : 'Open'}
      </div>
      <p className="text-lg">{actionPoint?.content}</p>
      {actionPoint?.resolution ? (
        <>
          <div>
            <h2 className="text-success bg-success/10 mt-16 flex items-center gap-2 rounded-md px-3 py-2 font-semibold capitalize">
              <CheckCircle size={16} />
              Resolution
            </h2>
            <p className="mt-2 p-4">{actionPoint.resolution}</p>
          </div>

          <h2 className="text-foreground bg-foreground/5 mt-12 flex items-center gap-2 rounded-md px-3 py-2 font-semibold capitalize">
            <FileCheck2 size={16} />
            Proof of resolution
          </h2>

          <div className="mt-2 flex flex-col gap-2 p-4">
            {actionPoint.attatchments.map((proof, i) => (
              <a key={i} href={proof} className="underline">
                {proof}
              </a>
            ))}
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
