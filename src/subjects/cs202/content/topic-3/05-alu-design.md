# ALU Design

The **Arithmetic Logic Unit (ALU)** is the computational heart of the processor, performing all arithmetic and logical operations. Understanding ALU design reveals how basic operations are implemented in hardware.

## ALU Overview

The ALU takes two operands and produces a result based on a control signal:

```
          ┌─────────────────────────────────┐
Operand A │                                 │
 (n bits) │                                 │──► Result (n bits)
──────────►                                 │
          │           ALU                   │──► Zero flag
Operand B │                                 │
 (n bits) │                                 │──► Overflow flag
──────────►                                 │
          │                                 │──► Carry flag
Operation │                                 │
──────────►                                 │──► Negative flag
          └─────────────────────────────────┘
```

## Basic Building Blocks

### 1-Bit ALU

A 1-bit ALU for AND and OR:

```
        a ────┬───────────────────────┐
              │                       │
        b ────┼──┬────────────────────┼────┐
              │  │                    │    │
           ┌──▼──▼──┐             ┌──▼────▼──┐
           │  AND   │             │   OR     │
           └───┬────┘             └───┬──────┘
               │                      │
               │    ┌─────────────┐   │
               └───►│    MUX      │◄──┘
                    │ Operation   │
                    └─────┬───────┘
                          │
                       Result
```

### Adding Addition

For addition, we need a **full adder**:

```
     a ──────┬──────────────────────────────────┐
             │                                  │
     b ──────┼──────┬───────────────────────────┼───┐
             │      │                           │   │
          ┌──▼──────▼──┐                       │   │
          │  Full      │                       │   │
Carry In ─►  Adder     │                       │   │
          │            ├──► Sum                │   │
          └──────┬─────┘                       │   │
                 │                          ┌──▼───▼──┐
              Carry Out                     │   AND   │
                                            └───┬─────┘
                                                │
                                            ┌───▼─────┐
                                            │   OR    │
                                            └───┬─────┘
                                                │
                              ┌─────────────────┴──┐
                              │       MUX          │
                              └─────────┬──────────┘
                                        │
                                     Result
```

### Full Adder Truth Table

| A | B | Cin | Sum | Cout |
|---|---|-----|-----|------|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

**Logic equations**:
```
Sum = A ⊕ B ⊕ Cin
Cout = (A · B) + (Cin · (A ⊕ B))
```

## N-Bit ALU Construction

### Ripple Carry Adder

Chain 1-bit ALUs together, connecting carry out to carry in:

```
     a[0] b[0]    a[1] b[1]    a[2] b[2]         a[n-1] b[n-1]
       │   │        │   │        │   │              │    │
       ▼   ▼        ▼   ▼        ▼   ▼              ▼    ▼
     ┌───────┐    ┌───────┐    ┌───────┐        ┌───────┐
Cin ─► ALU   ├───► ALU   ├───► ALU   ├─ ··· ──► ALU   ├──► Cout
     │  0    │    │  1    │    │  2    │        │ n-1   │
     └───┬───┘    └───┬───┘    └───┬───┘        └───┬───┘
         │            │            │                │
      Result[0]   Result[1]   Result[2]        Result[n-1]
```

**Problem**: Carry must ripple through all bits. For n-bit addition:
- Delay = n × (carry propagation delay)
- 32-bit addition might require 32 gate delays!

### Carry Lookahead Adder (CLA)

Faster addition by computing carries in parallel:

**Generate**: Position i generates a carry if both inputs are 1
```
Gi = Ai · Bi
```

**Propagate**: Position i propagates a carry if either input is 1
```
Pi = Ai ⊕ Bi
```

**Carry equations**:
```
C1 = G0 + P0·C0
C2 = G1 + P1·C1 = G1 + P1·G0 + P1·P0·C0
C3 = G2 + P2·G1 + P2·P1·G0 + P2·P1·P0·C0
C4 = G3 + P3·G2 + P3·P2·G1 + P3·P2·P1·G0 + P3·P2·P1·P0·C0
```

All carries computed in parallel with O(log n) delay!

## Subtraction

Subtraction uses the identity: A - B = A + (-B) = A + (~B + 1)

```
     a ────────────────────────────────┐
                                       │
     b ─────┐                          │
            │                          │
         ┌──▼──┐                       │
         │ NOT │ (if subtract)         │
         └──┬──┘                       │
            │                          │
         ┌──▼──────────────────────────▼──┐
         │           Adder                │
 Sub ────►         Cin = Sub              │ (add 1 when subtracting)
         │                                │
         └────────────────────────────────┘
```

When subtracting:
1. Invert B
2. Set carry in = 1 (adds 1 to complete two's complement)

## Set Less Than (SLT)

SLT sets the result to 1 if A < B, else 0.

**Strategy**: Compute A - B and check the sign of the result.

```
If A - B < 0 (i.e., result is negative), then A < B
```

Special case: Overflow must be handled for signed comparison.

```
SLT = (A[n-1] ⊕ B[n-1] ⊕ Overflow) ⊕ Result[n-1]
```

Or simplified for most cases:
```
SLT = Result[n-1] ⊕ Overflow
```

## Complete 32-bit ALU

```
┌────────────────────────────────────────────────────────────┐
│                        32-bit ALU                          │
│                                                            │
│   A[31:0] ─────►┌─────────────────────┐                   │
│                 │                     │                   │
│   B[31:0] ─────►│   32 × 1-bit ALUs   │───► Result[31:0]  │
│                 │   with CLA         │                   │
│   Binvert ─────►│                     │───► Zero         │
│                 │                     │───► Overflow     │
│   CarryIn ─────►│                     │───► CarryOut     │
│                 └─────────────────────┘───► Negative     │
│                                                            │
│   Operation[3:0] ─────────────────────────────────────────│
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Operation Encoding

| ALU Control | Operation |
|-------------|-----------|
| 0000 | AND |
| 0001 | OR |
| 0010 | Add |
| 0110 | Subtract |
| 0111 | Set Less Than |
| 1100 | NOR |

### Zero Detection

The Zero flag indicates if the result is all zeros:

```
Zero = ~(Result[0] | Result[1] | ... | Result[31])
     = NOR of all result bits
```

### Overflow Detection

For signed arithmetic, overflow occurs when:
- Adding two positive numbers yields a negative result
- Adding two negative numbers yields a positive result

```
Overflow = (A[31] = B[31]) AND (A[31] ≠ Result[31])
```

Or equivalently:
```
Overflow = Carry[31] ⊕ Carry[32]
```

## Shift Operations

Shifts require different hardware—a **barrel shifter**:

```
         Input[31:0]
              │
              ▼
       ┌──────────────┐
Shift  │   Barrel     │
Amount │   Shifter    │──► Output[31:0]
───────►              │
       │              │
Direction──►          │
       └──────────────┘
```

A barrel shifter uses layers of multiplexers:

```
Layer 1: Shift by 0 or 1
Layer 2: Shift by 0 or 2
Layer 3: Shift by 0 or 4
Layer 4: Shift by 0 or 8
Layer 5: Shift by 0 or 16
```

Each layer selects between shifted and unshifted based on one bit of the shift amount.

## Multiplication (Overview)

Hardware multiplication is complex. Basic approach:

### Shift-and-Add Multiplier

```
        Multiplicand × Multiplier = Product

For each bit of Multiplier:
    If bit is 1: Add Multiplicand to Product
    Shift Multiplicand left
```

**32×32 multiplication** produces a 64-bit result.

Modern CPUs use optimized multipliers like:
- **Booth's algorithm**: Handles signed numbers efficiently
- **Wallace tree**: Parallel addition of partial products
- **Dedicated multiplier units**: Pipelined for throughput

## Division (Overview)

Hardware division is even more complex:

### Restoring Division

```
For each bit of quotient:
    Subtract Divisor from Remainder
    If result negative:
        Quotient bit = 0
        Add Divisor back (restore)
    Else:
        Quotient bit = 1
    Shift
```

Division typically takes many cycles (32 cycles for 32-bit division).

## Key Takeaways

- ALU is built from 1-bit units combined with carry propagation
- Full adders compute sum and carry for each bit position
- Ripple carry is simple but slow; carry lookahead is faster
- Subtraction uses complement and add with carry in
- SLT uses subtraction and sign/overflow detection
- Zero flag is NOR of all result bits
- Overflow detection checks for sign changes in addition
- Shifts use barrel shifters with log₂(n) layers
- Multiplication and division require specialized, complex hardware
