'use client'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

type Props = {
  type: string
  label: string
  placeholder: string
  content: string[]
  setContent: (content: string[]) => void
  index: number
}

function ReflectionField({
  label,
  placeholder,
  content,
  setContent,
  index,
}: Props) {
  const handleContentChange = (index: number, value: string) => {
    const newContent = [...content]
    newContent[index] = value
    setContent(newContent)
  }

  return (
    <div>
      <Label className="capitalize" htmlFor={`id-for-${label}`}>
        {label}
      </Label>
      <Textarea
        className="h-24"
        id={`id-for-${label}`}
        placeholder={placeholder}
        value={content[index]}
        onChange={(e) => handleContentChange(index, e.target.value)}
        required
      />
    </div>
  )
}

export default ReflectionField
