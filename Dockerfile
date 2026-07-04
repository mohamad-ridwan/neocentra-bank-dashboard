# Multi-stage build for Next.js Micro Frontend with Root Context
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json files
COPY neocentra-bank-dashboard/package.json neocentra-bank-dashboard/package-lock.json ./neocentra-bank-dashboard/
WORKDIR /app/neocentra-bank-dashboard
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy dependency node_modules
COPY --from=deps /app/neocentra-bank-dashboard/node_modules ./neocentra-bank-dashboard/node_modules

# Copy source code of MFE and the shared dependency
COPY neocentra-bank-shared ./neocentra-bank-shared
COPY neocentra-bank-dashboard ./neocentra-bank-dashboard

# Install shared MFE dependencies so webpack resolver can compile aliased files
WORKDIR /app/neocentra-bank-shared
RUN npm install

ENV NODE_ENV=production
ENV NEXT_PRIVATE_LOCAL_WEBPACK=true

# Bake shared MFE path during compile time
ENV NEXT_PUBLIC_SHARED_URL=/mf-shared

# Bake production environment variables during build time for Next.js bundle compilation
ENV NEXT_PUBLIC_HOST_API_URL=https://neocentra.bank.com

WORKDIR /app/neocentra-bank-dashboard
RUN npm run build

# Production runner image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PRIVATE_LOCAL_WEBPACK=true
ENV PORT 3344
ENV HOSTNAME "0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy shared folder and its node_modules since it is referenced in next.config.js at runtime
COPY --from=builder /app/neocentra-bank-shared ./neocentra-bank-shared

# Copy MFE files
WORKDIR /app/neocentra-bank-dashboard
COPY --from=builder /app/neocentra-bank-dashboard/public ./public
COPY --from=builder /app/neocentra-bank-dashboard/package.json ./package.json
COPY --from=builder /app/neocentra-bank-dashboard/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/neocentra-bank-dashboard/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/neocentra-bank-dashboard/node_modules ./node_modules

USER nextjs

EXPOSE 3344

CMD ["npm", "run", "start"]
