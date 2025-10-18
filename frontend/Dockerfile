# syntax=docker/dockerfile:1
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=development
ENV CI=false

# Install deps separately to leverage layer cache
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy sources
COPY . .

# Expose Vite dev port
EXPOSE 5173

# Use polling for reliable watching in container
ENV CHOKIDAR_USEPOLLING=true

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
