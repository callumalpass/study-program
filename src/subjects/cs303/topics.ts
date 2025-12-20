/**
 * CS303 Topics
 *
 * Uses glob imports and frontmatter for automatic content discovery.
 */

import type { Topic } from '../../core/types';
import { buildTopicsFromGlob } from '../loader';

// Glob import all markdown content
const content = import.meta.glob('./content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// Topic configuration (titles and IDs for quizzes/exercises)
const topicConfigs = [
  {
    number: 0,
    title: 'Introduction to Programming Paradigms',
  },
  {
    number: 0,
    title: 'Imperative Programming',
  },
  {
    number: 0,
    title: 'Declarative Programming',
  },
  {
    number: 0,
    title: 'Object-Oriented Programming',
  },
  {
    number: 0,
    title: 'Logic Programming',
  },
  {
    number: 0,
    title: 'Concurrent Programming',
  },
  {
    number: 0,
    title: 'Multi-Paradigm Languages',
    quizIds: ['cs303-t1-quiz-1', 'cs303-t1-quiz-2', 'cs303-t1-quiz-3'],
  },
  {
    number: 0,
    title: 'Type System Fundamentals',
  },
  {
    number: 0,
    title: 'Static vs Dynamic Typing',
  },
  {
    number: 0,
    title: 'Type Inference',
  },
  {
    number: 0,
    title: 'Polymorphism in Type Systems',
  },
  {
    number: 0,
    title: 'Algebraic Data Types',
  },
  {
    number: 0,
    title: 'Dependent Types',
  },
  {
    number: 0,
    title: 'Type Soundness',
    quizIds: ['cs303-t2-quiz-1', 'cs303-t2-quiz-2', 'cs303-t2-quiz-3'],
  },
  {
    number: 0,
    title: 'Functional Programming Fundamentals',
  },
  {
    number: 0,
    title: 'Higher-Order Functions',
  },
  {
    number: 0,
    title: 'Recursion and Fold Patterns',
  },
  {
    number: 0,
    title: 'Lambda Calculus',
  },
  {
    number: 0,
    title: 'Lazy Evaluation',
  },
  {
    number: 0,
    title: 'Monads and Functors',
  },
  {
    number: 0,
    title: 'Functional Programming in Practice',
    quizIds: ['cs303-t3-quiz-1', 'cs303-t3-quiz-2', 'cs303-t3-quiz-3'],
  },
  {
    number: 0,
    title: 'Introduction to Formal Semantics',
  },
  {
    number: 0,
    title: 'Operational Semantics',
  },
  {
    number: 0,
    title: 'Denotational Semantics',
  },
  {
    number: 0,
    title: 'Axiomatic Semantics',
  },
  {
    number: 0,
    title: 'Abstract Interpretation',
  },
  {
    number: 0,
    title: 'Program Verification',
  },
  {
    number: 0,
    title: 'Applications of Semantics',
    quizIds: ['cs303-t4-quiz-1', 'cs303-t4-quiz-2', 'cs303-t4-quiz-3'],
  },
  {
    number: 0,
    title: 'Interpreter Fundamentals',
  },
  {
    number: 0,
    title: 'Abstract Syntax Trees',
  },
  {
    number: 0,
    title: 'Evaluation Strategies',
  },
  {
    number: 0,
    title: 'Environments and Closures',
  },
  {
    number: 0,
    title: 'Recursive Interpreters',
  },
  {
    number: 0,
    title: 'Continuation-Passing Style',
  },
  {
    number: 0,
    title: 'Metacircular Interpreters',
    quizIds: ['cs303-t5-quiz-1', 'cs303-t5-quiz-2', 'cs303-t5-quiz-3'],
  },
  {
    number: 0,
    title: 'Memory Management Overview',
  },
  {
    number: 0,
    title: 'Manual Memory Management',
  },
  {
    number: 0,
    title: 'Reference Counting',
  },
  {
    number: 0,
    title: 'Garbage Collection',
  },
  {
    number: 0,
    title: 'Generational Garbage Collection',
  },
  {
    number: 0,
    title: 'Region-Based Memory Management',
  },
  {
    number: 0,
    title: 'Modern Memory Management',
    quizIds: ['cs303-t6-quiz-1', 'cs303-t6-quiz-2', 'cs303-t6-quiz-3'],
  },
  {
    number: 0,
    title: 'Metaprogramming',
  },
  {
    number: 0,
    title: 'Generics and Templates',
  },
  {
    number: 0,
    title: 'Pattern Matching',
  },
  {
    number: 0,
    title: 'Effect Systems',
  },
  {
    number: 0,
    title: 'Coroutines and Async',
  },
  {
    number: 0,
    title: 'Domain-Specific Languages',
  },
  {
    number: 0,
    title: 'Language Evolution',
    quizIds: ['cs303-t7-quiz-1', 'cs303-t7-quiz-2', 'cs303-t7-quiz-3'],
  },
  {
    number: 1,
    title: 'Programming Paradigms',
  },
  {
    number: 2,
    title: 'Type Systems',
  },
  {
    number: 3,
    title: 'Functional Programming',
  },
  {
    number: 4,
    title: 'Formal Semantics',
  },
  {
    number: 5,
    title: 'Interpreters',
  },
  {
    number: 6,
    title: 'Memory Management',
  },
  {
    number: 7,
    title: 'Advanced Language Features',
  },
];

export const cs303Topics: Topic[] = buildTopicsFromGlob('cs303', content, topicConfigs);
