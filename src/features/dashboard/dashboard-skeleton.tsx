import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
    return (
        <div className="flex-1 space-y-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Skeleton className="aspect-video w-full rounded-xl" />
                <Skeleton className="aspect-video w-full rounded-xl" />
                <Skeleton className="aspect-video w-full rounded-xl" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-4">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
                <div className="space-y-4 pt-4">
                    <Skeleton className="h-[200px] w-full rounded-lg" />
                    <Skeleton className="h-[200px] w-full rounded-lg" />
                </div>
            </div>
        </div>
    )
}
