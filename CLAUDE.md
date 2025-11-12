# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **react-float-menu**, a smart draggable floating menu component for React. It's a library distributed via npm that provides a configurable floating menu with features like edge detection, auto-flipping, keyboard navigation, and theme customization.

## Development Commands

### Building
- **Build library**: `pnpm build` - Builds the library using Vite in production mode with multiple formats (ESM, CJS, UMD), type declarations, and source maps
- **Type check**: `pnpm typecheck` - Run TypeScript type checking without emitting files

### Development Server
- `pnpm dev` - Start Vite development server with hot module replacement for testing the component

### Testing
- **Run all tests**: `pnpm test` - Runs all Vitest tests once
- **Test in watch mode**: `pnpm test:dev` - Runs tests in watch mode with silent output
- **Coverage report**: `pnpm test:coverage` - Generates test coverage report with HTML, LCOV, and text output
- **E2E tests**: `pnpm cypress:open` - Opens Cypress for interactive E2E testing
- **E2E headless**: `pnpm cypress:quiet` - Runs Cypress tests headless in Chrome

Note: Test files are located at `src/**/*test.tsx` and use Vitest (v2) with jsdom environment.

### Linting & Formatting
- **Lint JS**: `pnpm lint:js` - Lint TypeScript/TSX files with ESLint v9 (flat config)
- **Fix JS**: `pnpm lint:js-fix` - Auto-fix linting issues
- **Lint CSS**: `pnpm lint:css` - Lint SCSS files with Stylelint v16
- **Fix CSS**: `pnpm lint:css-fix` - Auto-fix SCSS linting issues
- **Lint all**: `pnpm lint:all` - Run both JS and CSS linting
- **Format**: `pnpm format` - Format code using Prettier v3

## Architecture

### Entry Point
- `src/react-float-menu.ts` - Main library export that exports the `Menu` component (alias for `MenuHead`)

### Core Components
- **MenuHead** (`src/components/main/index.tsx`) - The main floating menu button component that orchestrates all functionality
  - Manages state for menu open/close, position, drag state
  - Handles menu positioning logic including edge detection and auto-flipping
  - Provides MenuContext to child components
- **MenuContainer** (`src/components/menu-container/menu-container.tsx`) - Container for the actual menu content
- **MenuItem** (`src/components/menu-list-item/menu-list-item.tsx`) - Individual menu items with submenu support
- **Context** (`src/components/context.ts`) - React Context providing menu configuration to all child components

### Custom Hooks (src/effects/)
The component uses several custom hooks for modular functionality:
- **usePosition** - Handles dragging, positioning, and pointer events for the floating button
- **useMenuHidden** - Detects when menu is hidden beyond screen edges
- **useKeyboardNav** - Implements keyboard navigation within menus
- **useCloseOnClick** - Closes menu when clicking outside
- **useCloseOnEscape** - Closes menu on Escape key
- **useMenuToFront** - Brings menu to focus when near screen edges

### Menu Item Model
Menu items support hierarchical structure with `children` for submenus. Each item has:
- `name` - Label text
- `id` - Unique identifier (auto-generated if not provided)
- `children` - Array of menu items for submenu
- `icon` - Optional icon component
- `selected` - Internal state for selected item

### Build Configuration
- **Vite** (`vite.config.ts`) - Primary build tool for both development and library distribution
  - Entry: `src/react-float-menu.ts`
  - Output formats: ESM (`react-float-menu.esm.js`), CJS (`react-float-menu.cjs`), UMD (`react-float-menu.umd.js`)
  - Type declarations: Generated automatically with `vite-plugin-dts` → `dist/index.d.ts`
  - Externals: React/ReactDOM are peer dependencies (not bundled)
  - Development: Uses SWC compiler (@vitejs/plugin-react-swc) for fast transpilation and HMR
  - Production: Minification with Terser, source maps enabled, CSS code-split
  - Package exports configured for proper ESM/CJS resolution
- **PostCSS** (`postcss.config.js`) - Modern plugin stack
  - postcss-preset-env (stage 2) - Modern CSS syntax support
  - autoprefixer - Vendor prefixing
  - cssnano (production only) - CSS minification
- **Vitest** (`vitest.config.ts`) - Test runner with jsdom environment
- **ESLint** (`eslint.config.js`) - Flat config format (v9) for JS/TS linting
- **Stylelint** - SCSS linting with modern standards config (v16)

### Styling
- Uses SCSS modules for component styling with CSS Modules features
- CSS variables for theming (primary color, dimensions, width)
- Modern CSS syntax (nesting, custom properties) via PostCSS
- Dart Sass compiler (v1.81+) for fast SCSS processing

## Key Features Implementation

### Auto-flip Menu
The menu automatically flips vertically when near the bottom of the screen (controlled by `autoFlipMenu` prop and `shouldFlipVertical` logic in MenuHead).

### Edge Detection
The `useMenuHidden` hook and related logic in MenuHead detect when the menu button is near screen edges and adjusts menu positioning accordingly (`bringMenuToFocus` prop).

### Draggable Button
The `usePosition` hook implements dragging using pointer events (not when `pin` prop is set).

### Theme Customization
Theme is merged with default theme (`src/utils/theme-default.ts`) and provided via context. CSS variables are set on the menu head element.
