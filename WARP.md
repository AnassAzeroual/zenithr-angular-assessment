# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a dynamic stepper component Angular application built for a technical assessment. The app implements a multi-step survey workflow with form validation, persistent state management, and dynamic navigation. It uses Angular 20.2.0 with standalone components, Tailwind CSS for styling, and includes a reusable stepper architecture.

## Development Commands

### Essential Commands
- **Start development server:** `npm start` or `ng serve`
  - App runs on http://localhost:4200/
- **Build for production:** `npm run build` or `ng build`
- **Build with watch mode:** `npm run watch`
- **Run tests:** `npm test`
- **Deploy to docs:** `npm run host` (builds and commits to docs directory for GitHub Pages)

### Angular CLI Commands
- **Generate component:** `ng generate component <name>`
- **Generate service:** `ng generate service <name>`
- **Generate guard:** `ng generate guard <name>`

## Architecture & Code Structure

### Application Architecture
The app follows a modular standalone component architecture with lazy-loaded routes:

- **Standalone Components**: All components are standalone (no NgModules)
- **Lazy Loading**: Pages are lazy-loaded using dynamic imports
- **Form Management**: Centralized reactive form management through `HelpersService`
- **State Persistence**: Form data persists across navigation using sessionStorage
- **Route Guards**: Form validation guards prevent navigation with invalid forms

### Key Directories

```
src/app/
├── pages/           # Survey step components (select-product, enps, comments, etc.)
├── shared/
│   ├── components/  # Reusable components (dynamic-stepper, paginator)
│   ├── guards/      # Route guards (stepper-form.guard)
│   ├── layouts/     # Layout components (main-layout, full-screen-layout)
│   ├── models/      # Data models (navigator.model)
│   └── services/    # Core services (helpers.service)
```

### Core Components

**DynamicStepperComponent** (`src/app/shared/components/dynamic-stepper/`)
- Main stepper orchestrator
- Handles navigation between steps
- Integrates with form validation
- Dynamically generates step navigation from route configuration

**HelpersService** (`src/app/shared/services/helpers.service.ts`)
- Manages centralized form state (`mainForm`)
- Handles sessionStorage persistence
- Provides stepper navigation utilities
- Contains form validation logic including custom validators (sum validators)

### Form Architecture
- **Nested FormGroup Structure**: `mainForm` contains sub-forms for each step
- **Cross-Step Validation**: Route guards validate previous steps before navigation
- **Persistent State**: Form data survives page refreshes via sessionStorage
- **Custom Validators**: Sum validation for percentage fields (must total 100%)

### Route Structure
- **Main Layout** (`/`): Landing page with scenarios
- **Survey Flow** (`/survey/*`): Multi-step survey with form validation guards
  - Each step requires previous step's form to be valid
  - Uses `formGroupName` data property to specify which form group to validate

### Styling Approach
- **Tailwind CSS 4.1.13**: Utility-first CSS framework
- **SCSS Support**: Component-level styles with SCSS
- **PostCSS Integration**: Tailwind processing via PostCSS
- **Prettier Configuration**: Consistent code formatting with Angular HTML parser

## Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled with comprehensive compiler checks
- **Angular Style Guide**: Follows official Angular conventions
- **Standalone Components**: All new components should be standalone
- **Reactive Forms**: Use reactive forms for all form implementations
- **Single Quotes**: Use single quotes for strings (configured in .editorconfig)

### Component Creation
When creating new step components:
1. Place in `src/app/pages/<step-name>/`
2. Use standalone component with required imports
3. Inject `HelpersService` to access `mainForm`
4. Add route to `app.routes.ts` under survey children
5. Add appropriate `stepperFormGuard` with `formGroupName` data

### Form Management
- Access main form via `inject(HelpersService).mainForm`
- Add new form groups to `createMainForm()` method in `HelpersService`
- Use custom validators for complex validation rules
- Form changes automatically persist to sessionStorage

### Navigation Flow
- Stepper automatically generates navigation from route configuration
- Route guards enforce form validation before navigation
- Use `NavigatorData` model for step metadata
- Current step highlighting handled automatically by router events

## Testing Considerations

When writing tests:
- Mock `HelpersService` for components that depend on form state
- Test route guards with valid/invalid form states
- Verify sessionStorage persistence behavior
- Test custom form validators independently

## Key Dependencies

- **@angular/cdk**: Angular Component Dev Kit for stepper functionality
- **@angular/forms**: Reactive forms implementation
- **tailwindcss**: Utility-first CSS framework
- **rxjs**: Reactive programming for form state management

## Development Notes

- Form state persists across page refreshes using sessionStorage key 'surveyFormData'
- The stepper component dynamically generates navigation based on route configuration
- All forms are validated before allowing navigation to next steps
- The app uses Angular's modern standalone component architecture (no NgModules)
- Prettier is configured specifically for Angular HTML templates