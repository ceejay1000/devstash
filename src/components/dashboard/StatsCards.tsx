import { Package, FolderOpen, Star, Bookmark } from 'lucide-react';
import { getDemoUser } from '@/lib/db/user';
import { getDashboardStats } from '@/lib/db/items';

export async function StatsCards() {
  const user = await getDemoUser();

  const stats = user
    ? await getDashboardStats(user.id)
    : { totalItems: 0, totalCollections: 0, favoriteItems: 0, favoriteCollections: 0 };

  const cards = [
    { label: 'Items', value: stats.totalItems, icon: Package },
    { label: 'Collections', value: stats.totalCollections, icon: FolderOpen },
    { label: 'Favorite Items', value: stats.favoriteItems, icon: Star },
    { label: 'Favorite Collections', value: stats.favoriteCollections, icon: Bookmark },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((stat) => {
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
