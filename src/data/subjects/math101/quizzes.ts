import { Quiz } from '../../../core/types';

export const math101Quizzes: Quiz[] = [
  // ============================================================================
  // TOPIC 1: Propositional Logic (3 quizzes)
  // ============================================================================
  {
    id: 'math101-quiz-1a',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    title: 'Propositional Logic - Fundamentals',
    questions: [
      {
        id: 'math101-q1a-1',
        type: 'multiple_choice',
        prompt: 'Which of the following is a proposition?',
        options: [
          'Close the door.',
          'What time is it?',
          'x + 5 = 10',
          'The Earth is flat.'
        ],
        correctAnswer: 3,
        explanation: 'A proposition is a declarative statement that is either true or false. "The Earth is flat" is a proposition (it\'s false, but it\'s still a proposition). Commands, questions, and statements with variables are not propositions.'
      },
      {
        id: 'math101-q1a-2',
        type: 'true_false',
        prompt: 'The negation of "It is raining" is "It is sunny."',
        correctAnswer: false,
        explanation: 'The negation of "It is raining" is "It is NOT raining." The weather could be cloudy, snowy, etc. without being sunny.'
      },
      {
        id: 'math101-q1a-3',
        type: 'multiple_choice',
        prompt: 'What is the truth value of P ∧ Q when P is True and Q is False?',
        options: ['True', 'False', 'Unknown', 'Neither'],
        correctAnswer: 1,
        explanation: 'The conjunction (AND) is only true when BOTH operands are true. Since Q is False, P ∧ Q is False.'
      },
      {
        id: 'math101-q1a-4',
        type: 'multiple_choice',
        prompt: 'What is the truth value of P ∨ Q when P is False and Q is True?',
        options: ['True', 'False', 'Unknown', 'Neither'],
        correctAnswer: 0,
        explanation: 'The disjunction (OR) is true when AT LEAST ONE operand is true. Since Q is True, P ∨ Q is True.'
      },
      {
        id: 'math101-q1a-5',
        type: 'true_false',
        prompt: 'The implication P → Q is only false when P is true and Q is false.',
        correctAnswer: true,
        explanation: 'The implication is false only when the hypothesis (P) is true but the conclusion (Q) is false. In all other cases, the implication is true.'
      }
    ]
  },
  {
    id: 'math101-quiz-1b',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    title: 'Propositional Logic - Application',
    questions: [
      {
        id: 'math101-q1b-1',
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
        id: 'math101-q1b-2',
        type: 'true_false',
        prompt: 'The proposition (P → Q) is logically equivalent to (¬P ∨ Q).',
        correctAnswer: true,
        explanation: 'This is correct. The implication P → Q is true in all cases except when P is true and Q is false, which matches the truth table for ¬P ∨ Q.'
      },
      {
        id: 'math101-q1b-3',
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
      },
      {
        id: 'math101-q1b-4',
        type: 'multiple_choice',
        prompt: 'What is the contrapositive of "If it rains, then the ground is wet"?',
        options: [
          'If it does not rain, then the ground is not wet',
          'If the ground is wet, then it rains',
          'If the ground is not wet, then it does not rain',
          'If it rains, then the ground is not wet'
        ],
        correctAnswer: 2,
        explanation: 'The contrapositive of P → Q is ¬Q → ¬P. So "If it rains → ground is wet" becomes "If ground is NOT wet → it does NOT rain."'
      },
      {
        id: 'math101-q1b-5',
        type: 'fill_blank',
        prompt: 'The logical connective that is true only when exactly one of its operands is true is called ____.',
        correctAnswer: 'xor',
        explanation: 'XOR (exclusive or) is true when exactly one of the operands is true, unlike OR which is also true when both are true.'
      }
    ]
  },
  {
    id: 'math101-quiz-1c',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    title: 'Propositional Logic - Advanced',
    questions: [
      {
        id: 'math101-q1c-1',
        type: 'multiple_choice',
        prompt: 'Which of the following is logically equivalent to ¬(P → Q)?',
        options: [
          '¬P → ¬Q',
          'P ∧ ¬Q',
          '¬P ∨ Q',
          'P → ¬Q'
        ],
        correctAnswer: 1,
        explanation: 'The negation of an implication: ¬(P → Q) ≡ ¬(¬P ∨ Q) ≡ P ∧ ¬Q. "It is NOT the case that if P then Q" means "P is true AND Q is false."'
      },
      {
        id: 'math101-q1c-2',
        type: 'true_false',
        prompt: 'If P → Q and Q → R are both true, then P → R must also be true.',
        correctAnswer: true,
        explanation: 'This is the law of syllogism (transitivity of implication). If P implies Q and Q implies R, then P implies R.'
      },
      {
        id: 'math101-q1c-3',
        type: 'multiple_choice',
        prompt: 'Which statement is equivalent to "p only if q"?',
        options: [
          'q → p',
          'p → q',
          'p ↔ q',
          '¬p → q'
        ],
        correctAnswer: 1,
        explanation: '"p only if q" means that p cannot be true unless q is also true, which is expressed as p → q.'
      },
      {
        id: 'math101-q1c-4',
        type: 'multiple_choice',
        prompt: 'What is the result of applying De Morgan\'s Law to ¬(¬P ∨ Q)?',
        options: [
          'P ∧ ¬Q',
          '¬P ∧ Q',
          'P ∨ ¬Q',
          '¬P ∨ ¬Q'
        ],
        correctAnswer: 0,
        explanation: '¬(¬P ∨ Q) = ¬(¬P) ∧ ¬Q = P ∧ ¬Q by De Morgan\'s Law and double negation.'
      },
      {
        id: 'math101-q1c-5',
        type: 'true_false',
        prompt: 'The biconditional P ↔ Q is equivalent to (P → Q) ∧ (Q → P).',
        correctAnswer: true,
        explanation: 'The biconditional "P if and only if Q" means both implications hold: P implies Q AND Q implies P.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 2: Proof Techniques (3 quizzes)
  // ============================================================================
  {
    id: 'math101-quiz-2a',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    title: 'Proof Techniques - Fundamentals',
    questions: [
      {
        id: 'math101-q2a-1',
        type: 'multiple_choice',
        prompt: 'In a direct proof of "If P, then Q", what do you assume and what do you show?',
        options: [
          'Assume Q, show P',
          'Assume P, show Q',
          'Assume ¬P, show ¬Q',
          'Assume ¬Q, show ¬P'
        ],
        correctAnswer: 1,
        explanation: 'In a direct proof, you assume the hypothesis P is true and use logical steps to show that the conclusion Q follows.'
      },
      {
        id: 'math101-q2a-2',
        type: 'true_false',
        prompt: 'In proof by contradiction, we assume what we want to prove is true and derive a contradiction.',
        correctAnswer: false,
        explanation: 'False. In proof by contradiction, we assume the NEGATION of what we want to prove is true, and then derive a contradiction from this assumption.'
      },
      {
        id: 'math101-q2a-3',
        type: 'multiple_choice',
        prompt: 'What is the contrapositive of "If n² is even, then n is even"?',
        options: [
          'If n is even, then n² is even',
          'If n is odd, then n² is odd',
          'If n² is odd, then n is odd',
          'If n is not even, then n² is not even'
        ],
        correctAnswer: 1,
        explanation: 'The contrapositive of "If P then Q" is "If not Q then not P". So we prove: if n is not even (odd), then n² is not even (odd).'
      },
      {
        id: 'math101-q2a-4',
        type: 'multiple_choice',
        prompt: 'Which proof technique is best suited for proving "√2 is irrational"?',
        options: [
          'Direct proof',
          'Proof by contrapositive',
          'Proof by contradiction',
          'Proof by cases'
        ],
        correctAnswer: 2,
        explanation: 'The classic proof of √2 being irrational uses contradiction: assume √2 = a/b in lowest terms, derive that both a and b must be even, contradicting "lowest terms."'
      },
      {
        id: 'math101-q2a-5',
        type: 'true_false',
        prompt: 'A proof by contrapositive is logically equivalent to a direct proof of the original statement.',
        correctAnswer: true,
        explanation: 'Yes, because P → Q is logically equivalent to ¬Q → ¬P. Proving the contrapositive is just as valid as proving the original implication.'
      }
    ]
  },
  {
    id: 'math101-quiz-2b',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    title: 'Proof Techniques - Application',
    questions: [
      {
        id: 'math101-q2b-1',
        type: 'multiple_choice',
        prompt: 'In mathematical induction, what must be shown in the base case?',
        options: [
          'The statement is true for all n',
          'The statement is true for n = 1 (or the starting value)',
          'If true for n = k, then true for n = k + 1',
          'The statement is false for some n'
        ],
        correctAnswer: 1,
        explanation: 'The base case establishes that the statement holds for the starting value (usually n = 1 or n = 0).'
      },
      {
        id: 'math101-q2b-2',
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
      },
      {
        id: 'math101-q2b-3',
        type: 'true_false',
        prompt: 'To prove "There exists an x such that P(x)", it suffices to find one specific value of x for which P(x) is true.',
        correctAnswer: true,
        explanation: 'Existential statements only require one witness. Finding any single value that satisfies the property proves the existence claim.'
      },
      {
        id: 'math101-q2b-4',
        type: 'multiple_choice',
        prompt: 'What is a counterexample?',
        options: [
          'An example that proves a universal statement',
          'An example that disproves a universal statement',
          'A proof by contradiction',
          'The contrapositive of an example'
        ],
        correctAnswer: 1,
        explanation: 'A counterexample is a specific case that shows a universal statement is false. One counterexample is sufficient to disprove "For all x, P(x)."'
      },
      {
        id: 'math101-q2b-5',
        type: 'fill_blank',
        prompt: 'In strong induction, the inductive hypothesis assumes the statement is true for all values from the base case up to ____.',
        correctAnswer: 'k',
        explanation: 'In strong induction, we assume P(1), P(2), ..., P(k) are all true (not just P(k)), and then prove P(k+1).'
      }
    ]
  },
  {
    id: 'math101-quiz-2c',
    subjectId: 'math101',
    topicId: 'math101-topic-2',
    title: 'Proof Techniques - Advanced',
    questions: [
      {
        id: 'math101-q2c-1',
        type: 'multiple_choice',
        prompt: 'Which proof technique divides the proof into several exhaustive scenarios?',
        options: [
          'Direct proof',
          'Proof by contradiction',
          'Proof by cases',
          'Proof by induction'
        ],
        correctAnswer: 2,
        explanation: 'Proof by cases (or proof by exhaustion) divides the problem into all possible cases and proves each one separately.'
      },
      {
        id: 'math101-q2c-2',
        type: 'true_false',
        prompt: 'If you can prove P → Q and P → ¬Q from assuming P, this proves P is false.',
        correctAnswer: true,
        explanation: 'If assuming P leads to both Q and ¬Q, we have derived a contradiction (Q ∧ ¬Q). This means our assumption P must be false.'
      },
      {
        id: 'math101-q2c-3',
        type: 'multiple_choice',
        prompt: 'To prove "For all integers n, if n² is odd, then n is odd" by contrapositive, what would you prove?',
        options: [
          'If n is odd, then n² is odd',
          'If n is even, then n² is even',
          'If n² is even, then n is even',
          'There exists n such that n² is odd and n is even'
        ],
        correctAnswer: 1,
        explanation: 'The contrapositive of "n² odd → n odd" is "n not odd → n² not odd", i.e., "n even → n² even."'
      },
      {
        id: 'math101-q2c-4',
        type: 'multiple_choice',
        prompt: 'What distinguishes a constructive existence proof from a non-constructive one?',
        options: [
          'Constructive proofs are shorter',
          'Constructive proofs actually exhibit a witness satisfying the property',
          'Non-constructive proofs use contradiction',
          'Constructive proofs only work for finite sets'
        ],
        correctAnswer: 1,
        explanation: 'A constructive proof provides an explicit example or method to find an object satisfying the property. Non-constructive proofs show existence without providing a specific example.'
      },
      {
        id: 'math101-q2c-5',
        type: 'true_false',
        prompt: 'In proof by smallest counterexample, you assume there exists a counterexample and consider the smallest one.',
        correctAnswer: true,
        explanation: 'This technique combines contradiction with the well-ordering principle. If counterexamples exist, a smallest one exists, and showing this leads to a smaller counterexample gives a contradiction.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 3: Sets and Set Operations (3 quizzes)
  // ============================================================================
  {
    id: 'math101-quiz-3a',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    title: 'Sets and Set Operations - Fundamentals',
    questions: [
      {
        id: 'math101-q3a-1',
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
        id: 'math101-q3a-2',
        type: 'multiple_choice',
        prompt: 'If A = {1, 2, 3} and B = {3, 4, 5}, what is A ∪ B?',
        options: [
          '{1, 2, 3, 4, 5}',
          '{3}',
          '{1, 2, 4, 5}',
          '{1, 2}'
        ],
        correctAnswer: 0,
        explanation: 'The union A ∪ B contains all elements that are in A OR in B (or both). Combined: {1, 2, 3, 4, 5}.'
      },
      {
        id: 'math101-q3a-3',
        type: 'true_false',
        prompt: 'For any set A, the empty set ∅ is a subset of A.',
        correctAnswer: true,
        explanation: 'True. The empty set is a subset of every set. This is because there are no elements in ∅ that could fail to be in A.'
      },
      {
        id: 'math101-q3a-4',
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
        id: 'math101-q3a-5',
        type: 'fill_blank',
        prompt: 'The set containing all elements that are in A but not in B is called the set ____ of B from A.',
        correctAnswer: 'difference',
        explanation: 'The set difference A - B (or A \\ B) contains elements in A that are not in B.'
      }
    ]
  },
  {
    id: 'math101-quiz-3b',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    title: 'Sets and Set Operations - Application',
    questions: [
      {
        id: 'math101-q3b-1',
        type: 'multiple_choice',
        prompt: 'If U = {1, 2, 3, 4, 5} is the universal set and A = {1, 3, 5}, what is the complement of A?',
        options: [
          '{1, 3, 5}',
          '{2, 4}',
          '{1, 2, 3, 4, 5}',
          '∅'
        ],
        correctAnswer: 1,
        explanation: 'The complement of A contains all elements in the universal set U that are NOT in A. Ā = U - A = {2, 4}.'
      },
      {
        id: 'math101-q3b-2',
        type: 'true_false',
        prompt: 'For any sets A and B: A - B = A ∩ B̄ (where B̄ is the complement of B).',
        correctAnswer: true,
        explanation: 'Yes, the set difference A - B is equivalent to the intersection of A with the complement of B. Both represent "elements in A but not in B."'
      },
      {
        id: 'math101-q3b-3',
        type: 'multiple_choice',
        prompt: 'Which of the following equals (A ∪ B)̄ according to De Morgan\'s Law?',
        options: [
          'Ā ∪ B̄',
          'Ā ∩ B̄',
          'A ∩ B',
          'A ∪ B'
        ],
        correctAnswer: 1,
        explanation: 'De Morgan\'s Law: The complement of a union is the intersection of the complements. (A ∪ B)̄ = Ā ∩ B̄.'
      },
      {
        id: 'math101-q3b-4',
        type: 'multiple_choice',
        prompt: 'What is the cardinality of A × B if |A| = 3 and |B| = 4?',
        options: [
          '7',
          '12',
          '81',
          '24'
        ],
        correctAnswer: 1,
        explanation: 'The Cartesian product A × B contains all ordered pairs (a, b) where a ∈ A and b ∈ B. |A × B| = |A| × |B| = 3 × 4 = 12.'
      },
      {
        id: 'math101-q3b-5',
        type: 'true_false',
        prompt: 'If A ⊆ B and B ⊆ A, then A = B.',
        correctAnswer: true,
        explanation: 'This is how set equality is defined. Two sets are equal if and only if each is a subset of the other.'
      }
    ]
  },
  {
    id: 'math101-quiz-3c',
    subjectId: 'math101',
    topicId: 'math101-topic-3',
    title: 'Sets and Set Operations - Advanced',
    questions: [
      {
        id: 'math101-q3c-1',
        type: 'multiple_choice',
        prompt: 'For finite sets A and B, which formula gives |A ∪ B|?',
        options: [
          '|A| + |B|',
          '|A| × |B|',
          '|A| + |B| - |A ∩ B|',
          '|A| - |B|'
        ],
        correctAnswer: 2,
        explanation: 'The inclusion-exclusion principle: |A ∪ B| = |A| + |B| - |A ∩ B|. We subtract the intersection to avoid counting common elements twice.'
      },
      {
        id: 'math101-q3c-2',
        type: 'true_false',
        prompt: 'The power set of {1, 2} is {{}, {1}, {2}, {1, 2}}.',
        correctAnswer: true,
        explanation: 'The power set contains all subsets: the empty set {}, each singleton {1} and {2}, and the set itself {1, 2}. That\'s 2² = 4 elements.'
      },
      {
        id: 'math101-q3c-3',
        type: 'multiple_choice',
        prompt: 'Which property states that A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)?',
        options: [
          'Commutative property',
          'Associative property',
          'Distributive property',
          'De Morgan\'s Law'
        ],
        correctAnswer: 2,
        explanation: 'This is the distributive property of union over intersection. Union distributes over intersection (and vice versa).'
      },
      {
        id: 'math101-q3c-4',
        type: 'multiple_choice',
        prompt: 'If A = {1, 2} and B = {a, b}, what is (A × B) ∩ (B × A)?',
        options: [
          '{(1, a), (2, b)}',
          '{(a, 1), (b, 2)}',
          '∅',
          '{(1, 1), (2, 2)}'
        ],
        correctAnswer: 2,
        explanation: 'A × B contains pairs like (1, a), (1, b), etc. B × A contains pairs like (a, 1), (b, 2), etc. No ordered pair appears in both, so the intersection is empty.'
      },
      {
        id: 'math101-q3c-5',
        type: 'fill_blank',
        prompt: 'The symmetric difference A △ B contains elements that are in A or B but not in both. It equals (A - B) ∪ ____.',
        correctAnswer: '(B - A)',
        explanation: 'A △ B = (A - B) ∪ (B - A) = (A ∪ B) - (A ∩ B). It\'s the "exclusive or" for sets.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 4: Relations (3 quizzes)
  // ============================================================================
  {
    id: 'math101-quiz-4a',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    title: 'Relations - Fundamentals',
    questions: [
      {
        id: 'math101-q4a-1',
        type: 'multiple_choice',
        prompt: 'A relation R on set A is reflexive if:',
        options: [
          'For all a ∈ A: (a, a) ∈ R',
          'For all a, b ∈ A: if (a, b) ∈ R then (b, a) ∈ R',
          'For all a ∈ A: (a, a) ∉ R',
          'There exist a, b such that (a, b) ∈ R'
        ],
        correctAnswer: 0,
        explanation: 'A relation is reflexive if every element is related to itself. For all a in A, (a, a) must be in R.'
      },
      {
        id: 'math101-q4a-2',
        type: 'true_false',
        prompt: 'The relation "less than" (<) on integers is reflexive.',
        correctAnswer: false,
        explanation: 'No, because no integer is less than itself. For reflexivity, we would need n < n for all n, which is false.'
      },
      {
        id: 'math101-q4a-3',
        type: 'multiple_choice',
        prompt: 'A relation R on set A is symmetric if:',
        options: [
          'For all a ∈ A: (a, a) ∈ R',
          'For all a, b ∈ A: if (a, b) ∈ R then (b, a) ∈ R',
          'For all a, b, c ∈ A: if (a, b) ∈ R and (b, c) ∈ R then (a, c) ∈ R',
          'For all a ∈ A: (a, a) ∉ R'
        ],
        correctAnswer: 1,
        explanation: 'A relation is symmetric if whenever a is related to b, then b is also related to a.'
      },
      {
        id: 'math101-q4a-4',
        type: 'multiple_choice',
        prompt: 'Which property does the relation "less than" (<) on integers NOT have?',
        options: [
          'Transitive',
          'Antisymmetric',
          'Reflexive',
          'Irreflexive'
        ],
        correctAnswer: 2,
        explanation: 'The < relation is not reflexive because no number is less than itself. It IS transitive (a<b and b<c implies a<c), antisymmetric, and irreflexive.'
      },
      {
        id: 'math101-q4a-5',
        type: 'true_false',
        prompt: 'If a relation is both symmetric and antisymmetric, then it can only contain pairs of the form (a, a).',
        correctAnswer: true,
        explanation: 'If (a, b) is in R with a ≠ b, symmetry requires (b, a) ∈ R, but antisymmetry then requires a = b. Contradiction. So only (a, a) pairs are possible.'
      }
    ]
  },
  {
    id: 'math101-quiz-4b',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    title: 'Relations - Application',
    questions: [
      {
        id: 'math101-q4b-1',
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
      },
      {
        id: 'math101-q4b-2',
        type: 'true_false',
        prompt: 'An equivalence relation partitions a set into disjoint equivalence classes.',
        correctAnswer: true,
        explanation: 'True. Every equivalence relation creates a partition of the set into disjoint equivalence classes, where each element belongs to exactly one class.'
      },
      {
        id: 'math101-q4b-3',
        type: 'multiple_choice',
        prompt: 'Which combination of properties defines a partial order?',
        options: [
          'Reflexive, symmetric, transitive',
          'Reflexive, antisymmetric, transitive',
          'Irreflexive, symmetric, transitive',
          'Reflexive, symmetric, antisymmetric'
        ],
        correctAnswer: 1,
        explanation: 'A partial order is reflexive, antisymmetric, and transitive. Example: ≤ on integers, ⊆ on sets.'
      },
      {
        id: 'math101-q4b-4',
        type: 'multiple_choice',
        prompt: 'The relation "is a sibling of" on a set of people (excluding oneself) is:',
        options: [
          'Reflexive and symmetric',
          'Symmetric but not reflexive',
          'Transitive and reflexive',
          'Antisymmetric and transitive'
        ],
        correctAnswer: 1,
        explanation: 'You are not your own sibling (not reflexive), but if A is B\'s sibling, B is A\'s sibling (symmetric). It\'s not transitive (siblings of siblings might be the same person, not siblings).'
      },
      {
        id: 'math101-q4b-5',
        type: 'fill_blank',
        prompt: 'The equivalence class containing element a is denoted [a] and contains all elements b such that ____ is in R.',
        correctAnswer: '(a, b)',
        explanation: 'The equivalence class [a] = {b ∈ A : (a, b) ∈ R} = {b ∈ A : a R b}.'
      }
    ]
  },
  {
    id: 'math101-quiz-4c',
    subjectId: 'math101',
    topicId: 'math101-topic-4',
    title: 'Relations - Advanced',
    questions: [
      {
        id: 'math101-q4c-1',
        type: 'multiple_choice',
        prompt: 'The transitive closure of a relation R is:',
        options: [
          'The smallest reflexive relation containing R',
          'The smallest symmetric relation containing R',
          'The smallest transitive relation containing R',
          'The largest relation contained in R'
        ],
        correctAnswer: 2,
        explanation: 'The transitive closure is the smallest transitive relation that contains R. It adds all pairs needed to make R transitive.'
      },
      {
        id: 'math101-q4c-2',
        type: 'true_false',
        prompt: 'In a total order (linear order), every two distinct elements are comparable.',
        correctAnswer: true,
        explanation: 'A total order is a partial order where for any a, b, either a ≤ b or b ≤ a. All elements are comparable (no incomparable pairs).'
      },
      {
        id: 'math101-q4c-3',
        type: 'multiple_choice',
        prompt: 'If R is an equivalence relation on a set of 10 elements and creates 3 equivalence classes, what can we say?',
        options: [
          'Each class has exactly 3 elements',
          'The sum of the sizes of the classes is 10',
          'R contains exactly 30 ordered pairs',
          'At least one class has 10 elements'
        ],
        correctAnswer: 1,
        explanation: 'Equivalence classes partition the set, so every element belongs to exactly one class. The sizes must sum to 10.'
      },
      {
        id: 'math101-q4c-4',
        type: 'multiple_choice',
        prompt: 'The composition R ∘ S of relations R and S contains (a, c) if:',
        options: [
          'There exists b such that (a, b) ∈ S and (b, c) ∈ R',
          'There exists b such that (a, b) ∈ R and (b, c) ∈ S',
          '(a, c) ∈ R and (a, c) ∈ S',
          '(a, c) ∈ R or (a, c) ∈ S'
        ],
        correctAnswer: 0,
        explanation: 'For composition R ∘ S, we apply S first then R. So (a, c) ∈ R ∘ S if there exists b with (a, b) ∈ S and (b, c) ∈ R.'
      },
      {
        id: 'math101-q4c-5',
        type: 'true_false',
        prompt: 'The inverse relation R⁻¹ contains (b, a) if and only if (a, b) ∈ R.',
        correctAnswer: true,
        explanation: 'The inverse relation R⁻¹ = {(b, a) : (a, b) ∈ R}. It reverses all the ordered pairs in R.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 5: Functions (3 quizzes)
  // ============================================================================
  {
    id: 'math101-quiz-5a',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    title: 'Functions - Fundamentals',
    questions: [
      {
        id: 'math101-q5a-1',
        type: 'multiple_choice',
        prompt: 'A function f: A → B is:',
        options: [
          'Any relation between A and B',
          'A relation where each element of A is related to exactly one element of B',
          'A relation where each element of B is related to at least one element of A',
          'A bijection between A and B'
        ],
        correctAnswer: 1,
        explanation: 'A function assigns to EACH element in the domain A EXACTLY ONE element in the codomain B. Not all relations are functions.'
      },
      {
        id: 'math101-q5a-2',
        type: 'true_false',
        prompt: 'A function f: A → B is injective (one-to-one) if different inputs always produce different outputs.',
        correctAnswer: true,
        explanation: 'Injective means if f(a₁) = f(a₂), then a₁ = a₂. Equivalently, if a₁ ≠ a₂, then f(a₁) ≠ f(a₂).'
      },
      {
        id: 'math101-q5a-3',
        type: 'multiple_choice',
        prompt: 'A function f: A → B is surjective (onto) if:',
        options: [
          'Every element of A maps to a unique element of B',
          'Every element of B is the image of at least one element of A',
          'f has an inverse function',
          'The domain equals the codomain'
        ],
        correctAnswer: 1,
        explanation: 'Surjective means the range equals the codomain. Every element of B is "hit" by some element of A.'
      },
      {
        id: 'math101-q5a-4',
        type: 'multiple_choice',
        prompt: 'A function f: ℝ → ℝ defined by f(x) = x² is:',
        options: [
          'Injective but not surjective',
          'Surjective but not injective',
          'Both injective and surjective',
          'Neither injective nor surjective'
        ],
        correctAnswer: 3,
        explanation: 'f(x) = x² is not injective because f(-2) = f(2) = 4. It\'s not surjective because negative numbers are not in the range. So it\'s neither.'
      },
      {
        id: 'math101-q5a-5',
        type: 'fill_blank',
        prompt: 'A function that is both injective and surjective is called a ____.',
        correctAnswer: 'bijection',
        explanation: 'A bijection (bijective function) is one-to-one (injective) and onto (surjective). Bijections have inverses.'
      }
    ]
  },
  {
    id: 'math101-quiz-5b',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    title: 'Functions - Application',
    questions: [
      {
        id: 'math101-q5b-1',
        type: 'true_false',
        prompt: 'Every bijective function has an inverse function.',
        correctAnswer: true,
        explanation: 'True. A function must be bijective (both injective and surjective) to have an inverse. The inverse reverses the mapping of the original function.'
      },
      {
        id: 'math101-q5b-2',
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
      },
      {
        id: 'math101-q5b-3',
        type: 'multiple_choice',
        prompt: 'For f: A → B and g: B → C, what is the domain and codomain of g ∘ f?',
        options: [
          'Domain: B, Codomain: C',
          'Domain: A, Codomain: C',
          'Domain: A, Codomain: B',
          'Domain: C, Codomain: A'
        ],
        correctAnswer: 1,
        explanation: 'The composition g ∘ f goes from A to C. We apply f first (A → B), then g (B → C), so overall: A → C.'
      },
      {
        id: 'math101-q5b-4',
        type: 'true_false',
        prompt: 'If f: A → B is injective and |A| = |B| where both are finite, then f is also surjective.',
        correctAnswer: true,
        explanation: 'For finite sets of equal size, an injection must be a surjection. Since no two elements of A map to the same element of B (injection), and |A| = |B|, every element of B must be hit.'
      },
      {
        id: 'math101-q5b-5',
        type: 'multiple_choice',
        prompt: 'The floor function ⌊x⌋ gives the greatest integer less than or equal to x. What is ⌊-2.7⌋?',
        options: [
          '-2',
          '-3',
          '-2.7',
          '2'
        ],
        correctAnswer: 1,
        explanation: '⌊-2.7⌋ = -3 because -3 is the greatest integer that is ≤ -2.7. Note: -2 > -2.7, so -2 doesn\'t qualify.'
      }
    ]
  },
  {
    id: 'math101-quiz-5c',
    subjectId: 'math101',
    topicId: 'math101-topic-5',
    title: 'Functions - Advanced',
    questions: [
      {
        id: 'math101-q5c-1',
        type: 'multiple_choice',
        prompt: 'If f: A → B has an inverse f⁻¹, what is f⁻¹(f(a)) for any a ∈ A?',
        options: [
          'f(a)',
          'a',
          'f⁻¹(a)',
          '0'
        ],
        correctAnswer: 1,
        explanation: 'By definition of inverse: f⁻¹(f(a)) = a for all a in A, and f(f⁻¹(b)) = b for all b in B.'
      },
      {
        id: 'math101-q5c-2',
        type: 'true_false',
        prompt: 'The composition of two injective functions is always injective.',
        correctAnswer: true,
        explanation: 'If f and g are injective, then (g ∘ f)(a₁) = (g ∘ f)(a₂) implies g(f(a₁)) = g(f(a₂)), which implies f(a₁) = f(a₂) (g injective), which implies a₁ = a₂ (f injective).'
      },
      {
        id: 'math101-q5c-3',
        type: 'multiple_choice',
        prompt: 'If |A| = 5 and |B| = 3, how many surjective functions exist from A to B?',
        options: [
          '0 (impossible)',
          '3⁵',
          '150',
          '5!'
        ],
        correctAnswer: 2,
        explanation: 'Using inclusion-exclusion: 3⁵ - C(3,1)·2⁵ + C(3,2)·1⁵ = 243 - 96 + 3 = 150 surjective functions. (This counts onto functions from 5 elements to 3.)'
      },
      {
        id: 'math101-q5c-4',
        type: 'multiple_choice',
        prompt: 'If f: ℤ → ℤ is defined by f(n) = n + 5, which properties does f have?',
        options: [
          'Injective only',
          'Surjective only',
          'Bijective',
          'Neither injective nor surjective'
        ],
        correctAnswer: 2,
        explanation: 'f(n) = n + 5 is injective (different n give different n+5) and surjective (every integer m equals n+5 for n = m-5). So f is bijective.'
      },
      {
        id: 'math101-q5c-5',
        type: 'fill_blank',
        prompt: 'The number of bijections from a set with n elements to itself equals n! (n ____)',
        correctAnswer: 'factorial',
        explanation: 'There are n! = n × (n-1) × ... × 2 × 1 bijections (permutations) from a set of n elements to itself.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 6: Predicate Logic and Quantifiers (3 quizzes)
  // ============================================================================
  {
    id: 'math101-quiz-6a',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    title: 'Predicate Logic - Fundamentals',
    questions: [
      {
        id: 'math101-q6a-1',
        type: 'multiple_choice',
        prompt: 'What is a predicate?',
        options: [
          'A proposition that is always true',
          'A statement containing variables that becomes a proposition when variables are given values',
          'The negation of a proposition',
          'A statement about quantifiers'
        ],
        correctAnswer: 1,
        explanation: 'A predicate is a statement template with variables (like P(x) = "x is prime"). It becomes a proposition when specific values are substituted.'
      },
      {
        id: 'math101-q6a-2',
        type: 'true_false',
        prompt: 'The statement ∀x P(x) is true if P(x) is true for every element in the domain.',
        correctAnswer: true,
        explanation: 'The universal quantifier ∀ means "for all." ∀x P(x) is true when P(x) holds for every x in the domain.'
      },
      {
        id: 'math101-q6a-3',
        type: 'multiple_choice',
        prompt: 'The statement ∃x P(x) means:',
        options: [
          'P(x) is true for all x',
          'P(x) is true for at least one x',
          'P(x) is false for all x',
          'P(x) is true for exactly one x'
        ],
        correctAnswer: 1,
        explanation: 'The existential quantifier ∃ means "there exists." ∃x P(x) is true when P(x) holds for at least one x in the domain.'
      },
      {
        id: 'math101-q6a-4',
        type: 'multiple_choice',
        prompt: 'What is the negation of ∀x P(x)?',
        options: [
          '∀x ¬P(x)',
          '∃x P(x)',
          '∃x ¬P(x)',
          '¬∃x P(x)'
        ],
        correctAnswer: 2,
        explanation: 'The negation of "for all x, P(x)" is "there exists x such that NOT P(x)." ¬∀x P(x) ≡ ∃x ¬P(x).'
      },
      {
        id: 'math101-q6a-5',
        type: 'true_false',
        prompt: 'The negation of ∃x P(x) is ∀x ¬P(x).',
        correctAnswer: true,
        explanation: 'Negating "there exists x with P(x)" gives "for all x, NOT P(x)." ¬∃x P(x) ≡ ∀x ¬P(x).'
      }
    ]
  },
  {
    id: 'math101-quiz-6b',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    title: 'Predicate Logic - Application',
    questions: [
      {
        id: 'math101-q6b-1',
        type: 'multiple_choice',
        prompt: 'How would you translate "All dogs bark" into predicate logic? (D(x) = "x is a dog", B(x) = "x barks")',
        options: [
          '∀x (D(x) ∧ B(x))',
          '∀x (D(x) → B(x))',
          '∃x (D(x) ∧ B(x))',
          '∃x (D(x) → B(x))'
        ],
        correctAnswer: 1,
        explanation: '"All dogs bark" means: for everything, IF it\'s a dog THEN it barks. Use → with ∀ for "all A are B."'
      },
      {
        id: 'math101-q6b-2',
        type: 'multiple_choice',
        prompt: 'How would you translate "Some birds can swim"? (B(x) = "x is a bird", S(x) = "x can swim")',
        options: [
          '∀x (B(x) → S(x))',
          '∃x (B(x) → S(x))',
          '∃x (B(x) ∧ S(x))',
          '∀x (B(x) ∧ S(x))'
        ],
        correctAnswer: 2,
        explanation: '"Some birds can swim" means: there exists something that IS a bird AND can swim. Use ∧ with ∃ for "some A are B."'
      },
      {
        id: 'math101-q6b-3',
        type: 'true_false',
        prompt: 'The statements ∀x ∃y P(x, y) and ∃y ∀x P(x, y) always have the same truth value.',
        correctAnswer: false,
        explanation: 'Order matters! ∀x ∃y means "for each x, some y exists (possibly different for each x)." ∃y ∀x means "one y works for all x." These are different.'
      },
      {
        id: 'math101-q6b-4',
        type: 'multiple_choice',
        prompt: 'Let the domain be real numbers. Which statement is TRUE?',
        options: [
          '∃y ∀x (y > x)',
          '∀x ∃y (y > x)',
          '∀x ∀y (x < y)',
          '∃x ∃y (x > y ∧ y > x)'
        ],
        correctAnswer: 1,
        explanation: '"For every x, there exists a y greater than x" is true (just take y = x + 1). "There exists a y greater than all x" is false (no largest real number).'
      },
      {
        id: 'math101-q6b-5',
        type: 'fill_blank',
        prompt: 'The uniqueness quantifier ∃! x P(x) means "there exists exactly ____ x such that P(x)."',
        correctAnswer: 'one',
        explanation: '∃! (exists unique) means there is exactly one element satisfying the property.'
      }
    ]
  },
  {
    id: 'math101-quiz-6c',
    subjectId: 'math101',
    topicId: 'math101-topic-6',
    title: 'Predicate Logic - Advanced',
    questions: [
      {
        id: 'math101-q6c-1',
        type: 'multiple_choice',
        prompt: 'What is the negation of ∀x (P(x) → Q(x))?',
        options: [
          '∃x (P(x) → ¬Q(x))',
          '∃x (P(x) ∧ ¬Q(x))',
          '∀x (P(x) ∧ ¬Q(x))',
          '∀x (¬P(x) ∨ Q(x))'
        ],
        correctAnswer: 1,
        explanation: '¬∀x (P(x) → Q(x)) = ∃x ¬(P(x) → Q(x)) = ∃x (P(x) ∧ ¬Q(x)). Use ¬(P → Q) ≡ P ∧ ¬Q.'
      },
      {
        id: 'math101-q6c-2',
        type: 'true_false',
        prompt: 'The statements ∀x P(x) ∧ ∀x Q(x) and ∀x (P(x) ∧ Q(x)) are logically equivalent.',
        correctAnswer: true,
        explanation: 'Universal quantifiers distribute over conjunction. "Everything has P and everything has Q" ≡ "Everything has both P and Q."'
      },
      {
        id: 'math101-q6c-3',
        type: 'multiple_choice',
        prompt: 'Which is the correct expansion of ∃!x P(x)?',
        options: [
          '∃x P(x)',
          '∃x (P(x) ∧ ∀y (P(y) → y = x))',
          '∀x P(x)',
          '∃x ∃y (P(x) ∧ P(y))'
        ],
        correctAnswer: 1,
        explanation: '∃!x P(x) means "exists x with P(x), and any y with P(y) must equal x." Uniqueness combines existence with the condition that anything else satisfying P is the same element.'
      },
      {
        id: 'math101-q6c-4',
        type: 'multiple_choice',
        prompt: 'What does ∀x ∃y ∀z P(x, y, z) assert?',
        options: [
          'For all x, y, z: P(x, y, z)',
          'For each x, there is a y that works for all z',
          'There is some x such that for all y and z, P holds',
          'For each pair (x, z), there is a y such that P holds'
        ],
        correctAnswer: 1,
        explanation: 'Reading left to right: for each x, we can find a y (depending on x) such that for all z, P(x, y, z) is true.'
      },
      {
        id: 'math101-q6c-5',
        type: 'true_false',
        prompt: '∃x (P(x) ∧ Q(x)) logically implies (∃x P(x)) ∧ (∃x Q(x)), but not vice versa.',
        correctAnswer: true,
        explanation: 'If some x satisfies both P and Q, then certainly something satisfies P and something satisfies Q. But having witnesses for P and Q separately doesn\'t mean the SAME witness works for both.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 7: Sequences and Summations (3 quizzes)
  // ============================================================================
  {
    id: 'math101-quiz-7a',
    subjectId: 'math101',
    topicId: 'math101-topic-7',
    title: 'Sequences and Summations - Fundamentals',
    questions: [
      {
        id: 'math101-q7a-1',
        type: 'multiple_choice',
        prompt: 'In an arithmetic sequence, consecutive terms differ by:',
        options: [
          'A constant ratio',
          'A constant difference',
          'A variable amount',
          'An exponential factor'
        ],
        correctAnswer: 1,
        explanation: 'An arithmetic sequence has a constant difference d between consecutive terms: aₙ = aₙ₋₁ + d.'
      },
      {
        id: 'math101-q7a-2',
        type: 'multiple_choice',
        prompt: 'In a geometric sequence, consecutive terms have:',
        options: [
          'A constant difference',
          'A constant ratio',
          'Increasing differences',
          'No pattern'
        ],
        correctAnswer: 1,
        explanation: 'A geometric sequence has a constant ratio r between consecutive terms: aₙ = aₙ₋₁ · r.'
      },
      {
        id: 'math101-q7a-3',
        type: 'true_false',
        prompt: 'The sum Σ(i=1 to n) i equals n(n+1)/2.',
        correctAnswer: true,
        explanation: 'This is the formula for the sum of the first n positive integers: 1 + 2 + 3 + ... + n = n(n+1)/2.'
      },
      {
        id: 'math101-q7a-4',
        type: 'multiple_choice',
        prompt: 'What is Σ(i=1 to 5) 3?',
        options: [
          '3',
          '5',
          '15',
          '8'
        ],
        correctAnswer: 2,
        explanation: 'The sum of a constant c from i=1 to n is n·c. Here: 3 + 3 + 3 + 3 + 3 = 5 · 3 = 15.'
      },
      {
        id: 'math101-q7a-5',
        type: 'fill_blank',
        prompt: 'The variable i in Σ(i=1 to n) aᵢ is called the ____ variable.',
        correctAnswer: 'index',
        explanation: 'The index variable (also called dummy variable or summation variable) ranges over the values in the summation.'
      }
    ]
  },
  {
    id: 'math101-quiz-7b',
    subjectId: 'math101',
    topicId: 'math101-topic-7',
    title: 'Sequences and Summations - Application',
    questions: [
      {
        id: 'math101-q7b-1',
        type: 'multiple_choice',
        prompt: 'The 10th term of the arithmetic sequence 2, 5, 8, 11, ... is:',
        options: [
          '26',
          '29',
          '32',
          '35'
        ],
        correctAnswer: 1,
        explanation: 'a₁ = 2, d = 3. a₁₀ = 2 + (10-1)·3 = 2 + 27 = 29.'
      },
      {
        id: 'math101-q7b-2',
        type: 'multiple_choice',
        prompt: 'For the geometric series Σ(i=0 to n-1) arⁱ with r ≠ 1, the sum equals:',
        options: [
          'a·n',
          'a·rⁿ',
          'a·(rⁿ - 1)/(r - 1)',
          'a/(1 - r)'
        ],
        correctAnswer: 2,
        explanation: 'The finite geometric series formula: S = a(rⁿ - 1)/(r - 1) for n terms, when r ≠ 1.'
      },
      {
        id: 'math101-q7b-3',
        type: 'true_false',
        prompt: 'The infinite geometric series Σ(i=0 to ∞) arⁱ converges only when |r| < 1.',
        correctAnswer: true,
        explanation: 'An infinite geometric series converges to a/(1-r) only when |r| < 1. Otherwise, it diverges.'
      },
      {
        id: 'math101-q7b-4',
        type: 'multiple_choice',
        prompt: 'What is Σ(k=1 to 100) k equal to?',
        options: [
          '5000',
          '5050',
          '10000',
          '10100'
        ],
        correctAnswer: 1,
        explanation: 'Using the formula: Σk = n(n+1)/2 = 100(101)/2 = 5050.'
      },
      {
        id: 'math101-q7b-5',
        type: 'multiple_choice',
        prompt: 'What is Σ(i=1 to n) (2i - 1)?',
        options: [
          'n²',
          'n(n+1)',
          '2n - 1',
          'n(n-1)'
        ],
        correctAnswer: 0,
        explanation: 'The sum of first n odd numbers (1, 3, 5, ..., 2n-1) equals n². This is a classic result.'
      }
    ]
  },
  {
    id: 'math101-quiz-7c',
    subjectId: 'math101',
    topicId: 'math101-topic-7',
    title: 'Sequences and Summations - Advanced',
    questions: [
      {
        id: 'math101-q7c-1',
        type: 'multiple_choice',
        prompt: 'A telescoping sum is one where:',
        options: [
          'All terms are equal',
          'Consecutive terms cancel, leaving only boundary terms',
          'The sum is always zero',
          'The terms grow exponentially'
        ],
        correctAnswer: 1,
        explanation: 'In a telescoping sum like Σ(aᵢ - aᵢ₊₁), intermediate terms cancel, leaving only a₁ - aₙ₊₁.'
      },
      {
        id: 'math101-q7c-2',
        type: 'true_false',
        prompt: 'The formula Σ(i=1 to n) i² = n(n+1)(2n+1)/6 can be proven by mathematical induction.',
        correctAnswer: true,
        explanation: 'Summation formulas are classic applications of mathematical induction. The base case and inductive step verify the formula.'
      },
      {
        id: 'math101-q7c-3',
        type: 'multiple_choice',
        prompt: 'Which recurrence relation defines the Fibonacci sequence?',
        options: [
          'Fₙ = Fₙ₋₁ + 1',
          'Fₙ = 2Fₙ₋₁',
          'Fₙ = Fₙ₋₁ + Fₙ₋₂',
          'Fₙ = Fₙ₋₁ · Fₙ₋₂'
        ],
        correctAnswer: 2,
        explanation: 'The Fibonacci sequence is defined by Fₙ = Fₙ₋₁ + Fₙ₋₂ with F₀ = 0, F₁ = 1. Each term is the sum of the two preceding terms.'
      },
      {
        id: 'math101-q7c-4',
        type: 'multiple_choice',
        prompt: 'The sum 1 + 1/2 + 1/4 + 1/8 + ... (infinite geometric series) equals:',
        options: [
          '1',
          '2',
          '3',
          'diverges'
        ],
        correctAnswer: 1,
        explanation: 'This is a geometric series with a = 1, r = 1/2. Since |r| < 1, sum = a/(1-r) = 1/(1-0.5) = 2.'
      },
      {
        id: 'math101-q7c-5',
        type: 'fill_blank',
        prompt: 'To solve the recurrence aₙ = 3aₙ₋₁ with a₀ = 5, we find aₙ = 5 · ____.',
        correctAnswer: '3^n',
        explanation: 'For aₙ = c·aₙ₋₁, the solution is aₙ = a₀ · cⁿ. Here: aₙ = 5 · 3ⁿ.'
      }
    ]
  }
];
