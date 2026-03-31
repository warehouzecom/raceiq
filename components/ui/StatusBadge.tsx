import { RaceStatus } from '@/lib/types'

const config: Record<RaceStatus, { label: string; classes: string }> = {
  result: { label: 'Result', classes: 'bg-text-muted/20 text-text-muted' },
  open: { label: 'Open', classes: 'bg-brand-green/15 text-brand-green' },
  upcoming: { label: 'Upcoming', classes: 'bg-brand-blue/15 text-brand-blue' },
  closed: { label: 'Closed', classes: 'bg-brand-amber/15 text-brand-amber' },
}

export function StatusBadge({ status }: { status: RaceStatus }) {
  const { label, classes } = config[status]
  return <span className={`text-xs font-medium px-2 py-0.5 rounded ${classes}`}>{label}</span>
}
