# Kang Jessy Smart Tools

This is a standalone Vue 3 + TypeScript + Vite project for the "Smart Tools" section of the Kang Jessy ecosystem.

## Project Structure

- **src/**: Source code
  - **components/**: Reusable UI components (Modals, Layouts, Buttons)
  - **views/**: Individual tool pages (WaGenerator, SeoScanner, etc.)
  - **composables/**: Shared logic (Theme, History, etc.)
  - **data/**: Configuration and static data
  - **router/**: Vue Router configuration

## Getting Started

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Run logic server**:

    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## Features

- **Isolated Environment**: Runs independently from the main agency site.
- **Micro-apps**: Collection of single-purpose tools (WhatsApp Generator, SEO Scanner, etc.).
- **Shared Design System**: Uses the same styles and component library (migrated) as the main site.

## Migration Notes

This project was extracted from `kangjessy-agency` to facilitate better maintenance and potential future separation. All imports use the `@/` alias to ensure portability.
