# Exceptions and Interrupts in Pipelining

**Exceptions** (unexpected events during execution) and **interrupts** (external events) complicate pipeline design. They require saving state, handling the event, and potentially resuming execution—all while multiple instructions are in flight.

## Terminology

| Term | Description |
|------|-------------|
| **Exception** | Caused by instruction execution (divide by zero, page fault) |
| **Interrupt** | External event (I/O, timer, hardware error) |
| **Trap** | Intentional exception (system call, breakpoint) |
| **Fault** | Recoverable exception (page fault, can retry instruction) |
| **Abort** | Unrecoverable exception (hardware error) |

Different architectures use these terms differently; we'll focus on the underlying concepts.

## Types of Exceptions

### Synchronous (Caused by Instruction)

| Exception | Stage | Recovery |
|-----------|-------|----------|
| Undefined instruction | ID | No |
| Arithmetic overflow | EX | Maybe |
| Address error | EX/MEM | Maybe |
| Page fault | MEM | Yes (retry) |
| System call | ID | Yes |
| Breakpoint | ID | Yes |

### Asynchronous (External)

| Interrupt | Timing | Recovery |
|-----------|--------|----------|
| I/O completion | Any time | Yes |
| Timer | Any time | Yes |
| Power failure | Any time | No |
| Hardware error | Any time | Maybe |

## Pipeline Exception Challenges

### Challenge 1: Multiple Instructions in Flight

When an exception occurs, multiple instructions are in the pipeline:

```
Clock:      1    2    3    4    5
Instr 1:   IF   ID   EX   MEM  WB
Instr 2:        IF   ID   EX   ← Exception here!
Instr 3:             IF   ID   EX
Instr 4:                  IF   ID
Instr 5:                       IF
```

Which instructions should complete? Which should be discarded?

### Challenge 2: Multiple Exceptions Simultaneously

Different instructions might cause exceptions in the same cycle:

```
Clock:      1    2    3    4    5
Instr A:                  MEM  ← Page fault
Instr B:             EX   ← Overflow
```

Which exception should be handled first?

### Challenge 3: Imprecise State

Instructions may complete out of order, making it unclear which instructions have finished:

```
Instr 1: Writes R1 (completed)
Instr 2: Exception! (not completed)
Instr 3: Writes R3 (completed due to forwarding issues)
```

This is called an **imprecise exception**—the processor state doesn't match any sequential execution point.

## Precise Exceptions

A **precise exception** maintains the invariant:
- All instructions before the faulting instruction have completed
- No instructions after the faulting instruction have any effect

This requires careful pipeline management.

### Achieving Precise Exceptions

**Rule 1**: Handle exceptions in program order

Even if exception B occurs before exception A in time, if A's instruction is earlier in program order, handle A first.

**Rule 2**: No instruction can write results after an earlier exception

Instructions past the exception point must be "squashed"—their writes prevented.

**Rule 3**: Save precise PC

The **Exception PC (EPC)** must point to the exact faulting instruction.

## Exception Handling Steps

### Step 1: Detect Exception

Each stage checks for exceptions:
- IF: Instruction fetch page fault, misaligned PC
- ID: Undefined opcode, privileged instruction
- EX: Arithmetic overflow, misaligned address
- MEM: Data page fault, access violation

### Step 2: Flush Pipeline

Prevent later instructions from committing:

```
Clock:      4    5    6    7
Instr 2:   EX  Exception!
Instr 3:   ID   Flush (becomes NOP)
Instr 4:   IF   Flush (becomes NOP)
Instr 5:        Not fetched
```

### Step 3: Save State

- Save EPC (address of faulting instruction)
- Save cause register (why the exception occurred)
- Save other context if needed

### Step 4: Transfer to Handler

- Load handler address (from vector table or fixed address)
- Begin fetching handler instructions

```nasm
; Exception handler
exception_handler:
    ; Save registers
    ; Examine cause
    ; Handle exception
    ; Restore registers
    ; Return (eret)
```

## Implementation Details

### Exception Vector Table

Most architectures use a table of handler addresses:

```
Address         Handler
0x80000000     Reset
0x80000004     General exception
0x80000008     Interrupt
0x8000000C     TLB miss
...
```

### Status Registers

**EPC (Exception PC)**: Address of faulting instruction

**Cause Register**: Reason for exception
```
┌───────────────────────────────────────────────┐
│  Unused  │ BD │ Int Pending │ Exception Code │
└───────────────────────────────────────────────┘
```

**Status Register**: Processor state
```
┌───────────────────────────────────────────────┐
│  IE │ EXL │ KSU │ Interrupt Mask │ ...       │
└───────────────────────────────────────────────┘
```

### Pipeline Modifications

Add exception support to each stage:

```
IF:  ExcIF ← page_fault | misaligned
ID:  ExcID ← undefined_opcode | privileged
EX:  ExcEX ← overflow | address_error
MEM: ExcMEM ← page_fault | access_violation

IF/ID.Exc ← ExcIF
ID/EX.Exc ← IF/ID.Exc | ExcID
EX/MEM.Exc ← ID/EX.Exc | ExcEX
MEM/WB.Exc ← EX/MEM.Exc | ExcMEM
```

At WB: if any exception bit set, trigger handler.

## Handling Interrupts

Interrupts are asynchronous—they can arrive at any time.

### Interrupt Recognition

Check for pending interrupts between instructions:

```
if (interrupt_pending AND interrupts_enabled)
    Handle interrupt at next instruction boundary
```

### Interrupt vs Exception Priority

| Priority | Type |
|----------|------|
| Highest | Hardware reset |
| | Machine check |
| | Interrupt |
| | Exception from earlier instruction |
| Lowest | Exception from later instruction |

## Restartable Instructions

For faults like page faults, the instruction should be restarted after handling:

**Problem**: Instruction may have partially modified state

```nasm
; x86 string instruction
rep movsb    ; Copy ECX bytes from ESI to EDI
```

If page fault occurs mid-copy, how do we restart?

**Solution**: Either
1. Don't modify state until certain of completion
2. Save enough state to restore and retry
3. Architecture ensures instructions are restartable

## Exception in Branch Delay Slot

MIPS has branch delay slots (instruction after branch always executes):

```nasm
beq $t0, $t1, target
add $t2, $t3, $t4    ; Delay slot - always executes

; If add causes exception...
```

The **BD bit** in Cause register indicates the exception was in a delay slot. Handler must account for the branch when returning.

## Performance Impact

Exceptions are rare but expensive:
- Pipeline flush: Lose several cycles of work
- Handler execution: Many cycles
- Return and pipeline refill: Several more cycles

**Typical cost**: 50-100+ cycles per exception

**Impact**: For a program with 0.1% exception rate:
```
CPI_impact = 0.001 × 100 = 0.1 additional CPI
```

Usually negligible, but critical for:
- Operating systems
- Emulators
- Debugging tools

## Key Takeaways

- Exceptions (internal) and interrupts (external) disrupt normal execution
- Precise exceptions maintain clean architectural state
- Pipeline must flush younger instructions on exception
- EPC and cause registers save exception information
- Handle exceptions in program order for correctness
- Interrupts are handled at instruction boundaries
- Restartable instructions allow retry after handling faults
- Exception handling adds complexity but is essential for correct operation
