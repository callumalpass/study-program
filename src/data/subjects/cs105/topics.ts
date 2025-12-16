import { Topic, Subtopic } from '../../../core/types';

// Topic 1 subtopic imports
import t1Introduction from '../../../content/subjects/cs105/topic-1/01-introduction.md?raw';
import t1VariablesTypes from '../../../content/subjects/cs105/topic-1/02-variables-and-types.md?raw';
import t1Operators from '../../../content/subjects/cs105/topic-1/03-operators.md?raw';
import t1ControlFlow from '../../../content/subjects/cs105/topic-1/04-control-flow.md?raw';
import t1Loops from '../../../content/subjects/cs105/topic-1/05-loops.md?raw';
import t1Functions from '../../../content/subjects/cs105/topic-1/06-functions.md?raw';
import t1ArraysStrings from '../../../content/subjects/cs105/topic-1/07-arrays-strings.md?raw';

// Topic 2 subtopic imports
import t2PointerBasics from '../../../content/subjects/cs105/topic-2/01-pointer-basics.md?raw';
import t2PointerArithmetic from '../../../content/subjects/cs105/topic-2/02-pointer-arithmetic.md?raw';
import t2PointersFunctions from '../../../content/subjects/cs105/topic-2/03-pointers-functions.md?raw';
import t2PointerPitfalls from '../../../content/subjects/cs105/topic-2/04-pointer-pitfalls.md?raw';
import t2DoublePointers from '../../../content/subjects/cs105/topic-2/05-double-pointers.md?raw';
import t2FunctionPointers from '../../../content/subjects/cs105/topic-2/06-function-pointers.md?raw';

// Topic 3 subtopic imports
import t3StackVsHeap from '../../../content/subjects/cs105/topic-3/01-stack-vs-heap.md?raw';
import t3MallocFree from '../../../content/subjects/cs105/topic-3/02-malloc-free.md?raw';
import t3CallocRealloc from '../../../content/subjects/cs105/topic-3/03-calloc-realloc.md?raw';
import t3MemoryDebugging from '../../../content/subjects/cs105/topic-3/04-memory-debugging.md?raw';
import t3CommonErrors from '../../../content/subjects/cs105/topic-3/05-common-errors.md?raw';

// Topic 4 subtopic imports
import t4DefiningStructures from '../../../content/subjects/cs105/topic-4/01-defining-structures.md?raw';
import t4StructsFunctions from '../../../content/subjects/cs105/topic-4/02-structs-and-functions.md?raw';
import t4NestedStructures from '../../../content/subjects/cs105/topic-4/03-nested-structures.md?raw';
import t4MemoryLayout from '../../../content/subjects/cs105/topic-4/04-memory-layout.md?raw';

// Topic 5 subtopic imports
import t5FileBasics from '../../../content/subjects/cs105/topic-5/01-file-basics.md?raw';
import t5BinaryFiles from '../../../content/subjects/cs105/topic-5/02-binary-files.md?raw';
import t5ErrorHandling from '../../../content/subjects/cs105/topic-5/03-error-handling.md?raw';

// Topic 1 Subtopics
const topic1Subtopics: Subtopic[] = [
  {
    id: 'cs105-t1-intro',
    slug: 'introduction',
    title: 'Introduction to C Programming',
    content: t1Introduction,
    order: 1
  },
  {
    id: 'cs105-t1-variables',
    slug: 'variables-and-types',
    title: 'Variables and Data Types',
    content: t1VariablesTypes,
    order: 2
  },
  {
    id: 'cs105-t1-operators',
    slug: 'operators',
    title: 'Operators and Expressions',
    content: t1Operators,
    order: 3
  },
  {
    id: 'cs105-t1-control-flow',
    slug: 'control-flow',
    title: 'Control Flow Statements',
    content: t1ControlFlow,
    order: 4
  },
  {
    id: 'cs105-t1-loops',
    slug: 'loops',
    title: 'Loops',
    content: t1Loops,
    order: 5
  },
  {
    id: 'cs105-t1-functions',
    slug: 'functions',
    title: 'Functions',
    content: t1Functions,
    order: 6
  },
  {
    id: 'cs105-t1-arrays-strings',
    slug: 'arrays-strings',
    title: 'Arrays and Strings',
    content: t1ArraysStrings,
    order: 7
  }
];

// Topic 2 Subtopics
const topic2Subtopics: Subtopic[] = [
  {
    id: 'cs105-t2-basics',
    slug: 'pointer-basics',
    title: 'Understanding Pointers',
    content: t2PointerBasics,
    order: 1
  },
  {
    id: 'cs105-t2-arithmetic',
    slug: 'pointer-arithmetic',
    title: 'Pointer Arithmetic',
    content: t2PointerArithmetic,
    order: 2
  },
  {
    id: 'cs105-t2-functions',
    slug: 'pointers-functions',
    title: 'Pointers and Functions',
    content: t2PointersFunctions,
    order: 3
  },
  {
    id: 'cs105-t2-pitfalls',
    slug: 'pointer-pitfalls',
    title: 'Pointer Pitfalls and Common Bugs',
    content: t2PointerPitfalls,
    order: 4
  },
  {
    id: 'cs105-t2-double',
    slug: 'double-pointers',
    title: 'Double Pointers',
    content: t2DoublePointers,
    order: 5
  },
  {
    id: 'cs105-t2-function-ptrs',
    slug: 'function-pointers',
    title: 'Function Pointers',
    content: t2FunctionPointers,
    order: 6
  }
];

// Topic 3 Subtopics
const topic3Subtopics: Subtopic[] = [
  {
    id: 'cs105-t3-stack-heap',
    slug: 'stack-vs-heap',
    title: 'Stack vs Heap Memory',
    content: t3StackVsHeap,
    order: 1
  },
  {
    id: 'cs105-t3-malloc-free',
    slug: 'malloc-free',
    title: 'malloc and free',
    content: t3MallocFree,
    order: 2
  },
  {
    id: 'cs105-t3-calloc-realloc',
    slug: 'calloc-realloc',
    title: 'calloc and realloc',
    content: t3CallocRealloc,
    order: 3
  },
  {
    id: 'cs105-t3-debugging',
    slug: 'memory-debugging',
    title: 'Memory Debugging Tools',
    content: t3MemoryDebugging,
    order: 4
  },
  {
    id: 'cs105-t3-errors',
    slug: 'common-errors',
    title: 'Common Memory Errors',
    content: t3CommonErrors,
    order: 5
  }
];

// Topic 4 Subtopics
const topic4Subtopics: Subtopic[] = [
  {
    id: 'cs105-t4-defining',
    slug: 'defining-structures',
    title: 'Defining Structures',
    content: t4DefiningStructures,
    order: 1
  },
  {
    id: 'cs105-t4-functions',
    slug: 'structs-functions',
    title: 'Structures and Functions',
    content: t4StructsFunctions,
    order: 2
  },
  {
    id: 'cs105-t4-nested',
    slug: 'nested-structures',
    title: 'Nested and Self-Referential Structures',
    content: t4NestedStructures,
    order: 3
  },
  {
    id: 'cs105-t4-memory',
    slug: 'memory-layout',
    title: 'Memory Layout and Padding',
    content: t4MemoryLayout,
    order: 4
  }
];

// Topic 5 Subtopics
const topic5Subtopics: Subtopic[] = [
  {
    id: 'cs105-t5-basics',
    slug: 'file-basics',
    title: 'File I/O Basics',
    content: t5FileBasics,
    order: 1
  },
  {
    id: 'cs105-t5-binary',
    slug: 'binary-files',
    title: 'Binary File I/O',
    content: t5BinaryFiles,
    order: 2
  },
  {
    id: 'cs105-t5-errors',
    slug: 'error-handling',
    title: 'File I/O Error Handling',
    content: t5ErrorHandling,
    order: 3
  }
];

export const cs105Topics: Topic[] = [
  {
    id: 'cs105-topic-1',
    title: 'C Basics and Syntax',
    content: t1Introduction,
    subtopics: topic1Subtopics,
    quizIds: ['cs105-quiz-1', 'cs105-quiz-1b', 'cs105-quiz-1c'],
    exerciseIds: ['cs105-exercise-1', 'cs105-t1-ex02', 'cs105-t1-ex03', 'cs105-t1-ex04', 'cs105-t1-ex05', 'cs105-t1-ex06', 'cs105-t1-ex07', 'cs105-t1-ex08', 'cs105-t1-ex09', 'cs105-t1-ex10', 'cs105-t1-ex11', 'cs105-t1-ex12', 'cs105-t1-ex13', 'cs105-t1-ex14', 'cs105-t1-ex15', 'cs105-t1-ex16']
  },
  {
    id: 'cs105-topic-2',
    title: 'Pointers',
    content: t2PointerBasics,
    subtopics: topic2Subtopics,
    quizIds: ['cs105-quiz-2', 'cs105-quiz-2b', 'cs105-quiz-2c'],
    exerciseIds: ['cs105-exercise-2', 'cs105-t2-ex02', 'cs105-t2-ex03', 'cs105-t2-ex04', 'cs105-t2-ex05', 'cs105-t2-ex06', 'cs105-t2-ex07', 'cs105-t2-ex08', 'cs105-t2-ex09', 'cs105-t2-ex10', 'cs105-t2-ex11', 'cs105-t2-ex12', 'cs105-t2-ex13', 'cs105-t2-ex14', 'cs105-t2-ex15', 'cs105-t2-ex16']
  },
  {
    id: 'cs105-topic-3',
    title: 'Memory Management',
    content: t3StackVsHeap,
    subtopics: topic3Subtopics,
    quizIds: ['cs105-quiz-3', 'cs105-quiz-3b', 'cs105-quiz-3c'],
    exerciseIds: ['cs105-exercise-3', 'cs105-t3-ex02', 'cs105-t3-ex03', 'cs105-t3-ex04', 'cs105-t3-ex05', 'cs105-t3-ex06', 'cs105-t3-ex07', 'cs105-t3-ex08', 'cs105-t3-ex09', 'cs105-t3-ex10', 'cs105-t3-ex11', 'cs105-t3-ex12', 'cs105-t3-ex13', 'cs105-t3-ex14', 'cs105-t3-ex15', 'cs105-t3-ex16']
  },
  {
    id: 'cs105-topic-4',
    title: 'Structures',
    content: t4DefiningStructures,
    subtopics: topic4Subtopics,
    quizIds: ['cs105-quiz-4', 'cs105-quiz-4b', 'cs105-quiz-4c'],
    exerciseIds: ['cs105-exercise-4', 'cs105-t4-ex02', 'cs105-t4-ex03', 'cs105-t4-ex04', 'cs105-t4-ex05', 'cs105-t4-ex06', 'cs105-t4-ex07', 'cs105-t4-ex08', 'cs105-t4-ex09', 'cs105-t4-ex10', 'cs105-t4-ex11', 'cs105-t4-ex12', 'cs105-t4-ex13', 'cs105-t4-ex14', 'cs105-t4-ex15', 'cs105-t4-ex16']
  },
  {
    id: 'cs105-topic-5',
    title: 'File I/O',
    content: t5FileBasics,
    subtopics: topic5Subtopics,
    quizIds: ['cs105-quiz-5', 'cs105-quiz-5b', 'cs105-quiz-5c'],
    exerciseIds: ['cs105-exercise-5', 'cs105-t5-ex02', 'cs105-t5-ex03', 'cs105-t5-ex04', 'cs105-t5-ex05', 'cs105-t5-ex06', 'cs105-t5-ex07', 'cs105-t5-ex08', 'cs105-t5-ex09', 'cs105-t5-ex10', 'cs105-t5-ex11', 'cs105-t5-ex12', 'cs105-t5-ex13', 'cs105-t5-ex14', 'cs105-t5-ex15', 'cs105-t5-ex16']
  }
];
