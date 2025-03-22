'use client'
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';

// Mock allocation data - in a real app, this would come from an API
const allocationData = [
  { name: 'Stocks', value: 65, color: 'hsl(210, 100%, 56%)' },
  { name: 'Bonds', value: 25, color: 'hsl(142, 76%, 36%)' },
  { name: 'Crypto', value: 10, color: 'hsl(38, 92%, 50%)' },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-3 rounded-md border border-border shadow-md">
        <p className="text-sm font-medium" style={{ color: payload[0].payload.color }}>
          {payload[0].name}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {payload[0].value}% of portfolio
        </p>
      </div>
    );
  }

  return null;
};

// Custom legend
const CustomLegend = ({ payload }: any) => {
  return (
    <ul className="flex flex-col gap-2 px-4">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <div 
            className="h-3 w-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <div className="flex items-center justify-between w-full">
            <span className="text-xs">{entry.value}</span>
            <span className="text-xs font-medium">{allocationData[index]?.value ?? 0}%</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export function AllocationChart() {
  return (
    <div className="glass-card p-4 rounded-lg h-full glass-card-hover">
      <div className="flex items-center gap-2 mb-3">
        <PieChartIcon size={18} className="text-primary" />
        <h3 className="font-medium">Asset Allocation</h3>
      </div>
      
      <div className="h-[300px] w-full flex items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {allocationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}