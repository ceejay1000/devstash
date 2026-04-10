# Current Feature

<!-- Feature Name -->

## Dashboard Items — Real Data

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

Replace the dummy item data displayed in the main area of the dashboard (right side) with actual data from the database. This includes both pinned and recent items.

- Create `src/lib/db/items.ts` with data fetching functions
- Fetch items directly in server component
- Item card icon/border derived from the item type
- Display item type tags and anything else currently there
- If there are no pinned items, nothing should display there
- Update collection stats display

## Notes

<!-- Any extra notes -->

Reference `context/screenshots/dashboard-ui-main.png` if needed — layout and design are already in place.

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
