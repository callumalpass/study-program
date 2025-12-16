# Pumping Lemma for CFLs

The **Pumping Lemma for Context-Free Languages** provides a necessary condition for context-freeness. It's used to prove certain languages are not context-free.

## Statement

If L is a context-free language, there exists a pumping length p such that any string s ∈ L with |s| ≥ p can be divided as s = uvxyz where:

1. |vxy| ≤ p (middle section is short)
2. |vy| > 0 (v and y aren't both empty)
3. For all i ≥ 0: uvⁱxyⁱz ∈ L (v and y can be pumped together)

## Intuition

For sufficiently long strings, some path in the parse tree must repeat a variable. The repeated variable creates a "pump"—we can insert or remove copies of the subtree rooted there.

## Proof Sketch

Let G be a CNF grammar with |V| = n variables. Set p = 2ⁿ.

For |s| ≥ p = 2ⁿ, the parse tree has height > n (since CNF trees are binary).

A path of length > n must repeat some variable A:
```
S ⇒* uAz ⇒* uvAyz ⇒* uvxyz
```

We can pump the A → vAy portion: uvⁱxyⁱz for any i.

## Using the Lemma (Contradiction)

To prove L is not context-free:

1. **Assume** L is context-free
2. **Let p** be the pumping length (exists by lemma)
3. **Choose** s ∈ L with |s| ≥ p strategically
4. **For all** decompositions uvxyz satisfying conditions 1-2:
5. **Find** some i where uvⁱxyⁱz ∉ L
6. **Conclude** contradiction: L is not context-free

## Example: L = {aⁿbⁿcⁿ | n ≥ 0}

**Claim**: L is not context-free.

**Proof**:
1. Assume L is CFL with pumping length p
2. Choose s = aᵖbᵖcᵖ ∈ L
3. Consider any uvxyz with |vxy| ≤ p and |vy| > 0
4. Since |vxy| ≤ p, vxy cannot contain all three symbols
5. Case 1: vxy contains only a's and b's
   - Pumping changes #a or #b but not #c
   - uv²xy²z has unequal counts → not in L
6. Case 2: vxy contains only b's and c's (similar)
7. Case 3: vxy contains only one type (similar)
8. Contradiction! L is not context-free.

## Example: L = {ww | w ∈ {a,b}*}

**Claim**: L is not context-free.

**Proof**:
1. Assume L is CFL with pumping length p
2. Choose s = aᵖbᵖaᵖbᵖ ∈ L
3. Any vxy with |vxy| ≤ p lies in one "half" of s
4. Pumping destroys the ww structure
5. Contradiction! L is not context-free.

## Example: L = {aⁿ | n is prime}

**Claim**: L is not context-free.

**Proof**:
1. Assume L is CFL with pumping length p
2. Let q > p be prime, choose s = aᵍ
3. Let |vy| = k where 0 < k ≤ p
4. |uv^(q+1)xy^(q+1)z| = q + qk = q(1+k)
5. Since q > 1 and k > 0, q(1+k) is composite
6. So uv^(q+1)xy^(q+1)z ∉ L
7. Contradiction! L is not context-free.

## Common Mistakes

1. Not considering all possible decompositions
2. Choosing s that doesn't depend on p
3. Only pumping up (i=2) when pumping down (i=0) works
4. Forgetting |vxy| ≤ p constraint

## Limitations

The pumping lemma is necessary but not sufficient. Some non-CFLs satisfy the pumping condition.

Stronger tools:
- **Ogden's Lemma**: Marks special positions
- **Interchange Lemma**: More powerful condition
- **Parikh's Theorem**: Characterizes letter counts
