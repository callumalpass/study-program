#!/bin/bash

# Code Janitor / Refactoring Script
# Runs Claude Code to identify and fix technical debt iteratively
# Usage: ./scripts/refactor-code.sh [number_of_iterations]

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
echo "Code Janitor: Refactoring Script"
echo "=================================="
echo "Using tool: $TOOL"
echo "Will run $MAX_ITERATIONS iterations of code improvements."
echo ""

for ((i=1; i<=MAX_ITERATIONS; i++)); do
    echo ""
    echo "=========================================="
    echo "Iteration $i of $MAX_ITERATIONS"
    echo "=========================================="
    echo ""

    # Create the upgrade prompt
    PROMPT=$(cat <<'EOF'
Your goal is to pay down technical debt by refactoring code to be cleaner, safer, and more idiomatic.

## Context
- **Language:** TypeScript
- **Frameworks:** Preact, Vite
- **Source:** src/
- **Tests:** tests/

## Your Task

1. **Hunt for Code Smells:**
   Scan `src/` for *one* specific issue to fix. Good targets include:
   - **Type Safety:** Usage of `any`, `// @ts-ignore`, or missing return types.
   - **Complexity:** Long functions (>50 lines), deep nesting (arrows), or duplicate logic.
   - **Clarity:** Cryptic variable names, magic numbers, or lack of comments on complex regex.
   - **Modernization:** Legacy patterns that can be replaced (e.g., `var` -> `let/const`, callback hell -> `async/await`).
   - **Dead Code:** Unused exports or imports (verify carefully!).

   *Tip: Use `grep` to find "any" or "FIXME", or look at large files in `src/utils/` or `src/core/`.*

2. **Select & Plan:**
   - Choose **one** file and **one** specific problem.
   - Don't try to fix the whole project at once. Small, atomic refactors are best.
   - Explain your choice (e.g., "Refactoring `src/core/router.ts` to remove `any` type in navigation logic").

3. **Refactor:**
   - Apply your changes.
   - Preserve the *behavior* of the code (unless fixing a clear bug).
   - Improve names and types where possible.

4. **Verify:**
   - Run `npm run build` to ensure type safety (crucial for TypeScript refactors).
   - Run `npm test` to ensure no regressions.
   - If you break something, fix it or revert.

5. **Commit:**
   - Stage changes: `git add .`
   - Commit with a semantic message: `refactor: [description]` (e.g., `refactor: Replace 'any' with specific types in Router`).

## Guidelines
- **Safety First:** If you aren't 100% sure what the code does, leave it alone or write a test for it first.
- **Atomic Commits:** Focus on one improvement per iteration.
- **Do not** change business logic or features, only internal structure/quality.

Begin by scanning the codebase for candidates.
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
