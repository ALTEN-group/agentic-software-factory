# Agentic Software Factory

The modern operating model for software development using AI at maximum capability.

Agentic Software Factory is an **operating model**, not a product: it describes how an organization builds and runs
software where **AI is leveraged across the entire process** — from the client meeting to production release:

- **Meeting-Driven Development**: Software requirements, architecture, and tasks originate directly from client and stakeholder meetings, transcribed and structured into formal Intent records by AI in real time.
- **Zero Developer Coding**: Developers do not write code syntax. Engineers operate as specification engineers, context architects, and deterministic control builders while AI autonomously writes 100% of the code and tests.
- **Dense Deterministic Controls**: Compilers, strict type checkers, AST linters, contract tests, mutation testing, and security scanners form automated, executable testbeds.
- **AI Auto-Validation & Minimum Human Validation**: AI agents execute in closed self-healing loops against deterministic controls until all gates pass. Human review is minimized and strictly focused on business intent, customer value, and safety invariants rather than line-by-line syntax checking.

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
