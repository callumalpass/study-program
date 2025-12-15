# Truth Tables and Basic Logic Gates

Boolean logic is the language of digital circuits. A **logic gate** implements a Boolean function: it takes binary inputs (0/1) and produces a binary output.

## Boolean values and operators

We use:
- `0` for false, `1` for true
- `NOT` (negation)
- `AND`
- `OR`
- `XOR` (exclusive OR)

## Truth tables

A truth table lists outputs for all input combinations. For two inputs, there are 4 rows.

### AND

| A | B | A AND B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    0    |
| 1 | 0 |    0    |
| 1 | 1 |    1    |

### OR

| A | B | A OR B |
|---|---|--------|
| 0 | 0 |   0    |
| 0 | 1 |   1    |
| 1 | 0 |   1    |
| 1 | 1 |   1    |

### XOR

XOR is 1 when inputs differ:

| A | B | A XOR B |
|---|---|---------|
| 0 | 0 |    0    |
| 0 | 1 |    1    |
| 1 | 0 |    1    |
| 1 | 1 |    0    |

## NAND and NOR (universal gates)

NAND = NOT(AND), NOR = NOT(OR).

These are called **universal gates** because you can build any Boolean function using only NANDs or only NORs. This matters because real hardware constraints sometimes favor a single gate type.

## Key takeaways

- Truth tables are the definitive specification of a Boolean function.
- AND/OR/NOT are fundamental; XOR is common in arithmetic and parity logic.
- NAND and NOR are universal building blocks.

