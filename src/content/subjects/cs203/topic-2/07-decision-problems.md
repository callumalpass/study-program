# Decision Problems for Regular Languages

**Decision problems** ask yes/no questions about languages or automata. For regular languages, many important problems are decidable with efficient algorithms.

## Decidable Problems

### Membership Problem
**Input**: DFA M, string w
**Question**: Is w ∈ L(M)?

**Algorithm**: Simulate M on w, check if final state is accepting.
**Complexity**: O(|w|) for DFAs

### Emptiness Problem
**Input**: DFA M
**Question**: Is L(M) = ∅?

**Algorithm**: Check if any accepting state is reachable from start.
**Complexity**: O(|Q| + |δ|) using BFS/DFS

### Finiteness Problem
**Input**: DFA M
**Question**: Is L(M) finite?

**Algorithm**: L is infinite iff the automaton contains a cycle reachable from start that can reach an accepting state.
**Complexity**: O(|Q| + |δ|)

### Universality Problem
**Input**: DFA M over Σ
**Question**: Is L(M) = Σ*?

**Algorithm**: Check if L(M)^c = ∅. Complement M (swap accept/reject) and check emptiness.
**Complexity**: O(|Q| + |δ|)

### Equivalence Problem
**Input**: DFAs M₁ and M₂
**Question**: Is L(M₁) = L(M₂)?

**Algorithm**: Check if (L(M₁) - L(M₂)) ∪ (L(M₂) - L(M₁)) = ∅
**Alternative**: Minimize both DFAs and check isomorphism.
**Complexity**: O(n log n) using Hopcroft's minimization

### Subset Problem
**Input**: DFAs M₁ and M₂
**Question**: Is L(M₁) ⊆ L(M₂)?

**Algorithm**: Check if L(M₁) ∩ L(M₂)^c = ∅
**Complexity**: O(|Q₁| · |Q₂|)

## Algorithms in Detail

### Reachability for Emptiness
```
is_empty(M):
    visited = {q₀}
    queue = [q₀]
    while queue not empty:
        q = queue.pop()
        if q ∈ F:
            return False  # Found accepting state
        for a in Σ:
            r = δ(q, a)
            if r not in visited:
                visited.add(r)
                queue.append(r)
    return True  # No accepting state reachable
```

### Cycle Detection for Finiteness
```
is_finite(M):
    # Find states reachable from start
    reachable = compute_reachable(q₀)

    # Find states that can reach an accept state
    productive = compute_reverse_reachable(F)

    # Check for cycles in reachable ∩ productive
    useful = reachable ∩ productive
    return not has_cycle(useful)
```

### Minimization for Equivalence
```
are_equivalent(M₁, M₂):
    M₁_min = minimize(M₁)
    M₂_min = minimize(M₂)
    return is_isomorphic(M₁_min, M₂_min)
```

## Complexity Summary

| Problem | DFA Input | NFA Input |
|---------|-----------|-----------|
| Membership | O(n) | O(n·|Q|²) or O(2^|Q|·n) |
| Emptiness | O(|Q| + |δ|) | O(|Q| + |δ|) |
| Finiteness | O(|Q| + |δ|) | O(|Q| + |δ|) |
| Universality | O(|Q| + |δ|) | PSPACE-complete |
| Equivalence | O(n log n) | PSPACE-complete |

## NFA Decision Problems

For NFAs, some problems become harder:

- **Membership**: Polynomial (simulate NFA or convert to DFA)
- **Emptiness**: Polynomial (same as DFA)
- **Universality**: PSPACE-complete (requires exponential DFA in worst case)
- **Equivalence**: PSPACE-complete

## Regular Expressions

For regex R over alphabet Σ:

| Problem | Complexity |
|---------|------------|
| Membership | O(|R| · |w|) |
| Emptiness | O(|R|) (check if ε ∈ L(R)) |
| Equivalence | PSPACE-complete |

## Practical Considerations

Many tools handle large automata efficiently:
- FAdo (Python library for automata)
- OpenFst (finite-state transducer library)
- JFLAP (educational automata tool)

For equivalence testing:
1. Minimize both DFAs (O(n log n))
2. Compare canonical forms
3. Much faster than product construction for many inputs

## Undecidable Extensions

When we extend regular languages, many problems become undecidable:
- Context-free: Equivalence is undecidable
- Context-free: Universality is undecidable
- Turing machines: Almost everything is undecidable
