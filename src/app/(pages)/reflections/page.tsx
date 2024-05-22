'use client'
import React, { Suspense } from 'react'
import { DataTable } from '../../_components/data-table'
import { columns } from './columns'
import { Badge } from '@/components/ui/badge'
import { getReflections } from '@/app/server/actions/reflection'
import { Reflection } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

type Props = {}

function Page({}: Props) {
  const [reflections, setReflections] = React.useState<Reflection[]>([])
  const [activeTags, setActiveTags] = React.useState<string[]>([])
  const [tagButtons, setTagButtons] = React.useState<string[]>([])
  const [pending, setPending] = React.useState<boolean>(true)
  const [filteredReflections, setFilteredReflections] = React.useState<
    Reflection[]
  >([])
  React.useEffect(() => {
    getReflections().then((data) => setReflections(data)).finally(() => {
      setPending(false)
    })
  }, [])

  React.useEffect(() => {
    if (activeTags.length === 0) {
      const tags = reflections.flatMap((reflection) => reflection.tags)
      const uniqueTags = Array.from(new Set(tags))
      setTagButtons(uniqueTags)
    } else {
      const tags = filteredReflections.flatMap((reflection) => reflection.tags)
      const uniqueTags = Array.from(new Set(tags))
      setTagButtons(uniqueTags)
    }
  }, [reflections, filteredReflections, activeTags.length])

  const filterByTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      let updatedTags = activeTags.filter((t) => t !== tag)
      setActiveTags(updatedTags)
      updatedTags.forEach((t) => {
        setFilteredReflections(
          reflections.filter((reflection) => reflection.tags.includes(t)),
        )
      })
    } else {
      setActiveTags([...activeTags, tag])
      if (activeTags.length === 0) {
        setFilteredReflections(
          reflections.filter((reflection) => reflection.tags.includes(tag)),
        )
      } else {
        setFilteredReflections(
          filteredReflections.filter((reflection) =>
            reflection.tags.includes(tag),
          ),
        )
      }
    }
  }

  return (
    <div>
      <div className="my-4 flex items-center gap-4">
        Filter by tags:
        {tagButtons.map((tag) => (
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
      <DataTable
        columns={columns}
        data={activeTags.length ? filteredReflections : reflections}
        pending={pending}
      />
    </div>
  )
}

export default Page
