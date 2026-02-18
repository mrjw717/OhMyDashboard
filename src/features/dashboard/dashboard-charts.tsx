"use client"

import * as React from "react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    YAxis,
    XAxis,
    Cell,
    Pie,
    PieChart,
    Line,
    LineChart,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Label,
    LabelList,
    Sector,
    ReferenceLine
} from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/chart"
import { IconArrowUpRight, IconArrowDownRight, IconTrendingUp } from "@tabler/icons-react"

// --- Revenue & Profit Area Chart (SaaS - MRR/ARR focus) ---
const revenueData = [
    { month: "Jan", mrr: 18600, churn: 1400, expansion: 2500 },
    { month: "Feb", mrr: 21500, churn: 1200, expansion: 3100 },
    { month: "Mar", mrr: 24700, churn: 1100, expansion: 3800 },
    { month: "Apr", mrr: 28300, churn: 1300, expansion: 4200 },
    { month: "May", mrr: 32900, churn: 1000, expansion: 5100 },
    { month: "Jun", mrr: 38400, churn: 900, expansion: 6400 },
    { month: "Jul", mrr: 44000, churn: 1100, expansion: 6800 },
    { month: "Aug", mrr: 49000, churn: 1200, expansion: 7200 },
    { month: "Sep", mrr: 55000, churn: 1000, expansion: 8100 },
    { month: "Oct", mrr: 62000, churn: 950, expansion: 9300 },
    { month: "Nov", mrr: 71000, churn: 1100, expansion: 10400 },
    { month: "Dec", mrr: 82000, churn: 1200, expansion: 12100 },
]

const revenueConfig = {
    mrr: {
        label: "Recurring Revenue (MRR)",
        color: "hsl(var(--chart-1))",
    },
    expansion: {
        label: "Net Expansion",
        color: "hsl(var(--chart-2))",
    },
    churn: {
        label: "Churned ARR",
        color: "hsl(var(--destructive))",
    }
} satisfies ChartConfig

export function RevenueAreaChart() {
    return (
        <ChartContainer config={revenueConfig} className="h-full w-full min-h-[300px]">
            <AreaChart
                accessibilityLayer
                data={revenueData}
                margin={{
                    left: 0,
                    right: 0,
                    top: 10,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient id="fillMRR" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-mrr)" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="var(--color-mrr)" stopOpacity={0.01} />
                    </linearGradient>
                    <linearGradient id="fillExpansion" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-expansion)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-expansion)" stopOpacity={0.01} />
                    </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tickFormatter={(value) => value}
                    style={{ fontSize: '12px', fill: 'var(--muted-foreground)' }}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={12}
                    tickFormatter={(value) => `$${value / 1000}k`}
                    style={{ fontSize: '12px', fill: 'var(--muted-foreground)' }}
                />
                <ChartTooltip cursor={{ stroke: 'var(--muted-foreground)', strokeWidth: 1, strokeDasharray: '4 4' }} content={<ChartTooltipContent indicator="dot" />} />
                <Area
                    dataKey="expansion"
                    type="monotone"
                    fill="url(#fillExpansion)"
                    fillOpacity={0.4}
                    stroke="var(--color-expansion)"
                    strokeWidth={2}
                    stackId="1"
                />
                <Area
                    dataKey="mrr"
                    type="monotone"
                    fill="url(#fillMRR)"
                    fillOpacity={0.4}
                    stroke="var(--color-mrr)"
                    strokeWidth={2}
                    stackId="2"
                />
                <Area
                    dataKey="churn"
                    type="monotone"
                    fill="transparent"
                    stroke="var(--color-churn)"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    stackId="3"
                />
                <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
        </ChartContainer>
    )
}

// --- User Growth Line Chart (SaaS - Active Seats) ---
const userData = [
    { month: "Jan", active: 2400, trials: 800, converted: 400 },
    { month: "Feb", active: 2800, trials: 950, converted: 480 },
    { month: "Mar", active: 3500, trials: 1200, converted: 600 },
    { month: "Apr", active: 4100, trials: 1100, converted: 550 },
    { month: "May", active: 4900, trials: 1400, converted: 750 },
    { month: "Jun", active: 5800, trials: 1800, converted: 950 },
    { month: "Jul", active: 6200, trials: 1600, converted: 850 },
    { month: "Aug", active: 7500, trials: 2100, converted: 1100 },
    { month: "Sep", active: 8100, trials: 2300, converted: 1250 },
    { month: "Oct", active: 9200, trials: 2600, converted: 1400 },
    { month: "Nov", active: 10500, trials: 3100, converted: 1650 },
    { month: "Dec", active: 12000, trials: 3800, converted: 2100 },
]

const userConfig = {
    active: {
        label: "Active Users",
        color: "hsl(var(--chart-3))",
    },
    trials: {
        label: "New Trials",
        color: "hsl(var(--chart-4))",
    },
    converted: {
        label: "Conversions",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export function UserGrowthLineChart() {
    return (
        <ChartContainer config={userConfig} className="h-full w-full min-h-[250px]">
            <LineChart
                accessibilityLayer
                data={userData}
                margin={{
                    left: 0,
                    right: 12,
                    top: 12,
                    bottom: 0,
                }}
            >
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    style={{ fontSize: '10px' }}
                />
                <YAxis
                    hide
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                    dataKey="active"
                    type="monotone"
                    stroke="var(--color-active)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: "var(--background)", stroke: "var(--color-active)", strokeWidth: 2 }}
                />
                <Line
                    dataKey="trials"
                    type="monotone"
                    stroke="var(--color-trials)"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="4 4"
                />
                <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
        </ChartContainer>
    )
}

// --- Traffic Sources Pie Chart (SaaS - Acquisition) ---
const trafficData = [
    { source: "Paid Search", visitors: 4500, share: "35%", fill: "var(--color-paid)" },
    { source: "Organic", visitors: 3200, share: "25%", fill: "var(--color-organic)" },
    { source: "Social", visitors: 2100, share: "16%", fill: "var(--color-social)" },
    { source: "Referral", visitors: 1500, share: "12%", fill: "var(--color-referral)" },
    { source: "Direct", visitors: 900, share: "7%", fill: "var(--color-direct)" },
]

const trafficConfig = {
    visitors: {
        label: "Leads",
    },
    paid: {
        label: "Paid Search",
        color: "hsl(var(--chart-1))",
    },
    organic: {
        label: "Organic SEO",
        color: "hsl(var(--chart-2))",
    },
    social: {
        label: "Social",
        color: "hsl(var(--chart-3))",
    },
    referral: {
        label: "Referrals",
        color: "hsl(var(--chart-4))",
    },
    direct: {
        label: "Direct",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig

export function TrafficPieChart() {
    return (
        <ChartContainer config={trafficConfig} className="mx-auto aspect-square max-h-[300px] w-full">
            <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie
                    data={trafficData}
                    dataKey="visitors"
                    nameKey="source"
                    innerRadius={60}
                    outerRadius={90}
                    strokeWidth={2}
                    stroke="hsl(var(--card))"
                >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className="fill-foreground text-3xl font-bold"
                                        >
                                            12.2k
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className="fill-muted-foreground text-xs uppercase tracking-wide font-medium"
                                        >
                                            New Leads
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </Pie>
                <ChartLegend
                    content={<ChartLegendContent nameKey="source" className="flex-wrap gap-2 pt-4" />}
                />
            </PieChart>
        </ChartContainer>
    )
}

// --- Sales Bar Chart (SaaS - Regional Value) ---
const salesData = [
    { region: "North America", enterprise: 14500, smb: 8400, individual: 2400 },
    { region: "Europe", enterprise: 11200, smb: 7398, individual: 2210 },
    { region: "Asia Pacific", enterprise: 8800, smb: 9800, individual: 2290 },
    { region: "LATAM", enterprise: 4500, smb: 3908, individual: 1000 },
    { region: "EMEA", enterprise: 6890, smb: 2800, individual: 2181 },
]

const salesConfig = {
    enterprise: {
        label: "Enterprise",
        color: "hsl(var(--chart-6))",
    },
    smb: {
        label: "SMB",
        color: "hsl(var(--chart-7))",
    },
    individual: {
        label: "Individual",
        color: "hsl(var(--chart-8))",
    },
} satisfies ChartConfig

export function SalesBarChart() {
    return (
        <ChartContainer config={salesConfig} className="h-full w-full min-h-[250px]">
            <BarChart accessibilityLayer data={salesData} layout="vertical" margin={{ left: 0, right: 0 }}>
                <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.4} />
                <YAxis
                    dataKey="region"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    hide={false}
                    width={90}
                    style={{ fontSize: '11px', fontWeight: 500 }}
                />
                <XAxis type="number" hide />
                <ChartTooltip cursor={{ fill: 'var(--muted)', opacity: 0.1 }} content={<ChartTooltipContent indicator="line" />} />
                <Bar dataKey="enterprise" stackId="a" fill="var(--color-enterprise)" radius={[0, 0, 0, 0]} barSize={20} />
                <Bar dataKey="smb" stackId="a" fill="var(--color-smb)" radius={[0, 0, 0, 0]} barSize={20} />
                <Bar dataKey="individual" stackId="a" fill="var(--color-individual)" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
        </ChartContainer>
    )
}

// --- System Health Radar Chart (SaaS - Infrastructure) ---
const healthData = [
    { subject: 'API Latency', current: 120, baseline: 110, threshold: 150 },
    { subject: 'DB Reads', current: 98, baseline: 90, threshold: 150 },
    { subject: 'DB Writes', current: 86, baseline: 80, threshold: 150 },
    { subject: 'Cache Hit', current: 99, baseline: 100, threshold: 150 },
    { subject: 'Errors', current: 25, baseline: 20, threshold: 150 },
    { subject: 'CPU', current: 65, baseline: 60, threshold: 150 },
]

const healthConfig = {
    current: {
        label: "Real-time",
        color: "hsl(var(--chart-9))",
    },
    baseline: {
        label: "Baseline",
        color: "hsl(var(--chart-10))",
    },
    threshold: {
        label: "Max Load",
        color: "hsl(var(--destructive))",
    }
} satisfies ChartConfig

export function SystemHealthRadarChart() {
    return (
        <ChartContainer config={healthConfig} className="mx-auto aspect-square max-h-[300px] w-full">
            <RadarChart data={healthData} outerRadius={80}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <PolarGrid opacity={0.1} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10, fontWeight: 500 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar
                    name="Real-time"
                    dataKey="current"
                    stroke="var(--color-current)"
                    strokeWidth={2}
                    fill="var(--color-current)"
                    fillOpacity={0.5}
                />
                <Radar
                    name="Baseline"
                    dataKey="baseline"
                    stroke="var(--color-baseline)"
                    strokeWidth={1}
                    fill="transparent"
                    strokeDasharray="4 4"
                />
            </RadarChart>
        </ChartContainer>
    )
}
