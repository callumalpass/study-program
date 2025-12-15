# Proof by Contradiction

## The Logical Foundation

Proof by contradiction (also called *reductio ad absurdum*) is based on a fundamental principle of logic: a proposition and its negation cannot both be true.

If assuming ¬P leads to a contradiction, then ¬P must be false, so P must be true.

Formally: (¬P → F) → P

where F represents any contradiction (a statement that is always false).

## The Basic Structure

```
Theorem: P

Proof: (by contradiction)
Suppose, for the sake of contradiction, that ¬P.
[Logical derivation...]
This leads to a contradiction because [statement Q and ¬Q both follow].
Therefore, our assumption ¬P must be false.
Hence, P is true. □
```

## Example 1: √2 is Irrational

This is the most famous proof by contradiction.

**Theorem:** √2 is irrational.

**Proof:** (by contradiction)
Suppose, for the sake of contradiction, that √2 is rational.

Then √2 = a/b for some integers a and b with b ≠ 0.
We may assume a/b is in lowest terms (gcd(a, b) = 1).

Squaring both sides: 2 = a²/b²
Therefore: a² = 2b²

This means a² is even.
Since a² is even, a must be even (by a previous theorem).
So a = 2k for some integer k.

Substituting: (2k)² = 2b²
4k² = 2b²
2k² = b²

This means b² is even, so b is even.

**Contradiction:** We assumed gcd(a, b) = 1, but we've shown both a and b are even, meaning both are divisible by 2, so gcd(a, b) ≥ 2.

Therefore, our assumption that √2 is rational must be false.
Hence, √2 is irrational. □

## Example 2: Infinitely Many Primes

**Theorem:** There are infinitely many prime numbers.

**Proof:** (by contradiction)
Suppose there are only finitely many primes: p₁, p₂, ..., pₙ.

Consider the number N = p₁ · p₂ · ... · pₙ + 1.

N is greater than 1, so either N is prime or N has a prime divisor.

**Case 1:** N is prime.
Then N is a prime not in our list (since N > pᵢ for all i).
Contradiction: we assumed our list contained all primes.

**Case 2:** N is composite.
Let p be a prime divisor of N.
Then p must be one of p₁, p₂, ..., pₙ (the only primes).
But if p divides N, and p divides p₁ · p₂ · ... · pₙ, then p divides their difference:
p | (N - p₁ · p₂ · ... · pₙ) = 1

No prime divides 1. Contradiction.

In both cases, we reach a contradiction.
Therefore, there are infinitely many primes. □

## Example 3: No Smallest Positive Rational

**Theorem:** There is no smallest positive rational number.

**Proof:** (by contradiction)
Suppose there is a smallest positive rational number r.

Since r is positive, r > 0.
Consider r/2.

Since r is rational, r = a/b for integers a, b with b ≠ 0.
So r/2 = a/(2b), which is also rational.

Since r > 0, we have r/2 > 0, so r/2 is positive.

And r/2 < r.

**Contradiction:** r/2 is a positive rational smaller than r, but we assumed r was the smallest positive rational.

Therefore, there is no smallest positive rational number. □

## Proving Implications by Contradiction

For implications P → Q, contradiction involves assuming P ∧ ¬Q and deriving a contradiction.

```
Theorem: If P, then Q.

Proof: (by contradiction)
Suppose P is true and Q is false.
[Derivation...]
This leads to a contradiction.
Therefore, if P is true, Q must be true.
Hence, P → Q. □
```

## Example 4: Sum of Rational and Irrational

**Theorem:** If r is rational and x is irrational, then r + x is irrational.

**Proof:** (by contradiction)
Suppose r is rational, x is irrational, and r + x is rational.

Since r is rational: r = a/b for integers a, b, b ≠ 0.
Since r + x is rational: r + x = c/d for integers c, d, d ≠ 0.

Then:
x = (r + x) - r = c/d - a/b = (bc - ad)/(bd)

Since bc - ad and bd are integers with bd ≠ 0, x is rational.

**Contradiction:** We assumed x is irrational.

Therefore, r + x must be irrational. □

## Example 5: Log₂(3) is Irrational

**Theorem:** log₂(3) is irrational.

**Proof:** (by contradiction)
Suppose log₂(3) is rational.

Then log₂(3) = p/q for some integers p, q with q > 0.

By definition of logarithm: 2^(p/q) = 3
Raising both sides to the power q: 2^p = 3^q

Now, 2^p is even (for any positive integer p).
And 3^q is odd (since 3 is odd, and odd^n is odd).

**Contradiction:** We have 2^p = 3^q, but one is even and one is odd.

Therefore, log₂(3) is irrational. □

## What Counts as a Contradiction?

A contradiction can be:
- Q and ¬Q for some statement Q
- 0 = 1 or similar arithmetic impossibility
- A violation of a definition or axiom
- A statement like "2 divides 1"
- Violating an assumption you made

The key is reaching a statement that is logically impossible.

## Contradiction vs. Contrapositive

| Aspect | Contrapositive | Contradiction |
|--------|---------------|---------------|
| **Assumes** | ¬Q | ¬P (or P ∧ ¬Q for implications) |
| **Derives** | ¬P | Any contradiction |
| **Proves** | P → Q | P (or P → Q) |
| **Use when** | ¬Q is informative | Need to use both P and ¬Q |

For implications, contrapositive assumes ¬Q and derives ¬P specifically. Contradiction assumes P ∧ ¬Q and derives any impossibility.

## Common Mistakes

### Mistake 1: Not Identifying the Contradiction Clearly
Always explicitly state what the contradiction is.

❌ "...and this is impossible." (Why?)
✅ "This contradicts our assumption that gcd(a,b) = 1."

### Mistake 2: Circular Reasoning
The contradiction must follow from your assumption, not be assumed.

### Mistake 3: Using Contradiction When Direct Proof Works
Contradiction should be a tool of last resort for some problems. If direct proof is straightforward, use it.

## When to Use Contradiction

Contradiction is especially useful for:
- **Impossibility/non-existence:** "There is no..."
- **Uniqueness:** "There is exactly one..."
- **Irrationality:** Proving numbers are irrational
- **Infinity:** Proving infinite sets exist
- When you need to use both P and ¬Q in the proof

## Summary

Proof by contradiction:
1. Assume the negation of what you want to prove
2. Derive a logical impossibility
3. Conclude the original statement must be true

Key applications:
- √2 is irrational
- Infinitely many primes exist
- No smallest positive rational

Remember:
- Clearly state your assumption
- Clearly identify the contradiction
- This technique is powerful but shouldn't be overused when simpler methods work
