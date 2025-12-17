# Local Compactness

Local compactness weakens the notion of compactness while preserving many useful properties, and is essential for the study of locally compact groups and functional analysis.

## Definition

**Definition:** A topological space X is **locally compact** if every point has a compact neighborhood.

Equivalently, X is locally compact if every point has a neighborhood base consisting of compact sets.

**Definition (Hausdorff version):** A Hausdorff space X is locally compact if every point has a compact neighborhood, or equivalently, if for every point x and open neighborhood U of x, there exists an open V with $x \in V \subseteq \overline{V} \subseteq U$ and $\overline{V}$ compact.

## Examples

### Example 1: Euclidean Space
$\mathbb{R}^n$ is locally compact. Every point x has the compact neighborhood $\overline{B(x, 1)}$.

### Example 2: Discrete Spaces
Every discrete space is locally compact. Each singleton $\{x\}$ is a compact neighborhood of x.

### Example 3: Compact Spaces
Every compact space is locally compact. The whole space is a compact neighborhood of every point.

### Example 4: Open Subsets of Locally Compact Spaces
An open subset of a locally compact Hausdorff space is locally compact.

## Non-Examples

### Example 5: The Rationals
$\mathbb{Q}$ with the subspace topology is NOT locally compact. No rational has a compact neighborhood in $\mathbb{Q}$.

### Example 6: Infinite-Dimensional Banach Spaces
The unit ball in an infinite-dimensional Banach space is not compact, and these spaces are not locally compact.

## Properties

**Theorem:** A locally compact Hausdorff space is completely regular (Tychonoff).

**Theorem:** A locally compact Hausdorff space is a Baire space.

**Theorem (Product):** A product of locally compact spaces is locally compact if and only if all but finitely many factors are compact.

## Compactification and Local Compactness

Local compactness is exactly the condition needed for nice compactification.

**Theorem:** A Hausdorff space has a Hausdorff one-point compactification if and only if it is locally compact.

**Theorem:** The one-point compactification of a locally compact Hausdorff space is Hausdorff if and only if the original space is locally compact.

## Proper Maps

**Definition:** A continuous map $f: X \to Y$ is **proper** if the preimage of every compact set is compact.

**Theorem:** A continuous map from a locally compact space to a Hausdorff space is proper if and only if it is closed and has compact fibers.

## Locally Compact Groups

**Definition:** A **locally compact group** is a topological group that is locally compact as a topological space.

**Examples:**
- $\mathbb{R}^n$ with addition
- The circle group $S^1$ with complex multiplication
- $GL_n(\mathbb{R})$ with matrix multiplication
- p-adic numbers $\mathbb{Q}_p$

Locally compact groups are the natural setting for Haar measure and harmonic analysis.

## Alexandroff Extension

For a locally compact but non-compact space X, the **Alexandroff extension** (one-point compactification) adds a single point $\infty$ with neighborhoods being complements of compact sets.

**Theorem:** If X is locally compact Hausdorff, then its one-point compactification is compact Hausdorff.
