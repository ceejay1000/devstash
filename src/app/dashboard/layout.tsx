import { getDemoUser } from '@/lib/db/user';
import { getSidebarTypes } from '@/lib/db/items';
import { getSidebarCollections } from '@/lib/db/collections';
import { DashboardShell } from '@/components/layout/DashboardShell';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getDemoUser();

  const [types, collections] = user
    ? await Promise.all([getSidebarTypes(user.id), getSidebarCollections(user.id)])
    : [[], []];

  const sidebarData = {
    types,
    collections,
    user: user ? { name: user.name ?? 'User', email: user.email } : null,
  };

  return <DashboardShell sidebarData={sidebarData}>{children}</DashboardShell>;
}
