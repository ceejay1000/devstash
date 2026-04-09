import { Package, FolderOpen, Star, Bookmark } from 'lucide-react';
import { mockItems, mockCollections } from '@/lib/mock-data';

const stats = [
  {
    label: 'Items',
    value: mockItems.length,
    icon: Package,
  },
  {
    label: 'Collections',
    value: mockCollections.length,
    icon: FolderOpen,
  },
  {
    label: 'Favorite Items',
    value: mockItems.filter((i) => i.isFavorite).length,
    icon: Star,
  },
  {
    label: 'Favorite Collections',
    value: mockCollections.filter((c) => c.isFavorite).length,
    icon: Bookmark,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-semibold">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
