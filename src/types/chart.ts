export interface ChartDataPoint {
  name: string
  value?: number
  total?: number
  active?: number
}

export interface PieChartDataPoint {
  name: string
  value: number
}

export interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}
