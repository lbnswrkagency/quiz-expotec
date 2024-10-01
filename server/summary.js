// summary.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import ora from "ora";
import { promisify } from "util";
import cliProgress from "cli-progress";

// Promisify required functions for better async handling
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Use __dirname and __filename in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the specific directories and files to include
const includedPaths = [
  "client/src/Components",
  "client/src/App.js",
  "client/src/index.js",
  "server/controllers",
  "server/routes",
  "server/models",
  "server/server.js",
];

// Define directories to exclude
const excludedDirs = ["node_modules", ".git"];

// List of file extensions to include
const includedExtensions = [".js", ".scss"];

const basePath = "C:\\Users\\zafer\\Desktop\\PROJECTS\\quiz-expotec\\"; // Corrected for Windows path
const outputPath = path.join(__dirname, "outputFile.txt"); // Ensure proper path handling

// Clear existing file content
fs.writeFileSync(outputPath, "");

// Initialize a spinner for a better experience
const spinner = ora("Starting to process files...").start();

// Log included paths for better visibility
console.log(chalk.blue("Included Paths:"));
includedPaths.forEach((includedPath) =>
  console.log(chalk.green(`- ${includedPath}`))
);

// Check if the path is in the includedPaths list (allow partial matches for directory traversal)
function isPathIncluded(filePath) {
  const relativeFilePath = path.relative(basePath, filePath);
  return includedPaths.some((includedPath) => {
    const normalizedIncludedPath = path.normalize(includedPath);
    return relativeFilePath.startsWith(normalizedIncludedPath);
  });
}

// Check if directory should be excluded
function isExcludedDir(dirName) {
  return excludedDirs.includes(path.basename(dirName));
}

// Check if the file extension is valid
function hasValidExtension(filePath) {
  return includedExtensions.includes(path.extname(filePath));
}

// Function to append the content of the file to the output file
async function appendFileToOutput(filePath) {
  try {
    const fileContent = await fs.promises.readFile(filePath, "utf-8");
    const header = `\n\n--- ${filePath} ---\n\n`;
    await fs.promises.appendFile(outputPath, header + fileContent);
    console.log(chalk.green(`Appended file: ${filePath}`));
  } catch (err) {
    console.log(
      chalk.red(`Error reading or writing file: ${filePath}\n${err}`)
    );
  }
}

// Function to collect all files to process
async function collectFiles(dir, allFiles = []) {
  if (isExcludedDir(dir)) {
    console.log(chalk.yellow(`Skipping excluded directory: ${dir}`));
    return allFiles;
  }

  let files;
  try {
    files = await readdir(dir);
  } catch (err) {
    console.log(chalk.red(`Error reading directory: ${dir}\n${err}`));
    return allFiles;
  }

  for (const file of files) {
    const filePath = path.join(dir, file);
    let fileStat;

    try {
      fileStat = await stat(filePath);
    } catch (err) {
      console.log(
        chalk.red(`Error getting stats for file: ${filePath}\n${err}`)
      );
      continue;
    }

    if (fileStat.isDirectory()) {
      await collectFiles(filePath, allFiles);
    } else if (isPathIncluded(filePath) && hasValidExtension(filePath)) {
      allFiles.push(filePath);
    }
  }

  return allFiles;
}

(async () => {
  try {
    const allFiles = await collectFiles(basePath);

    // Initialize progress bar
    const progressBar = new cliProgress.SingleBar(
      {
        format:
          "Progress |" +
          chalk.cyan("{bar}") +
          "| {percentage}% || {value}/{total} Files || Speed: {speed} files/s",
      },
      cliProgress.Presets.shades_classic
    );

    progressBar.start(allFiles.length, 0, { speed: "N/A" });

    const startTime = Date.now();

    for (let i = 0; i < allFiles.length; i++) {
      const file = allFiles[i];
      spinner.text = `Processing file: ${chalk.yellow(file)}`;
      await appendFileToOutput(file);
      const elapsedTime = (Date.now() - startTime) / 1000;
      const speed = ((i + 1) / elapsedTime).toFixed(2);
      progressBar.update(i + 1, { speed });
    }

    progressBar.stop();
    spinner.succeed("File processing completed!");
    console.log(
      chalk.green("Relevant files have been summarized into outputFile.txt")
    );
  } catch (error) {
    spinner.fail("An error occurred during file processing.");
    console.error(chalk.red(`Error: ${error.message}`));
  }
})();
