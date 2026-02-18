"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  TrafficPieChart,
  UserGrowthLineChart,
  SalesBarChart,
  SystemHealthRadarChart,
  ArrVelocityCard,
  PipelineMomentumCard,
  ProfitQualityCard,
} from "@/features/dashboard"
import { DashboardGrid } from "@/features/dashboard/dashboard-grid"
import { DEFAULT_DASHBOARD_LAYOUTS } from "@/config/constants/dashboard-layout"
import { IconUsers, IconWallet, IconChartBar, IconBolt, IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

/**
 * Dashboard page component.
 * Displays a comprehensive dashboard with metrics, charts, and analytics.
 */
const dashboardLayouts = DEFAULT_DASHBOARD_LAYOUTS

const dashboardItems = [
  { id: "arr-velocity", node: <ArrVelocityCard /> },
  { id: "pipeline", node: <PipelineMomentumCard /> },
  { id: "profit-quality", node: <ProfitQualityCard /> },
  {
    id: "traffic",
    node: (
      <Card className="card-themed group flex flex-col h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Traffic Source</CardTitle>
          <CardDescription>Channel breakdown.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center min-h-[200px] min-w-0">
          <TrafficPieChart />
        </CardContent>
        <CardFooter className="border-t border-border/50 pt-3 pb-3 bg-muted/20">
          <div className="text-xs text-muted-foreground w-full text-center">
            <span className="font-semibold text-primary">Key Insight:</span> Direct traffic up 15%
          </div>
        </CardFooter>
      </Card>
    ),
  },
  {
    id: "system-health",
    node: (
      <Card className="card-themed group flex flex-col h-full">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold">System Health</CardTitle>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold border border-emerald-500/20 uppercase tracking-wider">
            <span className="relative flex h-1.5 w-1.5 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Operational
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center min-h-[200px] min-w-0">
          <SystemHealthRadarChart />
        </CardContent>
        <CardFooter className="border-t border-border/50 pt-3 pb-3 bg-muted/20">
          <div className="text-xs text-muted-foreground w-full text-center">
            <span className="font-semibold text-primary">99.2%</span> uptime across core services
          </div>
        </CardFooter>
      </Card>
    ),
  },
  {
    id: "user-growth",
    node: (
      <Card className="card-themed group flex flex-col h-full">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg font-bold">User Growth Strategy</CardTitle>
            <CardDescription>MAU tracking across tiers.</CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground hover:bg-secondary/70">Monthly</Badge>
            <Badge variant="outline" className="text-muted-foreground hover:bg-muted cursor-pointer">Quarterly</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 min-h-[250px] min-w-0">
          <UserGrowthLineChart />
        </CardContent>
      </Card>
    ),
  },
  {
    id: "regional-sales",
    node: (
      <Card className="card-themed group flex flex-col h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Regional Sales</CardTitle>
          <CardDescription>Top performing regions.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 min-h-[250px] min-w-0">
          <SalesBarChart />
        </CardContent>
        <CardFooter className="border-t border-border/50 p-3 bg-muted/20">
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <IconTrendingUp className="h-3 w-3 text-emerald-500" />
            <span>North America leads with <strong>$4.2M</strong></span>
          </div>
        </CardFooter>
      </Card>
    ),
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 py-4 min-h-screen custom-scrollbar">
      {/* Top Metrics Row - Kept as a quick glance header */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$124,592.30"
          change="+20.1%"
          trend="up"
          footer="+$12.5k from last month"
          icon={<IconWallet className="h-5 w-5" />}
        />
        <MetricCard
          title="Active Subscriptions"
          value="2,350"
          change="+15.3%"
          trend="up"
          footer="+350 new signups"
          icon={<IconUsers className="h-5 w-5" />}
        />
        <MetricCard
          title="Avg. Session Duration"
          value="24m 12s"
          change="-2.4%"
          trend="down"
          footer="3m less than avg"
          icon={<IconBolt className="h-5 w-5" />}
        />
        <MetricCard
          title="Engagement Rate"
          value="64.2%"
          change="+4.3%"
          trend="up"
          footer="Top 5% of industry"
          icon={<IconChartBar className="h-5 w-5" />}
        />
      </div>

      <DashboardGrid layouts={dashboardLayouts} items={dashboardItems} />
    </div>
  )
}

/**
 * Metric card component.
 * Displays a key metric with title, value, change trend, and footer information.
 */
function MetricCard({ title, value, change, trend, footer, icon }: { title: string, value: string, change: string, trend: "up" | "down", footer: string, icon: React.ReactNode }) {
  const isPositive = trend === "up"

  return (
    <Card className="card-themed group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-primary/5 cursor-default relative overflow-hidden h-full">
      <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "h-24 w-24" })}
      </div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300",
          "bg-primary/5 text-primary/60 group-hover:bg-primary group-hover:text-primary-foreground"
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-col gap-3 min-h-[120px] min-w-0">
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={cn(
              "text-[10px] font-bold px-1.5 py-0 h-5 border-none flex items-center gap-0.5",
              isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
            )}
          >
            {isPositive ? <IconTrendingUp className="h-3 w-3" /> : <IconTrendingDown className="h-3 w-3" />}
            {change}
          </Badge>
          <span className="text-xs text-muted-foreground">{footer}</span>
        </div>
      </CardContent>
    </Card>
  )
}
