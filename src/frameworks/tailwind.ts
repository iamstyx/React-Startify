import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";

export interface TailwindConfig {
  language: "typescript" | "javascript";
  packageManager: "npm" | "yarn" | "pnpm";
}

export async function installTailwindDependencies(
  projectPath: string,
  packageManager: string
): Promise<void> {
  const installCmd = getTailwindInstallCommand(packageManager);
  execSync(installCmd, {
    stdio: "pipe",
    cwd: projectPath,
  });
}

export async function createTailwindViteConfig(
  projectPath: string,
  language: "typescript" | "javascript"
): Promise<void> {
  const configExtension = language === "typescript" ? "ts" : "js";
  const configContent = getTailwindViteConfig(language);
  
  await fs.writeFile(
    path.join(projectPath, `vite.config.${configExtension}`),
    configContent
  );
}

export function getTailwindStyles(): string {
  return `@import "tailwindcss";

/* Custom base styles */
* {
  box-sizing: border-box;
}
`;
}

export function getTailwindAppContent(language: "typescript" | "javascript"): string {
  if (language === "typescript") {
    return `import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 w-full">
      <div className="min-h-screen flex items-center justify-center p-5 w-full">
        <div className="bg-white rounded-3xl p-10 w-full max-w-6xl shadow-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            🚀 Welcome to <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">React-Startify</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your React project is ready to go with a clean, organized structure and Tailwind CSS!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-xl">📁</span>
              <span>Organized folder structure</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-xl">⚡</span>
              <span>Powered by Vite</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-xl">🔷</span>
              <span>TypeScript ready</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-xl">🎨</span>
              <span>Tailwind CSS</span>
            </div>
          </div>

          <div className="text-left bg-gray-50 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              🎯 Next Steps:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Start building in the <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">src/components</code> folder</li>
              <li>• Add your pages to <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">src/pages</code></li>
              <li>• Create custom hooks in <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">src/hooks</code></li>
              <li>• Manage state in <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">src/store</code></li>
              <li>• Add utilities to <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">src/utils</code></li>
              <li>• Style with <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">Tailwind CSS</code> classes</li>
            </ul>
          </div>

          <p className="text-lg text-blue-600 font-semibold">
            Happy coding! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
`;
  } else {
    return `import React from 'react';

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 w-full">
      <div className="min-h-screen flex items-center justify-center p-5 w-full">
        <div className="bg-white rounded-3xl p-10 w-full max-w-6xl shadow-2xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            🚀 Welcome to <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">React-Startify</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your React project is ready to go with a clean, organized structure and Tailwind CSS!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-xl">📁</span>
              <span>Organized folder structure</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-xl">⚡</span>
              <span>Powered by Vite</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-xl">🟨</span>
              <span>JavaScript ready</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-xl">🎨</span>
              <span>Tailwind CSS</span>
            </div>
          </div>

          <div className="text-left bg-gray-50 p-6 rounded-xl mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              🎯 Next Steps:
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Start building in the <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">src/components</code> folder</li>
              <li>• Add your pages to <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">src/pages</code></li>
              <li>• Create custom hooks in <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">src/hooks</code></li>
              <li>• Manage state in <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">src/store</code></li>
              <li>• Add utilities to <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">src/utils</code></li>
              <li>• Style with <code className="bg-gray-200 px-2 py-1 rounded text-sm font-mono">Tailwind CSS</code> classes</li>
            </ul>
          </div>

          <p className="text-lg text-blue-600 font-semibold">
            Happy coding! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
`;
  }
}

function getTailwindInstallCommand(packageManager: string): string {
  const packages = "tailwindcss @tailwindcss/vite autoprefixer";
  switch (packageManager) {
    case "yarn":
      return `yarn add -D ${packages}`;
    case "pnpm":
      return `pnpm add -D ${packages}`;
    default:
      return `npm install -D ${packages}`;
  }
}

function getTailwindViteConfig(language: "typescript" | "javascript"): string {
  if (language === "typescript") {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
`;
  } else {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
`;
  }
}
