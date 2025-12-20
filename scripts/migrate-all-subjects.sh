#!/bin/bash
# Migrate all subjects to use glob imports and frontmatter

set -e

SUBJECTS=(
  cs102 cs103 cs104 cs105
  cs201 cs202 cs203 cs204 cs205
  cs301 cs302 cs303 cs304 cs305 cs306 cs307
  cs401 cs402 cs403 cs404 cs405 cs406 cs407
  math101 math102
  math201 math202 math203 math204
  math301 math302 math303 math304
  math401 math402 math403 math404
)

echo "Migrating ${#SUBJECTS[@]} subjects..."

for subject in "${SUBJECTS[@]}"; do
  echo ""
  echo "=========================================="
  echo "Migrating $subject..."
  echo "=========================================="

  # Run the frontmatter migration
  npx tsx scripts/add-frontmatter.ts "$subject"

  # Replace topics.ts with topics.new.ts
  if [ -f "src/subjects/$subject/topics.new.ts" ]; then
    mv "src/subjects/$subject/topics.ts" "src/subjects/$subject/topics.old.ts"
    mv "src/subjects/$subject/topics.new.ts" "src/subjects/$subject/topics.ts"
    rm "src/subjects/$subject/topics.old.ts"
    echo "✅ Replaced topics.ts with simplified version"
  else
    echo "⚠️  No topics.new.ts generated for $subject"
  fi
done

echo ""
echo "=========================================="
echo "Migration complete! Testing build..."
echo "=========================================="

npm run build
