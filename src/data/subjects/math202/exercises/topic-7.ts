import { WrittenExercise } from '../../../../core/types';

export const math202Topic7Exercises: WrittenExercise[] = [
  {
    id: 'math202-t7-ex01',
    subjectId: 'math202',
    topicId: 'math202-7',
    type: 'written',
    title: 'Bayesian vs Frequentist Philosophy',
    description: 'Explain the fundamental philosophical difference between Bayesian and frequentist approaches to probability and inference.',
    difficulty: 2,
    hints: [
      'Consider how each treats parameters',
      'Think about the role of prior knowledge'
    ],
    solution: 'Frequentist approach:\n- Parameters are fixed but unknown constants\n- Probability is long-run frequency\n- Inference based solely on data (likelihood)\n- No prior knowledge incorporated\n- Example: "95% CI means in repeated sampling, 95% of intervals contain θ"\n\nBayesian approach:\n- Parameters are random variables with probability distributions\n- Probability represents degree of belief/uncertainty\n- Combines prior knowledge with data (posterior ∝ likelihood × prior)\n- Updates beliefs as evidence accumulates\n- Example: "95% credible interval means θ has 95% probability of being in the interval"\n\nKey difference: Bayesian treats unknown parameter as uncertain (has distribution), frequentist treats it as fixed (only data varies).'
  }
];
