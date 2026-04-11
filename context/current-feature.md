# Current Feature

<!-- Feature Name -->

## Stats & Sidebar — Real Data

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

Show stats in the main area from the database and replace mock data in the sidebar with real data.

- Display stats pertaining to database data, keeping the current design/layout
- Display item types in sidebar with their icons, linking to `/items/[typename]`
- Add "View all collections" link under the collections list that goes to `/collections`
- Keep the star icons for favorite collections; for recents, each collection should show a colored circle based on the most-used item type in that collection

## Notes

<!-- Any extra notes -->

Reference `src/lib/db/collections.ts` for the data fetching pattern.

## History

<!-- Keep this updated. Earliest to latest -->

- **Initial Next.js project setup** with Create Next App, TypeScript, and Tailwind CSS v4
- Boilerplate cleanup (Removed default SVGs and placeholder content)
- **Dashboard UI Phase 1** — ShadCN initialized, `/dashboard` route with dark mode, top bar with search and new item button, placeholder sidebar and main areas
- **Dashboard UI Phase 2** — Collapsible sidebar with item type nav links, favorite/recent collections, user avatar area, mobile drawer support
- **Dashboard UI Phase 3** — Stats cards, pinned items, recent collections, and recent items in the main content area
- **Database setup** — Prisma 7 with Neon PostgreSQL, full schema with NextAuth models, initial migration applied, system item types seeded
- **Seed data** — Demo user, 5 collections, 15 items (snippets, prompts, commands, links)
- **Dashboard collections** — RecentCollections converted to async server component, real Prisma queries via `src/lib/db/collections.ts`, border color and type icons derived from most-used item type per collection
- **Dashboard items** — PinnedItems, RecentItems, and StatsCards converted to async server components, real Prisma queries via `src/lib/db/items.ts`, Lucide icon badges and colored type chips derived from item type
