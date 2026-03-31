'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/', label: 'Race Day', icon: '🏇' },
  { href: '/compare/cdm-r5', label: 'ML vs Expert', icon: '⚡' },
  { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  { href: '/fantasy', label: 'Fantasy', icon: '⭐' },
]

export function MobileBottomNav() {
  const path = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-bg-base/95 backdrop-blur border-t border-bg-border">
      <div className="flex items-stretch">
        {nav.map(({ href, label, icon }) => {
          const active = path === href || (href !== '/' && path.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-colors ${
                active ? 'text-brand-green' : 'text-text-muted'
              }`}
            >
              <span className="text-lg leading-none">{icon}</span>
              <span className="text-[10px] font-medium leading-tight">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
