import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'cs403-t3-ex01',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Randomized Quicksort',
    difficulty: 2,
    description: 'Implement randomized quicksort that randomly selects pivots to achieve expected O(n log n) time complexity.',
    starterCode: `import random

def randomized_quicksort(arr):
    """
    Sort an array using randomized quicksort.

    Args:
        arr: List of comparable elements.

    Returns:
        list: Sorted array.
    """
    # Your code here
    pass`,
    solution: `import random

def randomized_quicksort(arr):
    """
    Sort an array using randomized quicksort.

    Args:
        arr: List of comparable elements.

    Returns:
        list: Sorted array.
    """
    if len(arr) <= 1:
        return arr

    # Randomly select a pivot
    pivot_idx = random.randint(0, len(arr) - 1)
    pivot = arr[pivot_idx]

    # Partition the array
    less = [x for x in arr if x < pivot]
    equal = [x for x in arr if x == pivot]
    greater = [x for x in arr if x > pivot]

    # Recursively sort and combine
    return randomized_quicksort(less) + equal + randomized_quicksort(greater)`,
    testCases: [
      {
        input: 'arr = [3, 1, 4, 1, 5, 9, 2, 6]',
        isHidden: false,
        description: 'Random array with duplicates'
      },
      {
        input: 'arr = [5, 4, 3, 2, 1]',
        isHidden: false,
        description: 'Reverse sorted array - worst case for deterministic quicksort'
      },
      {
        input: 'arr = [1]',
        isHidden: false,
        description: 'Single element array'
      }
    ],
    hints: [
      'Randomly select a pivot element from the array',
      'Partition the array into elements less than, equal to, and greater than the pivot',
      'Recursively sort the less and greater partitions',
      'Random pivot selection makes expected time complexity O(n log n) regardless of input'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex02',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Monte Carlo Primality Testing',
    difficulty: 3,
    description: 'Implement the Miller-Rabin primality test, a Monte Carlo algorithm that probabilistically determines if a number is prime.',
    starterCode: `import random

def miller_rabin(n, k=5):
    """
    Test if n is prime using Miller-Rabin algorithm.

    Args:
        n: Integer to test for primality.
        k: Number of rounds (higher k = more confidence).

    Returns:
        bool: True if n is probably prime, False if definitely composite.
    """
    # Your code here
    pass`,
    solution: `import random

def miller_rabin(n, k=5):
    """
    Test if n is prime using Miller-Rabin algorithm.

    Args:
        n: Integer to test for primality.
        k: Number of rounds (higher k = more confidence).

    Returns:
        bool: True if n is probably prime, False if definitely composite.
    """
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0:
        return False

    # Write n-1 as 2^r * d
    r, d = 0, n - 1
    while d % 2 == 0:
        r += 1
        d //= 2

    # Perform k rounds of testing
    for _ in range(k):
        a = random.randint(2, n - 2)
        x = pow(a, d, n)

        if x == 1 or x == n - 1:
            continue

        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False

    return True`,
    testCases: [
      {
        input: 'n = 17, k = 5',
        isHidden: false,
        description: 'Small prime number'
      },
      {
        input: 'n = 561, k = 5',
        isHidden: false,
        description: 'Carmichael number (composite but passes Fermat test)'
      },
      {
        input: 'n = 97, k = 5',
        isHidden: false,
        description: 'Prime number'
      }
    ],
    hints: [
      'Write n-1 as 2^r * d where d is odd',
      'For each round, pick a random witness a',
      'Compute x = a^d mod n',
      'If n is prime, x must be 1 or n-1, or squaring x repeatedly must eventually yield n-1'
    ],
    language: 'python'
  }
];
