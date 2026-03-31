import { notFound } from 'next/navigation'
import Link from 'next/link'
import { horses } from '@/lib/data/horses'
import { OddsPill } from '@/components/ui/OddsPill'

interface Props {
  params: Promise<{ id: string }>
}

const positionColor = (pos: number) => {
  if (pos === 1) return 'bg-brand-green text-bg-base'
  if (pos <= 3) return 'bg-brand-green/25 text-brand-green'
  return 'bg-bg-elevated text-text-secondary'
}

export default async function HorseProfilePage({ params }: Props) {
  const { id } = await params
  const horse = horses[id]
  if (!horse) notFound()

  const wins = horse.formHistory.filter((r) => r.position === 1).length
  const places = horse.formHistory.filter((r) => r.position <= 3).length
  const strikeRate = horse.formHistory.length > 0 ? ((wins / horse.formHistory.length) * 100).toFixed(0) : '0'

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="px-6 py-5 border-b border-bg-border sticky top-0 bg-bg-base z-10">
        <div className="text-xs text-text-muted mb-1 flex items-center gap-2">
          <Link href="/" className="hover:text-text-secondary transition-colors">Race Day</Link>
          <span>/</span>
          <span>Horse Profile</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{horse.name}</h1>
            <p className="text-sm text-text-secondary mt-0.5">
              {horse.age}yo {horse.sex === 'G' ? 'Gelding' : horse.sex === 'M' ? 'Mare' : horse.sex === 'F' ? 'Filly' : horse.sex === 'H' ? 'Horse' : 'Colt'} ·{' '}
              {horse.colour} · {horse.country === 'MU' ? 'Mauritius' : 'Australia'}
            </p>
            <p className="text-xs text-text-muted mt-1">
              By <span className="text-text-secondary">{horse.sire}</span> out of{' '}
              <span className="text-text-secondary">{horse.dam}</span>
            </p>
          </div>
          {horse.rating && (
            <div className="text-right shrink-0">
              <p className="text-xs text-text-muted">Rating</p>
              <p className="text-3xl font-mono font-bold text-brand-green">{horse.rating}</p>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-5 space-y-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Runs', value: horse.formHistory.length },
            { label: 'Wins', value: wins },
            { label: 'Places', value: places },
            { label: 'Strike Rate', value: `${strikeRate}%` },
          ].map(({ label, value }) => (
            <div key={label} className="bg-bg-card border border-bg-border rounded-lg px-4 py-3">
              <p className="text-xs text-text-muted">{label}</p>
              <p className="text-xl font-bold text-text-primary mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-bg-card border border-bg-border rounded-lg px-4 py-3 space-y-2">
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Profile</p>
            {[
              { label: 'Trainer', value: horse.trainer },
              { label: 'Owner', value: horse.owner },
              { label: 'Colour', value: horse.colour },
              { label: 'Sire', value: horse.sire },
              { label: 'Dam', value: horse.dam },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-xs text-text-muted">{label}</span>
                <span className="text-xs text-text-secondary text-right">{value}</span>
              </div>
            ))}
          </div>

          {/* Going stats */}
          <div className="bg-bg-card border border-bg-border rounded-lg px-4 py-3">
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-3">Going Performance</p>
            <div className="space-y-2">
              {horse.goingStats.map((gs) => (
                <div key={gs.going} className="flex items-center gap-2">
                  <span className="text-xs text-text-secondary w-28 shrink-0">{gs.going}</span>
                  <div className="flex-1 bg-bg-border rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-brand-green transition-all"
                      style={{ width: `${gs.winRate}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono text-text-primary w-16 text-right">
                    {gs.wins}/{gs.runs} ({gs.winRate.toFixed(0)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form history */}
        <div>
          <h2 className="text-sm font-semibold text-text-primary mb-3">Recent Form (last {horse.formHistory.length} runs)</h2>
          <div className="bg-bg-card border border-bg-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="text-left border-b border-bg-border bg-bg-elevated/50">
                    {['Date', 'Track', 'Dist', 'Going', 'Class', 'Pos', 'Jockey', 'Wgt', 'Odds', 'Comment'].map((h) => (
                      <th key={h} className="px-3 py-2 text-xs font-medium text-text-muted">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {horse.formHistory.map((run, i) => (
                    <tr key={i} className="border-b border-bg-border/50 hover:bg-bg-elevated/20 transition-colors">
                      <td className="px-3 py-2.5 text-xs text-text-secondary font-mono whitespace-nowrap">{run.date}</td>
                      <td className="px-3 py-2.5 text-xs font-medium text-text-primary">{run.track}</td>
                      <td className="px-3 py-2.5 text-xs text-text-secondary font-mono">{run.distance}m</td>
                      <td className="px-3 py-2.5 text-xs text-text-secondary whitespace-nowrap">{run.going}</td>
                      <td className="px-3 py-2.5 text-xs text-text-muted whitespace-nowrap">{run.class}</td>
                      <td className="px-3 py-2.5">
                        <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-bold ${positionColor(run.position)}`}>
                          {run.position}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-xs text-text-secondary whitespace-nowrap">{run.jockey}</td>
                      <td className="px-3 py-2.5 text-xs font-mono text-text-secondary">{run.weight}kg</td>
                      <td className="px-3 py-2.5">
                        <OddsPill odds={run.odds} />
                      </td>
                      <td className="px-3 py-2.5 text-xs text-text-muted max-w-xs">{run.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
