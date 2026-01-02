# 1. Instalação das dependências
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci


# 2. Build do projeto
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# O Next.js precisa de variáveis de ambiente no build time (ex: API_URL)
RUN npm run build

# 3. Runner (Imagem final bem pequena)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Usuário não-root
RUN addgroup -g 1001 -S nodejs \
 && adduser -S nextjs -u 1001

# Copiamos apenas o essencial gerado pelo modo standalone
#COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
