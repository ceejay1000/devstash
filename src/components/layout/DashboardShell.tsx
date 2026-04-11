'use client';

import { useState, useEffect } from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import type { SidebarUser } from './Sidebar';
import type { SidebarType } from '@/lib/db/items';
import type { SidebarCollection } from '@/lib/db/collections';

export type SidebarData = {
  types: SidebarType[];
  collections: SidebarCollection[];
  user: SidebarUser | null;
};

const isDesktop = () => window.innerWidth >= 1024;

export function DashboardShell({ children, sidebarData }: { children: React.ReactNode; sidebarData: SidebarData }) {
  // Starts false on both server and client — no hydration mismatch.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // rAF makes this a callback, not a direct synchronous setState in the effect body.
    const rafId = requestAnimationFrame(() => setSidebarOpen(isDesktop()));

    const onResize = () => { if (isDesktop()) setSidebarOpen(true); };
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setSidebarOpen(isDesktop());
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('pageshow', onPageShow);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <TopBar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          types={sidebarData.types}
          collections={sidebarData.collections}
          user={sidebarData.user}
        />
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
