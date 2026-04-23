# Stage 1: Install dependencies
FROM node:24-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:24-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate
RUN npm run build

# Stage 3: Production runner
# Nitro bundles everything into .output — no node_modules needed
FROM node:22-alpine AS runner
WORKDIR /app

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 --ingroup nodejs nodeapp

COPY --from=builder --chown=nodeapp:nodejs /app/.output ./.output
COPY --from=builder --chown=nodeapp:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nodeapp:nodejs /app/node_modules/@prisma ./node_modules/@prisma

USER nodeapp

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
