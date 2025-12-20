import type { Topic } from '../../core/types';

import topic1_1 from './content/topic-1/01-groups-introduction.md?raw';
import topic1_2 from './content/topic-1/02-group-axioms.md?raw';
import topic1_3 from './content/topic-1/03-basic-properties.md?raw';
import topic1_4 from './content/topic-1/04-subgroups.md?raw';
import topic1_5 from './content/topic-1/05-subgroup-tests.md?raw';
import topic1_6 from './content/topic-1/06-examples-groups.md?raw';
import topic1_7 from './content/topic-1/07-order-elements.md?raw';

import topic2_1 from './content/topic-2/01-cyclic-groups-def.md?raw';
import topic2_2 from './content/topic-2/02-generators.md?raw';
import topic2_3 from './content/topic-2/03-fundamental-theorem-cyclic.md?raw';
import topic2_4 from './content/topic-2/04-subgroups-cyclic.md?raw';
import topic2_5 from './content/topic-2/05-direct-products.md?raw';
import topic2_6 from './content/topic-2/06-classification.md?raw';
import topic2_7 from './content/topic-2/07-applications-cyclic.md?raw';

import topic3_1 from './content/topic-3/01-permutations-intro.md?raw';
import topic3_2 from './content/topic-3/02-symmetric-group.md?raw';
import topic3_3 from './content/topic-3/03-cycle-notation.md?raw';
import topic3_4 from './content/topic-3/04-even-odd-permutations.md?raw';
import topic3_5 from './content/topic-3/05-alternating-group.md?raw';
import topic3_6 from './content/topic-3/06-dihedral-groups.md?raw';
import topic3_7 from './content/topic-3/07-cayley-theorem.md?raw';

import topic4_1 from './content/topic-4/01-cosets-definition.md?raw';
import topic4_2 from './content/topic-4/02-lagrange-theorem.md?raw';
import topic4_3 from './content/topic-4/03-corollaries-lagrange.md?raw';
import topic4_4 from './content/topic-4/04-normal-subgroups.md?raw';
import topic4_5 from './content/topic-4/05-quotient-groups.md?raw';
import topic4_6 from './content/topic-4/06-simple-groups.md?raw';
import topic4_7 from './content/topic-4/07-conjugacy-classes.md?raw';

import topic5_1 from './content/topic-5/01-homomorphisms-def.md?raw';
import topic5_2 from './content/topic-5/02-kernels-images.md?raw';
import topic5_3 from './content/topic-5/03-first-isomorphism.md?raw';
import topic5_4 from './content/topic-5/04-second-third-isomorphism.md?raw';
import topic5_5 from './content/topic-5/05-automorphisms.md?raw';
import topic5_6 from './content/topic-5/06-group-actions.md?raw';
import topic5_7 from './content/topic-5/07-orbit-stabilizer.md?raw';

import topic6_1 from './content/topic-6/01-rings-definition.md?raw';
import topic6_2 from './content/topic-6/02-ring-properties.md?raw';
import topic6_3 from './content/topic-6/03-integral-domains.md?raw';
import topic6_4 from './content/topic-6/04-fields.md?raw';
import topic6_5 from './content/topic-6/05-ideals.md?raw';
import topic6_6 from './content/topic-6/06-quotient-rings.md?raw';
import topic6_7 from './content/topic-6/07-polynomial-rings.md?raw';

import topic7_1 from './content/topic-7/01-modular-arithmetic.md?raw';
import topic7_2 from './content/topic-7/02-euler-fermat.md?raw';
import topic7_3 from './content/topic-7/03-rsa-algorithm.md?raw';
import topic7_4 from './content/topic-7/04-diffie-hellman.md?raw';
import topic7_5 from './content/topic-7/05-elliptic-curves.md?raw';
import topic7_6 from './content/topic-7/06-error-correcting.md?raw';
import topic7_7 from './content/topic-7/07-finite-fields.md?raw';

export const math304Topics: Topic[] = [
  {
    id: 'math304-topic-1',
    title: 'Groups and Subgroups',
    content: 'Introduction to groups, group axioms, basic properties, and subgroups.',
    subtopics: [
      { id: 'math304-topic-1-1', slug: 'groups-introduction', order: 1, title: 'Introduction to Groups', content: topic1_1 },
      { id: 'math304-topic-1-2', slug: 'group-axioms', order: 2, title: 'Group Axioms', content: topic1_2 },
      { id: 'math304-topic-1-3', slug: 'basic-properties', order: 3, title: 'Basic Properties', content: topic1_3 },
      { id: 'math304-topic-1-4', slug: 'subgroups', order: 4, title: 'Subgroups', content: topic1_4 },
      { id: 'math304-topic-1-5', slug: 'subgroup-tests', order: 5, title: 'Subgroup Tests', content: topic1_5 },
      { id: 'math304-topic-1-6', slug: 'examples-groups', order: 6, title: 'Examples of Groups', content: topic1_6 },
      { id: 'math304-topic-1-7', slug: 'order-elements', order: 7, title: 'Order of Elements', content: topic1_7 }
    ],
    quizIds: ['math304-quiz-1-1', 'math304-quiz-1-2', 'math304-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math304-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math304-topic-2',
    title: 'Cyclic Groups and Generators',
    content: 'Cyclic groups, generators, classification, and direct products.',
    subtopics: [
      { id: 'math304-topic-2-1', slug: 'cyclic-groups-def', order: 1, title: 'Cyclic Groups Definition', content: topic2_1 },
      { id: 'math304-topic-2-2', slug: 'generators', order: 2, title: 'Generators', content: topic2_2 },
      { id: 'math304-topic-2-3', slug: 'fundamental-theorem-cyclic', order: 3, title: 'Fundamental Theorem', content: topic2_3 },
      { id: 'math304-topic-2-4', slug: 'subgroups-cyclic', order: 4, title: 'Subgroups of Cyclic Groups', content: topic2_4 },
      { id: 'math304-topic-2-5', slug: 'direct-products', order: 5, title: 'Direct Products', content: topic2_5 },
      { id: 'math304-topic-2-6', slug: 'classification', order: 6, title: 'Classification', content: topic2_6 },
      { id: 'math304-topic-2-7', slug: 'applications-cyclic', order: 7, title: 'Applications', content: topic2_7 }
    ],
    quizIds: ['math304-quiz-2-1', 'math304-quiz-2-2', 'math304-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math304-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math304-topic-3',
    title: 'Permutation Groups',
    content: 'Symmetric groups, cycle notation, alternating groups, and Cayley\'s theorem.',
    subtopics: [
      { id: 'math304-topic-3-1', slug: 'permutations-intro', order: 1, title: 'Introduction to Permutations', content: topic3_1 },
      { id: 'math304-topic-3-2', slug: 'symmetric-group', order: 2, title: 'The Symmetric Group', content: topic3_2 },
      { id: 'math304-topic-3-3', slug: 'cycle-notation', order: 3, title: 'Cycle Notation', content: topic3_3 },
      { id: 'math304-topic-3-4', slug: 'even-odd-permutations', order: 4, title: 'Even and Odd Permutations', content: topic3_4 },
      { id: 'math304-topic-3-5', slug: 'alternating-group', order: 5, title: 'Alternating Group', content: topic3_5 },
      { id: 'math304-topic-3-6', slug: 'dihedral-groups', order: 6, title: 'Dihedral Groups', content: topic3_6 },
      { id: 'math304-topic-3-7', slug: 'cayley-theorem', order: 7, title: 'Cayley\'s Theorem', content: topic3_7 }
    ],
    quizIds: ['math304-quiz-3-1', 'math304-quiz-3-2', 'math304-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math304-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math304-topic-4',
    title: 'Cosets and Lagrange\'s Theorem',
    content: 'Cosets, Lagrange\'s theorem, normal subgroups, and quotient groups.',
    subtopics: [
      { id: 'math304-topic-4-1', slug: 'cosets-definition', order: 1, title: 'Cosets Definition', content: topic4_1 },
      { id: 'math304-topic-4-2', slug: 'lagrange-theorem', order: 2, title: 'Lagrange\'s Theorem', content: topic4_2 },
      { id: 'math304-topic-4-3', slug: 'corollaries-lagrange', order: 3, title: 'Corollaries of Lagrange', content: topic4_3 },
      { id: 'math304-topic-4-4', slug: 'normal-subgroups', order: 4, title: 'Normal Subgroups', content: topic4_4 },
      { id: 'math304-topic-4-5', slug: 'quotient-groups', order: 5, title: 'Quotient Groups', content: topic4_5 },
      { id: 'math304-topic-4-6', slug: 'simple-groups', order: 6, title: 'Simple Groups', content: topic4_6 },
      { id: 'math304-topic-4-7', slug: 'conjugacy-classes', order: 7, title: 'Conjugacy Classes', content: topic4_7 }
    ],
    quizIds: ['math304-quiz-4-1', 'math304-quiz-4-2', 'math304-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math304-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math304-topic-5',
    title: 'Group Homomorphisms and Isomorphisms',
    content: 'Homomorphisms, isomorphism theorems, automorphisms, and group actions.',
    subtopics: [
      { id: 'math304-topic-5-1', slug: 'homomorphisms-def', order: 1, title: 'Homomorphisms Definition', content: topic5_1 },
      { id: 'math304-topic-5-2', slug: 'kernels-images', order: 2, title: 'Kernels and Images', content: topic5_2 },
      { id: 'math304-topic-5-3', slug: 'first-isomorphism', order: 3, title: 'First Isomorphism Theorem', content: topic5_3 },
      { id: 'math304-topic-5-4', slug: 'second-third-isomorphism', order: 4, title: 'Second and Third Isomorphism', content: topic5_4 },
      { id: 'math304-topic-5-5', slug: 'automorphisms', order: 5, title: 'Automorphisms', content: topic5_5 },
      { id: 'math304-topic-5-6', slug: 'group-actions', order: 6, title: 'Group Actions', content: topic5_6 },
      { id: 'math304-topic-5-7', slug: 'orbit-stabilizer', order: 7, title: 'Orbit-Stabilizer Theorem', content: topic5_7 }
    ],
    quizIds: ['math304-quiz-5-1', 'math304-quiz-5-2', 'math304-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math304-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math304-topic-6',
    title: 'Rings and Fields',
    content: 'Ring theory, integral domains, fields, ideals, and polynomial rings.',
    subtopics: [
      { id: 'math304-topic-6-1', slug: 'rings-definition', order: 1, title: 'Rings Definition', content: topic6_1 },
      { id: 'math304-topic-6-2', slug: 'ring-properties', order: 2, title: 'Ring Properties', content: topic6_2 },
      { id: 'math304-topic-6-3', slug: 'integral-domains', order: 3, title: 'Integral Domains', content: topic6_3 },
      { id: 'math304-topic-6-4', slug: 'fields', order: 4, title: 'Fields', content: topic6_4 },
      { id: 'math304-topic-6-5', slug: 'ideals', order: 5, title: 'Ideals', content: topic6_5 },
      { id: 'math304-topic-6-6', slug: 'quotient-rings', order: 6, title: 'Quotient Rings', content: topic6_6 },
      { id: 'math304-topic-6-7', slug: 'polynomial-rings', order: 7, title: 'Polynomial Rings', content: topic6_7 }
    ],
    quizIds: ['math304-quiz-6-1', 'math304-quiz-6-2', 'math304-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math304-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'math304-topic-7',
    title: 'Applications to Cryptography',
    content: 'Applications of abstract algebra to cryptography and coding theory.',
    subtopics: [
      { id: 'math304-topic-7-1', slug: 'modular-arithmetic', order: 1, title: 'Modular Arithmetic', content: topic7_1 },
      { id: 'math304-topic-7-2', slug: 'euler-fermat', order: 2, title: 'Euler and Fermat Theorems', content: topic7_2 },
      { id: 'math304-topic-7-3', slug: 'rsa-algorithm', order: 3, title: 'RSA Algorithm', content: topic7_3 },
      { id: 'math304-topic-7-4', slug: 'diffie-hellman', order: 4, title: 'Diffie-Hellman', content: topic7_4 },
      { id: 'math304-topic-7-5', slug: 'elliptic-curves', order: 5, title: 'Elliptic Curves', content: topic7_5 },
      { id: 'math304-topic-7-6', slug: 'error-correcting', order: 6, title: 'Error-Correcting Codes', content: topic7_6 },
      { id: 'math304-topic-7-7', slug: 'finite-fields', order: 7, title: 'Finite Fields', content: topic7_7 }
    ],
    quizIds: ['math304-quiz-7-1', 'math304-quiz-7-2', 'math304-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `math304-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
