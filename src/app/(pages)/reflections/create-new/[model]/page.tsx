import React from 'react'

type Props = {}

function page({params}: {params: {modelType: string}}) {
  return (
    <div>{params.modelType}</div>
  )
}

export default page