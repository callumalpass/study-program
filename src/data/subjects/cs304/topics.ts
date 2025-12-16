import { Topic } from '../../../core/types';

// Topic 1: Lexical Analysis
import topic1Sub1 from '../../../content/subjects/cs304/topic-1/01-introduction-compilers.md?raw';
import topic1Sub2 from '../../../content/subjects/cs304/topic-1/02-lexical-analysis-basics.md?raw';
import topic1Sub3 from '../../../content/subjects/cs304/topic-1/03-regular-expressions.md?raw';
import topic1Sub4 from '../../../content/subjects/cs304/topic-1/04-finite-automata.md?raw';
import topic1Sub5 from '../../../content/subjects/cs304/topic-1/05-scanner-implementation.md?raw';
import topic1Sub6 from '../../../content/subjects/cs304/topic-1/06-scanner-generators.md?raw';
import topic1Sub7 from '../../../content/subjects/cs304/topic-1/07-error-handling.md?raw';

// Topic 2: Syntax Analysis
import topic2Sub1 from '../../../content/subjects/cs304/topic-2/01-context-free-grammars.md?raw';
import topic2Sub2 from '../../../content/subjects/cs304/topic-2/02-derivations-parse-trees.md?raw';
import topic2Sub3 from '../../../content/subjects/cs304/topic-2/03-top-down-parsing.md?raw';
import topic2Sub4 from '../../../content/subjects/cs304/topic-2/04-ll-parsing.md?raw';
import topic2Sub5 from '../../../content/subjects/cs304/topic-2/05-bottom-up-parsing.md?raw';
import topic2Sub6 from '../../../content/subjects/cs304/topic-2/06-lr-parsing.md?raw';
import topic2Sub7 from '../../../content/subjects/cs304/topic-2/07-parser-generators.md?raw';

// Topic 3: Semantic Analysis
import topic3Sub1 from '../../../content/subjects/cs304/topic-3/01-attribute-grammars.md?raw';
import topic3Sub2 from '../../../content/subjects/cs304/topic-3/02-symbol-tables.md?raw';
import topic3Sub3 from '../../../content/subjects/cs304/topic-3/03-type-checking.md?raw';
import topic3Sub4 from '../../../content/subjects/cs304/topic-3/04-scope-resolution.md?raw';
import topic3Sub5 from '../../../content/subjects/cs304/topic-3/05-type-inference.md?raw';
import topic3Sub6 from '../../../content/subjects/cs304/topic-3/06-semantic-errors.md?raw';
import topic3Sub7 from '../../../content/subjects/cs304/topic-3/07-ast-construction.md?raw';

// Topic 4: Intermediate Representations
import topic4Sub1 from '../../../content/subjects/cs304/topic-4/01-ir-overview.md?raw';
import topic4Sub2 from '../../../content/subjects/cs304/topic-4/02-three-address-code.md?raw';
import topic4Sub3 from '../../../content/subjects/cs304/topic-4/03-control-flow-graphs.md?raw';
import topic4Sub4 from '../../../content/subjects/cs304/topic-4/04-ssa-form.md?raw';
import topic4Sub5 from '../../../content/subjects/cs304/topic-4/05-ir-lowering.md?raw';
import topic4Sub6 from '../../../content/subjects/cs304/topic-4/06-ir-in-practice.md?raw';
import topic4Sub7 from '../../../content/subjects/cs304/topic-4/07-ir-transformations.md?raw';

// Topic 5: Code Generation
import topic5Sub1 from '../../../content/subjects/cs304/topic-5/01-target-machines.md?raw';
import topic5Sub2 from '../../../content/subjects/cs304/topic-5/02-instruction-selection.md?raw';
import topic5Sub3 from '../../../content/subjects/cs304/topic-5/03-register-allocation.md?raw';
import topic5Sub4 from '../../../content/subjects/cs304/topic-5/04-instruction-scheduling.md?raw';
import topic5Sub5 from '../../../content/subjects/cs304/topic-5/05-calling-conventions.md?raw';
import topic5Sub6 from '../../../content/subjects/cs304/topic-5/06-stack-management.md?raw';
import topic5Sub7 from '../../../content/subjects/cs304/topic-5/07-object-file-formats.md?raw';

// Topic 6: Optimization
import topic6Sub1 from '../../../content/subjects/cs304/topic-6/01-optimization-overview.md?raw';
import topic6Sub2 from '../../../content/subjects/cs304/topic-6/02-local-optimization.md?raw';
import topic6Sub3 from '../../../content/subjects/cs304/topic-6/03-global-optimization.md?raw';
import topic6Sub4 from '../../../content/subjects/cs304/topic-6/04-loop-optimization.md?raw';
import topic6Sub5 from '../../../content/subjects/cs304/topic-6/05-data-flow-analysis.md?raw';
import topic6Sub6 from '../../../content/subjects/cs304/topic-6/06-alias-analysis.md?raw';
import topic6Sub7 from '../../../content/subjects/cs304/topic-6/07-interprocedural-optimization.md?raw';

// Topic 7: Runtime Systems
import topic7Sub1 from '../../../content/subjects/cs304/topic-7/01-runtime-overview.md?raw';
import topic7Sub2 from '../../../content/subjects/cs304/topic-7/02-memory-management.md?raw';
import topic7Sub3 from '../../../content/subjects/cs304/topic-7/03-garbage-collection.md?raw';
import topic7Sub4 from '../../../content/subjects/cs304/topic-7/04-exception-handling.md?raw';
import topic7Sub5 from '../../../content/subjects/cs304/topic-7/05-virtual-machines.md?raw';
import topic7Sub6 from '../../../content/subjects/cs304/topic-7/06-jit-compilation.md?raw';
import topic7Sub7 from '../../../content/subjects/cs304/topic-7/07-linking-loading.md?raw';

export const cs304Topics: Topic[] = [
  {
    id: 'cs304-topic-1',
    title: 'Lexical Analysis',
    content: 'Introduction to compilers and lexical analysis. Covers regular expressions, finite automata, scanner implementation and generation, and error handling in the lexical phase.',
    subtopics: [
      { id: 'cs304-t1-s1', slug: 'introduction-compilers', title: 'Introduction to Compilers', content: topic1Sub1, order: 1 },
      { id: 'cs304-t1-s2', slug: 'lexical-analysis-basics', title: 'Lexical Analysis Basics', content: topic1Sub2, order: 2 },
      { id: 'cs304-t1-s3', slug: 'regular-expressions', title: 'Regular Expressions', content: topic1Sub3, order: 3 },
      { id: 'cs304-t1-s4', slug: 'finite-automata', title: 'Finite Automata', content: topic1Sub4, order: 4 },
      { id: 'cs304-t1-s5', slug: 'scanner-implementation', title: 'Scanner Implementation', content: topic1Sub5, order: 5 },
      { id: 'cs304-t1-s6', slug: 'scanner-generators', title: 'Scanner Generators', content: topic1Sub6, order: 6 },
      { id: 'cs304-t1-s7', slug: 'error-handling', title: 'Error Handling in Lexing', content: topic1Sub7, order: 7 },
    ],
    quizIds: ['cs304-t1-quiz-1', 'cs304-t1-quiz-2', 'cs304-t1-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs304-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs304-topic-2',
    title: 'Syntax Analysis',
    content: 'Parsing and syntax analysis. Covers context-free grammars, parse trees, top-down and bottom-up parsing, LL and LR parsers, and parser generators.',
    subtopics: [
      { id: 'cs304-t2-s1', slug: 'context-free-grammars', title: 'Context-Free Grammars', content: topic2Sub1, order: 1 },
      { id: 'cs304-t2-s2', slug: 'derivations-parse-trees', title: 'Derivations and Parse Trees', content: topic2Sub2, order: 2 },
      { id: 'cs304-t2-s3', slug: 'top-down-parsing', title: 'Top-Down Parsing', content: topic2Sub3, order: 3 },
      { id: 'cs304-t2-s4', slug: 'll-parsing', title: 'LL Parsing', content: topic2Sub4, order: 4 },
      { id: 'cs304-t2-s5', slug: 'bottom-up-parsing', title: 'Bottom-Up Parsing', content: topic2Sub5, order: 5 },
      { id: 'cs304-t2-s6', slug: 'lr-parsing', title: 'LR Parsing', content: topic2Sub6, order: 6 },
      { id: 'cs304-t2-s7', slug: 'parser-generators', title: 'Parser Generators', content: topic2Sub7, order: 7 },
    ],
    quizIds: ['cs304-t2-quiz-1', 'cs304-t2-quiz-2', 'cs304-t2-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs304-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs304-topic-3',
    title: 'Semantic Analysis',
    content: 'Semantic analysis and type checking. Covers attribute grammars, symbol tables, type systems, scope resolution, and AST construction.',
    subtopics: [
      { id: 'cs304-t3-s1', slug: 'attribute-grammars', title: 'Attribute Grammars', content: topic3Sub1, order: 1 },
      { id: 'cs304-t3-s2', slug: 'symbol-tables', title: 'Symbol Tables', content: topic3Sub2, order: 2 },
      { id: 'cs304-t3-s3', slug: 'type-checking', title: 'Type Checking', content: topic3Sub3, order: 3 },
      { id: 'cs304-t3-s4', slug: 'scope-resolution', title: 'Scope Resolution', content: topic3Sub4, order: 4 },
      { id: 'cs304-t3-s5', slug: 'type-inference', title: 'Type Inference', content: topic3Sub5, order: 5 },
      { id: 'cs304-t3-s6', slug: 'semantic-errors', title: 'Semantic Error Detection', content: topic3Sub6, order: 6 },
      { id: 'cs304-t3-s7', slug: 'ast-construction', title: 'AST Construction', content: topic3Sub7, order: 7 },
    ],
    quizIds: ['cs304-t3-quiz-1', 'cs304-t3-quiz-2', 'cs304-t3-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs304-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs304-topic-4',
    title: 'Intermediate Representations',
    content: 'Intermediate code representations. Covers three-address code, control flow graphs, SSA form, IR lowering, and transformations.',
    subtopics: [
      { id: 'cs304-t4-s1', slug: 'ir-overview', title: 'IR Overview', content: topic4Sub1, order: 1 },
      { id: 'cs304-t4-s2', slug: 'three-address-code', title: 'Three-Address Code', content: topic4Sub2, order: 2 },
      { id: 'cs304-t4-s3', slug: 'control-flow-graphs', title: 'Control Flow Graphs', content: topic4Sub3, order: 3 },
      { id: 'cs304-t4-s4', slug: 'ssa-form', title: 'SSA Form', content: topic4Sub4, order: 4 },
      { id: 'cs304-t4-s5', slug: 'ir-lowering', title: 'IR Lowering', content: topic4Sub5, order: 5 },
      { id: 'cs304-t4-s6', slug: 'ir-in-practice', title: 'IR in Practice', content: topic4Sub6, order: 6 },
      { id: 'cs304-t4-s7', slug: 'ir-transformations', title: 'IR Transformations', content: topic4Sub7, order: 7 },
    ],
    quizIds: ['cs304-t4-quiz-1', 'cs304-t4-quiz-2', 'cs304-t4-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs304-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs304-topic-5',
    title: 'Code Generation',
    content: 'Target code generation. Covers instruction selection, register allocation, instruction scheduling, calling conventions, and object files.',
    subtopics: [
      { id: 'cs304-t5-s1', slug: 'target-machines', title: 'Target Machine Architecture', content: topic5Sub1, order: 1 },
      { id: 'cs304-t5-s2', slug: 'instruction-selection', title: 'Instruction Selection', content: topic5Sub2, order: 2 },
      { id: 'cs304-t5-s3', slug: 'register-allocation', title: 'Register Allocation', content: topic5Sub3, order: 3 },
      { id: 'cs304-t5-s4', slug: 'instruction-scheduling', title: 'Instruction Scheduling', content: topic5Sub4, order: 4 },
      { id: 'cs304-t5-s5', slug: 'calling-conventions', title: 'Calling Conventions', content: topic5Sub5, order: 5 },
      { id: 'cs304-t5-s6', slug: 'stack-management', title: 'Stack Management', content: topic5Sub6, order: 6 },
      { id: 'cs304-t5-s7', slug: 'object-file-formats', title: 'Object File Formats', content: topic5Sub7, order: 7 },
    ],
    quizIds: ['cs304-t5-quiz-1', 'cs304-t5-quiz-2', 'cs304-t5-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs304-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs304-topic-6',
    title: 'Optimization',
    content: 'Code optimization techniques. Covers local and global optimization, loop optimization, data flow analysis, alias analysis, and interprocedural optimization.',
    subtopics: [
      { id: 'cs304-t6-s1', slug: 'optimization-overview', title: 'Optimization Overview', content: topic6Sub1, order: 1 },
      { id: 'cs304-t6-s2', slug: 'local-optimization', title: 'Local Optimization', content: topic6Sub2, order: 2 },
      { id: 'cs304-t6-s3', slug: 'global-optimization', title: 'Global Optimization', content: topic6Sub3, order: 3 },
      { id: 'cs304-t6-s4', slug: 'loop-optimization', title: 'Loop Optimization', content: topic6Sub4, order: 4 },
      { id: 'cs304-t6-s5', slug: 'data-flow-analysis', title: 'Data Flow Analysis', content: topic6Sub5, order: 5 },
      { id: 'cs304-t6-s6', slug: 'alias-analysis', title: 'Alias Analysis', content: topic6Sub6, order: 6 },
      { id: 'cs304-t6-s7', slug: 'interprocedural-optimization', title: 'Interprocedural Optimization', content: topic6Sub7, order: 7 },
    ],
    quizIds: ['cs304-t6-quiz-1', 'cs304-t6-quiz-2', 'cs304-t6-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs304-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs304-topic-7',
    title: 'Runtime Systems',
    content: 'Runtime support for compiled programs. Covers memory management, garbage collection, exception handling, virtual machines, JIT compilation, and linking.',
    subtopics: [
      { id: 'cs304-t7-s1', slug: 'runtime-overview', title: 'Runtime Systems Overview', content: topic7Sub1, order: 1 },
      { id: 'cs304-t7-s2', slug: 'memory-management', title: 'Memory Management', content: topic7Sub2, order: 2 },
      { id: 'cs304-t7-s3', slug: 'garbage-collection', title: 'Garbage Collection', content: topic7Sub3, order: 3 },
      { id: 'cs304-t7-s4', slug: 'exception-handling', title: 'Exception Handling', content: topic7Sub4, order: 4 },
      { id: 'cs304-t7-s5', slug: 'virtual-machines', title: 'Virtual Machines', content: topic7Sub5, order: 5 },
      { id: 'cs304-t7-s6', slug: 'jit-compilation', title: 'JIT Compilation', content: topic7Sub6, order: 6 },
      { id: 'cs304-t7-s7', slug: 'linking-loading', title: 'Linking and Loading', content: topic7Sub7, order: 7 },
    ],
    quizIds: ['cs304-t7-quiz-1', 'cs304-t7-quiz-2', 'cs304-t7-quiz-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs304-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
