# Closure Properties of CFLs

Context-free languages have important closure properties, though they're less robust than regular languages. Understanding these helps in language analysis.

## Closed Operations

### Union
If L₁ and L₂ are CFLs, then L₁ ∪ L₂ is a CFL.

**Construction**: Given grammars G₁ = (V₁, Σ, R₁, S₁) and G₂ = (V₂, Σ, R₂, S₂) with disjoint variables:
- New start S with rules S → S₁ | S₂

### Concatenation
If L₁ and L₂ are CFLs, then L₁L₂ is a CFL.

**Construction**: Add new start S with rule S → S₁S₂

### Kleene Star
If L is a CFL, then L* is a CFL.

**Construction**: Add new start S with rules S → SS₁ | ε

### Reversal
If L is a CFL, then Lᴿ is a CFL.

**Construction**: Reverse right-hand sides of all productions.

### Homomorphism
If L is a CFL and h: Σ* → Δ* is a homomorphism, then h(L) is a CFL.

**Construction**: Replace each terminal a with string h(a).

### Inverse Homomorphism
If L is a CFL and h: Σ* → Δ* is a homomorphism, then h⁻¹(L) is a CFL.

**Proof**: Uses PDA construction that simulates reading h(a) for each input a.

## Not Closed Operations

### Intersection
CFLs are **not** closed under intersection!

**Proof**: L₁ = {aⁿbⁿcᵐ} and L₂ = {aᵐbⁿcⁿ} are CFLs.
But L₁ ∩ L₂ = {aⁿbⁿcⁿ} which is not a CFL.

### Complement
CFLs are **not** closed under complement!

**Proof**: If closed under complement, would be closed under intersection (since L₁ ∩ L₂ = (L̄₁ ∪ L̄₂)̄).

### Set Difference
CFLs are **not** closed under difference.

**Proof**: L - M = L ∩ M̄, and we're not closed under complement.

## Intersection with Regular Languages

**Theorem**: If L is a CFL and R is a regular language, then L ∩ R is a CFL.

**Proof**: Product construction with PDA and DFA. The PDA tracks its state, and the DFA state is incorporated into the PDA.

This is extremely useful for:
- Adding constraints to CFLs
- Proving non-context-freeness

## Using Closure for Proofs

### Proving Non-CFL
If L were context-free and R is regular, then L ∩ R would be context-free.
Show L ∩ R is not context-free → L is not context-free.

**Example**: L = {aⁱbʲcᵏ | i=j or j=k}
- L ∩ a*b*c* would need to check both conditions
- Can show this intersection is not CFL
- Therefore L is not CFL

## Summary Table

| Operation | Regular | CFL |
|-----------|---------|-----|
| Union | ✓ | ✓ |
| Intersection | ✓ | ✗ |
| Complement | ✓ | ✗ |
| Concatenation | ✓ | ✓ |
| Kleene Star | ✓ | ✓ |
| Reversal | ✓ | ✓ |
| Homomorphism | ✓ | ✓ |
| Inverse Homomorphism | ✓ | ✓ |
| ∩ with Regular | ✓ | ✓ |

## Deterministic CFLs

The deterministic CFLs (languages accepted by DPDAs) have different closure:
- Closed under complement (unlike general CFLs)
- Not closed under union or intersection
