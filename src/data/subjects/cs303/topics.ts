import { Topic } from '../../../core/types';

// Topic 1: Programming Paradigms
import topic1Sub1 from '../../../content/subjects/cs303/topic-1/01-introduction-paradigms.md?raw';
import topic1Sub2 from '../../../content/subjects/cs303/topic-1/02-imperative-programming.md?raw';
import topic1Sub3 from '../../../content/subjects/cs303/topic-1/03-declarative-programming.md?raw';
import topic1Sub4 from '../../../content/subjects/cs303/topic-1/04-object-oriented.md?raw';
import topic1Sub5 from '../../../content/subjects/cs303/topic-1/05-logic-programming.md?raw';
import topic1Sub6 from '../../../content/subjects/cs303/topic-1/06-concurrent-programming.md?raw';
import topic1Sub7 from '../../../content/subjects/cs303/topic-1/07-multi-paradigm.md?raw';

// Topic 2: Type Systems
import topic2Sub1 from '../../../content/subjects/cs303/topic-2/01-type-basics.md?raw';
import topic2Sub2 from '../../../content/subjects/cs303/topic-2/02-static-vs-dynamic.md?raw';
import topic2Sub3 from '../../../content/subjects/cs303/topic-2/03-type-inference.md?raw';
import topic2Sub4 from '../../../content/subjects/cs303/topic-2/04-polymorphism-types.md?raw';
import topic2Sub5 from '../../../content/subjects/cs303/topic-2/05-algebraic-types.md?raw';
import topic2Sub6 from '../../../content/subjects/cs303/topic-2/06-dependent-types.md?raw';
import topic2Sub7 from '../../../content/subjects/cs303/topic-2/07-type-soundness.md?raw';

// Topic 3: Functional Programming
import topic3Sub1 from '../../../content/subjects/cs303/topic-3/01-fp-fundamentals.md?raw';
import topic3Sub2 from '../../../content/subjects/cs303/topic-3/02-higher-order-functions.md?raw';
import topic3Sub3 from '../../../content/subjects/cs303/topic-3/03-recursion-patterns.md?raw';
import topic3Sub4 from '../../../content/subjects/cs303/topic-3/04-lambda-calculus.md?raw';
import topic3Sub5 from '../../../content/subjects/cs303/topic-3/05-lazy-evaluation.md?raw';
import topic3Sub6 from '../../../content/subjects/cs303/topic-3/06-monads-functors.md?raw';
import topic3Sub7 from '../../../content/subjects/cs303/topic-3/07-fp-in-practice.md?raw';

// Topic 4: Formal Semantics
import topic4Sub1 from '../../../content/subjects/cs303/topic-4/01-semantics-intro.md?raw';
import topic4Sub2 from '../../../content/subjects/cs303/topic-4/02-operational-semantics.md?raw';
import topic4Sub3 from '../../../content/subjects/cs303/topic-4/03-denotational-semantics.md?raw';
import topic4Sub4 from '../../../content/subjects/cs303/topic-4/04-axiomatic-semantics.md?raw';
import topic4Sub5 from '../../../content/subjects/cs303/topic-4/05-abstract-interpretation.md?raw';
import topic4Sub6 from '../../../content/subjects/cs303/topic-4/06-program-verification.md?raw';
import topic4Sub7 from '../../../content/subjects/cs303/topic-4/07-semantics-applications.md?raw';

// Topic 5: Interpreters
import topic5Sub1 from '../../../content/subjects/cs303/topic-5/01-interpreter-basics.md?raw';
import topic5Sub2 from '../../../content/subjects/cs303/topic-5/02-abstract-syntax.md?raw';
import topic5Sub3 from '../../../content/subjects/cs303/topic-5/03-evaluation-strategies.md?raw';
import topic5Sub4 from '../../../content/subjects/cs303/topic-5/04-environments-closures.md?raw';
import topic5Sub5 from '../../../content/subjects/cs303/topic-5/05-recursive-interpreters.md?raw';
import topic5Sub6 from '../../../content/subjects/cs303/topic-5/06-continuation-passing.md?raw';
import topic5Sub7 from '../../../content/subjects/cs303/topic-5/07-metacircular-interpreters.md?raw';

// Topic 6: Memory Management
import topic6Sub1 from '../../../content/subjects/cs303/topic-6/01-memory-overview.md?raw';
import topic6Sub2 from '../../../content/subjects/cs303/topic-6/02-manual-management.md?raw';
import topic6Sub3 from '../../../content/subjects/cs303/topic-6/03-reference-counting.md?raw';
import topic6Sub4 from '../../../content/subjects/cs303/topic-6/04-garbage-collection.md?raw';
import topic6Sub5 from '../../../content/subjects/cs303/topic-6/05-generational-gc.md?raw';
import topic6Sub6 from '../../../content/subjects/cs303/topic-6/06-region-based.md?raw';
import topic6Sub7 from '../../../content/subjects/cs303/topic-6/07-modern-approaches.md?raw';

// Topic 7: Advanced Language Features
import topic7Sub1 from '../../../content/subjects/cs303/topic-7/01-metaprogramming.md?raw';
import topic7Sub2 from '../../../content/subjects/cs303/topic-7/02-generics-templates.md?raw';
import topic7Sub3 from '../../../content/subjects/cs303/topic-7/03-pattern-matching.md?raw';
import topic7Sub4 from '../../../content/subjects/cs303/topic-7/04-effect-systems.md?raw';
import topic7Sub5 from '../../../content/subjects/cs303/topic-7/05-coroutines-async.md?raw';
import topic7Sub6 from '../../../content/subjects/cs303/topic-7/06-dsl-design.md?raw';
import topic7Sub7 from '../../../content/subjects/cs303/topic-7/07-language-evolution.md?raw';

export const cs303Topics: Topic[] = [
  {
    id: 'cs303-topic-1',
    title: 'Programming Paradigms',
    content: 'Survey of major programming paradigms including imperative, declarative, object-oriented, functional, logic, and concurrent programming. Understanding when and why to use each paradigm.',
    subtopics: [
      { id: 'cs303-t1-s1', slug: 'introduction-paradigms', title: 'Introduction to Programming Paradigms', content: topic1Sub1, order: 1 },
      { id: 'cs303-t1-s2', slug: 'imperative-programming', title: 'Imperative Programming', content: topic1Sub2, order: 2 },
      { id: 'cs303-t1-s3', slug: 'declarative-programming', title: 'Declarative Programming', content: topic1Sub3, order: 3 },
      { id: 'cs303-t1-s4', slug: 'object-oriented', title: 'Object-Oriented Programming', content: topic1Sub4, order: 4 },
      { id: 'cs303-t1-s5', slug: 'logic-programming', title: 'Logic Programming', content: topic1Sub5, order: 5 },
      { id: 'cs303-t1-s6', slug: 'concurrent-programming', title: 'Concurrent Programming', content: topic1Sub6, order: 6 },
      { id: 'cs303-t1-s7', slug: 'multi-paradigm', title: 'Multi-Paradigm Languages', content: topic1Sub7, order: 7 },
    ],
    quizIds: ['cs303-t1-quiz-1', 'cs303-t1-quiz-2', 'cs303-t1-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs303-t1-ex${String(i + 1).padStart(2, '0')}`),
  },
  {
    id: 'cs303-topic-2',
    title: 'Type Systems',
    content: 'Deep dive into type systems: static vs dynamic typing, type inference, polymorphism, algebraic data types, and type soundness. Understanding how types help prevent errors.',
    subtopics: [
      { id: 'cs303-t2-s1', slug: 'type-basics', title: 'Type System Fundamentals', content: topic2Sub1, order: 1 },
      { id: 'cs303-t2-s2', slug: 'static-vs-dynamic', title: 'Static vs Dynamic Typing', content: topic2Sub2, order: 2 },
      { id: 'cs303-t2-s3', slug: 'type-inference', title: 'Type Inference', content: topic2Sub3, order: 3 },
      { id: 'cs303-t2-s4', slug: 'polymorphism-types', title: 'Polymorphism in Type Systems', content: topic2Sub4, order: 4 },
      { id: 'cs303-t2-s5', slug: 'algebraic-types', title: 'Algebraic Data Types', content: topic2Sub5, order: 5 },
      { id: 'cs303-t2-s6', slug: 'dependent-types', title: 'Dependent Types', content: topic2Sub6, order: 6 },
      { id: 'cs303-t2-s7', slug: 'type-soundness', title: 'Type Soundness', content: topic2Sub7, order: 7 },
    ],
    quizIds: ['cs303-t2-quiz-1', 'cs303-t2-quiz-2', 'cs303-t2-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs303-t2-ex${String(i + 1).padStart(2, '0')}`),
  },
  {
    id: 'cs303-topic-3',
    title: 'Functional Programming',
    content: 'Core concepts of functional programming: pure functions, immutability, higher-order functions, recursion, lambda calculus, lazy evaluation, and monads.',
    subtopics: [
      { id: 'cs303-t3-s1', slug: 'fp-fundamentals', title: 'Functional Programming Fundamentals', content: topic3Sub1, order: 1 },
      { id: 'cs303-t3-s2', slug: 'higher-order-functions', title: 'Higher-Order Functions', content: topic3Sub2, order: 2 },
      { id: 'cs303-t3-s3', slug: 'recursion-patterns', title: 'Recursion and Fold Patterns', content: topic3Sub3, order: 3 },
      { id: 'cs303-t3-s4', slug: 'lambda-calculus', title: 'Lambda Calculus', content: topic3Sub4, order: 4 },
      { id: 'cs303-t3-s5', slug: 'lazy-evaluation', title: 'Lazy Evaluation', content: topic3Sub5, order: 5 },
      { id: 'cs303-t3-s6', slug: 'monads-functors', title: 'Monads and Functors', content: topic3Sub6, order: 6 },
      { id: 'cs303-t3-s7', slug: 'fp-in-practice', title: 'Functional Programming in Practice', content: topic3Sub7, order: 7 },
    ],
    quizIds: ['cs303-t3-quiz-1', 'cs303-t3-quiz-2', 'cs303-t3-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs303-t3-ex${String(i + 1).padStart(2, '0')}`),
  },
  {
    id: 'cs303-topic-4',
    title: 'Formal Semantics',
    content: 'Mathematical foundations for understanding program meaning: operational semantics, denotational semantics, axiomatic semantics, and their applications in verification.',
    subtopics: [
      { id: 'cs303-t4-s1', slug: 'semantics-intro', title: 'Introduction to Formal Semantics', content: topic4Sub1, order: 1 },
      { id: 'cs303-t4-s2', slug: 'operational-semantics', title: 'Operational Semantics', content: topic4Sub2, order: 2 },
      { id: 'cs303-t4-s3', slug: 'denotational-semantics', title: 'Denotational Semantics', content: topic4Sub3, order: 3 },
      { id: 'cs303-t4-s4', slug: 'axiomatic-semantics', title: 'Axiomatic Semantics', content: topic4Sub4, order: 4 },
      { id: 'cs303-t4-s5', slug: 'abstract-interpretation', title: 'Abstract Interpretation', content: topic4Sub5, order: 5 },
      { id: 'cs303-t4-s6', slug: 'program-verification', title: 'Program Verification', content: topic4Sub6, order: 6 },
      { id: 'cs303-t4-s7', slug: 'semantics-applications', title: 'Applications of Semantics', content: topic4Sub7, order: 7 },
    ],
    quizIds: ['cs303-t4-quiz-1', 'cs303-t4-quiz-2', 'cs303-t4-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs303-t4-ex${String(i + 1).padStart(2, '0')}`),
  },
  {
    id: 'cs303-topic-5',
    title: 'Interpreters',
    content: 'Building interpreters from scratch: abstract syntax trees, evaluation strategies, environments, closures, continuation-passing style, and metacircular evaluators.',
    subtopics: [
      { id: 'cs303-t5-s1', slug: 'interpreter-basics', title: 'Interpreter Fundamentals', content: topic5Sub1, order: 1 },
      { id: 'cs303-t5-s2', slug: 'abstract-syntax', title: 'Abstract Syntax Trees', content: topic5Sub2, order: 2 },
      { id: 'cs303-t5-s3', slug: 'evaluation-strategies', title: 'Evaluation Strategies', content: topic5Sub3, order: 3 },
      { id: 'cs303-t5-s4', slug: 'environments-closures', title: 'Environments and Closures', content: topic5Sub4, order: 4 },
      { id: 'cs303-t5-s5', slug: 'recursive-interpreters', title: 'Recursive Interpreters', content: topic5Sub5, order: 5 },
      { id: 'cs303-t5-s6', slug: 'continuation-passing', title: 'Continuation-Passing Style', content: topic5Sub6, order: 6 },
      { id: 'cs303-t5-s7', slug: 'metacircular-interpreters', title: 'Metacircular Interpreters', content: topic5Sub7, order: 7 },
    ],
    quizIds: ['cs303-t5-quiz-1', 'cs303-t5-quiz-2', 'cs303-t5-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs303-t5-ex${String(i + 1).padStart(2, '0')}`),
  },
  {
    id: 'cs303-topic-6',
    title: 'Memory Management',
    content: 'Memory management strategies: manual allocation, reference counting, garbage collection algorithms, generational GC, region-based management, and modern ownership systems.',
    subtopics: [
      { id: 'cs303-t6-s1', slug: 'memory-overview', title: 'Memory Management Overview', content: topic6Sub1, order: 1 },
      { id: 'cs303-t6-s2', slug: 'manual-management', title: 'Manual Memory Management', content: topic6Sub2, order: 2 },
      { id: 'cs303-t6-s3', slug: 'reference-counting', title: 'Reference Counting', content: topic6Sub3, order: 3 },
      { id: 'cs303-t6-s4', slug: 'garbage-collection', title: 'Garbage Collection', content: topic6Sub4, order: 4 },
      { id: 'cs303-t6-s5', slug: 'generational-gc', title: 'Generational Garbage Collection', content: topic6Sub5, order: 5 },
      { id: 'cs303-t6-s6', slug: 'region-based', title: 'Region-Based Memory Management', content: topic6Sub6, order: 6 },
      { id: 'cs303-t6-s7', slug: 'modern-approaches', title: 'Modern Memory Management', content: topic6Sub7, order: 7 },
    ],
    quizIds: ['cs303-t6-quiz-1', 'cs303-t6-quiz-2', 'cs303-t6-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs303-t6-ex${String(i + 1).padStart(2, '0')}`),
  },
  {
    id: 'cs303-topic-7',
    title: 'Advanced Language Features',
    content: 'Advanced features in modern programming languages: metaprogramming, generics, pattern matching, effect systems, coroutines, DSL design, and language evolution.',
    subtopics: [
      { id: 'cs303-t7-s1', slug: 'metaprogramming', title: 'Metaprogramming', content: topic7Sub1, order: 1 },
      { id: 'cs303-t7-s2', slug: 'generics-templates', title: 'Generics and Templates', content: topic7Sub2, order: 2 },
      { id: 'cs303-t7-s3', slug: 'pattern-matching', title: 'Pattern Matching', content: topic7Sub3, order: 3 },
      { id: 'cs303-t7-s4', slug: 'effect-systems', title: 'Effect Systems', content: topic7Sub4, order: 4 },
      { id: 'cs303-t7-s5', slug: 'coroutines-async', title: 'Coroutines and Async', content: topic7Sub5, order: 5 },
      { id: 'cs303-t7-s6', slug: 'dsl-design', title: 'Domain-Specific Languages', content: topic7Sub6, order: 6 },
      { id: 'cs303-t7-s7', slug: 'language-evolution', title: 'Language Evolution', content: topic7Sub7, order: 7 },
    ],
    quizIds: ['cs303-t7-quiz-1', 'cs303-t7-quiz-2', 'cs303-t7-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs303-t7-ex${String(i + 1).padStart(2, '0')}`),
  }
];
