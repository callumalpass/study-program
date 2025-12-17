import { Project } from '../../../core/types';

export const cs403Projects: Project[] = [
  {
    id: 'cs403-project-1',
    subjectId: 'cs403',
    title: 'SAT Solver with CDCL',
    description: `Build a production-quality SAT solver for Boolean formulas in CNF using a modern CDCL (Conflict-Driven Clause Learning) pipeline. The goal is not just to “get SAT working”, but to implement the algorithmic ideas that make SAT solvers fast in practice: watched literals for near-O(#propagations) unit propagation, decision heuristics such as VSIDS, non-chronological backtracking (backjumping), and learned clauses that prune future search. Your solver should be able to read standard DIMACS CNF files, solve them via a CLI entry point, and report SAT/UNSAT along with a satisfying assignment when one exists.

At a minimum, implement the classic DPLL backbone (decide → propagate → analyze conflict → learn → backtrack) and then extend it with CDCL features. Unit propagation should be incremental and efficient (watched literals is strongly recommended). When a conflict occurs, perform implication graph analysis and learn a new clause using a first-UIP style rule, then backjump to the correct decision level. Add restarts (even a simple geometric schedule) and basic clause database management (e.g., deleting low-activity learned clauses) so the solver does not slow down indefinitely as it learns.

From an engineering perspective, treat this as a systems project: you are building a piece of software that must be correct, fast, and debuggable. Pick a clear literal encoding (e.g., integers where sign indicates negation) and represent clauses in a compact structure that supports (a) iterating literals and (b) updating watchers. Keep the “trail” of assignments as a stack with decision-level markers so you can backtrack efficiently. Store, for each implied assignment, a “reason” clause so conflicts can be analyzed and the implication graph can be traversed. For analysis, implement first-UIP learning (or a well-documented alternative) and record learned clauses in the clause database with an activity score. Make the CLI output easy to consume (e.g., print "SAT"/"UNSAT" on the first line, and if SAT, print a line with a complete assignment) and add a verifier that re-checks the assignment against the parsed CNF before reporting success.

Pay special attention to correctness invariants: (1) every assignment must satisfy all unit-propagated implications at the time it is made, (2) every learned clause must be logically implied by the current formula, and (3) backjumping must restore the assignment to a consistent prefix (including resetting watchers and queue state). Use property-style tests on small formulas: randomly generate tiny CNFs, compare against brute-force enumeration, and verify that SAT instances return a satisfying assignment that actually satisfies every clause. If your solver reports UNSAT, add regression tests with known UNSAT instances (pigeonhole, XOR/parity encodings, small crafted contradictions) to ensure conflict analysis and backjumping are not masking a bug.

To demonstrate correctness and engineering maturity, include a small benchmark suite (a folder of DIMACS instances or generated instances) and report runtime/decision statistics: number of decisions, propagations, conflicts, learned clauses, and restarts. Document design decisions (data structures, watched literal representation, implication graph representation, conflict analysis steps) and include tests for critical components like parsing, propagation, and conflict analysis on small hand-constructed formulas.

Stretch goals: implement phase saving, variable activity decay, learned clause minimization, proof logging (DRAT-like), and support for assumptions (solving under temporary literals).`,
    estimatedHours: 15,
    requirements: [
      'Support DIMACS CNF parsing and validation (comments, p-line, clauses, 0 terminators)',
      'Represent clauses and literals efficiently (avoid O(mn) scanning during propagation)',
      'Implement watched literals unit propagation with a queue of implied literals',
      'Maintain an assignment with decision levels and an implication trail',
      'Implement decisions with a heuristic (VSIDS-style activity recommended) and tie-breaking',
      'Build an implication graph and perform conflict analysis (first-UIP learning)',
      'Learn clauses, backjump non-chronologically, and continue search correctly',
      'Implement restarts and a simple learned clause database management policy',
      'Provide a CLI: `sat-solve <file.cnf>` printing SAT/UNSAT and (if SAT) an assignment',
      'Include a benchmark script/report and basic unit tests for parser + propagation'
    ],
    scaffolding: {
      overview: 'Implement a CDCL loop (decide → propagate → analyze → learn/backjump) with watched-literal propagation and first-UIP learning.',
      gettingStarted: [
        'Start with a DIMACS parser and a simple DPLL solver (no learning) for small instances.',
        'Add watched literals and verify propagation with targeted unit tests.',
        'Add implication reasons, conflict detection, and first-UIP clause learning.',
        'Add restarts + clause deletion, then benchmark and iterate.'
      ],
      milestones: [
        'Milestone 1: DIMACS parser + naive DPLL correctness on toy instances',
        'Milestone 2: Watched-literals propagation + trail/levels',
        'Milestone 3: Conflict analysis + clause learning + backjumping',
        'Milestone 4: Restarts + clause database management + benchmarking report'
      ],
      tips: [
        'Watched literals are easiest if you store, for each watched literal, the list of clauses currently watching it.',
        'Test propagation and conflict analysis on tiny CNFs where you can reason about the trail by hand.',
        'Start with a clear literal encoding (e.g., ±int) and keep conversions centralized.'
      ]
    },
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
    description: `Create a small “approximation algorithms” library that implements several core approximation strategies from the course and makes them usable and measurable. The library should expose clean APIs (functions/classes) for each algorithm, accept standard input formats (graphs, weighted items, distance matrices), and return both a solution and metadata needed to validate guarantees (objective value, feasibility checks, and—when possible—an easily-computable lower bound).

Your implementation should cover a representative set of techniques: greedy with charging arguments (e.g., Set Cover), matching-based 2-approx (Vertex Cover), metric structure exploitation (double-tree and/or Christofides for metric TSP), and dynamic programming based approximation schemes (Knapsack FPTAS via scaling). For each algorithm, include a short correctness/guarantee note in the docs: what approximation ratio it achieves, and under which assumptions (metric, triangle inequality, etc.). Where the guarantee depends on a known lower bound (e.g., MST for TSP, matching size for vertex cover, LP relaxation for set cover), compute and report that bound.

The second focus is evaluation. Implement a benchmarking harness that can generate or load instances (e.g., random graphs, random set cover families, TSP points in the plane) and compare algorithm outputs across instance sizes. Where exact OPT is feasible for small n, compute it via brute force or integer programming and plot the approximation ratio as n grows. For larger instances, compare against strong lower bounds (LP relaxation, MST, or known relaxations) and report gap-to-bound. The deliverable should include a short write-up describing experiment design and at least one insight (e.g., greedy set cover performs much better than its worst-case bound on your generated families, or Knapsack FPTAS shows the expected trade-off between ε and runtime).

Treat “library quality” as part of the grade: make the APIs predictable, validate inputs, and provide helpful error messages (e.g., refusing to run Christofides if triangle inequality is violated unless explicitly overridden). For graphs, decide on one representation (adjacency list with weights, edge list, or matrix) and provide conversion helpers. For Set Cover, define a clear universe representation and ensure your solution can be checked easily. Include deterministic random seeds in the benchmark harness so results are reproducible, and record environment information (language/runtime version) alongside timing.

To deepen the “advanced algorithms” aspect, include at least one algorithm where the analysis uses a clear lower bound argument: for Vertex Cover, compare against matching size; for metric TSP, compare against MST weight; for Set Cover, compare against a fractional relaxation or a simple bound such as |U|/maxSetSize. Even if you do not implement a full LP solver, you can include a pluggable interface so an LP relaxation can be swapped in later. Make sure the documentation states exactly what is being compared (OPT vs lower bound) so ratios are interpreted correctly. Where you do compute exact OPT for small instances, use that to validate that your reported “ratio vs bound” does not systematically underestimate the true approximation ratio.

Stretch goals: add a primal–dual approximation (e.g., for facility location or set cover variants), incorporate randomized rounding for an LP relaxation, and include a small suite of regression tests that validate feasibility and known corner cases.`,
    estimatedHours: 15,
    requirements: [
      'Implement Vertex Cover 2-approximation via maximal matching (return cover + matching size lower bound)',
      'Implement Greedy Set Cover with coverage tracking and report achieved ratio vs a simple lower bound',
      'Implement metric TSP approximation (double-tree and/or Christofides) and validate triangle-inequality assumptions',
      'Implement 0/1 Knapsack FPTAS via value scaling with configurable ε',
      'Provide clear data models for graphs, sets, and TSP instances (typed interfaces/classes)',
      'Return both solutions and measurable metadata (objective value, feasibility checks, lower bounds)',
      'Create an instance generator and a benchmarking CLI (e.g., `approx-bench --algo setcover --n 500`)',
      'Include documentation pages describing each algorithm and its approximation guarantee',
      'Add unit tests for correctness/feasibility on small hand-crafted instances',
      'Produce a short benchmarking report with plots/tables and interpretation'
    ],
    scaffolding: {
      overview: 'Build reusable implementations of core approximation algorithms plus a benchmark harness to evaluate solution quality and runtime.',
      milestones: [
        'Milestone 1: Data models + Vertex Cover + Set Cover (with tests)',
        'Milestone 2: Metric TSP approximation(s) + instance generators',
        'Milestone 3: Knapsack FPTAS + epsilon/runtime trade-off experiments',
        'Milestone 4: Benchmark CLI + report (plots/tables)'
      ],
      tips: [
        'Keep “algorithm code” separate from “instance generation” and “benchmarking/reporting” code.',
        'Always include a feasibility checker (e.g., does the set cover cover all elements?) and call it in tests.',
        'Use lower bounds you can compute cheaply (matching size, MST weight) to sanity-check results at scale.'
      ]
    },
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
    description: `Build a computational geometry “toolkit” that implements a set of foundational planar algorithms and pairs them with visualization so students can see the geometry evolve. The toolkit should provide a small library of primitives (Point, Segment, Polygon) and robust geometric predicates (orientation, segment intersection, distance comparisons). On top of these, implement several core algorithms from the course: convex hull (Graham scan and/or Jarvis march), line segment intersection detection (sweep line recommended), closest pair of points (divide-and-conquer), and a Voronoi/Delaunay component (either a simplified Voronoi construction for small n, or Delaunay triangulation via incremental insertion).

Visualization is a key requirement: each algorithm should be demonstrable on randomly generated and hand-crafted inputs, with a clear rendering of input points/segments and the algorithm’s intermediate state. Examples include: hull stack evolution in Graham scan, sweep line position and active set for intersection detection, recursion splits and strip checks for closest pair, and incremental edges/cells for Voronoi/Delaunay. Your UI does not need to be a full product, but it should be usable: allow loading/generating instances, stepping through iterations, and exporting an image or data snapshot.

Design your toolkit so the “core geometry” is separated from the “visualization layer”. The algorithm implementations should be callable from tests without a UI. Then, build a visualization adapter that subscribes to algorithm events (e.g., “considered point i”, “pushed onto hull stack”, “current sweep event”, “active set changed”) and renders them. This separation makes it much easier to debug correctness: you can validate predicates and algorithm outputs independently, then verify that visualizations match what the code is doing.

Computational geometry is full of tricky corner cases. Your implementation must explicitly address degeneracies: collinear points on the hull boundary, duplicate points, vertical segments, shared endpoints, and nearly-collinear configurations under floating point. Provide a documented policy (e.g., “include all boundary points on the hull” vs “only extreme vertices”), and implement predicate handling accordingly. Where possible, use integer arithmetic for predicates when coordinates are integers (with overflow awareness), and otherwise implement an epsilon strategy consistently.

Deliver a short report describing your design choices, the time complexities your implementations target (and whether you meet them), and a suite of tests that validate correctness across edge cases. Include at least one “failure story” where a naive predicate or tie-breaking rule produced a wrong result, and show how you fixed it—this is common in geometry and demonstrates real understanding.

For visualization, aim for clarity over flashiness: label key points, show current invariants (e.g., the hull stack), and expose controls for speed/step size. For sweep line, render the current event point and draw the sweep line itself, plus highlight the active segments. For closest pair, visualize the split and the strip region and show which candidate pairs are being checked. Add a small legend and an “explain this step” text panel so the viewer can connect the visual state to the algorithm’s invariant. These details make the toolkit useful as a teaching aid rather than just a demo.

Stretch goals include interactive animations, exporting to common formats (GeoJSON-like), and integrating with a web canvas-based UI for richer controls.`,
    estimatedHours: 15,
    requirements: [
      'Define geometry primitives (Point, Segment) and helper utilities (distance, bounding boxes)',
      'Implement robust orientation (ccw) and segment intersection predicates with edge-case handling',
      'Implement convex hull (Graham scan and/or Jarvis march) with a documented collinearity policy',
      'Implement closest pair of points using divide-and-conquer in O(n log n)',
      'Implement segment intersection detection (sweep line recommended) with clear reporting of intersections',
      'Implement a Voronoi/Delaunay component (small-n Voronoi ok, or incremental Delaunay)',
      'Provide visualization for each algorithm (matplotlib animations or canvas-based UI)',
      'Support generating random instances and loading a simple JSON input format',
      'Add a test suite that covers degeneracies: collinear points, duplicates, vertical segments, shared endpoints',
      'Write a short report documenting complexity targets, design decisions, and example screenshots'
    ],
    scaffolding: {
      overview: 'Combine robust geometric predicates with classic algorithms and visualizations that show intermediate states.',
      milestones: [
        'Milestone 1: Predicates + convex hull + basic visualization',
        'Milestone 2: Closest pair + tests + visualization',
        'Milestone 3: Segment intersection detection + sweep visualization',
        'Milestone 4: Voronoi/Delaunay component + report + polish'
      ],
      tips: [
        'Start by getting the predicates right; most bugs in geometry come from incorrect orientation/intersection handling.',
        'Use deterministic random seeds in tests to keep regressions reproducible.',
        'Decide early how to treat collinear boundary points in the hull and keep that consistent.'
      ]
    },
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
