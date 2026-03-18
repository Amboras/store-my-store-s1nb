# syntax=docker/dockerfile:1

FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    bash \
    tini

WORKDIR /app

# Copy package files for workspace
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY storefront/package*.json ./storefront/

# Install ALL dependencies from root (workspace-aware)
# This happens once in CI, not per user
RUN npm ci && npm cache clean --force

# Copy source code (template)
COPY backend ./backend
COPY storefront ./storefront

# Copy startup script
COPY docker/start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Create workspace directory (mounted as volume)
RUN mkdir -p /workspace && chmod 777 /workspace

# Expose ports
EXPOSE 9000 3000

# Health check
HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:9000/health || curl -f http://localhost:9000 || exit 1

# Use tini as init system (proper signal handling)
ENTRYPOINT ["/sbin/tini", "--"]

# Run startup script (builds and starts apps)
CMD ["/app/start.sh"]
