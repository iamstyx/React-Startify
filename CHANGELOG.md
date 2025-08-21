# Changelog

All notable changes to React-Startify will be documented in this file.

## [1.4.0] - 2025-08-22

### Added

- **Expanded Optional Packages Ecosystem**: Major expansion of optional package support
  - New `--react-router` CLI option for React Router DOM routing
  - New `--zustand` CLI option for lightweight state management
  - New `--tanstack-query` CLI option for powerful data synchronization
  - New `--framer-motion` CLI option for production-ready animations
  - New `--styled-components` CLI option for CSS-in-JS styling
  - New `--react-hook-form` CLI option for performant form handling
  - New `--date-fns` CLI option for modern date utilities
  - New `--uuid` CLI option for RFC-compliant unique identifiers
  - Total of 10 optional packages now available

### Enhanced

- **Documentation**: Comprehensive updates to README with specialized project templates
  - Added Modern E-commerce App template
  - Added Animated Portfolio Site template  
  - Added Enterprise Dashboard template
  - Added All-Inclusive Project template
  - Extended CLI options table with all new packages
  - Enhanced package descriptions and use cases

- **Type Safety**: Extended TypeScript definitions for all new optional packages
  - Proper type definitions for all package combinations
  - Enhanced build system validation

## [1.3.0] - 2025-08-22

### Added

- **Optional Packages Support**: Modular system for adding popular libraries during project creation
  - New `--axios` CLI option for including Axios HTTP client
  - New `--react-icons` CLI option for including React Icons library
  - New `--all-packages` CLI option for including all optional packages
  - Interactive checkbox selection in wizard mode for package choosing
  - Automatic installation of packages and TypeScript type definitions

### Enhanced

- **CLI Experience**: Extended with optional package selection capabilities
  - Interactive checkbox prompts for package selection
  - Better user feedback during package installation
  - Improved command-line option parsing for multiple packages
  - Enhanced success messages showing installed optional packages

### Technical

- **Package Architecture**: Modular optional package system
  - Type-safe package definitions with TypeScript interfaces
  - Extensible design for adding future optional packages
  - Smart dependency management for main and dev packages
  - Proper handling of TypeScript type packages

### Package Updates

- **Version**: Bumped to 1.3.0
- **Keywords**: Added axios, react-icons, optional-packages, modular
- **Description**: Updated to highlight optional package support
- **Build**: Enhanced distribution for modular package system

## [1.2.0] - 2025-08-22

### Added

- **Bootstrap CSS Framework Support**: Complete Bootstrap integration with auto-installation
  - New `--bootstrap` CLI option for command-line usage
  - Interactive framework selection in wizard mode (Tailwind/Bootstrap/None)
  - Bootstrap-styled welcome page with responsive grid system
  - Automatic import of Bootstrap CSS and JS bundles
  - Custom gradient backgrounds and professional card layouts

### Enhanced

- **CLI Experience**: Improved framework selection with better user prompts
  - Replaced binary Tailwind option with comprehensive framework choice
  - Updated help text and option descriptions
  - Enhanced error handling for framework setup

### Updated

- **Documentation**: Comprehensive Bootstrap examples and usage instructions
  - Updated README with Bootstrap integration details
  - Added framework comparison table
  - Enhanced command-line options documentation
  - Created detailed release notes

### Technical

- **Package Metadata**: Updated version to 1.2.0 with enhanced keywords
  - Added Bootstrap, CSS framework, and development-related tags
  - Updated description to reflect multi-framework support
  - Enhanced npm package discoverability

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
