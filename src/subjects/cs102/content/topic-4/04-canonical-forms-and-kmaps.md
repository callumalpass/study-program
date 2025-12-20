---
id: cs102-t4-canonical-forms-and-kmaps
title: "Canonical Forms and K-Maps"
order: 4
---

# Canonical Forms and Karnaugh Maps

When designing logic circuits, we need systematic ways to derive expressions from truth tables and simplify them. **Canonical forms** provide standard representations that directly correspond to truth tables, while **Karnaugh maps** (K-maps) offer a visual simplification technique that's faster than algebraic manipulation for small functions.

## Why Canonical Forms?

A Boolean function can be expressed in many equivalent ways. Canonical forms provide a unique, standard representation tied directly to the truth table. This makes it easy to:
- Convert any truth table to an expression
- Compare two functions for equality
- Serve as a starting point for simplification

There are two main canonical forms: Sum of Products (SOP) and Product of Sums (POS).

## Minterms and Maxterms

### Minterms

A **minterm** is an AND term that includes every variable exactly once (either complemented or uncomplemented). For N variables, there are 2^N minterms, one for each row of the truth table.

A minterm evaluates to 1 for exactly one input combination—the one where each variable matches its form in the term.

**Example** (3 variables A, B, C):
- Minterm m₀ = A'B'C' (true only when A=0, B=0, C=0)
- Minterm m₁ = A'B'C (true only when A=0, B=0, C=1)
- Minterm m₃ = A'BC (true only when A=0, B=1, C=1)
- Minterm m₇ = ABC (true only when A=1, B=1, C=1)

The subscript is the decimal value of the input combination. For row (A=0, B=1, C=1), the binary value is 011 = 3, so the minterm is m₃.

### Maxterms

A **maxterm** is an OR term that includes every variable exactly once. A maxterm evaluates to 0 for exactly one input combination.

**Example** (3 variables A, B, C):
- Maxterm M₀ = A+B+C (false only when A=0, B=0, C=0)
- Maxterm M₃ = A+B'+C' (false only when A=0, B=1, C=1)
- Maxterm M₇ = A'+B'+C' (false only when A=1, B=1, C=1)

Notice the complementation is opposite to minterms: where a minterm has the variable uncomplemented (e.g., A), the corresponding maxterm has it complemented (A'), and vice versa.

### Relationship

Minterms and maxterms are De Morgan duals:
```
Mᵢ = NOT(mᵢ)
mᵢ = NOT(Mᵢ)
```

## Sum of Products (SOP)

**Sum of Products** form is an OR of AND terms. In canonical SOP (also called minterm form), each AND term is a minterm.

### Deriving Canonical SOP from Truth Table

1. Find all rows where output = 1
2. For each such row, write the minterm
3. OR all the minterms together

**Example**: Function F with truth table

| A | B | F |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

Rows with F=1: (0,0), (1,0), (1,1) → minterms m₀, m₂, m₃

Canonical SOP:
```
F = A'B' + AB' + AB
F = m₀ + m₂ + m₃
F = Σm(0, 2, 3)
```

The notation Σm(0, 2, 3) means "sum of minterms 0, 2, and 3."

### Non-Canonical SOP

Any OR of AND terms is SOP, even if the terms aren't minterms:
```
F = A'B' + AB' + AB  (canonical)
F = A' + A          (non-canonical, simplified)
```

Both represent the same function, but only the first is in canonical form.

## Product of Sums (POS)

**Product of Sums** form is an AND of OR terms. In canonical POS (also called maxterm form), each OR term is a maxterm.

### Deriving Canonical POS from Truth Table

1. Find all rows where output = 0
2. For each such row, write the maxterm
3. AND all the maxterms together

**Example** (same function F):

Row with F=0: (0,1) → maxterm M₁

Canonical POS:
```
F = (A + B')
F = M₁
F = ΠM(1)
```

The notation ΠM(1) means "product of maxterm 1."

### Verifying Equivalence

Both forms represent the same function. You can verify by checking:
- SOP gives F=1 for exactly the 1-rows
- POS gives F=0 for exactly the 0-rows

## Converting Between Forms

### SOP to POS

Given F = Σm(0, 2, 3) for a 2-variable function:
- Total minterms: 0, 1, 2, 3
- Minterms in F: 0, 2, 3
- Missing minterms: 1
- POS uses maxterms for missing minterms: F = ΠM(1)

### POS to SOP

Given F = ΠM(1, 2) for a 2-variable function:
- Total maxterms: 0, 1, 2, 3
- Maxterms in F: 1, 2
- Missing maxterms: 0, 3
- SOP uses minterms for missing maxterms: F = Σm(0, 3)

### Complementing Functions

The complement of F can be found easily:
- If F = Σm(0, 2, 3), then F' = Σm(1) (the unused minterms)
- If F = ΠM(1), then F' = ΠM(0, 2, 3) (the unused maxterms)

## Karnaugh Maps (K-Maps)

K-maps are a visual technique for simplifying Boolean functions. They arrange the truth table in a 2D grid where adjacent cells differ by exactly one bit (Gray code ordering). This makes it easy to spot simplification opportunities.

### 2-Variable K-Map

For function F(A, B):

```
      B=0   B=1
    +-----+-----+
A=0 | m₀  | m₁  |
    +-----+-----+
A=1 | m₂  | m₃  |
    +-----+-----+
```

Fill in 1s and 0s according to the truth table.

### 3-Variable K-Map

For function F(A, B, C):

```
        BC=00  BC=01  BC=11  BC=10
      +------+------+------+------+
A=0   |  m₀  |  m₁  |  m₃  |  m₂  |
      +------+------+------+------+
A=1   |  m₄  |  m₅  |  m₇  |  m₆  |
      +------+------+------+------+
```

Notice the column order: 00, 01, 11, 10 (Gray code). Adjacent columns differ by one bit, and the map wraps around (leftmost and rightmost columns are adjacent).

### 4-Variable K-Map

For function F(A, B, C, D):

```
        CD=00  CD=01  CD=11  CD=10
      +------+------+------+------+
AB=00 |  m₀  |  m₁  |  m₃  |  m₂  |
      +------+------+------+------+
AB=01 |  m₄  |  m₅  |  m₇  |  m₆  |
      +------+------+------+------+
AB=11 |  m₁₂ |  m₁₃ |  m₁₅ |  m₁₄ |
      +------+------+------+------+
AB=10 |  m₈  |  m₉  |  m₁₁ |  m₁₀ |
      +------+------+------+------+
```

Both rows and columns use Gray code. The map wraps around both horizontally and vertically (top/bottom rows are adjacent, as are left/right columns).

## K-Map Simplification Process

### Step 1: Fill the K-Map

Transfer the truth table values into the K-map cells. Place 1s where output is 1, 0s (or leave blank) where output is 0.

### Step 2: Group the 1s

Form groups of adjacent 1s following these rules:
- Groups must be rectangular (1×1, 1×2, 2×2, 1×4, 2×4, 4×4, etc.)
- Group sizes must be powers of 2 (1, 2, 4, 8, 16)
- Groups can wrap around edges
- Every 1 must be in at least one group
- Make groups as large as possible
- Minimize the number of groups
- Groups can overlap (same 1 in multiple groups is okay)

### Step 3: Read the Product Terms

For each group:
- Find variables that stay constant within the group
- If a variable is always 1 in the group, include it uncomplemented
- If a variable is always 0 in the group, include it complemented
- If a variable changes within the group, omit it

### Step 4: OR the Product Terms

The simplified SOP is the OR of all product terms from Step 3.

## K-Map Example

Simplify F(A, B, C) = Σm(0, 2, 4, 5, 6)

**Step 1**: Fill the K-map

```
        BC=00  BC=01  BC=11  BC=10
      +------+------+------+------+
A=0   |  1   |  0   |  0   |  1   |
      +------+------+------+------+
A=1   |  1   |  1   |  0   |  1   |
      +------+------+------+------+
```

**Step 2**: Group the 1s

Group 1: All four corners (m₀, m₂, m₄, m₆) - this is valid because K-maps wrap!
Group 2: m₄, m₅ (adjacent pair in bottom row)

**Step 3**: Read product terms

Group 1 (corners): C stays 0 throughout → Product term: C'
Group 2 (m₄, m₅): A=1 throughout, B=0 throughout → Product term: AB'

**Step 4**: Final result

```
F = C' + AB'
```

Compare to the unsimplified canonical SOP with 5 minterms—K-maps found a much simpler form.

## Don't Care Conditions

Sometimes certain input combinations can never occur, or we don't care what the output is for them. These are marked as "X" (don't care) in K-maps.

Don't cares can be treated as either 1 or 0, whichever helps form larger groups. This often enables further simplification.

**Example**: In a BCD (Binary Coded Decimal) system, values 10-15 never occur. Marking them as don't cares allows more aggressive simplification.

## Limitations of K-Maps

K-maps become unwieldy beyond 5-6 variables:
- 5 variables: Two 4-variable maps or a 3D representation
- 6+ variables: Better to use tabular methods (Quine-McCluskey algorithm)

For complex functions, computer-aided design tools handle minimization automatically.

## Key Takeaways

- **Minterms** are AND terms true for exactly one row; **maxterms** are OR terms false for exactly one row.
- **Canonical SOP** (Σm): OR of minterms where output is 1.
- **Canonical POS** (ΠM): AND of maxterms where output is 0.
- Canonical forms provide unique representations directly from truth tables.
- **K-maps** arrange truth tables so adjacent cells differ by one bit (Gray code).
- K-map simplification: group 1s in powers of 2, read constant variables, OR the results.
- **Don't cares** (X) can be 0 or 1—use whichever enables larger groups.
- K-maps are practical for 2-4 variables; use algorithms or tools for larger functions.
- Simplification reduces gates, power, and delay in physical circuits.

