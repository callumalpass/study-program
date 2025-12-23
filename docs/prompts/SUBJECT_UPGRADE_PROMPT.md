# Subject Upgrade Prompt

Use this prompt to bring any subject up to the quality standard defined in `docs/standards/SUBJECT_STANDARD.md`.

---

## Prompt

You are upgrading the subject **[SUBJECT_ID]** to meet the production-ready quality standard.

**Reference Documents:**
- Quality Standard: `docs/standards/SUBJECT_STANDARD.md`
- Subject Spec Schema: `docs/standards/SUBJECT_SPEC_SCHEMA.md`
- Type Definitions: `src/core/types.ts`

---

## Phase 0: Subject Specification (Required First)

Every subject **must** have a `subject-spec.yaml` that defines its pedagogical approach and assessment requirements.

### Check for Existing Spec

```bash
ls src/subjects/[subject]/subject-spec.yaml
```

### If No Spec Exists, Create One

Use the schema at `docs/standards/SUBJECT_SPEC_SCHEMA.md` and example specs at:
- `src/subjects/cs101/subject-spec.yaml` (intro programming example)
- `src/subjects/math303/subject-spec.yaml` (proof-based math example)

The spec must define:
- **role**: Level and transformation the subject achieves
- **curriculum**: Word target per subtopic, prerequisite knowledge, essential concepts, out-of-scope topics
- **pedagogy**: Knowledge type, mastery indicators, common struggles
- **assessment**: Philosophy, what assessments measure, anti-patterns
- **grading**: Passing thresholds with rationale
- **exercises**: Types, quantities per topic (with justification)
- **quizzes**: Structure, question types
- **exams**: Question counts, formats
- **projects**: Whether required, count, goals

**Important:** The spec's targets (including `curriculum.subtopic_word_target`) will be used by `npm run quality` to validate the subject.

---

## Phase 1: Audit Current State

### Quick Quality Check

Before diving into manual auditing, run the quality analysis scripts:

```bash
# Fast content analysis (reads JSON/markdown directly)
npm run quality

# Import validation (uses Vite SSR to verify TypeScript modules work)
npm run validate

# Run both
npm run check
```

The quality script provides detailed breakdowns:
- **Exercises**: Coding vs written, with tests vs AI evaluation, language distribution, difficulty spread
- **Quizzes**: Question types, explanation coverage, code snippet usage
- **Exams**: Duration, question types, midterm/final status
- **Projects**: Requirements count, rubric coverage
- **Content**: Word counts per subtopic

### Manual Audit

If you need to inspect specific files:

1. **Subject Spec**: Check `src/subjects/[subject]/subject-spec.yaml` exists
2. **Topics**: Count topics in `src/subjects/[subject]/topics.ts`
3. **Subtopics**: Count markdown files in `src/subjects/[subject]/content/topic-N/`
4. **Exercises**: Count exercises in `src/subjects/[subject]/content/topic-N/exercises.json` (per topic)
5. **Quizzes**: Count quizzes in `src/subjects/[subject]/content/topic-N/quizzes.json` (per topic)
6. **Exams**: Check if `src/subjects/[subject]/exams.json` exists with Midterm and Final
7. **Projects**: Review `src/subjects/[subject]/projects.json` (if required by spec)

---

## Phase 2: Identify Gaps

Compare against the subject's spec requirements (or base defaults if not overridden):

| Component | Default | Notes |
|-----------|---------|-------|
| Topics | 7 | Fixed |
| Subtopics | 7 per topic | Fixed |
| Words/subtopic | 1000 | Per spec (`curriculum.subtopic_word_target`) |
| Exercises | 16 per topic | Per spec (can be lower for proof-heavy subjects) |
| Quizzes | 3 per topic × 5 questions | Per spec |
| Exams | Midterm ~26q + Final ~42q | Per spec |
| Projects | 1+ for CS, 0 for MATH | Per spec |

**Check the subject's `subject-spec.yaml`** for actual targets — the quality checker uses these.

---

## Phase 3: Implementation

Upgrade in this order:

### 3.1 Topics with Subtopics

Create/update subtopic markdown files with frontmatter. The shared loader automatically discovers content via glob imports.

**Each markdown file must have frontmatter:**
```yaml
---
id: cs101-t1-intro
title: "Introduction to Variables"
order: 1
---
```

**Use Visual Content:** Enhance understanding with diagrams and graphs where appropriate:

- **Mermaid diagrams** for flowcharts, algorithms, system architecture, ER diagrams
- **Function plots** for mathematical functions, derivatives, curves (especially for MATH subjects)

Example function plot for a calculus topic:
````markdown
```plot
{
  "xAxis": { "domain": [-3, 3] },
  "yAxis": { "domain": [-1, 10] },
  "data": [
    { "fn": "x^2", "color": "#8b5cf6" },
    { "fn": "2*x", "color": "#22c55e", "title": "derivative" }
  ]
}
```
````

### 3.2 Exercises

Create exercises with proper difficulty distribution (3×D1, 3×D2, 4×D3, 3×D4, 3×D5 per topic).

### 3.3 Quizzes

Create 3 quizzes per topic (Fundamentals, Application, Mastery) with 5 questions each.

### 3.4 Exams

Create Midterm (Topics 1-4) and Final (all topics) exams.

### 3.5 Projects (CS subjects only)

Create 2-3 projects with milestones and rubrics.

---

## Phase 4: Update Subject Review

After completing the upgrade, deploy a subagent to update the subject review:

```
Task: Update the review for [SUBJECT_ID]

Read the current review at: docs/reviews/[subject]_review.md
Audit the upgraded subject against docs/standards/SUBJECT_STANDARD.md
Update the review to reflect the current state, noting:
- Components that now meet standards
- Any remaining gaps
- Overall readiness assessment
```

---

## File Structure Reference

All subject content is colocated in a single directory:

```
src/subjects/[subject]/
├── subject-spec.yaml  # REQUIRED: Subject specification
├── content/           # Markdown lesson content (with frontmatter)
│   ├── topic-1/       # Topic 1 directory
│   │   ├── 01-introduction.md    # Subtopic (frontmatter: id, title, order)
│   │   ├── 02-concept-name.md
│   │   ├── ...07-*.md
│   │   ├── exercises.json        # Exercises for this topic
│   │   └── quizzes.json          # Quizzes for this topic
│   ├── topic-2/
│   │   ├── *.md
│   │   ├── exercises.json
│   │   └── quizzes.json
│   └── ...
├── index.ts           # Re-exports all subject content
├── topics.ts          # Topic definitions (uses glob imports)
├── exams.json         # Midterm and Final exams
└── projects.json      # Projects (if required by spec)
```

### Shared Loader

All subjects use the shared loader at `src/subjects/loader.ts`:

```typescript
import { buildTopicsFromGlob } from '../loader';
```

---

## Type Definitions

All types are defined in `src/core/types.ts`. Import from there.

### Subject

```typescript
interface Subject {
  id: string;                    // e.g., 'cs101'
  code: string;                  // e.g., 'CS101'
  title: string;                 // e.g., 'Introduction to Programming'
  year: number;                  // 1-4
  semester: number;              // 1 or 2
  prerequisites: string[];       // Array of subject IDs
  description: string;           // Subject description
  learningObjectives: string[];  // Array of learning objectives
  topics: Topic[];               // Array of Topic objects
  estimatedHours: number;        // Total estimated hours
  examIds?: string[];            // Optional array of exam IDs
  projectIds?: string[];         // Optional array of project IDs
}
```

### Topic

```typescript
interface Topic {
  id: string;              // Format: '{subject}-topic-{N}'
  title: string;           // Topic title
  content: string;         // Markdown content (legacy fallback)
  subtopics?: Subtopic[];  // Array of 7 subtopics
  readings?: Reading[];    // Optional academic readings
  quizIds: string[];       // Array of 3 quiz IDs
  exerciseIds: string[];   // Array of 16 exercise IDs
}
```

### Subtopic

```typescript
interface Subtopic {
  id: string;      // Format: '{subject}-t{N}-{slug}'
  slug: string;    // URL-friendly: 'introduction', 'naming-rules'
  title: string;   // Display title
  content: string; // Markdown content (imported from file)
  order: number;   // Sort order: 1, 2, 3...
}
```

### Reading (Optional)

```typescript
type ReadingType = 'paper' | 'documentation' | 'textbook' | 'article' | 'rfc' | 'video';

interface Reading {
  id: string;                 // Format: '{subject}-t{N}-reading-{N}'
  title: string;              // Title of the reading
  authors?: string[];         // Author(s) if applicable
  url: string;                // URL to the reading
  type: ReadingType;          // Type of reading material
  year?: number;              // Publication year
  required: boolean;          // Required vs optional
  description?: string;       // Brief description
  estimatedMinutes?: number;  // Estimated reading time
}
```

### CodingExercise

```typescript
type ExerciseDifficulty = 1 | 2 | 3 | 4 | 5;
type ProgrammingLanguage = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'c' | 'rust' | 'go' | 'sql' | 'bash' | 'yaml' | 'dockerfile';

interface CodingExercise {
  id: string;                       // Format: '{subject}-t{N}-ex{NN}'
  subjectId: string;                // e.g., 'cs101'
  topicId: string;                  // e.g., 'cs101-topic-1'
  title: string;                    // Exercise title
  description: string;              // Problem description (markdown)
  difficulty?: ExerciseDifficulty;  // 1-5
  starterCode: string;              // Initial code template
  testCases: TestCase[];            // Array of test cases
  hints: string[];                  // Array of 3-4 progressive hints
  solution: string;                 // Complete working solution
  language: ProgrammingLanguage;    // Programming language
}

interface TestCase {
  input: string;           // Input to function/program
  expectedOutput?: string; // Expected result (auto-generated if omitted)
  isHidden: boolean;       // Hidden from student
  description: string;     // What this test validates
}
```

### WrittenExercise (Math/Theory subjects)

```typescript
interface WrittenExercise {
  id: string;
  subjectId: string;
  topicId: string;
  type: 'written';                  // Discriminator
  title: string;
  description: string;
  difficulty?: ExerciseDifficulty;
  hints: string[];
  solution: string;                 // Model answer/proof
}
```

### Quiz

```typescript
type QuestionType = 'multiple_choice' | 'fill_blank' | 'true_false' | 'code_output' | 'coding' | 'written';

interface Quiz {
  id: string;              // Format: '{subject}-quiz-{N}' or '{subject}-quiz-{N}{a|b|c}'
  subjectId: string;       // e.g., 'cs101'
  topicId: string;         // e.g., 'cs101-topic-1'
  title: string;           // Quiz title
  questions: QuizQuestion[];  // Array of 5 questions
}

interface QuizQuestion {
  id: string;                              // 'q1', 'q2', etc.
  type: QuestionType;                      // Question type
  prompt: string;                          // Question text
  options?: string[];                      // For multiple_choice (4 options)
  correctAnswer: string | number | boolean; // Answer (index for MC, bool for T/F, string for fill_blank)
  explanation: string;                     // Why the answer is correct
  codeSnippet?: string;                    // For code_output questions
  // For coding questions:
  starterCode?: string;
  testCases?: TestCase[];
  language?: ProgrammingLanguage;
  solution?: string;
  // For written questions:
  modelAnswer?: string;                    // For AI evaluation
}
```

### Exam

```typescript
interface Exam {
  id: string;                 // Format: '{subject}-exam-{midterm|final}'
  subjectId: string;          // e.g., 'cs101'
  topicId?: string;           // Optional (for topic-specific exams)
  title: string;              // e.g., 'CS101 Midterm Examination'
  durationMinutes?: number;   // 75 for midterm, 120 for final
  instructions?: string[];    // Array of instruction strings
  questions: QuizQuestion[];  // Same structure as quiz questions
}
```

### Project (CS subjects only)

```typescript
interface Project {
  id: string;                    // Format: '{subject}-project-{N}'
  subjectId: string;             // e.g., 'cs103'
  title: string;                 // Project title
  description: string;           // Full description (500+ words)
  requirements: string[];        // 8-12 specific requirements
  rubric: RubricCriterion[];     // 4-5 rubric criteria
  estimatedHours: number;        // 8-15 hours typically
  scaffolding?: ProjectScaffolding;
}

interface RubricCriterion {
  name: string;           // What's being evaluated
  weight: number;         // Percentage (must sum to 100%)
  levels: RubricLevel[];  // 4 scoring levels
}

interface RubricLevel {
  score: number;      // 1-4
  label: string;      // 'Excellent', 'Good', 'Satisfactory', 'Needs Improvement'
  description: string; // Level description
}

interface ProjectScaffolding {
  overview?: string;
  gettingStarted?: string[];
  milestones?: string[];
  starterResources?: StarterResource[];
  tips?: string[];
}

interface StarterResource {
  label: string;
  description?: string;
  link?: string;
}
```

---

## Import/Export Patterns

### Subject index.ts

```typescript
// src/subjects/[subject]/index.ts
import type { Exam, Project } from '../../core/types';

import examsData from './exams.json';
import projectsData from './projects.json';

// Exercises and quizzes are now per-topic in content/topic-N/ directories
// They are loaded automatically by the shared loader

export const [subject]Exams = examsData as Exam[];
export const [subject]Projects = projectsData as Project[];
export { [subject]Topics } from './topics';
```

### Topics with Glob Imports

```typescript
// src/subjects/[subject]/topics.ts
import type { Topic } from '../../core/types';
import { buildTopicsFromGlob } from '../loader';

// Glob import all markdown content automatically
const content = import.meta.glob('./content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// Topic configuration (only titles and IDs needed - subtopics auto-discovered)
const topicConfigs = [
  {
    number: 1,
    title: "Topic Title",
    quizIds: ['[subject]-quiz-1', '[subject]-quiz-1b', '[subject]-quiz-1c'],
    exerciseIds: ['[subject]-t1-ex01', '[subject]-t1-ex02', /* ... 16 total */],
  },
  // ... 7 topics total
];

export const [subject]Topics: Topic[] = buildTopicsFromGlob('[subject]', content, topicConfigs);
```

The `buildTopicsFromGlob` function:
1. Finds all markdown files matching `./content/topic-N/*.md`
2. Parses frontmatter from each file (id, title, order)
3. Builds Subtopic objects automatically
4. Returns the complete Topic[] array

### JSON Data Files

Exercises and quizzes are stored per-topic for easier management:

```json
// src/subjects/[subject]/content/topic-1/exercises.json
[
  {
    "id": "[subject]-t1-ex01",
    "subjectId": "[subject]",
    "topicId": "[subject]-topic-1",
    "title": "Exercise Title",
    "difficulty": 1,
    "description": "Problem description...",
    "starterCode": "# Your code here\n",
    "solution": "# Complete solution\n",
    "testCases": [
      { "input": "...", "isHidden": false, "description": "Basic case" },
      { "input": "...", "isHidden": true, "description": "Edge case" }
    ],
    "hints": [
      "First hint (general direction)",
      "Second hint (specific approach)",
      "Third hint (near-solution)"
    ],
    "language": "python"
  }
]
```

```json
// src/subjects/[subject]/content/topic-1/quizzes.json
[
  {
    "id": "[subject]-quiz-1a",
    "subjectId": "[subject]",
    "topicId": "[subject]-topic-1",
    "title": "Topic 1 - Fundamentals",
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "prompt": "Question text?",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0,
        "explanation": "Explanation of why A is correct."
      }
    ]
  }
]
```

```json
// src/subjects/[subject]/exams.json
[
  {
    "id": "[subject]-exam-midterm",
    "subjectId": "[subject]",
    "title": "[SUBJECT] Midterm Examination",
    "durationMinutes": 75,
    "instructions": [
      "This exam covers Topics 1-4.",
      "Answer all questions. Passing score is 70%."
    ],
    "questions": []
  }
]
```

```json
// src/subjects/[subject]/projects.json (CS subjects only)
[
  {
    "id": "[subject]-project-1",
    "subjectId": "[subject]",
    "title": "Project Title",
    "description": "Full project description (500+ words)...",
    "requirements": ["Requirement 1", "Requirement 2"],
    "rubric": [
      {
        "name": "Functionality",
        "weight": 40,
        "levels": [
          { "score": 4, "label": "Excellent", "description": "All features work correctly" },
          { "score": 3, "label": "Good", "description": "Most features work" }
        ]
      }
    ],
    "estimatedHours": 10
  }
]
```

---

## ID Naming Conventions

| Component | Format | Example |
|-----------|--------|---------|
| Subject | `{code}` (lowercase) | `cs101`, `math201` |
| Topic | `{subject}-topic-{N}` | `cs101-topic-1` |
| Subtopic | `{subject}-t{N}-{slug}` | `cs101-t1-intro` |
| Exercise | `{subject}-t{N}-ex{NN}` | `cs101-t1-ex01` |
| Quiz | `{subject}-quiz-{N}{a\|b\|c}` | `cs101-quiz-1a` |
| Exam | `{subject}-exam-{type}` | `cs101-exam-midterm` |
| Project | `{subject}-project-{N}` | `cs103-project-1` |
| Reading | `{subject}-t{N}-reading-{N}` | `cs201-t3-reading-1` |

**Important:** IDs must never change once published (user progress is tracked by ID).

---

## Subtopic File Naming

```
src/subjects/[subject]/content/topic-N/
├── 01-introduction.md
├── 02-{concept-slug}.md
├── 03-{concept-slug}.md
├── 04-{concept-slug}.md
├── 05-{concept-slug}.md
├── 06-{concept-slug}.md
└── 07-{summary-or-practices}.md
```

- Prefix with 2-digit number for ordering
- Use lowercase, hyphenated slugs
- Each file: 800-1200 words
- **Each file must have frontmatter** (id, title, order)

---

## Quality Checklist

Before marking upgrade complete:

- [ ] **subject-spec.yaml exists** with pedagogical justifications
- [ ] 7 topics with 7 subtopics each (49 total, 800+ words each)
- [ ] All subtopic markdown files have frontmatter (id, title, order)
- [ ] Visual content used where appropriate (Mermaid diagrams, function plots)
- [ ] Exercises in each `content/topic-N/exercises.json` (per spec, default 16/topic)
- [ ] Quizzes in each `content/topic-N/quizzes.json` (per spec, default 3×5 questions)
- [ ] 2 exams in exams.json (per spec, default ~30 midterm, ~45 final)
- [ ] Projects in projects.json (if required by spec)
- [ ] All IDs follow naming conventions
- [ ] topics.ts uses glob imports and buildTopicsFromGlob
- [ ] Build passes without errors (`npm run build`)
- [ ] Quality check passes (`npm run quality`) — uses spec targets
- [ ] Import validation passes (`npm run validate`)
- [ ] Subject review updated (Phase 4)

---

## Subject-Specific Notes

Each subject's `subject-spec.yaml` defines its specific requirements. Common patterns:

**Math subjects (proof-based):**
- Usually fewer exercises per topic (10-14 vs 16)
- All exercises are `written` type (proofs)
- Fewer exam questions with more depth
- Projects typically not required
- **Use function plots** to visualize functions, derivatives, integrals, and optimization

**CS programming subjects:**
- High volume of `coding_with_tests` exercises
- Projects required (2-3 per subject)
- Automated test coverage for immediate feedback

**CS theory subjects:**
- Mix of coding and written exercises
- May or may not require projects
- Focus on analysis and calculation

**Always check the subject's spec** for authoritative requirements.
