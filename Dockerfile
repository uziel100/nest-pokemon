# Install dependencies only when needed
FROM node:18-alpine AS base
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# COPY package.json yarn.lock ./
COPY package*.json ./
RUN npm ci --ignore-scripts

# Build the app with cache dependencies
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN npm run build


# Production image, copy all the files and run next
FROM base AS runner

# Set working directory
WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# EXPOSE 3000

CMD [ "node","dist/main" ]