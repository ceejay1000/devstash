import { prisma } from '@/lib/prisma';

export type CollectionCard = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  dominantTypeName: string;
  types: { name: string; icon: string }[];
};

export async function getRecentCollections(userId: string): Promise<CollectionCard[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    take: 6,
    include: {
      defaultType: true,
      items: {
        include: {
          item: {
            include: {
              itemType: true,
            },
          },
        },
      },
    },
  });

  return collections.map((col) => {
    const itemCount = col.items.length;

    // Build type frequency map from actual items
    const typeMap: { [id: string]: { count: number; name: string; icon: string } } = {};
    for (const ic of col.items) {
      const t = ic.item.itemType;
      if (!typeMap[t.id]) {
        typeMap[t.id] = { count: 0, name: t.name, icon: t.icon };
      }
      typeMap[t.id].count++;
    }

    const typeEntries = Object.values(typeMap);

    // Border type = most-used type, fallback to defaultType or 'file' (gray)
    let dominantTypeName = col.defaultType?.name ?? 'file';
    if (typeEntries.length > 0) {
      const dominant = typeEntries.reduce((a, b) => (a.count >= b.count ? a : b));
      dominantTypeName = dominant.name;
    }

    // All distinct types sorted by count descending
    const types = typeEntries
      .sort((a, b) => b.count - a.count)
      .map(({ name, icon }) => ({ name, icon }));

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount,
      dominantTypeName,
      types,
    };
  });
}
