'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart as LineChartIcon } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';
import { ChartError } from './ChartError';

// Mock performance data - in a real app, this would come from an API
const performanceData = [
  { date: 'Jan', value: 42000 },
  { date: 'Feb', value: 43200 },
  { date: 'Mar', value: 41800 },
  { date: 'Apr', value: 42500 },
  { date: 'May', value: 44300 },
  { date: 'Jun', value: 45100 },
  { date: 'Jul', value: 47200 },
  { date: 'Aug', value: 46800 },
  { date: 'Sep', value: 50400 },
  { date: 'Oct', value: 51200 },
  { date: 'Nov', value: 53500 },
  { date: 'Dec', value: 54200 },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 rounded-md border border-border shadow-md">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-sm font-medium">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

export function PerformanceChart() {
  return (
    <ErrorBoundary fallback={<ChartError />}>
      <div className="glass-card p-4 rounded-lg h-full glass-card-hover">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <LineChartIcon size={18} className="text-primary" />
            <h3 className="font-medium">Portfolio Performance</h3>
          </div>
          <div className="text-xs text-muted-foreground">Last 12 months</div>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, stroke: 'hsl(var(--background))', strokeWidth: 2 }}
                fill="url(#colorValue)" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ErrorBoundary>
  );
}