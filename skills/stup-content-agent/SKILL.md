# stu.p Content Agent

Use this skill when the user asks to create, modify, review, personalize, or
adapt stu.p v2 content packs, tracks, subjects, assessments, exercises,
projects, flashcards, learner events, profiles, or learner plans.

## Core Rule

stu.p is deterministic. Adapt learning by editing validated files. Do not invent
runtime behavior that is not represented in content, learner, or plan files.

## First Steps

1. Run `stup config show` or inspect the supplied `--content-pack` paths.
2. Identify enabled content packs and the configured `authoringPack`.
3. Read relevant `pack.yaml`, `concepts.yaml`, active plan, learner profile,
   and validation output.
4. Treat upstream packs as read-only unless the user explicitly asks to edit
   them.
5. Write personalized additions to the authoring overlay pack.

## Choosing What To Edit

- Add remediation subjects when failures cluster around prerequisite concepts.
- Add practice activities when the base subject is sound but too thin.
- Add flashcards only for atomic recall, definitions, formulas, syntax, or
  distinctions.
- Update plans when sequence, focus, or timing is the problem.
- Improve base content only when the issue is a defect in the shared pack and
  the user asked to improve that pack.

## Authoring Standards

- Preserve existing IDs unless the meaning changes.
- Give every subject, topic, activity, question, and card a stable ID.
- Use existing concepts from `concepts.yaml` before adding new ones.
- Include explanations for quiz and exam questions.
- Coding exercises need runnable test cases unless they are explicitly rubric or
  AI evaluated.
- Projects need requirements, milestones, and rubrics.
- Keep generated changes reviewable as normal file diffs.

## Validation

After edits, run:

```bash
stup content validate
stup plan validate
stup learner derive --check
```

For standalone pack work, run:

```bash
stup content validate --content-pack .
```

If validation fails, fix the files before finishing.

## Final Response

Summarize files changed, content or plan changes made, validation results, and
any residual risks.

## References

- `references/schema.md`
- `references/validation.md`
- `references/authoring-standards.md`
- `references/adaptive-planning.md`
