'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export const BotPerformance: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bot Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Performance metrics will be displayed here.</p>
      </CardContent>
    </Card>
  )
}
