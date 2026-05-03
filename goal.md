**stu.p Progression MVP Spec**

**Goal**
Make stu.p easier to move through by giving learners a clear next action, making reading completion intentional, and turning quizzes/exercises into a guided recovery loop. This spec excludes mascot changes and broad progress-page redesign.

**1. Next Up Card**
Replace or promote the dashboard’s current next-action area into the primary dashboard action.

Behavior:
- Shows exactly one recommended action.
- Includes action type, subject/topic context, short rationale, and CTA.
- CTA deep-links directly to the item.

Priority order:
1. Active study session item, if any.
2. Due review item.
3. Next incomplete section in the current/last active subject.
4. Next unpassed quiz or exercise in that topic.
5. Next recommended subject.

Example:

```text
Next Up
Read: Arrays and Lists
CS101 · Topic 3
You completed 2 of 7 sections in this topic.
[Continue]
```

**2. Section Completion**
Separate “viewed” from “completed.”

Existing:
- `subtopicViews`: opened/read location history.

New:
```ts
interface SubtopicCompletion {
  completedAt: string;
}

interface SubjectProgress {
  subtopicCompletions?: Record<string, SubtopicCompletion>;
}
```

Rules:
- Opening a section records `subtopicViews` only.
- A section counts as complete only when the learner clicks **Complete Section**.
- The button appears at the end of the section, or becomes enabled after the learner scrolls near the bottom.
- Clicking it records completion and offers the next section or next practice item.

Topic reading progress:
```text
completed sections / total sections
```

Section completion does not require quiz mastery.

**3. Guided Topic Loop**
Within a topic, guide the learner through:

```text
Read section -> Complete section -> next section
Topic reading done -> quiz/exercise practice
```

Subject sidebar should show:
- viewed indicator for opened sections
- completed indicator for explicitly completed sections
- topic reading count, e.g. `4/7 sections`
- practice count, e.g. `2/5 practice`

When the final section in a topic is completed, show a transition panel:

```text
Topic reading complete
Next: take the topic quiz or start the first exercise.
```

**4. Quiz Recovery**
After quiz submission, add a recovery block.

MVP behavior:
- Show missed questions.
- Show explanations.
- Link back to the quiz’s topic reading page.
- If the score is below passing, add/keep the quiz in review queue as today’s app already does.

Example:

```text
Review Before Retrying
You missed 3 questions from Topic 2.
[Review Topic] [Retry Quiz]
```

No new question-to-subtopic mapping required for MVP. Later, optional `relatedSubtopicIds` or `conceptTags` can make this more precise.

**5. Study Session Mode**
Add a guided session queue that uses existing content.

Entry:
- Dashboard button: **Start Study Session**.
- Optional choices later: 15 / 25 / 45 minutes, reading focus, practice focus, review only.

MVP storage:
- Active session can live in `sessionStorage`.
- Real progress still writes to normal progress structures.

Queue generation:
```text
If due reviews exist:
  add 1-3 due review items

If unread sections exist in active/recommended subject:
  add next section

If topic reading is partly/fully complete:
  add next quiz or exercise from that topic

If subject has no reading left:
  add practice backlog, exam, or project
```

Session phases:
- **Learning**: unread sections remain.
- **Practicing**: reading is done, quizzes/exercises remain.
- **Reviewing**: due spaced repetition items exist.
- **Assessing**: exams/projects are the next major work.

Session screen:
```text
Study Session: CS101
2 / 5 complete

Current:
Read: Arrays and Lists

Queue:
✓ Review: Loop Quiz
→ Read: Arrays and Lists
• Quiz: Arrays Basics
• Exercise: Sum an Array
```

End screen:
- sections completed
- quizzes attempted/passed
- exercises passed
- review items completed

**MVP Data Changes**
Required:
- Add `subtopicCompletions` to `SubjectProgress`.
- Add migration/default initialization.

Not required for MVP:
- question-to-section mappings
- permanent session history
- mascot behavior
- progress page redesign
**stu.p Progression MVP Spec**

**Goal**
Make stu.p easier to move through by giving learners a clear next action, making reading completion intentional, and turning quizzes/exercises into a guided recovery loop. This spec excludes mascot changes and broad progress-page redesign.

**1. Next Up Card**
Replace or promote the dashboard’s current next-action area into the primary dashboard action.

Behavior:
- Shows exactly one recommended action.
- Includes action type, subject/topic context, short rationale, and CTA.
- CTA deep-links directly to the item.

Priority order:
1. Active study session item, if any.
2. Due review item.
3. Next incomplete section in the current/last active subject.
4. Next unpassed quiz or exercise in that topic.
5. Next recommended subject.

Example:

```text
Next Up
Read: Arrays and Lists
CS101 · Topic 3
You completed 2 of 7 sections in this topic.
[Continue]
```

**2. Section Completion**
Separate “viewed” from “completed.”

Existing:
- `subtopicViews`: opened/read location history.

New:
```ts
interface SubtopicCompletion {
  completedAt: string;
}

interface SubjectProgress {
  subtopicCompletions?: Record<string, SubtopicCompletion>;
}
```

Rules:
- Opening a section records `subtopicViews` only.
- A section counts as complete only when the learner clicks **Complete Section**.
- The button appears at the end of the section, or becomes enabled after the learner scrolls near the bottom.
- Clicking it records completion and offers the next section or next practice item.

Topic reading progress:
```text
completed sections / total sections
```

Section completion does not require quiz mastery.

**3. Guided Topic Loop**
Within a topic, guide the learner through:

```text
Read section -> Complete section -> next section
Topic reading done -> quiz/exercise practice
```

Subject sidebar should show:
- viewed indicator for opened sections
- completed indicator for explicitly completed sections
- topic reading count, e.g. `4/7 sections`
- practice count, e.g. `2/5 practice`

When the final section in a topic is completed, show a transition panel:

```text
Topic reading complete
Next: take the topic quiz or start the first exercise.
```

**4. Quiz Recovery**
After quiz submission, add a recovery block.

MVP behavior:
- Show missed questions.
- Show explanations.
- Link back to the quiz’s topic reading page.
- If the score is below passing, add/keep the quiz in review queue as today’s app already does.

Example:

```text
Review Before Retrying
You missed 3 questions from Topic 2.
[Review Topic] [Retry Quiz]
```

No new question-to-subtopic mapping required for MVP. Later, optional `relatedSubtopicIds` or `conceptTags` can make this more precise.

**5. Study Session Mode**
Add a guided session queue that uses existing content.

Entry:
- Dashboard button: **Start Study Session**.
- Optional choices later: 15 / 25 / 45 minutes, reading focus, practice focus, review only.

MVP storage:
- Active session can live in `sessionStorage`.
- Real progress still writes to normal progress structures.

Queue generation:
```text
If due reviews exist:
  add 1-3 due review items

If unread sections exist in active/recommended subject:
  add next section

If topic reading is partly/fully complete:
  add next quiz or exercise from that topic

If subject has no reading left:
  add practice backlog, exam, or project
```

Session phases:
- **Learning**: unread sections remain.
- **Practicing**: reading is done, quizzes/exercises remain.
- **Reviewing**: due spaced repetition items exist.
- **Assessing**: exams/projects are the next major work.

Session screen:
```text
Study Session: CS101
2 / 5 complete

Current:
Read: Arrays and Lists

Queue:
✓ Review: Loop Quiz
→ Read: Arrays and Lists
• Quiz: Arrays Basics
• Exercise: Sum an Array
```

End screen:
- sections completed
- quizzes attempted/passed
- exercises passed
- review items completed

**MVP Data Changes**
Required:
- Add `subtopicCompletions` to `SubjectProgress`.
- Add migration/default initialization.

Not required for MVP:
- question-to-section mappings
- permanent session history
- mascot behavior
- progress page redesign


