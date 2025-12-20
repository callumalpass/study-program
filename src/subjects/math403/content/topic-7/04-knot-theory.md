---
id: math403-topic-7-4
title: "Knot Theory Basics"
order: 4
---

# Knot Theory Basics

Knot theory studies embeddings of circles in 3-dimensional space, using topology to distinguish and classify knots. What began as an attempt by 19th-century physicists to model atoms as knotted vortex tubes has evolved into a rich mathematical theory with applications in biology, chemistry, physics, and cryptography. The fundamental question of knot theory is deceptively simple: when are two knots equivalent? Despite this elementary formulation, the question leads to deep mathematics connecting topology, algebra, and combinatorics. Knot theory exemplifies how studying simple objects with topological methods reveals intricate structure and powerful invariants.

## What is a Knot?

**Definition:** A **knot** is a smooth (or piecewise-linear) embedding of the circle $S^1$ into $\mathbb{R}^3$ (or equivalently, into the 3-sphere $S^3$).

Intuitively, a knot is a closed loop of string embedded in 3-dimensional space. The circle $S^1$ is the domain, while $\mathbb{R}^3$ is the ambient space where the knot lives. We typically think of knots as sitting in ordinary 3-dimensional space, but working in $S^3$ (one-point compactification of $\mathbb{R}^3$) often simplifies theory.

**Definition:** A **link** is an embedding of a disjoint union of circles $S^1 \sqcup \cdots \sqcup S^1$ into $\mathbb{R}^3$. A link with n components is called an **n-component link**. A knot is a 1-component link.

**Equivalence:** Two knots K and K' are **equivalent** (or **ambient isotopic**) if there exists a continuous family of homeomorphisms $h_t: \mathbb{R}^3 \to \mathbb{R}^3$ for $t \in [0,1]$ with $h_0 = \text{id}$ and $h_1(K) = K'$. Intuitively, one knot can be continuously deformed into the other without cutting or allowing self-intersection.

The fundamental problem of knot theory is determining when two knots are equivalent. This seemingly simple question remains unsolved in general, though powerful invariants help distinguish knots.

## Knot Diagrams

Since knots live in 3-dimensional space, we visualize them using 2-dimensional projections.

**Definition:** A **knot diagram** is a projection of a knot onto a plane, where:
1. The projection is generic (finitely many double points, no triple points)
2. At each crossing, we record which strand passes over and which under

Knot diagrams are our primary tool for representing and studying knots. Every knot has infinitely many diagrams, but all diagrams of the same knot are related by Reidemeister moves.

**Theorem (Reidemeister, 1927):** Two knots are equivalent if and only if their diagrams are related by a finite sequence of Reidemeister moves and planar isotopy.

The three **Reidemeister moves** are:
- **R1 (Twist):** Add or remove a twist (curl) involving a single strand
- **R2 (Poke):** Add or remove two crossings where two strands cross each other twice
- **R3 (Slide):** Slide a strand over or under a crossing

These moves are local operations on diagrams. Reidemeister's theorem is fundamental: to prove a quantity is a knot invariant, we need only show it's unchanged by the three Reidemeister moves.

## Basic Examples

### The Unknot

The **unknot** (or **trivial knot**) is any knot equivalent to a round circle with no crossings. Every simple closed curve in space bounds an embedded disk (Alexander's theorem), but recognizing when a complex diagram represents the unknot is algorithmically difficult.

**Unknotting problem:** Given a knot diagram, determine if it represents the unknot. This problem is in NP (a certificate is a sequence of Reidemeister moves), and recently shown to be in coNP, but whether it's polynomial-time solvable remains open.

### The Trefoil Knot

The **trefoil** (or **3_1** in standard notation) is the simplest non-trivial knot, with minimal crossing number 3. It comes in two mirror-image forms: right-handed and left-handed.

**Chirality:** The right and left trefoils are not equivalent—they are **chiral** (distinguishable from their mirror images). This was first proved using the Alexander polynomial in 1928. The trefoil appears in Celtic art, religious symbolism, and molecular chemistry.

### The Figure-Eight Knot

The **figure-eight knot** (or **4_1**) has crossing number 4. Unlike the trefoil, it is **amphichiral** (equivalent to its mirror image). The figure-eight is the smallest amphichiral knot and has special properties:
- Its complement is hyperbolic
- It's the only knot whose complement admits a complete hyperbolic metric of finite volume with one cusp

### The Hopf Link

The **Hopf link** consists of two circles linked together like chain links. It's the simplest non-trivial link, with linking number ±1. The Hopf link appears in:
- Fiber bundles ($S^3 \to S^2$ Hopf fibration)
- Quantum entanglement
- Molecular chemistry (catenanes)

### Other Classic Knots

- **Cinquefoil (5_1):** Five-crossing torus knot, chiral
- **Granny knot (3_1 # 3_1):** Connected sum of two right-handed trefoils
- **Square knot (3_1 # 3̄_1):** Connected sum of right and left trefoils

## Knot Invariants

**Definition:** A **knot invariant** is a function from knots to some mathematical object (numbers, groups, polynomials) that assigns the same value to equivalent knots.

**Strategy:** If an invariant takes different values on two knots, they're not equivalent. Invariants cannot prove equivalence (unless complete), but they can prove non-equivalence.

### Crossing Number

The **crossing number** c(K) is the minimum number of crossings in any diagram of K.

**Examples:**
- Unknot: c = 0
- Trefoil: c = 3
- Figure-eight: c = 4
- Generally: c(n-crossing knot) ≤ n

**Limitations:** Many different knots share the same crossing number. Computing crossing number is algorithmically difficult.

### Unknotting Number

The **unknotting number** u(K) is the minimum number of crossing changes needed to transform K into the unknot.

**Examples:**
- Unknot: u = 0
- Trefoil: u = 1
- Figure-eight: u = 1

**Open problem:** Computing unknotting number is very difficult. No polynomial-time algorithm is known.

### Bridge Number

The **bridge number** b(K) is the minimum number of local maxima when the knot is positioned with respect to a height function.

**Property:** b(K) = 1 if and only if K is the unknot. The bridge number relates to tunnel number and Heegaard splittings in 3-manifold theory.

## The Fundamental Group (Knot Group)

**Definition:** The **knot group** (or **knot complement group**) is:
$$\pi_1(\mathbb{R}^3 \setminus K)$$
the fundamental group of the knot complement.

**Theorem:** Equivalent knots have isomorphic knot groups. The converse is false: non-equivalent knots can have isomorphic knot groups.

**Computing knot groups:** Use Wirtinger presentation from a knot diagram. Each arc gives a generator, each crossing gives a relation.

**Examples:**
- Unknot: $\pi_1(\mathbb{R}^3 \setminus \text{unknot}) \cong \mathbb{Z}$
- Trefoil: $\pi_1 \cong \langle a, b \mid aba = bab \rangle$ (braid group relation)

**Power:** The knot group is a complete invariant for prime knots when combined with peripheral structure (Gordon-Luecke theorem: knots are determined by their complements).

## Polynomial Invariants

Polynomial invariants revolutionized knot theory, providing computable invariants distinguishing many knots.

### The Alexander Polynomial

Discovered by J.W. Alexander in 1923, the Alexander polynomial $\Delta_K(t)$ is a Laurent polynomial in t.

**Properties:**
- $\Delta_{\text{unknot}}(t) = 1$
- $\Delta_K(t) = \Delta_K(t^{-1})$ (symmetry)
- $\Delta_K(1) = 1$
- $\Delta_{K \# K'}(t) = \Delta_K(t) \cdot \Delta_{K'}(t)$ (multiplicative under connected sum)

**Examples:**
- Trefoil: $\Delta(t) = t - 1 + t^{-1}$
- Figure-eight: $\Delta(t) = -t + 3 - t^{-1}$
- Hopf link: $\Delta(t) = 0$ (for links with multiple components)

**Limitations:**
- Cannot detect chirality (mirror images have the same Alexander polynomial)
- Some non-trivial knots have $\Delta(t) = 1$ (unknot-like from Alexander's perspective)

**Computation:** Via Fox calculus, Seifert surfaces, or homology of cyclic branched covers.

### The Jones Polynomial

Discovered by Vaughan Jones in 1984, the Jones polynomial $V_K(t)$ revolutionized knot theory and earned Jones the Fields Medal.

**Properties:**
- $V_{\text{unknot}}(t) = 1$
- Satisfies the skein relation: $t^{-1} V_{L_+}(t) - t V_{L_-}(t) = (t^{1/2} - t^{-1/2}) V_{L_0}(t)$
- Can detect chirality
- Related to statistical mechanics (Potts model, Yang-Baxter equation)

**Examples:**
- Trefoil (right): $V(t) = t + t^3 - t^4$
- Figure-eight: $V(t) = t^{-2} - t^{-1} + 1 - t + t^2$

**Significance:**
- Distinguishes knots that Alexander cannot
- Detects chirality (right and left trefoils have different Jones polynomials)
- Connections to quantum groups, topological quantum field theory, and statistical mechanics

**Open question:** Does $V_K(t) = 1$ imply K is the unknot? Unknown!

### The HOMFLY-PT Polynomial

The HOMFLY-PT polynomial $P_K(a, z)$ is a two-variable polynomial generalizing both Alexander and Jones.

**Specializations:**
- Alexander polynomial via $P_K(1, z)$
- Jones polynomial via $P_K(q, q^{1/2} - q^{-1/2})$

**Power:** The extra variable provides finer distinction. Named after six independent discoverers: Hoste, Ocneanu, Millett, Freyd, Lickorish, Yetter, and Przytycki-Traczyk.

### Khovanov Homology

A categorification of the Jones polynomial, Khovanov homology assigns graded homology groups to knots, with the Jones polynomial as the graded Euler characteristic. This provides strictly stronger information than Jones and has connections to gauge theory and spectral sequences.

## Applications

### Biology—DNA Topology

DNA topology is a major application of knot theory:

**DNA Supercoiling:** Circular DNA (plasmids, bacterial chromosomes) can be knotted or linked. The topology affects:
- Gene expression and regulation
- DNA replication
- DNA packaging in viral capsids

**Topoisomerase Enzymes:** These enzymes change DNA topology by cutting strands, passing them through each other, and rejoining. Different topoisomerases perform different operations:
- Type I: Changes linking number by ±1
- Type II: Changes linking number by ±2

**Knot theory models:**
- Enzyme action as tangle surgery
- Site-specific recombination creates predictable topology changes
- Knot and link invariants measure biological complexity

### Chemistry—Molecular Knots

Chemists have synthesized molecular knots and links:

**Molecular trefoils:** First synthesized in 1980s, using template-directed synthesis
**Catenanes:** Interlocked molecular rings (like the Hopf link)
**Applications:**
- Molecular machines and switches
- Topological stereoisomers with different properties
- Drug design using topological constraints

### Physics

**Fluid Dynamics:** Vortex lines in fluids can be knotted and linked. Knot topology is preserved under ideal fluid flow (Kelvin's vortex atom theory).

**Quantum Field Theory:** Wilson loops in gauge theory are knot invariants. Chern-Simons theory provides a topological quantum field theory computing knot polynomials.

**Topological Quantum Computing:** Anyons in 2+1 dimensions have worldlines forming braids and links. Topological protection against decoherence uses knot theory.

### Cryptography

Knot-theoretic cryptographic protocols use computational hardness of knot problems for security. The difficulty of distinguishing knots and computing invariants provides potential one-way functions.

## Key Takeaways

- Knots are embeddings of circles in 3-space, classified up to ambient isotopy
- Knot diagrams with Reidemeister moves provide combinatorial descriptions
- Knot invariants distinguish non-equivalent knots
- The crossing number, unknotting number, and bridge number are geometric invariants
- The knot group is an algebraic invariant from the complement
- Polynomial invariants (Alexander, Jones, HOMFLY-PT) provide computable distinguishing tools
- Chirality (handedness) is detected by some invariants but not others
- Applications span DNA biology, molecular chemistry, and quantum physics
- Many fundamental questions remain open despite 150+ years of study
- The interplay of topology, algebra, and combinatorics makes knot theory rich and deep
