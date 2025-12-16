# Closure Properties of Regular Languages

Regular languages are closed under numerous operations, making them robust and compositionally useful. These closure properties enable building complex languages from simpler ones.

## Boolean Closures

### Union
If L₁ and L₂ are regular, then L₁ ∪ L₂ is regular.

**Regex proof**: If R₁ describes L₁ and R₂ describes L₂, then R₁ | R₂ describes L₁ ∪ L₂.

**Automata proof**: Product construction or NFA with ε-transitions to both automata.

### Intersection
If L₁ and L₂ are regular, then L₁ ∩ L₂ is regular.

**Proof**: Product construction on DFAs—accept when both would accept.

### Complement
If L is regular over Σ, then Σ* - L is regular.

**Proof**: For DFA M, swap accepting and non-accepting states.

### Set Difference
L₁ - L₂ = L₁ ∩ L̄₂ is regular when both are regular.

## Regular Operation Closures

### Concatenation
If L₁ and L₂ are regular, then L₁L₂ is regular.

**Regex proof**: R₁R₂ describes L₁L₂.

### Kleene Star
If L is regular, then L* is regular.

**Regex proof**: R* describes L*.

### Kleene Plus
L⁺ = LL* is regular.

## Other Closures

### Reversal
L^R = {w^R | w ∈ L} is regular if L is.

**Proof**: Reverse all automaton transitions, swap start and accept.

### Prefix
Prefix(L) = {x | xy ∈ L for some y} is regular.

**Proof**: Make all states reachable from start that can reach an accept into accepting states.

### Suffix
Suffix(L) = {y | xy ∈ L for some x} is regular.

**Proof**: Add ε-transitions from new start to all states, keep original accepts.

### Substring
Substring(L) = {y | xyz ∈ L for some x, z} is regular.

**Proof**: Combine prefix and suffix operations.

### Homomorphism
For h: Σ* → Δ*, h(L) = {h(w) | w ∈ L} is regular.

**Proof**: Replace transitions labeled a with paths for h(a).

### Inverse Homomorphism
h⁻¹(L) = {w | h(w) ∈ L} is regular.

**Proof**: Construct DFA that simulates reading h(w) character by character.

### Quotient
L₁/L₂ = {x | xy ∈ L₁ for some y ∈ L₂} is regular.

**Proof**: Mark states from which some string in L₂ leads to accept.

## Product Construction

Given DFAs M₁ = (Q₁, Σ, δ₁, q₁, F₁) and M₂ = (Q₂, Σ, δ₂, q₂, F₂):

Construct M = (Q₁ × Q₂, Σ, δ, (q₁, q₂), F) where:
- δ((p, q), a) = (δ₁(p, a), δ₂(q, a))
- For union: F = (F₁ × Q₂) ∪ (Q₁ × F₂)
- For intersection: F = F₁ × F₂

## Using Closure for Proofs

**Example**: L = {w ∈ {a,b}* | #a(w) ≡ #b(w) mod 3} is regular.

1. L_a = {w | #a(w) ≡ 0 mod 3} is regular (3-state DFA)
2. L_b = {w | #b(w) ≡ 0 mod 3} is regular (3-state DFA)
3. We need #a ≡ #b (mod 3), not both ≡ 0
4. Build product automaton tracking (#a mod 3, #b mod 3)
5. Accept when both components equal

## Closure Under Substitution

Let s: Σ → P(Δ*) map each symbol to a regular language.
Extend to strings: s(a₁...aₙ) = s(a₁)...s(aₙ)
Extend to languages: s(L) = ⋃_{w ∈ L} s(w)

**Theorem**: If L and each s(a) are regular, then s(L) is regular.

**Proof**: Replace each transition labeled a with an automaton for s(a).

## Non-Closure Properties

Regular languages are **not** closed under:
- Infinite union (would need infinitely many states)
- Perfect shuffle of infinite collections
- Operations requiring unbounded counting
