'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export const RunningBots: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Running Bots</CardTitle>
      </CardHeader>
      <CardContent>
        <p>List of running bots will be displayed here.</p>
      </CardContent>
    </Card>
  )
}
