# Local development image only — Netlify doesn't use Docker. Source is
# bind-mounted by docker-compose.yml, so nothing is copied in here.
# Node 24 matches NODE_VERSION in netlify.toml.
FROM node:24-slim

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Pre-create the paths compose mounts named volumes onto, so the volumes
# are owned by the unprivileged `node` user (uid 1000) instead of root.
RUN mkdir -p node_modules .next && chown -R node:node /app

USER node
