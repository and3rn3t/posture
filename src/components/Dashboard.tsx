import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MobilityScoreRing } from './MobilityScoreRing'
import { MetricCard } from './MetricCard'
import { GaitAssessment, PostureCheck } from '@/lib/types'
import { calculateMobilityScore, getScoreLabel } from '@/lib/calculations'
import { Footprints, UserFocus, Plus } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'

interface DashboardProps {
  gaitAssessments: GaitAssessment[]
  postureChecks: PostureCheck[]
  onNewGait: () => void
  onNewPosture: () => void
}

export function Dashboard({
  gaitAssessments,
  postureChecks,
  onNewGait,
  onNewPosture,
}: DashboardProps) {
  const mobilityScore = calculateMobilityScore(gaitAssessments, postureChecks)
  const scoreLabel = getScoreLabel(mobilityScore)

  const recentGait = gaitAssessments.slice(0, 3)
  const recentPosture = postureChecks.slice(0, 3)

  const getRecentMetrics = () => {
    if (gaitAssessments.length === 0) return null

    const recent = gaitAssessments.slice(0, 5)
    const avgSpeed = recent.reduce((sum, a) => sum + a.gaitSpeed, 0) / recent.length
    const avgCadence = recent.reduce((sum, a) => sum + a.cadence, 0) / recent.length
    const avgBalance = recent.reduce((sum, a) => sum + a.balanceRating, 0) / recent.length

    return {
      speed: avgSpeed.toFixed(2),
      cadence: Math.round(avgCadence),
      balance: avgBalance.toFixed(1),
    }
  }

  const metrics = getRecentMetrics()

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getRatingColor = (rating: 'good' | 'fair' | 'poor') => {
    switch (rating) {
      case 'good':
        return 'bg-accent text-accent-foreground'
      case 'fair':
        return 'bg-secondary text-secondary-foreground'
      case 'poor':
        return 'bg-destructive text-destructive-foreground'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Mobility Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your gait, posture, and movement health
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onNewGait} size="sm">
            <Plus className="mr-2" weight="bold" />
            Gait
          </Button>
          <Button onClick={onNewPosture} variant="outline" size="sm">
            <Plus className="mr-2" weight="bold" />
            Posture
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2 lg:col-span-1">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <MobilityScoreRing score={mobilityScore} />
            <div className="mt-4 text-center">
              <p className="text-lg font-semibold text-foreground">{scoreLabel}</p>
              <p className="text-sm text-muted-foreground">Overall Mobility</p>
            </div>
          </CardContent>
        </Card>

        {metrics && (
          <>
            <MetricCard label="Avg Gait Speed" value={metrics.speed} unit="m/s" />
            <MetricCard label="Avg Cadence" value={metrics.cadence} unit="steps/min" />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Footprints className="text-primary" weight="fill" size={24} />
              Recent Gait Assessments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentGait.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Footprints size={48} className="text-muted-foreground/30 mb-4" />
                <p className="text-sm text-muted-foreground">No gait assessments yet</p>
                <Button onClick={onNewGait} variant="link" className="mt-2">
                  Create your first assessment
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentGait.map((assessment) => (
                  <div
                    key={assessment.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xl font-medium">
                          {assessment.gaitSpeed.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground">m/s</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(assessment.timestamp)}
                      </p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">
                        Balance: {assessment.balanceRating}/10
                      </p>
                      <p className="text-muted-foreground">
                        {assessment.cadence} steps/min
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <UserFocus className="text-primary" weight="fill" size={24} />
              Recent Posture Checks
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentPosture.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <UserFocus size={48} className="text-muted-foreground/30 mb-4" />
                <p className="text-sm text-muted-foreground">No posture checks yet</p>
                <Button onClick={onNewPosture} variant="link" className="mt-2">
                  Log your first check
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentPosture.map((check) => (
                  <div
                    key={check.id}
                    className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium capitalize">{check.timeOfDay}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(check.timestamp)}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(check.regions).map(([region, rating]) => (
                        <Badge
                          key={region}
                          variant="secondary"
                          className={getRatingColor(rating)}
                        >
                          {region.replace(/([A-Z])/g, ' $1').trim()}: {rating}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
