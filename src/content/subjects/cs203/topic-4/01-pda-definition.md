# PDA Definition

A **Pushdown Automaton (PDA)** extends finite automata with a stack, enabling recognition of context-free languages. The stack provides unlimited memory with last-in-first-out access.

## Formal Definition

A PDA is a 7-tuple M = (Q, Σ, Γ, δ, q₀, Z₀, F) where:

- **Q** is a finite set of states
- **Σ** is the input alphabet
- **Γ** is the stack alphabet
- **δ: Q × (Σ ∪ {ε}) × Γ → P(Q × Γ*)** is the transition function
- **q₀ ∈ Q** is the start state
- **Z₀ ∈ Γ** is the initial stack symbol
- **F ⊆ Q** is the set of accepting states

## Understanding Transitions

A transition δ(q, a, X) = {(p₁, γ₁), (p₂, γ₂), ...} means:

In state q, reading input a (or ε for no input), with X on top of stack:
- Move to state pᵢ
- Replace X with string γᵢ (γᵢ pushed right-to-left)

## Stack Operations

Via the transition function:
- **Push**: δ(q, a, X) = {(p, YX)} — push Y onto stack
- **Pop**: δ(q, a, X) = {(p, ε)} — remove X from stack
- **Replace**: δ(q, a, X) = {(p, Y)} — replace X with Y
- **No change**: δ(q, a, X) = {(p, X)} — keep X on stack

## Configurations

A **configuration** (or instantaneous description) is a triple (q, w, γ):
- q: current state
- w: remaining input
- γ: current stack contents (top on left)

## Computation Steps

One step: (q, aw, Xβ) ⊢ (p, w, αβ)

if (p, α) ∈ δ(q, a, X) where a ∈ Σ ∪ {ε}

Multiple steps: ⊢*

## Example PDA

PDA for L = {aⁿbⁿ | n ≥ 0}:

- Q = {q₀, q₁, q₂}
- Σ = {a, b}
- Γ = {Z₀, A}
- Transitions:
  - δ(q₀, a, Z₀) = {(q₀, AZ₀)} — start pushing
  - δ(q₀, a, A) = {(q₀, AA)} — push more A's
  - δ(q₀, b, A) = {(q₁, ε)} — start matching
  - δ(q₁, b, A) = {(q₁, ε)} — match more
  - δ(q₁, ε, Z₀) = {(q₂, Z₀)} — accept
- F = {q₂}

## Computation Example

Input "aabb":
```
(q₀, aabb, Z₀)
⊢ (q₀, abb, AZ₀)      -- push A
⊢ (q₀, bb, AAZ₀)      -- push A
⊢ (q₁, b, AZ₀)        -- pop A for b
⊢ (q₁, ε, Z₀)         -- pop A for b
⊢ (q₂, ε, Z₀)         -- accept
```

## Nondeterminism

PDAs are inherently nondeterministic:
- Multiple transitions from same configuration
- Guessing structure of input
- Essential for recognizing some CFLs

## Graphical Notation

Transitions drawn as: q --a, X/γ--> p

Meaning: read a, pop X, push γ, move to p

## Key Differences from DFA

| Feature | DFA | PDA |
|---------|-----|-----|
| Memory | None (states only) | Unbounded stack |
| Determinism | Deterministic | Usually nondeterministic |
| Transitions | Based on state + input | State + input + stack |
| Power | Regular languages | Context-free languages |
