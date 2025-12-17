# Open Covers and Subcovers

Understanding open covers and their finite subcovers is fundamental to working with compact spaces.

## Detailed Study of Open Covers

**Definition:** Let X be a topological space and $A \subseteq X$. An **open cover** of A is a collection $\mathcal{U} = \{U_\alpha : \alpha \in I\}$ of open subsets of X such that $A \subseteq \bigcup_{\alpha \in I} U_\alpha$.

### Properties of Open Covers

1. **Refinement:** A cover $\mathcal{V}$ **refines** $\mathcal{U}$ if every $V \in \mathcal{V}$ is contained in some $U \in \mathcal{U}$.

2. **Star Refinement:** $\mathcal{V}$ is a **star refinement** of $\mathcal{U}$ if for each $x \in X$, the star $St(x, \mathcal{V}) = \bigcup\{V \in \mathcal{V} : x \in V\}$ is contained in some $U \in \mathcal{U}$.

3. **Barycentric Refinement:** $\mathcal{V}$ is a **barycentric refinement** of $\mathcal{U}$ if $\{St(V, \mathcal{V}) : V \in \mathcal{V}\}$ refines $\mathcal{U}$.

## Lebesgue Numbers

**Definition:** Let $(X, d)$ be a metric space. A **Lebesgue number** for an open cover $\mathcal{U}$ of X is a positive number $\delta$ such that every subset of X with diameter less than $\delta$ is contained in some member of $\mathcal{U}$.

**Theorem (Lebesgue Covering Lemma):** Every open cover of a compact metric space has a Lebesgue number.

*Proof:* Suppose $\mathcal{U} = \{U_1, \ldots, U_n\}$ is a finite open cover (compactness guarantees this). For each $x \in X$, define:
$$f(x) = \frac{1}{n}\sum_{i=1}^n d(x, X \setminus U_i)$$

Since X is covered by $\{U_i\}$, we have $f(x) > 0$ for all x. By compactness, f attains a minimum $\delta > 0$. This $\delta$ works as a Lebesgue number.

## Constructing Subcovers

### The Standard Proof Technique

Given an open cover $\mathcal{U}$ of a compact space X, to find a finite subcover:

1. Assume no finite subcover exists
2. Construct a sequence or net that leads to contradiction
3. Often using properties like the finite intersection property

### Example: Compactness of [a,b]

**Theorem:** The closed interval [a,b] is compact.

*Proof (using least upper bound):*
Let $\mathcal{U}$ be an open cover of [a,b]. Define:
$$S = \{x \in [a,b] : [a,x] \text{ is covered by finitely many } U_\alpha\}$$

- $a \in S$ since a is in some $U_\alpha$
- S is bounded above by b
- Let $s = \sup S$
- Some $U_\beta$ contains s
- Since $U_\beta$ is open, $[s-\epsilon, s] \subset U_\beta$ for some $\epsilon > 0$
- Some point in $S$ is within $\epsilon$ of s, giving $[a,s] \subset$ finitely many $U_\alpha$
- If $s < b$, then $(s-\epsilon, s+\epsilon) \subset U_\beta$ extends S beyond s, contradiction
- Therefore $s = b$ and [a,b] has a finite subcover

## Countable Covers

**Definition:** A space is **Lindelöf** if every open cover has a countable subcover.

**Theorem:** Every second-countable space is Lindelöf.

*Proof:* Let $\mathcal{B}$ be a countable base. For each $U_\alpha$ in an open cover and each $x \in U_\alpha$, choose $B_x \in \mathcal{B}$ with $x \in B_x \subseteq U_\alpha$. The countable collection $\{B_x\}$ covers X. For each $B_x$, choose one $U_\alpha$ containing it.

## Point-Finite and Locally Finite Covers

**Definition:** An open cover $\mathcal{U}$ is:
- **Point-finite** if each point of X belongs to only finitely many members
- **Locally finite** if each point has a neighborhood meeting only finitely many members

**Theorem:** Every compact space is metacompact (every open cover has a point-finite open refinement).
