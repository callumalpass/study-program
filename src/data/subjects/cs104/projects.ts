import { Project } from '../../../core/types';

export const cs104Projects: Project[] = [
  {
    id: 'cs104-project-1',
    subjectId: 'cs104',
    title: 'Build a Custom Hash Map Implementation',
    description: 'Create a complete hash map implementation from scratch in Python. Your implementation should handle collisions, support dynamic resizing, and provide efficient operations. This project will deepen your understanding of how hash tables work internally and the trade-offs involved in their design.',
    requirements: [
      'Implement a hash function that distributes keys uniformly',
      'Handle collisions using chaining (linked lists at each bucket)',
      'Support put(key, value), get(key), remove(key), and contains(key) operations',
      'Implement dynamic resizing when load factor exceeds 0.75',
      'Rehash all existing entries when resizing occurs',
      'Handle edge cases: null keys, duplicate keys, empty map operations',
      'Provide size() and is_empty() utility methods',
      'Write comprehensive unit tests covering all operations and edge cases',
      'Document time and space complexity for each operation',
      'Include a demo program showing practical usage examples'
    ],
    rubric: [
      {
        name: 'Correctness',
        weight: 40,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All operations work correctly, handles all edge cases, passes all tests'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Core operations work, minor edge case issues, most tests pass'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic functionality works, some edge cases fail, several test failures'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Significant bugs, many operations fail, limited test coverage'
          }
        ]
      },
      {
        name: 'Design and Implementation',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Efficient algorithms, clean code structure, proper OOP design, optimal complexity'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Reasonable implementation, mostly efficient, minor design issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Works but inefficient in places, some design flaws'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor design choices, inefficient algorithms, hard to understand'
          }
        ]
      },
      {
        name: 'Testing',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Comprehensive tests, edge cases covered, clear test organization'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good test coverage, most important cases tested'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic tests present, missing some important cases'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Minimal testing, major gaps in coverage'
          }
        ]
      },
      {
        name: 'Documentation',
        weight: 10,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Clear comments, complexity analysis, usage examples, design decisions explained'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good comments, complexity noted, basic documentation'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Some comments, minimal documentation'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Little to no documentation or comments'
          }
        ]
      }
    ],
    estimatedHours: 12
  }
];
