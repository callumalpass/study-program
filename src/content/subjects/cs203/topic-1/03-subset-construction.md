# Subset Construction

The **subset construction** (also called powerset construction) converts any NFA to an equivalent DFA. This algorithm proves that DFAs and NFAs recognize the same class of languages—the regular languages.

## The Key Insight

The main idea is to track the **set of all possible states** the NFA could be in. Each DFA state corresponds to a subset of NFA states.

If the NFA has n states, the DFA might have up to 2ⁿ states (all possible subsets). In practice, many subsets are often unreachable.

## The Algorithm

Given NFA N = (Q, Σ, δ_N, q₀, F_N), construct DFA D = (Q', Σ, δ_D, q₀', F'):

1. **States**: Q' ⊆ P(Q), the power set of Q
2. **Start state**: q₀' = ε-closure({q₀})
3. **Transition function**: For state S ⊆ Q and symbol a:
   δ_D(S, a) = ε-closure(⋃{δ_N(q, a) | q ∈ S})
4. **Accepting states**: F' = {S ∈ Q' | S ∩ F_N ≠ ∅}

## Computing ε-Closure

The ε-closure of a set S is computed by:

```
ε-closure(S):
    result = S
    stack = list(S)
    while stack is not empty:
        q = stack.pop()
        for r in δ(q, ε):
            if r not in result:
                result.add(r)
                stack.push(r)
    return result
```

## Lazy Construction

Rather than computing all 2ⁿ states upfront, we build only **reachable states**:

```
subset_construction(N):
    q₀' = ε-closure({q₀})
    Q' = {q₀'}
    worklist = [q₀']

    while worklist is not empty:
        S = worklist.pop()
        for a in Σ:
            T = ε-closure(⋃{δ(q, a) | q ∈ S})
            if T not in Q':
                Q'.add(T)
                worklist.append(T)
            add transition (S, a) → T

    F' = {S ∈ Q' | S ∩ F ≠ ∅}
    return DFA(Q', Σ, δ_D, q₀', F')
```

## Example

Consider an NFA with states {q₀, q₁, q₂}, accepting strings ending in "ab":

| State | a | b | ε |
|-------|---|---|---|
| q₀ | {q₀, q₁} | {q₀} | ∅ |
| q₁ | ∅ | {q₂} | ∅ |
| q₂ | ∅ | ∅ | ∅ |

Subset construction produces:
- Start: {q₀}
- {q₀} --a--> {q₀, q₁}
- {q₀} --b--> {q₀}
- {q₀, q₁} --a--> {q₀, q₁}
- {q₀, q₁} --b--> {q₀, q₂}
- {q₀, q₂} --a--> {q₀, q₁}
- {q₀, q₂} --b--> {q₀}

Accepting states: any containing q₂, so {{q₀, q₂}}

## Worst-Case Exponential Blowup

The exponential blowup can actually occur. Consider the NFA for "strings where the nth-from-last symbol is 1." This NFA has n+1 states, but the minimal DFA has 2ⁿ states.

This shows that NFAs can be exponentially more succinct than DFAs for some languages.

## Correctness Proof

**Theorem**: L(D) = L(N)

**Proof**: By induction on string length, we show that after reading w, the DFA is in state S where S is exactly the set of states the NFA could be in after reading w. Since the DFA accepts iff S contains an accepting state, and the NFA accepts iff some computation reaches an accepting state, their languages are equal.

## Practical Considerations

In lexical analyzer generators:
- NFAs are built from regular expressions
- Subset construction converts to DFA
- DFA is then minimized
- Resulting DFA enables O(n) string matching

The conversion is typically done once at compile time, so exponential worst-case is acceptable for the speed of matching at runtime.
