# Instruction Scheduling

Instruction scheduling reorders instructions to improve execution performance on pipelined processors. Modern CPUs execute multiple instructions simultaneously through pipelining and superscalar execution, but dependencies and resource conflicts create hazards that stall the pipeline. Effective instruction scheduling minimizes these stalls, dramatically improving throughput.

## Pipeline Fundamentals

Modern processors execute instructions in stages, allowing multiple instructions to be in flight simultaneously.

### Classic Five-Stage Pipeline

```
Stage | Function
------|------------------------------------------
IF    | Instruction Fetch: Read instruction from memory
ID    | Instruction Decode: Decode opcode and read registers
EX    | Execute: Perform ALU operation
MEM   | Memory Access: Load or store data
WB    | Write Back: Write result to register
```

**Pipeline parallelism**: With five stages, up to five instructions execute concurrently:

```
Time: t0   t1   t2   t3   t4   t5   t6
I1:   IF   ID   EX   MEM  WB
I2:        IF   ID   EX   MEM  WB
I3:             IF   ID   EX   MEM  WB
I4:                  IF   ID   EX   MEM  WB
I5:                       IF   ID   EX   MEM  WB
```

Ideal throughput: One instruction completes per clock cycle (CPI = 1).

### Superscalar Execution

Superscalar processors can issue multiple instructions per cycle:

```
Modern x86 (4-wide superscalar):
Cycle 1: Issue I1, I2, I3, I4
Cycle 2: Issue I5, I6, I7, I8
...
```

Achieving theoretical peak requires independent instructions without dependencies or resource conflicts.

## Pipeline Hazards

Hazards prevent the next instruction from executing in the next clock cycle.

### Data Hazards

Data hazards occur when instructions have data dependencies.

**Read-After-Write (RAW) - True Dependency**:
```asm
add r1, r2, r3    ; r1 = r2 + r3
sub r4, r1, r5    ; r4 = r1 - r5  (needs r1 from previous instruction)
```

Timeline without scheduling:
```
Time:  0   1   2   3   4   5
add:   IF  ID  EX  MEM WB
sub:       IF  ID  STALL STALL EX  MEM WB
                  (waiting for r1)
```

The `sub` instruction must stall until `add` writes r1 (after WB stage).

**Write-After-Read (WAR) - Anti-Dependency**:
```asm
add r1, r2, r3    ; Uses r3
sub r3, r4, r5    ; Overwrites r3
```

Only problematic in out-of-order execution. Register renaming eliminates these hazards.

**Write-After-Write (WAW) - Output Dependency**:
```asm
add r1, r2, r3    ; Writes r1
sub r1, r4, r5    ; Writes r1 again
```

Also resolved by register renaming in modern processors.

### Structural Hazards

Structural hazards occur when hardware resources are insufficient:

```asm
; Both instructions need the ALU
add r1, r2, r3
mul r4, r5, r6    ; Multiplier might be busy
```

Modern processors have multiple execution units to reduce structural hazards.

### Control Hazards

Control hazards arise from branches, where the next instruction is unknown until the branch resolves:

```asm
beq  r1, r2, label    ; Branch if r1 == r2
add  r3, r4, r5       ; Execute if branch not taken
sub  r6, r7, r8       ; Execute if branch not taken
label:
mul  r9, r10, r11     ; Execute if branch taken
```

Branch misprediction costs 10-20 cycles on modern processors.

## List Scheduling

List scheduling is the fundamental algorithm for instruction scheduling, producing a schedule that respects dependencies while minimizing execution time.

### Data Dependency Graph

Construct a directed acyclic graph (DAG) where:
- Nodes represent instructions
- Edges represent dependencies (data, control, or ordering constraints)
- Edge weights represent latencies

```c
// Example code
a = b + c;    // I1
d = a * 2;    // I2 (depends on I1)
e = f - g;    // I3 (independent)
h = d + e;    // I4 (depends on I2 and I3)
```

```
DAG:
    I1 (latency 1)
    |
    I2 (latency 3)
    |    \
    |     I3 (latency 1)
    |    /
    I4 (latency 1)
```

### List Scheduling Algorithm

```python
def list_schedule(instructions, dependencies, resources):
    ready = []  # Instructions with all dependencies satisfied
    scheduled = []
    cycle = 0

    # Initialize ready list with instructions that have no predecessors
    for instr in instructions:
        if not instr.predecessors:
            ready.append(instr)

    while ready or any(i.is_executing() for i in instructions):
        # Select instructions to issue this cycle
        to_issue = []
        for instr in sorted(ready, key=priority_function):
            if can_issue(instr, resources, cycle):
                to_issue.append(instr)
                resources.allocate(instr)
                if len(to_issue) >= issue_width:
                    break

        # Issue selected instructions
        for instr in to_issue:
            scheduled.append((instr, cycle))
            ready.remove(instr)

        # Advance time
        cycle += 1

        # Update ready list: add instructions whose dependencies are satisfied
        for instr in instructions:
            if all(pred.completion_time <= cycle for pred in instr.predecessors):
                if instr not in ready and instr not in scheduled:
                    ready.append(instr)

    return scheduled
```

### Priority Functions

The choice of priority function significantly affects schedule quality:

**Critical Path**: Prioritize instructions on the longest dependency chain:
```
Priority = max(latency_to_end)

Example:
I1 → I2 → I4: path length = 1 + 3 + 1 = 5
I3 → I4:      path length = 1 + 1 = 2

Priorities: I1=5, I2=4, I3=2, I4=1
Schedule I1 first (highest priority)
```

**Number of Successors**: Prioritize instructions that unblock the most work:
```
Priority = count(all dependent instructions)
```

**Data Dependency Height**: Prioritize instructions with longest dependency chains from program start.

### Example Schedule

```asm
; Original code
add  r1, r2, r3    ; I1, latency 1
mul  r4, r1, r5    ; I2, latency 3, depends on I1
sub  r6, r7, r8    ; I3, latency 1, independent
add  r9, r4, r6    ; I4, latency 1, depends on I2 and I3
```

Unscheduled execution (sequential):
```
Cycle: 0   1   2   3   4   5   6
I1:    EX  WB
I2:        -- EX  EX  EX  WB
I3:                       -- EX  WB
I4:                             -- (stall) EX
Total: 7 cycles
```

List scheduled execution:
```
Cycle: 0   1   2   3   4   5
I1:    EX  WB
I3:    EX  WB              ; Execute I3 in parallel with I1
I2:        -- EX  EX  EX  WB
I4:                       EX  WB
Total: 6 cycles (1 cycle saved)
```

## Local vs Global Scheduling

### Local (Basic Block) Scheduling

Schedule instructions within a basic block (straight-line code without branches):

```c
// Basic block
a = b + c;
d = e * f;
g = a - d;
h = g * 2;
```

Simple and fast but limited scope—cannot move instructions across branches.

### Global Scheduling

Schedule across multiple basic blocks, moving instructions across branches.

**Trace Scheduling**: Select hot paths through the program and schedule them as single units:

```c
if (likely_true_condition) {
    // Hot path - optimize this
    x = a + b;
    y = x * 2;
} else {
    // Cold path
    z = c + d;
}
```

Move instructions from cold path to hot path or vice versa, inserting compensation code in the off-trace path.

**Hyperblock Scheduling**: Convert multiple paths into predicated code, then schedule:

```c
// Original
if (cond)
    x = a + b;
else
    x = c + d;

// Predicated (conceptual)
x1 = a + b;      // Execute always
x2 = c + d;      // Execute always
x = cond ? x1 : x2;  // Select result
```

This eliminates branches, enabling more aggressive scheduling.

## Software Pipelining

Software pipelining optimizes loops by overlapping iterations, analogous to hardware pipelining.

### Loop Pipelining Concept

Original loop:
```c
for (int i = 0; i < n; i++) {
    a = load(arr[i]);      // 3 cycles
    b = compute(a);        // 5 cycles
    store(result[i], b);   // 3 cycles
}
// Each iteration takes 11 cycles sequentially
```

Software pipelined loop:
```
Iteration: 0   1   2   3   4   5   6   7   8   ...
       0:  L   L   L   C   C   C   C   C   S   S   S
       1:              L   L   L   C   C   C   C   C   S   S   S
       2:                          L   L   L   C   C   C   C   C   S
...

L = Load (3 cycles)
C = Compute (5 cycles)
S = Store (3 cycles)
```

After startup (prologue), one iteration completes every 3 cycles instead of 11.

### Modulo Scheduling

Modulo scheduling is the primary algorithm for software pipelining:

```python
def modulo_schedule(loop_body, initiation_interval):
    # initiation_interval (II) = cycles between starting successive iterations

    # Compute minimum II from resource constraints
    resource_II = ceil(resource_usage / available_resources)
    recurrence_II = max(cycle_length / cycle_distance for each cycle)
    II = max(resource_II, recurrence_II)

    schedule = {}
    for instr in loop_body:
        # Find earliest valid time slot modulo II
        time = 0
        while True:
            slot = time % II
            if is_valid(instr, slot, schedule, II):
                schedule[instr] = time
                break
            time += 1

    return schedule, II
```

### Loop Transformations

Prepare loops for software pipelining:

**Loop Unrolling**: Replicate loop body to increase instruction-level parallelism:
```c
// Original
for (i = 0; i < n; i++)
    a[i] = a[i] + 1;

// Unrolled by 4
for (i = 0; i < n; i += 4) {
    a[i]   = a[i]   + 1;
    a[i+1] = a[i+1] + 1;
    a[i+2] = a[i+2] + 1;
    a[i+3] = a[i+3] + 1;
}
```

**Loop Peeling**: Separate first/last iterations to handle special cases:
```c
// Peel first iteration
a[0] = a[0] + 1;
for (i = 1; i < n; i++)
    a[i] = a[i] + a[i-1];  // Now has consistent pattern
```

**Loop Fusion/Fission**: Merge or split loops to improve locality or reduce overhead.

## Register Pressure and Scheduling

Aggressive scheduling increases register pressure by keeping more values live simultaneously.

### Register-Sensitive Scheduling

Balance ILP (instruction-level parallelism) with register pressure:

```python
def register_sensitive_schedule(instructions):
    while ready_list:
        # Check register pressure
        current_pressure = count_live_values()

        if current_pressure > register_limit:
            # Prioritize instructions that reduce pressure
            instr = select_pressure_reducing(ready_list)
        else:
            # Prioritize ILP
            instr = select_critical_path(ready_list)

        schedule(instr)
```

### Spill Code Placement

When spilling is inevitable, place spill/reload instructions optimally:

```asm
; Poor placement
spill r1        ; Spill immediately
...
reload r1       ; Many cycles later

; Better placement
compute r1      ; Use r1 immediately
spill r1        ; Spill when no longer needed soon
...
reload r1       ; Just before next use
compute with r1
```

## Practical Considerations

### Instruction Latency Tables

Modern processors have complex, variable latencies:

```
x86-64 Skylake latencies (examples):
ADD reg, reg          1 cycle
IMUL reg, reg         3 cycles
DIV reg               ~25 cycles (variable)
LOAD from L1 cache    4-5 cycles
LOAD from L2 cache    12 cycles
LOAD from L3 cache    40+ cycles
```

Schedulers use detailed latency tables to model execution accurately.

### Memory Disambiguation

Loads and stores may alias (access same address), creating dependencies:

```asm
store [r1], r2
load  r3, [r4]     ; Does [r4] == [r1]?
```

Conservative scheduling assumes aliasing, limiting reordering. **Memory disambiguation** analysis proves independence, enabling aggressive scheduling.

### Phase Ordering

Instruction scheduling interacts with other optimizations:

**Pre-RA Scheduling**: Schedule before register allocation to expose ILP. Increases register pressure.

**Post-RA Scheduling**: Schedule after register allocation with known register assignments. Limited by fixed allocation.

Modern compilers often schedule both pre- and post-RA for optimal results.

## Key Takeaways

- Instruction scheduling reorders instructions to minimize pipeline stalls and maximize throughput on pipelined, superscalar processors
- Pipeline hazards—data dependencies (RAW, WAR, WAW), structural conflicts, and control flow—cause stalls that scheduling aims to eliminate
- List scheduling builds a data dependency DAG and greedily schedules instructions based on priority functions like critical path length
- Local scheduling optimizes within basic blocks; global scheduling moves instructions across branches using trace scheduling or hyperblocks
- Software pipelining overlaps loop iterations to achieve near-optimal throughput, with modulo scheduling finding minimum initiation intervals
- Register pressure increases with aggressive scheduling as more values remain live; register-sensitive scheduling balances ILP against register availability
- Modern processors have complex, variable latencies requiring detailed models; memory disambiguation enables reordering loads and stores
- Phase ordering matters—pre-RA scheduling exposes ILP but increases pressure; post-RA scheduling respects allocation but has less flexibility
