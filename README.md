# Agentic Software Factory

The modern operating model for software development using AI at maximum capability.

The Agentic Software Factory is an **operating model**. It describes how ALTEN builds and runs
software with **AI leveraged across the entire process** — from the client meeting to production release:

This repository holds the documentation site for that model.

## Structure

```
agentic-software-factory/
  website/                  # VitePress documentation site
    docs/
      index.md
      guide/*.md
      public/
      .vitepress/config.mjs
  docker/
    docker-compose.yml      # dev stack (docs site only)
  scripts/
    start-dev.sh            # build & start the dev site
    stop-dev.sh             # stop the dev site
  .github/workflows/deploy-docs.yml
```

## Run the site locally (Docker)

```sh
./scripts/start-dev.sh
```

The script builds and starts the container. The site is served on <http://localhost:5175/docs/>.

Stop it with:

```sh
./scripts/stop-dev.sh
```

Pass `--rmi` (or `-i`) to also remove the built Docker images.

You can still run the stack manually if you prefer:

```sh
docker compose -p agentic-software-factory -f docker/docker-compose.yml up --build
```

The site is served on <http://localhost:5175/docs/>.

## Run the site locally (Node)

```sh
cd website
npm install
npm run dev
```
