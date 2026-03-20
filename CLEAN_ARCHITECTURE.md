# React Clean Architecture Setup

To implement Clean Architecture in this React frontend, the `src/` directory is structured to separate concerns and decouple UI from business logic:

*   **`src/domain/`**: The core of the business logic. Contains domain Models/Entities (TypeScript interfaces/classes) and output Repository Interfaces. This layer is strictly independent and does not know about React or external libraries like Axios.
*   **`src/application/`**: Use cases and application logic. Contains the application's specific business rules, state management interfaces, and use cases (often implemented as functions or classes that orchestrate domain logic and repositories).
*   **`src/infrastructure/`**: Implementations of external concerns. Contains concrete implementations of domain repository interfaces, external API clients (e.g., configuring Axios/Fetch), DTOs (Data Transfer Objects), and third-party library adapters.
*   **`src/presentation/`**: The UI layer. Contains React Components, Pages, custom UI hooks (`useViewModel`), styles, and routing. This layer imports application use cases or interacts with state management to trigger actions, completely abstracted from how data is fetched or saved.

**Example data flow:**
UI Action (Presentation) -> Dispatches Use Case (Application) -> Calls Repository Implementation (Infrastructure) -> Returns Domain Entity (Domain) -> State Updates -> UI Re-renders.
