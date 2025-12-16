# Designing PDAs

Designing PDAs requires understanding how the stack can track structural information. Common patterns and techniques help construct correct automata.

## Design Principles

### 1. Stack as Counter
For counting languages like {aⁿbⁿ}:
- Push symbol for each 'a'
- Pop symbol for each 'b'
- Accept when counts match (stack empty)

### 2. Stack as Memory
For palindromes like {wwᴿ}:
- Push first half onto stack
- Pop and match second half
- Nondeterministically guess the middle

### 3. Stack for Nesting
For nested structures like balanced brackets:
- Push opening symbols
- Pop for matching closing symbols
- Stack tracks nesting depth and order

## Template: Matching Languages

For L = {aⁿbⁿ | n ≥ 1}:

```
States: {q_push, q_pop, q_accept}
Stack: {Z₀, A}

q_push: read 'a', push A
q_push → q_pop: read 'b', pop A (start matching)
q_pop: read 'b', pop A
q_pop → q_accept: ε, pop Z₀ (done)
```

## Template: Palindromes

For L = {wwᴿ | w ∈ {a,b}*}:

```
States: {q_push, q_pop}
Stack: {Z₀, A, B}

q_push: read 'a', push A; read 'b', push B
q_push → q_pop: ε (guess middle)
q_pop: read 'a', pop A; read 'b', pop B
q_pop: ε, pop Z₀ → accept
```

Nondeterminism guesses where the middle is.

## Template: Odd Palindromes

For L = {wcwᴿ | w ∈ {a,b}*} (c marks middle):

```
States: {q_push, q_pop}

q_push: read 'a', push A; read 'b', push B
q_push → q_pop: read 'c' (deterministic middle)
q_pop: read 'a', pop A; read 'b', pop B
```

The middle marker makes it deterministic!

## Template: Nested Structures

For balanced parentheses with types:

```
States: {q}
Stack: {Z₀, (, [, {}

q: read '(', push '('
q: read '[', push '['
q: read ')', pop '('
q: read ']', pop '['
Accept by empty stack
```

## Handling ε-productions

When grammar has S → ε:
- PDA needs to accept empty string
- Add ε-transition from start to accept

## Common Mistakes

1. **Forgetting stack bottom marker**: Can't detect when to stop
2. **Missing nondeterminism**: Some CFLs require guessing
3. **Wrong stack order**: Remember LIFO
4. **Incomplete transitions**: Handle all cases

## Debugging PDAs

Test with:
- Empty string (if in language)
- Shortest strings in L
- Shortest strings not in L
- Edge cases

Trace configurations step by step.

## Converting Design to Formal PDA

1. List states and their meanings
2. Define stack alphabet (what do you need to remember?)
3. Write transitions for each case
4. Verify: does every string in L have accepting computation?
5. Verify: does every accepting computation correspond to string in L?

## Example: {aⁱbʲcᵏ | i=j or j=k}

Requires nondeterminism:
- Guess which equality holds
- If i=j: match a's and b's
- If j=k: ignore a's, match b's and c's

Cannot be done deterministically—this language is not a DCFL.
