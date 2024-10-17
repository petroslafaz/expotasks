# Tasks App

## Overview

This is a simple React Native app for iOS and Android bootstraped with Expo and Typescript. It allows users to work with projects and tasks

## Features

- List tasks
- Create new task
- Update task
- List projects
- Create new project
- Update project
- Swipe down in the list to refresh tasks and projects
- Display home page with derived data

## Setup

To run this project, you need to set up two environment variables. Create a `.env` file in the root of the project with the following content:

- `EXPO_PUBLIC_API_URL`: This should point to your backend API URL. The example uses localhost, but adjust this as needed for your setup.
- `EXPO_PUBLIC_USE_MOCK_API`: Set this to `true` to enable the local mock API, or `false` to use a real backend API.

Using the mock API allows you to run the app without a backend server, which is useful for development and testing.

After setting up the `.env` file, install the dependencies and start Expo:

```bash
npm install     # Install dependencies
npx expo start  # Start Expo
```

## Key Dependencies

- **expo-router**: A routing library from Expo for managing navigation
- **react-hook-form**: Manages the form state and handles form validation
- **zod**: A schema validation library, used in conjunction with `react-hook-form` for form data validation
- **@tanstack/react-query**: A data fetching and state management library for React, used for managing remote state
- **@shopify/restyle**: Allows to build ui libraries, with themability as the core focus

## Project Structure

- `src/`
  - `app` - The navigation routes are defined here using expo router
  - `components/` - Reusable components Button, FloatingButton, and FormInput, Divider, LoadingSpinner
  - `theme/` - Theming and styling information using Shopify Restyle
  - `modules/` - Feature-based organization. Each module (projects, tasks, home) encapsulates all related domain functionality promoting better encapsulation and maintainability (rather than using technical layers)
    - `api/` - Module-specific API layer
    - `components/` - Module-specific UI components
    - `constants/` - Module constants (e.g., error messages)
    - `hooks/` - Custom React hooks for queries and mutations
    - `schema/` - Data schemas and types using Zod
    - `screens/` - Main screens (e.g., list, create, edit)
  - `shared` - Extracted shared logic and components for different modules
    - `api/` - Api client and tanstack query hooks
    - `components/` - Generic components (e.g button, form fields)
    - `hooks/` - Shared hooks
    - `hooks/` - Shared types

## Best Practices

This project follows several best practices:

- **Type checking**: The app is written in TypeScript to catch errors early in the development process and impove code reliability. Also, it uses paths alias to make imports cleaner e.g @/components instead of ../../components

- **Component optimisation**: The app is broken down into small, reusable components to make code more manageable and improve rendering performance using functional components and hooks

- **Client-side Form Validation**: It uses react-hook-form and zod for client-side form validation. This ensures that the data sent to the server is correct and reduces the load on the server.

- **Mock API**: The project uses a mock fetch implementation to simulate API responses. This allows frontend development to proceed independently of backend readiness, enabling faster iterations and easier testing of different data scenarios.

- **State Management**: @tanstack/react-query is used for managing remote state. React query provides a robust, performant, and secure foundation for data fetching. It also supports advanced features like caching, offline support, optimistic updates, and automatic retries that could be used if needed in future development

- **Feature-based Project Structure**: The project is organized around features rather than technology. This makes the codebase easier to navigate and understand, and allows features to be developed and tested independently

- **Design System**: It uses @shopify/restyle to build a themable design system. This allows for consistent styling across the application and makes it easier to update the look and feel of the app

- **Testing**: It includes unit tests to ensure code quality and prevent regressions. The main focus for testing was on logic

- **Misc**: Using .env for config.

- **Improvements**: Given more time I would have:
  - Included more tests and implemented E2E tests
  - Looked into performance and accessibilty
  - Would have expanded the Theme to support responsive design
  - Performance and error reporting using Sentry or similar tool

These practices ensure that the codebase is scalable, maintainable, and easy to understand. They also provide a solid foundation for adding new features and improvements in the future.

## Error Handling

This application implements robust error handling to ensure a smooth user experience:

- API calls are wrapped in try-catch blocks to catch and log network errors.
- React Query is used for data fetching, providing built-in error handling and retry logic.
- Form submissions have error callbacks that alert the user and handle navigation.
- Zod is used for form validation, providing type-safe error messages.
- A global ErrorBoundary catches any unhandled errors in the component tree.
- User-friendly error messages are displayed in the UI when issues occur.

This multi-layered approach to error handling helps prevent app crashes and provides clear feedback to users when something goes wrong.

## Unit Tests

Unit tests have been included for some components using Jest. To run the tests:

```bash
npm test            # Execute the test suite
```
