import { Project } from '../../../core/types';

export const math101Projects: Project[] = [
  {
    id: 'math101-project-1',
    subjectId: 'math101',
    title: 'Logic Engine & Truth Table Generator',
    description: 'Design and implement a system that can parse, evaluate, and manipulate propositional logic expressions. Your system should support all standard logical connectives (AND, OR, NOT, IMPLIES, IFF), generate truth tables, check for tautologies and contradictions, determine logical equivalence between expressions, and convert expressions to various normal forms (CNF, DNF). This project bridges the gap between abstract logic and concrete implementation.',
    requirements: [
      'Parse propositional logic expressions from string input (e.g., "(P -> Q) & -R")',
      'Support all five standard logical connectives: AND (&), OR (|), NOT (- or !), IMPLIES (->), IFF (<->)',
      'Generate and display complete truth tables for any valid expression with up to 5 variables',
      'Identify whether an expression is a tautology, contradiction, or contingency',
      'Implement a "Logic Calculator" mode where the user enters two expressions and the system determines if they are logically equivalent',
      'Convert expressions to Conjunctive Normal Form (CNF)',
      'Convert expressions to Disjunctive Normal Form (DNF)',
      'Provide a clear Command Line Interface (CLI) or GUI',
      'Include a suite of 15 test cases proving the correctness of your truth tables and equivalences',
      'Handle syntax errors in user input gracefully'
    ],
    rubric: [
      {
        name: 'Parsing & Evaluation',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Robust recursive descent parser or similar; handles nested expressions and precedence correctly.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Parses most expressions correctly; minor issues with precedence or complex nesting.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Works for simple expressions but fails on complex ones.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Parser not functional.'
          }
        ]
      },
      {
        name: 'Truth Table Generation',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Formatted table output; correct rows for all variable combinations; handles 5+ variables.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Correct values but poor formatting or limited to fewer variables.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic output, some errors in logic.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Incorrect or missing tables.'
          }
        ]
      },
      {
        name: 'Advanced Features (CNF/DNF/Equivalence)',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All advanced features implemented and verified correct.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Equivalence check works; CNF/DNF works for simple cases.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Only equivalence checking is implemented.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Advanced features missing.'
          }
        ]
      },
      {
        name: 'Code Quality',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Clean, modular code; types used effectively; comprehensive comments.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Readable code but some functions are too large or repetitive.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Messy code, hard to follow logic.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Spaghetti code, no structure.'
          }
        ]
      }
    ],
    estimatedHours: 15,
    scaffolding: {
      overview: 'Stage the build: tokenizer → parser → evaluator → truth tables → CNF/DNF/equivalence.',
      gettingStarted: [
        'Define token types (VAR, NOT, AND, OR, IMPLIES, IFF, LPAREN, RPAREN) and write a tokenizer.',
        'Sketch AST node shapes (Variable, Not, Binary) and a precedence table.',
        'Plan an eval(node, env) function before writing the parser.'
      ],
      milestones: [
        'Tokenizer passes a handful of sample inputs.',
        'Parser builds ASTs for 5 sample expressions (no evaluation yet).',
        'Evaluator returns correct booleans for given assignments.',
        'Truth table generator works for ≤5 vars and flags tautology/contradiction.',
        'CNF/DNF conversion + equivalence checker working on simple cases.'
      ],
      starterResources: [
        { label: 'Test seeds', description: 'P, -P, P & Q, P -> Q, (P -> Q) & -R, (P | Q) <-> (Q | P).' },
        { label: 'AST sketch', description: 'Node types: Var {name}, Not {child}, Bin {op,left,right}.' }
      ],
      tips: [
        'Keep tokenizer/parser pure; separate from I/O.',
        'Collect variables by walking the AST once; reuse for tables.',
        'Apply De Morgan + distribution rules on the AST for CNF/DNF—keep it simple.'
      ]
    }
  },
  {
    id: 'math101-project-2',
    subjectId: 'math101',
    title: 'Set Theory Visualizer & Calculator',
    description: 'Create an application that allows users to define sets and perform standard set operations. The tool should handle both finite sets (entered as lists) and simple infinite sets (described by properties, e.g., "evens"). Users should be able to compute unions, intersections, differences, and power sets. A key feature is the "Identity Verifier" where a user can input a set identity (e.g., A U (B n C) = (A U B) n (A U C)) and the system verifies it for given sample sets.',
    requirements: [
      'Allow users to define sets via roster method (e.g., {1, 2, 3})',
      'Implement Union, Intersection, Difference, Symmetric Difference, and Cartesian Product',
      'Implement a Power Set generator (with warnings for sets > 10 elements)',
      'Check for subset and proper subset relationships',
      'Visualize relationships using text-based Venn diagrams (ASCII art) or graphical output if possible',
      'Verify De Morgan\'s Laws for sets with user-provided examples',
      'Include a "Quiz Mode" where the system generates a random set operation question',
      'Save/Load defined sets to a JSON file'
    ],
    rubric: [
      {
        name: 'Core Operations',
        weight: 35,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All set operations implemented correctly, including Cartesian product and Power set.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Most operations work; Power set might be buggy for edge cases.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic Union/Intersection/Difference only.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Operations produce incorrect results.'
          }
        ]
      },
      {
        name: 'Interface & Visualization',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Intuitive interface; creative text-based or graphical visualization of set overlaps.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Functional interface; simple list outputs.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Clunky interface; hard to read output.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Unusable interface.'
          }
        ]
      },
      {
        name: 'Feature Completeness',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Includes Identity Verifier, Quiz Mode, and Save/Load functionality.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Missing one minor feature (e.g., Quiz Mode).'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Missing multiple features.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Bare bones implementation.'
          }
        ]
      },
      {
        name: 'Error Handling',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Gracefully handles invalid inputs, duplicate elements, and large power sets.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Catches most errors but might crash on edge cases.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Minimal error checking.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'No error checking.'
          }
        ]
      }
    ],
    estimatedHours: 12,
    scaffolding: {
      overview: 'Ship a minimal REPL + core operations first; then layer visualizations and identity checks.',
      gettingStarted: [
        'Choose a set representation (arrays) and normalize by sorting/unique on input.',
        'Write pure helpers for union/intersection/diff/symmetricDiff/cartesian.',
        'Create a REPL loop that parses input into a command + args.'
      ],
      milestones: [
        'Core operations return correct lists for small sets.',
        'Power set works with guardrails for size > 10 (warn instead of crash).',
        'Subset/proper subset checks and text Venn for two sets.',
        'Identity verifier plugs A/B/C samples into both sides and compares.',
        'Save/load user-defined sets; add one quiz-mode prompt.'
      ],
      starterResources: [
        { label: 'Sample sets', description: 'A={1,2,3}, B={2,3,4}, C={1,4}; EVENS up to 10 for property-based input.' },
        { label: 'Function stubs', description: 'union(a,b), intersect(a,b), diff(a,b), symDiff(a,b), cartesian(a,b).' }
      ],
      tips: [
        'Normalize inputs early to simplify every operation.',
        'Keep visualizations optional; render text Venn from membership tests.',
        'Identity checks can use random samples of small sets for quick feedback.'
      ]
    }
  },
  {
    id: 'math101-project-3',
    subjectId: 'math101',
    title: 'Discrete Relation Analyzer',
    description: 'Build a tool that analyzes binary relations on finite sets. The user will input a set A and a list of ordered pairs representing the relation R. The system must determine if the relation is reflexive, symmetric, antisymmetric, and transitive. Based on these properties, it should classify the relation as an Equivalence Relation, Partial Order, or neither. If it is an equivalence relation, output the equivalence classes. If it is a partial order, output the minimal/maximal elements.',
    requirements: [
      'Input a set A (e.g., {1, 2, 3}) and relation R (e.g., {(1,1), (1,2)...})',
      'Display the relation as a Boolean Matrix (0s and 1s)',
      'Check properties: Reflexive, Irreflexive, Symmetric, Antisymmetric, Transitive',
      'Classify relation: Equivalence Relation, Partial Order, Total Order, Strict Order',
      'If Equivalence Relation: Compute and print the Partition (Equivalence Classes)',
      'If Partial Order: Identify Hasse Diagram edges (transitive reduction)',
      'Compute the Transitive Closure of the relation (using Warshall’s Algorithm or BFS)',
      'Generate random relations and analyze them'
    ],
    rubric: [
      {
        name: 'Property Analysis',
        weight: 40,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Correctly identifies all properties and classifications for any valid input.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Correctly identifies basic properties; transitive closure might be slow or buggy.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Fails on complex properties (e.g., antisymmetry) or specific edge cases.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Analysis is largely incorrect.'
          }
        ]
      },
      {
        name: 'Advanced Algorithms',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Efficient implementation of Transitive Closure and Partitioning algorithms.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Algorithms work but are inefficient $\mathcal{O}(n^4)$ or poorly implemented.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Missing Transitive Closure or Partitioning.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'No advanced algorithms.'
          }
        ]
      },
      {
        name: 'Presentation',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Clear matrix display; readable output of classes/partitions.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Functional output.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Hard to interpret output.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'No meaningful output.'
          }
        ]
      }
    ],
    estimatedHours: 15,
    scaffolding: {
      overview: 'Tackle it in layers: parsing input → property checks → classification → extras (closure, random generation).',
      gettingStarted: [
        'Normalize input: parse set A and relation R into an array of ordered pairs.',
        'Represent R as both a pair list and an adjacency matrix for easier checks.',
        'Write small predicates: is_reflexive(A, R), is_symmetric(R), is_transitive(R).'
      ],
      milestones: [
        'Matrix display renders correctly for small sets.',
        'Property checks return accurate booleans.',
        'Classification labels Equivalence/Partial/Total/Strict correctly.',
        'Equivalence classes or Hasse edges produced based on classification.',
        'Transitive closure implemented (Warshall/BFS) + random relation generator.'
      ],
      starterResources: [
        { label: 'Sample inputs', description: 'R1 on {1,2,3}: {(1,1),(2,2),(3,3)}; R2: {(1,2),(2,3)}; R3: {(a,a),(b,b),(a,b),(b,a)}.' },
        { label: 'Helper stubs', description: 'to_matrix(A,R), closure(R), equivalence_classes(A,R), hasse_edges(A,R).' }
      ],
      tips: [
        'Reuse the matrix for reflexive/symmetric/transitive checks to avoid rework.',
        'Keep parsing isolated so property functions assume clean data.',
        'Start with tiny sets (size 3–4) to validate every property quickly.'
      ]
    }
  },
  {
    id: 'math101-project-4',
    subjectId: 'math101',
    title: 'Function Property Mapper',
    description: 'Develop a program to explore the properties of functions between finite sets. Users define a domain, a codomain, and a mapping ruleset. The system analyzes the function to determine if it is well-defined, injective (one-to-one), surjective (onto), or bijective. It should also support function composition and finding inverses.',
    requirements: [
      'Define Domain A and Codomain B',
      'Define mapping f: A -> B either by list of pairs or a simple formula (e.g., f(x) = x % 3)',
      'Validate if the input constitutes a valid function (every input maps to exactly one output)',
      'Determine if f is Injective, Surjective, Bijective',
      'If Bijective, generate and display the Inverse Function f^-1',
      'Allow defining a second function g: B -> C and compute the composition g(f(x))',
      'Visualize the mapping (e.g., "Arrow Diagram" text output)',
      'Challenge Mode: Generate a random mapping and ask the user to guess its properties, providing feedback'
    ],
    rubric: [
      {
        name: 'Function Validation',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Accurately detects non-functions (undefined inputs, multiple outputs) and classifies valid ones.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Mostly correct; may miss edge cases in validation.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic checks only.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Cannot distinguish functions from relations.'
          }
        ]
      },
      {
        name: 'Composition & Inverse',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Correctly computes compositions and inverses; handles domain/codomain mismatches.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Computes correct values but crashes on invalid compositions.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Only basic composition implemented.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Features missing.'
          }
        ]
      },
      {
        name: 'Interactive Elements',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Engaging Challenge Mode and clear visualizations.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Basic Challenge Mode present.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'No interactive mode.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Bare bones IO.'
          }
        ]
      },
      {
        name: 'Code Structure',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Uses classes/interfaces for Sets and Functions; clean logic.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Procedural code that works.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Disorganized code.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Unreadable.'
          }
        ]
      }
    ],
    estimatedHours: 10,
    scaffolding: {
      overview: 'Ship the core function library, then add interactive challenges and visual cues.',
      gettingStarted: [
        'Define data types for Sets and Functions (domain, codomain, mapping).',
        'Implement pure helpers: compose(f,g), inverse(f), image(f,A), preimage(f,B).',
        'Create a simple input format and parser for functions and sets.'
      ],
      milestones: [
        'Parsing and core operations work on 2–3 sample functions.',
        'Composition/inverse validated with small domain/codomain sets.',
        'Challenge mode: generate a random function and ask the user to classify it.',
        'Visual output (text grid) for mappings or small “arrow diagram” print.',
        'Save/load user-defined functions and sets.'
      ],
      starterResources: [
        { label: 'Sample functions', description: 'f: A={1,2,3} -> B={a,b} with pairs {(1,a),(2,a),(3,b)}; g: B -> C={true,false}.' },
        { label: 'Function stubs', description: 'is_injective(f), is_surjective(f), compose(f,g), to_table(f).' }
      ],
      tips: [
        'Validate domain/codomain membership before computing any property.',
        'Compose carefully: g∘f means apply f then g; guard incompatible signatures.',
        'Keep challenge prompts small and fast so students get immediate feedback.'
      ]
    }
  }
];
