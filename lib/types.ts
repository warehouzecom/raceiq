export type Going = 'Firm' | 'Good to Firm' | 'Good' | 'Good to Soft' | 'Soft' | 'Heavy'
export type RaceClass = 'Class I' | 'Class II' | 'Class III' | 'Class IV' | 'Class V' | 'Maiden' | 'Restricted' | 'Handicap' | 'Listed' | 'Group 1' | 'Group 2' | 'Group 3'
export type RaceStatus = 'upcoming' | 'open' | 'closed' | 'result'
export type ConfidenceLevel = 'agree' | 'slight-agree' | 'diverge' | 'strong-diverge'
export type SubscriptionTier = 'free' | 'pro' | 'elite'

export interface Track {
  id: string
  name: string
  shortName: string
  country: string
  countryCode: string
  timezone: string
  surface: 'Turf' | 'Synthetic' | 'Dirt'
  source: 'MTCJC' | 'Racing & Sports' | 'The Racing API'
  raceDay: boolean
  nextMeeting: string
}

export interface Race {
  id: string
  trackId: string
  number: number
  name: string
  time: string
  distance: number
  going: Going
  raceClass: RaceClass
  prize: string
  status: RaceStatus
  runners: Runner[]
  conditions?: string
}

export interface Runner {
  id: string
  raceId: string
  number: number
  barrier: number
  horse: Horse
  jockey: string
  jockeyWeight: number
  trainer: string
  form: string
  odds: number
  mlWinProbability: number
  expertPick?: ExpertPick
  scratchedAt?: string
}

export interface Horse {
  id: string
  name: string
  age: number
  sex: 'G' | 'M' | 'F' | 'H' | 'C'
  colour: string
  sire: string
  dam: string
  trainer: string
  owner: string
  country: string
  rating?: number
  formHistory: FormRun[]
  goingStats: GoingStat[]
}

export interface FormRun {
  date: string
  track: string
  distance: number
  going: Going
  class: string
  position: number
  runners: number
  jockey: string
  weight: number
  odds: number
  margin: number
  comment: string
}

export interface GoingStat {
  going: Going
  runs: number
  wins: number
  places: number
  winRate: number
}

export interface ExpertPick {
  expertId: string
  expertName: string
  winProbability: number
  stakeRating: 1 | 2 | 3 | 4 | 5
  reasoning: string
  confidence: ConfidenceLevel
}

export interface EloEntry {
  id: string
  name: string
  type: 'ml' | 'human'
  elo: number
  wins: number
  predictions: number
  roi: number
  trend: 'up' | 'down' | 'flat'
}

export interface FantasyStable {
  id: string
  userId: string
  name: string
  horses: string[]
  banker: string
  outsider: string
  points: number
  weekRank: number
}
