# DFA Fundamentals

A **Deterministic Finite Automaton (DFA)** is a mathematical model of computation that processes input strings and either accepts or rejects them. DFAs are the simplest model of computation with practical applications in lexical analysis, pattern matching, and protocol verification.

## Formal Definition

A DFA is defined as a 5-tuple M = (Q, Σ, δ, q₀, F) where:

- **Q** is a finite set of states
- **Σ** is a finite input alphabet
- **δ: Q × Σ → Q** is the transition function
- **q₀ ∈ Q** is the start state
- **F ⊆ Q** is the set of accepting (final) states

The transition function δ is total, meaning for every state q and every symbol a, there is exactly one next state δ(q, a).

## Extended Transition Function

The **extended transition function** δ* processes strings rather than single symbols. It is defined recursively:

- **Base case**: δ*(q, ε) = q (the empty string leaves us in state q)
- **Recursive case**: δ*(q, wa) = δ(δ*(q, w), a)

This allows us to trace the computation path for an entire input string.

## Language Recognition

A string w is **accepted** by DFA M if δ*(q₀, w) ∈ F. The **language** recognized by M is:

L(M) = {w ∈ Σ* | δ*(q₀, w) ∈ F}

A language L is called **regular** if there exists a DFA M such that L = L(M).

## Example DFA

Consider a DFA that accepts binary strings with an even number of 1s:

- Q = {q_even, q_odd}
- Σ = {0, 1}
- δ(q_even, 0) = q_even, δ(q_even, 1) = q_odd
- δ(q_odd, 0) = q_odd, δ(q_odd, 1) = q_even
- q₀ = q_even
- F = {q_even}

This DFA tracks the parity of 1s seen so far.

## State Diagram Representation

DFAs are commonly represented as directed graphs:
- Nodes represent states
- Edges labeled with input symbols represent transitions
- Start state has an incoming arrow from nowhere
- Accepting states are shown with double circles

## Designing DFAs

When designing a DFA, consider:

1. **What must be remembered**: The states encode exactly what we need to track
2. **Invariants**: Each state maintains a specific condition about strings reaching it
3. **Completeness**: Every state must have transitions for every symbol

A useful technique is to ask "what do I need to remember about the input seen so far?" The answer determines the states.

## DFA Computation as Configuration Sequence

A **configuration** is a pair (q, w) representing current state and remaining input. A DFA computation is a sequence of configurations:

(q₀, w) ⊢ (q₁, w₁) ⊢ ... ⊢ (q_n, ε)

where each step consumes one input symbol according to δ.

## Practical Applications

DFAs are used extensively in:
- **Lexical analyzers**: Tokenizing source code
- **Network protocols**: Verifying message sequences
- **Text editors**: Search and replace operations
- **Digital circuits**: Controller design

Their simplicity and efficiency make them ideal for pattern matching where memory is limited.
