import type { Topic } from '../../../core/types';

import topic1_1 from '../../../content/subjects/cs401/topic-1/01-distributed-systems-intro.md?raw';
import topic1_2 from '../../../content/subjects/cs401/topic-1/02-system-models.md?raw';
import topic1_3 from '../../../content/subjects/cs401/topic-1/03-communication-paradigms.md?raw';
import topic1_4 from '../../../content/subjects/cs401/topic-1/04-remote-procedure-calls.md?raw';
import topic1_5 from '../../../content/subjects/cs401/topic-1/05-naming-discovery.md?raw';
import topic1_6 from '../../../content/subjects/cs401/topic-1/06-architectural-patterns.md?raw';
import topic1_7 from '../../../content/subjects/cs401/topic-1/07-cap-theorem.md?raw';

import topic2_1 from '../../../content/subjects/cs401/topic-2/01-physical-logical-time.md?raw';
import topic2_2 from '../../../content/subjects/cs401/topic-2/02-lamport-clocks.md?raw';
import topic2_3 from '../../../content/subjects/cs401/topic-2/03-vector-clocks.md?raw';
import topic2_4 from '../../../content/subjects/cs401/topic-2/04-global-state.md?raw';
import topic2_5 from '../../../content/subjects/cs401/topic-2/05-distributed-snapshots.md?raw';
import topic2_6 from '../../../content/subjects/cs401/topic-2/06-leader-election.md?raw';
import topic2_7 from '../../../content/subjects/cs401/topic-2/07-mutual-exclusion.md?raw';

import topic3_1 from '../../../content/subjects/cs401/topic-3/01-consensus-problem.md?raw';
import topic3_2 from '../../../content/subjects/cs401/topic-3/02-two-phase-commit.md?raw';
import topic3_3 from '../../../content/subjects/cs401/topic-3/03-three-phase-commit.md?raw';
import topic3_4 from '../../../content/subjects/cs401/topic-3/04-paxos.md?raw';
import topic3_5 from '../../../content/subjects/cs401/topic-3/05-raft.md?raw';
import topic3_6 from '../../../content/subjects/cs401/topic-3/06-byzantine-fault-tolerance.md?raw';
import topic3_7 from '../../../content/subjects/cs401/topic-3/07-blockchain-consensus.md?raw';

import topic4_1 from '../../../content/subjects/cs401/topic-4/01-replication-basics.md?raw';
import topic4_2 from '../../../content/subjects/cs401/topic-4/02-primary-backup.md?raw';
import topic4_3 from '../../../content/subjects/cs401/topic-4/03-chain-replication.md?raw';
import topic4_4 from '../../../content/subjects/cs401/topic-4/04-consistency-models.md?raw';
import topic4_5 from '../../../content/subjects/cs401/topic-4/05-eventual-consistency.md?raw';
import topic4_6 from '../../../content/subjects/cs401/topic-4/06-conflict-resolution.md?raw';
import topic4_7 from '../../../content/subjects/cs401/topic-4/07-crdts.md?raw';

import topic5_1 from '../../../content/subjects/cs401/topic-5/01-failure-models.md?raw';
import topic5_2 from '../../../content/subjects/cs401/topic-5/02-failure-detection.md?raw';
import topic5_3 from '../../../content/subjects/cs401/topic-5/03-recovery-techniques.md?raw';
import topic5_4 from '../../../content/subjects/cs401/topic-5/04-checkpointing.md?raw';
import topic5_5 from '../../../content/subjects/cs401/topic-5/05-logging.md?raw';
import topic5_6 from '../../../content/subjects/cs401/topic-5/06-replication-fault-tolerance.md?raw';
import topic5_7 from '../../../content/subjects/cs401/topic-5/07-chaos-engineering.md?raw';

import topic6_1 from '../../../content/subjects/cs401/topic-6/01-mapreduce-model.md?raw';
import topic6_2 from '../../../content/subjects/cs401/topic-6/02-hadoop-ecosystem.md?raw';
import topic6_3 from '../../../content/subjects/cs401/topic-6/03-spark.md?raw';
import topic6_4 from '../../../content/subjects/cs401/topic-6/04-distributed-storage.md?raw';
import topic6_5 from '../../../content/subjects/cs401/topic-5/05-stream-processing.md?raw';
import topic6_6 from '../../../content/subjects/cs401/topic-6/06-batch-vs-stream.md?raw';
import topic6_7 from '../../../content/subjects/cs401/topic-6/07-data-pipelines.md?raw';

import topic7_1 from '../../../content/subjects/cs401/topic-7/01-microservices-intro.md?raw';
import topic7_2 from '../../../content/subjects/cs401/topic-7/02-service-communication.md?raw';
import topic7_3 from '../../../content/subjects/cs401/topic-7/03-api-gateways.md?raw';
import topic7_4 from '../../../content/subjects/cs401/topic-7/04-service-discovery.md?raw';
import topic7_5 from '../../../content/subjects/cs401/topic-7/05-circuit-breakers.md?raw';
import topic7_6 from '../../../content/subjects/cs401/topic-7/06-distributed-tracing.md?raw';
import topic7_7 from '../../../content/subjects/cs401/topic-7/07-event-driven-architecture.md?raw';

export const cs401Topics: Topic[] = [
  {
    id: 'cs401-topic-1',
    title: 'Distributed Systems Fundamentals',
    content: 'Introduction to distributed systems, system models, communication paradigms, and architectural patterns.',
    subtopics: [
      { id: 'cs401-topic-1-1', slug: 'distributed-systems-intro', order: 1, title: 'Introduction to Distributed Systems', content: topic1_1 },
      { id: 'cs401-topic-1-2', slug: 'system-models', order: 2, title: 'System Models', content: topic1_2 },
      { id: 'cs401-topic-1-3', slug: 'communication-paradigms', order: 3, title: 'Communication Paradigms', content: topic1_3 },
      { id: 'cs401-topic-1-4', slug: 'remote-procedure-calls', order: 4, title: 'Remote Procedure Calls', content: topic1_4 },
      { id: 'cs401-topic-1-5', slug: 'naming-discovery', order: 5, title: 'Naming and Discovery', content: topic1_5 },
      { id: 'cs401-topic-1-6', slug: 'architectural-patterns', order: 6, title: 'Architectural Patterns', content: topic1_6 },
      { id: 'cs401-topic-1-7', slug: 'cap-theorem', order: 7, title: 'CAP Theorem', content: topic1_7 }
    ],
    quizIds: ['cs401-quiz-1-1', 'cs401-quiz-1-2', 'cs401-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs401-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs401-topic-2',
    title: 'Time and Coordination',
    content: 'Physical and logical time, clock synchronization, distributed snapshots, and coordination algorithms.',
    subtopics: [
      { id: 'cs401-topic-2-1', slug: 'physical-logical-time', order: 1, title: 'Physical and Logical Time', content: topic2_1 },
      { id: 'cs401-topic-2-2', slug: 'lamport-clocks', order: 2, title: 'Lamport Clocks', content: topic2_2 },
      { id: 'cs401-topic-2-3', slug: 'vector-clocks', order: 3, title: 'Vector Clocks', content: topic2_3 },
      { id: 'cs401-topic-2-4', slug: 'global-state', order: 4, title: 'Global State', content: topic2_4 },
      { id: 'cs401-topic-2-5', slug: 'distributed-snapshots', order: 5, title: 'Distributed Snapshots', content: topic2_5 },
      { id: 'cs401-topic-2-6', slug: 'leader-election', order: 6, title: 'Leader Election', content: topic2_6 },
      { id: 'cs401-topic-2-7', slug: 'mutual-exclusion', order: 7, title: 'Mutual Exclusion', content: topic2_7 }
    ],
    quizIds: ['cs401-quiz-2-1', 'cs401-quiz-2-2', 'cs401-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs401-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs401-topic-3',
    title: 'Consensus Algorithms',
    content: 'The consensus problem, two-phase commit, Paxos, Raft, and Byzantine fault tolerance.',
    subtopics: [
      { id: 'cs401-topic-3-1', slug: 'consensus-problem', order: 1, title: 'The Consensus Problem', content: topic3_1 },
      { id: 'cs401-topic-3-2', slug: 'two-phase-commit', order: 2, title: 'Two-Phase Commit', content: topic3_2 },
      { id: 'cs401-topic-3-3', slug: 'three-phase-commit', order: 3, title: 'Three-Phase Commit', content: topic3_3 },
      { id: 'cs401-topic-3-4', slug: 'paxos', order: 4, title: 'Paxos', content: topic3_4 },
      { id: 'cs401-topic-3-5', slug: 'raft', order: 5, title: 'Raft', content: topic3_5 },
      { id: 'cs401-topic-3-6', slug: 'byzantine-fault-tolerance', order: 6, title: 'Byzantine Fault Tolerance', content: topic3_6 },
      { id: 'cs401-topic-3-7', slug: 'blockchain-consensus', order: 7, title: 'Blockchain Consensus', content: topic3_7 }
    ],
    quizIds: ['cs401-quiz-3-1', 'cs401-quiz-3-2', 'cs401-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs401-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs401-topic-4',
    title: 'Replication and Consistency',
    content: 'Data replication strategies, consistency models, eventual consistency, and CRDTs.',
    subtopics: [
      { id: 'cs401-topic-4-1', slug: 'replication-basics', order: 1, title: 'Replication Basics', content: topic4_1 },
      { id: 'cs401-topic-4-2', slug: 'primary-backup', order: 2, title: 'Primary-Backup Replication', content: topic4_2 },
      { id: 'cs401-topic-4-3', slug: 'chain-replication', order: 3, title: 'Chain Replication', content: topic4_3 },
      { id: 'cs401-topic-4-4', slug: 'consistency-models', order: 4, title: 'Consistency Models', content: topic4_4 },
      { id: 'cs401-topic-4-5', slug: 'eventual-consistency', order: 5, title: 'Eventual Consistency', content: topic4_5 },
      { id: 'cs401-topic-4-6', slug: 'conflict-resolution', order: 6, title: 'Conflict Resolution', content: topic4_6 },
      { id: 'cs401-topic-4-7', slug: 'crdts', order: 7, title: 'CRDTs', content: topic4_7 }
    ],
    quizIds: ['cs401-quiz-4-1', 'cs401-quiz-4-2', 'cs401-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs401-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs401-topic-5',
    title: 'Fault Tolerance',
    content: 'Failure models, detection, recovery techniques, and chaos engineering.',
    subtopics: [
      { id: 'cs401-topic-5-1', slug: 'failure-models', order: 1, title: 'Failure Models', content: topic5_1 },
      { id: 'cs401-topic-5-2', slug: 'failure-detection', order: 2, title: 'Failure Detection', content: topic5_2 },
      { id: 'cs401-topic-5-3', slug: 'recovery-techniques', order: 3, title: 'Recovery Techniques', content: topic5_3 },
      { id: 'cs401-topic-5-4', slug: 'checkpointing', order: 4, title: 'Checkpointing', content: topic5_4 },
      { id: 'cs401-topic-5-5', slug: 'logging', order: 5, title: 'Logging', content: topic5_5 },
      { id: 'cs401-topic-5-6', slug: 'replication-fault-tolerance', order: 6, title: 'Replication for Fault Tolerance', content: topic5_6 },
      { id: 'cs401-topic-5-7', slug: 'chaos-engineering', order: 7, title: 'Chaos Engineering', content: topic5_7 }
    ],
    quizIds: ['cs401-quiz-5-1', 'cs401-quiz-5-2', 'cs401-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs401-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs401-topic-6',
    title: 'MapReduce and Big Data',
    content: 'MapReduce programming model, Hadoop, Spark, and distributed data processing.',
    subtopics: [
      { id: 'cs401-topic-6-1', slug: 'mapreduce-model', order: 1, title: 'MapReduce Model', content: topic6_1 },
      { id: 'cs401-topic-6-2', slug: 'hadoop-ecosystem', order: 2, title: 'Hadoop Ecosystem', content: topic6_2 },
      { id: 'cs401-topic-6-3', slug: 'spark', order: 3, title: 'Apache Spark', content: topic6_3 },
      { id: 'cs401-topic-6-4', slug: 'distributed-storage', order: 4, title: 'Distributed Storage', content: topic6_4 },
      { id: 'cs401-topic-6-5', slug: 'stream-processing', order: 5, title: 'Stream Processing', content: topic6_5 },
      { id: 'cs401-topic-6-6', slug: 'batch-vs-stream', order: 6, title: 'Batch vs Stream', content: topic6_6 },
      { id: 'cs401-topic-6-7', slug: 'data-pipelines', order: 7, title: 'Data Pipelines', content: topic6_7 }
    ],
    quizIds: ['cs401-quiz-6-1', 'cs401-quiz-6-2', 'cs401-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs401-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs401-topic-7',
    title: 'Microservices Architecture',
    content: 'Microservices design, service communication, API gateways, and event-driven architecture.',
    subtopics: [
      { id: 'cs401-topic-7-1', slug: 'microservices-intro', order: 1, title: 'Introduction to Microservices', content: topic7_1 },
      { id: 'cs401-topic-7-2', slug: 'service-communication', order: 2, title: 'Service Communication', content: topic7_2 },
      { id: 'cs401-topic-7-3', slug: 'api-gateways', order: 3, title: 'API Gateways', content: topic7_3 },
      { id: 'cs401-topic-7-4', slug: 'service-discovery', order: 4, title: 'Service Discovery', content: topic7_4 },
      { id: 'cs401-topic-7-5', slug: 'circuit-breakers', order: 5, title: 'Circuit Breakers', content: topic7_5 },
      { id: 'cs401-topic-7-6', slug: 'distributed-tracing', order: 6, title: 'Distributed Tracing', content: topic7_6 },
      { id: 'cs401-topic-7-7', slug: 'event-driven-architecture', order: 7, title: 'Event-Driven Architecture', content: topic7_7 }
    ],
    quizIds: ['cs401-quiz-7-1', 'cs401-quiz-7-2', 'cs401-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs401-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
