'use client'

import React from 'react'
import styles from './ProgressTracker.module.css'

interface ProgressTrackerProps {
  value: number
  max: number
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ value, max }) => {
  const percentage = (value / max) * 100
  return (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div
        className={styles.progressBar}
        style={{ width: `${percentage}%` }}
        title={`Progress: ${percentage}%`}
      ></div>
    </div>
  )
}
