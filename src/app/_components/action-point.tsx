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
  Wrench,
  CheckCircle,
} from 'lucide-react'
import React, { ComponentPropsWithoutRef } from 'react'
import { Separator } from '@/components/ui/separator'

type Props = {
  actionPoint: { title: string; content: string }
  index: number
  className?: string
  resolved?: boolean
  inherited?: ComponentPropsWithoutRef<'div'>
  resolution?: string | null
}

function ActionPoint({
  actionPoint,
  index,
  className,
  resolved,
  resolution,
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
      className={cn(
        className,
        'grid grid-cols-[auto_1fr_auto] gap-2 rounded-md border px-3 py-4',
        {
          ' border-green-600/50': resolved,
        },
      )}
    >
      <div className="col-start-1 flex flex-col p-1">
        {resolved ? <CheckCircle size={16} /> : <Zap size={16} />}
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

      {resolution && (
        <>
          <Separator className="col-span-3 row-start-2 my-2" />
          <div className="col-start-1 row-start-3 p-1 text-green-600">
            <Wrench size={16} />
          </div>
          <div className="col-start-2 row-start-3 text-green-600">
            <h5 className="font-bold">Resolution</h5>

            <p className="text-muted-foreground">{resolution}</p>
          </div>
        </>
      )}
    </motion.div>
  )
}

export default ActionPoint
