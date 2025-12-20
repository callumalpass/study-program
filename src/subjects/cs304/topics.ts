/**
 * CS304 Topics
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
    title: 'Introduction to Compilers',
  },
  {
    number: 0,
    title: 'Lexical Analysis Basics',
  },
  {
    number: 0,
    title: 'Regular Expressions',
  },
  {
    number: 0,
    title: 'Finite Automata',
  },
  {
    number: 0,
    title: 'Scanner Implementation',
  },
  {
    number: 0,
    title: 'Scanner Generators',
  },
  {
    number: 0,
    title: 'Error Handling in Lexing',
    quizIds: ['cs304-t1-quiz-1', 'cs304-t1-quiz-2', 'cs304-t1-quiz-3'],
  },
  {
    number: 0,
    title: 'Context-Free Grammars',
  },
  {
    number: 0,
    title: 'Derivations and Parse Trees',
  },
  {
    number: 0,
    title: 'Top-Down Parsing',
  },
  {
    number: 0,
    title: 'LL Parsing',
  },
  {
    number: 0,
    title: 'Bottom-Up Parsing',
  },
  {
    number: 0,
    title: 'LR Parsing',
  },
  {
    number: 0,
    title: 'Parser Generators',
    quizIds: ['cs304-t2-quiz-1', 'cs304-t2-quiz-2', 'cs304-t2-quiz-3'],
  },
  {
    number: 0,
    title: 'Attribute Grammars',
  },
  {
    number: 0,
    title: 'Symbol Tables',
  },
  {
    number: 0,
    title: 'Type Checking',
  },
  {
    number: 0,
    title: 'Scope Resolution',
  },
  {
    number: 0,
    title: 'Type Inference',
  },
  {
    number: 0,
    title: 'Semantic Error Detection',
  },
  {
    number: 0,
    title: 'AST Construction',
    quizIds: ['cs304-t3-quiz-1', 'cs304-t3-quiz-2', 'cs304-t3-quiz-3'],
  },
  {
    number: 0,
    title: 'IR Overview',
  },
  {
    number: 0,
    title: 'Three-Address Code',
  },
  {
    number: 0,
    title: 'Control Flow Graphs',
  },
  {
    number: 0,
    title: 'SSA Form',
  },
  {
    number: 0,
    title: 'IR Lowering',
  },
  {
    number: 0,
    title: 'IR in Practice',
  },
  {
    number: 0,
    title: 'IR Transformations',
    quizIds: ['cs304-t4-quiz-1', 'cs304-t4-quiz-2', 'cs304-t4-quiz-3'],
  },
  {
    number: 0,
    title: 'Target Machine Architecture',
  },
  {
    number: 0,
    title: 'Instruction Selection',
  },
  {
    number: 0,
    title: 'Register Allocation',
  },
  {
    number: 0,
    title: 'Instruction Scheduling',
  },
  {
    number: 0,
    title: 'Calling Conventions',
  },
  {
    number: 0,
    title: 'Stack Management',
  },
  {
    number: 0,
    title: 'Object File Formats',
    quizIds: ['cs304-t5-quiz-1', 'cs304-t5-quiz-2', 'cs304-t5-quiz-3'],
  },
  {
    number: 0,
    title: 'Optimization Overview',
  },
  {
    number: 0,
    title: 'Local Optimization',
  },
  {
    number: 0,
    title: 'Global Optimization',
  },
  {
    number: 0,
    title: 'Loop Optimization',
  },
  {
    number: 0,
    title: 'Data Flow Analysis',
  },
  {
    number: 0,
    title: 'Alias Analysis',
  },
  {
    number: 0,
    title: 'Interprocedural Optimization',
    quizIds: ['cs304-t6-quiz-1', 'cs304-t6-quiz-2', 'cs304-t6-quiz-3'],
  },
  {
    number: 0,
    title: 'Runtime Systems Overview',
  },
  {
    number: 0,
    title: 'Memory Management',
  },
  {
    number: 0,
    title: 'Garbage Collection',
  },
  {
    number: 0,
    title: 'Exception Handling',
  },
  {
    number: 0,
    title: 'Virtual Machines',
  },
  {
    number: 0,
    title: 'JIT Compilation',
  },
  {
    number: 0,
    title: 'Linking and Loading',
    quizIds: ['cs304-t7-quiz-1', 'cs304-t7-quiz-2', 'cs304-t7-quiz-3'],
  },
  {
    number: 1,
    title: 'Lexical Analysis',
  },
  {
    number: 2,
    title: 'Syntax Analysis',
  },
  {
    number: 3,
    title: 'Semantic Analysis',
  },
  {
    number: 4,
    title: 'Intermediate Representations',
  },
  {
    number: 5,
    title: 'Code Generation',
  },
  {
    number: 6,
    title: 'Optimization',
  },
  {
    number: 7,
    title: 'Runtime Systems',
  },
];

export const cs304Topics: Topic[] = buildTopicsFromGlob('cs304', content, topicConfigs);
