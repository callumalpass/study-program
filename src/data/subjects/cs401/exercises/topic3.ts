import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'cs401-t3-ex01',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Two-Phase Commit Coordinator',
    difficulty: 3,
    description: 'Implement a two-phase commit coordinator that manages distributed transactions across multiple participants.',
    starterCode: `interface Participant {
  id: string;
  prepare(): Promise<boolean>;
  commit(): Promise<void>;
  abort(): Promise<void>;
}

class TwoPhaseCommitCoordinator {
  // Implement 2PC coordinator
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Phase 1: Send prepare to all participants', 'Phase 2: Commit if all voted yes, else abort', 'Handle participant failures', 'Log decisions for recovery'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex02',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Raft Leader Election',
    difficulty: 4,
    description: 'Implement the leader election mechanism from the Raft consensus algorithm.',
    starterCode: `type ServerState = 'follower' | 'candidate' | 'leader';

class RaftNode {
  // Implement Raft leader election
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Start as follower with election timeout', 'Become candidate and request votes', 'Become leader if majority votes received', 'Reset to follower if higher term seen'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex03',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Raft Log Replication',
    difficulty: 4,
    description: 'Implement log replication in Raft for maintaining consistent state across replicas.',
    starterCode: `interface LogEntry {
  term: number;
  index: number;
  command: any;
}

class RaftLogReplication {
  // Implement Raft log replication
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Leader appends to own log first', 'Replicate to followers via AppendEntries', 'Commit when replicated on majority', 'Handle log inconsistencies'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex04',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Paxos Proposer',
    difficulty: 4,
    description: 'Implement the proposer role in the Paxos consensus algorithm.',
    starterCode: `interface Proposal {
  proposalNumber: number;
  value: any;
}

class PaxosProposer {
  // Implement Paxos proposer
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Phase 1: Prepare with proposal number', 'Phase 2: Accept if prepare succeeds', 'Handle promise responses', 'Use highest value from promises'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex05',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Consensus Simulator',
    difficulty: 3,
    description: 'Build a simulator that demonstrates how consensus algorithms handle various failure scenarios.',
    starterCode: `class ConsensusSimulator {
  // Implement consensus simulation
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Simulate multiple nodes', 'Inject failures (crash, network partition)', 'Track consensus progress', 'Verify safety properties'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex06',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Distributed Lock Manager',
    difficulty: 3,
    description: 'Implement a distributed lock manager using consensus for coordination.',
    starterCode: `interface Lock {
  id: string;
  holder: string | null;
  expiresAt: number;
}

class DistributedLockManager {
  // Implement distributed locks
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Use consensus to agree on lock holder', 'Support lock timeouts', 'Handle lock release', 'Prevent deadlocks'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex07',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Quorum-Based Voting',
    difficulty: 2,
    description: 'Implement a quorum-based voting system for decision making.',
    starterCode: `interface Vote {
  voter: string;
  value: any;
  timestamp: number;
}

class QuorumVoting {
  // Implement quorum voting
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Collect votes from nodes', 'Require majority for decision', 'Handle vote collection timeout', 'Support vote counting'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex08',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Leader Lease Management',
    difficulty: 3,
    description: 'Implement leader leases to optimize read operations in consensus systems.',
    starterCode: `interface Lease {
  holder: string;
  expiresAt: number;
}

class LeaderLeaseManager {
  // Implement leader leases
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Grant leases to leader', 'Renew before expiration', 'Followers defer to lease holder', 'Handle lease expiration'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex09',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Atomic Broadcast',
    difficulty: 4,
    description: 'Implement atomic broadcast using consensus for totally ordered delivery.',
    starterCode: `interface AtomicMessage {
  id: string;
  content: any;
  sequenceNumber?: number;
}

class AtomicBroadcast {
  // Implement atomic broadcast
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Use consensus for ordering', 'Assign sequence numbers', 'Guarantee total order', 'Handle message delivery'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex10',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Byzantine Fault Tolerant Vote',
    difficulty: 5,
    description: 'Implement Byzantine fault tolerant voting requiring 2f+1 honest voters.',
    starterCode: `interface ByzantineVote {
  voter: string;
  value: any;
  signature: string;
}

class ByzantineFaultTolerantVoting {
  // Implement BFT voting
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Require 2f+1 votes', 'Verify signatures', 'Detect conflicting votes', 'Handle malicious voters'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex11',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Replicated State Machine',
    difficulty: 4,
    description: 'Implement a replicated state machine using consensus for state transitions.',
    starterCode: `interface Command {
  id: string;
  operation: string;
  params: any[];
}

class ReplicatedStateMachine {
  // Implement replicated state machine
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Apply commands in order', 'Use consensus for ordering', 'Maintain deterministic execution', 'Support state snapshots'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex12',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Three-Phase Commit',
    difficulty: 4,
    description: 'Implement three-phase commit to avoid blocking in two-phase commit.',
    starterCode: `interface ThreePhaseParticipant {
  id: string;
  prepare(): Promise<boolean>;
  preCommit(): Promise<boolean>;
  commit(): Promise<void>;
  abort(): Promise<void>;
}

class ThreePhaseCommitCoordinator {
  // Implement 3PC coordinator
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Add prepare-to-commit phase', 'Handle coordinator failure', 'Allow participants to timeout', 'Maintain commit readiness'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex13',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Epoch-Based Synchronization',
    difficulty: 3,
    description: 'Implement epoch-based synchronization for coordinating distributed operations.',
    starterCode: `interface Epoch {
  number: number;
  leader: string;
  members: Set<string>;
}

class EpochManager {
  // Implement epoch management
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Track current epoch', 'Coordinate epoch transitions', 'Handle leader changes', 'Synchronize on epoch boundaries'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex14',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Multi-Paxos Implementation',
    difficulty: 5,
    description: 'Implement Multi-Paxos for efficiently agreeing on a sequence of values.',
    starterCode: `interface MultiPaxosInstance {
  instanceNumber: number;
  value: any;
  proposalNumber: number;
}

class MultiPaxos {
  // Implement Multi-Paxos
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Optimize with stable leader', 'Skip prepare phase when possible', 'Handle multiple instances', 'Maintain instance order'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex15',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Consensus Membership Changes',
    difficulty: 4,
    description: 'Implement safe membership changes in a consensus group (adding/removing nodes).',
    starterCode: `interface MembershipChange {
  type: 'add' | 'remove';
  nodeId: string;
}

class ConsensusMembership {
  // Implement membership changes
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Use joint consensus', 'Ensure no split brain', 'Commit configuration changes', 'Handle transitions safely'],
    language: 'typescript'
  },
  {
    id: 'cs401-t3-ex16',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Consensus with Priority',
    difficulty: 3,
    description: 'Implement priority-based consensus where certain nodes are preferred as leaders.',
    starterCode: `interface PriorityNode {
  id: string;
  priority: number;
}

class PriorityConsensus {
  // Implement priority-based consensus
}`,
    solution: `// Solution provided in exercise system`,
    testCases: [],
    hints: ['Assign priorities to nodes', 'Prefer higher priority for leader', 'Handle priority ties', 'Support priority updates'],
    language: 'typescript'
  }
];
