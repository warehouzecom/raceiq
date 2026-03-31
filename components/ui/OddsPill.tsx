interface OddsPillProps {
  odds: number
  format?: 'decimal' | 'fractional'
}

function toFractional(decimal: number): string {
  const numerator = Math.round((decimal - 1) * 10)
  const denominator = 10
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const g = gcd(numerator, denominator)
  return `${numerator / g}/${denominator / g}`
}

export function OddsPill({ odds, format = 'decimal' }: OddsPillProps) {
  const label = format === 'decimal' ? `$${odds.toFixed(1)}` : toFractional(odds)
  const isShort = odds < 3.5
  const isLong = odds > 10

  return (
    <span
      className={`inline-block font-mono text-xs font-semibold px-2 py-0.5 rounded ${
        isShort
          ? 'bg-brand-green/15 text-brand-green'
          : isLong
          ? 'bg-text-muted/20 text-text-secondary'
          : 'bg-bg-elevated text-text-primary'
      }`}
    >
      {label}
    </span>
  )
}
