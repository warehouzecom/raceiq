import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getRace } from '@/lib/data/races'
import { getTrack } from '@/lib/data/tracks'
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge'
import { OddsPill } from '@/components/ui/OddsPill'
import { ProbabilityBar } from '@/components/ui/ProbabilityBar'

interface Props {
  params: Promise<{ raceId: string }>
}

export default async function ComparisonPage({ params }: Props) {
  const { raceId } = await params
  const race = getRace(raceId)
  if (!race) notFound()

  const track = getTrack(race.trackId)
  const sortedRunners = [...race.runners].sort((a, b) => a.number - b.number)

  return (
    <div className="flex-1 overflow-y-auto min-w-0">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-bg-border sticky top-0 bg-bg-base z-10">
        <div className="text-xs text-text-muted mb-1 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-text-secondary transition-colors">Race Day</Link>
          <span>/</span>
          <Link href={`/race/${race.id}`} className="hover:text-text-secondary transition-colors">Race {race.number}</Link>
          <span>/</span>
          <span className="text-brand-purple">ML vs Expert</span>
        </div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-semibold text-text-primary truncate">{race.name}</h1>
            <p className="text-xs text-text-secondary">
              {track?.name} · {race.time} · {race.distance}m · {race.going}
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-brand-purple/15 text-brand-purple border border-brand-purple/25 font-medium shrink-0">
            Elite
          </span>
        </div>
      </div>

      {/* Mobile: card view */}
      <div className="md:hidden px-3 py-3 space-y-3">
        {sortedRunners.map((runner) => {
          const diff = runner.expertPick
            ? runner.expertPick.winProbability - runner.mlWinProbability
            : null

          return (
            <div key={runner.id} className={`bg-bg-card border rounded-lg p-3 ${
              runner.expertPick?.confidence === 'strong-diverge' ? 'border-brand-amber/30' :
              runner.expertPick?.confidence === 'diverge' ? 'border-brand-amber/20' : 'border-bg-border'
            }`}>
              {/* Horse */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full text-xs font-bold bg-bg-elevated text-text-secondary shrink-0">
                    {runner.number}
                  </span>
                  <Link href={`/horse/${runner.horse.id}`} className="text-sm font-semibold text-text-primary hover:text-brand-green truncate">
                    {runner.horse.name}
                  </Link>
                </div>
                <OddsPill odds={runner.odds} />
              </div>

              {/* ML bar */}
              <div className="mb-1.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-brand-blue font-medium">ML</span>
                  <span className="text-xs font-mono text-text-primary">{runner.mlWinProbability.toFixed(1)}%</span>
                </div>
                <ProbabilityBar value={runner.mlWinProbability} color="blue" showLabel={false} />
              </div>

              {/* Expert bar */}
              {runner.expertPick ? (
                <>
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-brand-purple font-medium">Expert</span>
                      <span className="text-xs font-mono text-text-primary">{runner.expertPick.winProbability.toFixed(1)}%</span>
                    </div>
                    <ProbabilityBar value={runner.expertPick.winProbability} color="purple" showLabel={false} />
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-bg-border/50">
                    <ConfidenceBadge level={runner.expertPick.confidence} />
                    {diff !== null && (
                      <span className={`text-xs font-mono ${diff > 0 ? 'text-brand-purple' : 'text-text-muted'}`}>
                        {diff > 0 ? '+' : ''}{diff.toFixed(1)}%
                      </span>
                    )}
                    <span className="text-xs text-text-muted ml-auto">{runner.expertPick.expertName}</span>
                  </div>

                  <p className="text-xs text-text-secondary mt-2 leading-relaxed">
                    {runner.expertPick.reasoning}
                  </p>
                </>
              ) : (
                <p className="text-xs text-text-muted pt-2 border-t border-bg-border/50">No expert pick for this runner</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block">
        {/* Legend */}
        <div className="px-6 pt-4 pb-2 flex flex-wrap gap-4">
          {[
            { level: 'agree' as const, desc: 'Within 5%' },
            { level: 'slight-agree' as const, desc: '5–10% gap' },
            { level: 'diverge' as const, desc: 'Expert >10% higher' },
            { level: 'strong-diverge' as const, desc: 'Expert >15% higher' },
          ].map(({ level, desc }) => (
            <div key={level} className="flex items-center gap-2">
              <ConfidenceBadge level={level} />
              <span className="text-xs text-text-muted">{desc}</span>
            </div>
          ))}
        </div>

        <div className="px-4 py-3 overflow-x-auto">
          <table className="w-full min-w-[750px] border-collapse">
            <thead>
              <tr className="border-b border-bg-border text-left">
                <th className="pb-2 px-3 text-xs font-medium text-text-muted w-8">#</th>
                <th className="pb-2 px-3 text-xs font-medium text-text-muted">Horse</th>
                <th className="pb-2 px-3 text-xs font-medium text-text-muted w-20 text-right">Odds</th>
                <th className="pb-2 px-3 text-xs font-medium text-brand-blue w-44">ML Win %</th>
                <th className="pb-2 px-3 text-xs font-medium text-brand-purple w-44">Expert Win %</th>
                <th className="pb-2 px-3 text-xs font-medium text-text-muted w-28">Signal</th>
                <th className="pb-2 px-3 text-xs font-medium text-text-muted">Expert Reasoning</th>
              </tr>
            </thead>
            <tbody>
              {sortedRunners.map((runner) => {
                const diff = runner.expertPick
                  ? runner.expertPick.winProbability - runner.mlWinProbability
                  : null

                return (
                  <tr key={runner.id} className="border-b border-bg-border/50 hover:bg-bg-elevated/20 transition-colors">
                    <td className="py-4 px-3">
                      <span className="inline-flex w-7 h-7 items-center justify-center rounded-full text-xs font-bold bg-bg-elevated text-text-secondary">
                        {runner.number}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <Link href={`/horse/${runner.horse.id}`} className="text-sm font-semibold text-text-primary hover:text-brand-green transition-colors">
                        {runner.horse.name}
                      </Link>
                      <p className="text-xs text-text-muted mt-0.5">{runner.jockey}</p>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <OddsPill odds={runner.odds} />
                    </td>
                    <td className="py-4 px-3">
                      <ProbabilityBar value={runner.mlWinProbability} color="blue" />
                    </td>
                    <td className="py-4 px-3">
                      {runner.expertPick ? (
                        <ProbabilityBar value={runner.expertPick.winProbability} color="purple" />
                      ) : (
                        <span className="text-xs text-text-muted">No pick</span>
                      )}
                    </td>
                    <td className="py-4 px-3">
                      {runner.expertPick ? (
                        <div className="space-y-1">
                          <ConfidenceBadge level={runner.expertPick.confidence} />
                          {diff !== null && (
                            <p className={`text-xs font-mono ${diff > 0 ? 'text-brand-purple' : 'text-text-muted'}`}>
                              {diff > 0 ? '+' : ''}{diff.toFixed(1)}%
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-text-muted">—</span>
                      )}
                    </td>
                    <td className="py-4 px-3">
                      {runner.expertPick ? (
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-xs font-medium text-text-secondary">{runner.expertPick.expertName}</span>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className={`w-1.5 h-3 rounded-sm ${i < runner.expertPick!.stakeRating ? 'bg-brand-purple' : 'bg-bg-elevated'}`} />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-text-secondary leading-relaxed max-w-sm">{runner.expertPick.reasoning}</p>
                        </div>
                      ) : (
                        <span className="text-xs text-text-muted">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Divergence callouts */}
        <div className="px-6 pb-6">
          {sortedRunners
            .filter((r) => r.expertPick?.confidence === 'strong-diverge' || r.expertPick?.confidence === 'diverge')
            .map((runner) => (
              <div key={runner.id} className="bg-bg-card border border-brand-amber/25 rounded-lg p-4 mb-3">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <ConfidenceBadge level={runner.expertPick!.confidence} />
                  <span className="text-sm font-semibold text-text-primary">
                    #{runner.number} {runner.horse.name} — divergence signal
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  ML: <span className="text-brand-blue font-mono">{runner.mlWinProbability.toFixed(1)}%</span> · Expert:{' '}
                  <span className="text-brand-purple font-mono">{runner.expertPick!.winProbability.toFixed(1)}%</span> · Gap:{' '}
                  <span className="font-mono text-brand-amber">
                    {runner.expertPick!.winProbability - runner.mlWinProbability > 0 ? '+' : ''}
                    {(runner.expertPick!.winProbability - runner.mlWinProbability).toFixed(1)}%
                  </span>
                </p>
                <p className="text-xs text-text-muted mt-2">
                  This divergence suggests the expert has qualitative information not captured in the ML feature set — stable reports, trainer comments, or leading market intelligence.
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
