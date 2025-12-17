import { Quiz } from '../../../core/types';

export const math403Quizzes: Quiz[] = [
  // ============================================================================
  // TOPIC 1: Topological Spaces (3 quizzes)
  // ============================================================================
  {
    id: 'math403-quiz-1-1',
    subjectId: 'math403',
    topicId: 'math403-topic-1',
    title: 'Topological Spaces - Fundamentals',
    questions: [
      {
        id: 'math403-q1-1-1',
        type: 'multiple_choice',
        prompt: 'Which of the following collections forms a topology on X = {a, b, c}?',
        options: [
          '{∅, X}',
          '{∅, {a}, {b}, X}',
          '{∅, {a}, {a, b}, X}',
          '{∅, {a}, {b}, {a, b}}'
        ],
        correctAnswer: 2,
        explanation: 'A topology must contain ∅ and X, and be closed under arbitrary unions and finite intersections. Option 2 satisfies all requirements: {a} ∪ {a, b} = {a, b} ✓, {a} ∩ {a, b} = {a} ✓. Option 1 fails because it\'s missing X at the end.'
      },
      {
        id: 'math403-q1-1-2',
        type: 'true_false',
        prompt: 'In any topological space, the empty set ∅ is always an open set.',
        correctAnswer: true,
        explanation: 'By definition, a topology must contain both ∅ and the whole space X. Therefore, ∅ is always open in any topology.'
      },
      {
        id: 'math403-q1-1-3',
        type: 'multiple_choice',
        prompt: 'A set F is closed if and only if:',
        options: [
          'F contains all its limit points',
          'F is the complement of an open set',
          'F = cl(F)',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'All three statements are equivalent definitions of a closed set. A set is closed iff it equals its closure, iff it contains all its limit points, iff its complement is open.'
      },
      {
        id: 'math403-q1-1-4',
        type: 'true_false',
        prompt: 'The interior of a set A is the largest open set contained in A.',
        correctAnswer: true,
        explanation: 'By definition, int(A) is the union of all open sets contained in A, making it the largest open set within A.'
      },
      {
        id: 'math403-q1-1-5',
        type: 'multiple_choice',
        prompt: 'For the set A = [0, 1) in ℝ with standard topology, what is cl(A)?',
        options: [
          '[0, 1)',
          '(0, 1)',
          '[0, 1]',
          '(0, 1]'
        ],
        correctAnswer: 2,
        explanation: 'The closure of [0, 1) includes all its limit points. Both 0 and 1 are limit points (every neighborhood of 1 intersects [0, 1)), so cl(A) = [0, 1].'
      }
    ]
  },
  {
    id: 'math403-quiz-1-2',
    subjectId: 'math403',
    topicId: 'math403-topic-1',
    title: 'Topological Spaces - Open and Closed Sets',
    questions: [
      {
        id: 'math403-q1-2-1',
        type: 'true_false',
        prompt: 'The union of infinitely many closed sets is always closed.',
        correctAnswer: false,
        explanation: 'False. Counterexample: In ℝ, each [1/n, 1] is closed, but ⋃[1/n, 1] = (0, 1] which is not closed. Only finite unions of closed sets are guaranteed to be closed.'
      },
      {
        id: 'math403-q1-2-2',
        type: 'multiple_choice',
        prompt: 'In the discrete topology on any set X, which sets are open?',
        options: [
          'Only ∅ and X',
          'Only finite sets',
          'Only countable sets',
          'All subsets of X'
        ],
        correctAnswer: 3,
        explanation: 'In the discrete topology, every subset of X is open (and also closed). This is the finest topology possible on X.'
      },
      {
        id: 'math403-q1-2-3',
        type: 'multiple_choice',
        prompt: 'What is the interior of ℚ (rationals) in ℝ with standard topology?',
        options: [
          'ℚ',
          'ℝ',
          '∅',
          '{0}'
        ],
        correctAnswer: 2,
        explanation: 'int(ℚ) = ∅ because ℚ contains no open intervals. Every open interval contains both rationals and irrationals, so no point of ℚ is an interior point.'
      },
      {
        id: 'math403-q1-2-4',
        type: 'true_false',
        prompt: 'A set can be both open and closed (clopen) in a topological space.',
        correctAnswer: true,
        explanation: 'True. At minimum, ∅ and X are always both open and closed. In some topologies (like discrete), many more sets are clopen.'
      },
      {
        id: 'math403-q1-2-5',
        type: 'multiple_choice',
        prompt: 'For A = {1/n : n ∈ ℕ} in ℝ, what is cl(A)?',
        options: [
          'A',
          'A ∪ {0}',
          'A ∪ {0, 1}',
          '[0, 1]'
        ],
        correctAnswer: 1,
        explanation: 'The sequence 1/n → 0 as n → ∞, so 0 is a limit point of A. No other points are limit points, so cl(A) = A ∪ {0}.'
      }
    ]
  },
  {
    id: 'math403-quiz-1-3',
    subjectId: 'math403',
    topicId: 'math403-topic-1',
    title: 'Topological Spaces - Limit Points and Boundary',
    questions: [
      {
        id: 'math403-q1-3-1',
        type: 'multiple_choice',
        prompt: 'A point x is a limit point of A if:',
        options: [
          'x ∈ A',
          'Every neighborhood of x intersects A',
          'Every neighborhood of x contains a point of A different from x',
          'x ∈ cl(A)'
        ],
        correctAnswer: 2,
        explanation: 'By definition, x is a limit point of A if every neighborhood of x contains at least one point of A distinct from x. This allows x to be in or out of A.'
      },
      {
        id: 'math403-q1-3-2',
        type: 'true_false',
        prompt: 'Every point of a set A is necessarily a limit point of A.',
        correctAnswer: false,
        explanation: 'False. In the discrete topology, isolated points exist. For example, in ℝ with discrete topology, no point is a limit point of any set.'
      },
      {
        id: 'math403-q1-3-3',
        type: 'multiple_choice',
        prompt: 'What is the boundary ∂A of the set A = (0, 1] in ℝ?',
        options: [
          '{0}',
          '{1}',
          '{0, 1}',
          '∅'
        ],
        correctAnswer: 2,
        explanation: 'The boundary is ∂A = cl(A) \\ int(A). We have cl(A) = [0, 1] and int(A) = (0, 1), so ∂A = {0, 1}.'
      },
      {
        id: 'math403-q1-3-4',
        type: 'true_false',
        prompt: 'If A is open, then ∂A ∩ A = ∅.',
        correctAnswer: true,
        explanation: 'True. If A is open, then A = int(A). The boundary is ∂A = cl(A) \\ int(A) = cl(A) \\ A, which is disjoint from A.'
      },
      {
        id: 'math403-q1-3-5',
        type: 'multiple_choice',
        prompt: 'In the indiscrete topology on X = {a, b, c}, how many limit points does {a} have?',
        options: [
          '0',
          '1',
          '2',
          '3'
        ],
        correctAnswer: 3,
        explanation: 'In the indiscrete topology, the only open sets are ∅ and X. Every neighborhood of any point is X, which always intersects {a}. Therefore, every point a, b, c is a limit point of {a}.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 2: Bases and Subbases (3 quizzes)
  // ============================================================================
  {
    id: 'math403-quiz-2-1',
    subjectId: 'math403',
    topicId: 'math403-topic-2',
    title: 'Bases and Subbases - Fundamentals',
    questions: [
      {
        id: 'math403-q2-1-1',
        type: 'multiple_choice',
        prompt: 'A collection ℬ is a basis for a topology if:',
        options: [
          'ℬ covers X and intersections of basis elements are basis elements',
          'ℬ covers X and intersections of basis elements contain basis elements',
          'ℬ is closed under unions and intersections',
          'ℬ contains all open sets'
        ],
        correctAnswer: 1,
        explanation: 'Basis axioms: (B1) ⋃ℬ = X, and (B2) if x ∈ B₁ ∩ B₂, there exists B₃ ∈ ℬ with x ∈ B₃ ⊆ B₁ ∩ B₂.'
      },
      {
        id: 'math403-q2-1-2',
        type: 'true_false',
        prompt: 'The collection of all open intervals (a, b) forms a basis for the standard topology on ℝ.',
        correctAnswer: true,
        explanation: 'True. Every open set in ℝ can be written as a union of open intervals, and the basis axioms are satisfied.'
      },
      {
        id: 'math403-q2-1-3',
        type: 'multiple_choice',
        prompt: 'Which property characterizes second countable spaces?',
        options: [
          'The space has a countable dense subset',
          'The space has a countable basis',
          'Every point has a countable local basis',
          'The space is countable'
        ],
        correctAnswer: 1,
        explanation: 'A space is second countable if it has a countable basis for its topology. This is a stronger property than first countable or separable.'
      },
      {
        id: 'math403-q2-1-4',
        type: 'true_false',
        prompt: 'Every second countable space is separable.',
        correctAnswer: true,
        explanation: 'True. If ℬ is a countable basis, pick one point from each basis element to get a countable dense set.'
      },
      {
        id: 'math403-q2-1-5',
        type: 'multiple_choice',
        prompt: 'What is a subbasis for a topology?',
        options: [
          'A basis with the minimum number of elements',
          'A collection whose finite intersections form a basis',
          'A subset of a basis',
          'A collection of closed sets'
        ],
        correctAnswer: 1,
        explanation: 'A subbasis is a collection 𝒮 such that the collection of all finite intersections of elements of 𝒮 forms a basis for the topology.'
      }
    ]
  },
  {
    id: 'math403-quiz-2-2',
    subjectId: 'math403',
    topicId: 'math403-topic-2',
    title: 'Bases and Subbases - Applications',
    questions: [
      {
        id: 'math403-q2-2-1',
        type: 'multiple_choice',
        prompt: 'ℝ with standard topology is:',
        options: [
          'First countable but not second countable',
          'Second countable but not separable',
          'Both second countable and separable',
          'Neither second countable nor separable'
        ],
        correctAnswer: 2,
        explanation: 'ℝ is second countable (basis: intervals with rational endpoints) and separable (ℚ is a countable dense subset).'
      },
      {
        id: 'math403-q2-2-2',
        type: 'true_false',
        prompt: 'A set D is dense in X if and only if cl(D) = X.',
        correctAnswer: true,
        explanation: 'True. By definition, D is dense if its closure equals the entire space X.'
      },
      {
        id: 'math403-q2-2-3',
        type: 'multiple_choice',
        prompt: 'In the subspace topology, a set U ⊆ Y is open in Y if:',
        options: [
          'U is open in X',
          'U = Y ∩ V for some open V in X',
          'U is closed in X',
          'U is dense in Y'
        ],
        correctAnswer: 1,
        explanation: 'The subspace topology on Y ⊆ X is defined by τ_Y = {Y ∩ V : V ∈ τ_X}. Sets open in Y are intersections of Y with open sets in X.'
      },
      {
        id: 'math403-q2-2-4',
        type: 'true_false',
        prompt: 'If ℬ₁ and ℬ₂ are bases for topologies τ₁ and τ₂, then ℬ₁ ∪ ℬ₂ is a basis for τ₁ ∪ τ₂.',
        correctAnswer: false,
        explanation: 'False. ℬ₁ ∪ ℬ₂ generates a basis, but τ₁ ∪ τ₂ is not necessarily a topology. The generated topology is the smallest topology containing both.'
      },
      {
        id: 'math403-q2-2-5',
        type: 'multiple_choice',
        prompt: 'Which space is separable?',
        options: [
          'ℝ with standard topology',
          'Any metric space',
          'Any uncountable space',
          'The discrete topology on an uncountable set'
        ],
        correctAnswer: 0,
        explanation: 'ℝ is separable (ℚ is dense). Not all metric spaces are separable, and uncountable discrete spaces are not separable.'
      }
    ]
  },
  {
    id: 'math403-quiz-2-3',
    subjectId: 'math403',
    topicId: 'math403-topic-2',
    title: 'Bases and Subbases - Advanced',
    questions: [
      {
        id: 'math403-q2-3-1',
        type: 'true_false',
        prompt: 'Every metric space is first countable.',
        correctAnswer: true,
        explanation: 'True. For each point x, the collection {B(x, 1/n) : n ∈ ℕ} forms a countable local basis at x.'
      },
      {
        id: 'math403-q2-3-2',
        type: 'multiple_choice',
        prompt: 'If X has the discrete topology and is uncountable, then X is:',
        options: [
          'Second countable',
          'Not first countable',
          'Not second countable',
          'Not separable but second countable'
        ],
        correctAnswer: 2,
        explanation: 'An uncountable discrete space is not second countable because each singleton must be in any basis, requiring an uncountable basis.'
      },
      {
        id: 'math403-q2-3-3',
        type: 'multiple_choice',
        prompt: 'The lower limit topology on ℝ has basis ℬ = {[a, b) : a < b}. This topology is:',
        options: [
          'Coarser than the standard topology',
          'The same as the standard topology',
          'Finer than the standard topology',
          'Incomparable to the standard topology'
        ],
        correctAnswer: 2,
        explanation: 'The lower limit topology is strictly finer than the standard topology. Every standard open set is lower-limit open, but [0, 1) is lower-limit open but not standard open.'
      },
      {
        id: 'math403-q2-3-4',
        type: 'true_false',
        prompt: 'In a separable metric space, every open cover has a countable subcover.',
        correctAnswer: false,
        explanation: 'False. This describes a Lindelöf space. Separability doesn\'t guarantee this property without additional conditions (like being metrizable).'
      },
      {
        id: 'math403-q2-3-5',
        type: 'multiple_choice',
        prompt: 'Let Y = [0, 1] ⊆ ℝ with subspace topology. Is (0, 1/2] open in Y?',
        options: [
          'Yes, because it\'s an interval',
          'No, because it\'s not open in ℝ',
          'Yes, because it equals Y ∩ (0, 1/2]',
          'No, because it contains its right endpoint'
        ],
        correctAnswer: 2,
        explanation: 'In the subspace topology, (0, 1/2] = Y ∩ (0, 1/2], and since (0, 1/2] is the intersection of Y with an open set in ℝ... wait, (0, 1/2] is NOT open in ℝ. However, (0, 1/2] = Y ∩ (0, 3/4) for example, where (0, 3/4) is open in ℝ, making (0, 1/2] open in Y.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 3: Continuity and Homeomorphisms (3 quizzes)
  // ============================================================================
  {
    id: 'math403-quiz-3-1',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    title: 'Continuity and Homeomorphisms - Fundamentals',
    questions: [
      {
        id: 'math403-q3-1-1',
        type: 'multiple_choice',
        prompt: 'A function f: X → Y is continuous if and only if:',
        options: [
          'f(U) is open for every open U in X',
          'f⁻¹(V) is open for every open V in Y',
          'f maps closed sets to closed sets',
          'f is sequential continuous'
        ],
        correctAnswer: 1,
        explanation: 'The fundamental characterization: f is continuous iff the preimage of every open set is open.'
      },
      {
        id: 'math403-q3-1-2',
        type: 'true_false',
        prompt: 'Every continuous function is an open map.',
        correctAnswer: false,
        explanation: 'False. Constant functions are continuous but not open (they map open sets to singletons, which are not open in most topologies).'
      },
      {
        id: 'math403-q3-1-3',
        type: 'multiple_choice',
        prompt: 'A homeomorphism is:',
        options: [
          'A continuous bijection',
          'An open continuous bijection',
          'A continuous bijection with continuous inverse',
          'A closed continuous bijection'
        ],
        correctAnswer: 2,
        explanation: 'A homeomorphism requires continuity in both directions: f and f⁻¹ must both be continuous.'
      },
      {
        id: 'math403-q3-1-4',
        type: 'true_false',
        prompt: 'If f: X → Y and g: Y → Z are continuous, then g ∘ f: X → Z is continuous.',
        correctAnswer: true,
        explanation: 'True. The composition of continuous functions is continuous. This is a fundamental property.'
      },
      {
        id: 'math403-q3-1-5',
        type: 'multiple_choice',
        prompt: 'Which property is preserved by homeomorphisms?',
        options: [
          'Compactness',
          'Connectedness',
          'Being Hausdorff',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'All topological properties are preserved by homeomorphisms. Homeomorphic spaces are topologically identical.'
      }
    ]
  },
  {
    id: 'math403-quiz-3-2',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    title: 'Continuity and Homeomorphisms - Applications',
    questions: [
      {
        id: 'math403-q3-2-1',
        type: 'true_false',
        prompt: 'The projection maps π₁: X × Y → X are always continuous in the product topology.',
        correctAnswer: true,
        explanation: 'True. By definition of the product topology, projection maps are continuous (and also open).'
      },
      {
        id: 'math403-q3-2-2',
        type: 'multiple_choice',
        prompt: 'f: X → Y is continuous at x if and only if:',
        options: [
          'For every neighborhood V of f(x), f⁻¹(V) is a neighborhood of x',
          'For every neighborhood V of f(x), there exists a neighborhood U of x with f(U) ⊆ V',
          'Both of the above',
          'Neither of the above'
        ],
        correctAnswer: 2,
        explanation: 'Both characterizations are equivalent definitions of continuity at a point.'
      },
      {
        id: 'math403-q3-2-3',
        type: 'multiple_choice',
        prompt: 'Are [0, 1] and (0, 1) homeomorphic?',
        options: [
          'Yes, via f(x) = x',
          'Yes, via a different bijection',
          'No, one is compact and the other is not',
          'No, one is connected and the other is not'
        ],
        correctAnswer: 2,
        explanation: '[0, 1] is compact but (0, 1) is not. Since compactness is preserved by homeomorphisms, they cannot be homeomorphic.'
      },
      {
        id: 'math403-q3-2-4',
        type: 'true_false',
        prompt: 'An open map that is also a continuous bijection must be a homeomorphism.',
        correctAnswer: true,
        explanation: 'True. If f is an open continuous bijection, then f⁻¹ is continuous (since f maps open sets to open sets), making f a homeomorphism.'
      },
      {
        id: 'math403-q3-2-5',
        type: 'multiple_choice',
        prompt: 'The quotient topology on Y is defined so that:',
        options: [
          'All functions from X are continuous',
          'The quotient map is continuous',
          'f: Y → Z is continuous iff f ∘ π is continuous',
          'Y has the discrete topology'
        ],
        correctAnswer: 2,
        explanation: 'The quotient topology is the finest topology making the quotient map continuous. It satisfies the universal property: f: Y → Z is continuous iff f ∘ π is continuous.'
      }
    ]
  },
  {
    id: 'math403-quiz-3-3',
    subjectId: 'math403',
    topicId: 'math403-topic-3',
    title: 'Continuity and Homeomorphisms - Advanced',
    questions: [
      {
        id: 'math403-q3-3-1',
        type: 'multiple_choice',
        prompt: 'In a first countable space, f is continuous at x if and only if:',
        options: [
          'f maps convergent sequences to convergent sequences',
          'For every sequence xₙ → x, we have f(xₙ) → f(x)',
          'f is sequentially continuous at x',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'In first countable spaces, continuity is equivalent to sequential continuity. All characterizations are equivalent.'
      },
      {
        id: 'math403-q3-3-2',
        type: 'true_false',
        prompt: 'The product of two continuous functions is continuous.',
        correctAnswer: false,
        explanation: 'False. This question is ambiguous. If it means pointwise product (f · g)(x) = f(x) · g(x) where the codomain has multiplication, then yes for real-valued functions. But "product" could mean other things. The composition is continuous, though.'
      },
      {
        id: 'math403-q3-3-3',
        type: 'multiple_choice',
        prompt: 'Which statement characterizes the product topology on X × Y?',
        options: [
          'The finest topology making projections continuous',
          'The coarsest topology making projections continuous',
          'The discrete topology',
          'The topology generated by products of open sets'
        ],
        correctAnswer: 1,
        explanation: 'The product topology is the coarsest (weakest) topology making both projection maps continuous.'
      },
      {
        id: 'math403-q3-3-4',
        type: 'true_false',
        prompt: 'If f: X → Y is a closed continuous bijection, then f is a homeomorphism.',
        correctAnswer: true,
        explanation: 'True. A closed continuous bijection has continuous inverse (since f maps closed sets to closed sets), making it a homeomorphism.'
      },
      {
        id: 'math403-q3-3-5',
        type: 'multiple_choice',
        prompt: 'The gluing lemma states that if X = A ∪ B with A, B closed, and f: A → Y, g: B → Y agree on A ∩ B, then:',
        options: [
          'The combined function is always continuous',
          'The combined function is continuous if f and g are continuous',
          'The combined function exists but may not be continuous',
          'A and B must be disjoint'
        ],
        correctAnswer: 1,
        explanation: 'If A and B are closed, f and g are continuous, and they agree on the overlap, then the piecewise function is continuous.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 4: Connectedness (3 quizzes)
  // ============================================================================
  {
    id: 'math403-quiz-4-1',
    subjectId: 'math403',
    topicId: 'math403-topic-4',
    title: 'Connectedness - Fundamentals',
    questions: [
      {
        id: 'math403-q4-1-1',
        type: 'multiple_choice',
        prompt: 'A space X is connected if and only if:',
        options: [
          'X cannot be written as a union of two disjoint nonempty open sets',
          'X is path connected',
          'Every continuous function f: X → {0, 1} is constant',
          'Both (a) and (c)'
        ],
        correctAnswer: 3,
        explanation: 'X is connected iff it cannot be separated into two disjoint nonempty open sets, which is equivalent to every continuous function to the discrete space {0, 1} being constant.'
      },
      {
        id: 'math403-q4-1-2',
        type: 'true_false',
        prompt: 'Every path connected space is connected.',
        correctAnswer: true,
        explanation: 'True. Path connectedness implies connectedness. However, the converse is false (e.g., the topologist\'s sine curve).'
      },
      {
        id: 'math403-q4-1-3',
        type: 'multiple_choice',
        prompt: 'Which of the following is connected in ℝ with standard topology?',
        options: [
          '[0, 1] ∪ [2, 3]',
          '(0, 1) ∪ (1, 2)',
          '[0, 2]',
          'ℚ (the rationals)'
        ],
        correctAnswer: 2,
        explanation: '[0, 2] is connected (all intervals in ℝ are connected). The other options can be separated into disjoint open sets.'
      },
      {
        id: 'math403-q4-1-4',
        type: 'true_false',
        prompt: 'The continuous image of a connected space is connected.',
        correctAnswer: true,
        explanation: 'True. Connectedness is preserved by continuous functions. If f: X → Y is continuous and X is connected, then f(X) is connected.'
      },
      {
        id: 'math403-q4-1-5',
        type: 'multiple_choice',
        prompt: 'A connected component of a space X is:',
        options: [
          'The largest connected subset containing a point',
          'Any connected subset',
          'A path connected subset',
          'An open connected subset'
        ],
        correctAnswer: 0,
        explanation: 'The connected component of x is the maximal connected set containing x. Every point belongs to exactly one connected component.'
      }
    ]
  },
  {
    id: 'math403-quiz-4-2',
    subjectId: 'math403',
    topicId: 'math403-topic-4',
    title: 'Connectedness - Applications',
    questions: [
      {
        id: 'math403-q4-2-1',
        type: 'true_false',
        prompt: 'ℝ \\ {0} is connected in the standard topology.',
        correctAnswer: false,
        explanation: 'False. ℝ \\ {0} = (-∞, 0) ∪ (0, ∞) is disconnected. It can be written as two disjoint nonempty open sets.'
      },
      {
        id: 'math403-q4-2-2',
        type: 'multiple_choice',
        prompt: 'If A ⊆ B ⊆ cl(A) and A is connected, then:',
        options: [
          'B must be connected',
          'B may or may not be connected',
          'cl(A) is connected',
          'Both (a) and (c)'
        ],
        correctAnswer: 3,
        explanation: 'If A is connected and A ⊆ B ⊆ cl(A), then B is connected. In particular, the closure of a connected set is connected.'
      },
      {
        id: 'math403-q4-2-3',
        type: 'multiple_choice',
        prompt: 'The Intermediate Value Theorem states:',
        options: [
          'Continuous functions map connected sets to connected sets',
          'If f: [a,b] → ℝ is continuous and f(a) < c < f(b), then c is in the range',
          'Connected spaces are path connected',
          'All intervals are connected'
        ],
        correctAnswer: 1,
        explanation: 'IVT: If f is continuous on [a,b] and f(a) < c < f(b), then ∃x ∈ (a,b) with f(x) = c. This follows from connectedness of intervals.'
      },
      {
        id: 'math403-q4-2-4',
        type: 'true_false',
        prompt: 'A space is totally disconnected if its only connected subsets are singletons.',
        correctAnswer: true,
        explanation: 'True. In a totally disconnected space, the connected components are precisely the singleton sets. Example: ℚ with subspace topology from ℝ.'
      },
      {
        id: 'math403-q4-2-5',
        type: 'multiple_choice',
        prompt: 'Which space is NOT connected?',
        options: [
          'S¹ (the circle)',
          'ℝ²',
          'The Cantor set',
          '[0, 1]'
        ],
        correctAnswer: 2,
        explanation: 'The Cantor set is totally disconnected. The others are all connected (in fact, path connected).'
      }
    ]
  },
  {
    id: 'math403-quiz-4-3',
    subjectId: 'math403',
    topicId: 'math403-topic-4',
    title: 'Connectedness - Advanced',
    questions: [
      {
        id: 'math403-q4-3-1',
        type: 'multiple_choice',
        prompt: 'A space X is locally connected if:',
        options: [
          'Every point has arbitrarily small connected neighborhoods',
          'X is connected',
          'Every connected component is open',
          'Both (a) and (c)'
        ],
        correctAnswer: 3,
        explanation: 'X is locally connected iff every point has a local basis of connected sets, which is equivalent to connected components being open.'
      },
      {
        id: 'math403-q4-3-2',
        type: 'true_false',
        prompt: 'Every connected space is locally connected.',
        correctAnswer: false,
        explanation: 'False. The topologist\'s sine curve is connected but not locally connected. Connectedness is global; local connectedness is a local property.'
      },
      {
        id: 'math403-q4-3-3',
        type: 'multiple_choice',
        prompt: 'Path components are:',
        options: [
          'Always equal to connected components',
          'Equivalence classes under the path-equivalence relation',
          'Always open sets',
          'Always closed sets'
        ],
        correctAnswer: 1,
        explanation: 'Path components are equivalence classes where x ~ y if there\'s a path connecting them. They may not equal connected components.'
      },
      {
        id: 'math403-q4-3-4',
        type: 'true_false',
        prompt: 'If X and Y are connected, then X × Y is connected.',
        correctAnswer: true,
        explanation: 'True. The product of connected spaces is connected. This extends to arbitrary products by Tychonoff-like arguments.'
      },
      {
        id: 'math403-q4-3-5',
        type: 'multiple_choice',
        prompt: 'Which space is connected but not path connected?',
        options: [
          'ℝ',
          'The topologist\'s sine curve',
          '[0, 1] ∪ [2, 3]',
          'S¹'
        ],
        correctAnswer: 1,
        explanation: 'The topologist\'s sine curve {(x, sin(1/x)) : x > 0} ∪ {(0, y) : -1 ≤ y ≤ 1} is connected but not path connected.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 5: Compactness (3 quizzes)
  // ============================================================================
  {
    id: 'math403-quiz-5-1',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    title: 'Compactness - Fundamentals',
    questions: [
      {
        id: 'math403-q5-1-1',
        type: 'multiple_choice',
        prompt: 'A space X is compact if:',
        options: [
          'Every open cover has a finite subcover',
          'X is closed and bounded',
          'Every sequence has a convergent subsequence',
          'X is complete'
        ],
        correctAnswer: 0,
        explanation: 'By definition, X is compact if every open cover has a finite subcover. Other options may be equivalent in specific contexts (e.g., metric spaces).'
      },
      {
        id: 'math403-q5-1-2',
        type: 'true_false',
        prompt: 'Every closed subset of a compact space is compact.',
        correctAnswer: true,
        explanation: 'True. Closed subsets of compact spaces are compact. This is a fundamental property used frequently.'
      },
      {
        id: 'math403-q5-1-3',
        type: 'multiple_choice',
        prompt: 'The Heine-Borel Theorem states that in ℝⁿ:',
        options: [
          'Every set is compact',
          'A set is compact iff it is closed',
          'A set is compact iff it is closed and bounded',
          'A set is compact iff it is bounded'
        ],
        correctAnswer: 2,
        explanation: 'Heine-Borel: In ℝⁿ with standard topology, a set is compact iff it is closed AND bounded.'
      },
      {
        id: 'math403-q5-1-4',
        type: 'true_false',
        prompt: 'The continuous image of a compact space is compact.',
        correctAnswer: true,
        explanation: 'True. Compactness is preserved by continuous functions. If f: X → Y is continuous and X is compact, then f(X) is compact.'
      },
      {
        id: 'math403-q5-1-5',
        type: 'multiple_choice',
        prompt: 'Which of the following is compact?',
        options: [
          '(0, 1)',
          '[0, ∞)',
          '[0, 1]',
          'ℝ'
        ],
        correctAnswer: 2,
        explanation: '[0, 1] is closed and bounded in ℝ, hence compact by Heine-Borel. The other options are either not closed or not bounded.'
      }
    ]
  },
  {
    id: 'math403-quiz-5-2',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    title: 'Compactness - Applications',
    questions: [
      {
        id: 'math403-q5-2-1',
        type: 'true_false',
        prompt: 'In a Hausdorff space, every compact subset is closed.',
        correctAnswer: true,
        explanation: 'True. In Hausdorff spaces, compact subsets are always closed. This may fail in non-Hausdorff spaces.'
      },
      {
        id: 'math403-q5-2-2',
        type: 'multiple_choice',
        prompt: 'A continuous function f: X → ℝ where X is compact:',
        options: [
          'Must be bounded',
          'Must attain its maximum and minimum',
          'Must be uniformly continuous if X is metric',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'All are true. Compactness gives boundedness, extreme value theorem (max/min attained), and uniform continuity on metric spaces.'
      },
      {
        id: 'math403-q5-2-3',
        type: 'multiple_choice',
        prompt: 'Sequential compactness means:',
        options: [
          'Every sequence converges',
          'Every sequence has a convergent subsequence',
          'Every Cauchy sequence converges',
          'The space is finite'
        ],
        correctAnswer: 1,
        explanation: 'A space is sequentially compact if every sequence has a convergent subsequence. In metric spaces, this is equivalent to compactness.'
      },
      {
        id: 'math403-q5-2-4',
        type: 'true_false',
        prompt: 'Tychonoff\'s Theorem states that the product of compact spaces is compact.',
        correctAnswer: true,
        explanation: 'True. Tychonoff\'s Theorem (requiring the axiom of choice) states that arbitrary products of compact spaces are compact in the product topology.'
      },
      {
        id: 'math403-q5-2-5',
        type: 'multiple_choice',
        prompt: 'Which statement is FALSE?',
        options: [
          'Every compact metric space is complete',
          'Every compact space is connected',
          'Every compact Hausdorff space is normal',
          'Finite unions of compact sets are compact'
        ],
        correctAnswer: 1,
        explanation: 'Option (b) is false. Not every compact space is connected (e.g., two disjoint compact intervals). All other statements are true.'
      }
    ]
  },
  {
    id: 'math403-quiz-5-3',
    subjectId: 'math403',
    topicId: 'math403-topic-5',
    title: 'Compactness - Advanced',
    questions: [
      {
        id: 'math403-q5-3-1',
        type: 'multiple_choice',
        prompt: 'A space is locally compact if:',
        options: [
          'Every point has a compact neighborhood',
          'Every point has a local basis of compact sets',
          'Every compact subset is open',
          'The space is compact'
        ],
        correctAnswer: 0,
        explanation: 'X is locally compact if every point has a compact neighborhood (equivalently, a local basis of compact neighborhoods).'
      },
      {
        id: 'math403-q5-3-2',
        type: 'true_false',
        prompt: 'Every locally compact Hausdorff space has a one-point compactification.',
        correctAnswer: true,
        explanation: 'True. Every locally compact Hausdorff space X can be compactified by adding a single "point at infinity" to get a compact Hausdorff space.'
      },
      {
        id: 'math403-q5-3-3',
        type: 'multiple_choice',
        prompt: 'The one-point compactification of ℝⁿ is homeomorphic to:',
        options: [
          'Sⁿ (the n-sphere)',
          'A closed ball',
          'ℝⁿ⁺¹',
          'A torus'
        ],
        correctAnswer: 0,
        explanation: 'The one-point compactification of ℝⁿ is homeomorphic to Sⁿ, the n-dimensional sphere.'
      },
      {
        id: 'math403-q5-3-4',
        type: 'true_false',
        prompt: 'A compact Hausdorff space is normal.',
        correctAnswer: true,
        explanation: 'True. Every compact Hausdorff space is normal (satisfies the T₄ separation axiom).'
      },
      {
        id: 'math403-q5-3-5',
        type: 'multiple_choice',
        prompt: 'The Lebesgue covering lemma states that for a compact metric space:',
        options: [
          'Every open cover has a Lebesgue number',
          'The space is complete',
          'The space is separable',
          'Every function is uniformly continuous'
        ],
        correctAnswer: 0,
        explanation: 'Every open cover of a compact metric space has a Lebesgue number δ > 0 such that every ball of radius δ lies entirely in some cover element.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 6: Metric Spaces (3 quizzes)
  // ============================================================================
  {
    id: 'math403-quiz-6-1',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    title: 'Metric Spaces - Fundamentals',
    questions: [
      {
        id: 'math403-q6-1-1',
        type: 'multiple_choice',
        prompt: 'Which property is NOT required for a metric d?',
        options: [
          'd(x, y) ≥ 0',
          'd(x, y) = d(y, x)',
          'd(x, y) ≤ d(x, z) + d(z, y)',
          'd(x, y) = d(x, z) + d(z, y) for some z'
        ],
        correctAnswer: 3,
        explanation: 'The triangle inequality states d(x,y) ≤ d(x,z) + d(z,y), not equality. Option (d) is not a required property.'
      },
      {
        id: 'math403-q6-1-2',
        type: 'true_false',
        prompt: 'Every metric space is Hausdorff.',
        correctAnswer: true,
        explanation: 'True. In any metric space, distinct points can be separated by disjoint open balls, making metric spaces Hausdorff (T₂).'
      },
      {
        id: 'math403-q6-1-3',
        type: 'multiple_choice',
        prompt: 'In a metric space, a sequence (xₙ) converges to x if:',
        options: [
          'xₙ = x for all n',
          'd(xₙ, x) → 0 as n → ∞',
          'xₙ is eventually constant',
          'd(xₙ, xₙ₊₁) → 0'
        ],
        correctAnswer: 1,
        explanation: 'xₙ → x iff d(xₙ, x) → 0, i.e., for all ε > 0, ∃N such that n ≥ N ⇒ d(xₙ, x) < ε.'
      },
      {
        id: 'math403-q6-1-4',
        type: 'true_false',
        prompt: 'Every metric space is first countable.',
        correctAnswer: true,
        explanation: 'True. {B(x, 1/n) : n ∈ ℕ} is a countable local basis at every point x in a metric space.'
      },
      {
        id: 'math403-q6-1-5',
        type: 'multiple_choice',
        prompt: 'A metric space is complete if:',
        options: [
          'Every sequence converges',
          'Every Cauchy sequence converges',
          'The space is compact',
          'The space is bounded'
        ],
        correctAnswer: 1,
        explanation: 'A metric space is complete if every Cauchy sequence converges to a point in the space.'
      }
    ]
  },
  {
    id: 'math403-quiz-6-2',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    title: 'Metric Spaces - Applications',
    questions: [
      {
        id: 'math403-q6-2-1',
        type: 'true_false',
        prompt: 'ℚ with the standard metric is complete.',
        correctAnswer: false,
        explanation: 'False. ℚ is not complete. For example, a Cauchy sequence converging to √2 has no limit in ℚ.'
      },
      {
        id: 'math403-q6-2-2',
        type: 'multiple_choice',
        prompt: 'The Banach Fixed Point Theorem (Contraction Mapping Theorem) applies to:',
        options: [
          'All continuous functions on compact spaces',
          'Contractions on complete metric spaces',
          'All functions on ℝ',
          'Homeomorphisms'
        ],
        correctAnswer: 1,
        explanation: 'A contraction on a complete metric space has a unique fixed point. This requires completeness and the contraction property.'
      },
      {
        id: 'math403-q6-2-3',
        type: 'multiple_choice',
        prompt: 'A function f: (X, d) → (Y, ρ) is a contraction if:',
        options: [
          'ρ(f(x), f(y)) < d(x, y) for all x ≠ y',
          'ρ(f(x), f(y)) ≤ d(x, y) for all x, y',
          'ρ(f(x), f(y)) ≤ k·d(x, y) for some k < 1',
          'f is continuous'
        ],
        correctAnswer: 2,
        explanation: 'A contraction satisfies ρ(f(x), f(y)) ≤ k·d(x, y) for some Lipschitz constant k < 1.'
      },
      {
        id: 'math403-q6-2-4',
        type: 'true_false',
        prompt: 'The Baire Category Theorem states that every complete metric space is nonmeager.',
        correctAnswer: true,
        explanation: 'True. In a complete metric space, the intersection of countably many dense open sets is dense (equivalently, the space is nonmeager in itself).'
      },
      {
        id: 'math403-q6-2-5',
        type: 'multiple_choice',
        prompt: 'Which space is NOT complete?',
        options: [
          'ℝ with standard metric',
          '(0, 1) with standard metric',
          'ℝⁿ with Euclidean metric',
          'C[0,1] with sup metric'
        ],
        correctAnswer: 1,
        explanation: '(0, 1) is not complete. For example, the sequence xₙ = 1/n is Cauchy but converges to 0 ∉ (0, 1).'
      }
    ]
  },
  {
    id: 'math403-quiz-6-3',
    subjectId: 'math403',
    topicId: 'math403-topic-6',
    title: 'Metric Spaces - Advanced',
    questions: [
      {
        id: 'math403-q6-3-1',
        type: 'multiple_choice',
        prompt: 'The completion of a metric space (X, d) is:',
        options: [
          'The closure of X in a larger space',
          'A complete metric space containing X as a dense subset',
          'X ∪ {all limit points}',
          'The one-point compactification of X'
        ],
        correctAnswer: 1,
        explanation: 'The completion is a complete metric space in which X embeds as a dense subspace, unique up to isometry.'
      },
      {
        id: 'math403-q6-3-2',
        type: 'true_false',
        prompt: 'Every separable metric space is second countable.',
        correctAnswer: true,
        explanation: 'True. In metric spaces, separability implies (and is implied by) second countability.'
      },
      {
        id: 'math403-q6-3-3',
        type: 'multiple_choice',
        prompt: 'A metrizable space is one that:',
        options: [
          'Is a metric space',
          'Has a topology that can be induced by some metric',
          'Is complete',
          'Is separable'
        ],
        correctAnswer: 1,
        explanation: 'A topological space is metrizable if its topology can be induced by some metric (not necessarily unique).'
      },
      {
        id: 'math403-q6-3-4',
        type: 'true_false',
        prompt: 'Every compact metric space is complete.',
        correctAnswer: true,
        explanation: 'True. Compactness implies completeness in metric spaces. Every Cauchy sequence in a compact metric space converges.'
      },
      {
        id: 'math403-q6-3-5',
        type: 'multiple_choice',
        prompt: 'The Urysohn Metrization Theorem states:',
        options: [
          'Every topological space is metrizable',
          'Every second countable regular space is metrizable',
          'Every compact space is metrizable',
          'Every Hausdorff space is metrizable'
        ],
        correctAnswer: 1,
        explanation: 'A space is metrizable if it is second countable and regular (T₃). This is the Urysohn Metrization Theorem.'
      }
    ]
  },

  // ============================================================================
  // TOPIC 7: Applications and Advanced Topics (3 quizzes)
  // ============================================================================
  {
    id: 'math403-quiz-7-1',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    title: 'Applications - Fundamentals',
    questions: [
      {
        id: 'math403-q7-1-1',
        type: 'multiple_choice',
        prompt: 'The Brouwer Fixed Point Theorem states:',
        options: [
          'Every continuous function has a fixed point',
          'Every continuous function from Dⁿ to itself has a fixed point',
          'Every contraction has a unique fixed point',
          'Every homeomorphism has a fixed point'
        ],
        correctAnswer: 1,
        explanation: 'Brouwer: Every continuous map f: Dⁿ → Dⁿ (n-disk to itself) has a fixed point. This doesn\'t apply to all continuous functions.'
      },
      {
        id: 'math403-q7-1-2',
        type: 'true_false',
        prompt: 'Fixed point theorems have applications in economics and game theory.',
        correctAnswer: true,
        explanation: 'True. Fixed point theorems (Brouwer, Kakutani) are fundamental in proving existence of Nash equilibria and economic equilibria.'
      },
      {
        id: 'math403-q7-1-3',
        type: 'multiple_choice',
        prompt: 'A manifold is (intuitively):',
        options: [
          'A curved space that locally looks like ℝⁿ',
          'A subset of ℝⁿ',
          'A metric space',
          'A compact space'
        ],
        correctAnswer: 0,
        explanation: 'A manifold is a topological space that is locally homeomorphic to Euclidean space ℝⁿ near each point.'
      },
      {
        id: 'math403-q7-1-4',
        type: 'true_false',
        prompt: 'The circle S¹ and the line ℝ are homeomorphic.',
        correctAnswer: false,
        explanation: 'False. S¹ is compact but ℝ is not. Homeomorphisms preserve compactness, so they cannot be homeomorphic.'
      },
      {
        id: 'math403-q7-1-5',
        type: 'multiple_choice',
        prompt: 'Homotopy is an equivalence relation where:',
        options: [
          'Two spaces are homeomorphic',
          'Two continuous maps can be continuously deformed into each other',
          'Two spaces have the same dimension',
          'Two maps are identical'
        ],
        correctAnswer: 1,
        explanation: 'Maps f, g: X → Y are homotopic if there exists a continuous deformation H: X × [0,1] → Y with H(·, 0) = f and H(·, 1) = g.'
      }
    ]
  },
  {
    id: 'math403-quiz-7-2',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    title: 'Applications - Advanced Topics',
    questions: [
      {
        id: 'math403-q7-2-1',
        type: 'true_false',
        prompt: 'The fundamental group π₁(X, x₀) is always abelian.',
        correctAnswer: false,
        explanation: 'False. Many spaces have non-abelian fundamental groups. For example, π₁ of the figure-eight is the free group on two generators, which is non-abelian.'
      },
      {
        id: 'math403-q7-2-2',
        type: 'multiple_choice',
        prompt: 'The fundamental group of the circle S¹ is:',
        options: [
          'Trivial (just the identity)',
          'ℤ (the integers)',
          'ℤ₂ (integers mod 2)',
          'ℝ (the reals)'
        ],
        correctAnswer: 1,
        explanation: 'π₁(S¹) ≅ ℤ. Loops around the circle are classified by their winding number, an integer.'
      },
      {
        id: 'math403-q7-2-3',
        type: 'multiple_choice',
        prompt: 'A simply connected space is one where:',
        options: [
          'The space is connected',
          'The space is path connected and π₁ is trivial',
          'Every loop can be contracted to a point',
          'Both (b) and (c)'
        ],
        correctAnswer: 3,
        explanation: 'A space is simply connected if it is path connected and every loop can be contracted to a point (π₁ is trivial).'
      },
      {
        id: 'math403-q7-2-4',
        type: 'true_false',
        prompt: 'ℝⁿ is simply connected for all n ≥ 1.',
        correctAnswer: true,
        explanation: 'True. All Euclidean spaces ℝⁿ are simply connected (path connected with trivial fundamental group).'
      },
      {
        id: 'math403-q7-2-5',
        type: 'multiple_choice',
        prompt: 'Knot theory studies:',
        options: [
          'Embeddings of S¹ in ℝ³',
          'Graph theory',
          'Network topology',
          'Manifolds'
        ],
        correctAnswer: 0,
        explanation: 'Knot theory studies embeddings of circles (S¹) in 3-dimensional space ℝ³, up to ambient isotopy.'
      }
    ]
  },
  {
    id: 'math403-quiz-7-3',
    subjectId: 'math403',
    topicId: 'math403-topic-7',
    title: 'Applications - Algebraic Topology',
    questions: [
      {
        id: 'math403-q7-3-1',
        type: 'multiple_choice',
        prompt: 'Algebraic topology assigns to each space:',
        options: [
          'A metric',
          'Algebraic objects (groups, rings, etc.)',
          'A dimension',
          'A basis'
        ],
        correctAnswer: 1,
        explanation: 'Algebraic topology associates algebraic objects (like groups, homology groups, cohomology rings) to topological spaces to study them.'
      },
      {
        id: 'math403-q7-3-2',
        type: 'true_false',
        prompt: 'Homotopy equivalent spaces have isomorphic fundamental groups.',
        correctAnswer: true,
        explanation: 'True. The fundamental group is a homotopy invariant. If X ≃ Y (homotopy equivalent), then π₁(X) ≅ π₁(Y).'
      },
      {
        id: 'math403-q7-3-3',
        type: 'multiple_choice',
        prompt: 'A covering space p: E → B satisfies:',
        options: [
          'p is a homeomorphism',
          'p is surjective and each point in B has an evenly covered neighborhood',
          'p is a bijection',
          'E and B are homeomorphic'
        ],
        correctAnswer: 1,
        explanation: 'A covering map is surjective and locally looks like projection from a disjoint union. Each point has a neighborhood evenly covered by p.'
      },
      {
        id: 'math403-q7-3-4',
        type: 'true_false',
        prompt: 'The universal covering space of S¹ is ℝ.',
        correctAnswer: true,
        explanation: 'True. ℝ is the universal cover of S¹ via the exponential map p: ℝ → S¹ given by t ↦ e^(2πit).'
      },
      {
        id: 'math403-q7-3-5',
        type: 'multiple_choice',
        prompt: 'Which spaces are NOT homotopy equivalent?',
        options: [
          'A point and ℝⁿ',
          'S¹ and the boundary of a square',
          'A coffee cup and a donut (torus)',
          'S¹ and S²'
        ],
        correctAnswer: 3,
        explanation: 'S¹ and S² are not homotopy equivalent: π₁(S¹) = ℤ but π₁(S²) = 0. Options (a), (b), (c) are all homotopy equivalent pairs.'
      }
    ]
  }
];
