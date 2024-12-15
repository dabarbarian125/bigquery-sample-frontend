FROM node:18-bullseye-slim as builder

# Install fonts
RUN apt-get update && apt-get install -y --no-install-recommends \
    fonts-ubuntu ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

# Server install and build
RUN cd server && npm install && npm run build && cd ..

# Client install and build
RUN cd client && npm install && npm run build && cd ..

FROM node:18-bullseye-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    fonts-ubuntu ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/package*.json ./server/
COPY --from=builder /app/client/build ./client/build
COPY --from=builder /app/server/node_modules ./server/node_modules

ENV NODE_ENV=production
ENV BIGQUERY_PROJECT_ID="big-query-sample-444520"
ENV BIGQUERY_DATASET="sample_project_results"
ENV BIGQUERY_TABLE="input_counts"
ENV BIGQUERY_CREDENTIALS="/app/server/service_account.json"

EXPOSE 8080
CMD ["node", "server/dist/index.js"]
