# stu.p v2 Content Schema Notes

Content packs are directories with `pack.yaml`, `concepts.yaml`, `subjects/`,
and `tracks/`.

Subjects live at `subjects/<subject-id>/subject.yaml` and point to topic files.
Topics live at `subjects/<subject-id>/topics/<topic-id>/topic.yaml` and point to
Markdown content plus activity IDs.

Current activity storage supports legacy JSON for quizzes, exercises, exams,
and projects:

- `content/topic-N/quizzes.json`
- `content/topic-N/exercises.json`
- `exams.json`
- `projects.json`

The resolver adapts those records to v2 activity variants:

- quiz: `type: assessment`, `mode: quiz`
- exam: `type: assessment`, `mode: exam`
- coding exercise: `type: assignment`, `mode: coding_exercise`
- written exercise: `type: assignment`, `mode: written_exercise`
- project: `type: project`

Learner data stays outside packs under the configured learner home:

- `events.jsonl`
- `profile.json`
- `plans/active.yaml`
- `plans/proposed/`
- `review/queue.json`
