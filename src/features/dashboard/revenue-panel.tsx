"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ComposedChart,
  Funnel,
  FunnelChart,
  Line,
  XAxis,
  YAxis
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"

const arrVelocityData = [
  { month: "Jan", arr: 890, expansion: 210 },
  { month: "Feb", arr: 940, expansion: 240 },
  { month: "Mar", arr: 1010, expansion: 260 },
  { month: "Apr", arr: 1080, expansion: 280 },
  { month: "May", arr: 1160, expansion: 320 },
  { month: "Jun", arr: 1240, expansion: 350 },
]

const arrVelocityConfig = {
  arr: {
    label: "ARR",
    color: "hsl(var(--chart-1))"
  },
  expansion: {
    label: "Expansion",
    color: "hsl(var(--chart-2))"
  }
} satisfies ChartConfig

const funnelData = [
  { stage: "Inbound", value: 4800, conversion: "64%", token: "inbound" },
  { stage: "Qualified", value: 3100, conversion: "42%", token: "qualified" },
  { stage: "Demo", value: 2100, conversion: "29%", token: "demo" },
  { stage: "Procurement", value: 1200, conversion: "17%", token: "procurement" }
]

const funnelConfig = {
  inbound: {
    label: "Inbound",
    color: "hsl(var(--chart-3))"
  },
  qualified: {
    label: "Qualified",
    color: "hsl(var(--chart-4))"
  },
  demo: {
    label: "Demo",
    color: "hsl(var(--chart-5))"
  },
  procurement: {
    label: "Procurement",
    color: "hsl(var(--chart-6))"
  }
} satisfies ChartConfig

const profitQualityData = [
  { quarter: "Q1", revenue: 420, expenses: 290, margin: 31 },
  { quarter: "Q2", revenue: 468, expenses: 305, margin: 35 },
  { quarter: "Q3", revenue: 512, expenses: 318, margin: 38 },
  { quarter: "Q4", revenue: 558, expenses: 326, margin: 42 }
]

const profitQualityConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-5))"
  },
  expenses: {
    label: "Operating Cost",
    color: "hsl(var(--chart-6))"
  },
  margin: {
    label: "Margin %",
    color: "hsl(var(--chart-7))"
  }
} satisfies ChartConfig

export function ArrVelocityCard() {
  return (
    <Card className="card-themed group flex h-full flex-col min-w-0">
      <CardHeader className="pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">ARR Velocity</CardTitle>
          <CardDescription>Recurring revenue momentum</CardDescription>
        </div>
        <Badge variant="outline" className="mt-2 text-emerald-500 border-emerald-500/40 bg-emerald-500/5">
          +8.2% QoQ
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 min-w-0">
        <ChartContainer config={arrVelocityConfig} className="h-full w-full min-w-0 aspect-auto">
          <AreaChart
            data={arrVelocityData}
            margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="arrGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-arr)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--color-arr)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              style={{ fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => `$${value}k`}
              style={{ fontSize: 12 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" labelFormatter={(label) => `${label} •` } />} />
            <Area dataKey="arr" type="monotone" stroke="var(--color-arr)" strokeWidth={3} fill="url(#arrGradient)" />
            <Line dataKey="expansion" type="monotone" stroke="var(--color-expansion)" strokeWidth={2} dot={false} strokeDasharray="4 4" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="pt-0 text-sm text-muted-foreground">
        ARR accelerated by $84k since January.
      </CardFooter>
    </Card>
  )
}

export function PipelineMomentumCard() {
  return (
    <Card className="card-themed group flex h-full flex-col min-w-0">
      <CardHeader className="pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Pipeline Momentum</CardTitle>
          <CardDescription>Stage-by-stage conversion</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 min-h-0 min-w-0">
        <div className="flex-1 min-h-0 min-w-0">
          <ChartContainer config={funnelConfig} className="h-full w-full min-w-0 aspect-auto">
            <FunnelChart margin={{ top: 10, bottom: 10 }}>
              <ChartTooltip cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }} content={<ChartTooltipContent hideLabel />} />
              <Funnel
                data={funnelData.map((stage) => ({
                  ...stage,
                  fill: `var(--color-${stage.token})`
                }))}
                dataKey="value"
                isAnimationActive={false}
              >
              </Funnel>
            </FunnelChart>
          </ChartContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm overflow-auto">
          {funnelData.map((stage) => (
            <div key={stage.stage} className="flex flex-col rounded-lg border border-border/50 bg-muted/40 px-3 py-2">
              <div className="flex items-center justify-between font-medium text-foreground">
                <span>{stage.stage}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{stage.conversion}</span>
              </div>
              <span className="text-muted-foreground">{stage.value.toLocaleString()} leads</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-sm text-muted-foreground">
        Avg. dwell time per stage now 9.2 days.
      </CardFooter>
    </Card>
  )
}

export function ProfitQualityCard() {
  return (
    <Card className="card-themed group flex h-full flex-col min-w-0">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">Profit Quality</CardTitle>
            <Badge variant="secondary" className="text-xs tracking-wide uppercase">
              FY 2025 Outlook
            </Badge>
          </div>
          <CardDescription>Revenue vs. operating cost with margin overlay.</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col min-w-0 min-h-0">
        <div className="flex flex-col gap-2 pb-4">
          <p className="text-4xl font-semibold tracking-tight text-foreground">$558k</p>
          <p className="text-sm text-muted-foreground">Projected Q4 Revenue • Margin guidance 42%</p>
        </div>
        <ChartContainer config={profitQualityConfig} className="flex-1 w-full min-w-0 aspect-auto">
          <ComposedChart
            data={profitQualityData}
            margin={{ left: 0, right: 12, top: 10, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} />
            <XAxis dataKey="quarter" axisLine={false} tickLine={false} tickMargin={8} style={{ fontSize: 12, fontWeight: 600 }} />
            <YAxis
              yAxisId="value"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${value}k`}
              tickMargin={8}
              style={{ fontSize: 12 }}
            />
            <YAxis
              yAxisId="margin"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
              tickMargin={4}
              style={{ fontSize: 11 }}
            />
            <ChartTooltip cursor={{ stroke: "var(--muted)", strokeDasharray: "4 4" }} content={<ChartTooltipContent />} />
            <Area yAxisId="value" dataKey="revenue" type="monotone" stroke="var(--color-revenue)" strokeWidth={2.5} fill="var(--color-revenue)" fillOpacity={0.15} />
            <Area yAxisId="value" dataKey="expenses" type="monotone" stroke="var(--color-expenses)" strokeWidth={2} fill="var(--color-expenses)" fillOpacity={0.08} />
            <Line yAxisId="margin" dataKey="margin" type="monotone" stroke="var(--color-margin)" strokeWidth={3} dot={{ r: 4, fill: "var(--background)" }} />
            <ChartLegend content={<ChartLegendContent className="pt-6" />} />
          </ComposedChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-1 text-sm text-muted-foreground">
        <p><span className="text-foreground font-semibold">$232k</span> net operating income YTD.</p>
        <p>Margin expanded 11 pts since Q1.</p>
      </CardFooter>
    </Card>
  )
}
