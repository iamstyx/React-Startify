#!/usr/bin/env node

// Test script for react-startify
const { execSync } = require("child_process");
const fs = require("fs-extra");
const path = require("path");
const os = require("os");

// Test results tracking
let testResults = {
  passed: 0,
  failed: 0,
  tests: [],
};

function logTest(name, passed, message = "") {
  const status = passed ? "✅" : "❌";
  const result = `${status} ${name}${message ? ` - ${message}` : ""}`;
  console.log(result);

  testResults.tests.push({ name, passed, message });
  if (passed) {
    testResults.passed++;
  } else {
    testResults.failed++;
  }
}

function logSection(title) {
  console.log(`\n🔍 ${title}...`);
}

async function checkPackageManagerAvailability() {
  const managers = ["npm", "yarn", "pnpm"];
  const available = [];

  for (const manager of managers) {
    try {
      execSync(`${manager} --version`, { stdio: "pipe" });
      available.push(manager);
    } catch (error) {
      console.log(
        `⚠️  ${manager} not available, skipping tests with ${manager}`
      );
    }
  }

  return available;
}

async function testProjectCreation(
  testDir,
  projectName,
  language,
  packageManager
) {
  const args = language === "typescript" ? "--typescript" : "--javascript";
  const pmArg = `--${packageManager}`;

  try {
    execSync(`node dist/index.js ${projectName} ${args} ${pmArg}`, {
      stdio: "pipe", // Changed to pipe to capture output silently
      cwd: __dirname,
    });
    return true;
  } catch (error) {
    console.error(`Failed to create project: ${error.message}`);
    return false;
  }
}

async function testFolderStructure(testDir) {
  logSection("Verifying folder structure");

  const expectedFolders = [
    "src/components",
    "src/pages",
    "src/hooks",
    "src/store",
    "src/utils",
    "src/assets/images",
    "src/assets/styles",
  ];

  for (const folder of expectedFolders) {
    const folderPath = path.join(testDir, folder);
    const exists = await fs.pathExists(folderPath);
    logTest(`Folder ${folder}`, exists, exists ? "exists" : "missing");
  }
}

async function testEmptyFolders(testDir) {
  logSection("Verifying folders are empty");

  const foldersToCheckEmpty = [
    "src/components",
    "src/pages",
    "src/hooks",
    "src/store",
    "src/utils",
    "src/assets/images",
    "src/assets/styles",
  ];

  for (const folder of foldersToCheckEmpty) {
    const folderPath = path.join(testDir, folder);
    if (await fs.pathExists(folderPath)) {
      const contents = await fs.readdir(folderPath);
      const isEmpty = contents.length === 0;
      logTest(
        `Empty ${folder}`,
        isEmpty,
        isEmpty ? "empty" : `contains: ${contents.join(", ")}`
      );
    } else {
      logTest(`Empty ${folder}`, false, "folder not found");
    }
  }
}

async function testFileContents(testDir, language) {
  logSection("Verifying file contents");

  // Test index.css contains React-Startify styles
  const indexCssPath = path.join(testDir, "src/index.css");
  if (await fs.pathExists(indexCssPath)) {
    const indexCssContent = await fs.readFile(indexCssPath, "utf8");
    const hasCustomStyles = indexCssContent.includes(
      "React-Startify Custom Styles"
    );
    const hasWelcomeStyles = indexCssContent.includes(".welcome-container");

    logTest("index.css custom styles", hasCustomStyles);
    logTest("index.css welcome styles", hasWelcomeStyles);
  } else {
    logTest("index.css exists", false, "file not found");
  }

  // Test App component
  const appExt = language === "typescript" ? "tsx" : "jsx";
  const appPath = path.join(testDir, `src/App.${appExt}`);
  if (await fs.pathExists(appPath)) {
    const appContent = await fs.readFile(appPath, "utf8");
    const hasWelcomeContent =
      appContent.includes("Welcome to") &&
      appContent.includes("React-Startify");
    const hasFeatures = appContent.includes("Organized folder structure");

    logTest(`App.${appExt} welcome content`, hasWelcomeContent);
    logTest(`App.${appExt} features section`, hasFeatures);
  } else {
    logTest(`App.${appExt} exists`, false, "file not found");
  }

  // Test main file doesn't import global.css
  const mainExt = language === "typescript" ? "tsx" : "jsx";
  const mainPath = path.join(testDir, `src/main.${mainExt}`);
  if (await fs.pathExists(mainPath)) {
    const mainContent = await fs.readFile(mainPath, "utf8");
    const hasGlobalImport = mainContent.includes("global.css");
    const hasIndexImport = mainContent.includes("./index.css");

    logTest(`main.${mainExt} no global.css import`, !hasGlobalImport);
    logTest(`main.${mainExt} has index.css import`, hasIndexImport);
  } else {
    logTest(`main.${mainExt} exists`, false, "file not found");
  }

  // Test package.json
  const packageJsonPath = path.join(testDir, "package.json");
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));
    const hasReact = packageJson.dependencies && packageJson.dependencies.react;
    const hasVite =
      packageJson.devDependencies && packageJson.devDependencies.vite;
    const hasCorrectScripts = packageJson.scripts && packageJson.scripts.dev;

    logTest("package.json React dependency", !!hasReact);
    logTest("package.json Vite dependency", !!hasVite);
    logTest("package.json dev script", !!hasCorrectScripts);

    if (language === "typescript") {
      const hasTypeScript =
        packageJson.devDependencies && packageJson.devDependencies.typescript;
      logTest("package.json TypeScript dependency", !!hasTypeScript);
    }
  }
}

async function testProjectBuild(testDir, packageManager) {
  logSection("Testing project build");

  try {
    // Test that the project can be built
    const buildCommand =
      packageManager === "yarn"
        ? "yarn build"
        : packageManager === "pnpm"
        ? "pnpm build"
        : "npm run build";

    execSync(buildCommand, {
      stdio: "pipe",
      cwd: testDir,
      timeout: 30000, // 30 second timeout
    });

    // Check if dist folder was created
    const distPath = path.join(testDir, "dist");
    const distExists = await fs.pathExists(distPath);
    logTest("Project builds successfully", distExists, "dist folder created");
  } catch (error) {
    logTest(
      "Project builds successfully",
      false,
      `build failed: ${error.message}`
    );
  }
}

async function runTestSuite(projectName, language, packageManager) {
  const testDir = path.join(__dirname, projectName);

  console.log(
    `\n🧪 Testing ${language.toUpperCase()} project with ${packageManager}...\n`
  );

  try {
    // Clean up previous test
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
    }

    // Test project creation
    logSection("Creating project");
    const created = await testProjectCreation(
      testDir,
      projectName,
      language,
      packageManager
    );
    logTest("Project creation", created);

    if (!created) {
      throw new Error("Project creation failed");
    }

    // Run all tests
    await testFolderStructure(testDir);
    await testEmptyFolders(testDir);
    await testFileContents(testDir, language);
    await testProjectBuild(testDir, packageManager);

    // Clean up
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
      logTest("Cleanup", true, "test project removed");
    }
  } catch (error) {
    logTest("Test suite", false, error.message);

    // Still try to clean up on failure
    if (await fs.pathExists(testDir)) {
      await fs.remove(testDir);
    }
  }
}

async function testCLI() {
  console.log("🚀 React-Startify Comprehensive Test Suite");
  console.log("==========================================\n");

  // Check if we're running in simple mode
  const simpleMode = process.argv.includes("--simple");

  if (simpleMode) {
    console.log("⚡ Running in simple mode (npm + TypeScript only)\n");
  }

  const startTime = Date.now();

  // Check available package managers
  console.log("🔍 Checking available package managers...");
  const availableManagers = await checkPackageManagerAvailability();
  console.log(`✅ Available: ${availableManagers.join(", ")}\n`);

  // Test different combinations (only with available package managers)
  let allTestCases;

  if (simpleMode) {
    // Simple mode: just test npm + TypeScript
    allTestCases = [
      { name: "test-simple", language: "typescript", packageManager: "npm" },
    ];
  } else {
    // Full test suite
    allTestCases = [
      { name: "test-ts-npm", language: "typescript", packageManager: "npm" },
      { name: "test-js-yarn", language: "javascript", packageManager: "yarn" },
      { name: "test-ts-pnpm", language: "typescript", packageManager: "pnpm" },
      { name: "test-js-npm", language: "javascript", packageManager: "npm" },
    ];
  }

  const testCases = allTestCases.filter((testCase) =>
    availableManagers.includes(testCase.packageManager)
  );

  if (testCases.length === 0) {
    console.log("❌ No package managers available for testing!");
    process.exit(1);
  }

  for (const testCase of testCases) {
    await runTestSuite(
      testCase.name,
      testCase.language,
      testCase.packageManager
    );
  }

  // Test results summary
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log("\n" + "=".repeat(50));
  console.log("📊 TEST RESULTS SUMMARY");
  console.log("=".repeat(50));

  if (testResults.failed === 0) {
    console.log(
      `🎉 All tests passed! (${testResults.passed}/${
        testResults.passed + testResults.failed
      })`
    );
  } else {
    console.log(
      `❌ ${testResults.failed} test(s) failed, ${testResults.passed} passed`
    );

    // Show failed tests
    console.log("\n📋 Failed tests:");
    testResults.tests
      .filter((test) => !test.passed)
      .forEach((test) => {
        console.log(`  • ${test.name}: ${test.message}`);
      });
  }

  console.log(`⏱️  Total time: ${duration}s`);
  console.log(`🖥️  Platform: ${os.platform()} ${os.arch()}`);
  console.log(`📦 Node.js: ${process.version}`);

  if (testResults.failed > 0) {
    process.exit(1);
  }
}

testCLI().catch((error) => {
  console.error("💥 Test suite crashed:", error);
  process.exit(1);
});
