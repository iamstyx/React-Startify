# React-Startify 🚀

A powerful CLI tool to quickly scaffold React projects with Vite, automatic folder structure, and clean boilerplate.

## Features

✨ **Quick Setup** - Create React projects in seconds  
📁 **Organized Structure** - Automatic folder organization for scalable projects  
🔷 **TypeScript/JavaScript** - Choose your preferred language  
⚡ **Vite Powered** - Lightning-fast development experience  
🎨 **Clean Boilerplate** - Professional welcome page instead of default Vite template  
🎨 **Tailwind CSS** - Optional Tailwind CSS integration with automatic configuration  
📦 **Package Manager Choice** - Support for npm, yarn, and pnpm

## Installation

### Global Installation (Recommended)

```bash
npm install -g react-startify
```

### Or use directly with npx

```bash
npx react-startify my-app
```

## Usage

### Interactive Mode

```bash
react-startify
```

The CLI will guide you through the setup process with interactive prompts.

### Command Line Mode

```bash
# Create TypeScript project with npm
react-startify my-app --typescript --npm

# Create JavaScript project with yarn
react-startify my-app --javascript --yarn

# Create TypeScript project with pnpm and Tailwind CSS
react-startify my-app --typescript --pnpm --tailwind

# Create project without Tailwind CSS
react-startify my-app --typescript --npm --no-tailwind
```

### Available Options

- `--typescript` / `-t` - Use TypeScript
- `--javascript` / `-j` - Use JavaScript
- `--npm` - Use npm as package manager
- `--yarn` - Use yarn as package manager
- `--pnpm` - Use pnpm as package manager
- `--tailwind` - Include Tailwind CSS
- `--no-tailwind` - Skip Tailwind CSS (default)

## Project Structure

React-Startify creates a well-organized project structure:

```
my-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── index.ts         # Export barrel
│   ├── pages/              # Page components
│   │   ├── Welcome.tsx     # Clean welcome page
│   │   └── index.ts        # Export barrel
│   ├── hooks/              # Custom React hooks
│   │   └── index.ts        # Export barrel
│   ├── store/              # State management
│   │   └── index.ts        # Export barrel
│   ├── utils/              # Utility functions
│   │   └── index.ts        # Export barrel
│   ├── assets/             # Static assets
│   │   ├── images/         # Image files
│   │   └── styles/         # CSS files
│   │       └── global.css  # Global styles
│   ├── App.tsx             # Main App component
│   ├── main.tsx            # Entry point
│   └── index.css           # Base styles
├── package.json
├── tsconfig.json           # TypeScript config (if TS selected)
├── vite.config.ts          # Vite configuration
└── index.html              # HTML template
```

## What You Get

### 🎨 Clean Welcome Page

Instead of the default Vite template, you get a beautiful welcome page that showcases your project structure and next steps.

### 🎨 Tailwind CSS Integration

Optional Tailwind CSS integration with:
- Automatic installation of required packages (`tailwindcss`, `@tailwindcss/vite`, `autoprefixer`)
- Pre-configured Vite setup with Tailwind plugin
- Modern welcome page using Tailwind utility classes
- Clean CSS imports ready for development

### 📁 Organized Folders

Pre-created folders with index files for better organization:

- **components/** - For reusable UI components
- **pages/** - For page-level components
- **hooks/** - For custom React hooks
- **store/** - For state management (Redux, Zustand, etc.)
- **utils/** - For utility functions
- **assets/** - For images and styles

### ⚡ Vite Configuration

Optimized Vite setup for the best development experience with hot module replacement.

### 🔷 TypeScript Ready

Full TypeScript support with proper configurations and type definitions.

## Examples

### Create a TypeScript project with Tailwind CSS

```bash
react-startify my-tailwind-app --typescript --npm --tailwind
cd my-tailwind-app
npm run dev
```

### Create a JavaScript project with yarn

```bash
react-startify my-js-app --javascript --yarn
cd my-js-app
yarn dev
```

### Interactive setup

```bash
react-startify
# Follow the prompts to configure your project
```

## Shortcuts

You can also use the shorter alias:

```bash
startify my-app
```

## Requirements

- Node.js 16.0.0 or higher
- npm, yarn, or pnpm

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Your Name]

## Support

If you like React-Startify, please give it a ⭐ on GitHub!

---

**Happy coding with React-Startify!** 🎉
