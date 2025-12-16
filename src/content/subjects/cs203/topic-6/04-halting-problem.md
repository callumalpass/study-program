# The Halting Problem

The **Halting Problem** is the most famous undecidable problem: determining whether a given program will eventually halt or run forever.

## Formal Statement

HALT = {⟨M, w⟩ | TM M halts on input w}

**Question**: Can we build an algorithm that decides HALT?

**Answer**: No. (Turing, 1936)

## The Proof

**Theorem**: HALT is undecidable.

**Proof by contradiction**:

1. **Assume** decider H exists:
   - H(⟨M, w⟩) = accept if M halts on w
   - H(⟨M, w⟩) = reject if M loops on w

2. **Construct** new TM D:
   ```
   D(⟨M⟩):
     Run H(⟨M, ⟨M⟩⟩)
     If H accepts (M halts on ⟨M⟩):
       Loop forever
     If H rejects (M loops on ⟨M⟩):
       Halt
   ```

3. **Analyze** D on input ⟨D⟩:
   - If D halts on ⟨D⟩ → H(⟨D, ⟨D⟩⟩) accepts → D loops (contradiction!)
   - If D loops on ⟨D⟩ → H(⟨D, ⟨D⟩⟩) rejects → D halts (contradiction!)

4. **Conclusion**: H cannot exist. HALT is undecidable.

## Key Insight

The proof uses self-reference to create a paradox:
- D asks "what do I do on myself?"
- D does the opposite of what H predicts
- This leads to contradiction

## Recognizability

While undecidable, HALT is recognizable:

```
Simulate M on w
If simulation halts, accept
(If loops, we just never answer)
```

The complement (non-halting inputs) is not recognizable.

## Practical Implications

No program can:
- Detect all infinite loops
- Prove all programs terminate
- Build a perfect debugger

## Common Misunderstandings

**Myth**: "We can sometimes tell if programs halt."
**Reality**: True! We just can't do it for all programs.

**Myth**: "With enough time we can always tell."
**Reality**: Some programs may run for arbitrarily long before halting.

## Related Problems

All undecidable by reduction from HALT:

- **A_TM**: Does M accept w?
- **E_TM**: Is L(M) empty?
- **EQ_TM**: Do M₁ and M₂ accept the same language?
- **Totality**: Does M halt on all inputs?

## Historical Significance

Turing proved this in 1936, before electronic computers existed:
- Defined computation mathematically
- Established fundamental limits
- Foundation of theoretical CS

## Variations

All equivalent to HALT:
- **Self-halting**: Does M halt on ε?
- **Halting on empty**: Does M halt on empty input?
- **Blank-tape halting**: Does M halt when started on blank tape?

## Real-World Analogs

The halting problem appears in:
- **Virus detection**: Can't detect all malware
- **Program verification**: Can't verify all properties
- **Optimizing compilers**: Can't predict all behavior
- **Rice's theorem**: Any semantic property is undecidable

## The Busy Beaver Problem

A related undecidable function:
BB(n) = max steps a halting n-state TM takes

BB grows faster than any computable function—an extreme form of undecidability.
