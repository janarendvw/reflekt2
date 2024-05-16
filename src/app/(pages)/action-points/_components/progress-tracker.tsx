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

type ProgressTrackerProps = {
  value: number
  title: string
  description: string
  className?: string
}

export default function ProgressTracker({
  value,
  title,
  description,
  className,
}: ProgressTrackerProps) {




  return (
    <Card className={cn(className, 'rounded-md')}>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{value.toFixed(1)}%</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
      <CardFooter>
        <Progress value={value} aria-label={description} />
      </CardFooter>
    </Card>
  )
}
