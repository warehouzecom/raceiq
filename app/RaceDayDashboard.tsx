'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { tracks } from '@/lib/data/tracks'
import { getRacesByTrack } from '@/lib/data/races'
import { TrackSidebar } from '@/components/layout/TrackSidebar'
import { RightPanel } from '@/components/layout/RightPanel'
import { OddsPill } from '@/components/ui/OddsPill'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ProbabilityBar } from '@/components/ui/ProbabilityBar'

const flagMap: Record<string, string> = { MU: '🇲🇺', AU: '🇦🇺', GB: '🇬🇧', IE: '🇮🇪' }

export function RaceDayDashboard() {
  const params = useSearchParams()
  const trackId = params.get('track') ?? 'champ-de-mars'

  const track = tracks.find((t) => t.id === trackId) ?? tracks[0]
  const races = getRacesByTrack(track.id)
  const nextRace = races.find((r) => r.status === 'open' || r.status === 'upcoming')
  const raceDayTracks = tracks.filter((t) => t.raceDay)

  return (
    <>
      {/* Desktop sidebar — hidden on mobile */}
      <div className="hidden md:block">
        <TrackSidebar selectedTrackId={track.id} />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto min-w-0">
        {/* Track header */}
        <div className="px-4 md:px-6 py-4 border-b border-bg-border bg-bg-base sticky top-0 z-10">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h1 className="text-base md:text-lg font-semibold text-text-primary truncate">{track.name}</h1>
              <p className="text-xs text-text-secondary">
                {track.country} · {track.surface} · {races.length} races
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-text-muted">Going</p>
                <p className="text-sm font-medium text-text-primary">{races[0]?.going ?? '—'}</p>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs text-text-muted">Prize</p>
                <p className="text-sm font-medium text-text-primary">
                  {track.countryCode === 'MU' ? 'Rs 2.05M' : 'A$3.13M'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile track switcher */}
        <div className="md:hidden overflow-x-auto border-b border-bg-border bg-bg-base">
          <div className="flex gap-2 px-4 py-2 min-w-max">
            {raceDayTracks.map((t) => (
              <Link
                key={t.id}
                href={`/?track=${t.id}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
                  t.id === trackId
                    ? 'bg-brand-green/15 text-brand-green border-brand-green/30'
                    : 'bg-bg-card text-text-secondary border-bg-border'
                }`}
              >
                <span>{flagMap[t.countryCode] ?? '🏁'}</span>
                <span>{t.shortName}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Race list */}
        <div className="px-3 md:px-6 py-3 md:py-4 space-y-2">
          {races.map((race) => {
            const topPick = race.runners.reduce((a, b) =>
              a.mlWinProbability > b.mlWinProbability ? a : b
            )
            const isActive = race.status === 'open' || race.status === 'upcoming'

            return (
              <Link
                key={race.id}
                href={`/race/${race.id}`}
                className={`block bg-bg-card border rounded-lg overflow-hidden transition-all hover:bg-bg-elevated/30 ${
                  isActive ? 'border-brand-green/20' : 'border-bg-border'
                }`}
              >
                {/* Race header */}
                <div className="flex items-center gap-3 px-3 md:px-4 py-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold shrink-0 ${
                    isActive ? 'bg-brand-green text-bg-base' : 'bg-bg-elevated text-text-secondary'
                  }`}>
                    R{race.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-text-primary truncate">{race.name}</span>
                      <StatusBadge status={race.status} />
                    </div>
                    <p className="text-xs text-text-secondary mt-0.5 truncate">
                      {race.time} · {race.distance}m · {race.raceClass} · {race.prize}
                    </p>
                  </div>

                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-xs text-text-muted">{race.runners.length} runners</p>
                  </div>

                  <svg className="w-4 h-4 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Runners preview */}
                {isActive && (
                  <div className="border-t border-bg-border px-3 md:px-4 py-2 bg-bg-base/30">
                    <div className="space-y-1">
                      {race.runners
                        .slice()
                        .sort((a, b) => b.mlWinProbability - a.mlWinProbability)
                        .slice(0, 3)
                        .map((runner, idx) => (
                          <div key={runner.id} className="flex items-center gap-2 md:gap-3">
                            <span className="text-xs text-text-muted w-3 text-right shrink-0">{idx + 1}</span>
                            <span className="text-xs font-mono text-text-muted w-4 shrink-0">#{runner.number}</span>
                            <span className="text-xs font-medium text-text-secondary flex-1 truncate min-w-0">{runner.horse.name}</span>
                            <OddsPill odds={runner.odds} />
                            <div className="w-24 md:w-32 hidden sm:block">
                              <ProbabilityBar value={runner.mlWinProbability} size="sm" />
                            </div>
                            <span className="sm:hidden text-xs font-mono text-text-primary">{runner.mlWinProbability.toFixed(0)}%</span>
                          </div>
                        ))}
                    </div>
                    <p className="text-xs text-text-muted mt-1.5">
                      ML pick: <span className="text-brand-green font-medium">#{topPick.number} {topPick.horse.name}</span>
                      <span className="hidden sm:inline"> — {topPick.mlWinProbability.toFixed(1)}% win probability</span>
                    </p>
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Desktop right panel — hidden on mobile */}
      <div className="hidden lg:block">
        <RightPanel nextRace={nextRace} />
      </div>
    </>
  )
}
