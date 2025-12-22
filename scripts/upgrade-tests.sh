#!/bin/bash

# Test Suite Upgrade Script
# Runs Claude Code to improve the test suite iteratively
# Usage: ./scripts/upgrade-tests.sh [number_of_iterations]

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
echo "Test Suite Upgrade Script"
echo "=================================="
echo "Using tool: $TOOL"
echo "Will run $MAX_ITERATIONS iterations of test improvements."
echo ""

for ((i=1; i<=MAX_ITERATIONS; i++)); do
    echo ""
    echo "=========================================="
    echo "Iteration $i of $MAX_ITERATIONS"
    echo "=========================================="
    echo ""

    # Create the upgrade prompt
    PROMPT=$(cat <<'EOF'
You are an expert QA Engineer and Software Developer tasked with improving the test suite of this project.

## Context
- **Testing Framework:** Vitest
- **Test Directory:** tests/
- **Source Directory:** src/
- **Language:** TypeScript
- **Conventions:** 
  - Test files are located in `tests/` and end with `.test.ts`
  - Setup file is `tests/setup.ts`

## Your Task

1. **Analyze the current state:**
   - Scan `src/` to understand the project structure and key components.
   - Scan `tests/` to see what is already tested.
   - Run `npm test` to verify the current health of the suite.
   - Identify a high-value target: a core utility, component, or service in `src/` that lacks a corresponding `.test.ts` file or has obviously insufficient coverage.

2. **Select ONE target:**
   - Choose *one* specific file to create tests for or improve.
   - Explain your choice clearly (e.g., "Selected src/utils/gemini-eval.ts because it handles core logic but has no tests.").

3. **Implement Improvements:**
   - Create a new test file (e.g., `tests/gemini-eval.test.ts`) or significantly expand an existing one.
   - Reference `tests/setup.ts` if global setup is needed.
   - Write comprehensive tests:
     - **Happy Path:** Verify standard usage works as expected.
     - **Edge Cases:** Test boundaries, null/undefined inputs, and empty states.
     - **Error Handling:** Ensure errors are thrown or handled gracefully where expected.
   - Mock external dependencies where appropriate to keep tests fast and isolated (unit tests).

4. **Bug Handling (If applicable):**
   - If a test fails because of a bug in the source code (not an error in the test logic):
   - **Verify:** Ensure the test is correct and truly reflects the intended behavior.
   - **Fix:** Modify the source code in `src/` to resolve the bug.
   - **Validate:** Run the tests again to ensure the fix works and doesn't cause regressions.

5. **Verify:**
   - Run `npm test` to ensure your new tests pass.
   - If existing tests break, investigate if it's a regression or a brittle test, and fix it.
   - Ensure the new tests rely on the actual code behavior, not just mocks.

6. **Commit:**
   - Once tests pass, stage the changes with `git add`.
   - Create a commit.
   - If only tests were added: `test: Add unit tests for [component]`
   - If a bug was fixed: `fix: [description of fix]` and include `test: [description]` in the body.

## Guidelines
- **Fix bugs when found:** If your tests reveal a genuine bug in the codebase, you are expected to fix it.
- **Do not** modify source code unless it is to fix a bug or slightly improve testability.
- **Verification is mandatory.** Do not commit failing tests.

Begin by listing the files in `tests/` and `src/` to identify your target.
EOF
)

    # Run the selected tool
    if [ "$TOOL" == "codex" ]; then
        SUCCESS=0
        codex --dangerously-bypass-approvals-and-sandbox "$PROMPT" || SUCCESS=$?
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
echo "Run 'git log --oneline -$MAX_ITERATIONS' to see recent commits."