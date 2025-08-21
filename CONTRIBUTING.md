# Contributing to React-Startify

Thank you for your interest in contributing to React-Startify! 🚀

## 👋 Contact

**Maintainer:** Sushant Verma  
**GitHub:** [@iamstyx](https://github.com/iamstyx)  
**Email:** sushantt.verma@gmail.com

## Development Guide

## Setup for Development

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

4. Test the CLI:
   ```bash
   npm run test:cli
   ```

## Development Workflow

1. Make changes to `src/index.ts`
2. Build the project: `npm run build`
3. Test locally: `node dist/index.js my-test-app --typescript --npm`

## Testing

- `npm test` - Run the test script
- `npm run test:cli` - Build and test the CLI

## File Structure

```
src/
├── index.ts          # Main CLI application

dist/                 # Compiled JavaScript (generated)
├── index.js
├── index.d.ts
└── index.js.map

templates/            # Future: Template files
test-project/         # Generated during testing
```

## Publishing

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Build: `npm run build`
4. Test: `npm run test:cli`
5. Publish: `npm publish`

## Features to Add

- [ ] Custom templates
- [ ] Git initialization option
- [ ] ESLint/Prettier setup
- [ ] Testing framework setup (Jest/Vitest)
- [ ] Styling framework options (Tailwind, Styled Components)
- [ ] Router setup (React Router)
- [ ] State management setup (Redux Toolkit, Zustand)

## Architecture

The CLI uses:

- **Commander.js** - Command line interface
- **Inquirer.js** - Interactive prompts
- **Chalk** - Terminal colors
- **Ora** - Loading spinners
- **fs-extra** - File system operations
- **child_process** - Running external commands
