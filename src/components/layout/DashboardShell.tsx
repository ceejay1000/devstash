'use client';

import { useState, useEffect } from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  // Start closed; open automatically on desktop after mount
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setSidebarOpen(mq.matches);

    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setSidebarOpen(true);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <TopBar onMenuToggle={() => setSidebarOpen((prev) => !prev)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
