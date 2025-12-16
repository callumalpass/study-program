# PDA to CFG Conversion

Every language accepted by a PDA is context-free. The conversion constructs a grammar simulating the PDA's computation.

## Key Insight

Grammar variables represent "going from state p to state q while emptying what was pushed."

Variable [p, A, q] generates strings taking PDA:
- From state p with A on top
- To state q with A popped

## The Construction

Given PDA M = (Q, Σ, Γ, δ, q₀, Z₀, F) accepting by empty stack:

### Step 1: Define Variables
V = {[p, A, q] | p, q ∈ Q, A ∈ Γ} ∪ {S}

### Step 2: Start Rules
For each q ∈ Q:
- Add S → [q₀, Z₀, q]

(Start symbol derives computation emptying initial stack)

### Step 3: Transition Rules

For each transition δ(p, a, A) ∋ (r, B₁B₂...Bₖ):

If k = 0 (pop only):
- Add [p, A, r] → a

If k ≥ 1 (push B₁...Bₖ):
For all state sequences q₁, q₂, ..., qₖ:
- Add [p, A, qₖ] → a [r, B₁, q₁] [q₁, B₂, q₂] ... [qₖ₋₁, Bₖ, qₖ]

## Understanding the Rules

Rule [p, A, qₖ] → a [r, B₁, q₁] [q₁, B₂, q₂] ... [qₖ₋₁, Bₖ, qₖ] means:

To go from p to qₖ while processing A:
1. Read a, push B₁...Bₖ, go to r
2. Process B₁ (from r to q₁)
3. Process B₂ (from q₁ to q₂)
4. ...
5. Process Bₖ (from qₖ₋₁ to qₖ)

## Example Conversion

PDA for {0ⁿ1ⁿ | n ≥ 0}:
- δ(q, 0, Z) = {(q, XZ)}
- δ(q, 0, X) = {(q, XX)}
- δ(q, 1, X) = {(p, ε)}
- δ(p, 1, X) = {(p, ε)}
- δ(p, ε, Z) = {(f, ε)}

Variables: [q,Z,q], [q,Z,p], [q,Z,f], [q,X,q], [q,X,p], [p,X,p], [p,Z,f], etc.

Start rules:
- S → [q, Z, f]

Sample production rules:
- [q, Z, f] → 0 [q, X, q] [q, Z, f] | 0 [q, X, p] [p, Z, f]
- [q, X, p] → 1
- [p, X, p] → 1
- [p, Z, f] → ε

## Grammar Simplification

The raw construction produces many useless variables. Simplify by:
1. Remove unreachable variables
2. Remove non-generating variables
3. Apply standard CFG transformations

## Correctness

**Theorem**: L(G) = N(M) (grammar generates same language PDA accepts)

**Proof sketch**:
- Derivation [p, A, q] ⇒* w corresponds to computation (p, w, A) ⊢* (q, ε, ε)
- Induction on derivation length / computation length

## Size Analysis

Given PDA with:
- |Q| states
- |Γ| stack symbols

Grammar has:
- O(|Q|² |Γ|) variables
- O(|Q|^(k+1)) rules per transition with k symbols pushed

Can be exponential in worst case!

## Practical Considerations

Direct construction rarely used in practice:
- Produces unwieldy grammars
- Better to design CFG directly
- Use conversion for theoretical results

## The Reverse Direction

CFG to PDA conversion (covered elsewhere) is simpler and more practical.

Together, these conversions establish:
**CFG ≡ PDA** (same language class)
