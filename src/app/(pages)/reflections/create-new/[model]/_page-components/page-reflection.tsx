import React from 'react'
import ReflectionField from '../../../_components/ReflectionField'
import { ReflectionModelType } from '@prisma/client'
import { NotebookPen } from 'lucide-react'

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
    <div className="flex flex-col gap-2">
         <h5 className="mb-2 mt-8 flex items-center gap-2 text-lg font-bold">
      {model === 'DEFAULT' ? 'Write your reflection' : 'Fill in the fields'} <NotebookPen size={16} className="text-muted-foreground" />
      </h5>
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