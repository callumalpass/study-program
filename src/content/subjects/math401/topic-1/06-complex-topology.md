# Topology of the Complex Plane

The complex plane $\mathbb{C}$ is not merely an algebraic structure—it is also a topological space with a rich geometric structure. Understanding the topology of $\mathbb{C}$ is essential for studying continuity, limits, and the behavior of complex functions. This section develops the fundamental topological concepts that underpin complex analysis.

## The Metric Structure

The complex plane becomes a **metric space** with the distance function:

$$d(z, w) = |z - w|$$

This metric satisfies the three defining properties:

1. **Positivity**: $d(z, w) \geq 0$ with equality iff $z = w$
2. **Symmetry**: $d(z, w) = d(w, z)$
3. **Triangle inequality**: $d(z, u) \leq d(z, w) + d(w, u)$

The metric structure allows us to define notions of nearness, convergence, and continuity.

## Neighborhoods and Open Sets

### Epsilon-Neighborhoods

For $z_0 \in \mathbb{C}$ and $\epsilon > 0$, the **$\epsilon$-neighborhood** (or **open disk**) centered at $z_0$ is:

$$N_\epsilon(z_0) = \{z \in \mathbb{C} : |z - z_0| < \epsilon\}$$

This is the interior of the circle of radius $\epsilon$ centered at $z_0$.

Alternative notations include $D(z_0, \epsilon)$, $B(z_0, \epsilon)$, or $B_\epsilon(z_0)$.

**Examples**:

1. $N_1(0) = \{z : |z| < 1\}$ is the open unit disk
2. $N_{1/2}(i) = \{z : |z - i| < 1/2\}$ is the open disk of radius $1/2$ centered at $i$
3. $N_2(3 + 4i) = \{z : |z - (3 + 4i)| < 2\}$

### Deleted Neighborhoods

A **deleted neighborhood** (or **punctured disk**) excludes the center point:

$$N_\epsilon^*(z_0) = \{z \in \mathbb{C} : 0 < |z - z_0| < \epsilon\} = N_\epsilon(z_0) \setminus \{z_0\}$$

This is crucial for defining limits and singularities.

### Open Sets

A set $U \subseteq \mathbb{C}$ is **open** if for every point $z \in U$, there exists $\epsilon > 0$ such that $N_\epsilon(z) \subseteq U$.

Intuitively, an open set contains a small disk around each of its points—no point is "on the edge."

**Examples of open sets**:

1. **Open disks**: $\{z : |z - z_0| < r\}$ for any $z_0 \in \mathbb{C}$ and $r > 0$
2. **Half-planes**: $\{z : \text{Re}(z) > a\}$ or $\{z : \text{Im}(z) < b\}$
3. **Annuli**: $\{z : r_1 < |z - z_0| < r_2\}$ with $0 \leq r_1 < r_2$
4. **Sectors**: $\{z : \alpha < \arg(z) < \beta\}$ with $\alpha < \beta$
5. **The entire plane**: $\mathbb{C}$ itself
6. **The empty set**: $\emptyset$

**Examples of non-open sets**:

1. **Closed disks**: $\{z : |z - z_0| \leq r\}$ (boundary points have no interior neighborhood)
2. **Circles**: $\{z : |z - z_0| = r\}$ (no interior at all)
3. **The real axis**: $\{z : \text{Im}(z) = 0\}$ (any neighborhood of a real number contains non-real points)
4. **Finite sets**: $\{1, i, -1, -i\}$ (isolated points)

### Properties of Open Sets

1. **Arbitrary unions**: If $\{U_\alpha\}$ is any collection of open sets, then $\bigcup_\alpha U_\alpha$ is open
2. **Finite intersections**: If $U_1, \ldots, U_n$ are open, then $U_1 \cap \cdots \cap U_n$ is open
3. **Warning**: Infinite intersections of open sets need not be open
   - Example: $\bigcap_{n=1}^\infty N_{1/n}(0) = \{0\}$, which is not open

## Closed Sets

A set $F \subseteq \mathbb{C}$ is **closed** if its complement $\mathbb{C} \setminus F$ is open.

**Examples of closed sets**:

1. **Closed disks**: $\{z : |z - z_0| \leq r\}$
2. **Circles**: $\{z : |z - z_0| = r\}$
3. **The real axis**: $\mathbb{R} = \{z : \text{Im}(z) = 0\}$
4. **Closed half-planes**: $\{z : \text{Re}(z) \geq a\}$
5. **Finite sets**: Any finite set $\{z_1, \ldots, z_n\}$
6. **The entire plane**: $\mathbb{C}$ (both open and closed!)
7. **The empty set**: $\emptyset$ (both open and closed!)

### Properties of Closed Sets

By De Morgan's laws:

1. **Arbitrary intersections**: If $\{F_\alpha\}$ is any collection of closed sets, then $\bigcap_\alpha F_\alpha$ is closed
2. **Finite unions**: If $F_1, \ldots, F_n$ are closed, then $F_1 \cup \cdots \cup F_n$ is closed

### Neither Open Nor Closed

Most sets are neither open nor closed!

**Examples**:

1. $\{z : |z| < 1\} \cup \{2\}$ (open disk plus an isolated point)
2. $\{z : 0 < |z| \leq 1\}$ (punctured closed disk)
3. $\{z : |z| < 1 \text{ or } |z| = 2\}$

## Interior, Exterior, and Boundary

For any set $S \subseteq \mathbb{C}$:

### Interior

The **interior** of $S$, denoted $\text{int}(S)$ or $S^\circ$, is the largest open set contained in $S$:

$$\text{int}(S) = \{z \in S : \exists \epsilon > 0 \text{ such that } N_\epsilon(z) \subseteq S\}$$

The interior consists of all points that are "strictly inside" $S$.

**Examples**:

1. $\text{int}(\{z : |z| \leq 1\}) = \{z : |z| < 1\}$
2. $\text{int}(\{z : |z| = 1\}) = \emptyset$
3. $\text{int}(\mathbb{R}) = \emptyset$ (no interior in $\mathbb{C}$!)
4. $\text{int}(\{z : 0 < |z| \leq 1\}) = \{z : 0 < |z| < 1\}$

### Exterior

The **exterior** of $S$, denoted $\text{ext}(S)$, is the interior of the complement:

$$\text{ext}(S) = \text{int}(\mathbb{C} \setminus S) = \{z \notin S : \exists \epsilon > 0 \text{ such that } N_\epsilon(z) \cap S = \emptyset\}$$

**Examples**:

1. $\text{ext}(\{z : |z| \leq 1\}) = \{z : |z| > 1\}$
2. $\text{ext}(\{z : |z| = 1\}) = \{z : |z| \neq 1\}$

### Boundary

The **boundary** of $S$, denoted $\partial S$ or $\text{bd}(S)$, consists of points that are neither in the interior nor exterior:

$$\partial S = \mathbb{C} \setminus (\text{int}(S) \cup \text{ext}(S))$$

Equivalently, $z \in \partial S$ if every neighborhood of $z$ contains both points in $S$ and points not in $S$:

$$\partial S = \{z \in \mathbb{C} : \forall \epsilon > 0, \, N_\epsilon(z) \cap S \neq \emptyset \text{ and } N_\epsilon(z) \cap (\mathbb{C} \setminus S) \neq \emptyset\}$$

The boundary is always a closed set.

**Examples**:

1. $\partial\{z : |z| < 1\} = \{z : |z| = 1\}$ (the unit circle)
2. $\partial\{z : |z| \leq 1\} = \{z : |z| = 1\}$ (same as above)
3. $\partial\{z : |z| = 1\} = \{z : |z| = 1\}$ (the circle is its own boundary)
4. $\partial\mathbb{R} = \mathbb{R}$ (in $\mathbb{C}$)
5. $\partial\{z : 1 < |z| < 2\} = \{z : |z| = 1\} \cup \{z : |z| = 2\}$ (two circles)
6. $\partial\mathbb{C} = \emptyset$

### Key Relationships

For any set $S$:

1. $\mathbb{C} = \text{int}(S) \cup \partial S \cup \text{ext}(S)$ (disjoint union)
2. $S$ is open $\iff$ $S = \text{int}(S)$ $\iff$ $\partial S \cap S = \emptyset$
3. $S$ is closed $\iff$ $\partial S \subseteq S$
4. $\partial S = \overline{S} \cap \overline{\mathbb{C} \setminus S}$ where $\overline{S}$ denotes closure

## Closure and Limit Points

### Closure

The **closure** of $S$, denoted $\overline{S}$ or $\text{cl}(S)$, is the smallest closed set containing $S$:

$$\overline{S} = S \cup \partial S = \text{int}(S) \cup \partial S$$

Equivalently, $\overline{S}$ is the intersection of all closed sets containing $S$.

**Examples**:

1. $\overline{\{z : |z| < 1\}} = \{z : |z| \leq 1\}$
2. $\overline{\mathbb{Q} + i\mathbb{Q}} = \mathbb{C}$ (complex rationals are dense)
3. $\overline{\{z : 0 < |z| < 1\}} = \{z : |z| \leq 1\}$
4. $\overline{\{1/n : n \in \mathbb{N}\}} = \{0\} \cup \{1/n : n \in \mathbb{N}\}$

### Limit Points

A point $z_0$ is a **limit point** (or **accumulation point**) of $S$ if every deleted neighborhood of $z_0$ contains at least one point of $S$:

$$z_0 \text{ is a limit point of } S \iff \forall \epsilon > 0, \, N_\epsilon^*(z_0) \cap S \neq \emptyset$$

Equivalently, every neighborhood of $z_0$ contains infinitely many points of $S$.

**Examples**:

1. Every point on the unit circle is a limit point of $\{z : |z| < 1\}$
2. $0$ is a limit point of $\{1/n : n \in \mathbb{N}\}$
3. Every point in $\mathbb{C}$ is a limit point of $\mathbb{Q} + i\mathbb{Q}$ (density)
4. The set $\{1, 1/2, 1/3, 1/4, \ldots\}$ has $0$ as its only limit point

### Isolated Points

A point $z_0 \in S$ is an **isolated point** of $S$ if it is not a limit point of $S$, i.e., there exists $\epsilon > 0$ such that:

$$N_\epsilon(z_0) \cap S = \{z_0\}$$

**Examples**:

1. Every point of $\mathbb{Z} + i\mathbb{Z}$ (Gaussian integers) is isolated
2. In $\{0\} \cup \{1/n : n \in \mathbb{N}\}$, every point except $0$ is isolated
3. Finite sets consist entirely of isolated points

### Characterization of Closure

The closure can be characterized in terms of limit points:

$$\overline{S} = S \cup \{\text{all limit points of } S\}$$

This shows that $S$ is closed if and only if it contains all its limit points.

## Dense Sets and Separability

A set $D \subseteq \mathbb{C}$ is **dense** in $\mathbb{C}$ if $\overline{D} = \mathbb{C}$, i.e., every point in $\mathbb{C}$ is either in $D$ or is a limit point of $D$.

Equivalently, $D$ is dense if every non-empty open set intersects $D$.

**Examples of dense sets**:

1. $\mathbb{Q} + i\mathbb{Q}$ (complex numbers with rational real and imaginary parts)
2. $\{re^{i\theta} : r \in \mathbb{Q}^+, \theta \in \mathbb{Q}\}$
3. $\{a + bi : a, b \in \mathbb{R}, a^2 + b^2 \in \mathbb{Q}\}$

The complex plane is **separable**: it has a countable dense subset (e.g., $\mathbb{Q} + i\mathbb{Q}$). This has important consequences for analysis and measure theory.

## Compact Sets

A set $K \subseteq \mathbb{C}$ is **compact** if every open cover of $K$ has a finite subcover.

### Heine-Borel Theorem

In $\mathbb{C}$ (or any finite-dimensional Euclidean space), a set is compact if and only if it is **closed and bounded**.

A set $S$ is **bounded** if there exists $M > 0$ such that $|z| \leq M$ for all $z \in S$.

**Examples of compact sets**:

1. Closed disks: $\{z : |z - z_0| \leq r\}$
2. Circles: $\{z : |z| = r\}$
3. Closed annuli: $\{z : r_1 \leq |z| \leq r_2\}$
4. Finite sets
5. Closed and bounded regions

**Examples of non-compact sets**:

1. Open disks (not closed)
2. $\mathbb{C}$ (not bounded)
3. $\{z : \text{Re}(z) \geq 0\}$ (closed but not bounded)
4. $\{z : 0 < |z| < 1\}$ (bounded but not closed)

### Properties of Compact Sets

1. Continuous images of compact sets are compact
2. Closed subsets of compact sets are compact
3. Compact sets in $\mathbb{C}$ are sequentially compact: every sequence has a convergent subsequence
4. Compact sets in $\mathbb{C}$ are complete: every Cauchy sequence converges

### Extreme Value Theorem

If $K$ is compact and $f : K \to \mathbb{R}$ is continuous, then $f$ attains its maximum and minimum on $K$.

This is crucial in complex analysis: $|f|$ attains its maximum on any compact set if $f$ is continuous.

## Connected Sets

A set $S \subseteq \mathbb{C}$ is **connected** if it cannot be written as the union of two disjoint non-empty open sets (relative to $S$).

Intuitively, a connected set is "in one piece."

**Examples of connected sets**:

1. Open disks $\{z : |z - z_0| < r\}$
2. Closed disks $\{z : |z - z_0| \leq r\}$
3. The complex plane $\mathbb{C}$
4. Any convex set
5. Annuli $\{z : r_1 < |z| < r_2\}$

**Examples of disconnected sets**:

1. $\{z : |z| < 1\} \cup \{z : |z - 3| < 1\}$ (two separate disks)
2. $\{z : |z| = 1 \text{ or } |z| = 2\}$ (two circles)
3. $\mathbb{C} \setminus \mathbb{R}$ (upper and lower half-planes)

### Path-Connected Sets

A set $S$ is **path-connected** (or **arcwise connected**) if any two points in $S$ can be joined by a continuous path lying entirely in $S$.

In "nice" spaces like $\mathbb{C}$, path-connected is equivalent to connected for open sets.

### Simply Connected Sets

A set $D$ is **simply connected** if it is connected and every closed curve in $D$ can be continuously shrunk to a point without leaving $D$.

Intuitively, a simply connected set has no "holes."

**Examples**:

- **Simply connected**: disks, half-planes, $\mathbb{C}$, convex sets
- **Not simply connected**: annuli, punctured disks, $\mathbb{C} \setminus \{0\}$

Simple connectivity is crucial in complex analysis: many theorems (like Cauchy's theorem) require simply connected domains.

## Regions and Domains

### Domain

A **domain** is an open connected set.

**Examples**:

1. Open disks
2. Half-planes
3. $\mathbb{C}$
4. Annuli
5. $\mathbb{C} \setminus \{0\}$ (punctured plane)

### Region

A **region** is a domain together with some, all, or none of its boundary points.

Less standardly, some authors use "region" to mean "domain."

## Bounded Sets

A set $S$ is **bounded** if it is contained in some disk centered at the origin:

$$\exists M > 0 \text{ such that } |z| \leq M \text{ for all } z \in S$$

Equivalently, $\sup_{z \in S} |z| < \infty$.

## Summary

- The complex plane is a metric space with $d(z, w) = |z - w|$
- **Open sets** contain a neighborhood of each point; **closed sets** have open complements
- **Interior**: largest open set in $S$; **boundary**: points on the "edge"; **exterior**: interior of complement
- **Closure**: $\overline{S} = S \cup \partial S$, the smallest closed set containing $S$
- **Limit points**: points that can be approximated by points in $S$
- **Compact sets**: closed and bounded (Heine-Borel theorem)
- **Connected sets**: "in one piece"; **simply connected**: no holes
- **Domains**: open and connected; essential for complex analysis
- Understanding topology is crucial for studying limits, continuity, and integration in $\mathbb{C}$
