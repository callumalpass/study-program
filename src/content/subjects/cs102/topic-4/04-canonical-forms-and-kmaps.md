# Canonical Forms and Karnaugh Maps (Optional Depth)

When designing or simplifying logic, it’s useful to express functions in standardized forms.

## Minterms and maxterms

For a function of variables (A, B, C, …):
- A **minterm** is an AND term that matches exactly one truth-table row where output is 1.
- A **maxterm** is an OR term that matches exactly one row where output is 0.

## Sum of Products (SOP)

SOP form is an OR of AND terms. It corresponds to listing all minterms where output is 1.

Example (conceptually):

`F = (NOT A AND B) OR (A AND NOT B)`

This SOP is also the XOR function.

## Product of Sums (POS)

POS is an AND of OR terms. It corresponds to listing maxterms where output is 0.

## Karnaugh maps (K-maps)

K-maps are a visual technique for simplifying Boolean functions by grouping adjacent 1s (for SOP) or 0s (for POS). The “adjacency” is arranged so that neighbors differ by exactly one bit (Gray-code ordering).

You typically use K-maps for small numbers of variables (2–4) to simplify quickly without doing algebraic transformations.

## Key takeaways

- SOP/POS give standard ways to represent functions from truth tables.
- K-maps are a fast, visual simplification method for small functions.
- Understanding canonical forms helps connect “truth table” to “circuit design”.

