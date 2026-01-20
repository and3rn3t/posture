import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface MobilityScoreRingProps {
  score: number
}

export function MobilityScoreRing({ score }: MobilityScoreRingProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (displayScore / 100) * circumference

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0
      const interval = setInterval(() => {
        current += 1
        setDisplayScore(current)
        if (current >= score) {
          clearInterval(interval)
        }
      }, 20)
      return () => clearInterval(interval)
    }, 300)
    return () => clearTimeout(timer)
  }, [score])

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'oklch(0.68 0.15 145)'
    if (s >= 65) return 'oklch(0.45 0.08 200)'
    if (s >= 50) return 'oklch(0.55 0.02 240)'
    return 'oklch(0.55 0.22 25)'
  }

  return (
    <div className="relative flex items-center justify-center">
      <svg width="200" height="200" className="transform -rotate-90">
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="oklch(0.90 0.005 240)"
          strokeWidth="12"
          fill="none"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          stroke={getScoreColor(displayScore)}
          strokeWidth="12"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4, type: 'spring' }}
          className="font-mono text-5xl font-medium text-foreground"
        >
          {displayScore}
        </motion.span>
        <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Score
        </span>
      </div>
    </div>
  )
}
