import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ============================================
// SYSTEM ITEM TYPES
// ============================================
const SYSTEM_TYPES = [
  { name: 'snippet', icon: 'Code',       color: '#3b82f6' },
  { name: 'prompt',  icon: 'Sparkles',   color: '#8b5cf6' },
  { name: 'command', icon: 'Terminal',   color: '#f97316' },
  { name: 'note',    icon: 'StickyNote', color: '#fde047' },
  { name: 'file',    icon: 'File',       color: '#6b7280' },
  { name: 'image',   icon: 'Image',      color: '#ec4899' },
  { name: 'link',    icon: 'Link',       color: '#10b981' },
];

async function seedItemTypes() {
  const typeMap: { [key: string]: string } = {};
  for (const type of SYSTEM_TYPES) {
    let record = await prisma.itemType.findFirst({
      where: { name: type.name, userId: null },
    });
    if (!record) {
      record = await prisma.itemType.create({
        data: { ...type, isSystem: true },
      });
    }
    typeMap[type.name] = record.id;
  }
  return typeMap;
}

// ============================================
// SEED
// ============================================
async function main() {
  console.log('Seeding database...\n');

  // ── Item types ──────────────────────────────
  console.log('→ Seeding system item types...');
  const types = await seedItemTypes();
  console.log('  ✓ Done\n');

  // ── Demo user ────────────────────────────────
  console.log('→ Seeding demo user...');
  const hashedPassword = await bcrypt.hash('12345678', 12);
  const user = await prisma.user.upsert({
    where: { email: 'demo@devstash.io' },
    update: {},
    create: {
      email: 'demo@devstash.io',
      name: 'Demo User',
      password: hashedPassword,
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log(`  ✓ ${user.email}\n`);

  // ── Collections ──────────────────────────────
  console.log('→ Seeding collections and items...');

  // React Patterns — 3 snippets
  const reactPatterns = await prisma.collection.create({
    data: {
      name: 'React Patterns',
      description: 'Reusable React patterns and hooks',
      userId: user.id,
      defaultTypeId: types['snippet'],
    },
  });

  await createItem(user.id, types['snippet'], 'useDebounce Hook', 'typescript', `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`, reactPatterns.id);

  await createItem(user.id, types['snippet'], 'Context Provider Pattern', 'typescript', `import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}`, reactPatterns.id);

  await createItem(user.id, types['snippet'], 'Array Utility Functions', 'typescript', `export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const group = String(item[key]);
    return { ...acc, [group]: [...(acc[group] ?? []), item] };
  }, {} as Record<string, T[]>);
}

export function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export function unique<T>(arr: T[], key?: keyof T): T[] {
  if (!key) return [...new Set(arr)];
  const seen = new Set();
  return arr.filter(item => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}`, reactPatterns.id);

  console.log('  ✓ React Patterns (3 snippets)');

  // AI Workflows — 3 prompts
  const aiWorkflows = await prisma.collection.create({
    data: {
      name: 'AI Workflows',
      description: 'AI prompts and workflow automations',
      userId: user.id,
      defaultTypeId: types['prompt'],
    },
  });

  await createItem(user.id, types['prompt'], 'Code Review Prompt', null, `You are a senior software engineer performing a thorough code review. Analyze the following code for:

1. **Correctness** — Are there any bugs, edge cases, or logic errors?
2. **Performance** — Any N+1 queries, unnecessary re-renders, or inefficient algorithms?
3. **Security** — Input validation, auth checks, injection vulnerabilities?
4. **Readability** — Is the intent clear? Are names descriptive?
5. **Patterns** — Does it follow the existing codebase conventions?

For each issue found, explain the problem and suggest a specific fix. Be direct and concise.

Code to review:
[PASTE CODE HERE]`, aiWorkflows.id);

  await createItem(user.id, types['prompt'], 'Documentation Generation', null, `Generate comprehensive documentation for the following code. Include:

1. **Overview** — What does this do and why does it exist?
2. **Parameters/Props** — Type, purpose, and whether required or optional
3. **Return value** — What it returns and in what shape
4. **Usage examples** — 2-3 practical, real-world examples
5. **Edge cases** — What to watch out for

Format as clean Markdown. Keep explanations concise and developer-focused.

Code:
[PASTE CODE HERE]`, aiWorkflows.id);

  await createItem(user.id, types['prompt'], 'Refactoring Assistance', null, `Refactor the following code to improve its quality. Focus on:

1. **Simplification** — Remove unnecessary complexity
2. **DRY** — Eliminate duplication
3. **Naming** — Use clear, descriptive names
4. **Structure** — Improve component/function organization
5. **Modern patterns** — Use current best practices for the language/framework

Preserve all existing behavior. Explain each significant change and why it improves the code.

Code to refactor:
[PASTE CODE HERE]`, aiWorkflows.id);

  console.log('  ✓ AI Workflows (3 prompts)');

  // DevOps — 1 snippet, 1 command, 2 links
  const devops = await prisma.collection.create({
    data: {
      name: 'DevOps',
      description: 'Infrastructure and deployment resources',
      userId: user.id,
    },
  });

  await createItem(user.id, types['snippet'], 'Next.js Dockerfile', 'dockerfile', `FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]`, devops.id);

  await createItem(user.id, types['command'], 'Deploy to Production', 'bash', `npm run build && npx prisma migrate deploy && npm run start`, devops.id);

  await createLink(user.id, types['link'], 'Docker Documentation', 'https://docs.docker.com', 'Official Docker documentation', devops.id);
  await createLink(user.id, types['link'], 'GitHub Actions Docs', 'https://docs.github.com/en/actions', 'Automate CI/CD workflows with GitHub Actions', devops.id);

  console.log('  ✓ DevOps (1 snippet, 1 command, 2 links)');

  // Terminal Commands — 4 commands
  const terminalCommands = await prisma.collection.create({
    data: {
      name: 'Terminal Commands',
      description: 'Useful shell commands for everyday development',
      userId: user.id,
      defaultTypeId: types['command'],
    },
  });

  await createItem(user.id, types['command'], 'Undo Last Commit (keep changes)', 'bash', `git reset --soft HEAD~1`, terminalCommands.id);
  await createItem(user.id, types['command'], 'Docker System Prune', 'bash', `docker system prune -af`, terminalCommands.id);
  await createItem(user.id, types['command'], 'Kill Process on Port', 'bash', `lsof -ti:3000 | xargs kill -9`, terminalCommands.id);
  await createItem(user.id, types['command'], 'Clean npm Install', 'bash', `rm -rf node_modules package-lock.json && npm install`, terminalCommands.id);

  console.log('  ✓ Terminal Commands (4 commands)');

  // Design Resources — 4 links
  const designResources = await prisma.collection.create({
    data: {
      name: 'Design Resources',
      description: 'UI/UX resources and references',
      userId: user.id,
      defaultTypeId: types['link'],
    },
  });

  await createLink(user.id, types['link'], 'Tailwind CSS Docs', 'https://tailwindcss.com/docs', 'Utility-first CSS framework documentation', designResources.id);
  await createLink(user.id, types['link'], 'shadcn/ui', 'https://ui.shadcn.com', 'Beautifully designed accessible component library', designResources.id);
  await createLink(user.id, types['link'], 'Radix UI', 'https://www.radix-ui.com', 'Unstyled, accessible UI component primitives', designResources.id);
  await createLink(user.id, types['link'], 'Lucide Icons', 'https://lucide.dev', 'Beautiful and consistent open-source icon library', designResources.id);

  console.log('  ✓ Design Resources (4 links)');

  console.log('\nSeeding complete!');
}

// ============================================
// HELPERS
// ============================================
async function createItem(
  userId: string,
  itemTypeId: string,
  title: string,
  language: string | null,
  content: string,
  collectionId: string,
) {
  return prisma.item.create({
    data: {
      title,
      contentType: 'TEXT',
      content,
      language,
      userId,
      itemTypeId,
      collections: { create: { collectionId } },
    },
  });
}

async function createLink(
  userId: string,
  itemTypeId: string,
  title: string,
  url: string,
  description: string,
  collectionId: string,
) {
  return prisma.item.create({
    data: {
      title,
      contentType: 'URL',
      url,
      description,
      userId,
      itemTypeId,
      collections: { create: { collectionId } },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
