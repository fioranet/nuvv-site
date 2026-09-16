# ==========================================
# Stage 1: Build Frontend (Vite)
# ==========================================
FROM node:20 AS builder
WORKDIR /app

# Cache dependencies
COPY package*.json ./
RUN npm ci

# Build static assets to /app/dist
COPY . .
RUN npm run build

# ==========================================
# Stage 2: Production Server (Node.js + SQLite)
# ==========================================
FROM node:20-slim
WORKDIR /app

# Install build dependencies for better-sqlite3
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Install production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled static site from builder
COPY --from=builder /app/dist ./dist

# Copy backend code
COPY server ./server
COPY scripts ./scripts

# Create data directory for SQLite database
RUN mkdir -p /app/data

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "server/index.js"]
