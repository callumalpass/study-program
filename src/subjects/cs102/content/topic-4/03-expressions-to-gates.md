---
id: cs102-t4-expressions-to-gates
title: "From Expressions to Gates"
order: 3
---

# From Boolean Expressions to Gates

A Boolean expression is an abstract specification of what a circuit should compute. Translating that expression into actual logic gates is the bridge between mathematical logic and physical hardware. This process—going from "F = (A AND B) OR NOT C" to a circuit diagram with wires and gates—is fundamental to digital design.

## The Expression-to-Circuit Pipeline

The general process for implementing a Boolean function in hardware:

1. **Specification**: Define what output is needed for each input combination (truth table)
2. **Expression**: Derive a Boolean expression that matches the specification
3. **Simplification**: Reduce the expression using Boolean algebra or K-maps
4. **Gate mapping**: Convert each operation to a physical gate
5. **Wiring**: Connect gates according to the expression structure

Each step can involve choices—there's rarely just one valid circuit for a given function.

## Direct Mapping: Expressions as Trees

Every Boolean expression has a natural tree structure:
- Variables are leaves
- Operations (AND, OR, NOT) are internal nodes
- The root is the final output

**Example**: F = (A AND B) OR (NOT C)

```
       OR
      /  \
   AND    NOT
   / \     |
  A   B    C
```

To build the circuit:
1. Create an AND gate with inputs A and B
2. Create a NOT gate with input C
3. Create an OR gate with inputs from the AND and NOT gates
4. The OR gate output is F

This direct mapping always works, but doesn't always produce optimal circuits.

## Gate Symbols and Notation

Standard gate symbols (IEEE standard):
- **AND**: Flat back, curved front (D-shape)
- **OR**: Curved back, pointed front
- **NOT**: Triangle with small circle at output
- **NAND**: AND shape with bubble at output
- **NOR**: OR shape with bubble at output
- **XOR**: OR shape with extra curved line at back

The small circle (bubble) always indicates inversion. You'll see bubbles at inputs too—an AND gate with bubbled inputs is equivalent to a NOR gate (by De Morgan's law).

## Implementing Example Expressions

### Example 1: F = A AND B

The simplest case—one AND gate with inputs A and B, output F.

### Example 2: F = (A AND B) OR (A AND C)

Method 1 (direct mapping):
- AND gate 1: inputs A, B → output T1
- AND gate 2: inputs A, C → output T2
- OR gate: inputs T1, T2 → output F

Total: 3 gates

Method 2 (after simplification):
F = A AND (B OR C)
- OR gate: inputs B, C → output T1
- AND gate: inputs A, T1 → output F

Total: 2 gates (better!)

This shows why simplification matters—it directly reduces hardware.

### Example 3: F = NOT(A AND B)

This is just a NAND gate. Direct implementation uses:
- AND gate: inputs A, B → output T1
- NOT gate: input T1 → output F

Or simply:
- NAND gate: inputs A, B → output F

Using the composite NAND gate is more efficient in hardware.

### Example 4: Majority Function

The majority function outputs 1 when at least 2 of 3 inputs are 1:

```
F = (A AND B) OR (B AND C) OR (A AND C)
```

Direct implementation:
- 3 AND gates (one for each pair)
- 1 three-input OR gate (or two 2-input OR gates)

Total: 4-5 gates depending on available gate types

## Combinational vs Sequential Logic

### Combinational Logic

In **combinational logic**, the output depends only on the current inputs. There's no memory—if you know the inputs, you know the output.

All the circuits we've discussed so far are combinational:
- AND, OR, NOT gates
- Multiplexers
- Adders
- Decoders

The defining property: the circuit is a function in the mathematical sense—same inputs always produce same outputs.

### Sequential Logic

**Sequential logic** has memory—outputs depend on both current inputs and past history (state). Sequential circuits include:
- Flip-flops and latches
- Registers
- Counters
- State machines

Sequential logic is covered more in computer architecture. For this topic, we focus on combinational logic.

### Why the Distinction Matters

When analyzing a circuit:
- Combinational: Build a truth table, derive expression, simplify
- Sequential: Need to track state transitions, timing diagrams

When debugging:
- Combinational: If inputs are correct and output is wrong, there's a gate error
- Sequential: Need to consider state history and timing

## XOR in Arithmetic Circuits

XOR has special significance in arithmetic because of its relationship to binary addition:

```
A XOR B = Sum bit (ignoring carry)
A AND B = Carry bit
```

This is the **half-adder**:
- Sum = A XOR B
- Carry = A AND B

For a **full-adder** (adding three bits A, B, and carry-in Cin):
- Sum = A XOR B XOR Cin
- Cout = (A AND B) OR ((A XOR B) AND Cin)

Multi-bit adders chain full-adders together, with each carry-out feeding the next stage's carry-in.

### XOR for Parity

XOR also computes parity—the XOR of all bits is 1 if there's an odd number of 1s:

```
Parity = B0 XOR B1 XOR B2 XOR B3 XOR ...
```

This is used for error detection in communication and storage.

## Building with Universal Gates

NAND and NOR are called universal because any Boolean function can be implemented using only that one gate type. This is practically important because:
- Manufacturing can optimize for a single gate
- Some technologies favor NAND (like flash memory) or NOR

### NAND-Only Implementations

Any gate can be built from NANDs:

**NOT A** = A NAND A
```
Connect A to both inputs of a NAND gate.
When A=0: 0 NAND 0 = 1
When A=1: 1 NAND 1 = 0
```

**A AND B** = (A NAND B) NAND (A NAND B)
```
First NAND gives NOT(A AND B).
NANDing that with itself gives NOT(NOT(A AND B)) = A AND B.
```

**A OR B** = (A NAND A) NAND (B NAND B)
```
By De Morgan: A OR B = NOT(NOT A AND NOT B)
First invert A and B using self-NANDs.
Then NAND those inversions.
```

### NOR-Only Implementations

Similarly for NOR:

**NOT A** = A NOR A

**A OR B** = (A NOR B) NOR (A NOR B)

**A AND B** = (A NOR A) NOR (B NOR B)

### Practical Implications

Real integrated circuits often use NAND or NOR as the primary building block. When you see gate counts or delays specified, they're often in terms of a base gate type.

## Multi-Level vs Two-Level Logic

### Two-Level Logic (SOP/POS)

Sum-of-Products (SOP) and Product-of-Sums (POS) produce two levels of gates:
- Level 1: AND gates (for SOP) or OR gates (for POS)
- Level 2: A single OR gate (for SOP) or AND gate (for POS)

Two-level logic has consistent, predictable delay but may use more gates.

### Multi-Level Logic

Multi-level logic has more than two layers of gates. It can reduce total gate count through factoring:

Two-level: F = (A AND B) OR (A AND C) OR (A AND D)
- 3 AND gates + 1 OR gate = 4 gates

Multi-level: F = A AND (B OR C OR D)
- 1 OR gate + 1 AND gate = 2 gates

The trade-off: multi-level may have longer delay (more gates in series) but uses fewer gates overall.

## Timing Considerations

### Propagation Delay

Every gate takes time to switch—this is **propagation delay**, typically measured in nanoseconds or picoseconds. The total delay through a circuit is the delay along the longest path (the **critical path**).

For a chain of gates: Total delay ≈ (number of gates) × (delay per gate)

### Circuit Depth

The **depth** of a circuit is the maximum number of gates between any input and the output. Lower depth means faster circuits.

Two-level logic has depth 2. Multi-level logic might have depth 3, 4, or more.

### Speed-Area Trade-off

Often you can trade between:
- Fewer gates (smaller area, lower power) with more levels (slower)
- More gates (larger area, higher power) with fewer levels (faster)

Circuit optimization balances these factors based on requirements.

## Reading and Drawing Circuit Diagrams

### Reading Diagrams

1. Identify all inputs (typically on the left or top)
2. Trace each signal through the gates
3. Identify intermediate signals at gate outputs
4. Find the final output(s)

For each input combination, work through what each gate outputs.

### Drawing Diagrams

1. Start from the expression tree
2. Place gates left-to-right (inputs to outputs)
3. Draw wires connecting gate outputs to gate inputs
4. Label signals for clarity
5. Avoid crossing wires where possible (use dots to show connections)

Good diagrams flow left-to-right and minimize wire crossings.

## Key Takeaways

- Boolean expressions map directly to gate circuits—each operation becomes a gate.
- The expression tree structure guides the wiring: leaves are inputs, nodes are gates.
- **Simplification reduces gates**—always simplify before implementing.
- **Combinational logic** has no memory; output depends only on current inputs.
- **XOR** is central to arithmetic: Sum = A XOR B, Carry = A AND B.
- **NAND and NOR are universal**—any function can be built with just one type.
- **Two-level logic** (SOP/POS) has predictable delay; **multi-level** can save gates.
- **Critical path** determines circuit speed; fewer gate levels means faster operation.
- Good circuit diagrams flow left-to-right and clearly label signals.

