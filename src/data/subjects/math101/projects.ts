import { Project } from '../../../core/types';

export const math101Projects: Project[] = [
  {
    id: 'math101-project-1',
    subjectId: 'math101',
    title: 'Formal Logic System Implementation',
    description: 'Design and implement a system that can parse, evaluate, and manipulate propositional logic expressions. Your system should support all standard logical connectives (AND, OR, NOT, IMPLIES, IFF), generate truth tables, check for tautologies and contradictions, determine logical equivalence between expressions, and convert expressions to various normal forms (CNF, DNF).\n\nThis project combines theoretical understanding of discrete mathematics with practical programming skills. You will need to create a parser for logical expressions, implement truth table generation algorithms, and develop algorithms for logical equivalence checking and normal form conversion.\n\nYour implementation should handle complex nested expressions, provide clear output formatting, and include comprehensive test cases demonstrating all features. Consider edge cases and ensure your system is robust and efficient.',
    requirements: [
      'Parse propositional logic expressions from string input (e.g., "(P AND Q) OR NOT R")',
      'Support all five standard logical connectives: AND, OR, NOT, IMPLIES, IFF',
      'Generate and display complete truth tables for any valid expression',
      'Identify whether an expression is a tautology, contradiction, or contingency',
      'Determine if two expressions are logically equivalent',
      'Convert expressions to Conjunctive Normal Form (CNF)',
      'Convert expressions to Disjunctive Normal Form (DNF)',
      'Apply logical equivalence rules (De Morgan\'s Laws, distributive laws, etc.)',
      'Provide a clear command-line or graphical interface for user interaction',
      'Include at least 15 test cases covering various scenarios and edge cases',
      'Write clear documentation explaining how to use the system',
      'Handle invalid input gracefully with helpful error messages'
    ],
    rubric: [
      {
        name: 'Expression Parsing',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Robust parser handles all valid expressions including deeply nested ones, provides clear error messages for invalid syntax, supports multiple input formats'
          },
          {
            score: 85,
            label: 'Good',
            description: 'Parser correctly handles most expressions with reasonable nesting, provides basic error messages, may have minor limitations'
          },
          {
            score: 70,
            label: 'Satisfactory',
            description: 'Parser works for simple to moderately complex expressions, error handling is basic but functional'
          },
          {
            score: 50,
            label: 'Needs Improvement',
            description: 'Parser works only for simple expressions, limited error handling, struggles with nesting'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Parser does not work correctly or is not implemented'
          }
        ]
      },
      {
        name: 'Truth Table Generation',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Perfect truth tables for all expressions, well-formatted output, handles expressions with many variables efficiently'
          },
          {
            score: 85,
            label: 'Good',
            description: 'Correct truth tables, good formatting, handles up to 5-6 variables reasonably'
          },
          {
            score: 70,
            label: 'Satisfactory',
            description: 'Truth tables are mostly correct, basic formatting, works for expressions with 3-4 variables'
          },
          {
            score: 50,
            label: 'Needs Improvement',
            description: 'Truth tables have some errors, poor formatting, limited to simple expressions'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Truth table generation does not work or produces incorrect results'
          }
        ]
      },
      {
        name: 'Logical Analysis',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Correctly identifies tautologies, contradictions, and contingencies; logical equivalence checking works perfectly; insightful analysis'
          },
          {
            score: 85,
            label: 'Good',
            description: 'Correctly identifies basic logical properties, equivalence checking works well for most cases'
          },
          {
            score: 70,
            label: 'Satisfactory',
            description: 'Basic logical analysis works, may have minor issues with complex expressions'
          },
          {
            score: 50,
            label: 'Needs Improvement',
            description: 'Logical analysis works only for simple cases, some incorrect results'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Logical analysis features missing or fundamentally incorrect'
          }
        ]
      },
      {
        name: 'Normal Form Conversion',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'CNF and DNF conversions are correct for all test cases, efficient algorithms, clean output format'
          },
          {
            score: 85,
            label: 'Good',
            description: 'Conversions work correctly for most cases, reasonable efficiency, good output'
          },
          {
            score: 70,
            label: 'Satisfactory',
            description: 'Basic conversion functionality works, may be inefficient or have minor errors'
          },
          {
            score: 50,
            label: 'Needs Improvement',
            description: 'Conversions work only for simple expressions, significant errors or inefficiency'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Normal form conversion not implemented or fundamentally incorrect'
          }
        ]
      },
      {
        name: 'Code Quality',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Well-structured, clean code with clear abstractions; excellent use of data structures; comprehensive comments and documentation'
          },
          {
            score: 85,
            label: 'Good',
            description: 'Good code organization, reasonable abstractions, adequate documentation'
          },
          {
            score: 70,
            label: 'Satisfactory',
            description: 'Code is functional and reasonably organized, basic documentation present'
          },
          {
            score: 50,
            label: 'Needs Improvement',
            description: 'Code works but is poorly organized, minimal documentation'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Code is difficult to understand, poorly structured, no documentation'
          }
        ]
      },
      {
        name: 'Testing and Documentation',
        weight: 10,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Comprehensive test suite (15+ tests) covering edge cases; excellent user documentation with examples; clear README'
          },
          {
            score: 85,
            label: 'Good',
            description: 'Good test coverage (12-15 tests), clear documentation, helpful README'
          },
          {
            score: 70,
            label: 'Satisfactory',
            description: 'Basic tests present (8-11 tests), adequate documentation'
          },
          {
            score: 50,
            label: 'Needs Improvement',
            description: 'Minimal tests (fewer than 8), sparse documentation'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'No meaningful tests or documentation'
          }
        ]
      }
    ],
    estimatedHours: 25
  }
];
