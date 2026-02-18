import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonHeader() {
  return (
    <div className="flex h-14 w-full items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-4 w-px" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-8 w-64" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-4 w-px" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  )
}
