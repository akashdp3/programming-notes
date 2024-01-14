#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Function to get the relative path of a file or folder
function relativePath(fileOrFolder, repoRoot) {
  return path.relative(repoRoot, fileOrFolder);
}

// Function to change Markdown file name to title
function convertMarkdownFileNameToTitle(fileName) {
  const withoutExtension = path.basename(fileName, path.extname(fileName));
  // Replace hyphens with spaces and capitalize each word
  return withoutExtension
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Function to create link to markdown file
function createMarkdownLink(mdFile, folder) {
  return `[${convertMarkdownFileNameToTitle(mdFile)}](${folder}/${mdFile})`;
}

// Function to build the hierarchy
function buildHierarchy(
  indent,
  folder,
  repoRoot,
  result,
  ignoredFiles,
  ignoredFolders
) {
  if (ignoredFolders.includes(path.basename(folder))) {
    return;
  }

  const files = fs.readdirSync(folder);
  const markdownFiles = files
    .filter((file) => file.endsWith(".md") && !ignoredFiles.includes(file))
    .sort();
  const folderDepth = relativePath(folder, repoRoot).split(path.sep).length;

  //   if (markdownFiles.length > 0) {
  const headingLevel = "#".repeat(folderDepth + 1);

  const mdRelativePath = relativePath(folder, repoRoot);
  if (mdRelativePath) {
    result.push(
      `\n${headingLevel} ${convertMarkdownFileNameToTitle(
        path.basename(folder)
      )}`
    );
  }
  markdownFiles.forEach((mdFile) => {
    result.push(`- ${createMarkdownLink(mdFile, mdRelativePath)}`);
  });
  //   }

  const subfolders = files
    .filter(
      (file) =>
        fs.statSync(path.join(folder, file)).isDirectory() &&
        !ignoredFiles.includes(file)
    )
    .sort();

  subfolders.forEach((subfolder) => {
    buildHierarchy(
      ``,
      path.join(folder, subfolder),
      repoRoot,
      result,
      ignoredFiles,
      ignoredFolders
    );
  });
}

// Get the root directory of the repository
const repoRoot = path.resolve(__dirname, ".."); // Adjust this path accordingly

// Initialize an empty array to store folder and file hierarchy
const hierarchy = [];

// List of files to be ignored
const ignoredFiles = ["README.md", "back-burner.md"]; // Add the files you want to ignore
const ignoredFolders = [".git", "scripts", "node_modules", ".husky"];

// Build the hierarchy starting from the repository root
buildHierarchy("", repoRoot, repoRoot, hierarchy, ignoredFiles, ignoredFolders);

// Create or overwrite the README.md file with the folder and file hierarchy
const readmeContent = `# Notes \n\n${hierarchy.join("\n")}`;
fs.writeFileSync(path.join(repoRoot, "README.md"), readmeContent);

console.log("README.md updated successfully!");
