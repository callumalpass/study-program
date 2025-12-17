import type { Exam, QuizQuestion } from '../../../core/types';

const midtermQuestions: QuizQuestion[] = [
  {
    id: 'cs403-mid-q1',
    type: 'multiple_choice',
    prompt: 'Which statement about P and NP is correct?',
    options: [
      'P ⊆ NP',
      'NP ⊆ P',
      'P = NP has been proven',
      'P and NP are disjoint'
    ],
    correctAnswer: 'P ⊆ NP',
    explanation: 'Every problem solvable in polynomial time can also be verified in polynomial time, so P ⊆ NP. Whether P = NP remains unknown.'
  },
  {
    id: 'cs403-mid-q2',
    type: 'multiple_choice',
    prompt: 'To prove a problem B is NP-complete, you must show:',
    options: [
      'B ∈ NP and reduce a known NP-complete problem A to B',
      'B ∈ NP only',
      'B is harder than all problems in NP',
      'B reduces to SAT'
    ],
    correctAnswer: 'B ∈ NP and reduce a known NP-complete problem A to B',
    explanation: 'NP-completeness requires showing (1) B is in NP and (2) B is NP-hard by reducing a known NP-complete problem to it.'
  },
  // Add 18 more midterm questions covering topics 1-4
];

const finalQuestions: QuizQuestion[] = [
  {
    id: 'cs403-final-q1',
    type: 'multiple_choice',
    prompt: 'What is the best known approximation ratio for metric TSP?',
    options: ['1.5 (Christofides)', '2', 'O(log n)', 'No approximation exists'],
    correctAnswer: '1.5 (Christofides)',
    explanation: 'Christofides algorithm achieves 1.5-approximation for metric TSP and held the record for over 40 years.'
  },
  // Add comprehensive final exam questions
];

export const cs403Exams: Exam[] = [
  {
    id: 'cs403-midterm',
    subjectId: 'cs403',
    title: 'CS403 Midterm Exam',
    durationMinutes: 120,
    questions: midtermQuestions
  },
  {
    id: 'cs403-final',
    subjectId: 'cs403',
    title: 'CS403 Final Exam',
    durationMinutes: 180,
    questions: finalQuestions
  }
];
