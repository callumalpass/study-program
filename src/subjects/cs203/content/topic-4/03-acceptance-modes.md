---
id: cs203-t4-acceptance
title: "Acceptance Modes"
order: 3
---

# Acceptance Modes

PDAs have two natural acceptance criteria: **final state** and **empty stack**. These are equivalent in power but suited to different applications.

## Final State Acceptance

A string w is accepted by final state if:

(q₀, w, Z₀) ⊢* (q, ε, γ) where q ∈ F

The PDA:
- Consumes all input
- Ends in an accepting state
- Stack contents don't matter

Language: L(M) = {w | M accepts w by final state}

## Empty Stack Acceptance

A string w is accepted by empty stack if:

(q₀, w, Z₀) ⊢* (q, ε, ε) for any q

The PDA:
- Consumes all input
- Empties the stack completely
- Final state doesn't matter (F is irrelevant)

Language: N(M) = {w | M accepts w by empty stack}

## Equivalence

**Theorem**: For any PDA M₁ accepting by final state, there exists PDA M₂ accepting the same language by empty stack, and vice versa.

## Final State → Empty Stack

Given M accepting L by final state, construct M' accepting L by empty stack:

1. Add new start state q'₀ and stack symbol X₀
2. Start: push X₀, then go to original start
3. From accepting states: add ε-transitions to new state q_clear
4. q_clear: pop everything until stack empty

Transitions:
- δ'(q'₀, ε, X₀) = {(q₀, Z₀X₀)}
- For q ∈ F: δ'(q, ε, X) = {(q_clear, ε)} for all X
- δ'(q_clear, ε, X) = {(q_clear, ε)} for all X

## Empty Stack → Final State

Given M accepting L by empty stack, construct M' accepting L by final state:

1. Add new start state q'₀, accept state q_f, and stack symbol X₀
2. Start: push X₀, go to original start
3. If stack empties to X₀: transition to q_f

Transitions:
- δ'(q'₀, ε, X₀) = {(q₀, Z₀X₀)}
- For all q, add: δ'(q, ε, X₀) = {(q_f, X₀)}
- F' = {q_f}

The X₀ marker detects when original stack is empty.

## Choosing Acceptance Mode

| Scenario | Preferred Mode |
|----------|----------------|
| Matching brackets | Empty stack |
| Parsing with end marker | Final state |
| General grammar | Either |
| Converting CFG → PDA | Empty stack |

## Example: Balanced Parentheses

**Empty stack** is natural:
- Push '(' symbol when reading '('
- Pop when reading ')'
- Accept when stack empty (balanced)

**Final state** requires extra work:
- Need to check "stack empty" condition
- Use special bottom marker
- Accept when marker exposed

## Example: aⁿbⁿ by Empty Stack

States: {q₀, q₁}
Stack: {Z₀, A}

Transitions:
- δ(q₀, a, Z₀) = {(q₀, AZ₀)}
- δ(q₀, a, A) = {(q₀, AA)}
- δ(q₀, b, A) = {(q₁, ε)}
- δ(q₁, b, A) = {(q₁, ε)}
- δ(q₁, ε, Z₀) = {(q₁, ε)}

Accept when all input read and stack empty.

## Combining Modes

Some PDAs naturally use both:
- Match structure via stack
- Verify additional conditions via state

Can simulate one mode with the other as shown.

## Non-equivalence for DPDAs

For **deterministic** PDAs:
- Final state acceptance ≠ empty stack acceptance
- DCFLs by final state properly contain DCFLs by empty stack
- Final state DPDAs more powerful

This is a key difference from nondeterministic case!

## Detailed Conversion Example: Final State to Empty Stack

Let's work through a complete example. Given a PDA $M$ accepting $L = \{a^n b^n \mid n \geq 1\}$ by final state:

**Original PDA M:**
- States: $Q = \{q_0, q_1, q_2\}$
- Stack: $\Gamma = \{Z_0, A\}$
- Transitions:
  - $\delta(q_0, a, Z_0) = \{(q_0, AZ_0)\}$
  - $\delta(q_0, a, A) = \{(q_0, AA)\}$
  - $\delta(q_0, b, A) = \{(q_1, \varepsilon)\}$
  - $\delta(q_1, b, A) = \{(q_1, \varepsilon)\}$
  - $\delta(q_1, \varepsilon, Z_0) = \{(q_2, Z_0)\}$
- Accept: $F = \{q_2\}$

**Converted PDA M' (empty stack):**
- States: $Q' = \{q'_0, q_0, q_1, q_2, q_{clear}\}$
- Stack: $\Gamma' = \{X_0, Z_0, A\}$ (added $X_0$ as bottom marker)
- Start: $q'_0$

New transitions:
1. Initial setup: $\delta'(q'_0, \varepsilon, X_0) = \{(q_0, Z_0X_0)\}$
2. Original transitions (keep all from M)
3. From accepting state: $\delta'(q_2, \varepsilon, Z_0) = \{(q_{clear}, \varepsilon)\}$
4. Clear stack: $\delta'(q_{clear}, \varepsilon, X_0) = \{(q_{clear}, \varepsilon)\}$

**How it works:**
- Input "aabb" initially has stack $X_0$ (marker)
- After $\varepsilon$-transition: stack becomes $Z_0X_0$
- Process input as before, reaching $q_2$ with stack $Z_0X_0$
- Pop $Z_0$ and enter $q_{clear}$
- Pop $X_0$ to empty the stack completely
- Accept by empty stack

## Understanding the Marker Technique

The marker $X_0$ serves a crucial purpose in both conversion directions:

**Final state → Empty stack:**
- $X_0$ placed at bottom initially
- Original computation runs above $X_0$
- When accepting state reached, clear everything including $X_0$
- Ensures stack truly empty upon acceptance

**Empty stack → Final state:**
- $X_0$ placed below original bottom marker
- When stack empties to $X_0$, we know original stack was empty
- Transition to accepting state while keeping $X_0$
- Distinguishes "truly done" from "partially processed"

## Practical Implications of Acceptance Modes

The choice of acceptance mode affects PDA design and efficiency:

**Empty stack advantages:**
- Natural for bracket-matching problems
- No need to track accepting states
- Simpler for some constructions (CFG to PDA)
- Stack emptiness is intrinsic acceptance criterion

**Final state advantages:**
- Can accept with non-empty stack (more flexibility)
- Multiple accepting conditions possible
- Better for DPDAs (stronger than empty stack for DPDAs)
- Natural for state-based verification

## Example: Dyck Language

The **Dyck language** $D_2$ (balanced brackets with two types) is naturally expressed with empty stack acceptance:

- Alphabet: $\Sigma = \{(, ), [, ]\}$
- Language: strings with properly matched brackets

PDA accepting by empty stack:
- States: just $\{q\}$
- Stack: $\Gamma = \{Z_0, (, [\}$
- Transitions:
  - $\delta(q, (, X) = \{(q, (X)\}$ for any $X$ — push open paren
  - $\delta(q, [, X) = \{(q, [X)\}$ for any $X$ — push open bracket
  - $\delta(q, ), () = \{(q, \varepsilon)\}$ — match close paren
  - $\delta(q, ], [) = \{(q, \varepsilon)\}$ — match close bracket
  - $\delta(q, \varepsilon, Z_0) = \{(q, \varepsilon)\}$ — accept when done

Input "([()])" is accepted:
$$
\begin{align*}
(q, ([()]), Z_0) &\vdash (q, [()]), (Z_0) && \text{push (} \\
&\vdash (q, ()), [(Z_0) && \text{push [} \\
&\vdash (q, )), ([(Z_0) && \text{push (} \\
&\vdash (q, ), [(Z_0) && \text{match ) with (} \\
&\vdash (q, \varepsilon, (Z_0) && \text{match ] with [} \\
&\vdash (q, \varepsilon, Z_0) && \text{match ) with (} \\
&\vdash (q, \varepsilon, \varepsilon) && \text{empty stack, accept!}
\end{align*}
$$

## Why DPDA Acceptance Modes Differ

For deterministic PDAs, the two modes are not equivalent:

**Example language separating them:** $L = \{a^n b^n \mid n \geq 0\}$

This language is accepted by DPDA with final state but **not** by DPDA with empty stack acceptance. Why?

With empty stack acceptance:
- Must empty stack deterministically
- Cannot distinguish $\varepsilon$ from partially processed strings
- The prefix property forces restrictions

With final state acceptance:
- Can maintain stack marker while accepting
- More control over acceptance conditions
- Can handle non-prefix-free languages

This asymmetry doesn't occur for nondeterministic PDAs because nondeterminism provides the flexibility to handle both modes equivalently.

## State-Space Complexity of Conversions

The conversions add minimal overhead:

**Final state → Empty stack:**
- Add 2 new states: $q'_0$ (new start) and $q_{clear}$ (clearing state)
- Add 1 new stack symbol: $X_0$
- Add $O(|Q| \cdot |\Gamma|)$ transitions for clearing

**Empty stack → Final state:**
- Add 2 new states: $q'_0$ and $q_f$
- Add 1 new stack symbol: $X_0$
- Add $O(|Q|)$ transitions for detecting empty stack

Both conversions are efficient and preserve the language recognized.

## Acceptance with End Markers

Adding an end-marker $ to the input alphabet can make acceptance modes more equivalent:

**With $:**
- PDA knows when input ends
- Can transition to accepting state deterministically
- Empty stack and final state become more similar

**Without $:**
- Must use $\varepsilon$-transitions to detect end
- More potential for nondeterminism
- Greater difference between modes

For DPDAs, adding $ makes empty stack and final state acceptance equivalent in power.

## Key Takeaways

- PDAs have two natural acceptance criteria: final state and empty stack
- For nondeterministic PDAs, these modes are equivalent in expressive power
- Conversions between modes add minimal overhead (two states, one stack symbol)
- Empty stack acceptance is natural for matching problems and CFG conversions
- Final state acceptance provides more flexibility and control
- For deterministic PDAs, final state acceptance is strictly more powerful
- The marker technique ($X_0$) enables detection of stack emptiness
- Choice of mode affects PDA design, but both can recognize all CFLs
- Dyck languages exemplify problems naturally suited to empty stack acceptance
- End markers can bridge differences between acceptance modes
