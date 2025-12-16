import type { Topic, Subtopic } from '../../../core/types';

// Topic 1: Finite Automata
import topic1Content from '../../../content/subjects/cs203/topic-1.md?raw';
import topic1Sub1 from '../../../content/subjects/cs203/topic-1/01-dfa-fundamentals.md?raw';
import topic1Sub2 from '../../../content/subjects/cs203/topic-1/02-nfa-epsilon.md?raw';
import topic1Sub3 from '../../../content/subjects/cs203/topic-1/03-subset-construction.md?raw';
import topic1Sub4 from '../../../content/subjects/cs203/topic-1/04-dfa-minimization.md?raw';
import topic1Sub5 from '../../../content/subjects/cs203/topic-1/05-state-elimination.md?raw';
import topic1Sub6 from '../../../content/subjects/cs203/topic-1/06-closure-properties.md?raw';
import topic1Sub7 from '../../../content/subjects/cs203/topic-1/07-pumping-lemma.md?raw';

// Topic 2: Regular Languages and Expressions
import topic2Content from '../../../content/subjects/cs203/topic-2.md?raw';
import topic2Sub1 from '../../../content/subjects/cs203/topic-2/01-regex-syntax.md?raw';
import topic2Sub2 from '../../../content/subjects/cs203/topic-2/02-regex-semantics.md?raw';
import topic2Sub3 from '../../../content/subjects/cs203/topic-2/03-fa-to-regex.md?raw';
import topic2Sub4 from '../../../content/subjects/cs203/topic-2/04-regex-to-nfa.md?raw';
import topic2Sub5 from '../../../content/subjects/cs203/topic-2/05-algebraic-properties.md?raw';
import topic2Sub6 from '../../../content/subjects/cs203/topic-2/06-closure-properties.md?raw';
import topic2Sub7 from '../../../content/subjects/cs203/topic-2/07-decision-problems.md?raw';

// Topic 3: Context-Free Grammars
import topic3Content from '../../../content/subjects/cs203/topic-3.md?raw';
import topic3Sub1 from '../../../content/subjects/cs203/topic-3/01-grammar-definition.md?raw';
import topic3Sub2 from '../../../content/subjects/cs203/topic-3/02-derivations.md?raw';
import topic3Sub3 from '../../../content/subjects/cs203/topic-3/03-parse-trees.md?raw';
import topic3Sub4 from '../../../content/subjects/cs203/topic-3/04-ambiguity.md?raw';
import topic3Sub5 from '../../../content/subjects/cs203/topic-3/05-normal-forms.md?raw';
import topic3Sub6 from '../../../content/subjects/cs203/topic-3/06-pumping-lemma-cfl.md?raw';
import topic3Sub7 from '../../../content/subjects/cs203/topic-3/07-closure-properties-cfl.md?raw';

// Topic 4: Pushdown Automata
import topic4Content from '../../../content/subjects/cs203/topic-4.md?raw';
import topic4Sub1 from '../../../content/subjects/cs203/topic-4/01-pda-definition.md?raw';
import topic4Sub2 from '../../../content/subjects/cs203/topic-4/02-pda-computation.md?raw';
import topic4Sub3 from '../../../content/subjects/cs203/topic-4/03-acceptance-modes.md?raw';
import topic4Sub4 from '../../../content/subjects/cs203/topic-4/04-designing-pdas.md?raw';
import topic4Sub5 from '../../../content/subjects/cs203/topic-4/05-pda-to-cfg.md?raw';
import topic4Sub6 from '../../../content/subjects/cs203/topic-4/06-cfg-to-pda.md?raw';
import topic4Sub7 from '../../../content/subjects/cs203/topic-4/07-dpda.md?raw';

// Topic 5: Turing Machines
import topic5Content from '../../../content/subjects/cs203/topic-5.md?raw';
import topic5Sub1 from '../../../content/subjects/cs203/topic-5/01-tm-definition.md?raw';
import topic5Sub2 from '../../../content/subjects/cs203/topic-5/02-tm-computation.md?raw';
import topic5Sub3 from '../../../content/subjects/cs203/topic-5/03-designing-tms.md?raw';
import topic5Sub4 from '../../../content/subjects/cs203/topic-5/04-tm-variants.md?raw';
import topic5Sub5 from '../../../content/subjects/cs203/topic-5/05-equivalence.md?raw';
import topic5Sub6 from '../../../content/subjects/cs203/topic-5/06-universal-tm.md?raw';
import topic5Sub7 from '../../../content/subjects/cs203/topic-5/07-church-turing.md?raw';

// Topic 6: Decidability and Computability
import topic6Content from '../../../content/subjects/cs203/topic-6.md?raw';
import topic6Sub1 from '../../../content/subjects/cs203/topic-6/01-decidable-languages.md?raw';
import topic6Sub2 from '../../../content/subjects/cs203/topic-6/02-recognizable-languages.md?raw';
import topic6Sub3 from '../../../content/subjects/cs203/topic-6/03-diagonalization.md?raw';
import topic6Sub4 from '../../../content/subjects/cs203/topic-6/04-halting-problem.md?raw';
import topic6Sub5 from '../../../content/subjects/cs203/topic-6/05-reductions.md?raw';
import topic6Sub6 from '../../../content/subjects/cs203/topic-6/06-rices-theorem.md?raw';
import topic6Sub7 from '../../../content/subjects/cs203/topic-6/07-decidability-automata.md?raw';

// Topic 7: Computational Complexity
import topic7Content from '../../../content/subjects/cs203/topic-7.md?raw';
import topic7Sub1 from '../../../content/subjects/cs203/topic-7/01-time-complexity.md?raw';
import topic7Sub2 from '../../../content/subjects/cs203/topic-7/02-class-p.md?raw';
import topic7Sub3 from '../../../content/subjects/cs203/topic-7/03-class-np.md?raw';
import topic7Sub4 from '../../../content/subjects/cs203/topic-7/04-p-vs-np.md?raw';
import topic7Sub5 from '../../../content/subjects/cs203/topic-7/05-np-completeness.md?raw';
import topic7Sub6 from '../../../content/subjects/cs203/topic-7/06-polynomial-reductions.md?raw';
import topic7Sub7 from '../../../content/subjects/cs203/topic-7/07-space-complexity.md?raw';

// Topic 1 Subtopics
const topic1Subtopics: Subtopic[] = [
  { id: 'cs203-t1-dfa', slug: 'dfa-fundamentals', title: 'DFA Fundamentals', content: topic1Sub1, order: 1 },
  { id: 'cs203-t1-nfa', slug: 'nfa-epsilon', title: 'NFA and ε-Transitions', content: topic1Sub2, order: 2 },
  { id: 'cs203-t1-subset', slug: 'subset-construction', title: 'Subset Construction', content: topic1Sub3, order: 3 },
  { id: 'cs203-t1-minimize', slug: 'dfa-minimization', title: 'DFA Minimization', content: topic1Sub4, order: 4 },
  { id: 'cs203-t1-eliminate', slug: 'state-elimination', title: 'State Elimination', content: topic1Sub5, order: 5 },
  { id: 'cs203-t1-closure', slug: 'closure-properties', title: 'Closure Properties', content: topic1Sub6, order: 6 },
  { id: 'cs203-t1-pumping', slug: 'pumping-lemma', title: 'Pumping Lemma', content: topic1Sub7, order: 7 },
];

// Topic 2 Subtopics
const topic2Subtopics: Subtopic[] = [
  { id: 'cs203-t2-syntax', slug: 'regex-syntax', title: 'Regex Syntax', content: topic2Sub1, order: 1 },
  { id: 'cs203-t2-semantics', slug: 'regex-semantics', title: 'Regex Semantics', content: topic2Sub2, order: 2 },
  { id: 'cs203-t2-fatoregex', slug: 'fa-to-regex', title: 'FA to Regex Conversion', content: topic2Sub3, order: 3 },
  { id: 'cs203-t2-regextonfa', slug: 'regex-to-nfa', title: 'Regex to NFA Conversion', content: topic2Sub4, order: 4 },
  { id: 'cs203-t2-algebraic', slug: 'algebraic-properties', title: 'Algebraic Properties', content: topic2Sub5, order: 5 },
  { id: 'cs203-t2-closure', slug: 'closure-properties', title: 'Closure Properties', content: topic2Sub6, order: 6 },
  { id: 'cs203-t2-decision', slug: 'decision-problems', title: 'Decision Problems', content: topic2Sub7, order: 7 },
];

// Topic 3 Subtopics
const topic3Subtopics: Subtopic[] = [
  { id: 'cs203-t3-definition', slug: 'grammar-definition', title: 'Grammar Definition', content: topic3Sub1, order: 1 },
  { id: 'cs203-t3-derivations', slug: 'derivations', title: 'Derivations', content: topic3Sub2, order: 2 },
  { id: 'cs203-t3-parsetrees', slug: 'parse-trees', title: 'Parse Trees', content: topic3Sub3, order: 3 },
  { id: 'cs203-t3-ambiguity', slug: 'ambiguity', title: 'Ambiguity', content: topic3Sub4, order: 4 },
  { id: 'cs203-t3-normalforms', slug: 'normal-forms', title: 'Normal Forms', content: topic3Sub5, order: 5 },
  { id: 'cs203-t3-pumping', slug: 'pumping-lemma-cfl', title: 'Pumping Lemma for CFLs', content: topic3Sub6, order: 6 },
  { id: 'cs203-t3-closure', slug: 'closure-properties', title: 'Closure Properties', content: topic3Sub7, order: 7 },
];

// Topic 4 Subtopics
const topic4Subtopics: Subtopic[] = [
  { id: 'cs203-t4-definition', slug: 'pda-definition', title: 'PDA Definition', content: topic4Sub1, order: 1 },
  { id: 'cs203-t4-computation', slug: 'pda-computation', title: 'PDA Computation', content: topic4Sub2, order: 2 },
  { id: 'cs203-t4-acceptance', slug: 'acceptance-modes', title: 'Acceptance Modes', content: topic4Sub3, order: 3 },
  { id: 'cs203-t4-designing', slug: 'designing-pdas', title: 'Designing PDAs', content: topic4Sub4, order: 4 },
  { id: 'cs203-t4-pdatocfg', slug: 'pda-to-cfg', title: 'PDA to CFG Conversion', content: topic4Sub5, order: 5 },
  { id: 'cs203-t4-cfgtopda', slug: 'cfg-to-pda', title: 'CFG to PDA Conversion', content: topic4Sub6, order: 6 },
  { id: 'cs203-t4-dpda', slug: 'dpda', title: 'Deterministic PDAs', content: topic4Sub7, order: 7 },
];

// Topic 5 Subtopics
const topic5Subtopics: Subtopic[] = [
  { id: 'cs203-t5-definition', slug: 'tm-definition', title: 'TM Definition', content: topic5Sub1, order: 1 },
  { id: 'cs203-t5-computation', slug: 'tm-computation', title: 'TM Computation', content: topic5Sub2, order: 2 },
  { id: 'cs203-t5-designing', slug: 'designing-tms', title: 'Designing TMs', content: topic5Sub3, order: 3 },
  { id: 'cs203-t5-variants', slug: 'tm-variants', title: 'TM Variants', content: topic5Sub4, order: 4 },
  { id: 'cs203-t5-equivalence', slug: 'equivalence', title: 'Variant Equivalence', content: topic5Sub5, order: 5 },
  { id: 'cs203-t5-universal', slug: 'universal-tm', title: 'Universal Turing Machine', content: topic5Sub6, order: 6 },
  { id: 'cs203-t5-churchturing', slug: 'church-turing', title: 'Church-Turing Thesis', content: topic5Sub7, order: 7 },
];

// Topic 6 Subtopics
const topic6Subtopics: Subtopic[] = [
  { id: 'cs203-t6-decidable', slug: 'decidable-languages', title: 'Decidable Languages', content: topic6Sub1, order: 1 },
  { id: 'cs203-t6-recognizable', slug: 'recognizable-languages', title: 'Recognizable Languages', content: topic6Sub2, order: 2 },
  { id: 'cs203-t6-diagonalization', slug: 'diagonalization', title: 'Diagonalization', content: topic6Sub3, order: 3 },
  { id: 'cs203-t6-halting', slug: 'halting-problem', title: 'The Halting Problem', content: topic6Sub4, order: 4 },
  { id: 'cs203-t6-reductions', slug: 'reductions', title: 'Reductions', content: topic6Sub5, order: 5 },
  { id: 'cs203-t6-rice', slug: 'rices-theorem', title: "Rice's Theorem", content: topic6Sub6, order: 6 },
  { id: 'cs203-t6-automata', slug: 'decidability-automata', title: 'Decidability of Automata', content: topic6Sub7, order: 7 },
];

// Topic 7 Subtopics
const topic7Subtopics: Subtopic[] = [
  { id: 'cs203-t7-time', slug: 'time-complexity', title: 'Time Complexity', content: topic7Sub1, order: 1 },
  { id: 'cs203-t7-classp', slug: 'class-p', title: 'Class P', content: topic7Sub2, order: 2 },
  { id: 'cs203-t7-classnp', slug: 'class-np', title: 'Class NP', content: topic7Sub3, order: 3 },
  { id: 'cs203-t7-pvsnp', slug: 'p-vs-np', title: 'P vs NP Problem', content: topic7Sub4, order: 4 },
  { id: 'cs203-t7-npcomplete', slug: 'np-completeness', title: 'NP-Completeness', content: topic7Sub5, order: 5 },
  { id: 'cs203-t7-reductions', slug: 'polynomial-reductions', title: 'Polynomial Reductions', content: topic7Sub6, order: 6 },
  { id: 'cs203-t7-space', slug: 'space-complexity', title: 'Space Complexity', content: topic7Sub7, order: 7 },
];

export const cs203Topics: Topic[] = [
  {
    id: 'cs203-topic-1',
    title: 'Finite Automata',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['cs203-topic-1-quiz-1', 'cs203-topic-1-quiz-2', 'cs203-topic-1-quiz-3'],
    exerciseIds: [
      'cs203-t1-ex1', 'cs203-t1-ex2', 'cs203-t1-ex3', 'cs203-t1-ex4',
      'cs203-t1-ex5', 'cs203-t1-ex6', 'cs203-t1-ex7', 'cs203-t1-ex8',
      'cs203-t1-ex9', 'cs203-t1-ex10', 'cs203-t1-ex11', 'cs203-t1-ex12',
      'cs203-t1-ex13', 'cs203-t1-ex14', 'cs203-t1-ex15', 'cs203-t1-ex16',
    ],
  },
  {
    id: 'cs203-topic-2',
    title: 'Regular Languages and Expressions',
    content: topic2Content,
    subtopics: topic2Subtopics,
    quizIds: ['cs203-topic-2-quiz-1', 'cs203-topic-2-quiz-2', 'cs203-topic-2-quiz-3'],
    exerciseIds: [
      'cs203-t2-ex1', 'cs203-t2-ex2', 'cs203-t2-ex3', 'cs203-t2-ex4',
      'cs203-t2-ex5', 'cs203-t2-ex6', 'cs203-t2-ex7', 'cs203-t2-ex8',
      'cs203-t2-ex9', 'cs203-t2-ex10', 'cs203-t2-ex11', 'cs203-t2-ex12',
      'cs203-t2-ex13', 'cs203-t2-ex14', 'cs203-t2-ex15', 'cs203-t2-ex16',
    ],
  },
  {
    id: 'cs203-topic-3',
    title: 'Context-Free Grammars',
    content: topic3Content,
    subtopics: topic3Subtopics,
    quizIds: ['cs203-topic-3-quiz-1', 'cs203-topic-3-quiz-2', 'cs203-topic-3-quiz-3'],
    exerciseIds: [
      'cs203-t3-ex1', 'cs203-t3-ex2', 'cs203-t3-ex3', 'cs203-t3-ex4',
      'cs203-t3-ex5', 'cs203-t3-ex6', 'cs203-t3-ex7', 'cs203-t3-ex8',
      'cs203-t3-ex9', 'cs203-t3-ex10', 'cs203-t3-ex11', 'cs203-t3-ex12',
      'cs203-t3-ex13', 'cs203-t3-ex14', 'cs203-t3-ex15', 'cs203-t3-ex16',
    ],
  },
  {
    id: 'cs203-topic-4',
    title: 'Pushdown Automata',
    content: topic4Content,
    subtopics: topic4Subtopics,
    quizIds: ['cs203-topic-4-quiz-1', 'cs203-topic-4-quiz-2', 'cs203-topic-4-quiz-3'],
    exerciseIds: [
      'cs203-t4-ex1', 'cs203-t4-ex2', 'cs203-t4-ex3', 'cs203-t4-ex4',
      'cs203-t4-ex5', 'cs203-t4-ex6', 'cs203-t4-ex7', 'cs203-t4-ex8',
      'cs203-t4-ex9', 'cs203-t4-ex10', 'cs203-t4-ex11', 'cs203-t4-ex12',
      'cs203-t4-ex13', 'cs203-t4-ex14', 'cs203-t4-ex15', 'cs203-t4-ex16',
    ],
  },
  {
    id: 'cs203-topic-5',
    title: 'Turing Machines',
    content: topic5Content,
    subtopics: topic5Subtopics,
    quizIds: ['cs203-topic-5-quiz-1', 'cs203-topic-5-quiz-2', 'cs203-topic-5-quiz-3'],
    exerciseIds: [
      'cs203-t5-ex1', 'cs203-t5-ex2', 'cs203-t5-ex3', 'cs203-t5-ex4',
      'cs203-t5-ex5', 'cs203-t5-ex6', 'cs203-t5-ex7', 'cs203-t5-ex8',
      'cs203-t5-ex9', 'cs203-t5-ex10', 'cs203-t5-ex11', 'cs203-t5-ex12',
      'cs203-t5-ex13', 'cs203-t5-ex14', 'cs203-t5-ex15', 'cs203-t5-ex16',
    ],
  },
  {
    id: 'cs203-topic-6',
    title: 'Decidability and Computability',
    content: topic6Content,
    subtopics: topic6Subtopics,
    quizIds: ['cs203-topic-6-quiz-1', 'cs203-topic-6-quiz-2', 'cs203-topic-6-quiz-3'],
    exerciseIds: [
      'cs203-t6-ex1', 'cs203-t6-ex2', 'cs203-t6-ex3', 'cs203-t6-ex4',
      'cs203-t6-ex5', 'cs203-t6-ex6', 'cs203-t6-ex7', 'cs203-t6-ex8',
      'cs203-t6-ex9', 'cs203-t6-ex10', 'cs203-t6-ex11', 'cs203-t6-ex12',
      'cs203-t6-ex13', 'cs203-t6-ex14', 'cs203-t6-ex15', 'cs203-t6-ex16',
    ],
  },
  {
    id: 'cs203-topic-7',
    title: 'Computational Complexity',
    content: topic7Content,
    subtopics: topic7Subtopics,
    quizIds: ['cs203-topic-7-quiz-1', 'cs203-topic-7-quiz-2', 'cs203-topic-7-quiz-3'],
    exerciseIds: [
      'cs203-t7-ex1', 'cs203-t7-ex2', 'cs203-t7-ex3', 'cs203-t7-ex4',
      'cs203-t7-ex5', 'cs203-t7-ex6', 'cs203-t7-ex7', 'cs203-t7-ex8',
      'cs203-t7-ex9', 'cs203-t7-ex10', 'cs203-t7-ex11', 'cs203-t7-ex12',
      'cs203-t7-ex13', 'cs203-t7-ex14', 'cs203-t7-ex15', 'cs203-t7-ex16',
    ],
  },
];
