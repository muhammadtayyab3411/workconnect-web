import * as React from "react"
import {
  Legend,
  Pie,
  PieChart as ReChartsPieChart,
  Cell,
  Tooltip,
} from "recharts"

import { Chart } from "./chart"

interface PieChartProps {
  data: {
    name: string
    value: number
    color: string
  }[]
  innerRadius?: number
  outerRadius?: number
  showLegend?: boolean
  showTooltip?: boolean
  height?: number
  className?: string
}

export function PieChart({
  data,
  innerRadius = 0,
  outerRadius = 100,
  showLegend = false,
  showTooltip = true,
  height = 250,
  className,
}: PieChartProps) {
  return (
    <Chart height={height} className={className}>
      <ReChartsPieChart>
        {showTooltip && <Tooltip />}
        {showLegend && <Legend />}
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </ReChartsPieChart>
    </Chart>
  )
} 