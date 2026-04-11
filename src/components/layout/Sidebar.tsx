'use client';

import { useState } from 'react';
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
  ChevronUp,
  Star,
  Settings,
} from 'lucide-react';
import type { ElementType } from 'react';
import { Button } from '@/components/ui/button';
import type { SidebarType } from '@/lib/db/items';
import type { SidebarCollection } from '@/lib/db/collections';

const ICON_MAP: { [key: string]: ElementType } = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  Link: LinkIcon,
};

const TYPE_ICON_CLASS: { [key: string]: string } = {
  snippet: 'text-blue-500',
  prompt:  'text-violet-500',
  command: 'text-orange-500',
  note:    'text-yellow-300',
  file:    'text-gray-400',
  image:   'text-pink-500',
  link:    'text-emerald-500',
};

const TYPE_DOT_CLASS: { [key: string]: string } = {
  snippet: 'bg-blue-500',
  prompt:  'bg-violet-500',
  command: 'bg-orange-500',
  note:    'bg-yellow-300',
  file:    'bg-gray-400',
  image:   'bg-pink-500',
  link:    'bg-emerald-500',
};

export type SidebarUser = { name: string; email: string };

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  types: SidebarType[];
  collections: SidebarCollection[];
  user: SidebarUser | null;
}

export function Sidebar({ isOpen, onClose, types, collections, user }: SidebarProps) {
  const [typesOpen, setTypesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const recentCollections = collections.filter((c) => !c.isFavorite);

  const userInitials = user?.name
    .split(' ')
    .map((n) => n[0])
    .join('') ?? '?';

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-30 flex flex-col w-56 bg-sidebar border-r border-sidebar-border',
          'transition-transform duration-200 ease-in-out',
          'lg:static lg:z-auto lg:transition-none',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          !isOpen ? 'lg:hidden' : 'lg:translate-x-0',
        ].join(' ')}
      >
        {/* Mobile close */}
        <div className="flex items-center justify-between px-3 h-12 border-b border-sidebar-border lg:hidden shrink-0">
          <span className="text-sm font-semibold">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-1">

          {/* Types section */}
          <div>
            <button
              type="button"
              onClick={() => setTypesOpen((o) => !o)}
              className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Types</span>
              <ChevronUp className={`h-3 w-3 transition-transform ${typesOpen ? '' : 'rotate-180'}`} />
            </button>

            {typesOpen && (
              <ul className="mt-0.5">
                {types.map((type) => {
                  const Icon = ICON_MAP[type.icon];
                  const iconClass = TYPE_ICON_CLASS[type.name] ?? 'text-gray-400';
                  return (
                    <li key={type.id}>
                      <Link
                        href={`/items/${type.name}s`}
                        className="flex items-center gap-2.5 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                      >
                        {Icon && <Icon className={`h-3.5 w-3.5 shrink-0 ${iconClass}`} />}
                        <span className="flex-1 capitalize">{type.name}s</span>
                        <span className="text-xs text-muted-foreground">{type.itemCount}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Divider */}
          <div className="mx-3 border-t border-sidebar-border" />

          {/* Collections section */}
          <div>
            <button
              type="button"
              onClick={() => setCollectionsOpen((o) => !o)}
              className="flex items-center justify-between w-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>Collections</span>
              <ChevronUp className={`h-3 w-3 transition-transform ${collectionsOpen ? '' : 'rotate-180'}`} />
            </button>

            {collectionsOpen && (
              <div className="mt-0.5 space-y-3">
                {/* Favorites */}
                {favoriteCollections.length > 0 && (
                  <div>
                    <p className="px-3 py-1 text-xs text-muted-foreground/60 uppercase tracking-wider">
                      Favorites
                    </p>
                    <ul>
                      {favoriteCollections.map((col) => (
                        <li key={col.id}>
                          <Link
                            href={`/collections/${col.id}`}
                            className="flex items-center gap-2 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                          >
                            <span className="flex-1 truncate">{col.name}</span>
                            <Star className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recents */}
                {recentCollections.length > 0 && (
                  <div>
                    <p className="px-3 py-1 text-xs text-muted-foreground/60 uppercase tracking-wider">
                      Recents
                    </p>
                    <ul>
                      {recentCollections.map((col) => {
                        const dotClass = TYPE_DOT_CLASS[col.dominantTypeName] ?? 'bg-gray-400';
                        return (
                          <li key={col.id}>
                            <Link
                              href={`/collections/${col.id}`}
                              className="flex items-center gap-2 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                            >
                              <span className={`h-2 w-2 rounded-full shrink-0 ${dotClass}`} />
                              <span className="flex-1 truncate">{col.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* View all link */}
                <Link
                  href="/collections"
                  className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  View all collections →
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* User area */}
        <div className="shrink-0 border-t border-sidebar-border px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-linear-to-br from-violet-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate leading-none">{user?.name ?? '—'}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{user?.email ?? '—'}</p>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 text-muted-foreground">
              <Settings className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
