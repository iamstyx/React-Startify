#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import ora from "ora";

interface ProjectOptions {
  projectName: string;
  language: "typescript" | "javascript";
  packageManager: "npm" | "yarn" | "pnpm";
}

const packageJson = require("../package.json");

// ASCII Art Banner
const banner = `
  ██████╗ ███████╗ █████╗  ██████╗████████╗    ███████╗████████╗ █████╗ ██████╗ ████████╗██╗███████╗██╗   ██╗
  ██╔══██╗██╔════╝██╔══██╗██╔════╝╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝╚██╗ ██╔╝
  ██████╔╝█████╗  ███████║██║        ██║       ███████╗   ██║   ███████║██████╔╝   ██║   ██║█████╗   ╚████╔╝ 
  ██╔══██╗██╔══╝  ██╔══██║██║        ██║       ╚════██║   ██║   ██╔══██║██╔══██╗   ██║   ██║██╔══╝    ╚██╔╝  
  ██║  ██║███████╗██║  ██║╚██████╗   ██║       ███████║   ██║   ██║  ██║██║  ██║   ██║   ██║██║        ██║   
  ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝   ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝        ╚═╝   
  
  🚀 Quickly scaffold React projects with Vite & automatic folder structure
`;

program
  .name("react-startify")
  .description(
    "CLI tool to create React projects with Vite and organized folder structure"
  )
  .version(packageJson.version);

program
  .argument("[project-name]", "Name of the project")
  .option("-t, --typescript", "Use TypeScript")
  .option("-j, --javascript", "Use JavaScript")
  .option("--npm", "Use npm as package manager")
  .option("--yarn", "Use yarn as package manager")
  .option("--pnpm", "Use pnpm as package manager")
  .action(async (projectName, options) => {
    console.log(chalk.cyan(banner));

    let projectOptions: ProjectOptions;

    if (
      projectName &&
      options.typescript !== undefined &&
      (options.npm || options.yarn || options.pnpm)
    ) {
      // Use command line arguments
      projectOptions = {
        projectName,
        language: options.typescript ? "typescript" : "javascript",
        packageManager: options.npm ? "npm" : options.yarn ? "yarn" : "pnpm",
      };
    } else {
      // Interactive mode
      const answers = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "What is your project name?",
          default: projectName || "my-react-app",
          validate: (input: string) => {
            if (input.trim().length === 0) {
              return "Project name cannot be empty";
            }
            if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
              return "Project name can only contain letters, numbers, hyphens, and underscores";
            }
            return true;
          },
        },
        {
          type: "list",
          name: "language",
          message: "Which language do you want to use?",
          choices: [
            { name: "🔷 TypeScript (Recommended)", value: "typescript" },
            { name: "🟨 JavaScript", value: "javascript" },
          ],
          default: "typescript",
        },
        {
          type: "list",
          name: "packageManager",
          message: "Which package manager do you want to use?",
          choices: [
            { name: "📦 npm", value: "npm" },
            { name: "🧶 yarn", value: "yarn" },
            { name: "⚡ pnpm", value: "pnpm" },
          ],
          default: "npm",
        },
      ]);

      projectOptions = answers as ProjectOptions;
    }

    await createProject(projectOptions);
  });

async function createProject(options: ProjectOptions) {
  const { projectName, language, packageManager } = options;
  const projectPath = path.resolve(process.cwd(), projectName);

  // Check if directory already exists
  if (await fs.pathExists(projectPath)) {
    console.log(chalk.red(`❌ Directory "${projectName}" already exists!`));
    process.exit(1);
  }

  const spinner = ora("Creating your React project...").start();

  try {
    // Create Vite project
    const template = language === "typescript" ? "react-ts" : "react";
    execSync(
      `npm create vite@latest ${projectName} -- --template ${template}`,
      {
        stdio: "pipe",
        cwd: process.cwd(),
      }
    );

    spinner.text = "Setting up project structure...";

    // Create additional folder structure
    await createFolderStructure(projectPath);

    spinner.text = "Creating boilerplate files...";

    // Replace default files with custom boilerplate
    await createBoilerplateFiles(projectPath, language);

    spinner.text = "Installing dependencies...";

    // Install dependencies
    const installCommand = getInstallCommand(packageManager);
    execSync(installCommand, {
      stdio: "pipe",
      cwd: projectPath,
    });

    spinner.succeed(chalk.green("✨ Project created successfully!"));

    // Success message
    console.log("\n" + chalk.green("🎉 Your React project is ready!"));
    console.log("\n" + chalk.cyan("📁 Project structure created:"));
    console.log(chalk.gray("  📂 src/"));
    console.log(chalk.gray("    📂 components/"));
    console.log(chalk.gray("    📂 pages/"));
    console.log(chalk.gray("    📂 hooks/"));
    console.log(chalk.gray("    📂 store/"));
    console.log(chalk.gray("    📂 utils/"));
    console.log(chalk.gray("    📂 assets/"));
    console.log(chalk.gray("      📂 images/"));
    console.log(chalk.gray("      📂 styles/"));

    console.log("\n" + chalk.yellow("🚀 Next steps:"));
    console.log(chalk.white(`  cd ${projectName}`));
    console.log(chalk.white(`  ${getRunCommand(packageManager)} dev`));

    console.log("\n" + chalk.magenta("✨ Happy coding with React-Startify!"));
  } catch (error) {
    spinner.fail(chalk.red("❌ Failed to create project"));
    console.error(chalk.red(error));
    process.exit(1);
  }
}

async function createFolderStructure(projectPath: string) {
  const folders = [
    "src/components",
    "src/pages",
    "src/hooks",
    "src/store",
    "src/utils",
    "src/assets/images",
    "src/assets/styles",
  ];

  for (const folder of folders) {
    await fs.ensureDir(path.join(projectPath, folder));
  }
}

async function createBoilerplateFiles(
  projectPath: string,
  language: "typescript" | "javascript"
) {
  // Create a clean App component
  const appExtension = language === "typescript" ? "tsx" : "jsx";
  const appContent = getAppContent(language);

  await fs.writeFile(
    path.join(projectPath, `src/App.${appExtension}`),
    appContent
  );

  // Update the existing index.css with custom styles
  const customStyles = getCustomStyles();
  const indexCssPath = path.join(projectPath, "src/index.css");

  // Read existing index.css and modify it
  let existingCss = "";
  if (await fs.pathExists(indexCssPath)) {
    existingCss = await fs.readFile(indexCssPath, "utf8");

    // Fix the default Vite body styles that interfere with our layout
    existingCss = existingCss.replace(
      /body\s*{[^}]*}/g,
      `body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
}`
    );
  }

  // Combine existing CSS with our custom styles
  const combinedCss = existingCss + "\n\n" + customStyles;
  await fs.writeFile(indexCssPath, combinedCss);

  // Update main to not import global.css since we're using index.css
  const mainExtension = language === "typescript" ? "tsx" : "jsx";
  const mainContent = getMainContent(language);
  await fs.writeFile(
    path.join(projectPath, `src/main.${mainExtension}`),
    mainContent
  );

  // Remove default Vite CSS
  const viteCssPath = path.join(projectPath, "src/App.css");
  if (await fs.pathExists(viteCssPath)) {
    await fs.remove(viteCssPath);
  }
}

function getInstallCommand(packageManager: string): string {
  switch (packageManager) {
    case "yarn":
      return "yarn install";
    case "pnpm":
      return "pnpm install";
    default:
      return "npm install";
  }
}

function getRunCommand(packageManager: string): string {
  switch (packageManager) {
    case "yarn":
      return "yarn";
    case "pnpm":
      return "pnpm";
    default:
      return "npm run";
  }
}

function getAppContent(language: "typescript" | "javascript"): string {
  if (language === "typescript") {
    return `import React from 'react';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="welcome-container">
        <div className="welcome-card">
          <h1 className="welcome-title">
            🚀 Welcome to <span className="brand">React-Startify</span>
          </h1>
          <p className="welcome-subtitle">
            Your React project is ready to go with a clean, organized structure!
          </p>
          
          <div className="features">
            <div className="feature">
              <span className="feature-icon">📁</span>
              <span>Organized folder structure</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span>Powered by Vite</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔷</span>
              <span>TypeScript ready</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✨</span>
              <span>Clean boilerplate</span>
            </div>
          </div>

          <div className="next-steps">
            <h3>🎯 Next Steps:</h3>
            <ul>
              <li>Start building in the <code>src/components</code> folder</li>
              <li>Add your pages to <code>src/pages</code></li>
              <li>Create custom hooks in <code>src/hooks</code></li>
              <li>Manage state in <code>src/store</code></li>
              <li>Add utilities to <code>src/utils</code></li>
            </ul>
          </div>

          <p className="footer">
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
    <div className="app">
      <div className="welcome-container">
        <div className="welcome-card">
          <h1 className="welcome-title">
            🚀 Welcome to <span className="brand">React-Startify</span>
          </h1>
          <p className="welcome-subtitle">
            Your React project is ready to go with a clean, organized structure!
          </p>
          
          <div className="features">
            <div className="feature">
              <span className="feature-icon">📁</span>
              <span>Organized folder structure</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span>Powered by Vite</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🟨</span>
              <span>JavaScript ready</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✨</span>
              <span>Clean boilerplate</span>
            </div>
          </div>

          <div className="next-steps">
            <h3>🎯 Next Steps:</h3>
            <ul>
              <li>Start building in the <code>src/components</code> folder</li>
              <li>Add your pages to <code>src/pages</code></li>
              <li>Create custom hooks in <code>src/hooks</code></li>
              <li>Manage state in <code>src/store</code></li>
              <li>Add utilities to <code>src/utils</code></li>
            </ul>
          </div>

          <p className="footer">
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

function getMainContent(language: "typescript" | "javascript"): string {
  if (language === "typescript") {
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`;
  } else {
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`;
  }
}

function getCustomStyles(): string {
  return `/* React-Startify Custom Styles */

* {
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 100%;
}

.welcome-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
}

.welcome-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.welcome-title {
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: #2d3748;
  font-weight: bold;
}

.brand {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 32px;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #4a5568;
}

.feature-icon {
  font-size: 1.2rem;
}

.next-steps {
  text-align: left;
  background: #f7fafc;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.next-steps h3 {
  margin: 0 0 16px 0;
  color: #2d3748;
}

.next-steps ul {
  margin: 0;
  padding-left: 20px;
}

.next-steps li {
  margin-bottom: 8px;
  color: #4a5568;
  line-height: 1.5;
}

.next-steps code {
  background: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #2d3748;
}

.footer {
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 600;
  margin: 0;
}

@media (max-width: 768px) {
  .welcome-container {
    padding: 10px;
  }
  
  .welcome-card {
    padding: 24px;
    border-radius: 16px;
  }

  .welcome-title {
    font-size: 2rem;
  }

  .features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .welcome-container {
    padding: 8px;
  }
  
  .welcome-card {
    padding: 20px;
    border-radius: 12px;
  }

  .welcome-title {
    font-size: 1.8rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
}
`;
}

program.parse();
