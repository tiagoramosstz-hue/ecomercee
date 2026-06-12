# ── Stage 1: deps ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

RUN apk add --no-cache openssl1.1-compat

COPY package.json package-lock.json ./
COPY prisma ./prisma/
# Install ALL deps (including devDeps needed for build/prisma generate)
RUN npm ci

# ── Stage 2: builder ───────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl1.1-compat

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js (standalone output)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Stage 3: runner ────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

RUN apk add --no-cache openssl1.1-compat

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Copy only what Next.js standalone needs
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static     ./.next/static
COPY --from=builder /app/public           ./public

# Copy prisma schema + migrations + seed for runtime commands
COPY --from=builder /app/prisma           ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/seed.mjs         ./seed.mjs
COPY --from=builder /app/node_modules/bcrypt ./node_modules/bcrypt

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD npx prisma migrate deploy && node server.js
