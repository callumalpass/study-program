# stup CLI Answer File Spec

This document defines how students answer quizzes and exercises with local files, how `stup` validates those files, and which fields are student-edited vs tool-managed.

## Design goals

- Students work in their normal editor (`$EDITOR`), not interactive terminal prompts.
- Attempt data is stable on disk, resumable, and easy to sync.
- Machine validation is strict and deterministic.
- Coding answers live in real source files (`.py`, `.c`, `.ts`, etc.), not inline blobs.

## Directory layout

```text
.stup/
  content/                                  # Pulled course content (read-only for students)
  state/
    progress.json                           # Local canonical progress cache
  answers/
    quizzes/
      <quiz-id>/
        <attempt-id>/
          attempt.yaml                      # Main quiz attempt file
          code/
            <question-id>.<ext>             # Only for coding quiz questions
          results/
            latest-check.json               # Tool-managed check result
    exercises/
      <exercise-id>/
        <attempt-id>/
          attempt.yaml                      # Main exercise attempt file
          solution.<ext>                    # Coding exercise answer
          answer.md                         # Written exercise answer
          results/
            latest-check.json               # Tool-managed check result
```

## Command flow

### Quiz flow

1. `stup quiz start --id <quiz-id> --open`
2. Student edits `.stup/answers/quizzes/<quiz-id>/<attempt-id>/attempt.yaml`
3. If quiz has coding question(s), student edits `code/<question-id>.<ext>`
4. `stup quiz check --id <quiz-id>` validates + scores latest attempt
5. `stup quiz submit --id <quiz-id>` records into local progress and optionally syncs

### Exercise flow

1. `stup exercise start --id <exercise-id> --open`
2. Student edits `solution.<ext>` (coding) or `answer.md` (written)
3. `stup exercise check --id <exercise-id>` validates against tests/rubric
4. `stup exercise submit --id <exercise-id>` records into local progress and optionally syncs

### Ad-hoc mode (optional)

Ad-hoc file mode can be added later for power users, but the primary and currently implemented flow uses managed attempt directories.

## Quiz attempt schema

Schema file: `docs/cli/schemas/quiz-attempt.schema.json`

### Student-edited fields

- `answers.*.answer`
- `answers.*.code` or `answers.*.file`
- `notes`

### Tool-managed fields

- `version`, `kind`
- `quizId`, `attemptId`
- `createdAt`, `updatedAt`
- `status`

### Example

```yaml
version: 1
kind: quiz_attempt
quizId: cs101-quiz-1
attemptId: 20260218T154200Z
createdAt: 2026-02-18T15:42:00Z
updatedAt: 2026-02-18T15:50:11Z
status: in_progress
answers:
  q1:
    type: multiple_choice
    answer: 2
  q2:
    type: true_false
    answer: true
  q3:
    type: fill_blank
    answer: "hash table"
  q4:
    type: code_output
    answer: "[1, 2, 3]"
  q5:
    type: coding
    language: python
    file: code/q5.py
notes: "Need to revisit q4 edge case."
```

## Exercise attempt schema

Schema file: `docs/cli/schemas/exercise-attempt.schema.json`

### Student-edited fields

- `solutionFile` target contents (coding)
- `answerFile` target contents (written)
- `notes`

### Tool-managed fields

- `version`, `kind`
- `exerciseId`, `attemptId`
- `createdAt`, `updatedAt`
- `status`

### Coding exercise example

```yaml
version: 1
kind: exercise_attempt
exerciseId: cs101-exercise-1
attemptId: 20260218T160055Z
createdAt: 2026-02-18T16:00:55Z
updatedAt: 2026-02-18T16:08:03Z
status: in_progress
exerciseType: coding
language: python
solutionFile: solution.py
runtime:
  timeoutSeconds: 8
  memoryMb: 256
notes: "Passing visible tests; hidden case still failing."
```

### Written exercise example

```yaml
version: 1
kind: exercise_attempt
exerciseId: math101-t2-ex04
attemptId: 20260218T161500Z
createdAt: 2026-02-18T16:15:00Z
updatedAt: 2026-02-18T16:24:37Z
status: in_progress
exerciseType: written
answerFile: answer.md
notes: "Need cleaner contradiction step."
```

## Validation and scoring rules

- `stup` validates YAML shape with JSON Schema first.
- Then it validates semantic consistency against course content:
  - IDs exist
  - Question/exercise types match
  - Required answers/files exist
- Quiz scoring should reuse existing answer normalization rules from `src/utils/quiz-utils.ts`.
- Coding checks run in local runtime adapters with:
  - per-check timeout
  - optional memory cap (platform-dependent)
  - optional network isolation (platform-dependent)
  - isolated working directory
- Check output is written to `results/latest-check.json` and does not modify student answer fields.

## Runtime notes

- Use local executables where available (`python3`, `node`, `gcc`/`clang`).
- If runtime is missing, `stup` returns actionable install guidance.
- Hidden tests are never written into student-managed files.

## Status values

- `in_progress`: editable, not yet validated or failed last check
- `checked`: last check succeeded and produced a score/result
- `submitted`: locked for submission history (new work should create a new attempt)
