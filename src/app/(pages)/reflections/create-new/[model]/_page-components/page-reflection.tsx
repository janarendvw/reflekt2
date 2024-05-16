import React from 'react'
import ReflectionField from '../../../_components/ReflectionField'
import { ReflectionModelType } from '@prisma/client'

type Props = {
    content: string[]
    setContent: (content: string[]) => void
    model: ReflectionModelType
}

const reflectionModelStructure = {
    DEFAULT: ['content'],
    STARR: ['situations', 'thoughts', 'actions', 'results', 'reflection'],
    KORTHAGEN: [
      'description',
      'thoughts',
      'feelings',
      'evaluation',
      'analysis',
      'conclusion',
    ],
  }

function PageReflection({content, setContent, model}: Props) {
  return (
    <div className="mt-4 flex flex-col gap-2">
    {reflectionModelStructure[model].map((field, index) => (
      <ReflectionField
        key={field}
        type="text"
        label={field}
        placeholder={`Enter ${field}`}
        content={content}
        setContent={setContent}
        index={index}
      />
    ))}
  </div>
  )
}

export default PageReflection