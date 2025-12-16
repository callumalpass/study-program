# Context-Free Grammars

## Learning Objectives

By the end of this topic, you will be able to:

- Define context-free grammars and their formal components
- Design grammars for programming language syntax
- Parse strings using derivations and parse trees
- Transform grammars to normal forms (CNF, GNF)
- Identify and eliminate ambiguity in grammars
- Apply the pumping lemma for context-free languages
- Implement parsing algorithms for CFGs

## Core Concepts

Context-free grammars (CFGs) are more powerful than regular languages and can describe nested structures like balanced parentheses and recursive syntax. They form the basis for syntax analysis in compilers.

### Grammar Components

A CFG is a 4-tuple (V, Σ, R, S) where V is a set of variables, Σ is the terminal alphabet, R is a set of production rules, and S is the start variable.

### Derivations and Parse Trees

Derivations show how strings are generated from the grammar. Parse trees provide a hierarchical view of the derivation structure.

## Key Topics

1. **Grammar Definition**: Variables, terminals, and productions
2. **Derivations**: Leftmost, rightmost, and arbitrary derivations
3. **Parse Trees**: Representing derivation structure
4. **Ambiguity**: Grammars with multiple parse trees
5. **Normal Forms**: Chomsky and Greibach normal forms
6. **Pumping Lemma for CFLs**: Proving non-context-freeness
7. **Closure Properties**: What operations preserve CFLs
