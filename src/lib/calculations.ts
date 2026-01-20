import { GaitAssessment, PostureCheck } from './types'

export function calculateGaitSpeed(stepLength: number, cadence: number): number {
  return (stepLength * cadence * 60) / 100000
}

export function calculateMobilityScore(
  gaitAssessments: GaitAssessment[],
  postureChecks: PostureCheck[]
): number {
  if (gaitAssessments.length === 0 && postureChecks.length === 0) return 0

  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  const recentGait = gaitAssessments.filter(a => a.timestamp > thirtyDaysAgo)
  const recentPosture = postureChecks.filter(p => p.timestamp > thirtyDaysAgo)

  let score = 0
  let components = 0

  if (recentGait.length > 0) {
    const avgSpeed = recentGait.reduce((sum, a) => sum + a.gaitSpeed, 0) / recentGait.length
    const avgBalance = recentGait.reduce((sum, a) => sum + a.balanceRating, 0) / recentGait.length
    const avgCadence = recentGait.reduce((sum, a) => sum + a.cadence, 0) / recentGait.length
    
    const speedScore = Math.min((avgSpeed / 1.4) * 100, 100)
    const balanceScore = (avgBalance / 10) * 100
    const cadenceScore = Math.min(((avgCadence - 80) / 40) * 100, 100)
    
    score += (speedScore + balanceScore + cadenceScore) / 3
    components++
  }

  if (recentPosture.length > 0) {
    const ratingToScore = { good: 10, fair: 6, poor: 3 }
    let totalPostureScore = 0
    let regionCount = 0

    recentPosture.forEach(check => {
      Object.values(check.regions).forEach(rating => {
        totalPostureScore += ratingToScore[rating]
        regionCount++
      })
    })

    const avgPostureScore = (totalPostureScore / regionCount) * 10
    score += avgPostureScore
    components++
  }

  return Math.round(components > 0 ? score / components : 0)
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 65) return 'Good'
  if (score >= 50) return 'Fair'
  if (score >= 35) return 'Needs Attention'
  return 'Poor'
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-accent'
  if (score >= 65) return 'text-primary'
  if (score >= 50) return 'text-secondary'
  return 'text-destructive'
}
