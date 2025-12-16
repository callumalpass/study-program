import { Project } from '../../../core/types';

export const cs303Projects: Project[] = [
  {
    id: 'cs303-project-1',
    subjectId: 'cs303',
    title: 'Language Interpreter',
    description: 'Build an interpreter for a simple programming language with variables, arithmetic, conditionals, functions, and recursion. Implement lexing, parsing, type checking, and evaluation.',
    estimatedHours: 20,
    requirements: [
      'Design and implement a lexer that tokenizes source code',
      'Build a recursive descent parser that produces an AST',
      'Implement an environment-based evaluator for the AST',
      'Support integer and boolean literals, variables, and let bindings',
      'Implement arithmetic operators (+, -, *, /) and comparisons',
      'Add if-then-else expressions with proper short-circuit evaluation',
      'Support first-class functions with closures (lambda expressions)',
      'Implement recursive functions using letrec or similar mechanism',
      'Add a simple type checker that catches type errors before evaluation',
      'Provide helpful error messages for lexing, parsing, and type errors'
    ],
    rubric: [
      {
        name: 'Lexer and Parser',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'Robust lexer and parser with comprehensive error handling and recovery' },
          { score: 75, label: 'Good', description: 'Functional lexer and parser with basic error messages' },
          { score: 50, label: 'Satisfactory', description: 'Basic parsing works but limited error handling' },
          { score: 25, label: 'Needs Improvement', description: 'Parser incomplete or crashes on valid input' }
        ]
      },
      {
        name: 'Evaluation',
        weight: 30,
        levels: [
          { score: 100, label: 'Excellent', description: 'All features implemented correctly including closures and recursion' },
          { score: 75, label: 'Good', description: 'Core features work well with minor issues in advanced features' },
          { score: 50, label: 'Satisfactory', description: 'Basic evaluation works but closures or recursion buggy' },
          { score: 25, label: 'Needs Improvement', description: 'Evaluation incomplete or incorrect for basic cases' }
        ]
      },
      {
        name: 'Type System',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'Complete type checker with inference and informative error messages' },
          { score: 75, label: 'Good', description: 'Type checker catches most errors with decent messages' },
          { score: 50, label: 'Satisfactory', description: 'Basic type checking but misses some errors' },
          { score: 25, label: 'Needs Improvement', description: 'Type checker incomplete or incorrect' }
        ]
      },
      {
        name: 'Code Quality',
        weight: 20,
        levels: [
          { score: 100, label: 'Excellent', description: 'Clean, modular code with clear separation of concerns' },
          { score: 75, label: 'Good', description: 'Well-organized code with some room for improvement' },
          { score: 50, label: 'Satisfactory', description: 'Working code but poorly organized' },
          { score: 25, label: 'Needs Improvement', description: 'Disorganized code, hard to understand' }
        ]
      }
    ]
  },
  {
    id: 'cs303-project-2',
    subjectId: 'cs303',
    title: 'Type Inference Engine',
    description: 'Implement a Hindley-Milner style type inference engine that automatically deduces types without explicit annotations. Support polymorphic types and let-polymorphism.',
    estimatedHours: 18,
    requirements: [
      'Parse a simple functional language with let bindings and lambdas',
      'Implement type variables, type constructors, and function types',
      'Build a constraint generation system from expressions',
      'Implement Robinson\'s unification algorithm for type constraints',
      'Support polymorphic types (forall quantification)',
      'Implement let-polymorphism (generalization at let bindings)',
      'Handle type errors with informative messages showing conflicts',
      'Support basic built-in types (int, bool) and operators',
      'Implement occurs check to prevent infinite types',
      'Add a pretty printer for inferred type schemes'
    ],
    rubric: [
      {
        name: 'Constraint Generation',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'Correct constraints for all language constructs' },
          { score: 75, label: 'Good', description: 'Constraints work for most cases' },
          { score: 50, label: 'Satisfactory', description: 'Basic constraint generation but misses edge cases' },
          { score: 25, label: 'Needs Improvement', description: 'Constraint generation incomplete' }
        ]
      },
      {
        name: 'Unification',
        weight: 30,
        levels: [
          { score: 100, label: 'Excellent', description: 'Complete unification with occurs check and substitution' },
          { score: 75, label: 'Good', description: 'Unification works correctly for most types' },
          { score: 50, label: 'Satisfactory', description: 'Basic unification but issues with complex types' },
          { score: 25, label: 'Needs Improvement', description: 'Unification incorrect or incomplete' }
        ]
      },
      {
        name: 'Polymorphism',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'Full let-polymorphism with proper generalization' },
          { score: 75, label: 'Good', description: 'Polymorphism works in common cases' },
          { score: 50, label: 'Satisfactory', description: 'Limited polymorphism support' },
          { score: 25, label: 'Needs Improvement', description: 'No polymorphism or incorrect' }
        ]
      },
      {
        name: 'Error Reporting',
        weight: 20,
        levels: [
          { score: 100, label: 'Excellent', description: 'Clear error messages showing type conflicts and locations' },
          { score: 75, label: 'Good', description: 'Helpful error messages for common errors' },
          { score: 50, label: 'Satisfactory', description: 'Basic error detection but unclear messages' },
          { score: 25, label: 'Needs Improvement', description: 'Poor or no error messages' }
        ]
      }
    ]
  },
  {
    id: 'cs303-project-3',
    subjectId: 'cs303',
    title: 'Garbage Collector Implementation',
    description: 'Implement multiple garbage collection algorithms and compare their performance. Include mark-sweep, copying, and reference counting collectors.',
    estimatedHours: 22,
    requirements: [
      'Create a simulated heap with allocation and deallocation',
      'Implement mark-and-sweep garbage collection with root set traversal',
      'Implement a copying/semi-space collector',
      'Implement reference counting with cycle detection',
      'Add support for weak references that don\'t prevent collection',
      'Implement generational collection with young/old generations',
      'Create benchmarks comparing collection algorithms',
      'Measure and report collection pause times and throughput',
      'Visualize heap state and collection progress',
      'Support configurable heap sizes and collection thresholds'
    ],
    rubric: [
      {
        name: 'Mark-Sweep Collector',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'Correct mark-sweep with efficient traversal and complete sweeping' },
          { score: 75, label: 'Good', description: 'Working mark-sweep with minor inefficiencies' },
          { score: 50, label: 'Satisfactory', description: 'Basic mark-sweep but some memory leaks' },
          { score: 25, label: 'Needs Improvement', description: 'Mark-sweep incomplete or incorrect' }
        ]
      },
      {
        name: 'Copying Collector',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'Efficient copying with proper forwarding pointers' },
          { score: 75, label: 'Good', description: 'Working copying collector with good performance' },
          { score: 50, label: 'Satisfactory', description: 'Copying works but inefficient' },
          { score: 25, label: 'Needs Improvement', description: 'Copying collector broken' }
        ]
      },
      {
        name: 'Reference Counting',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'Reference counting with cycle detection' },
          { score: 75, label: 'Good', description: 'Working reference counting, basic cycle handling' },
          { score: 50, label: 'Satisfactory', description: 'Reference counting works but no cycle detection' },
          { score: 25, label: 'Needs Improvement', description: 'Reference counting incorrect' }
        ]
      },
      {
        name: 'Benchmarking and Analysis',
        weight: 25,
        levels: [
          { score: 100, label: 'Excellent', description: 'Comprehensive benchmarks with insightful analysis' },
          { score: 75, label: 'Good', description: 'Good benchmarks comparing algorithms' },
          { score: 50, label: 'Satisfactory', description: 'Basic benchmarks but limited analysis' },
          { score: 25, label: 'Needs Improvement', description: 'No meaningful benchmarks' }
        ]
      }
    ]
  },
  {
    id: 'cs303-project-4',
    subjectId: 'cs303',
    title: 'Virtual Machine and Bytecode Compiler',
    description: 'Build a stack-based virtual machine and a compiler that translates a high-level language to bytecode. Include basic optimizations.',
    estimatedHours: 25,
    requirements: [
      'Design a bytecode instruction set for a stack-based VM',
      'Implement the VM with instruction dispatch loop',
      'Support local variables, function calls, and return values',
      'Implement control flow instructions (jumps, conditionals)',
      'Build a compiler from AST to bytecode',
      'Add constant folding optimization during compilation',
      'Implement dead code elimination for unreachable code',
      'Support closures with captured variables',
      'Add a disassembler to inspect generated bytecode',
      'Include debugging support (breakpoints, stack traces)'
    ],
    rubric: [
      {
        name: 'Virtual Machine',
        weight: 30,
        levels: [
          { score: 100, label: 'Excellent', description: 'Efficient VM with all instructions and proper error handling' },
          { score: 75, label: 'Good', description: 'Working VM with most features' },
          { score: 50, label: 'Satisfactory', description: 'Basic VM but missing some instructions' },
          { score: 25, label: 'Needs Improvement', description: 'VM incomplete or incorrect' }
        ]
      },
      {
        name: 'Compiler',
        weight: 30,
        levels: [
          { score: 100, label: 'Excellent', description: 'Complete compiler generating correct bytecode for all constructs' },
          { score: 75, label: 'Good', description: 'Compiler handles most language features' },
          { score: 50, label: 'Satisfactory', description: 'Basic compilation but some features missing' },
          { score: 25, label: 'Needs Improvement', description: 'Compiler generates incorrect code' }
        ]
      },
      {
        name: 'Optimizations',
        weight: 20,
        levels: [
          { score: 100, label: 'Excellent', description: 'Multiple effective optimizations correctly implemented' },
          { score: 75, label: 'Good', description: 'Some optimizations working' },
          { score: 50, label: 'Satisfactory', description: 'Basic optimization attempts' },
          { score: 25, label: 'Needs Improvement', description: 'No optimizations or incorrect' }
        ]
      },
      {
        name: 'Debugging Tools',
        weight: 20,
        levels: [
          { score: 100, label: 'Excellent', description: 'Full debugging support with disassembler and stack traces' },
          { score: 75, label: 'Good', description: 'Useful debugging features' },
          { score: 50, label: 'Satisfactory', description: 'Basic disassembler only' },
          { score: 25, label: 'Needs Improvement', description: 'No debugging support' }
        ]
      }
    ]
  }
];
