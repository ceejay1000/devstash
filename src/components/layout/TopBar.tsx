'use client';

import { Menu, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TopBarProps {
  onMenuToggle: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <header className="flex items-center gap-2 h-14 px-3 lg:px-4 border-b border-border bg-background shrink-0">
      {/* Left: menu toggle + logo */}
      <div className="flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="icon" onClick={onMenuToggle} className="h-8 w-8">
          <Menu className="h-4 w-4" />
        </Button>
        <span className="hidden sm:block text-base font-semibold tracking-tight">DevStash</span>
      </div>

      {/* Center: search — grows to fill available space */}
      <div className="relative flex-1 max-w-sm mx-auto">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search..."
          className="pl-8 h-8 bg-muted border-0 w-full"
        />
      </div>

      {/* Right: new item */}
      <Button size="sm" className="shrink-0 gap-1.5">
        <Plus className="h-4 w-4" />
        <span className="hidden sm:inline">New Item</span>
      </Button>
    </header>
  );
}
