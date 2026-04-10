# Current Feature

<!-- Feature Name -->

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

Set up Prisma ORM with Neon PostgreSQL database:

- Configure Prisma 7 with Neon PostgreSQL (serverless)
- Create initial schema based on data models in project-overview.md
- Include NextAuth models (Account, Session, VerificationToken)
- Add appropriate indexes and cascade deletes
- Use migration workflow (`prisma migrate dev`) — never `db push`

## Notes

<!-- Any extra notes -->

- Neon has a dev branch (`DATABASE_URL`) and a production branch — always use migrations
- Use Prisma 7 (has breaking changes — read upgrade guide before implementing)
- Reference: @context/features/database-spec.md

## History

<!-- Keep this updated. Earliest to latest -->

- **Initial Next.js project setup** with Create Next App, TypeScript, and Tailwind CSS v4
- Boilerplate cleanup (Removed default SVGs and placeholder content)
- **Dashboard UI Phase 1** — ShadCN initialized, `/dashboard` route with dark mode, top bar with search and new item button, placeholder sidebar and main areas
- **Dashboard UI Phase 2** — Collapsible sidebar with item type nav links, favorite/recent collections, user avatar area, mobile drawer support
- **Dashboard UI Phase 3** — Stats cards, pinned items, recent collections, and recent items in the main content area
