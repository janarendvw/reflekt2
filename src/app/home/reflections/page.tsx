'use client'
import { columns } from './columns'
import { getReflections } from '@/app/server/actions/reflection'
import { Reflection } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { DataTable } from '@/app/home/reflections/_components/data-table'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Hash, X, XCircle } from 'lucide-react'

type Props = {}

function Page({}: Props) {
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [activeTags, setActiveTags] = useState<string[]>([])
  const [remainingTags, setRemainingTags] = useState<string[]>([])
  const [tagButtons, setTagButtons] = useState<string[]>([])
  const [pending, setPending] = useState<boolean>(true)
  const [filteredReflections, setFilteredReflections] = useState<Reflection[]>([])
  const [open, setOpen] = useState<boolean>(false)
  
const tagsRef = useRef<string[]>([])
const uniqueTagsRef = useRef<string[]>([])

  useEffect(() => {
    getReflections()
      .then(data => setReflections(data))
      .finally(() => {
        setPending(false)
      })
  }, [])


useEffect(() => {
  tagsRef.current = reflections.map(reflection => reflection.tags).flat()
  uniqueTagsRef.current = Array.from(new Set(tagsRef.current))
  setRemainingTags(uniqueTagsRef.current)
}, [reflections, setRemainingTags])

const updateTagFilterFn = (tag: string) => {
  setActiveTags([...activeTags, tag])
  setRemainingTags(remainingTags.filter(t => t !== tag))
  setFilteredReflections(reflections.filter(reflection => reflection.tags.includes(tag)))

  setOpen(false)
}


  return (
    <div>
      <div className="my-4 flex items-center gap-4">
        <h4 className='w-max whitespace-nowrap'>Filter by tags:</h4>
 
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button className='w-full sm:w-fit' aria-expanded={open} variant={'outline'}><Hash size={14} className='mr-1' /> Select a tag...</Button>
          </PopoverTrigger>
          <PopoverContent>
          <Command>
              <CommandInput placeholder='Search tags...' />
              <CommandList>
              <CommandEmpty>No tags found.</CommandEmpty>
              <CommandGroup>
              {remainingTags.map(tag => (
                <CommandItem
                  key={tag}
                  onSelect={() => updateTagFilterFn(tag)}
                >
                  {tag}
                </CommandItem>
              ))}
              </CommandGroup>
              </CommandList>
            </Command>
           
          </PopoverContent>
        </Popover>
        
      </div>
      <div className="flex gap-2 my-2 overflow-auto">
        {activeTags.map(tag => (
          <Button key={tag} variant='outline' className='flex items-center gap-1' onClick={() => {
            setActiveTags(activeTags.filter(t => t !== tag))
            setRemainingTags([...remainingTags, tag])
          }}>
            {tag} <XCircle size={14} />
          </Button>
        ))}
      </div>
      <DataTable columns={columns} data={activeTags.length ? filteredReflections : reflections} pending={pending} />
    </div>
  )
}

export default Page
