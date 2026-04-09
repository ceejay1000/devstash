'use client';

import { PanelLeft, Search, FolderPlus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TopBarProps {
  onMenuToggle: () => void;
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <header className="flex items-center gap-3 h-12 px-3 border-b border-border bg-background shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="h-6 w-6 rounded bg-linear-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold select-none">
          S
        </div>
        <span className="hidden sm:block text-sm font-semibold tracking-tight">DevStash</span>
      </div>

      {/* Sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuToggle}
        className="h-7 w-7 text-muted-foreground hover:text-foreground shrink-0"
      >
        <PanelLeft className="h-4 w-4" />
      </Button>

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search items..."
          className="pl-8 pr-12 h-8 bg-muted border-0 text-sm"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground bg-background/50 px-1 rounded">
          ⌘K
        </span>
      </div>

      <div className="flex items-center gap-2 ml-auto shrink-0">
        {/* New Collection */}
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs hidden sm:flex">
          <FolderPlus className="h-3.5 w-3.5" />
          New Collection
        </Button>

        {/* New Item */}
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New Item</span>
        </Button>
      </div>
    </header>
  );
}
