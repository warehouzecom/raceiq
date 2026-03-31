interface FormStringProps {
  form: string
}

export function FormString({ form }: FormStringProps) {
  const chars = form.replace(/-/g, '').split('')

  return (
    <div className="flex gap-0.5 items-center">
      {chars.map((c, i) => {
        const isWin = c === '1'
        const isPlace = c === '2' || c === '3'
        const cls = isWin
          ? 'bg-brand-green text-bg-base'
          : isPlace
          ? 'bg-brand-green/30 text-brand-green'
          : 'bg-bg-elevated text-text-secondary'
        return (
          <span key={i} className={`inline-flex items-center justify-center w-5 h-5 rounded text-xs font-mono font-semibold ${cls}`}>
            {c}
          </span>
        )
      })}
    </div>
  )
}
