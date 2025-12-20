import { Topic, Subtopic } from '../../core/types';
import topic1Content from './content/topic-1.md?raw';
import topic2Content from './content/topic-2.md?raw';
import topic3Content from './content/topic-3.md?raw';
import topic4Content from './content/topic-4.md?raw';
import topic5Content from './content/topic-5.md?raw';
import topic6Content from './content/topic-6.md?raw';
import topic7Content from './content/topic-7.md?raw';

// Topic 1: Combinatorics subtopics
import t1CountingPrinciples from './content/topic-1/01-counting-principles.md?raw';
import t1Permutations from './content/topic-1/02-permutations.md?raw';
import t1Combinations from './content/topic-1/03-combinations.md?raw';
import t1PigeonholePrinciple from './content/topic-1/04-pigeonhole-principle.md?raw';
import t1InclusionExclusion from './content/topic-1/05-inclusion-exclusion.md?raw';
import t1CountingStrategies from './content/topic-1/06-counting-strategies.md?raw';
import t1CombinatorialProofs from './content/topic-1/07-combinatorial-proofs.md?raw';

// Topic 2: Recurrence Relations subtopics
import t2RecurrenceBasics from './content/topic-2/01-recurrence-basics.md?raw';
import t2LinearHomogeneous from './content/topic-2/02-linear-homogeneous.md?raw';
import t2NonHomogeneous from './content/topic-2/03-non-homogeneous.md?raw';
import t2MasterTheorem from './content/topic-2/04-master-theorem.md?raw';
import t2GeneratingFunctions from './content/topic-2/05-generating-functions.md?raw';
import t2SolvingTechniques from './content/topic-2/06-solving-techniques.md?raw';
import t2Applications from './content/topic-2/07-applications.md?raw';

// Topic 3: Graph Theory Basics subtopics
import t3GraphDefinitions from './content/topic-3/01-graph-definitions.md?raw';
import t3GraphRepresentations from './content/topic-3/02-graph-representations.md?raw';
import t3PathsCycles from './content/topic-3/03-paths-cycles.md?raw';
import t3TreesForests from './content/topic-3/04-trees-forests.md?raw';
import t3PlanarColoring from './content/topic-3/05-planar-coloring.md?raw';
import t3SpecialGraphs from './content/topic-3/06-special-graphs.md?raw';
import t3GraphProblems from './content/topic-3/07-graph-problems.md?raw';

// Topic 4: Graph Algorithms subtopics
import t4BfsDfs from './content/topic-4/01-bfs-dfs.md?raw';
import t4ShortestPaths from './content/topic-4/02-shortest-paths.md?raw';
import t4TopologicalSort from './content/topic-4/03-topological-sort.md?raw';
import t4ConnectedComponents from './content/topic-4/04-connected-components.md?raw';
import t4MinimumSpanningTrees from './content/topic-4/05-minimum-spanning-trees.md?raw';
import t4NetworkFlow from './content/topic-4/06-network-flow.md?raw';
import t4GraphAlgorithmsAdvanced from './content/topic-4/07-graph-algorithms-advanced.md?raw';

// Topic 5: Number Theory subtopics
import t5DivisibilityPrimes from './content/topic-5/01-divisibility-primes.md?raw';
import t5ModularArithmetic from './content/topic-5/02-modular-arithmetic.md?raw';
import t5GcdEuclidean from './content/topic-5/03-gcd-euclidean.md?raw';
import t5PrimeFactorization from './content/topic-5/04-prime-factorization.md?raw';
import t5FermatsEulers from './content/topic-5/05-fermats-eulers.md?raw';
import t5CryptographicApplications from './content/topic-5/06-cryptographic-applications.md?raw';
import t5NumberTheoryProblems from './content/topic-5/07-number-theory-problems.md?raw';

// Topic 6: Advanced Counting Techniques subtopics
import t6AdvancedCombinatorics from './content/topic-6/01-advanced-combinatorics.md?raw';
import t6GeneratingFunctions from './content/topic-6/02-generating-functions.md?raw';
import t6InclusionExclusionPrinciple from './content/topic-6/03-principle-of-inclusion-exclusion.md?raw';
import t6PartitionTheory from './content/topic-6/04-partition-theory.md?raw';
import t6StirlingNumbers from './content/topic-6/05-stirling-numbers.md?raw';
import t6PolyaEnumeration from './content/topic-6/06-polya-enumeration.md?raw';
import t6AdvancedCountingProblems from './content/topic-6/07-advanced-counting-problems.md?raw';

// Topic 7: Probability Foundations subtopics
import t7ProbabilityBasics from './content/topic-7/01-probability-basics.md?raw';
import t7RandomVariables from './content/topic-7/02-random-variables.md?raw';
import t7ConditionalProbability from './content/topic-7/03-conditional-probability.md?raw';
import t7DiscreteDistributions from './content/topic-7/04-discrete-distributions.md?raw';
import t7ExpectationVariance from './content/topic-7/05-expectation-variance.md?raw';
import t7ProbabilisticAnalysis from './content/topic-7/06-probabilistic-analysis.md?raw';
import t7ProbabilityProblems from './content/topic-7/07-probability-problems.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'math102-t1-counting', slug: 'counting-principles', title: 'Counting Principles', content: t1CountingPrinciples, order: 1 },
  { id: 'math102-t1-perms', slug: 'permutations', title: 'Permutations', content: t1Permutations, order: 2 },
  { id: 'math102-t1-combs', slug: 'combinations', title: 'Combinations', content: t1Combinations, order: 3 },
  { id: 'math102-t1-pigeon', slug: 'pigeonhole-principle', title: 'Pigeonhole Principle', content: t1PigeonholePrinciple, order: 4 },
  { id: 'math102-t1-incexc', slug: 'inclusion-exclusion', title: 'Inclusion-Exclusion Principle', content: t1InclusionExclusion, order: 5 },
  { id: 'math102-t1-strat', slug: 'counting-strategies', title: 'Counting Strategies', content: t1CountingStrategies, order: 6 },
  { id: 'math102-t1-proofs', slug: 'combinatorial-proofs', title: 'Combinatorial Proofs', content: t1CombinatorialProofs, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'math102-t2-basics', slug: 'recurrence-basics', title: 'Recurrence Basics', content: t2RecurrenceBasics, order: 1 },
  { id: 'math102-t2-linear', slug: 'linear-homogeneous', title: 'Linear Homogeneous Recurrences', content: t2LinearHomogeneous, order: 2 },
  { id: 'math102-t2-nonhom', slug: 'non-homogeneous', title: 'Non-Homogeneous Recurrences', content: t2NonHomogeneous, order: 3 },
  { id: 'math102-t2-master', slug: 'master-theorem', title: 'Master Theorem', content: t2MasterTheorem, order: 4 },
  { id: 'math102-t2-genfunc', slug: 'generating-functions', title: 'Generating Functions', content: t2GeneratingFunctions, order: 5 },
  { id: 'math102-t2-solve', slug: 'solving-techniques', title: 'Solving Techniques', content: t2SolvingTechniques, order: 6 },
  { id: 'math102-t2-apps', slug: 'applications', title: 'Applications', content: t2Applications, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'math102-t3-defs', slug: 'graph-definitions', title: 'Graph Definitions', content: t3GraphDefinitions, order: 1 },
  { id: 'math102-t3-reps', slug: 'graph-representations', title: 'Graph Representations', content: t3GraphRepresentations, order: 2 },
  { id: 'math102-t3-paths', slug: 'paths-cycles', title: 'Paths and Cycles', content: t3PathsCycles, order: 3 },
  { id: 'math102-t3-trees', slug: 'trees-forests', title: 'Trees and Forests', content: t3TreesForests, order: 4 },
  { id: 'math102-t3-planar', slug: 'planar-coloring', title: 'Planar Graphs and Coloring', content: t3PlanarColoring, order: 5 },
  { id: 'math102-t3-special', slug: 'special-graphs', title: 'Special Graphs', content: t3SpecialGraphs, order: 6 },
  { id: 'math102-t3-probs', slug: 'graph-problems', title: 'Graph Problems', content: t3GraphProblems, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'math102-t4-bfsdfs', slug: 'bfs-dfs', title: 'BFS and DFS', content: t4BfsDfs, order: 1 },
  { id: 'math102-t4-shortest', slug: 'shortest-paths', title: 'Shortest Paths', content: t4ShortestPaths, order: 2 },
  { id: 'math102-t4-topo', slug: 'topological-sort', title: 'Topological Sort', content: t4TopologicalSort, order: 3 },
  { id: 'math102-t4-connected', slug: 'connected-components', title: 'Connected Components', content: t4ConnectedComponents, order: 4 },
  { id: 'math102-t4-mst', slug: 'minimum-spanning-trees', title: 'Minimum Spanning Trees', content: t4MinimumSpanningTrees, order: 5 },
  { id: 'math102-t4-flow', slug: 'network-flow', title: 'Network Flow', content: t4NetworkFlow, order: 6 },
  { id: 'math102-t4-adv', slug: 'graph-algorithms-advanced', title: 'Advanced Graph Algorithms', content: t4GraphAlgorithmsAdvanced, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'math102-t5-div', slug: 'divisibility-primes', title: 'Divisibility and Primes', content: t5DivisibilityPrimes, order: 1 },
  { id: 'math102-t5-mod', slug: 'modular-arithmetic', title: 'Modular Arithmetic', content: t5ModularArithmetic, order: 2 },
  { id: 'math102-t5-gcd', slug: 'gcd-euclidean', title: 'GCD and Euclidean Algorithm', content: t5GcdEuclidean, order: 3 },
  { id: 'math102-t5-factor', slug: 'prime-factorization', title: 'Prime Factorization', content: t5PrimeFactorization, order: 4 },
  { id: 'math102-t5-fermat', slug: 'fermats-eulers', title: "Fermat's and Euler's Theorems", content: t5FermatsEulers, order: 5 },
  { id: 'math102-t5-crypto', slug: 'cryptographic-applications', title: 'Cryptographic Applications', content: t5CryptographicApplications, order: 6 },
  { id: 'math102-t5-probs', slug: 'number-theory-problems', title: 'Number Theory Problems', content: t5NumberTheoryProblems, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'math102-t6-advcomb', slug: 'advanced-combinatorics', title: 'Advanced Combinatorics', content: t6AdvancedCombinatorics, order: 1 },
  { id: 'math102-t6-genfunc', slug: 'generating-functions', title: 'Generating Functions', content: t6GeneratingFunctions, order: 2 },
  { id: 'math102-t6-incexc', slug: 'inclusion-exclusion-principle', title: 'Inclusion-Exclusion Principle', content: t6InclusionExclusionPrinciple, order: 3 },
  { id: 'math102-t6-partition', slug: 'partition-theory', title: 'Partition Theory', content: t6PartitionTheory, order: 4 },
  { id: 'math102-t6-stirling', slug: 'stirling-numbers', title: 'Stirling Numbers', content: t6StirlingNumbers, order: 5 },
  { id: 'math102-t6-polya', slug: 'polya-enumeration', title: 'Pólya Enumeration', content: t6PolyaEnumeration, order: 6 },
  { id: 'math102-t6-probs', slug: 'advanced-counting-problems', title: 'Advanced Counting Problems', content: t6AdvancedCountingProblems, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'math102-t7-basics', slug: 'probability-basics', title: 'Probability Basics', content: t7ProbabilityBasics, order: 1 },
  { id: 'math102-t7-rv', slug: 'random-variables', title: 'Random Variables', content: t7RandomVariables, order: 2 },
  { id: 'math102-t7-cond', slug: 'conditional-probability', title: 'Conditional Probability', content: t7ConditionalProbability, order: 3 },
  { id: 'math102-t7-discrete', slug: 'discrete-distributions', title: 'Discrete Distributions', content: t7DiscreteDistributions, order: 4 },
  { id: 'math102-t7-expect', slug: 'expectation-variance', title: 'Expectation and Variance', content: t7ExpectationVariance, order: 5 },
  { id: 'math102-t7-analysis', slug: 'probabilistic-analysis', title: 'Probabilistic Analysis', content: t7ProbabilisticAnalysis, order: 6 },
  { id: 'math102-t7-probs', slug: 'probability-problems', title: 'Probability Problems', content: t7ProbabilityProblems, order: 7 },
];

export const math102Topics: Topic[] = [
  {
    id: 'math102-1',
    title: 'Combinatorics',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['math102-q1', 'math102-q1b', 'math102-q1c'],
    exerciseIds: ['math102-e1', 'math102-t1-ex02', 'math102-t1-ex03', 'math102-t1-ex04', 'math102-t1-ex05', 'math102-t1-ex06', 'math102-t1-ex07', 'math102-t1-ex08', 'math102-t1-ex09', 'math102-t1-ex10', 'math102-t1-ex11', 'math102-t1-ex12', 'math102-t1-ex13', 'math102-t1-ex14', 'math102-t1-ex15', 'math102-t1-ex16']
  },
  {
    id: 'math102-2',
    title: 'Recurrence Relations',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['math102-q2', 'math102-q2b', 'math102-q2c'],
    exerciseIds: ['math102-e2', 'math102-t2-ex02', 'math102-t2-ex03', 'math102-t2-ex04', 'math102-t2-ex05', 'math102-t2-ex06', 'math102-t2-ex07', 'math102-t2-ex08', 'math102-t2-ex09', 'math102-t2-ex10', 'math102-t2-ex11', 'math102-t2-ex12', 'math102-t2-ex13', 'math102-t2-ex14', 'math102-t2-ex15', 'math102-t2-ex16']
  },
  {
    id: 'math102-3',
    title: 'Graph Theory Basics',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['math102-q3', 'math102-q3b', 'math102-q3c'],
    exerciseIds: ['math102-e3', 'math102-t3-ex02', 'math102-t3-ex03', 'math102-t3-ex04', 'math102-t3-ex05', 'math102-t3-ex06', 'math102-t3-ex07', 'math102-t3-ex08', 'math102-t3-ex09', 'math102-t3-ex10', 'math102-t3-ex11', 'math102-t3-ex12', 'math102-t3-ex13', 'math102-t3-ex14', 'math102-t3-ex15', 'math102-t3-ex16']
  },
  {
    id: 'math102-4',
    title: 'Graph Algorithms',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['math102-q4', 'math102-q4b', 'math102-q4c'],
    exerciseIds: ['math102-e4', 'math102-t4-ex02', 'math102-t4-ex03', 'math102-t4-ex04', 'math102-t4-ex05', 'math102-t4-ex06', 'math102-t4-ex07', 'math102-t4-ex08', 'math102-t4-ex09', 'math102-t4-ex10', 'math102-t4-ex11', 'math102-t4-ex12', 'math102-t4-ex13', 'math102-t4-ex14', 'math102-t4-ex15', 'math102-t4-ex16']
  },
  {
    id: 'math102-5',
    title: 'Number Theory',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['math102-q5', 'math102-q5b', 'math102-q5c'],
    exerciseIds: ['math102-e5', 'math102-t5-ex02', 'math102-t5-ex03', 'math102-t5-ex04', 'math102-t5-ex05', 'math102-t5-ex06', 'math102-t5-ex07', 'math102-t5-ex08', 'math102-t5-ex09', 'math102-t5-ex10', 'math102-t5-ex11', 'math102-t5-ex12', 'math102-t5-ex13', 'math102-t5-ex14', 'math102-t5-ex15', 'math102-t5-ex16']
  },
  {
    id: 'math102-6',
    title: 'Advanced Counting Techniques',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['math102-q6', 'math102-q6b', 'math102-q6c'],
    exerciseIds: ['math102-t6-ex01', 'math102-t6-ex02', 'math102-t6-ex03', 'math102-t6-ex04', 'math102-t6-ex05', 'math102-t6-ex06', 'math102-t6-ex07', 'math102-t6-ex08', 'math102-t6-ex09', 'math102-t6-ex10', 'math102-t6-ex11', 'math102-t6-ex12', 'math102-t6-ex13', 'math102-t6-ex14', 'math102-t6-ex15', 'math102-t6-ex16']
  },
  {
    id: 'math102-7',
    title: 'Probability Foundations',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['math102-q7', 'math102-q7b', 'math102-q7c'],
    exerciseIds: ['math102-t7-ex01', 'math102-t7-ex02', 'math102-t7-ex03', 'math102-t7-ex04', 'math102-t7-ex05', 'math102-t7-ex06', 'math102-t7-ex07', 'math102-t7-ex08', 'math102-t7-ex09', 'math102-t7-ex10', 'math102-t7-ex11', 'math102-t7-ex12', 'math102-t7-ex13', 'math102-t7-ex14', 'math102-t7-ex15', 'math102-t7-ex16']
  }
];
