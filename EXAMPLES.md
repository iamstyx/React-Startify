# React-Startify Usage Examples

## Installation

```bash
npm install -g react-startify
```

## Examples

### 1. Interactive Mode (Recommended for beginners)

```bash
react-startify
```

This will prompt you for:

- Project name
- Language preference (TypeScript/JavaScript)
- Package manager (npm/yarn/pnpm)

### 2. Command Line Mode

#### TypeScript Projects

```bash
# With npm
react-startify my-ts-app --typescript --npm

# With yarn
react-startify my-ts-app --typescript --yarn

# With pnpm
react-startify my-ts-app --typescript --pnpm
```

#### JavaScript Projects

```bash
# With npm
react-startify my-js-app --javascript --npm

# With yarn
react-startify my-js-app --javascript --yarn

# With pnpm
react-startify my-js-app --javascript --pnpm
```

### 3. Using the Shortcut Alias

```bash
# Same as react-startify
startify my-app --typescript --npm
```

### 4. Using with npx (No global installation)

```bash
npx react-startify my-app --typescript --npm
```

## What Gets Created

After running any of the above commands, you'll have:

```
my-app/
├── src/
│   ├── components/
│   │   └── index.ts
│   ├── pages/
│   │   ├── Welcome.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   └── index.ts
│   ├── store/
│   │   └── index.ts
│   ├── utils/
│   │   └── index.ts
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       └── global.css
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json (if TypeScript)
├── vite.config.ts
└── index.html
```

## Next Steps After Creation

```bash
cd my-app
npm run dev
```

Your development server will start and you'll see the beautiful React-Startify welcome page!

## Pro Tips

1. **Use TypeScript**: It's recommended for larger projects
2. **Choose pnpm**: It's faster and more efficient than npm/yarn
3. **Organize early**: Use the pre-created folders to keep your code organized
4. **Follow the structure**: Each folder has an index.ts file for clean imports
