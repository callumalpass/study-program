import { Quiz } from '../../../core/types';

export const cs104Quizzes: Quiz[] = [
  // ==================== TOPIC 1: Arrays and Linked Lists ====================
  {
    id: 'cs104-quiz-1a',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Arrays and Linked Lists - Fundamentals',
    questions: [
      {
        id: 'cs104-q1a-1',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of accessing an element by index in an array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Arrays provide constant-time O(1) access because elements are stored in contiguous memory, allowing direct address calculation.'
      },
      {
        id: 'cs104-q1a-2',
        type: 'multiple_choice',
        prompt: 'Which operation is MORE efficient in a linked list compared to an array?',
        options: ['Random access by index', 'Insertion at the beginning', 'Binary search', 'Cache locality'],
        correctAnswer: 1,
        explanation: 'Inserting at the beginning of a linked list is O(1) since it only requires updating the head pointer, while arrays require shifting all elements O(n).'
      },
      {
        id: 'cs104-q1a-3',
        type: 'true_false',
        prompt: 'A doubly linked list uses more memory per node than a singly linked list.',
        correctAnswer: true,
        explanation: 'Doubly linked lists store two pointers (next and prev) per node, while singly linked lists only store one (next).'
      },
      {
        id: 'cs104-q1a-4',
        type: 'fill_blank',
        prompt: 'In a singly linked list, each node contains data and a reference to the ____ node.',
        correctAnswer: 'next',
        explanation: 'Singly linked list nodes contain a "next" pointer pointing to the following node in the list.'
      },
      {
        id: 'cs104-q1a-5',
        type: 'multiple_choice',
        prompt: 'What is the space complexity of storing n elements in an array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'An array requires O(n) space to store n elements, with each element occupying a fixed amount of memory.'
      }
    ]
  },
  {
    id: 'cs104-quiz-1b',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Arrays and Linked Lists - Application',
    questions: [
      {
        id: 'cs104-q1b-1',
        type: 'code_output',
        prompt: 'What is the output of this linked list traversal?',
        codeSnippet: `head = Node(1)
head.next = Node(2)
head.next.next = Node(3)
current = head
while current:
    print(current.value, end=" ")
    current = current.next`,
        correctAnswer: '1 2 3 ',
        explanation: 'The traversal starts at head (1), follows next pointers through 2 and 3, printing each value.'
      },
      {
        id: 'cs104-q1b-2',
        type: 'multiple_choice',
        prompt: 'Which technique is commonly used to find the middle element of a linked list efficiently?',
        options: ['Binary search', 'Two pointers (slow and fast)', 'Recursion', 'Hash table'],
        correctAnswer: 1,
        explanation: 'The slow/fast pointer technique uses two pointers where fast moves twice as fast. When fast reaches the end, slow is at the middle.'
      },
      {
        id: 'cs104-q1b-3',
        type: 'code_output',
        prompt: 'After this code runs, what does arr contain?',
        codeSnippet: `arr = [1, 2, 3, 4, 5]
arr.insert(0, 0)
arr.pop()`,
        correctAnswer: '[0, 1, 2, 3, 4]',
        explanation: 'insert(0, 0) adds 0 at index 0: [0,1,2,3,4,5]. Then pop() removes the last element: [0,1,2,3,4].'
      },
      {
        id: 'cs104-q1b-4',
        type: 'true_false',
        prompt: 'To reverse a linked list in-place, you need O(n) extra space.',
        correctAnswer: false,
        explanation: 'Reversing a linked list in-place only requires O(1) extra space (a few pointers), not O(n). You iterate through and reverse each next pointer.'
      },
      {
        id: 'cs104-q1b-5',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of deleting the last element from a singly linked list without a tail pointer?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Without a tail pointer, you must traverse the entire list to find the second-to-last node, making it O(n).'
      }
    ]
  },
  {
    id: 'cs104-quiz-1c',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Arrays and Linked Lists - Advanced',
    questions: [
      {
        id: 'cs104-q1c-1',
        type: 'multiple_choice',
        prompt: 'Floyd\'s cycle detection algorithm (tortoise and hare) can detect cycles using:',
        options: ['O(n) time and O(n) space', 'O(n) time and O(1) space', 'O(n²) time and O(1) space', 'O(log n) time and O(1) space'],
        correctAnswer: 1,
        explanation: 'Floyd\'s algorithm uses two pointers moving at different speeds, requiring O(n) time to detect a cycle and only O(1) space.'
      },
      {
        id: 'cs104-q1c-2',
        type: 'true_false',
        prompt: 'A circular linked list has a node whose next pointer is NULL.',
        correctAnswer: false,
        explanation: 'In a circular linked list, the last node points back to the first node, so no node has a NULL next pointer.'
      },
      {
        id: 'cs104-q1c-3',
        type: 'multiple_choice',
        prompt: 'What data structures are typically combined to implement an LRU Cache with O(1) operations?',
        options: ['Two arrays', 'Array and stack', 'Doubly linked list and hash map', 'Queue and heap'],
        correctAnswer: 2,
        explanation: 'LRU Cache uses a doubly linked list (for O(1) removal/insertion) and a hash map (for O(1) lookup).'
      },
      {
        id: 'cs104-q1c-4',
        type: 'code_output',
        prompt: 'What does this array rotation output?',
        codeSnippet: `arr = [1, 2, 3, 4, 5]
k = 2
arr = arr[-k:] + arr[:-k]
print(arr)`,
        correctAnswer: '[4, 5, 1, 2, 3]',
        explanation: 'arr[-2:] is [4, 5] and arr[:-2] is [1, 2, 3]. Concatenating gives [4, 5, 1, 2, 3]—a right rotation by 2.'
      },
      {
        id: 'cs104-q1c-5',
        type: 'multiple_choice',
        prompt: 'Why do arrays generally have better cache performance than linked lists?',
        options: ['Arrays use less memory', 'Array elements are stored contiguously', 'Arrays have faster pointers', 'Linked lists cannot be cached'],
        correctAnswer: 1,
        explanation: 'Arrays store elements contiguously in memory, so accessing one element likely brings neighboring elements into CPU cache. Linked list nodes can be scattered in memory.'
      }
    ]
  },

  // ==================== TOPIC 2: Stacks and Queues ====================
  {
    id: 'cs104-quiz-2a',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Stacks and Queues - Fundamentals',
    questions: [
      {
        id: 'cs104-q2a-1',
        type: 'multiple_choice',
        prompt: 'Which ordering principle does a stack follow?',
        options: ['FIFO (First-In-First-Out)', 'LIFO (Last-In-First-Out)', 'Priority-based', 'Random'],
        correctAnswer: 1,
        explanation: 'Stacks follow LIFO: the most recently added element is the first to be removed.'
      },
      {
        id: 'cs104-q2a-2',
        type: 'multiple_choice',
        prompt: 'What are the two primary operations of a queue?',
        options: ['push and pop', 'enqueue and dequeue', 'insert and delete', 'add and remove'],
        correctAnswer: 1,
        explanation: 'Queues use enqueue (add to rear) and dequeue (remove from front).'
      },
      {
        id: 'cs104-q2a-3',
        type: 'true_false',
        prompt: 'The peek operation modifies the stack by removing the top element.',
        correctAnswer: false,
        explanation: 'Peek only views the top element without removing it. Pop removes and returns the top element.'
      },
      {
        id: 'cs104-q2a-4',
        type: 'fill_blank',
        prompt: 'A queue follows the ____ principle where the first element added is the first removed.',
        correctAnswer: 'FIFO',
        explanation: 'FIFO stands for First-In-First-Out, the fundamental principle of queues.'
      },
      {
        id: 'cs104-q2a-5',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of push and pop operations on a stack?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'Depends on implementation'],
        correctAnswer: 0,
        explanation: 'Both push and pop are O(1) operations as they only affect the top of the stack.'
      }
    ]
  },
  {
    id: 'cs104-quiz-2b',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Stacks and Queues - Application',
    questions: [
      {
        id: 'cs104-q2b-1',
        type: 'code_output',
        prompt: 'What is printed after these stack operations?',
        codeSnippet: `stack = []
stack.append(1)
stack.append(2)
stack.append(3)
stack.pop()
stack.append(4)
print(stack.pop())`,
        correctAnswer: '4',
        explanation: 'After push 1,2,3 and pop (removes 3), stack is [1,2]. Push 4 makes [1,2,4]. Pop returns 4.'
      },
      {
        id: 'cs104-q2b-2',
        type: 'multiple_choice',
        prompt: 'Which application commonly uses a stack?',
        options: ['Print job scheduling', 'Function call management', 'BFS traversal', 'Task scheduling by priority'],
        correctAnswer: 1,
        explanation: 'The call stack manages function calls, pushing frames on call and popping on return.'
      },
      {
        id: 'cs104-q2b-3',
        type: 'true_false',
        prompt: 'Using a Python list\'s pop(0) for queue dequeue is efficient (O(1)).',
        correctAnswer: false,
        explanation: 'list.pop(0) is O(n) because all elements must shift. Use collections.deque for O(1) popleft().'
      },
      {
        id: 'cs104-q2b-4',
        type: 'code_output',
        prompt: 'What is printed?',
        codeSnippet: `from collections import deque
q = deque()
q.append('A')
q.append('B')
q.append('C')
print(q.popleft())`,
        correctAnswer: 'A',
        explanation: 'Queue is FIFO. A was added first, so popleft() returns A.'
      },
      {
        id: 'cs104-q2b-5',
        type: 'multiple_choice',
        prompt: 'For checking balanced parentheses, which data structure is most appropriate?',
        options: ['Queue', 'Stack', 'Array', 'Linked List'],
        correctAnswer: 1,
        explanation: 'Stack is ideal for matching brackets: push opening brackets, pop when closing brackets match.'
      }
    ]
  },
  {
    id: 'cs104-quiz-2c',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Stacks and Queues - Advanced',
    questions: [
      {
        id: 'cs104-q2c-1',
        type: 'multiple_choice',
        prompt: 'A deque (double-ended queue) allows:',
        options: ['Operations only at front', 'Operations only at back', 'Operations at both front and back', 'Random access by index'],
        correctAnswer: 2,
        explanation: 'Deque supports efficient insertion and deletion at both ends.'
      },
      {
        id: 'cs104-q2c-2',
        type: 'true_false',
        prompt: 'A stack can be implemented using two queues.',
        correctAnswer: true,
        explanation: 'Yes, you can simulate LIFO with two FIFO queues by rotating elements.'
      },
      {
        id: 'cs104-q2c-3',
        type: 'multiple_choice',
        prompt: 'A monotonic stack is useful for finding:',
        options: ['Maximum element in array', 'Next greater element for each element', 'Median element', 'Duplicate elements'],
        correctAnswer: 1,
        explanation: 'Monotonic stacks efficiently solve "next greater/smaller element" problems in O(n) time.'
      },
      {
        id: 'cs104-q2c-4',
        type: 'code_output',
        prompt: 'What is the result after evaluating this postfix expression using a stack?',
        codeSnippet: `# Postfix: 2 3 + 4 *
# Trace: push 2, push 3, pop 3 and 2 -> push 5,
#        push 4, pop 4 and 5 -> push 20`,
        correctAnswer: '20',
        explanation: '2+3=5, then 5*4=20. Postfix evaluation uses a stack to hold operands.'
      },
      {
        id: 'cs104-q2c-5',
        type: 'multiple_choice',
        prompt: 'Which traversal algorithm uses a queue?',
        options: ['Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Preorder traversal', 'Postorder traversal'],
        correctAnswer: 1,
        explanation: 'BFS uses a queue to explore nodes level by level, while DFS uses a stack (or recursion).'
      }
    ]
  },

  // ==================== TOPIC 3: Trees ====================
  {
    id: 'cs104-quiz-3a',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Trees - Fundamentals',
    questions: [
      {
        id: 'cs104-q3a-1',
        type: 'multiple_choice',
        prompt: 'In a Binary Search Tree, where are values smaller than the root stored?',
        options: ['Right subtree', 'Left subtree', 'Parent node', 'Randomly distributed'],
        correctAnswer: 1,
        explanation: 'BST property: all values in the left subtree are smaller than the node, and all values in the right subtree are larger.'
      },
      {
        id: 'cs104-q3a-2',
        type: 'fill_blank',
        prompt: 'A node with no children in a tree is called a ____ node.',
        correctAnswer: 'leaf',
        explanation: 'Leaf nodes are the terminal nodes of a tree with no children.'
      },
      {
        id: 'cs104-q3a-3',
        type: 'true_false',
        prompt: 'A binary tree can have at most two children per node.',
        correctAnswer: true,
        explanation: 'By definition, a binary tree has at most two children (left and right) per node.'
      },
      {
        id: 'cs104-q3a-4',
        type: 'multiple_choice',
        prompt: 'What is the average-case time complexity for searching in a balanced BST?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'In a balanced BST, each comparison eliminates half the remaining nodes, giving O(log n) search time.'
      },
      {
        id: 'cs104-q3a-5',
        type: 'multiple_choice',
        prompt: 'The height of a tree is:',
        options: ['Number of nodes', 'Number of edges on the longest path from root to leaf', 'Number of leaves', 'Depth of the root'],
        correctAnswer: 1,
        explanation: 'Height is the number of edges on the longest path from root to any leaf node.'
      }
    ]
  },
  {
    id: 'cs104-quiz-3b',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Trees - Application',
    questions: [
      {
        id: 'cs104-q3b-1',
        type: 'multiple_choice',
        prompt: 'Which traversal visits nodes in sorted order for a BST?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
        correctAnswer: 1,
        explanation: 'Inorder traversal (left-root-right) of a BST visits nodes in ascending sorted order.'
      },
      {
        id: 'cs104-q3b-2',
        type: 'code_output',
        prompt: 'What is the preorder traversal of this tree?\n        1\n       / \\\n      2   3\n     / \\\n    4   5',
        codeSnippet: '# Preorder: root, left, right',
        correctAnswer: '1 2 4 5 3',
        explanation: 'Preorder visits root first, then recursively left subtree, then right: 1 -> 2 -> 4 -> 5 -> 3.'
      },
      {
        id: 'cs104-q3b-3',
        type: 'true_false',
        prompt: 'Level-order traversal uses a queue.',
        correctAnswer: true,
        explanation: 'Level-order (BFS) traversal processes nodes level by level using a queue.'
      },
      {
        id: 'cs104-q3b-4',
        type: 'multiple_choice',
        prompt: 'What is the worst-case time complexity for BST operations when the tree is skewed (unbalanced)?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 2,
        explanation: 'A skewed BST degenerates into a linked list, making operations O(n) in the worst case.'
      },
      {
        id: 'cs104-q3b-5',
        type: 'code_output',
        prompt: 'What is the inorder traversal of this BST?\n        5\n       / \\\n      3   7\n     / \\\n    2   4',
        codeSnippet: '# Inorder: left, root, right',
        correctAnswer: '2 3 4 5 7',
        explanation: 'Inorder of BST gives sorted order: 2 -> 3 -> 4 -> 5 -> 7.'
      }
    ]
  },
  {
    id: 'cs104-quiz-3c',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Trees - Advanced',
    questions: [
      {
        id: 'cs104-q3c-1',
        type: 'multiple_choice',
        prompt: 'Which tree type automatically maintains balance through rotations?',
        options: ['Binary Search Tree', 'Binary Tree', 'AVL Tree', 'Skewed Tree'],
        correctAnswer: 2,
        explanation: 'AVL trees (and Red-Black trees) are self-balancing BSTs that perform rotations to maintain balance.'
      },
      {
        id: 'cs104-q3c-2',
        type: 'true_false',
        prompt: 'The Lowest Common Ancestor (LCA) of two nodes is the deepest node that has both as descendants.',
        correctAnswer: true,
        explanation: 'LCA is the deepest (lowest) node in the tree that has both target nodes in its subtrees.'
      },
      {
        id: 'cs104-q3c-3',
        type: 'multiple_choice',
        prompt: 'To validate a BST, you should check:',
        options: ['Only immediate children', 'The entire subtree constraints', 'Node values are unique', 'Tree height is balanced'],
        correctAnswer: 1,
        explanation: 'BST validation requires checking that ALL left subtree values are less than the node and ALL right subtree values are greater.'
      },
      {
        id: 'cs104-q3c-4',
        type: 'fill_blank',
        prompt: 'A complete binary tree can be efficiently stored in an ____ using index formulas for parent/child.',
        correctAnswer: 'array',
        explanation: 'Complete binary trees map naturally to arrays: for node at index i, left child is 2i+1, right is 2i+2.'
      },
      {
        id: 'cs104-q3c-5',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of finding the diameter (longest path) of a binary tree?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Finding diameter requires visiting each node once to calculate heights, giving O(n) time.'
      }
    ]
  },

  // ==================== TOPIC 4: Hash Tables ====================
  {
    id: 'cs104-quiz-4a',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'Hash Tables - Fundamentals',
    questions: [
      {
        id: 'cs104-q4a-1',
        type: 'multiple_choice',
        prompt: 'What is the average-case time complexity for hash table lookups?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Hash tables provide O(1) average-case lookup using hash functions to compute indices directly.'
      },
      {
        id: 'cs104-q4a-2',
        type: 'fill_blank',
        prompt: 'When two different keys hash to the same index, this is called a ____.',
        correctAnswer: 'collision',
        explanation: 'A collision occurs when different keys produce the same hash value/index.'
      },
      {
        id: 'cs104-q4a-3',
        type: 'true_false',
        prompt: 'Chaining resolves collisions by storing multiple elements at the same index using a linked list.',
        correctAnswer: true,
        explanation: 'Chaining maintains a linked list (or other structure) at each bucket to handle multiple key-value pairs.'
      },
      {
        id: 'cs104-q4a-4',
        type: 'multiple_choice',
        prompt: 'What is the load factor of a hash table?',
        options: ['Number of buckets / Number of elements', 'Number of elements / Number of buckets', 'Number of collisions / Total operations', 'Hash value / Table size'],
        correctAnswer: 1,
        explanation: 'Load factor = n/capacity (number of elements divided by number of buckets).'
      },
      {
        id: 'cs104-q4a-5',
        type: 'multiple_choice',
        prompt: 'A good hash function should:',
        options: ['Always return the same value', 'Distribute keys uniformly', 'Return sequential values', 'Maximize collisions'],
        correctAnswer: 1,
        explanation: 'A good hash function distributes keys uniformly across buckets to minimize collisions.'
      }
    ]
  },
  {
    id: 'cs104-quiz-4b',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'Hash Tables - Application',
    questions: [
      {
        id: 'cs104-q4b-1',
        type: 'code_output',
        prompt: 'What is printed?',
        codeSnippet: `d = {}
d['a'] = 1
d['b'] = 2
d['a'] = 3
print(d['a'])`,
        correctAnswer: '3',
        explanation: 'The second assignment d["a"] = 3 overwrites the previous value. Final value for key "a" is 3.'
      },
      {
        id: 'cs104-q4b-2',
        type: 'multiple_choice',
        prompt: 'Which problem is efficiently solved using a hash table?',
        options: ['Finding minimum element', 'Checking for duplicates', 'Sorting elements', 'Finding median'],
        correctAnswer: 1,
        explanation: 'Hash tables enable O(1) lookup, making duplicate detection O(n) overall instead of O(n²).'
      },
      {
        id: 'cs104-q4b-3',
        type: 'true_false',
        prompt: 'Python dictionaries maintain insertion order as of Python 3.7+.',
        correctAnswer: true,
        explanation: 'Since Python 3.7, dictionaries preserve insertion order as a language feature.'
      },
      {
        id: 'cs104-q4b-4',
        type: 'code_output',
        prompt: 'What does this "two sum" approach return?',
        codeSnippet: `def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return [seen[target-n], i]
        seen[n] = i
    return []
print(two_sum([2, 7, 11, 15], 9))`,
        correctAnswer: '[0, 1]',
        explanation: 'Target is 9. When we see 7 (index 1), we check for 9-7=2, which is at index 0. Return [0, 1].'
      },
      {
        id: 'cs104-q4b-5',
        type: 'multiple_choice',
        prompt: 'To group anagrams, you can use as hash key:',
        options: ['The original string', 'The sorted string', 'The string length', 'The first character'],
        correctAnswer: 1,
        explanation: 'Anagrams have the same sorted character sequence, making it a perfect hash key for grouping.'
      }
    ]
  },
  {
    id: 'cs104-quiz-4c',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'Hash Tables - Advanced',
    questions: [
      {
        id: 'cs104-q4c-1',
        type: 'multiple_choice',
        prompt: 'Linear probing is a technique for:',
        options: ['Hash function design', 'Collision resolution in open addressing', 'Dynamic resizing', 'Key generation'],
        correctAnswer: 1,
        explanation: 'Linear probing resolves collisions by checking the next available slot linearly.'
      },
      {
        id: 'cs104-q4c-2',
        type: 'true_false',
        prompt: 'Mutable objects like lists can be used as dictionary keys in Python.',
        correctAnswer: false,
        explanation: 'Dictionary keys must be hashable. Mutable objects like lists cannot be hashed.'
      },
      {
        id: 'cs104-q4c-3',
        type: 'multiple_choice',
        prompt: 'What happens when the load factor exceeds a threshold (e.g., 0.75)?',
        options: ['Collisions stop', 'The table is resized', 'Operations become O(n²)', 'Keys are deleted'],
        correctAnswer: 1,
        explanation: 'High load factor triggers resizing (usually doubling) and rehashing all elements to maintain performance.'
      },
      {
        id: 'cs104-q4c-4',
        type: 'multiple_choice',
        prompt: 'The worst-case time complexity for hash table operations occurs when:',
        options: ['The table is empty', 'All keys hash to the same index', 'The load factor is low', 'Keys are unique'],
        correctAnswer: 1,
        explanation: 'When all keys collide to the same bucket, operations degrade to O(n) (searching through a long chain).'
      },
      {
        id: 'cs104-q4c-5',
        type: 'fill_blank',
        prompt: 'Python\'s built-in hash table implementations are called dict and ____.',
        correctAnswer: 'set',
        explanation: 'Both dict (key-value) and set (keys only) use hash tables internally.'
      }
    ]
  },

  // ==================== TOPIC 5: Graphs ====================
  {
    id: 'cs104-quiz-5a',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'Graphs - Fundamentals',
    questions: [
      {
        id: 'cs104-q5a-1',
        type: 'multiple_choice',
        prompt: 'What is the space complexity of an adjacency matrix for a graph with V vertices?',
        options: ['O(V)', 'O(E)', 'O(V²)', 'O(V + E)'],
        correctAnswer: 2,
        explanation: 'An adjacency matrix is a V×V 2D array, requiring O(V²) space regardless of edge count.'
      },
      {
        id: 'cs104-q5a-2',
        type: 'true_false',
        prompt: 'In a directed graph, edges have a specific direction from one vertex to another.',
        correctAnswer: true,
        explanation: 'Directed graph edges go from u to v, not necessarily from v to u.'
      },
      {
        id: 'cs104-q5a-3',
        type: 'fill_blank',
        prompt: 'A graph with no cycles is called an ____ graph.',
        correctAnswer: 'acyclic',
        explanation: 'An acyclic graph contains no cycles. A directed acyclic graph is called a DAG.'
      },
      {
        id: 'cs104-q5a-4',
        type: 'multiple_choice',
        prompt: 'An adjacency list is more space-efficient than an adjacency matrix for:',
        options: ['Dense graphs', 'Sparse graphs', 'Complete graphs', 'All graphs'],
        correctAnswer: 1,
        explanation: 'Adjacency lists use O(V+E) space, better than O(V²) for sparse graphs where E << V².'
      },
      {
        id: 'cs104-q5a-5',
        type: 'multiple_choice',
        prompt: 'Which graph traversal uses a queue?',
        options: ['Depth-First Search', 'Breadth-First Search', 'Both', 'Neither'],
        correctAnswer: 1,
        explanation: 'BFS uses a queue to explore level by level. DFS uses a stack (or recursion).'
      }
    ]
  },
  {
    id: 'cs104-quiz-5b',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'Graphs - Application',
    questions: [
      {
        id: 'cs104-q5b-1',
        type: 'multiple_choice',
        prompt: 'To find the shortest path in an unweighted graph, use:',
        options: ['DFS', 'BFS', 'Dijkstra\'s', 'Floyd-Warshall'],
        correctAnswer: 1,
        explanation: 'BFS finds shortest paths in unweighted graphs because it explores nodes level by level.'
      },
      {
        id: 'cs104-q5b-2',
        type: 'true_false',
        prompt: 'DFS can be used to detect cycles in a directed graph.',
        correctAnswer: true,
        explanation: 'DFS with state tracking (unvisited, visiting, visited) can detect back edges indicating cycles.'
      },
      {
        id: 'cs104-q5b-3',
        type: 'multiple_choice',
        prompt: 'Topological sort is possible only for:',
        options: ['Undirected graphs', 'Cyclic graphs', 'Directed acyclic graphs (DAGs)', 'Weighted graphs'],
        correctAnswer: 2,
        explanation: 'Topological ordering requires a DAG; cycles make it impossible to order dependencies.'
      },
      {
        id: 'cs104-q5b-4',
        type: 'code_output',
        prompt: 'How many connected components are in this graph?\nVertices: 0, 1, 2, 3, 4\nEdges: (0,1), (1,2), (3,4)',
        codeSnippet: '# Two groups: {0,1,2} and {3,4}',
        correctAnswer: '2',
        explanation: 'Vertices 0,1,2 are connected. Vertices 3,4 are connected. Two separate components.'
      },
      {
        id: 'cs104-q5b-5',
        type: 'multiple_choice',
        prompt: 'The "Number of Islands" problem treats the grid as a graph where:',
        options: ['Each cell is a vertex', 'Only land cells are vertices', 'Rows are vertices', 'Columns are edges'],
        correctAnswer: 0,
        explanation: 'Each cell is a vertex with edges to adjacent cells. Islands are connected components of land.'
      }
    ]
  },
  {
    id: 'cs104-quiz-5c',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'Graphs - Advanced',
    questions: [
      {
        id: 'cs104-q5c-1',
        type: 'multiple_choice',
        prompt: 'Dijkstra\'s algorithm finds shortest paths in graphs with:',
        options: ['Negative edge weights', 'Non-negative edge weights', 'Only unweighted edges', 'Cycles only'],
        correctAnswer: 1,
        explanation: 'Dijkstra\'s requires non-negative weights. Use Bellman-Ford for negative weights.'
      },
      {
        id: 'cs104-q5c-2',
        type: 'true_false',
        prompt: 'Prim\'s and Kruskal\'s algorithms both find minimum spanning trees.',
        correctAnswer: true,
        explanation: 'Both find MST but use different approaches: Prim\'s grows from a vertex; Kruskal\'s sorts edges globally.'
      },
      {
        id: 'cs104-q5c-3',
        type: 'multiple_choice',
        prompt: 'The time complexity of BFS with adjacency list representation is:',
        options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V × E)'],
        correctAnswer: 2,
        explanation: 'BFS visits each vertex and edge once, giving O(V + E) time complexity.'
      },
      {
        id: 'cs104-q5c-4',
        type: 'fill_blank',
        prompt: 'In topological sort using Kahn\'s algorithm, we start with nodes having ____-degree of 0.',
        correctAnswer: 'in',
        explanation: 'Kahn\'s algorithm processes nodes with in-degree 0 first (no dependencies).'
      },
      {
        id: 'cs104-q5c-5',
        type: 'multiple_choice',
        prompt: 'To detect if an undirected graph is bipartite, you can use:',
        options: ['DFS only', 'BFS only', 'Either DFS or BFS with 2-coloring', 'Neither'],
        correctAnswer: 2,
        explanation: 'Both DFS and BFS can detect bipartiteness by attempting to 2-color the graph.'
      }
    ]
  },

  // ==================== TOPIC 6: Sorting Algorithms ====================
  {
    id: 'cs104-quiz-6a',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Sorting Algorithms - Fundamentals',
    questions: [
      {
        id: 'cs104-q6a-1',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of bubble sort in the worst case?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctAnswer: 2,
        explanation: 'Bubble sort compares all pairs, requiring O(n²) comparisons in the worst case.'
      },
      {
        id: 'cs104-q6a-2',
        type: 'true_false',
        prompt: 'Insertion sort is efficient for nearly sorted arrays.',
        correctAnswer: true,
        explanation: 'Insertion sort is O(n) for nearly sorted data because few elements need to be moved.'
      },
      {
        id: 'cs104-q6a-3',
        type: 'fill_blank',
        prompt: 'A sorting algorithm is ____ if equal elements maintain their relative order after sorting.',
        correctAnswer: 'stable',
        explanation: 'Stable sorts preserve the original order of equal elements.'
      },
      {
        id: 'cs104-q6a-4',
        type: 'multiple_choice',
        prompt: 'Which sorting algorithm has the same time complexity in best, average, and worst cases?',
        options: ['Quick sort', 'Bubble sort', 'Merge sort', 'Insertion sort'],
        correctAnswer: 2,
        explanation: 'Merge sort is always O(n log n) regardless of input distribution.'
      },
      {
        id: 'cs104-q6a-5',
        type: 'multiple_choice',
        prompt: 'Selection sort works by:',
        options: ['Swapping adjacent elements', 'Finding minimum and placing at front', 'Dividing and conquering', 'Using a heap'],
        correctAnswer: 1,
        explanation: 'Selection sort repeatedly finds the minimum from unsorted portion and places it in sorted position.'
      }
    ]
  },
  {
    id: 'cs104-quiz-6b',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Sorting Algorithms - Application',
    questions: [
      {
        id: 'cs104-q6b-1',
        type: 'code_output',
        prompt: 'After one pass of bubble sort on [5, 3, 8, 4, 2], what is the array state?',
        codeSnippet: '# Bubble sort: compare and swap adjacent elements',
        correctAnswer: '[3, 5, 4, 2, 8]',
        explanation: 'After one pass: 5>3 swap -> 3,5,8,4,2 -> 5<8 no swap -> 8>4 swap -> 3,5,4,8,2 -> 8>2 swap -> [3,5,4,2,8]'
      },
      {
        id: 'cs104-q6b-2',
        type: 'multiple_choice',
        prompt: 'Quick sort\'s worst-case O(n²) occurs when:',
        options: ['Array is random', 'Pivot is always median', 'Pivot is always minimum or maximum', 'Array has duplicates'],
        correctAnswer: 2,
        explanation: 'Poor pivot selection (always min/max) creates unbalanced partitions, degrading to O(n²).'
      },
      {
        id: 'cs104-q6b-3',
        type: 'true_false',
        prompt: 'Merge sort requires O(n) additional space.',
        correctAnswer: true,
        explanation: 'Standard merge sort needs O(n) auxiliary space for merging sorted halves.'
      },
      {
        id: 'cs104-q6b-4',
        type: 'code_output',
        prompt: 'What is the result of merging [1, 3, 5] and [2, 4, 6]?',
        codeSnippet: '# Merge two sorted arrays',
        correctAnswer: '[1, 2, 3, 4, 5, 6]',
        explanation: 'Merging compares front elements: 1<2→1, 2<3→2, 3<4→3, 4<5→4, 5<6→5, 6'
      },
      {
        id: 'cs104-q6b-5',
        type: 'multiple_choice',
        prompt: 'Python\'s built-in sort uses:',
        options: ['Quick sort', 'Merge sort', 'Timsort', 'Heap sort'],
        correctAnswer: 2,
        explanation: 'Python uses Timsort, a hybrid of merge sort and insertion sort optimized for real-world data.'
      }
    ]
  },
  {
    id: 'cs104-quiz-6c',
    subjectId: 'cs104',
    topicId: 'cs104-topic-6',
    title: 'Sorting Algorithms - Advanced',
    questions: [
      {
        id: 'cs104-q6c-1',
        type: 'multiple_choice',
        prompt: 'Which algorithm can find the kth largest element in O(n) average time?',
        options: ['Merge sort', 'Quick select', 'Heap sort', 'Bubble sort'],
        correctAnswer: 1,
        explanation: 'Quick select partitions like quick sort but only recurses into one partition, achieving O(n) average.'
      },
      {
        id: 'cs104-q6c-2',
        type: 'true_false',
        prompt: 'Quick sort is a stable sorting algorithm.',
        correctAnswer: false,
        explanation: 'Standard quick sort is unstable because partitioning can change the relative order of equal elements.'
      },
      {
        id: 'cs104-q6c-3',
        type: 'multiple_choice',
        prompt: 'The Dutch National Flag problem (3-way partitioning) sorts an array with:',
        options: ['n distinct elements', 'Only 3 distinct values', 'Negative numbers', 'Floating point numbers'],
        correctAnswer: 1,
        explanation: 'Dutch National Flag sorts arrays with 3 distinct values (like 0,1,2) in one pass.'
      },
      {
        id: 'cs104-q6c-4',
        type: 'fill_blank',
        prompt: 'Counting inversions in an array can be done in O(n log n) using modified ____ sort.',
        correctAnswer: 'merge',
        explanation: 'Modified merge sort counts inversions during the merge step efficiently.'
      },
      {
        id: 'cs104-q6c-5',
        type: 'multiple_choice',
        prompt: 'For sorting a linked list, which algorithm is preferred?',
        options: ['Quick sort', 'Merge sort', 'Heap sort', 'Insertion sort'],
        correctAnswer: 1,
        explanation: 'Merge sort works well on linked lists: O(1) space for splitting, no random access needed.'
      }
    ]
  },

  // ==================== TOPIC 7: Heaps and Priority Queues ====================
  {
    id: 'cs104-quiz-7a',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Heaps and Priority Queues - Fundamentals',
    questions: [
      {
        id: 'cs104-q7a-1',
        type: 'multiple_choice',
        prompt: 'In a min-heap, the smallest element is at:',
        options: ['A leaf node', 'The root', 'The last position', 'A random position'],
        correctAnswer: 1,
        explanation: 'Min-heap property ensures every parent is smaller than its children, so root is minimum.'
      },
      {
        id: 'cs104-q7a-2',
        type: 'fill_blank',
        prompt: 'For a node at index i in a heap array, its left child is at index ____.',
        correctAnswer: '2i+1',
        explanation: 'In 0-indexed heap array: left child = 2i+1, right child = 2i+2, parent = (i-1)//2.'
      },
      {
        id: 'cs104-q7a-3',
        type: 'true_false',
        prompt: 'Python\'s heapq module implements a max-heap.',
        correctAnswer: false,
        explanation: 'Python heapq is a min-heap. For max-heap behavior, negate values.'
      },
      {
        id: 'cs104-q7a-4',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of extracting the minimum from a min-heap?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Extract-min removes root, replaces with last element, then heapifies down in O(log n).'
      },
      {
        id: 'cs104-q7a-5',
        type: 'multiple_choice',
        prompt: 'A binary heap is a:',
        options: ['Binary search tree', 'Complete binary tree', 'Balanced binary tree', 'Full binary tree'],
        correctAnswer: 1,
        explanation: 'A heap is a complete binary tree (all levels filled except possibly last, filled left to right).'
      }
    ]
  },
  {
    id: 'cs104-quiz-7b',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Heaps and Priority Queues - Application',
    questions: [
      {
        id: 'cs104-q7b-1',
        type: 'code_output',
        prompt: 'What is printed?',
        codeSnippet: `import heapq
h = []
heapq.heappush(h, 5)
heapq.heappush(h, 2)
heapq.heappush(h, 8)
print(heapq.heappop(h))`,
        correctAnswer: '2',
        explanation: 'Min-heap: after pushing 5,2,8, the root (minimum) is 2. heappop returns 2.'
      },
      {
        id: 'cs104-q7b-2',
        type: 'multiple_choice',
        prompt: 'To find the k largest elements efficiently, use:',
        options: ['Max-heap of all elements', 'Min-heap of size k', 'Sorting', 'Binary search'],
        correctAnswer: 1,
        explanation: 'Keep a min-heap of size k; the heap contains k largest, root is kth largest. O(n log k).'
      },
      {
        id: 'cs104-q7b-3',
        type: 'true_false',
        prompt: 'Heap sort has O(n log n) time complexity in all cases.',
        correctAnswer: true,
        explanation: 'Heap sort is O(n log n) in best, average, and worst cases—no data pattern causes degradation.'
      },
      {
        id: 'cs104-q7b-4',
        type: 'code_output',
        prompt: 'After heapify, what is at index 0?',
        codeSnippet: `import heapq
arr = [5, 3, 8, 1, 2]
heapq.heapify(arr)
print(arr[0])`,
        correctAnswer: '1',
        explanation: 'heapify creates a min-heap. The minimum element (1) moves to root (index 0).'
      },
      {
        id: 'cs104-q7b-5',
        type: 'multiple_choice',
        prompt: 'Dijkstra\'s shortest path algorithm uses a heap as:',
        options: ['Stack replacement', 'Priority queue for vertices by distance', 'Graph representation', 'Path storage'],
        correctAnswer: 1,
        explanation: 'Dijkstra uses a min-heap (priority queue) to always process the vertex with smallest distance.'
      }
    ]
  },
  {
    id: 'cs104-quiz-7c',
    subjectId: 'cs104',
    topicId: 'cs104-topic-7',
    title: 'Heaps and Priority Queues - Advanced',
    questions: [
      {
        id: 'cs104-q7c-1',
        type: 'multiple_choice',
        prompt: 'Building a heap from n elements takes:',
        options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'],
        correctAnswer: 2,
        explanation: 'Building a heap bottom-up (heapify) takes O(n), not O(n log n) as with n insertions.'
      },
      {
        id: 'cs104-q7c-2',
        type: 'true_false',
        prompt: 'To find the running median, you can use two heaps: a max-heap and a min-heap.',
        correctAnswer: true,
        explanation: 'Max-heap stores smaller half, min-heap stores larger half. Median is from heap tops.'
      },
      {
        id: 'cs104-q7c-3',
        type: 'multiple_choice',
        prompt: 'Merging k sorted lists using a heap takes:',
        options: ['O(n)', 'O(n log n)', 'O(n log k)', 'O(nk)'],
        correctAnswer: 2,
        explanation: 'Each of n elements is pushed/popped once from a k-element heap: O(n log k).'
      },
      {
        id: 'cs104-q7c-4',
        type: 'fill_blank',
        prompt: 'The operation to restore heap property after insertion is called heapify ____ or bubble up.',
        correctAnswer: 'up',
        explanation: 'After insertion at bottom, element may need to bubble up to restore heap property.'
      },
      {
        id: 'cs104-q7c-5',
        type: 'multiple_choice',
        prompt: 'Heap sort is NOT stable because:',
        options: ['It uses recursion', 'Heapify can change relative order of equal elements', 'It requires extra space', 'It\'s not comparison-based'],
        correctAnswer: 1,
        explanation: 'During heapify operations, equal elements may be swapped, changing their relative order.'
      }
    ]
  }
];
