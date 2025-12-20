# Pólya Enumeration Theorem

The Pólya Enumeration Theorem counts distinct colorings or arrangements under symmetry. It elegantly handles problems where objects are "the same" if one can be transformed into another by a symmetry operation.

## Motivation

### The Necklace Problem

**Problem:** How many distinct necklaces can be made with 4 beads using 2 colors?

Without symmetry: 2⁴ = 16 colorings

But rotations make some equivalent:
- RRRR, BBBB: 2 single-color (each unique under rotation)
- RRRB, RRBR, RBRR, BRRR: all equivalent (count as 1)
- RRBB, RBBR, BBRR, BRRB: all equivalent (count as 1)
- RBRB, BRBR: equivalent (count as 1)
- RBBB, BRBB, BBRB, BBBR: all equivalent (count as 1)

Total: 6 distinct necklaces

## Group Actions

### Definition

A **group action** of group G on set X is a function G × X → X, written (g, x) ↦ g·x, satisfying:
- e·x = x (identity acts trivially)
- (gh)·x = g·(h·x) (composition)

### Orbit and Stabilizer

**Orbit** of x: Orb(x) = {g·x : g ∈ G}

**Stabilizer** of x: Stab(x) = {g ∈ G : g·x = x}

**Orbit-Stabilizer Theorem:**
$$|G| = |\text{Orb}(x)| \cdot |\text{Stab}(x)|$$

## Burnside's Lemma

### Statement

The number of distinct objects (orbits) under group action:

$$|\text{orbits}| = \frac{1}{|G|} \sum_{g \in G} |X^g|$$

where Xᵍ = {x ∈ X : g·x = x} (fixed points of g).

### Proof Sketch

Count pairs (g, x) where g·x = x in two ways:
- Σₓ |Stab(x)|
- Σₐ |Xᵍ|

Both equal the same sum. Using orbit-stabilizer theorem and summing over orbits gives the result.

### Necklace Example Revisited

Group: Cyclic group C₄ = {e, r, r², r³} (rotations)

Fixed points:
- e: all 16 colorings
- r (90° rotation): patterns where position i has same color as i+1 mod 4; only RRRR, BBBB work → 2
- r² (180° rotation): positions 0,2 same and 1,3 same → 4 patterns
- r³ (270° rotation): same as r → 2

Number of orbits = (16 + 2 + 4 + 2)/4 = 24/4 = **6** ✓

## Pólya Enumeration Theorem

### Cycle Index

For group G acting on set of positions, the **cycle index** is:

$$Z_G(x_1, x_2, \ldots, x_n) = \frac{1}{|G|} \sum_{g \in G} x_1^{c_1(g)} x_2^{c_2(g)} \cdots x_n^{c_n(g)}$$

where cₖ(g) = number of k-cycles in permutation g.

### Theorem Statement

If coloring with colors of "weights" a₁, a₂, ..., aₘ, the generating function for distinct colorings is:

$$Z_G(a_1 + a_2 + \cdots, a_1^2 + a_2^2 + \cdots, a_1^3 + a_2^3 + \cdots, \ldots)$$

### Simple Counting

For k colors with equal weight:
$$\text{distinct colorings} = Z_G(k, k, k, \ldots)$$

## Example: Square Colorings

### Setup

Color corners of a square with k colors.

**Symmetry group:** Dihedral D₄ with 8 elements:
- e: identity
- r, r², r³: rotations by 90°, 180°, 270°
- s₁, s₂: reflections through midpoints of opposite sides
- s₃, s₄: reflections through diagonals

### Cycle Structure

View as permutation of 4 corners:
- e: (1)(2)(3)(4) → 4 1-cycles
- r: (1234) → 1 4-cycle
- r²: (13)(24) → 2 2-cycles
- r³: (1432) → 1 4-cycle
- s₁: (12)(34) → 2 2-cycles
- s₂: (14)(23) → 2 2-cycles
- s₃: (1)(3)(24) → 2 1-cycles, 1 2-cycle
- s₄: (2)(4)(13) → 2 1-cycles, 1 2-cycle

### Cycle Index

$$Z_{D_4} = \frac{1}{8}(x_1^4 + 2x_4 + 3x_2^2 + 2x_1^2 x_2)$$

### Counting with k Colors

Substitute xᵢ = k:
$$\frac{1}{8}(k^4 + 2k + 3k^2 + 2k^2 \cdot k) = \frac{k^4 + 2k^3 + 3k^2 + 2k}{8}$$

For k=2: (16 + 16 + 12 + 4)/8 = 48/8 = **6** distinct colorings

## Cycle Index of Common Groups

### Cyclic Group Cₙ

$$Z_{C_n} = \frac{1}{n} \sum_{d|n} \phi(n/d) x_d^{n/d}$$

### Dihedral Group Dₙ

For n odd:
$$Z_{D_n} = \frac{1}{2} Z_{C_n} + \frac{1}{2} x_1 x_2^{(n-1)/2}$$

For n even:
$$Z_{D_n} = \frac{1}{2} Z_{C_n} + \frac{1}{4} x_1^2 x_2^{(n-2)/2} + \frac{1}{4} x_2^{n/2}$$

### Symmetric Group Sₙ

$$Z_{S_n} = \sum \frac{x_1^{j_1} x_2^{j_2} \cdots x_n^{j_n}}{1^{j_1} j_1! \cdot 2^{j_2} j_2! \cdots n^{j_n} j_n!}$$

summed over partitions 1^{j_1} 2^{j_2} ... n^{j_n} of n.

## Weighted Counting

### Generating Functions for Colors

Assign weight wᵢ to color i. The pattern inventory:

$$Z_G(w_1 + w_2 + \cdots, w_1^2 + w_2^2 + \cdots, \ldots)$$

is a generating function where coefficient of monomial = count of colorings with those color multiplicities.

### Example: Necklace Inventory

For 4-bead necklaces with colors r and b:

$$Z_{C_4}(r+b, r^2+b^2, r^3+b^3, r^4+b^4)$$
$$= \frac{1}{4}[(r+b)^4 + (r^4+b^4) + (r^2+b^2)^2 + (r^4+b^4)]$$
$$= r^4 + r^3b + 2r^2b^2 + rb^3 + b^4$$

This shows: 1 all-red, 1 three-red, 2 two-of-each, etc.

## Applications

### Chemical Isomers

Count distinct molecular structures under rotational symmetry.

### Graph Coloring

Count non-isomorphic colored graphs.

### Combinatorial Designs

Enumerate designs up to automorphisms.

## Practice Problems

1. **Count:** Distinct ways to color faces of a cube with 2 colors.

2. **Find:** Cycle index of the symmetry group of a regular tetrahedron.

3. **Compute:** Number of distinct necklaces with 6 beads and 3 colors.

4. **Prove:** Burnside's lemma from first principles.

## Summary

Pólya enumeration:
- Counts distinct objects under symmetry
- Uses cycle index of symmetry group
- Burnside's lemma: average fixed points over group
- Handles weighted counting via generating functions
- Applies to necklaces, colorings, chemical structures
