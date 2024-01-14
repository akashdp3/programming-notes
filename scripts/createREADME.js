const fs = require("fs");
const path = require("path");

// Function to get the relative path of a file or folder
function relativePath(fileOrFolder, repoRoot) {
  return path.relative(repoRoot, fileOrFolder);
}

// Function to create link to markdown file
function createMarkdownLink(mdFile, folder) {
  return `[${mdFile}](${folder})`;
}

// Function to build the hierarchy
function buildHierarchy(indent, folder, repoRoot, result, ignoredFiles) {
  const files = fs.readdirSync(folder);
  const markdownFiles = files
    .filter((file) => file.endsWith(".md") && !ignoredFiles.includes(file))
    .sort();

  if (markdownFiles.length > 0) {
    const mdRelativePath = relativePath(folder, repoRoot);
    result.push(`\n## ${mdRelativePath}`);
    markdownFiles.forEach((mdFile) => {
      result.push(`${indent}  - ${createMarkdownLink(mdFile, mdRelativePath)}`);
    });
  }
  //   console.log({ result });

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
      ignoredFiles
    );
  });
}

// Get the root directory of the repository
const repoRoot = path.resolve(__dirname, ".."); // Adjust this path accordingly

// Initialize an empty array to store folder and file hierarchy
const hierarchy = [];

// List of files to be ignored
const ignoredFiles = ["README.md", "back-burner.md"]; // Add the files you want to ignore

// Build the hierarchy starting from the repository root
buildHierarchy("", repoRoot, repoRoot, hierarchy, ignoredFiles);

// Create or overwrite the README.md file with the folder and file hierarchy
const readmeContent = `# Notes \n\n${hierarchy.join("\n")}`;
fs.writeFileSync(path.join(repoRoot, "README.md"), readmeContent);

console.log("README.md updated successfully!");
