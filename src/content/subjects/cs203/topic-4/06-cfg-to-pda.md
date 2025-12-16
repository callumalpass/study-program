# CFG to PDA Conversion

Every context-free language is accepted by some PDA. The conversion simulates leftmost derivations on the stack.

## Two Construction Methods

### Top-Down (LL-style)
Predict productions, match terminals.
Stack holds expected symbols.

### Bottom-Up (LR-style)
Shift input, reduce by productions.
Stack holds parsed symbols.

## Top-Down Construction

Given CFG G = (V, Σ, R, S), construct PDA M:

**States**: {q} (single state!)
**Stack alphabet**: Γ = V ∪ Σ ∪ {Z₀}
**Initial stack**: Z₀S (start symbol on top)

**Transitions**:

1. **Variable expansion**: For each A → α in R:
   - δ(q, ε, A) includes (q, α)
   - Nondeterministically choose production

2. **Terminal matching**: For each a ∈ Σ:
   - δ(q, a, a) = {(q, ε)}
   - Match and pop

3. **Accept**: δ(q, ε, Z₀) = {(q_f, ε)}

Accept by reaching q_f (or empty stack).

## Example: Expression Grammar

Grammar:
- E → E + T | T
- T → T * F | F
- F → (E) | id

PDA transitions:
- δ(q, ε, E) = {(q, E+T), (q, T)}
- δ(q, ε, T) = {(q, T*F), (q, F)}
- δ(q, ε, F) = {(q, (E)), (q, id)}
- δ(q, +, +) = {(q, ε)}
- δ(q, *, *) = {(q, ε)}
- etc.

## Tracing Computation

For input "id + id":

```
Stack: Z₀E     Input: id+id
Apply E → E+T
Stack: Z₀E+T   Input: id+id
Apply E → T
Stack: Z₀T+T   Input: id+id
Apply T → F
Stack: Z₀F+T   Input: id+id
Apply F → id
Stack: Z₀id+T  Input: id+id
Match id
Stack: Z₀+T    Input: +id
Match +
Stack: Z₀T     Input: id
Apply T → F
Stack: Z₀F     Input: id
Apply F → id
Stack: Z₀id    Input: id
Match id
Stack: Z₀      Input: ε
Accept!
```

## Extended PDA Construction

For practical parsing, modify:

1. Convert grammar to GNF first
2. Each production A → aα becomes:
   - δ(q, a, A) = {(q, α)}
3. This is deterministic for LL grammars

## Correctness

**Theorem**: L(M) = L(G)

**Proof sketch**:
- Each accepting computation corresponds to leftmost derivation
- Stack tracks remaining sentential form
- Input consumed matches derived terminals

## Alternative: Bottom-Up

Shift-reduce PDA:
- Shift: push input onto stack
- Reduce: match pattern, replace with variable

More complex but basis for LR parsing.

## Size Analysis

Given CFG G with:
- |V| variables
- |R| productions
- Maximum production length m

PDA has:
- O(1) states (just q)
- O(|V| + |Σ|) stack symbols
- O(|R|) transitions

Linear in grammar size!

## Comparison of Directions

| Direction | Complexity | Practical Use |
|-----------|------------|---------------|
| CFG → PDA | Linear | Parsing algorithms |
| PDA → CFG | Exponential | Theoretical |

## Main Theorem

**Theorem**: A language is context-free iff it is accepted by some PDA.

**Proof**:
- CFG → PDA: Top-down construction
- PDA → CFG: Variable [p,A,q] construction

This establishes equivalence of the two models.
