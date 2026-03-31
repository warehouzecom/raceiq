import { Track } from '@/lib/types'

export const tracks: Track[] = [
  {
    id: 'champ-de-mars',
    name: 'Champ de Mars',
    shortName: 'CDM',
    country: 'Mauritius',
    countryCode: 'MU',
    timezone: 'Indian/Mauritius',
    surface: 'Turf',
    source: 'MTCJC',
    raceDay: true,
    nextMeeting: '2026-04-05',
  },
  {
    id: 'flemington',
    name: 'Flemington',
    shortName: 'FLM',
    country: 'Australia',
    countryCode: 'AU',
    timezone: 'Australia/Melbourne',
    surface: 'Turf',
    source: 'Racing & Sports',
    raceDay: true,
    nextMeeting: '2026-04-05',
  },
  {
    id: 'rosehill',
    name: 'Rosehill Gardens',
    shortName: 'ROS',
    country: 'Australia',
    countryCode: 'AU',
    timezone: 'Australia/Sydney',
    surface: 'Turf',
    source: 'Racing & Sports',
    raceDay: true,
    nextMeeting: '2026-04-05',
  },
  {
    id: 'randwick',
    name: 'Royal Randwick',
    shortName: 'RAN',
    country: 'Australia',
    countryCode: 'AU',
    timezone: 'Australia/Sydney',
    surface: 'Turf',
    source: 'Racing & Sports',
    raceDay: false,
    nextMeeting: '2026-04-12',
  },
]

export function getTrack(id: string): Track | undefined {
  return tracks.find((t) => t.id === id)
}
