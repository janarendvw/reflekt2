'use client'
import React, { Suspense } from 'react'
import { DataTable } from '../../_components/data-table'
import { columns } from './columns'
import { Badge } from '@/components/ui/badge'
import { getReflections } from '@/app/server/actions/reflection'
import { Reflection } from '@prisma/client'
import { Button } from '@/components/ui/button'

type Props = {}

function Page({}: Props) {
  const [reflections, setReflections] = React.useState<Reflection[]>([])
  const [activeTags, setActiveTags] = React.useState<string[]>([])
  const [filteredReflections, setFilteredReflections] = React.useState<
    Reflection[]
  >([])
  React.useEffect(() => {
    getReflections().then((data) => setReflections(data))
  }, [])

  const uniqueTags = reflections
    .map((reflection) => reflection.tags)
    .flat()
    .filter((tag, index, self) => self.indexOf(tag) === index)

  const filterByTag = (tag: string) => {
    const filteredReflections = reflections.filter((reflection) =>
      reflection.tags.includes(tag),
    )
    setActiveTags((prev) =>
      prev.includes(tag)
        ? prev.filter((activeTag) => activeTag !== tag)
        : [...prev, tag],
    )
    setFilteredReflections(filteredReflections)
  }

  return (
    <div>
      <div className="my-4 flex items-center gap-4">
        Filter by tags:
        {uniqueTags.map((tag) => (
          <Button
            onClick={() => filterByTag(tag)}
            variant={activeTags.includes(tag) ? 'default' : 'outline'}
            size={'sm'}
            key={tag}
          >
           # {tag}
          </Button>
        ))}
      </div>
      <DataTable
        columns={columns}
        data={activeTags.length ? filteredReflections : reflections}
      />
    </div>
  )
}

export default Page
