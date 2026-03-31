import { eloLeaderboard } from '@/lib/data/leaderboard'

export default function LeaderboardPage() {
  const sorted = [...eloLeaderboard].sort((a, b) => b.elo - a.elo)
  const mlEntry = sorted.find((e) => e.type === 'ml')
  const humanEntries = sorted.filter((e) => e.type === 'human')

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">ELO Leaderboard</h1>
          <p className="text-sm text-text-secondary mt-1">
            ML model vs human experts ranked by prediction accuracy (ELO rating, win rate, ROI)
          </p>
        </div>

        {/* ML Engine card */}
        {mlEntry && (
          <div className="mb-6 bg-bg-card border border-brand-green/30 rounded-xl p-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-green/15 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M3 17L8 9L12 13L15 7L19 12" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-text-primary">{mlEntry.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-brand-green/15 text-brand-green border border-brand-green/25 font-medium">ML</span>
                    <span className="text-xs text-brand-green">↑ trending up</span>
                  </div>
                  <p className="text-sm text-text-secondary">{mlEntry.wins} wins from {mlEntry.predictions} predictions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-mono font-bold text-brand-green">{mlEntry.elo}</p>
                <p className="text-xs text-text-muted">ELO rating</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-bg-border">
              {[
                { label: 'Win rate', value: `${((mlEntry.wins / mlEntry.predictions) * 100).toFixed(1)}%` },
                { label: 'ROI', value: `+${mlEntry.roi}%` },
                { label: 'Predictions', value: mlEntry.predictions },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-text-muted">{label}</p>
                  <p className="text-sm font-semibold text-text-primary">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Human experts table */}
        <div className="bg-bg-card border border-bg-border rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-bg-border bg-bg-elevated/30">
            <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Human Experts</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-bg-border">
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted w-10">Rank</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted">Expert</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted text-right">ELO</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted text-right hidden sm:table-cell">W/R</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted text-right hidden sm:table-cell">Win %</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted text-right">ROI</th>
                <th className="px-4 py-2.5 text-xs font-medium text-text-muted text-right hidden md:table-cell">Trend</th>
              </tr>
            </thead>
            <tbody>
              {humanEntries.map((entry, idx) => (
                <tr key={entry.id} className="border-b border-bg-border/50 hover:bg-bg-elevated/20 transition-colors">
                  <td className="px-4 py-3">
                    <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-bold ${
                      idx === 0 ? 'bg-brand-amber/20 text-brand-amber' :
                      idx === 1 ? 'bg-text-muted/20 text-text-secondary' :
                      'bg-bg-elevated text-text-muted'
                    }`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-text-primary">{entry.name}</p>
                    <p className="text-xs text-text-muted">{entry.predictions} predictions</p>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm text-text-primary">{entry.elo}</td>
                  <td className="px-4 py-3 text-right text-xs text-text-secondary hidden sm:table-cell">
                    {entry.wins}/{entry.predictions}
                  </td>
                  <td className="px-4 py-3 text-right text-sm hidden sm:table-cell">
                    <span className="font-mono text-text-primary">{((entry.wins / entry.predictions) * 100).toFixed(1)}%</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-sm font-mono ${entry.roi >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                      {entry.roi >= 0 ? '+' : ''}{entry.roi}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right hidden md:table-cell">
                    <span className={`text-sm ${entry.trend === 'up' ? 'text-brand-green' : entry.trend === 'down' ? 'text-brand-red' : 'text-text-muted'}`}>
                      {entry.trend === 'up' ? '↑' : entry.trend === 'down' ? '↓' : '→'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-text-muted text-center">
          ELO ratings updated after each race day. Formula based on predicted vs actual win probability with Elo K-factor 32.
        </p>
      </div>
    </div>
  )
}
