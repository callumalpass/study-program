# Automata to Regex Conversion

Converting finite automata to regular expressions proves that every regular language has a regex description. The state elimination method provides a systematic algorithm.

## Overview of State Elimination

The key insight: we can remove states from an automaton while preserving the recognized language by updating the remaining transitions with regular expressions.

## Step 1: Prepare the Automaton

Convert to a **Generalized NFA (GNFA)**:

1. Add a new unique start state q_start with ε-transition to the old start
2. Add a new unique accept state q_accept with ε-transitions from all old accepting states
3. If there are multiple transitions from state p to state q, combine them: a, b, c becomes (a|b|c)
4. If there is no transition from p to q, add one labeled ∅

## Step 2: Eliminate States

For each state q (except q_start and q_accept):

For every pair of states (p, r) where p ≠ q and r ≠ q:

Old: p --R₁--> q --R₂--> r, with q --R₃--> q (loop)
New: p --R₁(R₃)*R₂ | R₄--> r

Where R₄ is the current direct p-to-r regex (or ∅ if none).

Then remove state q and all its transitions.

## Step 3: Extract the Regex

After all eliminations, only q_start and q_accept remain with a single transition:

q_start --R--> q_accept

The regex R describes the language.

## Worked Example

Consider DFA accepting strings with even number of a's:

States: {q₀, q₁}, Start: q₀, Accept: {q₀}
- δ(q₀, a) = q₁, δ(q₀, b) = q₀
- δ(q₁, a) = q₀, δ(q₁, b) = q₁

**Step 1**: Convert to GNFA
- Add q_start with ε to q₀
- Add q_accept with ε from q₀
- Transitions: q₀ --a--> q₁, q₀ --b--> q₀, q₁ --a--> q₀, q₁ --b--> q₁

**Step 2**: Eliminate q₁
- From q₀ to q₀ via q₁: a · b* · a (go to q₁, loop, return)
- Combined q₀ loop: b | ab*a

**Step 3**: Eliminate remaining intermediate states
- Final: (b | ab*a)*

Alternatively written: (b* a b* a)* b* = (b* a b* a b*)*

## Algorithm Complexity

- Starting with n states (after adding start/accept: n+2)
- Each elimination: O(n²) regex updates
- Total: O(n³) operations
- Each regex can grow: O(4^n) size in worst case

## Optimization: Choosing Elimination Order

The order of elimination affects regex size. Heuristics:
1. Eliminate states with fewest transitions first
2. Prefer states not on many paths
3. Choose states that minimize resulting expression size

## Alternative: Brzozowski Algebraic Method

Set up equations for each state:

If state q has incoming transitions from states p₁, p₂, ... with labels r₁, r₂, ...:

L(q) = r₁L(p₁) | r₂L(p₂) | ... | ε (if q is accepting)

Solve using Arden's rule:
If X = AX | B where ε ∉ L(A), then X = A*B

## Arden's Rule Example

For the even-a's DFA:
- L(q₀) = ε | b·L(q₀) | a·L(q₁)
- L(q₁) = a·L(q₀) | b·L(q₁)

From second equation: L(q₁) = b*·a·L(q₀)

Substituting: L(q₀) = ε | b·L(q₀) | a·b*·a·L(q₀)
             L(q₀) = ε | (b | ab*a)·L(q₀)
             L(q₀) = (b | ab*a)*

## Correctness

**Theorem**: The state elimination algorithm produces a regex equivalent to the original automaton.

**Proof**: At each step, we preserve the language by capturing all paths through the eliminated state with the updated regex.

## Practical Considerations

- State elimination works on any FA (DFA or NFA)
- The resulting regex may be large and unreadable
- Algebraic simplification often needed for human use
- For practical matching, go the other direction: regex → NFA → DFA
