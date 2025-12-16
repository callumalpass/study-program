# Decidability

## Learning Objectives

By the end of this topic, you will be able to:

- Define decidable and recognizable languages
- Apply diagonalization to prove undecidability
- Prove the undecidability of the halting problem
- Use reductions to transfer undecidability
- Identify decidable problems for automata and grammars
- Apply Rice's theorem to non-trivial language properties
- Understand the limits of computation

## Core Concepts

Decidability theory explores the fundamental limits of what can be computed. Some problems are undecidable—no algorithm can solve them for all inputs.

### Decidable vs Recognizable

A language is decidable if a Turing machine always halts with the correct answer. A language is recognizable if a TM accepts strings in the language but may loop on strings outside it.

### The Halting Problem

The halting problem asks whether a given TM halts on a given input. Turing proved this is undecidable using diagonalization.

## Key Topics

1. **Decidable Languages**: Definition and examples
2. **Turing-Recognizable Languages**: Acceptance vs halting
3. **Diagonalization**: The key proof technique
4. **Halting Problem**: Proof of undecidability
5. **Reduction Techniques**: Mapping and Turing reductions
6. **Rice's Theorem**: Undecidability of semantic properties
7. **Decidability for Automata**: What problems are decidable
