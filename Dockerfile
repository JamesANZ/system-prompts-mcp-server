# The prompt files are the data this server serves. PROMPT_LIBRARY_ROOT points
# at the copy inside the image, not at a path on the host.
FROM node:22.17-bookworm-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

FROM node:22.17-bookworm-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=3000 \
    MCP_ENTRY=dist/index.js \
    PROMPT_LIBRARY_ROOT=/app/prompts

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

COPY --from=build /app/dist ./dist
COPY prompts ./prompts
COPY http-bridge.mjs ./http-bridge.mjs

USER node

EXPOSE 3000

CMD ["node", "http-bridge.mjs"]
