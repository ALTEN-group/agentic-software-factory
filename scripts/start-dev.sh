#!/usr/bin/env bash
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

cd "$(dirname "$0")/.."

ENV_FILE="docker/conf/.env.dev"
if [[ ! -f "$ENV_FILE" ]]; then
  cp docker/conf/.env.dev.example "$ENV_FILE"
  echo -e "${YELLOW}Created ${ENV_FILE} from .env.dev.example.${NC}"
fi

echo -e "${YELLOW}🚀 Starting Flow Stack development environment...${NC}"

# Build and start services using Docker Compose
docker compose -f docker/docker-compose.yml --env-file "$ENV_FILE" up --build -d

PORT=$(grep -E '^WEBSITE_PORT=' "$ENV_FILE" | cut -d '=' -f2)
PORT=${PORT:-5173}

echo -e ""
echo -e "${GREEN}✅ Flow Stack documentation website is running!${NC}"
echo -e "📖 Open in browser: ${YELLOW}http://localhost:${PORT}${NC}"
echo -e ""
echo -e "Run '${YELLOW}./scripts/stop-dev.sh${NC}' to stop the container."
echo -e "Run '${YELLOW}docker compose -f docker/docker-compose.yml --env-file ${ENV_FILE} logs -f${NC}' to view logs."
