import { Input } from '@/components/ui/input'
import { AnimatePresence, motion } from 'framer-motion'
import { Regex, Tag, X } from 'lucide-react'
import React from 'react'

type Props = {
  title: string
  setTitle: (title: string) => void
  tags: string[]
  setTags: (tags: string[]) => void
}

function PageMetadata({ title, setTitle, tags, setTags }: Props) {
  const [tagInput, setTagInput] = React.useState<string>('')

  const addTag = () => {
    if (tagInput.length === 0) return
    setTags([...tags, tagInput.toLowerCase()])
    setTagInput('')
  }

  const removeLastTag = () => {
    if (tagInput.length === 0) {
      setTags(tags.slice(0, -1))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Space' || e.code === 'Enter' || e.code === 'Tab') {
      addTag()
    }
    if (e.code === 'Backspace') {
      removeLastTag()
    }
  }

  return (
    <motion.div>
      <h5 className="mb-2 flex items-center gap-2 text-lg font-bold">
        Think of a fitting title{' '}
        <Regex size={16} className="text-muted-foreground" />
      </h5>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={'Enter a title'}
        id="reflection-title"
      />
      <h5 className="mb-2 mt-8 flex items-center gap-2 text-lg font-bold">
        Categorize your reflection using tags{' '}
        <Tag size={16} className="text-muted-foreground" />
      </h5>
      <div className="flex items-center gap-2 rounded-md border border-border px-3 py-2 focus-within:border-primary">
        <AnimatePresence mode="popLayout">
          {tags.map((tag, index) => (
            <motion.div
              layoutId={tag + index}
              transition={{ duration: 0.15 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={tag}
              className="flex items-center gap-2 rounded-md bg-secondary px-2 py-1"
            >
              <span className="text-xs font-semibold tracking-wide text-foreground">
                {tag}
              </span>
              <button
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setTags(tags.filter((t) => t !== tag))}
              >
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.input
          transition={{ duration: 0.15 }}
          className="w-full appearance-none bg-transparent text-sm text-foreground outline-none placeholder:text-sm placeholder:text-muted-foreground"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value.replace(/\s/g, '') || '')}
          onKeyDown={(e) => handleKeyDown(e)}
          placeholder={
            !tags.length ? 'Separate tags by pressing space' : undefined
          }
        />
      </div>
    </motion.div>
  )
}

export default PageMetadata
