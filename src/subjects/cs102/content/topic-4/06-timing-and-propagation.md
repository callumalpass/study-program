---
id: cs102-t4-timing-propagation
title: "Timing and Propagation"
order: 6
---

# Timing and Propagation in Digital Circuits

Digital circuits aren't instantaneous. Gates take time to respond to input changes, and this propagation delay accumulates through chains of logic. Understanding timing is essential for appreciating why CPUs have clock speeds, why some designs are faster than others, and how real hardware differs from the idealized Boolean algebra we've studied.

## Gate Propagation Delay

Every logic gate takes time to produce its output after its inputs change. This **propagation delay** (t_pd) varies by technology:

| Technology | Typical Gate Delay |
|------------|-------------------|
| 74HC (CMOS) | 10-20 ns |
| Modern CMOS (7nm) | 5-20 ps |
| ECL (bipolar) | 1-2 ns |

A gate that switches in 10 picoseconds sounds fast—but a billion such gates means delays add up.

### Rise Time and Fall Time

Gates don't switch instantly between 0 and 1. The output voltage transitions gradually:

```
         ┌────────────────
         │   ← Rise time
Vout     │
    ─────┘

────────┐
        │   ← Fall time
Vout    │
        └────────────────
```

**Rise time** (t_r): Time for output to go from 10% to 90% of full voltage
**Fall time** (t_f): Time for output to go from 90% to 10%

In real circuits, rise and fall times are often different, affecting when downstream gates see a valid logic level.

## Propagation Through Gate Chains

When gates are connected in series, delays accumulate:

```
A ──►[NOT]──►[AND]──►[OR]──► Z
      t₁       t₂      t₃

Total delay: t₁ + t₂ + t₃
```

This is why **critical path** analysis matters. The longest path through a circuit determines the minimum clock period.

### Example: Ripple Carry Adder

A 32-bit ripple carry adder chains 32 full adders:

```
FA₀ → FA₁ → FA₂ → ... → FA₃₁
```

Each full adder's carry-out must propagate to the next. If each full adder has a carry propagation delay of 2 gate delays:

```
Total delay = 32 × 2 = 64 gate delays
```

For 10ps gates: 64 × 10ps = 640ps = 0.64ns

This limits the clock frequency to about 1.5 GHz just for the adder. Real CPUs use faster adder designs.

## The Critical Path

The **critical path** is the longest combinational path between any two registers (or from input to output). It determines maximum clock speed:

```
                    ┌─────────┐
Input A ──► Gates ──►│ Register│──► Gates ──► Output
        1ns delay   └─────────┘   1ns delay

Critical path: the slower of input-to-register or register-to-output
```

**Maximum clock frequency** = 1 / (critical path delay + setup time + clock uncertainty)

## Clock Signals and Synchronous Design

To manage timing complexity, digital systems use **clocks**—regular pulse signals that coordinate when things happen:

```
Clock: ──┐  ┌──┐  ┌──┐  ┌──┐  ┌──
         └──┘  └──┘  └──┘  └──┘
          ▲      ▲      ▲      ▲
       Rising edge triggers action
```

**Synchronous design rules**:
1. All state changes happen on clock edges
2. Combinational logic computes between edges
3. Clock period > longest combinational delay

### Setup and Hold Time

Registers have timing requirements:

**Setup time** (t_su): Data must be stable *before* the clock edge
**Hold time** (t_h): Data must remain stable *after* the clock edge

```
Data:   ──────┐      ┌───────────
              └──────┘
                ▲    ▲
         Setup time  Hold time
                   ▲
            Clock edge
```

Violating setup/hold causes **metastability**—the register output becomes unpredictable (neither 0 nor 1).

## Reducing Propagation Delay

### Parallel Computation

Instead of serial chains, compute in parallel:

```
Serial: A → B → C → D → Z    (4 gate delays)

Parallel:
    A → B ─┐
           ├→ Z  (2 gate delays)
    C → D ─┘
```

**Carry-lookahead adders** use this principle to reduce carry propagation from O(n) to O(log n) delays.

### Gate Fan-In and Fan-Out

**Fan-in**: Number of inputs to a gate
**Fan-out**: Number of gates driven by an output

High fan-in increases gate delay (more transistors in series/parallel).
High fan-out increases delay because the output must charge more capacitance.

```
High fan-out:
Output ──┬──► Gate 1
         ├──► Gate 2
         ├──► Gate 3
         ├──► Gate 4
         └──► ... (must drive all loads)
```

Designers insert **buffers** to amplify signals for high fan-out situations.

### Logic Depth Reduction

Minimize the number of gate levels between inputs and outputs:

```
Deep: A ──►[AND]──►[OR]──►[AND]──►[NOT]──► Z  (4 levels)

Shallow: Combine logic
    A ──►[Complex Gate]──► Z  (1 level, but bigger gate)
```

This is a key optimization in synthesis tools.

## Hazards and Glitches

Even when the final output is correct, transient **glitches** can occur during transitions:

### Static Hazards

Output momentarily changes when it shouldn't:

```
Y = A·B + A'·C

If B=1, C=1, and A transitions 1→0:
- A·B goes 1→0 (fast)
- A'·C goes 0→1 (slower due to inverter)
- Brief period where Y = 0 (glitch!)
```

```
A:   ────┐
         └────────

Y:   ────┐   ┌────   ← Glitch
         └───┘
         ↑
    Should stay high
```

### Fixing Hazards

Add redundant terms to cover the transition:

```
Original: Y = A·B + A'·C
With fix: Y = A·B + A'·C + B·C   ← Consensus term

B·C = 1 covers the transition period
```

Alternatively, use synchronous design where outputs are only sampled at clock edges, after transients settle.

## Clock Skew

In large chips, the clock signal arrives at different times at different locations:

```
Clock source ──┬──► Register A (arrives at time t₀)
               └──► Register B (arrives at time t₀ + δ)
```

This **clock skew** (δ) can cause timing violations. If Register A's output feeds Register B, but B's clock arrives early, B might sample incorrect data.

### Solutions

- **Clock trees**: Balanced distribution networks that equalize path lengths
- **Clock meshes**: Grid of clock wires that average out variations
- **Timing analysis**: Account for skew in timing constraints

## Metastability

When timing is violated, flip-flops can enter a **metastable state**—balanced between 0 and 1:

```
Normal:     ─────┐     ┌─────
                 └─────┘

Metastable: ─────┐~~~~~┌─────
                 └~~~~~┘
            Takes extra time to resolve
```

Metastability is probabilistic. Given enough time, the flip-flop will resolve to 0 or 1, but the exact value is unpredictable.

### Synchronizers

When crossing clock domains (e.g., external input to internal clock), use **synchronizer chains**:

```
Async input ──►[FF]──►[FF]──► Synchronized output
```

Each flip-flop stage exponentially reduces metastability probability.

## Real-World Timing Analysis

Modern CPUs have billions of gates. Static timing analysis tools:

1. Build a graph of all paths
2. Calculate delay through each path
3. Identify timing violations
4. Report the critical path

Designers then optimize the critical path until timing constraints are met.

### Example Timing Report

```
Critical Path: ALU → MUX → Register File
Delay: 2.3 ns
Slack: 0.2 ns (positive = OK)
Clock period: 2.5 ns → 400 MHz max
```

**Slack** is the margin between required and actual timing. Negative slack means the design is too slow.

## Impact on CPU Design

Timing constraints drive CPU architecture decisions:

| Challenge | Solution |
|-----------|----------|
| Long adder delay | Carry-lookahead, Kogge-Stone adders |
| Long multiplier delay | Pipelined multipliers |
| Memory access delay | Caches, prefetching |
| Control logic delay | Branch prediction, speculative execution |

The entire field of computer architecture is largely about working around and hiding propagation delays.

## Key Takeaways

- **Propagation delay** (t_pd) is the time for a gate to respond to input changes.
- Delays **accumulate** through chains of gates—the critical path determines maximum speed.
- **Synchronous design** uses clocks to coordinate state changes, hiding timing complexity.
- **Setup and hold times** constrain when data must be stable relative to the clock.
- **Hazards** cause transient glitches; redundant logic or synchronous sampling fixes them.
- **Clock skew** occurs when clock arrives at different times across a chip.
- **Metastability** happens when timing is violated; synchronizer chains mitigate it.
- **Timing analysis** identifies the critical path and ensures the design meets speed goals.
- Understanding timing explains why CPUs have specific clock speeds and why faster is hard to achieve.
- Every architecture optimization is ultimately about managing and hiding delays.

