import { cache } from 'react';
import { prisma } from '@/lib/prisma';

/**
 * Cached per-request user lookup. React's cache() deduplicates this call so all
 * server components in a single render share one database round-trip.
 */
export const getDemoUser = cache(() =>
  prisma.user.findUnique({
    where: { email: 'demo@devstash.io' },
    select: { id: true, name: true, email: true },
  })
);
