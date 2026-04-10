# Current Feature

<!-- Feature Name -->

## Dashboard Collections — Real Data

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

Replace the dummy collection data in the dashboard main area with real data from the Neon database via Prisma.

- Create `src/lib/db/collections.ts` with data fetching functions
- Fetch collections directly in server component (no client fetch)
- Collection card border color derived from the most-used content type in that collection
- Show small icons of all item types present in that collection
- Keep the current design and layout
- Update collection stats display
- Do not add items underneath yet

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
