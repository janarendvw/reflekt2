'use client'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
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
    <motion.div
      initial={{ x: '-30%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.05 * index }}
    >
      <Label className="capitalize" htmlFor={`id-for-${label}`}>
        {label}
      </Label>
      <Textarea
        id={`id-for-${label}`}
        placeholder={placeholder}
        value={content[index]}
        onChange={(e) => handleContentChange(index, e.target.value)}
        required
      />
    </motion.div>
  )
}

export default ReflectionField
