'use client'
import React from 'react'

export function ChartError() {
  return (
    <div className="flex items-center justify-center h-[300px] bg-background/50 rounded-lg border border-border">
      <p className="text-sm text-muted-foreground">Unable to load chart</p>
    </div>
  )
}
