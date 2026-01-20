export interface GaitAssessment {
  id: string
  timestamp: number
  stepLength: number
  cadence: number
  strideTime: number
  balanceRating: number
  notes?: string
  gaitSpeed: number
}

export interface PostureCheck {
  id: string
  timestamp: number
  timeOfDay: 'morning' | 'afternoon' | 'evening'
  regions: {
    headNeck: 'good' | 'fair' | 'poor'
    shoulders: 'good' | 'fair' | 'poor'
    spine: 'good' | 'fair' | 'poor'
    hips: 'good' | 'fair' | 'poor'
  }
  observations?: string
}

export type AssessmentType = 'gait' | 'posture'
