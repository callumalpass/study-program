# Boolean Algebra Identities (Simplification)

Boolean algebra provides rules for simplifying logic expressions. Simplification reduces gate count, lowers cost, and can improve speed.

## Core identities

### Identity laws

- `A AND 1 = A`
- `A OR 0 = A`

### Null laws

- `A AND 0 = 0`
- `A OR 1 = 1`

### Idempotent laws

- `A AND A = A`
- `A OR A = A`

### Complement laws

- `A AND NOT A = 0`
- `A OR NOT A = 1`

### Double negation

- `NOT(NOT A) = A`

## De Morgan’s laws

These are among the most important:

- `NOT(A AND B) = (NOT A) OR (NOT B)`
- `NOT(A OR B) = (NOT A) AND (NOT B)`

They explain why NAND and NOR can implement arbitrary logic.

## Example simplification

Simplify:

`(A AND B) OR (A AND NOT B)`

Factor out `A`:

`A AND (B OR NOT B)`

But `B OR NOT B = 1`, so:

`A AND 1 = A`

So the expression simplifies to `A`.

## Key takeaways

- Boolean identities let you simplify expressions systematically.
- De Morgan’s laws are essential for transforming and implementing logic.
- Simplification is both a reasoning tool (for exams) and a design tool (for circuits).

