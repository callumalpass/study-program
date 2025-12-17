import type { Quiz } from '../../../core/types';

export const quizzes: Quiz[] = [
  {
    id: 'math404-quiz-1',
    subjectId: 'math404',
    topicId: 'topic-1',
    title: 'Problem Formulation Quiz',
    questions: [
      {
        id: 'math404-q1-1',
        type: 'multiple_choice',
        prompt: 'Which of the following is NOT a component of an optimization problem?',
        options: [
          'Decision variables',
          'Objective function',
          'Constraints',
          'Probability distribution'
        ],
        correctAnswer: 3,
        explanation: 'Probability distributions are relevant for stochastic optimization but not required for deterministic optimization problems.'
      },
      {
        id: 'math404-q1-2',
        type: 'true_false',
        prompt: 'Every local minimum of a convex optimization problem is also a global minimum.',
        correctAnswer: true,
        explanation: 'This is a fundamental property of convex optimization. Convexity guarantees that local optima are global.'
      },
      {
        id: 'math404-q1-3',
        type: 'multiple_choice',
        prompt: 'For an unconstrained optimization problem, what is the first-order necessary condition for a local minimum at x*?',
        options: [
          '∇f(x*) > 0',
          '∇f(x*) = 0',
          '∇²f(x*) > 0',
          'f(x*) = 0'
        ],
        correctAnswer: 1,
        explanation: 'At a local minimum, the gradient must vanish: ∇f(x*) = 0. This is the first-order necessary condition (FONC).'
      }
    ]
  },
  {
    id: 'math404-quiz-2',
    subjectId: 'math404',
    topicId: 'topic-2',
    title: 'Linear Programming Quiz',
    questions: [
      {
        id: 'math404-q2-1',
        type: 'multiple_choice',
        prompt: 'In standard form LP, what type of constraints are used?',
        options: [
          'Only inequalities ≤',
          'Only inequalities ≥',
          'Only equalities with x ≥ 0',
          'Mix of equalities and inequalities'
        ],
        correctAnswer: 2,
        explanation: 'Standard form LP has: min c^T x s.t. Ax = b, x ≥ 0 (equalities with nonnegativity)'
      },
      {
        id: 'math404-q2-2',
        type: 'true_false',
        prompt: 'The simplex algorithm always finds the optimal solution in polynomial time.',
        correctAnswer: false,
        explanation: 'The simplex algorithm has exponential worst-case complexity, though it performs well in practice.'
      }
    ]
  },
  {
    id: 'math404-quiz-3',
    subjectId: 'math404',
    topicId: 'topic-3',
    title: 'Duality Theory Quiz',
    questions: [
      {
        id: 'math404-q3-1',
        type: 'multiple_choice',
        prompt: 'What does weak duality guarantee for a primal maximization LP and its dual?',
        options: [
          'Primal optimal ≤ Dual optimal',
          'Primal optimal ≥ Dual optimal',
          'Primal optimal = Dual optimal',
          'No relationship exists'
        ],
        correctAnswer: 0,
        explanation: 'Weak duality states that any dual feasible solution provides an upper bound on the primal optimal value.'
      },
      {
        id: 'math404-q3-2',
        type: 'true_false',
        prompt: 'If both primal and dual have feasible solutions, strong duality holds.',
        correctAnswer: true,
        explanation: 'For linear programs, if both primal and dual are feasible, both have optimal solutions with equal values.'
      }
    ]
  },
  {
    id: 'math404-quiz-4',
    subjectId: 'math404',
    topicId: 'topic-4',
    title: 'Convex Sets and Functions Quiz',
    questions: [
      {
        id: 'math404-q4-1',
        type: 'multiple_choice',
        prompt: 'Which operation preserves convexity of a function?',
        options: [
          'Taking the minimum of two convex functions',
          'Taking the maximum of two convex functions',
          'Multiplying by -1',
          'Composing with any function'
        ],
        correctAnswer: 1,
        explanation: 'The pointwise maximum of convex functions is convex. Minimum can give non-convex results.'
      },
      {
        id: 'math404-q4-2',
        type: 'true_false',
        prompt: 'The intersection of two convex sets is always convex.',
        correctAnswer: true,
        explanation: 'The intersection of any collection of convex sets is convex.'
      }
    ]
  },
  {
    id: 'math404-quiz-5',
    subjectId: 'math404',
    topicId: 'topic-5',
    title: 'Convex Optimization Quiz',
    questions: [
      {
        id: 'math404-q5-1',
        type: 'multiple_choice',
        prompt: 'What makes semidefinite programming (SDP) special?',
        options: [
          'Variables are vectors',
          'Constraints include matrix positive semidefiniteness',
          'Only linear objectives allowed',
          'Always has integer solutions'
        ],
        correctAnswer: 1,
        explanation: 'SDP has constraints of the form X ⪰ 0 (matrix is positive semidefinite).'
      }
    ]
  },
  {
    id: 'math404-quiz-6',
    subjectId: 'math404',
    topicId: 'topic-6',
    title: 'Gradient Methods Quiz',
    questions: [
      {
        id: 'math404-q6-1',
        type: 'multiple_choice',
        prompt: 'What determines the convergence rate of gradient descent on a quadratic function?',
        options: [
          'The objective value',
          'The condition number of the Hessian',
          'The dimension of the problem',
          'The initial point'
        ],
        correctAnswer: 1,
        explanation: 'The condition number κ = λ_max/λ_min determines convergence rate: (κ-1)/(κ+1).'
      },
      {
        id: 'math404-q6-2',
        type: 'true_false',
        prompt: 'Newton\'s method converges quadratically near the optimum.',
        correctAnswer: true,
        explanation: 'Newton\'s method achieves quadratic convergence when started sufficiently close to the optimum.'
      }
    ]
  },
  {
    id: 'math404-quiz-7',
    subjectId: 'math404',
    topicId: 'topic-7',
    title: 'Constrained Optimization Quiz',
    questions: [
      {
        id: 'math404-q7-1',
        type: 'multiple_choice',
        prompt: 'What does complementary slackness require?',
        options: [
          'All constraints are active',
          'All multipliers are positive',
          'λᵢgᵢ(x) = 0 for all i',
          'The gradient is zero'
        ],
        correctAnswer: 2,
        explanation: 'Complementary slackness: either the constraint is active (gᵢ = 0) or its multiplier is zero (λᵢ = 0).'
      },
      {
        id: 'math404-q7-2',
        type: 'true_false',
        prompt: 'KKT conditions are sufficient for optimality in convex problems.',
        correctAnswer: true,
        explanation: 'For convex problems with constraint qualification, KKT conditions are both necessary and sufficient.'
      }
    ]
  }
];

export default quizzes;
