import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { MobileBottomNav } from '@/components/layout/MobileNav'

export const metadata: Metadata = {
  title: 'RaceIQ — Horse Racing Intelligence',
  description: 'ML predictions, expert tips, and fantasy racing in one platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg-base text-text-primary">
        <Header />
        <main className="flex h-[calc(100vh-3.5rem)] overflow-hidden pb-[56px] md:pb-0">
          {children}
        </main>
        <MobileBottomNav />
      </body>
    </html>
  )
}
