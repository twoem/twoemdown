# Multi-stage build for TWOEM Online Productions

# Backend Stage
FROM python:3.11-slim as backend

WORKDIR /app/backend

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements and install dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Frontend Stage
FROM node:20-alpine as frontend-build

WORKDIR /app/frontend

# Copy package files
COPY frontend/package.json frontend/yarn.lock* ./

# Install dependencies (without frozen lockfile to handle version changes)
RUN yarn install

# Copy frontend source code
COPY frontend/ .

# Build frontend
RUN yarn build

# Final stage
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    nginx \
    && rm -rf /var/lib/apt/lists/*

# Copy backend
COPY --from=backend /app/backend /app/backend
COPY --from=backend /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=backend /usr/local/bin /usr/local/bin

# Copy frontend build
COPY --from=frontend-build /app/frontend/build /app/frontend/build

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy startup script
COPY start-production.sh /app/
RUN chmod +x /app/start-production.sh

# Expose port
EXPOSE 8000

# Start the application
CMD ["/app/start-production.sh"]