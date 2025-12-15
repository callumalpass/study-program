# From Boolean Expressions to Gates

Once you have a Boolean expression, you can implement it using logic gates. This is how “specification” becomes “circuit”.

## Example: implement F = (A AND B) OR (NOT C)

Steps:
1. Compute `A AND B` (AND gate)
2. Compute `NOT C` (NOT gate)
3. OR the two results (OR gate)

This produces a straightforward circuit that mirrors the expression tree.

## Combinational logic vs sequential logic

In this topic, we focus on **combinational logic**:
- Output depends only on current inputs

Sequential logic (which includes memory elements like flip-flops) is a different layer; you’ll see the “memory” idea again when talking about architecture and state.

## XOR in arithmetic

XOR is a natural gate for “different bits”, and it appears in adders:
- Sum bit for a half-adder is `A XOR B`
- Carry bit is `A AND B`

This connection is why Boolean logic is not separate from arithmetic: the ALU is built from these gates.

## Building with NAND only (conceptual)

Because NAND is universal, you can rewrite:
- `NOT A` as `A NAND A`
- `A AND B` as `NOT(A NAND B)`
- `A OR B` via De Morgan: `NOT(NOT A AND NOT B)`

You don’t need to do this constantly, but it helps explain why “universal” matters.

## Key takeaways

- Boolean expressions map naturally to gate-level circuits.
- XOR/AND show up directly in addition logic.
- Universal gates (NAND/NOR) can implement any combinational function.

