'use client'
import React from 'react';
import { Eye, ArrowRight, ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Stock = {
  id: number;
  ticker: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  prediction: 'buy' | 'sell' | 'hold';
};

// Mock watchlist data - in a real app, this would come from an API
const watchlistStocks: Stock[] = [
  {
    id: 1,
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: '$195.18',
    change: '+2.45%',
    isPositive: true,
    prediction: 'buy',
  },
  {
    id: 2,
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: '$152.20',
    change: '+0.86%',
    isPositive: true,
    prediction: 'hold',
  },
  {
    id: 3,
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    price: '$251.05',
    change: '-1.23%',
    isPositive: false,
    prediction: 'sell',
  },
  {
    id: 4,
    ticker: 'AMZN',
    name: 'Amazon.com Inc.',
    price: '$178.75',
    change: '+1.67%',
    isPositive: true,
    prediction: 'buy',
  },
  {
    id: 5,
    ticker: 'META',
    name: 'Meta Platforms Inc.',
    price: '$472.14',
    change: '+0.45%',
    isPositive: true,
    prediction: 'hold',
  },
];

export function StockWatchlist() {
  return (
    <div className="glass-card p-4 rounded-lg h-full glass-card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Eye size={18} className="text-primary" />
          <h3 className="font-medium">Stock Watchlist</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
          View All <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
      
      <div className="rounded-md border border-border/50 overflow-hidden">
        <Table>
          <TableHeader className="bg-background/40">
            <TableRow>
              <TableHead className="font-medium">Ticker</TableHead>
              <TableHead className="font-medium">Price</TableHead>
              <TableHead className="font-medium">Change</TableHead>
              <TableHead className="font-medium">AI Prediction</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlistStocks.map((stock) => (
              <TableRow key={stock.id} className="hover:bg-background/50">
                <TableCell>
                  <div>
                    <p className="font-medium">{stock.ticker}</p>
                    <p className="text-xs text-muted-foreground">{stock.name}</p>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{stock.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {stock.isPositive ? (
                      <ArrowUp size={14} className="text-market-positive" />
                    ) : (
                      <ArrowDown size={14} className="text-market-negative" />
                    )}
                    <span className={cn(
                      stock.isPositive ? "text-market-positive" : "text-market-negative"
                    )}>
                      {stock.change}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    stock.prediction === 'buy' && "bg-success/20 text-success",
                    stock.prediction === 'sell' && "bg-alert/20 text-alert",
                    stock.prediction === 'hold' && "bg-warning/20 text-warning"
                  )}>
                    {stock.prediction}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Buy Stock</DropdownMenuItem>
                      <DropdownMenuItem>Remove from Watchlist</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}