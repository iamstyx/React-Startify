import { execSync } from "child_process";
import { OptionalPackage, OptionalPackageDefinition, OptionalPackageConfig } from "./types";

export const OPTIONAL_PACKAGES: Record<OptionalPackage, OptionalPackageDefinition> = {
  axios: {
    name: "Axios",
    packages: ["axios"],
    typePackages: ["@types/axios"],
    description: "Promise-based HTTP client for making API requests"
  },
  "react-icons": {
    name: "React Icons",
    packages: ["react-icons"],
    typePackages: [],
    description: "Popular icon libraries as React components (Font Awesome, Feather, Material Design, etc.)"
  },
  "react-router": {
    name: "React Router",
    packages: ["react-router-dom"],
    typePackages: ["@types/react-router-dom"],
    description: "Declarative routing for React applications"
  },
  "zustand": {
    name: "Zustand",
    packages: ["zustand"],
    typePackages: [],
    description: "Small, fast, and scalable state management solution"
  },
  "tanstack-query": {
    name: "TanStack Query",
    packages: ["@tanstack/react-query"],
    typePackages: [],
    description: "Powerful data synchronization for React (formerly React Query)"
  },
  "framer-motion": {
    name: "Framer Motion",
    packages: ["framer-motion"],
    typePackages: [],
    description: "Production-ready motion library for React"
  },
  "styled-components": {
    name: "Styled Components",
    packages: ["styled-components"],
    typePackages: ["@types/styled-components"],
    description: "CSS-in-JS library for styling React components"
  },
  "react-hook-form": {
    name: "React Hook Form",
    packages: ["react-hook-form"],
    typePackages: [],
    description: "Performant, flexible forms with easy validation"
  },
  "date-fns": {
    name: "Date-fns",
    packages: ["date-fns"],
    typePackages: [],
    description: "Modern JavaScript date utility library"
  },
  "uuid": {
    name: "UUID",
    packages: ["uuid"],
    typePackages: ["@types/uuid"],
    description: "RFC4122 (v1, v4, and v5) UUIDs generator"
  }
};

export async function installOptionalPackages(
  projectPath: string,
  config: OptionalPackageConfig
): Promise<void> {
  if (!config.packages || config.packages.length === 0) {
    return;
  }

  const packagesToInstall: string[] = [];
  const typePackagesToInstall: string[] = [];

  for (const packageKey of config.packages) {
    const packageDef = OPTIONAL_PACKAGES[packageKey];
    if (packageDef) {
      packagesToInstall.push(...packageDef.packages);
      
      // Add type packages only for TypeScript projects
      if (config.language === "typescript" && packageDef.typePackages) {
        typePackagesToInstall.push(...packageDef.typePackages);
      }
    }
  }

  // Install main packages
  if (packagesToInstall.length > 0) {
    const installCmd = getInstallCommand(config.packageManager, packagesToInstall);
    execSync(installCmd, {
      stdio: "pipe",
      cwd: projectPath,
    });
  }

  // Install type packages as dev dependencies
  if (typePackagesToInstall.length > 0) {
    const typeInstallCmd = getInstallCommand(config.packageManager, typePackagesToInstall, true);
    execSync(typeInstallCmd, {
      stdio: "pipe",
      cwd: projectPath,
    });
  }
}

export function getOptionalPackageImports(packages: OptionalPackage[]): string[] {
  const imports: string[] = [];
  
  for (const packageKey of packages) {
    switch (packageKey) {
      case "axios":
        imports.push("import axios from 'axios';");
        break;
      case "react-icons":
        imports.push("import { FaReact, FaHeart, FaRocket, FaCog } from 'react-icons/fa';");
        break;
      case "react-router":
        imports.push("import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';");
        break;
      case "zustand":
        imports.push("import { create } from 'zustand';");
        break;
      case "tanstack-query":
        imports.push("import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';");
        break;
      case "framer-motion":
        imports.push("import { motion, AnimatePresence } from 'framer-motion';");
        break;
      case "styled-components":
        imports.push("import styled from 'styled-components';");
        break;
      case "react-hook-form":
        imports.push("import { useForm, Controller } from 'react-hook-form';");
        break;
      case "date-fns":
        imports.push("import { format, parseISO, addDays } from 'date-fns';");
        break;
      case "uuid":
        imports.push("import { v4 as uuidv4 } from 'uuid';");
        break;
    }
  }
  
  return imports;
}

export function getOptionalPackageUsageExamples(packages: OptionalPackage[]): string[] {
  const examples: string[] = [];
  
  for (const packageKey of packages) {
    switch (packageKey) {
      case "axios":
        examples.push(`
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">📡 Axios HTTP Client:</h4>
            <code className="text-xs bg-gray-100 p-2 rounded block">
              const response = await axios.get('/api/data')
            </code>
          </div>
        `);
        break;
      case "react-icons":
        examples.push(`
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">🎨 React Icons:</h4>
            <div className="flex gap-2 text-xl">
              <FaReact className="text-blue-500" />
              <FaHeart className="text-red-500" />
              <FaRocket className="text-green-500" />
              <FaCog className="text-gray-500" />
            </div>
          </div>
        `);
        break;
      case "react-router":
        examples.push(`
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">🔗 React Router:</h4>
            <code className="text-xs bg-gray-100 p-2 rounded block">
              &lt;BrowserRouter&gt;&lt;Routes&gt;&lt;Route path="/" element={&lt;Home /&gt;} /&gt;&lt;/Routes&gt;&lt;/BrowserRouter&gt;
            </code>
          </div>
        `);
        break;
      case "zustand":
        examples.push(`
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">🐻 Zustand State:</h4>
            <code className="text-xs bg-gray-100 p-2 rounded block">
              const useStore = create((set) => ({ count: 0, increment: () => set((state) => ({ count: state.count + 1 })) }))
            </code>
          </div>
        `);
        break;
      case "tanstack-query":
        examples.push(`
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">🔄 TanStack Query:</h4>
            <code className="text-xs bg-gray-100 p-2 rounded block">
              const { data, isLoading } = useQuery({ queryKey: ['data'], queryFn: fetchData })
            </code>
          </div>
        `);
        break;
      case "framer-motion":
        examples.push(`
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">✨ Framer Motion:</h4>
            <code className="text-xs bg-gray-100 p-2 rounded block">
              &lt;motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}&gt;Animated!&lt;/motion.div&gt;
            </code>
          </div>
        `);
        break;
      case "styled-components":
        examples.push(`
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">💅 Styled Components:</h4>
            <code className="text-xs bg-gray-100 p-2 rounded block">
              const Button = styled.button\`background: blue; color: white;\`
            </code>
          </div>
        `);
        break;
      case "react-hook-form":
        examples.push(`
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">📋 React Hook Form:</h4>
            <code className="text-xs bg-gray-100 p-2 rounded block">
              const { register, handleSubmit } = useForm()
            </code>
          </div>
        `);
        break;
      case "date-fns":
        examples.push(`
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">📅 Date-fns:</h4>
            <code className="text-xs bg-gray-100 p-2 rounded block">
              format(new Date(), 'yyyy-MM-dd')
            </code>
          </div>
        `);
        break;
      case "uuid":
        examples.push(`
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">🆔 UUID:</h4>
            <code className="text-xs bg-gray-100 p-2 rounded block">
              const id = uuidv4() // generates unique ID
            </code>
          </div>
        `);
        break;
    }
  }
  
  return examples;
}

export function getOptionalPackageBootstrapUsageExamples(packages: OptionalPackage[]): string[] {
  const examples: string[] = [];
  
  for (const packageKey of packages) {
    switch (packageKey) {
      case "axios":
        examples.push(`
          <div className="mb-3">
            <h5 className="text-sm fw-semibold text-muted mb-2">📡 Axios HTTP Client:</h5>
            <code className="small bg-light p-2 rounded d-block">
              const response = await axios.get('/api/data')
            </code>
          </div>
        `);
        break;
      case "react-icons":
        examples.push(`
          <div className="mb-3">
            <h5 className="text-sm fw-semibold text-muted mb-2">🎨 React Icons:</h5>
            <div className="d-flex gap-2 fs-4">
              <FaReact className="text-primary" />
              <FaHeart className="text-danger" />
              <FaRocket className="text-success" />
              <FaCog className="text-secondary" />
            </div>
          </div>
        `);
        break;
      case "react-router":
        examples.push(`
          <div className="mb-3">
            <h5 className="text-sm fw-semibold text-muted mb-2">🔗 React Router:</h5>
            <code className="small bg-light p-2 rounded d-block">
              &lt;BrowserRouter&gt;&lt;Routes&gt;&lt;Route path="/" element={&lt;Home /&gt;} /&gt;&lt;/Routes&gt;&lt;/BrowserRouter&gt;
            </code>
          </div>
        `);
        break;
      case "zustand":
        examples.push(`
          <div className="mb-3">
            <h5 className="text-sm fw-semibold text-muted mb-2">🐻 Zustand State:</h5>
            <code className="small bg-light p-2 rounded d-block">
              const useStore = create((set) => ({ count: 0, increment: () => set((state) => ({ count: state.count + 1 })) }))
            </code>
          </div>
        `);
        break;
      case "tanstack-query":
        examples.push(`
          <div className="mb-3">
            <h5 className="text-sm fw-semibold text-muted mb-2">🔄 TanStack Query:</h5>
            <code className="small bg-light p-2 rounded d-block">
              const { data, isLoading } = useQuery({ queryKey: ['data'], queryFn: fetchData })
            </code>
          </div>
        `);
        break;
      case "framer-motion":
        examples.push(`
          <div className="mb-3">
            <h5 className="text-sm fw-semibold text-muted mb-2">✨ Framer Motion:</h5>
            <code className="small bg-light p-2 rounded d-block">
              &lt;motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}&gt;Animated!&lt;/motion.div&gt;
            </code>
          </div>
        `);
        break;
      case "styled-components":
        examples.push(`
          <div className="mb-3">
            <h5 className="text-sm fw-semibold text-muted mb-2">💅 Styled Components:</h5>
            <code className="small bg-light p-2 rounded d-block">
              const Button = styled.button\`background: blue; color: white;\`
            </code>
          </div>
        `);
        break;
      case "react-hook-form":
        examples.push(`
          <div className="mb-3">
            <h5 className="text-sm fw-semibold text-muted mb-2">📋 React Hook Form:</h5>
            <code className="small bg-light p-2 rounded d-block">
              const { register, handleSubmit } = useForm()
            </code>
          </div>
        `);
        break;
      case "date-fns":
        examples.push(`
          <div className="mb-3">
            <h5 className="text-sm fw-semibold text-muted mb-2">📅 Date-fns:</h5>
            <code className="small bg-light p-2 rounded d-block">
              format(new Date(), 'yyyy-MM-dd')
            </code>
          </div>
        `);
        break;
      case "uuid":
        examples.push(`
          <div className="mb-3">
            <h5 className="text-sm fw-semibold text-muted mb-2">🆔 UUID:</h5>
            <code className="small bg-light p-2 rounded d-block">
              const id = uuidv4() // generates unique ID
            </code>
          </div>
        `);
        break;
    }
  }
  
  return examples;
}

function getInstallCommand(packageManager: string, packages: string[], isDev: boolean = false): string {
  const packageList = packages.join(" ");
  const devFlag = isDev ? "-D" : "";
  
  switch (packageManager) {
    case "yarn":
      return isDev ? `yarn add -D ${packageList}` : `yarn add ${packageList}`;
    case "pnpm":
      return isDev ? `pnpm add -D ${packageList}` : `pnpm add ${packageList}`;
    default:
      return isDev ? `npm install -D ${packageList}` : `npm install ${packageList}`;
  }
}
