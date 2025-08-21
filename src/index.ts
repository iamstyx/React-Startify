#!/usr/bin/env node

import { program } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { execSync } from "child_process";
import ora from "ora";
import { FrameworkManager, SupportedFramework } from "./frameworks";
import { getMainContent } from "./templates";

interface ProjectOptions {
  projectName: string;
  language: "typescript" | "javascript";
  packageManager: "npm" | "yarn" | "pnpm";
  framework: SupportedFramework;
}

const packageJson = require("../package.json");

// Clean header with gradient styling
function displayHeader() {
  console.log(chalk.cyan.bold("\n🚀 React-Startify"));
  console.log(
    chalk.gray(
      "   Quickly scaffold React projects with Vite & automatic folder structure"
    )
  );
  console.log(chalk.gray(`   v${packageJson.version}\n`));
}

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
  .option("--tailwind", "Include Tailwind CSS")
  .option("--bootstrap", "Include Bootstrap")
  .option("--no-framework", "Skip CSS framework")
  .action(async (projectName, options) => {
    displayHeader();

    let projectOptions: ProjectOptions;

    if (
      projectName &&
      (options.typescript !== undefined || options.javascript !== undefined) &&
      (options.npm || options.yarn || options.pnpm)
    ) {
      // Determine framework from options
      let framework: SupportedFramework = "none";
      if (options.tailwind) framework = "tailwind";
      else if (options.bootstrap) framework = "bootstrap";
      else if (options.noFramework) framework = "none";

      // Use command line arguments
      projectOptions = {
        projectName,
        language: options.typescript ? "typescript" : "javascript",
        packageManager: options.npm ? "npm" : options.yarn ? "yarn" : "pnpm",
        framework,
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
        {
          type: "list",
          name: "framework",
          message: "Which CSS framework do you want to use?",
          choices: [
            { name: "🎨 Tailwind CSS", value: "tailwind" },
            { name: "🅱️ Bootstrap", value: "bootstrap" },
            { name: "🚫 None (Custom CSS)", value: "none" },
          ],
          default: "none",
        },
      ]);

      projectOptions = answers as ProjectOptions;
    }

    await createProject(projectOptions);
  });

async function createProject(options: ProjectOptions) {
  const { projectName, language, packageManager, framework } = options;
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
    await createBoilerplateFiles(projectPath, language, framework);

    // Create Vite config and install framework if needed
    if (framework !== "none") {
      await FrameworkManager.setupFramework(framework, projectPath, {
        language,
        packageManager,
      });
    }

    spinner.text = "Installing dependencies...";

    // Install dependencies
    const installCommand = getInstallCommand(packageManager);
    execSync(installCommand, {
      stdio: "pipe",
      cwd: projectPath,
    });

    spinner.succeed(chalk.green("✨ Project created successfully!"));

    // Success message with better formatting
    console.log("\n" + chalk.green.bold("🎉 Your React project is ready!"));
    console.log("\n" + chalk.cyan.bold("📁 Project Structure:"));
    console.log(chalk.gray("   📂 src/"));
    console.log(
      chalk.gray("     📂 components/    ") + chalk.dim("(reusable components)")
    );
    console.log(
      chalk.gray("     📂 pages/         ") + chalk.dim("(page components)")
    );
    console.log(
      chalk.gray("     📂 hooks/         ") + chalk.dim("(custom hooks)")
    );
    console.log(
      chalk.gray("     📂 store/         ") + chalk.dim("(state management)")
    );
    console.log(
      chalk.gray("     📂 utils/         ") + chalk.dim("(utility functions)")
    );
    console.log(
      chalk.gray("     📂 assets/        ") + chalk.dim("(images & styles)")
    );

    if (framework !== "none") {
      console.log("\n" + chalk.blue.bold("🎨 Styling:"));
      if (framework === "tailwind") {
        console.log(
          chalk.gray("   ✨ Tailwind CSS configured and ready to use")
        );
        console.log(
          chalk.gray("   📄 Vite config updated with Tailwind plugin")
        );
      } else if (framework === "bootstrap") {
        console.log(chalk.gray("   ✨ Bootstrap configured and ready to use"));
        console.log(chalk.gray("   📄 Bootstrap CSS and JS imported"));
      }
    }

    console.log("\n" + chalk.yellow.bold("🚀 Next Steps:"));
    console.log(chalk.white(`   cd ${chalk.cyan(projectName)}`));
    console.log(
      chalk.white(`   ${chalk.cyan(getRunCommand(packageManager))} dev`)
    );

    console.log(
      "\n" +
        chalk.magenta("✨ Happy coding with React-Startify! ") +
        chalk.red("❤️")
    );
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
  language: "typescript" | "javascript",
  framework: SupportedFramework
) {
  // Create a clean App component
  const appExtension = language === "typescript" ? "tsx" : "jsx";
  const appContent = getAppContent(language, framework);

  await fs.writeFile(
    path.join(projectPath, `src/App.${appExtension}`),
    appContent
  );

  // Update the existing index.css with custom styles
  const customStyles = FrameworkManager.getStyles(framework);
  const indexCssPath = path.join(projectPath, "src/index.css");

  if (framework === "tailwind" || framework === "bootstrap") {
    // For CSS frameworks, replace the entire index.css content
    await fs.writeFile(indexCssPath, customStyles);
  } else {
    // Read existing index.css and modify it (original behavior)
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
  }

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

function getAppContent(
  language: "typescript" | "javascript",
  framework: SupportedFramework
): string {
  return FrameworkManager.getAppContent(framework, language);
}

program.parse();
