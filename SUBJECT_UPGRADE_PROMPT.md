# Subject Upgrade Prompt

Use this prompt to bring any subject up to the CS101 "gold standard" level.

---

## Prompt

You are upgrading the subject **[SUBJECT_ID]** in a computer science degree platform to match the quality and comprehensiveness of CS101, which serves as the gold standard.

### Reference: CS101 Standard

CS101 (Intro to Programming) has:
- **7 topics** with comprehensive markdown content in separate files (`topic-1.md` through `topic-7.md`)
- **3 quizzes per topic** (21 total) with 5 questions each, covering fundamentals, intermediate concepts, and advanced application
- **16 exercises per topic** (112 total) with difficulty ratings 1-5, detailed hints, test cases (including hidden ones), and complete solutions
- **2 exams**: Midterm (26 questions, 75 min) and Final (42 questions, 120 min)
- Exams include: multiple choice, code output, fill-in-blank, true/false, written explanations, and coding challenges with test cases
- Each topic file follows a consistent structure: Introduction, Learning Objectives, Core Concepts, Common Mistakes, Best Practices, Summary

### Your Task

1. **Audit the current state** of [SUBJECT_ID]:
   - Read all topic files to understand current coverage
   - Count existing quizzes and exercises per topic
   - Check if exams exist
   - Review any existing projects

2. **Identify gaps** compared to CS101:
   - Missing topics that should be covered
   - Topics with insufficient depth
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

   a. **Topics**: Ensure each topic has comprehensive markdown content with:
      - Clear introduction and learning objectives
      - Core concepts with code examples (where applicable)
      - Common mistakes and how to avoid them
      - Best practices
      - Summary

   b. **Exercises** ( at least 16 per topic):
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
├── topics.ts          # Topic definitions with content imports and quiz/exercise IDs
├── quizzes.ts         # All quizzes for the subject
├── exams.ts           # Exam definitions (create if missing)
├── projects.ts        # Projects (review and potentially reduce)
└── exercises/
    ├── index.ts       # Exports all exercises
    └── topic-N-*.ts   # Exercises for each topic

src/content/subjects/[subject]/
├── topic-1.md         # Topic content (if not inline in topics.ts)
├── topic-2.md
└── ...
```

### Quality Checklist

- [ ] All topics have comprehensive, well-structured content
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

### Subject-Specific Notes

**For Math subjects (Math101, Math102, Math203):**
- Exercises may be proof-based or calculation-based rather than coding
- Quizzes should test definitions, theorem application, and problem-solving
- Exams should include proof writing or structured problem solving
- Consider "written" type questions for proofs

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
- Keep 1 implementation project (e.g., hash map or tree implementation)

**For CS105 (C Programming):**
- Focus on pointer arithmetic, memory management, common pitfalls
- Include "what's wrong with this code" debugging questions
- Keep 1-2 projects for practical systems programming

