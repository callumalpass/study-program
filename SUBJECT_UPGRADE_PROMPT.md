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

   a. **Topics with Subtopics**: Break each topic into 5-7 focused subtopics:
      - Each subtopic should cover ONE concept thoroughly
      - Subtopics enable progressive learning and better navigation
      - Users can track progress per subtopic (view tracking)
      - Subtopics appear in a left sidebar with the main content on the right

      **Subtopic structure** (each subtopic markdown file):
      - Clear heading and introduction
      - Core concept explanation with examples
      - Code examples (where applicable)
      - Key takeaways or summary points
      - Roughly 300-800 words per subtopic (focused, not exhaustive)

      **Example subtopic breakdown** (CS101 Topic 1: Variables and Data Types):
      1. Introduction (what are variables, why they matter)
      2. Variable Naming Rules (conventions, valid names)
      3. Integers & Floats (numeric types)
      4. Strings (text data, methods)
      5. Booleans (true/false, comparisons)
      6. Type Conversion (casting between types)
      7. Patterns & Best Practices (common idioms, mistakes)

   b. **Exercises** (at least 16 per topic):
      - Difficulties 1-2: at least 4-5 exercises (fundamentals)
      - Difficulties 3: at least 5-6 exercises (intermediate)
      - Difficulties 4-5: 5-6 exercises (challenging)
      - Each exercise needs: description, starter code, solution, test cases (visible + hidden), hints

   c. **Quizzes** (3 per topic, 5 questions each):
      - Quiz A: Fundamentals (definitions, basic concepts)
      - Quiz B: Application (code tracing, problem solving)
      - Quiz C: Advanced (edge cases, deeper understanding)
      - Question types: multiple_choice, true_false, code_output, fill_blank

   d. **Exams** (if applicable for this subject):
      - **Midterm**: ~25-30 questions (calibrate for subject), 60-75 minutes, covers first half of topics
      - **Final**: ~40-45 questions (calibrate for subject), 90-180 minutes, comprehensive
      - Include mix of question types:
        - multiple_choice (conceptual understanding)
        - code_output (tracing/prediction)
        - fill_blank (syntax/terminology)
        - true_false (common misconceptions)
        - **written** (explain concepts, compare approaches, write proofs)
        - coding (with test cases, for programming subjects)
      - Include "find the bug" or debugging questions where appropriate
      - Add hidden test cases to coding questions

   e. **Projects** (evaluate and potentially retire):
      - Review existing projects
      - For math subjects: retire all projects in favor of exams
      - For CS subjects: keep only 1-2 high-value projects that test practical skills not covered by exams
      - Ensure remaining projects have scaffolding, milestones, and clear rubrics

### File Structure Reference

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
│   ├── 03-integers-floats.md
│   ├── 04-strings.md
│   ├── 05-booleans.md
│   ├── 06-type-conversion.md
│   └── 07-patterns-best-practices.md
├── topic-2/                    # Subtopics for topic 2
│   ├── 01-introduction.md
│   └── ...
├── topic-1.md                  # Legacy: full topic content (keep as fallback)
└── topic-2.md
```

### Subtopic Data Structure

In `topics.ts`, topics with subtopics are defined like this:

```typescript
import type { Subtopic } from '@/core/types';

// Import subtopic content
import t1Introduction from '../../../content/subjects/[subject]/topic-1/01-introduction.md?raw';
import t1NamingRules from '../../../content/subjects/[subject]/topic-1/02-naming-rules.md?raw';
// ... etc

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
  content: topic1Content,  // Keep as fallback
  subtopics: topic1Subtopics,  // Add subtopics array
  quizIds: ['[subject]-t1-quiz-a', '[subject]-t1-quiz-b', '[subject]-t1-quiz-c'],
  exerciseIds: ['[subject]-t1-ex-1', ...],
}
```

### Subtopic Interface

```typescript
interface Subtopic {
  id: string;           // Unique ID: '[subject]-t[N]-[slug]'
  slug: string;         // URL-friendly: 'introduction', 'naming-rules'
  title: string;        // Display title: 'Introduction'
  content: string;      // Markdown content
  order: number;        // Sort order: 1, 2, 3...
}
```

### Quality Checklist

- [ ] All topics have comprehensive, well-structured content
- [ ] **Topics are broken into 5-7 subtopics each**
- [ ] **Subtopic files are in `src/content/subjects/[subject]/topic-N/` directories**
- [ ] **Subtopics are imported and defined in `topics.ts`**
- [ ] Each topic has 3 quizzes (15 questions total per topic)
- [ ] Each topic has 16 exercises across difficulty levels
- [ ] Exercise test cases include hidden cases
- [ ] Exercise hints guide without giving away solutions
- [ ] Exams exist with appropriate length and question variety
- [ ] Exam questions cover all topics proportionally
- [ ] Exam coding questions have test cases
- [ ] Existing projects reviewed; unnecessary ones retired
- [ ] All TypeScript types are correct
- [ ] Topic/quiz/exercise IDs follow naming conventions
- [ ] **Subtopic slugs are URL-friendly (lowercase, hyphenated)**

### Subject-Specific Notes

**For Math subjects (Math101, Math102, Math203):**
- Exercises may be proof-based or calculation-based rather than coding
- Quizzes should test definitions, theorem application, and problem-solving
- Exams should include proof writing or structured problem solving
- Consider "written" type questions for proofs
- Subtopics work well for breaking down complex proofs or theorem progressions

**For CS102 (Computer Organization):**
- Exercises involve number conversions, Boolean expressions, circuit analysis
- Exams should test binary arithmetic, data representation, Boolean algebra
- Include "what is the output" style questions for assembly-like concepts
- Subtopics can separate: theory → examples → practice problems

**For CS103 (OOP):**
- Balance conceptual questions with code examples
- Include UML or design-related questions
- Keep 1-2 projects for practical design pattern implementation
- Subtopics can cover: concept intro → syntax → examples → patterns → pitfalls

**For CS104 (Data Structures):**
- Heavy emphasis on algorithm tracing and complexity analysis
- Include "what does this code output" for recursive/iterative algorithms
- Keep 1 implementation project (e.g., hash map or tree implementation)
- Subtopics can cover: concept → implementation → analysis → variations

**For CS105 (C Programming):**
- Focus on pointer arithmetic, memory management, common pitfalls
- Include "what's wrong with this code" debugging questions
- Keep 1-2 projects for practical systems programming
- Subtopics can separate: syntax → memory model → common patterns → debugging

### Subtopic Guidelines

**When to use subtopics:**
- Topic content exceeds ~1500 words
- Topic covers multiple distinct concepts
- Users would benefit from focused, bite-sized learning
- Content has natural breakpoints (e.g., intro → details → examples → summary)

**How to split a topic:**
1. Identify 5-7 distinct concepts within the topic
2. Each subtopic should be self-contained but build on previous ones
3. First subtopic: Introduction/overview
4. Middle subtopics: Core concepts (one per subtopic)
5. Last subtopic: Summary, best practices, or advanced patterns

**Subtopic naming conventions:**
- Files: `NN-slug-name.md` (e.g., `01-introduction.md`, `02-naming-rules.md`)
- IDs: `[subject]-t[topic]-[slug]` (e.g., `cs101-t1-intro`, `cs101-t1-naming`)
- Slugs: lowercase, hyphenated, descriptive (e.g., `introduction`, `naming-rules`)
