# The Instruction Cycle (Fetch → Decode → Execute)

Every instruction the CPU runs goes through a cycle. Different architectures implement it differently (pipelines, out-of-order execution), but the conceptual steps are consistent.

## Step 1: Fetch

The CPU uses the **Program Counter (PC)** to locate the next instruction in memory.

Typical conceptual registers:
- **PC**: address of next instruction
- **IR** (Instruction Register): holds the fetched instruction
- **MAR** (Memory Address Register): address being accessed
- **MDR** (Memory Data Register): data being transferred to/from memory

Fetch conceptually looks like:
1. `MAR ← PC`
2. `IR ← Mem[MAR]`
3. `PC ← PC + instruction_length`

## Step 2: Decode

The CPU interprets the instruction fields:
- opcode (what operation)
- operands (which registers, immediate values, memory addressing mode)

The **control unit** determines which signals to assert in the datapath.

## Step 3: Execute

The CPU performs the work:
- ALU operations (add, subtract, compare, shift)
- loads and stores (read/write memory)
- branches/jumps (update PC based on condition)

## Control flow impact

Branches change the PC in non-sequential ways. That is why pipelines can have **control hazards**: the CPU may not know the next instruction until the branch condition is resolved.

## Key takeaways

- Instruction execution is a pipeline of conceptual steps, even if real CPUs overlap them.
- PC + IR are central to control flow: they decide “what runs next”.
- Branching complicates prediction and performance, motivating later concepts like pipelining and caching.

