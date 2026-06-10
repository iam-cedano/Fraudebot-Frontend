---
description: Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.
applyTo: '**/*'
# applyTo: 'Describe when these instructions should be loaded by the agent based on task context' # when provided, instructions will automatically be added to the request context when the pattern matches an attached file
---

# Tech Stack

- Tailwind
- React SPA
- Vite
- TypeScript

# Architecture

The project follows the Clean Architecture principles. The codebase is organized into three main folders: `application`, `domain`, `infrastructure` and `presentation`.

## Presentation Layer

The `presentation` layer is organized into:

- `assets`: Contains static assets such as images, fonts, and stylesheets for all components.
- `shared`: Contains reusable components, hooks, and utilities that can be used across the application.
- `pages`: Contains components that represent different pages or views in the application. Each page is organized into its own folder, which may contain subfolders for components, hooks, and styles specific to that page.

### Components

- Avoid arrow functions in components to prevent unnecessary re-renders. Instead, use regular function declarations for better performance and readability.

- Props must be defined in the `types.ts` files within the same folder as the component. This promotes better organization and separation of concerns.

- Props must be defined as `types` Typescript keyword.
