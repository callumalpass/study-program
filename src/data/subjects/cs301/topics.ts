import type { Topic, Subtopic } from '../../../core/types';

// Topic 1: Process Management
import topic1Content from '../../../content/subjects/cs301/topic-1.md?raw';
import topic1Sub1 from '../../../content/subjects/cs301/topic-1/01-process-concept.md?raw';
import topic1Sub2 from '../../../content/subjects/cs301/topic-1/02-process-control-block.md?raw';
import topic1Sub3 from '../../../content/subjects/cs301/topic-1/03-process-scheduling.md?raw';
import topic1Sub4 from '../../../content/subjects/cs301/topic-1/04-context-switch.md?raw';
import topic1Sub5 from '../../../content/subjects/cs301/topic-1/05-process-operations.md?raw';
import topic1Sub6 from '../../../content/subjects/cs301/topic-1/06-ipc-shared-memory.md?raw';
import topic1Sub7 from '../../../content/subjects/cs301/topic-1/07-ipc-message-passing.md?raw';

// Topic 2: Threads and Concurrency
import topic2Content from '../../../content/subjects/cs301/topic-2.md?raw';
import topic2Sub1 from '../../../content/subjects/cs301/topic-2/01-thread-concept.md?raw';
import topic2Sub2 from '../../../content/subjects/cs301/topic-2/02-multithreading-models.md?raw';
import topic2Sub3 from '../../../content/subjects/cs301/topic-2/03-pthreads.md?raw';
import topic2Sub4 from '../../../content/subjects/cs301/topic-2/04-thread-pools.md?raw';
import topic2Sub5 from '../../../content/subjects/cs301/topic-2/05-thread-safety.md?raw';
import topic2Sub6 from '../../../content/subjects/cs301/topic-2/06-thread-scheduling.md?raw';
import topic2Sub7 from '../../../content/subjects/cs301/topic-2/07-implicit-threading.md?raw';

// Topic 3: CPU Scheduling
import topic3Content from '../../../content/subjects/cs301/topic-3.md?raw';
import topic3Sub1 from '../../../content/subjects/cs301/topic-3/01-scheduling-concepts.md?raw';
import topic3Sub2 from '../../../content/subjects/cs301/topic-3/02-fcfs-sjf.md?raw';
import topic3Sub3 from '../../../content/subjects/cs301/topic-3/03-round-robin.md?raw';
import topic3Sub4 from '../../../content/subjects/cs301/topic-3/04-priority-scheduling.md?raw';
import topic3Sub5 from '../../../content/subjects/cs301/topic-3/05-multilevel-queue.md?raw';
import topic3Sub6 from '../../../content/subjects/cs301/topic-3/06-multiprocessor-scheduling.md?raw';
import topic3Sub7 from '../../../content/subjects/cs301/topic-3/07-realtime-scheduling.md?raw';

// Topic 4: Synchronization
import topic4Content from '../../../content/subjects/cs301/topic-4.md?raw';
import topic4Sub1 from '../../../content/subjects/cs301/topic-4/01-critical-section.md?raw';
import topic4Sub2 from '../../../content/subjects/cs301/topic-4/02-mutex-locks.md?raw';
import topic4Sub3 from '../../../content/subjects/cs301/topic-4/03-semaphores.md?raw';
import topic4Sub4 from '../../../content/subjects/cs301/topic-4/04-classic-problems.md?raw';
import topic4Sub5 from '../../../content/subjects/cs301/topic-4/05-monitors.md?raw';
import topic4Sub6 from '../../../content/subjects/cs301/topic-4/06-liveness.md?raw';
import topic4Sub7 from '../../../content/subjects/cs301/topic-4/07-lock-free.md?raw';

// Topic 5: Deadlock
import topic5Content from '../../../content/subjects/cs301/topic-5.md?raw';
import topic5Sub1 from '../../../content/subjects/cs301/topic-5/01-deadlock-concepts.md?raw';
import topic5Sub2 from '../../../content/subjects/cs301/topic-5/02-deadlock-prevention.md?raw';
import topic5Sub3 from '../../../content/subjects/cs301/topic-5/03-deadlock-avoidance.md?raw';
import topic5Sub4 from '../../../content/subjects/cs301/topic-5/04-deadlock-detection.md?raw';
import topic5Sub5 from '../../../content/subjects/cs301/topic-5/05-deadlock-recovery.md?raw';
import topic5Sub6 from '../../../content/subjects/cs301/topic-5/06-practical-deadlock.md?raw';
import topic5Sub7 from '../../../content/subjects/cs301/topic-5/07-deadlock-examples.md?raw';

// Topic 6: Memory Management
import topic6Content from '../../../content/subjects/cs301/topic-6.md?raw';
import topic6Sub1 from '../../../content/subjects/cs301/topic-6/01-memory-basics.md?raw';
import topic6Sub2 from '../../../content/subjects/cs301/topic-6/02-contiguous-allocation.md?raw';
import topic6Sub3 from '../../../content/subjects/cs301/topic-6/03-paging.md?raw';
import topic6Sub4 from '../../../content/subjects/cs301/topic-6/04-page-tables.md?raw';
import topic6Sub5 from '../../../content/subjects/cs301/topic-6/05-tlb.md?raw';
import topic6Sub6 from '../../../content/subjects/cs301/topic-6/06-segmentation.md?raw';
import topic6Sub7 from '../../../content/subjects/cs301/topic-6/07-swapping.md?raw';

// Topic 7: Virtual Memory and File Systems
import topic7Content from '../../../content/subjects/cs301/topic-7.md?raw';
import topic7Sub1 from '../../../content/subjects/cs301/topic-7/01-virtual-memory.md?raw';
import topic7Sub2 from '../../../content/subjects/cs301/topic-7/02-page-replacement.md?raw';
import topic7Sub3 from '../../../content/subjects/cs301/topic-7/03-thrashing.md?raw';
import topic7Sub4 from '../../../content/subjects/cs301/topic-7/04-memory-mapped-files.md?raw';
import topic7Sub5 from '../../../content/subjects/cs301/topic-7/05-file-concepts.md?raw';
import topic7Sub6 from '../../../content/subjects/cs301/topic-7/06-file-implementation.md?raw';
import topic7Sub7 from '../../../content/subjects/cs301/topic-7/07-file-systems.md?raw';

// Topic 1 Subtopics
const topic1Subtopics: Subtopic[] = [
  { id: 'cs301-t1-concept', slug: 'process-concept', title: 'Process Concept', content: topic1Sub1, order: 1 },
  { id: 'cs301-t1-pcb', slug: 'process-control-block', title: 'Process Control Block', content: topic1Sub2, order: 2 },
  { id: 'cs301-t1-scheduling', slug: 'process-scheduling', title: 'Process Scheduling', content: topic1Sub3, order: 3 },
  { id: 'cs301-t1-context', slug: 'context-switch', title: 'Context Switching', content: topic1Sub4, order: 4 },
  { id: 'cs301-t1-operations', slug: 'process-operations', title: 'Process Operations', content: topic1Sub5, order: 5 },
  { id: 'cs301-t1-shared', slug: 'ipc-shared-memory', title: 'IPC: Shared Memory', content: topic1Sub6, order: 6 },
  { id: 'cs301-t1-message', slug: 'ipc-message-passing', title: 'IPC: Message Passing', content: topic1Sub7, order: 7 },
];

// Topic 2 Subtopics
const topic2Subtopics: Subtopic[] = [
  { id: 'cs301-t2-concept', slug: 'thread-concept', title: 'Thread Concept', content: topic2Sub1, order: 1 },
  { id: 'cs301-t2-models', slug: 'multithreading-models', title: 'Multithreading Models', content: topic2Sub2, order: 2 },
  { id: 'cs301-t2-pthreads', slug: 'pthreads', title: 'Pthreads Library', content: topic2Sub3, order: 3 },
  { id: 'cs301-t2-pools', slug: 'thread-pools', title: 'Thread Pools', content: topic2Sub4, order: 4 },
  { id: 'cs301-t2-safety', slug: 'thread-safety', title: 'Thread Safety', content: topic2Sub5, order: 5 },
  { id: 'cs301-t2-scheduling', slug: 'thread-scheduling', title: 'Thread Scheduling', content: topic2Sub6, order: 6 },
  { id: 'cs301-t2-implicit', slug: 'implicit-threading', title: 'Implicit Threading', content: topic2Sub7, order: 7 },
];

// Topic 3 Subtopics
const topic3Subtopics: Subtopic[] = [
  { id: 'cs301-t3-concepts', slug: 'scheduling-concepts', title: 'Scheduling Concepts', content: topic3Sub1, order: 1 },
  { id: 'cs301-t3-fcfs', slug: 'fcfs-sjf', title: 'FCFS and SJF', content: topic3Sub2, order: 2 },
  { id: 'cs301-t3-rr', slug: 'round-robin', title: 'Round Robin', content: topic3Sub3, order: 3 },
  { id: 'cs301-t3-priority', slug: 'priority-scheduling', title: 'Priority Scheduling', content: topic3Sub4, order: 4 },
  { id: 'cs301-t3-multilevel', slug: 'multilevel-queue', title: 'Multilevel Queue', content: topic3Sub5, order: 5 },
  { id: 'cs301-t3-multiprocessor', slug: 'multiprocessor-scheduling', title: 'Multiprocessor Scheduling', content: topic3Sub6, order: 6 },
  { id: 'cs301-t3-realtime', slug: 'realtime-scheduling', title: 'Real-Time Scheduling', content: topic3Sub7, order: 7 },
];

// Topic 4 Subtopics
const topic4Subtopics: Subtopic[] = [
  { id: 'cs301-t4-critical', slug: 'critical-section', title: 'Critical Section Problem', content: topic4Sub1, order: 1 },
  { id: 'cs301-t4-mutex', slug: 'mutex-locks', title: 'Mutex Locks', content: topic4Sub2, order: 2 },
  { id: 'cs301-t4-semaphores', slug: 'semaphores', title: 'Semaphores', content: topic4Sub3, order: 3 },
  { id: 'cs301-t4-classic', slug: 'classic-problems', title: 'Classic Synchronization Problems', content: topic4Sub4, order: 4 },
  { id: 'cs301-t4-monitors', slug: 'monitors', title: 'Monitors', content: topic4Sub5, order: 5 },
  { id: 'cs301-t4-liveness', slug: 'liveness', title: 'Liveness and Deadlock', content: topic4Sub6, order: 6 },
  { id: 'cs301-t4-lockfree', slug: 'lock-free', title: 'Lock-Free Synchronization', content: topic4Sub7, order: 7 },
];

// Topic 5 Subtopics
const topic5Subtopics: Subtopic[] = [
  { id: 'cs301-t5-concepts', slug: 'deadlock-concepts', title: 'Deadlock Concepts', content: topic5Sub1, order: 1 },
  { id: 'cs301-t5-prevention', slug: 'deadlock-prevention', title: 'Deadlock Prevention', content: topic5Sub2, order: 2 },
  { id: 'cs301-t5-avoidance', slug: 'deadlock-avoidance', title: 'Deadlock Avoidance', content: topic5Sub3, order: 3 },
  { id: 'cs301-t5-detection', slug: 'deadlock-detection', title: 'Deadlock Detection', content: topic5Sub4, order: 4 },
  { id: 'cs301-t5-recovery', slug: 'deadlock-recovery', title: 'Deadlock Recovery', content: topic5Sub5, order: 5 },
  { id: 'cs301-t5-practical', slug: 'practical-deadlock', title: 'Practical Deadlock Handling', content: topic5Sub6, order: 6 },
  { id: 'cs301-t5-examples', slug: 'deadlock-examples', title: 'Deadlock Examples', content: topic5Sub7, order: 7 },
];

// Topic 6 Subtopics
const topic6Subtopics: Subtopic[] = [
  { id: 'cs301-t6-basics', slug: 'memory-basics', title: 'Memory Management Basics', content: topic6Sub1, order: 1 },
  { id: 'cs301-t6-contiguous', slug: 'contiguous-allocation', title: 'Contiguous Allocation', content: topic6Sub2, order: 2 },
  { id: 'cs301-t6-paging', slug: 'paging', title: 'Paging', content: topic6Sub3, order: 3 },
  { id: 'cs301-t6-tables', slug: 'page-tables', title: 'Page Table Structures', content: topic6Sub4, order: 4 },
  { id: 'cs301-t6-tlb', slug: 'tlb', title: 'Translation Lookaside Buffer', content: topic6Sub5, order: 5 },
  { id: 'cs301-t6-segmentation', slug: 'segmentation', title: 'Segmentation', content: topic6Sub6, order: 6 },
  { id: 'cs301-t6-swapping', slug: 'swapping', title: 'Swapping', content: topic6Sub7, order: 7 },
];

// Topic 7 Subtopics
const topic7Subtopics: Subtopic[] = [
  { id: 'cs301-t7-vm', slug: 'virtual-memory', title: 'Virtual Memory Concepts', content: topic7Sub1, order: 1 },
  { id: 'cs301-t7-replacement', slug: 'page-replacement', title: 'Page Replacement Algorithms', content: topic7Sub2, order: 2 },
  { id: 'cs301-t7-thrashing', slug: 'thrashing', title: 'Thrashing and Working Sets', content: topic7Sub3, order: 3 },
  { id: 'cs301-t7-mmap', slug: 'memory-mapped-files', title: 'Memory-Mapped Files', content: topic7Sub4, order: 4 },
  { id: 'cs301-t7-files', slug: 'file-concepts', title: 'File System Concepts', content: topic7Sub5, order: 5 },
  { id: 'cs301-t7-impl', slug: 'file-implementation', title: 'File System Implementation', content: topic7Sub6, order: 6 },
  { id: 'cs301-t7-examples', slug: 'file-systems', title: 'File System Examples', content: topic7Sub7, order: 7 },
];

export const cs301Topics: Topic[] = [
  {
    id: 'cs301-1',
    title: 'Process Management',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['cs301-quiz-1-1', 'cs301-quiz-1-2', 'cs301-quiz-1-3'],
    exerciseIds: ['cs301-ex-1-1', 'cs301-ex-1-2', 'cs301-ex-1-3', 'cs301-ex-1-4', 'cs301-ex-1-5', 'cs301-ex-1-6', 'cs301-ex-1-7', 'cs301-ex-1-8', 'cs301-ex-1-9', 'cs301-ex-1-10', 'cs301-ex-1-11', 'cs301-ex-1-12', 'cs301-ex-1-13', 'cs301-ex-1-14', 'cs301-ex-1-15', 'cs301-ex-1-16']
  },
  {
    id: 'cs301-2',
    title: 'Threads and Concurrency',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['cs301-quiz-2-1', 'cs301-quiz-2-2', 'cs301-quiz-2-3'],
    exerciseIds: ['cs301-ex-2-1', 'cs301-ex-2-2', 'cs301-ex-2-3', 'cs301-ex-2-4', 'cs301-ex-2-5', 'cs301-ex-2-6', 'cs301-ex-2-7', 'cs301-ex-2-8', 'cs301-ex-2-9', 'cs301-ex-2-10', 'cs301-ex-2-11', 'cs301-ex-2-12', 'cs301-ex-2-13', 'cs301-ex-2-14', 'cs301-ex-2-15', 'cs301-ex-2-16']
  },
  {
    id: 'cs301-3',
    title: 'CPU Scheduling',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['cs301-quiz-3-1', 'cs301-quiz-3-2', 'cs301-quiz-3-3'],
    exerciseIds: ['cs301-ex-3-1', 'cs301-ex-3-2', 'cs301-ex-3-3', 'cs301-ex-3-4', 'cs301-ex-3-5', 'cs301-ex-3-6', 'cs301-ex-3-7', 'cs301-ex-3-8', 'cs301-ex-3-9', 'cs301-ex-3-10', 'cs301-ex-3-11', 'cs301-ex-3-12', 'cs301-ex-3-13', 'cs301-ex-3-14', 'cs301-ex-3-15', 'cs301-ex-3-16']
  },
  {
    id: 'cs301-4',
    title: 'Synchronization',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['cs301-quiz-4-1', 'cs301-quiz-4-2', 'cs301-quiz-4-3'],
    exerciseIds: ['cs301-ex-4-1', 'cs301-ex-4-2', 'cs301-ex-4-3', 'cs301-ex-4-4', 'cs301-ex-4-5', 'cs301-ex-4-6', 'cs301-ex-4-7', 'cs301-ex-4-8', 'cs301-ex-4-9', 'cs301-ex-4-10', 'cs301-ex-4-11', 'cs301-ex-4-12', 'cs301-ex-4-13', 'cs301-ex-4-14', 'cs301-ex-4-15', 'cs301-ex-4-16']
  },
  {
    id: 'cs301-5',
    title: 'Deadlock',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['cs301-quiz-5-1', 'cs301-quiz-5-2', 'cs301-quiz-5-3'],
    exerciseIds: ['cs301-ex-5-1', 'cs301-ex-5-2', 'cs301-ex-5-3', 'cs301-ex-5-4', 'cs301-ex-5-5', 'cs301-ex-5-6', 'cs301-ex-5-7', 'cs301-ex-5-8', 'cs301-ex-5-9', 'cs301-ex-5-10', 'cs301-ex-5-11', 'cs301-ex-5-12', 'cs301-ex-5-13', 'cs301-ex-5-14', 'cs301-ex-5-15', 'cs301-ex-5-16']
  },
  {
    id: 'cs301-6',
    title: 'Memory Management',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['cs301-quiz-6-1', 'cs301-quiz-6-2', 'cs301-quiz-6-3'],
    exerciseIds: ['cs301-ex-6-1', 'cs301-ex-6-2', 'cs301-ex-6-3', 'cs301-ex-6-4', 'cs301-ex-6-5', 'cs301-ex-6-6', 'cs301-ex-6-7', 'cs301-ex-6-8', 'cs301-ex-6-9', 'cs301-ex-6-10', 'cs301-ex-6-11', 'cs301-ex-6-12', 'cs301-ex-6-13', 'cs301-ex-6-14', 'cs301-ex-6-15', 'cs301-ex-6-16']
  },
  {
    id: 'cs301-7',
    title: 'Virtual Memory and File Systems',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['cs301-quiz-7-1', 'cs301-quiz-7-2', 'cs301-quiz-7-3'],
    exerciseIds: ['cs301-ex-7-1', 'cs301-ex-7-2', 'cs301-ex-7-3', 'cs301-ex-7-4', 'cs301-ex-7-5', 'cs301-ex-7-6', 'cs301-ex-7-7', 'cs301-ex-7-8', 'cs301-ex-7-9', 'cs301-ex-7-10', 'cs301-ex-7-11', 'cs301-ex-7-12', 'cs301-ex-7-13', 'cs301-ex-7-14', 'cs301-ex-7-15', 'cs301-ex-7-16']
  }
];
