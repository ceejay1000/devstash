import { Pin, Star } from 'lucide-react';
import { mockItems, mockItemTypes } from '@/lib/mock-data';

const pinnedItems = mockItems.filter((i) => i.isPinned);

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(date: Date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

export function PinnedItems() {
  if (pinnedItems.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-1.5 mb-3">
        <Pin className="h-3.5 w-3.5 text-muted-foreground" />
        <h2 className="text-sm font-semibold">Pinned</h2>
      </div>

      <div className="rounded-lg border border-border divide-y divide-border overflow-hidden">
        {pinnedItems.map((item) => {
          const type = mockItemTypes.find((t) => t.id === item.itemTypeId);
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 px-4 py-3 bg-card hover:bg-accent/30 transition-colors cursor-pointer"
            >
              {/* Type icon badge */}
              <div className={`mt-0.5 h-8 w-8 rounded-md flex items-center justify-center shrink-0 ${type?.bgClass}`}>
                <span className={`text-xs font-bold ${type?.textClass}`}>
                  {type?.name?.slice(0, 2).toUpperCase()}
                </span>
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
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
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
