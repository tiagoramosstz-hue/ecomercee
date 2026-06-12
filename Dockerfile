# ── Stage 1: deps ─────────────────────────────────────────────────────────────
FROM node:22-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
# Install ALL deps (including devDeps needed for build/prisma generate)
RUN npm ci

# ── Stage 2: builder ───────────────────────────────────────────────────────────
FROM node:22-slim AS builder
WORKDIR /app

ENV HOME=/app
ENV NPM_CONFIG_CACHE=/app/.npm-cache

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js (standalone output)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Stage 3: runner ────────────────────────────────────────────────────────────
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Fix the EACCES on /nonexistent: Debian's `adduser --system` sets HOME to
# /nonexistent by default. Override it and also make /app owned by `nextjs`
# so npm/npx can write logs and caches there.
# Railway might also override the user, so we set npm configs to /tmp which is always writable
ENV HOME=/tmp
ENV NPM_CONFIG_CACHE=/tmp/.npm-cache
ENV NPM_CONFIG_LOGS_DIR=/tmp/.npm-logs
ENV XDG_CONFIG_HOME=/tmp
ENV XDG_CACHE_HOME=/tmp/.cache

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 --home /app nextjs \
 && chown -R nextjs:nodejs /app

# Copy only what Next.js standalone needs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public           ./public

# Copy prisma schema + migrations for runtime `prisma migrate deploy`
COPY --from=builder --chown=nextjs:nodejs /app/prisma           ./prisma

# Copy the Prisma CLI (package + generated client + client package) so the
# local `node_modules/.bin/prisma` exists and `npx` does not try to fetch it
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma   ./node_modules/prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.bin     ./node_modules/.bin

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Using node directly to execute prisma prevents npx from attempting to download
# prisma due to it being missing from the standalone package.json tree.
CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate deploy && node server.js"]
