'use client'

interface ProbabilityBarProps {
  value: number
  max?: number
  color?: 'green' | 'blue' | 'amber' | 'purple'
  showLabel?: boolean
  size?: 'sm' | 'md'
}

const colorMap = {
  green: 'bg-brand-green',
  blue: 'bg-brand-blue',
  amber: 'bg-brand-amber',
  purple: 'bg-brand-purple',
}

function getAutoColor(value: number): string {
  if (value >= 30) return colorMap.green
  if (value >= 18) return colorMap.blue
  if (value >= 10) return colorMap.amber
  return 'bg-text-muted'
}

export function ProbabilityBar({ value, max = 100, color, showLabel = true, size = 'md' }: ProbabilityBarProps) {
  const pct = Math.min((value / max) * 100, 100)
  const barColor = color ? colorMap[color] : getAutoColor(value)
  const h = size === 'sm' ? 'h-1.5' : 'h-2'

  return (
    <div className="flex items-center gap-2 w-full">
      <div className={`flex-1 bg-bg-border rounded-full overflow-hidden ${h}`}>
        <div
          className={`${h} rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-mono text-text-primary w-10 text-right tabular-nums">
          {value.toFixed(1)}%
        </span>
      )}
    </div>
  )
}
