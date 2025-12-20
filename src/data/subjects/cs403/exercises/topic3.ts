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
  },
  {
    id: 'cs403-t3-ex03',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Randomized QuickSelect',
    difficulty: 2,
    description: 'Implement the randomized QuickSelect algorithm to find the k-th smallest element in O(n) expected time.',
    starterCode: `import random

def quickselect(arr, k):
    """
    Find the k-th smallest element (0-indexed) using randomized QuickSelect.

    Args:
        arr: List of comparable elements.
        k: Index of the element to find (0-indexed).

    Returns:
        The k-th smallest element.
    """
    # Your code here
    pass`,
    solution: `import random

def quickselect(arr, k):
    """
    Find the k-th smallest element (0-indexed) using randomized QuickSelect.

    Args:
        arr: List of comparable elements.
        k: Index of the element to find (0-indexed).

    Returns:
        The k-th smallest element.
    """
    if len(arr) == 1:
        return arr[0]

    # Randomly select pivot
    pivot = random.choice(arr)

    # Partition array
    less = [x for x in arr if x < pivot]
    equal = [x for x in arr if x == pivot]
    greater = [x for x in arr if x > pivot]

    # Determine which partition contains k-th element
    if k < len(less):
        return quickselect(less, k)
    elif k < len(less) + len(equal):
        return pivot
    else:
        return quickselect(greater, k - len(less) - len(equal))`,
    testCases: [
      {
        input: 'arr = [3, 1, 4, 1, 5, 9, 2, 6], k = 4',
        isHidden: false,
        description: 'Find median (4th smallest element)'
      },
      {
        input: 'arr = [7, 10, 4, 3, 20, 15], k = 2',
        isHidden: false,
        description: 'Find 3rd smallest element'
      },
      {
        input: 'arr = [5, 5, 5, 5, 5], k = 0',
        isHidden: false,
        description: 'All elements equal'
      }
    ],
    hints: [
      'Randomly select a pivot to ensure expected O(n) time',
      'Partition array into elements less than, equal to, and greater than pivot',
      'Recursively search only the partition containing the k-th element',
      'Expected time is O(n) because each recursion reduces size by constant factor'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex04',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Bloom Filter',
    difficulty: 3,
    description: 'Implement a Bloom filter, a space-efficient probabilistic data structure for set membership testing.',
    starterCode: `import random

class BloomFilter:
    """
    Bloom filter for probabilistic set membership testing.
    """
    def __init__(self, size, num_hashes):
        """
        Initialize Bloom filter.

        Args:
            size: Size of bit array.
            num_hashes: Number of hash functions to use.
        """
        # Your code here
        pass

    def add(self, item):
        """Add item to the filter."""
        # Your code here
        pass

    def contains(self, item):
        """
        Check if item might be in the set.

        Returns:
            bool: False means definitely not in set, True means probably in set.
        """
        # Your code here
        pass`,
    solution: `import random

class BloomFilter:
    """
    Bloom filter for probabilistic set membership testing.
    """
    def __init__(self, size, num_hashes):
        """
        Initialize Bloom filter.

        Args:
            size: Size of bit array.
            num_hashes: Number of hash functions to use.
        """
        self.size = size
        self.num_hashes = num_hashes
        self.bit_array = [0] * size

    def _hash(self, item, seed):
        """Generate hash value for item with given seed."""
        random.seed(str(item) + str(seed))
        return random.randint(0, self.size - 1)

    def add(self, item):
        """Add item to the filter."""
        for i in range(self.num_hashes):
            index = self._hash(item, i)
            self.bit_array[index] = 1

    def contains(self, item):
        """
        Check if item might be in the set.

        Returns:
            bool: False means definitely not in set, True means probably in set.
        """
        for i in range(self.num_hashes):
            index = self._hash(item, i)
            if self.bit_array[index] == 0:
                return False
        return True`,
    testCases: [
      {
        input: 'bf = BloomFilter(100, 3); bf.add("apple"); bf.add("banana"); bf.contains("apple")',
        isHidden: false,
        description: 'Test membership of added items'
      },
      {
        input: 'bf = BloomFilter(100, 3); bf.add("cat"); bf.contains("dog")',
        isHidden: false,
        description: 'Test non-membership (may have false positives)'
      },
      {
        input: 'bf = BloomFilter(50, 5); [bf.add(i) for i in range(10)]; bf.contains(5)',
        isHidden: false,
        description: 'Multiple items, check membership'
      }
    ],
    hints: [
      'Use a bit array to store the filter state',
      'For adding, set k bits (where k = num_hashes) based on hash functions',
      'For checking, verify all k bits are set',
      'False positives are possible but false negatives are not',
      'Use different seeds for each hash function'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex05',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Reservoir Sampling',
    difficulty: 2,
    description: 'Implement reservoir sampling to randomly select k items from a stream of unknown length with uniform probability.',
    starterCode: `import random

def reservoir_sampling(stream, k):
    """
    Randomly select k items from a stream with uniform probability.

    Args:
        stream: Iterator or list of items.
        k: Number of items to sample.

    Returns:
        list: k randomly selected items.
    """
    # Your code here
    pass`,
    solution: `import random

def reservoir_sampling(stream, k):
    """
    Randomly select k items from a stream with uniform probability.

    Args:
        stream: Iterator or list of items.
        k: Number of items to sample.

    Returns:
        list: k randomly selected items.
    """
    reservoir = []

    for i, item in enumerate(stream):
        if i < k:
            # Fill reservoir with first k items
            reservoir.append(item)
        else:
            # Randomly replace items with decreasing probability
            j = random.randint(0, i)
            if j < k:
                reservoir[j] = item

    return reservoir`,
    testCases: [
      {
        input: 'stream = range(100), k = 10',
        isHidden: false,
        description: 'Sample 10 items from stream of 100'
      },
      {
        input: 'stream = [1, 2, 3, 4, 5], k = 3',
        isHidden: false,
        description: 'Small stream, sample 3 items'
      },
      {
        input: 'stream = range(1000), k = 5',
        isHidden: false,
        description: 'Large stream, small sample'
      }
    ],
    hints: [
      'Keep first k items in the reservoir',
      'For item at index i (i >= k), include it with probability k/i',
      'If included, replace a random item in the reservoir',
      'This ensures each item has equal probability k/n of being selected',
      'Works for streams of unknown length'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex06',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Skip List Implementation',
    difficulty: 4,
    description: 'Implement a skip list, a randomized data structure that provides O(log n) expected time for search, insert, and delete.',
    starterCode: `import random

class SkipListNode:
    def __init__(self, value, level):
        self.value = value
        self.forward = [None] * (level + 1)

class SkipList:
    def __init__(self, max_level=16, p=0.5):
        """
        Initialize skip list.

        Args:
            max_level: Maximum number of levels.
            p: Probability for level generation.
        """
        # Your code here
        pass

    def random_level(self):
        """Generate random level for new node."""
        # Your code here
        pass

    def insert(self, value):
        """Insert value into skip list."""
        # Your code here
        pass

    def search(self, value):
        """Search for value in skip list."""
        # Your code here
        pass`,
    solution: `import random

class SkipListNode:
    def __init__(self, value, level):
        self.value = value
        self.forward = [None] * (level + 1)

class SkipList:
    def __init__(self, max_level=16, p=0.5):
        """
        Initialize skip list.

        Args:
            max_level: Maximum number of levels.
            p: Probability for level generation.
        """
        self.max_level = max_level
        self.p = p
        self.header = SkipListNode(float('-inf'), max_level)
        self.level = 0

    def random_level(self):
        """Generate random level for new node."""
        level = 0
        while random.random() < self.p and level < self.max_level:
            level += 1
        return level

    def insert(self, value):
        """Insert value into skip list."""
        update = [None] * (self.max_level + 1)
        current = self.header

        # Find position to insert
        for i in range(self.level, -1, -1):
            while current.forward[i] and current.forward[i].value < value:
                current = current.forward[i]
            update[i] = current

        # Generate random level
        level = self.random_level()

        # Update level if needed
        if level > self.level:
            for i in range(self.level + 1, level + 1):
                update[i] = self.header
            self.level = level

        # Create and insert new node
        new_node = SkipListNode(value, level)
        for i in range(level + 1):
            new_node.forward[i] = update[i].forward[i]
            update[i].forward[i] = new_node

    def search(self, value):
        """Search for value in skip list."""
        current = self.header

        for i in range(self.level, -1, -1):
            while current.forward[i] and current.forward[i].value < value:
                current = current.forward[i]

        current = current.forward[0]
        return current is not None and current.value == value`,
    testCases: [
      {
        input: 'sl = SkipList(); sl.insert(3); sl.insert(1); sl.insert(4); sl.search(3)',
        isHidden: false,
        description: 'Insert and search for existing element'
      },
      {
        input: 'sl = SkipList(); sl.insert(5); sl.insert(2); sl.search(7)',
        isHidden: false,
        description: 'Search for non-existing element'
      },
      {
        input: 'sl = SkipList(); [sl.insert(i) for i in range(10)]; sl.search(5)',
        isHidden: false,
        description: 'Multiple insertions'
      }
    ],
    hints: [
      'Skip list has multiple levels, each acting as an express lane',
      'Use random level generation with probability p',
      'Maintain forward pointers at each level',
      'Search by starting at highest level and descending',
      'Expected time complexity is O(log n) for all operations'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex07',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Treap Implementation',
    difficulty: 4,
    description: 'Implement a treap (tree + heap), a randomized BST where each node has a random priority to maintain balance.',
    starterCode: `import random

class TreapNode:
    def __init__(self, key):
        self.key = key
        self.priority = random.random()
        self.left = None
        self.right = None

class Treap:
    def __init__(self):
        self.root = None

    def rotate_right(self, node):
        """Perform right rotation."""
        # Your code here
        pass

    def rotate_left(self, node):
        """Perform left rotation."""
        # Your code here
        pass

    def insert(self, key):
        """Insert key into treap."""
        # Your code here
        pass

    def search(self, key):
        """Search for key in treap."""
        # Your code here
        pass`,
    solution: `import random

class TreapNode:
    def __init__(self, key):
        self.key = key
        self.priority = random.random()
        self.left = None
        self.right = None

class Treap:
    def __init__(self):
        self.root = None

    def rotate_right(self, node):
        """Perform right rotation."""
        left_child = node.left
        node.left = left_child.right
        left_child.right = node
        return left_child

    def rotate_left(self, node):
        """Perform left rotation."""
        right_child = node.right
        node.right = right_child.left
        right_child.left = node
        return right_child

    def _insert(self, node, key):
        """Helper method to insert key."""
        if node is None:
            return TreapNode(key)

        if key < node.key:
            node.left = self._insert(node.left, key)
            # Maintain heap property
            if node.left.priority > node.priority:
                node = self.rotate_right(node)
        else:
            node.right = self._insert(node.right, key)
            # Maintain heap property
            if node.right.priority > node.priority:
                node = self.rotate_left(node)

        return node

    def insert(self, key):
        """Insert key into treap."""
        self.root = self._insert(self.root, key)

    def _search(self, node, key):
        """Helper method to search."""
        if node is None:
            return False
        if node.key == key:
            return True
        elif key < node.key:
            return self._search(node.left, key)
        else:
            return self._search(node.right, key)

    def search(self, key):
        """Search for key in treap."""
        return self._search(self.root, key)`,
    testCases: [
      {
        input: 't = Treap(); t.insert(5); t.insert(3); t.insert(7); t.search(3)',
        isHidden: false,
        description: 'Basic insertion and search'
      },
      {
        input: 't = Treap(); [t.insert(i) for i in [1,2,3,4,5]]; t.search(3)',
        isHidden: false,
        description: 'Sequential insertions (would unbalance regular BST)'
      },
      {
        input: 't = Treap(); t.insert(10); t.search(5)',
        isHidden: false,
        description: 'Search for non-existing key'
      }
    ],
    hints: [
      'Treap maintains BST property by keys and heap property by random priorities',
      'Insert as in BST, then rotate to maintain heap property',
      'Rotations preserve BST property while fixing heap violations',
      'Random priorities ensure expected O(log n) height',
      'Use right rotation when left child priority > parent priority'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex08',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Randomized Min-Cut',
    difficulty: 5,
    description: 'Implement Karger\'s randomized algorithm to find the minimum cut in an undirected graph.',
    starterCode: `import random

def karger_min_cut(graph, iterations=100):
    """
    Find minimum cut using Karger's randomized algorithm.

    Args:
        graph: Dictionary where graph[u] is list of neighbors of u.
        iterations: Number of times to repeat the algorithm.

    Returns:
        int: Size of minimum cut found.
    """
    # Your code here
    pass`,
    solution: `import random

def karger_min_cut(graph, iterations=100):
    """
    Find minimum cut using Karger's randomized algorithm.

    Args:
        graph: Dictionary where graph[u] is list of neighbors of u.
        iterations: Number of times to repeat the algorithm.

    Returns:
        int: Size of minimum cut found.
    """
    def contract_edge(g):
        """Contract a random edge in the graph."""
        # Make a copy
        g = {k: v[:] for k, v in g.items()}

        while len(g) > 2:
            # Pick random edge
            u = random.choice(list(g.keys()))
            v = random.choice(g[u])

            # Merge v into u
            g[u].extend(g[v])

            # Update all edges pointing to v to point to u
            for node in g[v]:
                g[node] = [u if x == v else x for x in g[node]]

            # Remove self-loops
            g[u] = [x for x in g[u] if x != u]

            # Remove v
            del g[v]

        # Return size of cut
        return len(list(g.values())[0])

    min_cut = float('inf')

    for _ in range(iterations):
        cut_size = contract_edge(graph)
        min_cut = min(min_cut, cut_size)

    return min_cut`,
    testCases: [
      {
        input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}, iterations = 50',
        isHidden: false,
        description: 'Triangle graph - min cut is 2'
      },
      {
        input: 'graph = {0: [1, 2], 1: [0, 3], 2: [0, 3], 3: [1, 2]}, iterations = 50',
        isHidden: false,
        description: 'Square graph - min cut is 2'
      },
      {
        input: 'graph = {0: [1], 1: [0, 2], 2: [1, 3], 3: [2]}, iterations = 50',
        isHidden: false,
        description: 'Path graph - min cut is 1'
      }
    ],
    hints: [
      'Repeatedly contract random edges until 2 vertices remain',
      'Contracting edge (u,v) means merging v into u',
      'Update all edges pointing to v to point to u instead',
      'Remove self-loops after contraction',
      'Run multiple iterations and take minimum (success probability increases)',
      'With O(n^2 log n) iterations, high probability of finding min cut'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex09',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Las Vegas Algorithm - Random Binary Search',
    difficulty: 2,
    description: 'Implement a Las Vegas algorithm for binary search that always returns correct result but has randomized runtime.',
    starterCode: `import random

def las_vegas_binary_search(arr, target):
    """
    Las Vegas binary search - always correct, randomized runtime.

    Args:
        arr: Sorted list of elements.
        target: Element to find.

    Returns:
        int: Index of target, or -1 if not found.
    """
    # Your code here
    pass`,
    solution: `import random

def las_vegas_binary_search(arr, target):
    """
    Las Vegas binary search - always correct, randomized runtime.

    Args:
        arr: Sorted list of elements.
        target: Element to find.

    Returns:
        int: Index of target, or -1 if not found.
    """
    left, right = 0, len(arr) - 1

    while left <= right:
        # Randomly choose mid point instead of (left + right) // 2
        mid = random.randint(left, right)

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
    testCases: [
      {
        input: 'arr = [1, 3, 5, 7, 9, 11, 13], target = 7',
        isHidden: false,
        description: 'Find element in middle'
      },
      {
        input: 'arr = [2, 4, 6, 8, 10, 12, 14, 16], target = 2',
        isHidden: false,
        description: 'Find first element'
      },
      {
        input: 'arr = [1, 2, 3, 4, 5], target = 6',
        isHidden: false,
        description: 'Element not in array'
      }
    ],
    hints: [
      'Las Vegas algorithms always produce correct output',
      'Runtime is randomized, not the output',
      'Choose random midpoint instead of deterministic (left + right) // 2',
      'Expected runtime is still O(log n)',
      'Worst case runtime could be O(n) with bad luck'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex10',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Monte Carlo Pi Estimation',
    difficulty: 1,
    description: 'Use Monte Carlo method to estimate π by randomly sampling points in a unit square.',
    starterCode: `import random

def estimate_pi(num_samples):
    """
    Estimate pi using Monte Carlo method.

    Args:
        num_samples: Number of random points to sample.

    Returns:
        float: Estimate of pi.
    """
    # Your code here
    pass`,
    solution: `import random

def estimate_pi(num_samples):
    """
    Estimate pi using Monte Carlo method.

    Args:
        num_samples: Number of random points to sample.

    Returns:
        float: Estimate of pi.
    """
    inside_circle = 0

    for _ in range(num_samples):
        # Random point in unit square [0,1] x [0,1]
        x = random.random()
        y = random.random()

        # Check if point is inside unit circle
        if x*x + y*y <= 1:
            inside_circle += 1

    # Area of quarter circle / Area of unit square = pi/4
    return 4 * inside_circle / num_samples`,
    testCases: [
      {
        input: 'num_samples = 10000',
        isHidden: false,
        description: 'Estimate with 10,000 samples'
      },
      {
        input: 'num_samples = 100000',
        isHidden: false,
        description: 'More samples = better estimate'
      },
      {
        input: 'num_samples = 1000',
        isHidden: false,
        description: 'Fewer samples = less accurate'
      }
    ],
    hints: [
      'Sample random points (x, y) in unit square [0,1] x [0,1]',
      'Check if point is inside unit circle: x^2 + y^2 <= 1',
      'Ratio of points inside circle to total points ≈ π/4',
      'Multiply by 4 to get π estimate',
      'More samples give better approximation'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex11',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Randomized Load Balancing',
    difficulty: 2,
    description: 'Implement randomized load balancing where jobs are assigned to random servers.',
    starterCode: `import random

def randomized_load_balance(jobs, num_servers):
    """
    Assign jobs to servers randomly and compute max load.

    Args:
        jobs: List of job IDs.
        num_servers: Number of servers available.

    Returns:
        tuple: (server_loads dict, max_load)
    """
    # Your code here
    pass`,
    solution: `import random

def randomized_load_balance(jobs, num_servers):
    """
    Assign jobs to servers randomly and compute max load.

    Args:
        jobs: List of job IDs.
        num_servers: Number of servers available.

    Returns:
        tuple: (server_loads dict, max_load)
    """
    server_loads = {i: [] for i in range(num_servers)}

    for job in jobs:
        # Randomly assign to a server
        server = random.randint(0, num_servers - 1)
        server_loads[server].append(job)

    max_load = max(len(server_loads[i]) for i in range(num_servers))

    return server_loads, max_load`,
    testCases: [
      {
        input: 'jobs = list(range(100)), num_servers = 10',
        isHidden: false,
        description: '100 jobs, 10 servers - expected max load ~ 10-15'
      },
      {
        input: 'jobs = list(range(50)), num_servers = 5',
        isHidden: false,
        description: '50 jobs, 5 servers'
      },
      {
        input: 'jobs = list(range(20)), num_servers = 4',
        isHidden: false,
        description: '20 jobs, 4 servers'
      }
    ],
    hints: [
      'Assign each job to a uniformly random server',
      'Expected max load is O(n/m + log m) with high probability',
      'Simple strategy but effective in practice',
      'Can be improved with power-of-two-choices strategy'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex12',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Randomized Hash Table',
    difficulty: 3,
    description: 'Implement a hash table with universal hashing to minimize collisions.',
    starterCode: `import random

class RandomizedHashTable:
    def __init__(self, size):
        """
        Initialize hash table with universal hashing.

        Args:
            size: Size of hash table.
        """
        # Your code here
        pass

    def _hash(self, key):
        """Universal hash function."""
        # Your code here
        pass

    def insert(self, key, value):
        """Insert key-value pair."""
        # Your code here
        pass

    def get(self, key):
        """Get value for key."""
        # Your code here
        pass`,
    solution: `import random

class RandomizedHashTable:
    def __init__(self, size):
        """
        Initialize hash table with universal hashing.

        Args:
            size: Size of hash table.
        """
        self.size = size
        self.table = [[] for _ in range(size)]
        # Random parameters for universal hashing
        self.a = random.randint(1, size - 1)
        self.b = random.randint(0, size - 1)
        self.prime = 1000000007  # Large prime

    def _hash(self, key):
        """Universal hash function: ((a*key + b) mod prime) mod size."""
        return ((self.a * hash(key) + self.b) % self.prime) % self.size

    def insert(self, key, value):
        """Insert key-value pair."""
        index = self._hash(key)
        # Check if key already exists
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        # Add new key-value pair
        self.table[index].append((key, value))

    def get(self, key):
        """Get value for key."""
        index = self._hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        return None`,
    testCases: [
      {
        input: 'ht = RandomizedHashTable(10); ht.insert("a", 1); ht.insert("b", 2); ht.get("a")',
        isHidden: false,
        description: 'Basic insert and get'
      },
      {
        input: 'ht = RandomizedHashTable(5); [ht.insert(i, i*2) for i in range(10)]; ht.get(5)',
        isHidden: false,
        description: 'Multiple insertions with collisions'
      },
      {
        input: 'ht = RandomizedHashTable(10); ht.insert("x", 10); ht.get("y")',
        isHidden: false,
        description: 'Get non-existing key'
      }
    ],
    hints: [
      'Universal hashing: h(k) = ((ak + b) mod p) mod m',
      'Choose random a, b for each hash table instance',
      'Use chaining to handle collisions',
      'Expected chain length is O(1 + α) where α = n/m',
      'Randomization ensures good expected performance'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex13',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Randomized Median of Medians',
    difficulty: 3,
    description: 'Implement a randomized version of the median of medians algorithm for deterministic pivot selection.',
    starterCode: `import random

def randomized_select_good_pivot(arr):
    """
    Select a good pivot using randomized sampling.

    Args:
        arr: List of comparable elements.

    Returns:
        A pivot element that splits the array reasonably.
    """
    # Your code here
    pass`,
    solution: `import random

def randomized_select_good_pivot(arr):
    """
    Select a good pivot using randomized sampling.

    Args:
        arr: List of comparable elements.

    Returns:
        A pivot element that splits the array reasonably.
    """
    if len(arr) <= 5:
        return sorted(arr)[len(arr) // 2]

    # Sample sqrt(n) elements randomly
    sample_size = int(len(arr) ** 0.5)
    sample = random.sample(arr, min(sample_size, len(arr)))

    # Return median of sample
    sample.sort()
    return sample[len(sample) // 2]`,
    testCases: [
      {
        input: 'arr = list(range(100))',
        isHidden: false,
        description: 'Select pivot from sorted array'
      },
      {
        input: 'arr = [random.randint(1, 1000) for _ in range(100)]',
        isHidden: false,
        description: 'Random array of 100 elements'
      },
      {
        input: 'arr = [5, 5, 5, 5, 5]',
        isHidden: false,
        description: 'All elements equal'
      }
    ],
    hints: [
      'Sample sqrt(n) random elements from array',
      'Find median of the sample',
      'This gives a good pivot with high probability',
      'Simpler than deterministic median-of-medians',
      'Expected time is still O(n)'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex14',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Randomized Graph Coloring',
    difficulty: 4,
    description: 'Implement a randomized algorithm for graph coloring that uses O(Δ+1) colors where Δ is max degree.',
    starterCode: `import random

def randomized_graph_coloring(graph):
    """
    Color graph vertices using randomized algorithm.

    Args:
        graph: Dictionary where graph[u] is list of neighbors of u.

    Returns:
        dict: Mapping from vertices to colors (integers).
    """
    # Your code here
    pass`,
    solution: `import random

def randomized_graph_coloring(graph):
    """
    Color graph vertices using randomized algorithm.

    Args:
        graph: Dictionary where graph[u] is list of neighbors of u.

    Returns:
        dict: Mapping from vertices to colors (integers).
    """
    vertices = list(graph.keys())
    # Randomize order of coloring
    random.shuffle(vertices)

    colors = {}
    max_degree = max(len(neighbors) for neighbors in graph.values()) if graph else 0

    for vertex in vertices:
        # Find colors used by neighbors
        neighbor_colors = {colors[neighbor] for neighbor in graph[vertex] if neighbor in colors}

        # Assign first available color
        color = 0
        while color in neighbor_colors:
            color += 1

        colors[vertex] = color

    return colors`,
    testCases: [
      {
        input: 'graph = {0: [1, 2], 1: [0, 2], 2: [0, 1]}',
        isHidden: false,
        description: 'Triangle - needs 3 colors'
      },
      {
        input: 'graph = {0: [1, 3], 1: [0, 2], 2: [1, 3], 3: [0, 2]}',
        isHidden: false,
        description: 'Square - needs 2 colors'
      },
      {
        input: 'graph = {0: [1, 2, 3], 1: [0], 2: [0], 3: [0]}',
        isHidden: false,
        description: 'Star graph - needs 2 colors'
      }
    ],
    hints: [
      'Process vertices in random order',
      'For each vertex, assign smallest color not used by neighbors',
      'Randomization can lead to better coloring in practice',
      'Guaranteed to use at most Δ+1 colors',
      'Can be repeated multiple times to find better coloring'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex15',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Randomized Approximate Median',
    difficulty: 2,
    description: 'Find an approximate median by sampling, returning an element that is close to the true median.',
    starterCode: `import random

def approximate_median(arr, sample_size_factor=0.1):
    """
    Find approximate median using random sampling.

    Args:
        arr: List of comparable elements.
        sample_size_factor: Fraction of array to sample.

    Returns:
        An element that is approximately the median.
    """
    # Your code here
    pass`,
    solution: `import random

def approximate_median(arr, sample_size_factor=0.1):
    """
    Find approximate median using random sampling.

    Args:
        arr: List of comparable elements.
        sample_size_factor: Fraction of array to sample.

    Returns:
        An element that is approximately the median.
    """
    # Sample random elements
    sample_size = max(1, int(len(arr) * sample_size_factor))
    sample = random.sample(arr, sample_size)

    # Return median of sample
    sample.sort()
    return sample[len(sample) // 2]`,
    testCases: [
      {
        input: 'arr = list(range(1000)), sample_size_factor = 0.1',
        isHidden: false,
        description: 'Large sorted array'
      },
      {
        input: 'arr = [random.randint(1, 100) for _ in range(500)], sample_size_factor = 0.2',
        isHidden: false,
        description: 'Random array with larger sample'
      },
      {
        input: 'arr = [5] * 100, sample_size_factor = 0.1',
        isHidden: false,
        description: 'All elements equal'
      }
    ],
    hints: [
      'Sample a small fraction of the array',
      'Sort the sample and return its median',
      'Result is approximately the true median with high probability',
      'Much faster than finding exact median for large arrays',
      'Trade accuracy for speed'
    ],
    language: 'python'
  },
  {
    id: 'cs403-t3-ex16',
    subjectId: 'cs403',
    topicId: 'cs403-topic-3',
    title: 'Randomized Coupon Collector',
    difficulty: 3,
    description: 'Simulate the coupon collector problem: how many random samples needed to collect all n distinct items?',
    starterCode: `import random

def coupon_collector(n, num_simulations=1000):
    """
    Simulate coupon collector problem.

    Args:
        n: Number of distinct coupons.
        num_simulations: Number of times to run simulation.

    Returns:
        float: Average number of samples needed to collect all coupons.
    """
    # Your code here
    pass`,
    solution: `import random

def coupon_collector(n, num_simulations=1000):
    """
    Simulate coupon collector problem.

    Args:
        n: Number of distinct coupons.
        num_simulations: Number of times to run simulation.

    Returns:
        float: Average number of samples needed to collect all coupons.
    """
    total_samples = 0

    for _ in range(num_simulations):
        collected = set()
        samples = 0

        while len(collected) < n:
            # Draw random coupon
            coupon = random.randint(0, n - 1)
            collected.add(coupon)
            samples += 1

        total_samples += samples

    return total_samples / num_simulations`,
    testCases: [
      {
        input: 'n = 10, num_simulations = 1000',
        isHidden: false,
        description: '10 coupons - expected ~29 samples'
      },
      {
        input: 'n = 5, num_simulations = 500',
        isHidden: false,
        description: '5 coupons - expected ~12 samples'
      },
      {
        input: 'n = 20, num_simulations = 1000',
        isHidden: false,
        description: '20 coupons - expected ~72 samples'
      }
    ],
    hints: [
      'Keep drawing random coupons until all n are collected',
      'Track collected coupons using a set',
      'Expected number of draws is n * H(n) where H(n) is harmonic number',
      'H(n) ≈ ln(n) + γ ≈ ln(n) + 0.577',
      'Run multiple simulations and average the results'
    ],
    language: 'python'
  }
];
