# Algebraic Properties

Regular expressions form an algebra with laws that allow manipulation and simplification. Understanding these properties enables proving equivalences and optimizing patterns.

## Fundamental Identities

### Union Laws
- **Commutative**: R | S ≡ S | R
- **Associative**: (R | S) | T ≡ R | (S | T)
- **Idempotent**: R | R ≡ R
- **Identity**: R | ∅ ≡ R
- **Annihilator**: R | Σ* ≡ Σ*

### Concatenation Laws
- **Associative**: (RS)T ≡ R(ST)
- **Identity**: εR ≡ Rε ≡ R
- **Annihilator**: ∅R ≡ R∅ ≡ ∅

### Kleene Star Laws
- **Idempotence**: (R*)* ≡ R*
- **Identity base**: ε* ≡ ε
- **Empty base**: ∅* ≡ ε
- **Unrolling**: R* ≡ ε | RR*
- **Right unrolling**: R* ≡ ε | R*R

## Distributive Laws

Left distribution:
- R(S | T) ≡ RS | RT

Right distribution:
- (R | S)T ≡ RT | ST

**Note**: Star does not distribute over union in general.

## Star Identities

More complex identities involving star:

- R*R* ≡ R*
- R⁺ ≡ RR* ≡ R*R
- R? ≡ ε | R
- (R*)* ≡ R*
- (R | S)* ≡ (R*S*)* ≡ (R* | S*)*
- (RS)*R ≡ R(SR)*

## Absorption Laws

When one pattern includes another:

- If L(R) ⊆ L(S), then R | S ≡ S
- ε | R* ≡ R*
- R | R* ≡ R*
- R | RR* ≡ R*

## Simplification Strategies

### Strategy 1: Factor Common Parts
RS | RT → R(S | T)

### Strategy 2: Apply Star Laws
RR* | ε → R*
R*R* → R*

### Strategy 3: Remove Redundancy
R | R → R
R | ∅ → R

### Strategy 4: Simplify Stars
(R*)* → R*
ε* → ε

## Example Simplifications

**Example 1**: Simplify (a* | b*)*
- (a* | b*)* ≡ (a | b)* (both describe all strings)

**Example 2**: Simplify a*a*
- a*a* ≡ a* (star is idempotent under concatenation)

**Example 3**: Simplify (a | ab)*
- (a | ab)* ≡ a(ε | b))* ≡ (a(b?))*  ≡ a*(ab*)*
- But also ≡ a* (since ab is covered by a followed by a*b*)

## Complete Axiomatization

Salomaa proved a complete axiom system for regex equality. Any true equivalence can be derived from:

1. Union/concatenation axioms above
2. R* = ε | RR* (fixed point)
3. If ε | SR ⊆ R then S*R ⊆ R (induction)

## Proving Equivalences

To prove R ≡ S:
1. Use algebraic laws to transform R to S
2. Or convert both to minimal DFAs and check isomorphism
3. Or use bisimulation/coinduction

## Non-Equivalences

Not everything that looks similar is equivalent:

- (R | S)* ≢ R* | S* in general
- (RS)* ≢ R*S* in general
- R(S | T) ≢ RS | T (T not absorbed)

## Application: Regex Optimization

Compilers can optimize regex by applying algebraic laws:

```
Original: aa* | a
Simplified: a⁺

Original: (a*b*)*
Simplified: (a | b)*

Original: a*ba*ba*
Cannot simplify much (already fairly minimal)
```

## Algebraic Decision Procedures

To decide if R ≡ S:
1. Compute minimal DFAs for R and S
2. Check if DFAs are isomorphic

This is decidable and runs in polynomial time relative to automaton size (though construction may be exponential).

## Detailed Proof Examples

### Proving $(a^*b^*)^* \equiv (a \mid b)^*$

**Method 1: Mutual inclusion**

Show $L((a^*b^*)^*) \subseteq L((a \mid b)^*)$:
- Any string in $(a^*b^*)^*$ is a concatenation of blocks from $a^*b^*$
- Each block is $a^i b^j$ for some $i, j \geq 0$
- Concatenating these blocks gives a string over {a,b}
- Therefore contained in $(a \mid b)^*$

Show $L((a \mid b)^*) \subseteq L((a^*b^*)^*)$:
- Any string in $(a \mid b)^*$ can be written as $c_1 c_2 \ldots c_n$ where each $c_i \in \{a, b\}$
- Group consecutive a's and b's: $a^{i_1} b^{j_1} a^{i_2} b^{j_2} \ldots$
- Each $a^{i_k} b^{j_k}$ is in $a^*b^*$
- Therefore the string is in $(a^*b^*)^*$

**Method 2: Algebraic laws**

Starting from $(a^*b^*)^*$:
- $= (a^* \mid b^*)^*$ (since concatenation and union can be rearranged under star)
- Actually, this step is tricky. Better approach:

Note that $a^*b^* \subseteq (a \mid b)^*$ (obvious)

Also $(a \mid b) \subseteq a^*b^*$ via: $a = a^1 b^0$ and $b = a^0 b^1$

Therefore $L(a^*b^*) = L((a \mid b)^*)$ when considered over the same alphabet.

Taking stars: $(a^*b^*)^* = ((a \mid b)^*)^* = (a \mid b)^*$

### Proving $(R^*)^* \equiv R^*$

**Proof**:

Show $L(R^*) \subseteq L((R^*)^*)$:
- Clearly $R^* \subseteq (R^*)^*$ since $(R^*)^*$ contains all finite concatenations of strings from $R^*$
- In particular, it contains $R^* = (R^*)^1$

Show $L((R^*)^*) \subseteq L(R^*)$:
- $(R^*)^*$ consists of finite concatenations of strings from $R^*$
- Each string in $R^*$ is itself a finite concatenation of strings from R
- Concatenating these: $(s_1 \ldots s_k)(t_1 \ldots t_m) = s_1 \ldots s_k t_1 \ldots t_m \in R^*$
- Therefore $(R^*)^* \subseteq R^*$

### Proving $R(SR)^* \equiv (RS)^*R$

**Approach**: Show both sides describe the same set.

$L(R(SR)^*) = L(R) \cdot L((SR)^*) = L(R) \cdot \bigcup_{i=0}^{\infty} L(SR)^i$

$= L(R) \cdot (\{\varepsilon\} \cup L(SR) \cup L(SR)^2 \cup \ldots)$

$= L(R) \cup L(R \cdot SR) \cup L(R \cdot SR \cdot SR) \cup \ldots$

$= L(R) \cup L(RS \cdot R) \cup L(RS \cdot RS \cdot R) \cup \ldots$

$= L(R) \cdot \bigcup_{i=0}^{\infty} L(RS)^i = L((RS)^*R)$

## Practical Application: Regex Simplification

### Example 1: Simplify $(aa^* \mid \varepsilon)$

- $aa^* = a \cdot a^* = a^+ = aa^*$
- $(aa^* \mid \varepsilon) = (a^+ \mid \varepsilon)$
- But $a^+ \mid \varepsilon = (a \mid \varepsilon)^+ \mid \varepsilon$ is complex
- Better: $a^+ \mid \varepsilon = a^*$ (since $a^* = \varepsilon \cup a^+$)

**Answer**: $a^*$

### Example 2: Simplify $(a \mid ab)^*$

Factor: $(a \mid ab)^* = (a(ε \mid b))^* = (a(ε \mid b))^*$

Since $(ε \mid b) = b?$ is just an optional b:
- $(a(ε \mid b))^* = (ab?)^*$

But does $(ab?)^* = a^*$? Let's check:
- String "aaa" ∈ $(ab?)^*$: yes (match as $a, a, a$ where each chooses ε)
- String "aba" ∈ $(ab?)^*$: yes (match as $ab, a$)

However, string "ba" ∉ $(ab?)^*$ (must start with a).

So $(a \mid ab)^* \neq a^*$. The pattern $(a \mid ab)^*$ actually equals $(a^+ \mid ab)^*$ after factoring.

More carefully: $(a \mid ab)^*$ accepts strings like: ε, a, aa, ab, aaa, aab, aba, abab, etc.

This is actually $a^*b?$ concatenated repeatedly, but with specific structure.

Actually, the simplification is subtle. The best form is: $(a(ε \mid b))^*$ or equivalently, recognizing that after any number of a's we can optionally add b, then repeat.

Final answer: $(a \mid ab)^* = a^*(ba^*)^*$ or $(a \mid ab)^* = (a^+b)^*a^*$

Let me reconsider: every string in $(a \mid ab)^*$ is a sequence where each element is either "a" or "ab". This is equivalent to $a^*(ba^*)^*$ (any number of a's, then optionally b followed by more a's, repeated).

### Example 3: Simplify $(a^*b)^*a^*$

Think of this as: repeatedly have (some a's then one b), then end with some a's.

This accepts:
- Any string with any number of b's, with a's between them
- Essentially $(a \mid b)^*$ but structured differently

To verify:
- Does it accept all strings over {a,b}?
- "bbb": $(a^*b)^* = (\varepsilon \cdot b)^* = b^*$, then $a^*$ gives $b^*a^* \ni$ "bbb" ✓
- "bab": $(a^*b)^* \ni$ "bab" as $b \cdot ab$, then $\varepsilon$ ✓

Yes, $(a^*b)^*a^* = (a \mid b)^*$

## Normal Forms

### Kleene Normal Form

Every regular expression can be converted to form:
$$R = L_1 \mid L_2 \mid \ldots \mid L_n$$

where each $L_i = w_i R_i^*$ for some string $w_i$ and regex $R_i$.

This is useful for certain algorithms and proofs.

### Star Height

The **star height** of a regex is the maximum nesting depth of Kleene stars.

Examples:
- $h(a^*b^*) = 1$
- $h((a^*b)^*) = 2$
- $h(((a^*)^*)^*) = 3$ (but equivalent to $a^*$ with height 1)

Open problem: Given a regular language, what is the minimal star height of any regex describing it?

## Key Takeaways

- Regular expressions form an **algebraic structure** with well-defined laws governing union, concatenation, and Kleene star
- **Union is commutative, associative, and idempotent** with identity ∅ and annihilator Σ*
- **Concatenation is associative** with identity ε and annihilator ∅ (but not commutative)
- **Kleene star is idempotent**: (R*)* ≡ R*, and satisfies the fixed-point equation R* = ε | RR*
- **Distributive laws** hold: R(S|T) ≡ RS|RT and (R|S)T ≡ RT|ST, enabling factoring and expansion
- **Absorption laws** simplify expressions: ε|R* ≡ R*, R|R* ≡ R*, R*R* ≡ R*
- **Salomaa's axiomatization** provides a complete set of axioms for proving all valid regex equivalences
- Testing equivalence R ≡ S is **decidable**: convert both to minimal DFAs and check isomorphism (polynomial time after construction)
- **Algebraic simplification** strategies include factoring common parts, applying star laws, removing redundancy, and eliminating nested stars
- Practical applications include **regex optimization** in compilers, query optimization in databases, and pattern simplification in text editors
- Understanding algebraic properties enables **manual simplification** and helps recognize equivalent patterns in different forms
- Some equivalences are subtle and require careful proof by mutual inclusion or structural induction
