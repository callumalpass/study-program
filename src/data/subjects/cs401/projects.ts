import { Project } from '../../../core/types';

export const cs401Projects: Project[] = [
  {
    id: 'cs401-project-1',
    subjectId: 'cs401',
    title: 'Distributed Key-Value Store with Raft Consensus',
    description: `Build a production-quality distributed key-value database that maintains strong consistency across multiple nodes using the Raft consensus algorithm. Your implementation will handle leader election, log replication, and graceful recovery from node failures while providing linearizable read and write operations through a clean key-value API.

This project explores the fundamental challenges of distributed consensus, including network partitions, split-brain scenarios, and maintaining consistency guarantees in the presence of failures. You will implement the complete Raft protocol including leader election, log replication, log compaction through snapshots, and dynamic cluster membership changes.

The system should support multiple concurrent clients, handle network delays and message loss, and provide strong consistency guarantees. Focus on correctness first, then optimize for performance. Your implementation should include comprehensive tests that verify correctness under various failure scenarios.`,
    requirements: [
      'Implement complete Raft consensus protocol including leader election, log replication, and safety guarantees',
      'Build a replicated state machine supporting key-value operations (get, put, delete) with linearizable consistency',
      'Handle network partitions and node failures with automatic recovery and leader re-election',
      'Implement persistent storage for logs and snapshots to survive node restarts',
      'Support dynamic cluster membership changes (adding/removing nodes)',
      'Create a client library that automatically discovers the leader and handles redirects',
      'Include comprehensive tests covering normal operation, various failure scenarios, and edge cases'
    ],
    rubric: [
      {
        name: 'Raft Protocol Implementation',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Complete and correct Raft implementation including all phases (leader election, log replication, safety). Handles all edge cases correctly. Code is well-structured and thoroughly tested.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Core Raft implementation is correct with minor issues. Most edge cases handled. Good code structure with adequate testing.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic Raft implementation works but has correctness issues under some failure scenarios. Some edge cases not handled. Testing is incomplete.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Raft implementation is incomplete or has significant correctness issues. Many edge cases not handled. Minimal testing.'
          }
        ]
      },
      {
        name: 'Fault Tolerance and Recovery',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'System gracefully handles all types of failures (node crashes, network partitions, message loss). Automatic recovery is robust and well-tested. State is properly persisted and restored.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Handles most failure scenarios correctly. Recovery works in common cases. Persistence implementation is functional with minor issues.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic failure handling present but incomplete. Recovery works in simple cases. Persistence has gaps or issues.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor failure handling. System often fails to recover or loses data. Persistence is missing or broken.'
          }
        ]
      },
      {
        name: 'Consistency Guarantees',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Provides linearizable reads and writes with formal correctness guarantees. All safety properties are maintained. Comprehensive tests verify consistency under concurrent access and failures.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Provides strong consistency in most scenarios. Minor consistency issues in edge cases. Good testing of consistency properties.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic consistency guarantees work but have gaps. Some consistency violations possible under certain conditions. Limited consistency testing.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Weak or incorrect consistency guarantees. Frequent consistency violations. Inadequate testing of consistency properties.'
          }
        ]
      },
      {
        name: 'Key-Value Store API and Client',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Clean, well-designed API with comprehensive operations. Client library is robust, handles leader changes automatically, and provides excellent error handling. Well-documented with examples.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Functional API with core operations. Client handles basic cases well. Good error handling and documentation.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic API works but has usability issues. Client has limited functionality or error handling. Documentation is minimal.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor API design or incomplete functionality. Client is unreliable or missing key features. Poor documentation.'
          }
        ]
      },
      {
        name: 'Code Quality and Architecture',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Excellent code organization, clear separation of concerns, and modular design. Code is readable, well-commented, and follows best practices. Clean abstractions.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good code structure with reasonable organization. Most code is readable and maintainable. Some areas could be improved.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic code organization but lacks clear structure. Code is functional but difficult to maintain or extend. Limited documentation.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor code organization and structure. Code is difficult to understand or maintain. Minimal documentation.'
          }
        ]
      },
      {
        name: 'Testing and Correctness Verification',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive test suite covering normal operations, failure scenarios, edge cases, and concurrency. Tests are well-organized and automated. Includes property-based or chaos testing.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good test coverage of main scenarios and some failure cases. Tests are automated and reasonably organized.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic tests present but coverage is limited. Some manual testing required. Many scenarios untested.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Minimal or no automated tests. System validation is ad-hoc or missing.'
          }
        ]
      }
    ],
    estimatedHours: 35,
    scaffolding: {
      overview: 'This project implements a distributed consensus system using the Raft algorithm. Start by understanding the Raft paper and its core concepts, then build incrementally: basic RPC, leader election, log replication, and finally persistence and cluster management.',
      gettingStarted: [
        'Read the Raft paper (https://raft.github.io/raft.pdf) and understand the core algorithm',
        'Design your system architecture: node structure, RPC layer, persistence layer',
        'Implement basic RPC communication between nodes',
        'Start with leader election, then add log replication',
        'Add persistence layer for fault tolerance',
        'Build the key-value store state machine on top',
        'Create comprehensive tests for each component'
      ],
      milestones: [
        'Milestone 1: Basic node structure and RPC communication working',
        'Milestone 2: Leader election functioning correctly',
        'Milestone 3: Log replication and basic consensus achieved',
        'Milestone 4: Persistence and crash recovery implemented',
        'Milestone 5: Key-value operations working with client library',
        'Milestone 6: Comprehensive testing and failure scenario handling'
      ],
      starterResources: [
        {
          label: 'Raft Paper',
          description: 'Original Raft consensus algorithm paper',
          link: 'https://raft.github.io/raft.pdf'
        },
        {
          label: 'Raft Visualization',
          description: 'Interactive visualization of the Raft algorithm',
          link: 'https://raft.github.io/'
        },
        {
          label: 'MIT 6.824 Lab',
          description: 'Distributed Systems course with Raft lab',
          link: 'https://pdos.csail.mit.edu/6.824/'
        }
      ],
      tips: [
        'Start simple: get leader election working first before adding log replication',
        'Use time.sleep() or similar for implementing election timeouts',
        'Log everything during development to understand the system behavior',
        'Test with 3-5 nodes initially, not just 2',
        'Implement persistence early to avoid major refactoring later',
        'Use deterministic testing where possible to reproduce bugs',
        'Consider using a testing framework that can inject network failures'
      ]
    }
  },
  {
    id: 'cs401-project-2',
    subjectId: 'cs401',
    title: 'Distributed Message Queue System',
    description: `Design and implement a distributed message queue system similar to Apache Kafka or RabbitMQ that provides reliable, ordered message delivery at scale. Your system will support multiple topics, producer-consumer patterns, message persistence, replication for fault tolerance, and horizontal scalability.

This project explores the challenges of building a high-throughput, fault-tolerant messaging system. You'll implement partitioning for scalability, replication for reliability, consumer groups for load balancing, and various delivery guarantees (at-most-once, at-least-once, exactly-once semantics).

The system should support multiple concurrent producers and consumers, handle broker failures gracefully, and provide configurable durability and ordering guarantees. Consider trade-offs between throughput, latency, and consistency. Your implementation should demonstrate understanding of distributed system design patterns including leader-follower replication, write-ahead logging, and offset management.`,
    requirements: [
      'Implement a multi-broker message queue system with support for topics and partitions',
      'Support producer API for publishing messages with configurable acknowledgment modes',
      'Implement consumer groups with automatic partition assignment and rebalancing',
      'Provide message persistence using write-ahead logs with configurable retention policies',
      'Implement replication with leader-follower pattern for fault tolerance (minimum 2 replicas per partition)',
      'Support at-least-once delivery semantics with consumer offset management',
      'Include monitoring capabilities showing throughput, lag, and broker health'
    ],
    rubric: [
      {
        name: 'Core Message Queue Implementation',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Complete message queue with topics, partitions, and clean APIs. Excellent handling of concurrent producers/consumers. Message ordering is maintained per-partition. System is well-architected and performant.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Functional message queue with core features working. Good concurrency handling with minor issues. Ordering guarantees mostly maintained. Reasonable performance.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic message queue works but has limitations. Some concurrency issues. Ordering guarantees have gaps. Performance is acceptable but not optimized.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Incomplete or unreliable message queue. Poor concurrency handling. Ordering not maintained. Significant performance issues.'
          }
        ]
      },
      {
        name: 'Replication and Fault Tolerance',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Robust replication with leader-follower pattern correctly implemented. System handles broker failures gracefully with automatic failover. No message loss during failures. Comprehensive failure testing.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Replication works correctly in most scenarios. Handles common failure cases with acceptable recovery. Minimal message loss. Good failure testing.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic replication present but has issues. Recovery from failures is manual or unreliable. Some message loss possible. Limited failure testing.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Replication is incomplete or broken. Poor failure handling with frequent message loss. Inadequate testing of failure scenarios.'
          }
        ]
      },
      {
        name: 'Consumer Groups and Load Balancing',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Complete consumer group implementation with automatic partition assignment and rebalancing. Handles consumer joins/leaves gracefully. Load balancing is efficient and fair. Offset management is robust.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Consumer groups work well with reasonable partition assignment. Rebalancing functions correctly in most cases. Good offset management.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic consumer group functionality. Partition assignment is static or has issues. Limited rebalancing. Offset management has gaps.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Consumer groups poorly implemented or missing key features. No rebalancing. Poor offset management leading to message duplication or loss.'
          }
        ]
      },
      {
        name: 'Persistence and Durability',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Robust persistence using write-ahead logs. Configurable durability guarantees with fsync options. Efficient log compaction and retention policies. Data survives crashes without corruption.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good persistence implementation with reasonable durability. Log management works correctly. Data usually survives crashes.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic persistence works but has limitations. Simple durability guarantees. Limited log management. Some data loss possible in crashes.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Weak persistence with frequent data loss. Poor durability guarantees. No log management. Data corruption possible.'
          }
        ]
      },
      {
        name: 'Performance and Scalability',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Excellent throughput and low latency. System scales horizontally with additional brokers. Efficient batching and compression. Includes performance benchmarks and monitoring.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good performance with reasonable throughput. Scales adequately. Some optimizations present. Basic monitoring.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Acceptable performance for moderate load. Limited scalability. Few optimizations. Minimal monitoring.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor performance and throughput. Does not scale. No optimizations. No monitoring.'
          }
        ]
      },
      {
        name: 'API Design and Documentation',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Clean, intuitive APIs for producers, consumers, and admin operations. Comprehensive documentation with examples. Easy to use and well-designed error handling.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Functional APIs that are reasonably easy to use. Good documentation covering main use cases. Decent error handling.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic APIs work but lack polish. Minimal documentation. Limited error handling or feedback.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor API design that is difficult to use. Inadequate documentation. Poor error handling.'
          }
        ]
      }
    ],
    estimatedHours: 30,
    scaffolding: {
      overview: 'Build a distributed message queue system from the ground up. Start with a single-broker implementation, then add partitioning, replication, and consumer groups. Focus on correctness first, then optimize for performance and scalability.',
      gettingStarted: [
        'Design the overall architecture: broker structure, storage layer, networking',
        'Implement a single-broker message queue with basic produce/consume',
        'Add write-ahead log for message persistence',
        'Implement partitioning to enable horizontal scaling',
        'Add replication with leader-follower pattern',
        'Implement consumer groups and partition assignment',
        'Add monitoring and administrative tools'
      ],
      milestones: [
        'Milestone 1: Single-broker queue with in-memory storage working',
        'Milestone 2: Persistent storage with write-ahead log implemented',
        'Milestone 3: Multi-partition support with producer partition selection',
        'Milestone 4: Replication and failover functioning correctly',
        'Milestone 5: Consumer groups with automatic rebalancing',
        'Milestone 6: Performance optimization and monitoring tools'
      ],
      starterResources: [
        {
          label: 'Kafka Design',
          description: 'Apache Kafka architecture and design principles',
          link: 'https://kafka.apache.org/documentation/#design'
        },
        {
          label: 'Log-Structured Storage',
          description: 'Understanding log-structured merge trees and write-ahead logs',
          link: 'https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying'
        },
        {
          label: 'Replication in Distributed Systems',
          description: 'Replication patterns and consistency models',
          link: 'https://martin.kleppmann.com/2015/05/11/please-stop-calling-databases-cp-or-ap.html'
        }
      ],
      tips: [
        'Start with a single broker and partition before adding complexity',
        'Use sequential disk I/O for write-ahead logs (much faster than random I/O)',
        'Consider using memory-mapped files for efficient persistence',
        'Batch messages in producers for better throughput',
        'Use zero-copy techniques for efficient message transfer',
        'Test with realistic workloads: many small messages vs. few large messages',
        'Monitor queue depth and consumer lag to understand system health',
        'Consider using protocol buffers or similar for efficient serialization'
      ]
    }
  },
  {
    id: 'cs401-project-3',
    subjectId: 'cs401',
    title: 'Distributed Computing Framework (MapReduce-style)',
    description: `Implement a distributed computing framework inspired by MapReduce that can distribute computation across multiple worker nodes, handle failures gracefully, and process large datasets efficiently. Your system will include a master coordinator for job scheduling, worker nodes for executing tasks, and automatic fault recovery.

This project demonstrates the power of the MapReduce programming model for distributed data processing. You'll implement job scheduling, task distribution, intermediate data shuffling, fault detection and recovery, and data locality optimization. The system should make it easy to write distributed programs using simple map and reduce functions.

Your implementation should support multiple concurrent jobs, handle worker failures by reassigning tasks, and optimize for data locality when possible. Include several example applications (word count, inverted index, distributed sort) to demonstrate the framework's capabilities. Focus on building a clean abstraction that hides the complexity of distribution from the programmer.`,
    requirements: [
      'Implement a master coordinator that schedules map and reduce tasks across worker nodes',
      'Build worker nodes that execute map and reduce tasks and report progress to the master',
      'Handle worker failures with automatic task reassignment and recovery',
      'Implement the shuffle phase to redistribute intermediate data from mappers to reducers',
      'Support pluggable map and reduce functions for different computations',
      'Implement at least three example applications: word count, inverted index, and distributed sort',
      'Include optimizations for data locality and network efficiency'
    ],
    rubric: [
      {
        name: 'MapReduce Framework Implementation',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Complete MapReduce implementation with clean abstractions. Master and workers coordinate correctly. All phases (map, shuffle, reduce) work correctly. Framework is easy to use with pluggable functions. Excellent code structure.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Solid MapReduce implementation with core features working. Good coordination between master and workers. All phases functional with minor issues. Reasonably easy to use.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic MapReduce framework works but has limitations. Coordination has issues in some scenarios. Some phases have bugs. Usability could be improved.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Incomplete or unreliable MapReduce implementation. Poor coordination between components. Missing or broken phases. Difficult to use.'
          }
        ]
      },
      {
        name: 'Fault Tolerance and Task Management',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Robust fault detection and recovery. Worker failures handled gracefully with task reassignment. No job failures due to worker crashes. Comprehensive failure testing demonstrates reliability.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good fault tolerance with effective task reassignment. Handles most failure scenarios correctly. Recovery is reliable in common cases. Good failure testing.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic fault tolerance present. Simple failures handled but complex scenarios have issues. Task reassignment sometimes fails. Limited failure testing.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor fault tolerance. Worker failures cause job failures. Task reassignment unreliable. Inadequate failure testing.'
          }
        ]
      },
      {
        name: 'Shuffle Phase and Data Management',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Efficient shuffle implementation with correct partitioning. Intermediate data handled properly with spilling to disk when needed. Network-efficient with batching and compression. Clean abstractions for data serialization.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Shuffle phase works correctly with reasonable efficiency. Good data partitioning. Handles large intermediate data adequately. Some optimizations present.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic shuffle implementation works but is inefficient. Partitioning has issues. Limited handling of large data. Few optimizations.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Shuffle phase broken or highly inefficient. Poor partitioning. Cannot handle large intermediate data. No optimizations.'
          }
        ]
      },
      {
        name: 'Example Applications',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'All three required applications (word count, inverted index, distributed sort) fully implemented and working correctly. Applications demonstrate framework capabilities well. Clean, reusable code.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'All three applications implemented and mostly working. Minor bugs in some applications. Good demonstration of framework features.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Two or three applications present but with issues. Limited functionality or correctness problems. Basic demonstration of framework.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Fewer than two applications, or applications are incomplete/broken. Poor demonstration of framework capabilities.'
          }
        ]
      },
      {
        name: 'Performance and Scalability',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Excellent performance with near-linear scaling. Data locality optimizations working. Efficient network usage. Good parallelism. Includes performance benchmarks showing scalability.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good performance and reasonable scalability. Some locality optimizations. Decent parallelism. Performance tested on realistic workloads.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Acceptable performance but limited scalability. Few optimizations. Suboptimal parallelism. Basic performance testing.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor performance and no scalability. No optimizations. Sequential execution or poor parallelism. No performance testing.'
          }
        ]
      },
      {
        name: 'Code Quality and Documentation',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Clean, well-organized code with clear separation of concerns. Excellent documentation including API docs and user guide. Easy to extend with new applications. Well-commented.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good code structure and organization. Adequate documentation covering main features. Reasonably maintainable and extensible.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic code organization but could be improved. Minimal documentation. Difficult to extend or maintain in places.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor code organization and structure. Inadequate documentation. Difficult to understand or extend.'
          }
        ]
      }
    ],
    estimatedHours: 25,
    scaffolding: {
      overview: 'Build a distributed computing framework that makes parallel data processing simple. Start with the core MapReduce abstraction, implement the master-worker architecture, add fault tolerance, and optimize for performance. Create example applications to validate your design.',
      gettingStarted: [
        'Study the original MapReduce paper to understand the programming model',
        'Design the master-worker architecture and communication protocol',
        'Implement basic RPC for master-worker communication',
        'Start with a simple word count example running on a single worker',
        'Add multiple workers and task distribution',
        'Implement the shuffle phase for redistributing data',
        'Add fault tolerance with task reassignment',
        'Build additional example applications'
      ],
      milestones: [
        'Milestone 1: Basic master-worker architecture with RPC communication',
        'Milestone 2: Single-worker MapReduce with word count working',
        'Milestone 3: Multi-worker task distribution and execution',
        'Milestone 4: Shuffle phase correctly redistributing intermediate data',
        'Milestone 5: Fault tolerance with automatic task reassignment',
        'Milestone 6: All three example applications working with performance optimization'
      ],
      starterResources: [
        {
          label: 'MapReduce Paper',
          description: 'Original Google MapReduce paper',
          link: 'https://research.google/pubs/pub62/'
        },
        {
          label: 'MIT 6.824 MapReduce Lab',
          description: 'Lab assignment from MIT distributed systems course',
          link: 'https://pdos.csail.mit.edu/6.824/labs/lab-mr.html'
        },
        {
          label: 'Hadoop Architecture',
          description: 'Apache Hadoop architecture overview',
          link: 'https://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html'
        }
      ],
      tips: [
        'Start simple: get a single-worker implementation working first',
        'Use a clear RPC interface between master and workers',
        'Hash partition keys to distribute intermediate data evenly',
        'Use separate directories for each task\'s intermediate files',
        'Implement task timeouts to detect failed workers',
        'Consider using unique task IDs to handle duplicate task executions',
        'Test with various data sizes from small to large',
        'Profile your code to find performance bottlenecks',
        'Consider combiner functions to reduce shuffle data'
      ]
    }
  }
];
