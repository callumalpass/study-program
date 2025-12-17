import { Quiz } from '../../../core/types';

export const math402Quizzes: Quiz[] = [
  {
    id: 'math402-quiz-1',
    subjectId: 'math402',
    topicId: 'topic-1',
    title: 'Error Analysis Fundamentals',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is machine epsilon (ε_mach) for double precision floating-point?',
        options: [
          '2^{-23} ≈ 1.19 × 10^{-7}',
          '2^{-52} ≈ 2.22 × 10^{-16}',
          '2^{-64} ≈ 5.42 × 10^{-20}',
          '2^{-128}'
        ],
        correctAnswer: 1,
        explanation: 'Double precision uses 52 bits for the mantissa, so machine epsilon is 2^{-52}'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which operation is most prone to catastrophic cancellation?',
        options: [
          'Addition of numbers with similar magnitudes',
          'Subtraction of nearly equal numbers',
          'Multiplication of small numbers',
          'Division by large numbers'
        ],
        correctAnswer: 1,
        explanation: 'Subtracting nearly equal numbers loses significant digits, causing catastrophic cancellation'
      }
    ]
  },
  {
    id: 'math402-quiz-2',
    subjectId: 'math402',
    topicId: 'topic-2',
    title: 'Root Finding Methods',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the convergence order of Newton\'s method for a simple root?',
        options: ['Linear', 'Superlinear (≈1.618)', 'Quadratic', 'Cubic'],
        correctAnswer: 2,
        explanation: 'Newton\'s method has quadratic convergence (order 2) for simple roots'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which method requires two initial guesses?',
        options: ['Bisection', 'Newton', 'Secant', 'Fixed-point'],
        correctAnswer: 2,
        explanation: 'The secant method needs two initial guesses to approximate the derivative'
      }
    ]
  }
];
