# Deployment

How this documentation site is run in development and published in production.

## Development — Docker

The site runs in a container so that contributors need only Docker.

```sh
cp docker/conf/.env.dev.example docker/conf/.env.dev
docker compose -f docker/docker-compose.yml --env-file docker/conf/.env.dev up --build
```

The site is served on <http://localhost:5173> with hot reload.

### What the stack does

| Element | Value |
|---|---|
| Service | `website` |
| Image | built from `website/dockerfile` (`node:${NODE_VERSION}`, non-root) |
| Container / hostname | `${WEBSITE_HOST}` |
| Published port | `${WEBSITE_PORT}` → `5173` |
| Network | `${APP_NAME}-internal-${ENV_NAME}` |
| Node modules | named volume `${APP_NAME}-website-node-modules-${ENV_NAME}` |

### Bind mounts

| Host | Container | Mode |
|---|---|---|
| `website/package.json` | `/usr/src/app/package.json` | read-only |
| `website/docs` | `/usr/src/app/docs` | read-write |

`node_modules` is a named volume rather than a bind mount, so the container's install is never
overwritten by a host directory. The service command reinstalls on start, which is what makes a
`package.json` edit reach that volume without rebuilding the image.

### Common commands

```sh
# stop the stack
docker compose -f docker/docker-compose.yml --env-file docker/conf/.env.dev down

# rebuild the image after changing the dockerfile
docker compose -f docker/docker-compose.yml --env-file docker/conf/.env.dev build --no-cache website

# drop the dependency volume when a lockfile change misbehaves
docker compose -f docker/docker-compose.yml --env-file docker/conf/.env.dev down -v
```

## Development — Node

```sh
cd website
npm install
npm run dev       # vitepress dev docs --host
npm run build     # vitepress build docs
npm run preview   # serve the built site
```

## Production — GitHub Pages

There is **no documentation Docker image in production**. The site is built to static files and
published to GitHub Pages.

Workflow: `.github/workflows/deploy-docs.yml`

| Aspect | Value |
|---|---|
| Trigger | push to `main` touching `website/**` or the workflow itself, plus manual dispatch |
| Node | 22, npm cache keyed on `website/package-lock.json` |
| Build | `npm ci` then `npm run build` in `website/` |
| Artifact | `website/docs/.vitepress/dist` |
| Permissions | `contents: read`, `pages: write`, `id-token: write` |
| Concurrency | group `pages`, no cancellation in progress |

### One-time repository setup

1. Settings → Pages → Source: **GitHub Actions**.
2. Push to `main`, or run the workflow manually.
3. For a custom domain, add `website/docs/public/CNAME` containing the bare hostname and configure
   the DNS record.

::: tip
`base` resolves to `VITEPRESS_BASE`, then `/` in production, then `/docs/` otherwise. Publishing to
a project page rather than a custom domain means setting `VITEPRESS_BASE=/<repo>/` in the build
step.
:::

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Blank page, 404 on assets | Wrong `base` for the publication target | Set `VITEPRESS_BASE` |
| Mermaid diagrams do not render | `fastdom` not pre-bundled | Keep `vite.optimizeDeps.include` as configured |
| Changes not picked up in Docker | Editing outside the bind-mounted `docs/` | Mount the path or restart the service |
| Install loops on start | Stale named volume | `down -v`, then `up --build` |
| Permission errors on mounted files | `UID`/`GID` mismatch with the host user | Set them in `docker/conf/.env.dev` |
