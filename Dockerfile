#
# Builder stage.
# Builds JavaScript code from Typescript
#
FROM node:14 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.base.json ./
COPY tsconfig.build.json ./
COPY ./src ./src
RUN npm ci --quiet && npm run build

#
# Production stage.
# Runs the compiled output.
#
FROM node:14-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm", "start"]