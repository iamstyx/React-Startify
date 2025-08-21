import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";

export interface BootstrapConfig {
  language: "typescript" | "javascript";
  packageManager: "npm" | "yarn" | "pnpm";
}

export async function installBootstrapDependencies(
  projectPath: string,
  packageManager: string
): Promise<void> {
  const installCmd = getBootstrapInstallCommand(packageManager);
  execSync(installCmd, {
    stdio: "pipe",
    cwd: projectPath,
  });
}

export async function createBootstrapViteConfig(
  projectPath: string,
  language: "typescript" | "javascript"
): Promise<void> {
  const configExtension = language === "typescript" ? "ts" : "js";
  const configContent = getBootstrapViteConfig(language);

  await fs.writeFile(
    path.join(projectPath, `vite.config.${configExtension}`),
    configContent
  );
}

export function getBootstrapStyles(): string {
  return `@import "bootstrap/dist/css/bootstrap.min.css";

/* Custom base styles */
* {
  box-sizing: border-box;
}

.gradient-bg {
  background: linear-gradient(135deg, #007bff 0%, #6f42c1 100%);
}

.card-shadow {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
}

.text-gradient {
  background: linear-gradient(135deg, #007bff, #6f42c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
`;
}

export function getBootstrapAppContent(
  language: "typescript" | "javascript"
): string {
  if (language === "typescript") {
    return `import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App: React.FC = () => {
  return (
    <div className="gradient-bg min-vh-100">
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-4">
        <div className="bg-white rounded-4 p-5 w-100" style={{ maxWidth: '1200px' }}>
          <div className="card-shadow rounded-4 p-4">
            <div className="text-center">
              <h1 className="display-4 fw-bold mb-4 text-dark">
                🚀 Welcome to <span className="text-gradient">React-Startify</span>
              </h1>
              <p className="lead text-muted mb-5">
                Your React project is ready to go with a clean, organized structure and Bootstrap!
              </p>
              
              <div className="row g-3 mb-5">
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex align-items-center text-muted">
                    <span className="fs-4 me-2">📁</span>
                    <span>Organized folder structure</span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex align-items-center text-muted">
                    <span className="fs-4 me-2">⚡</span>
                    <span>Powered by Vite</span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex align-items-center text-muted">
                    <span className="fs-4 me-2">🔷</span>
                    <span>TypeScript ready</span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex align-items-center text-muted">
                    <span className="fs-4 me-2">🎨</span>
                    <span>Bootstrap CSS</span>
                  </div>
                </div>
              </div>

              <div className="text-start bg-light p-4 rounded-3 mb-4">
                <h3 className="h5 fw-semibold mb-3 text-dark d-flex align-items-center">
                  🎯 Next Steps:
                </h3>
                <ul className="list-unstyled mb-0 text-muted">
                  <li className="mb-2">• Start building in the <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">src/components</code> folder</li>
                  <li className="mb-2">• Add your pages to <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">src/pages</code></li>
                  <li className="mb-2">• Create custom hooks in <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">src/hooks</code></li>
                  <li className="mb-2">• Manage state in <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">src/store</code></li>
                  <li className="mb-2">• Add utilities to <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">src/utils</code></li>
                  <li className="mb-0">• Style with <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">Bootstrap</code> classes</li>
                </ul>
              </div>

              <p className="h5 text-primary fw-semibold">
                Happy coding! 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
`;
  } else {
    return `import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <div className="gradient-bg min-vh-100">
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-4">
        <div className="bg-white rounded-4 p-5 w-100" style={{ maxWidth: '1200px' }}>
          <div className="card-shadow rounded-4 p-4">
            <div className="text-center">
              <h1 className="display-4 fw-bold mb-4 text-dark">
                🚀 Welcome to <span className="text-gradient">React-Startify</span>
              </h1>
              <p className="lead text-muted mb-5">
                Your React project is ready to go with a clean, organized structure and Bootstrap!
              </p>
              
              <div className="row g-3 mb-5">
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex align-items-center text-muted">
                    <span className="fs-4 me-2">📁</span>
                    <span>Organized folder structure</span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex align-items-center text-muted">
                    <span className="fs-4 me-2">⚡</span>
                    <span>Powered by Vite</span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex align-items-center text-muted">
                    <span className="fs-4 me-2">🟨</span>
                    <span>JavaScript ready</span>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex align-items-center text-muted">
                    <span className="fs-4 me-2">🎨</span>
                    <span>Bootstrap CSS</span>
                  </div>
                </div>
              </div>

              <div className="text-start bg-light p-4 rounded-3 mb-4">
                <h3 className="h5 fw-semibold mb-3 text-dark d-flex align-items-center">
                  🎯 Next Steps:
                </h3>
                <ul className="list-unstyled mb-0 text-muted">
                  <li className="mb-2">• Start building in the <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">src/components</code> folder</li>
                  <li className="mb-2">• Add your pages to <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">src/pages</code></li>
                  <li className="mb-2">• Create custom hooks in <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">src/hooks</code></li>
                  <li className="mb-2">• Manage state in <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">src/store</code></li>
                  <li className="mb-2">• Add utilities to <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">src/utils</code></li>
                  <li className="mb-0">• Style with <code className="bg-secondary bg-opacity-25 px-2 py-1 rounded small">Bootstrap</code> classes</li>
                </ul>
              </div>

              <p className="h5 text-primary fw-semibold">
                Happy coding! 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
`;
  }
}

function getBootstrapInstallCommand(packageManager: string): string {
  const packages = "bootstrap";
  switch (packageManager) {
    case "yarn":
      return `yarn add ${packages}`;
    case "pnpm":
      return `pnpm add ${packages}`;
    default:
      return `npm install ${packages}`;
  }
}

function getBootstrapViteConfig(language: "typescript" | "javascript"): string {
  if (language === "typescript") {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
`;
  } else {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
`;
  }
}
