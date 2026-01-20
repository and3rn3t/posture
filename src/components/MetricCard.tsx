import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export function MetricCard({ label, value, unit, trend, trendValue }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-4xl font-medium text-foreground"
            >
              {value}
            </motion.span>
            {unit && (
              <span className="text-lg font-medium text-muted-foreground">
                {unit}
              </span>
            )}
          </div>
          {trend && trendValue && (
            <div className="flex items-center gap-1 text-sm">
              <span
                className={
                  trend === 'up'
                    ? 'text-accent'
                    : trend === 'down'
                    ? 'text-destructive'
                    : 'text-muted-foreground'
                }
              >
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
              </span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
