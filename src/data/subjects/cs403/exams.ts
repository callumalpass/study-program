import type { Exam, QuizQuestion } from '../../../core/types';

const midtermQuestions: QuizQuestion[] = [
  // Topic 1: NP-Completeness Review (7)
  {
    id: 'cs403-midterm-q1',
    type: 'multiple_choice',
    prompt: 'Which implication is known to be true?',
    options: ['P ⊆ NP', 'NP ⊆ P', 'P = NP', 'P ∩ NP = ∅'],
    correctAnswer: 'P ⊆ NP',
    explanation: 'Any polynomial-time solvable problem can be verified in polynomial time (with a trivial certificate), so P is contained in NP.'
  },
  {
    id: 'cs403-midterm-q2',
    type: 'multiple_choice',
    prompt: 'A standard way to prove a decision problem X is NP-complete is to show:',
    options: [
      'X ∈ NP and A ≤p X for some known NP-complete A',
      'X ∈ P and X ≤p A for some known NP-complete A',
      'X ∉ NP and A ≤p X',
      'X has an exponential-time algorithm'
    ],
    correctAnswer: 'X ∈ NP and A ≤p X for some known NP-complete A',
    explanation: 'NP-completeness requires membership in NP plus NP-hardness. NP-hardness is typically shown by reducing a known NP-complete problem A to X.'
  },
  {
    id: 'cs403-midterm-q3',
    type: 'true_false',
    prompt: 'If SAT is in P, then every problem in NP is also in P.',
    correctAnswer: true,
    explanation: 'SAT is NP-complete. If an NP-complete problem is in P, then all NP problems reduce to it and are therefore solvable in polynomial time.'
  },
  {
    id: 'cs403-midterm-q4',
    type: 'fill_blank',
    prompt: 'In a many-one reduction A ≤p B, you transform instances of A into instances of _____.',
    correctAnswer: 'B',
    explanation: 'A reduction A ≤p B maps A-instances to B-instances so that solving B lets you solve A.'
  },
  {
    id: 'cs403-midterm-q5',
    type: 'multiple_choice',
    prompt: 'Which of the following is NP-hard but not known to be in NP?',
    options: ['TSP optimization', '3-SAT', 'Hamiltonian Cycle (decision)', 'Vertex Cover (decision)'],
    correctAnswer: 'TSP optimization',
    explanation: 'Optimization versions of NP-complete decision problems are typically NP-hard, but the “in NP” notion applies to decision languages.'
  },
  {
    id: 'cs403-midterm-q6',
    type: 'code_output',
    prompt: 'What is printed?',
    codeSnippet: `const n = 6;\nlet c = 0;\nfor (let i = 1; i <= n; i++) {\n  for (let j = 1; j <= n; j++) {\n    if (i * j <= n) c++;\n  }\n}\nconsole.log(c);`,
    correctAnswer: '14',
    explanation: 'This counts integer pairs (i, j) with 1≤i,j≤6 and i·j≤6. There are 6+3+2+1+1+1=14 such pairs.'
  },
  {
    id: 'cs403-midterm-q7',
    type: 'written',
    prompt: 'In 2–4 sentences, explain why “verification is polynomial” is the right lens for NP rather than “solving is polynomial”.',
    correctAnswer: '',
    explanation: 'NP is defined by polynomial-time verifiability of certificates for YES instances, separating “check a proposed solution” from “find a solution”.',
    modelAnswer: 'NP captures problems where, for YES instances, there exists a certificate (witness) that can be checked efficiently. Many hard problems have solutions that are easy to verify once given (e.g., a Hamiltonian cycle), even if finding them seems difficult. This definition is robust and aligns with reductions and completeness theory.'
  },

  // Topic 2: Approximation Algorithms (7)
  {
    id: 'cs403-midterm-q8',
    type: 'multiple_choice',
    prompt: 'For a minimization problem, a ρ-approximation guarantees:',
    options: ['ALG ≤ ρ·OPT', 'ALG ≥ ρ·OPT', 'ALG = OPT', 'OPT ≤ ρ·ALG'],
    correctAnswer: 'ALG ≤ ρ·OPT',
    explanation: 'For minimization, approximation factor ρ means the algorithm’s cost is at most ρ times optimal.'
  },
  {
    id: 'cs403-midterm-q9',
    type: 'multiple_choice',
    prompt: 'Which problem has a classic 2-approximation by taking both endpoints of each edge in a maximal matching?',
    options: ['Vertex Cover', 'Set Cover', 'Knapsack', 'Metric TSP'],
    correctAnswer: 'Vertex Cover',
    explanation: 'A maximal matching yields a set of disjoint edges. Any vertex cover must hit each edge, so taking both endpoints gives a 2-approximation.'
  },
  {
    id: 'cs403-midterm-q10',
    type: 'true_false',
    prompt: 'A PTAS runs in time polynomial in n for each fixed ε, but the exponent may depend on 1/ε.',
    correctAnswer: true,
    explanation: 'That dependence is what distinguishes PTAS from FPTAS, whose runtime is polynomial in both n and 1/ε.'
  },
  {
    id: 'cs403-midterm-q11',
    type: 'multiple_choice',
    prompt: 'Christofides’ algorithm applies to which TSP variant?',
    options: ['Metric TSP', 'Arbitrary directed TSP', 'Euclidean TSP in 1D only', 'TSP with negative edges'],
    correctAnswer: 'Metric TSP',
    explanation: 'Christofides requires the triangle inequality to relate MST + matching to an optimal tour.'
  },
  {
    id: 'cs403-midterm-q12',
    type: 'fill_blank',
    prompt: 'Greedy Set Cover achieves an approximation factor of O(_____) in the size of the universe.',
    correctAnswer: 'log n',
    explanation: 'Greedy set cover achieves O(log n) approximation and is essentially optimal under standard assumptions.'
  },
  {
    id: 'cs403-midterm-q13',
    type: 'multiple_choice',
    prompt: 'An FPTAS for 0/1 Knapsack is commonly built by:',
    options: [
      'Scaling item values and running a DP over total value',
      'Using Dijkstra’s algorithm',
      'Using max flow',
      'Enumerating all subsets'
    ],
    correctAnswer: 'Scaling item values and running a DP over total value',
    explanation: 'Value scaling reduces the DP state space to be polynomial in n and 1/ε, giving a fully polynomial approximation scheme.'
  },
  {
    id: 'cs403-midterm-q14',
    type: 'written',
    prompt: 'Explain the difference between a constant-factor approximation and a PTAS. Give one example of each (problem + algorithm name).',
    correctAnswer: '',
    explanation: 'Constant-factor gives a fixed ρ; PTAS gives (1+ε) for any ε>0 with polynomial runtime for fixed ε.',
    modelAnswer: 'A constant-factor approximation guarantees a fixed ratio ρ independent of ε, e.g., the 2-approximation for Vertex Cover via maximal matching. A PTAS provides a (1+ε)-approximation for any ε>0 with runtime polynomial in n for fixed ε, e.g., Arora’s PTAS for Euclidean TSP in fixed dimension.'
  },

  // Topic 3: Randomized Algorithms (7)
  {
    id: 'cs403-midterm-q15',
    type: 'multiple_choice',
    prompt: 'A Monte Carlo algorithm is characterized by:',
    options: [
      'Bounded runtime but probabilistic correctness',
      'Always correct output but random runtime',
      'Always correct and always polynomial time',
      'No randomness in execution'
    ],
    correctAnswer: 'Bounded runtime but probabilistic correctness',
    explanation: 'Monte Carlo algorithms may err with small probability but have guaranteed (usually polynomial) runtime.'
  },
  {
    id: 'cs403-midterm-q16',
    type: 'multiple_choice',
    prompt: 'Randomized quicksort has expected runtime:',
    options: ['O(n log n)', 'O(n^2)', 'O(log n)', 'O(n)'],
    correctAnswer: 'O(n log n)',
    explanation: 'The expected number of comparisons in randomized quicksort is O(n log n).'
  },
  {
    id: 'cs403-midterm-q17',
    type: 'true_false',
    prompt: 'Linearity of expectation requires independence between random variables.',
    correctAnswer: false,
    explanation: 'Linearity of expectation holds without independence, which is why it is widely used in randomized analysis.'
  },
  {
    id: 'cs403-midterm-q18',
    type: 'multiple_choice',
    prompt: 'Karger’s contraction algorithm succeeds with probability at least 2/(n(n−1)) in one run because:',
    options: [
      'It must avoid contracting any edge in a fixed min-cut throughout n−2 contractions',
      'It always contracts min-cut edges first',
      'It uses BFS to find cuts',
      'It enumerates all cuts'
    ],
    correctAnswer: 'It must avoid contracting any edge in a fixed min-cut throughout n−2 contractions',
    explanation: 'If you never contract an edge in a particular min-cut, that min-cut survives to the end; the probability of avoiding those edges yields the bound.'
  },
  {
    id: 'cs403-midterm-q19',
    type: 'fill_blank',
    prompt: 'Error probability in a Monte Carlo algorithm can often be reduced by _____ (running independent trials).',
    correctAnswer: 'amplification',
    explanation: 'Independent repetition and an aggregation rule (e.g., majority vote) reduce error exponentially in the number of trials.'
  },
  {
    id: 'cs403-midterm-q20',
    type: 'code_output',
    prompt: 'What is printed?',
    codeSnippet: `let p = 1;\nfor (let i = 0; i < 3; i++) p *= 0.5;\nconsole.log(p.toFixed(3));`,
    correctAnswer: '0.125',
    explanation: 'Multiplying by 0.5 three times gives 1/8 = 0.125, and toFixed(3) prints 0.125.'
  },
  {
    id: 'cs403-midterm-q21',
    type: 'multiple_choice',
    prompt: 'Reservoir sampling is used to:',
    options: [
      'Sample uniformly from a stream of unknown length using bounded memory',
      'Compute maximum flows',
      'Find shortest paths in graphs',
      'Derandomize quicksort'
    ],
    correctAnswer: 'Sample uniformly from a stream of unknown length using bounded memory',
    explanation: 'Reservoir sampling maintains a uniform sample of fixed size k from a stream without knowing its length in advance.'
  },

  // Topic 4: Online Algorithms (7)
  {
    id: 'cs403-midterm-q22',
    type: 'multiple_choice',
    prompt: 'An online algorithm must make decisions:',
    options: [
      'Without knowing future inputs',
      'Only when connected to the internet',
      'Using randomness',
      'In exponential time'
    ],
    correctAnswer: 'Without knowing future inputs',
    explanation: 'Online algorithms see inputs sequentially and must commit to actions without the full sequence.'
  },
  {
    id: 'cs403-midterm-q23',
    type: 'fill_blank',
    prompt: 'The performance of an online algorithm is often measured by the competitive _____.',
    correctAnswer: 'ratio',
    explanation: 'Competitive ratio compares the online algorithm’s cost to OPT (offline optimal) over all sequences.'
  },
  {
    id: 'cs403-midterm-q24',
    type: 'multiple_choice',
    prompt: 'Which paging algorithm evicts the page that was least recently used?',
    options: ['LRU', 'FIFO', 'OPT', 'LFU'],
    correctAnswer: 'LRU',
    explanation: 'LRU uses recency of access; it evicts the page with the oldest last access time.'
  },
  {
    id: 'cs403-midterm-q25',
    type: 'true_false',
    prompt: 'OPT (Belady’s algorithm) is implementable online.',
    correctAnswer: false,
    explanation: 'OPT evicts the page whose next request is farthest in the future, which requires future knowledge.'
  },
  {
    id: 'cs403-midterm-q26',
    type: 'multiple_choice',
    prompt: 'In the ski rental problem with buy cost B and rent cost 1 per day, a classic deterministic strategy is to:',
    options: [
      'Rent for B days then buy',
      'Buy immediately',
      'Never buy',
      'Randomly buy each day with probability 1/2'
    ],
    correctAnswer: 'Rent for B days then buy',
    explanation: 'Renting for B days and then buying yields a 2-competitive algorithm for ski rental.'
  },
  {
    id: 'cs403-midterm-q27',
    type: 'multiple_choice',
    prompt: 'The secretary problem aims to maximize the probability of selecting:',
    options: ['The best candidate', 'Any candidate', 'The median candidate', 'The first candidate'],
    correctAnswer: 'The best candidate',
    explanation: 'The classic secretary problem’s goal is selecting the maximum-ranked item with one-pass irrevocable choices.'
  },
  {
    id: 'cs403-midterm-q28',
    type: 'written',
    prompt: 'Define “competitive ratio” in your own words, including what the comparison baseline is.',
    correctAnswer: '',
    explanation: 'Competitive ratio compares an online algorithm to OPT, often in worst-case over sequences (with possible additive constant).',
    modelAnswer: 'The competitive ratio of an online algorithm is a worst-case guarantee comparing its cost (or value) on any input sequence to the cost (or value) of an optimal offline algorithm that knows the entire future. For minimization, we require cost(A,σ) ≤ ρ·cost(OPT,σ) + c for all sequences σ.'
  }
];

const finalQuestions: QuizQuestion[] = [
  // Topic 1: NP-Completeness Review (6)
  {
    id: 'cs403-final-q1',
    type: 'multiple_choice',
    prompt: 'Which statement about NP-hardness is correct?',
    options: [
      'If A is NP-hard and A ≤p B, then B is NP-hard',
      'If A ≤p B and B is NP-hard, then A is NP-hard',
      'If B is NP-hard, then B ∈ NP',
      'NP-hard implies solvable in polynomial time'
    ],
    correctAnswer: 'If A is NP-hard and A ≤p B, then B is NP-hard',
    explanation: 'Hardness propagates forward along reductions: if a hard problem reduces to B, then B is at least as hard.'
  },
  {
    id: 'cs403-final-q2',
    type: 'multiple_choice',
    prompt: 'Which is the most accurate statement about NP-complete problems?',
    options: [
      'They are the hardest problems in NP under polynomial-time many-one reductions',
      'They are all solvable in polynomial time',
      'They are all optimization problems',
      'They are outside NP by definition'
    ],
    correctAnswer: 'They are the hardest problems in NP under polynomial-time many-one reductions',
    explanation: 'NP-complete problems are in NP and NP-hard, meaning every NP problem reduces to them.'
  },
  {
    id: 'cs403-final-q3',
    type: 'true_false',
    prompt: 'If NP ≠ co-NP, then no NP-complete language can have its complement also NP-complete.',
    correctAnswer: true,
    explanation: 'If both L and ¬L were NP-complete, then NP would equal co-NP. Thus under NP ≠ co-NP, that cannot happen.'
  },
  {
    id: 'cs403-final-q4',
    type: 'fill_blank',
    prompt: 'If P = NP, then every NP optimization problem has a polynomial-time algorithm for finding an optimal solution via polynomially many calls to a decision oracle using _____.',
    correctAnswer: 'binary search',
    explanation: 'Many optimization problems can be solved by querying the decision version over thresholds and using binary search (or iterative narrowing) to recover the optimum.'
  },
  {
    id: 'cs403-final-q5',
    type: 'written',
    prompt: 'Explain the difference between NP-hard and NP-complete, and give one example of each.',
    correctAnswer: '',
    explanation: 'NP-complete = NP-hard + in NP; NP-hard can include optimization problems.',
    modelAnswer: 'NP-complete problems are decision problems that are both in NP and NP-hard. NP-hard problems are at least as hard as NP problems under polynomial reductions, but they may be outside NP (often because they are optimization problems). Example NP-complete: 3-SAT. Example NP-hard: Traveling Salesman Problem (optimization version).'
  },
  {
    id: 'cs403-final-q6',
    type: 'multiple_choice',
    prompt: 'Which reduction direction is correct for proving that X is NP-complete given a known NP-complete problem A?',
    options: ['A ≤p X', 'X ≤p A', 'A ≤p SAT', 'SAT ≤p A implies X is in P'],
    correctAnswer: 'A ≤p X',
    explanation: 'To show NP-hardness of X, reduce a known hard problem A to X.'
  },

  // Topic 2: Approximation Algorithms (6)
  {
    id: 'cs403-final-q7',
    type: 'multiple_choice',
    prompt: 'For metric TSP, the best-known guaranteed polynomial-time approximation ratio in this course is:',
    options: ['3/2', '2', '1 + ε for all ε', 'No constant-factor approximation exists'],
    correctAnswer: '3/2',
    explanation: 'Christofides’ algorithm provides a 3/2 approximation for metric TSP.'
  },
  {
    id: 'cs403-final-q8',
    type: 'multiple_choice',
    prompt: 'The greedy Set Cover algorithm achieves approximation factor:',
    options: ['O(log n)', 'O(1)', 'O(n)', 'O(log log n)'],
    correctAnswer: 'O(log n)',
    explanation: 'Greedy set cover is Θ(log n)-approximate in general.'
  },
  {
    id: 'cs403-final-q9',
    type: 'true_false',
    prompt: 'An FPTAS is always also a PTAS.',
    correctAnswer: true,
    explanation: 'An FPTAS meets the PTAS definition (poly(n) time for fixed ε) and is strictly stronger because it is also polynomial in 1/ε.'
  },
  {
    id: 'cs403-final-q10',
    type: 'multiple_choice',
    prompt: 'A common technique to design approximation algorithms is:',
    options: ['LP relaxation and rounding', 'Always using brute force', 'Only using BFS', 'Only using recursion'],
    correctAnswer: 'LP relaxation and rounding',
    explanation: 'Relax to a fractional solution (LP) and round to an integral solution while bounding the loss.'
  },
  {
    id: 'cs403-final-q11',
    type: 'fill_blank',
    prompt: 'For maximization problems, a ρ-approximation often guarantees ALG ≥ OPT/_____.',
    correctAnswer: 'ρ',
    explanation: 'For maximization, the approximation inequality typically flips: ALG is within a factor ρ of OPT from below.'
  },
  {
    id: 'cs403-final-q12',
    type: 'written',
    prompt: 'Give a one-paragraph explanation of what an integrality gap is and why it matters for approximation algorithms.',
    correctAnswer: '',
    explanation: 'Integrality gap relates integer OPT to fractional LP OPT and limits rounding performance.',
    modelAnswer: 'The integrality gap of an LP relaxation is the worst-case ratio between the optimal integer solution value and the optimal fractional (LP) solution value over all instances. It matters because many approximation algorithms solve an LP relaxation and then round; the integrality gap provides a lower bound on how good any rounding-based approach can be in the worst case, and it often matches (or guides) achievable approximation guarantees.'
  },

  // Topic 3: Randomized Algorithms (6)
  {
    id: 'cs403-final-q13',
    type: 'multiple_choice',
    prompt: 'Which statement best describes “amplification” in randomized algorithms?',
    options: [
      'Repeating independent trials to reduce error probability exponentially',
      'Using larger inputs to improve runtime',
      'Replacing randomness with determinism',
      'Increasing the number of states in a DP'
    ],
    correctAnswer: 'Repeating independent trials to reduce error probability exponentially',
    explanation: 'If each trial has constant success probability, repeated independent trials can drive failure probability down exponentially.'
  },
  {
    id: 'cs403-final-q14',
    type: 'true_false',
    prompt: 'Las Vegas algorithms can be converted to Monte Carlo algorithms by imposing a time limit and returning a default answer if time runs out.',
    correctAnswer: true,
    explanation: 'Imposing a cutoff turns “always correct but variable time” into “bounded time but may be wrong” when forced to return early.'
  },
  {
    id: 'cs403-final-q15',
    type: 'multiple_choice',
    prompt: 'A Chernoff bound is most appropriate when analyzing:',
    options: [
      'The concentration of sums of independent bounded random variables',
      'Worst-case sorting lower bounds',
      'Exact TSP solutions',
      'Flow conservation constraints'
    ],
    correctAnswer: 'The concentration of sums of independent bounded random variables',
    explanation: 'Chernoff bounds give exponentially decreasing tail probabilities for sums of independent random variables.'
  },
  {
    id: 'cs403-final-q16',
    type: 'fill_blank',
    prompt: 'Yao’s minimax principle relates randomized algorithms to deterministic algorithms under a distribution over _____.',
    correctAnswer: 'inputs',
    explanation: 'It lower-bounds randomized performance by considering the best deterministic algorithm on a hard input distribution.'
  },
  {
    id: 'cs403-final-q17',
    type: 'multiple_choice',
    prompt: 'The one-run success probability of Karger’s min-cut is low; to obtain high probability, we:',
    options: [
      'Repeat the algorithm many times and take the best cut found',
      'Sort edges by capacity',
      'Run Dijkstra from the source',
      'Use dynamic programming'
    ],
    correctAnswer: 'Repeat the algorithm many times and take the best cut found',
    explanation: 'Repeated independent runs amplify success probability; selecting the smallest cut found across runs is correct.'
  },
  {
    id: 'cs403-final-q18',
    type: 'coding',
    prompt: 'Write a function `pickPivot(arr)` that returns a uniformly random element of `arr` (assume `arr.length > 0`). Use Python.',
    correctAnswer: 'import random\n\ndef pickPivot(arr):\n    return random.choice(arr)',
    solution: 'import random\n\ndef pickPivot(arr):\n    return random.choice(arr)\n\n# Example\nprint(pickPivot([1, 2, 3]))',
    language: 'python',
    explanation: 'Uniformly choosing a pivot is a core ingredient in randomized quicksort/quickselect to avoid adversarial inputs.'
  },

  // Topic 4: Online Algorithms (6)
  {
    id: 'cs403-final-q19',
    type: 'multiple_choice',
    prompt: 'A competitive ratio compares an online algorithm to:',
    options: ['An optimal offline algorithm', 'A random baseline', 'The best greedy algorithm', 'The average input'],
    correctAnswer: 'An optimal offline algorithm',
    explanation: 'The baseline is OPT, which knows the entire input sequence ahead of time.'
  },
  {
    id: 'cs403-final-q20',
    type: 'true_false',
    prompt: 'Randomized online algorithms are typically analyzed against an oblivious adversary (one that fixes the input sequence in advance).',
    correctAnswer: true,
    explanation: 'Many standard competitive analyses assume an oblivious adversary; adaptive adversaries are stronger and can invalidate some guarantees.'
  },
  {
    id: 'cs403-final-q21',
    type: 'multiple_choice',
    prompt: 'For deterministic paging, LRU is:',
    options: ['k-competitive', '1-competitive', 'O(log k)-competitive', 'Not competitive'],
    correctAnswer: 'k-competitive',
    explanation: 'LRU is k-competitive for cache size k, and this is optimal for deterministic algorithms.'
  },
  {
    id: 'cs403-final-q22',
    type: 'fill_blank',
    prompt: 'The ski rental problem’s classic deterministic algorithm is _____-competitive.',
    correctAnswer: '2',
    explanation: 'Rent for B days then buy yields a competitive ratio of 2.'
  },
  {
    id: 'cs403-final-q23',
    type: 'multiple_choice',
    prompt: 'The online bipartite matching “Ranking” algorithm achieves competitive ratio:',
    options: ['1 − 1/e', '1/2', '2/3', '1/e'],
    correctAnswer: '1 − 1/e',
    explanation: 'Ranking achieves (1−1/e)-competitive against an oblivious adversary for online bipartite matching.'
  },
  {
    id: 'cs403-final-q24',
    type: 'written',
    prompt: 'Give a short explanation of why adversarial input sequences are central to online algorithm analysis.',
    correctAnswer: '',
    explanation: 'Online algorithms can be forced into bad choices without future knowledge; adversaries model worst-case sequences.',
    modelAnswer: 'Online algorithms must commit without seeing the future, so there can exist sequences where early reasonable-looking decisions become costly later. Adversarial analysis captures this worst-case behavior and yields guarantees that do not rely on average-case assumptions. Competitive analysis formalizes this by comparing against OPT for every possible sequence.'
  },

  // Topic 5: Advanced Dynamic Programming (6)
  {
    id: 'cs403-final-q25',
    type: 'multiple_choice',
    prompt: 'Held–Karp for TSP is a DP over:',
    options: ['Subsets', 'Edges only', 'Trees only', 'Greedy choices'],
    correctAnswer: 'Subsets',
    explanation: 'Held–Karp uses dp[S][v] states (subset S ending at v), giving O(n^2 2^n) time.'
  },
  {
    id: 'cs403-final-q26',
    type: 'true_false',
    prompt: 'Matrix-chain multiplication DP is an example of interval DP.',
    correctAnswer: true,
    explanation: 'States correspond to intervals (i, j) over the chain, and transitions try all split points k.'
  },
  {
    id: 'cs403-final-q27',
    type: 'fill_blank',
    prompt: 'Edit distance DP on strings of lengths m and n runs in O(m·n) time and O(_____) space (standard table).',
    correctAnswer: 'm·n',
    explanation: 'The standard DP uses an (m+1)×(n+1) table. With rolling arrays, space can often be reduced to O(min(m, n)).'
  },
  {
    id: 'cs403-final-q28',
    type: 'multiple_choice',
    prompt: 'A common way to reduce space in DP tables is:',
    options: [
      'Use rolling arrays when transitions depend on limited previous rows/columns',
      'Replace DP with brute force',
      'Avoid recursion at all costs',
      'Randomize the input'
    ],
    correctAnswer: 'Use rolling arrays when transitions depend on limited previous rows/columns',
    explanation: 'If dp[i][*] depends only on dp[i−1][*] (or a constant window), you can keep only the needed rows/columns.'
  },
  {
    id: 'cs403-final-q29',
    type: 'multiple_choice',
    prompt: 'Which optimization technique can reduce certain O(n^3) interval DPs to O(n^2)?',
    options: ['Knuth optimization', 'Dijkstra', 'Kruskal', 'Reservoir sampling'],
    correctAnswer: 'Knuth optimization',
    explanation: 'Knuth optimization applies when the argmin is monotone and certain quadrangle inequalities hold.'
  },
  {
    id: 'cs403-final-q30',
    type: 'coding',
    prompt: 'Implement `lcs_length(a, b)` returning the length of the longest common subsequence. Use Python and a DP table.',
    correctAnswer: 'def lcs_length(a, b):\n    m, n = len(a), len(b)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if a[i - 1] == b[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1] + 1\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    return dp[m][n]',
    solution: 'def lcs_length(a, b):\n    m, n = len(a), len(b)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if a[i - 1] == b[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1] + 1\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    return dp[m][n]\n\nprint(lcs_length(\"abcde\", \"ace\"))  # 3',
    language: 'python',
    explanation: 'Standard LCS DP uses dp[i][j] as LCS length of prefixes and fills the table in O(mn).'
  },

  // Topic 6: Network Flow Algorithms (6)
  {
    id: 'cs403-final-q31',
    type: 'multiple_choice',
    prompt: 'Edmonds–Karp runs in polynomial time because:',
    options: [
      'Each BFS increases the shortest augmenting path distance and each edge becomes critical only O(V) times',
      'It always finds a min-cut directly',
      'It uses randomization',
      'It enumerates all possible flows'
    ],
    correctAnswer: 'Each BFS increases the shortest augmenting path distance and each edge becomes critical only O(V) times',
    explanation: 'The nondecreasing BFS distance and bounded number of saturations imply O(VE^2) time.'
  },
  {
    id: 'cs403-final-q32',
    type: 'true_false',
    prompt: 'Push–relabel algorithms operate on a preflow and use vertex “heights” to guide pushes.',
    correctAnswer: true,
    explanation: 'Push–relabel maintains excess at vertices and pushes flow along admissible edges, relabeling heights when stuck.'
  },
  {
    id: 'cs403-final-q33',
    type: 'fill_blank',
    prompt: 'A minimum s–t cut is a partition (S, T) with s ∈ S and t ∈ T minimizing the total capacity of edges from _____ to _____.',
    correctAnswer: 'S to T',
    explanation: 'Cut capacity is the sum of capacities of edges crossing from S to T in the directed graph.'
  },
  {
    id: 'cs403-final-q34',
    type: 'multiple_choice',
    prompt: 'Which problem reduces naturally to max flow using unit capacities?',
    options: ['Bipartite matching', 'LCS', 'Quicksort', 'Convex hull'],
    correctAnswer: 'Bipartite matching',
    explanation: 'Add source→left edges (1), left→right edges (1), right→sink edges (1). The max flow value equals maximum matching size.'
  },
  {
    id: 'cs403-final-q35',
    type: 'multiple_choice',
    prompt: 'A residual edge (v, u) with capacity f(u, v) represents:',
    options: [
      'The ability to cancel (send back) some previously sent flow on (u, v)',
      'A mandatory flow requirement',
      'A negative-cost edge',
      'A shortcut to the sink'
    ],
    correctAnswer: 'The ability to cancel (send back) some previously sent flow on (u, v)',
    explanation: 'Backward residual edges encode how much flow can be undone on a forward edge, enabling augmenting paths to reroute flow.'
  },
  {
    id: 'cs403-final-q36',
    type: 'written',
    prompt: 'State the max-flow min-cut theorem and explain (briefly) how it certifies optimality.',
    correctAnswer: '',
    explanation: 'Max flow value equals min cut capacity; when no augmenting path exists, reachable set in residual graph yields a cut matching the flow value.',
    modelAnswer: 'The max-flow min-cut theorem states that the maximum value of an s–t flow equals the minimum capacity among all s–t cuts. It certifies optimality because if you exhibit a flow of value F and a cut of capacity F, then both must be optimal: no flow can exceed any cut, so the flow is maximum and the cut is minimum.'
  },

  // Topic 7: Computational Geometry (6)
  {
    id: 'cs403-final-q37',
    type: 'multiple_choice',
    prompt: 'Graham scan computes the convex hull in:',
    options: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(log n)'],
    correctAnswer: 'O(n log n)',
    explanation: 'Sorting dominates. The scan after sorting is linear.'
  },
  {
    id: 'cs403-final-q38',
    type: 'true_false',
    prompt: 'Jarvis March (gift wrapping) is output-sensitive with runtime O(nh).',
    correctAnswer: true,
    explanation: 'h is the number of hull points; each hull point is found by scanning all n points.'
  },
  {
    id: 'cs403-final-q39',
    type: 'fill_blank',
    prompt: 'Voronoi diagrams are dual to the _____ triangulation.',
    correctAnswer: 'Delaunay',
    explanation: 'Edges in the Delaunay triangulation connect sites whose Voronoi cells share a boundary.'
  },
  {
    id: 'cs403-final-q40',
    type: 'multiple_choice',
    prompt: 'A key geometric primitive used in many planar algorithms is:',
    options: ['Orientation (ccw) test via cross product', 'Max-flow min-cut', 'Knapsack DP', 'Chernoff bound'],
    correctAnswer: 'Orientation (ccw) test via cross product',
    explanation: 'Orientation tests determine left/right turns and are central in convex hulls and segment intersection.'
  },
  {
    id: 'cs403-final-q41',
    type: 'multiple_choice',
    prompt: 'The closest pair of points problem can be solved in O(n log n) time using:',
    options: ['Divide and conquer with a strip merge step', 'Only dynamic programming', 'Only max flow', 'Only random sampling'],
    correctAnswer: 'Divide and conquer with a strip merge step',
    explanation: 'After dividing, only a constant number of candidate neighbors in the strip need checking, leading to O(n log n).'
  },
  {
    id: 'cs403-final-q42',
    type: 'written',
    prompt: 'Why do degeneracies (collinear points, duplicate points) matter in computational geometry algorithms?',
    correctAnswer: '',
    explanation: 'Degenerate cases can break assumptions (general position) and cause ambiguous predicate results under floating point.',
    modelAnswer: 'Many geometric algorithms assume “general position” (e.g., no three points collinear) to simplify correctness. Degeneracies can make orientation or intersection predicates return zero or become numerically unstable, leading to incorrect branching decisions. Robust handling requires explicit tie-breaking, exact predicates, or careful epsilon-based comparisons.'
  }
];

export const cs403Exams: Exam[] = [
  {
    id: 'cs403-midterm',
    subjectId: 'cs403',
    title: 'CS403 Midterm Exam',
    durationMinutes: 75,
    instructions: [
      'This midterm covers Topics 1–4: NP-Completeness, Approximation, Randomization, and Online Algorithms.',
      'Answer all questions. Passing score is 70%.',
      'For code/output questions, assume TypeScript semantics unless stated otherwise.',
      'For written questions, answer in clear, concise prose.'
    ],
    questions: midtermQuestions
  },
  {
    id: 'cs403-final',
    subjectId: 'cs403',
    title: 'CS403 Final Exam',
    durationMinutes: 120,
    instructions: [
      'This final is comprehensive across all 7 topics.',
      'Answer all questions. Passing score is 70%.',
      'For coding questions, write in Python unless otherwise specified.',
      'For written questions, aim for 50–150 words.'
    ],
    questions: finalQuestions
  }
];
