import { Project } from '../../../core/types';

export const cs102Projects: Project[] = [
  {
    id: 'cs102-project-1',
    subjectId: 'cs102',
    title: 'Build a Digital Logic Simulator',
    description: 'Create a comprehensive digital logic circuit simulator that can model and evaluate logic gates, combinational circuits, and simple sequential circuits. The simulator should support basic gates (AND, OR, NOT, NAND, NOR, XOR) and allow users to build complex circuits by connecting gates together. Implement truth table generation, circuit simplification using Boolean algebra, and visualization of circuit diagrams.\n\nThis project integrates all major concepts from CS102: binary representation for signal values, Boolean algebra for logic operations, and understanding of how digital circuits form the foundation of computer architecture. You will gain hands-on experience with the building blocks that make computers possible.',
    requirements: [
      'Implement at least 6 basic logic gates (AND, OR, NOT, NAND, NOR, XOR) as reusable components',
      'Create a circuit builder that allows connecting gates with inputs and outputs',
      'Generate truth tables automatically for any circuit configuration',
      'Implement a circuit evaluator that computes outputs given inputs',
      'Add support for multi-input gates (gates with more than 2 inputs)',
      'Include at least 3 pre-built example circuits (half-adder, full-adder, multiplexer)',
      'Provide a command-line or graphical interface for circuit design and testing',
      'Implement Boolean expression simplification using basic algebraic laws',
      'Add comprehensive error handling for invalid circuit configurations',
      'Include detailed documentation and user guide'
    ],
    rubric: [
      {
        name: 'Logic Gate Implementation',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'All 6 gates correctly implemented with clean, reusable code. Multi-input gates fully supported. Comprehensive unit tests included.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'All basic gates working correctly. Multi-input support present but may have minor issues. Basic testing included.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Most gates working but some edge cases not handled. Limited multi-input support. Minimal testing.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Only basic gates implemented. Significant bugs present. No multi-input support or testing.'
          }
        ]
      },
      {
        name: 'Circuit Building and Evaluation',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Flexible circuit builder with intuitive API. Handles complex circuits with multiple layers. Evaluation is efficient and correct for all test cases.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Circuit builder works for most cases. Evaluation correct but may be inefficient. Some complex circuits supported.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic circuit building works. Evaluation correct for simple circuits only. Limited complexity support.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Circuit building has significant limitations. Evaluation fails on some test cases. Only very simple circuits work.'
          }
        ]
      },
      {
        name: 'Truth Table Generation',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Automatic truth table generation for any circuit. Clear, well-formatted output. Handles circuits with many inputs efficiently.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Truth tables generated correctly. Output readable. Works for reasonable input counts.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic truth table generation works. Output may be hard to read. Limited to small input counts.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Truth table generation incomplete or incorrect. Poor output formatting. Very limited functionality.'
          }
        ]
      },
      {
        name: 'Example Circuits and Features',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'All 3 required examples plus additional circuits. Boolean simplification working well. Extra features like circuit saving/loading.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'All 3 required examples implemented correctly. Basic Boolean simplification present. Good feature set.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Most example circuits work. Limited or no Boolean simplification. Basic features only.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Fewer than 3 examples or examples not working correctly. No Boolean simplification. Minimal features.'
          }
        ]
      },
      {
        name: 'User Interface and Usability',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Intuitive interface (CLI or GUI). Excellent error messages. Clear prompts and helpful feedback. Easy to learn and use.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Functional interface. Good error messages. Generally easy to use with minor usability issues.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic interface works. Some error messages. Usable but not intuitive.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor interface design. Cryptic or missing error messages. Difficult to use.'
          }
        ]
      },
      {
        name: 'Code Quality and Documentation',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Clean, well-organized code following best practices. Comprehensive documentation including user guide, API docs, and inline comments. Excellent variable naming.'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good code organization. Adequate documentation covering main features. Good comments and naming.'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Code works but organization could be better. Basic documentation present. Some comments.'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor code organization. Minimal or missing documentation. Few comments and unclear naming.'
          }
        ]
      }
    ],
    estimatedHours: 25
  },
  {
    id: 'cs102-project-2',
    subjectId: 'cs102',
    title: 'Number Systems & Encoding Toolkit',
    description: 'Create a CLI toolkit that helps students explore number systems, integer encodings, and text encodings. The tool should support conversions (base 2–16), two\'s complement visualization, IEEE-754 float inspection, UTF-8 encoding/decoding previews, and a small cache-hit calculator for address traces. Provide clear, tutorial-style output so users understand the steps, not just the answers.',
    requirements: [
      'Convert between any bases 2–16 (with fractional support) and show intermediate steps',
      'Display two’s complement representation for signed inputs at configurable bit widths',
      'Parse a 32-bit binary string as IEEE-754 single precision and show sign/exponent/fraction breakdown',
      'Encode/decode UTF-8 for a given Unicode code point or character, showing hex bytes',
      'Include a simple direct-mapped cache hit/miss estimator given addresses, line size, and line count',
      'Provide helpful error messages for invalid inputs',
      'Offer at least 5 scripted examples (e.g., colors, permissions, IP masks, emojis, NaN/Inf cases)',
      'Add usage help output and a short README explaining concepts'
    ],
    rubric: [
      {
        name: 'Feature Completeness',
        weight: 30,
        levels: [
          { score: 4, label: 'Excellent', description: 'All required features implemented with options for widths, fractions, and clear step outputs.' },
          { score: 3, label: 'Good', description: 'Most features implemented; minor omissions or step detail missing in one area.' },
          { score: 2, label: 'Satisfactory', description: 'Core converters work, but little step detail or missing one major feature.' },
          { score: 1, label: 'Needs Improvement', description: 'Several required features missing or incorrect.' }
        ]
      },
      {
        name: 'Explanatory Output',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Outputs include per-step breakdowns, context hints, and concise formulas.' },
          { score: 3, label: 'Good', description: 'Outputs are clear but may skip some steps for certain commands.' },
          { score: 2, label: 'Satisfactory', description: 'Outputs show results with minimal explanation; steps rarely shown.' },
          { score: 1, label: 'Needs Improvement', description: 'Outputs are raw values with no educational context.' }
        ]
      },
      {
        name: 'Error Handling & UX',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Great validation, descriptive errors, helpful suggestions for correction.' },
          { score: 3, label: 'Good', description: 'Validation present with clear errors; occasional edge cases missed.' },
          { score: 2, label: 'Satisfactory', description: 'Basic validation; some confusing errors or crashes.' },
          { score: 1, label: 'Needs Improvement', description: 'Little to no validation; frequent crashes or unhelpful errors.' }
        ]
      },
      {
        name: 'Code Quality',
        weight: 15,
        levels: [
          { score: 4, label: 'Excellent', description: 'Modular design, clean separation of concerns, tests for key functions.' },
          { score: 3, label: 'Good', description: 'Reasonable structure with some tests; minor repetition.' },
          { score: 2, label: 'Satisfactory', description: 'Works but tightly coupled or sparsely tested.' },
          { score: 1, label: 'Needs Improvement', description: 'Messy code, no tests, hard to extend.' }
        ]
      },
      {
        name: 'Documentation & Examples',
        weight: 15,
        levels: [
          { score: 4, label: 'Excellent', description: 'Clear README, usage examples, and inline docs for each command; includes tutorial-style walkthrough.' },
          { score: 3, label: 'Good', description: 'README and examples present; some commands less documented.' },
          { score: 2, label: 'Satisfactory', description: 'Basic README; minimal examples.' },
          { score: 1, label: 'Needs Improvement', description: 'Sparse or missing documentation.' }
        ]
      }
    ],
    estimatedHours: 18
  }
];
