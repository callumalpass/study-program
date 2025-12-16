# Church-Turing Thesis

The **Church-Turing Thesis** asserts that Turing machines capture the intuitive notion of "algorithm" or "effective computation." It connects the mathematical model to the real world.

## Statement

**Church-Turing Thesis**: Every function that would be considered effectively computable by an algorithm is computable by a Turing machine.

Equivalently: Any "reasonable" model of computation is equivalent to Turing machines.

## Not a Theorem

The thesis is **not provable** mathematically because:
- "Algorithm" and "effective computation" are informal concepts
- Cannot formally prove a statement about informal notions
- It's a definition/claim about reality

## Evidence For the Thesis

### Equivalence of Models
All proposed computation models are equivalent:
- Turing machines
- Lambda calculus (Church)
- Recursive functions (Gödel)
- Post systems
- Register machines
- Modern programming languages

### No Counterexamples
No one has found a function that is:
- Intuitively computable
- But not TM-computable

### Programming Language Test
Any algorithm you can program is TM-computable. No programming language computes more than TMs.

## Historical Development

**1936**: Three independent proposals:
- **Turing**: Turing machines
- **Church**: Lambda calculus
- **Post**: Post systems

All proved equivalent, suggesting a fundamental concept.

## Implications

### Upper Bound on Computation
If no TM computes f, then f is not computable by any algorithm.

### Undecidability Results
When we prove something undecidable by TM, we're claiming no algorithm can solve it.

### Program Equivalence
Any algorithm can be implemented in any Turing-complete language.

## Turing Completeness

A system is **Turing-complete** if it can simulate a TM:
- Most programming languages
- HTML + CSS (surprisingly!)
- Cellular automata
- Many games (Conway's Life)

## Physical Church-Turing Thesis

Stronger claim: No physical device can compute more than a TM.

Considerations:
- Quantum computers: Same computability, different complexity
- Analog computers: Precision limits to finite information
- Relativistic computers: Theoretical edge cases

## Variants of the Thesis

### Polynomial Church-Turing Thesis
Any "reasonable" physical computer can be simulated by a TM with polynomial overhead.

Status: Quantum computers may violate this (polynomial vs exponential).

### Extended Church-Turing Thesis
Any reasonable computation model can be efficiently simulated by probabilistic TMs.

## Hypercomputation

**Hypercomputation**: Proposed models computing beyond TMs.

Examples:
- Oracle machines (TM + halting oracle)
- Infinite time TMs
- Accelerating TMs

Status: No physical realizations; mostly theoretical curiosities.

## Philosophical Significance

The thesis addresses:
- What is computation?
- What are the limits of algorithmic thought?
- Can minds compute more than TMs?

## Practical Significance

For computer science:
- Foundation for undecidability proofs
- Justifies analysis of TMs as universal
- Enables comparing language expressiveness
