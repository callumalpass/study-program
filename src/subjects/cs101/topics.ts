import { Topic, Subtopic } from '../../core/types';
import topic1Content from './content/topic-1.md?raw';
import topic2Content from './content/topic-2.md?raw';
import topic3Content from './content/topic-3.md?raw';
import topic4Content from './content/topic-4.md?raw';
import topic5Content from './content/topic-5.md?raw';
import topic6Content from './content/topic-6.md?raw';
import topic7Content from './content/topic-7.md?raw';

// Topic 1 Subtopics
import t1Introduction from './content/topic-1/01-introduction.md?raw';
import t1NamingRules from './content/topic-1/02-naming-rules.md?raw';
import t1IntegersFloats from './content/topic-1/03-integers-floats.md?raw';
import t1Strings from './content/topic-1/04-strings.md?raw';
import t1Booleans from './content/topic-1/05-booleans.md?raw';
import t1TypeConversion from './content/topic-1/06-type-conversion.md?raw';
import t1Patterns from './content/topic-1/07-patterns-best-practices.md?raw';

// Topic 2 Subtopics
import t2Introduction from './content/topic-2/01-introduction.md?raw';
import t2BooleanExpressions from './content/topic-2/02-boolean-expressions.md?raw';
import t2IfElifElse from './content/topic-2/03-if-elif-else.md?raw';
import t2ForLoops from './content/topic-2/04-for-loops-and-range.md?raw';
import t2WhileLoops from './content/topic-2/05-while-loops.md?raw';
import t2LoopPatterns from './content/topic-2/06-loop-patterns.md?raw';
import t2Mistakes from './content/topic-2/07-common-mistakes-best-practices.md?raw';

// Topic 3 Subtopics
import t3Introduction from './content/topic-3/01-introduction.md?raw';
import t3DefiningCalling from './content/topic-3/02-defining-and-calling.md?raw';
import t3Parameters from './content/topic-3/03-parameters-args-kwargs.md?raw';
import t3Returns from './content/topic-3/04-return-values-and-none.md?raw';
import t3Scope from './content/topic-3/05-scope-legb-closures.md?raw';
import t3Docstrings from './content/topic-3/06-docstrings-and-type-hints.md?raw';
import t3Lambdas from './content/topic-3/07-lambdas-higher-order-and-pitfalls.md?raw';

// Topic 4 Subtopics
import t4Lists from './content/topic-4/01-lists-basics.md?raw';
import t4Slicing from './content/topic-4/02-slicing-and-copying.md?raw';
import t4Iteration from './content/topic-4/03-iteration-and-comprehensions.md?raw';
import t4DictBasics from './content/topic-4/04-dictionaries-basics.md?raw';
import t4DictIteration from './content/topic-4/05-dict-methods-and-iteration.md?raw';
import t4Choosing from './content/topic-4/06-choosing-the-right-structure.md?raw';
import t4Practice from './content/topic-4/07-common-mistakes-and-practice.md?raw';

// Topic 5 Subtopics
import t5Paths from './content/topic-5/01-introduction-and-paths.md?raw';
import t5Opening from './content/topic-5/02-opening-files-and-modes.md?raw';
import t5Reading from './content/topic-5/03-reading-patterns.md?raw';
import t5Writing from './content/topic-5/04-writing-patterns.md?raw';
import t5Csv from './content/topic-5/05-csv-files.md?raw';
import t5Json from './content/topic-5/06-json-files.md?raw';
import t5Errors from './content/topic-5/07-errors-best-practices-and-practice.md?raw';

// Topic 6 Subtopics
import t6Exceptions from './content/topic-6/01-exceptions-overview.md?raw';
import t6TryExcept from './content/topic-6/02-try-except-else-finally.md?raw';
import t6Eafp from './content/topic-6/03-eafp-vs-lbyl-and-validation.md?raw';
import t6Raising from './content/topic-6/04-raising-and-custom-exceptions.md?raw';
import t6Tracebacks from './content/topic-6/05-reading-tracebacks.md?raw';
import t6Debugging from './content/topic-6/06-debugging-techniques.md?raw';
import t6Pitfalls from './content/topic-6/07-common-pitfalls-and-practice.md?raw';

// Topic 7 Subtopics
import t7Introduction from './content/topic-7/01-introduction.md?raw';
import t7BaseCases from './content/topic-7/02-base-cases-and-progress.md?raw';
import t7CallStack from './content/topic-7/03-the-call-stack-and-tracing.md?raw';
import t7Classic from './content/topic-7/04-classic-recursive-problems.md?raw';
import t7DivideConquer from './content/topic-7/05-divide-and-conquer.md?raw';
import t7Memoization from './content/topic-7/06-performance-and-memoization.md?raw';
import t7Pitfalls from './content/topic-7/07-pitfalls-best-practices-and-practice.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'cs101-t1-intro', slug: 'introduction', title: 'Introduction', content: t1Introduction, order: 1 },
  { id: 'cs101-t1-naming', slug: 'naming-rules', title: 'Variable Naming Rules', content: t1NamingRules, order: 2 },
  { id: 'cs101-t1-numbers', slug: 'integers-floats', title: 'Integers & Floats', content: t1IntegersFloats, order: 3 },
  { id: 'cs101-t1-strings', slug: 'strings', title: 'Strings', content: t1Strings, order: 4 },
  { id: 'cs101-t1-bools', slug: 'booleans', title: 'Booleans', content: t1Booleans, order: 5 },
  { id: 'cs101-t1-conversion', slug: 'type-conversion', title: 'Type Conversion', content: t1TypeConversion, order: 6 },
  { id: 'cs101-t1-patterns', slug: 'patterns-best-practices', title: 'Patterns & Best Practices', content: t1Patterns, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'cs101-t2-intro', slug: 'introduction', title: 'Control Flow: Big Picture', content: t2Introduction, order: 1 },
  { id: 'cs101-t2-booleans', slug: 'boolean-expressions', title: 'Boolean Expressions', content: t2BooleanExpressions, order: 2 },
  { id: 'cs101-t2-conditionals', slug: 'if-elif-else', title: 'Conditionals (if/elif/else)', content: t2IfElifElse, order: 3 },
  { id: 'cs101-t2-for', slug: 'for-loops-and-range', title: 'For Loops and range()', content: t2ForLoops, order: 4 },
  { id: 'cs101-t2-while', slug: 'while-loops', title: 'While Loops', content: t2WhileLoops, order: 5 },
  { id: 'cs101-t2-patterns', slug: 'loop-patterns', title: 'Loop Patterns', content: t2LoopPatterns, order: 6 },
  { id: 'cs101-t2-mistakes', slug: 'common-mistakes-best-practices', title: 'Common Mistakes & Best Practices', content: t2Mistakes, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'cs101-t3-intro', slug: 'introduction', title: 'Why Functions Matter', content: t3Introduction, order: 1 },
  { id: 'cs101-t3-def', slug: 'defining-and-calling', title: 'Defining and Calling', content: t3DefiningCalling, order: 2 },
  { id: 'cs101-t3-params', slug: 'parameters-args-kwargs', title: 'Parameters, *args, **kwargs', content: t3Parameters, order: 3 },
  { id: 'cs101-t3-returns', slug: 'return-values-and-none', title: 'Return Values and None', content: t3Returns, order: 4 },
  { id: 'cs101-t3-scope', slug: 'scope-legb-closures', title: 'Scope, LEGB, Closures', content: t3Scope, order: 5 },
  { id: 'cs101-t3-docs', slug: 'docstrings-and-type-hints', title: 'Docstrings and Type Hints', content: t3Docstrings, order: 6 },
  { id: 'cs101-t3-lambda', slug: 'lambdas-higher-order-and-pitfalls', title: 'Lambdas, Higher-Order, Pitfalls', content: t3Lambdas, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'cs101-t4-lists', slug: 'lists-basics', title: 'Lists Basics', content: t4Lists, order: 1 },
  { id: 'cs101-t4-slicing', slug: 'slicing-and-copying', title: 'Slicing and Copying', content: t4Slicing, order: 2 },
  { id: 'cs101-t4-iteration', slug: 'iteration-and-comprehensions', title: 'Iteration and Comprehensions', content: t4Iteration, order: 3 },
  { id: 'cs101-t4-dicts', slug: 'dictionaries-basics', title: 'Dictionaries Basics', content: t4DictBasics, order: 4 },
  { id: 'cs101-t4-dict-iter', slug: 'dict-methods-and-iteration', title: 'Dict Methods and Iteration', content: t4DictIteration, order: 5 },
  { id: 'cs101-t4-choosing', slug: 'choosing-the-right-structure', title: 'Choosing the Right Structure', content: t4Choosing, order: 6 },
  { id: 'cs101-t4-practice', slug: 'common-mistakes-and-practice', title: 'Common Mistakes and Practice', content: t4Practice, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'cs101-t5-paths', slug: 'introduction-and-paths', title: 'Introduction and Paths', content: t5Paths, order: 1 },
  { id: 'cs101-t5-open', slug: 'opening-files-and-modes', title: 'Opening Files and Modes', content: t5Opening, order: 2 },
  { id: 'cs101-t5-read', slug: 'reading-patterns', title: 'Reading Patterns', content: t5Reading, order: 3 },
  { id: 'cs101-t5-write', slug: 'writing-patterns', title: 'Writing Patterns', content: t5Writing, order: 4 },
  { id: 'cs101-t5-csv', slug: 'csv-files', title: 'CSV Files', content: t5Csv, order: 5 },
  { id: 'cs101-t5-json', slug: 'json-files', title: 'JSON Files', content: t5Json, order: 6 },
  { id: 'cs101-t5-errors', slug: 'errors-best-practices-and-practice', title: 'Errors, Best Practices, Practice', content: t5Errors, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'cs101-t6-exceptions', slug: 'exceptions-overview', title: 'Exceptions Overview', content: t6Exceptions, order: 1 },
  { id: 'cs101-t6-try', slug: 'try-except-else-finally', title: 'try/except/else/finally', content: t6TryExcept, order: 2 },
  { id: 'cs101-t6-eafp', slug: 'eafp-vs-lbyl-and-validation', title: 'EAFP vs LBYL and Validation', content: t6Eafp, order: 3 },
  { id: 'cs101-t6-raise', slug: 'raising-and-custom-exceptions', title: 'Raising and Custom Exceptions', content: t6Raising, order: 4 },
  { id: 'cs101-t6-tracebacks', slug: 'reading-tracebacks', title: 'Reading Tracebacks', content: t6Tracebacks, order: 5 },
  { id: 'cs101-t6-debug', slug: 'debugging-techniques', title: 'Debugging Techniques', content: t6Debugging, order: 6 },
  { id: 'cs101-t6-pitfalls', slug: 'common-pitfalls-and-practice', title: 'Common Pitfalls and Practice', content: t6Pitfalls, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'cs101-t7-intro', slug: 'introduction', title: 'Recursion: Big Picture', content: t7Introduction, order: 1 },
  { id: 'cs101-t7-base', slug: 'base-cases-and-progress', title: 'Base Cases and Progress', content: t7BaseCases, order: 2 },
  { id: 'cs101-t7-stack', slug: 'the-call-stack-and-tracing', title: 'Call Stack and Tracing', content: t7CallStack, order: 3 },
  { id: 'cs101-t7-classic', slug: 'classic-recursive-problems', title: 'Classic Recursive Problems', content: t7Classic, order: 4 },
  { id: 'cs101-t7-dnc', slug: 'divide-and-conquer', title: 'Divide and Conquer', content: t7DivideConquer, order: 5 },
  { id: 'cs101-t7-memo', slug: 'performance-and-memoization', title: 'Performance and Memoization', content: t7Memoization, order: 6 },
  { id: 'cs101-t7-pitfalls', slug: 'pitfalls-best-practices-and-practice', title: 'Pitfalls, Best Practices, Practice', content: t7Pitfalls, order: 7 },
];

export const cs101Topics: Topic[] = [
  {
    id: 'cs101-topic-1',
    title: 'Variables and Data Types',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['cs101-quiz-1', 'cs101-quiz-1b', 'cs101-quiz-1c'],
    exerciseIds: ['cs101-exercise-1', 'cs101-t1-ex02', 'cs101-t1-ex03', 'cs101-t1-ex04', 'cs101-t1-ex05', 'cs101-t1-ex06', 'cs101-t1-ex07', 'cs101-t1-ex08', 'cs101-t1-ex09', 'cs101-t1-ex10', 'cs101-t1-ex11', 'cs101-t1-ex12', 'cs101-t1-ex13', 'cs101-t1-ex14', 'cs101-t1-ex15', 'cs101-t1-ex16']
  },
  {
    id: 'cs101-topic-2',
    title: 'Control Flow (if/else, loops)',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['cs101-quiz-2', 'cs101-quiz-2b', 'cs101-quiz-2c'],
    exerciseIds: ['cs101-exercise-2', 'cs101-t2-ex02', 'cs101-t2-ex03', 'cs101-t2-ex04', 'cs101-t2-ex05', 'cs101-t2-ex06', 'cs101-t2-ex07', 'cs101-t2-ex08', 'cs101-t2-ex09', 'cs101-t2-ex10', 'cs101-t2-ex11', 'cs101-t2-ex12', 'cs101-t2-ex13', 'cs101-t2-ex14', 'cs101-t2-ex15', 'cs101-t2-ex16']
  },
  {
    id: 'cs101-topic-3',
    title: 'Functions',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['cs101-quiz-3', 'cs101-quiz-3b', 'cs101-quiz-3c'],
    exerciseIds: ['cs101-exercise-3', 'cs101-t3-ex02', 'cs101-t3-ex03', 'cs101-t3-ex04', 'cs101-t3-ex05', 'cs101-t3-ex06', 'cs101-t3-ex07', 'cs101-t3-ex08', 'cs101-t3-ex09', 'cs101-t3-ex10', 'cs101-t3-ex11', 'cs101-t3-ex12', 'cs101-t3-ex13', 'cs101-t3-ex14', 'cs101-t3-ex15', 'cs101-t3-ex16']
  },
  {
    id: 'cs101-topic-4',
    title: 'Lists and Dictionaries',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['cs101-quiz-4', 'cs101-quiz-4b', 'cs101-quiz-4c'],
    exerciseIds: ['cs101-exercise-4', 'cs101-t4-ex02', 'cs101-t4-ex03', 'cs101-t4-ex04', 'cs101-t4-ex05', 'cs101-t4-ex06', 'cs101-t4-ex07', 'cs101-t4-ex08', 'cs101-t4-ex09', 'cs101-t4-ex10', 'cs101-t4-ex11', 'cs101-t4-ex12', 'cs101-t4-ex13', 'cs101-t4-ex14', 'cs101-t4-ex15', 'cs101-t4-ex16']
  },
  {
    id: 'cs101-topic-5',
    title: 'File I/O',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['cs101-quiz-5', 'cs101-quiz-5b', 'cs101-quiz-5c'],
    exerciseIds: ['cs101-exercise-5', 'cs101-t5-ex02', 'cs101-t5-ex03', 'cs101-t5-ex04', 'cs101-t5-ex05', 'cs101-t5-ex06', 'cs101-t5-ex07', 'cs101-t5-ex08', 'cs101-t5-ex09', 'cs101-t5-ex10', 'cs101-t5-ex11', 'cs101-t5-ex12', 'cs101-t5-ex13', 'cs101-t5-ex14', 'cs101-t5-ex15', 'cs101-t5-ex16']
  },
  {
    id: 'cs101-topic-6',
    title: 'Error Handling and Debugging',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['cs101-quiz-6', 'cs101-quiz-6b', 'cs101-quiz-6c'],
    exerciseIds: ['cs101-exercise-6', 'cs101-t6-ex02', 'cs101-t6-ex03', 'cs101-t6-ex04', 'cs101-t6-ex05', 'cs101-t6-ex06', 'cs101-t6-ex07', 'cs101-t6-ex08', 'cs101-t6-ex09', 'cs101-t6-ex10', 'cs101-t6-ex11', 'cs101-t6-ex12', 'cs101-t6-ex13', 'cs101-t6-ex14', 'cs101-t6-ex15', 'cs101-t6-ex16']
  },
  {
    id: 'cs101-topic-7',
    title: 'Recursion',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['cs101-quiz-7', 'cs101-quiz-7b', 'cs101-quiz-7c'],
    exerciseIds: ['cs101-exercise-7', 'cs101-t7-ex02', 'cs101-t7-ex03', 'cs101-t7-ex04', 'cs101-t7-ex05', 'cs101-t7-ex06', 'cs101-t7-ex07', 'cs101-t7-ex08', 'cs101-t7-ex09', 'cs101-t7-ex10', 'cs101-t7-ex11', 'cs101-t7-ex12', 'cs101-t7-ex13', 'cs101-t7-ex14', 'cs101-t7-ex15', 'cs101-t7-ex16']
  }
];
