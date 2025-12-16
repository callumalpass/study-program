# Finite Automata

## Learning Objectives

By the end of this topic, you will be able to:

- Define deterministic finite automata (DFA) and their formal components
- Design nondeterministic finite automata (NFA) for pattern recognition
- Apply the subset construction to convert NFA to DFA
- Prove that languages are regular using automata
- Minimize DFA using equivalence classes
- Apply the pumping lemma to prove non-regularity
- Analyze the relationship between computational models

## Core Concepts

Finite automata are the simplest model of computation, consisting of states, transitions, and acceptance conditions. They form the theoretical foundation for lexical analysis, pattern matching, and protocol verification.

### Deterministic Finite Automata (DFA)

A DFA is defined by a 5-tuple (Q, Σ, δ, q₀, F) where Q is a finite set of states, Σ is an input alphabet, δ: Q × Σ → Q is a transition function, q₀ is the start state, and F ⊆ Q is the set of accepting states.

### Nondeterministic Finite Automata (NFA)

NFAs extend DFAs by allowing multiple transitions from a state on the same input, including ε-transitions. Despite their flexibility, NFAs recognize exactly the same languages as DFAs.

## Key Topics

1. **DFA Fundamentals**: Formal definition, computation, and language recognition
2. **NFA and ε-Transitions**: Nondeterminism and its equivalent power to DFAs
3. **Subset Construction**: Converting NFAs to equivalent DFAs
4. **DFA Minimization**: Finding the minimal automaton for a language
5. **State Elimination**: Converting automata to regular expressions
6. **Closure Properties**: Union, concatenation, and Kleene star
7. **Pumping Lemma**: Proving languages are not regular
