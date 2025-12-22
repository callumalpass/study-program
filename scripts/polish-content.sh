#!/bin/bash

# Content Polisher Script
# Runs Claude Code to improve the depth and clarity of curriculum content iteratively
# Usage: ./scripts/polish-content.sh [number_of_iterations]

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
echo "Content Polisher: Expansion & Diagrams"
echo "=================================="
echo "Using tool: $TOOL"
echo "Will run $MAX_ITERATIONS iterations of content improvements."
echo ""

for ((i=1; i<=MAX_ITERATIONS; i++)); do
    echo ""
    echo "=========================================="
    echo "Iteration $i of $MAX_ITERATIONS"
    echo "=========================================="
    echo ""

    # Create the upgrade prompt
    PROMPT=$(cat <<'EOF'
## Objective
Improve the depth, precision, and visual explanatory power of the curriculum content in `src/subjects/`.

## Context
- **Content:** Markdown files in `src/subjects/{subject}/content/topic-{N}/*.md`
- **Supported Visuals:** Mermaid.js diagrams (flowcharts, sequence diagrams, class diagrams, state diagrams).
- **Tone:** Objective, precise, comprehensive, and technically accurate. Avoid "fluff" or overly casual language.

## Instructions

1. **Select a Target:**
   - Pick a random subject and topic from `src/subjects/`.
   - Find a Markdown file that is:
     - **Too brief:** Concepts are mentioned but not fully explained.
     - **Text-heavy:** Complex logic or structures are described only in words, lacking visualization.
     - **Lacking Examples:** Theoretical concepts lack concrete code or data usage.

2. **Audit & Improve:**
   - Read the chosen file.
   - **Expand:** Identify sections that are "thin" and add detailed technical explanations, edge cases, or complexity analysis (Big O).
   - **Visualize:** Add **Mermaid diagrams** to illustrate algorithms, data structures, system architectures, or relationships.
     - Use ` ```mermaid ` code blocks.
   - **Exemplify:** Ensure every concept has a clear, compilable/runnable code example (Python, C++, or TypeScript as appropriate for the subject).
   - **Structure:** Use clear headers and lists to organize information logically.

3. **Verify:**
   - Ensure the Markdown is valid.
   - Verify that Mermaid syntax is correct.
   - Check that code examples are syntactically correct.

4. **Commit:**
   - Stage changes: `git add .`
   - Commit with a semantic message: `content: Expand [topic] with diagrams and details` (e.g., `content: Add flowchart and deep dive for Binary Search`).

## Guidelines
- **Focus on Visuals:** If a text describes a process, flow, or structure, IT NEEDS A DIAGRAM.
- **Focus on Depth:** Don't just define a term; explain *why* it matters and *how* it works under the hood.
- **Do not** change the core syllabus or remove required topics.

Begin by finding a content file that needs expansion or visualization.
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