import type { WrittenExercise } from '../../../../core/types';

export const topic1Exercises: WrittenExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'math101-ex-1',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    type: 'written',
    difficulty: 3,
    title: 'Truth Tables and Logical Equivalence',
    description: 'Construct a truth table for the proposition ((P → Q) ∧ (Q → R)) → (P → R). Determine whether this proposition is a tautology, contradiction, or contingency. Then prove that (P → Q) is logically equivalent to (¬Q → ¬P) using a truth table.',
    hints: [
      'Start by identifying all atomic propositions (P, Q, R) and create columns for each.',
      'Build up complex expressions step by step, creating intermediate columns.',
      'A tautology has all true values in its final column.',
      'For logical equivalence, two expressions must have identical truth values in all rows.'
    ],
    solution: 'The truth table shows that ((P → Q) ∧ (Q → R)) → (P → R) is always true, making it a tautology. This represents the transitive property of implication.\n\nFor the second part, the truth table for (P → Q) and (¬Q → ¬P) shows:\nP | Q | P→Q | ¬Q | ¬P | ¬Q→¬P\nT | T |  T  | F  | F  |   T\nT | F |  F  | T  | F  |   F\nF | T |  T  | F  | T  |   T\nF | F |  T  | T  | T  |   T\n\nSince columns P→Q and ¬Q→¬P are identical, the propositions are logically equivalent. This is the contrapositive relationship.'
  },
  {
    id: 'math101-t1-ex02',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    type: 'written',
    difficulty: 1,
    title: 'Basic Truth Table',
    description: 'Construct a truth table for the proposition P ∧ (Q ∨ ¬P). Identify whether this is a tautology, contradiction, or contingency.',
    hints: [
      'Start with columns for P and Q',
      'Calculate ¬P, then Q ∨ ¬P, then the final ∧',
      'Check if all rows are true (tautology), all false (contradiction), or mixed (contingency)'
    ],
    solution: 'P | Q | ¬P | Q ∨ ¬P | P ∧ (Q ∨ ¬P)\nT | T |  F |    T    |      T\nT | F |  F |    F    |      F\nF | T |  T |    T    |      F\nF | F |  T |    T    |      F\n\nThe result column has both T and F values, so this is a contingency. Note that P ∧ (Q ∨ ¬P) simplifies to P ∧ Q, which is only true when both P and Q are true.'
  },
  {
    id: 'math101-t1-ex03',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    type: 'written',
    difficulty: 2,
    title: 'De Morgan\'s Laws',
    description: 'Use truth tables to verify both of De Morgan\'s Laws:\n(a) ¬(P ∧ Q) ≡ (¬P ∨ ¬Q)\n(b) ¬(P ∨ Q) ≡ (¬P ∧ ¬Q)',
    hints: [
      'Create a truth table for each side of each equivalence',
      'Compare the columns to verify they are identical',
      'These laws convert between AND and OR using negation'
    ],
    solution: '(a) ¬(P ∧ Q) ≡ (¬P ∨ ¬Q)\nP | Q | P∧Q | ¬(P∧Q) | ¬P | ¬Q | ¬P∨¬Q\nT | T |  T  |   F    |  F |  F |   F\nT | F |  F  |   T    |  F |  T |   T\nF | T |  F  |   T    |  T |  F |   T\nF | F |  F  |   T    |  T |  T |   T\n\nColumns ¬(P∧Q) and ¬P∨¬Q are identical. ✓\n\n(b) ¬(P ∨ Q) ≡ (¬P ∧ ¬Q)\nP | Q | P∨Q | ¬(P∨Q) | ¬P | ¬Q | ¬P∧¬Q\nT | T |  T  |   F    |  F |  F |   F\nT | F |  T  |   F    |  F |  T |   F\nF | T |  T  |   F    |  T |  F |   F\nF | F |  F  |   T    |  T |  T |   T\n\nColumns ¬(P∨Q) and ¬P∧¬Q are identical. ✓'
  },
  {
    id: 'math101-t1-ex04',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    type: 'written',
    difficulty: 2,
    title: 'Logical Implication',
    description: 'Given the propositions P = "It is raining" and Q = "The ground is wet", express the following in symbolic form and determine under what conditions they are false:\n(a) If it is raining, then the ground is wet\n(b) It is not raining unless the ground is wet\n(c) The ground being wet is necessary for it to rain',
    hints: [
      'Implication P → Q is false only when P is true and Q is false',
      '"Unless" means "if not"',
      '"Necessary" means the condition must hold for the other to be true'
    ],
    solution: '(a) P → Q: "If it is raining, then the ground is wet"\nFalse only when: It IS raining (P=T) but the ground is NOT wet (Q=F)\n\n(b) ¬P ∨ Q or equivalently P → Q: "It is not raining unless the ground is wet"\n"Unless" means "if not": If the ground is NOT wet, then it is NOT raining\n¬Q → ¬P, which is equivalent to P → Q\nFalse when: P=T and Q=F\n\n(c) P → Q: "The ground being wet is necessary for it to rain"\n"Necessary" means: For P to be true, Q must be true, i.e., P → Q\nFalse when: It rains but ground is not wet\n\nAll three statements express the same logical relationship: P → Q.'
  },
  {
    id: 'math101-t1-ex05',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    type: 'written',
    difficulty: 3,
    title: 'Logical Equivalence Proof',
    description: 'Prove that P → (Q → R) is logically equivalent to (P ∧ Q) → R using:\n(a) A truth table\n(b) Logical equivalence laws',
    hints: [
      'For truth table, you need 8 rows (2³ combinations)',
      'For algebraic proof, use: P → X ≡ ¬P ∨ X',
      'Apply De Morgan\'s laws and associativity as needed'
    ],
    solution: '(a) Truth Table:\nP | Q | R | Q→R | P→(Q→R) | P∧Q | (P∧Q)→R\nT | T | T |  T  |    T    |  T  |    T\nT | T | F |  F  |    F    |  T  |    F\nT | F | T |  T  |    T    |  F  |    T\nT | F | F |  T  |    T    |  F  |    T\nF | T | T |  T  |    T    |  F  |    T\nF | T | F |  F  |    T    |  F  |    T\nF | F | T |  T  |    T    |  F  |    T\nF | F | F |  T  |    T    |  F  |    T\n\nColumns P→(Q→R) and (P∧Q)→R are identical. ✓\n\n(b) Algebraic Proof:\nP → (Q → R)\n≡ P → (¬Q ∨ R)        [implication equivalence]\n≡ ¬P ∨ (¬Q ∨ R)       [implication equivalence]\n≡ (¬P ∨ ¬Q) ∨ R       [associativity]\n≡ ¬(P ∧ Q) ∨ R        [De Morgan\'s law]\n≡ (P ∧ Q) → R         [implication equivalence]'
  },
  {
    id: 'math101-t1-ex06',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    type: 'written',
    difficulty: 2,
    title: 'Biconditional',
    description: 'Construct a truth table for P ↔ Q and show that it is equivalent to (P → Q) ∧ (Q → P).',
    hints: [
      'P ↔ Q is true when both have the same truth value',
      'Calculate each implication separately',
      'The conjunction of both implications should match the biconditional'
    ],
    solution: 'P | Q | P→Q | Q→P | (P→Q)∧(Q→P) | P↔Q\nT | T |  T  |  T  |      T       |  T\nT | F |  F  |  T  |      F       |  F\nF | T |  T  |  F  |      F       |  F\nF | F |  T  |  T  |      T       |  T\n\nThe columns (P→Q)∧(Q→P) and P↔Q are identical. ✓\n\nThis shows that "P if and only if Q" means both:\n- "If P then Q" AND\n- "If Q then P"\n\nP ↔ Q is true exactly when P and Q have the same truth value.'
  },
  {
    id: 'math101-t1-ex07',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    type: 'written',
    difficulty: 4,
    title: 'Modus Ponens and Modus Tollens',
    description: 'Explain the rules of inference Modus Ponens and Modus Tollens. Then use one of them to determine the conclusion from these premises:\n1. If it is sunny, then we go to the beach\n2. If we go to the beach, then we get sunburned\n3. We did not get sunburned',
    hints: [
      'Modus Ponens: P → Q, P, therefore Q',
      'Modus Tollens: P → Q, ¬Q, therefore ¬P',
      'Chain the implications and apply the appropriate rule'
    ],
    solution: 'Rules of Inference:\n\nModus Ponens (affirming the antecedent):\nP → Q\nP\n∴ Q\n\nModus Tollens (denying the consequent):\nP → Q\n¬Q\n∴ ¬P\n\nApplying to the problem:\nLet S = "It is sunny", B = "We go to the beach", U = "We get sunburned"\n\nPremises:\n1. S → B\n2. B → U\n3. ¬U\n\nFirst, chain implications: By transitivity, S → B and B → U give us S → U\n\nThen apply Modus Tollens to S → U and ¬U:\nS → U\n¬U\n∴ ¬S\n\nConclusion: It is not sunny.\n\nAlternatively, apply Modus Tollens twice:\nFrom B → U and ¬U: ¬B (we did not go to the beach)\nFrom S → B and ¬B: ¬S (it is not sunny)'
  },
  {
    id: 'math101-t1-ex08',
    subjectId: 'math101',
    topicId: 'math101-topic-1',
    type: 'written',
    difficulty: 5,
    title: 'Simplifying Complex Propositions',
    description: 'Simplify the following proposition to its simplest form using logical equivalence laws:\n¬(P → Q) ∨ (P ∧ ¬Q) ∨ Q\n\nShow each step and name the law used.',
    hints: [
      'First convert P → Q using implication equivalence',
      'Apply De Morgan\'s laws to the negation',
      'Look for absorption or simplification opportunities'
    ],
    solution: '¬(P → Q) ∨ (P ∧ ¬Q) ∨ Q\n\nStep 1: Convert implication\n= ¬(¬P ∨ Q) ∨ (P ∧ ¬Q) ∨ Q    [Implication: P→Q ≡ ¬P∨Q]\n\nStep 2: Apply De Morgan\'s law\n= (P ∧ ¬Q) ∨ (P ∧ ¬Q) ∨ Q    [De Morgan: ¬(¬P∨Q) ≡ P∧¬Q]\n\nStep 3: Idempotent law\n= (P ∧ ¬Q) ∨ Q               [Idempotent: X∨X ≡ X]\n\nStep 4: Distribution\n= (P ∨ Q) ∧ (¬Q ∨ Q)         [Distribution: (X∧Y)∨Z ≡ (X∨Z)∧(Y∨Z)]\n\nStep 5: Complement law\n= (P ∨ Q) ∧ T                [Complement: X∨¬X ≡ T]\n\nStep 6: Identity law\n= P ∨ Q                      [Identity: X∧T ≡ X]\n\nFinal simplified form: P ∨ Q'
  }
];
