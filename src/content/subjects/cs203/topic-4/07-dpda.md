# Deterministic PDAs

A **Deterministic PDA (DPDA)** has at most one choice at each step. DPDAs are less powerful than NPDAs but important for efficient parsing.

## Definition

A PDA M = (Q, Σ, Γ, δ, q₀, Z₀, F) is **deterministic** if for all q ∈ Q, a ∈ Σ, X ∈ Γ:

1. |δ(q, a, X)| + |δ(q, ε, X)| ≤ 1

This means:
- At most one transition on each (q, a, X)
- If δ(q, ε, X) is non-empty, then δ(q, a, X) is empty for all a

## No ε-Conflict

Key restriction: Cannot choose between reading input and not reading input.

If ε-transition exists from (q, X), no other transition from (q, X).

## DPDA vs NPDA

| Aspect | DPDA | NPDA |
|--------|------|------|
| Computation | Single path | Multiple paths |
| Efficiency | Linear time | Polynomial (CYK) |
| Power | Less | More |
| Parsing | LL, LR languages | All CFLs |

## Languages Not Recognized by DPDAs

**Example**: L = {wwᴿ | w ∈ {a,b}*}

Requires guessing the middle—no deterministic way to know when first half ends.

**Example**: L = {aⁿbⁿ} ∪ {aⁿb²ⁿ}

After reading a's, cannot deterministically choose which pattern to match.

## Deterministic CFLs

A language L is a **Deterministic CFL (DCFL)** if some DPDA accepts L.

Properties:
- DCFLs ⊊ CFLs (proper subset)
- DCFLs closed under complement
- DCFLs not closed under union, intersection

## Important DCFLs

Most programming language syntax is deterministic:
- Arithmetic expressions (with unambiguous grammar)
- Balanced parentheses
- aⁿbⁿ (but not wwᴿ)

## Acceptance Mode Matters

For DPDAs:
- Final state acceptance: More languages
- Empty stack acceptance: Fewer languages

**Theorem**: L has DPDA by empty stack iff L$ has DPDA by final state.

Adding end-marker $ makes them equivalent.

## LR Grammars

An unambiguous CFG is **LR** if it can be parsed by a DPDA (bottom-up, left-to-right, rightmost derivation).

Properties:
- LR ⊂ unambiguous CFGs
- Every LR grammar has equivalent DPDA
- Basis for LR parsing (yacc, bison)

## LL Grammars

A CFG is **LL** if it can be parsed by a predictive parser (top-down, left-to-right, leftmost derivation).

Properties:
- LL ⊂ LR ⊂ DCFL
- Simpler to implement
- Recursive descent parsing

## DPDA Closure Properties

DCFLs are:
- Closed under complement
- Closed under intersection with regular languages
- Not closed under union
- Not closed under intersection
- Not closed under concatenation
- Not closed under Kleene star

## Parsing Complexity

| Grammar Class | Parser | Time |
|---------------|--------|------|
| LR | DPDA | O(n) |
| General CFG | Earley | O(n³) |
| Ambiguous | GLR | O(n³) |

## Prefix Property

DPDA accepting by empty stack can only accept prefix-free languages (no string is prefix of another in L).

This is because accepting computation leaves no choice for continuation.

## Practical Importance

DPDAs underlie:
- Compiler front-ends
- Programming language parsers
- Configuration file parsers
- Protocol validators

Linear-time parsing makes them practical for real use.
