# Configuration

Environment variables for the documentation stack. Copy the template before the first run:

```sh
cp docker/conf/.env.dev.example docker/conf/.env.dev
```

`docker/conf/.env.dev` is gitignored. The template is committed and contains no secrets — this
stack has none.

## Stack naming

| Variable | Default | Description |
|---|---|---|
| `APP_NAME` | `flow-stack` | Short slug used in network and volume names |
| `ENV_NAME` | `local` | Environment suffix: `local`, `production`, … |
| `STACK_NAME` | `flow-stack-local` | `${APP_NAME}-${ENV_NAME}`; carried as the `stack.name` label |

## Website service

| Variable | Default | Description |
|---|---|---|
| `WEBSITE_HOST` | `flow-stack-website-local` | Container name and hostname |
| `WEBSITE_PORT` | `5173` | Host port mapped to the VitePress dev server |
| `NODE_VERSION` | `22-alpine` | Base image tag; must be Alpine-based, the dockerfile uses `apk` |
| `NODE_ENV` | `development` | Node environment inside the container |
| `VITEPRESS_BASE` | `/` | Public base path; overrides the `/docs/` development default |

## Container identity

| Variable | Default | Description |
|---|---|---|
| `TZ` | `Europe/Paris` | Container timezone |
| `UID` | `1000` | Host user id the container user is created with |
| `GID` | `1000` | Host group id the container group is created with |

`UID` and `GID` must match the host user that owns the repository, otherwise files written to the
bind-mounted `website/docs` will be owned by the wrong user. On Linux and macOS:

```sh
id -u   # UID
id -g   # GID
```

On Windows with Docker Desktop, the defaults are correct.

## Build-time only

These are consumed as build arguments by `website/dockerfile` and are not available at runtime:
`NODE_VERSION`, `NODE_ENV`, `TZ`, `UID`, `GID`.

## Production

The GitHub Pages build reads no `.env` file. The only variable that may matter there is
`VITEPRESS_BASE`, set in the workflow's build step when publishing to a project page instead of a
custom domain. See [Deployment](./deployment).
