# Metrization Theorems

Metrization theorems characterize which topological spaces are metrizable, providing fundamental connections between topology and metric theory.

## The Metrization Problem

**Question:** When can a topology be induced by a metric?

A space is metrizable if and only if it is homeomorphic to a metric space.

## Necessary Conditions

**Theorem:** Every metrizable space is:
1. Hausdorff (T₂)
2. First-countable
3. Normal (T₄)
4. Perfectly normal
5. Paracompact

These conditions are necessary but not sufficient individually.

## The Urysohn Metrization Theorem

**Theorem (Urysohn):** A regular second-countable space is metrizable.

Equivalently: A second-countable T₃ space is metrizable.

*Proof Idea:*
1. Use Urysohn's Lemma to construct countably many continuous functions $f_n: X \to [0,1]$ that separate points and closed sets
2. Define $d(x, y) = \sum_{n=1}^\infty \frac{|f_n(x) - f_n(y)|}{2^n}$
3. Show this is a compatible metric

## The Nagata-Smirnov Metrization Theorem

**Theorem (Nagata, Smirnov):** A topological space is metrizable if and only if it is regular and has a σ-locally finite base.

**Definition:** A collection is **σ-locally finite** if it is a countable union of locally finite collections.

This theorem completely characterizes metrizable spaces.

## The Bing Metrization Theorem

**Theorem (Bing):** A topological space is metrizable if and only if it is regular and has a σ-discrete base.

**Definition:** A collection is **σ-discrete** if it is a countable union of discrete collections.

## Applications and Examples

### Example 1: Second-Countable Spaces
$\mathbb{R}^n$ and any manifold is metrizable (by Urysohn's theorem).

### Example 2: Compact Hausdorff Spaces
A compact Hausdorff space is metrizable if and only if it is second-countable.

### Example 3: Sorgenfrey Line
The Sorgenfrey line (lower limit topology on $\mathbb{R}$) is NOT metrizable, even though it is:
- Hausdorff
- Normal
- Lindelöf
- First-countable

It fails because it is not second-countable and has other properties incompatible with metrizability.

## Non-Metrizable Spaces

### Example 4: Long Line
The long line is locally metrizable but not metrizable.

### Example 5: Uncountable Products
An uncountable product of non-trivial spaces $\prod_{\alpha \in A} X_\alpha$ (|A| uncountable) is not first-countable, hence not metrizable.

## Complete Metrizability

**Definition:** A metrizable space is **completely metrizable** if it admits a complete metric.

**Theorem (Alexandroff):** A $G_\delta$ subset of a completely metrizable space is completely metrizable.

**Theorem:** A metrizable space is completely metrizable if and only if it is a $G_\delta$ in its completion.

## Polish Spaces

**Definition:** A **Polish space** is a separable completely metrizable space.

**Examples:**
- $\mathbb{R}^n$
- The Cantor set
- The irrational numbers
- Separable Banach spaces

Polish spaces are important in descriptive set theory and probability theory.

## The Embedding Theorems

**Theorem:** Every separable metrizable space embeds in $[0,1]^{\mathbb{N}}$ (the Hilbert cube).

**Theorem:** Every metrizable space embeds in a product of real lines.
