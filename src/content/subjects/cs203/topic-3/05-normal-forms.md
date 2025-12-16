# Normal Forms

**Normal forms** are restricted grammar formats that simplify analysis and parsing while preserving expressive power. Every CFG can be converted to normal form.

## Chomsky Normal Form (CNF)

A grammar is in **Chomsky Normal Form** if every production has one of these forms:
- A → BC (two variables)
- A → a (single terminal)
- S → ε (only for start symbol, if ε ∈ L)

## Converting to CNF

### Step 1: Eliminate ε-productions
Remove A → ε rules (except S → ε if needed):
- Find nullable variables: those deriving ε
- For each rule B → αAβ with nullable A, add B → αβ
- Remove all A → ε except S → ε

### Step 2: Eliminate unit productions
Remove A → B rules:
- Find all pairs (A, B) where A ⇒* B using only unit productions
- For each A ⇒* B and B → α (non-unit), add A → α
- Remove all unit productions

### Step 3: Convert long productions
For A → X₁X₂...Xₖ with k > 2:
- Replace with A → X₁A₁, A₁ → X₂A₂, ..., Aₖ₋₂ → Xₖ₋₁Xₖ

### Step 4: Replace terminals
For A → X₁X₂ where some Xᵢ is terminal a:
- Add new rule Cₐ → a
- Replace terminal a with Cₐ

## CNF Example

Original:
- S → AB | aB
- A → aab
- B → Ac

After conversion:
- S → AB | CB
- A → Ca Ca Cb (becomes A → CaD, D → CaCb)
- B → AC'  where C' represents c
- Ca → a, Cb → b, Cc → c

## Greibach Normal Form (GNF)

A grammar is in **Greibach Normal Form** if every production has form:
- A → aα where a is terminal and α ∈ V*

Every production starts with exactly one terminal.

## Converting to GNF

1. First convert to CNF
2. Order variables A₁, A₂, ..., Aₙ
3. Transform so Aᵢ → Aⱼα only when j > i
4. Eliminate left recursion
5. Back-substitute to get GNF

## Left Recursion Elimination

**Direct left recursion**: A → Aα | β

Replace with:
- A → βA'
- A' → αA' | ε

**Indirect left recursion**: A ⇒⁺ Aα

Requires ordering variables and systematic elimination.

## Why Normal Forms?

### CNF Benefits
- Simplified parsing algorithms (CYK)
- Proof techniques (induction on tree height)
- Exactly 2n-1 steps to derive string of length n

### GNF Benefits
- One terminal per step
- Exactly n steps for length n
- Natural for top-down parsing

## Size Blowup

Converting to CNF can increase grammar size:
- Original: O(|G|)
- After CNF: O(|G|²) worst case

GNF can be worse: O(|G|⁴)

## Preservation of Language

**Theorem**: For any CFG G, there exists:
- CNF grammar G' with L(G') = L(G) - {ε}, or L(G') = L(G) if S → ε allowed
- GNF grammar G'' with L(G'') = L(G) - {ε}

## Applications

| Form | Application |
|------|-------------|
| CNF | CYK parsing algorithm |
| CNF | Pumping lemma proofs |
| GNF | Top-down parsing |
| GNF | Language theory proofs |
