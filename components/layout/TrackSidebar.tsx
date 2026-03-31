'use client'
import Link from 'next/link'
import { tracks } from '@/lib/data/tracks'

interface TrackSidebarProps {
  selectedTrackId: string
}

const flagMap: Record<string, string> = {
  MU: '🇲🇺',
  AU: '🇦🇺',
  GB: '🇬🇧',
  IE: '🇮🇪',
}

export function TrackSidebar({ selectedTrackId }: TrackSidebarProps) {
  const raceDayTracks = tracks.filter((t) => t.raceDay)
  const otherTracks = tracks.filter((t) => !t.raceDay)

  return (
    <aside className="w-52 shrink-0 border-r border-bg-border bg-bg-base flex flex-col">
      <div className="px-3 py-3 border-b border-bg-border">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wider">Today</p>
        <p className="text-xs text-text-secondary mt-0.5">Sat 5 Apr 2026</p>
      </div>

      {/* Race day tracks */}
      <div className="px-2 py-2">
        <p className="text-xs text-text-muted uppercase tracking-wider px-1 mb-1">Live Meetings</p>
        {raceDayTracks.map((track) => (
          <Link
            key={track.id}
            href={`/?track=${track.id}`}
            className={`flex items-center gap-2.5 px-2 py-2 rounded-md mb-0.5 transition-colors group ${
              selectedTrackId === track.id
                ? 'bg-bg-elevated text-text-primary'
                : 'text-text-secondary hover:bg-bg-elevated/50 hover:text-text-primary'
            }`}
          >
            <span className="text-base leading-none shrink-0">{flagMap[track.countryCode] ?? '🏁'}</span>
            <div className="min-w-0">
              <p className={`text-sm font-medium truncate leading-tight ${selectedTrackId === track.id ? 'text-text-primary' : ''}`}>
                {track.shortName}
              </p>
              <p className="text-xs text-text-muted truncate leading-tight">{track.name}</p>
            </div>
            {selectedTrackId === track.id && (
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
            )}
          </Link>
        ))}
      </div>

      {otherTracks.length > 0 && (
        <div className="px-2 py-2 border-t border-bg-border">
          <p className="text-xs text-text-muted uppercase tracking-wider px-1 mb-1">Coming Up</p>
          {otherTracks.map((track) => (
            <div key={track.id} className="flex items-center gap-2.5 px-2 py-2 opacity-50">
              <span className="text-base leading-none">{flagMap[track.countryCode] ?? '🏁'}</span>
              <div className="min-w-0">
                <p className="text-sm text-text-secondary truncate">{track.shortName}</p>
                <p className="text-xs text-text-muted truncate">{track.nextMeeting}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Source badge */}
      <div className="mt-auto px-3 py-3 border-t border-bg-border">
        <p className="text-xs text-text-muted">Data from</p>
        <p className="text-xs text-text-secondary font-medium">MTCJC · Racing & Sports</p>
      </div>
    </aside>
  )
}
