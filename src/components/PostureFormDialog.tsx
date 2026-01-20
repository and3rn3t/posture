import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { PostureCheck } from '@/lib/types'
import { toast } from 'sonner'

interface PostureFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (check: PostureCheck) => void
}

type PostureRating = 'good' | 'fair' | 'poor'

export function PostureFormDialog({ open, onOpenChange, onSave }: PostureFormDialogProps) {
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning')
  const [headNeck, setHeadNeck] = useState<PostureRating>('good')
  const [shoulders, setShoulders] = useState<PostureRating>('good')
  const [spine, setSpine] = useState<PostureRating>('good')
  const [hips, setHips] = useState<PostureRating>('good')
  const [observations, setObservations] = useState('')

  const handleSave = () => {
    const check: PostureCheck = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      timeOfDay,
      regions: {
        headNeck,
        shoulders,
        spine,
        hips,
      },
      observations: observations.trim() || undefined,
    }

    onSave(check)
    toast.success('Posture check saved successfully')
    resetForm()
    onOpenChange(false)
  }

  const resetForm = () => {
    setTimeOfDay('morning')
    setHeadNeck('good')
    setShoulders('good')
    setSpine('good')
    setHips('good')
    setObservations('')
  }

  const RatingSelector = ({
    label,
    value,
    onChange,
  }: {
    label: string
    value: PostureRating
    onChange: (value: PostureRating) => void
  }) => (
    <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
      <Label className="text-sm font-medium">{label}</Label>
      <RadioGroup value={value} onValueChange={(v) => onChange(v as PostureRating)}>
        <div className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="good" id={`${label}-good`} />
            <Label htmlFor={`${label}-good`} className="font-normal cursor-pointer">
              Good
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fair" id={`${label}-fair`} />
            <Label htmlFor={`${label}-fair`} className="font-normal cursor-pointer">
              Fair
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="poor" id={`${label}-poor`} />
            <Label htmlFor={`${label}-poor`} className="font-normal cursor-pointer">
              Poor
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Log Posture Check</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="time-of-day">Time of Day</Label>
            <Select value={timeOfDay} onValueChange={(v: any) => setTimeOfDay(v)}>
              <SelectTrigger id="time-of-day">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Body Region Alignment
            </h3>
            <RatingSelector label="Head & Neck" value={headNeck} onChange={setHeadNeck} />
            <RatingSelector label="Shoulders" value={shoulders} onChange={setShoulders} />
            <RatingSelector label="Spine" value={spine} onChange={setSpine} />
            <RatingSelector label="Hips" value={hips} onChange={setHips} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations">Observations (Optional)</Label>
            <Textarea
              id="observations"
              placeholder="Any specific notes or concerns..."
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
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
            Save Check
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
