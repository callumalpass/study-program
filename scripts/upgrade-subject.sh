#!/bin/bash

# Subject Upgrade Script
# Runs Claude Code to upgrade subjects from the curriculum, one at a time
# Each iteration picks the highest priority subject that still needs work

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# Number of subjects to upgrade (default: 5, or pass as argument)
MAX_ITERATIONS=${1:-5}

echo "=================================="
echo "Subject Upgrade Script"
echo "=================================="
echo ""
echo "Will upgrade up to $MAX_ITERATIONS subjects"
echo "Each iteration picks the highest priority subject from docs/reviews/SUMMARY.md"
echo ""

for ((i=1; i<=MAX_ITERATIONS; i++)); do
    echo ""
    echo "=========================================="
    echo "Iteration $i of $MAX_ITERATIONS"
    echo "=========================================="
    echo ""

    # Create the upgrade prompt
    PROMPT=$(cat <<'EOF'
You are upgrading subjects in a Computer Science degree curriculum to meet production-ready quality standards.

## Reference Documents
Read these files for context:
- Summary of all subjects: docs/reviews/SUMMARY.md
- Quality Standard: docs/standards/SUBJECT_STANDARD.md
- Upgrade Instructions: docs/prompts/SUBJECT_UPGRADE_PROMPT.md

## Your Task

1. **Read docs/reviews/SUMMARY.md** to identify the highest priority subject that still needs work
2. Pick ONE subject from the "Priority Action Items" section (Immediate priority first, then High, then Medium)
3. Upgrade that subject completely

### Phase 1: Select Subject & Audit
1. Read SUMMARY.md and pick the highest priority incomplete subject
2. Read its review at docs/reviews/{subject}_review.md
3. Audit the subject's current state:
   - Topics in src/data/subjects/{subject}/topics.ts
   - Subtopics in src/content/subjects/{subject}/topic-N/
   - Exercises in src/data/subjects/{subject}/exercises/
   - Quizzes in src/data/subjects/{subject}/quizzes.ts
   - Exams in src/data/subjects/{subject}/exams.ts
   - Projects in src/data/subjects/{subject}/projects.ts (CS subjects only)

### Phase 2: Identify Gaps
Compare against requirements:
- 7 topics with 7 subtopics each (800+ words per subtopic)
- 16 exercises per topic (112 total)
- 3 quizzes per topic with 5 questions each (105 questions total)
- Midterm (25-30 questions) and Final (40-45 questions) exams
- 2-3 projects with rubrics (CS subjects only, not required for MATH subjects)

### Phase 3: Implementation
Fix ALL gaps found:
1. Expand subtopics to 800+ words if any are below minimum
2. Add missing exercises with proper difficulty distribution (3×D1, 3×D2, 4×D3, 3×D4, 3×D5 per topic)
3. Add missing quiz questions (5 per quiz, 3 quizzes per topic)
4. Add/complete exams if needed
5. For CS subjects: ensure 2-3 projects exist with full rubrics (8-12 requirements, 4-5 rubric criteria, scaffolding)
6. Ensure all IDs follow naming conventions from SUBJECT_UPGRADE_PROMPT.md
7. Ensure TypeScript compiles without errors

### Phase 4: Update Reviews (REQUIRED)
After completing all upgrades:

1. **Update the subject-specific review** at docs/reviews/{subject}_review.md:
   - Update all scores to reflect current state
   - Update the Overall Status to COMPLETE if fully done
   - Mark completed items, note any remaining gaps
   - Update word counts and exercise/quiz counts

2. **Update docs/reviews/SUMMARY.md**:
   - Move the subject to the appropriate status category (Production Ready if 10/10)
   - Update the Quick Stats table (counts and percentages)
   - Remove from Priority Action Items if complete
   - Update the Year-by-Year Summary section
   - Update Estimated Work Remaining if needed

### Phase 5: Commit Changes (REQUIRED)
After all upgrades and review updates are complete:
1. Stage all changed files with: git add -A
2. Create a commit with a descriptive message like: "Upgrade {SUBJECT_CODE} to production quality"
3. Include what was added/fixed in the commit body

## Important Guidelines
- Follow the type definitions in src/core/types.ts
- Use the ID naming conventions from SUBJECT_UPGRADE_PROMPT.md
- Run npm run build to verify TypeScript compiles without errors
- Use the TodoWrite tool to track progress through all phases
- Do NOT skip Phase 4 (updating reviews) or Phase 5 (committing)
- Complete the chosen subject FULLY

Begin by reading docs/reviews/SUMMARY.md to pick the highest priority subject.
EOF
)

    # Run Claude with the upgrade prompt
    if claude --dangerously-skip-permissions -p "$PROMPT"; then
        echo ""
        echo "✓ Completed iteration $i"
    else
        EXIT_CODE=$?
        echo ""
        echo "✗ Error in iteration $i (exit code: $EXIT_CODE)"
        if [ $EXIT_CODE -eq 130 ]; then
            echo "  Interrupted by user. Stopping."
            exit 130
        fi
        echo "  Continuing with next iteration..."
    fi

    echo ""
    echo "----------------------------------------"

done

echo ""
echo "=================================="
echo "All iterations complete!"
echo "=================================="
echo ""
echo "Run 'git log --oneline -$MAX_ITERATIONS' to see recent commits."
