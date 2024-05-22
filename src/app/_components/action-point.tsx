'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Zap, Trash2, EllipsisVertical, Edit } from 'lucide-react'
import React, { ComponentPropsWithoutRef } from 'react'

type Props = {
  actionPoint: { title: string; content: string }
  index: number
  deleteActionPoint?: (index: number) => void
  className?: string
  resolved?: boolean
  inherited?: ComponentPropsWithoutRef<'div'>
}

function ActionPoint({
  actionPoint,
  index,
  deleteActionPoint,
  className,
  resolved,
  ...inherited
}: Props) {
  return (
    <motion.div
      {...inherited}
      layoutId={actionPoint.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(className, 'flex gap-2 rounded-md border', {
        'border-foreground': resolved,
        'border-success': !resolved,
      
      })}
    >
      <div className="mt-1 py-4 pl-4">
        <Zap className={resolved ? 'fill-foreground' : ''} size={16} />
      </div>
      <div className="flex flex-col gap-1 py-4 pr-4">
        <h4 className="col-start-2 text-sm font-semibold">
          {actionPoint.title}
        </h4>
        <p className="col-start-2 text-sm text-muted-foreground">
          {actionPoint.content}
        </p>
      </div>
      <div className="flex h-min items-center gap-2 p-2">
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
              <DropdownMenuItem className="text-destructive">
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

export default ActionPoint
