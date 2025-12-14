import { Project } from '../../../core/types';

export const cs102Projects: Project[] = [
  {
    id: 'cs102-project-1',
    subjectId: 'cs102',
    title: 'Build a Digital Logic Simulator',
    description: `Create a comprehensive digital logic circuit simulator that can model and evaluate logic gates, combinational circuits, and simple sequential circuits. The simulator should support basic gates (AND, OR, NOT, NAND, NOR, XOR) and allow users to build complex circuits by connecting gates together. Implement truth table generation, circuit simplification using Boolean algebra, and visualization of circuit diagrams.

This project integrates all major concepts from CS102: binary representation for signal values, Boolean algebra for logic operations, and understanding of how digital circuits form the foundation of computer architecture. You will gain hands-on experience with the building blocks that make computers possible.`,
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
    estimatedHours: 25,
    scaffolding: {
      overview: 'Build bottom-up: gate primitives → circuit graph → evaluator → truth tables → simplification/UI.',
      gettingStarted: [
        'Define a Gate interface/class with type, inputs, and an evaluate method.',
        'Create a simple graph structure: nodes are gates, edges are connections by id.',
        'Write a small library of pure gate functions (and, or, not, nand, nor, xor).'
      ],
      milestones: [
        'Unit tests for individual gates and multi-input support.',
        'Circuit builder can add gates and connect them; evaluation works for small graphs.',
        'Truth table generator given N inputs produces outputs; prebuilt half/full-adder work.',
        'Boolean simplification for expressions or small circuits.',
        'Interface layer (CLI/GUI) to create, load, and run circuits with error messages.'
      ],
      starterResources: [
        { label: 'Example circuits', description: 'Half-adder, full-adder, 2:1 multiplexer with expected outputs.' },
        { label: 'Function stubs', description: 'evaluate_gate(gate, inputs), evaluate_circuit(graph, inputVector), generate_truth_table(graph).' }
      ],
      tips: [
        'Keep gate evaluation pure; avoid mixing with UI.',
        'Validate connections (no cycles for combinational circuits) before evaluating.',
        'Cache intermediate outputs when generating truth tables to speed up larger inputs.'
      ]
    }
  },
  {
    id: 'cs102-project-2',
    subjectId: 'cs102',
    title: 'Number Systems & Encoding Toolkit',
    description: `Create a CLI toolkit that helps students explore number systems, integer encodings, and text encodings. The tool should support conversions (base 2–16), two's complement visualization, IEEE-754 float inspection, UTF-8 encoding/decoding previews, and a small cache-hit calculator for address traces. Provide clear, tutorial-style output so users understand the steps, not just the answers.`,
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
    estimatedHours: 18,
    scaffolding: {
      overview: 'Treat each tool as a subcommand; build converters first, then encoding helpers, then cache calculator.',
      gettingStarted: [
        'Set up a CLI command router (e.g., encode, decode, float, twos, cache).',
        'Write base conversion helpers with step-by-step breakdown strings.',
        'Decide on data models for IEEE-754 parts and UTF-8 byte sequences.'
      ],
      milestones: [
        'Base converter works both directions with fractional support.',
        'Two’s complement visualizer shows sign/extend for configurable widths.',
        'IEEE-754 parser prints sign/exponent/fraction and special-case labels.',
        'UTF-8 encode/decode round-trips for ASCII + multi-byte examples.',
        'Cache estimator consumes traces and reports hit/miss counts.'
      ],
      starterResources: [
        { label: 'Example scripts', description: 'ip-mask, color hex, emoji, NaN/Inf, simple cache trace.' },
        { label: 'Function stubs', description: 'to_base(value, base), from_base(str, base), parse_ieee(bits), utf8_encode(cp).' }
      ],
      tips: [
        'Keep math pure; have UI functions only format steps.',
        'Validate inputs early and give corrective hints.',
        'Add a --demo flag to run the scripted examples for quick regression checks.'
      ]
    }
  },
  {
    id: 'cs102-project-3',
    subjectId: 'cs102',
    title: 'The Binary Bomb Defusal',
    description: `You have been given a binary executable (simulated in Python/Assembly) that acts as a "digital bomb". It expects a series of specific inputs (passwords) to be "defused". If you enter the wrong input, it "explodes". Your job is to read the assembly-like instructions of the bomb's code, reverse engineer the logic, and figure out the correct inputs. This project tests your ability to read low-level control flow, understand registers, and trace execution mentally.`,
    requirements: [
      'Create a "Virtual CPU" class that can execute a simplified assembly language (MOV, ADD, SUB, CMP, JMP, BEQ, BNE, XOR)',
      'Design a "Bomb" program written in this assembly language with at least 4 distinct "stages"',
      'Stage 1: Simple string password check',
      'Stage 2: Loop-based arithmetic check (e.g., input must be a Fibonacci number)',
      'Stage 3: Switch/Jump table logic (input determines path)',
      'Stage 4: Recursive function logic or complex pointer arithmetic simulation',
      'Build a debugger interface that allows users (students) to: Step through instructions, Inspect registers, View memory',
      'Implement a "cheat mode" (for grading) that reveals the answers',
      'Provide a "Bomb Manual" (README) explaining the CPU architecture'
    ],
    rubric: [
      {
        name: 'CPU Simulation',
        weight: 35,
        levels: [
          { score: 4, label: 'Excellent', description: 'Accurately simulates all required opcodes, registers, and flags. Handles jumps correctly.' },
          { score: 3, label: 'Good', description: 'Most opcodes work. Jumps mostly correct. Minor bugs in flag handling.' },
          { score: 2, label: 'Satisfactory', description: 'Basic sequential execution works. Jumps or flags are unreliable.' },
          { score: 1, label: 'Needs Improvement', description: 'CPU cannot run the bomb program correctly.' }
        ]
      },
      {
        name: 'Bomb Design',
        weight: 25,
        levels: [
          { score: 4, label: 'Excellent', description: '4 creative, distinct stages. Logic is challenging but solvable. Clever use of assembly idioms.' },
          { score: 3, label: 'Good', description: '4 stages present. Some repetition in logic. Solvable.' },
          { score: 2, label: 'Satisfactory', description: 'Fewer than 4 stages or logic is trivial/broken.' },
          { score: 1, label: 'Needs Improvement', description: 'Bomb program is missing or non-functional.' }
        ]
      },
      {
        name: 'Debugger Tools',
        weight: 25,
        levels: [
          { score: 4, label: 'Excellent', description: 'Full stepping, breakpoints, and clear register/memory visualization. Feels like GDB.' },
          { score: 3, label: 'Good', description: 'Step and inspect features present. UI is usable.' },
          { score: 2, label: 'Satisfactory', description: 'Can run code but hard to inspect state. Minimal feedback.' },
          { score: 1, label: 'Needs Improvement', description: 'No debugging tools provided.' }
        ]
      },
      {
        name: 'Documentation',
        weight: 15,
        levels: [
          { score: 4, label: 'Excellent', description: 'Complete ISA reference, clear usage guide, and well-commented code.' },
          { score: 3, label: 'Good', description: 'ISA reference present. Basic usage guide.' },
          { score: 2, label: 'Satisfactory', description: 'Minimal documentation. Hard to understand how to play.' },
          { score: 1, label: 'Needs Improvement', description: 'No documentation.' }
        ]
      }
    ],
    estimatedHours: 20,
    scaffolding: {
      overview: 'Approach it like a lab: trace, document phases, script inputs; keep a notes file as you go.',
      gettingStarted: [
        'Set up a disassembly/trace loop that logs registers and branches per step.',
        'Identify input phases and expected lengths/types for each.',
        'Create a scratchpad for mapping registers/variables to semantic names.'
      ],
      milestones: [
        'Can step through one phase and predict register changes.',
        'Recover the required input for the first two phases.',
        'Document patterns (loops, arithmetic, comparisons) for later phases.',
        'Automate running all found inputs to verify no “explosions.”',
        'Write a concise walkthrough explaining how each input is derived.'
      ],
      starterResources: [
        { label: 'Trace template', description: 'Table columns: pc, instr, r0..r5 (or eax..), notes/outcome.' },
        { label: 'Phase checklist', description: 'Length/type guesses, branch conditions, constants spotted.' }
      ],
      tips: [
        'Look for magic constants or string compares to anchor your reasoning.',
        'Rename registers/slots once you infer meaning to reduce cognitive load.',
        'Automate verification early so you can iterate without manual typing.'
      ]
    }
  },
  {
    id: 'cs102-project-4',
    subjectId: 'cs102',
    title: 'Cache & Memory Hierarchy Simulator',
    description: `Modern CPUs are fast, but memory is slow. Caches bridge this gap. In this project, you will build a configurable simulator that models how data moves between Main Memory and Cache. You will visualize hits, misses, evictions, and the impact of different cache policies (Direct Mapped vs Set Associative).`,
    requirements: [
      'Simulate a memory hierarchy with configurable Block Size, Cache Size, and Associativity (Direct, N-Way, Fully Associative)',
      'Implement a Least Recently Used (LRU) eviction policy',
      'Process a stream of memory access traces (Read/Write to Hex Addresses)',
      'Output statistics: Hit Rate, Miss Rate, Eviction Count',
      'Visualize the state of the cache (Valid bits, Tags, Dirty bits)',
      'Implement "Write-Back" and "Write-Allocate" policies (optional bonus: Write-Through)',
      'Create a visual mode where users can see blocks moving into cache slots step-by-step',
      'Include 3 standard trace files (linear scan, random access, tight loop) to demonstrate performance differences'
    ],
    rubric: [
      {
        name: 'Simulation Accuracy',
        weight: 40,
        levels: [
          { score: 4, label: 'Excellent', description: 'Correctly handles all mapping strategies (Direct, N-way, Full). LRU works perfectly. Tag/Index/Offset math is precise.' },
          { score: 3, label: 'Good', description: 'Direct and N-way work. LRU has minor edge cases. Math mostly correct.' },
          { score: 2, label: 'Satisfactory', description: 'Only Direct Mapped works or significant bugs in Set Associative logic.' },
          { score: 1, label: 'Needs Improvement', description: 'Simulation produces incorrect hit/miss results.' }
        ]
      },
      {
        name: 'Visualization & UI',
        weight: 25,
        levels: [
          { score: 4, label: 'Excellent', description: 'Clear, educational visualization of cache lines. Shows valid/dirty/tag state updates dynamically.' },
          { score: 3, label: 'Good', description: 'Text-based table view of cache state. Readable and functional.' },
          { score: 2, label: 'Satisfactory', description: 'Prints raw data/lists. Hard to visualize the structure.' },
          { score: 1, label: 'Needs Improvement', description: 'No visualization of internal state.' }
        ]
      },
      {
        name: 'Analysis Features',
        weight: 20,
        levels: [
          { score: 4, label: 'Excellent', description: 'Detailed statistics. Auto-analysis of different traces (explaining WHY one trace is better).' },
          { score: 3, label: 'Good', description: 'Standard hit/miss stats correct. Handles standard traces.' },
          { score: 2, label: 'Satisfactory', description: 'Basic stats only (Hit/Total).' },
          { score: 1, label: 'Needs Improvement', description: 'Stats missing or wrong.' }
        ]
      },
      {
        name: 'Code Structure',
        weight: 15,
        levels: [
          { score: 4, label: 'Excellent', description: 'Clean OOP design (Cache class, Set class, Block class). Highly readable.' },
          { score: 3, label: 'Good', description: 'Good structure. Some separation of logic and UI.' },
          { score: 2, label: 'Satisfactory', description: 'Monolithic script but functional.' },
          { score: 1, label: 'Needs Improvement', description: 'Spaghetti code, hard to follow logic.' }
        ]
      }
    ],
    estimatedHours: 15,
    scaffolding: {
      overview: 'Build a core simulator first, then add visualizations and multiple policies.',
      gettingStarted: [
        'Define cache line structure: valid, tag, dirty, lastUsed, data?.',
        'Write address breakdown helpers for tag/index/offset given cache config.',
        'Implement direct-mapped access path with read/write handling.'
      ],
      milestones: [
        'Direct-mapped mode returns correct hit/miss stats on small traces.',
        'N-way set associative with LRU eviction works on provided traces.',
        'Write-back + write-allocate implemented; add optional write-through toggle.',
        'Visualization table shows sets/lines with valid/tag/dirty updates.',
        'Include three sample traces (linear, random, tight loop) and a summary report.'
      ],
      starterResources: [
        { label: 'Trace seeds', description: 'Linear 0x0000-0x00FF, Random 50 accesses, Loop: repeat 0x0100-0x0120.' },
        { label: 'Function stubs', description: 'access(address, isWrite), make_cache(config), format_cache_state(cache).' }
      ],
      tips: [
        'Unit test the address-splitting math separately from the simulator.',
        'Keep config (block size, sets, associativity) immutable during a run.',
        'Log hits/misses per access to debug visualization issues.'
      ]
    }
  }
];
