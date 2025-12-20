import { Topic, Subtopic } from '../../core/types';
import topic1Content from './content/topic-1.md?raw';
import topic2Content from './content/topic-2.md?raw';
import topic3Content from './content/topic-3.md?raw';
import topic4Content from './content/topic-4.md?raw';
import topic5Content from './content/topic-5.md?raw';
import topic6Content from './content/topic-6.md?raw';
import topic7Content from './content/topic-7.md?raw';

// Topic 1 Subtopics - Propositional Logic
import t1Introduction from './content/topic-1/01-introduction.md?raw';
import t1Propositions from './content/topic-1/02-propositions-and-truth-values.md?raw';
import t1BasicConnectives from './content/topic-1/03-basic-connectives.md?raw';
import t1Implication from './content/topic-1/04-implication-biconditional.md?raw';
import t1TruthTables from './content/topic-1/05-truth-tables.md?raw';
import t1Equivalences from './content/topic-1/06-logical-equivalences.md?raw';
import t1Applications from './content/topic-1/07-applications-best-practices.md?raw';

// Topic 2 Subtopics - Proof Techniques
import t2Introduction from './content/topic-2/01-introduction.md?raw';
import t2DirectProofs from './content/topic-2/02-direct-proofs.md?raw';
import t2Contrapositive from './content/topic-2/03-contrapositive-proofs.md?raw';
import t2Contradiction from './content/topic-2/04-proof-by-contradiction.md?raw';
import t2Induction from './content/topic-2/05-mathematical-induction.md?raw';
import t2StrongInduction from './content/topic-2/06-strong-induction.md?raw';
import t2Strategies from './content/topic-2/07-proof-strategies.md?raw';

// Topic 3 Subtopics - Sets and Set Operations
import t3Introduction from './content/topic-3/01-introduction.md?raw';
import t3SetBuilder from './content/topic-3/02-set-builder-notation.md?raw';
import t3BasicOperations from './content/topic-3/03-basic-operations.md?raw';
import t3Complement from './content/topic-3/04-complement-symmetric-difference.md?raw';
import t3PowerSets from './content/topic-3/05-power-sets-cartesian-products.md?raw';
import t3Identities from './content/topic-3/06-set-identities.md?raw';
import t3SetApplications from './content/topic-3/07-applications-best-practices.md?raw';

// Topic 4 Subtopics - Relations
import t4Introduction from './content/topic-4/01-introduction.md?raw';
import t4Properties from './content/topic-4/02-properties.md?raw';
import t4Representations from './content/topic-4/03-representations.md?raw';
import t4Equivalence from './content/topic-4/04-equivalence-relations.md?raw';
import t4PartialOrders from './content/topic-4/05-partial-orders.md?raw';
import t4Closures from './content/topic-4/06-closures.md?raw';
import t4RelationApplications from './content/topic-4/07-applications.md?raw';

// Topic 5 Subtopics - Functions
import t5Introduction from './content/topic-5/01-introduction.md?raw';
import t5Notation from './content/topic-5/02-function-notation.md?raw';
import t5Injective from './content/topic-5/03-injective-functions.md?raw';
import t5Surjective from './content/topic-5/04-surjective-functions.md?raw';
import t5Bijections from './content/topic-5/05-bijections-inverses.md?raw';
import t5Composition from './content/topic-5/06-composition.md?raw';
import t5Special from './content/topic-5/07-special-functions.md?raw';

// Topic 6 Subtopics - Predicate Logic and Quantifiers
import t6Introduction from './content/topic-6/01-introduction.md?raw';
import t6Predicates from './content/topic-6/02-predicates-and-domains.md?raw';
import t6Universal from './content/topic-6/03-universal-quantifier.md?raw';
import t6Existential from './content/topic-6/04-existential-quantifier.md?raw';
import t6Negation from './content/topic-6/05-negating-quantifiers.md?raw';
import t6Nested from './content/topic-6/06-nested-quantifiers.md?raw';
import t6Translation from './content/topic-6/07-translation-applications.md?raw';

// Topic 7 Subtopics - Sequences and Summations
import t7Introduction from './content/topic-7/01-introduction.md?raw';
import t7Arithmetic from './content/topic-7/02-arithmetic-sequences.md?raw';
import t7Geometric from './content/topic-7/03-geometric-sequences.md?raw';
import t7Notation from './content/topic-7/04-summation-notation.md?raw';
import t7Formulas from './content/topic-7/05-summation-formulas.md?raw';
import t7Techniques from './content/topic-7/06-summation-techniques.md?raw';
import t7Recurrence from './content/topic-7/07-recurrence-relations.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'math101-t1-intro', slug: 'introduction', title: 'Introduction to Propositional Logic', content: t1Introduction, order: 1 },
  { id: 'math101-t1-propositions', slug: 'propositions-and-truth-values', title: 'Propositions and Truth Values', content: t1Propositions, order: 2 },
  { id: 'math101-t1-connectives', slug: 'basic-connectives', title: 'Basic Connectives (AND, OR, NOT)', content: t1BasicConnectives, order: 3 },
  { id: 'math101-t1-implication', slug: 'implication-biconditional', title: 'Implication and Biconditional', content: t1Implication, order: 4 },
  { id: 'math101-t1-tables', slug: 'truth-tables', title: 'Truth Tables', content: t1TruthTables, order: 5 },
  { id: 'math101-t1-equivalences', slug: 'logical-equivalences', title: 'Logical Equivalences', content: t1Equivalences, order: 6 },
  { id: 'math101-t1-applications', slug: 'applications-best-practices', title: 'Applications and Best Practices', content: t1Applications, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'math101-t2-intro', slug: 'introduction', title: 'Introduction to Proof Techniques', content: t2Introduction, order: 1 },
  { id: 'math101-t2-direct', slug: 'direct-proofs', title: 'Direct Proofs', content: t2DirectProofs, order: 2 },
  { id: 'math101-t2-contrapositive', slug: 'contrapositive-proofs', title: 'Contrapositive Proofs', content: t2Contrapositive, order: 3 },
  { id: 'math101-t2-contradiction', slug: 'proof-by-contradiction', title: 'Proof by Contradiction', content: t2Contradiction, order: 4 },
  { id: 'math101-t2-induction', slug: 'mathematical-induction', title: 'Mathematical Induction', content: t2Induction, order: 5 },
  { id: 'math101-t2-strong', slug: 'strong-induction', title: 'Strong Induction', content: t2StrongInduction, order: 6 },
  { id: 'math101-t2-strategies', slug: 'proof-strategies', title: 'Proof Strategies and Best Practices', content: t2Strategies, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'math101-t3-intro', slug: 'introduction', title: 'Introduction to Sets', content: t3Introduction, order: 1 },
  { id: 'math101-t3-builder', slug: 'set-builder-notation', title: 'Set-Builder Notation', content: t3SetBuilder, order: 2 },
  { id: 'math101-t3-operations', slug: 'basic-operations', title: 'Basic Operations (Union, Intersection, Difference)', content: t3BasicOperations, order: 3 },
  { id: 'math101-t3-complement', slug: 'complement-symmetric-difference', title: 'Complement and Symmetric Difference', content: t3Complement, order: 4 },
  { id: 'math101-t3-power', slug: 'power-sets-cartesian-products', title: 'Power Sets and Cartesian Products', content: t3PowerSets, order: 5 },
  { id: 'math101-t3-identities', slug: 'set-identities', title: 'Set Identities', content: t3Identities, order: 6 },
  { id: 'math101-t3-applications', slug: 'applications-best-practices', title: 'Applications and Best Practices', content: t3SetApplications, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'math101-t4-intro', slug: 'introduction', title: 'Introduction to Relations', content: t4Introduction, order: 1 },
  { id: 'math101-t4-properties', slug: 'properties', title: 'Properties of Relations', content: t4Properties, order: 2 },
  { id: 'math101-t4-representations', slug: 'representations', title: 'Representing Relations', content: t4Representations, order: 3 },
  { id: 'math101-t4-equivalence', slug: 'equivalence-relations', title: 'Equivalence Relations', content: t4Equivalence, order: 4 },
  { id: 'math101-t4-orders', slug: 'partial-orders', title: 'Partial Orders', content: t4PartialOrders, order: 5 },
  { id: 'math101-t4-closures', slug: 'closures', title: 'Closures of Relations', content: t4Closures, order: 6 },
  { id: 'math101-t4-applications', slug: 'applications', title: 'Applications', content: t4RelationApplications, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'math101-t5-intro', slug: 'introduction', title: 'Introduction to Functions', content: t5Introduction, order: 1 },
  { id: 'math101-t5-notation', slug: 'function-notation', title: 'Function Notation and Terminology', content: t5Notation, order: 2 },
  { id: 'math101-t5-injective', slug: 'injective-functions', title: 'Injective Functions (One-to-One)', content: t5Injective, order: 3 },
  { id: 'math101-t5-surjective', slug: 'surjective-functions', title: 'Surjective Functions (Onto)', content: t5Surjective, order: 4 },
  { id: 'math101-t5-bijections', slug: 'bijections-inverses', title: 'Bijections and Inverse Functions', content: t5Bijections, order: 5 },
  { id: 'math101-t5-composition', slug: 'composition', title: 'Function Composition', content: t5Composition, order: 6 },
  { id: 'math101-t5-special', slug: 'special-functions', title: 'Special Functions and Applications', content: t5Special, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'math101-t6-intro', slug: 'introduction', title: 'Introduction to Predicate Logic', content: t6Introduction, order: 1 },
  { id: 'math101-t6-predicates', slug: 'predicates-and-domains', title: 'Predicates and Domains', content: t6Predicates, order: 2 },
  { id: 'math101-t6-universal', slug: 'universal-quantifier', title: 'The Universal Quantifier (∀)', content: t6Universal, order: 3 },
  { id: 'math101-t6-existential', slug: 'existential-quantifier', title: 'The Existential Quantifier (∃)', content: t6Existential, order: 4 },
  { id: 'math101-t6-negation', slug: 'negating-quantifiers', title: 'Negating Quantified Statements', content: t6Negation, order: 5 },
  { id: 'math101-t6-nested', slug: 'nested-quantifiers', title: 'Nested Quantifiers', content: t6Nested, order: 6 },
  { id: 'math101-t6-translation', slug: 'translation-applications', title: 'Translation and Applications', content: t6Translation, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'math101-t7-intro', slug: 'introduction', title: 'Introduction to Sequences and Summations', content: t7Introduction, order: 1 },
  { id: 'math101-t7-arithmetic', slug: 'arithmetic-sequences', title: 'Arithmetic Sequences', content: t7Arithmetic, order: 2 },
  { id: 'math101-t7-geometric', slug: 'geometric-sequences', title: 'Geometric Sequences', content: t7Geometric, order: 3 },
  { id: 'math101-t7-notation', slug: 'summation-notation', title: 'Summation Notation', content: t7Notation, order: 4 },
  { id: 'math101-t7-formulas', slug: 'summation-formulas', title: 'Summation Formulas', content: t7Formulas, order: 5 },
  { id: 'math101-t7-techniques', slug: 'summation-techniques', title: 'Summation Techniques', content: t7Techniques, order: 6 },
  { id: 'math101-t7-recurrence', slug: 'recurrence-relations', title: 'Recurrence Relations', content: t7Recurrence, order: 7 },
];

export const math101Topics: Topic[] = [
  {
    id: 'math101-topic-1',
    title: 'Propositional Logic',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['math101-quiz-1a', 'math101-quiz-1b', 'math101-quiz-1c'],
    exerciseIds: [
      'math101-t1-drill-1',
      'math101-t1-drill-2',
      'math101-t1-drill-3',
      'math101-t1-drill-4',
      'math101-ex-1',
      'math101-t1-ex02',
      'math101-t1-ex03',
      'math101-t1-ex04',
      'math101-t1-ex05',
      'math101-t1-ex06',
      'math101-t1-ex07',
      'math101-t1-ex08',
      'math101-t1-ex09',
      'math101-t1-ex10',
      'math101-t1-ex11',
      'math101-t1-ex12',
      'math101-t1-ex13',
      'math101-t1-ex14',
      'math101-t1-ex15',
      'math101-t1-ex16'
    ]
  },
  {
    id: 'math101-topic-2',
    title: 'Proof Techniques',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['math101-quiz-2a', 'math101-quiz-2b', 'math101-quiz-2c'],
    exerciseIds: [
      'math101-t2-drill-1',
      'math101-t2-drill-2',
      'math101-t2-drill-3',
      'math101-t2-drill-4',
      'math101-ex-2',
      'math101-t2-ex02',
      'math101-t2-ex03',
      'math101-t2-ex04',
      'math101-t2-ex05',
      'math101-t2-ex06',
      'math101-t2-ex07',
      'math101-t2-ex08',
      'math101-t2-ex09',
      'math101-t2-ex10',
      'math101-t2-ex11',
      'math101-t2-ex12',
      'math101-t2-ex13',
      'math101-t2-ex14',
      'math101-t2-ex15',
      'math101-t2-ex16'
    ]
  },
  {
    id: 'math101-topic-3',
    title: 'Sets and Set Operations',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['math101-quiz-3a', 'math101-quiz-3b', 'math101-quiz-3c'],
    exerciseIds: [
      'math101-t3-drill-1',
      'math101-t3-drill-2',
      'math101-t3-drill-3',
      'math101-t3-drill-4',
      'math101-ex-3',
      'math101-t3-ex02',
      'math101-t3-ex03',
      'math101-t3-ex04',
      'math101-t3-ex05',
      'math101-t3-ex06',
      'math101-t3-ex07',
      'math101-t3-ex08',
      'math101-t3-ex09',
      'math101-t3-ex10',
      'math101-t3-ex11',
      'math101-t3-ex12',
      'math101-t3-ex13',
      'math101-t3-ex14',
      'math101-t3-ex15',
      'math101-t3-ex16'
    ]
  },
  {
    id: 'math101-topic-4',
    title: 'Relations',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['math101-quiz-4a', 'math101-quiz-4b', 'math101-quiz-4c'],
    exerciseIds: [
      'math101-t4-drill-1',
      'math101-t4-drill-2',
      'math101-t4-drill-3',
      'math101-t4-drill-4',
      'math101-ex-4',
      'math101-t4-ex02',
      'math101-t4-ex03',
      'math101-t4-ex04',
      'math101-t4-ex05',
      'math101-t4-ex06',
      'math101-t4-ex07',
      'math101-t4-ex08',
      'math101-t4-ex09',
      'math101-t4-ex10',
      'math101-t4-ex11',
      'math101-t4-ex12',
      'math101-t4-ex13',
      'math101-t4-ex14',
      'math101-t4-ex15',
      'math101-t4-ex16'
    ]
  },
  {
    id: 'math101-topic-5',
    title: 'Functions',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['math101-quiz-5a', 'math101-quiz-5b', 'math101-quiz-5c'],
    exerciseIds: [
      'math101-t5-drill-1',
      'math101-t5-drill-2',
      'math101-t5-drill-3',
      'math101-t5-drill-4',
      'math101-ex-5',
      'math101-t5-ex02',
      'math101-t5-ex03',
      'math101-t5-ex04',
      'math101-t5-ex05',
      'math101-t5-ex06',
      'math101-t5-ex07',
      'math101-t5-ex08',
      'math101-t5-ex09',
      'math101-t5-ex10',
      'math101-t5-ex11',
      'math101-t5-ex12',
      'math101-t5-ex13',
      'math101-t5-ex14',
      'math101-t5-ex15',
      'math101-t5-ex16'
    ]
  },
  {
    id: 'math101-topic-6',
    title: 'Predicate Logic and Quantifiers',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['math101-quiz-6a', 'math101-quiz-6b', 'math101-quiz-6c'],
    exerciseIds: [
      'math101-t6-drill-1',
      'math101-t6-drill-2',
      'math101-t6-drill-3',
      'math101-t6-drill-4',
      'math101-t6-ex01',
      'math101-t6-ex02',
      'math101-t6-ex03',
      'math101-t6-ex04',
      'math101-t6-ex05',
      'math101-t6-ex06',
      'math101-t6-ex07',
      'math101-t6-ex08',
      'math101-t6-ex09',
      'math101-t6-ex10',
      'math101-t6-ex11',
      'math101-t6-ex12',
      'math101-t6-ex13',
      'math101-t6-ex14',
      'math101-t6-ex15',
      'math101-t6-ex16'
    ]
  },
  {
    id: 'math101-topic-7',
    title: 'Sequences and Summations',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['math101-quiz-7a', 'math101-quiz-7b', 'math101-quiz-7c'],
    exerciseIds: [
      'math101-t7-drill-1',
      'math101-t7-drill-2',
      'math101-t7-drill-3',
      'math101-t7-drill-4',
      'math101-t7-ex01',
      'math101-t7-ex02',
      'math101-t7-ex03',
      'math101-t7-ex04',
      'math101-t7-ex05',
      'math101-t7-ex06',
      'math101-t7-ex07',
      'math101-t7-ex08',
      'math101-t7-ex09',
      'math101-t7-ex10',
      'math101-t7-ex11',
      'math101-t7-ex12',
      'math101-t7-ex13',
      'math101-t7-ex14',
      'math101-t7-ex15',
      'math101-t7-ex16'
    ]
  }
];
