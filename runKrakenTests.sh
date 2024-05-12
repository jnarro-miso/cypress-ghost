#!/bin/bash

# Navigate to the root directory of your project
cd "$(dirname "$0")"

# Directory containing the scenario files
SCENARIOS_DIR="./scenariosKraken"

# Target directory where the files will be copied for testing
TARGET_DIR="./features"

# Iterate over each file in the scenariosKraken directory
for file in "$SCENARIOS_DIR"/*; do
  echo "Processing $file..."
  
  # Copy the file to the features directory
  cp "$file" "$TARGET_DIR/"
  
  # Execute the npm run test:kraken script
  npm run test:kraken
  
  # Move the file back to its original location
  mv "$TARGET_DIR/$(basename "$file")" "$SCENARIOS_DIR/"
  
  echo "Finished processing $file"
done

echo "All files processed."