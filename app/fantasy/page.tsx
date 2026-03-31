import Link from 'next/link'
import { races } from '@/lib/data/races'

const myStable = [
  { horseId: 'fabulous-man', name: 'Fabulous Man', race: 'CDM R4', isBanker: true, isOutsider: false, points: 18 },
  { horseId: 'star-chaser', name: 'Star Chaser', race: 'CDM R5', isBanker: false, isOutsider: false, points: 0 },
  { horseId: 'island-spirit', name: 'Island Spirit', race: 'CDM R2', isBanker: false, isOutsider: false, points: 25 },
  { horseId: 'asfoora', name: 'Asfoora', race: 'FLM R1', isBanker: false, isOutsider: false, points: 30 },
  { horseId: 'finche', name: 'Finche', race: 'FLM R2', isBanker: false, isOutsider: true, points: 0 },
]

const leagueEntries = [
  { rank: 1, user: 'TurfKing_MU', stable: 'Champ Champions', points: 142, trend: 'up' },
  { rank: 2, user: 'OddsWhisperer', stable: 'Form Lab', points: 128, trend: 'up' },
  { rank: 3, user: 'darke', stable: 'My Stable', points: 73, trend: 'flat', isMe: true },
  { rank: 4, user: 'BayBoy99', stable: 'Bay Watch', points: 68, trend: 'down' },
  { rank: 5, user: 'Seebaluck_Fan', stable: 'Thunder Strike', points: 61, trend: 'up' },
]

const totalPoints = myStable.reduce((s, h) => s + h.points, 0)

export default function FantasyPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Fantasy Racing</h1>
            <p className="text-sm text-text-secondary">Week of 5 Apr 2026 · Draft closes Monday 7 Apr</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-muted">My points</p>
            <p className="text-3xl font-mono font-bold text-brand-green">{totalPoints}</p>
          </div>
        </div>

        {/* My stable */}
        <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-bg-border flex items-center justify-between">
            <p className="text-sm font-semibold text-text-primary">My Stable</p>
            <button className="text-xs px-3 py-1.5 rounded border border-bg-border text-text-secondary hover:bg-bg-elevated transition-colors">
              Edit stable
            </button>
          </div>
          <div className="divide-y divide-bg-border/50">
            {myStable.map((horse) => (
              <div key={horse.horseId} className="flex items-center gap-4 px-4 py-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link href={`/horse/${horse.horseId}`} className="text-sm font-medium text-text-primary hover:text-brand-green transition-colors">
                      {horse.name}
                    </Link>
                    {horse.isBanker && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-brand-green/15 text-brand-green border border-brand-green/25 font-medium">Banker</span>
                    )}
                    {horse.isOutsider && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-brand-amber/15 text-brand-amber border border-brand-amber/25 font-medium">Outsider</span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted">{horse.race}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-mono font-bold ${horse.points > 0 ? 'text-brand-green' : 'text-text-muted'}`}>
                    {horse.points > 0 ? `+${horse.points}` : '—'}
                  </p>
                  <p className="text-xs text-text-muted">pts</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-bg-border bg-bg-elevated/30 flex justify-between">
            <span className="text-sm text-text-secondary">Total this week</span>
            <span className="text-sm font-bold text-brand-green font-mono">{totalPoints} pts</span>
          </div>
        </div>

        {/* League standings */}
        <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-bg-border">
            <p className="text-sm font-semibold text-text-primary">Champ de Mars Classic League</p>
            <p className="text-xs text-text-muted">12 members · Week 8 of 24</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-bg-border">
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted w-10">#</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Player</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted hidden sm:table-cell">Stable</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted text-right">Points</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted text-right">Trend</th>
              </tr>
            </thead>
            <tbody>
              {leagueEntries.map((entry) => (
                <tr
                  key={entry.rank}
                  className={`border-b border-bg-border/50 transition-colors ${
                    (entry as { isMe?: boolean }).isMe ? 'bg-brand-green/5 border-brand-green/10' : 'hover:bg-bg-elevated/20'
                  }`}
                >
                  <td className="px-4 py-3">
                    <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-bold ${
                      entry.rank === 1 ? 'bg-brand-amber/20 text-brand-amber' :
                      entry.rank === 2 ? 'bg-text-muted/20 text-text-secondary' :
                      'bg-bg-elevated text-text-muted'
                    }`}>
                      {entry.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className={`text-sm font-medium ${(entry as { isMe?: boolean }).isMe ? 'text-brand-green' : 'text-text-primary'}`}>
                      {entry.user}
                      {(entry as { isMe?: boolean }).isMe && <span className="text-xs ml-1 text-brand-green/70">(you)</span>}
                    </p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <p className="text-sm text-text-secondary">{entry.stable}</p>
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-text-primary">{entry.points}</td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-sm ${entry.trend === 'up' ? 'text-brand-green' : entry.trend === 'down' ? 'text-brand-red' : 'text-text-muted'}`}>
                      {entry.trend === 'up' ? '↑' : entry.trend === 'down' ? '↓' : '→'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Scoring guide */}
        <div className="bg-bg-card border border-bg-border rounded-xl p-4">
          <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">Scoring Guide</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { event: 'Win', points: '+30 pts' },
              { event: 'Place (2nd/3rd)', points: '+10 pts' },
              { event: 'Banker wins', points: '×2 multiplier' },
              { event: 'Outsider wins', points: '×3 multiplier' },
            ].map(({ event, points }) => (
              <div key={event} className="bg-bg-base rounded-lg px-3 py-2">
                <p className="text-xs text-text-muted">{event}</p>
                <p className="text-sm font-semibold text-brand-green mt-0.5">{points}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
