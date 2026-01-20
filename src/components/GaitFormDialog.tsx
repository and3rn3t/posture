import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { GaitAssessment } from '@/lib/types'
import { calculateGaitSpeed } from '@/lib/calculations'
import { toast } from 'sonner'

interface GaitFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (assessment: GaitAssessment) => void
}

export function GaitFormDialog({ open, onOpenChange, onSave }: GaitFormDialogProps) {
  const [stepLength, setStepLength] = useState('')
  const [cadence, setCadence] = useState('')
  const [strideTime, setStrideTime] = useState('')
  const [balanceRating, setBalanceRating] = useState([7])
  const [notes, setNotes] = useState('')

  const handleSave = () => {
    const stepLengthNum = parseFloat(stepLength)
    const cadenceNum = parseFloat(cadence)
    const strideTimeNum = parseFloat(strideTime)

    if (!stepLengthNum || !cadenceNum || !strideTimeNum) {
      toast.error('Please fill in all required measurements')
      return
    }

    if (cadenceNum < 40 || cadenceNum > 200) {
      toast.error('Cadence must be between 40-200 steps/min')
      return
    }

    const gaitSpeed = calculateGaitSpeed(stepLengthNum, cadenceNum)

    const assessment: GaitAssessment = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      stepLength: stepLengthNum,
      cadence: cadenceNum,
      strideTime: strideTimeNum,
      balanceRating: balanceRating[0],
      notes: notes.trim() || undefined,
      gaitSpeed,
    }

    onSave(assessment)
    toast.success('Gait assessment saved successfully')
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setStepLength('')
    setCadence('')
    setStrideTime('')
    setBalanceRating([7])
    setNotes('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">New Gait Assessment</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="step-length">Step Length</Label>
            <div className="flex gap-2">
              <Input
                id="step-length"
                type="number"
                placeholder="65"
                value={stepLength}
                onChange={(e) => setStepLength(e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center px-3 text-sm text-muted-foreground">
                cm
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cadence">Cadence</Label>
            <div className="flex gap-2">
              <Input
                id="cadence"
                type="number"
                placeholder="110"
                value={cadence}
                onChange={(e) => setCadence(e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center px-3 text-sm text-muted-foreground">
                steps/min
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="stride-time">Stride Time</Label>
            <div className="flex gap-2">
              <Input
                id="stride-time"
                type="number"
                step="0.01"
                placeholder="1.1"
                value={strideTime}
                onChange={(e) => setStrideTime(e.target.value)}
                className="flex-1"
              />
              <div className="flex items-center px-3 text-sm text-muted-foreground">
                sec
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Balance Rating</Label>
              <span className="font-mono text-lg font-medium text-foreground">
                {balanceRating[0]}/10
              </span>
            </div>
            <Slider
              value={balanceRating}
              onValueChange={setBalanceRating}
              min={1}
              max={10}
              step={1}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Additional observations..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              resetForm()
              onOpenChange(false)
            }}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Save Assessment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
