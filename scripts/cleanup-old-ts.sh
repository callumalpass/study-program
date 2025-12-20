#!/bin/bash
# Cleanup script: Remove old TypeScript data files after JSON migration
# These files are now redundant since data is stored in JSON

set -e

SUBJECTS_DIR="src/data/subjects"

echo "🧹 Cleaning up old TypeScript data files..."

for subject_dir in "$SUBJECTS_DIR"/*/; do
  subject=$(basename "$subject_dir")

  # Remove quizzes.ts if quizzes.json exists
  if [[ -f "$subject_dir/quizzes.json" && -f "$subject_dir/quizzes.ts" ]]; then
    rm "$subject_dir/quizzes.ts"
    echo "  ✓ Removed $subject/quizzes.ts"
  fi

  # Remove exams.ts if exams.json exists
  if [[ -f "$subject_dir/exams.json" && -f "$subject_dir/exams.ts" ]]; then
    rm "$subject_dir/exams.ts"
    echo "  ✓ Removed $subject/exams.ts"
  fi

  # Remove projects.ts if projects.json exists
  if [[ -f "$subject_dir/projects.json" && -f "$subject_dir/projects.ts" ]]; then
    rm "$subject_dir/projects.ts"
    echo "  ✓ Removed $subject/projects.ts"
  fi

  # Remove exercises/*.ts files if exercises.json exists
  if [[ -f "$subject_dir/exercises.json" && -d "$subject_dir/exercises" ]]; then
    rm -rf "$subject_dir/exercises"
    echo "  ✓ Removed $subject/exercises/ directory"
  fi
done

echo ""
echo "✨ Cleanup complete!"
echo ""
echo "Remaining structure for each subject:"
echo "  - index.ts (imports from JSON, exports with types)"
echo "  - topics.ts (handles markdown imports)"
echo "  - *.json (assessment data)"
