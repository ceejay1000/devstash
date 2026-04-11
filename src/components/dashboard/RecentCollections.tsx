import type { ElementType } from 'react';
import Link from 'next/link';
import { Star, Code, Sparkles, Terminal, StickyNote, File, Image, Link as LinkIcon } from 'lucide-react';
import { getDemoUser } from '@/lib/db/user';
import { getRecentCollections } from '@/lib/db/collections';
import { CollectionMoreButton } from './CollectionMoreButton';

const ICON_MAP: { [key: string]: ElementType } = {
  Code, Sparkles, Terminal, StickyNote, File, Image, Link: LinkIcon,
};

const TYPE_BORDER_CLASS: { [name: string]: string } = {
  snippet: 'bg-blue-500',
  prompt:  'bg-violet-500',
  command: 'bg-orange-500',
  note:    'bg-yellow-300',
  file:    'bg-gray-400',
  image:   'bg-pink-500',
  link:    'bg-emerald-500',
};

const TYPE_ICON_CLASS: { [name: string]: string } = {
  snippet: 'text-blue-500',
  prompt:  'text-violet-500',
  command: 'text-orange-500',
  note:    'text-yellow-300',
  file:    'text-gray-400',
  image:   'text-pink-500',
  link:    'text-emerald-500',
};

export async function RecentCollections() {
  const user = await getDemoUser();

  if (!user) return null;

  const collections = await getRecentCollections(user.id);

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">Collections</h2>
        <Link href="/collections" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {collections.map((col) => {
          const borderClass = TYPE_BORDER_CLASS[col.dominantTypeName] ?? 'bg-gray-400';
          return (
            <Link
              key={col.id}
              href={`/collections/${col.id}`}
              className="group relative flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:bg-accent/30 transition-colors"
            >
              {/* Colored left border derived from most-used item type */}
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${borderClass}`} />

              <div className="pl-4 pr-3 pt-3 pb-3 flex flex-col gap-1">
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-sm font-medium truncate">{col.name}</span>
                    {col.isFavorite && <Star className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400" />}
                  </div>
                  <CollectionMoreButton />
                </div>

                <p className="text-xs text-muted-foreground">{col.itemCount} items</p>

                {col.description && (
                  <p className="text-xs text-muted-foreground line-clamp-1">{col.description}</p>
                )}

                {/* Icons for each distinct item type in this collection */}
                {col.types.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-1">
                    {col.types.map((type) => {
                      const Icon = ICON_MAP[type.icon];
                      const iconClass = TYPE_ICON_CLASS[type.name] ?? 'text-gray-400';
                      return Icon ? (
                        <Icon key={type.name} className={`h-3.5 w-3.5 ${iconClass}`} />
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
