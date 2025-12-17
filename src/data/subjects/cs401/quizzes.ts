import type { Quiz, QuizQuestion } from '../../../core/types';

const questions: QuizQuestion[] = [
  // Topic 1: Distributed Systems Fundamentals - Quiz 1
  {
    id: 'cs401-q1',
    type: 'multiple_choice',
    prompt: 'What is the primary motivation for building distributed systems?',
    options: [
      'To share resources and improve scalability',
      'To make systems more complex',
      'To increase single-point failures',
      'To reduce system availability'
    ],
    correctAnswer: 'To share resources and improve scalability',
    explanation: 'Distributed systems are built to share resources across multiple nodes, improve scalability by adding more machines, and provide fault tolerance through redundancy.'
  },
  {
    id: 'cs401-q2',
    type: 'multiple_choice',
    prompt: 'Which of the following is NOT a characteristic of distributed systems?',
    options: [
      'Shared global clock',
      'Concurrency',
      'Independent failures',
      'No shared memory'
    ],
    correctAnswer: 'Shared global clock',
    explanation: 'Distributed systems lack a shared global clock, making time synchronization a challenge. They do exhibit concurrency, independent failures, and typically have no shared memory.'
  },
  {
    id: 'cs401-q3',
    type: 'multiple_choice',
    prompt: 'What does transparency in distributed systems refer to?',
    options: [
      'Hiding the distributed nature from users',
      'Making all system internals visible',
      'Using clear glass in server racks',
      'Exposing network delays to applications'
    ],
    correctAnswer: 'Hiding the distributed nature from users',
    explanation: 'Transparency in distributed systems means hiding aspects of distribution (like location, replication, or failures) from users and applications, making the system appear as a single coherent entity.'
  },
  {
    id: 'cs401-q4',
    type: 'multiple_choice',
    prompt: 'Which transparency type hides the physical location of resources?',
    options: [
      'Location transparency',
      'Migration transparency',
      'Replication transparency',
      'Failure transparency'
    ],
    correctAnswer: 'Location transparency',
    explanation: 'Location transparency hides where a resource is physically located, allowing users to access resources without knowing their physical location in the network.'
  },
  {
    id: 'cs401-q5',
    type: 'multiple_choice',
    prompt: 'What is a fallacy of distributed computing?',
    options: [
      'The network is reliable',
      'Networks have bandwidth limits',
      'Latency exists',
      'Multiple administrators manage the system'
    ],
    correctAnswer: 'The network is reliable',
    explanation: 'One of the famous fallacies of distributed computing is assuming the network is reliable. In reality, networks fail, packets are lost, and connections drop, requiring systems to handle these failures.'
  },

  // Topic 1: Distributed Systems Fundamentals - Quiz 2
  {
    id: 'cs401-q6',
    type: 'multiple_choice',
    prompt: 'What architectural pattern uses a central server to coordinate requests?',
    options: [
      'Client-server architecture',
      'Peer-to-peer architecture',
      'Blockchain architecture',
      'Edge computing architecture'
    ],
    correctAnswer: 'Client-server architecture',
    explanation: 'Client-server architecture uses a central server to handle requests from multiple clients, providing centralized control and coordination.'
  },
  {
    id: 'cs401-q7',
    type: 'multiple_choice',
    prompt: 'In peer-to-peer systems, what is a primary advantage?',
    options: [
      'No single point of failure',
      'Centralized control',
      'Simple security management',
      'Guaranteed consistency'
    ],
    correctAnswer: 'No single point of failure',
    explanation: 'Peer-to-peer systems distribute functionality across all nodes, eliminating single points of failure and improving fault tolerance, though at the cost of coordination complexity.'
  },
  {
    id: 'cs401-q8',
    type: 'multiple_choice',
    prompt: 'What is Remote Procedure Call (RPC) designed to do?',
    options: [
      'Make remote function calls appear local',
      'Directly access remote memory',
      'Share global variables across nodes',
      'Eliminate network communication'
    ],
    correctAnswer: 'Make remote function calls appear local',
    explanation: 'RPC provides location transparency by making remote procedure calls appear as if they were local function calls, hiding the complexity of network communication.'
  },
  {
    id: 'cs401-q9',
    type: 'multiple_choice',
    prompt: 'What is the primary challenge with RPC compared to local calls?',
    options: [
      'Network failures and latency',
      'Parameter passing',
      'Return value handling',
      'Function naming'
    ],
    correctAnswer: 'Network failures and latency',
    explanation: 'Unlike local calls, RPC faces network failures, variable latency, and partial failures that don\'t occur in single-machine environments, requiring special handling.'
  },
  {
    id: 'cs401-q10',
    type: 'multiple_choice',
    prompt: 'What does CAP theorem state is impossible to achieve simultaneously?',
    options: [
      'Consistency, Availability, and Partition tolerance',
      'Concurrency, Atomicity, and Performance',
      'Caching, Authentication, and Privacy',
      'Compression, Availability, and Persistence'
    ],
    correctAnswer: 'Consistency, Availability, and Partition tolerance',
    explanation: 'CAP theorem states that in the presence of network partitions, a distributed system must choose between consistency (all nodes see the same data) and availability (all requests receive responses).'
  },

  // Topic 1: Distributed Systems Fundamentals - Quiz 3
  {
    id: 'cs401-q11',
    type: 'multiple_choice',
    prompt: 'Which CAP property must be sacrificed during a network partition?',
    options: [
      'Either Consistency or Availability',
      'Partition tolerance',
      'Both Consistency and Availability',
      'None, all three can be maintained'
    ],
    correctAnswer: 'Either Consistency or Availability',
    explanation: 'When network partitions occur (P in CAP), systems must choose between maintaining consistency (rejecting some requests) or availability (potentially serving stale data).'
  },
  {
    id: 'cs401-q12',
    type: 'multiple_choice',
    prompt: 'What is eventual consistency?',
    options: [
      'All replicas converge to the same state eventually',
      'Updates are immediately visible everywhere',
      'Strong consistency with delays',
      'No consistency guarantees'
    ],
    correctAnswer: 'All replicas converge to the same state eventually',
    explanation: 'Eventual consistency guarantees that if no new updates are made, all replicas will eventually converge to the same state, though they may temporarily differ.'
  },
  {
    id: 'cs401-q13',
    type: 'multiple_choice',
    prompt: 'What type of system prioritizes availability over consistency?',
    options: [
      'AP system (Availability + Partition tolerance)',
      'CP system (Consistency + Partition tolerance)',
      'CA system (Consistency + Availability)',
      'None of the above'
    ],
    correctAnswer: 'AP system (Availability + Partition tolerance)',
    explanation: 'AP systems choose to remain available during partitions, accepting that different nodes may serve different data temporarily, using eventual consistency models.'
  },
  {
    id: 'cs401-q14',
    type: 'multiple_choice',
    prompt: 'What is a microservices architecture?',
    options: [
      'Decomposing applications into small, independent services',
      'Building very small applications',
      'Using minimal server resources',
      'Reducing code size'
    ],
    correctAnswer: 'Decomposing applications into small, independent services',
    explanation: 'Microservices architecture breaks applications into small, loosely coupled services that can be developed, deployed, and scaled independently.'
  },
  {
    id: 'cs401-q15',
    type: 'multiple_choice',
    prompt: 'What is service discovery in distributed systems?',
    options: [
      'Automatically locating available services',
      'Creating new services',
      'Discovering bugs in services',
      'Finding service documentation'
    ],
    correctAnswer: 'Automatically locating available services',
    explanation: 'Service discovery is the process of automatically detecting available services and their network locations, enabling dynamic service-to-service communication.'
  },

  // Topic 2: Time and Ordering - Quiz 1
  {
    id: 'cs401-q16',
    type: 'multiple_choice',
    prompt: 'Why is clock synchronization difficult in distributed systems?',
    options: [
      'No shared physical clock and network delays',
      'Computers run at different speeds',
      'Time zones differ',
      'Hardware clock precision'
    ],
    correctAnswer: 'No shared physical clock and network delays',
    explanation: 'Without a shared physical clock and with variable network delays, achieving precise clock synchronization across distributed nodes is fundamentally challenging.'
  },
  {
    id: 'cs401-q17',
    type: 'multiple_choice',
    prompt: 'What is clock drift?',
    options: [
      'Gradual divergence of a clock from actual time',
      'Moving servers to different locations',
      'Network delay variations',
      'Time zone changes'
    ],
    correctAnswer: 'Gradual divergence of a clock from actual time',
    explanation: 'Clock drift occurs when a computer\'s clock gradually runs faster or slower than actual time due to hardware imperfections, requiring periodic synchronization.'
  },
  {
    id: 'cs401-q18',
    type: 'multiple_choice',
    prompt: 'What does the Network Time Protocol (NTP) provide?',
    options: [
      'Clock synchronization across networks',
      'Logical time ordering',
      'Network bandwidth measurement',
      'Packet routing'
    ],
    correctAnswer: 'Clock synchronization across networks',
    explanation: 'NTP synchronizes computer clocks across networks using a hierarchy of time servers, accounting for network delays to achieve millisecond-level accuracy.'
  },
  {
    id: 'cs401-q19',
    type: 'multiple_choice',
    prompt: 'What is the key insight of Lamport logical clocks?',
    options: [
      'Event ordering matters more than absolute time',
      'All nodes need synchronized physical clocks',
      'Time can go backwards',
      'Concurrent events don\'t exist'
    ],
    correctAnswer: 'Event ordering matters more than absolute time',
    explanation: 'Lamport clocks focus on capturing the happens-before relationship between events rather than their absolute time, which is sufficient for many distributed algorithms.'
  },
  {
    id: 'cs401-q20',
    type: 'multiple_choice',
    prompt: 'In Lamport clocks, when does a process increment its counter?',
    options: [
      'Before each event',
      'Only when receiving messages',
      'Only when sending messages',
      'Once per second'
    ],
    correctAnswer: 'Before each event',
    explanation: 'In Lamport\'s algorithm, each process increments its logical clock before each event (internal, send, or receive), ensuring causally related events have ordered timestamps.'
  },

  // Topic 2: Time and Ordering - Quiz 2
  {
    id: 'cs401-q21',
    type: 'multiple_choice',
    prompt: 'What happens when a process receives a message in Lamport clocks?',
    options: [
      'Sets clock to max(local, message) + 1',
      'Uses the message timestamp',
      'Decrements its clock',
      'Resets clock to zero'
    ],
    correctAnswer: 'Sets clock to max(local, message) + 1',
    explanation: 'When receiving a message, a process updates its clock to the maximum of its local clock and the message timestamp, then increments, ensuring consistency with the happens-before relation.'
  },
  {
    id: 'cs401-q22',
    type: 'multiple_choice',
    prompt: 'What limitation do Lamport clocks have?',
    options: [
      'Cannot detect concurrent events',
      'Require physical clock synchronization',
      'Too complex to implement',
      'Don\'t work with more than two processes'
    ],
    correctAnswer: 'Cannot detect concurrent events',
    explanation: 'Lamport clocks can determine if events are ordered but cannot distinguish concurrent events (those that don\'t causally affect each other) since concurrent events may have different timestamps.'
  },
  {
    id: 'cs401-q23',
    type: 'multiple_choice',
    prompt: 'What do vector clocks provide that Lamport clocks don\'t?',
    options: [
      'Detection of concurrent events',
      'Faster execution',
      'Less memory usage',
      'Physical time accuracy'
    ],
    correctAnswer: 'Detection of concurrent events',
    explanation: 'Vector clocks maintain a vector of logical times (one per process), allowing them to detect concurrent events by comparing vectors, which Lamport clocks cannot do.'
  },
  {
    id: 'cs401-q24',
    type: 'multiple_choice',
    prompt: 'In a system with N processes, how large is each vector clock?',
    options: [
      'N entries',
      '1 entry',
      'log(N) entries',
      'N^2 entries'
    ],
    correctAnswer: 'N entries',
    explanation: 'Each vector clock contains N entries, one for each process in the system, tracking that process\'s view of the logical time at every other process.'
  },
  {
    id: 'cs401-q25',
    type: 'multiple_choice',
    prompt: 'How can you tell if two events are concurrent using vector clocks?',
    options: [
      'Neither vector is less than or equal to the other',
      'Vectors are identical',
      'One vector is strictly less than the other',
      'Timestamps are equal'
    ],
    correctAnswer: 'Neither vector is less than or equal to the other',
    explanation: 'Two events are concurrent if their vector clocks are incomparable (neither is less than or equal to the other), meaning neither event causally preceded the other.'
  },

  // Topic 2: Time and Ordering - Quiz 3
  {
    id: 'cs401-q26',
    type: 'multiple_choice',
    prompt: 'What is the happens-before relation in distributed systems?',
    options: [
      'A partial ordering of events based on causality',
      'Strict time-based ordering',
      'Random event ordering',
      'Process ID-based ordering'
    ],
    correctAnswer: 'A partial ordering of events based on causality',
    explanation: 'The happens-before relation (→) is a partial order that captures causal dependencies: if event a could affect event b, then a → b, but concurrent events are unordered.'
  },
  {
    id: 'cs401-q27',
    type: 'multiple_choice',
    prompt: 'Which statement about causality is correct?',
    options: [
      'If a → b, then a causally affects b',
      'All events are causally related',
      'Causality requires physical time',
      'Concurrent events have causal relationship'
    ],
    correctAnswer: 'If a → b, then a causally affects b',
    explanation: 'The happens-before relation captures causality: if a → b, then a could have causally affected b. Events that are concurrent have no causal relationship.'
  },
  {
    id: 'cs401-q28',
    type: 'multiple_choice',
    prompt: 'What is total ordering in distributed systems?',
    options: [
      'Every pair of events has a defined order',
      'Only causally related events are ordered',
      'Events are unordered',
      'Only local events are ordered'
    ],
    correctAnswer: 'Every pair of events has a defined order',
    explanation: 'Total ordering means every pair of events has a defined order, even concurrent ones. This is stronger than the partial ordering provided by causality alone.'
  },
  {
    id: 'cs401-q29',
    type: 'multiple_choice',
    prompt: 'What is causal ordering of messages?',
    options: [
      'Messages are delivered in causal order',
      'Messages arrive in send order',
      'Messages are sorted by timestamp',
      'Messages are delivered randomly'
    ],
    correctAnswer: 'Messages are delivered in causal order',
    explanation: 'Causal ordering ensures that if message m1 causally precedes m2, then m1 is delivered before m2 at all common destinations, preserving causal relationships.'
  },
  {
    id: 'cs401-q30',
    type: 'multiple_choice',
    prompt: 'Why might causal ordering be preferred over total ordering?',
    options: [
      'Allows more concurrency and better performance',
      'Easier to implement',
      'Requires less bandwidth',
      'Works without network'
    ],
    correctAnswer: 'Allows more concurrency and better performance',
    explanation: 'Causal ordering only orders causally related events, allowing concurrent events to be processed in parallel, enabling better performance than total ordering which orders everything.'
  },

  // Topic 3: Consensus and Coordination - Quiz 1
  {
    id: 'cs401-q31',
    type: 'multiple_choice',
    prompt: 'What is the distributed consensus problem?',
    options: [
      'Getting all nodes to agree on a single value',
      'Synchronizing physical clocks',
      'Load balancing requests',
      'Encrypting communications'
    ],
    correctAnswer: 'Getting all nodes to agree on a single value',
    explanation: 'Distributed consensus requires all non-faulty nodes to agree on a single value, with the agreement being final and irrevocable, despite failures and asynchrony.'
  },
  {
    id: 'cs401-q32',
    type: 'multiple_choice',
    prompt: 'Which property is NOT required for consensus?',
    options: [
      'Fast execution',
      'Agreement (all decide same value)',
      'Validity (decided value was proposed)',
      'Termination (all processes eventually decide)'
    ],
    correctAnswer: 'Fast execution',
    explanation: 'Consensus requires agreement, validity, and termination, but not necessarily fast execution. Speed is a practical concern but not a correctness requirement.'
  },
  {
    id: 'cs401-q33',
    type: 'multiple_choice',
    prompt: 'What does the FLP impossibility result state?',
    options: [
      'Consensus is impossible in asynchronous systems with one failure',
      'Consensus requires Byzantine fault tolerance',
      'Three-phase commit always works',
      'Physical clock synchronization is impossible'
    ],
    correctAnswer: 'Consensus is impossible in asynchronous systems with one failure',
    explanation: 'The FLP (Fischer, Lynch, Paterson) impossibility result proves that no deterministic consensus algorithm can guarantee termination in an asynchronous system with even one crash failure.'
  },
  {
    id: 'cs401-q34',
    type: 'multiple_choice',
    prompt: 'How do practical consensus algorithms overcome FLP impossibility?',
    options: [
      'Use timeouts and assume partial synchrony',
      'Ignore the theorem',
      'Guarantee no failures occur',
      'Use quantum computing'
    ],
    correctAnswer: 'Use timeouts and assume partial synchrony',
    explanation: 'Practical algorithms like Raft and Paxos assume partial synchrony (timeouts eventually work) and use failure detectors, trading theoretical guarantees for practical functionality.'
  },
  {
    id: 'cs401-q35',
    type: 'multiple_choice',
    prompt: 'What is two-phase commit (2PC) used for?',
    options: [
      'Atomic distributed transactions',
      'Leader election',
      'Clock synchronization',
      'Load balancing'
    ],
    correctAnswer: 'Atomic distributed transactions',
    explanation: 'Two-phase commit ensures that a distributed transaction either commits on all nodes or aborts on all nodes, maintaining atomicity across multiple participants.'
  },

  // Topic 3: Consensus and Coordination - Quiz 2
  {
    id: 'cs401-q36',
    type: 'multiple_choice',
    prompt: 'What are the two phases in two-phase commit?',
    options: [
      'Prepare and Commit',
      'Request and Response',
      'Lock and Unlock',
      'Send and Receive'
    ],
    correctAnswer: 'Prepare and Commit',
    explanation: 'In 2PC, the coordinator first asks participants to prepare (vote on whether they can commit), then based on votes, instructs them to commit or abort in the second phase.'
  },
  {
    id: 'cs401-q37',
    type: 'multiple_choice',
    prompt: 'What is a major weakness of two-phase commit?',
    options: [
      'Coordinator failure blocks progress',
      'Too many network messages',
      'Cannot handle reads',
      'Requires Byzantine fault tolerance'
    ],
    correctAnswer: 'Coordinator failure blocks progress',
    explanation: 'If the coordinator fails after participants prepare but before sending commit/abort decisions, participants are blocked indefinitely, unable to unilaterally decide the transaction outcome.'
  },
  {
    id: 'cs401-q38',
    type: 'multiple_choice',
    prompt: 'What does three-phase commit (3PC) add to avoid blocking?',
    options: [
      'A prepare-to-commit phase',
      'More participants',
      'Faster networks',
      'Byzantine fault tolerance'
    ],
    correctAnswer: 'A prepare-to-commit phase',
    explanation: '3PC adds a prepare-to-commit phase between prepare and commit, allowing participants to timeout and make progress if the coordinator fails, though this requires synchrony assumptions.'
  },
  {
    id: 'cs401-q39',
    type: 'multiple_choice',
    prompt: 'What is the primary goal of the Paxos algorithm?',
    options: [
      'Achieve consensus on a single value',
      'Synchronize clocks',
      'Implement transactions',
      'Detect failures'
    ],
    correctAnswer: 'Achieve consensus on a single value',
    explanation: 'Paxos is a consensus algorithm that allows a collection of nodes to agree on a single value even in the presence of failures, forming the basis for many distributed systems.'
  },
  {
    id: 'cs401-q40',
    type: 'multiple_choice',
    prompt: 'What are the three roles in Paxos?',
    options: [
      'Proposer, Acceptor, Learner',
      'Client, Server, Coordinator',
      'Leader, Follower, Observer',
      'Master, Slave, Backup'
    ],
    correctAnswer: 'Proposer, Acceptor, Learner',
    explanation: 'Paxos defines three roles: Proposers propose values, Acceptors vote on proposals (forming a quorum), and Learners learn which value was chosen. Nodes can play multiple roles.'
  },

  // Topic 3: Consensus and Coordination - Quiz 3
  {
    id: 'cs401-q41',
    type: 'multiple_choice',
    prompt: 'How does Raft differ from Paxos?',
    options: [
      'Raft is designed to be more understandable',
      'Raft is faster',
      'Raft handles Byzantine failures',
      'Raft doesn\'t use leaders'
    ],
    correctAnswer: 'Raft is designed to be more understandable',
    explanation: 'Raft was designed as a more understandable alternative to Paxos, using a strong leader model and clear separation of concerns (leader election, log replication, safety).'
  },
  {
    id: 'cs401-q42',
    type: 'multiple_choice',
    prompt: 'What is a term in Raft?',
    options: [
      'A period of time with at most one leader',
      'The length of log entries',
      'Number of nodes',
      'Transaction duration'
    ],
    correctAnswer: 'A period of time with at most one leader',
    explanation: 'Terms in Raft are logical time periods, each with at most one leader. Terms are numbered consecutively and used to detect stale information and ensure safety.'
  },
  {
    id: 'cs401-q43',
    type: 'multiple_choice',
    prompt: 'How does a candidate win a Raft election?',
    options: [
      'Receives votes from a majority of servers',
      'Has the highest ID',
      'Requests first',
      'Has the most log entries'
    ],
    correctAnswer: 'Receives votes from a majority of servers',
    explanation: 'A candidate becomes leader by receiving votes from a majority of servers in the cluster, ensuring at most one leader per term since majorities overlap.'
  },
  {
    id: 'cs401-q44',
    type: 'multiple_choice',
    prompt: 'What is the purpose of log replication in Raft?',
    options: [
      'Keep state machine replicas synchronized',
      'Backup configuration',
      'Audit trail',
      'Performance optimization'
    ],
    correctAnswer: 'Keep state machine replicas synchronized',
    explanation: 'Raft replicates a log of commands to all nodes, ensuring all state machines execute the same commands in the same order, maintaining consistency across replicas.'
  },
  {
    id: 'cs401-q45',
    type: 'multiple_choice',
    prompt: 'When is a log entry committed in Raft?',
    options: [
      'When replicated on a majority of servers',
      'When written to leader',
      'When all servers acknowledge',
      'After one second'
    ],
    correctAnswer: 'When replicated on a majority of servers',
    explanation: 'An entry is committed once the leader has replicated it to a majority of servers, guaranteeing it won\'t be lost and can be safely applied to state machines.'
  },

  // Topic 4: Replication and Consistency - Quiz 1
  {
    id: 'cs401-q46',
    type: 'multiple_choice',
    prompt: 'What is the primary purpose of data replication?',
    options: [
      'Improve availability and fault tolerance',
      'Reduce storage costs',
      'Simplify programming',
      'Increase latency'
    ],
    correctAnswer: 'Improve availability and fault tolerance',
    explanation: 'Data replication maintains multiple copies of data across different nodes, improving availability (data accessible despite failures) and fault tolerance (surviving failures).'
  },
  {
    id: 'cs401-q47',
    type: 'multiple_choice',
    prompt: 'What is strong consistency?',
    options: [
      'All reads see the most recent write',
      'Reads may see stale data',
      'Eventually consistent',
      'No consistency guarantees'
    ],
    correctAnswer: 'All reads see the most recent write',
    explanation: 'Strong consistency (also called linearizability) guarantees that all reads return the value of the most recent write, making the system appear as if there is only one copy of the data.'
  },
  {
    id: 'cs401-q48',
    type: 'multiple_choice',
    prompt: 'What tradeoff does eventual consistency make?',
    options: [
      'Sacrifices immediate consistency for availability',
      'Sacrifices availability for consistency',
      'Eliminates partitions',
      'Requires synchronous replication'
    ],
    correctAnswer: 'Sacrifices immediate consistency for availability',
    explanation: 'Eventual consistency allows replicas to temporarily diverge (sacrificing immediate consistency) to remain available, guaranteeing only that replicas will converge if updates stop.'
  },
  {
    id: 'cs401-q49',
    type: 'multiple_choice',
    prompt: 'What is read-your-writes consistency?',
    options: [
      'A client sees their own updates immediately',
      'All clients see all updates immediately',
      'No guarantees on read ordering',
      'Writes are never visible'
    ],
    correctAnswer: 'A client sees their own updates immediately',
    explanation: 'Read-your-writes (also called read-after-write) consistency guarantees that a client will always see their own updates, even if other clients might see stale data temporarily.'
  },
  {
    id: 'cs401-q50',
    type: 'multiple_choice',
    prompt: 'What is monotonic reads consistency?',
    options: [
      'Reads never go backwards in time',
      'Reads are always increasing',
      'All reads see same value',
      'Reads are ordered by timestamp'
    ],
    correctAnswer: 'Reads never go backwards in time',
    explanation: 'Monotonic reads guarantee that if a client reads a value, any subsequent reads will see that value or a more recent one, never an older value.'
  },

  // Topic 4: Replication and Consistency - Quiz 2
  {
    id: 'cs401-q51',
    type: 'multiple_choice',
    prompt: 'What is the difference between primary-backup and multi-primary replication?',
    options: [
      'Primary-backup has one writer, multi-primary has many',
      'Primary-backup is faster',
      'Multi-primary uses less storage',
      'Primary-backup requires no coordination'
    ],
    correctAnswer: 'Primary-backup has one writer, multi-primary has many',
    explanation: 'Primary-backup replication has a single primary that handles all writes, while multi-primary allows multiple nodes to accept writes, increasing complexity but enabling geo-distribution.'
  },
  {
    id: 'cs401-q52',
    type: 'multiple_choice',
    prompt: 'What is a quorum in distributed systems?',
    options: [
      'Minimum number of nodes needed for an operation',
      'All nodes in the system',
      'The leader node',
      'Backup nodes'
    ],
    correctAnswer: 'Minimum number of nodes needed for an operation',
    explanation: 'A quorum is the minimum number of nodes that must participate in an operation (read or write) to ensure consistency. Typically a majority to guarantee overlap between operations.'
  },
  {
    id: 'cs401-q53',
    type: 'multiple_choice',
    prompt: 'In quorum-based replication with N replicas, what is a common quorum size?',
    options: [
      'N/2 + 1 (majority)',
      'N (all replicas)',
      '1 (any replica)',
      'log(N)'
    ],
    correctAnswer: 'N/2 + 1 (majority)',
    explanation: 'A majority quorum (N/2 + 1) ensures that any two quorums overlap, guaranteeing that reads will see recent writes. This allows tolerating N/2 failures while maintaining consistency.'
  },
  {
    id: 'cs401-q54',
    type: 'multiple_choice',
    prompt: 'What are CRDTs (Conflict-free Replicated Data Types)?',
    options: [
      'Data structures that merge automatically without conflicts',
      'Encrypted data types',
      'Compressed data formats',
      'Cloud-based databases'
    ],
    correctAnswer: 'Data structures that merge automatically without conflicts',
    explanation: 'CRDTs are data structures designed to be replicated across nodes where concurrent updates can be merged automatically without conflicts, enabling strong eventual consistency.'
  },
  {
    id: 'cs401-q55',
    type: 'multiple_choice',
    prompt: 'What property must CRDT merge operations satisfy?',
    options: [
      'Commutative, associative, and idempotent',
      'Fast and efficient',
      'Encrypted and secure',
      'Ordered and sequential'
    ],
    correctAnswer: 'Commutative, associative, and idempotent',
    explanation: 'CRDT merges must be commutative (order doesn\'t matter), associative (grouping doesn\'t matter), and idempotent (applying twice has same effect), enabling automatic conflict resolution.'
  },

  // Topic 4: Replication and Consistency - Quiz 3
  {
    id: 'cs401-q56',
    type: 'multiple_choice',
    prompt: 'What is an example of a state-based CRDT?',
    options: [
      'Grow-only counter',
      'String',
      'Integer',
      'Linked list'
    ],
    correctAnswer: 'Grow-only counter',
    explanation: 'State-based CRDTs (like grow-only counters, grow-only sets) share entire state and merge using a semilattice structure, where merging is the join operation.'
  },
  {
    id: 'cs401-q57',
    type: 'multiple_choice',
    prompt: 'What is an operation-based (Op-based) CRDT?',
    options: [
      'CRDTs that share operations instead of state',
      'CRDTs for mathematical operations',
      'CRDTs that don\'t merge',
      'CRDTs for encryption'
    ],
    correctAnswer: 'CRDTs that share operations instead of state',
    explanation: 'Operation-based CRDTs share operations (like "increment", "add element") instead of full state. Operations must commute, and typically require causal delivery of operations.'
  },
  {
    id: 'cs401-q58',
    type: 'multiple_choice',
    prompt: 'What is session consistency?',
    options: [
      'Consistency guarantees within a single client session',
      'Consistency across all sessions',
      'No consistency guarantees',
      'Physical clock synchronization'
    ],
    correctAnswer: 'Consistency guarantees within a single client session',
    explanation: 'Session consistency provides consistency guarantees (like read-your-writes, monotonic reads) within a single client session, but not across different clients or sessions.'
  },
  {
    id: 'cs401-q59',
    type: 'multiple_choice',
    prompt: 'What is the advantage of async replication over sync replication?',
    options: [
      'Lower latency and better availability',
      'Stronger consistency',
      'No data loss',
      'Simpler implementation'
    ],
    correctAnswer: 'Lower latency and better availability',
    explanation: 'Asynchronous replication doesn\'t wait for acknowledgment from replicas before confirming writes, providing lower latency and better availability, though risking data loss on failures.'
  },
  {
    id: 'cs401-q60',
    type: 'multiple_choice',
    prompt: 'What is linearizability?',
    options: [
      'Operations appear to execute atomically at some point between invocation and response',
      'Operations execute in a line',
      'Linear time complexity',
      'Sequential consistency'
    ],
    correctAnswer: 'Operations appear to execute atomically at some point between invocation and response',
    explanation: 'Linearizability (the strongest consistency model) requires that operations appear to execute instantaneously at some point between their invocation and response, with a total order consistent with real-time.'
  },

  // Topic 5: Fault Tolerance - Quiz 1
  {
    id: 'cs401-q61',
    type: 'multiple_choice',
    prompt: 'What is a fail-stop failure?',
    options: [
      'Process halts and others can detect it',
      'Process sends corrupted data',
      'Process continues with wrong behavior',
      'Network partition'
    ],
    correctAnswer: 'Process halts and others can detect it',
    explanation: 'In fail-stop failures, a process halts completely and other processes can reliably detect that it has failed, making it easier to handle than other failure types.'
  },
  {
    id: 'cs401-q62',
    type: 'multiple_choice',
    prompt: 'What is a Byzantine failure?',
    options: [
      'Arbitrary or malicious behavior',
      'Process crashes',
      'Network delay',
      'Disk failure'
    ],
    correctAnswer: 'Arbitrary or malicious behavior',
    explanation: 'Byzantine failures involve arbitrary or malicious behavior where nodes may send incorrect or contradictory information. This is the most difficult failure type to handle.'
  },
  {
    id: 'cs401-q63',
    type: 'multiple_choice',
    prompt: 'How many failures can Byzantine Fault Tolerance (BFT) tolerate with N nodes?',
    options: [
      '(N-1)/3 failures',
      'N/2 failures',
      'N-1 failures',
      'Any number'
    ],
    correctAnswer: '(N-1)/3 failures',
    explanation: 'BFT systems require at least 3f+1 nodes to tolerate f Byzantine failures, meaning they can tolerate less than one-third failures, which is more expensive than crash tolerance.'
  },
  {
    id: 'cs401-q64',
    type: 'multiple_choice',
    prompt: 'What is a failure detector?',
    options: [
      'Component that monitors and reports process failures',
      'Hardware that prevents failures',
      'Software that fixes bugs',
      'Network monitoring tool'
    ],
    correctAnswer: 'Component that monitors and reports process failures',
    explanation: 'A failure detector is a distributed system component that monitors processes and reports suspected failures, typically using heartbeats and timeouts, though it may be unreliable.'
  },
  {
    id: 'cs401-q65',
    type: 'multiple_choice',
    prompt: 'What is the difference between completeness and accuracy in failure detection?',
    options: [
      'Completeness: detect all failures; Accuracy: no false positives',
      'Completeness: fast detection; Accuracy: low overhead',
      'Completeness: correct failures; Accuracy: complete failures',
      'They are the same thing'
    ],
    correctAnswer: 'Completeness: detect all failures; Accuracy: no false positives',
    explanation: 'Completeness means eventually detecting all actual failures. Accuracy means not incorrectly suspecting correct processes. Perfect failure detection is impossible in asynchronous systems.'
  },

  // Topic 5: Fault Tolerance - Quiz 2
  {
    id: 'cs401-q66',
    type: 'multiple_choice',
    prompt: 'What is an eventually perfect failure detector?',
    options: [
      'Eventually stops making mistakes about correct processes',
      'Immediately detects all failures',
      'Never makes mistakes',
      'Detects Byzantine failures'
    ],
    correctAnswer: 'Eventually stops making mistakes about correct processes',
    explanation: 'An eventually perfect failure detector may make mistakes initially but eventually accurately identifies all crashed processes and stops suspecting correct ones, useful in practice.'
  },
  {
    id: 'cs401-q67',
    type: 'multiple_choice',
    prompt: 'What is checkpointing in fault tolerance?',
    options: [
      'Periodically saving process state for recovery',
      'Validating data correctness',
      'Testing system security',
      'Monitoring performance'
    ],
    correctAnswer: 'Periodically saving process state for recovery',
    explanation: 'Checkpointing involves periodically saving the state of a process to stable storage, allowing it to recover to a consistent state after a failure without restarting from the beginning.'
  },
  {
    id: 'cs401-q68',
    type: 'multiple_choice',
    prompt: 'What is message logging used for in fault tolerance?',
    options: [
      'Recording messages to replay after recovery',
      'Debugging message content',
      'Compressing messages',
      'Routing messages'
    ],
    correctAnswer: 'Recording messages to replay after recovery',
    explanation: 'Message logging records received messages so that after a failure, a process can recover from a checkpoint and replay logged messages to reach a consistent state.'
  },
  {
    id: 'cs401-q69',
    type: 'multiple_choice',
    prompt: 'What is the orphan problem in recovery?',
    options: [
      'Recovered process doesn\'t know about messages it sent before failure',
      'Lost child processes',
      'Undelivered messages',
      'Memory leaks'
    ],
    correctAnswer: 'Recovered process doesn\'t know about messages it sent before failure',
    explanation: 'The orphan problem occurs when a recovered process doesn\'t remember sending messages before failure, but other processes have received them and acted on them, causing inconsistencies.'
  },
  {
    id: 'cs401-q70',
    type: 'multiple_choice',
    prompt: 'What is a circuit breaker pattern?',
    options: [
      'Preventing cascading failures by stopping calls to failing services',
      'Breaking network connections',
      'Interrupting power supply',
      'Stopping all processes'
    ],
    correctAnswer: 'Preventing cascading failures by stopping calls to failing services',
    explanation: 'Circuit breakers monitor for failures and "open" (stop forwarding requests) when failure rate exceeds a threshold, preventing cascading failures and giving failing services time to recover.'
  },

  // Topic 5: Fault Tolerance - Quiz 3
  {
    id: 'cs401-q71',
    type: 'multiple_choice',
    prompt: 'What are the three states in a circuit breaker?',
    options: [
      'Closed, Open, Half-Open',
      'On, Off, Standby',
      'Active, Inactive, Suspended',
      'Running, Stopped, Paused'
    ],
    correctAnswer: 'Closed, Open, Half-Open',
    explanation: 'Circuit breakers have three states: Closed (normal operation), Open (blocking requests after failures), and Half-Open (testing if service recovered by allowing limited requests).'
  },
  {
    id: 'cs401-q72',
    type: 'multiple_choice',
    prompt: 'What is the bulkhead pattern in fault tolerance?',
    options: [
      'Isolating resources to prevent failure propagation',
      'Adding more servers',
      'Encrypting communications',
      'Load balancing'
    ],
    correctAnswer: 'Isolating resources to prevent failure propagation',
    explanation: 'Bulkhead pattern isolates resources (like thread pools or connection pools) so that failure in one part doesn\'t consume all resources and affect other parts of the system.'
  },
  {
    id: 'cs401-q73',
    type: 'multiple_choice',
    prompt: 'What is graceful degradation?',
    options: [
      'Continuing with reduced functionality when failures occur',
      'Slowly shutting down',
      'Improving performance over time',
      'Preventing all failures'
    ],
    correctAnswer: 'Continuing with reduced functionality when failures occur',
    explanation: 'Graceful degradation allows a system to continue operating with reduced functionality when failures occur, rather than completely failing, improving overall availability.'
  },
  {
    id: 'cs401-q74',
    type: 'multiple_choice',
    prompt: 'What is retry with exponential backoff?',
    options: [
      'Retrying failed operations with increasing delays',
      'Retrying immediately many times',
      'Never retrying',
      'Retrying with random delays'
    ],
    correctAnswer: 'Retrying failed operations with increasing delays',
    explanation: 'Exponential backoff increases delay between retries exponentially (e.g., 1s, 2s, 4s, 8s), preventing overwhelming a failing service while giving it time to recover.'
  },
  {
    id: 'cs401-q75',
    type: 'multiple_choice',
    prompt: 'What is the purpose of timeout in distributed systems?',
    options: [
      'Detecting failures and preventing indefinite waiting',
      'Measuring performance',
      'Scheduling tasks',
      'Encrypting data'
    ],
    correctAnswer: 'Detecting failures and preventing indefinite waiting',
    explanation: 'Timeouts prevent processes from waiting indefinitely for responses, allowing failure detection and recovery. However, setting appropriate timeout values is challenging.'
  },

  // Topic 6: Distributed Storage and Processing - Quiz 1
  {
    id: 'cs401-q76',
    type: 'multiple_choice',
    prompt: 'What is sharding in distributed databases?',
    options: [
      'Partitioning data across multiple nodes',
      'Encrypting data',
      'Compressing data',
      'Caching data'
    ],
    correctAnswer: 'Partitioning data across multiple nodes',
    explanation: 'Sharding (horizontal partitioning) splits data across multiple nodes based on a shard key, distributing load and enabling horizontal scaling beyond single-node capacity.'
  },
  {
    id: 'cs401-q77',
    type: 'multiple_choice',
    prompt: 'What is consistent hashing used for?',
    options: [
      'Distributing data with minimal rebalancing when nodes change',
      'Encrypting data',
      'Validating data integrity',
      'Sorting data'
    ],
    correctAnswer: 'Distributing data with minimal rebalancing when nodes change',
    explanation: 'Consistent hashing maps both data and nodes to a hash ring, minimizing data movement when nodes are added or removed, making it ideal for dynamic distributed systems.'
  },
  {
    id: 'cs401-q78',
    type: 'multiple_choice',
    prompt: 'What problem does the MapReduce programming model solve?',
    options: [
      'Processing large datasets in parallel across many nodes',
      'Real-time data processing',
      'Small dataset analysis',
      'Single-machine computation'
    ],
    correctAnswer: 'Processing large datasets in parallel across many nodes',
    explanation: 'MapReduce provides a simple programming model for processing massive datasets in parallel across clusters, handling distribution, fault tolerance, and load balancing automatically.'
  },
  {
    id: 'cs401-q79',
    type: 'multiple_choice',
    prompt: 'What does the Map function in MapReduce do?',
    options: [
      'Transforms input records into key-value pairs',
      'Merges results',
      'Sorts data',
      'Deletes data'
    ],
    correctAnswer: 'Transforms input records into key-value pairs',
    explanation: 'The Map function processes input records and emits intermediate key-value pairs, which are then grouped by key and passed to Reduce functions for aggregation.'
  },
  {
    id: 'cs401-q80',
    type: 'multiple_choice',
    prompt: 'What does the Reduce function in MapReduce do?',
    options: [
      'Aggregates values for each key',
      'Filters input data',
      'Distributes data',
      'Validates data'
    ],
    correctAnswer: 'Aggregates values for each key',
    explanation: 'The Reduce function receives all values for a particular key and aggregates them (e.g., sum, count, average) to produce the final output for that key.'
  },

  // Topic 6: Distributed Storage and Processing - Quiz 2
  {
    id: 'cs401-q81',
    type: 'multiple_choice',
    prompt: 'What is the difference between batch and stream processing?',
    options: [
      'Batch processes bounded datasets; Stream processes unbounded data',
      'Batch is faster',
      'Stream uses less memory',
      'They are the same'
    ],
    correctAnswer: 'Batch processes bounded datasets; Stream processes unbounded data',
    explanation: 'Batch processing handles finite datasets with delayed results, while stream processing handles infinite data streams with near real-time results, each optimized for different use cases.'
  },
  {
    id: 'cs401-q82',
    type: 'multiple_choice',
    prompt: 'What is a distributed file system?',
    options: [
      'File system spanning multiple machines',
      'Cloud storage',
      'Local file system',
      'Database'
    ],
    correctAnswer: 'File system spanning multiple machines',
    explanation: 'Distributed file systems (like HDFS, GFS) store files across multiple machines, providing fault tolerance through replication and enabling massive storage capacity and parallel access.'
  },
  {
    id: 'cs401-q83',
    type: 'multiple_choice',
    prompt: 'How does HDFS (Hadoop Distributed File System) achieve fault tolerance?',
    options: [
      'Replicating blocks across multiple nodes',
      'RAID arrays',
      'Daily backups',
      'Error correcting codes'
    ],
    correctAnswer: 'Replicating blocks across multiple nodes',
    explanation: 'HDFS divides files into blocks and replicates each block (typically 3 copies) across different nodes and racks, ensuring data survives node and even rack failures.'
  },
  {
    id: 'cs401-q84',
    type: 'multiple_choice',
    prompt: 'What is the role of the NameNode in HDFS?',
    options: [
      'Manages metadata and namespace',
      'Stores actual data',
      'Processes MapReduce jobs',
      'Encrypts data'
    ],
    correctAnswer: 'Manages metadata and namespace',
    explanation: 'The NameNode is the master server that manages the file system namespace and metadata (which blocks belong to which files, where blocks are stored), while DataNodes store actual data.'
  },
  {
    id: 'cs401-q85',
    type: 'multiple_choice',
    prompt: 'What is a key-value store?',
    options: [
      'NoSQL database storing data as key-value pairs',
      'Relational database',
      'File system',
      'Cache only'
    ],
    correctAnswer: 'NoSQL database storing data as key-value pairs',
    explanation: 'Key-value stores are NoSQL databases that store data as simple key-value pairs, providing fast access, easy partitioning, and horizontal scaling at the cost of limited query capabilities.'
  },

  // Topic 6: Distributed Storage and Processing - Quiz 3
  {
    id: 'cs401-q86',
    type: 'multiple_choice',
    prompt: 'What is Amazon DynamoDB\'s consistency model?',
    options: [
      'Eventual consistency by default, optional strong consistency',
      'Always strongly consistent',
      'No consistency guarantees',
      'Causal consistency only'
    ],
    correctAnswer: 'Eventual consistency by default, optional strong consistency',
    explanation: 'DynamoDB uses eventual consistency by default for better performance and availability, but allows applications to request strongly consistent reads when needed, trading performance for consistency.'
  },
  {
    id: 'cs401-q87',
    type: 'multiple_choice',
    prompt: 'What is a document store (like MongoDB)?',
    options: [
      'NoSQL database storing semi-structured documents',
      'File storage system',
      'Relational database',
      'Cache'
    ],
    correctAnswer: 'NoSQL database storing semi-structured documents',
    explanation: 'Document stores manage semi-structured documents (JSON, BSON, XML), allowing flexible schemas, nested data, and richer queries than key-value stores while maintaining horizontal scalability.'
  },
  {
    id: 'cs401-q88',
    type: 'multiple_choice',
    prompt: 'What is a column-family store (like Cassandra)?',
    options: [
      'NoSQL database organizing data into column families',
      'Spreadsheet application',
      'Relational database',
      'Graph database'
    ],
    correctAnswer: 'NoSQL database organizing data into column families',
    explanation: 'Column-family stores group related columns together, optimizing for read/write performance on specific column sets, and are designed for massive scale and high write throughput.'
  },
  {
    id: 'cs401-q89',
    type: 'multiple_choice',
    prompt: 'What is data locality in distributed processing?',
    options: [
      'Moving computation to where data resides',
      'Storing all data locally',
      'Using local caches',
      'Regional data centers'
    ],
    correctAnswer: 'Moving computation to where data resides',
    explanation: 'Data locality means scheduling computation on nodes that already have the data, minimizing network transfer. MapReduce and similar frameworks optimize for data locality to improve performance.'
  },
  {
    id: 'cs401-q90',
    type: 'multiple_choice',
    prompt: 'What is the purpose of a distributed cache?',
    options: [
      'Reduce latency by caching frequently accessed data',
      'Permanent storage',
      'Data processing',
      'Authentication'
    ],
    correctAnswer: 'Reduce latency by caching frequently accessed data',
    explanation: 'Distributed caches (like Redis, Memcached) store frequently accessed data in memory across multiple nodes, providing extremely low latency access and reducing load on backend databases.'
  },

  // Topic 7: Distributed System Design - Quiz 1
  {
    id: 'cs401-q91',
    type: 'multiple_choice',
    prompt: 'What is the purpose of an API Gateway in microservices?',
    options: [
      'Single entry point routing requests to services',
      'Database access',
      'Service implementation',
      'Data storage'
    ],
    correctAnswer: 'Single entry point routing requests to services',
    explanation: 'API Gateways provide a single entry point for clients, routing requests to appropriate microservices while handling cross-cutting concerns like authentication, rate limiting, and load balancing.'
  },
  {
    id: 'cs401-q92',
    type: 'multiple_choice',
    prompt: 'What is service mesh?',
    options: [
      'Infrastructure layer managing service-to-service communication',
      'Network hardware',
      'Database cluster',
      'Web server'
    ],
    correctAnswer: 'Infrastructure layer managing service-to-service communication',
    explanation: 'A service mesh (like Istio, Linkerd) is an infrastructure layer that handles service-to-service communication, providing features like load balancing, encryption, observability, and resilience.'
  },
  {
    id: 'cs401-q93',
    type: 'multiple_choice',
    prompt: 'What is the Saga pattern used for?',
    options: [
      'Managing distributed transactions across microservices',
      'Data replication',
      'Load balancing',
      'Caching'
    ],
    correctAnswer: 'Managing distributed transactions across microservices',
    explanation: 'Sagas manage long-running distributed transactions by breaking them into local transactions with compensating actions, avoiding distributed locks while maintaining consistency.'
  },
  {
    id: 'cs401-q94',
    type: 'multiple_choice',
    prompt: 'What are the two types of Sagas?',
    options: [
      'Choreography and Orchestration',
      'Sync and Async',
      'Push and Pull',
      'Active and Passive'
    ],
    correctAnswer: 'Choreography and Orchestration',
    explanation: 'Choreography sagas use events where each service listens and reacts. Orchestration sagas use a central coordinator directing each step. Each has tradeoffs in complexity and coupling.'
  },
  {
    id: 'cs401-q95',
    type: 'multiple_choice',
    prompt: 'What is event sourcing?',
    options: [
      'Storing state changes as a sequence of events',
      'Publishing events to topics',
      'Real-time event processing',
      'Event logging for debugging'
    ],
    correctAnswer: 'Storing state changes as a sequence of events',
    explanation: 'Event sourcing stores all state changes as events in an append-only log, allowing state reconstruction, complete audit history, and time-travel queries, though increasing complexity.'
  },

  // Topic 7: Distributed System Design - Quiz 2
  {
    id: 'cs401-q96',
    type: 'multiple_choice',
    prompt: 'What is CQRS (Command Query Responsibility Segregation)?',
    options: [
      'Separating read and write models',
      'Combining reads and writes',
      'Query optimization',
      'Command pattern'
    ],
    correctAnswer: 'Separating read and write models',
    explanation: 'CQRS separates the models for reading and writing data, allowing independent optimization, scaling, and evolution of read and write sides, often combined with event sourcing.'
  },
  {
    id: 'cs401-q97',
    type: 'multiple_choice',
    prompt: 'What is the purpose of distributed tracing?',
    options: [
      'Track requests across multiple services',
      'Debug local code',
      'Monitor CPU usage',
      'Encrypt communications'
    ],
    correctAnswer: 'Track requests across multiple services',
    explanation: 'Distributed tracing (like Jaeger, Zipkin) tracks requests as they flow through microservices, helping identify performance bottlenecks, failures, and dependencies in complex systems.'
  },
  {
    id: 'cs401-q98',
    type: 'multiple_choice',
    prompt: 'What is a sidecar pattern?',
    options: [
      'Deploying helper components alongside main services',
      'Backup services',
      'Load balancing',
      'Data replication'
    ],
    correctAnswer: 'Deploying helper components alongside main services',
    explanation: 'Sidecar pattern deploys auxiliary components (for logging, monitoring, proxying) alongside main services in the same pod/host, extending functionality without modifying service code.'
  },
  {
    id: 'cs401-q99',
    type: 'multiple_choice',
    prompt: 'What is the strangler fig pattern?',
    options: [
      'Gradually replacing legacy systems with new ones',
      'Removing unused code',
      'Performance optimization',
      'Data migration'
    ],
    correctAnswer: 'Gradually replacing legacy systems with new ones',
    explanation: 'Strangler fig pattern incrementally replaces legacy system components with new implementations, routing increasing traffic to new services while maintaining old ones until complete replacement.'
  },
  {
    id: 'cs401-q100',
    type: 'multiple_choice',
    prompt: 'What is rate limiting used for in distributed systems?',
    options: [
      'Controlling request rates to protect services',
      'Measuring performance',
      'Data compression',
      'Encryption'
    ],
    correctAnswer: 'Controlling request rates to protect services',
    explanation: 'Rate limiting restricts the number of requests clients can make, protecting services from overload, implementing fair usage policies, and preventing denial-of-service attacks.'
  },

  // Topic 7: Distributed System Design - Quiz 3
  {
    id: 'cs401-q101',
    type: 'multiple_choice',
    prompt: 'What is the difference between horizontal and vertical scaling?',
    options: [
      'Horizontal adds more machines; Vertical adds more resources to one machine',
      'Horizontal is slower',
      'Vertical is cheaper',
      'They are the same'
    ],
    correctAnswer: 'Horizontal adds more machines; Vertical adds more resources to one machine',
    explanation: 'Horizontal scaling (scale-out) adds more machines to distribute load, while vertical scaling (scale-up) adds CPU/memory to existing machines. Horizontal scaling is unlimited but more complex.'
  },
  {
    id: 'cs401-q102',
    type: 'multiple_choice',
    prompt: 'What is backpressure in distributed systems?',
    options: [
      'Mechanism for handling overload by slowing down producers',
      'Network congestion',
      'Database pressure',
      'Memory pressure'
    ],
    correctAnswer: 'Mechanism for handling overload by slowing down producers',
    explanation: 'Backpressure is a feedback mechanism where overloaded consumers signal producers to slow down, preventing buffer overflow and maintaining system stability under high load.'
  },
  {
    id: 'cs401-q103',
    type: 'multiple_choice',
    prompt: 'What is idempotency in distributed systems?',
    options: [
      'Operations produce same result when executed multiple times',
      'Operations are fast',
      'Operations are simple',
      'Operations never fail'
    ],
    correctAnswer: 'Operations produce same result when executed multiple times',
    explanation: 'Idempotent operations produce the same result when executed multiple times, making them safe to retry. This is crucial for handling failures and duplicate messages in distributed systems.'
  },
  {
    id: 'cs401-q104',
    type: 'multiple_choice',
    prompt: 'What is the purpose of a message queue in distributed systems?',
    options: [
      'Asynchronous communication between services',
      'Synchronous RPC',
      'Data storage',
      'Authentication'
    ],
    correctAnswer: 'Asynchronous communication between services',
    explanation: 'Message queues (like RabbitMQ, Kafka) enable asynchronous communication, decoupling services, buffering during load spikes, and ensuring reliable message delivery between components.'
  },
  {
    id: 'cs401-q105',
    type: 'multiple_choice',
    prompt: 'What is the difference between at-most-once, at-least-once, and exactly-once delivery?',
    options: [
      'Guarantees about how many times messages are delivered',
      'Performance characteristics',
      'Message size limits',
      'Network protocols'
    ],
    correctAnswer: 'Guarantees about how many times messages are delivered',
    explanation: 'At-most-once may lose messages, at-least-once may duplicate messages, and exactly-once guarantees single delivery. Each has tradeoffs between complexity, performance, and guarantees.'
  }
];

export const cs401Quizzes: Quiz[] = [
  {
    id: 'cs401-quiz-1-1',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Distributed Systems Fundamentals - Basics',
    questions: questions.slice(0, 5)
  },
  {
    id: 'cs401-quiz-1-2',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Distributed Systems Fundamentals - Architectures',
    questions: questions.slice(5, 10)
  },
  {
    id: 'cs401-quiz-1-3',
    subjectId: 'cs401',
    topicId: 'cs401-topic-1',
    title: 'Distributed Systems Fundamentals - CAP Theorem',
    questions: questions.slice(10, 15)
  },
  {
    id: 'cs401-quiz-2-1',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Time and Ordering - Clock Synchronization',
    questions: questions.slice(15, 20)
  },
  {
    id: 'cs401-quiz-2-2',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Time and Ordering - Logical Clocks',
    questions: questions.slice(20, 25)
  },
  {
    id: 'cs401-quiz-2-3',
    subjectId: 'cs401',
    topicId: 'cs401-topic-2',
    title: 'Time and Ordering - Causality',
    questions: questions.slice(25, 30)
  },
  {
    id: 'cs401-quiz-3-1',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Consensus and Coordination - Fundamentals',
    questions: questions.slice(30, 35)
  },
  {
    id: 'cs401-quiz-3-2',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Consensus and Coordination - Two-Phase Commit',
    questions: questions.slice(35, 40)
  },
  {
    id: 'cs401-quiz-3-3',
    subjectId: 'cs401',
    topicId: 'cs401-topic-3',
    title: 'Consensus and Coordination - Raft',
    questions: questions.slice(40, 45)
  },
  {
    id: 'cs401-quiz-4-1',
    subjectId: 'cs401',
    topicId: 'cs401-topic-4',
    title: 'Replication and Consistency - Consistency Models',
    questions: questions.slice(45, 50)
  },
  {
    id: 'cs401-quiz-4-2',
    subjectId: 'cs401',
    topicId: 'cs401-topic-4',
    title: 'Replication and Consistency - Replication Strategies',
    questions: questions.slice(50, 55)
  },
  {
    id: 'cs401-quiz-4-3',
    subjectId: 'cs401',
    topicId: 'cs401-topic-4',
    title: 'Replication and Consistency - CRDTs',
    questions: questions.slice(55, 60)
  },
  {
    id: 'cs401-quiz-5-1',
    subjectId: 'cs401',
    topicId: 'cs401-topic-5',
    title: 'Fault Tolerance - Failure Types',
    questions: questions.slice(60, 65)
  },
  {
    id: 'cs401-quiz-5-2',
    subjectId: 'cs401',
    topicId: 'cs401-topic-5',
    title: 'Fault Tolerance - Recovery Mechanisms',
    questions: questions.slice(65, 70)
  },
  {
    id: 'cs401-quiz-5-3',
    subjectId: 'cs401',
    topicId: 'cs401-topic-5',
    title: 'Fault Tolerance - Resilience Patterns',
    questions: questions.slice(70, 75)
  },
  {
    id: 'cs401-quiz-6-1',
    subjectId: 'cs401',
    topicId: 'cs401-topic-6',
    title: 'Distributed Storage and Processing - Partitioning',
    questions: questions.slice(75, 80)
  },
  {
    id: 'cs401-quiz-6-2',
    subjectId: 'cs401',
    topicId: 'cs401-topic-6',
    title: 'Distributed Storage and Processing - MapReduce and DFS',
    questions: questions.slice(80, 85)
  },
  {
    id: 'cs401-quiz-6-3',
    subjectId: 'cs401',
    topicId: 'cs401-topic-6',
    title: 'Distributed Storage and Processing - NoSQL Systems',
    questions: questions.slice(85, 90)
  },
  {
    id: 'cs401-quiz-7-1',
    subjectId: 'cs401',
    topicId: 'cs401-topic-7',
    title: 'Distributed System Design - Microservices Patterns',
    questions: questions.slice(90, 95)
  },
  {
    id: 'cs401-quiz-7-2',
    subjectId: 'cs401',
    topicId: 'cs401-topic-7',
    title: 'Distributed System Design - Advanced Patterns',
    questions: questions.slice(95, 100)
  },
  {
    id: 'cs401-quiz-7-3',
    subjectId: 'cs401',
    topicId: 'cs401-topic-7',
    title: 'Distributed System Design - Scalability and Reliability',
    questions: questions.slice(100, 105)
  }
];
