import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getRace } from '@/lib/data/races'
import { getTrack } from '@/lib/data/tracks'
import { OddsPill } from '@/components/ui/OddsPill'
import { ProbabilityBar } from '@/components/ui/ProbabilityBar'
import { FormString } from '@/components/ui/FormString'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ConfidenceBadge } from '@/components/ui/ConfidenceBadge'

interface Props {
  params: Promise<{ id: string }>
}

export default async function RaceCardPage({ params }: Props) {
  const { id } = await params
  const race = getRace(id)
  if (!race) notFound()

  const track = getTrack(race.trackId)
  const sortedRunners = [...race.runners].sort((a, b) => a.number - b.number)

  return (
    <div className="flex-1 overflow-y-auto min-w-0">
      {/* Breadcrumb + header */}
      <div className="px-4 md:px-6 py-4 border-b border-bg-border sticky top-0 bg-bg-base z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-text-muted mb-1 flex-wrap">
              <Link href="/" className="hover:text-text-secondary transition-colors">Race Day</Link>
              <span>/</span>
              <Link href={`/?track=${race.trackId}`} className="hover:text-text-secondary transition-colors">
                {track?.shortName ?? race.trackId}
              </Link>
              <span>/</span>
              <span className="text-text-secondary">Race {race.number}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg md:text-xl font-semibold text-text-primary">{race.name}</h1>
              <StatusBadge status={race.status} />
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              {track?.name} · {race.time} · {race.distance}m · {race.raceClass} · {race.going} · {race.prize}
            </p>
            {race.conditions && (
              <p className="text-xs text-text-muted mt-0.5 hidden sm:block">{race.conditions}</p>
            )}
          </div>
          <Link
            href={`/compare/${race.id}`}
            className="text-xs px-3 py-1.5 rounded border border-brand-purple/30 text-brand-purple hover:bg-brand-purple/10 transition-colors font-medium whitespace-nowrap shrink-0"
          >
            ML vs Expert
          </Link>
        </div>
      </div>

      {/* Mobile runner cards */}
      <div className="md:hidden px-3 py-3 space-y-2">
        {sortedRunners.map((runner) => {
          const isTopPick = sortedRunners.reduce((a, b) =>
            a.mlWinProbability > b.mlWinProbability ? a : b
          ).id === runner.id

          return (
            <div
              key={runner.id}
              className={`bg-bg-card border rounded-lg p-3 ${isTopPick ? 'border-brand-green/30' : 'border-bg-border'}`}
            >
              {/* Horse name row */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-xs font-bold shrink-0 ${
                    isTopPick ? 'bg-brand-green text-bg-base' : 'bg-bg-elevated text-text-secondary'
                  }`}>
                    {runner.number}
                  </span>
                  <div className="min-w-0">
                    <Link
                      href={`/horse/${runner.horse.id}`}
                      className="text-sm font-semibold text-text-primary hover:text-brand-green transition-colors block truncate"
                    >
                      {runner.horse.name}
                    </Link>
                    <p className="text-xs text-text-muted">
                      {runner.horse.age}yo {runner.horse.sex} · Bar {runner.barrier}
                    </p>
                  </div>
                </div>
                <OddsPill odds={runner.odds} />
              </div>

              {/* Jockey / weight */}
              <p className="text-xs text-text-secondary mb-2">
                {runner.jockey} · {runner.jockeyWeight}kg · {runner.trainer}
              </p>

              {/* Form */}
              <div className="mb-2">
                <FormString form={runner.form} />
              </div>

              {/* ML bar */}
              <ProbabilityBar value={runner.mlWinProbability} />

              {/* Expert pick */}
              {runner.expertPick && (
                <div className="mt-2 pt-2 border-t border-bg-border/50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted">Expert:</span>
                    <span className="text-xs font-mono text-brand-purple">{runner.expertPick.winProbability.toFixed(1)}%</span>
                    <ConfidenceBadge level={runner.expertPick.confidence} />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Desktop table — hidden on mobile */}
      <div className="hidden md:block px-4 md:px-6 py-4 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="text-left border-b border-bg-border">
              <th className="pb-2 px-2 text-xs font-medium text-text-muted w-8">#</th>
              <th className="pb-2 px-2 text-xs font-medium text-text-muted w-8">Bar</th>
              <th className="pb-2 px-2 text-xs font-medium text-text-muted">Horse</th>
              <th className="pb-2 px-2 text-xs font-medium text-text-muted hidden lg:table-cell">Jockey / Trainer</th>
              <th className="pb-2 px-2 text-xs font-medium text-text-muted w-12 text-right">Wgt</th>
              <th className="pb-2 px-2 text-xs font-medium text-text-muted">Form</th>
              <th className="pb-2 px-2 text-xs font-medium text-text-muted w-16 text-right">Odds</th>
              <th className="pb-2 px-2 text-xs font-medium text-text-muted w-48">ML Win %</th>
              <th className="pb-2 px-2 text-xs font-medium text-text-muted hidden xl:table-cell">Expert</th>
            </tr>
          </thead>
          <tbody>
            {sortedRunners.map((runner) => {
              const isTopPick = sortedRunners.reduce((a, b) =>
                a.mlWinProbability > b.mlWinProbability ? a : b
              ).id === runner.id

              return (
                <tr
                  key={runner.id}
                  className="border-b border-bg-border/50 transition-colors hover:bg-bg-elevated/30"
                >
                  <td className="py-3 px-2">
                    <span className={`inline-flex w-7 h-7 items-center justify-center rounded-full text-xs font-bold ${
                      isTopPick ? 'bg-brand-green text-bg-base' : 'bg-bg-elevated text-text-secondary'
                    }`}>
                      {runner.number}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-xs font-mono text-text-muted">{runner.barrier}</span>
                  </td>
                  <td className="py-3 px-2">
                    <Link href={`/horse/${runner.horse.id}`} className="text-sm font-semibold text-text-primary hover:text-brand-green transition-colors">
                      {runner.horse.name}
                    </Link>
                    <p className="text-xs text-text-muted mt-0.5">{runner.horse.age}yo {runner.horse.sex} · {runner.horse.colour}</p>
                  </td>
                  <td className="py-3 px-2 hidden lg:table-cell">
                    <p className="text-xs font-medium text-text-secondary">{runner.jockey}</p>
                    <p className="text-xs text-text-muted">{runner.trainer}</p>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="text-xs font-mono text-text-secondary">{runner.jockeyWeight}kg</span>
                  </td>
                  <td className="py-3 px-2">
                    <FormString form={runner.form} />
                  </td>
                  <td className="py-3 px-2 text-right">
                    <OddsPill odds={runner.odds} />
                  </td>
                  <td className="py-3 px-2">
                    <ProbabilityBar value={runner.mlWinProbability} />
                  </td>
                  <td className="py-3 px-2 hidden xl:table-cell">
                    {runner.expertPick ? (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-text-primary font-semibold">{runner.expertPick.winProbability.toFixed(1)}%</span>
                          <ConfidenceBadge level={runner.expertPick.confidence} />
                        </div>
                        <p className="text-xs text-text-muted">{runner.expertPick.expertName}</p>
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

      {/* AI Narrative */}
      <div className="px-4 md:px-6 pb-6">
        <div className="bg-bg-card border border-bg-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <div className="w-5 h-5 rounded bg-brand-purple/20 flex items-center justify-center shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="#a855f7" />
              </svg>
            </div>
            <span className="text-xs font-medium text-brand-purple">RaceIQ AI Narrative</span>
            <span className="ml-auto text-xs text-text-muted">Generated 35 min ago</span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {race.id.startsWith('cdm') ? (
              <>
                <span className="text-text-primary font-medium">Race {race.number} — {race.name}:</span>{' '}
                The ML model is most confident about the top two selections — significant probability separation from the remainder of the field.
                The going at Champ de Mars is rated Good after recent rainfall; this benefits horses with proven wet-track records.
                Watch for barrier advantage: inside runners (barriers 1–3) at this track have a statistically significant edge over 1400–1800m due to the tight left-hand turn at the 900m mark.
              </>
            ) : (
              <>
                <span className="text-text-primary font-medium">Race {race.number} — {race.name}:</span>{' '}
                Flemington's straight configuration over the opening furlongs rewards gate speed. The Good to Firm surface is rated ideal for the top-rated horses in this field.
                The ML model has identified a notable divergence between market pricing and predicted win probabilities for runners 2 and 4 — worth monitoring for late market movement.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
