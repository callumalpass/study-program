# Pushdown Automata

## Learning Objectives

By the end of this topic, you will be able to:

- Define pushdown automata (PDA) and their components
- Design PDAs for context-free languages
- Convert between PDAs and context-free grammars
- Understand acceptance by final state vs empty stack
- Analyze deterministic vs nondeterministic PDAs
- Prove the equivalence of PDAs and CFGs
- Identify limitations of pushdown automata

## Core Concepts

Pushdown automata extend finite automata with a stack, enabling recognition of context-free languages. The stack provides unbounded memory with last-in-first-out access.

### PDA Components

A PDA is a 7-tuple (Q, Σ, Γ, δ, q₀, Z₀, F) including states, input alphabet, stack alphabet, transition function, start state, initial stack symbol, and accepting states.

### Stack Operations

PDAs can push symbols onto the stack, pop symbols off, or replace the top symbol. Transitions depend on the current state, input symbol, and top stack symbol.

## Key Topics

1. **PDA Definition**: Formal components and notation
2. **PDA Computation**: Configurations and moves
3. **Acceptance Modes**: Final state vs empty stack
4. **Designing PDAs**: Techniques for language recognition
5. **PDA to CFG Conversion**: Constructing equivalent grammars
6. **CFG to PDA Conversion**: Constructing equivalent automata
7. **Deterministic PDAs**: Power and limitations
