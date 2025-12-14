import { Topic } from '../../../core/types';

export const cs104Topics: Topic[] = [
  {
    id: 'cs104-topic-1',
    title: 'Arrays and Linked Lists',
    content: 'Arrays and linked lists are fundamental linear data structures that store collections of elements. Arrays provide constant-time access to elements using indices, making them ideal for scenarios requiring frequent random access. They store elements in contiguous memory locations, which enables efficient iteration and cache performance. However, arrays have fixed sizes in many languages and require expensive operations for insertions and deletions in the middle.\n\nLinked lists, in contrast, consist of nodes where each node contains data and a reference to the next node. This structure allows for efficient insertions and deletions at any position, as only pointer updates are required. Linked lists come in several varieties: singly linked lists (forward traversal only), doubly linked lists (bidirectional traversal), and circular linked lists. While linked lists excel at dynamic size management and modifications, they suffer from slower access times since reaching an element requires traversing from the head. Understanding when to use each structure is crucial for writing efficient algorithms and choosing the right tool for specific programming challenges.',
    quizIds: ['cs104-quiz-1'],
    exerciseIds: ['cs104-exercise-1']
  },
  {
    id: 'cs104-topic-2',
    title: 'Stacks and Queues',
    content: 'Stacks and queues are abstract data types that impose specific ordering constraints on how elements are accessed. A stack follows the Last-In-First-Out (LIFO) principle, where the most recently added element is the first to be removed. This makes stacks perfect for scenarios like function call management, expression evaluation, undo mechanisms, and depth-first search algorithms. Common operations include push (add to top), pop (remove from top), and peek (view top element).\n\nQueues implement the First-In-First-Out (FIFO) principle, ensuring elements are processed in the order they arrive. This structure is essential for breadth-first search, scheduling systems, printer queues, and message buffers. Standard queue operations include enqueue (add to rear), dequeue (remove from front), and front (view front element). Variations include priority queues, where elements are processed based on priority rather than arrival order, and deques (double-ended queues) that allow insertions and deletions at both ends. Both data structures can be implemented using arrays or linked lists, each offering different performance trade-offs.',
    quizIds: ['cs104-quiz-2'],
    exerciseIds: ['cs104-exercise-2']
  },
  {
    id: 'cs104-topic-3',
    title: 'Trees',
    content: 'Trees are hierarchical data structures consisting of nodes connected by edges, with a single root node and no cycles. Each node can have zero or more child nodes, forming a parent-child relationship. Binary trees, where each node has at most two children, are among the most common tree structures. They serve as the foundation for many advanced data structures and algorithms.\n\nBinary Search Trees (BSTs) maintain a specific ordering property: for any node, all values in its left subtree are smaller, and all values in its right subtree are larger. This property enables efficient searching, insertion, and deletion operations with average-case O(log n) time complexity. However, BSTs can become unbalanced, degrading to O(n) performance. Self-balancing trees like AVL trees and Red-Black trees address this by automatically maintaining balance through rotations.\n\nOther important tree types include heaps (used for priority queues and heap sort), tries (for efficient string operations), and B-trees (for database indexing). Tree traversal algorithms—inorder, preorder, postorder, and level-order—provide different ways to visit all nodes systematically, each useful for specific applications.',
    quizIds: ['cs104-quiz-3'],
    exerciseIds: ['cs104-exercise-3']
  },
  {
    id: 'cs104-topic-4',
    title: 'Hash Tables',
    content: 'Hash tables are one of the most powerful and widely-used data structures, providing average-case constant-time O(1) performance for insertions, deletions, and lookups. They work by using a hash function to map keys to array indices, allowing direct access to values without searching. The hash function should distribute keys uniformly across the array to minimize collisions.\n\nCollisions occur when two different keys hash to the same index. Two primary collision resolution strategies exist: chaining (storing multiple elements at each index using linked lists or other structures) and open addressing (finding alternative locations through probing sequences). Linear probing, quadratic probing, and double hashing are common open addressing techniques, each with different performance characteristics and clustering behaviors.\n\nHash tables underpin many critical applications: database indexing, caching systems, symbol tables in compilers, and implementations of sets and maps in programming languages. The load factor (ratio of elements to table size) significantly impacts performance—too high causes excessive collisions, too low wastes memory. Dynamic resizing maintains optimal load factors by creating larger tables and rehashing all elements when thresholds are exceeded.',
    quizIds: ['cs104-quiz-4'],
    exerciseIds: ['cs104-exercise-4']
  },
  {
    id: 'cs104-topic-5',
    title: 'Graphs',
    content: 'Graphs are versatile data structures representing relationships between objects, consisting of vertices (nodes) and edges (connections). Unlike trees, graphs can contain cycles and have no inherent hierarchy. Graphs can be directed (edges have direction) or undirected (edges are bidirectional), and weighted (edges have associated costs) or unweighted. They model countless real-world systems: social networks, road maps, computer networks, and dependency relationships.\n\nCommon graph representations include adjacency matrices (2D arrays showing connections) and adjacency lists (arrays of lists storing each vertex\'s neighbors). Adjacency matrices offer O(1) edge lookup but use O(V²) space, while adjacency lists use O(V+E) space and are more efficient for sparse graphs. The choice depends on graph density and required operations.\n\nFundamental graph algorithms include traversals (depth-first search and breadth-first search), shortest path algorithms (Dijkstra\'s, Bellman-Ford, Floyd-Warshall), minimum spanning trees (Prim\'s, Kruskal\'s), and topological sorting. Graph theory concepts like connectivity, cycles, and graph coloring have applications in compiler optimization, circuit design, scheduling problems, and artificial intelligence. Understanding graphs is essential for solving complex computational problems.',
    quizIds: ['cs104-quiz-5'],
    exerciseIds: ['cs104-exercise-5']
  }
];
