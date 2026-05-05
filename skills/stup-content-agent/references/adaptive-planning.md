# Adaptive Planning

Use learner evidence deterministically.

Rules:

- If failures cluster around one or two concept tags, add targeted practice.
- If failures involve prerequisite concepts, insert remediation before the next
  dependent subject.
- If the learner reports confusion but scores are good, add optional readings or
  flashcards rather than blocking progress.
- If failures occur only on high-difficulty items, recommend review without
  necessarily reordering the plan.
- If a topic has weak explanations or broken assessments, improve the base
  content when the user asked to fix the pack.

Plan edits live in learner data unless the user asks to export them. Proposed
plans belong under `plans/proposed/`; accepted plans become `plans/active.yaml`.
