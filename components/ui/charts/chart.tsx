import * as React from "react"
import { ResponsiveContainer } from "recharts"

export function Chart({
  children,
  ...props
}: {
  children: React.ReactElement
} & Omit<React.ComponentPropsWithoutRef<typeof ResponsiveContainer>, "children">) {
  return (
    <ResponsiveContainer width="100%" height={350} {...props}>
      {children}
    </ResponsiveContainer>
  )
} 