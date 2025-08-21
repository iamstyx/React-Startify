# Changelog

All notable changes to React-Startify will be documented in this file.

## [1.1.1] - 2025-08-22

### Refactored

- **Code Organization**: Separated CSS framework logic into dedicated modules
  - Created `src/frameworks/` directory for framework-specific code
  - Created `src/templates/` directory for boilerplate templates
  - Introduced `FrameworkManager` class for extensible framework support
  - Moved Tailwind CSS logic to `src/frameworks/tailwind.ts`
  - Moved default templates to `src/templates/boilerplate.ts`

### Improved

- **Maintainability**: Better separation of concerns and modularity
- **Extensibility**: Framework architecture ready for additional CSS frameworks
- **Code Quality**: Reduced main file complexity and improved readability

### Technical

- TypeScript interfaces for framework configuration
- Centralized framework management system
- Cleaner import structure and dependencies

## [1.1.0] - 2025-08-21

### Added

- **Tailwind CSS Integration**: Optional Tailwind CSS support with automatic configuration
  - New `--tailwind` and `--no-tailwind` CLI options
  - Automatic installation of Tailwind CSS, @tailwindcss/vite, and autoprefixer
  - Pre-configured Vite setup with Tailwind plugin
  - Modern welcome page using Tailwind utility classes when enabled
  - Clean CSS imports with `@import "tailwindcss"`

### Changed

- Interactive mode now includes Tailwind CSS option prompt
- Welcome page design updated with Tailwind classes (when enabled)
- CSS structure optimized for both custom CSS and Tailwind workflows
- Enhanced project setup output to show Tailwind status

### Technical

- Added new functions for Tailwind dependency management
- Improved Vite configuration generation
- Enhanced boilerplate file creation with conditional styling
- Better package manager integration for dev dependency installation

## [1.0.1] - 2025-08-21

### Improved

- **UI/UX Enhancement**: Removed bulky ASCII art banner and replaced with clean, professional header
- **Better Output Formatting**: Enhanced project structure display with helpful descriptions
- **Improved Success Messages**: More polished and informative completion messages
- **Professional Appearance**: Better color scheme and typography for terminal output
- **Reduced Terminal Clutter**: Cleaner, more readable CLI experience

### Technical

- Optimized display functions for better performance
- Improved code organization and readability
- Enhanced visual hierarchy in CLI output

## [1.0.0] - 2025-08-21

### Added

- Initial release of React-Startify
- Interactive CLI for project creation
- Support for TypeScript and JavaScript
- Support for npm, yarn, and pnpm package managers
- Automatic folder structure creation:
  - `src/components/` - Reusable UI components
  - `src/pages/` - Page components
  - `src/hooks/` - Custom React hooks
  - `src/store/` - State management
  - `src/utils/` - Utility functions
  - `src/assets/images/` - Image assets
  - `src/assets/styles/` - CSS files
- Clean welcome page boilerplate
- Beautiful ASCII art banner
- Index files for better organization
- Global CSS with modern styling
- Command line argument support
- Vite integration with React
- TypeScript configuration
- Comprehensive documentation

### Features

- 🚀 Quick project scaffolding
- 📁 Organized folder structure
- 🔷 TypeScript/JavaScript choice
- ⚡ Vite-powered development
- 🎨 Clean boilerplate
- 📦 Package manager flexibility
- ✨ Beautiful UI and UX

### Commands

- `react-startify` - Interactive mode
- `react-startify <name> --typescript --npm` - CLI mode
- `startify` - Shortcut alias
