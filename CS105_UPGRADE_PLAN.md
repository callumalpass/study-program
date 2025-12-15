# CS105 Upgrade Plan: Introduction to C Programming

## Current State

- **5 topics** defined (basics, pointers, memory, structures, file I/O)
- **5 quizzes** (1 per topic, 3 questions each) → needs 3 per topic
- **~8 exercises per topic** (40 total) → needs 16 per topic
- **1 project** (Student Grade System)
- **No exams**
- **No topic markdown content**

## Special Consideration: C Code Execution

Unlike Python (Pyodide), C cannot easily run in the browser. Our approach:

### JSCPP Integration
- Add [JSCPP](https://github.com/felixhao28/JSCPP) for client-side C/C++ interpretation
- **Supports:** variables, arrays, pointers, pointer arithmetic, functions, structs, basic I/O
- **Does NOT support:** malloc/free, file I/O, multi-dimensional array initializers

### Exercise Strategy by Topic

| Topic | Interactive (JSCPP) | Written (trace/analyze) | Project |
|-------|---------------------|------------------------|---------|
| 1. C Basics | ✓ Primary | Some | - |
| 2. Pointers | Some basic | ✓ Primary | ✓ |
| 3. Memory Management | ✗ None | ✓ All | ✓ |
| 4. Structures | ✓ Primary | Some | - |
| 5. File I/O | ✗ None | ✓ All | ✓ |

### Written Exercise Types (for Topics 2, 3, 5)
- "What does this code output?" (trace execution)
- "Find the memory leak / bug"
- "Explain what's wrong and how to fix it"
- "Draw the memory layout after line X"
- "What is the value of `*ptr` after this code runs?"

---

## Upgrade Tasks

### 1. Infrastructure: Add JSCPP Support
- [ ] Install JSCPP package
- [ ] Create `runC()` function in code-runner.ts
- [ ] Add language detection to CodeEditor component
- [ ] Test with basic C programs

### 2. Topic Content (5 markdown files)
Create `src/content/subjects/cs105/topic-{1-5}.md`:
- [ ] Topic 1: C Basics and Syntax
- [ ] Topic 2: Pointers
- [ ] Topic 3: Memory Management
- [ ] Topic 4: Structures and Data Types
- [ ] Topic 5: File I/O

Each with: Introduction, Learning Objectives, Core Concepts, Common Mistakes, Best Practices, Summary

### 3. Exercises (target: 16 per topic, 80 total)

**Topic 1 - C Basics** (16 exercises, all JSCPP)
- 5 easy: variables, printf, scanf, operators
- 6 medium: control flow, functions, arrays
- 5 hard: function pointers, recursion, string manipulation

**Topic 2 - Pointers** (16 exercises, mixed)
- 4 JSCPP: basic pointer syntax, dereferencing, pointer arithmetic
- 12 Written: trace pointer values, find bugs, explain behavior

**Topic 3 - Memory Management** (16 exercises, all written)
- 5 easy: identify stack vs heap, basic malloc/free tracing
- 6 medium: find memory leaks, dangling pointers, double-free
- 5 hard: complex allocation patterns, memory layout diagrams

**Topic 4 - Structures** (16 exercises, mostly JSCPP)
- 12 JSCPP: struct definition, nested structs, arrays of structs
- 4 Written: struct memory layout, padding questions

**Topic 5 - File I/O** (16 exercises, all written)
- Trace file operations, predict output
- Error handling scenarios
- Binary vs text mode questions

### 4. Quizzes (target: 3 per topic, 15 total)

For each topic, create:
- **Quiz A**: Fundamentals (definitions, syntax)
- **Quiz B**: Application (code tracing, problem solving)
- **Quiz C**: Advanced (edge cases, debugging)

5 questions each, mix of: multiple_choice, true_false, code_output, fill_blank

### 5. Exams

**Midterm Exam** (~25 questions, 75 min)
- Covers Topics 1-3
- Heavy on pointer tracing and memory concepts
- Include "what's wrong with this code" questions
- Written explanations for memory management

**Final Exam** (~40 questions, 120 min)
- Comprehensive, all 5 topics
- More complex debugging scenarios
- Multi-step pointer/memory questions
- File I/O edge cases

### 6. Projects (target: 2-3)

Keep existing:
- [ ] Student Grade Management System (comprehensive)

Add:
- [ ] **Linked List Library** - implement from scratch, test locally with valgrind
- [ ] **Simple Memory Allocator** - custom malloc/free implementation
- [ ] *(Optional)* **File-based Database** - CRUD operations on binary file

Each project includes:
- Local setup instructions (gcc, make, valgrind)
- Milestones with checkpoints
- Testing guide
- Rubric

---

## Implementation Order

1. **JSCPP integration** - get basic C running in browser
2. **Topic 1 content + exercises** - validate JSCPP approach works
3. **Topic 2-5 content** - write all markdown
4. **Exercises for remaining topics** - prioritize written exercises
5. **Quizzes** - expand to 3 per topic
6. **Exams** - midterm then final
7. **Projects** - add 1-2 more with scaffolding

---

## Quality Checklist

- [ ] All 5 topics have comprehensive markdown content
- [ ] Each topic has 3 quizzes (15 questions per topic)
- [ ] Each topic has 16 exercises with appropriate mix of interactive/written
- [ ] JSCPP exercises have working test cases
- [ ] Written exercises have clear model answers
- [ ] Midterm and Final exams exist
- [ ] 2-3 projects with local setup instructions
- [ ] All TypeScript compiles without errors
