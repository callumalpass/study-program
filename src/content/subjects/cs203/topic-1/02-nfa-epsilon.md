# NFA and ε-Transitions

A **Nondeterministic Finite Automaton (NFA)** extends the DFA model by allowing multiple simultaneous computation paths. Despite this added flexibility, NFAs recognize exactly the same class of languages as DFAs.

## Formal Definition

An NFA is a 5-tuple N = (Q, Σ, δ, q₀, F) where:

- **Q** is a finite set of states
- **Σ** is a finite input alphabet
- **δ: Q × (Σ ∪ {ε}) → P(Q)** is the transition function
- **q₀ ∈ Q** is the start state
- **F ⊆ Q** is the set of accepting states

The key difference from DFA: δ returns a **set** of states, and transitions can occur on ε (the empty string).

## Nondeterminism Explained

In an NFA, when processing input symbol a in state q:
- There may be **zero** transitions (the computation branch "dies")
- There may be **one** transition (like a DFA)
- There may be **multiple** transitions (computation "splits")

The NFA accepts if **any** computation path leads to an accepting state.

## ε-Transitions

An **ε-transition** allows the automaton to change state without consuming any input. This is useful for:
- Combining automata
- Simplifying constructions
- Expressing optional patterns

The **ε-closure** of state q, denoted ε-closure(q), is the set of all states reachable from q using only ε-transitions (including q itself).

## Extended Transition Function

For NFAs, the extended transition function δ* is defined:

1. δ*(q, ε) = ε-closure({q})
2. δ*(q, wa) = ε-closure(⋃{δ(p, a) | p ∈ δ*(q, w)})

For a set of states S: δ*(S, w) = ⋃{δ*(q, w) | q ∈ S}

## Language Recognition

An NFA N accepts string w if some state in δ*(q₀, w) is an accepting state:

L(N) = {w ∈ Σ* | δ*(q₀, w) ∩ F ≠ ∅}

## Example NFA

An NFA accepting strings ending in "01":

- Q = {q₀, q₁, q₂}
- Σ = {0, 1}
- Transitions:
  - δ(q₀, 0) = {q₀, q₁}
  - δ(q₀, 1) = {q₀}
  - δ(q₁, 1) = {q₂}
- q₀ is the start state
- F = {q₂}

The nondeterminism "guesses" when the final "01" begins.

## Why Use NFAs?

NFAs are often easier to design than DFAs because:

1. **Natural expression**: Nondeterminism captures "or" naturally
2. **Smaller size**: NFAs can be exponentially smaller than equivalent DFAs
3. **Compositional**: Easy to combine automata for complex patterns
4. **Theoretical utility**: Many proofs are simpler with NFAs

## Computation Trees

An NFA computation on input w forms a tree:
- Root is the start state
- Each path represents one computation branch
- Leaves are final configurations
- Accept if any leaf is in an accepting state with empty remaining input

## Equivalence to DFA

Every NFA can be converted to an equivalent DFA (same language). This is proven constructively using the **subset construction**, covered in the next section.

The converse is trivial: every DFA is already an NFA (with singleton transition sets).

## Applications

NFAs with ε-transitions are fundamental in:
- **Thompson's construction**: Converting regular expressions to NFAs
- **Compiler generators**: Tools like lex/flex
- **Pattern matching engines**: Regular expression libraries
