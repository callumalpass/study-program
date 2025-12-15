import type { Subtopic, Topic } from '../../../core/types';
import topic1Content from '../../../content/subjects/cs102/topic-1.md?raw';
import topic2Content from '../../../content/subjects/cs102/topic-2.md?raw';
import topic3Content from '../../../content/subjects/cs102/topic-3.md?raw';
import topic4Content from '../../../content/subjects/cs102/topic-4.md?raw';
import topic5Content from '../../../content/subjects/cs102/topic-5.md?raw';
import topic6Content from '../../../content/subjects/cs102/topic-6.md?raw';
import topic7Content from '../../../content/subjects/cs102/topic-7.md?raw';

import t1s1 from '../../../content/subjects/cs102/topic-1/01-introduction.md?raw';
import t1s2 from '../../../content/subjects/cs102/topic-1/02-place-value-and-bases.md?raw';
import t1s3 from '../../../content/subjects/cs102/topic-1/03-conversion-techniques.md?raw';
import t1s4 from '../../../content/subjects/cs102/topic-1/04-hex-octal-and-grouping.md?raw';
import t1s5 from '../../../content/subjects/cs102/topic-1/05-common-pitfalls-and-practice.md?raw';

import t2s1 from '../../../content/subjects/cs102/topic-2/01-addition-and-subtraction.md?raw';
import t2s2 from '../../../content/subjects/cs102/topic-2/02-twos-complement-arithmetic.md?raw';
import t2s3 from '../../../content/subjects/cs102/topic-2/03-overflow-carry-and-sign.md?raw';
import t2s4 from '../../../content/subjects/cs102/topic-2/04-shifts-multiplication-and-division.md?raw';
import t2s5 from '../../../content/subjects/cs102/topic-2/05-worked-examples-and-checks.md?raw';

import t3s1 from '../../../content/subjects/cs102/topic-3/01-integers-ranges-and-overflow.md?raw';
import t3s2 from '../../../content/subjects/cs102/topic-3/02-characters-strings-and-encoding.md?raw';
import t3s3 from '../../../content/subjects/cs102/topic-3/03-endianness-and-memory-layout.md?raw';
import t3s4 from '../../../content/subjects/cs102/topic-3/04-floating-point-ieee-754.md?raw';
import t3s5 from '../../../content/subjects/cs102/topic-3/05-hex-dumps-and-debugging.md?raw';

import t4s1 from '../../../content/subjects/cs102/topic-4/01-truth-tables-and-basic-gates.md?raw';
import t4s2 from '../../../content/subjects/cs102/topic-4/02-boolean-algebra-identities.md?raw';
import t4s3 from '../../../content/subjects/cs102/topic-4/03-expressions-to-gates.md?raw';
import t4s4 from '../../../content/subjects/cs102/topic-4/04-canonical-forms-and-kmaps.md?raw';
import t4s5 from '../../../content/subjects/cs102/topic-4/05-common-building-blocks.md?raw';

import t5s1 from '../../../content/subjects/cs102/topic-5/01-architecture-big-picture.md?raw';
import t5s2 from '../../../content/subjects/cs102/topic-5/02-instruction-cycle.md?raw';
import t5s3 from '../../../content/subjects/cs102/topic-5/03-registers-alu-and-buses.md?raw';
import t5s4 from '../../../content/subjects/cs102/topic-5/04-memory-and-addressing.md?raw';
import t5s5 from '../../../content/subjects/cs102/topic-5/05-tracing-a-simple-program.md?raw';

import t6s1 from '../../../content/subjects/cs102/topic-6/01-registers-and-flags.md?raw';
import t6s2 from '../../../content/subjects/cs102/topic-6/02-addressing-modes.md?raw';
import t6s3 from '../../../content/subjects/cs102/topic-6/03-control-flow-patterns.md?raw';
import t6s4 from '../../../content/subjects/cs102/topic-6/04-the-stack-and-calls.md?raw';
import t6s5 from '../../../content/subjects/cs102/topic-6/05-tracing-and-debugging.md?raw';

import t7s1 from '../../../content/subjects/cs102/topic-7/01-locality-and-caches.md?raw';
import t7s2 from '../../../content/subjects/cs102/topic-7/02-cache-mapping-and-misses.md?raw';
import t7s3 from '../../../content/subjects/cs102/topic-7/03-virtual-memory-overview.md?raw';
import t7s4 from '../../../content/subjects/cs102/topic-7/04-io-basics-interrupts-dma.md?raw';
import t7s5 from '../../../content/subjects/cs102/topic-7/05-performance-tradeoffs.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'cs102-t1-introduction', slug: 'introduction', title: 'Introduction', content: t1s1, order: 1 },
  { id: 'cs102-t1-place-value-and-bases', slug: 'place-value-and-bases', title: 'Place Value and Bases', content: t1s2, order: 2 },
  { id: 'cs102-t1-conversion-techniques', slug: 'conversion-techniques', title: 'Conversion Techniques', content: t1s3, order: 3 },
  { id: 'cs102-t1-hex-octal-and-grouping', slug: 'hex-octal-and-grouping', title: 'Hex, Octal, and Bit Grouping', content: t1s4, order: 4 },
  { id: 'cs102-t1-common-pitfalls-and-practice', slug: 'common-pitfalls-and-practice', title: 'Common Pitfalls and Practice', content: t1s5, order: 5 }
];

const topic2Subtopics: Subtopic[] = [
  { id: 'cs102-t2-addition-and-subtraction', slug: 'addition-and-subtraction', title: 'Binary Addition and Subtraction', content: t2s1, order: 1 },
  { id: 'cs102-t2-twos-complement-arithmetic', slug: 'twos-complement-arithmetic', title: 'Two’s Complement Arithmetic', content: t2s2, order: 2 },
  { id: 'cs102-t2-overflow-carry-and-sign', slug: 'overflow-carry-and-sign', title: 'Overflow, Carry, and Signedness', content: t2s3, order: 3 },
  { id: 'cs102-t2-shifts-multiplication-and-division', slug: 'shifts-multiplication-and-division', title: 'Shifts, Multiplication, and Division', content: t2s4, order: 4 },
  { id: 'cs102-t2-worked-examples-and-checks', slug: 'worked-examples-and-checks', title: 'Worked Examples and Self-Checks', content: t2s5, order: 5 }
];

const topic3Subtopics: Subtopic[] = [
  { id: 'cs102-t3-integers-ranges-and-overflow', slug: 'integers-ranges-and-overflow', title: 'Integers: Ranges and Overflow', content: t3s1, order: 1 },
  { id: 'cs102-t3-characters-strings-and-encoding', slug: 'characters-strings-and-encoding', title: 'Characters and Encoding', content: t3s2, order: 2 },
  { id: 'cs102-t3-endianness-and-memory-layout', slug: 'endianness-and-memory-layout', title: 'Endianness and Memory Layout', content: t3s3, order: 3 },
  { id: 'cs102-t3-floating-point-ieee-754', slug: 'floating-point-ieee-754', title: 'Floating Point (IEEE-754)', content: t3s4, order: 4 },
  { id: 'cs102-t3-hex-dumps-and-debugging', slug: 'hex-dumps-and-debugging', title: 'Hex Dumps and Debugging', content: t3s5, order: 5 }
];

const topic4Subtopics: Subtopic[] = [
  { id: 'cs102-t4-truth-tables-and-basic-gates', slug: 'truth-tables-and-basic-gates', title: 'Truth Tables and Basic Gates', content: t4s1, order: 1 },
  { id: 'cs102-t4-boolean-algebra-identities', slug: 'boolean-algebra-identities', title: 'Boolean Algebra Identities', content: t4s2, order: 2 },
  { id: 'cs102-t4-expressions-to-gates', slug: 'expressions-to-gates', title: 'From Expressions to Gates', content: t4s3, order: 3 },
  { id: 'cs102-t4-canonical-forms-and-kmaps', slug: 'canonical-forms-and-kmaps', title: 'Canonical Forms and K-Maps', content: t4s4, order: 4 },
  { id: 'cs102-t4-common-building-blocks', slug: 'common-building-blocks', title: 'Common Building Blocks', content: t4s5, order: 5 }
];

const topic5Subtopics: Subtopic[] = [
  { id: 'cs102-t5-architecture-big-picture', slug: 'architecture-big-picture', title: 'Architecture: Big Picture', content: t5s1, order: 1 },
  { id: 'cs102-t5-instruction-cycle', slug: 'instruction-cycle', title: 'The Instruction Cycle', content: t5s2, order: 2 },
  { id: 'cs102-t5-registers-alu-and-buses', slug: 'registers-alu-and-buses', title: 'Registers, ALU, and Buses', content: t5s3, order: 3 },
  { id: 'cs102-t5-memory-and-addressing', slug: 'memory-and-addressing', title: 'Memory and Addressing', content: t5s4, order: 4 },
  { id: 'cs102-t5-tracing-a-simple-program', slug: 'tracing-a-simple-program', title: 'Tracing a Simple Program', content: t5s5, order: 5 }
];

const topic6Subtopics: Subtopic[] = [
  { id: 'cs102-t6-registers-and-flags', slug: 'registers-and-flags', title: 'Registers and Flags', content: t6s1, order: 1 },
  { id: 'cs102-t6-addressing-modes', slug: 'addressing-modes', title: 'Addressing Modes', content: t6s2, order: 2 },
  { id: 'cs102-t6-control-flow-patterns', slug: 'control-flow-patterns', title: 'Control Flow Patterns', content: t6s3, order: 3 },
  { id: 'cs102-t6-the-stack-and-calls', slug: 'the-stack-and-calls', title: 'The Stack and Calls', content: t6s4, order: 4 },
  { id: 'cs102-t6-tracing-and-debugging', slug: 'tracing-and-debugging', title: 'Tracing and Debugging', content: t6s5, order: 5 }
];

const topic7Subtopics: Subtopic[] = [
  { id: 'cs102-t7-locality-and-caches', slug: 'locality-and-caches', title: 'Locality and Caches', content: t7s1, order: 1 },
  { id: 'cs102-t7-cache-mapping-and-misses', slug: 'cache-mapping-and-misses', title: 'Cache Mapping and Misses', content: t7s2, order: 2 },
  { id: 'cs102-t7-virtual-memory-overview', slug: 'virtual-memory-overview', title: 'Virtual Memory Overview', content: t7s3, order: 3 },
  { id: 'cs102-t7-io-basics-interrupts-dma', slug: 'io-basics-interrupts-dma', title: 'I/O Basics: Interrupts and DMA', content: t7s4, order: 4 },
  { id: 'cs102-t7-performance-tradeoffs', slug: 'performance-tradeoffs', title: 'Performance Tradeoffs', content: t7s5, order: 5 }
];

export const cs102Topics: Topic[] = [
  {
    id: 'cs102-1',
    title: 'Number Systems and Conversion',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['cs102-quiz-1', 'cs102-quiz-1-b', 'cs102-quiz-1-c'],
    exerciseIds: ['cs102-ex-1', 'cs102-t1-ex02', 'cs102-t1-ex03', 'cs102-t1-ex04', 'cs102-t1-ex05', 'cs102-t1-ex06', 'cs102-t1-ex07', 'cs102-t1-ex08', 'cs102-t1-ex09', 'cs102-t1-ex10', 'cs102-t1-drill-1', 'cs102-t1-drill-2', 'cs102-t1-ex13', 'cs102-t1-ex14', 'cs102-t1-ex15', 'cs102-t1-ex16']
  },
  {
    id: 'cs102-2',
    title: 'Binary Arithmetic',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['cs102-quiz-2', 'cs102-quiz-2-b', 'cs102-quiz-2-c'],
    exerciseIds: ['cs102-ex-2', 'cs102-t2-ex02', 'cs102-t2-ex03', 'cs102-t2-ex04', 'cs102-t2-ex05', 'cs102-t2-ex06', 'cs102-t2-ex07', 'cs102-t2-ex08', 'cs102-t2-ex09', 'cs102-t2-ex10', 'cs102-t2-drill-1', 'cs102-t2-drill-2', 'cs102-t2-ex13', 'cs102-t2-ex14', 'cs102-t2-ex15', 'cs102-t2-ex16']
  },
  {
    id: 'cs102-3',
    title: 'Data Representation',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['cs102-quiz-3', 'cs102-quiz-3-b', 'cs102-quiz-3-c'],
    exerciseIds: ['cs102-ex-3', 'cs102-t3-ex02', 'cs102-t3-ex03', 'cs102-t3-ex04', 'cs102-t3-ex05', 'cs102-t3-ex06', 'cs102-t3-ex07', 'cs102-t3-ex08', 'cs102-t3-ex09', 'cs102-t3-ex10', 'cs102-t3-drill-1', 'cs102-t3-drill-2', 'cs102-t3-ex13', 'cs102-t3-ex14', 'cs102-t3-ex15', 'cs102-t3-ex16']
  },
  {
    id: 'cs102-4',
    title: 'Boolean Algebra and Logic Gates',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['cs102-quiz-4', 'cs102-quiz-4-b', 'cs102-quiz-4-c'],
    exerciseIds: ['cs102-ex-4', 'cs102-t4-ex02', 'cs102-t4-ex03', 'cs102-t4-ex04', 'cs102-t4-ex05', 'cs102-t4-ex06', 'cs102-t4-ex07', 'cs102-t4-ex08', 'cs102-t4-ex09', 'cs102-t4-ex10', 'cs102-t4-ex11', 'cs102-t4-drill-1', 'cs102-t4-drill-2', 'cs102-t4-ex14', 'cs102-t4-ex15', 'cs102-t4-ex16']
  },
  {
    id: 'cs102-5',
    title: 'Basic Computer Architecture',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['cs102-quiz-5', 'cs102-quiz-5-b', 'cs102-quiz-5-c'],
    exerciseIds: ['cs102-ex-5', 'cs102-t5-ex02', 'cs102-t5-ex03', 'cs102-t5-ex04', 'cs102-t5-ex05', 'cs102-t5-ex06', 'cs102-t5-ex07', 'cs102-t5-ex08', 'cs102-t5-ex09', 'cs102-t5-ex10', 'cs102-t5-drill-1', 'cs102-t5-drill-2', 'cs102-t5-ex13', 'cs102-t5-ex14', 'cs102-t5-ex15', 'cs102-t5-ex16']
  },
  {
    id: 'cs102-6',
    title: 'Assembly Language Basics',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['cs102-quiz-6', 'cs102-quiz-6-b', 'cs102-quiz-6-c'],
    exerciseIds: ['cs102-t6-ex01', 'cs102-t6-ex02', 'cs102-t6-ex03', 'cs102-t6-ex04', 'cs102-t6-ex05', 'cs102-t6-ex06', 'cs102-t6-ex07', 'cs102-t6-ex08', 'cs102-t6-ex09', 'cs102-t6-ex10', 'cs102-t6-ex11', 'cs102-t6-ex12', 'cs102-t6-ex13', 'cs102-t6-ex14', 'cs102-t6-ex15', 'cs102-t6-ex16']
  },
  {
    id: 'cs102-7',
    title: 'Memory Hierarchy and I/O',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['cs102-quiz-7', 'cs102-quiz-7-b', 'cs102-quiz-7-c'],
    exerciseIds: ['cs102-t7-ex01', 'cs102-t7-ex02', 'cs102-t7-ex03', 'cs102-t7-ex04', 'cs102-t7-ex05', 'cs102-t7-ex06', 'cs102-t7-ex07', 'cs102-t7-ex08', 'cs102-t7-ex09', 'cs102-t7-ex10', 'cs102-t7-ex11', 'cs102-t7-ex12', 'cs102-t7-ex13', 'cs102-t7-ex14', 'cs102-t7-ex15', 'cs102-t7-ex16']
  }
];
