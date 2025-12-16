import type { Project } from '../../../core/types';

export const cs304Projects: Project[] = [
  {
    id: 'cs304-project-1',
    subjectId: 'cs304',
    title: 'Simple Expression Language Compiler',
    description: `
Build a complete compiler for a simple expression language that compiles to a stack-based virtual machine.

Your compiler will implement all major phases:
- Lexical analysis: tokenizing expressions
- Syntax analysis: parsing with recursive descent
- Semantic analysis: type checking
- Code generation: stack machine bytecode
- Runtime: bytecode interpreter

The language should support:
- Integer and float arithmetic (+, -, *, /)
- Variables and assignment
- Comparison operators (<, >, ==, !=)
- If-then-else expressions
- Let bindings
- Print statements

This project gives you hands-on experience with all phases of compilation, from source code to execution.
    `.trim(),
    requirements: [
      'Implement a lexer that handles integers, floats, identifiers, operators, and keywords',
      'Build a recursive descent parser that produces a well-formed AST',
      'Implement type checking with a symbol table (detect int vs float type errors)',
      'Generate stack machine bytecode from the AST',
      'Build a bytecode interpreter that executes the compiled code',
      'Include comprehensive test cases for each compiler phase',
    ],
    rubric: [
      {
        name: 'Lexical Analysis',
        weight: 15,
        levels: [
          { score: 4, label: 'Excellent', description: 'Lexer handles all token types including edge cases; good error messages with line/column' },
          { score: 3, label: 'Good', description: 'Lexer correctly tokenizes all required tokens' },
          { score: 2, label: 'Satisfactory', description: 'Basic tokenization works with some issues' },
          { score: 1, label: 'Needs Improvement', description: 'Lexer missing tokens or has significant bugs' },
        ],
      },
      {
        name: 'Syntax Analysis',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Parser handles full grammar with clear error recovery' },
          { score: 3, label: 'Good', description: 'Parser produces correct AST for valid programs' },
          { score: 2, label: 'Satisfactory', description: 'Parser works for simple expressions' },
          { score: 1, label: 'Needs Improvement', description: 'Parser fails on basic inputs' },
        ],
      },
      {
        name: 'Semantic Analysis',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Type checker catches all errors with helpful messages; proper scope handling' },
          { score: 3, label: 'Good', description: 'Type checking works correctly for common cases' },
          { score: 2, label: 'Satisfactory', description: 'Basic type checking implemented' },
          { score: 1, label: 'Needs Improvement', description: 'Type checker missing or buggy' },
        ],
      },
      {
        name: 'Code Generation & Runtime',
        weight: 25,
        levels: [
          { score: 4, label: 'Excellent', description: 'Bytecode correct and efficient; interpreter handles all operations' },
          { score: 3, label: 'Good', description: 'Generated code executes correctly' },
          { score: 2, label: 'Satisfactory', description: 'Basic code generation works' },
          { score: 1, label: 'Needs Improvement', description: 'Code generation or execution has major issues' },
        ],
      },
      {
        name: 'Testing & Documentation',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Comprehensive tests for each phase; clear documentation' },
          { score: 3, label: 'Good', description: 'Good test coverage; reasonable documentation' },
          { score: 2, label: 'Satisfactory', description: 'Some tests present; basic documentation' },
          { score: 1, label: 'Needs Improvement', description: 'Minimal testing or documentation' },
        ],
      },
    ],
    estimatedHours: 20,
    scaffolding: {
      overview: 'Build a working compiler that takes you through all phases from source text to execution.',
      gettingStarted: [
        'Define token types as an enum and implement the lexer with character-by-character scanning',
        'Define AST node classes for expressions (NumExpr, BinOpExpr, IfExpr, LetExpr, etc.)',
        'Implement recursive descent parsing following the grammar rules',
        'Build a symbol table class for tracking variable types and scopes',
        'Design stack-based bytecode instructions (PUSH, ADD, LOAD, STORE, JUMP, etc.)',
      ],
      milestones: [
        'Milestone 1: Lexer that tokenizes arithmetic expressions with tests',
        'Milestone 2: Parser that builds AST for expressions without variables',
        'Milestone 3: Add variable support with let bindings and type checking',
        'Milestone 4: Code generator producing bytecode for all constructs',
        'Milestone 5: Working interpreter executing bytecode correctly',
      ],
      tips: [
        'Test each phase independently before integrating',
        'Start with integers only, then add floats once the pipeline works',
        'Use Python dataclasses or TypeScript interfaces for clean AST nodes',
        'Print intermediate representations (tokens, AST, bytecode) for debugging',
      ],
    },
  },
  {
    id: 'cs304-project-2',
    subjectId: 'cs304',
    title: 'Optimizing Compiler Backend',
    description: `
Implement an optimizing compiler backend that performs data flow analysis and applies classic optimizations.

You will work with a provided three-address code IR and implement:
- Control flow graph construction
- Data flow analysis framework
- Several optimization passes
- Basic register allocation

This project focuses on the optimization and code generation phases of compilation, giving you hands-on experience with the techniques that make compilers produce fast code.

Key optimizations to implement:
- Constant propagation and folding
- Dead code elimination
- Common subexpression elimination
- Basic block optimization

You'll see how data flow analysis enables compilers to reason about program behavior and transform code.
    `.trim(),
    requirements: [
      'Build a control flow graph from three-address code (identify basic blocks and edges)',
      'Implement reaching definitions analysis (forward, may problem)',
      'Implement live variable analysis (backward, may problem)',
      'Apply constant propagation optimization',
      'Apply dead code elimination optimization',
      'All optimizations must preserve program semantics',
    ],
    rubric: [
      {
        name: 'Control Flow Graph',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'CFG correctly identifies all blocks, edges, entry/exit; handles complex control flow' },
          { score: 3, label: 'Good', description: 'CFG correct for programs with branches and loops' },
          { score: 2, label: 'Satisfactory', description: 'Basic CFG construction works' },
          { score: 1, label: 'Needs Improvement', description: 'CFG has missing blocks or edges' },
        ],
      },
      {
        name: 'Data Flow Analysis',
        weight: 30,
        levels: [
          { score: 4, label: 'Excellent', description: 'Both analyses reach correct fixed points; clean implementation' },
          { score: 3, label: 'Good', description: 'Analyses produce correct results on test cases' },
          { score: 2, label: 'Satisfactory', description: 'One analysis works correctly' },
          { score: 1, label: 'Needs Improvement', description: 'Analyses do not converge or produce wrong results' },
        ],
      },
      {
        name: 'Optimizations',
        weight: 30,
        levels: [
          { score: 4, label: 'Excellent', description: 'All optimizations correct and effective; good interaction between passes' },
          { score: 3, label: 'Good', description: 'Optimizations work correctly in common cases' },
          { score: 2, label: 'Satisfactory', description: 'At least one optimization works' },
          { score: 1, label: 'Needs Improvement', description: 'Optimizations break code or have no effect' },
        ],
      },
      {
        name: 'Code Quality & Testing',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Clean modular code; tests verify semantics preservation' },
          { score: 3, label: 'Good', description: 'Well-organized with good test coverage' },
          { score: 2, label: 'Satisfactory', description: 'Code works but could be better organized' },
          { score: 1, label: 'Needs Improvement', description: 'Difficult to understand or test' },
        ],
      },
    ],
    estimatedHours: 25,
    scaffolding: {
      overview: 'Build an optimizer that transforms IR code to be more efficient while preserving behavior.',
      gettingStarted: [
        'Define data structures for three-address code instructions (TAC class with opcode, dest, src1, src2)',
        'Implement basic block identification by finding leaders (first instruction, branch targets, after branches)',
        'Create a BasicBlock class with instructions list and predecessor/successor lists',
        'Build the gen/kill sets before implementing the iterative analysis',
        'Start with constant propagation as it is the most straightforward optimization',
      ],
      milestones: [
        'Milestone 1: Parse three-address code input into instruction list',
        'Milestone 2: Build CFG with correct basic blocks and edges',
        'Milestone 3: Implement reaching definitions with correct fixed point iteration',
        'Milestone 4: Implement live variable analysis',
        'Milestone 5: Apply constant propagation and dead code elimination',
      ],
      tips: [
        'A basic block starts at a label or after a branch, ends at a branch or before a label',
        'For reaching definitions, gen set contains definitions in the block, kill set contains all other definitions of the same variables',
        'Data flow analysis iterates until in/out sets stop changing',
        'Dead code: if a variable is not live after an assignment, and has no side effects, the assignment is dead',
      ],
    },
  },
];
