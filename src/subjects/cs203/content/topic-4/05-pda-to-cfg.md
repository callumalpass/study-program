---
id: cs203-t4-pdatocfg
title: "PDA to CFG Conversion"
order: 5
---

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

## Detailed Conversion Example

Let's work through a complete conversion from PDA to CFG.

**Given PDA** accepting $L = \{0^n 1^n \mid n \geq 1\}$:
- States: $Q = \{q_0, q_1\}$
- Stack: $\Gamma = \{Z_0, X\}$
- Transitions:
  - $\delta(q_0, 0, Z_0) = \{(q_0, XZ_0)\}$
  - $\delta(q_0, 0, X) = \{(q_0, XX)\}$
  - $\delta(q_0, 1, X) = \{(q_1, \varepsilon)\}$
  - $\delta(q_1, 1, X) = \{(q_1, \varepsilon)\}$
  - $\delta(q_1, \varepsilon, Z_0) = \{(q_1, \varepsilon)\}$

**Step 1: Define variables**

All possible $[p, A, q]$ where $p, q \in Q$ and $A \in \Gamma$:
- $[q_0, Z_0, q_0]$, $[q_0, Z_0, q_1]$
- $[q_0, X, q_0]$, $[q_0, X, q_1]$
- $[q_1, Z_0, q_0]$, $[q_1, Z_0, q_1]$
- $[q_1, X, q_0]$, $[q_1, X, q_1]$

Plus start symbol $S$.

**Step 2: Start productions**

Since we accept by empty stack, add:
- $S \to [q_0, Z_0, q_0]$
- $S \to [q_0, Z_0, q_1]$

**Step 3: Transition productions**

For $\delta(q_0, 0, Z_0) = \{(q_0, XZ_0)\}$ (pushes $X$ then $Z_0$):
- $[q_0, Z_0, q_0] \to 0[q_0, X, q_0][q_0, Z_0, q_0]$
- $[q_0, Z_0, q_0] \to 0[q_0, X, q_1][q_1, Z_0, q_0]$
- $[q_0, Z_0, q_1] \to 0[q_0, X, q_0][q_0, Z_0, q_1]$
- $[q_0, Z_0, q_1] \to 0[q_0, X, q_1][q_1, Z_0, q_1]$

For $\delta(q_0, 0, X) = \{(q_0, XX)\}$:
- $[q_0, X, q_0] \to 0[q_0, X, q_0][q_0, X, q_0]$
- $[q_0, X, q_0] \to 0[q_0, X, q_1][q_1, X, q_0]$
- $[q_0, X, q_1] \to 0[q_0, X, q_0][q_0, X, q_1]$
- $[q_0, X, q_1] \to 0[q_0, X, q_1][q_1, X, q_1]$

For $\delta(q_0, 1, X) = \{(q_1, \varepsilon)\}$ (pops only):
- $[q_0, X, q_1] \to 1$

For $\delta(q_1, 1, X) = \{(q_1, \varepsilon)\}$:
- $[q_1, X, q_1] \to 1$

For $\delta(q_1, \varepsilon, Z_0) = \{(q_1, \varepsilon)\}$:
- $[q_1, Z_0, q_1] \to \varepsilon$

**Step 4: Simplification**

Many variables are unreachable or non-generating. After removing useless productions, we get:

- $S \to [q_0, Z_0, q_1]$
- $[q_0, Z_0, q_1] \to 0[q_0, X, q_1][q_1, Z_0, q_1]$
- $[q_0, X, q_1] \to 0[q_0, X, q_1][q_1, X, q_1]$
- $[q_0, X, q_1] \to 1$
- $[q_1, X, q_1] \to 1$
- $[q_1, Z_0, q_1] \to \varepsilon$

**Derivation example** for "0011":

$$
\begin{align*}
S &\Rightarrow [q_0, Z_0, q_1] \\
&\Rightarrow 0[q_0, X, q_1][q_1, Z_0, q_1] \\
&\Rightarrow 00[q_0, X, q_1][q_1, X, q_1][q_1, Z_0, q_1] \\
&\Rightarrow 001[q_1, X, q_1][q_1, Z_0, q_1] \\
&\Rightarrow 0011[q_1, Z_0, q_1] \\
&\Rightarrow 0011
\end{align*}
$$

## Understanding Variable Semantics

The variable $[p, A, q]$ has precise meaning:

**Generates:** All strings $w$ such that:
- Starting in state $p$ with $A$ on stack top
- After reading $w$
- Reach state $q$ with $A$ removed (net effect)

This semantic interpretation is key to the construction's correctness.

## Why the Construction Works

**Intuition:** Simulating PDA computation via derivation

Each production rule $[p, A, q] \to a[r_1, B_1, r_2][r_2, B_2, r_3] \cdots [r_{k-1}, B_k, q]$ represents:

1. Read $a$ in state $p$ with $A$ on top
2. Transition to $r_1$, push $B_1, \ldots, B_k$
3. Process $B_1$ (go from $r_1$ to $r_2$)
4. Process $B_2$ (go from $r_2$ to $r_3$)
5. Continue until reaching $q$ with all pushed symbols processed

The derivation tree mirrors the PDA computation tree.

## Correctness Proof Sketch

**Claim:** $[p, A, q] \Rightarrow^* w$ iff $(p, w, A) \vdash^* (q, \varepsilon, \varepsilon)$

**Proof by induction** on derivation length / computation length:

**Base case:** $[p, A, q] \Rightarrow w$ in one step
- Must use rule $[p, A, q] \to a$ (for some $a$)
- Came from transition $\delta(p, a, A) \ni (q, \varepsilon)$
- So $(p, a, A) \vdash (q, \varepsilon, \varepsilon)$

**Inductive case:** Multi-step derivation
- First production: $[p, A, q] \to a[r, B_1, r_1][r_1, B_2, r_2] \cdots [r_{k-1}, B_k, q]$
- Each $[r_i, B_{i+1}, r_{i+1}] \Rightarrow^* w_i$ by IH
- Corresponds to PDA processing each pushed symbol
- Complete derivation mirrors complete computation

This establishes $L(G) = N(M)$.

## Handling ε-Transitions

When PDA has $\delta(p, \varepsilon, A) \ni (q, \gamma)$, we include corresponding productions:

- If $\gamma = \varepsilon$: add $[p, A, q] \to \varepsilon$
- If $\gamma = B$: add $[p, A, q] \to [q, B, r]$ for all $r$
- General case: add productions with no terminal consumed

These handle stack manipulation without reading input.

## Complexity Analysis Details

Given PDA with $|Q| = n$ states and $|\Gamma| = m$ symbols:

**Variables:** $O(n^2 m)$ — each $[p, A, q]$ is distinct

**Productions per transition:**
- If transition pushes $k$ symbols: $O(n^k)$ productions
- Enumerate all possible intermediate states
- Worst case: $k = m$, giving $O(n^m)$ productions

**Total productions:** Can be exponential in worst case

**Grammar size:** $O(n^{m+2} \cdot m)$ in worst case

This exponential blow-up makes direct construction impractical for large PDAs.

## Alternative: Direct Grammar Design

In practice, rather than converting PDA to CFG:

1. Design CFG directly for the language
2. Use pumping lemma or closure properties
3. Convert CFG to PDA (much simpler)

PDA-to-CFG conversion is primarily of theoretical interest, proving:
- Every PDA-recognizable language has a grammar
- CFLs = PDA-recognizable languages

## Applications of the Construction

Despite impracticality, the construction has theoretical value:

1. **Proves CFL closure under union:** Convert PDAs to CFGs, combine grammars
2. **Shows CFLs have generating characterization**
3. **Enables grammar analysis techniques** on PDA languages
4. **Foundation for parsing theory**

## Optimizing the Grammar

The raw construction produces many useless variables. Optimization steps:

1. **Remove unreachable variables:** Cannot be derived from $S$
2. **Remove non-generating variables:** Cannot derive terminals
3. **Collapse $\varepsilon$-productions:** Standard CFG simplification
4. **Eliminate unit productions:** $A \to B$ where both are variables

After optimization, grammar is much smaller and more readable.

## Key Takeaways

- Every PDA-accepted language can be generated by a CFG
- Construction uses variables $[p, A, q]$ representing "process $A$ from state $p$ to $q$"
- Each PDA transition creates multiple grammar productions
- Productions encode stack symbol processing
- Variable semantics: derive strings that net-pop one stack symbol
- Correctness proven by induction on derivation/computation length
- Grammar size can be exponential in PDA size
- Practical grammars are usually designed directly, not via conversion
- Construction is theoretically crucial for proving CFL properties
- Together with CFG-to-PDA, establishes complete equivalence of models
