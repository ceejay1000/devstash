'use client';

import Link from 'next/link';
import { Star, MoreHorizontal, Code, Sparkles, Terminal, StickyNote, File, Image, Link as LinkIcon } from 'lucide-react';
import { mockCollections, mockItemTypes } from '@/lib/mock-data';

const ICON_MAP: { [key: string]: React.ElementType } = {
  Code, Sparkles, Terminal, StickyNote, File, Image, Link: LinkIcon,
};

export function RecentCollections() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">Collections</h2>
        <Link href="/collections" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {mockCollections.map((col) => (
          <Link
            key={col.id}
            href={`/collections/${col.id}`}
            className="group relative flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:bg-accent/30 transition-colors"
          >
            {/* Colored left border */}
            <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${col.borderClass}`} />

            <div className="pl-4 pr-3 pt-3 pb-3 flex flex-col gap-1">
              {/* Header */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-sm font-medium truncate">{col.name}</span>
                  {col.isFavorite && <Star className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400" />}
                </div>
                <button
                  type="button"
                  aria-label="More options"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity shrink-0"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground">{col.itemCount} items</p>

              {col.description && (
                <p className="text-xs text-muted-foreground line-clamp-1">{col.description}</p>
              )}

              {/* Type icons */}
              <div className="flex items-center gap-1.5 mt-1">
                {col.typeIds.map((typeId) => {
                  const type = mockItemTypes.find((t) => t.id === typeId);
                  if (!type) return null;
                  const Icon = ICON_MAP[type.icon];
                  return Icon ? <Icon key={typeId} className={`h-3.5 w-3.5 ${type.textClass}`} /> : null;
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
