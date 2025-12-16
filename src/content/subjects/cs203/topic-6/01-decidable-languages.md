# Decidable Languages

A language is **decidable** if a Turing machine can determine membership for every string, always halting with the correct answer. Decidability represents the ideal case of algorithmic solvability.

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
