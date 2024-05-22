'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { useEffect, useLayoutEffect, useState } from 'react'

type ProgressTrackerProps = {
  value: number
  title: string
  description: string
  className?: string
  showProgressBar?: boolean
}

export default function ProgressTracker({
  value,
  title,
  description,
  className,
  showProgressBar = true,
}: ProgressTrackerProps) {
  const [progress, setProgress] = useState(0)
  useLayoutEffect(() => {
    setProgress(value)
  }, [value])

  return (
    <Card className={cn(className, 'rounded-md shadow-none')}>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{value.toFixed(1)}%</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
     {showProgressBar && <CardFooter>
        <Progress value={progress} aria-label={description} />
      </CardFooter>}
    </Card>
  )
}
