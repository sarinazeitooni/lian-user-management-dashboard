# Lian User Management Dashboard

A production-quality user management dashboard built as a technical assessment. It loads users from JSONPlaceholder, supports client-side search, sorting, and filtering, and manages locally created users in the browser.

## Technology stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS**
- **TanStack Query** for remote API state
- **React Hook Form** + **Zod** for form validation
- **Lucide React** for icons
- **LocalStorage** for local users and theme preference
- **Vitest** for focused unit tests

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/users`.

## Production build

```bash
npm run build
npm start
```

## Other commands

```bash
npm run lint
npm run typecheck
npm test
```

## Project structure

```text
src/
  app/                         # Next.js routes, layout, providers
  components/
    layout/                    # Shell, sidebar, header, mobile nav
    users/                     # Dashboard, table, dialogs, details
    ui/                        # Reusable UI primitives
    theme/                     # Light/dark theme provider
  features/users/
    api/                       # JSONPlaceholder client
    hooks/                     # useUsers / useUser / local state
    lib/                       # Filters, storage, form schema
    types/                     # User domain types
  lib/                         # Query client helpers and utilities
```

## API

Remote users are loaded from:

- `GET https://jsonplaceholder.typicode.com/users`
- `GET https://jsonplaceholder.typicode.com/users/{id}`

The API does not support server-side search, sorting, filtering, create, or delete. Those behaviors are implemented in the client.

## Client-side search, sorting, and filtering

All list operations run against the merged collection of API users and locally created users:

- **Search** matches name or email (case-insensitive)
- **Sort** supports name/email ascending or descending
- **Filter** narrows results by company name, with options derived from loaded data

Search, filters, and sorting are composed in a single pipeline so they work together. Pagination resets when search or filters change.

## Local user persistence

- Newly created users are validated with Zod, assigned a stable `local-*` ID, and stored in LocalStorage.
- They are merged into the list without posting to JSONPlaceholder.
- Local users can be deleted after confirmation; deletions persist across refresh.
- API users remain read-only in this implementation (they cannot be deleted).
- Theme preference is also stored in LocalStorage, with a small inline script to reduce theme flash on load.

Hydration-safe reads are used so LocalStorage is not accessed during server rendering.

## Known limitations

- JSONPlaceholder users are not persisted when mutated; create/delete only affect local state.
- Local users exist only in the current browser profile.
- There is no authentication or multi-tenant isolation.
- Offline support is limited to already-persisted local users; the remote list still requires network access.
