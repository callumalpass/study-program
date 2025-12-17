# Subject Upgrade Prompt

Use this prompt to bring any subject up to the quality standard defined in `docs/standards/SUBJECT_STANDARD.md`.

---

## Prompt

You are upgrading the subject **[SUBJECT_ID]** to meet the production-ready quality standard.

**Reference Documents:**
- Quality Standard: `docs/standards/SUBJECT_STANDARD.md`
- Type Definitions: `src/core/types.ts`

---

## Phase 1: Audit Current State

Audit the current state of [SUBJECT_ID]:

1. **Topics**: Count topics in `src/data/subjects/[subject]/topics.ts`
2. **Subtopics**: Check each topic for subtopics array; count markdown files in `src/content/subjects/[subject]/topic-N/`
3. **Exercises**: Count exercises in `src/data/subjects/[subject]/exercises/`
4. **Quizzes**: Count quizzes and questions in `src/data/subjects/[subject]/quizzes.ts`
5. **Exams**: Check if `src/data/subjects/[subject]/exams.ts` exists with Midterm and Final
6. **Projects**: Review `src/data/subjects/[subject]/projects.ts` (CS subjects only)

---

## Phase 2: Identify Gaps

Compare against the standard requirements:

| Component | Required | Per Topic | Per Subject |
|-----------|----------|-----------|-------------|
| Topics | 7 | — | 7 |
| Subtopics | 7 per topic (800+ words each) | 7 | 49 |
| Exercises | 16 per topic (difficulty 1-5) | 16 | 112 |
| Quizzes | 3 per topic × 5 questions | 15 | 105 questions |
| Exams | Midterm (25-30 q) + Final (40-45 q) | — | 2 |
| Projects | 2-3 (CS only) | — | 2-3 or 0 |

---

## Phase 3: Implementation

Upgrade in this order:

### 3.1 Topics with Subtopics

Create/update subtopic markdown files and wire them into `topics.ts`.

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

```
src/data/subjects/[subject]/
├── index.ts           # Re-exports all subject content
├── topics.ts          # Topic definitions with subtopics
├── quizzes.ts         # All quizzes for the subject
├── exams.ts           # Midterm and Final exams
├── projects.ts        # Projects (CS subjects only)
└── exercises/
    ├── index.ts       # Aggregates and re-exports all exercises
    └── topic-N-*.ts   # Exercises for each topic

src/content/subjects/[subject]/
├── topic-1/           # Subtopics for topic 1
│   ├── 01-introduction.md
│   ├── 02-concept-name.md
│   └── ...07-*.md
├── topic-2/
│   └── ...
└── topic-N.md         # Legacy fallback content (optional)
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
// src/data/subjects/[subject]/index.ts
import { Topic, Quiz, CodingExercise, Project, Exam } from '../../../core/types';
import { [subject]Topics } from './topics';
import { [subject]Quizzes } from './quizzes';
import { [subject]Exercises } from './exercises';
import { [subject]Projects } from './projects';
import { [subject]Exams } from './exams';

export { [subject]Topics, [subject]Quizzes, [subject]Exercises, [subject]Projects, [subject]Exams };
```

### Topics with Subtopics

```typescript
// src/data/subjects/[subject]/topics.ts
import { Topic, Subtopic } from '../../../core/types';

// Import legacy content (fallback)
import topic1Content from '../../../content/subjects/[subject]/topic-1.md?raw';

// Import subtopic content
import t1Introduction from '../../../content/subjects/[subject]/topic-1/01-introduction.md?raw';
import t1Concept from '../../../content/subjects/[subject]/topic-1/02-concept-name.md?raw';
// ... more imports

const topic1Subtopics: Subtopic[] = [
  { id: '[subject]-t1-intro', slug: 'introduction', title: 'Introduction', content: t1Introduction, order: 1 },
  { id: '[subject]-t1-concept', slug: 'concept-name', title: 'Concept Name', content: t1Concept, order: 2 },
  // ... 7 subtopics total
];

export const [subject]Topics: Topic[] = [
  {
    id: '[subject]-topic-1',
    title: 'Topic Title',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['[subject]-quiz-1a', '[subject]-quiz-1b', '[subject]-quiz-1c'],
    exerciseIds: ['[subject]-t1-ex01', '[subject]-t1-ex02', /* ... 16 total */],
  },
  // ... 7 topics total
];
```

### Exercises

```typescript
// src/data/subjects/[subject]/exercises/index.ts
import { CodingExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-name';
import { topic2Exercises } from './topic-2-name';
// ... all 7 topics

export const [subject]Exercises: CodingExercise[] = [
  ...topic1Exercises,
  ...topic2Exercises,
  // ... all topics
];

export { topic1Exercises, topic2Exercises, /* ... */ };
```

```typescript
// src/data/subjects/[subject]/exercises/topic-1-name.ts
import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: '[subject]-t1-ex01',
    subjectId: '[subject]',
    topicId: '[subject]-topic-1',
    title: 'Exercise Title',
    difficulty: 1,
    description: 'Problem description...',
    starterCode: '# Your code here\n',
    solution: '# Complete solution\n',
    testCases: [
      { input: '...', isHidden: false, description: 'Basic case' },
      { input: '...', isHidden: true, description: 'Edge case' },
    ],
    hints: [
      'First hint (general direction)',
      'Second hint (specific approach)',
      'Third hint (near-solution)',
    ],
    language: 'python',
  },
  // ... 16 exercises total
];
```

### Quizzes

```typescript
// src/data/subjects/[subject]/quizzes.ts
import { Quiz } from '../../../core/types';

export const [subject]Quizzes: Quiz[] = [
  // Topic 1 - Quiz A (Fundamentals)
  {
    id: '[subject]-quiz-1a',
    subjectId: '[subject]',
    topicId: '[subject]-topic-1',
    title: 'Topic 1 - Fundamentals',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Question text?',
        options: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,  // 0-based index
        explanation: 'Explanation of why A is correct.',
      },
      // ... 5 questions total
    ],
  },
  // Topic 1 - Quiz B (Application)
  // Topic 1 - Quiz C (Mastery)
  // ... 3 quizzes × 7 topics = 21 quizzes
];
```

### Exams

```typescript
// src/data/subjects/[subject]/exams.ts
import { Exam } from '../../../core/types';

export const [subject]Exams: Exam[] = [
  {
    id: '[subject]-exam-midterm',
    subjectId: '[subject]',
    title: '[SUBJECT] Midterm Examination',
    durationMinutes: 75,
    instructions: [
      'This exam covers Topics 1-4.',
      'Answer all questions. Passing score is 70%.',
      'For code output questions, include exact output.',
    ],
    questions: [
      // 25-30 questions covering topics 1-4
    ],
  },
  {
    id: '[subject]-exam-final',
    subjectId: '[subject]',
    title: '[SUBJECT] Final Examination',
    durationMinutes: 120,
    instructions: [
      'This exam is comprehensive, covering all topics.',
      'Answer all questions. Passing score is 70%.',
    ],
    questions: [
      // 40-45 questions covering all topics
    ],
  },
];
```

### Projects (CS subjects only)

```typescript
// src/data/subjects/[subject]/projects.ts
import { Project } from '../../../core/types';

export const [subject]Projects: Project[] = [
  {
    id: '[subject]-project-1',
    subjectId: '[subject]',
    title: 'Project Title',
    description: 'Full project description (500+ words)...',
    requirements: [
      'Requirement 1',
      'Requirement 2',
      // ... 8-12 requirements
    ],
    rubric: [
      {
        name: 'Functionality',
        weight: 40,
        levels: [
          { score: 4, label: 'Excellent', description: 'All features work correctly' },
          { score: 3, label: 'Good', description: 'Most features work' },
          { score: 2, label: 'Satisfactory', description: 'Core features work' },
          { score: 1, label: 'Needs Improvement', description: 'Major issues' },
        ],
      },
      // ... 4-5 criteria (weights must sum to 100%)
    ],
    estimatedHours: 10,
    scaffolding: {
      overview: 'Project overview...',
      gettingStarted: ['Step 1', 'Step 2'],
      milestones: ['Milestone 1', 'Milestone 2'],
      tips: ['Tip 1', 'Tip 2'],
    },
  },
];
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
src/content/subjects/[subject]/topic-N/
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

---

## Quality Checklist

Before marking upgrade complete:

- [ ] 7 topics with 7 subtopics each (49 total, 800+ words each)
- [ ] 112 exercises (16 per topic, difficulty 1-5 distribution)
- [ ] 21 quizzes (3 per topic, 5 questions each)
- [ ] 2 exams (Midterm: 25-30q, Final: 40-45q)
- [ ] 2-3 projects with rubrics (CS only)
- [ ] All IDs follow naming conventions
- [ ] All imports/exports correctly wired
- [ ] Subject index.ts exports all content
- [ ] TypeScript compiles without errors
- [ ] Subject review updated (Phase 4)

---

## Subject-Specific Notes

**Math subjects (math1xx, math2xx, math3xx, math4xx):**
- No projects required
- Use `WrittenExercise` type for proof/calculation exercises
- Exams should include proof writing (`written` type questions)

**CS theory subjects (cs102 Computer Organization):**
- No projects required
- Focus on calculation and analysis exercises

**CS programming subjects:**
- 2-3 projects required
- Use `CodingExercise` type
- Projects should integrate multiple topics
