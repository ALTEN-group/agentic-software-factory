# Configuration

The development Docker stack is **zero-config** by default. No `.env` file is required to get started.

Run the development environment directly:

```sh
./scripts/start-dev.sh
```

---

## Environment Variables & Overrides

All variables have sensible defaults declared directly in `docker/docker-compose.yml` and `website/dockerfile`. You can override any variable inline when running commands:

```sh
PORT=5175 ./scripts/start-dev.sh
```

### Website service

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5175` | Host port mapped to the VitePress dev server |
| `NODE_VERSION` | `22-alpine` | Base image tag (must be Alpine-based, the dockerfile uses `apk`) |
| `NODE_ENV` | `development` | Node environment inside the container |
| `VITEPRESS_BASE` | `/docs/` | Public base path for development routing |

### Container identity & build args

| Variable | Default | Description |
|---|---|---|
| `TZ` | `UTC` | Container timezone |
| `UID` | `1000` | Host user ID the container user is created with |
| `GID` | `1000` | Host group ID the container group is created with |

`UID` and `GID` ensure that any files written inside the container match the host permissions on Linux and macOS.

---

## Production

The production GitHub Pages workflow builds without Docker or `.env` files. The only variable used during CI is `VITEPRESS_BASE`, set automatically in the workflow when publishing to GitHub Pages. See [Deployment](./deployment).
