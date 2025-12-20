# Decidable Languages

A language is **decidable** if a Turing machine can determine membership for every string, always halting with the correct answer. Decidability represents the ideal case of algorithmic solvability—problems we can definitively answer with a computer program.

## Why Decidability Matters

Decidability is the gold standard for computational problems. When a language is decidable, we have an algorithm that:
- Always terminates (never runs forever)
- Always gives the correct answer (yes or no)
- Works for all possible inputs

This corresponds to problems we can reliably solve with computers. Many problems we encounter daily are decidable: sorting, searching, arithmetic, parsing code, and checking data validity. Understanding which problems are decidable—and which are not—is fundamental to computer science.

## Historical Context

The study of decidability emerged from David Hilbert's program in the early 20th century to formalize all of mathematics. Hilbert asked whether there could be an algorithm to determine the truth of any mathematical statement. In 1936, both Alonzo Church and Alan Turing independently proved that no such algorithm exists—some problems are fundamentally undecidable. This revolutionary result established the field of computability theory.

## Formal Definition

A language L is **decidable** (or recursive) if there exists a TM M such that:
- For all w ∈ L: M accepts w
- For all w ∉ L: M rejects w
- M halts on all inputs

The TM M is called a **decider** for L.

## Decidable vs Recognizable

| Property | Decidable | Recognizable |
|----------|-----------|--------------|
| Accepts L | Yes | Yes |
| Rejects L̄ | Yes | Maybe loops |
| Always halts | Yes | Not necessarily |

Every decidable language is recognizable, but not vice versa.

## Decidable Problems for DFAs

### Acceptance: A_DFA
**Problem**: Does DFA M accept string w?
**Algorithm**: Simulate M on w, return result.
**Complexity**: O(|w|)

### Emptiness: E_DFA
**Problem**: Is L(M) = ∅?
**Algorithm**: Check if any accepting state is reachable from start.
**Complexity**: O(|Q| + |δ|)

### Equivalence: EQ_DFA
**Problem**: Do DFAs M₁ and M₂ recognize the same language?
**Algorithm**: Check if L(M₁) Δ L(M₂) = ∅ (symmetric difference).
**Complexity**: O(n log n) via minimization

## Decidable Problems for CFGs

### Acceptance: A_CFG
**Problem**: Does CFG G generate string w?
**Algorithm**: CYK algorithm on CNF grammar.
**Complexity**: O(n³|G|)

### Emptiness: E_CFG
**Problem**: Is L(G) = ∅?
**Algorithm**: Mark generating variables iteratively.
**Complexity**: O(|G|)

## Decidability of Regular Languages

All standard decision problems for regular languages are decidable:
- Membership
- Emptiness
- Finiteness
- Universality
- Equivalence
- Inclusion

## Decidability of Context-Free Languages

Some CFL problems are decidable:
- Membership (CYK)
- Emptiness

Some are **undecidable**:
- Equivalence
- Universality
- Ambiguity

## Closure Properties

Decidable languages are closed under:
- Union
- Intersection
- Complement
- Concatenation
- Kleene star

The class of decidable languages is very robust.

## Examples of Decidable Languages

- All regular languages
- All context-free languages
- {⟨M, w⟩ | DFA M accepts w}
- {⟨M⟩ | DFA M has an even number of states}
- {⟨G, w⟩ | CFG G generates w}

## Decidability Proofs

To prove L is decidable:
1. Describe a TM M (high-level algorithm)
2. Argue M halts on all inputs
3. Argue M correctly accepts L

## Relationship to Algorithms

Decidable = solvable by algorithm:
- If you can write a program that always terminates with correct answer
- The problem is decidable

## Computable Functions

A function f: Σ* → Σ* is **computable** if some TM computes it:
- On input w, outputs f(w)
- Halts on all inputs

Decidable languages correspond to computable characteristic functions.

## The Halting Problem Intuition

Not all problems are decidable. The halting problem (covered next) is the canonical undecidable problem.

## Connecting to Programming

In programming terms, decidable problems correspond to programs that:
- Always terminate (no infinite loops on any input)
- Return a correct boolean answer

When you write a function like `isValidEmail(string)`, you're implementing a decider for a decidable language—it always terminates and gives yes/no.

Many practical problems are decidable:
- Syntax checking (is this valid JSON?)
- Type checking (does this program type-check?)
- Finite constraint satisfaction (does this Sudoku have a solution?)

But some problems programmers wish they could solve are undecidable:
- Does this program halt on all inputs?
- Are these two programs equivalent?
- Does this program have any bugs?

## The Significance of Closure Properties

The closure properties of decidable languages are remarkably strong:

**Closed under complement**: If we can decide L, we can decide its complement by simply flipping accept/reject. This is NOT true for merely recognizable languages.

**Closed under intersection/union**: We can run deciders for both languages and combine results. Since both always halt, the combined algorithm always halts.

These closure properties make decidable languages well-behaved and compositional—we can build complex deciders from simpler ones.

## Key Takeaways

- Decidable languages correspond to algorithmically solvable problems
- A decider is a TM that always halts with the correct answer
- Regular and context-free languages are decidable (with efficient algorithms)
- Decidable languages are closed under union, intersection, complement, concatenation, and star
- Not all recognizable languages are decidable—some problems cannot be algorithmically solved
- Decidability proofs require showing the TM halts on all inputs and computes correctly
- Understanding decidability is crucial for knowing what computers can and cannot do
