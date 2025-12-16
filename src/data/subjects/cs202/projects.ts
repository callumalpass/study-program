import { Project } from '../../../core/types';

export const cs202Projects: Project[] = [
  {
    id: 'cs202-project-1',
    subjectId: 'cs202',
    title: 'MIPS Assembly Calculator',
    description: 'Build a calculator program in MIPS assembly language that performs basic arithmetic operations. The program should read user input, perform calculations, and display results. This project reinforces understanding of assembly language programming, register usage, memory operations, and system calls.',
    requirements: [
      'Implement addition, subtraction, multiplication, and division operations',
      'Create a menu system allowing users to select operations',
      'Read integer operands from user input using syscalls',
      'Handle division by zero gracefully with appropriate error messages',
      'Display results in both decimal and hexadecimal formats',
      'Implement a loop allowing multiple calculations without restarting',
      'Use proper register conventions ($s registers for preserved values)',
      'Include stack operations for any function calls',
      'Add comments explaining each section of assembly code',
      'Implement an exit option that displays calculation history count'
    ],
    rubric: [
      {
        name: 'Functionality',
        weight: 40,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All operations work correctly, handles edge cases, clean user interaction'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Most operations work with minor issues in edge cases'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic operations work but missing some features or has bugs'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Many operations broken or not implemented'
          }
        ]
      },
      {
        name: 'Assembly Code Quality',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Follows conventions, efficient register use, well-commented, proper stack management'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Generally follows conventions with adequate comments'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Code works but poor organization or missing comments'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Violates conventions, no comments, poor structure'
          }
        ]
      },
      {
        name: 'Error Handling',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Handles all edge cases including overflow, division by zero, invalid input'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Handles common errors appropriately'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic error handling but crashes on some inputs'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'No error handling, crashes frequently'
          }
        ]
      },
      {
        name: 'User Interface',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Clear prompts, formatted output, intuitive flow'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Reasonable interface with clear prompts'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Functional but confusing interface'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor or missing user interface elements'
          }
        ]
      }
    ],
    estimatedHours: 10,
    scaffolding: {
      overview: 'Start with basic I/O, then add arithmetic, finally implement the menu loop.',
      gettingStarted: [
        'Set up data section with prompt strings and result messages.',
        'Write a simple program that reads two integers and prints their sum.',
        'Add syscall routines for printing integers and strings.'
      ],
      milestones: [
        'Basic input/output working - read two numbers and print them back.',
        'Addition and subtraction working with proper result display.',
        'Multiplication and division working with error handling.',
        'Menu system and loop allowing repeated calculations.',
        'Polish: hex output, history counter, clean formatting.'
      ],
      starterResources: [
        { label: 'MIPS Reference', description: 'Instruction set and syscall table', link: 'resources/mips_reference.pdf' },
        { label: 'Template', description: 'Basic MIPS program structure', link: 'starter/cs202/calc_template.asm' }
      ],
      tips: [
        'Use $s0-$s7 for values you need to preserve across function calls.',
        'Test each operation individually before combining them.',
        'MARS simulator has debugging features - use single-step execution.'
      ]
    }
  },
  {
    id: 'cs202-project-2',
    subjectId: 'cs202',
    title: 'CPU Pipeline Simulator',
    description: 'Create a software simulator that demonstrates the 5-stage MIPS pipeline (IF, ID, EX, MEM, WB). The simulator should show instruction flow through pipeline stages, detect and handle hazards, and demonstrate forwarding. This project deepens understanding of pipelining, hazards, and performance implications.',
    requirements: [
      'Parse a simplified MIPS instruction set (add, sub, lw, sw, beq, j)',
      'Implement the 5-stage pipeline with cycle-by-cycle simulation',
      'Display pipeline state showing which instruction is in each stage',
      'Detect and report data hazards (RAW dependencies)',
      'Implement stalling for load-use hazards',
      'Implement data forwarding from EX/MEM and MEM/WB stages',
      'Detect and handle control hazards from branches',
      'Calculate and display CPI (cycles per instruction) for each run',
      'Support at least 10 instructions in an input program',
      'Generate a pipeline timing diagram output',
      'Compare performance with and without forwarding enabled'
    ],
    rubric: [
      {
        name: 'Pipeline Implementation',
        weight: 35,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All 5 stages work correctly, proper state tracking, accurate cycle counting'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Pipeline mostly correct with minor issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic pipeline flow works but timing may be off'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Pipeline implementation incomplete or broken'
          }
        ]
      },
      {
        name: 'Hazard Detection & Handling',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All hazard types detected, forwarding works correctly, proper stalling'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Most hazards handled with minor issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic hazard detection but forwarding incomplete'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Hazard handling missing or broken'
          }
        ]
      },
      {
        name: 'Visualization & Output',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Clear timing diagrams, cycle-by-cycle display, helpful statistics'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good output that shows pipeline state clearly'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic output but hard to interpret'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor or missing visualization'
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
            description: 'Well-structured, modular design, clear documentation'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Reasonable organization with some documentation'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Works but poorly organized'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Disorganized, hard to understand'
          }
        ]
      }
    ],
    estimatedHours: 15,
    scaffolding: {
      overview: 'Build up from instruction parsing to single-cycle, then add pipeline stages one at a time.',
      gettingStarted: [
        'Define data structures for instructions and pipeline registers.',
        'Write an instruction parser that handles the 6 required instructions.',
        'Create a register file and memory simulation (simple arrays).'
      ],
      milestones: [
        'Parse instructions and execute them without pipelining.',
        'Implement IF and ID stages with proper state tracking.',
        'Add EX, MEM, WB stages - verify correctness without hazards.',
        'Implement hazard detection and stalling.',
        'Add forwarding paths and compare CPI with/without forwarding.'
      ],
      starterResources: [
        { label: 'Instruction Format', description: 'Parsing guide for simplified MIPS', link: 'resources/mips_format.md' },
        { label: 'Test Programs', description: 'Sample programs with known CPI', link: 'starter/cs202/pipeline_tests/' }
      ],
      tips: [
        'Use Python dictionaries to represent pipeline registers between stages.',
        'Track dependencies by comparing register numbers, not values.',
        'Draw the pipeline diagram on paper first for each test case.'
      ]
    }
  },
  {
    id: 'cs202-project-3',
    subjectId: 'cs202',
    title: 'Cache Simulator',
    description: 'Build a cache memory simulator that models different cache organizations and replacement policies. The simulator should process memory access traces and report hit rates, miss types, and performance statistics. This project reinforces understanding of cache design tradeoffs and memory hierarchy concepts.',
    requirements: [
      'Support direct-mapped, set-associative, and fully-associative cache configurations',
      'Implement configurable cache size, block size, and associativity',
      'Process memory access traces from input files (format: R/W address)',
      'Track and report hits, misses, and hit rate',
      'Classify misses as compulsory, capacity, or conflict misses',
      'Implement LRU (Least Recently Used) replacement policy',
      'Implement FIFO replacement policy for comparison',
      'Support write-through and write-back policies',
      'Display cache state showing valid bits, tags, and dirty bits',
      'Generate statistics comparing different configurations',
      'Handle addresses of varying bit widths (16, 32, 64 bits)'
    ],
    rubric: [
      {
        name: 'Cache Implementation',
        weight: 35,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All cache types work correctly, proper address parsing, accurate hit/miss determination'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Most configurations work with minor issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Direct-mapped works but associative has issues'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Cache implementation fundamentally broken'
          }
        ]
      },
      {
        name: 'Replacement & Write Policies',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'LRU and FIFO work correctly, write policies properly implemented'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Policies mostly correct with minor edge case issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic replacement works but policies incomplete'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Policies missing or broken'
          }
        ]
      },
      {
        name: 'Statistics & Analysis',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Accurate statistics, proper miss classification, meaningful comparisons'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good statistics with accurate hit rates'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic hit rate but miss classification wrong'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Inaccurate or missing statistics'
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
            description: 'Modular design, configurable parameters, well-documented'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Reasonable structure with some flexibility'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Works but hard to configure or modify'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Rigid implementation, poor organization'
          }
        ]
      }
    ],
    estimatedHours: 12,
    scaffolding: {
      overview: 'Start with direct-mapped cache, then generalize to set-associative with configurable parameters.',
      gettingStarted: [
        'Define cache structure: array of sets, each set has blocks with valid, tag, data, dirty bits.',
        'Write address parsing: extract tag, index, offset from addresses.',
        'Create trace file parser that reads R/W and addresses.'
      ],
      milestones: [
        'Direct-mapped cache working with simple trace file.',
        'Add set-associativity with configurable ways.',
        'Implement LRU tracking and replacement.',
        'Add write-back policy with dirty bit tracking.',
        'Miss classification and comparison reports.'
      ],
      starterResources: [
        { label: 'Address Calculator', description: 'Tool to compute tag/index/offset', link: 'tools/cache_calc.html' },
        { label: 'Sample Traces', description: 'Memory access patterns for testing', link: 'starter/cs202/cache_traces/' }
      ],
      tips: [
        'Use bit manipulation to extract address fields efficiently.',
        'For LRU, maintain access order rather than timestamps.',
        'Test with small caches first (4 blocks) to verify by hand.'
      ]
    }
  }
];
