# Closure Properties of Regular Languages

**Closure properties** describe operations under which a class of languages is closed. Regular languages are remarkably robust—they are closed under many natural operations.

## Boolean Closure

Regular languages are closed under all Boolean operations:

### Union
If L₁ and L₂ are regular, so is L₁ ∪ L₂.

**Proof**: Given DFAs M₁ and M₂, construct a product automaton that tracks both simultaneously and accepts if either would accept.

Alternatively, use NFAs: connect a new start state with ε-transitions to both NFAs' start states.

### Intersection
If L₁ and L₂ are regular, so is L₁ ∩ L₂.

**Proof**: Product construction—accept if **both** automata would accept.

### Complement
If L is regular, so is L̄ = Σ* - L.

**Proof**: For DFA M, construct M' by swapping accepting and non-accepting states. Note: This doesn't work for NFAs directly!

### Set Difference
If L₁ and L₂ are regular, so is L₁ - L₂.

**Proof**: L₁ - L₂ = L₁ ∩ L̄₂. Follows from intersection and complement.

### Symmetric Difference
L₁ Δ L₂ = (L₁ - L₂) ∪ (L₂ - L₁) is regular if L₁ and L₂ are.

## Regular Operations

### Concatenation
If L₁ and L₂ are regular, so is L₁ · L₂ = {xy | x ∈ L₁, y ∈ L₂}.

**Proof**: Connect NFA for L₁ to NFA for L₂ with ε-transitions from L₁'s accepting states to L₂'s start state.

### Kleene Star
If L is regular, so is L* = {ε} ∪ L ∪ LL ∪ LLL ∪ ...

**Proof**: Take NFA for L, add new start state (also accepting), add ε-transitions from old accepting states back to old start.

### Kleene Plus
L⁺ = L · L* is regular if L is.

## Other Closure Properties

### Reversal
If L is regular, so is L^R = {w^R | w ∈ L}.

**Proof**: Reverse all transitions in the automaton, swap start and accepting states.

### Homomorphism
A **homomorphism** h: Σ* → Δ* extends a function on symbols to strings. If L is regular, so is h(L) = {h(w) | w ∈ L}.

**Proof**: Replace each transition labeled 'a' with transitions spelling out h(a).

### Inverse Homomorphism
If L is regular and h is a homomorphism, then h⁻¹(L) = {w | h(w) ∈ L} is regular.

**Proof**: Construct DFA that simulates reading h(w) as it reads w.

## Product Construction Details

Given M₁ = (Q₁, Σ, δ₁, q₁, F₁) and M₂ = (Q₂, Σ, δ₂, q₂, F₂):

Product automaton M = (Q₁ × Q₂, Σ, δ, (q₁, q₂), F) where:
- δ((p, q), a) = (δ₁(p, a), δ₂(q, a))
- For union: F = {(p, q) | p ∈ F₁ or q ∈ F₂}
- For intersection: F = {(p, q) | p ∈ F₁ and q ∈ F₂}

## Using Closure Properties

Closure properties enable proving languages are regular by construction:

**Example**: Prove L = {w | w has even length and contains "01"} is regular.

- L_even = {w | |w| is even} — regular (simple DFA)
- L_01 = {w | w contains "01"} — regular
- L = L_even ∩ L_01 — regular by intersection

## Detailed Product Construction Example

Let's construct the **intersection** of two DFAs step-by-step.

**DFA M₁**: Accepts strings with even number of 0s
- States: $\{E_0, O_0\}$ (Even/Odd count of 0s)
- Start: $E_0$, Accept: $\{E_0\}$
- Transitions: $\delta_1(E_0, 0) = O_0$, $\delta_1(O_0, 0) = E_0$, loops on 1s

**DFA M₂**: Accepts strings with even number of 1s
- States: $\{E_1, O_1\}$ (Even/Odd count of 1s)
- Start: $E_1$, Accept: $\{E_1\}$
- Transitions: $\delta_2(E_1, 1) = O_1$, $\delta_2(O_1, 1) = E_1$, loops on 0s

**Product DFA M**: Accepts strings with even 0s AND even 1s

States: $Q = \{(E_0, E_1), (E_0, O_1), (O_0, E_1), (O_0, O_1)\}$

Transition function:
- $\delta((E_0, E_1), 0) = (O_0, E_1)$
- $\delta((E_0, E_1), 1) = (E_0, O_1)$
- $\delta((E_0, O_1), 0) = (O_0, O_1)$
- $\delta((E_0, O_1), 1) = (E_0, E_1)$
- (and so on for other states...)

Start state: $(E_0, E_1)$

Accept states: $F = \{(E_0, E_1)\}$ (both components accepting)

This DFA accepts exactly $L(M_1) \cap L(M_2)$.

## Complement Construction Details

**Theorem**: If L is regular, then $\overline{L}$ is regular.

**Proof**: Given DFA $M = (Q, \Sigma, \delta, q_0, F)$ accepting L, construct $M' = (Q, \Sigma, \delta, q_0, Q - F)$.

**Why this works**:
- DFA computation is **deterministic**: exactly one path per string
- Every string leads to exactly one state
- If that state was accepting, make it non-accepting (and vice versa)
- Therefore: $w \in L \iff w \notin \overline{L}$

**Critical note**: This does **not** work for NFAs! Why?
- NFA may have multiple paths
- "Not accepted" means all paths reject
- Swapping accept states gives "at least one path accepts the complement"
- This is different from "all paths reject the original"

**For NFAs**: Must convert to DFA first, then complement.

## Concatenation via ε-Transitions

**Theorem**: If L₁ and L₂ are regular, so is L₁ · L₂.

**Construction**: Given NFAs N₁ and N₂:

1. Take N₁'s states and transitions unchanged
2. Take N₂'s states and transitions unchanged (rename if needed)
3. Add ε-transitions from **every accepting state** in N₁ to N₂'s start state
4. Make N₁'s accepting states non-accepting
5. Keep only N₂'s accepting states as accepting

**Example**: L₁ = {a}, L₂ = {b}

N₁: $q_0 \xrightarrow{a} q_1$ (q₁ accepting)

N₂: $p_0 \xrightarrow{b} p_1$ (p₁ accepting)

Combined: $q_0 \xrightarrow{a} q_1 \xrightarrow{\varepsilon} p_0 \xrightarrow{b} p_1$

Accepts exactly "ab" = L₁ · L₂ ✓

## Kleene Star Construction

**Theorem**: If L is regular, so is L*.

**Construction** for L* from NFA N accepting L:

1. Create new start state $q_s$ (also accepting, for ε ∈ L*)
2. Add ε-transition from $q_s$ to old start state
3. Add ε-transitions from all old accepting states back to old start state
4. Keep old accepting states as accepting

**Why it works**:
- $q_s$ accepts ε (L⁰)
- One traversal accepts L¹
- ε-loop back allows unlimited repetitions (L², L³, ...)

**Example**: L = {a}

Original: $q_0 \xrightarrow{a} q_1$ (q₁ accepting)

With star:
```
q_s --ε--> q_0 --a--> q_1
           ^           |
           +-----ε-----+
```
Accepts: ε, a, aa, aaa, ... = {a}* ✓

## Reversal Construction

**Theorem**: If L is regular, so is $L^R = \{w^R \mid w \in L\}$.

**Construction**: Given NFA N:
1. Reverse all transition arrows
2. Swap start state and accepting states
3. If multiple old accepting states, add new start with ε-transitions to all

**Example**: L = {ab}

Original: $q_0 \xrightarrow{a} q_1 \xrightarrow{b} q_2$ (q₂ accepting)

Reversed: $q_2 \xrightarrow{b} q_1 \xrightarrow{a} q_0$ (q₀ accepting)

Accepts: "ba" = (ab)^R ✓

## Homomorphism Example

A **homomorphism** h: Σ* → Δ* maps each symbol to a string, extended to strings by concatenation.

**Example**: h(0) = ab, h(1) = a

- h(01) = h(0)h(1) = ab · a = aba
- h(101) = h(1)h(0)h(1) = a · ab · a = aaba

**Theorem**: If L is regular and h is a homomorphism, then h(L) is regular.

**Proof**: Replace each transition labeled a with path spelling h(a).

**Inverse homomorphism**: $h^{-1}(L) = \{w \mid h(w) \in L\}$ is also regular.

**Construction**: Simulate N's transitions while reading h(w) as we read w.

## Worked Problem: Combining Closure Properties

**Problem**: Prove $L = \{w \in \{0,1\}^* \mid w \text{ has equal 0s and 1s, length even}\}$ is **not** regular.

**Approach**: Use closure properties to simplify.

Suppose L is regular. Then:
- $L \cap 0^*1^*$ is regular (intersection with regular language)
- This gives $\{0^n 1^n \mid n \geq 0\}$
- But this is not regular (proven via pumping lemma)!
- Contradiction, so L is not regular.

This shows closure properties can **simplify non-regularity proofs**.

## Quotient Operation

The **left quotient** of L by prefix P is:
$$P \backslash L = \{w \mid Pw \in L\}$$

The **right quotient** of L by suffix S is:
$$L / S = \{w \mid wS \in L\}$$

**Theorem**: Regular languages are closed under quotient.

**Proof sketch**: Start DFA from states reachable by P (or modify accepting states based on S).

**Example**: L = $(ab)^*$, P = a
- $P \backslash L = \{w \mid aw \in L\} = b(ab)^*$
- Regular! ✓

## Decision Problems Using Closure

Closure properties enable **decision algorithms**:

**Emptiness**: Is L = ∅?
- Algorithm: Check if accepting state is reachable from start
- Time: O(n) via BFS/DFS

**Finiteness**: Is L finite?
- Algorithm: Check if DFA has cycles reachable from start to accept
- Time: O(n) via cycle detection

**Equivalence**: Is L₁ = L₂?
- Algorithm: Check if $(L_1 \cap \overline{L_2}) \cup (\overline{L_1} \cap L_2) = \emptyset$
- Uses: complement, intersection, union, emptiness test
- Time: O(n²) via construction + reachability

## Non-Closure Properties

Regular languages are **not** closed under:

**Infinite union**:
- Each $L_n = \{a^n\}$ is regular
- But $\bigcup_{n=1}^{\infty} L_n = \{a, aa, aaa, \ldots\}$ requires infinite description
- Regular languages form a countable set
- Infinite union over uncountable index set → may not be regular

**Shuffling**:
- $w_1 \shuffle w_2$ = all interleavings of $w_1$ and $w_2$
- Counter-example exists where regular languages shuffle to non-regular

**Perfect shuffle**:
- Even more restrictive than general shuffle
- Not closed

**Operations requiring counting**:
- $\{a^n b^n \mid n \geq 0\}$ (matching counts)
- $\{ww \mid w \in \Sigma^*\}$ (copying)
- $\{a^p \mid p \text{ prime}\}$ (arithmetic)

Understanding what operations preserve regularity helps in both constructing automata and proving non-regularity. If you can reduce a known non-regular language using only closure properties, you've proven non-regularity!

## Key Takeaways

- Regular languages are closed under union, intersection, complement, concatenation, Kleene star, reversal
- Product construction handles union and intersection by tracking both DFAs simultaneously
- Complement requires DFA (not NFA) to work correctly
- ε-NFA constructions elegantly handle concatenation and Kleene star
- Homomorphism and quotient are more advanced closure properties
- Closure properties enable decision algorithms for emptiness, finiteness, equivalence
- Not closed under infinite union, shuffling, or operations requiring unbounded counting
- Understanding closure helps both in constructing automata and proving non-regularity
