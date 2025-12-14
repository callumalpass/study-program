## Introduction

Before software, there is hardware. Hardware is built from logic gates, which are physical implementations of Boolean Algebra. This topic bridges the gap between math and circuitry, showing you how computers "think" using simple logic rules.

**Learning Objectives:**
- Understand the behavior of basic logic gates: AND, OR, NOT, NAND, NOR, XOR
- Construct Truth Tables to analyze circuit behavior
- Simplify Boolean expressions using algebraic laws (De Morgan's, Distributive, etc.)
- Understand why NAND/NOR are "universal gates"
- Design simple circuits like Adders and Multiplexers

---

## Core Concepts

### The Basic Gates

| Gate | Symbol | Logic | Description |
|------|--------|-------|-------------|
| **NOT** | Triangle w/ circle | $\neg A$ | Inverter. 0 becomes 1, 1 becomes 0. |
| **AND** | D-shape | $A \cdot B$ | True only if ALL inputs are True. |
| **OR** | Curved D-shape | $A + B$ | True if AT LEAST ONE input is True. |
| **XOR** | OR w/ double line | $A \oplus B$ | True if inputs are DIFFERENT. |

### Universal Gates (NAND / NOR)
You can build *any* other gate using only NAND gates (or only NOR gates). This is important because NAND gates are often cheaper and faster to manufacture in silicon.

### Boolean Algebra Laws
Just like regular algebra has rules ($x(y+z) = xy + xz$), Boolean algebra has rules to simplify circuits:

1.  **Identity:** $A \cdot 1 = A$
2.  **Null:** $A \cdot 0 = 0$
3.  **Idempotent:** $A \cdot A = A$ (Doing it twice changes nothing)
4.  **Inverse:** $A \cdot \neg A = 0$ (Can't be True and False at same time)
5.  **De Morgan's Laws:**
    - $\neg(A \cdot B) = \neg A + \neg B$ (Break the line, change the sign)
    - $\neg(A + B) = \neg A \cdot \neg B$

### Combinational Logic
These are circuits where the output depends *only* on the current inputs. (e.g., an Adder).
**Example: Half Adder** (Adds two bits)
- Sum = $A \oplus B$
- Carry = $A \cdot B$

---

## Common Patterns and Idioms

### "Don't Care" Conditions
Sometimes, for certain input combinations, we don't care what the output is (maybe those inputs are impossible). We mark these as 'X' in truth tables, allowing for more simplification.

### Multiplexer (Mux)
The "Traffic Cop" of circuits. It selects one of several inputs to forward to the output, based on a "select" signal. It's the hardware equivalent of an `if/else` statement or an array lookup.

---

## Common Mistakes and Pitfalls

### Mistake 1: XOR vs OR
In English, "or" is ambiguous ("Coffee or Tea?" usually means XOR). In logic:
- OR: One or the other, or *both*.
- XOR: One or the other, but *not both*.

### Mistake 2: Bubble Blindness
The little circle (bubble) at the output of a gate means NOT.
- AND with a bubble = NAND.
- Input with a bubble = Input is inverted before entering the gate.

---

## Best Practices

1. **Draw it out:** Never try to solve complex logic in your head. Draw the circuit or write the equation.
2. **Use Truth Tables:** When in doubt, list every possible input combination (00, 01, 10, 11...) and calculate the output row by row. It's the ultimate proof.
3. **Simplify first:** Before building a circuit, simplify the equation. It saves transistors (money/power).

---

## Further Exploration

- **Karnaugh Maps (K-Maps):** A graphical method for simplifying boolean algebra without doing the math.
- **Sequential Logic:** Circuits with memory (Flip-Flops). Output depends on inputs AND past history.
- **FPGA:** Field Programmable Gate Arrays – chips where you can "code" the connections between gates!
