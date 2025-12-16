# Decidability for Automata

While TM problems are often undecidable, many problems about finite automata and context-free grammars are decidable. This section surveys these results.

## DFA Decision Problems

### Acceptance: A_DFA
**Input**: DFA M, string w
**Question**: Does M accept w?
**Decidable**: Yes
**Algorithm**: Simulate M on w
**Complexity**: O(|w|)

### Emptiness: E_DFA
**Input**: DFA M
**Question**: Is L(M) = ∅?
**Decidable**: Yes
**Algorithm**: Check if accepting state reachable from start
**Complexity**: O(|Q| + |δ|)

### Universality: ALL_DFA
**Input**: DFA M over Σ
**Question**: Is L(M) = Σ*?
**Decidable**: Yes
**Algorithm**: Complement M, check emptiness
**Complexity**: O(|Q| + |δ|)

### Equivalence: EQ_DFA
**Input**: DFAs M₁, M₂
**Question**: Is L(M₁) = L(M₂)?
**Decidable**: Yes
**Algorithm**: Check (L₁ ∩ L̄₂) ∪ (L̄₁ ∩ L₂) = ∅
**Complexity**: O(|Q₁| · |Q₂|)

### Finiteness
**Input**: DFA M
**Question**: Is L(M) finite?
**Decidable**: Yes
**Algorithm**: Check for cycles reaching accepting states

### Minimality
**Input**: DFA M
**Question**: Is M minimal?
**Decidable**: Yes
**Algorithm**: Minimize, compare size

## NFA Decision Problems

Same problems as DFA, but:
- May require exponential conversion to DFA
- Universality: PSPACE-complete
- Equivalence: PSPACE-complete

## CFG Decision Problems

### Acceptance: A_CFG
**Input**: CFG G, string w
**Question**: Does G generate w?
**Decidable**: Yes
**Algorithm**: CYK algorithm on CNF
**Complexity**: O(n³|G|)

### Emptiness: E_CFG
**Input**: CFG G
**Question**: Is L(G) = ∅?
**Decidable**: Yes
**Algorithm**: Mark generating variables iteratively

### Finiteness: FIN_CFG
**Input**: CFG G
**Question**: Is L(G) finite?
**Decidable**: Yes
**Algorithm**: Check for useful cycles in variable dependency

### Undecidable CFG Problems

- **Universality**: Is L(G) = Σ*? Undecidable
- **Equivalence**: Is L(G₁) = L(G₂)? Undecidable
- **Ambiguity**: Is G ambiguous? Undecidable
- **Regularity**: Is L(G) regular? Undecidable
- **Intersection emptiness**: Is L(G₁) ∩ L(G₂) = ∅? Undecidable

## PDA Decision Problems

Similar to CFG (equivalent models):
- Acceptance: Decidable (simulate or use CYK)
- Emptiness: Decidable
- Universality: Undecidable
- Equivalence: Undecidable

## Summary Table

| Problem | DFA | NFA | CFG | TM |
|---------|-----|-----|-----|-----|
| Acceptance | O(n) | Poly | O(n³) | Undec |
| Emptiness | Poly | Poly | Poly | Undec |
| Universality | Poly | PSPACE | Undec | Undec |
| Equivalence | Poly | PSPACE | Undec | Undec |
| Finiteness | Poly | Poly | Poly | Undec |

## Why the Difference?

DFAs/CFGs are restricted enough that many properties become checkable:
- Finite structure allows exhaustive analysis
- Closure properties enable compositional checking

TMs are too powerful:
- Can encode arbitrary computation
- Rice's Theorem applies
- Most properties undecidable

## Practical Value

The decidability results enable:
- Regex and grammar validation
- Lexer/parser generator verification
- Protocol verification (finite-state systems)
- Model checking (finite models)
