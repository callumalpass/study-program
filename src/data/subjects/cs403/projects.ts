import { Project } from '../../../core/types';

export const cs403Projects: Project[] = [
  {
    id: 'cs403-project-1',
    subjectId: 'cs403',
    title: 'SAT Solver with CDCL',
    description: 'Implement a modern SAT solver using Conflict-Driven Clause Learning (CDCL) with variable selection heuristics and clause learning.',
    estimatedHours: 25,
    requirements: ['C++/Rust/TypeScript', 'Data structures', 'CNF parsing'],
    rubric: [
      {
        name: 'DPLL Implementation',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Complete DPLL with unit propagation, pure literal elimination, and efficient data structures'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Correct DPLL with unit propagation, minor efficiency issues'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic DPLL works but missing optimizations or has some correctness issues'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Incomplete or incorrect DPLL implementation'
          }
        ]
      },
      {
        name: 'Clause Learning',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Proper conflict analysis, first UIP scheme, and effective learned clause generation with database management'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Correct conflict analysis and clause learning, basic database management'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic clause learning works but suboptimal conflict analysis or missing database cleanup'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Clause learning missing or fundamentally incorrect'
          }
        ]
      },
      {
        name: 'Heuristics',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'VSIDS or equivalent heuristic with proper decay and updates, demonstrably improves performance'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Working variable selection heuristic with reasonable performance gains'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic heuristic implemented but not well-tuned or showing limited improvement'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'No heuristic or non-functional implementation'
          }
        ]
      },
      {
        name: 'Performance',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Solves 100+ variable instances efficiently, handles hard benchmarks, includes performance analysis'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Solves 100+ variable instances in reasonable time, basic benchmarking'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Handles medium instances but slow on larger problems, limited testing'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Fails on or is too slow for 100+ variable instances'
          }
        ]
      },
      {
        name: 'Code Quality',
        weight: 10,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Clean, well-documented code with comprehensive tests and good code organization'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Clear code with adequate testing and documentation'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Working code but lacks documentation or tests, some organization issues'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor code quality, no tests, difficult to understand'
          }
        ]
      }
    ]
  },

  {
    id: 'cs403-project-2',
    subjectId: 'cs403',
    title: 'Approximation Algorithms Library',
    description: 'Build comprehensive library implementing key approximation algorithms with performance benchmarking.',
    estimatedHours: 20,
    requirements: ['Python/TypeScript/Java', 'Graph algorithms', 'LP solvers (optional)'],
    rubric: [
      {
        name: 'Algorithm Implementation',
        weight: 35,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'All algorithms correctly implemented (Vertex Cover, Set Cover, TSP variants, Knapsack FPTAS, Load Balancing) with optimal time complexities'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Most algorithms correct and efficient, minor issues in one or two implementations'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Core algorithms work but missing some variants or have efficiency issues'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Multiple algorithms missing or incorrect'
          }
        ]
      },
      {
        name: 'Approximation Guarantees',
        weight: 30,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'All algorithms meet theoretical approximation ratios in practice, with proofs/analysis demonstrating guarantees'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Algorithms meet approximation ratios on test cases, basic verification provided'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Most algorithms approximate well but guarantees not consistently verified'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Approximation ratios not met or not verified'
          }
        ]
      },
      {
        name: 'Benchmarking',
        weight: 20,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Comprehensive benchmarking on diverse instances, comparison with optimal solutions, detailed performance analysis'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good test coverage with multiple instance types, basic performance comparisons'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Limited benchmarking, testing on small or non-diverse instances'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Minimal or no benchmarking provided'
          }
        ]
      },
      {
        name: 'Documentation',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Clear API documentation, usage examples for all algorithms, theoretical background included'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good API documentation with examples for most algorithms'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic documentation, some examples, but incomplete coverage'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor or missing documentation'
          }
        ]
      }
    ]
  },

  {
    id: 'cs403-project-3',
    subjectId: 'cs403',
    title: 'Computational Geometry Toolkit',
    description: 'Implement fundamental computational geometry algorithms with visualization.',
    estimatedHours: 22,
    requirements: ['Python with matplotlib or TypeScript with canvas', 'Geometry primitives', 'Visualization library'],
    rubric: [
      {
        name: 'Algorithm Correctness',
        weight: 35,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'All algorithms produce correct results (convex hull, line intersection, closest pair, Voronoi) on all test cases including edge cases'
          },
          {
            score: 3,
            label: 'Good',
            description: 'All algorithms work correctly on standard inputs, minor issues on edge cases'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Most algorithms correct but some errors on edge cases or one algorithm has issues'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Multiple algorithms incorrect or missing'
          }
        ]
      },
      {
        name: 'Efficiency',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'All algorithms meet theoretical time complexities (O(n log n) for convex hull/closest pair, O(n log n + k) for intersections, etc.)'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Algorithms efficient and scale well, meet or nearly meet theoretical bounds'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Algorithms work but have suboptimal time complexity or performance issues on large inputs'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor time complexity, algorithms don\'t scale'
          }
        ]
      },
      {
        name: 'Visualization',
        weight: 25,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Clear, interactive visualizations for all algorithms, step-by-step animation, excellent UI/UX'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Good visualizations for most algorithms, some interactivity, clear display'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Basic visualizations present but limited interactivity or clarity'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor or missing visualizations'
          }
        ]
      },
      {
        name: 'Edge Cases',
        weight: 15,
        levels: [
          {
            score: 4,
            label: 'Excellent',
            description: 'Handles all degenerate cases (collinear points, duplicate points, vertical lines, etc.) with robust numerical stability'
          },
          {
            score: 3,
            label: 'Good',
            description: 'Handles most edge cases correctly, minor issues with numerical precision'
          },
          {
            score: 2,
            label: 'Satisfactory',
            description: 'Some edge case handling but fails on certain degenerate inputs'
          },
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor edge case handling, fails on degenerate inputs'
          }
        ]
      }
    ]
  }
];
