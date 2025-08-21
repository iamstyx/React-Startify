export interface CSSFrameworkConfig {
  language: "typescript" | "javascript";
  packageManager: "npm" | "yarn" | "pnpm";
  optionalPackages?: OptionalPackage[];
}

export interface OptionalPackageConfig {
  language: "typescript" | "javascript";
  packageManager: "npm" | "yarn" | "pnpm";
  packages: OptionalPackage[];
}

export interface CSSFramework {
  name: string;
  installDependencies(
    projectPath: string,
    packageManager: string
  ): Promise<void>;
  createViteConfig(
    projectPath: string,
    language: "typescript" | "javascript"
  ): Promise<void>;
  getStyles(): string;
  getAppContent(language: "typescript" | "javascript"): string;
}

export type SupportedFramework = "tailwind" | "bootstrap" | "none";

export type OptionalPackage = 
  | "axios" 
  | "react-icons"
  | "react-router"
  | "zustand"
  | "tanstack-query"
  | "framer-motion"
  | "styled-components"
  | "react-hook-form"
  | "date-fns"
  | "uuid";

export interface OptionalPackageDefinition {
  name: string;
  packages: string[];
  typePackages?: string[];
  description: string;
}
