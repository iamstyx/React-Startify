<div align="center">

# React-Startify 🚀

<img src="https://img.shields.io/npm/v/react-startify?style=for-the-badge&color=blue" alt="npm version">
<img src="https://img.shields.io/npm/dt/react-startify?style=for-the-badge&color=green" alt="downloads">
<img src="https://img.shields.io/github/license/iamstyx/React-Startify?style=for-the-badge&color=orange" alt="license">
<img src="https://img.shields.io/npm/node/react-startify?style=for-the-badge&color=red" alt="node version">

**The fastest way to create production-ready React applications**

_Zero configuration • Modern tooling • Best practices built-in_

[Installation](#installation) • [Quick Start](#quick-start) • [Examples](#examples) • [Documentation](#documentation)

</div>

---

## 🌟 Why React-Startify?

React-Startify eliminates the complexity of setting up modern React projects. In seconds, you get a production-ready application with industry best practices, optimal folder structure, and powerful tooling pre-configured.

### ✨ Key Features

| Feature                    | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| ⚡ **Blazing Fast**        | Powered by Vite for instant hot reload and optimized builds |
| � **Zero Config**          | Works out of the box with sensible defaults                 |
| 📁 **Smart Structure**     | Industry-standard folder organization for scalable projects |
| 🔷 **TypeScript First**    | Full TypeScript support with proper configurations          |
| 🎨 **CSS Framework Ready** | Optional Tailwind CSS or Bootstrap with optimized setup     |
| 📦 **Flexible**            | Support for npm, yarn, and pnpm                             |
| 🚀 **Production Ready**    | Optimized builds and performance best practices             |

## 🚀 Quick Start

Get started in less than 30 seconds:

```bash
# Install globally (recommended)
npm install -g react-startify

# Create your first project
react-startify my-awesome-app

# Start developing
cd my-awesome-app
npm run dev
```

That's it! Your React application is ready at `http://localhost:5173`

## 📦 Installation

### Global Installation (Recommended)

```bash
npm install -g react-startify
```

### Using npx (No installation required)

```bash
npx react-startify my-app
```

### Using yarn

```bash
yarn global add react-startify
# or
yarn create react-startify my-app
```

### Using pnpm

```bash
pnpm add -g react-startify
# or
pnpm create react-startify my-app
```

## 💡 Usage

### 🎯 Interactive Mode (Recommended)

Launch the interactive setup wizard:

```bash
react-startify
```

The CLI will guide you through:

- 📝 Project name selection
- 🔤 Language preference (TypeScript/JavaScript)
- 📦 Package manager choice (npm/yarn/pnpm)
- 🎨 CSS framework selection (Tailwind CSS/Bootstrap/None)
- 📦 Optional packages selection (Axios, React Icons)
- ⚙️ Additional configurations

### ⚡ Command Line Mode

For automated workflows and CI/CD:

```bash
# TypeScript + npm + Tailwind
react-startify my-app --typescript --npm --tailwind

# TypeScript + npm + Bootstrap + Optional packages
react-startify my-app --typescript --npm --bootstrap --axios --react-icons

# JavaScript + yarn (no CSS framework)
react-startify my-app --javascript --yarn --no-framework

# TypeScript + pnpm + Tailwind + All packages
react-startify my-app --typescript --pnpm --tailwind --all-packages
```

### 🛠️ Command Options

| Option           | Alias | Description                  |
| ---------------- | ----- | ---------------------------- |
| `--typescript`   | `-t`  | Use TypeScript (default)     |
| `--javascript`   | `-j`  | Use JavaScript               |
| `--npm`          |       | Use npm as package manager   |
| `--yarn`         |       | Use yarn as package manager  |
| `--pnpm`         |       | Use pnpm as package manager  |
| `--tailwind`     |       | Include Tailwind CSS setup   |
| `--bootstrap`    |       | Include Bootstrap setup      |
| `--no-framework` |       | Skip CSS framework (default) |
| `--axios`        |       | Include Axios HTTP client    |
| `--react-icons`  |       | Include React Icons library  |
| `--all-packages` |       | Include all optional packages |
| `--help`         | `-h`  | Show help information        |
| `--version`      | `-v`  | Show version number          |

### 🔄 Shorthand Alias

Use the shorter command for convenience:

```bash
startify my-app --typescript --tailwind
```

## 📁 Project Structure

React-Startify creates a production-ready project structure following React best practices:

```
my-app/
├── 📁 public/                 # Static assets
│   └── vite.svg
├── 📁 src/
│   ├── 📁 components/         # Reusable UI components
│   ├── 📁 pages/             # Page-level components
│   │   └── Welcome.tsx       # Beautiful welcome page
│   ├── 📁 hooks/             # Custom React hooks
│   ├── 📁 store/             # State management
│   ├── 📁 utils/             # Utility functions & helpers
│   ├── 📁 assets/            # Static assets
│   │   ├── 📁 images/        # Image files
│   │   └── 📁 styles/        # CSS/SCSS files
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Base styles with CSS variables
├── 📄 package.json           # Dependencies & scripts
├── 📄 tsconfig.json          # TypeScript configuration
├── 📄 vite.config.ts         # Vite configuration
├── 📄 tailwind.config.js     # Tailwind config (if selected)
├── 📄 postcss.config.js      # PostCSS config (if Tailwind)
└── 📄 index.html             # HTML template
```

### 🎯 Folder Benefits

- **� Clean Organization**: Well-structured folders for different code types
- **🔄 Scalable**: Easy to extend as your project grows
- **🎨 Separation of Concerns**: Clear boundaries between different code types
- **📱 Mobile-First**: Responsive design patterns included

## ✨ What You Get

### 🎨 Beautiful Welcome Page

Say goodbye to the generic Vite template! React-Startify includes a stunning welcome page that:

- 📊 **Project Overview**: Visual representation of your folder structure
- 🚀 **Next Steps Guide**: Clear instructions to get you started
- 🎨 **Modern Design**: Beautiful UI showcasing your tech stack
- 📱 **Responsive Layout**: Looks great on all devices
- 🔗 **Helpful Links**: Quick access to documentation and resources

### 🎨 CSS Framework Integration

Choose from popular CSS frameworks with zero configuration:

#### Tailwind CSS

When you choose Tailwind CSS, you get:

- ✅ **Auto-Installation**: All required packages installed automatically
  - `tailwindcss` - Core Tailwind CSS framework
  - `@tailwindcss/vite` - Vite integration plugin
  - `autoprefixer` - CSS vendor prefixing
- ⚙️ **Pre-configured Setup**: Vite integration ready to go
- 🎨 **Styled Welcome Page**: Modern design using Tailwind utilities
- 🔧 **Optimized Config**: PurgeCSS and JIT mode enabled
- 📐 **Design System**: Custom color palette and spacing scale

#### Bootstrap

When you choose Bootstrap, you get:

- ✅ **Auto-Installation**: Bootstrap package installed automatically
  - `bootstrap` - Complete Bootstrap framework with CSS and JS
- ⚙️ **Pre-configured Setup**: CSS and JS imports ready to use
- 🎨 **Styled Welcome Page**: Beautiful design using Bootstrap components
- 🔧 **Component Library**: Full access to Bootstrap's component system
- 📱 **Responsive Grid**: 12-column grid system for layouts

### 🏗️ Optimized Development Environment

- ⚡ **Vite 5+**: Latest version with optimal performance
- 🔥 **Hot Module Replacement**: Instant updates without losing state
- 🔍 **Source Maps**: Perfect debugging experience
- 📦 **Tree Shaking**: Optimal bundle sizes
- 🎯 **Path Mapping**: Clean imports with TypeScript paths

### 🔷 TypeScript Excellence

- 📝 **Strict Configuration**: Catch errors early with strict mode
- 🎯 **Modern Target**: ES2022 for optimal performance
- 📚 **Type Definitions**: All necessary @types packages included
- 🔧 **IDE Support**: Perfect IntelliSense and error detection
- 🏷️ **JSX Support**: Full React 18+ TypeScript integration

### 📦 Package Manager Flexibility

No matter your preference, we've got you covered:

| Manager  | Features                                           |
| -------- | -------------------------------------------------- |
| **npm**  | Industry standard, reliable, great ecosystem       |
| **yarn** | Fast, secure, great for monorepos                  |
| **pnpm** | Disk efficient, fast, strict dependency management |

## 📚 Examples

### 🚀 Create a Full-Stack Ready App

```bash
# TypeScript + Tailwind for modern development
react-startify my-saas-app --typescript --npm --tailwind
cd my-saas-app
npm run dev
```

Perfect for: SaaS applications, dashboards, e-commerce sites

### 🅱️ Create a Bootstrap Powered App

```bash
# TypeScript + Bootstrap for component-rich applications
react-startify my-enterprise-app --typescript --npm --bootstrap
cd my-enterprise-app
npm run dev
```

Perfect for: Enterprise applications, admin panels, data-heavy interfaces

### 📦 Create a Feature-Rich App with Optional Packages

```bash
# Full-featured app with Axios and React Icons
react-startify my-full-app --typescript --npm --bootstrap --axios --react-icons
cd my-full-app
npm run dev
```

Perfect for: API-driven applications, data visualization, modern UIs

#### Available Optional Packages

| Package | Description | Use Cases |
|---------|-------------|-----------|
| **Axios** | Promise-based HTTP client | API calls, data fetching, REST integration |
| **React Icons** | Popular icon libraries as React components | UI icons, Font Awesome, Feather, Material Design |

### ⚡ Quick Prototype Setup

```bash
# JavaScript for rapid prototyping
react-startify my-prototype --javascript --yarn
cd my-prototype
yarn dev
```

Perfect for: MVPs, proof of concepts, quick demos

### 🎨 Design System Project

```bash
# TypeScript + Tailwind for component libraries
react-startify my-design-system --typescript --pnpm --tailwind
cd my-design-system
pnpm dev
```

Perfect for: Component libraries, design systems, UI kits

### 🤖 Interactive Setup

```bash
# Let the wizard guide you
react-startify

# Follow the prompts:
# ✨ What's your project name?
# 🔤 TypeScript or JavaScript?
# 📦 Which package manager?
# 🎨 Include Tailwind CSS?
```

Perfect for: First-time users, exploring options

## 🔧 Requirements

| Requirement          | Version | Notes                    |
| -------------------- | ------- | ------------------------ |
| **Node.js**          | 16.0.0+ | LTS versions recommended |
| **Package Manager**  | Any     | npm, yarn, or pnpm       |
| **Operating System** | Any     | Windows, macOS, Linux    |

## 🆚 Comparison

| Feature             | React-Startify        | Create React App | Vite React Template |
| ------------------- | --------------------- | ---------------- | ------------------- |
| ⚡ Build Tool       | Vite 5+               | Webpack          | Vite                |
| 📁 Folder Structure | ✅ Organized          | ❌ Basic         | ❌ Minimal          |
| 🎨 Welcome Page     | ✅ Beautiful          | ❌ Generic       | ❌ Basic            |
| 🔷 TypeScript       | ✅ Optimized          | ⚠️ Basic         | ⚠️ Basic            |
| 🎨 CSS Frameworks   | ✅ Tailwind/Bootstrap | ❌ Manual        | ❌ Manual           |
| 📦 Package Managers | ✅ All supported      | ⚠️ npm/yarn      | ⚠️ Limited          |
| 🚀 Performance      | ✅ Optimized          | ❌ Slow          | ✅ Fast             |
| 📚 Documentation    | ✅ Comprehensive      | ✅ Good          | ⚠️ Basic            |

## 🛠️ Development Commands

After creating your project, use these commands:

```bash
# Start development server
npm run dev          # or yarn dev / pnpm dev

# Build for production
npm run build        # or yarn build / pnpm build

# Preview production build
npm run preview      # or yarn preview / pnpm preview

# Type checking (TypeScript projects)
npm run type-check   # or yarn type-check / pnpm type-check

# Lint code
npm run lint         # or yarn lint / pnpm lint
```

## 🐛 Troubleshooting

### Common Issues

<details>
<summary>🔴 "Command not found: react-startify"</summary>

**Solution**: Make sure you've installed the package globally:

```bash
npm install -g react-startify
```

Or use npx directly:

```bash
npx react-startify my-app
```

</details>

<details>
<summary>🔴 Permission errors on macOS/Linux</summary>

**Solution**: Use sudo for global installation:

```bash
sudo npm install -g react-startify
```

Or use a Node version manager like nvm.

</details>

<details>
<summary>🔴 "Module not found" errors</summary>

**Solution**: Clear your package manager cache:

```bash
# npm
npm cache clean --force

# yarn
yarn cache clean

# pnpm
pnpm store prune
```

</details>

<details>
<summary>🔴 Tailwind styles not working</summary>

**Solution**: Ensure you've imported the CSS file in your `main.tsx`:

```typescript
import "./index.css";
```

</details>

### Getting Help

- 📖 Check our [examples](EXAMPLES.md)
- 🐛 [Report bugs](https://github.com/iamstyx/React-Startify/issues)
- 💬 [Join discussions](https://github.com/iamstyx/React-Startify/discussions)
- 📧 Email: sushantt.verma@gmail.com

## 🤝 Contributing

We love contributions! Here's how to get started:

### 🚀 Quick Contribution Guide

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/React-Startify.git`
3. **Install** dependencies: `npm install`
4. **Create** a branch: `git checkout -b feature/amazing-feature`
5. **Make** your changes
6. **Test** your changes: `npm run test`
7. **Commit** your changes: `git commit -m 'Add amazing feature'`
8. **Push** to your branch: `git push origin feature/amazing-feature`
9. **Open** a Pull Request

### 🎯 Contribution Areas

- 🐛 **Bug Fixes**: Help us squash bugs
- ✨ **New Features**: Add cool new functionality
- 📚 **Documentation**: Improve docs and examples
- 🎨 **UI/UX**: Enhance the welcome page and CLI
- 🧪 **Testing**: Add or improve tests
- 🌐 **Translations**: Help us go global

### 📋 Development Setup

```bash
# Clone the repo
git clone https://github.com/iamstyx/React-Startify.git
cd React-Startify

# Install dependencies
npm install

# Build the project
npm run build

# Test locally
npm link
react-startify test-project

# Run tests
npm test
```

Read our [Contributing Guide](CONTRIBUTING.md) for detailed information.

## 📄 License

MIT © [Sushant Verma](https://github.com/iamstyx)

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- ⚡ **Vite Team** - For the amazing build tool
- ⚛️ **React Team** - For the incredible framework
- 🎨 **Tailwind Team** - For the utility-first CSS framework
- 🌟 **Open Source Community** - For inspiration and contributions

## 📈 Stats

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/iamstyx/React-Startify?style=social)](https://github.com/iamstyx/React-Startify/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/iamstyx/React-Startify?style=social)](https://github.com/iamstyx/React-Startify/network/members)
[![GitHub issues](https://img.shields.io/github/issues/iamstyx/React-Startify)](https://github.com/iamstyx/React-Startify/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/iamstyx/React-Startify)](https://github.com/iamstyx/React-Startify/pulls)

</div>

## 💖 Support the Project

If React-Startify has helped you build amazing projects, consider:

- ⭐ **Star** the project on GitHub
- 🐦 **Share** it on Twitter
- 📝 **Write** a blog post about it
- 💝 **Sponsor** the project

<div align="center">

**Made with ❤️ for the React community**

[🏠 Homepage](https://github.com/iamstyx/React-Startify) • [📚 Documentation](https://github.com/iamstyx/React-Startify#readme) • [🚀 Getting Started](#quick-start) • [❓ FAQ](https://github.com/iamstyx/React-Startify/discussions)

---

**Happy coding with React-Startify!** 🎉

</div>
