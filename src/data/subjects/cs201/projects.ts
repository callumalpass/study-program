import { Project } from '../../../core/types';

export const cs201Projects: Project[] = [
  {
    id: 'cs201-project-maze',
    subjectId: 'cs201',
    title: 'Maze Solver',
    description: 'Build a tool that finds the shortest path through a maze using graph algorithms. You will implement BFS for unweighted shortest paths and A* for optimized searching.',
    estimatedHours: 10,
    requirements: [
        'Implement BFS',
        'Implement A*',
        'Visualize path'
    ],
    rubric: [
        {
            name: 'Correctness',
            weight: 50,
            levels: [
                { score: 50, label: 'Perfect', description: 'Finds optimal path' },
                { score: 0, label: 'Failed', description: 'Does not find path' }
            ]
        }
    ],
    scaffolding: {
        overview: 'Build a maze solver using graph traversal algorithms.',
        gettingStarted: [
            'Create a Maze class that parses a grid and identifies start (S) and end (E) positions',
            'Implement BFS to find the shortest unweighted path',
            'Implement A* with a heuristic for optimized searching',
            'Add visualization to show the path found'
        ],
        tips: [
            'Use a queue for BFS and a priority queue (heapq) for A*',
            'Track visited cells to avoid infinite loops',
            'For A*, Manhattan distance works well as a heuristic for grid mazes'
        ]
    }
  }
];