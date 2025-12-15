# Memory and Addressing (Conceptual)

Programs operate on memory through addresses. Understanding addressing helps explain pointers, arrays, and low-level bugs.

## Memory as an array of bytes

Conceptually, memory is a large array where each location has an address:

`Mem[address] -> byte`

Larger values (like 32-bit integers) occupy multiple consecutive bytes. Endianness determines byte order.

## Loads and stores

The CPU typically cannot “compute on memory directly”. Instead:
- **load**: bring data from memory into a register
- **store**: write data from a register back to memory

This load/store model is especially visible in RISC architectures.

## Addressing modes (high-level)

An instruction may specify operands via:
- register (use value in register)
- immediate (literal constant encoded in instruction)
- memory address (direct or indirect)

Examples (conceptual):
- `ADD R1, R2` (register)
- `ADD R1, #5` (immediate)
- `LOAD R1, [R2]` (indirect through R2)

## Key takeaways

- Memory is byte-addressed; multi-byte types span multiple addresses.
- CPUs operate primarily on registers; memory values are loaded/stored.
- Addressing modes define how an instruction finds its operands.

