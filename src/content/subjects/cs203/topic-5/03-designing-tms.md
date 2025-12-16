# Designing Turing Machines

Designing TMs requires understanding how to use the tape for storage and the finite control for decision-making. Systematic approaches help construct correct machines.

## Design Principles

### 1. Use Tape as Working Memory
The tape is your scratchpad:
- Mark positions
- Store intermediate values
- Communicate between phases

### 2. Use States for Mode Tracking
States remember what phase you're in:
- Looking for something
- Found it, now processing
- Moving back to start

### 3. Divide and Conquer
Break the task into phases:
- Phase 1: Mark first element
- Phase 2: Find matching element
- Phase 3: Clean up / repeat

## Common Patterns

### Pattern: Marking
Mark visited positions with special symbols:
- X for "processed"
- Y for "matched"
- ˆ for "current position"

### Pattern: Sweeping
Sweep left-to-right or right-to-left:
- Process elements in order
- Return to start after each pass
- Repeat until done

### Pattern: Copying
Copy a string to another location:
- Mark source position
- Move to destination
- Write symbol
- Return and repeat

## Example: Accepting {0ⁿ1ⁿ}

**Strategy**:
1. Repeatedly match one 0 with one 1
2. Mark matched symbols
3. Accept if all matched

**Implementation**:
```
q₀: If 0, write X, go to q₁, move R
    If ␣, accept
    Else reject

q₁: Scan right over 0s and Ys
    If 1, write Y, go to q₂, move L
    If ␣, reject

q₂: Scan left over Ys and 0s
    If X, go to q₀, move R

q₀: (back at marker)
    If Y, scan right to check for remaining 1s
```

## Example: Accepting {w#w}

**Strategy**:
1. Match symbols from first w with second w
2. Mark matched symbols
3. Accept if all matched

**Phases**:
- Mark a symbol in first half
- Find # and scan to matching position in second half
- Mark the match
- Return to find next unmatched symbol

## Example: Computing Functions

TM can compute functions, not just accept languages.

**Increment function** (add 1 in binary):
1. Move to rightmost digit
2. If 0, change to 1, halt
3. If 1, change to 0, move left, repeat
4. If ␣ (leftmost), write 1, halt

## Subroutines

TMs can simulate subroutines:
- Save state in special tape region
- Execute subroutine
- Return and restore

This allows modular design.

## Common Mistakes

1. **Forgetting base cases**: Empty input, single symbol
2. **Off-by-one errors**: Head position after loops
3. **Forgetting to halt**: Must reach accept/reject
4. **Overwriting input**: Use markers instead

## Verification

To verify TM design:
1. Trace on example inputs
2. Check edge cases
3. Prove invariants hold
4. Show termination

## High-Level Description

Often describe TMs algorithmically:

"On input w:
1. Scan tape to verify input format
2. If not valid, reject
3. While unmarked symbols remain:
   a. Process next symbol
   b. Mark as processed
4. Accept"

This level of detail suffices for most purposes.

## Implementation vs Description

Three levels of TM description:
1. **Formal**: Full (Q, Σ, Γ, δ, ...) specification
2. **Implementation**: Detailed algorithm with tape operations
3. **High-level**: Algorithm in plain language

Use appropriate level for the task.
