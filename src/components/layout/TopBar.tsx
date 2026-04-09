'use client';

import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TopBar() {
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-border bg-background shrink-0">
      <span className="text-lg font-semibold tracking-tight">DevStash</span>

      <div className="flex items-center gap-2 w-full max-w-sm mx-8">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-8 h-8 bg-muted border-0"
          />
        </div>
      </div>

      <Button size="sm" className="gap-1.5 shrink-0">
        <Plus className="h-4 w-4" />
        New Item
      </Button>
    </header>
  );
}
