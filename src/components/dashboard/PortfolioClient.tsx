'use client'
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

// Dynamic imports with ssr:false (allowed in client components)
const PerformanceChart = dynamic(
  () => import('@/components/dashboard/PerformanceChart').then(mod => mod.PerformanceChart),
  { 
    ssr: false, 
    loading: () => <div className="h-[300px] animate-pulse bg-background/50 rounded-lg" />
  }
);

const AllocationChart = dynamic(
  () => import('@/components/dashboard/AllocationChart').then(mod => mod.AllocationChart),
  { 
    ssr: false, 
    loading: () => <div className="h-[300px] animate-pulse bg-background/50 rounded-lg" />
  }
);

const StockWatchlist = dynamic(
  () => import('@/components/dashboard/StockWatchlist').then(mod => mod.StockWatchlist),
  { 
    ssr: false, 
    loading: () => <div className="h-[100px] animate-pulse bg-background/50 rounded-lg" />
  }
);

export function PortfolioClient() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PerformanceChart />
        <AllocationChart />
      </div>
      
      <StockWatchlist />
      
      <div className="glass-card p-8 rounded-lg text-center">
        <h2 className="text-lg font-medium mb-2">Want personalized investment advice?</h2>
        <p className="text-muted-foreground mb-4">
          Our AI advisor can analyze your portfolio and suggest optimizations.
        </p>
        <Button>Get AI Analysis</Button>
      </div>
    </div>
  );
}
