---
id: math101-t2-strategies
title: "Proof Strategies and Best Practices"
order: 7
---

# Proof Strategies and Best Practices

## Choosing the Right Technique

Different proof techniques suit different problems. Here's a decision guide:

### Decision Tree

1. **What form is the statement?**
   - "For all n ∈ ℕ..." → Consider **induction**
   - "If P, then Q" → Consider **direct**, **contrapositive**, or **contradiction**
   - "There is no..." or "... is impossible" → Consider **contradiction**
   - "There exists..." → Consider **construction** (find an example)
   - "P if and only if Q" → Prove **both directions**

2. **What information do you have?**
   - Hypothesis P gives useful structure → Try **direct proof**
   - Negation ¬Q gives useful structure → Try **contrapositive**
   - Need to use both P and ¬Q → Try **contradiction**

3. **What's the domain?**
   - Natural numbers → **Induction** is likely useful
   - Real numbers → Often **direct** or **contradiction**
   - Sets → Depends on the specific claim

## Proof by Cases (Exhaustion)

When a statement holds for different reasons in different scenarios, divide into cases.

```
Theorem: P

Proof: We consider all cases.

Case 1: [Condition A]
[Proof that P holds when A is true]

Case 2: [Condition B]
[Proof that P holds when B is true]

...

Since the cases are exhaustive, P holds in all situations. □
```

### Example: n² ≥ n for all integers n

**Proof:** We consider three cases.

**Case 1: n < 0**
Then n² > 0 > n, so n² ≥ n. ✓

**Case 2: n = 0**
Then n² = 0 = n, so n² ≥ n. ✓

**Case 3: n > 0**
Then n ≥ 1, so n² = n · n ≥ n · 1 = n. ✓

Since every integer is negative, zero, or positive, the theorem holds. □

## Existence Proofs

### Constructive Existence
Explicitly exhibit an object with the desired property.

**Theorem:** There exists a prime greater than 100.

**Proof:** 101 is prime (check: not divisible by 2, 3, 5, 7; √101 < 11).
Therefore, there exists a prime greater than 100. □

### Non-Constructive Existence
Prove an object exists without finding it explicitly.

**Theorem:** There exist irrational numbers a and b such that a^b is rational.

**Proof:**
Consider √2^√2.

**Case 1:** √2^√2 is rational.
Then a = b = √2 works. ✓

**Case 2:** √2^√2 is irrational.
Let a = √2^√2 and b = √2.
Then a^b = (√2^√2)^√2 = √2^(√2·√2) = √2^2 = 2, which is rational. ✓

In either case, such a and b exist (though we don't know which case holds!). □

## Disproving Statements (Counterexamples)

To disprove "For all x, P(x)", find one x where P(x) is false.

**Claim (false):** All prime numbers are odd.

**Disproof:** 2 is prime and even. □

One counterexample is sufficient to disprove a universal statement.

## Uniqueness Proofs

To prove "there exists a unique x with property P":
1. **Existence:** Show at least one such x exists
2. **Uniqueness:** Show that if x and y both have property P, then x = y

**Theorem:** For any positive real number a, there is a unique positive real number x such that x² = a.

**Proof:**
**Existence:** By properties of real numbers, √a exists and (√a)² = a.

**Uniqueness:** Suppose x² = a and y² = a with x, y > 0.
Then x² = y², so x² - y² = 0, so (x-y)(x+y) = 0.
Since x, y > 0, we have x + y > 0, so x + y ≠ 0.
Therefore x - y = 0, so x = y. □

## Writing Good Proofs

### Structure
1. **State what you're proving** — Clearly write the theorem
2. **State your approach** — "Proof by induction" or "We prove the contrapositive"
3. **Proceed step by step** — Each step justified
4. **Conclude** — Restate what you've proven, end with □

### Language
- Use "Let x be..." to introduce variables
- Use "Assume..." for hypotheses
- Use "Then...", "Therefore...", "Thus..." for conclusions
- Use "By [theorem/definition]..." for justification

### Common Phrases

| Purpose | Phrases |
|---------|---------|
| Introducing | "Let x be...", "Suppose...", "Assume..." |
| Concluding | "Therefore...", "Thus...", "Hence...", "So..." |
| Justifying | "By definition...", "By the inductive hypothesis...", "By [theorem name]..." |
| Cases | "Case 1:", "Otherwise...", "If... then..." |
| Contradiction | "Suppose, for the sake of contradiction, that...", "This contradicts..." |

## Debugging Failed Proofs

### If Your Proof Doesn't Work:

1. **Check examples**: Does the statement even seem true for specific cases?
2. **Check definitions**: Are you using definitions correctly?
3. **Try a different technique**: Maybe direct proof isn't right; try contrapositive
4. **Look for hidden assumptions**: Did you assume something without justifying it?
5. **Consider if the statement is false**: Try to find a counterexample

### Common Errors

| Error | Fix |
|-------|-----|
| Assuming what you're proving | Be clear about hypothesis vs. conclusion |
| Not using the hypothesis | Your proof should depend on given information |
| Incomplete cases | Make sure cases are exhaustive |
| Wrong negation | Apply De Morgan's laws carefully |
| Arithmetic errors | Double-check calculations |
| Forgetting base case | Induction needs a starting point |

## Practice Strategy

1. **Read many proofs**: Understand how experts structure arguments
2. **Start with simple examples**: Verify the statement for small cases
3. **Identify the key insight**: What's the crucial observation?
4. **Write a rough draft**: Get ideas down, then polish
5. **Review and revise**: Check logic, fill gaps, improve clarity

## Quick Reference: Technique Summary

| Technique | Use When | Structure |
|-----------|----------|-----------|
| **Direct** | P gives useful info | Assume P, derive Q |
| **Contrapositive** | ¬Q gives useful info | Assume ¬Q, derive ¬P |
| **Contradiction** | Need P ∧ ¬Q, or proving impossibility | Assume negation, derive impossibility |
| **Induction** | Statement about all n ∈ ℕ | Base case + inductive step |
| **Strong Induction** | Need multiple previous cases | Multiple base cases + strong IH |
| **Cases** | Different scenarios need different arguments | Exhaustive case analysis |
| **Construction** | Proving existence | Exhibit a specific example |
| **Counterexample** | Disproving universal claims | Find one failure |

## Summary

Mastering proof techniques requires practice. Key takeaways:

1. **Match technique to problem**: Different statements suggest different approaches
2. **Be explicit**: State your method, justify your steps
3. **Be complete**: Cover all cases, don't skip steps
4. **Be precise**: Use correct definitions and logical rules
5. **Be persistent**: If one approach fails, try another

Proof writing is a skill developed through practice. The more proofs you read and write, the better your intuition becomes for choosing the right technique and constructing clear, rigorous arguments.
