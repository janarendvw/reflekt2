import React, { useState } from 'react'
import ReflectionField from '../../../_components/ReflectionField'
import { ReflectionModelType } from '@prisma/client'
import { NotebookPen, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Props = {
  content: string[]
  setContent: (content: string[]) => void
  model: ReflectionModelType
}

let reflectionModelStructure = {
  DEFAULT: ['content'],
  STARR: ['situations', 'thoughts', 'actions', 'results', 'reflection'],
  KORTHAGEN: ['description', 'thoughts', 'feelings', 'evaluation', 'analysis', 'conclusion'],
}

function PageReflection({ content, setContent, model }: Props) {
  const [fields, setFields] = useState(reflectionModelStructure[model])
  const [newFieldTitle, setNewFieldTitle] = useState('')

  const createAdditionalField = () => {
    setFields([...fields, newFieldTitle])
    setNewFieldTitle('')
  }

  return (
    <div className="flex flex-col gap-2">
      <h5 className="mb-2 mt-8 flex items-center gap-2 text-lg font-bold">
        {model === 'DEFAULT' ? 'Write your reflection' : 'Fill in the fields'}
        <NotebookPen size={16} className="text-muted-foreground" />
      </h5>
      {fields.map((field, index) => (
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

      <div className="flex items-center gap-px mt-4">
        <Input  placeholder='Enter a title for an additional field' className='rounded-r-none' value={newFieldTitle} onChange={(e) => setNewFieldTitle(e.target.value)} />
        <Button
          disabled={!newFieldTitle}
          variant="secondary"
          size={'sm'}
          className="flex w-fit items-center gap-2 rounded-l-none"
          onClick={() => createAdditionalField()}
        >
          <PlusCircle size={16} />
          Create
        </Button>
      </div>
    </div>
  )
}

export default PageReflection
