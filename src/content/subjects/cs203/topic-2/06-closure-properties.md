# Closure Properties of Regular Languages

Regular languages are closed under numerous operations, making them robust and compositionally useful. These closure properties enable building complex languages from simpler ones.

## Boolean Closures

### Union
If L₁ and L₂ are regular, then L₁ ∪ L₂ is regular.

**Regex proof**: If R₁ describes L₁ and R₂ describes L₂, then R₁ | R₂ describes L₁ ∪ L₂.

**Automata proof**: Product construction or NFA with ε-transitions to both automata.

### Intersection
If L₁ and L₂ are regular, then L₁ ∩ L₂ is regular.

**Proof**: Product construction on DFAs—accept when both would accept.

### Complement
If L is regular over Σ, then Σ* - L is regular.

**Proof**: For DFA M, swap accepting and non-accepting states.

### Set Difference
L₁ - L₂ = L₁ ∩ L̄₂ is regular when both are regular.

## Regular Operation Closures

### Concatenation
If L₁ and L₂ are regular, then L₁L₂ is regular.

**Regex proof**: R₁R₂ describes L₁L₂.

### Kleene Star
If L is regular, then L* is regular.

**Regex proof**: R* describes L*.

### Kleene Plus
L⁺ = LL* is regular.

## Other Closures

### Reversal
L^R = {w^R | w ∈ L} is regular if L is.

**Proof**: Reverse all automaton transitions, swap start and accept.

### Prefix
Prefix(L) = {x | xy ∈ L for some y} is regular.

**Proof**: Make all states reachable from start that can reach an accept into accepting states.

### Suffix
Suffix(L) = {y | xy ∈ L for some x} is regular.

**Proof**: Add ε-transitions from new start to all states, keep original accepts.

### Substring
Substring(L) = {y | xyz ∈ L for some x, z} is regular.

**Proof**: Combine prefix and suffix operations.

### Homomorphism
For h: Σ* → Δ*, h(L) = {h(w) | w ∈ L} is regular.

**Proof**: Replace transitions labeled a with paths for h(a).

### Inverse Homomorphism
h⁻¹(L) = {w | h(w) ∈ L} is regular.

**Proof**: Construct DFA that simulates reading h(w) character by character.

### Quotient
L₁/L₂ = {x | xy ∈ L₁ for some y ∈ L₂} is regular.

**Proof**: Mark states from which some string in L₂ leads to accept.

## Product Construction

Given DFAs M₁ = (Q₁, Σ, δ₁, q₁, F₁) and M₂ = (Q₂, Σ, δ₂, q₂, F₂):

Construct M = (Q₁ × Q₂, Σ, δ, (q₁, q₂), F) where:
- δ((p, q), a) = (δ₁(p, a), δ₂(q, a))
- For union: F = (F₁ × Q₂) ∪ (Q₁ × F₂)
- For intersection: F = F₁ × F₂

## Using Closure for Proofs

**Example**: L = {w ∈ {a,b}* | #a(w) ≡ #b(w) mod 3} is regular.

1. L_a = {w | #a(w) ≡ 0 mod 3} is regular (3-state DFA)
2. L_b = {w | #b(w) ≡ 0 mod 3} is regular (3-state DFA)
3. We need #a ≡ #b (mod 3), not both ≡ 0
4. Build product automaton tracking (#a mod 3, #b mod 3)
5. Accept when both components equal

## Closure Under Substitution

Let s: Σ → P(Δ*) map each symbol to a regular language.
Extend to strings: s(a₁...aₙ) = s(a₁)...s(aₙ)
Extend to languages: s(L) = ⋃_{w ∈ L} s(w)

**Theorem**: If L and each s(a) are regular, then s(L) is regular.

**Proof**: Replace each transition labeled a with an automaton for s(a).

## Non-Closure Properties

Regular languages are **not** closed under:
- Infinite union (would need infinitely many states)
- Perfect shuffle of infinite collections
- Operations requiring unbounded counting

## Detailed Proof Examples

### Union Closure Proof

**Theorem**: If L₁ and L₂ are regular, then L₁ ∪ L₂ is regular.

**Proof via Product Construction**:

Given DFAs M₁ = (Q₁, Σ, δ₁, q₁, F₁) and M₂ = (Q₂, Σ, δ₂, q₂, F₂):

Construct M = (Q, Σ, δ, q₀, F) where:
- Q = Q₁ × Q₂ (Cartesian product of state sets)
- q₀ = (q₁, q₂) (start at both initial states)
- δ((p, q), a) = (δ₁(p, a), δ₂(q, a)) (simulate both in parallel)
- F = (F₁ × Q₂) ∪ (Q₁ × F₂) (accept if either component accepts)

**Correctness**: String w is accepted iff at least one of M₁ or M₂ accepts w.

**Complexity**: |Q| = |Q₁| · |Q₂|, so polynomial blowup.

### Intersection Closure Proof

**Theorem**: If L₁ and L₂ are regular, then L₁ ∩ L₂ is regular.

**Proof**: Same product construction, but F = F₁ × F₂ (accept only if both accept).

**Alternative via complement**: L₁ ∩ L₂ = $\overline{\overline{L₁} \cup \overline{L₂}}$ (De Morgan's law)

### Complement Closure Proof

**Theorem**: If L is regular over Σ, then $\overline{L} = \Sigma^* - L$ is regular.

**Proof**: Given DFA M = (Q, Σ, δ, q₀, F):

Construct $\overline{M} = (Q, Σ, δ, q₀, Q - F)$

- Same states, transitions, start
- Accept states become reject, reject become accept
- **Key requirement**: M must be complete (total transition function)

If M is incomplete, first complete it with a "trap state" q_trap:
- Add q_trap to Q
- For any missing δ(q, a), set δ(q, a) = q_trap
- δ(q_trap, a) = q_trap for all a
- q_trap ∉ F

**Correctness**: String w reaches accept state in M iff it reaches reject state in $\overline{M}$.

### Reversal Closure Proof

**Theorem**: If L is regular, then $L^R = \{w^R \mid w \in L\}$ is regular.

**Proof via NFA reversal**:

Given NFA N = (Q, Σ, δ, q₀, F):

Construct $N^R = (Q ∪ \{q'₀\}, Σ, δ^R, q'₀, \{q₀\})$ where:
- Add new start state q'₀
- q'₀ has ε-transitions to all states in F
- For each transition p --a--> q in N, add q --a--> p in $N^R$
- Accept at old start state q₀

**Example**: NFA for $ab$:
- Original: q₀ --a--> q₁ --b--> q₂ (accept)
- Reversed: q'₀ --ε--> q₂ --b--> q₁ --a--> q₀ (accept)
- This accepts $ba = (ab)^R$

### Homomorphism Closure Proof

**Theorem**: If L is regular and h: Σ* → Δ* is a homomorphism, then h(L) is regular.

**Construction**:

Given DFA M for L, build NFA for h(L):
- For each transition p --a--> q in M
- Replace with path p --h(a)--> q
- If h(a) = b₁b₂...bₖ, create intermediate states

**Example**: L = {ab}*, h(a) = x, h(b) = yy

h(L) = h({ab}*) = {(xyy)*} = regular

Original: q₀ --a--> q₁ --b--> q₀

Modified:
- q₀ --x--> q₁
- q₁ --y--> q₂ --y--> q₀

Accepts {xyy}* = h({ab}*)

## Extended Examples

### Example 1: Using Closure to Prove Regularity

**Problem**: Is $L = \{w \in \{a,b\}^* \mid \#_a(w) \text{ is even and } \#_b(w) \text{ is odd}\}$ regular?

**Solution**:
- $L_a = \{w \mid \#_a(w) \text{ even}\}$ is regular (2-state DFA)
- $L_b = \{w \mid \#_b(w) \text{ odd}\}$ is regular (2-state DFA)
- $L = L_a \cap L_b$ is regular (by intersection closure)

**Explicit construction**: Product DFA with 2 × 2 = 4 states tracking (a-parity, b-parity).

### Example 2: Language is Not Regular (No Closure)

**Problem**: Is $L = \{a^n b^n \mid n \geq 0\}$ regular?

This is where closure properties **fail** to help—we need the pumping lemma instead. However, we can show related properties:

If L were regular:
- $L \cap L(a^*b^*)$would be regular
- But $L \cap L(a^*b^*) = L$ (already contained)
- This doesn't give contradiction—need pumping lemma

### Example 3: Quotient Operation

**Problem**: Given L = {strings ending in "ab"}, find $L / \{b\}$.

**Definition**: $L / K = \{x \mid xy \in L \text{ for some } y \in K\}$

Here: $L / \{b\} = \{x \mid xb \in L\}$
- = {strings where appending 'b' gives string ending in "ab"}
- = {strings ending in 'a'}
- = $\Sigma^*a$ (regular)

**General construction**: From DFA for L, make accepting all states from which some string in K leads to accept.

## Practical Applications

### Text Processing

Closure properties enable composing text patterns:
- Intersection: match documents containing both "Python" AND "regex"
- Union: match "color" OR "colour"
- Complement: match lines NOT containing "DEBUG"

### Compiler Optimization

Token recognition benefits from closures:
- Union: combine multiple token patterns
- Complement: exclude reserved words
- Quotient: recognize prefixes of valid tokens

### Formal Verification

Protocol verification uses closure:
- Intersection: both safety AND liveness properties hold
- Complement: system never enters bad state
- Homomorphism: abstract away implementation details

## Key Takeaways

- Regular languages are **closed under Boolean operations**: union, intersection, and complement (proven via product construction and state flipping)
- **Union and intersection** use the product construction with different accept conditions: F₁×Q₂ ∪ Q₁×F₂ for union, F₁×F₂ for intersection
- **Complement** requires a complete DFA: flip accepting/non-accepting states (add trap state if transitions are missing)
- Closure under **concatenation and Kleene star** follows directly from regular expression construction
- **Reversal** is closed: reverse all transitions, make old start the accept, and add new start with ε-transitions to old accepts
- **Homomorphism and inverse homomorphism** are closed: replace transitions or track pre-images systematically
- **Prefix, suffix, and substring** operations preserve regularity (modify accept states or add ε-transitions)
- **Quotient** L₁/L₂ is closed: mark states from which strings in L₂ lead to acceptance
- Closure properties enable **compositional reasoning**: build complex languages from simpler ones
- **Product construction** has polynomial complexity O(|Q₁|·|Q₂|), efficient in practice
- These properties distinguish regular languages from context-free and beyond (which lack closure under intersection/complement)
- Practical applications include **text processing, compiler optimization, and formal verification**
