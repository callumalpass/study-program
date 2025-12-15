# The Stack: Calls, Returns, and Frames (Intro)

Most architectures use a **stack** to manage function calls, local variables, and return addresses.

## What is the stack?

The stack is a region of memory used in a last-in-first-out (LIFO) way.

The **stack pointer (SP)** points to the “top” of the stack.

Operations conceptually:
- `PUSH x`: decrement SP (on many systems) and store x at `[SP]`
- `POP x`: load from `[SP]` and increment SP

The direction (grows down vs up) depends on architecture conventions; many common systems use a downward-growing stack.

## Call and return

A function call typically:
1. saves the return address (often pushed to stack)
2. jumps to the function body

A return:
1. restores the saved return address
2. jumps back

## Stack frames (high-level idea)

A stack frame is the slice of stack memory used by a function call. It may contain:
- return address
- saved registers
- local variables
- space for outgoing arguments

This model helps explain:
- recursion (many frames)
- buffer overflows (overwriting return address)
- debugging backtraces

## Key takeaways

- The stack is memory used for calls/returns and temporary storage.
- SP tracks the top of stack; call/return uses the stack to remember where to go back.
- Frames structure stack usage and explain many low-level bugs.

