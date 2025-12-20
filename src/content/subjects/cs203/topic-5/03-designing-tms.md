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

## Example: Computing Multiplication

TMs can compute functions, not just recognize languages. Let's design a TM that computes $f(m, n) = m \times n$ for unary numbers.

**Input format**: $0^m 1 0^n$ (m zeros, separator, n zeros)
**Output format**: $0^{m \times n}$ (product as zeros)

**Strategy**:
1. For each 0 in the first group
2. Copy the entire second group to the output area
3. Mark the processed 0 in the first group
4. Repeat until all first group 0s are processed

**Detailed Algorithm**:
```
On input 0^m 1 0^n:
1. Mark the leftmost unmarked 0 before the 1 with X
2. If no unmarked 0 exists before 1, go to step 6
3. Move to the 1, then past it
4. For each 0 after the 1:
   a. Write a 0 in the output area (after second group)
   b. Move back to scan next 0
5. Return to step 1
6. Erase the input and separator, leaving only output
7. Accept
```

**States needed**:
- $q_0$: Start, looking for unmarked 0 before 1
- $q_1$: Found and marked a 0, moving to 1
- $q_2$: Past the 1, copying second group
- $q_3$: Writing to output area
- $q_4$: Returning to find next 0 in first group
- $q_5$: Cleanup phase
- $q_{\text{accept}}$: Done

**Example trace** for $3 \times 2 = 6$ (input "0001100"):

Initial: $q_0 0001100$

After first copy cycle: $XX01100|00$ (marked first 0, copied 2 zeros)
After second copy cycle: $XXX1100|0000$ (marked second 0, copied 2 more)
After third copy cycle: $XXXX100|000000$ (marked third 0, copied 2 more)
Final output: $000000$ (six zeros)

This example demonstrates how TMs can perform arithmetic through systematic marking and copying strategies.

## Pattern: Shifting

Sometimes you need to shift tape contents left or right to make room for new data.

**Shifting right**:
1. Move to rightmost symbol
2. Copy it one cell to the right
3. Move left and repeat
4. Continue until shift complete

This is commonly needed when inserting data in the middle of the tape contents.

## Example: Accepting $\{a^n b^n c^n \mid n \geq 0\}$

This language is not context-free (proved by pumping lemma for CFLs), but it is decidable by TM.

**Strategy**: Cross off one $a$, one $b$, and one $c$ in each pass.

**Algorithm**:
```
On input w:
1. Scan right, checking format is a*b*c*. If not, reject.
2. Return to start.
3. Cross off one a (write X). If no a but b or c remain, reject.
4. Scan right to find first b, cross it off. If no b found, reject.
5. Scan right to find first c, cross it off. If no c found, reject.
6. Scan left to beginning.
7. If any unmarked a exists, go to step 3.
8. Check that all b's and c's are crossed off. If not, reject.
9. Accept.
```

**Key insight**: The tape provides working memory to track which symbols have been matched. This is beyond the capability of PDAs, which can only use a stack.

## Multi-Tape Design Strategy

While we can always convert multi-tape TMs to single-tape, designing with multiple tapes is often clearer:

**Tape 1**: Input (read-only or preserved)
**Tape 2**: Working memory for intermediate calculations
**Tape 3**: Output or additional scratch space

For example, to check if $w = w^R$ (palindrome):
- Tape 1: Original input $w$
- Tape 2: Copy of $w$ in reverse
- Compare tape 1 and tape 2 symbol by symbol

This is conceptually simpler than the single-tape approach with marking.

## The Importance of Invariants

When designing complex TMs, maintain **loop invariants**:

For the $\{0^n 1^n\}$ machine:
- **Invariant**: At the start of each iteration (state $q_0$), the tape contains $X^i 0^{n-i} Y^i 1^{n-i}$ for some $i$
- **Initialization**: True when $i=0$ (no Xs or Ys yet)
- **Maintenance**: Each iteration increases $i$ by 1
- **Termination**: When $i=n$, all symbols matched

This reasoning proves correctness.

## Debugging Strategies

When your TM design doesn't work:

1. **Trace small examples**: Run through step-by-step with short inputs
2. **Check boundary cases**: Empty string, single character, all same character
3. **Verify state meanings**: Does each state represent what you think?
4. **Check transitions**: Are all symbol cases covered?
5. **Test failure cases**: Does it correctly reject invalid inputs?

## Modular TM Design

For complex tasks, design TMs in modules:

**Module 1**: Validate input format
**Module 2**: Perform main computation
**Module 3**: Format output

Each module is a collection of states with designated entry and exit states. The exit state of one module becomes the entry state of the next.

This mirrors structured programming in conventional languages.

## Time-Space Tradeoffs

Different designs for the same language can have different complexity:

**Example**: Recognizing $\{ww \mid w \in \{0,1\}^*\}$

**Approach 1** (less space): Mark and compare in place
- Space: $O(n)$
- Time: $O(n^2)$

**Approach 2** (more space, multi-tape): Copy and compare
- Space: $O(n)$ per tape
- Time: $O(n)$

Choose the approach based on what resources matter for your analysis.

## Key Takeaways

- TM design combines finite control (states) and infinite memory (tape)
- Common patterns include marking, sweeping, copying, and shifting
- The tape serves as working memory for intermediate calculations
- Break complex tasks into phases tracked by states
- Languages beyond CFLs (like $a^n b^n c^n$) are TM-decidable
- Verify designs by tracing examples and maintaining loop invariants
- Multi-tape TMs simplify design but don't increase computational power
- TMs can compute arithmetic functions through systematic copying
- Modular design with clear state roles makes complex TMs manageable
- Different designs involve time-space tradeoffs
