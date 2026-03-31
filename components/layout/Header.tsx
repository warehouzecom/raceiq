'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/', label: 'Race Day' },
  { href: '/compare/cdm-r5', label: 'ML vs Expert' },
  { href: '/leaderboard', label: 'Leaderboard' },
  { href: '/fantasy', label: 'Fantasy' },
]

export function Header() {
  const path = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-bg-border bg-bg-base/95 backdrop-blur">
      <div className="flex items-center justify-between h-14 px-4 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-brand-green flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 12L6 6L9 9L12 4L14 7" stroke="#0b0e17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-semibold text-text-primary tracking-tight">
            Race<span className="text-brand-green">IQ</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded text-sm transition-colors ${
                path === href || (href !== '/' && path.startsWith(href))
                  ? 'text-text-primary bg-bg-elevated'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/50'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-brand-purple/15 text-brand-purple border border-brand-purple/25 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
            Elite
          </span>
          <Link
            href="/upgrade"
            className="text-xs px-3 py-1.5 rounded bg-brand-green text-bg-base font-semibold hover:bg-brand-green/90 transition-colors whitespace-nowrap"
          >
            Upgrade
          </Link>
        </div>
      </div>
    </header>
  )
}
