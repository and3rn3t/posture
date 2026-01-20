import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GaitAssessment, PostureCheck } from '@/lib/types'
import { Footprints, UserFocus, Trash } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface HistoryProps {
  gaitAssessments: GaitAssessment[]
  postureChecks: PostureCheck[]
  onDeleteGait: (id: string) => void
  onDeletePosture: (id: string) => void
}

export function History({
  gaitAssessments,
  postureChecks,
  onDeleteGait,
  onDeletePosture,
}: HistoryProps) {
  const [filter, setFilter] = useState<'all' | 'gait' | 'posture'>('all')
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteType, setDeleteType] = useState<'gait' | 'posture' | null>(null)

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
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

  const handleDelete = () => {
    if (deleteId && deleteType) {
      if (deleteType === 'gait') {
        onDeleteGait(deleteId)
      } else {
        onDeletePosture(deleteId)
      }
    }
    setDeleteId(null)
    setDeleteType(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Assessment History
          </h1>
          <p className="text-muted-foreground mt-1">
            Review all your gait and posture records
          </p>
        </div>
      </div>

      <Tabs value={filter} onValueChange={(v: any) => setFilter(v)}>
        <TabsList>
          <TabsTrigger value="all">All Assessments</TabsTrigger>
          <TabsTrigger value="gait">Gait Only</TabsTrigger>
          <TabsTrigger value="posture">Posture Only</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {(filter === 'all' || filter === 'gait') && gaitAssessments.length > 0 && (
          <div className="space-y-3">
            {gaitAssessments.map((assessment) => (
              <Card key={assessment.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Footprints className="text-primary" weight="fill" size={24} />
                      <div>
                        <CardTitle className="text-lg">Gait Assessment</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDateTime(assessment.timestamp)}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteId(assessment.id)
                        setDeleteType('gait')
                      }}
                    >
                      <Trash className="text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Gait Speed
                      </p>
                      <p className="font-mono text-2xl font-medium mt-1">
                        {assessment.gaitSpeed.toFixed(2)}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          m/s
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Cadence
                      </p>
                      <p className="font-mono text-2xl font-medium mt-1">
                        {assessment.cadence}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          /min
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Step Length
                      </p>
                      <p className="font-mono text-2xl font-medium mt-1">
                        {assessment.stepLength}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          cm
                        </span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Balance
                      </p>
                      <p className="font-mono text-2xl font-medium mt-1">
                        {assessment.balanceRating}
                        <span className="text-sm font-normal text-muted-foreground ml-1">
                          /10
                        </span>
                      </p>
                    </div>
                  </div>
                  {assessment.notes && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                          Notes
                        </p>
                        <p className="text-sm text-foreground">{assessment.notes}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {(filter === 'all' || filter === 'posture') && postureChecks.length > 0 && (
          <div className="space-y-3">
            {postureChecks.map((check) => (
              <Card key={check.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <UserFocus className="text-primary" weight="fill" size={24} />
                      <div>
                        <CardTitle className="text-lg">Posture Check</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDateTime(check.timestamp)} • {check.timeOfDay}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteId(check.id)
                        setDeleteType('posture')
                      }}
                    >
                      <Trash className="text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(check.regions).map(([region, rating]) => (
                      <div key={region} className="space-y-2">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {region.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <Badge variant="secondary" className={getRatingColor(rating)}>
                          {rating}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  {check.observations && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
                          Observations
                        </p>
                        <p className="text-sm text-foreground">{check.observations}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {((filter === 'all' && gaitAssessments.length === 0 && postureChecks.length === 0) ||
          (filter === 'gait' && gaitAssessments.length === 0) ||
          (filter === 'posture' && postureChecks.length === 0)) && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-muted-foreground/30 mb-4">
              {filter === 'gait' ? (
                <Footprints size={64} />
              ) : filter === 'posture' ? (
                <UserFocus size={64} />
              ) : (
                <Footprints size={64} />
              )}
            </div>
            <p className="text-lg font-medium text-foreground">No assessments found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start tracking your mobility to see your history here
            </p>
          </div>
        )}
      </div>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Assessment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {deleteType} assessment? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
