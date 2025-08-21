import { SupportedFramework, CSSFrameworkConfig } from './types';
import { 
  installTailwindDependencies,
  createTailwindViteConfig,
  getTailwindStyles,
  getTailwindAppContent,
} from './tailwind';
import { getCustomStyles, getDefaultAppContent } from '../templates';

export class FrameworkManager {
  static async setupFramework(
    framework: SupportedFramework,
    projectPath: string,
    config: CSSFrameworkConfig
  ): Promise<void> {
    switch (framework) {
      case 'tailwind':
        await installTailwindDependencies(projectPath, config.packageManager);
        await createTailwindViteConfig(projectPath, config.language);
        break;
      case 'none':
      default:
        // No additional setup needed for default styling
        break;
    }
  }

  static getStyles(framework: SupportedFramework): string {
    switch (framework) {
      case 'tailwind':
        return getTailwindStyles();
      case 'none':
      default:
        return getCustomStyles();
    }
  }

  static getAppContent(
    framework: SupportedFramework,
    language: "typescript" | "javascript"
  ): string {
    switch (framework) {
      case 'tailwind':
        return getTailwindAppContent(language);
      case 'none':
      default:
        return getDefaultAppContent(language);
    }
  }
}
