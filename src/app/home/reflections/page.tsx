'use client'
import { DataTable } from '../../_components/data-table'
import { columns } from './columns'
import { getReflections } from '@/app/server/actions/reflection'
import { Reflection } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {}

function Page({}: Props) {
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [tagButtons, setTagButtons] = useState<string[]>([])
  const [pending, setPending] = useState<boolean>(true)
  const [filteredReflections, setFilteredReflections] = useState<Reflection[]>([])

  useEffect(() => {
    getReflections()
      .then(data => setReflections(data))
      .finally(() => {
        setPending(false)
      })
  }, [])

  useEffect(() => {
    if (activeTags.length === 0) {
      const tags = reflections.flatMap(reflection => reflection.tags)
      const uniqueTags = Array.from(new Set(tags))
      setTagButtons(uniqueTags)
    } else {
      const tags = filteredReflections.flatMap(reflection => reflection.tags)
      const uniqueTags = Array.from(new Set(tags))
      setTagButtons(uniqueTags)
    }
  }, [reflections, filteredReflections, activeTags.length])

  const filterByTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      let updatedTags = activeTags.filter(t => t !== tag)
      setActiveTags(updatedTags)
      updatedTags.forEach(t => {
        setFilteredReflections(reflections.filter(reflection => reflection.tags.includes(t)))
      })
    } else {
      setActiveTags([...activeTags, tag])
      if (activeTags.length === 0) {
        setFilteredReflections(reflections.filter(reflection => reflection.tags.includes(tag)))
      } else {
        setFilteredReflections(filteredReflections.filter(reflection => reflection.tags.includes(tag)))
      }
    }
  }

  return (
    <div>
      <div className="my-4 flex items-center gap-4">
        Filter by tags:
        {tagButtons.map(tag => (
          <motion.div key={tag} layoutId={tag} transition={{ duration: 0.15 }}>
            <Button
              onClick={() => filterByTag(tag)}
              variant={activeTags.includes(tag) ? 'default' : 'outline'}
              size={'sm'}
            >
              # {tag}
            </Button>
          </motion.div>
        ))}
      </div>
      <DataTable columns={columns} data={activeTags.length ? filteredReflections : reflections} pending={pending} />
    </div>
  )
}

export default Page
