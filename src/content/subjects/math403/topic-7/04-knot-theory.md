# Knot Theory Basics

Knot theory studies embeddings of circles in 3-dimensional space, using topology to distinguish and classify knots.

## What is a Knot?

**Definition:** A **knot** is a smooth embedding of the circle $S^1$ into $\mathbb{R}^3$ (or $S^3$).

**Definition:** A **link** is an embedding of a disjoint union of circles.

Two knots are **equivalent** (or **ambient isotopic**) if one can be deformed into the other through space without cutting or self-intersection.

## Knot Diagrams

**Definition:** A **knot diagram** is a projection of a knot onto a plane with crossing information (over/under) at each double point.

**Theorem (Reidemeister):** Two knots are equivalent if and only if their diagrams are related by a sequence of Reidemeister moves:
- **R1:** Add/remove a twist (curl)
- **R2:** Add/remove two crossings involving two strands
- **R3:** Slide a strand over/under a crossing

## Basic Examples

### The Unknot
The **unknot** (trivial knot) is equivalent to a simple circle with no crossings.

### The Trefoil Knot
The **trefoil** has 3 crossings and is the simplest non-trivial knot. There are two versions: left-handed and right-handed (mirror images, not equivalent).

### The Figure-Eight Knot
The **figure-eight** has 4 crossings and is **amphichiral** (equivalent to its mirror image).

### The Hopf Link
The **Hopf link** consists of two linked circles.

## Knot Invariants

**Definition:** A **knot invariant** is a quantity assigned to knots that takes the same value on equivalent knots.

**Key Property:** If an invariant takes different values on two knots, they are not equivalent.

### Crossing Number
The minimum number of crossings in any diagram.
- Unknot: 0
- Trefoil: 3
- Figure-eight: 4

### Unknotting Number
The minimum number of crossing changes needed to unknot.

### Bridge Number
The minimum number of local maxima in any projection.

## The Fundamental Group

**Definition:** The **knot group** is $\pi_1(\mathbb{R}^3 \setminus K)$, the fundamental group of the complement.

**Theorem:** Equivalent knots have isomorphic knot groups.

The knot group is a powerful invariant but does not completely classify knots.

## Polynomial Invariants

### The Alexander Polynomial
Discovered in 1923, $\Delta_K(t)$ is a Laurent polynomial invariant.
- $\Delta_{\text{unknot}}(t) = 1$
- $\Delta_{\text{trefoil}}(t) = t - 1 + t^{-1}$

### The Jones Polynomial
Discovered in 1984, $V_K(t)$ is a Laurent polynomial that distinguishes more knots than Alexander.
- Can detect chirality (handedness)
- Related to statistical mechanics and quantum groups

### The HOMFLY-PT Polynomial
A two-variable polynomial $P_K(a, z)$ that specializes to both Alexander and Jones.

## Applications

### Biology
- DNA topology: supercoiling, recombination
- Enzyme action changes knot type

### Chemistry
- Molecular knots synthesized in lab
- Topological stereoisomers

### Physics
- Vortex lines in fluid dynamics
- Quantum field theory and Wilson loops
- Topological quantum computing
