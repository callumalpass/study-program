# DFA Minimization

Every regular language has a unique **minimal DFA**—a DFA with the fewest possible states. DFA minimization reduces a DFA to this canonical form, which is useful for efficient implementation and testing language equivalence.

## State Equivalence

Two states p and q are **equivalent** (written p ≡ q) if for all strings w:
δ*(p, w) ∈ F ⟺ δ*(q, w) ∈ F

In other words, p and q are equivalent if they cannot be distinguished by any string—they lead to the same accept/reject decision for all possible continuations.

## Distinguishability

States p and q are **distinguishable** if there exists a string w such that exactly one of δ*(p, w) and δ*(q, w) is accepting. The string w **distinguishes** p from q.

We define k-distinguishability inductively:
- States are **0-distinguishable** if one is accepting and one is not
- States are **k-distinguishable** if there exists symbol a where δ(p, a) and δ(q, a) are (k-1)-distinguishable

## The Table-Filling Algorithm

This algorithm marks all pairs of distinguishable states:

```
table_filling_algorithm(DFA):
    # Base case: accepting vs non-accepting
    for all pairs (p, q):
        if (p ∈ F) ≠ (q ∈ F):
            mark (p, q) as distinguishable

    # Iterate until no new marks
    repeat:
        for all unmarked pairs (p, q):
            for each symbol a:
                if (δ(p, a), δ(q, a)) is marked:
                    mark (p, q)
    until no change
```

Unmarked pairs represent equivalent states.

## Constructing the Minimal DFA

After finding equivalences:

1. **Partition** states into equivalence classes
2. **Create** one state per equivalence class
3. **Transitions**: [p] --a--> [δ(p, a)]
4. **Start state**: [q₀]
5. **Accept states**: {[p] | p ∈ F}

This is well-defined because equivalent states have equivalent successors.

## Example

Consider DFA with states {A, B, C, D, E}:
- A is start, C and E are accepting
- Mark (A,C), (A,E), (B,C), (B,E), (D,C), (D,E)
- Check transitions: find (A,D) distinguishable
- Find (B,E) already marked but (A,B) not distinguishable

Equivalence classes: {A, B}, {C}, {D}, {E}

## The Myhill-Nerode Theorem

**Theorem**: A language L is regular if and only if the equivalence relation ≡_L has finite index.

For any language L, define x ≡_L y if for all z: xz ∈ L ⟺ yz ∈ L

This provides:
1. A necessary condition for regularity
2. The number of equivalence classes = number of states in minimal DFA
3. A tool for proving non-regularity

## Uniqueness of Minimal DFA

**Theorem**: Every regular language has a unique minimal DFA (up to state renaming).

**Proof**: The minimal DFA corresponds exactly to the equivalence classes of ≡_L. Since ≡_L is determined by L alone, the structure is unique.

## Hopcroft's Algorithm

The table-filling algorithm runs in O(n²) for n states. **Hopcroft's algorithm** achieves O(n log n) time:

1. Initially partition: {F, Q-F}
2. Refine partitions by splitting classes that behave differently
3. Use a worklist to track which classes need checking
4. Clever data structures achieve the improved complexity

## Applications

DFA minimization is used for:
- **Efficient matching**: Fewer states means smaller tables
- **Equivalence testing**: Two DFAs are equivalent iff their minimal versions are isomorphic
- **Canonical forms**: Minimal DFA provides a unique representative
- **Hardware design**: Smaller state machines need less circuitry
