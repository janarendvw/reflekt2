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
  ArrowLeftRight,
  ArrowRightLeft,
  Link2,
  UnfoldVertical,
  ChevronsUpDown,
} from 'lucide-react'
import React, { ComponentPropsWithoutRef, act } from 'react'
import { Separator } from '@/components/ui/separator'
import { Dialog } from '@/components/ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import ResolveActionPointForm from './resolve-action-point-form'
import { ActionPoint } from '@prisma/client'
import { unresolveActionPointById } from '../server/actions/action-point'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { CaretSortIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

type Props = {
  actionPoint: ActionPoint
  index: number
  className?: string
  resolved?: boolean
  inherited?: ComponentPropsWithoutRef<'div'>
  resolution?: string | null
}

function ActionPointCard({ actionPoint, index, className, resolved, resolution, ...inherited }: Props) {
  const router = useRouter()

  const handleUnresolve = async (id: number) => {
    await unresolveActionPointById(id).then(() => {
      router.refresh()
    })
  }

  return (
    <motion.div
      {...inherited}
      layoutId={actionPoint.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(className, 'grid grid-cols-[auto_1fr_auto] gap-2 rounded-md border')}
    >
      <div className="col-start-1 flex flex-col py-5 pl-4 pr-1">{resolved ? <Zap size={16} /> : <Zap size={16} />}</div>
      <Link href={'/home/action-points/' + actionPoint.id} className="group">
        <div className="col-start-2 py-4">
          <h5 className="font-bold group-hover:underline">{actionPoint.title}</h5>
          <p className="text-muted-foreground">{actionPoint.content}</p>
        </div>
      </Link>

      <div className="col-start-3 py-4 pr-3">
        <Dialog>
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
                {!resolved ? (
                  <DropdownMenuItem>
                    <DialogTrigger className="flex items-center">
                      <ArrowLeftRight size={14} className="mr-1" /> Resolve
                    </DialogTrigger>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => handleUnresolve(actionPoint.id)}>
                    <ArrowRightLeft size={14} className="mr-1" /> Unresolve
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <ResolveActionPointForm actionPoint={actionPoint} />
        </Dialog>
      </div>

      {resolution && (
        <div className="col-span-3 m-2 grid grid-cols-[auto_1fr_auto] gap-2 rounded-md border border-success/50 bg-gradient-to-b from-success/20 to-success/10 px-3 py-4">
          <div className="col-start-1 p-1 text-success">
            <CheckCircle size={16} />
          </div>
          <div className="col-start-2 text-success">
            <h5 className="font-bold">Resolution</h5>
            <p className="text-muted-foreground">{resolution}</p>
          </div>
          {actionPoint.attatchments.length > 0 && (
            <div className="col-start-1 p-1">
              <Link2 size={16} />
            </div>
          )}
          <div className="col-start-2">
            <h5 className="font-bold">Proof of resolution</h5>
            <div className="flex flex-col gap-1 max-h-56 overflow-y-auto">
              {actionPoint.attatchments.map((proof, i) => (
                <a key={i} href={proof} target="_blank" className="underline">
                  {proof}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default ActionPointCard
