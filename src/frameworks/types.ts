export interface CSSFrameworkConfig {
  language: "typescript" | "javascript";
  packageManager: "npm" | "yarn" | "pnpm";
}

export interface CSSFramework {
  name: string;
  installDependencies(projectPath: string, packageManager: string): Promise<void>;
  createViteConfig(projectPath: string, language: "typescript" | "javascript"): Promise<void>;
  getStyles(): string;
  getAppContent(language: "typescript" | "javascript"): string;
}

export type SupportedFramework = "tailwind" | "none";
