import { ConfidenceLevel } from '@/lib/types'

interface ConfidenceBadgeProps {
  level: ConfidenceLevel
  size?: 'sm' | 'md'
}

const config: Record<ConfidenceLevel, { label: string; classes: string; dot: string }> = {
  agree: { label: 'Agree', classes: 'bg-brand-green/15 text-brand-green border-brand-green/30', dot: 'bg-brand-green' },
  'slight-agree': { label: 'Slight', classes: 'bg-brand-blue/15 text-brand-blue border-brand-blue/30', dot: 'bg-brand-blue' },
  diverge: { label: 'Diverge', classes: 'bg-brand-amber/15 text-brand-amber border-brand-amber/30', dot: 'bg-brand-amber' },
  'strong-diverge': { label: 'Strong ↗', classes: 'bg-brand-red/15 text-brand-red border-brand-red/30', dot: 'bg-brand-red' },
}

export function ConfidenceBadge({ level, size = 'sm' }: ConfidenceBadgeProps) {
  const { label, classes, dot } = config[level]
  return (
    <span className={`inline-flex items-center gap-1.5 border rounded px-2 py-0.5 text-xs font-medium ${classes}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden />
      <span>{label}</span>
    </span>
  )
}
