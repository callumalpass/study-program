import { Topic } from '../../../core/types';

export const math101Topics: Topic[] = [
  {
    id: 'math101-topic-1',
    title: 'Propositional Logic',
    content: 'Propositional logic is the foundation of mathematical reasoning and computer science. It deals with propositions, which are declarative statements that are either true or false. We use logical connectives such as AND (∧), OR (∨), NOT (¬), IMPLIES (→), and IF AND ONLY IF (↔) to build complex logical expressions from simpler ones.\n\nTruth tables are essential tools for analyzing the truth values of compound propositions under all possible combinations of their component propositions. A proposition that is always true is called a tautology, while one that is always false is a contradiction. Understanding logical equivalences, such as De Morgan\'s Laws and the distributive properties, allows us to simplify and transform logical expressions.\n\nLogical arguments consist of premises and a conclusion. An argument is valid if the conclusion logically follows from the premises. Propositional logic provides the formal framework for determining validity through methods such as truth tables, logical equivalences, and rules of inference like modus ponens and modus tollens.',
    quizIds: ['math101-quiz-1'],
    exerciseIds: ['math101-ex-1']
  },
  {
    id: 'math101-topic-2',
    title: 'Proof Techniques',
    content: 'Mathematical proofs are rigorous arguments that establish the truth of mathematical statements beyond any doubt. Direct proof is the most straightforward technique: we assume the hypothesis and use logical deduction to arrive at the conclusion. This method relies on definitions, axioms, and previously proven theorems.\n\nProof by contradiction (reductio ad absurdum) assumes the negation of what we want to prove and shows this leads to a logical contradiction. This powerful technique is often used when direct proof is difficult. Proof by contrapositive proves "if P then Q" by instead proving "if not Q then not P," which is logically equivalent.\n\nMathematical induction is crucial for proving statements about natural numbers. It has two steps: the base case verifies the statement for the smallest value (usually n=0 or n=1), and the inductive step shows that if the statement holds for n=k, it must also hold for n=k+1. Strong induction uses all previous cases rather than just k.',
    quizIds: ['math101-quiz-2'],
    exerciseIds: ['math101-ex-2']
  },
  {
    id: 'math101-topic-3',
    title: 'Sets and Set Operations',
    content: 'A set is a well-defined collection of distinct objects called elements. Sets can be specified using roster notation (listing all elements) or set-builder notation (describing properties that elements must satisfy). The empty set ∅ contains no elements, while the universal set U contains all elements under consideration.\n\nBasic set operations include union (A ∪ B), which combines all elements from both sets; intersection (A ∩ B), which contains only elements common to both sets; and difference (A - B), which contains elements in A but not in B. The complement of A (denoted A\' or Ā) contains all elements in the universal set that are not in A.\n\nSets can be related in various ways. Set A is a subset of B (A ⊆ B) if every element of A is also in B. Two sets are disjoint if their intersection is empty. The power set of A, denoted P(A), is the set of all subsets of A. If A has n elements, P(A) has 2^n elements. Cartesian products create ordered pairs from two sets.',
    quizIds: ['math101-quiz-3'],
    exerciseIds: ['math101-ex-3']
  },
  {
    id: 'math101-topic-4',
    title: 'Relations',
    content: 'A relation R from set A to set B is a subset of the Cartesian product A × B. When A = B, we call R a relation on A. Relations formalize the concept of relationships between elements. We write aRb or (a,b) ∈ R to indicate that elements a and b are related.\n\nSeveral properties characterize relations on a set. A relation is reflexive if every element is related to itself (aRa for all a). It is symmetric if aRb implies bRa. It is antisymmetric if aRb and bRa together imply a=b. A relation is transitive if aRb and bRc together imply aRc.\n\nAn equivalence relation is reflexive, symmetric, and transitive. Equivalence relations partition a set into disjoint equivalence classes, where elements in the same class are related to each other. A partial order is reflexive, antisymmetric, and transitive. Examples include the "less than or equal to" relation on numbers and the subset relation on sets. Total orders are partial orders where every pair of elements is comparable.',
    quizIds: ['math101-quiz-4'],
    exerciseIds: ['math101-ex-4']
  },
  {
    id: 'math101-topic-5',
    title: 'Functions',
    content: 'A function f from set A to set B (written f: A → B) is a special relation that assigns to each element in A exactly one element in B. The set A is called the domain, B is the codomain, and the set of all actual output values is the range. We write f(a) = b to indicate that f maps element a to element b.\n\nFunctions can have special properties. A function is injective (one-to-one) if different inputs always produce different outputs: f(a₁) = f(a₂) implies a₁ = a₂. A function is surjective (onto) if every element in the codomain is the image of at least one element in the domain. A function that is both injective and surjective is called bijective, establishing a one-to-one correspondence between domain and codomain.\n\nFunction composition combines two functions: (g ∘ f)(x) = g(f(x)). The composition is only defined when the range of f is contained in the domain of g. An inverse function f⁻¹ reverses the mapping of f, and exists only for bijective functions. The identity function maps each element to itself.',
    quizIds: ['math101-quiz-5'],
    exerciseIds: ['math101-ex-5']
  }
];
