'use client';

import Link from 'next/link';
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link as LinkIcon,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockUser, mockItemTypes, mockCollections } from '@/lib/mock-data';

const ICON_MAP: Record<string, React.ElementType> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: LinkIcon,
};

const favoriteCollections = mockCollections.filter((c) => c.isFavorite);
const recentCollections = mockCollections.slice(0, 4);

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const userInitials = mockUser.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-30 flex flex-col w-60 bg-sidebar border-r border-sidebar-border',
          'transition-transform duration-200 ease-in-out',
          'lg:static lg:z-auto lg:transition-none',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          !isOpen ? 'lg:hidden' : 'lg:translate-x-0',
        ].join(' ')}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-sidebar-border lg:hidden shrink-0">
          <span className="text-sm font-semibold">DevStash</span>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
          {/* Item Types */}
          <section>
            <p className="px-2 mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Types
            </p>
            <ul className="space-y-0.5">
              {mockItemTypes.map((type) => {
                const Icon = ICON_MAP[type.icon];
                return (
                  <li key={type.id}>
                    <Link
                      href={`/items/${type.name}s`}
                      className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    >
                      {Icon && (
                        <Icon className="h-4 w-4 shrink-0" style={{ color: type.color }} />
                      )}
                      <span className="capitalize">{type.name}s</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Favorite Collections */}
          {favoriteCollections.length > 0 && (
            <section>
              <p className="px-2 mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Favorites
              </p>
              <ul className="space-y-0.5">
                {favoriteCollections.map((col) => (
                  <li key={col.id}>
                    <Link
                      href={`/collections/${col.id}`}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    >
                      <span className="truncate">{col.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Recent Collections */}
          <section>
            <p className="px-2 mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Collections
            </p>
            <ul className="space-y-0.5">
              {recentCollections.map((col) => (
                <li key={col.id}>
                  <Link
                    href={`/collections/${col.id}`}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                  >
                    <span className="truncate">{col.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </nav>

        {/* User area */}
        <div className="shrink-0 border-t border-sidebar-border px-3 py-3">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0">
              {userInitials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate leading-none">{mockUser.name}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{mockUser.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
