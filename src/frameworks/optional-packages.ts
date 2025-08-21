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
