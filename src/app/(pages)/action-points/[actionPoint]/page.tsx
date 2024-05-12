'use server'

import { getActionPointById } from '@/app/server/actions/action-point'

async function Page({ params }: { params: { actionPoint: string } }) {
  const actionPoint = await getActionPointById(Number(params.actionPoint))
  return (
    <div className='w-full max-w-screen-md mx-auto'>
      <h1 className="text-2xl font-semibold capitalize">{actionPoint?.title}</h1>
      <p className="mb-4 font-mono text-sm text-gray-500">
        {actionPoint?.createdAt.toLocaleDateString()} - {actionPoint?.resolved ? 'Resolved' : 'Open'}
      </p>
      <p className="text-lg">{actionPoint?.content}</p>
    </div>
  )
}

export default Page
