import { CodingExercise } from '../../../core/types';

export const cs104Exercises: CodingExercise[] = [
  {
    id: 'cs104-exercise-1',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Reverse a Linked List',
    description: 'Implement a function to reverse a singly linked list in-place. The function should take the head of the list and return the new head after reversal.',
    language: 'python',
    starterCode: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\ndef reverse_linked_list(head):\n    # Your code here\n    pass',
    testCases: [
      {
        input: '1 -> 2 -> 3 -> 4 -> 5',
        expectedOutput: '5 -> 4 -> 3 -> 2 -> 1',
        isHidden: false,
        description: 'Reverse a list with multiple elements'
      },
      {
        input: '1',
        expectedOutput: '1',
        isHidden: false,
        description: 'Single element list'
      },
      {
        input: 'None',
        expectedOutput: 'None',
        isHidden: true,
        description: 'Empty list'
      }
    ],
    hints: [
      'Use three pointers: previous, current, and next',
      'Iterate through the list and reverse the next pointer of each node',
      'Don\'t forget to handle the edge case of an empty list'
    ],
    solution: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\ndef reverse_linked_list(head):\n    prev = None\n    current = head\n    \n    while current:\n        next_node = current.next\n        current.next = prev\n        prev = current\n        current = next_node\n    \n    return prev'
  },
  {
    id: 'cs104-exercise-2',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Implement a Stack using Queues',
    description: 'Implement a stack using only queue operations (enqueue and dequeue). Your stack should support push, pop, and top operations.',
    language: 'python',
    starterCode: 'from collections import deque\n\nclass Stack:\n    def __init__(self):\n        self.queue = deque()\n    \n    def push(self, x):\n        # Your code here\n        pass\n    \n    def pop(self):\n        # Your code here\n        pass\n    \n    def top(self):\n        # Your code here\n        pass',
    testCases: [
      {
        input: 'push(1), push(2), top()',
        expectedOutput: '2',
        isHidden: false,
        description: 'Top returns most recent element'
      },
      {
        input: 'push(1), push(2), pop(), top()',
        expectedOutput: '1',
        isHidden: false,
        description: 'Pop removes top element'
      },
      {
        input: 'push(3), push(5), push(7), pop(), pop(), top()',
        expectedOutput: '3',
        isHidden: true,
        description: 'Multiple operations'
      }
    ],
    hints: [
      'After adding a new element, rotate the queue to make it the front',
      'Use queue size to determine how many rotations are needed',
      'The most recently added element should always be at the front'
    ],
    solution: 'from collections import deque\n\nclass Stack:\n    def __init__(self):\n        self.queue = deque()\n    \n    def push(self, x):\n        self.queue.append(x)\n        for _ in range(len(self.queue) - 1):\n            self.queue.append(self.queue.popleft())\n    \n    def pop(self):\n        return self.queue.popleft()\n    \n    def top(self):\n        return self.queue[0]'
  },
  {
    id: 'cs104-exercise-3',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Binary Search Tree Validation',
    description: 'Write a function to determine if a binary tree is a valid Binary Search Tree. A valid BST has all left descendants less than the node, and all right descendants greater than the node.',
    language: 'python',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef is_valid_bst(root):\n    # Your code here\n    pass',
    testCases: [
      {
        input: 'Tree: 2, 1, 3',
        expectedOutput: 'True',
        isHidden: false,
        description: 'Valid BST'
      },
      {
        input: 'Tree: 5, 1, 4, None, None, 3, 6',
        expectedOutput: 'False',
        isHidden: false,
        description: 'Invalid BST - right subtree has smaller value'
      },
      {
        input: 'Tree: 10, 5, 15, None, None, 6, 20',
        expectedOutput: 'False',
        isHidden: true,
        description: 'Invalid BST - left value in right subtree'
      }
    ],
    hints: [
      'Use a helper function that tracks the valid range for each node',
      'For each node, update the min and max constraints for its children',
      'All nodes in left subtree must be less than current, not just the immediate child'
    ],
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef is_valid_bst(root):\n    def validate(node, min_val, max_val):\n        if not node:\n            return True\n        \n        if node.value <= min_val or node.value >= max_val:\n            return False\n        \n        return (validate(node.left, min_val, node.value) and\n                validate(node.right, node.value, max_val))\n    \n    return validate(root, float(\'-inf\'), float(\'inf\'))'
  },
  {
    id: 'cs104-exercise-4',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'First Unique Character',
    description: 'Given a string, find the first non-repeating character and return its index. If all characters repeat, return -1. Use a hash table for an efficient solution.',
    language: 'python',
    starterCode: 'def first_unique_char(s):\n    # Your code here\n    pass',
    testCases: [
      {
        input: '"leetcode"',
        expectedOutput: '0',
        isHidden: false,
        description: 'First character is unique'
      },
      {
        input: '"loveleetcode"',
        expectedOutput: '2',
        isHidden: false,
        description: 'Third character is first unique'
      },
      {
        input: '"aabb"',
        expectedOutput: '-1',
        isHidden: true,
        description: 'No unique characters'
      }
    ],
    hints: [
      'First pass: count the frequency of each character using a hash map',
      'Second pass: find the first character with frequency 1',
      'Python dictionaries maintain insertion order (Python 3.7+)'
    ],
    solution: 'def first_unique_char(s):\n    char_count = {}\n    \n    # Count frequency of each character\n    for char in s:\n        char_count[char] = char_count.get(char, 0) + 1\n    \n    # Find first character with count 1\n    for i, char in enumerate(s):\n        if char_count[char] == 1:\n            return i\n    \n    return -1'
  },
  {
    id: 'cs104-exercise-5',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'Course Schedule (Graph Cycle Detection)',
    description: 'Given a number of courses and their prerequisites, determine if it\'s possible to complete all courses. This is a cycle detection problem in a directed graph.',
    language: 'python',
    starterCode: 'def can_finish(num_courses, prerequisites):\n    # prerequisites is a list of [course, prerequisite] pairs\n    # Your code here\n    pass',
    testCases: [
      {
        input: 'num_courses=2, prerequisites=[[1,0]]',
        expectedOutput: 'True',
        isHidden: false,
        description: 'Can take course 0 then course 1'
      },
      {
        input: 'num_courses=2, prerequisites=[[1,0],[0,1]]',
        expectedOutput: 'False',
        isHidden: false,
        description: 'Circular dependency'
      },
      {
        input: 'num_courses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]',
        expectedOutput: 'True',
        isHidden: true,
        description: 'Multiple valid orderings exist'
      }
    ],
    hints: [
      'Build an adjacency list to represent the graph',
      'Use DFS with a visited state tracking: unvisited, visiting, visited',
      'If you encounter a node in "visiting" state, a cycle exists'
    ],
    solution: 'def can_finish(num_courses, prerequisites):\n    # Build adjacency list\n    graph = {i: [] for i in range(num_courses)}\n    for course, prereq in prerequisites:\n        graph[course].append(prereq)\n    \n    # 0 = unvisited, 1 = visiting, 2 = visited\n    state = [0] * num_courses\n    \n    def has_cycle(course):\n        if state[course] == 1:  # Currently visiting - cycle detected\n            return True\n        if state[course] == 2:  # Already visited\n            return False\n        \n        state[course] = 1  # Mark as visiting\n        for prereq in graph[course]:\n            if has_cycle(prereq):\n                return True\n        state[course] = 2  # Mark as visited\n        return False\n    \n    for course in range(num_courses):\n        if has_cycle(course):\n            return False\n    \n    return True'
  }
];
