# FraudeBot frontend

React and TypeScript single-page application for searching fraud reports and viewing scammer
and organization profiles.

## Requirements

- Node.js `>=20.19.0` or `>=22.12.0`
- npm
- The FraudeBot API when testing live data

## Local setup

```bash
npm install
npm run dev
```

Vite listens on port `80` and accepts connections from the local network. Opening a privileged
port may require additional OS permissions. API requests use the relative `/api` path by
default.

## Environment and API proxy

Create `.env.local` when local values need to differ from the defaults:

```dotenv
VITE_API_PROXY_TARGET=http://localhost:9000
# Optional: bypass the relative /api base URL used by the browser
# VITE_API_BASE_URL=https://api.example.com/api
# Optional: receive privacy-safe generic UI error events
# VITE_ERROR_REPORT_URL=https://errors.example.com/events
```

- `VITE_API_PROXY_TARGET` is used only by the Vite development server. Requests to `/api` are
  proxied to this origin; the default is `http://localhost:9000`.
- `VITE_API_BASE_URL` changes the browser's API base URL in every mode. Leave it unset for
  same-origin `/api` requests, which avoids browser CORS configuration when a reverse proxy is
  available.
- `VITE_ERROR_REPORT_URL` receives generic `unexpected_ui_error` events. Error messages,
  stacks, routes, query strings, and user data are intentionally excluded.

Restart the development server after changing environment files. Do not put secrets in
`VITE_*` variables because Vite exposes them to client code.

## Verification

```bash
npx tsc -b                   # Type-check application and Vite configuration
npm run test:run             # Unit and component tests
npm run test:coverage        # Tests with V8 coverage
npm run build                # Production build in dist/
npm run test:e2e             # Chromium end-to-end tests
```

Playwright starts a production preview on port `4173`. Install its browser once with
`npx playwright install chromium` if it is not already available. Docker-based end-to-end
scripts are also available in `package.json`.

## Production build and deployment

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host or CDN. Because this is a client-side
routed SPA, configure unknown non-asset paths to serve `index.html`; otherwise direct visits to
report and search URLs will return 404 responses.

For the default configuration, the production web server must reverse-proxy `/api` to the
FraudeBot API. Alternatively, set `VITE_API_BASE_URL` at build time to an absolute API URL and
configure that API to allow requests from the frontend origin. The Vite preview server is for
verification, not production hosting.

See [CLEAN_ARCHITECTURE.md](./CLEAN_ARCHITECTURE.md) for the project structure and import
conventions.
