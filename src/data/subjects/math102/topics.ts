import { Topic } from '../../../core/types';

export const math102Topics: Topic[] = [
  {
    id: 'math102-1',
    title: 'Combinatorics',
    content: 'Combinatorics is the study of counting, arrangement, and selection of objects. It provides essential techniques for analyzing discrete structures and solving counting problems in computer science. The fundamental counting principle states that if one event can occur in m ways and another in n ways, then both can occur in m × n ways. We explore permutations (ordered arrangements) and combinations (unordered selections), learning when to apply each. The binomial coefficient C(n,k) counts ways to choose k items from n items. We study counting with and without repetition, as well as the inclusion-exclusion principle for counting elements in overlapping sets. The pigeonhole principle, which states that if n items are placed in m containers with n > m, then at least one container must hold more than one item, provides powerful proof techniques. These combinatorial methods are fundamental for algorithm analysis, probability calculations, and analyzing the complexity of computational problems. Understanding combinatorics enables us to quantify possibilities in discrete systems and design efficient algorithms.',
    quizIds: ['math102-q1'],
    exerciseIds: ['math102-e1', 'math102-t1-ex02', 'math102-t1-ex03', 'math102-t1-ex04', 'math102-t1-ex05', 'math102-t1-ex06', 'math102-t1-ex07', 'math102-t1-ex08']
  },
  {
    id: 'math102-2',
    title: 'Recurrence Relations',
    content: 'Recurrence relations define sequences where each term is expressed in terms of previous terms. They are fundamental for analyzing recursive algorithms and data structures in computer science. The Fibonacci sequence F(n) = F(n-1) + F(n-2) exemplifies a linear recurrence relation with constant coefficients. We learn to solve recurrence relations using various techniques including iteration, substitution, and the characteristic equation method. The Master Theorem provides a powerful tool for solving divide-and-conquer recurrences of the form T(n) = aT(n/b) + f(n), which commonly arise in algorithm analysis. We also explore generating functions as a method for solving recurrences by encoding sequences as formal power series. Understanding the solution techniques helps us analyze the time complexity of recursive algorithms like merge sort, quicksort, and binary search. Non-homogeneous recurrences, where there is an additional function term, require finding both the homogeneous solution and a particular solution. These mathematical tools allow us to precisely characterize the growth rates of algorithms and make informed decisions about algorithm design and optimization.',
    quizIds: ['math102-q2'],
    exerciseIds: ['math102-e2', 'math102-t2-ex02', 'math102-t2-ex03', 'math102-t2-ex04', 'math102-t2-ex05', 'math102-t2-ex06', 'math102-t2-ex07', 'math102-t2-ex08']
  },
  {
    id: 'math102-3',
    title: 'Graph Theory Basics',
    content: 'Graph theory provides a mathematical framework for modeling relationships and connections between objects. A graph G = (V, E) consists of vertices (nodes) V and edges E connecting pairs of vertices. Graphs can be directed or undirected, weighted or unweighted, and may contain cycles or be acyclic. We study important graph properties including degree (the number of edges incident to a vertex), paths, cycles, and connectivity. Special graph types include trees (connected acyclic graphs), complete graphs (where every pair of vertices is connected), and bipartite graphs (vertices can be partitioned into two sets with edges only between sets). The handshaking lemma states that the sum of all vertex degrees equals twice the number of edges, a fundamental counting principle in graphs. Eulerian paths visit every edge exactly once, while Hamiltonian paths visit every vertex exactly once. Graph isomorphism examines when two graphs have the same structure despite different representations. Graph theory models networks, social connections, dependencies, state spaces, and countless other discrete structures central to computer science applications.',
    quizIds: ['math102-q3'],
    exerciseIds: ['math102-e3', 'math102-t3-ex02', 'math102-t3-ex03', 'math102-t3-ex04', 'math102-t3-ex05', 'math102-t3-ex06', 'math102-t3-ex07', 'math102-t3-ex08']
  },
  {
    id: 'math102-4',
    title: 'Graph Algorithms',
    content: 'Graph algorithms provide systematic methods for traversing, searching, and analyzing graph structures efficiently. Breadth-First Search (BFS) explores vertices level by level using a queue, finding shortest paths in unweighted graphs with O(V + E) time complexity. Depth-First Search (DFS) explores as far as possible along each branch using a stack or recursion, useful for cycle detection and topological sorting. Dijkstra\'s algorithm finds shortest paths in weighted graphs with non-negative edge weights using a priority queue, with time complexity O((V + E) log V). The Bellman-Ford algorithm handles negative edge weights and detects negative cycles. Minimum spanning trees connect all vertices with minimum total edge weight; Kruskal\'s algorithm uses a disjoint-set data structure while Prim\'s algorithm grows the tree from a starting vertex. Topological sorting orders vertices in a directed acyclic graph such that for every edge (u,v), u comes before v in the ordering. Floyd-Warshall computes all-pairs shortest paths with O(V³) complexity. These algorithms form the foundation for solving routing, scheduling, network flow, and optimization problems that appear throughout computer science.',
    quizIds: ['math102-q4'],
    exerciseIds: ['math102-e4', 'math102-t4-ex02', 'math102-t4-ex03', 'math102-t4-ex04', 'math102-t4-ex05', 'math102-t4-ex06', 'math102-t4-ex07', 'math102-t4-ex08']
  },
  {
    id: 'math102-5',
    title: 'Number Theory',
    content: 'Number theory studies properties of integers and forms the mathematical foundation for cryptography and computer security. Divisibility is fundamental: a divides b (written a|b) if there exists an integer k such that b = ak. The Division Algorithm states that for any integers a and b > 0, there exist unique integers q and r such that a = bq + r with 0 ≤ r < b. The Greatest Common Divisor (GCD) is the largest integer dividing both numbers, computed efficiently using Euclid\'s algorithm with O(log n) time complexity. The Extended Euclidean Algorithm finds integers x and y satisfying ax + by = gcd(a,b), essential for computing modular inverses. Modular arithmetic provides a system where numbers wrap around after reaching a modulus n, crucial for hash functions and cryptographic protocols. Fermat\'s Little Theorem and Euler\'s Theorem describe properties of exponentiation modulo primes. Prime numbers, divisible only by 1 and themselves, are fundamental to RSA encryption. The Chinese Remainder Theorem solves systems of modular equations. These number-theoretic concepts enable secure communication, efficient computation, and error detection in modern computing systems.',
    quizIds: ['math102-q5'],
    exerciseIds: ['math102-e5', 'math102-t5-ex02', 'math102-t5-ex03', 'math102-t5-ex04', 'math102-t5-ex05', 'math102-t5-ex06', 'math102-t5-ex07', 'math102-t5-ex08']
  }
];
