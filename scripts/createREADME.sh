#!/bin/bash

# This script creates a hierarchical list of folders and Markdown files in README.md

# Get the root directory of the repository
REPO_ROOT=$(git rev-parse --show-toplevel)

# Function to get the relative path of a file or folder from the repository root
relative_path() {
  python3 -c "from pathlib import Path; print(str(Path('$1').relative_to('$REPO_ROOT')))"
}

# Function to build the hierarchy
build_hierarchy() {
  local indent=$1
  local folder=$2

  # Find Markdown files in the current folder and store in a temporary file
  temp_file=$(mktemp)
  find "$folder" -type f -name "*.md" -print0 > "$temp_file"

  # Read from the temporary file and store Markdown files in an array
  md_files=()
  while IFS= read -r -d '' file; do
    md_files+=("$file")
  done < "$temp_file"
  echo "$md_files"

  # Remove the temporary file
  rm "$temp_file"

  # Sort the Markdown files alphabetically
  IFS=$'\n' sorted_md_files=($(sort <<<"${md_files[*]}"))
  unset IFS

  # Add the current folder and its Markdown files to the hierarchy
  HIERARCHY+=("$indent- **$folder**")
  for md_file in "${sorted_md_files[@]}"; do
    HIERARCHY+=("$indent  - $(relative_path "$md_file")")
  done

  # Recursively process subfolders
local subfolders=()
find "$folder" -mindepth 1 -maxdepth 1 -type d -print0 | while IFS= read -r -d '' subfolder; do
  subfolders+=("$subfolder")
done


  # Sort subfolders alphabetically
  IFS=$'\n' sorted_subfolders=($(sort <<<"${subfolders[*]}"))
  unset IFS

  for subfolder in "${sorted_subfolders[@]}"; do
    build_hierarchy "$indent  " "$(relative_path "$subfolder")"
  done
}

# Build the hierarchy starting from the repository root
build_hierarchy "" "$REPO_ROOT"

# Create or overwrite the README.md file with the folder and file hierarchy
echo "# Folder and File Hierarchy" > "$REPO_ROOT/README.md"
for entry in "${HIERARCHY[@]}"; do
  echo "$entry" >> "$REPO_ROOT/README.md"
done

# Stage the changes to README.md
git add "$REPO_ROOT/README.md"

# Exit with success
exit 0
