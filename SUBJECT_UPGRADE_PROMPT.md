# Subject Upgrade Prompt

Use this prompt to bring any subject up to the CS101 "gold standard" level.

---

## Prompt

You are upgrading the subject **[SUBJECT_ID]** in a computer science degree platform to match the quality and comprehensiveness of CS101, which serves as the gold standard.

### Reference: CS101 Standard

CS101 (Intro to Programming) has:
- **7 topics**, each broken into **5-7 subtopics** for focused, digestible content
- **Subtopics** are separate markdown files that allow progressive learning with navigation
- **3 quizzes per topic** (21 total) with 5 questions each, covering fundamentals, intermediate concepts, and advanced application
- **16 exercises per topic** (112 total) with difficulty ratings 1-5, detailed hints, test cases (including hidden ones), and complete solutions
- **2 exams**: Midterm (26 questions, 75 min) and Final (42 questions, 120 min)
- Exams include: multiple choice, code output, fill-in-blank, true/false, written explanations, and coding challenges with test cases

### Your Task

1. **Audit the current state** of [SUBJECT_ID]:
   - Read all topic files to understand current coverage
   - Check if topics use subtopics or monolithic content
   - Count existing quizzes and exercises per topic
   - Check if exams exist
   - Review any existing projects

2. **Identify gaps** compared to CS101:
   - Missing topics that should be covered
   - Topics with insufficient depth (should have subtopics)
   - Topics without subtopics that would benefit from being split
   - Insufficient quizzes (target: 3 per topic, 5 questions each)
   - Insufficient exercises (target: at least 16 per topic, difficulty 1-5)
   - Missing exams

3. **Determine assessment strategy**:

   **Subjects that should have EXAMS (retire most/all projects):**
   - **Math101** (Discrete Math I): Logic, proofs, sets, relations, functions - all exam-friendly
   - **Math102** (Discrete Math II): Combinatorics, recurrences, graph theory, number theory - exam-friendly
   - **Math203** (Calculus I): Limits, derivatives, applications - traditional exam subject
   - **CS102** (Computer Organization): Number systems, Boolean algebra, architecture concepts - exam-friendly

   **Subjects that should have EXAMS + limited projects:**
   - **CS103** (OOP): Exam for concepts (classes, inheritance, polymorphism), keep 1-2 design pattern projects
   - **CS104** (Data Structures): Exam for algorithm analysis and tracing, keep 1 implementation project
   - **CS105** (Systems Programming/C): Exam for syntax, pointers, memory concepts; keep 1-2 systems projects

4. **Upgrade the subject** following this order:

   a. **Topics with Subtopics** (see detailed section below)
   b. **Exercises** (see detailed section below)
   c. **Quizzes** (see detailed section below)
   d. **Exams** (see detailed section below)
   e. **Projects** (evaluate and potentially retire)

---

## File Structure Reference

```
src/data/subjects/[subject]/
├── index.ts           # Subject metadata, imports topics/quizzes/exercises/exams
├── topics.ts          # Topic definitions with subtopics array and quiz/exercise IDs
├── quizzes.ts         # All quizzes for the subject
├── exams.ts           # Exam definitions (create if missing)
├── projects.ts        # Projects (review and potentially reduce)
└── exercises/
    ├── index.ts       # Exports all exercises
    └── topic-N-*.ts   # Exercises for each topic

src/content/subjects/[subject]/
├── topic-1/                    # Subtopics for topic 1
│   ├── 01-introduction.md
│   ├── 02-naming-rules.md
│   └── ...
├── topic-2/                    # Subtopics for topic 2
│   └── ...
├── topic-1.md                  # Legacy: full topic content (keep as fallback)
└── topic-2.md
```

---

## Subtopics

### Subtopic Interface

```typescript
interface Subtopic {
  id: string;           // Unique ID: '[subject]-t[N]-[slug]'
  slug: string;         // URL-friendly: 'introduction', 'naming-rules'
  title: string;        // Display title: 'Introduction'
  content: string;      // Markdown content (imported from file)
  order: number;        // Sort order: 1, 2, 3...
}
```

### Subtopic File Structure

```
src/content/subjects/[subject]/topic-N/
├── 01-introduction.md
├── 02-concept-name.md
├── 03-another-concept.md
├── 04-examples.md
├── 05-advanced-topic.md
├── 06-common-patterns.md
└── 07-best-practices.md
```

### Subtopic Definition in topics.ts

```typescript
import { Topic, Subtopic } from '../../../core/types';

// Import subtopic content
import t1Introduction from '../../../content/subjects/[subject]/topic-1/01-introduction.md?raw';
import t1NamingRules from '../../../content/subjects/[subject]/topic-1/02-naming-rules.md?raw';
// ... more imports

const topic1Subtopics: Subtopic[] = [
  {
    id: '[subject]-t1-intro',
    slug: 'introduction',
    title: 'Introduction',
    content: t1Introduction,
    order: 1
  },
  {
    id: '[subject]-t1-naming',
    slug: 'naming-rules',
    title: 'Variable Naming Rules',
    content: t1NamingRules,
    order: 2
  },
  // ... more subtopics
];

// Then in the topic definition:
{
  id: '[subject]-topic-1',
  title: 'Variables and Data Types',
  content: topic1Content,       // Keep as fallback
  subtopics: topic1Subtopics,   // Add subtopics array
  quizIds: ['[subject]-t1-quiz-a', '[subject]-t1-quiz-b', '[subject]-t1-quiz-c'],
  exerciseIds: ['[subject]-t1-ex-1', ...],
}
```

### Subtopic Naming Conventions

- **Files**: `NN-slug-name.md` (e.g., `01-introduction.md`, `02-naming-rules.md`)
- **IDs**: `[subject]-t[topic]-[slug]` (e.g., `cs101-t1-intro`, `math101-t3-operations`)
- **Slugs**: lowercase, hyphenated, descriptive (e.g., `introduction`, `naming-rules`)

### Subtopic Content Guidelines

Each subtopic markdown file should have:
- Clear heading and introduction
- Core concept explanation with examples
- Code examples (where applicable)
- Key takeaways or summary points
- Roughly **1000 words** per subtopic

**Example subtopic breakdown** (CS101 Topic 1: Variables and Data Types):
1. Introduction (what are variables, why they matter)
2. Variable Naming Rules (conventions, valid names)
3. Integers & Floats (numeric types)
4. Strings (text data, methods)
5. Booleans (true/false, comparisons)
6. Type Conversion (casting between types)
7. Patterns & Best Practices (common idioms, mistakes)

---

## Exercises

### Exercise Interfaces

**Coding Exercise** (for programming subjects):

```typescript
interface CodingExercise {
  id: string;                    // Unique ID: '[subject]-t[N]-ex[NN]'
  subjectId: string;             // e.g., 'cs101'
  topicId: string;               // e.g., 'cs101-topic-1'
  title: string;                 // Display title
  description: string;           // Problem description (supports markdown)
  difficulty?: 1 | 2 | 3 | 4 | 5; // 1=easiest, 5=hardest
  starterCode: string;           // Initial code shown to student
  testCases: TestCase[];         // Array of test cases
  hints: string[];               // Array of progressive hints
  solution: string;              // Complete working solution
  language: ProgrammingLanguage; // 'python', 'javascript', 'c', etc.
}

interface TestCase {
  input: string;          // Input to pass to function/program
  expectedOutput?: string; // Optional - generated from solution if not provided
  isHidden: boolean;       // Hidden tests not shown to student
  description: string;     // What this test case checks
}
```

**Written Exercise** (for math/theory subjects):

```typescript
interface WrittenExercise {
  id: string;
  subjectId: string;
  topicId: string;
  type: 'written';               // Discriminator
  title: string;
  description: string;           // Problem statement
  difficulty?: 1 | 2 | 3 | 4 | 5;
  hints: string[];
  solution: string;              // Model answer/proof
}
```

### Exercise File Structure

```
src/data/subjects/[subject]/exercises/
├── index.ts              # Exports all exercises
├── topic-1-variables.ts  # Exercises for topic 1
├── topic-2-control.ts    # Exercises for topic 2
└── ...
```

### Exercise File Example

```typescript
// src/data/subjects/cs101/exercises/topic-1-variables.ts
import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs101-t1-ex01',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Temperature Converter',
    difficulty: 2,
    description: 'Create a function that converts temperature from Celsius to Fahrenheit.\n\nThe formula is: F = (C × 9/5) + 32',
    starterCode: `def celsius_to_fahrenheit(celsius):
    # Your code here
    pass

# Test your function
print(celsius_to_fahrenheit(0))
print(celsius_to_fahrenheit(100))`,
    solution: `def celsius_to_fahrenheit(celsius):
    fahrenheit = (celsius * 9/5) + 32
    return fahrenheit

print(celsius_to_fahrenheit(0))
print(celsius_to_fahrenheit(100))`,
    testCases: [
      {
        input: '0',
        isHidden: false,
        description: 'Freezing point of water'
      },
      {
        input: '100',
        isHidden: false,
        description: 'Boiling point of water'
      },
      {
        input: '37',
        isHidden: true,
        description: 'Normal body temperature'
      }
    ],
    hints: [
      'Remember the formula: F = (C × 9/5) + 32',
      'Use parentheses to ensure correct order of operations',
      'Return the calculated fahrenheit value'
    ],
    language: 'python'
  },
  // ... more exercises
];
```

### Exercise Index File

```typescript
// src/data/subjects/cs101/exercises/index.ts
import { topic1Exercises } from './topic-1-variables';
import { topic2Exercises } from './topic-2-control';
// ... more imports

export const cs101Exercises = [
  ...topic1Exercises,
  ...topic2Exercises,
  // ... more topics
];
```

### Exercise Guidelines

**Target: At least 16 exercises per topic**

**Difficulty distribution:**
- **Difficulty 1-2**: 4-5 exercises (fundamentals, basic application)
- **Difficulty 3**: 5-6 exercises (intermediate, combining concepts)
- **Difficulty 4-5**: 5-6 exercises (challenging, edge cases, optimization)

**Test case guidelines:**
- Include 2-4 visible test cases with clear descriptions
- Include 1-3 hidden test cases for edge cases
- Test cases should cover: normal cases, edge cases, boundary values

**Hint guidelines:**
- Provide 2-4 progressive hints
- First hint: general direction
- Middle hints: specific technique or approach
- Final hint: nearly gives away the answer (for struggling students)

### Exercise ID Conventions

- Format: `[subject]-t[topic]-ex[number]` or `[subject]-t[topic]-drill-[number]`
- Examples: `cs101-t1-ex01`, `math101-t3-ex05`, `cs101-t2-drill-1`
- Keep IDs stable (don't change once published) to preserve user progress

---

## Quizzes

### Quiz Interface

```typescript
interface Quiz {
  id: string;              // Unique ID: '[subject]-quiz-[N][letter]'
  subjectId: string;       // e.g., 'cs101'
  topicId: string;         // e.g., 'cs101-topic-1'
  title: string;           // Display title
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;                       // Unique within quiz: 'q1', 'q2', etc.
  type: QuestionType;               // Question type (see below)
  prompt: string;                   // The question text
  options?: string[];               // For multiple_choice only
  correctAnswer: string | number | boolean;
  explanation: string;              // Shown after answering
  codeSnippet?: string;             // For code_output questions

  // For coding questions in quizzes (rare):
  starterCode?: string;
  testCases?: TestCase[];
  language?: ProgrammingLanguage;
  solution?: string;

  // For written questions:
  modelAnswer?: string;             // For AI evaluation
}

type QuestionType =
  | 'multiple_choice'  // Select one from options (correctAnswer is index)
  | 'true_false'       // True or false (correctAnswer is boolean)
  | 'fill_blank'       // Type the answer (correctAnswer is string)
  | 'code_output'      // Predict what code prints (correctAnswer is string)
  | 'written'          // Free-form text (AI graded)
  | 'coding';          // Write code (test cases)
```

### Quiz File Structure

All quizzes for a subject are in a single file:

```
src/data/subjects/[subject]/quizzes.ts
```

### Quiz File Example

```typescript
// src/data/subjects/cs101/quizzes.ts
import { Quiz } from '../../../core/types';

export const cs101Quizzes: Quiz[] = [
  // ============================================================
  // TOPIC 1: Variables and Data Types (3 quizzes)
  // ============================================================
  {
    id: 'cs101-quiz-1a',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Variables and Data Types - Fundamentals',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Which of the following is NOT a valid Python data type?',
        options: ['int', 'float', 'char', 'str'],
        correctAnswer: 2,  // Index of 'char'
        explanation: 'Python does not have a "char" type. Single characters are strings of length 1.'
      },
      {
        id: 'q2',
        type: 'code_output',
        prompt: 'What will this code print?',
        codeSnippet: 'x = 5\ny = 2\nprint(x / y)',
        correctAnswer: '2.5',
        explanation: 'The / operator performs floating-point division.'
      },
      {
        id: 'q3',
        type: 'true_false',
        prompt: 'In Python, you must declare the type of a variable before using it.',
        correctAnswer: false,
        explanation: 'Python is dynamically typed. Types are inferred at runtime.'
      },
      {
        id: 'q4',
        type: 'fill_blank',
        prompt: 'To convert the string "42" to an integer, use the ____ function.',
        correctAnswer: 'int',
        explanation: 'The int() function converts strings to integers.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the result of 10 % 3?',
        options: ['3', '1', '3.33', '0'],
        correctAnswer: 1,  // Index of '1'
        explanation: 'The % operator returns the remainder. 10 ÷ 3 = 3 remainder 1.'
      }
    ]
  },
  {
    id: 'cs101-quiz-1b',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Variables and Data Types - Application',
    questions: [
      // ... 5 more questions focusing on application
    ]
  },
  {
    id: 'cs101-quiz-1c',
    subjectId: 'cs101',
    topicId: 'cs101-topic-1',
    title: 'Variables and Data Types - Advanced',
    questions: [
      // ... 5 more questions focusing on edge cases and deeper understanding
    ]
  },
  // ... more topics
];
```

### Quiz Guidelines

**Target: 3 quizzes per topic, 5 questions each (15 questions per topic)**

**Quiz progression:**
- **Quiz A (Fundamentals)**: Definitions, basic concepts, terminology
- **Quiz B (Application)**: Code tracing, problem solving, using concepts
- **Quiz C (Advanced)**: Edge cases, gotchas, deeper understanding

**Question type distribution per quiz:**
- 2-3 multiple_choice questions
- 1-2 code_output questions (for programming subjects)
- 1 true_false question
- 0-1 fill_blank questions

**Answer guidelines:**
- `multiple_choice`: correctAnswer is the **0-based index** of the correct option
- `true_false`: correctAnswer is boolean (`true` or `false`)
- `fill_blank`: correctAnswer is a string (case-insensitive matching recommended)
- `code_output`: correctAnswer is the exact string output (including newlines)
- `written`: Use modelAnswer for AI evaluation reference

### Quiz ID Conventions

- Format: `[subject]-quiz-[topic][letter]`
- Examples: `cs101-quiz-1a`, `cs101-quiz-1b`, `cs101-quiz-1c`
- Or: `math101-quiz-3a`, `math101-quiz-3b`, `math101-quiz-3c`

---

## Exams

### Exam Interface

```typescript
interface Exam {
  id: string;                    // Unique ID: '[subject]-exam-[type]'
  subjectId: string;             // e.g., 'cs101'
  topicId?: string;              // Optional - for topic-specific exams
  title: string;                 // e.g., 'CS101 Midterm'
  durationMinutes?: number;      // Time limit (e.g., 75, 120)
  instructions?: string[];       // Array of instruction strings
  questions: QuizQuestion[];     // Same structure as quiz questions
}
```

### Exam File Structure

```
src/data/subjects/[subject]/exams.ts
```

### Exam File Example

```typescript
// src/data/subjects/cs101/exams.ts
import type { Exam } from '@/core/types';

export const cs101Exams: Exam[] = [
  {
    id: 'cs101-exam-midterm',
    subjectId: 'cs101',
    title: 'CS101 Midterm Examination',
    durationMinutes: 75,
    instructions: [
      'This exam covers Topics 1-4.',
      'Answer all questions. Passing score is 70%.',
      'For code output questions, include all output exactly as printed.',
      'For fill-in-blank questions, answers are case-insensitive.',
    ],
    questions: [
      // === SECTION: Variables and Data Types (6 questions) ===
      {
        id: 'mid-q1',
        type: 'multiple_choice',
        prompt: 'Which of the following is a valid variable name in Python?',
        options: ['2nd_place', 'my-variable', 'first_name', 'class'],
        correctAnswer: 2,
        explanation: 'Variable names cannot start with numbers, contain hyphens, or be reserved keywords.'
      },
      {
        id: 'mid-q2',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `x = 10
y = 3
print(x // y)
print(x % y)`,
        correctAnswer: '3\n1',
        explanation: '// is integer division (3), % is modulo/remainder (1).'
      },
      {
        id: 'mid-q3',
        type: 'true_false',
        prompt: 'Strings in Python are immutable.',
        correctAnswer: true,
        explanation: 'Strings cannot be modified after creation; operations create new strings.'
      },
      {
        id: 'mid-q4',
        type: 'fill_blank',
        prompt: 'To convert the integer 42 to a string, use the ____ function.',
        correctAnswer: 'str',
        explanation: 'The str() function converts values to strings.'
      },
      {
        id: 'mid-q5',
        type: 'written',
        prompt: 'Explain the difference between == and = in Python. Give an example of each.',
        correctAnswer: '= is assignment, == is comparison',
        modelAnswer: '= is the assignment operator, used to assign values to variables (e.g., x = 5). == is the equality comparison operator, used to check if two values are equal (e.g., x == 5 returns True if x is 5). Assignment modifies state; comparison returns a boolean.',
        explanation: 'Understanding the difference prevents common bugs like using = in conditions.'
      },
      {
        id: 'mid-q6',
        type: 'coding',
        prompt: 'Write a function `is_even(n)` that returns True if n is even, False otherwise.',
        starterCode: 'def is_even(n):\n    pass',
        solution: 'def is_even(n):\n    return n % 2 == 0',
        testCases: [
          { input: '4', isHidden: false, description: 'Even number' },
          { input: '7', isHidden: false, description: 'Odd number' },
          { input: '0', isHidden: true, description: 'Zero (edge case)' },
          { input: '-2', isHidden: true, description: 'Negative even' }
        ],
        language: 'python',
        explanation: 'Use modulo (%) to check divisibility by 2.'
      },

      // === SECTION: Control Flow (6 questions) ===
      // ... more questions

      // === SECTION: Functions (6 questions) ===
      // ... more questions

      // === SECTION: Data Structures (6 questions) ===
      // ... more questions
    ]
  },
  {
    id: 'cs101-exam-final',
    subjectId: 'cs101',
    title: 'CS101 Final Examination',
    durationMinutes: 120,
    instructions: [
      'This exam is comprehensive, covering all topics.',
      'Answer all questions. Passing score is 70%.',
      'Manage your time carefully.',
    ],
    questions: [
      // ~40-45 questions covering all topics
    ]
  }
];
```

### Exam Guidelines

**Standard exam structure:**
- **Midterm**: ~25-30 questions, 60-75 minutes, covers first half of topics
- **Final**: ~40-45 questions, 90-120 minutes, comprehensive

**Question type distribution:**
- 40-50% `multiple_choice` (conceptual understanding)
- 20-25% `code_output` (tracing, prediction)
- 10-15% `fill_blank` (terminology, syntax)
- 5-10% `true_false` (common misconceptions)
- 5-10% `written` (explanations, comparisons)
- 5-10% `coding` (implementation, with test cases)

**Topic coverage:**
- Distribute questions proportionally across topics
- Midterm: ~6-8 questions per topic covered
- Final: ~6 questions per topic (all topics)

**Question quality:**
- Include "find the bug" or debugging questions
- Test common misconceptions
- Include edge cases
- Vary difficulty within the exam

### Exam ID Conventions

- Format: `[subject]-exam-[type]`
- Examples: `cs101-exam-midterm`, `cs101-exam-final`, `math101-exam-midterm`

---

## Quality Checklist

### Subtopics
- [ ] All topics have 5-7 subtopics
- [ ] Subtopic files are in `src/content/subjects/[subject]/topic-N/` directories
- [ ] Subtopics are imported and defined in `topics.ts`
- [ ] Subtopic slugs are URL-friendly (lowercase, hyphenated)
- [ ] Each subtopic is ~1000 words

### Exercises
- [ ] Each topic has at least 16 exercises
- [ ] Exercises span difficulty levels 1-5
- [ ] Each exercise has 2-4 visible test cases + 1-3 hidden test cases
- [ ] Each exercise has 2-4 progressive hints
- [ ] All exercises have complete working solutions
- [ ] Exercise IDs follow naming conventions

### Quizzes
- [ ] Each topic has 3 quizzes (A, B, C)
- [ ] Each quiz has exactly 5 questions
- [ ] Quizzes progress from fundamentals → application → advanced
- [ ] All questions have clear explanations
- [ ] Question types are varied

### Exams
- [ ] Midterm exam exists (if applicable for subject)
- [ ] Final exam exists (if applicable for subject)
- [ ] Exam questions cover all relevant topics proportionally
- [ ] Exam has variety of question types
- [ ] Coding questions have test cases (including hidden)
- [ ] Written questions have model answers for AI grading
- [ ] Duration is specified

### General
- [ ] All TypeScript types are correct
- [ ] IDs follow naming conventions and are stable
- [ ] Subject index.ts exports all content correctly

---

## Subject-Specific Notes

**For Math subjects (Math101, Math102, Math203):**
- Exercises may be proof-based or calculation-based rather than coding
- Use `WrittenExercise` type for non-coding problems
- Quizzes should test definitions, theorem application, and problem-solving
- Exams should include proof writing (`written` type questions)
- Subtopics work well for breaking down complex proofs or theorem progressions

**For CS102 (Computer Organization):**
- Exercises involve number conversions, Boolean expressions, circuit analysis
- Exams should test binary arithmetic, data representation, Boolean algebra
- Include "what is the output" style questions for assembly-like concepts

**For CS103 (OOP):**
- Balance conceptual questions with code examples
- Include UML or design-related questions
- Keep 1-2 projects for practical design pattern implementation

**For CS104 (Data Structures):**
- Heavy emphasis on algorithm tracing and complexity analysis
- Include "what does this code output" for recursive/iterative algorithms
- Keep 1 implementation project

**For CS105 (C Programming):**
- Focus on pointer arithmetic, memory management, common pitfalls
- Include "what's wrong with this code" debugging questions
- Keep 1-2 projects for practical systems programming
