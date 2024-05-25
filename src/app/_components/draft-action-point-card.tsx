'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  Zap,
  Trash2,
  EllipsisVertical,
  Edit,
} from 'lucide-react'
import React, { ComponentPropsWithoutRef } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  actionPoint: { title: string; content: string }
  removeActionPoint: (index: number) => void
  index: number
  className?: string
  inherited?: ComponentPropsWithoutRef<'div'>
}

function ActionPointCard({
  actionPoint,
  removeActionPoint,
  index,
  className,
  ...inherited
}: Props) {
  const router = useRouter()

  

  return (
    <motion.div
      {...inherited}
      layoutId={actionPoint.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        className,
        'grid grid-cols-[auto_1fr_auto] gap-2 rounded-md border px-3 py-4',
      )}
    >
      <div className="col-start-1 flex flex-col p-1">
        <Zap size={16} />
      </div>
      <div className="col-start-2">
        <h5 className="font-bold">{actionPoint.title}</h5>
        <p className="text-muted-foreground">{actionPoint.content}</p>
      </div>
      <div className="col-start-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <EllipsisVertical size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="text-destructive" onClick={() => removeActionPoint(index)}>
                  <Trash2 size={14} className="mr-1" /> Delete
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit size={14} className="mr-1" /> Edit
                </DropdownMenuItem>
                
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </motion.div>
  )
}

export default ActionPointCard
