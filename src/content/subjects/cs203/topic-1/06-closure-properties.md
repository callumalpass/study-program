# Closure Properties of Regular Languages

**Closure properties** describe operations under which a class of languages is closed. Regular languages are remarkably robust—they are closed under many natural operations.

## Boolean Closure

Regular languages are closed under all Boolean operations:

### Union
If L₁ and L₂ are regular, so is L₁ ∪ L₂.

**Proof**: Given DFAs M₁ and M₂, construct a product automaton that tracks both simultaneously and accepts if either would accept.

Alternatively, use NFAs: connect a new start state with ε-transitions to both NFAs' start states.

### Intersection
If L₁ and L₂ are regular, so is L₁ ∩ L₂.

**Proof**: Product construction—accept if **both** automata would accept.

### Complement
If L is regular, so is L̄ = Σ* - L.

**Proof**: For DFA M, construct M' by swapping accepting and non-accepting states. Note: This doesn't work for NFAs directly!

### Set Difference
If L₁ and L₂ are regular, so is L₁ - L₂.

**Proof**: L₁ - L₂ = L₁ ∩ L̄₂. Follows from intersection and complement.

### Symmetric Difference
L₁ Δ L₂ = (L₁ - L₂) ∪ (L₂ - L₁) is regular if L₁ and L₂ are.

## Regular Operations

### Concatenation
If L₁ and L₂ are regular, so is L₁ · L₂ = {xy | x ∈ L₁, y ∈ L₂}.

**Proof**: Connect NFA for L₁ to NFA for L₂ with ε-transitions from L₁'s accepting states to L₂'s start state.

### Kleene Star
If L is regular, so is L* = {ε} ∪ L ∪ LL ∪ LLL ∪ ...

**Proof**: Take NFA for L, add new start state (also accepting), add ε-transitions from old accepting states back to old start.

### Kleene Plus
L⁺ = L · L* is regular if L is.

## Other Closure Properties

### Reversal
If L is regular, so is L^R = {w^R | w ∈ L}.

**Proof**: Reverse all transitions in the automaton, swap start and accepting states.

### Homomorphism
A **homomorphism** h: Σ* → Δ* extends a function on symbols to strings. If L is regular, so is h(L) = {h(w) | w ∈ L}.

**Proof**: Replace each transition labeled 'a' with transitions spelling out h(a).

### Inverse Homomorphism
If L is regular and h is a homomorphism, then h⁻¹(L) = {w | h(w) ∈ L} is regular.

**Proof**: Construct DFA that simulates reading h(w) as it reads w.

## Product Construction Details

Given M₁ = (Q₁, Σ, δ₁, q₁, F₁) and M₂ = (Q₂, Σ, δ₂, q₂, F₂):

Product automaton M = (Q₁ × Q₂, Σ, δ, (q₁, q₂), F) where:
- δ((p, q), a) = (δ₁(p, a), δ₂(q, a))
- For union: F = {(p, q) | p ∈ F₁ or q ∈ F₂}
- For intersection: F = {(p, q) | p ∈ F₁ and q ∈ F₂}

## Using Closure Properties

Closure properties enable proving languages are regular by construction:

**Example**: Prove L = {w | w has even length and contains "01"} is regular.

- L_even = {w | |w| is even} — regular (simple DFA)
- L_01 = {w | w contains "01"} — regular
- L = L_even ∩ L_01 — regular by intersection

## Non-Closure Properties

Regular languages are **not** closed under:
- Infinite union (uncountably many regular languages exist, but only countably many regular languages)
- Some operations involving counting (e.g., {aⁿbⁿ} is not regular)

Understanding what operations preserve regularity helps in both constructing automata and proving non-regularity.
