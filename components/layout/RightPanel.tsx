import Link from 'next/link'
import { Race } from '@/lib/types'
import { OddsPill } from '@/components/ui/OddsPill'
import { ProbabilityBar } from '@/components/ui/ProbabilityBar'

interface RightPanelProps {
  nextRace?: Race
  topPick?: { name: string; prob: number; odds: number; race: string }
}

export function RightPanel({ nextRace, topPick }: RightPanelProps) {
  const nextRunner = nextRace?.runners.reduce((a, b) =>
    a.mlWinProbability > b.mlWinProbability ? a : b
  )

  return (
    <aside className="w-64 shrink-0 border-l border-bg-border bg-bg-base flex flex-col gap-4 p-4">
      {/* Next race countdown */}
      {nextRace && (
        <div className="bg-bg-card border border-bg-border rounded-lg p-3">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Next Race</p>
          <p className="text-sm font-semibold text-text-primary leading-tight">{nextRace.name}</p>
          <p className="text-xs text-text-secondary mt-0.5">
            Race {nextRace.number} · {nextRace.time} · {nextRace.distance}m
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-xs text-brand-green font-medium">Predictions live</span>
          </div>
        </div>
      )}

      {/* Top ML pick */}
      {nextRace && nextRunner && (
        <div className="bg-bg-card border border-bg-border rounded-lg p-3">
          <p className="text-xs text-text-muted uppercase tracking-wider mb-2">ML Top Pick</p>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-text-primary">
                #{nextRunner.number} {nextRunner.horse.name}
              </p>
              <p className="text-xs text-text-secondary mt-0.5">{nextRunner.jockey}</p>
            </div>
            <OddsPill odds={nextRunner.odds} />
          </div>
          <div className="mt-2">
            <ProbabilityBar value={nextRunner.mlWinProbability} size="sm" />
          </div>
          <Link
            href={`/race/${nextRace.id}`}
            className="mt-3 block text-center text-xs py-1.5 rounded bg-brand-green/10 text-brand-green hover:bg-brand-green/20 transition-colors font-medium"
          >
            View full race card →
          </Link>
        </div>
      )}

      {/* Expert pick teaser */}
      <div className="bg-bg-card border border-brand-purple/20 rounded-lg p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
          <p className="text-xs text-brand-purple font-medium uppercase tracking-wider">Expert Pick</p>
        </div>
        {nextRace?.runners.find((r) => r.expertPick) ? (
          <>
            <p className="text-xs text-text-secondary">
              Elite subscribers see full expert reasoning + stake ratings
            </p>
            <Link
              href={`/compare/${nextRace.id}`}
              className="mt-2 block text-center text-xs py-1.5 rounded bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20 transition-colors font-medium"
            >
              ML vs Expert →
            </Link>
          </>
        ) : (
          <p className="text-xs text-text-muted">No expert picks for this race</p>
        )}
      </div>

      {/* Quick links */}
      <div className="mt-auto space-y-1">
        <Link href="/leaderboard" className="block text-xs text-text-secondary hover:text-text-primary py-1 transition-colors">
          → ELO Leaderboard
        </Link>
        <Link href="/fantasy" className="block text-xs text-text-secondary hover:text-text-primary py-1 transition-colors">
          → My Fantasy Stable
        </Link>
        <Link href="/upgrade" className="block text-xs text-text-secondary hover:text-text-primary py-1 transition-colors">
          → Subscription plans
        </Link>
      </div>
    </aside>
  )
}
