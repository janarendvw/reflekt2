import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'


function page({params}: {params: {modelType: string}}) {
  return (
    <div>
        <Label htmlFor='reflection-title'>Title</Label>
        <Input id='reflection-title' className='max-w-screen-sm' />
    </div>
  )
}

export default page