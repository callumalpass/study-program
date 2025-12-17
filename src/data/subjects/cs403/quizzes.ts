import type { Quiz, QuizQuestion } from '../../../core/types';

const questions: QuizQuestion[] = [
  // Topic 1: NP-Completeness
  {
    id: 'cs403-q1',
    type: 'multiple_choice',
    prompt: 'Which complexity class contains all decision problems solvable in polynomial time?',
    options: ['P', 'NP', 'NP-Complete', 'NP-Hard'],
    correctAnswer: 'P',
    explanation: 'P (Polynomial time) is the class of decision problems solvable by a deterministic Turing machine in polynomial time.'
  },
  {
    id: 'cs403-q2',
    type: 'multiple_choice',
    prompt: 'What does it mean for a problem to be NP-complete?',
    options: [
      'It is in NP and every problem in NP reduces to it in polynomial time',
      'It cannot be solved in polynomial time',
      'It is the hardest problem in P',
      'It requires exponential space'
    ],
    correctAnswer: 'It is in NP and every problem in NP reduces to it in polynomial time',
    explanation: 'NP-complete problems are in NP and are NP-hard (every NP problem reduces to them in polynomial time).'
  },
  {
    id: 'cs403-q3',
    type: 'multiple_choice',
    prompt: 'Which was the first problem proven to be NP-complete?',
    options: ['SAT', '3-SAT', 'Clique', 'Vertex Cover'],
    correctAnswer: 'SAT',
    explanation: 'SAT (Boolean Satisfiability) was proven NP-complete by the Cook-Levin theorem in 1971.'
  },

  // Topic 2: Approximation Algorithms
  {
    id: 'cs403-q4',
    type: 'multiple_choice',
    prompt: 'What is the approximation ratio of the vertex cover algorithm that picks both endpoints of each edge?',
    options: ['2', '1.5', 'O(log n)', 'O(n)'],
    correctAnswer: '2',
    explanation: 'The matching-based vertex cover algorithm achieves a 2-approximation, which is optimal unless P=NP.'
  },
  {
    id: 'cs403-q5',
    type: 'multiple_choice',
    prompt: 'What is an FPTAS?',
    options: [
      'Fully Polynomial-Time Approximation Scheme with time polynomial in n and 1/ε',
      'Fast Polynomial-Time Algorithm Set',
      'Fixed-Parameter Tractable Algorithm Scheme',
      'Fractional Polynomial-Time Approximation Strategy'
    ],
    correctAnswer: 'Fully Polynomial-Time Approximation Scheme with time polynomial in n and 1/ε',
    explanation: 'FPTAS has running time polynomial in both input size n and 1/ε, where ε is the approximation error.'
  },

  // Topic 3: Randomized Algorithms
  {
    id: 'cs403-q6',
    type: 'multiple_choice',
    prompt: 'What is the key difference between Monte Carlo and Las Vegas algorithms?',
    options: [
      'Monte Carlo has bounded time but probabilistic correctness; Las Vegas always correct but random time',
      'Monte Carlo is faster than Las Vegas',
      'Las Vegas uses more randomness',
      'Monte Carlo cannot be amplified'
    ],
    correctAnswer: 'Monte Carlo has bounded time but probabilistic correctness; Las Vegas always correct but random time',
    explanation: 'Monte Carlo algorithms may produce incorrect answers but run in bounded time. Las Vegas algorithms always produce correct answers but have random running time.'
  },
  {
    id: 'cs403-q7',
    type: 'multiple_choice',
    prompt: 'What is the expected time complexity of randomized quicksort?',
    options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
    correctAnswer: 'O(n log n)',
    explanation: 'Randomized quicksort achieves O(n log n) expected time regardless of input, unlike deterministic quicksort which can be O(n²) on sorted input.'
  },

  // Topic 4: Online Algorithms
  {
    id: 'cs403-q8',
    type: 'multiple_choice',
    prompt: 'What is the competitive ratio of LRU for paging with cache size k?',
    options: ['k', '2k', 'O(log k)', 'O(k²)'],
    correctAnswer: 'k',
    explanation: 'LRU achieves k-competitive ratio for paging, which is optimal for deterministic online paging algorithms.'
  },
  {
    id: 'cs403-q9',
    type: 'multiple_choice',
    prompt: 'In the secretary problem, what fraction of candidates should you skip before starting to hire?',
    options: ['1/e ≈ 0.368', '1/2', '1/3', '1/4'],
    correctAnswer: '1/e ≈ 0.368',
    explanation: 'The optimal strategy rejects the first n/e candidates, then hires the first one better than all previous, achieving success probability 1/e.'
  },

  // Topic 5: Network Flow
  {
    id: 'cs403-q10',
    type: 'multiple_choice',
    prompt: 'What does the max-flow min-cut theorem state?',
    options: [
      'Maximum flow value equals minimum cut capacity',
      'Maximum flow is always equal to number of edges',
      'Minimum cut is always unique',
      'Flow networks must be bipartite'
    ],
    correctAnswer: 'Maximum flow value equals minimum cut capacity',
    explanation: 'The max-flow min-cut theorem states that the maximum amount of flow from source to sink equals the capacity of the minimum cut separating them.'
  },

  // Topic 6: Advanced DP
  {
    id: 'cs403-q11',
    type: 'multiple_choice',
    prompt: 'What is the time complexity of the standard matrix chain multiplication DP algorithm?',
    options: ['O(n³)', 'O(n²)', 'O(n² log n)', 'O(n⁴)'],
    correctAnswer: 'O(n³)',
    explanation: 'The standard dynamic programming solution for matrix chain multiplication runs in O(n³) time with O(n²) space.'
  },

  // Topic 7: Computational Geometry
  {
    id: 'cs403-q12',
    type: 'multiple_choice',
    prompt: 'What is the time complexity of Graham scan for convex hull?',
    options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(n log² n)'],
    correctAnswer: 'O(n log n)',
    explanation: 'Graham scan sorts points by polar angle (O(n log n)) then scans them once (O(n)), giving total O(n log n) time.'
  },

  // Add more questions for comprehensive coverage
  {
    id: 'cs403-q13',
    type: 'multiple_choice',
    prompt: 'Christofides algorithm for metric TSP achieves what approximation ratio?',
    options: ['1.5', '2', 'O(log n)', '3'],
    correctAnswer: '1.5',
    explanation: 'Christofides algorithm combines MST with minimum-weight perfect matching to achieve 1.5-approximation for metric TSP.'
  },
  {
    id: 'cs403-q14',
    type: 'multiple_choice',
    prompt: 'What is the success probability of Karger\'s min-cut algorithm in a single run?',
    options: ['≥ 2/(n(n-1))', '1/2', '1/n', '1/e'],
    correctAnswer: '≥ 2/(n(n-1))',
    explanation: 'Karger\'s randomized contraction algorithm finds min-cut with probability at least 2/(n(n-1)) per run, so repeating O(n² log n) times gives high probability.'
  },
  {
    id: 'cs403-q15',
    type: 'multiple_choice',
    prompt: 'The Held-Karp algorithm for TSP has what time complexity?',
    options: ['O(n² 2ⁿ)', 'O(n!)', 'O(2ⁿ)', 'O(n³)'],
    correctAnswer: 'O(n² 2ⁿ)',
    explanation: 'Held-Karp uses dynamic programming on subsets, achieving O(n² 2ⁿ) time and O(n 2ⁿ) space - much better than O(n!) brute force.'
  }
];

export const cs403Quizzes: Quiz[] = [
  {
    id: 'cs403-quiz-1',
    subjectId: 'cs403',
    topicId: 'cs403-topic-1',
    title: 'NP-Completeness Fundamentals',
    questions: questions.slice(0, 3)
  },
  {
    id: 'cs403-quiz-2',
    subjectId: 'cs403',
    topicId: 'cs403-topic-2',
    title: 'Approximation Algorithms',
    questions: questions.slice(3, 5)
  },
  {
    id: 'cs403-quiz-3',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Randomized Algorithms',
    questions: questions.slice(5, 7)
  },
  {
    id: 'cs403-quiz-4',
    subjectId: 'cs403',
    topicId: 'cs403-topic-4',
    title: 'Online Algorithms',
    questions: questions.slice(7, 9)
  },
  {
    id: 'cs403-quiz-5',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Network Flow',
    questions: questions.slice(9, 10)
  },
  {
    id: 'cs403-quiz-6',
    subjectId: 'cs403',
    topicId: 'cs403-topic-6',
    title: 'Advanced Dynamic Programming',
    questions: questions.slice(10, 11)
  },
  {
    id: 'cs403-quiz-7',
    subjectId: 'cs403',
    topicId: 'cs403-topic-7',
    title: 'Computational Geometry',
    questions: questions.slice(11, 12)
  }
];
