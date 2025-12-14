import { Project } from '../../../core/types';

export const math203Projects: Project[] = [
  {
    id: 'math203-project-1',
    subjectId: 'math203',
    title: 'Derivative Calculator & Visualizer',
    description:
      'Build an interactive tool that computes derivatives symbolically and visualizes them graphically. The system should parse mathematical expressions, compute their derivatives using differentiation rules, and display both the original function and its derivative. Users should be able to see tangent lines at any point and explore how the derivative relates to the slope of the tangent.',
    requirements: [
      'Parse mathematical expressions involving polynomials, trigonometric functions, exponentials, and logarithms',
      'Implement the power rule, product rule, quotient rule, and chain rule symbolically',
      'Display the derivative in simplified form',
      'Plot the original function and its derivative on the same graph',
      'Allow users to click on a point to see the tangent line and its equation',
      'Show the relationship between f\'(x) and the slope of the tangent',
      'Highlight regions where f is increasing (f\' > 0) and decreasing (f\' < 0)',
      'Include a "derivative quiz" mode that tests users on derivative rules',
      'Handle edge cases like discontinuities and undefined derivatives gracefully',
      'Provide step-by-step derivative computation for educational purposes'
    ],
    rubric: [
      {
        name: 'Symbolic Differentiation',
        weight: 35,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Correctly differentiates all standard functions including nested compositions. Shows clear, simplified output.'
          },
          {
            score: 75,
            label: 'Good',
            description:
              'Handles most cases correctly; may struggle with complex chain rule applications.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description:
              'Basic power rule and sum rule work; advanced rules have issues.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Derivative computation frequently incorrect.'
          }
        ]
      },
      {
        name: 'Visualization',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Beautiful, interactive graphs with tangent lines, highlighted regions, and smooth animations.'
          },
          {
            score: 75,
            label: 'Good',
            description:
              'Clear graphs with tangent lines; some interactive features.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic plotting works but limited interactivity.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Graphs incorrect or missing.'
          }
        ]
      },
      {
        name: 'Educational Features',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Step-by-step solutions, quiz mode, and clear explanations of derivative concepts.'
          },
          {
            score: 75,
            label: 'Good',
            description:
              'Good explanations; quiz mode present but basic.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Limited educational content.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'No educational features.'
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
            description:
              'Well-structured code with clear separation of parsing, differentiation, and visualization.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Readable code with minor organizational issues.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Code works but hard to follow.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Poorly organized code.'
          }
        ]
      }
    ],
    estimatedHours: 18
  },
  {
    id: 'math203-project-2',
    subjectId: 'math203',
    title: 'Optimization Problem Solver',
    description:
      'Create an application that helps users set up and solve optimization problems from calculus. The tool should guide users through the optimization process: identifying variables, setting up objective functions, incorporating constraints, finding critical points, and verifying extrema. Include visualization of the optimization process.',
    requirements: [
      'Provide templates for common optimization problems (area, volume, cost, distance)',
      'Guide users through identifying the objective function and constraints',
      'Automatically substitute constraints to reduce to single-variable optimization',
      'Find critical points by solving f\'(x) = 0',
      'Apply the second derivative test to classify extrema',
      'Check boundary values when applicable',
      'Visualize the objective function with critical points marked',
      'Provide step-by-step solutions with explanations',
      'Allow users to input custom optimization problems',
      'Include a library of classic optimization problems with solutions'
    ],
    rubric: [
      {
        name: 'Problem Setup',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Correctly identifies variables, objective functions, and constraints for all problem types.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Handles most problem types; occasional setup errors.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic problems only; struggles with complex setups.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Cannot correctly set up problems.'
          }
        ]
      },
      {
        name: 'Solution Algorithm',
        weight: 35,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Correctly finds and classifies all extrema, including boundary analysis.'
          },
          {
            score: 75,
            label: 'Good',
            description:
              'Finds critical points correctly; minor issues with classification.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic derivative operations work; analysis incomplete.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Algorithm produces incorrect results.'
          }
        ]
      },
      {
        name: 'User Interface',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Intuitive interface that guides users through the process with helpful prompts.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Functional interface with clear navigation.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic interface; not very user-friendly.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Confusing or non-functional interface.'
          }
        ]
      },
      {
        name: 'Problem Library',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Extensive library with diverse problems and detailed solutions.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good selection of problems with solutions.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Limited problem set.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'No problem library.'
          }
        ]
      }
    ],
    estimatedHours: 15
  },
  {
    id: 'math203-project-3',
    subjectId: 'math203',
    title: 'Function Analysis & Curve Sketcher',
    description:
      'Build a comprehensive function analysis tool that performs all the steps of curve sketching: finding domain, intercepts, asymptotes, critical points, inflection points, and intervals of increase/decrease and concavity. The tool should then generate an accurate sketch based on this analysis.',
    requirements: [
      'Accept functions in standard mathematical notation',
      'Determine the domain (identify where function is undefined)',
      'Find x and y intercepts',
      'Identify vertical, horizontal, and oblique asymptotes',
      'Compute first derivative and find critical points',
      'Determine intervals of increase and decrease',
      'Compute second derivative and find inflection points',
      'Determine intervals of concavity',
      'Classify critical points as local max/min using derivative tests',
      'Generate an accurate graph with all features labeled',
      'Provide a summary report of all function characteristics',
      'Support rational, polynomial, exponential, logarithmic, and trigonometric functions'
    ],
    rubric: [
      {
        name: 'Analysis Accuracy',
        weight: 40,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Correctly identifies all features: domain, asymptotes, extrema, inflection points, intervals.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Most features correct; minor errors in edge cases.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic analysis works; misses some features.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Analysis frequently incorrect.'
          }
        ]
      },
      {
        name: 'Graph Quality',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Accurate, well-labeled graph that reflects all analyzed features with proper asymptotes and behavior.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good graph with most features correctly shown.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic graph; some features missing or incorrect.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Graph does not match function.'
          }
        ]
      },
      {
        name: 'Function Support',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Handles all major function types including compositions.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Supports most common function types.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Limited to polynomials and simple rationals.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Very limited function support.'
          }
        ]
      },
      {
        name: 'Report Generation',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Clear, comprehensive report with mathematical notation and explanations.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good report with key information.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic output; not well formatted.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'No summary report.'
          }
        ]
      }
    ],
    estimatedHours: 20
  },
  {
    id: 'math203-project-4',
    subjectId: 'math203',
    title: 'Related Rates Simulator',
    description:
      'Create an interactive simulation that visualizes related rates problems. Users can see how changing one quantity affects related quantities in real-time. The simulator should cover classic problems: ladders, cones filling, shadows, and more. Include the mathematical relationships and show how differentiation connects the rates.',
    requirements: [
      'Implement at least 5 classic related rates scenarios (ladder, cone, shadow, balloon, distance)',
      'Animate the scenarios in real-time showing all quantities changing',
      'Display the mathematical equations relating the quantities',
      'Show the differentiated equations relating the rates',
      'Allow users to control the rate of change of one variable and see effects on others',
      'Display current values of all quantities and rates numerically',
      'Pause/resume simulation to analyze specific instants',
      'Include "solve" mode where users input known values to find unknown rates',
      'Provide step-by-step solutions for the related rates problems',
      'Allow users to modify problem parameters (e.g., ladder length, cone dimensions)'
    ],
    rubric: [
      {
        name: 'Simulation Quality',
        weight: 35,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Smooth, accurate animations for all scenarios with clear visual representation of quantities.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good animations; minor visual issues.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic animation; not all scenarios work well.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Animations broken or missing.'
          }
        ]
      },
      {
        name: 'Mathematical Accuracy',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'All rates and relationships computed correctly; formulas displayed accurately.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Most calculations correct; minor errors.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic relationships correct; some rates wrong.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'Mathematical model incorrect.'
          }
        ]
      },
      {
        name: 'Interactivity',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Full control over parameters, pause/resume, solve mode all working smoothly.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good interactivity; some features limited.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Limited user control.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'No meaningful interactivity.'
          }
        ]
      },
      {
        name: 'Educational Value',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description:
              'Clear explanations, step-by-step solutions, helps build intuition for related rates.'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good educational content.'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Some educational features.'
          },
          {
            score: 0,
            label: 'Unsatisfactory',
            description: 'No educational value beyond visualization.'
          }
        ]
      }
    ],
    estimatedHours: 16
  }
];
