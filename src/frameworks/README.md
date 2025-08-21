# CSS Frameworks Architecture

This directory contains the CSS framework integration logic for React-Startify.

## Structure

```
frameworks/
├── index.ts          # Main exports
├── types.ts          # TypeScript interfaces and types
├── manager.ts        # Central framework management
└── tailwind.ts       # Tailwind CSS specific implementation
```

## Adding a New CSS Framework

To add support for a new CSS framework (e.g., Bootstrap, Styled Components):

1. **Create framework file**: `src/frameworks/[framework-name].ts`
2. **Add to types**: Update `SupportedFramework` type in `types.ts`
3. **Implement functions**:
   - `install[Framework]Dependencies()`
   - `create[Framework]ViteConfig()`
   - `get[Framework]Styles()`
   - `get[Framework]AppContent()`
4. **Update manager**: Add case to `FrameworkManager` class
5. **Export**: Add to `index.ts`

## Framework Interface

Each framework should provide:

- **Installation**: Dependency management and package installation
- **Configuration**: Vite/build tool configuration setup
- **Styles**: Base CSS/styling files
- **Templates**: Framework-specific component templates

## Example Implementation

```typescript
// frameworks/bootstrap.ts
export async function installBootstrapDependencies(
  projectPath: string,
  packageManager: string
): Promise<void> {
  // Implementation
}

export function getBootstrapStyles(): string {
  return `@import "bootstrap/dist/css/bootstrap.min.css";`;
}

// Add to types.ts
export type SupportedFramework = "tailwind" | "bootstrap" | "none";

// Add to manager.ts
case 'bootstrap':
  return getBootstrapAppContent(language);
```

This architecture ensures consistent framework integration and easy extensibility.
