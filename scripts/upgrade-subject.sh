#!/bin/bash

# Subject Upgrade Script
# Runs Claude Code to upgrade subjects from the curriculum, one at a time
# Each iteration picks the highest priority subject that still needs work

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# Default values
MAX_ITERATIONS=5
TOOL="claude"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --tool)
      TOOL="$2"
      shift 2
      ;;
    *)
      MAX_ITERATIONS="$1"
      shift
      ;;
  esac
done

echo "=================================="
echo "Subject Upgrade Script"
echo "=================================="
echo "Using tool: $TOOL"
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
- Subject Spec Schema: docs/standards/SUBJECT_SPEC_SCHEMA.md
- Upgrade Instructions: docs/prompts/SUBJECT_UPGRADE_PROMPT.md
- Example specs: src/subjects/cs101/subject-spec.yaml, src/subjects/math303/subject-spec.yaml

## Your Task

1. **Read docs/reviews/SUMMARY.md** and run `npm run quality` to identify the highest priority subject that still needs work
2. Pick ONE subject from the "Priority Action Items" section (Immediate priority first, then High, then Medium)
3. Upgrade that subject completely

### Phase 0: Subject Specification (Required First)
1. Check if src/subjects/{subject}/subject-spec.yaml exists
2. If missing, create it using the schema at docs/standards/SUBJECT_SPEC_SCHEMA.md
3. The spec defines:
   - curriculum.subtopic_word_target (words per subtopic)
   - curriculum.essential_concepts (what must be covered)
   - exercises, quizzes, exams, and project targets

### Phase 1: Select Subject & Audit

1. Read SUMMARY.md and pick the highest priority incomplete subject
   - If all subjects are complete, pick any subject
2. Read its review at docs/reviews/{subject}_review.md
3. Audit the subject's current state:
   - Subject spec in src/subjects/{subject}/subject-spec.yaml
   - Topics in src/subjects/{subject}/topics.ts
   - Subtopics in src/subjects/{subject}/content/topic-N/*.md
   - Exercises in src/subjects/{subject}/content/topic-N/exercises.json (per-topic)
   - Quizzes in src/subjects/{subject}/content/topic-N/quizzes.json (per-topic)
   - Exams in src/subjects/{subject}/exams.json
   - Projects in src/subjects/{subject}/projects.json (if required by spec)

### Phase 2: Identify gaps and quality issues
Compare against the subject's spec (or defaults if not overridden):
- 7 topics with 7 subtopics each
- Subtopic content (spec.curriculum.subtopic_word_target, default: 1000)
- Exercises per topic (spec.exercises.per_topic.target, default: 16)
- Quizzes per topic (spec.quizzes.per_topic, default: 3 × 5 questions)
- Exams (spec.exams targets, default: ~26 midterm, ~42 final)
- Projects (spec.projects.required, spec.projects.count)
- Identify areas where any of these might be improved
- Be on the lookout for content quality gaps (clarity, correctness, depth, cohesion)

### Phase 3: Implementation
Fix ALL gaps found (using spec targets), including quality issues:
1. Create subject-spec.yaml if missing (required, including curriculum section)
2. Expand subtopics to meet spec.curriculum.subtopic_word_target (default: 1000 words)
3. Ensure content covers all spec.curriculum.essential_concepts
3a. Improve content quality (clarity, correctness, depth, cohesion) wherever it falls short
4. Add exercises to content/topic-N/exercises.json (per spec.exercises.per_topic.target)
5. Add quizzes to content/topic-N/quizzes.json (per spec.quizzes.per_topic)
6. Add/complete exams in exams.json (per spec.exams targets)
7. Add projects if spec.projects.required is true
8. Ensure all IDs follow naming conventions from SUBJECT_UPGRADE_PROMPT.md
9. Ensure TypeScript compiles without errors

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
- Address both quantity gaps (spec targets) and quality gaps (clarity, correctness, depth, cohesion)
- Use the TodoWrite tool to track progress through all phases
- Do NOT skip Phase 4 (updating reviews) or Phase 5 (committing)
- Complete the chosen subject FULLY

Begin by reading docs/reviews/SUMMARY.md to pick the highest priority subject.
EOF
)

    # Run the selected tool
    if [ "$TOOL" == "codex" ]; then
        SUCCESS=0
        codex --full-auto "$PROMPT" || SUCCESS=$?
    else
        SUCCESS=0
        claude --dangerously-skip-permissions -p "$PROMPT" || SUCCESS=$?
    fi

    if [ $SUCCESS -eq 0 ]; then
        echo ""
        echo "✓ Completed iteration $i"
    else
        EXIT_CODE=$SUCCESS
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
