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
