import type { Exam, QuizQuestion } from '../../../core/types';

const midtermQuestions: QuizQuestion[] = [
  // AI Fundamentals
  {
    id: 'cs406-midterm-q1',
    type: 'multiple_choice',
    prompt: 'Which of the following best describes the Turing Test?',
    options: [
      'A test to measure computer processing speed',
      'A test where a human judge determines if they are conversing with a human or machine',
      'A test to evaluate the physical capabilities of robots',
      'A mathematical proof of AI completeness'
    ],
    correctAnswer: 'A test where a human judge determines if they are conversing with a human or machine',
    explanation: 'The Turing Test, proposed by Alan Turing in 1950, evaluates a machine\'s ability to exhibit intelligent behavior indistinguishable from a human through natural language conversation.'
  },
  {
    id: 'cs406-midterm-q2',
    type: 'multiple_choice',
    prompt: 'What does PEAS stand for in agent design?',
    options: [
      'Performance, Environment, Actuators, Sensors',
      'Planning, Execution, Analysis, Sensing',
      'Prediction, Evaluation, Action, State',
      'Problem, Environment, Action, Solution'
    ],
    correctAnswer: 'Performance, Environment, Actuators, Sensors',
    explanation: 'PEAS is a framework for specifying task environments: Performance measure (success criteria), Environment (the world), Actuators (actions), and Sensors (perceptions).'
  },
  {
    id: 'cs406-midterm-q3',
    type: 'multiple_choice',
    prompt: 'Which search algorithm is guaranteed to find the optimal solution if one exists?',
    options: [
      'Depth-First Search',
      'Breadth-First Search with uniform costs',
      'Greedy Best-First Search',
      'Hill Climbing'
    ],
    correctAnswer: 'Breadth-First Search with uniform costs',
    explanation: 'Uniform Cost Search (BFS with varying costs) is complete and optimal, expanding nodes in order of path cost. Regular BFS is optimal when all step costs are equal.'
  },
  {
    id: 'cs406-midterm-q4',
    type: 'multiple_choice',
    prompt: 'What is the main advantage of A* search over uniform cost search?',
    options: [
      'A* uses less memory',
      'A* uses a heuristic to guide search toward the goal',
      'A* always finds solutions faster',
      'A* requires no domain knowledge'
    ],
    correctAnswer: 'A* uses a heuristic to guide search toward the goal',
    explanation: 'A* combines path cost g(n) with heuristic h(n) to estimate total cost f(n) = g(n) + h(n), using domain knowledge to search more efficiently toward the goal.'
  },
  {
    id: 'cs406-midterm-q5',
    type: 'multiple_choice',
    prompt: 'An admissible heuristic is one that:',
    options: [
      'Never overestimates the cost to reach the goal',
      'Always finds the solution in minimum time',
      'Uses the least amount of memory',
      'Works for all problem types'
    ],
    correctAnswer: 'Never overestimates the cost to reach the goal',
    explanation: 'An admissible heuristic never overestimates the true cost to reach the goal (h(n) ≤ h*(n)). This property ensures A* with an admissible heuristic finds optimal solutions.'
  },
  {
    id: 'cs406-midterm-q6',
    type: 'multiple_choice',
    prompt: 'In the Minimax algorithm, the MAX player:',
    options: [
      'Tries to minimize the score',
      'Tries to maximize the score',
      'Makes random moves',
      'Always goes first'
    ],
    correctAnswer: 'Tries to maximize the score',
    explanation: 'In Minimax, MAX player tries to maximize the utility value while MIN player tries to minimize it. They alternate turns, each playing optimally.'
  },
  {
    id: 'cs406-midterm-q7',
    type: 'multiple_choice',
    prompt: 'Alpha-beta pruning improves Minimax by:',
    options: [
      'Using a better evaluation function',
      'Eliminating branches that cannot affect the final decision',
      'Making the game tree smaller from the start',
      'Limiting search depth'
    ],
    correctAnswer: 'Eliminating branches that cannot affect the final decision',
    explanation: 'Alpha-beta pruning eliminates subtrees that cannot influence the minimax decision, significantly reducing nodes examined without affecting the result.'
  },
  {
    id: 'cs406-midterm-q8',
    type: 'multiple_choice',
    prompt: 'In constraint satisfaction problems (CSP), what is a constraint?',
    options: [
      'A limitation on available memory',
      'A restriction on the combinations of values variables can take',
      'A time limit for finding a solution',
      'A search heuristic'
    ],
    correctAnswer: 'A restriction on the combinations of values variables can take',
    explanation: 'Constraints specify which combinations of variable assignments are allowed. For example, in graph coloring, adjacent nodes must have different colors.'
  },
  {
    id: 'cs406-midterm-q9',
    type: 'multiple_choice',
    prompt: 'The AC-3 algorithm is used for:',
    options: [
      'Planning optimal routes',
      'Enforcing arc consistency in CSPs',
      'Playing adversarial games',
      'Logical inference'
    ],
    correctAnswer: 'Enforcing arc consistency in CSPs',
    explanation: 'AC-3 (Arc Consistency Algorithm 3) removes values from variable domains that cannot be part of any solution, enforcing arc consistency throughout the constraint graph.'
  },
  {
    id: 'cs406-midterm-q10',
    type: 'multiple_choice',
    prompt: 'The Minimum Remaining Values (MRV) heuristic in CSP selects:',
    options: [
      'The variable with the most remaining legal values',
      'The variable with the fewest remaining legal values',
      'The variable that appears in most constraints',
      'A random unassigned variable'
    ],
    correctAnswer: 'The variable with the fewest remaining legal values',
    explanation: 'MRV (also called "most constrained variable") chooses the variable with the smallest domain, as it\'s most likely to cause failure soon if no solution exists.'
  },
  {
    id: 'cs406-midterm-q11',
    type: 'multiple_choice',
    prompt: 'In STRIPS planning, what is a precondition?',
    options: [
      'A condition that must be true before an action can be executed',
      'The final goal state',
      'A cost associated with an action',
      'An error condition'
    ],
    correctAnswer: 'A condition that must be true before an action can be executed',
    explanation: 'Preconditions specify what must be true in the current state for an action to be applicable. They form the requirements for action execution.'
  },
  {
    id: 'cs406-midterm-q12',
    type: 'multiple_choice',
    prompt: 'What is the purpose of a planning graph?',
    options: [
      'To visualize the problem state space',
      'To provide an admissible heuristic for planning',
      'To execute plans in parallel',
      'To detect loops in plans'
    ],
    correctAnswer: 'To provide an admissible heuristic for planning',
    explanation: 'Planning graphs encode reachability information and mutual exclusion relations, providing relaxed plan length estimates that serve as admissible heuristics for planning.'
  },
  {
    id: 'cs406-midterm-q13',
    type: 'multiple_choice',
    prompt: 'In propositional logic, modus ponens states that:',
    options: [
      'From P and P→Q, we can infer Q',
      'From P or Q and ¬P, we can infer Q',
      'From P and Q, we can infer P∧Q',
      'From P, we can infer ¬¬P'
    ],
    correctAnswer: 'From P and P→Q, we can infer Q',
    explanation: 'Modus ponens is a fundamental inference rule: if we know P is true and P implies Q, then Q must be true. It forms the basis of forward chaining.'
  },
  {
    id: 'cs406-midterm-q14',
    type: 'multiple_choice',
    prompt: 'First-order logic extends propositional logic by adding:',
    options: [
      'Variables, quantifiers, and predicates',
      'Fuzzy truth values',
      'Temporal operators',
      'Probabilistic reasoning'
    ],
    correctAnswer: 'Variables, quantifiers, and predicates',
    explanation: 'First-order logic (FOL) extends propositional logic with variables (x, y), quantifiers (∀, ∃), and predicates that can express relations between objects.'
  },
  {
    id: 'cs406-midterm-q15',
    type: 'multiple_choice',
    prompt: 'What is the key idea behind resolution in logic?',
    options: [
      'Resolving conflicts between multiple knowledge bases',
      'Combining clauses to eliminate complementary literals',
      'Simplifying complex formulas',
      'Converting to normal form'
    ],
    correctAnswer: 'Combining clauses to eliminate complementary literals',
    explanation: 'Resolution is an inference rule that combines two clauses containing complementary literals (P and ¬P) to derive a new clause, forming a complete inference method.'
  }
];

const finalQuestions: QuizQuestion[] = [
  {
    id: 'cs406-final-q1',
    type: 'multiple_choice',
    prompt: 'Bayes\' theorem allows us to compute:',
    options: [
      'P(A|B) from P(B|A), P(A), and P(B)',
      'The maximum likelihood estimate',
      'The joint probability directly',
      'Only marginal probabilities'
    ],
    correctAnswer: 'P(A|B) from P(B|A), P(A), and P(B)',
    explanation: 'Bayes\' theorem: P(A|B) = P(B|A)P(A)/P(B). It inverts conditional probabilities, computing P(cause|effect) from P(effect|cause) and priors.'
  },
  {
    id: 'cs406-final-q2',
    type: 'multiple_choice',
    prompt: 'In a Bayesian network, what does a directed edge from node A to node B represent?',
    options: [
      'A causal influence from A to B',
      'A correlation between A and B',
      'That A and B are independent',
      'That A always occurs before B'
    ],
    correctAnswer: 'A causal influence from A to B',
    explanation: 'In Bayesian networks, directed edges represent direct causal or influential relationships. Node B\'s probability depends directly on its parent A\'s value.'
  },
  {
    id: 'cs406-final-q3',
    type: 'multiple_choice',
    prompt: 'The Markov assumption in Hidden Markov Models states that:',
    options: [
      'The current state depends only on the previous state',
      'All states are equally likely',
      'Observations are independent of states',
      'The model has no memory'
    ],
    correctAnswer: 'The current state depends only on the previous state',
    explanation: 'The Markov property (first-order) states that the current state depends only on the immediately previous state, not on earlier history: P(S_t|S_{t-1},...,S_1) = P(S_t|S_{t-1}).'
  },
  {
    id: 'cs406-final-q4',
    type: 'multiple_choice',
    prompt: 'Monte Carlo Tree Search (MCTS) works by:',
    options: [
      'Exhaustively searching all possible moves',
      'Using minimax with alpha-beta pruning',
      'Randomly simulating games from promising positions',
      'Learning from historical game data'
    ],
    correctAnswer: 'Randomly simulating games from promising positions',
    explanation: 'MCTS builds a search tree incrementally through four phases: selection, expansion, simulation (random playout), and backpropagation, balancing exploration and exploitation.'
  },
  {
    id: 'cs406-final-q5',
    type: 'multiple_choice',
    prompt: 'The UCB1 formula in MCTS balances:',
    options: [
      'Exploitation of good moves and exploration of untried moves',
      'Speed and memory usage',
      'Depth and breadth of search',
      'Accuracy and precision'
    ],
    correctAnswer: 'Exploitation of good moves and exploration of untried moves',
    explanation: 'UCB1 (Upper Confidence Bound) = wins/visits + C×√(ln(parent_visits)/visits). The first term favors exploitation, the second favors exploration of less-visited nodes.'
  },
  {
    id: 'cs406-final-q6',
    type: 'multiple_choice',
    prompt: 'Which search algorithm is complete but not optimal?',
    options: [
      'Depth-First Search',
      'A* with admissible heuristic',
      'Uniform Cost Search',
      'Greedy Best-First Search'
    ],
    correctAnswer: 'Depth-First Search',
    explanation: 'DFS is complete in finite spaces but not optimal—it may find a non-optimal solution first. A* and UCS are both complete and optimal; Greedy search is neither.'
  },
  {
    id: 'cs406-final-q7',
    type: 'multiple_choice',
    prompt: 'Iterative Deepening Depth-First Search (IDDFS) combines advantages of:',
    options: [
      'BFS completeness/optimality with DFS memory efficiency',
      'A* heuristics with DFS speed',
      'Hill climbing with random restarts',
      'Forward and backward search'
    ],
    correctAnswer: 'BFS completeness/optimality with DFS memory efficiency',
    explanation: 'IDDFS performs DFS with increasing depth limits, achieving BFS-like completeness and optimality (for uniform costs) while using only O(bd) memory like DFS.'
  },
  {
    id: 'cs406-final-q8',
    type: 'multiple_choice',
    prompt: 'In CSP, forward checking:',
    options: [
      'Checks constraints before assigning variables',
      'Removes inconsistent values from unassigned neighbors\' domains',
      'Assigns all variables forward in order',
      'Checks the solution after completion'
    ],
    correctAnswer: 'Removes inconsistent values from unassigned neighbors\' domains',
    explanation: 'Forward checking maintains arc consistency for the current variable: after assigning variable X, it removes values from domains of unassigned neighbors that conflict with X.'
  },
  {
    id: 'cs406-final-q9',
    type: 'multiple_choice',
    prompt: 'Delete relaxation in planning heuristics means:',
    options: [
      'Deleting unreachable actions',
      'Ignoring delete effects of actions',
      'Removing redundant goals',
      'Simplifying preconditions'
    ],
    correctAnswer: 'Ignoring delete effects of actions',
    explanation: 'Delete relaxation creates an easier problem by ignoring negative effects (delete lists) of actions. The relaxed plan length provides an admissible heuristic for the original problem.'
  },
  {
    id: 'cs406-final-q10',
    type: 'multiple_choice',
    prompt: 'Hierarchical Task Network (HTN) planning uses:',
    options: [
      'Multiple levels of abstraction with task decomposition',
      'A hierarchy of goals from most to least important',
      'Layered neural networks',
      'Priority queues for action selection'
    ],
    correctAnswer: 'Multiple levels of abstraction with task decomposition',
    explanation: 'HTN planning decomposes high-level tasks into subtasks using methods, continuing recursively until reaching primitive actions. This matches how humans naturally plan.'
  },
  {
    id: 'cs406-final-q11',
    type: 'multiple_choice',
    prompt: 'In first-order logic, existential instantiation:',
    options: [
      'Replaces ∃x P(x) with P(c) for a new constant c',
      'Proves existence of all objects',
      'Eliminates quantifiers completely',
      'Converts to propositional logic'
    ],
    correctAnswer: 'Replaces ∃x P(x) with P(c) for a new constant c',
    explanation: 'Existential instantiation introduces a new constant (Skolem constant) to represent the witness to an existential quantifier: from ∃x P(x), infer P(c) for fresh c.'
  },
  {
    id: 'cs406-final-q12',
    type: 'multiple_choice',
    prompt: 'Semantic networks represent knowledge using:',
    options: [
      'Graphs with nodes for concepts and edges for relationships',
      'Logical formulas in CNF',
      'Probability distributions',
      'Neural network weights'
    ],
    correctAnswer: 'Graphs with nodes for concepts and edges for relationships',
    explanation: 'Semantic networks use graph structures where nodes represent concepts/objects and labeled directed edges represent relationships like "is-a", "part-of", "has-property".'
  },
  {
    id: 'cs406-final-q13',
    type: 'multiple_choice',
    prompt: 'Variable elimination in Bayesian networks:',
    options: [
      'Computes posterior probabilities by summing out variables',
      'Removes unnecessary nodes from the network',
      'Eliminates dependencies between variables',
      'Reduces the network to a tree structure'
    ],
    correctAnswer: 'Computes posterior probabilities by summing out variables',
    explanation: 'Variable elimination performs exact inference by systematically summing out (marginalizing) variables in an order that minimizes intermediate factor sizes.'
  },
  {
    id: 'cs406-final-q14',
    type: 'multiple_choice',
    prompt: 'The Viterbi algorithm finds:',
    options: [
      'The most likely sequence of hidden states given observations',
      'All possible state sequences',
      'The probability of observations',
      'The optimal policy for an MDP'
    ],
    correctAnswer: 'The most likely sequence of hidden states given observations',
    explanation: 'The Viterbi algorithm uses dynamic programming to find the maximum a posteriori (MAP) state sequence in an HMM: argmax_states P(states|observations).'
  },
  {
    id: 'cs406-final-q15',
    type: 'multiple_choice',
    prompt: 'Kalman filters are used for:',
    options: [
      'State estimation in continuous domains with Gaussian noise',
      'Discrete state tracking',
      'Planning in deterministic environments',
      'Logical reasoning'
    ],
    correctAnswer: 'State estimation in continuous domains with Gaussian noise',
    explanation: 'Kalman filters maintain a Gaussian belief over continuous state spaces, optimally combining predictions from system dynamics with noisy sensor measurements for state estimation.'
  },
  {
    id: 'cs406-final-q16',
    type: 'multiple_choice',
    prompt: 'Particle filtering (Sequential Monte Carlo) approximates:',
    options: [
      'Probability distributions using weighted samples',
      'Deterministic state transitions',
      'Optimal action selection',
      'Exact inference in Bayesian networks'
    ],
    correctAnswer: 'Probability distributions using weighted samples',
    explanation: 'Particle filters represent belief distributions using a set of weighted samples (particles), allowing approximate inference for complex, non-Gaussian, nonlinear systems.'
  },
  {
    id: 'cs406-final-q17',
    type: 'multiple_choice',
    prompt: 'In local search for CSP, the min-conflicts heuristic:',
    options: [
      'Selects the value that results in minimum conflicts with other variables',
      'Minimizes the number of constraint checks',
      'Finds the variable with fewest conflicts',
      'Always finds the optimal solution'
    ],
    correctAnswer: 'Selects the value that results in minimum conflicts with other variables',
    explanation: 'Min-conflicts is a greedy local search heuristic: for a conflicted variable, choose the value that minimizes conflicts with other variable assignments.'
  },
  {
    id: 'cs406-final-q18',
    type: 'multiple_choice',
    prompt: 'The GraphPlan algorithm for planning uses:',
    options: [
      'Alternating layers of propositions and actions',
      'State-space search with heuristics',
      'Game-theoretic analysis',
      'Logical resolution'
    ],
    correctAnswer: 'Alternating layers of propositions and actions',
    explanation: 'GraphPlan builds a planning graph with alternating proposition and action layers, encoding reachability and mutex relations to find parallel plans efficiently.'
  },
  {
    id: 'cs406-final-q19',
    type: 'multiple_choice',
    prompt: 'CNF (Conjunctive Normal Form) is:',
    options: [
      'A conjunction of disjunctions of literals',
      'A disjunction of conjunctions of literals',
      'A nested implication structure',
      'A binary decision diagram'
    ],
    correctAnswer: 'A conjunction of disjunctions of literals',
    explanation: 'CNF is a conjunction (AND) of clauses, where each clause is a disjunction (OR) of literals. Example: (A∨¬B)∧(B∨C)∧(¬A∨¬C). Resolution requires CNF.'
  },
  {
    id: 'cs406-final-q20',
    type: 'multiple_choice',
    prompt: 'Conditional independence in probability means:',
    options: [
      'P(X|Y,Z) = P(X|Z), meaning X and Y are independent given Z',
      'X and Y are always independent',
      'X determines Y completely',
      'X, Y, and Z are mutually independent'
    ],
    correctAnswer: 'P(X|Y,Z) = P(X|Z), meaning X and Y are independent given Z',
    explanation: 'X and Y are conditionally independent given Z if learning Y provides no additional information about X once Z is known: P(X|Y,Z) = P(X|Z).'
  }
];

export const cs406Exams: Exam[] = [
  {
    id: 'cs406-midterm',
    subjectId: 'cs406',
    title: 'CS406 Midterm Exam',
    durationMinutes: 120,
    questions: midtermQuestions
  },
  {
    id: 'cs406-final',
    subjectId: 'cs406',
    title: 'CS406 Final Exam',
    durationMinutes: 180,
    questions: finalQuestions
  }
];
