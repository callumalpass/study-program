# Register File Design

The **register file** is a small, fast memory structure that holds the processor's general-purpose registers. It's a critical component that must support simultaneous read and write operations with minimal delay.

## Register File Requirements

A typical RISC register file must support:

- **Two simultaneous reads**: For two source operands
- **One write**: For the destination operand
- **Fast access**: Must complete within a fraction of the clock cycle
- **32 registers**: Standard for MIPS, ARM, RISC-V (64 for x86-64)
- **32/64 bits per register**: Word size of the architecture

## Basic Structure

```
                  ┌───────────────────────────────────────────────┐
                  │              Register File                     │
                  │                                                │
Read Register 1 ──┼──►┌───────────┐                               │
    (5 bits)      │   │  Read     │──► Read Data 1 (32 bits)      │
                  │   │  Port 1   │                               │
                  │   └───────────┘                               │
                  │                                                │
Read Register 2 ──┼──►┌───────────┐                               │
    (5 bits)      │   │  Read     │──► Read Data 2 (32 bits)      │
                  │   │  Port 2   │                               │
                  │   └───────────┘                               │
                  │                                                │
Write Register ───┼──►┌───────────┐                               │
    (5 bits)      │   │  Write    │                               │
                  │   │  Port     │                               │
Write Data ───────┼──►│           │                               │
    (32 bits)     │   │           │                               │
                  │   └───────────┘                               │
RegWrite ─────────┼─────────────────────────────────────────────►│
    (1 bit)       │                                                │
                  └───────────────────────────────────────────────┘
```

## Implementation Details

### Register Storage

Each register is implemented as a collection of **D flip-flops**:

```
32-bit Register:
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│ D   │ D   │ D   │ D   │ ... │ D   │ D   │ D   │
│ F/F │ F/F │ F/F │ F/F │     │ F/F │ F/F │ F/F │
│ 31  │ 30  │ 29  │ 28  │     │ 2   │ 1   │ 0   │
└──┬──┴──┬──┴──┬──┴──┬──┴─────┴──┬──┴──┬──┴──┬──┘
   │     │     │     │           │     │     │
   Q31   Q30   Q29   Q28        Q2    Q1    Q0
```

All flip-flops share:
- Same clock signal
- Same write enable (for this register)

### Write Logic

Write addressing uses a **decoder** to select which register to write:

```
Write Register ──►┌─────────────────┐
   (5 bits)       │    5-to-32      │
                  │    Decoder      │
                  └───────┬─────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
         ▼                ▼                ▼
    ┌────────┐       ┌────────┐       ┌────────┐
    │ Reg 0  │       │ Reg 1  │  ...  │ Reg 31 │
    │ Enable │       │ Enable │       │ Enable │
    └────────┘       └────────┘       └────────┘
```

The enable signal for register i:
```
Enable[i] = RegWrite AND Decode[i]
```

### Read Logic

Read addressing uses **multiplexers** to select which register to output:

```
                   Reg 0  Reg 1  Reg 2  ... Reg 31
                     │      │      │          │
                     ▼      ▼      ▼          ▼
              ┌──────────────────────────────────────┐
              │         32-to-1 Multiplexer          │
              │              (per bit)               │
              └─────────────────┬────────────────────┘
                                │
                                ▼
Read Register ────────────► Read Data
  (5 bits)
```

For 32 bits wide, we need 32 parallel 32-to-1 muxes.

## Timing Considerations

### Read Path

Reading is **combinational**—no clock required:

```
Time for read = Decoder delay + MUX delay
             ≈ 50-100 ps in modern technology
```

This allows reading to happen early in the clock cycle.

### Write Path

Writing is **sequential**—occurs on clock edge:

```
Setup time: Data must be stable before clock edge
Hold time:  Data must remain stable briefly after clock edge
```

Write happens at the end of the clock cycle:
1. Address decoded
2. Data driven to selected register
3. Clock edge triggers write

### Read-During-Write Behavior

What happens when reading and writing the same register in one cycle?

**Option 1: Read old value** (most common)
- Write takes effect on clock edge
- Read sees value before the write

**Option 2: Forward new value** (write-through)
- Read sees the value being written
- Requires forwarding logic

```
                 Write Data
                     │
                     ▼
              ┌──────────────┐
              │    MUX       │◄── Forward Enable
              │  (forward)   │    (ReadReg == WriteReg AND RegWrite)
              └───────┬──────┘
                      │
                      ▼
Read Data ◄───────────┘
(from register or forwarded)
```

## Special Register: $zero

MIPS, RISC-V, and similar architectures have a register hardwired to zero:

```
Register 0 = 0 (always)
```

Implementation:
- **Read**: Always returns 0 (ignore actual storage)
- **Write**: Ignored (does nothing)

```
if (ReadReg == 0)
    ReadData = 0
else
    ReadData = RegisterFile[ReadReg]
```

## Register File Variations

### Different Register Counts

| Architecture | GP Registers | Register Bits |
|--------------|--------------|---------------|
| MIPS | 32 | 5 |
| ARM AArch64 | 31 + XZR | 5 |
| x86-64 | 16 | 4 |
| RISC-V | 32 | 5 |

### Multiple Write Ports

Superscalar processors may need multiple simultaneous writes:

```
Write Port 1 ─►┌─────────────────┐
               │                 │
Write Port 2 ─►│  Register File  │
               │                 │
               └─────────────────┘
```

Each additional port increases:
- Decoder complexity
- Routing congestion
- Power consumption

### Register Windows (SPARC)

SPARC uses **register windows** for fast function calls:

```
┌────────────────────────┐
│  Global Registers      │ (always visible)
├────────────────────────┤
│  Window N   (current)  │
├────────────────────────┤
│  Window N-1 (caller)   │ (overlap for parameter passing)
├────────────────────────┤
│  Window N-2            │
└────────────────────────┘
```

On function call, shift the window pointer instead of saving/restoring registers.

## Performance Optimization

### Port Reduction

Reduce ports by time-multiplexing:

```
Cycle Phase 1: Read operand 1
Cycle Phase 2: Read operand 2
Cycle Phase 3: Write result
```

### Banking

Divide registers into banks for parallel access:

```
Bank 0: Registers 0-7
Bank 1: Registers 8-15
Bank 2: Registers 16-23
Bank 3: Registers 24-31
```

Each bank can be accessed independently if operands are in different banks.

### Bypass/Forwarding

Instead of reading from register file, forward from later pipeline stages:

```
    EX/MEM Register ──►┌───────────┐
                       │  Forward  │
    MEM/WB Register ──►│   MUX     │──► To ALU
                       │           │
    Register File ────►└───────────┘
```

Reduces effective register file access time for dependent instructions.

## Power Considerations

Register file access consumes significant power:

- **Read power**: Driving data onto buses
- **Write power**: Charging/discharging flip-flops
- **Leakage power**: Always present in flip-flops

Techniques to reduce power:
- **Clock gating**: Don't clock unused registers
- **Bit-line power-down**: Reduce voltage on inactive reads
- **Register file partitioning**: Only access needed portion

## Key Takeaways

- Register file provides fast, multi-port access to processor registers
- Implemented with flip-flops, decoders (write), and muxes (read)
- Two read ports and one write port is typical for RISC
- Reads are combinational; writes are sequential (clock-triggered)
- Special register zero is hardwired to always read as 0
- Multiple ports increase complexity, area, and power
- Forwarding can bypass the register file for recent results
- Register file design significantly impacts processor performance and power
