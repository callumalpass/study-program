/**
 * CS401 Topics
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
    number: 1,
    title: 'Distributed Systems Fundamentals',
  },
  {
    number: 1,
    title: 'Introduction to Distributed Systems',
  },
  {
    number: 1,
    title: 'Physical and Logical Time',
  },
  {
    number: 1,
    title: 'The Consensus Problem',
  },
  {
    number: 1,
    title: 'Replication Basics',
  },
  {
    number: 1,
    title: 'Failure Models',
  },
  {
    number: 1,
    title: 'MapReduce Model',
  },
  {
    number: 1,
    title: 'Introduction to Microservices',
  },
  {
    number: 2,
    title: 'System Models',
  },
  {
    number: 2,
    title: 'Time and Coordination',
  },
  {
    number: 2,
    title: 'Lamport Clocks',
  },
  {
    number: 2,
    title: 'Two-Phase Commit',
  },
  {
    number: 2,
    title: 'Primary-Backup Replication',
  },
  {
    number: 2,
    title: 'Failure Detection',
  },
  {
    number: 2,
    title: 'Hadoop Ecosystem',
  },
  {
    number: 2,
    title: 'Service Communication',
  },
  {
    number: 3,
    title: 'Communication Paradigms',
  },
  {
    number: 3,
    title: 'Vector Clocks',
  },
  {
    number: 3,
    title: 'Consensus Algorithms',
  },
  {
    number: 3,
    title: 'Three-Phase Commit',
  },
  {
    number: 3,
    title: 'Chain Replication',
  },
  {
    number: 3,
    title: 'Recovery Techniques',
  },
  {
    number: 3,
    title: 'Apache Spark',
  },
  {
    number: 3,
    title: 'API Gateways',
  },
  {
    number: 4,
    title: 'Remote Procedure Calls',
  },
  {
    number: 4,
    title: 'Global State',
  },
  {
    number: 4,
    title: 'Paxos',
  },
  {
    number: 4,
    title: 'Replication and Consistency',
  },
  {
    number: 4,
    title: 'Consistency Models',
  },
  {
    number: 4,
    title: 'Checkpointing',
  },
  {
    number: 4,
    title: 'Distributed Storage',
  },
  {
    number: 4,
    title: 'Service Discovery',
  },
  {
    number: 5,
    title: 'Naming and Discovery',
  },
  {
    number: 5,
    title: 'Distributed Snapshots',
  },
  {
    number: 5,
    title: 'Raft',
  },
  {
    number: 5,
    title: 'Eventual Consistency',
  },
  {
    number: 5,
    title: 'Fault Tolerance',
  },
  {
    number: 5,
    title: 'Logging',
  },
  {
    number: 5,
    title: 'Stream Processing',
  },
  {
    number: 5,
    title: 'Circuit Breakers',
  },
  {
    number: 6,
    title: 'Architectural Patterns',
  },
  {
    number: 6,
    title: 'Leader Election',
  },
  {
    number: 6,
    title: 'Byzantine Fault Tolerance',
  },
  {
    number: 6,
    title: 'Conflict Resolution',
  },
  {
    number: 6,
    title: 'Replication for Fault Tolerance',
  },
  {
    number: 6,
    title: 'MapReduce and Big Data',
  },
  {
    number: 6,
    title: 'Batch vs Stream',
  },
  {
    number: 6,
    title: 'Distributed Tracing',
  },
  {
    number: 7,
    title: 'CAP Theorem',
    quizIds: ['cs401-quiz-1-1', 'cs401-quiz-1-2', 'cs401-quiz-1-3'],
  },
  {
    number: 7,
    title: 'Mutual Exclusion',
    quizIds: ['cs401-quiz-2-1', 'cs401-quiz-2-2', 'cs401-quiz-2-3'],
  },
  {
    number: 7,
    title: 'Blockchain Consensus',
    quizIds: ['cs401-quiz-3-1', 'cs401-quiz-3-2', 'cs401-quiz-3-3'],
  },
  {
    number: 7,
    title: 'CRDTs',
    quizIds: ['cs401-quiz-4-1', 'cs401-quiz-4-2', 'cs401-quiz-4-3'],
  },
  {
    number: 7,
    title: 'Chaos Engineering',
    quizIds: ['cs401-quiz-5-1', 'cs401-quiz-5-2', 'cs401-quiz-5-3'],
  },
  {
    number: 7,
    title: 'Data Pipelines',
    quizIds: ['cs401-quiz-6-1', 'cs401-quiz-6-2', 'cs401-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Microservices Architecture',
  },
  {
    number: 7,
    title: 'Event-Driven Architecture',
    quizIds: ['cs401-quiz-7-1', 'cs401-quiz-7-2', 'cs401-quiz-7-3'],
  },
];

export const cs401Topics: Topic[] = buildTopicsFromGlob('cs401', content, topicConfigs);
