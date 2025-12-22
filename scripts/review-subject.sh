#!/bin/bash

# Subject Review Script
# Runs an LLM tool to review subjects and update docs/reviews reports and summary

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# Default values
MAX_ITERATIONS=5
TOOL="claude"
REVIEW_SUBJECT=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --tool)
      TOOL="$2"
      shift 2
      ;;
    --subject)
      REVIEW_SUBJECT="$2"
      shift 2
      ;;
    --iterations)
      MAX_ITERATIONS="$2"
      shift 2
      ;;
    *)
      MAX_ITERATIONS="$1"
      shift
      ;;
  esac
done

if [[ -n "$REVIEW_SUBJECT" ]]; then
  MAX_ITERATIONS=1
fi

echo "=================================="
echo "Subject Review Script"
echo "=================================="
echo "Using tool: $TOOL"
if [[ -n "$REVIEW_SUBJECT" ]]; then
  echo "Review subject: $REVIEW_SUBJECT"
else
  echo "Will review up to $MAX_ITERATIONS subjects"
  echo "Each iteration picks the highest priority subject from docs/reviews/SUMMARY.md"
fi
echo ""

for ((i=1; i<=MAX_ITERATIONS; i++)); do
    echo ""
    echo "=========================================="
    echo "Iteration $i of $MAX_ITERATIONS"
    echo "=========================================="
    echo ""

    # Create the review prompt
    PROMPT=$(cat <<EOF
You are reviewing a subject in a Computer Science degree curriculum.

## Reference Documents
Read these files for context:
- Review template: docs/prompts/SUBJECT_REVIEW_PROMPT.md
- Quality Standard: docs/standards/SUBJECT_STANDARD.md
- Subject Spec Schema: docs/standards/SUBJECT_SPEC_SCHEMA.md
- Summary of all subjects: docs/reviews/SUMMARY.md

## Your Task
1. Run \`npm run quality\` and \`npm run validate\` for automated metrics.
2. Choose ONE subject to review:
   - If a subject is specified, review exactly that subject: ${REVIEW_SUBJECT:-"(none specified)"}.
   - Otherwise, pick the highest priority subject in docs/reviews/SUMMARY.md:
     Immediate (if any), then High Priority, then "Good with Minor Issues".
     If all subjects are 10/10, pick one to spot-check (rotate across years).
3. Review the subject against docs/standards/SUBJECT_STANDARD.md and its subject-spec.yaml.
4. Write the report to docs/reviews/{subject_id}_review.md.
5. Update docs/reviews/SUMMARY.md (counts, status lists, priority items, year-by-year summary, review date).

## Constraints
- Review-only: do NOT modify subject content files.
- Keep changes limited to docs/reviews/* and docs/reviews/SUMMARY.md.
- Use the report structure in docs/prompts/SUBJECT_REVIEW_PROMPT.md, but ensure
  the output path is docs/reviews/{subject_id}_review.md (not /reviews).

Begin by reading docs/reviews/SUMMARY.md.
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
