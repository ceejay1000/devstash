# Current Feature

<!-- Feature Name -->

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

Populate the database with sample data for development and demos:

- **Demo user** — `demo@devstash.io`, password `12345678` (bcryptjs, 12 rounds), `isPro: false`
- **System item types** — 7 types (snippet, prompt, command, note, file, image, link)
- **Collections & items:**
  - React Patterns — 3 TypeScript snippets (hooks, component patterns, utilities)
  - AI Workflows — 3 prompts (code review, docs generation, refactoring)
  - DevOps — 1 snippet, 1 command, 2 links (real URLs)
  - Terminal Commands — 4 commands (git, docker, process management, package manager)
  - Design Resources — 4 links (real URLs: Tailwind, component libs, design systems, icons)

## Notes

<!-- Any extra notes -->

- Overwrite the existing `prisma/seed.ts`
- Reference: @context/features/seed-spec.md

## History

<!-- Keep this updated. Earliest to latest -->

- **Initial Next.js project setup** with Create Next App, TypeScript, and Tailwind CSS v4
- Boilerplate cleanup (Removed default SVGs and placeholder content)
- **Dashboard UI Phase 1** — ShadCN initialized, `/dashboard` route with dark mode, top bar with search and new item button, placeholder sidebar and main areas
- **Dashboard UI Phase 2** — Collapsible sidebar with item type nav links, favorite/recent collections, user avatar area, mobile drawer support
- **Dashboard UI Phase 3** — Stats cards, pinned items, recent collections, and recent items in the main content area
- **Database setup** — Prisma 7 with Neon PostgreSQL, full schema with NextAuth models, initial migration applied, system item types seeded
