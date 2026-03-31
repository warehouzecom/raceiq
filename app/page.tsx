import { Suspense } from 'react'
import { RaceDayDashboard } from './RaceDayDashboard'

export default function HomePage() {
  return (
    <Suspense>
      <RaceDayDashboard />
    </Suspense>
  )
}
