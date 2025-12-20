---
id: cs203-t5-churchturing
title: "Church-Turing Thesis"
order: 7
---

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

## Why It's a Thesis, Not a Theorem

The Church-Turing thesis occupies a unique position in mathematics and computer science:

**Cannot be proved** because:
- "Algorithm" is an informal, intuitive concept
- "Effective computation" is not mathematically defined
- You cannot formally prove statements about informal notions

**Cannot be disproved** (so far) because:
- No counterexample has been found in 90+ years
- Every proposed computational model has been equivalent
- All algorithms humans conceive are TM-computable

This makes it a **thesis** or **conjecture** about the nature of computation, not a mathematical theorem.

## The 1936 Convergence

Three mathematicians independently proposed equivalent models in 1936:

**Alan Turing**: Turing machines
- Inspired by human computers doing calculations
- Focused on mechanical, step-by-step processes
- Introduced the tape and finite control model

**Alonzo Church**: Lambda calculus
- Based on function application and abstraction
- Focused on mathematical functions and recursion
- Used in modern functional programming (Lisp, Haskell)

**Emil Post**: Post production systems
- Based on string rewriting rules
- Focused on formal grammars and transformations
- Influenced formal language theory

**Stunning result**: All three models were proved equivalent within a year. This convergence was seen as evidence that they captured something fundamental about computation itself.

## The Impact on Hilbert's Program

David Hilbert's **Entscheidungsproblem** (decision problem, 1928) asked:

> Is there an algorithm that can determine whether any given mathematical statement is provable?

The Church-Turing thesis was developed to answer this question:

1. **Formalize "algorithm"**: Define it as TM-computable
2. **Prove undecidability**: Show no TM can solve Entscheidungsproblem
3. **Conclude**: No algorithm exists for the decision problem

This was a shocking result: mathematics has inherent limits, not just practical limitations.

## Detailed Evidence for the Thesis

### Evidence 1: Convergence of Models

Every computational model ever proposed has been equivalent to TMs:

**1930s**: Turing machines, lambda calculus, recursive functions, Post systems
**1940s**: Markov algorithms
**1950s**: Programming languages (FORTRAN, Lisp)
**1960s**: Register machines, random access machines
**1970s-1980s**: Modern programming languages (C, Pascal, Java)
**1990s-2000s**: Scripting languages (Python, JavaScript)
**2000s-2010s**: Functional languages (Haskell, Scala)

All Turing-complete. No stronger model found.

### Evidence 2: Closure Properties

The class of TM-computable functions is closed under:
- Composition: If $f$ and $g$ are computable, so is $f \circ g$
- Recursion: If recursion is algorithmic, result is computable
- Minimization: If search is algorithmic, result is computable

This closure matches our intuition about what algorithms can do.

### Evidence 3: No Counterexamples

Despite decades of searching, no one has found a function that:
- Is intuitively computable by an algorithm
- Cannot be computed by any Turing machine

Every algorithm anyone has conceived can be implemented as a TM.

### Evidence 4: Real Computers

Every real computer ever built is equivalent to a TM (with finite memory):
- Von Neumann architecture: Based on stored programs (inspired by UTM)
- Modern CPUs: Finite state machines with memory
- Quantum computers: Same computable functions (different complexity)

No physical computer computes beyond TMs.

## Turing's Original Argument

Turing's 1936 paper argued for the thesis by analyzing what a human "computer" (person doing calculations) could do:

**Human capabilities**:
1. Can see finitely many symbols at once
2. Can remember finitely many states
3. Can write and erase symbols
4. Can move attention step by step

**TM components**:
1. Reads one symbol at a time
2. Has finitely many states
3. Can write and erase on tape
4. Moves one cell at a time

**Conclusion**: TMs formalize human computation. If humans can't compute beyond TMs, neither can algorithms.

This argument is intuitive but not rigorous—hence it's a thesis, not a theorem.

## Quantum Computing and the Thesis

Quantum computers have raised interesting questions:

**Church-Turing thesis**: Still holds for quantum computers
- Quantum computers compute the same functions as TMs
- Same decidable/undecidable distinction
- No new functions computable

**Complexity**: Quantum computers may be faster
- Shor's algorithm: Factors in polynomial time
- Grover's algorithm: Database search speedup
- But still bounded by exponential time

**Physical Church-Turing thesis**: Possibly violated
- This stronger thesis says physical devices can't compute faster than polynomial overhead
- Quantum computers may violate this (polynomial vs exponential)

The classical Church-Turing thesis remains unchallenged.

## Philosophical Implications

The thesis raises deep questions:

**1. Can human minds compute beyond TMs?**
- If minds are physical, probably not
- If minds are non-physical, maybe?
- No consensus; connects to philosophy of mind

**2. What is the nature of computation?**
- Is computation fundamentally discrete?
- Does the thesis reflect physical reality or mathematical necessity?
- Still debated in philosophy of science

**3. Are there limits to knowledge?**
- Undecidable problems show algorithmic limits
- Does this mean some truths are unknowable?
- Connects to Gödel's incompleteness theorems

## Extended Church-Turing Thesis

**Extended thesis**: Any "reasonable" physical device can be simulated by a probabilistic TM with polynomial overhead.

**Status**: Less certain than classical thesis
- Quantum computers may violate it
- Analog computers raise questions
- Active research area

This matters for complexity theory (P vs BPP vs BQP) but not computability.

## Practical Applications

The thesis has concrete implications for computer science:

**1. Programming languages**: No language is more powerful than TMs
- All Turing-complete languages compute same functions
- Language design focuses on usability, not power

**2. Algorithm analysis**: Can study TMs instead of real machines
- Results transfer to real computers
- Theory matches practice

**3. Software verification**: Can prove properties of algorithms
- Undecidability results apply to real programs
- Sets limits on what can be verified

**4. Compiler construction**: Can compile any algorithm
- Source and target languages are equivalent
- No loss of computational power

## Historical Impact

The Church-Turing thesis has shaped computer science:

**1940s-1950s**: Foundation for early computers
- Von Neumann architecture based on UTM concept
- Stored-program concept from Turing's work

**1960s-1970s**: Theoretical computer science emerges
- Computability theory based on thesis
- Complexity theory uses TMs as standard model

**1980s-1990s**: Practical verification
- Model checking, program analysis
- Based on computability results

**2000s-present**: Quantum information theory
- Re-examines thesis in quantum context
- Leads to new complexity classes

## Key Takeaways

- The Church-Turing thesis claims TMs capture all effective computation
- It's a thesis (not theorem) because "algorithm" is informal
- Three independent models (TM, lambda calculus, recursive functions) proved equivalent in 1936
- 90+ years of searching has found no counterexamples
- Every proposed computational model has been TM-equivalent
- Real computers are TM-equivalent (with finite memory)
- The thesis enabled answering Hilbert's Entscheidungsproblem negatively
- Quantum computers compute same functions but possibly faster
- The extended thesis about efficiency is less certain
- The thesis has deep philosophical implications about minds and computation
- It provides the foundation for computability and complexity theory
- All Turing-complete programming languages are equally powerful
- The thesis justifies using TMs as the standard model in theory
