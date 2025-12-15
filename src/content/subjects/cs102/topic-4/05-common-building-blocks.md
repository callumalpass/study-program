# Common Circuit Building Blocks

Instead of designing everything from scratch, digital systems reuse standard building blocks.

## Multiplexer (MUX)

A MUX selects one of many inputs based on selector bits.

Example: a 2-to-1 MUX selects `X` or `Y`:

`Out = (NOT S AND X) OR (S AND Y)`

MUXes are everywhere: they route data between registers, ALU inputs, and buses.

## Decoder and encoder

- A **decoder** converts an N-bit input into `2^N` outputs (one-hot).
- An **encoder** performs the inverse (often with priority rules).

Decoders are used to select registers or interpret instruction fields.

## Adders (half and full)

Half-adder:
- Sum = `A XOR B`
- Carry = `A AND B`

Full-adder adds three bits (A, B, Carry-in). Full adders chain together to build multi-bit adders in the ALU.

## Comparators (conceptual)

Comparators determine if one value is greater/less/equal. At the bit level, they’re built from XOR/XNOR and AND/OR combinations across bit positions.

## Key takeaways

- MUXes route data; decoders select resources; adders implement arithmetic.
- These building blocks are the “vocabulary” of CPU datapaths and control logic.
- Understanding them bridges Boolean algebra and computer architecture.

