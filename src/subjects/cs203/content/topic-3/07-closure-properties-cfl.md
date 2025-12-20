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

## Detailed Proof: CFLs Not Closed Under Intersection

Let's prove this fundamental result in detail.

**Theorem**: The class of context-free languages is not closed under intersection.

**Proof by counterexample**:

Define two languages:
- L₁ = {aⁿbⁿcᵐ | n, m ≥ 0}
- L₂ = {aᵐbⁿcⁿ | n, m ≥ 0}

**Step 1**: Show L₁ is context-free.

Grammar G₁:
```
S → AB
A → aAb | ε
B → cB | ε
```

A generates aⁿbⁿ and B generates cᵐ, so L(G₁) = L₁. ✓

**Step 2**: Show L₂ is context-free.

Grammar G₂:
```
S → AB
A → aA | ε
B → bBc | ε
```

A generates aᵐ and B generates bⁿcⁿ, so L(G₂) = L₂. ✓

**Step 3**: Compute L₁ ∩ L₂.

A string is in both languages iff:
- It has n a's, n b's, and m c's (from L₁)
- It has m a's, n b's, and n c's (from L₂)

This requires n = m, so:

L₁ ∩ L₂ = {aⁿbⁿcⁿ | n ≥ 0}

**Step 4**: Show {aⁿbⁿcⁿ} is not context-free using the pumping lemma.

Assume L = {aⁿbⁿcⁿ} is CFL with pumping length p.
Choose s = aᵖbᵖcᵖ.
For any decomposition uvxyz with |vxy| ≤ p and |vy| > 0:
- vxy spans at most 2 symbol types
- Pumping changes counts of at most 2 symbol types
- Cannot maintain all three counts equal
- Contradiction!

Therefore L₁ ∩ L₂ is not context-free. ∎

## Detailed Proof: CFLs Closed Under Union

**Theorem**: If L₁ and L₂ are context-free, then L₁ ∪ L₂ is context-free.

**Proof by construction**:

Let G₁ = (V₁, Σ, R₁, S₁) generate L₁ and G₂ = (V₂, Σ, R₂, S₂) generate L₂.

Without loss of generality, assume V₁ ∩ V₂ = ∅ (rename variables if needed).

Construct G = (V, Σ, R, S) where:
- V = V₁ ∪ V₂ ∪ {S} (S is new start symbol)
- R = R₁ ∪ R₂ ∪ {S → S₁ | S₂}

**Correctness**:

For any w ∈ L(G):
- If derivation uses S → S₁, then S₁ ⇒* w, so w ∈ L₁ ⊆ L₁ ∪ L₂
- If derivation uses S → S₂, then S₂ ⇒* w, so w ∈ L₂ ⊆ L₁ ∪ L₂
- Therefore L(G) ⊆ L₁ ∪ L₂

For any w ∈ L₁ ∪ L₂:
- If w ∈ L₁, then S₁ ⇒* w, so S → S₁ ⇒* w, thus w ∈ L(G)
- If w ∈ L₂, then S₂ ⇒* w, so S → S₂ ⇒* w, thus w ∈ L(G)
- Therefore L₁ ∪ L₂ ⊆ L(G)

Hence L(G) = L₁ ∪ L₂. ∎

## Intersection with Regular Languages: Detailed Proof

**Theorem**: If L is a CFL and R is a regular language, then L ∩ R is a CFL.

**Proof by product construction**:

Let P = (Q_P, Σ, Γ, δ_P, q₀, Z₀, F_P) be a PDA for L.
Let D = (Q_D, Σ, δ_D, q₀', F_D) be a DFA for R.

Construct PDA P' = (Q, Σ, Γ, δ, (q₀, q₀'), Z₀, F) where:
- Q = Q_P × Q_D (product state space)
- Initial state: (q₀, q₀')
- Accept states: F = F_P × F_D
- Transition function: δ((q_p, q_d), a, X) contains ((q_p', q_d'), γ) iff:
  - (q_p', γ) ∈ δ_P(q_p, a, X)
  - q_d' = δ_D(q_d, a)

**Correctness**:

P' accepts w iff:
- PDA component accepts (w ∈ L)
- DFA component accepts (w ∈ R)
- Both conditions met (w ∈ L ∩ R)

Therefore L(P') = L ∩ R, which is context-free. ∎

## Using Closure Properties in Proofs

Closure properties are powerful tools for proving languages are or aren't context-free.

### Example 1: Proving Non-CFL via Intersection

**Claim**: L = {aⁿbⁿcⁿdⁿ | n ≥ 0} is not context-free.

**Proof using closure**:

Assume L is a CFL. Consider regular language R = a*b*c*d*.

Then L ∩ R = L (since L ⊆ R already).

But we know L is not context-free by the pumping lemma.

Contradiction. Therefore, our assumption is wrong, and L cannot be context-free.

This proof is shorter than directly applying the pumping lemma!

### Example 2: Building CFLs from Simpler Ones

**Claim**: L = {aⁿbⁿ | n ≥ 0} ∪ {aⁿcⁿ | n ≥ 0} is context-free.

**Proof using closure**:

Both {aⁿbⁿ | n ≥ 0} and {aⁿcⁿ | n ≥ 0} are context-free (standard examples).

Since CFLs are closed under union, L is context-free. ✓

## Concatenation Closure: Detailed Example

**Theorem**: If L₁ and L₂ are CFLs, then L₁L₂ is a CFL.

**Construction**:

Given grammars G₁ = (V₁, Σ, R₁, S₁) and G₂ = (V₂, Σ, R₂, S₂):

Create G = (V₁ ∪ V₂ ∪ {S}, Σ, R₁ ∪ R₂ ∪ {S → S₁S₂}, S)

**Example**:
- L₁ = {aⁿbⁿ | n ≥ 0} with grammar S₁ → aS₁b | ε
- L₂ = {cⁿdⁿ | n ≥ 0} with grammar S₂ → cS₂d | ε

Concatenation L₁L₂ = {aⁿbⁿcᵐdᵐ | n, m ≥ 0}:

```
S → S₁S₂
S₁ → aS₁b | ε
S₂ → cS₂d | ε
```

This generates strings by first generating aⁿbⁿ then cᵐdᵐ.

## Kleene Star Closure: Detailed Example

**Theorem**: If L is a CFL, then L* is a CFL.

**Construction**:

Given grammar G = (V, Σ, R, S₀):

Create G' = (V ∪ {S}, Σ, R ∪ {S → SS₀ | ε}, S)

**Example**:
- L = {aⁿbⁿ | n ≥ 1} with grammar S₀ → aS₀b | ab

L* includes ε, aⁿbⁿ for all n ≥ 1, and concatenations:

```
S → SS₀ | ε
S₀ → aS₀b | ab
```

Example derivations:
- S ⇒ ε (generates ε)
- S ⇒ SS₀ ⇒ S₀ ⇒ ab (generates ab)
- S ⇒ SS₀ ⇒ SS₀S₀ ⇒ S₀S₀ ⇒ abaabb (generates concatenation)

## Why Complement is Hard

CFLs are not closed under complement, but proving this is tricky.

**Indirect proof**: If CFLs were closed under complement, they'd be closed under intersection:

L₁ ∩ L₂ = (L̄₁ ∪ L̄₂)̄ (De Morgan's Law)

Since we know CFLs aren't closed under intersection, they can't be closed under complement.

**But**: Deterministic CFLs (DCFLs) ARE closed under complement! This is because DPDAs can be complemented algorithmically.

## Homomorphism Closure Properties

### Homomorphism: Detailed Example

**Definition**: A homomorphism h: Σ* → Δ* is defined by h(a) for each a ∈ Σ, extended to strings:
- h(ε) = ε
- h(wa) = h(w)h(a)

**Theorem**: If L is a CFL and h is a homomorphism, then h(L) is a CFL.

**Example**:
- L = {aⁿbⁿ | n ≥ 0}
- h(a) = xy, h(b) = z

h(L) = {(xy)ⁿzⁿ | n ≥ 0} = {xⁿyⁿzⁿ | n ≥ 0}

Wait, this looks like {xⁿyⁿzⁿ}, which isn't context-free!

Actually, (xy)ⁿ = xyxyxy...xy (n copies of xy), not xⁿyⁿ.

So h(L) = {xyxyxy...xyzz...z | n copies of xy, n copies of z}, which IS context-free.

**Construction**: Replace each terminal a in grammar with h(a).

### Inverse Homomorphism: Detailed Example

**Theorem**: If L is a CFL and h is a homomorphism, then h⁻¹(L) is a CFL.

**Example**:
- L = {aⁿbⁿ | n ≥ 0}
- h(x) = a, h(y) = ab, h(z) = b

h⁻¹(L) = {w | h(w) ∈ L}

If w = xⁿzᵐ, then h(w) = aⁿbᵐ, which is in L iff n = m.
So xⁿzⁿ ⊆ h⁻¹(L).

If w = yⁿ, then h(w) = (ab)ⁿ = aⁿbⁿ ∈ L.
So yⁿ ⊆ h⁻¹(L).

The full inverse is more complex, but the construction works via PDA simulation.

## Practical Applications of Closure Properties

### Compiler Design
- Union: Combine multiple language constructs
- Concatenation: Sequence statements
- Intersection with regular: Add lexical constraints

### Natural Language Processing
- Union: Combine grammatical patterns
- Kleene star: Handle repetition
- Homomorphism: Character normalization

### Formal Verification
- Use closure properties to reason about program behavior
- Build complex specifications from simpler ones

## Key Takeaways

- CFLs are closed under union, concatenation, Kleene star, reversal, and homomorphism
- CFLs are NOT closed under intersection, complement, or set difference
- CFLs are closed under intersection with regular languages—a crucial result
- Closure under union allows combining languages with S → S₁ | S₂ construction
- Non-closure under intersection is proven via the {aⁿbⁿcⁿ} counterexample
- Non-closure under complement follows from non-closure under intersection via De Morgan's law
- Deterministic CFLs have different closure properties: closed under complement but not union
- Closure properties are powerful tools for proving whether languages are context-free
- Understanding closure helps in grammar design and language analysis
- The product construction for intersection with regular languages combines PDA and DFA states
