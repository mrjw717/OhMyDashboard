import { SkeletonSidebar } from './skeleton-sidebar'
import { SkeletonHeader } from './skeleton-header'
import { SkeletonMetricCard } from './skeleton-metric-card'
import { SkeletonChart } from './skeleton-chart'
import { SkeletonTable } from './skeleton-table'

export function SkeletonPage() {
  return (
    <div className="flex h-screen w-full">
      <div className="w-64 hidden md:block">
        <SkeletonSidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <SkeletonHeader />
        <div className="flex-1 p-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonMetricCard key={i} />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-8">
              <SkeletonChart />
            </div>
            <div className="md:col-span-4">
              <SkeletonChart />
            </div>
          </div>
          <SkeletonTable />
        </div>
      </div>
    </div>
  )
}
