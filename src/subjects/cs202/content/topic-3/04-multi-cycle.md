# Multi-Cycle Datapath

The **multi-cycle datapath** improves upon the single-cycle design by breaking instruction execution into multiple steps, each taking one clock cycle. This allows faster clock speeds and more efficient use of hardware resources.

## Motivation for Multi-Cycle Design

### Problems with Single-Cycle

1. **Clock period waste**: All instructions use the time of the slowest (load)
2. **Resource duplication**: Separate instruction and data memories needed
3. **No resource sharing**: Each component used only once per instruction

### Multi-Cycle Advantages

1. **Shorter clock period**: Each step is simpler
2. **Resource sharing**: One ALU and one memory for all operations
3. **Variable instruction timing**: Simple instructions complete faster
4. **Foundation for pipelining**: Stages become pipeline stages

## Multi-Cycle Datapath Structure

```
                          ┌────────────────────────────────────────────────┐
                          │                                                │
   ┌───────────┐         │    ┌─────────┐                                │
   │    PC     ├─────────┼───►│         │                                │
   │           │         │    │  Memory │◄───────────────────┐           │
   └─────▲─────┘         │    │         │                    │           │
         │               │    └────┬────┘                    │           │
         │               │         │                         │           │
   ┌─────┴─────┐        │    ┌────▼────┐               ┌────┴────┐      │
   │   MUX     │◄───────┼────┤  Instr  │               │  MDR    │      │
   │           │        │    │  Reg    │               │ (Mem    │      │
   └───────────┘        │    │ (IR)    │               │  Data   │      │
                        │    └────┬────┘               │  Reg)   │      │
                        │         │                    └────┬────┘      │
   ┌───────────────────────────────────────────────────────┴───────────┐
   │                     Register File                                  │
   │  ┌─────┐    ┌─────┐                          ┌─────┐             │
   │  │  A  │    │  B  │◄──Read Data 2            │Write│             │
   │  └──┬──┘    └──┬──┘                          │ Reg │             │
   │     │          │                             └─────┘             │
   └─────┼──────────┼─────────────────────────────────────────────────┘
         │          │
    ┌────▼────┐  ┌──▼──┐
    │  MUX    │  │ MUX │
    │ ALUSrcA │  │ALUSrcB│
    └────┬────┘  └──┬──┘
         │          │
    ┌────▼──────────▼────┐
    │                    │
    │       ALU          │──► Zero
    │                    │
    └────────┬───────────┘
             │
        ┌────▼────┐
        │ ALUOut  │
        │  Reg    │
        └─────────┘
```

## Key Differences from Single-Cycle

### Added Registers

Multi-cycle datapath requires **internal registers** to hold values between cycles:

| Register | Purpose |
|----------|---------|
| IR (Instruction Register) | Holds current instruction |
| MDR (Memory Data Register) | Holds data read from memory |
| A | Holds first register operand |
| B | Holds second register operand |
| ALUOut | Holds ALU result |

### Shared Resources

| Resource | Single-Cycle | Multi-Cycle |
|----------|--------------|-------------|
| Memory | Two (instruction + data) | One (shared) |
| ALU | One | One (shared across steps) |
| Adders | Multiple | One ALU handles all |

## Instruction Execution Steps

### Step 1: Instruction Fetch (IF)

```
IR ← Memory[PC]
PC ← PC + 4
```

Operations:
- Memory address = PC
- Read instruction into IR
- ALU computes PC + 4
- Store new PC value

Control signals:
- IorD = 0 (use PC for address)
- MemRead = 1
- IRWrite = 1
- ALUSrcA = 0 (PC)
- ALUSrcB = 01 (constant 4)
- ALUOp = Add
- PCWrite = 1

### Step 2: Instruction Decode (ID)

```
A ← Register[rs]
B ← Register[rt]
ALUOut ← PC + (sign_extend(imm) << 2)
```

Operations:
- Read rs and rt from register file
- Compute branch target (speculatively)

Control signals:
- ALUSrcA = 0 (PC)
- ALUSrcB = 11 (sign-extended, shifted immediate)
- ALUOp = Add

### Step 3: Execution (varies by instruction type)

**R-type**:
```
ALUOut ← A op B
```

**Memory reference (address calculation)**:
```
ALUOut ← A + sign_extend(imm)
```

**Branch**:
```
if (A == B) PC ← ALUOut
```

### Step 4: Memory Access or R-type Completion

**Load**:
```
MDR ← Memory[ALUOut]
```

**Store**:
```
Memory[ALUOut] ← B
```

**R-type**:
```
Register[rd] ← ALUOut
```

### Step 5: Write Back (load only)

**Load**:
```
Register[rt] ← MDR
```

## Instruction Timing

| Instruction | Cycles | Steps |
|-------------|--------|-------|
| R-type | 4 | IF → ID → EX → WB |
| Load | 5 | IF → ID → EX → MEM → WB |
| Store | 4 | IF → ID → EX → MEM |
| Branch | 3 | IF → ID → EX |
| Jump | 3 | IF → ID → EX |

## Finite State Machine Control

Multi-cycle requires **sequential control**—a finite state machine (FSM):

```
       ┌──────────────────────────────────────────┐
       │                                          │
       ▼                                          │
    ┌──────┐                                      │
    │  S0  │──────────────────────────────────────┘
    │ IF   │
    └──┬───┘
       │
       ▼
    ┌──────┐
    │  S1  │
    │  ID  │
    └──┬───┘
       │
    ┌──┴───────────┬────────────┬─────────────┐
    │              │            │             │
    ▼              ▼            ▼             ▼
 ┌──────┐      ┌──────┐    ┌──────┐      ┌──────┐
 │ S2   │      │ S6   │    │ S8   │      │ S9   │
 │R-type│      │Mem Op│    │Branch│      │Jump  │
 └──┬───┘      └──┬───┘    └──────┘      └──────┘
    │             │
    ▼          ┌──┴──┐
 ┌──────┐      │     │
 │  S3  │      ▼     ▼
 │R-WB  │   ┌────┐ ┌────┐
 └──────┘   │ S3 │ │ S5 │
            │Load│ │Str │
            └─┬──┘ └────┘
              │
              ▼
           ┌────┐
           │ S4 │
           │LW  │
           │ WB │
           └────┘
```

## State-by-State Control Signals

| State | Purpose | Key Signals |
|-------|---------|-------------|
| S0 | Fetch | MemRead, IRWrite, IorD=0, PCWrite |
| S1 | Decode | ALUSrcA=0, ALUSrcB=11 (compute branch target) |
| S2 | R-type Execute | ALUSrcA=1, ALUSrcB=00, ALUOp=R-type |
| S3 | R-type WB | RegDst=1, RegWrite, MemtoReg=0 |
| S4 | Load/Store Addr | ALUSrcA=1, ALUSrcB=10 |
| S5 | Load Memory | MemRead, IorD=1 |
| S6 | Load WB | RegDst=0, RegWrite, MemtoReg=1 |
| S7 | Store Memory | MemWrite, IorD=1 |
| S8 | Branch | ALUSrcA=1, ALUSrcB=00, PCWriteCond |
| S9 | Jump | PCWrite, PCSource=10 |

## Performance Analysis

### CPI Calculation

CPI = Σ(cycles_i × frequency_i)

**Example instruction mix**:
- 25% loads (5 cycles)
- 10% stores (4 cycles)
- 45% R-type (4 cycles)
- 15% branches (3 cycles)
- 5% jumps (3 cycles)

CPI = 0.25×5 + 0.10×4 + 0.45×4 + 0.15×3 + 0.05×3
    = 1.25 + 0.40 + 1.80 + 0.45 + 0.15
    = 4.05 cycles per instruction

### Comparison with Single-Cycle

| Metric | Single-Cycle | Multi-Cycle |
|--------|--------------|-------------|
| CPI | 1 | ~4 |
| Clock period | Long (limited by load) | Short (one step) |
| Performance | T × 1 | (T/~4) × 4.05 |

If multi-cycle clock is ~4× faster, performance is similar—but with simpler hardware.

## Microprogrammed Implementation

For complex ISAs, the FSM can be implemented with microcode:

```
    ┌────────────┐
    │  State     │
    │  Register  │
    └─────┬──────┘
          │
    ┌─────▼──────┐
    │ Microcode  │──► Control Signals
    │    ROM     │──► Next State
    └────────────┘
```

Each microinstruction specifies:
- Control signals for this cycle
- Next state (or how to determine it)

## Key Takeaways

- Multi-cycle breaks execution into multiple steps for efficiency
- Internal registers hold intermediate values between cycles
- Resources (memory, ALU) are shared across cycles
- FSM-based control sequences through instruction states
- Different instructions take different numbers of cycles
- Clock period is shorter but CPI > 1
- Foundation for understanding pipelining
