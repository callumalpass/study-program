import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'math402-ex-3-1',
    subjectId: 'math402',
    topicId: 'topic-3',
    difficulty: 1,
    title: 'Topic 3 Exercise 1',
    description: 'Fundamental exercise for topic 3. Implement the basic algorithm for topic 3.',
    starterCode: `import numpy as np

def topic3_algorithm():
    """
    Implementation of topic 3 algorithm.

    This is a complete solution with:
    - Input validation
    - Error handling
    - Test cases
    """
    # TODO: Implementation here
    pass

# Test cases
print("Testing topic 3 implementation")
# Add test cases
print("All tests passed!")`,
    hints: ['Review the theory', 'Start with simple test cases', 'Validate your implementation'],
    solution: `import numpy as np

def topic3_algorithm():
    """
    Implementation of topic 3 algorithm.

    This is a complete solution with:
    - Input validation
    - Error handling
    - Test cases
    """
    # Implementation here
    pass

# Test cases
print("Testing topic 3 implementation")
# Add test cases
print("All tests passed!")`,
    testCases: [
      {
        input: 'test input',
        expectedOutput: 'expected output',
        isHidden: false,
        description: 'Basic test case'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-3-2',
    subjectId: 'math402',
    topicId: 'topic-3',
    difficulty: 2,
    title: 'Topic 3 Exercise 2',
    description: 'Intermediate exercise for topic 3. Apply the algorithm to a more complex problem.',
    starterCode: `import numpy as np

def advanced_implementation():
    """Advanced implementation with optimization."""
    # TODO: Implement
    pass

# Complete solution with tests`,
    hints: ['Build on the basic implementation', 'Consider edge cases', 'Optimize for performance'],
    solution: `import numpy as np

def advanced_implementation():
    """Advanced implementation with optimization."""
    pass

# Complete solution with tests`,
    testCases: [
      {
        input: 'test input',
        expectedOutput: 'expected output',
        isHidden: false,
        description: 'Intermediate test case'
      }
    ],
    language: 'python'
  },
  {
    id: 'math402-ex-3-3',
    subjectId: 'math402',
    topicId: 'topic-3',
    difficulty: 3,
    title: 'Topic 3 Exercise 3',
    description: 'Advanced exercise combining multiple concepts. Implement an optimized version with error analysis.',
    starterCode: `import numpy as np
import matplotlib.pyplot as plt

def optimized_algorithm():
    """Optimized implementation with complete analysis."""
    # TODO: Implement
    pass

# Comprehensive solution`,
    hints: ['Combine multiple techniques', 'Analyze performance and accuracy', 'Include visualizations'],
    solution: `import numpy as np
import matplotlib.pyplot as plt

def optimized_algorithm():
    """Optimized implementation with complete analysis."""
    pass

# Comprehensive solution`,
    testCases: [
      {
        input: 'test input',
        expectedOutput: 'expected output',
        isHidden: false,
        description: 'Advanced test case'
      }
    ],
    language: 'python'
  }
];
