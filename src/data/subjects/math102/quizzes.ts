import { Quiz } from '../../../core/types';

export const math102Quizzes: Quiz[] = [
  // ========== TOPIC 1: COMBINATORICS ==========
  {
    id: 'math102-q1',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Combinatorics - Fundamentals',
    questions: [
      {
        id: 'math102-q1-1',
        type: 'multiple_choice',
        prompt: 'How many different ways can you arrange 5 distinct books on a shelf?',
        options: ['25', '60', '120', '720'],
        correctAnswer: 2,
        explanation: 'The number of permutations of 5 distinct objects is 5! = 5 × 4 × 3 × 2 × 1 = 120.'
      },
      {
        id: 'math102-q1-2',
        type: 'multiple_choice',
        prompt: 'How many ways can you choose 3 students from a class of 10 to form a committee?',
        options: ['30', '120', '720', '1000'],
        correctAnswer: 1,
        explanation: 'This is C(10,3) = 10!/(3! × 7!) = 120. Order does not matter for committees.'
      },
      {
        id: 'math102-q1-3',
        type: 'true_false',
        prompt: 'The pigeonhole principle states that if n items are placed into m containers where n > m, at least one container must contain more than one item.',
        correctAnswer: true,
        explanation: 'This is the correct statement of the pigeonhole principle.'
      },
      {
        id: 'math102-q1-4',
        type: 'fill_blank',
        prompt: 'The formula for combinations C(n,k) is n! / (k! × ____!).',
        correctAnswer: 'n-k',
        explanation: 'C(n,k) = n! / (k! × (n-k)!), representing choosing k items from n.'
      },
      {
        id: 'math102-q1-5',
        type: 'multiple_choice',
        prompt: 'What is C(8,3)?',
        options: ['24', '56', '336', '40320'],
        correctAnswer: 1,
        explanation: 'C(8,3) = 8!/(3!×5!) = (8×7×6)/(3×2×1) = 336/6 = 56.'
      }
    ]
  },
  {
    id: 'math102-q1b',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Combinatorics - Application',
    questions: [
      {
        id: 'math102-q1b-1',
        type: 'multiple_choice',
        prompt: 'A password consists of 3 uppercase letters followed by 2 digits. How many passwords are possible?',
        options: ['17,576', '175,760', '1,757,600', '17,576,000'],
        correctAnswer: 2,
        explanation: '26³ × 10² = 17,576 × 100 = 1,757,600 possible passwords.'
      },
      {
        id: 'math102-q1b-2',
        type: 'code_output',
        prompt: 'What is P(5,3), the number of permutations of 5 items taken 3 at a time?',
        correctAnswer: '60',
        explanation: 'P(5,3) = 5!/(5-3)! = 5!/2! = 120/2 = 60.'
      },
      {
        id: 'math102-q1b-3',
        type: 'multiple_choice',
        prompt: 'How many ways can the letters in "MISSISSIPPI" be arranged?',
        options: ['34650', '39916800', '332640', '11!'],
        correctAnswer: 0,
        explanation: '11!/(4!×4!×2!) = 39916800/(24×24×2) = 34650. Divide by factorials of repeated letters.'
      },
      {
        id: 'math102-q1b-4',
        type: 'true_false',
        prompt: 'The number of subsets of a set with n elements is 2^n.',
        correctAnswer: true,
        explanation: 'Each element has 2 choices (in or out), so 2^n total subsets including empty set.'
      },
      {
        id: 'math102-q1b-5',
        type: 'multiple_choice',
        prompt: 'How many paths exist from (0,0) to (3,2) moving only right or up?',
        options: ['5', '6', '10', '12'],
        correctAnswer: 2,
        explanation: 'C(3+2, 2) = C(5,2) = 10. We choose 2 of 5 moves to be "up".'
      }
    ]
  },
  {
    id: 'math102-q1c',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Combinatorics - Advanced',
    questions: [
      {
        id: 'math102-q1c-1',
        type: 'multiple_choice',
        prompt: 'Using inclusion-exclusion, how many integers from 1-100 are divisible by 2 or 3?',
        options: ['50', '67', '83', '66'],
        correctAnswer: 1,
        explanation: '|A∪B| = |A| + |B| - |A∩B| = 50 + 33 - 16 = 67.'
      },
      {
        id: 'math102-q1c-2',
        type: 'multiple_choice',
        prompt: 'How many ways can 5 identical balls be distributed into 3 distinct boxes?',
        options: ['15', '21', '35', '243'],
        correctAnswer: 1,
        explanation: 'Stars and bars: C(5+3-1, 3-1) = C(7,2) = 21.'
      },
      {
        id: 'math102-q1c-3',
        type: 'fill_blank',
        prompt: 'The number of derangements D(3) (permutations with no fixed points) is ____.',
        correctAnswer: '2',
        explanation: 'D(3) = 3! × (1/0! - 1/1! + 1/2! - 1/3!) = 6 × (1-1+0.5-0.167) = 2.'
      },
      {
        id: 'math102-q1c-4',
        type: 'true_false',
        prompt: 'In any group of 13 people, at least two must share the same birth month.',
        correctAnswer: true,
        explanation: 'Pigeonhole: 13 people into 12 months means at least one month has ⌈13/12⌉ = 2 people.'
      },
      {
        id: 'math102-q1c-5',
        type: 'multiple_choice',
        prompt: 'The number of binary strings of length 6 with exactly 3 ones is:',
        options: ['15', '20', '30', '64'],
        correctAnswer: 1,
        explanation: 'C(6,3) = 20. Choose 3 positions for the ones.'
      }
    ]
  },

  // ========== TOPIC 2: RECURRENCE RELATIONS ==========
  {
    id: 'math102-q2',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Recurrence Relations - Fundamentals',
    questions: [
      {
        id: 'math102-q2-1',
        type: 'multiple_choice',
        prompt: 'What is the time complexity solution to T(n) = 2T(n/2) + n using the Master Theorem?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'Case 2 of Master Theorem: a=2, b=2, f(n)=n, log_b(a)=1, so T(n) = Θ(n log n).'
      },
      {
        id: 'math102-q2-2',
        type: 'code_output',
        prompt: 'If F(n) = F(n-1) + F(n-2) with F(0)=0 and F(1)=1, what is F(6)?',
        correctAnswer: '8',
        explanation: 'F(2)=1, F(3)=2, F(4)=3, F(5)=5, F(6)=8. This is the Fibonacci sequence.'
      },
      {
        id: 'math102-q2-3',
        type: 'true_false',
        prompt: 'The recurrence T(n) = T(n-1) + 1 with T(1) = 1 has solution T(n) = n.',
        correctAnswer: true,
        explanation: 'By iteration: T(n) = T(n-1) + 1 = T(1) + (n-1) = 1 + (n-1) = n.'
      },
      {
        id: 'math102-q2-4',
        type: 'multiple_choice',
        prompt: 'What is the closed form for T(n) = 2T(n-1) with T(0) = 1?',
        options: ['n', '2n', '2^n', 'n²'],
        correctAnswer: 2,
        explanation: 'T(n) = 2^n. Each step doubles: T(0)=1, T(1)=2, T(2)=4, etc.'
      },
      {
        id: 'math102-q2-5',
        type: 'fill_blank',
        prompt: 'The minimum number of moves to solve Tower of Hanoi with n disks is 2^n - ____.',
        correctAnswer: '1',
        explanation: 'T(n) = 2T(n-1) + 1, with closed form T(n) = 2^n - 1.'
      }
    ]
  },
  {
    id: 'math102-q2b',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Recurrence Relations - Application',
    questions: [
      {
        id: 'math102-q2b-1',
        type: 'multiple_choice',
        prompt: 'What is the complexity of T(n) = T(n/2) + c using Master Theorem?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Case 2 with f(n) = 1: a=1, b=2, log_b(a)=0, f(n)=Θ(1), so T(n)=Θ(log n).'
      },
      {
        id: 'math102-q2b-2',
        type: 'code_output',
        prompt: 'For the recurrence a(n) = 3a(n-1) with a(0) = 2, what is a(3)?',
        correctAnswer: '54',
        explanation: 'a(1)=6, a(2)=18, a(3)=54. General solution: a(n) = 2 × 3^n.'
      },
      {
        id: 'math102-q2b-3',
        type: 'multiple_choice',
        prompt: 'The characteristic equation for a(n) = 5a(n-1) - 6a(n-2) is:',
        options: ['x² - 5x + 6 = 0', 'x² + 5x - 6 = 0', 'x² - 5x - 6 = 0', 'x² + 5x + 6 = 0'],
        correctAnswer: 0,
        explanation: 'Replace a(n) with x^n: x² = 5x - 6, so x² - 5x + 6 = 0.'
      },
      {
        id: 'math102-q2b-4',
        type: 'true_false',
        prompt: 'The Master Theorem applies to recurrences of the form T(n) = aT(n/b) + f(n).',
        correctAnswer: true,
        explanation: 'Yes, the Master Theorem solves divide-and-conquer recurrences of this form.'
      },
      {
        id: 'math102-q2b-5',
        type: 'multiple_choice',
        prompt: 'What is T(n) = 4T(n/2) + n² using Master Theorem?',
        options: ['O(n²)', 'O(n² log n)', 'O(n³)', 'O(n⁴)'],
        correctAnswer: 1,
        explanation: 'log_2(4)=2, f(n)=n²=Θ(n²), Case 2 applies: T(n) = Θ(n² log n).'
      }
    ]
  },
  {
    id: 'math102-q2c',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Recurrence Relations - Advanced',
    questions: [
      {
        id: 'math102-q2c-1',
        type: 'multiple_choice',
        prompt: 'The roots of x² - x - 1 = 0 (Fibonacci characteristic) are:',
        options: ['1 and -1', '(1±√5)/2', '1 and 2', '(-1±√5)/2'],
        correctAnswer: 1,
        explanation: 'x = (1±√5)/2. The positive root φ ≈ 1.618 is the golden ratio.'
      },
      {
        id: 'math102-q2c-2',
        type: 'code_output',
        prompt: 'What is the 5th Catalan number C(5)?',
        correctAnswer: '42',
        explanation: 'C(5) = C(2×5,5)/(5+1) = C(10,5)/6 = 252/6 = 42.'
      },
      {
        id: 'math102-q2c-3',
        type: 'fill_blank',
        prompt: 'For T(n) = 7T(n/2) + n², the Master Theorem gives T(n) = Θ(n^____).',
        correctAnswer: 'log2(7)',
        explanation: 'log_2(7) ≈ 2.81. Since f(n)=n² and log_2(7)>2, Case 1 applies.'
      },
      {
        id: 'math102-q2c-4',
        type: 'true_false',
        prompt: 'The Fibonacci sequence grows exponentially at rate φ^n where φ is the golden ratio.',
        correctAnswer: true,
        explanation: 'F(n) ≈ φ^n/√5, so Fibonacci grows exponentially with base φ ≈ 1.618.'
      },
      {
        id: 'math102-q2c-5',
        type: 'multiple_choice',
        prompt: 'Which recurrence describes Strassen\'s matrix multiplication?',
        options: ['T(n) = 8T(n/2) + n²', 'T(n) = 7T(n/2) + n²', 'T(n) = 4T(n/2) + n', 'T(n) = 2T(n/2) + n²'],
        correctAnswer: 1,
        explanation: 'Strassen uses 7 recursive multiplications of n/2 × n/2 matrices, giving O(n^2.81).'
      }
    ]
  },

  // ========== TOPIC 3: GRAPH THEORY BASICS ==========
  {
    id: 'math102-q3',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Graph Theory - Fundamentals',
    questions: [
      {
        id: 'math102-q3-1',
        type: 'multiple_choice',
        prompt: 'In a complete graph with 6 vertices (K₆), how many edges are there?',
        options: ['6', '12', '15', '30'],
        correctAnswer: 2,
        explanation: 'Complete graph K_n has n(n-1)/2 edges. K₆ has 6×5/2 = 15 edges.'
      },
      {
        id: 'math102-q3-2',
        type: 'multiple_choice',
        prompt: 'What is the minimum number of edges in a connected graph with 10 vertices?',
        options: ['9', '10', '45', '90'],
        correctAnswer: 0,
        explanation: 'A tree is minimally connected with n-1 edges. So 10 vertices need at least 9 edges.'
      },
      {
        id: 'math102-q3-3',
        type: 'true_false',
        prompt: 'The handshaking lemma states that the sum of all vertex degrees equals twice the number of edges.',
        correctAnswer: true,
        explanation: 'Σdeg(v) = 2|E| because each edge contributes 2 to the total degree.'
      },
      {
        id: 'math102-q3-4',
        type: 'fill_blank',
        prompt: 'A tree with n vertices has exactly ____ edges.',
        correctAnswer: 'n-1',
        explanation: 'Trees are minimally connected: n vertices, n-1 edges.'
      },
      {
        id: 'math102-q3-5',
        type: 'multiple_choice',
        prompt: 'A graph is bipartite if and only if it contains no cycles of:',
        options: ['Even length', 'Odd length', 'Length 3', 'Length 4'],
        correctAnswer: 1,
        explanation: 'A graph is bipartite iff it contains no odd-length cycles.'
      }
    ]
  },
  {
    id: 'math102-q3b',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Graph Theory - Application',
    questions: [
      {
        id: 'math102-q3b-1',
        type: 'code_output',
        prompt: 'If a simple graph has 5 vertices each with degree 3, is this possible? Answer yes or no.',
        correctAnswer: 'no',
        explanation: 'Sum of degrees = 5×3 = 15, which is odd. But 2|E| must be even. Contradiction.'
      },
      {
        id: 'math102-q3b-2',
        type: 'multiple_choice',
        prompt: 'A graph has an Eulerian circuit if and only if:',
        options: ['All vertices have degree 2', 'All vertices have even degree', 'Exactly 2 vertices have odd degree', 'The graph is bipartite'],
        correctAnswer: 1,
        explanation: 'Eulerian circuit exists iff the graph is connected and all vertices have even degree.'
      },
      {
        id: 'math102-q3b-3',
        type: 'true_false',
        prompt: 'Every connected graph with n vertices has at least n-1 edges.',
        correctAnswer: true,
        explanation: 'A spanning tree has exactly n-1 edges, which is the minimum for connectivity.'
      },
      {
        id: 'math102-q3b-4',
        type: 'multiple_choice',
        prompt: 'In a directed graph, the in-degree of a vertex is:',
        options: ['Number of edges leaving the vertex', 'Number of edges entering the vertex', 'Total number of incident edges', 'Number of self-loops'],
        correctAnswer: 1,
        explanation: 'In-degree counts edges coming into a vertex; out-degree counts edges leaving.'
      },
      {
        id: 'math102-q3b-5',
        type: 'fill_blank',
        prompt: 'The number of edges in a complete bipartite graph K_{3,4} is ____.',
        correctAnswer: '12',
        explanation: 'K_{m,n} has m×n edges. K_{3,4} has 3×4 = 12 edges.'
      }
    ]
  },
  {
    id: 'math102-q3c',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Graph Theory - Advanced',
    questions: [
      {
        id: 'math102-q3c-1',
        type: 'multiple_choice',
        prompt: 'Which graph property is NP-complete to determine?',
        options: ['Connectivity', 'Bipartiteness', 'Hamiltonian path existence', 'Eulerian path existence'],
        correctAnswer: 2,
        explanation: 'Finding Hamiltonian paths is NP-complete. Eulerian paths have polynomial-time checks.'
      },
      {
        id: 'math102-q3c-2',
        type: 'true_false',
        prompt: 'Two graphs are isomorphic if they have the same number of vertices and edges.',
        correctAnswer: false,
        explanation: 'Isomorphism requires same structure, not just same counts. Counter-examples exist.'
      },
      {
        id: 'math102-q3c-3',
        type: 'multiple_choice',
        prompt: 'The chromatic number of a complete graph K_n is:',
        options: ['1', '2', 'n-1', 'n'],
        correctAnswer: 3,
        explanation: 'In K_n, every vertex is adjacent to every other, so n colors are needed.'
      },
      {
        id: 'math102-q3c-4',
        type: 'code_output',
        prompt: 'How many spanning trees does the complete graph K_4 have?',
        correctAnswer: '16',
        explanation: 'By Cayley\'s formula, K_n has n^(n-2) spanning trees. K_4 has 4² = 16.'
      },
      {
        id: 'math102-q3c-5',
        type: 'fill_blank',
        prompt: 'A planar graph with n ≥ 3 vertices has at most ____ edges (Euler\'s formula consequence).',
        correctAnswer: '3n-6',
        explanation: 'For planar graphs: |E| ≤ 3|V| - 6 when n ≥ 3.'
      }
    ]
  },

  // ========== TOPIC 4: GRAPH ALGORITHMS ==========
  {
    id: 'math102-q4',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Graph Algorithms - Fundamentals',
    questions: [
      {
        id: 'math102-q4-1',
        type: 'multiple_choice',
        prompt: 'Which traversal algorithm uses a queue data structure?',
        options: ['Depth-First Search', 'Breadth-First Search', 'Topological Sort', 'Dijkstra\'s (basic)'],
        correctAnswer: 1,
        explanation: 'BFS uses a queue (FIFO) to explore level by level.'
      },
      {
        id: 'math102-q4-2',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of BFS on a graph with V vertices and E edges?',
        options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V × E)'],
        correctAnswer: 2,
        explanation: 'BFS visits each vertex and edge once: O(V + E).'
      },
      {
        id: 'math102-q4-3',
        type: 'true_false',
        prompt: 'Depth-First Search can be used to detect cycles in a directed graph.',
        correctAnswer: true,
        explanation: 'DFS detects cycles by finding back edges to vertices in the current recursion stack.'
      },
      {
        id: 'math102-q4-4',
        type: 'fill_blank',
        prompt: 'BFS finds the ____ path in an unweighted graph.',
        correctAnswer: 'shortest',
        explanation: 'BFS explores by distance from source, finding shortest paths in unweighted graphs.'
      },
      {
        id: 'math102-q4-5',
        type: 'multiple_choice',
        prompt: 'DFS uses which data structure (implicitly via recursion)?',
        options: ['Queue', 'Stack', 'Heap', 'Hash table'],
        correctAnswer: 1,
        explanation: 'DFS uses a stack - either explicit or via recursion call stack.'
      }
    ]
  },
  {
    id: 'math102-q4b',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Graph Algorithms - Application',
    questions: [
      {
        id: 'math102-q4b-1',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of Dijkstra\'s algorithm with a binary heap?',
        options: ['O(V)', 'O(E log V)', 'O((V + E) log V)', 'O(V²)'],
        correctAnswer: 2,
        explanation: 'With binary heap: O((V + E) log V) due to priority queue operations.'
      },
      {
        id: 'math102-q4b-2',
        type: 'true_false',
        prompt: 'Dijkstra\'s algorithm works correctly with negative edge weights.',
        correctAnswer: false,
        explanation: 'Dijkstra requires non-negative weights. Use Bellman-Ford for negative weights.'
      },
      {
        id: 'math102-q4b-3',
        type: 'multiple_choice',
        prompt: 'Topological sort is possible for:',
        options: ['Any graph', 'Connected graphs only', 'Directed acyclic graphs (DAGs)', 'Undirected graphs only'],
        correctAnswer: 2,
        explanation: 'Topological ordering requires a DAG - no cycles allowed.'
      },
      {
        id: 'math102-q4b-4',
        type: 'fill_blank',
        prompt: 'Bellman-Ford runs ____ iterations of relaxing all edges (V = number of vertices).',
        correctAnswer: 'V-1',
        explanation: 'V-1 iterations suffice for shortest paths; an Vth change indicates negative cycle.'
      },
      {
        id: 'math102-q4b-5',
        type: 'multiple_choice',
        prompt: 'Which algorithm finds all-pairs shortest paths?',
        options: ['BFS', 'Dijkstra', 'Floyd-Warshall', 'Kruskal'],
        correctAnswer: 2,
        explanation: 'Floyd-Warshall computes shortest paths between all pairs in O(V³).'
      }
    ]
  },
  {
    id: 'math102-q4c',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Graph Algorithms - Advanced',
    questions: [
      {
        id: 'math102-q4c-1',
        type: 'multiple_choice',
        prompt: 'Kruskal\'s algorithm uses which data structure for efficient cycle detection?',
        options: ['Stack', 'Queue', 'Union-Find (Disjoint Set)', 'Binary Search Tree'],
        correctAnswer: 2,
        explanation: 'Union-Find efficiently checks if adding an edge creates a cycle.'
      },
      {
        id: 'math102-q4c-2',
        type: 'code_output',
        prompt: 'What is the time complexity of Floyd-Warshall? Answer in Big-O with V.',
        correctAnswer: 'O(V^3)',
        explanation: 'Three nested loops over V vertices gives O(V³).'
      },
      {
        id: 'math102-q4c-3',
        type: 'true_false',
        prompt: 'Prim\'s and Kruskal\'s algorithms always produce the same minimum spanning tree.',
        correctAnswer: false,
        explanation: 'They find MSTs with same total weight, but may differ if multiple MSTs exist.'
      },
      {
        id: 'math102-q4c-4',
        type: 'multiple_choice',
        prompt: 'Which is true about Bellman-Ford vs Dijkstra?',
        options: ['Bellman-Ford is always faster', 'Dijkstra handles negative edges', 'Bellman-Ford detects negative cycles', 'They have the same complexity'],
        correctAnswer: 2,
        explanation: 'Bellman-Ford can detect negative cycles; Dijkstra cannot handle negative edges.'
      },
      {
        id: 'math102-q4c-5',
        type: 'fill_blank',
        prompt: 'The time complexity of Kruskal\'s algorithm is O(____ log E) where E is edges.',
        correctAnswer: 'E',
        explanation: 'Sorting edges: O(E log E). Union-Find operations: nearly O(E). Total: O(E log E).'
      }
    ]
  },

  // ========== TOPIC 5: NUMBER THEORY ==========
  {
    id: 'math102-q5',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Number Theory - Fundamentals',
    questions: [
      {
        id: 'math102-q5-1',
        type: 'multiple_choice',
        prompt: 'What is gcd(48, 18) using Euclid\'s algorithm?',
        options: ['3', '6', '9', '12'],
        correctAnswer: 1,
        explanation: 'gcd(48,18) = gcd(18,12) = gcd(12,6) = gcd(6,0) = 6.'
      },
      {
        id: 'math102-q5-2',
        type: 'code_output',
        prompt: 'What is 7 × 8 (mod 5)?',
        correctAnswer: '1',
        explanation: '7 × 8 = 56. 56 mod 5 = 1. Or: (2 × 3) mod 5 = 6 mod 5 = 1.'
      },
      {
        id: 'math102-q5-3',
        type: 'true_false',
        prompt: 'Two integers are relatively prime if their greatest common divisor is 1.',
        correctAnswer: true,
        explanation: 'Relatively prime (coprime) means gcd = 1. E.g., 8 and 15.'
      },
      {
        id: 'math102-q5-4',
        type: 'fill_blank',
        prompt: 'The time complexity of Euclid\'s algorithm is O(log ____).',
        correctAnswer: 'n',
        explanation: 'Euclid\'s algorithm runs in O(log(min(a,b))) time.'
      },
      {
        id: 'math102-q5-5',
        type: 'multiple_choice',
        prompt: 'lcm(12, 18) = ?',
        options: ['6', '36', '72', '216'],
        correctAnswer: 1,
        explanation: 'lcm(a,b) = a×b/gcd(a,b) = 216/6 = 36.'
      }
    ]
  },
  {
    id: 'math102-q5b',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Number Theory - Application',
    questions: [
      {
        id: 'math102-q5b-1',
        type: 'multiple_choice',
        prompt: 'The modular inverse of 3 modulo 7 is:',
        options: ['2', '3', '4', '5'],
        correctAnswer: 3,
        explanation: '3 × 5 = 15 ≡ 1 (mod 7). So 3⁻¹ ≡ 5 (mod 7).'
      },
      {
        id: 'math102-q5b-2',
        type: 'true_false',
        prompt: 'A modular inverse of a (mod n) exists if and only if gcd(a, n) = 1.',
        correctAnswer: true,
        explanation: 'Modular inverse exists iff a and n are coprime.'
      },
      {
        id: 'math102-q5b-3',
        type: 'code_output',
        prompt: 'What is 2^10 mod 7?',
        correctAnswer: '2',
        explanation: '2^3 = 8 ≡ 1 (mod 7). So 2^10 = 2^9 × 2 = (2^3)^3 × 2 ≡ 1 × 2 = 2 (mod 7).'
      },
      {
        id: 'math102-q5b-4',
        type: 'multiple_choice',
        prompt: 'By Fermat\'s Little Theorem, if p is prime and p does not divide a, then:',
        options: ['a^p ≡ 1 (mod p)', 'a^(p-1) ≡ 1 (mod p)', 'a^p ≡ a (mod p)', 'Both B and C'],
        correctAnswer: 3,
        explanation: 'a^(p-1) ≡ 1 (mod p) and equivalently a^p ≡ a (mod p).'
      },
      {
        id: 'math102-q5b-5',
        type: 'fill_blank',
        prompt: 'Euler\'s totient φ(10) = ____ (count of integers 1-10 coprime to 10).',
        correctAnswer: '4',
        explanation: 'Numbers coprime to 10: 1, 3, 7, 9. So φ(10) = 4.'
      }
    ]
  },
  {
    id: 'math102-q5c',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Number Theory - Advanced',
    questions: [
      {
        id: 'math102-q5c-1',
        type: 'multiple_choice',
        prompt: 'The Chinese Remainder Theorem applies when moduli are:',
        options: ['All equal', 'All prime', 'Pairwise coprime', 'In ascending order'],
        correctAnswer: 2,
        explanation: 'CRT requires pairwise coprime moduli for a unique solution mod their product.'
      },
      {
        id: 'math102-q5c-2',
        type: 'code_output',
        prompt: 'What is φ(p) for a prime p?',
        correctAnswer: 'p-1',
        explanation: 'For prime p, all integers 1 to p-1 are coprime to p, so φ(p) = p-1.'
      },
      {
        id: 'math102-q5c-3',
        type: 'true_false',
        prompt: 'The Extended Euclidean Algorithm finds x, y such that ax + by = gcd(a, b).',
        correctAnswer: true,
        explanation: 'Extended GCD computes Bézout coefficients x and y.'
      },
      {
        id: 'math102-q5c-4',
        type: 'multiple_choice',
        prompt: 'In RSA, the public key exponent e must be coprime to:',
        options: ['n', 'p', 'q', 'φ(n)'],
        correctAnswer: 3,
        explanation: 'e must be coprime to φ(n) = (p-1)(q-1) so that d = e⁻¹ mod φ(n) exists.'
      },
      {
        id: 'math102-q5c-5',
        type: 'fill_blank',
        prompt: 'The prime factorization of 360 is 2^3 × 3^2 × ____.',
        correctAnswer: '5',
        explanation: '360 = 8 × 45 = 8 × 9 × 5 = 2³ × 3² × 5.'
      }
    ]
  },

  // ========== TOPIC 6: ADVANCED COUNTING ==========
  {
    id: 'math102-q6',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Advanced Counting - Fundamentals',
    questions: [
      {
        id: 'math102-q6-1',
        type: 'multiple_choice',
        prompt: 'The generating function for the sequence 1, 1, 1, 1, ... is:',
        options: ['1/(1+x)', '1/(1-x)', 'x/(1-x)', '1/(1-x)²'],
        correctAnswer: 1,
        explanation: '1 + x + x² + x³ + ... = 1/(1-x) for |x| < 1.'
      },
      {
        id: 'math102-q6-2',
        type: 'code_output',
        prompt: 'What is the 5th Bell number B(5)?',
        correctAnswer: '52',
        explanation: 'B(5) = S(5,1) + S(5,2) + S(5,3) + S(5,4) + S(5,5) = 1 + 15 + 25 + 10 + 1 = 52.'
      },
      {
        id: 'math102-q6-3',
        type: 'true_false',
        prompt: 'Stirling numbers of the second kind S(n,k) count partitions of n elements into k non-empty subsets.',
        correctAnswer: true,
        explanation: 'S(n,k) = number of ways to partition n elements into exactly k non-empty subsets.'
      },
      {
        id: 'math102-q6-4',
        type: 'fill_blank',
        prompt: 'The number of integer partitions of 5 is ____.',
        correctAnswer: '7',
        explanation: 'Partitions: 5, 4+1, 3+2, 3+1+1, 2+2+1, 2+1+1+1, 1+1+1+1+1 = 7 total.'
      },
      {
        id: 'math102-q6-5',
        type: 'multiple_choice',
        prompt: 'S(4, 2), the Stirling number of the second kind, equals:',
        options: ['3', '6', '7', '11'],
        correctAnswer: 2,
        explanation: 'S(4,2) = 7. Partitions of {1,2,3,4} into 2 non-empty subsets.'
      }
    ]
  },
  {
    id: 'math102-q6b',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Advanced Counting - Application',
    questions: [
      {
        id: 'math102-q6b-1',
        type: 'multiple_choice',
        prompt: 'The recurrence for Stirling numbers S(n,k) is:',
        options: ['S(n,k) = S(n-1,k-1) + S(n-1,k)', 'S(n,k) = k·S(n-1,k) + S(n-1,k-1)', 'S(n,k) = S(n-1,k-1) + k·S(n-1,k)', 'S(n,k) = n·S(n-1,k-1)'],
        correctAnswer: 1,
        explanation: 'S(n,k) = k·S(n-1,k) + S(n-1,k-1). New element joins existing subset or forms new one.'
      },
      {
        id: 'math102-q6b-2',
        type: 'true_false',
        prompt: 'The number of partitions of n into distinct parts equals partitions into odd parts.',
        correctAnswer: true,
        explanation: 'This is a classic partition identity proved using generating functions.'
      },
      {
        id: 'math102-q6b-3',
        type: 'code_output',
        prompt: 'If G(x) generates {1, 2, 3, 4, ...}, what generates {2, 4, 6, 8, ...}?',
        correctAnswer: '2G(x)',
        explanation: 'Multiplying G(x) by 2 doubles each coefficient: {2, 4, 6, ...}.'
      },
      {
        id: 'math102-q6b-4',
        type: 'multiple_choice',
        prompt: 'The number of surjections from a 4-set to a 3-set is:',
        options: ['18', '24', '36', '81'],
        correctAnswer: 2,
        explanation: '3! × S(4,3) = 6 × 6 = 36. Or use inclusion-exclusion directly.'
      },
      {
        id: 'math102-q6b-5',
        type: 'fill_blank',
        prompt: 'The generating function for Fibonacci is x/(1 - x - ____).',
        correctAnswer: 'x^2',
        explanation: 'F(n) = F(n-1) + F(n-2) gives GF: x/(1 - x - x²).'
      }
    ]
  },
  {
    id: 'math102-q6c',
    subjectId: 'math102',
    topicId: 'math102-6',
    title: 'Advanced Counting - Advanced',
    questions: [
      {
        id: 'math102-q6c-1',
        type: 'multiple_choice',
        prompt: 'The unsigned Stirling number |s(4, 2)| counts:',
        options: ['Partitions into 2 subsets', 'Permutations with 2 cycles', 'Rising factorials', 'Derangements'],
        correctAnswer: 1,
        explanation: 'First kind Stirling numbers count permutations by number of cycles.'
      },
      {
        id: 'math102-q6c-2',
        type: 'code_output',
        prompt: 'What is S(5, 5)?',
        correctAnswer: '1',
        explanation: 'S(n,n) = 1 always. Only one way to put each element in its own subset.'
      },
      {
        id: 'math102-q6c-3',
        type: 'true_false',
        prompt: 'Exponential generating functions are used for labeled structures (permutations).',
        correctAnswer: true,
        explanation: 'EGFs use x^n/n! coefficients, suitable for ordered/labeled counting.'
      },
      {
        id: 'math102-q6c-4',
        type: 'multiple_choice',
        prompt: 'The Bell number B(n) satisfies:',
        options: ['B(n) = Σ S(n,k)', 'B(n) = n!', 'B(n) = 2^n', 'B(n) = C(2n,n)'],
        correctAnswer: 0,
        explanation: 'B(n) = Σ(k=0 to n) S(n,k), the total number of partitions.'
      },
      {
        id: 'math102-q6c-5',
        type: 'fill_blank',
        prompt: 'The partition function p(4) = ____.',
        correctAnswer: '5',
        explanation: 'p(4): 4, 3+1, 2+2, 2+1+1, 1+1+1+1 = 5 partitions.'
      }
    ]
  },

  // ========== TOPIC 7: PROBABILITY ==========
  {
    id: 'math102-q7',
    subjectId: 'math102',
    topicId: 'math102-7',
    title: 'Probability - Fundamentals',
    questions: [
      {
        id: 'math102-q7-1',
        type: 'multiple_choice',
        prompt: 'A fair die is rolled. What is P(even number)?',
        options: ['1/6', '1/3', '1/2', '2/3'],
        correctAnswer: 2,
        explanation: 'Even numbers: 2, 4, 6. P(even) = 3/6 = 1/2.'
      },
      {
        id: 'math102-q7-2',
        type: 'code_output',
        prompt: 'What is P(A ∪ B) if P(A) = 0.3, P(B) = 0.4, P(A ∩ B) = 0.1?',
        correctAnswer: '0.6',
        explanation: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0.3 + 0.4 - 0.1 = 0.6.'
      },
      {
        id: 'math102-q7-3',
        type: 'true_false',
        prompt: 'If A and B are independent, then P(A ∩ B) = P(A) × P(B).',
        correctAnswer: true,
        explanation: 'Independence means P(A ∩ B) = P(A) × P(B) by definition.'
      },
      {
        id: 'math102-q7-4',
        type: 'fill_blank',
        prompt: 'The expected value of a fair die roll is ____.',
        correctAnswer: '3.5',
        explanation: 'E[X] = (1+2+3+4+5+6)/6 = 21/6 = 3.5.'
      },
      {
        id: 'math102-q7-5',
        type: 'multiple_choice',
        prompt: 'P(A|B) is defined as:',
        options: ['P(A) / P(B)', 'P(A ∩ B) / P(B)', 'P(A ∩ B) / P(A)', 'P(A) × P(B)'],
        correctAnswer: 1,
        explanation: 'Conditional probability: P(A|B) = P(A ∩ B) / P(B).'
      }
    ]
  },
  {
    id: 'math102-q7b',
    subjectId: 'math102',
    topicId: 'math102-7',
    title: 'Probability - Application',
    questions: [
      {
        id: 'math102-q7b-1',
        type: 'multiple_choice',
        prompt: 'In the birthday problem with 23 people, P(at least 2 share birthday) is approximately:',
        options: ['23/365', '0.25', '0.50', '0.75'],
        correctAnswer: 2,
        explanation: 'The birthday paradox: with 23 people, P ≈ 50.7%.'
      },
      {
        id: 'math102-q7b-2',
        type: 'true_false',
        prompt: 'E[X + Y] = E[X] + E[Y] even if X and Y are not independent.',
        correctAnswer: true,
        explanation: 'Linearity of expectation holds regardless of dependence.'
      },
      {
        id: 'math102-q7b-3',
        type: 'code_output',
        prompt: 'For Binomial(10, 0.5), what is E[X]?',
        correctAnswer: '5',
        explanation: 'E[X] = np = 10 × 0.5 = 5 for binomial distribution.'
      },
      {
        id: 'math102-q7b-4',
        type: 'multiple_choice',
        prompt: 'The variance of a Bernoulli(p) random variable is:',
        options: ['p', 'p²', 'p(1-p)', '1-p'],
        correctAnswer: 2,
        explanation: 'Var(X) = E[X²] - E[X]² = p - p² = p(1-p).'
      },
      {
        id: 'math102-q7b-5',
        type: 'fill_blank',
        prompt: 'The expected number of coin flips until first heads (Geometric dist.) is ____.',
        correctAnswer: '2',
        explanation: 'For Geometric(p) with p=0.5, E[X] = 1/p = 2.'
      }
    ]
  },
  {
    id: 'math102-q7c',
    subjectId: 'math102',
    topicId: 'math102-7',
    title: 'Probability - Advanced',
    questions: [
      {
        id: 'math102-q7c-1',
        type: 'multiple_choice',
        prompt: 'Bayes\' Theorem states P(A|B) equals:',
        options: ['P(B|A) × P(A) / P(B)', 'P(A) × P(B)', 'P(B|A) / P(A)', 'P(A|B) × P(B)'],
        correctAnswer: 0,
        explanation: 'Bayes: P(A|B) = P(B|A) × P(A) / P(B).'
      },
      {
        id: 'math102-q7c-2',
        type: 'code_output',
        prompt: 'Expected fixed points in a random permutation of n elements is always:',
        correctAnswer: '1',
        explanation: 'By linearity: E[Σ Xᵢ] = Σ E[Xᵢ] = n × (1/n) = 1.'
      },
      {
        id: 'math102-q7c-3',
        type: 'true_false',
        prompt: 'For independent X and Y, Var(X + Y) = Var(X) + Var(Y).',
        correctAnswer: true,
        explanation: 'Variance is additive for independent random variables.'
      },
      {
        id: 'math102-q7c-4',
        type: 'multiple_choice',
        prompt: 'The coupon collector problem: expected draws to collect all n coupons is approximately:',
        options: ['n', 'n²', 'n ln n', '2^n'],
        correctAnswer: 2,
        explanation: 'E[X] = n × H(n) ≈ n ln n + γn where H(n) is the harmonic number.'
      },
      {
        id: 'math102-q7c-5',
        type: 'fill_blank',
        prompt: 'Binomial(n, p) has variance np(____), where the blank is a function of p.',
        correctAnswer: '1-p',
        explanation: 'Var(Binomial) = np(1-p).'
      }
    ]
  }
];
