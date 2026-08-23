# Frontend architecture

This project uses a pragmatic layered architecture. It borrows separation-of-concerns ideas
from Clean Architecture, but it intentionally does **not** introduce repository interfaces or
repository implementations between use cases and HTTP.

## Layers

- **`src/core/`** contains domain entities, API response/result models, and small shared
  contracts. It has no React dependency.
- **`src/application/`** contains use-case classes. A use case calls the shared
  `infrastructure/http/Http` client directly, maps API data to core entities, and owns request
  cancellation.
- **`src/infrastructure/`** contains the Axios HTTP client, request cancellation support, and
  the lightweight dependency container.
- **`src/presentation/`** contains React pages, components, providers, styles, and routing.
- **`src/common/`** contains cross-layer configuration, route constants, and utilities.

The runtime flow is:

`React page/component -> injected use case -> Http client -> API -> domain entity/result -> UI`

`DependencyProvider` creates the use cases defined by `infrastructure/di/container.ts`.
Tests can replace individual instances through typed provider overrides.

## Import guidance

Use the `@/` alias for imports from `src` (for example,
`@/application/usecases/report/search-report.usecase`). The existing `@presentation/` alias is
also retained because presentation files use it extensively. Prefer `@/` for new code so the
project converges on one general alias; do not add aliases for individual layers.

## Dependency direction

Presentation code should access use cases through `useDependencies`. Core code must remain
framework-independent. Application use cases may depend on core types, common API routes, and
the infrastructure HTTP/cancellation helpers. If the API integration becomes complex enough
to justify another abstraction later, add it for a demonstrated need rather than treating a
repository layer as a requirement.
