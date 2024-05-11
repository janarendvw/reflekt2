"use server"

import { getActionPointById } from "@/app/server/actions/action-point"

async function Page({params}: {params: {actionPoint: string}}) {

  const actionPoint = await getActionPointById(Number(params.actionPoint))
  return <div>{actionPoint?.title}</div>
}

export default Page
