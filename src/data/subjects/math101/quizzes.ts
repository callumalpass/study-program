import { Quiz } from '../../../core/types';

export const math101Quizzes: Quiz[] = [
  {
    id: 'math101-quiz-1',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    title: 'Propositional Logic Quiz',
    questions: [
      {
        id: 'math101-q1-1',
        type: 'multiple_choice',
        prompt: 'What is the negation of the proposition "It is raining AND it is cold"?',
        options: [
          'It is not raining AND it is not cold',
          'It is not raining OR it is not cold',
          'It is raining OR it is cold',
          'It is not raining AND it is cold'
        ],
        correctAnswer: 1,
        explanation: 'By De Morgan\'s Law, the negation of (P ∧ Q) is (¬P ∨ ¬Q). So "NOT (raining AND cold)" becomes "NOT raining OR NOT cold".'
      },
      {
        id: 'math101-q1-2',
        type: 'true_false',
        prompt: 'The proposition (P → Q) is logically equivalent to (¬P ∨ Q).',
        correctAnswer: true,
        explanation: 'This is correct. The implication P → Q is true in all cases except when P is true and Q is false, which matches the truth table for ¬P ∨ Q.'
      },
      {
        id: 'math101-q1-3',
        type: 'multiple_choice',
        prompt: 'Which of the following is a tautology?',
        options: [
          'P ∧ ¬P',
          'P ∨ ¬P',
          'P → ¬P',
          'P ∧ Q'
        ],
        correctAnswer: 1,
        explanation: 'P ∨ ¬P (the law of excluded middle) is always true regardless of the truth value of P. Either P is true or its negation is true.'
      }
    ]
  },
  {
    id: 'math101-quiz-2',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    title: 'Proof Techniques Quiz',
    questions: [
      {
        id: 'math101-q2-1',
        type: 'multiple_choice',
        prompt: 'To prove "If n² is even, then n is even" by contrapositive, what should you prove?',
        options: [
          'If n is even, then n² is even',
          'If n is odd, then n² is odd',
          'If n² is odd, then n is odd',
          'If n is not even, then n² is not even'
        ],
        correctAnswer: 1,
        explanation: 'The contrapositive of "If P then Q" is "If not Q then not P". So we prove: if n is not even (i.e., odd), then n² is not even (i.e., odd).'
      },
      {
        id: 'math101-q2-2',
        type: 'true_false',
        prompt: 'In proof by contradiction, we assume what we want to prove is true and derive a contradiction.',
        correctAnswer: false,
        explanation: 'False. In proof by contradiction, we assume the NEGATION of what we want to prove is true, and then derive a contradiction from this assumption.'
      },
      {
        id: 'math101-q2-3',
        type: 'multiple_choice',
        prompt: 'In mathematical induction, what must be shown in the inductive step?',
        options: [
          'The statement is true for n = 1',
          'The statement is true for all n',
          'If the statement is true for n = k, then it is true for n = k + 1',
          'The statement is false for some n'
        ],
        correctAnswer: 2,
        explanation: 'The inductive step proves that if the statement holds for an arbitrary value k, it must also hold for k+1. This creates a chain of implications.'
      }
    ]
  },
  {
    id: 'math101-quiz-3',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    title: 'Sets and Set Operations Quiz',
    questions: [
      {
        id: 'math101-q3-1',
        type: 'multiple_choice',
        prompt: 'If A = {1, 2, 3} and B = {3, 4, 5}, what is A ∩ B?',
        options: [
          '{1, 2, 3, 4, 5}',
          '{3}',
          '{1, 2}',
          '∅'
        ],
        correctAnswer: 1,
        explanation: 'The intersection A ∩ B contains only elements that are in both A and B. The only element common to both sets is 3.'
      },
      {
        id: 'math101-q3-2',
        type: 'multiple_choice',
        prompt: 'How many elements are in the power set of a set with 4 elements?',
        options: [
          '4',
          '8',
          '16',
          '32'
        ],
        correctAnswer: 2,
        explanation: 'The power set of a set with n elements has 2^n elements. For n = 4, we get 2^4 = 16 subsets (including the empty set and the set itself).'
      },
      {
        id: 'math101-q3-3',
        type: 'true_false',
        prompt: 'For any set A, the empty set ∅ is a subset of A.',
        correctAnswer: true,
        explanation: 'True. The empty set is a subset of every set. This is because there are no elements in ∅ that could fail to be in A.'
      }
    ]
  },
  {
    id: 'math101-quiz-4',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    title: 'Relations Quiz',
    questions: [
      {
        id: 'math101-q4-1',
        type: 'multiple_choice',
        prompt: 'Which property does the relation "less than" (<) on integers NOT have?',
        options: [
          'Transitive',
          'Antisymmetric',
          'Reflexive',
          'Irreflexive'
        ],
        correctAnswer: 2,
        explanation: 'The < relation is not reflexive because no number is less than itself. It is transitive (a<b and b<c implies a<c) and antisymmetric.'
      },
      {
        id: 'math101-q4-2',
        type: 'true_false',
        prompt: 'An equivalence relation partitions a set into disjoint equivalence classes.',
        correctAnswer: true,
        explanation: 'True. Every equivalence relation creates a partition of the set into disjoint equivalence classes, where each element belongs to exactly one class.'
      },
      {
        id: 'math101-q4-3',
        type: 'multiple_choice',
        prompt: 'Which combination of properties defines an equivalence relation?',
        options: [
          'Reflexive, symmetric, transitive',
          'Reflexive, antisymmetric, transitive',
          'Symmetric, antisymmetric, transitive',
          'Reflexive, symmetric, antisymmetric'
        ],
        correctAnswer: 0,
        explanation: 'An equivalence relation must be reflexive (aRa), symmetric (aRb implies bRa), and transitive (aRb and bRc implies aRc).'
      }
    ]
  },
  {
    id: 'math101-quiz-5',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    title: 'Functions Quiz',
    questions: [
      {
        id: 'math101-q5-1',
        type: 'multiple_choice',
        prompt: 'A function f: ℝ → ℝ defined by f(x) = x² is:',
        options: [
          'Injective but not surjective',
          'Surjective but not injective',
          'Both injective and surjective',
          'Neither injective nor surjective'
        ],
        correctAnswer: 3,
        explanation: 'f(x) = x² is not injective because f(-2) = f(2) = 4. It is not surjective because negative numbers are not in the range. So it is neither.'
      },
      {
        id: 'math101-q5-2',
        type: 'true_false',
        prompt: 'Every bijective function has an inverse function.',
        correctAnswer: true,
        explanation: 'True. A function must be bijective (both injective and surjective) to have an inverse. The inverse reverses the mapping of the original function.'
      },
      {
        id: 'math101-q5-3',
        type: 'multiple_choice',
        prompt: 'If f(x) = 2x + 1 and g(x) = x², what is (g ∘ f)(3)?',
        options: [
          '19',
          '49',
          '14',
          '50'
        ],
        correctAnswer: 1,
        explanation: '(g ∘ f)(3) = g(f(3)) = g(2·3 + 1) = g(7) = 7² = 49.'
      }
    ]
  }
];
