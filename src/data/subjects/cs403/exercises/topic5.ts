import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'cs403-t5-ex01',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Matrix Chain Multiplication',
    difficulty: 3,
    description: 'Find the optimal way to multiply a chain of matrices to minimize scalar multiplications using dynamic programming.',
    starterCode: `def matrix_chain_order(dimensions):
    """
    Find minimum number of scalar multiplications needed.

    Args:
        dimensions: List where dimensions[i-1] x dimensions[i] is the size of matrix i.
                    Example: [10, 20, 30, 40] means matrices:
                    A1 (10x20), A2 (20x30), A3 (30x40)

    Returns:
        int: Minimum number of scalar multiplications.
    """
    # Your code here
    pass`,
    solution: `def matrix_chain_order(dimensions):
    """
    Find minimum number of scalar multiplications needed.

    Args:
        dimensions: List where dimensions[i-1] x dimensions[i] is the size of matrix i.

    Returns:
        int: Minimum number of scalar multiplications.
    """
    n = len(dimensions) - 1  # Number of matrices

    # dp[i][j] = minimum cost to multiply matrices i through j
    dp = [[0] * n for _ in range(n)]

    # l is chain length
    for l in range(2, n + 1):
        for i in range(n - l + 1):
            j = i + l - 1
            dp[i][j] = float('inf')

            # Try all possible split points
            for k in range(i, j):
                # Cost of multiplying matrices i..k and k+1..j,
                # plus cost of multiplying the two resulting matrices
                cost = (dp[i][k] + dp[k + 1][j] +
                       dimensions[i] * dimensions[k + 1] * dimensions[j + 1])

                dp[i][j] = min(dp[i][j], cost)

    return dp[0][n - 1]`,
    testCases: [
      {
        input: 'dimensions = [10, 20, 30, 40, 30]',
        isHidden: false,
        description: 'Four matrices - optimal grouping matters'
      },
      {
        input: 'dimensions = [5, 10, 3, 12, 5, 50, 6]',
        isHidden: false,
        description: 'Six matrices with varying dimensions'
      },
      {
        input: 'dimensions = [10, 20, 30]',
        isHidden: false,
        description: 'Two matrices - only one way to multiply'
      }
    ],
    hints: [
      'Use dp[i][j] to store the minimum cost to multiply matrices i through j',
      'For each subproblem, try all possible ways to split the chain',
      'The cost to multiply two matrix products is rows of first * cols of second * cols of result',
      'Build solutions bottom-up from smaller chains to larger ones'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t5-ex02',
    subjectId: 'cs403',
    topicId: 'cs403-topic-5',
    title: 'Edit Distance',
    difficulty: 3,
    description: 'Compute the minimum edit distance between two strings using insertion, deletion, and substitution operations.',
    starterCode: `def edit_distance(str1, str2):
    """
    Compute minimum edit distance between two strings.

    Args:
        str1: First string.
        str2: Second string.

    Returns:
        int: Minimum number of operations to transform str1 into str2.
    """
    # Your code here
    pass`,
    solution: `def edit_distance(str1, str2):
    """
    Compute minimum edit distance between two strings.

    Args:
        str1: First string.
        str2: Second string.

    Returns:
        int: Minimum number of operations to transform str1 into str2.
    """
    m, n = len(str1), len(str2)

    # dp[i][j] = edit distance between str1[0..i-1] and str2[0..j-1]
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Base cases
    for i in range(m + 1):
        dp[i][0] = i  # Delete all characters from str1
    for j in range(n + 1):
        dp[0][j] = j  # Insert all characters of str2

    # Fill the dp table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                # Characters match - no operation needed
                dp[i][j] = dp[i - 1][j - 1]
            else:
                # Take minimum of three operations
                dp[i][j] = 1 + min(
                    dp[i - 1][j],      # Delete from str1
                    dp[i][j - 1],      # Insert into str1
                    dp[i - 1][j - 1]   # Substitute
                )

    return dp[m][n]`,
    testCases: [
      {
        input: 'str1 = "kitten", str2 = "sitting"',
        isHidden: false,
        description: 'Classic example - 3 operations needed'
      },
      {
        input: 'str1 = "horse", str2 = "ros"',
        isHidden: false,
        description: 'Multiple deletions and substitutions'
      },
      {
        input: 'str1 = "intention", str2 = "execution"',
        isHidden: false,
        description: 'Longer strings with various operations'
      }
    ],
    hints: [
      'Use dp[i][j] for the edit distance between first i chars of str1 and first j chars of str2',
      'Base cases: dp[i][0] = i (delete all), dp[0][j] = j (insert all)',
      'If characters match, no operation needed: dp[i][j] = dp[i-1][j-1]',
      'Otherwise, take minimum of insert, delete, or substitute'
    ],
    language: 'python'
  }
];
