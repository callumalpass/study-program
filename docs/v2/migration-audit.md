# v2 Migration Audit

Status: implemented on branch `v2-migration`.

## Phase Coverage

- Phase 1, file-based content: complete. Runtime metadata now loads from
  generated `subject.yaml` and `topic.yaml` files; per-subject TypeScript glue is
  no longer required for curriculum or assessments.
- Phase 2, content pack shape: complete. The `cs-degree` pack has `pack.yaml`,
  `concepts.yaml`, tracks, subjects, topics, Markdown, quizzes, exercises,
  exams, and projects. Static builds load it from
  `content/bundled-packs/cs-degree`.
- Phase 3, local server mode: complete. `stup serve` loads filesystem packs,
  writes validation/index cache, and exposes `/api/*` endpoints consumed by the
  UI with static fallback.
- Phase 4, learner event log: complete. Local server mode stores append-only
  `events.jsonl` outside packs, accepts activity/answer/flashcard/struggle
  events, and derives deterministic `profile.json`.
- Phase 5, adaptive planning and agent authoring: complete. Plans live under the
  learner home, `stup plan` validates them, authoring helpers create overlay
  packs/remediation modules, and `skills/stup-content-agent` documents the agent
  workflow.
- Phase 6, pack extraction: complete. The canonical `cs-degree` pack is
  published at `https://github.com/callumalpass/cs-degree` and is also available
  locally at `~/content-packs/cs-degree`. The GitHub Pages workflow checks it out
  into `content/bundled-packs/cs-degree` before validation and build.

## Verified Commands

```bash
npm run content:validate
npm run validate
npm run quality
npm run build
npm run test
npx playwright test
npm run content:checkout
node cli/stup.js content validate --content-pack ~/content-packs/cs-degree
node ~/projects/comp_sci_degree-v2/cli/stup.js content validate --content-pack .
stup serve --content-pack ~/content-packs/cs-degree --port 1234
```

## Pack Stats

- Subjects: 38
- Topics: 267
- Concepts: 307
- Quizzes: 801
- Exercises: 4,356
- Exams: 76
- Projects: 76
- Tracks: 7

## Notes

The static GitHub Pages build uses the checked-out `cs-degree` pack. Local
dynamic use should prefer `stup serve --content-pack ~/content-packs/cs-degree`.
