'use client';

import { MoreHorizontal } from 'lucide-react';

export function CollectionMoreButton() {
  return (
    <button
      type="button"
      aria-label="More options"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-opacity shrink-0"
    >
      <MoreHorizontal className="h-4 w-4" />
    </button>
  );
}
