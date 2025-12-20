import type { Topic, Subtopic } from '../../core/types';

// Import main topic content
import topic1Content from './content/topic-1.md?raw';
import topic2Content from './content/topic-2.md?raw';
import topic3Content from './content/topic-3.md?raw';
import topic4Content from './content/topic-4.md?raw';
import topic5Content from './content/topic-5.md?raw';
import topic6Content from './content/topic-6.md?raw';
import topic7Content from './content/topic-7.md?raw';

// Import subtopic content
import topic1_01 from './content/topic-1/01-introduction.md?raw';
import topic1_02 from './content/topic-1/02-instruction-formats.md?raw';
import topic1_03 from './content/topic-1/03-addressing-modes.md?raw';
import topic1_04 from './content/topic-1/04-data-types.md?raw';
import topic1_05 from './content/topic-1/05-instruction-types.md?raw';
import topic1_06 from './content/topic-1/06-cisc-vs-risc.md?raw';
import topic1_07 from './content/topic-1/07-modern-isas.md?raw';

import topic2_01 from './content/topic-2/01-introduction.md?raw';
import topic2_02 from './content/topic-2/02-instructions.md?raw';
import topic2_03 from './content/topic-2/03-control-flow.md?raw';
import topic2_04 from './content/topic-2/04-memory-addressing.md?raw';
import topic2_05 from './content/topic-2/05-procedures.md?raw';
import topic2_06 from './content/topic-2/06-system-calls.md?raw';
import topic2_07 from './content/topic-2/07-debugging.md?raw';

import topic3_01 from './content/topic-3/01-overview.md?raw';
import topic3_02 from './content/topic-3/02-single-cycle.md?raw';
import topic3_03 from './content/topic-3/03-control-unit.md?raw';
import topic3_04 from './content/topic-3/04-multi-cycle.md?raw';
import topic3_05 from './content/topic-3/05-alu-design.md?raw';
import topic3_06 from './content/topic-3/06-register-file.md?raw';
import topic3_07 from './content/topic-3/07-performance.md?raw';

import topic4_01 from './content/topic-4/01-introduction.md?raw';
import topic4_02 from './content/topic-4/02-hazards.md?raw';
import topic4_03 from './content/topic-4/03-forwarding.md?raw';
import topic4_04 from './content/topic-4/04-branch-prediction.md?raw';
import topic4_05 from './content/topic-4/05-exceptions.md?raw';
import topic4_06 from './content/topic-4/06-advanced.md?raw';
import topic4_07 from './content/topic-4/07-performance.md?raw';

import topic5_01 from './content/topic-5/01-introduction.md?raw';
import topic5_02 from './content/topic-5/02-organization.md?raw';
import topic5_03 from './content/topic-5/03-write-policies.md?raw';
import topic5_04 from './content/topic-5/04-miss-types.md?raw';
import topic5_05 from './content/topic-5/05-multi-level.md?raw';
import topic5_06 from './content/topic-5/06-optimization.md?raw';
import topic5_07 from './content/topic-5/07-virtual-memory.md?raw';

import topic6_01 from './content/topic-6/01-introduction.md?raw';
import topic6_02 from './content/topic-6/02-dram.md?raw';
import topic6_03 from './content/topic-6/03-storage.md?raw';
import topic6_04 from './content/topic-6/04-memory-controllers.md?raw';
import topic6_05 from './content/topic-6/05-bandwidth-latency.md?raw';
import topic6_06 from './content/topic-6/06-emerging-memory.md?raw';
import topic6_07 from './content/topic-6/07-hierarchy-design.md?raw';

import topic7_01 from './content/topic-7/01-introduction.md?raw';
import topic7_02 from './content/topic-7/02-superscalar.md?raw';
import topic7_03 from './content/topic-7/03-dynamic-scheduling.md?raw';
import topic7_04 from './content/topic-7/04-speculation.md?raw';
import topic7_05 from './content/topic-7/05-vliw.md?raw';
import topic7_06 from './content/topic-7/06-data-parallelism.md?raw';
import topic7_07 from './content/topic-7/07-limits.md?raw';

// Topic 1 Subtopics
const topic1Subtopics: Subtopic[] = [
  { id: 'cs202-t1-intro', slug: 'introduction', title: 'Introduction to ISA', content: topic1_01, order: 1 },
  { id: 'cs202-t1-formats', slug: 'instruction-formats', title: 'Instruction Formats', content: topic1_02, order: 2 },
  { id: 'cs202-t1-addressing', slug: 'addressing-modes', title: 'Addressing Modes', content: topic1_03, order: 3 },
  { id: 'cs202-t1-datatypes', slug: 'data-types', title: 'Data Types and Operations', content: topic1_04, order: 4 },
  { id: 'cs202-t1-instrtypes', slug: 'instruction-types', title: 'Instruction Types', content: topic1_05, order: 5 },
  { id: 'cs202-t1-ciscrisc', slug: 'cisc-vs-risc', title: 'CISC vs RISC', content: topic1_06, order: 6 },
  { id: 'cs202-t1-modern', slug: 'modern-isas', title: 'Modern ISAs', content: topic1_07, order: 7 },
];

// Topic 2 Subtopics
const topic2Subtopics: Subtopic[] = [
  { id: 'cs202-t2-intro', slug: 'introduction', title: 'Introduction to Assembly', content: topic2_01, order: 1 },
  { id: 'cs202-t2-instr', slug: 'instructions', title: 'Basic Instructions', content: topic2_02, order: 2 },
  { id: 'cs202-t2-control', slug: 'control-flow', title: 'Control Flow', content: topic2_03, order: 3 },
  { id: 'cs202-t2-memory', slug: 'memory-addressing', title: 'Memory Addressing', content: topic2_04, order: 4 },
  { id: 'cs202-t2-procedures', slug: 'procedures', title: 'Procedures and Stack', content: topic2_05, order: 5 },
  { id: 'cs202-t2-syscalls', slug: 'system-calls', title: 'System Calls', content: topic2_06, order: 6 },
  { id: 'cs202-t2-debug', slug: 'debugging', title: 'Debugging Assembly', content: topic2_07, order: 7 },
];

// Topic 3 Subtopics
const topic3Subtopics: Subtopic[] = [
  { id: 'cs202-t3-overview', slug: 'overview', title: 'Datapath Overview', content: topic3_01, order: 1 },
  { id: 'cs202-t3-single', slug: 'single-cycle', title: 'Single-Cycle Datapath', content: topic3_02, order: 2 },
  { id: 'cs202-t3-control', slug: 'control-unit', title: 'Control Unit Design', content: topic3_03, order: 3 },
  { id: 'cs202-t3-multi', slug: 'multi-cycle', title: 'Multi-Cycle Datapath', content: topic3_04, order: 4 },
  { id: 'cs202-t3-alu', slug: 'alu-design', title: 'ALU Design', content: topic3_05, order: 5 },
  { id: 'cs202-t3-regfile', slug: 'register-file', title: 'Register File Design', content: topic3_06, order: 6 },
  { id: 'cs202-t3-perf', slug: 'performance', title: 'Performance Analysis', content: topic3_07, order: 7 },
];

// Topic 4 Subtopics
const topic4Subtopics: Subtopic[] = [
  { id: 'cs202-t4-intro', slug: 'introduction', title: 'Introduction to Pipelining', content: topic4_01, order: 1 },
  { id: 'cs202-t4-hazards', slug: 'hazards', title: 'Pipeline Hazards', content: topic4_02, order: 2 },
  { id: 'cs202-t4-forwarding', slug: 'forwarding', title: 'Data Forwarding', content: topic4_03, order: 3 },
  { id: 'cs202-t4-branch', slug: 'branch-prediction', title: 'Branch Prediction', content: topic4_04, order: 4 },
  { id: 'cs202-t4-exceptions', slug: 'exceptions', title: 'Exceptions in Pipelines', content: topic4_05, order: 5 },
  { id: 'cs202-t4-advanced', slug: 'advanced', title: 'Advanced Pipelining', content: topic4_06, order: 6 },
  { id: 'cs202-t4-perf', slug: 'performance', title: 'Pipeline Performance', content: topic4_07, order: 7 },
];

// Topic 5 Subtopics
const topic5Subtopics: Subtopic[] = [
  { id: 'cs202-t5-intro', slug: 'introduction', title: 'Introduction to Caches', content: topic5_01, order: 1 },
  { id: 'cs202-t5-org', slug: 'organization', title: 'Cache Organization', content: topic5_02, order: 2 },
  { id: 'cs202-t5-write', slug: 'write-policies', title: 'Write Policies', content: topic5_03, order: 3 },
  { id: 'cs202-t5-miss', slug: 'miss-types', title: 'Miss Classification', content: topic5_04, order: 4 },
  { id: 'cs202-t5-multi', slug: 'multi-level', title: 'Multi-Level Caches', content: topic5_05, order: 5 },
  { id: 'cs202-t5-opt', slug: 'optimization', title: 'Cache Optimization', content: topic5_06, order: 6 },
  { id: 'cs202-t5-vm', slug: 'virtual-memory', title: 'Virtual Memory Integration', content: topic5_07, order: 7 },
];

// Topic 6 Subtopics
const topic6Subtopics: Subtopic[] = [
  { id: 'cs202-t6-intro', slug: 'introduction', title: 'Memory Hierarchy Introduction', content: topic6_01, order: 1 },
  { id: 'cs202-t6-dram', slug: 'dram', title: 'DRAM Organization', content: topic6_02, order: 2 },
  { id: 'cs202-t6-storage', slug: 'storage', title: 'Storage Systems', content: topic6_03, order: 3 },
  { id: 'cs202-t6-controllers', slug: 'memory-controllers', title: 'Memory Controllers', content: topic6_04, order: 4 },
  { id: 'cs202-t6-bandwidth', slug: 'bandwidth-latency', title: 'Bandwidth and Latency', content: topic6_05, order: 5 },
  { id: 'cs202-t6-emerging', slug: 'emerging-memory', title: 'Emerging Memory Technologies', content: topic6_06, order: 6 },
  { id: 'cs202-t6-design', slug: 'hierarchy-design', title: 'Hierarchy Design', content: topic6_07, order: 7 },
];

// Topic 7 Subtopics
const topic7Subtopics: Subtopic[] = [
  { id: 'cs202-t7-intro', slug: 'introduction', title: 'Introduction to ILP', content: topic7_01, order: 1 },
  { id: 'cs202-t7-superscalar', slug: 'superscalar', title: 'Superscalar Processors', content: topic7_02, order: 2 },
  { id: 'cs202-t7-dynamic', slug: 'dynamic-scheduling', title: 'Dynamic Scheduling', content: topic7_03, order: 3 },
  { id: 'cs202-t7-speculation', slug: 'speculation', title: 'Speculative Execution', content: topic7_04, order: 4 },
  { id: 'cs202-t7-vliw', slug: 'vliw', title: 'VLIW Architecture', content: topic7_05, order: 5 },
  { id: 'cs202-t7-simd', slug: 'data-parallelism', title: 'Data-Level Parallelism', content: topic7_06, order: 6 },
  { id: 'cs202-t7-limits', slug: 'limits', title: 'Limits of ILP', content: topic7_07, order: 7 },
];

export const cs202Topics: Topic[] = [
  {
    id: 'cs202-topic1',
    title: 'Instruction Set Architecture',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['cs202-topic1-quiz1', 'cs202-topic1-quiz2', 'cs202-topic1-quiz3'],
    exerciseIds: [
      'cs202-t1-ex1', 'cs202-t1-ex2', 'cs202-t1-ex3', 'cs202-t1-ex4',
      'cs202-t1-ex5', 'cs202-t1-ex6', 'cs202-t1-ex7', 'cs202-t1-ex8',
      'cs202-t1-ex9', 'cs202-t1-ex10', 'cs202-t1-ex11', 'cs202-t1-ex12',
      'cs202-t1-ex13', 'cs202-t1-ex14', 'cs202-t1-ex15', 'cs202-t1-ex16',
    ],
  },
  {
    id: 'cs202-topic2',
    title: 'Assembly Language Programming',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['cs202-topic2-quiz1', 'cs202-topic2-quiz2', 'cs202-topic2-quiz3'],
    exerciseIds: [
      'cs202-t2-ex1', 'cs202-t2-ex2', 'cs202-t2-ex3', 'cs202-t2-ex4',
      'cs202-t2-ex5', 'cs202-t2-ex6', 'cs202-t2-ex7', 'cs202-t2-ex8',
      'cs202-t2-ex9', 'cs202-t2-ex10', 'cs202-t2-ex11', 'cs202-t2-ex12',
      'cs202-t2-ex13', 'cs202-t2-ex14', 'cs202-t2-ex15', 'cs202-t2-ex16',
    ],
  },
  {
    id: 'cs202-topic3',
    title: 'CPU Datapath and Control',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['cs202-topic3-quiz1', 'cs202-topic3-quiz2', 'cs202-topic3-quiz3'],
    exerciseIds: [
      'cs202-t3-ex1', 'cs202-t3-ex2', 'cs202-t3-ex3', 'cs202-t3-ex4',
      'cs202-t3-ex5', 'cs202-t3-ex6', 'cs202-t3-ex7', 'cs202-t3-ex8',
      'cs202-t3-ex9', 'cs202-t3-ex10', 'cs202-t3-ex11', 'cs202-t3-ex12',
      'cs202-t3-ex13', 'cs202-t3-ex14', 'cs202-t3-ex15', 'cs202-t3-ex16',
    ],
  },
  {
    id: 'cs202-topic4',
    title: 'Pipelining',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['cs202-topic4-quiz1', 'cs202-topic4-quiz2', 'cs202-topic4-quiz3'],
    exerciseIds: [
      'cs202-t4-ex1', 'cs202-t4-ex2', 'cs202-t4-ex3', 'cs202-t4-ex4',
      'cs202-t4-ex5', 'cs202-t4-ex6', 'cs202-t4-ex7', 'cs202-t4-ex8',
      'cs202-t4-ex9', 'cs202-t4-ex10', 'cs202-t4-ex11', 'cs202-t4-ex12',
      'cs202-t4-ex13', 'cs202-t4-ex14', 'cs202-t4-ex15', 'cs202-t4-ex16',
    ],
  },
  {
    id: 'cs202-topic5',
    title: 'Cache Memory',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['cs202-topic5-quiz1', 'cs202-topic5-quiz2', 'cs202-topic5-quiz3'],
    exerciseIds: [
      'cs202-t5-ex1', 'cs202-t5-ex2', 'cs202-t5-ex3', 'cs202-t5-ex4',
      'cs202-t5-ex5', 'cs202-t5-ex6', 'cs202-t5-ex7', 'cs202-t5-ex8',
      'cs202-t5-ex9', 'cs202-t5-ex10', 'cs202-t5-ex11', 'cs202-t5-ex12',
      'cs202-t5-ex13', 'cs202-t5-ex14', 'cs202-t5-ex15', 'cs202-t5-ex16',
    ],
  },
  {
    id: 'cs202-topic6',
    title: 'Memory Hierarchy',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['cs202-topic6-quiz1', 'cs202-topic6-quiz2', 'cs202-topic6-quiz3'],
    exerciseIds: [
      'cs202-t6-ex1', 'cs202-t6-ex2', 'cs202-t6-ex3', 'cs202-t6-ex4',
      'cs202-t6-ex5', 'cs202-t6-ex6', 'cs202-t6-ex7', 'cs202-t6-ex8',
      'cs202-t6-ex9', 'cs202-t6-ex10', 'cs202-t6-ex11', 'cs202-t6-ex12',
      'cs202-t6-ex13', 'cs202-t6-ex14', 'cs202-t6-ex15', 'cs202-t6-ex16',
    ],
  },
  {
    id: 'cs202-topic7',
    title: 'Instruction-Level Parallelism',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['cs202-topic7-quiz1', 'cs202-topic7-quiz2', 'cs202-topic7-quiz3'],
    exerciseIds: [
      'cs202-t7-ex1', 'cs202-t7-ex2', 'cs202-t7-ex3', 'cs202-t7-ex4',
      'cs202-t7-ex5', 'cs202-t7-ex6', 'cs202-t7-ex7', 'cs202-t7-ex8',
      'cs202-t7-ex9', 'cs202-t7-ex10', 'cs202-t7-ex11', 'cs202-t7-ex12',
      'cs202-t7-ex13', 'cs202-t7-ex14', 'cs202-t7-ex15', 'cs202-t7-ex16',
    ],
  },
];
