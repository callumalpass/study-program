# Tracing and Debugging Assembly-Like Code

Assembly looks intimidating because it’s low-level, but it’s also very systematic. Debugging becomes manageable when you adopt a consistent workflow.

## The workflow

1. **Label the state**: write down register values and any relevant memory.
2. **Step one instruction**: update only what the instruction affects.
3. **Update flags** when compares/tests happen.
4. **Decide the next PC**: sequential or branch/jump target.

## Common mistakes

- Confusing an **address** with the **value stored at that address**.
- Forgetting that operations are fixed-width (overflow/wrap can occur).
- Not tracking flags, then guessing branch behavior.

## A practical technique: annotate registers

As you infer meaning, rename registers in your notes:
- R0 = i (loop counter)
- R1 = ptr (pointer into array)
- R2 = sum

This dramatically reduces cognitive load.

## Key takeaways

- Tracing is a mechanical process: execute, update state, decide next PC.
- Most assembly bugs are misunderstandings about memory vs values or width/signedness.
- Good notes (renamed registers, state tables) are your best debugging tool.

