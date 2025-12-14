import { Quiz } from '../../../core/types';

export const math102Quizzes: Quiz[] = [
  {
    id: 'math102-q1',
    subjectId: 'math102',
    topicId: 'math102-1',
    title: 'Combinatorics Quiz',
    questions: [
      {
        id: 'math102-q1-1',
        type: 'multiple_choice',
        prompt: 'How many different ways can you arrange 5 distinct books on a shelf?',
        options: ['25', '60', '120', '720'],
        correctAnswer: 2,
        explanation: 'The number of permutations of 5 distinct objects is 5! = 5 × 4 × 3 × 2 × 1 = 120. Each position has one fewer choice than the previous position.'
      },
      {
        id: 'math102-q1-2',
        type: 'multiple_choice',
        prompt: 'How many ways can you choose 3 students from a class of 10 to form a committee (where order does not matter)?',
        options: ['30', '120', '720', '1000'],
        correctAnswer: 1,
        explanation: 'This is a combination problem: C(10,3) = 10!/(3! × 7!) = (10 × 9 × 8)/(3 × 2 × 1) = 720/6 = 120. We use combinations because the order of selection does not matter.'
      },
      {
        id: 'math102-q1-3',
        type: 'true_false',
        prompt: 'The pigeonhole principle states that if n items are placed into m containers where n > m, at least one container must contain more than one item.',
        correctAnswer: true,
        explanation: 'This is the correct statement of the pigeonhole principle. It is a fundamental counting principle used in many proofs. For example, in any group of 13 people, at least two must share a birth month.'
      }
    ]
  },
  {
    id: 'math102-q2',
    subjectId: 'math102',
    topicId: 'math102-2',
    title: 'Recurrence Relations Quiz',
    questions: [
      {
        id: 'math102-q2-1',
        type: 'multiple_choice',
        prompt: 'What is the time complexity solution to the recurrence T(n) = 2T(n/2) + n using the Master Theorem?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 1,
        explanation: 'Using the Master Theorem with a=2, b=2, and f(n)=n, we have f(n) = Θ(n^log₂2) = Θ(n). This is Case 2, giving T(n) = Θ(n log n). This recurrence describes merge sort.'
      },
      {
        id: 'math102-q2-2',
        type: 'multiple_choice',
        prompt: 'If F(n) = F(n-1) + F(n-2) with F(0)=0 and F(1)=1, what is F(5)?',
        options: ['3', '5', '8', '13'],
        correctAnswer: 1,
        explanation: 'Computing step by step: F(2)=1, F(3)=2, F(4)=3, F(5)=5. This is the Fibonacci sequence, which appears frequently in algorithm analysis and nature.'
      },
      {
        id: 'math102-q2-3',
        type: 'true_false',
        prompt: 'The recurrence relation T(n) = T(n-1) + 1 with T(1) = 1 has solution T(n) = n.',
        correctAnswer: true,
        explanation: 'By iteration: T(n) = T(n-1) + 1 = T(n-2) + 2 = ... = T(1) + (n-1) = 1 + (n-1) = n. This recurrence describes a simple linear algorithm.'
      }
    ]
  },
  {
    id: 'math102-q3',
    subjectId: 'math102',
    topicId: 'math102-3',
    title: 'Graph Theory Basics Quiz',
    questions: [
      {
        id: 'math102-q3-1',
        type: 'multiple_choice',
        prompt: 'In a complete graph with 6 vertices (K₆), how many edges are there?',
        options: ['6', '12', '15', '30'],
        correctAnswer: 2,
        explanation: 'A complete graph connects every pair of vertices. The number of edges is C(6,2) = 6!/(2! × 4!) = 15. Alternatively, use the formula n(n-1)/2 = 6(5)/2 = 15.'
      },
      {
        id: 'math102-q3-2',
        type: 'multiple_choice',
        prompt: 'What is the minimum number of edges in a connected graph with 10 vertices?',
        options: ['9', '10', '45', '90'],
        correctAnswer: 0,
        explanation: 'A tree is a minimally connected graph. A tree with n vertices has exactly n-1 edges. Therefore, a connected graph with 10 vertices must have at least 9 edges.'
      },
      {
        id: 'math102-q3-3',
        type: 'true_false',
        prompt: 'The handshaking lemma states that the sum of all vertex degrees in a graph equals twice the number of edges.',
        correctAnswer: true,
        explanation: 'This is correct. Each edge contributes 2 to the total degree count (one for each endpoint). Therefore, Σ deg(v) = 2|E|. This implies that the number of vertices with odd degree must be even.'
      }
    ]
  },
  {
    id: 'math102-q4',
    subjectId: 'math102',
    topicId: 'math102-4',
    title: 'Graph Algorithms Quiz',
    questions: [
      {
        id: 'math102-q4-1',
        type: 'multiple_choice',
        prompt: 'Which traversal algorithm uses a queue data structure?',
        options: ['Depth-First Search', 'Breadth-First Search', 'Dijkstra\'s Algorithm', 'Topological Sort'],
        correctAnswer: 1,
        explanation: 'Breadth-First Search (BFS) uses a queue to explore vertices level by level. It adds neighbors to the back of the queue and processes from the front, ensuring vertices are visited in order of increasing distance.'
      },
      {
        id: 'math102-q4-2',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of Dijkstra\'s algorithm using a binary heap?',
        options: ['O(V)', 'O(E)', 'O(V log V)', 'O((V + E) log V)'],
        correctAnswer: 3,
        explanation: 'Dijkstra\'s algorithm processes each vertex once and may update edges, requiring priority queue operations. With a binary heap, the complexity is O((V + E) log V), where V is vertices and E is edges.'
      },
      {
        id: 'math102-q4-3',
        type: 'true_false',
        prompt: 'Depth-First Search can be used to detect cycles in a directed graph.',
        correctAnswer: true,
        explanation: 'DFS can detect cycles by tracking vertices in the current recursion stack. If we encounter a vertex already in the stack during traversal, we have found a back edge indicating a cycle.'
      }
    ]
  },
  {
    id: 'math102-q5',
    subjectId: 'math102',
    topicId: 'math102-5',
    title: 'Number Theory Quiz',
    questions: [
      {
        id: 'math102-q5-1',
        type: 'multiple_choice',
        prompt: 'What is gcd(48, 18) using Euclid\'s algorithm?',
        options: ['3', '6', '9', '12'],
        correctAnswer: 1,
        explanation: 'Euclid\'s algorithm: gcd(48,18) = gcd(18,12) = gcd(12,6) = gcd(6,0) = 6. We repeatedly replace the larger number with the remainder of division until reaching 0.'
      },
      {
        id: 'math102-q5-2',
        type: 'multiple_choice',
        prompt: 'What is 7 × 8 (mod 5)?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 0,
        explanation: '7 × 8 = 56. To find 56 mod 5, we divide: 56 = 11 × 5 + 1, so the remainder is 1. Alternatively, (7 mod 5) × (8 mod 5) = 2 × 3 = 6 ≡ 1 (mod 5).'
      },
      {
        id: 'math102-q5-3',
        type: 'true_false',
        prompt: 'Two integers are relatively prime if their greatest common divisor is 1.',
        correctAnswer: true,
        explanation: 'This is the definition of relatively prime (or coprime) integers. For example, 8 and 15 are relatively prime because gcd(8,15) = 1, even though neither is a prime number.'
      }
    ]
  }
];
