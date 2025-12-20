---
id: cs203-t6-reductions
title: "Reductions"
order: 5
---

# Reduction Techniques

**Reductions** transfer undecidability from known undecidable problems to new problems. If problem A reduces to problem B, then B is at least as hard as A. Reductions are the primary technique for proving new problems undecidable—instead of creating a new diagonalization argument each time, we show that solving the new problem would let us solve a known undecidable problem.

The power of reductions lies in their composability: once we prove one problem undecidable (like the halting problem), we can use it as a foundation to prove countless other problems undecidable. This creates a hierarchy of undecidable problems, all connected through reduction chains.

## Intuition

A reduction shows: "If we could solve B, we could solve A."

If A is undecidable and A reduces to B, then B must be undecidable too.

Think of reductions as transformations: we convert instances of problem A into instances of problem B in such a way that solving B automatically solves A. This is similar to converting a math problem you don't know how to solve into one you do know how to solve.

## Mapping Reductions

A **mapping reduction** from A to B (written A ≤_m B) is a computable function f where:

w ∈ A ⟺ f(w) ∈ B

Key properties:
- f is total (defined on all inputs)
- f is computable
- f preserves membership

## Using Mapping Reductions

**Theorem**: If A ≤_m B and B is decidable, then A is decidable.

**Contrapositive**: If A ≤_m B and A is undecidable, then B is undecidable.

## Reduction Template

To prove B undecidable via reduction from A:

1. Know A is undecidable (e.g., A_TM, HALT)
2. Define computable f: inputs of A → inputs of B
3. Prove: w ∈ A ⟺ f(w) ∈ B
4. Conclude B is undecidable

## Example: HALT to E_TM

E_TM = {⟨M⟩ | L(M) = ∅}

**Reduction from HALT**:

Given ⟨M, w⟩, construct M':
```
M'(x):
  Run M on w (ignoring x)
  Accept
```

If M halts on w: M' accepts everything → L(M') ≠ ∅
If M loops on w: M' accepts nothing → L(M') = ∅

f(⟨M, w⟩) = ⟨M'⟩

⟨M, w⟩ ∈ HALT ⟺ ⟨M'⟩ ∉ E_TM

This shows Ē_TM is undecidable, hence E_TM is undecidable.

## Example: A_TM to EQ_TM

EQ_TM = {⟨M₁, M₂⟩ | L(M₁) = L(M₂)}

**Reduction from A_TM**:

Given ⟨M, w⟩, construct:
- M₁: Always reject
- M₂: Run M on w, then accept current input

L(M₁) = ∅ always
L(M₂) = Σ* if M accepts w, else ∅

⟨M, w⟩ ∈ A_TM ⟺ L(M₂) = Σ* ≠ ∅ = L(M₁)
⟨M, w⟩ ∉ A_TM ⟺ L(M₂) = ∅ = L(M₁)

f(⟨M, w⟩) = ⟨M₁, M₂⟩

⟨M, w⟩ ∈ A_TM ⟺ ⟨M₁, M₂⟩ ∉ EQ_TM

EQ_TM is undecidable.

## Turing Reductions

A stronger notion: A ≤_T B if A is decidable given oracle for B.

**Oracle TM**: TM with "black box" that answers membership in B.

A ≤_T B allows multiple queries, adaptive queries.

## Relationship

A ≤_m B implies A ≤_T B (mapping reduction is special case).

Converse is false: A ≤_T B does not imply A ≤_m B.

## Properties of Reductions

Mapping reductions are:
- **Reflexive**: A ≤_m A (identity function)
- **Transitive**: A ≤_m B and B ≤_m C implies A ≤_m C

## m-Completeness

A is **m-complete** for a class if:
- A is in the class
- Every problem in the class reduces to A

A_TM is m-complete for recognizable languages.

## Reduction Strategies

Common approaches:
1. Encode problem instance into TM behavior
2. Use simulation (run M on w as subroutine)
3. Modify input/output of existing TMs

## Limits of Reductions

Reductions only work one direction:
- A ≤_m B and B decidable → A decidable
- A ≤_m B and A undecidable → B undecidable

Cannot conclude A decidable from B undecidable!

## Detailed Reduction Example: HALT to E_TM

Let's work through the reduction from HALT to $E_{TM}$ step-by-step to understand the technique:

**Problem**: Show that $E_{TM} = \{⟨M⟩ \mid L(M) = \emptyset\}$ is undecidable.

**Reduction from HALT**:

**Step 1: Assume we have a decider for $E_{TM}$**
Suppose $D$ decides $E_{TM}$: $D(⟨M⟩)$ accepts iff $L(M) = \emptyset$.

**Step 2: Construct a decider for HALT using $D$**
We'll build a decider $H$ for HALT using $D$ as a subroutine:

```
H(⟨M, w⟩):
  1. Construct new TM M':
     M'(x):
       Run M on w (ignore x)
       If M halts, accept x
       (If M loops, M' loops and never accepts)

  2. Run D(⟨M'⟩)
  3. If D accepts (M' accepts nothing):
       Reject (M loops on w)
     If D rejects (M' accepts something):
       Accept (M halts on w)
```

**Step 3: Analyze the reduction**
- If $M$ halts on $w$: Then $M'$ accepts all strings (runs $M$ on $w$, which halts, then accepts). So $L(M') = \Sigma^* \neq \emptyset$, and $D$ rejects. Therefore $H$ accepts.
- If $M$ loops on $w$: Then $M'$ loops on all inputs (never gets past simulating $M$ on $w$). So $L(M') = \emptyset$, and $D$ accepts. Therefore $H$ rejects.

**Step 4: Conclusion**
We've shown that if $E_{TM}$ were decidable, then HALT would be decidable. But HALT is undecidable, so $E_{TM}$ must be undecidable.

Note we actually proved $\overline{E_{TM}}$ is undecidable, which implies $E_{TM}$ is undecidable (decidable languages are closed under complement).

## Building Intuition for Reductions

The key insight in constructing reductions is **encoding the original problem in the behavior of a new machine**:

1. **Identify the connection**: How can the behavior of the target problem capture information about the source problem?

2. **Construct the transformation**: Build a machine whose behavior depends on solving the source problem instance.

3. **Verify the mapping**: Check that membership in the source corresponds exactly to membership in the target.

**Common patterns:**
- **Ignore input**: Make a TM that ignores its input and performs some fixed computation
- **Conditional acceptance**: Accept if and only if some condition (related to source problem) holds
- **Simulation**: Simulate the original machine as part of the new machine's behavior

## Advanced Reduction: A_TM to REGULAR_TM

Let's prove that determining whether a TM accepts a regular language is undecidable:

$REGULAR_{TM} = \{⟨M⟩ \mid L(M) \text{ is regular}\}$

**Reduction from $A_{TM}$**:

Given $⟨M, w⟩$, construct $M'$:
```
M'(x):
  If x has the form 0^n 1^n:
    Accept
  Else:
    Run M on w
    If M accepts w, accept x
```

**Analysis**:
- If $M$ accepts $w$: Then $M'$ accepts all strings (the first branch accepts $\{0^n1^n\}$, the second accepts everything when $M$ accepts $w$). So $L(M') = \Sigma^*$, which is regular.
- If $M$ rejects or loops on $w$: Then $M'$ only accepts $\{0^n1^n\}$, which is not regular.

Therefore: $⟨M, w⟩ \in A_{TM} \iff ⟨M'⟩ \in REGULAR_{TM}$

This shows $REGULAR_{TM}$ is undecidable.

## Many-One vs. Turing Reductions

**Many-one (mapping) reductions** ($A \leq_m B$):
- Transform one instance of $A$ into one instance of $B$
- Single query to oracle for $B$
- Preserve decidability and recognizability

**Turing reductions** ($A \leq_T B$):
- Can make multiple queries to oracle for $B$
- Queries can be adaptive (depend on previous answers)
- Only preserve decidability (not necessarily recognizability)

**Example of Turing reduction**:
To decide if two TMs have the same number of states, we could:
1. Query oracle: "Does $M_1$ have exactly $k$ states?" for various $k$
2. Query oracle: "Does $M_2$ have exactly $k$ states?" for various $k$
3. Compare results

This requires multiple queries, so it's a Turing reduction but not a mapping reduction.

## Reductions in Complexity Theory

Reductions also appear in computational complexity:

**Polynomial-time reductions**: Used to define NP-completeness. If $A \leq_p B$ (A reduces to B in polynomial time) and $B \in P$, then $A \in P$.

**Log-space reductions**: Used for finer complexity distinctions.

The same intuition applies: harder problems can solve easier problems. If $A$ reduces to $B$, then $B$ is at least as hard as $A$.

## Common Mistakes in Reduction Proofs

**Mistake 1: Reducing in the wrong direction**
- Wrong: To prove $B$ undecidable, reduce $B$ to $A_{TM}$
- Right: To prove $B$ undecidable, reduce $A_{TM}$ (or HALT) to $B$

**Mistake 2: Non-computable reduction**
- The reduction function itself must be computable
- Can't use an oracle or undecidable procedure in the reduction

**Mistake 3: Reversing implication**
- From $A \leq_m B$ and "$B$ is hard," we conclude "$A$ is easy"
- This is backwards! We conclude "$B$ is hard" from "$A$ is hard"

## Practical Applications of Reductions

Reductions aren't just theoretical—they inform practical software engineering:

**Compiler Verification**: Proving compiler correctness reduces to proving program equivalence, which is undecidable. Therefore, complete compiler verification requires interactive proof.

**Malware Detection**: Perfect malware detection reduces to the halting problem. A virus could be designed to activate only if some TM halts, making detection undecidable.

**Program Optimization**: Determining if an optimization preserves semantics reduces to program equivalence, which is undecidable. Compilers use sound approximations instead.

**Type Inference**: For sufficiently powerful type systems, type inference reduces to undecidable problems. This is why languages like Haskell sometimes require type annotations.

## Key Takeaways

- **Reductions transfer hardness**: If $A$ reduces to $B$ and $A$ is undecidable, then $B$ is undecidable.
- **Direction matters**: Reduce from known hard problem to new problem, not the reverse.
- **Mapping reductions**: Computable function $f$ where $w \in A \iff f(w) \in B$.
- **Turing reductions**: Allow multiple oracle queries, more powerful than mapping reductions.
- **Construction pattern**: Build a machine whose behavior depends on solving the source problem.
- **Composability**: Chain reductions together: $A \leq_m B \leq_m C$ implies $A \leq_m C$.
- **Ubiquity of undecidability**: Through reductions, we discover that most interesting properties of TMs are undecidable.
- **Practical impact**: Reductions explain why certain software engineering tasks (complete verification, perfect optimization, etc.) are impossible.
- **Proof technique**: Reductions provide a systematic way to prove undecidability without repeating diagonalization arguments.
