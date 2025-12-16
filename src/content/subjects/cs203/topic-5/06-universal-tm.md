# Universal Turing Machines

A **Universal Turing Machine (UTM)** can simulate any other Turing machine. It's a "programmable computer" that takes a TM description and input as its own input.

## The Concept

A UTM U takes input ⟨M, w⟩:
- ⟨M⟩: Encoding of Turing machine M
- w: Input string for M

U simulates M on w:
- U accepts ⟨M, w⟩ ⟺ M accepts w
- U rejects ⟨M, w⟩ ⟺ M rejects w

## Encoding Turing Machines

Any TM can be encoded as a string ⟨M⟩:

### Binary Encoding
Encode components as binary strings:
- States: q₁ = 1, q₂ = 11, q₃ = 111, ...
- Symbols: similarly
- Transitions: tuples with delimiters

### Gödel Numbering
Map TM to unique integer:
- Encode transitions as sequence of integers
- Use prime factorization or other bijection

## UTM Construction

UTM U uses three tapes:
1. **Tape 1**: Input ⟨M, w⟩
2. **Tape 2**: Simulated tape of M
3. **Tape 3**: Current state of M

### Simulation Steps:
1. Initialize tape 2 with w, tape 3 with q₀
2. Read current state from tape 3
3. Read current symbol from tape 2
4. Look up transition in ⟨M⟩ on tape 1
5. Update tape 2, tape 3, head position
6. Repeat until M halts

## UTM Running Time

If M runs in time t on w, U runs in time O(t · |⟨M⟩|):
- Each step of M: scan ⟨M⟩ to find transition
- Total steps: t
- Overhead: |⟨M⟩| per step

With more sophisticated encoding: O(t log t) achievable.

## Existence Theorem

**Theorem**: There exists a Universal Turing Machine.

**Proof**: The construction above shows we can build such a machine. It's just a (complex) TM with fixed δ function.

## Historical Significance

Turing described the UTM in his 1936 paper:
- First theoretical "stored-program computer"
- Program and data in same memory
- Inspiration for von Neumann architecture

## The Language of the UTM

L_U = {⟨M, w⟩ | M accepts w}

This is the **acceptance problem** for TMs.

**Theorem**: L_U is Turing-recognizable but not decidable.

## Universality and Undecidability

The UTM leads to undecidability:
- If we could decide L_U, we could solve halting problem
- But we can't (proved via diagonalization)

## Minimal UTMs

How small can a UTM be?
- 2-state UTM with many symbols: exists
- 6-symbol UTM with few states: exists

There's a trade-off between states and symbols.

## Programming Languages

Every programming language is essentially a UTM:
- Interpreter reads program
- Simulates execution
- Same universality principle

## Applications

UTM concept underlies:
- **Compilation**: Programs as data
- **Virtualization**: Simulating machines
- **Emulation**: Running software for other systems
- **Self-reference**: Programs that manipulate programs

## Self-Reference

UTM enables self-reference:
- A program can read its own description
- Foundation for diagonalization arguments
- Key to Gödel's incompleteness theorem
