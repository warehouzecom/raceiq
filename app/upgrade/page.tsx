import Link from 'next/link'

const tiers = [
  {
    name: 'Free',
    price: { mu: 'Rs 0', au: '$0' },
    period: 'forever',
    color: 'border-bg-border',
    features: [
      { label: 'Race cards & fields', included: true },
      { label: 'Going reports', included: true },
      { label: 'Basic form (last 3 runs)', included: true },
      { label: 'Track and race info', included: true },
      { label: 'ML win probabilities', included: false },
      { label: 'Expert picks', included: false },
      { label: 'ML vs Expert comparison', included: false },
      { label: 'AI race narratives', included: false },
      { label: 'Fantasy leagues', included: false },
      { label: 'ELO leaderboard', included: false },
    ],
    cta: 'Current plan',
    ctaClass: 'bg-bg-elevated text-text-secondary cursor-default',
  },
  {
    name: 'Pro',
    price: { mu: 'Rs 399', au: '$9.99' },
    period: '/month',
    color: 'border-brand-blue/40',
    highlight: false,
    features: [
      { label: 'Race cards & fields', included: true },
      { label: 'Going reports', included: true },
      { label: 'Full form history (all runs)', included: true },
      { label: 'Track and race info', included: true },
      { label: 'ML win probabilities', included: true },
      { label: 'Expert picks', included: false },
      { label: 'ML vs Expert comparison', included: false },
      { label: 'AI race narratives', included: true },
      { label: 'Fantasy leagues', included: false },
      { label: 'ELO leaderboard (view only)', included: true },
    ],
    cta: 'Start Pro trial',
    ctaClass: 'bg-brand-blue text-white hover:bg-brand-blue/90',
  },
  {
    name: 'Elite',
    price: { mu: 'Rs 999', au: '$24.99' },
    period: '/month',
    color: 'border-brand-purple/50',
    highlight: true,
    badge: 'Most popular',
    features: [
      { label: 'Everything in Pro', included: true },
      { label: 'Expert picks & stake ratings', included: true },
      { label: 'ML vs Expert full comparison', included: true },
      { label: 'Expert reasoning (full text)', included: true },
      { label: 'Fantasy leagues — create & join', included: true },
      { label: 'ELO leaderboard + history', included: true },
      { label: 'Horse going & track stats', included: true },
      { label: 'Trainer/jockey combo stats', included: true },
      { label: 'API access (100 req/day)', included: true },
      { label: 'Priority support', included: true },
    ],
    cta: 'Upgrade to Elite',
    ctaClass: 'bg-brand-purple text-white hover:bg-brand-purple/90',
  },
]

export default function UpgradePage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-text-primary">
            Unlock the full intelligence layer
          </h1>
          <p className="text-text-secondary mt-3 max-w-xl mx-auto">
            ML predictions, expert picks, head-to-head comparisons, and fantasy leagues. Everything a serious turfist needs in one platform.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-xs text-text-muted">Prices shown in</span>
            <span className="text-xs px-2 py-0.5 rounded bg-bg-elevated text-text-secondary border border-bg-border">Mauritius (Rs)</span>
            <span className="text-xs text-text-muted">&</span>
            <span className="text-xs px-2 py-0.5 rounded bg-bg-elevated text-text-secondary border border-bg-border">Australia (A$)</span>
          </div>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative bg-bg-card border-2 rounded-xl p-6 flex flex-col ${tier.color} ${tier.highlight ? 'shadow-lg shadow-brand-purple/10' : ''}`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-brand-purple text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {(tier as { badge?: string }).badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h2 className="text-lg font-bold text-text-primary">{tier.name}</h2>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-text-primary">{tier.price.mu}</span>
                  <span className="text-text-muted text-sm ml-1">{tier.period}</span>
                  <br />
                  <span className="text-sm text-text-secondary">{tier.price.au}{tier.period !== 'forever' ? tier.period : ''}</span>
                </div>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {tier.features.map((f) => (
                  <li key={f.label} className="flex items-start gap-2.5">
                    <span className={`mt-0.5 shrink-0 ${f.included ? 'text-brand-green' : 'text-text-muted'}`}>
                      {f.included ? (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7L5.5 10.5L12 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                    <span className={`text-sm ${f.included ? 'text-text-secondary' : 'text-text-muted'}`}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${tier.ctaClass}`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Expert tier */}
        <div className="mt-6 bg-bg-card border border-bg-border rounded-xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-bold text-text-primary">Expert / Tipster</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-brand-amber/15 text-brand-amber border border-brand-amber/25">Application only</span>
              </div>
              <p className="text-sm text-text-secondary max-w-xl">
                Verified tipsters submit predictions before race lock, build an ELO ranking, and earn reputation on the platform. Your picks appear in the ML vs Expert comparison for Elite subscribers.
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
                {['Expert portal access', 'ELO ranking & profile', 'Tip submission workflow', 'Post-race performance tracking', 'Anonymous or named identity'].map((f) => (
                  <li key={f} className="text-xs text-text-muted flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-brand-amber shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <button className="shrink-0 py-2.5 px-5 rounded-lg font-semibold text-sm border border-brand-amber/30 text-brand-amber hover:bg-brand-amber/10 transition-colors">
              Apply to be an Expert
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-8 space-y-3">
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">FAQ</h3>
          {[
            { q: 'Can I cancel anytime?', a: 'Yes. Cancel at any time and your access continues until the end of your billing period. No questions asked.' },
            { q: 'How accurate are the ML predictions?', a: 'The ML model currently achieves >55% win prediction accuracy on flat races at Champ de Mars. Accuracy improves as more historical data is ingested. Check the ELO leaderboard for live model performance.' },
            { q: 'Which markets are covered?', a: 'Phase 1 covers Mauritius (MTCJC/Champ de Mars) and Australia (Racing & Sports). UK/Ireland via The Racing API is on the Phase 2 roadmap.' },
            { q: 'What is a Stake Rating?', a: 'Expert tipsters rate their confidence from 1–5 bars. A 5-bar stake is a maximum confidence selection. This is not financial advice.' },
          ].map(({ q, a }) => (
            <div key={q} className="bg-bg-card border border-bg-border rounded-lg px-4 py-3">
              <p className="text-sm font-medium text-text-primary">{q}</p>
              <p className="text-sm text-text-secondary mt-1">{a}</p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-center text-text-muted">
          RaceIQ is an intelligence platform. Predictions are analytical tools, not financial advice. Please gamble responsibly.
        </p>
      </div>
    </div>
  )
}
