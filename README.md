# Agentic Software factory

The operating layer that connects strategy, execution, AI, and delivery into one continuous system.

Flow Stack is an **operating model**, not a product: it describes how a startup-mode software
organization is structured, how work moves from signal to production, and where AI is used as a
multiplier while humans stay accountable.

This repository holds the documentation site for that model.

## Structure

```
flow-stack/
  website/                  # VitePress documentation site
    docs/
      index.md
      guide/*.md
      public/
      .vitepress/config.mjs
  docker/
    docker-compose.yml      # dev stack (docs site only)
    conf/.env.dev.example
  scripts/
    start-dev.sh            # build & start the dev site
    stop-dev.sh             # stop the dev site
  .github/workflows/deploy-docs.yml
```

## Run the site locally (Docker)

```sh
./scripts/start-dev.sh
```

The script copies `docker/conf/.env.dev.example` to `docker/conf/.env.dev` on first run (if
missing), then builds and starts the container. The site is served on <http://localhost:5173>.

Stop it with:

```sh
./scripts/stop-dev.sh
```

Pass `--rmi` (or `-i`) to also remove the built Docker images.

You can still run the stack manually if you prefer:

```sh
cp docker/conf/.env.dev.example docker/conf/.env.dev
docker compose -f docker/docker-compose.yml --env-file docker/conf/.env.dev up --build
```

The site is served on <http://localhost:5173>.

## Run the site locally (Node)

```sh
cd website
npm install
npm run dev
```

## Publication

`main` pushes that touch `website/**` build the site and publish `website/docs/.vitepress/dist`
to GitHub Pages via [deploy-docs.yml](.github/workflows/deploy-docs.yml).

## License

[MIT](LICENSE) — ALTEN.
