import { prisma } from '@/lib/prisma';

export type SidebarType = {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
};

const TYPE_ORDER = ['snippet', 'prompt', 'command', 'note', 'file', 'image', 'link'];

export async function getSidebarTypes(userId: string): Promise<SidebarType[]> {
  const types = await prisma.itemType.findMany({
    where: { isSystem: true, userId: null },
    include: {
      items: {
        where: { userId },
        select: { id: true },
      },
    },
  });

  return types
    .sort((a, b) => TYPE_ORDER.indexOf(a.name) - TYPE_ORDER.indexOf(b.name))
    .map((t) => ({
      id: t.id,
      name: t.name,
      icon: t.icon,
      itemCount: t.items.length,
    }));
}

export type ItemCard = {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  tags: string[];
  createdAt: Date;
  typeName: string;
  typeIcon: string;
};

export type DashboardStats = {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
};

export async function getPinnedItems(userId: string): Promise<ItemCard[]> {
  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    orderBy: { updatedAt: 'desc' },
    include: {
      itemType: true,
      tags: true,
    },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    tags: item.tags.map((t) => t.name),
    createdAt: item.createdAt,
    typeName: item.itemType.name,
    typeIcon: item.itemType.icon,
  }));
}

export async function getRecentItems(userId: string): Promise<ItemCard[]> {
  const items = await prisma.item.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: {
      itemType: true,
      tags: true,
    },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    tags: item.tags.map((t) => t.name),
    createdAt: item.createdAt,
    typeName: item.itemType.name,
    typeIcon: item.itemType.icon,
  }));
}

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const [totalItems, totalCollections, favoriteItems, favoriteCollections] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.collection.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);

  return { totalItems, totalCollections, favoriteItems, favoriteCollections };
}
