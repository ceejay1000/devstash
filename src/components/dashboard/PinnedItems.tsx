import type { ElementType } from 'react';
import { Pin, Star, Code, Sparkles, Terminal, StickyNote, File, Image, Link as LinkIcon } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getPinnedItems } from '@/lib/db/items';

const ICON_MAP: { [key: string]: ElementType } = {
  Code, Sparkles, Terminal, StickyNote, File, Image, Link: LinkIcon,
};

const TYPE_BG_CLASS: { [key: string]: string } = {
  snippet: 'bg-blue-500/10',
  prompt:  'bg-violet-500/10',
  command: 'bg-orange-500/10',
  note:    'bg-yellow-300/10',
  file:    'bg-gray-400/10',
  image:   'bg-pink-500/10',
  link:    'bg-emerald-500/10',
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

const TYPE_TAG_CLASS: { [key: string]: string } = {
  snippet: 'bg-blue-500/15 text-blue-400',
  prompt:  'bg-violet-500/15 text-violet-400',
  command: 'bg-orange-500/15 text-orange-400',
  note:    'bg-yellow-300/15 text-yellow-300',
  file:    'bg-gray-400/15 text-gray-400',
  image:   'bg-pink-500/15 text-pink-400',
  link:    'bg-emerald-500/15 text-emerald-400',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(date: Date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

export async function PinnedItems() {
  const user = await prisma.user.findUnique({
    where: { email: 'demo@devstash.io' },
    select: { id: true },
  });

  if (!user) return null;

  const items = await getPinnedItems(user.id);

  if (items.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-1.5 mb-3">
        <Pin className="h-3.5 w-3.5 text-muted-foreground" />
        <h2 className="text-sm font-semibold">Pinned</h2>
      </div>

      <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
        {items.map((item) => {
          const Icon = ICON_MAP[item.typeIcon];
          const bgClass = TYPE_BG_CLASS[item.typeName] ?? 'bg-gray-400/10';
          const iconClass = TYPE_ICON_CLASS[item.typeName] ?? 'text-gray-400';
          const tagClass = TYPE_TAG_CLASS[item.typeName] ?? 'bg-gray-400/15 text-gray-400';
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 px-4 py-3 bg-card hover:bg-accent/30 transition-colors cursor-pointer"
            >
              {/* Type icon badge */}
              <div className={`mt-0.5 h-8 w-8 rounded-md flex items-center justify-center shrink-0 ${bgClass}`}>
                {Icon && <Icon className={`h-4 w-4 ${iconClass}`} />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-sm font-medium truncate">{item.title}</span>
                  {item.isFavorite && <Star className="h-3 w-3 shrink-0 fill-yellow-400 text-yellow-400" />}
                  <Pin className="h-3 w-3 shrink-0 text-muted-foreground" />
                </div>
                {item.description && (
                  <p className="text-xs text-muted-foreground truncate mb-1.5">{item.description}</p>
                )}
                <div className="flex flex-wrap gap-1">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${tagClass}`}>
                    {item.typeName}
                  </span>
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Date */}
              <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
                {formatDate(item.createdAt)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
