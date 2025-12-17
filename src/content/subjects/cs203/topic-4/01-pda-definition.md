# PDA Definition

A **Pushdown Automaton (PDA)** extends finite automata with a stack, enabling recognition of context-free languages. The stack provides unlimited memory with last-in-first-out access.

## Formal Definition

A PDA is a 7-tuple $M = (Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$ where:

- **Q** is a finite set of states
- **Σ** is the input alphabet
- **Γ** is the stack alphabet
- $\delta: Q \times (\Sigma \cup \{\varepsilon\}) \times \Gamma \to \mathcal{P}(Q \times \Gamma^*)$ is the transition function
- $q_0 \in Q$ is the start state
- $Z_0 \in \Gamma$ is the initial stack symbol
- $F \subseteq Q$ is the set of accepting states

## Understanding Transitions

A transition $\delta(q, a, X) = \{(p_1, \gamma_1), (p_2, \gamma_2), \ldots\}$ means:

In state $q$, reading input $a$ (or $\varepsilon$ for no input), with $X$ on top of stack:
- Move to state $p_i$
- Replace $X$ with string $\gamma_i$ ($\gamma_i$ pushed right-to-left)

## Stack Operations

Via the transition function:
- **Push**: $\delta(q, a, X) = \{(p, YX)\}$ — push $Y$ onto stack
- **Pop**: $\delta(q, a, X) = \{(p, \varepsilon)\}$ — remove $X$ from stack
- **Replace**: $\delta(q, a, X) = \{(p, Y)\}$ — replace $X$ with $Y$
- **No change**: $\delta(q, a, X) = \{(p, X)\}$ — keep $X$ on stack

## Configurations

A **configuration** (or instantaneous description) is a triple $(q, w, \gamma)$:
- $q \in Q$: current state
- $w \in \Sigma^*$: remaining input
- $\gamma \in \Gamma^*$: current stack contents (top on left)

## Computation Steps

One step: $(q, aw, X\beta) \vdash (p, w, \alpha\beta)$

if $(p, \alpha) \in \delta(q, a, X)$ where $a \in \Sigma \cup \{\varepsilon\}$

Multiple steps: $\vdash^*$ denotes the reflexive transitive closure

## Example PDA

PDA for $L = \{a^n b^n \mid n \geq 0\}$:

- $Q = \{q_0, q_1, q_2\}$
- $\Sigma = \{a, b\}$
- $\Gamma = \{Z_0, A\}$
- Transitions:
  - $\delta(q_0, a, Z_0) = \{(q_0, AZ_0)\}$ — start pushing
  - $\delta(q_0, a, A) = \{(q_0, AA)\}$ — push more A's
  - $\delta(q_0, b, A) = \{(q_1, \varepsilon)\}$ — start matching
  - $\delta(q_1, b, A) = \{(q_1, \varepsilon)\}$ — match more
  - $\delta(q_1, \varepsilon, Z_0) = \{(q_2, Z_0)\}$ — accept
- $F = \{q_2\}$

### State Diagram

```mermaid
stateDiagram-v2
    [*] --> q0
    q0 --> q0: a,Z₀/AZ₀
    q0 --> q0: a,A/AA
    q0 --> q1: b,A/ε
    q1 --> q1: b,A/ε
    q1 --> q2: ε,Z₀/Z₀
    q2 --> [*]
```

### Computation Example

Input "aabb":

$$
\begin{align*}
(q_0, aabb, Z_0) &\vdash (q_0, abb, AZ_0) && \text{push A} \\
&\vdash (q_0, bb, AAZ_0) && \text{push A} \\
&\vdash (q_1, b, AZ_0) && \text{pop A for b} \\
&\vdash (q_1, \varepsilon, Z_0) && \text{pop A for b} \\
&\vdash (q_2, \varepsilon, Z_0) && \text{accept}
\end{align*}
$$

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
