# Sequential Compactness

Sequential compactness provides an alternative characterization of compactness using sequences, which is often more intuitive and easier to work with in metric spaces.

## Definition

**Definition:** A topological space X is **sequentially compact** if every sequence in X has a convergent subsequence.

## Relationship to Compactness

In general topological spaces, sequential compactness and compactness are independent properties. However, they coincide in important cases.

**Theorem:** For metric spaces, the following are equivalent:
1. X is compact
2. X is sequentially compact
3. X is complete and totally bounded

## Proof of Equivalence in Metric Spaces

### Compact ⟹ Sequentially Compact

Let $(x_n)$ be a sequence in a compact metric space X. Suppose no subsequence converges.

Then for each $x \in X$, there exists $\epsilon_x > 0$ such that $B(x, \epsilon_x)$ contains only finitely many terms of the sequence.

The open cover $\{B(x, \epsilon_x) : x \in X\}$ has a finite subcover. But finitely many balls, each containing finitely many terms, cannot cover infinitely many sequence terms. Contradiction.

### Sequentially Compact ⟹ Compact

We prove this in two steps:

**Step 1:** Sequentially compact metric spaces are totally bounded.

Suppose not. Then there exists $\epsilon > 0$ such that X cannot be covered by finitely many $\epsilon$-balls. Construct a sequence: pick $x_1 \in X$. Since $B(x_1, \epsilon)$ doesn't cover X, pick $x_2 \notin B(x_1, \epsilon)$. Continue inductively.

The resulting sequence satisfies $d(x_n, x_m) \geq \epsilon$ for $n \neq m$, so it has no convergent subsequence. Contradiction.

**Step 2:** Sequentially compact metric spaces are complete.

Let $(x_n)$ be Cauchy. By sequential compactness, some subsequence $x_{n_k} \to x$. Since $(x_n)$ is Cauchy and has a convergent subsequence, the whole sequence converges to x.

**Step 3:** Complete + totally bounded ⟹ compact.

This uses the Lebesgue covering lemma and the fact that totally bounded spaces can be covered by finitely many balls of any given radius.

## The Bolzano-Weierstrass Property

**Definition:** A space has the **Bolzano-Weierstrass property** if every infinite subset has a limit point.

**Theorem:** For T₁ spaces, the Bolzano-Weierstrass property is equivalent to countable compactness (every countable open cover has a finite subcover).

## Limit Point Compactness

**Definition:** A space is **limit point compact** (or has the Bolzano-Weierstrass property) if every infinite subset has a limit point.

**Relationships:**
- Compact ⟹ Limit point compact
- Limit point compact ⟹ Countably compact
- In first-countable T₁ spaces: Limit point compact ⟺ Sequentially compact

## Examples

### Example 1: [0,1] is sequentially compact
Every sequence in [0,1] is bounded. By Bolzano-Weierstrass, it has a convergent subsequence with limit in [0,1] (since [0,1] is closed).

### Example 2: (0,1) is NOT sequentially compact
The sequence $x_n = 1/n$ converges to 0, which is not in (0,1). No subsequence can converge within (0,1).

### Example 3: ℝ is NOT sequentially compact
The sequence $x_n = n$ has no convergent subsequence.

## Countable Compactness

**Definition:** A space is **countably compact** if every countable open cover has a finite subcover.

**Theorem:** The following implications hold:
$$\text{Compact} \Rightarrow \text{Sequentially Compact} \Rightarrow \text{Countably Compact}$$

In metric spaces, all three are equivalent.

## Applications

**Theorem (Weierstrass):** A continuous real-valued function on a sequentially compact space is bounded and attains its bounds.

**Theorem:** A continuous function from a sequentially compact space to a metric space is uniformly continuous.
