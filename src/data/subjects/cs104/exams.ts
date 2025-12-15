import type { Exam } from '@/core/types';

export const cs104Exams: Exam[] = [
  {
    id: 'cs104-exam-midterm',
    subjectId: 'cs104',
    title: 'CS104 Midterm Exam',
    durationMinutes: 75,
    instructions: [
      'This exam covers Topics 1-4: Arrays/Linked Lists, Stacks/Queues, Trees, and Hash Tables.',
      'Answer all questions. Passing score is 70% or higher.',
      'For code output questions, provide exact output including formatting.',
      'For fill-in-blank questions, use lowercase answers.',
      'Show your work for partial credit on written questions.',
    ],
    questions: [
      // === TOPIC 1: Arrays and Linked Lists (7 questions) ===
      {
        id: 'mid-q1',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of accessing an element by index in an array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Arrays provide O(1) random access because elements are stored contiguously, allowing direct address calculation.',
      },
      {
        id: 'mid-q2',
        type: 'multiple_choice',
        prompt: 'Which operation is MORE efficient in a singly linked list compared to an array?',
        options: ['Accessing the middle element', 'Binary search', 'Inserting at the beginning', 'Accessing the last element'],
        correctAnswer: 2,
        explanation: 'Inserting at the beginning of a linked list is O(1) (just update head pointer), while arrays require O(n) shifting.',
      },
      {
        id: 'mid-q3',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

head = Node(1)
head.next = Node(2)
head.next.next = Node(3)
curr = head
while curr:
    print(curr.val, end='->')
    curr = curr.next
print('None')`,
        correctAnswer: '1->2->3->None',
        explanation: 'The traversal visits each node (1, 2, 3) printing value followed by ->, then prints None at the end.',
      },
      {
        id: 'mid-q4',
        type: 'true_false',
        prompt: 'To reverse a singly linked list in-place, you need O(n) extra space.',
        correctAnswer: false,
        explanation: 'Reversing a linked list in-place requires only O(1) extra space (3 pointers: prev, curr, next).',
      },
      {
        id: 'mid-q5',
        type: 'fill_blank',
        prompt: 'The two-pointer technique using slow and fast pointers is also called the ____ and ____ algorithm.',
        correctAnswer: 'tortoise and hare',
        explanation: 'Floyd\'s cycle detection algorithm uses two pointers moving at different speeds, nicknamed tortoise (slow) and hare (fast).',
      },
      {
        id: 'mid-q6',
        type: 'written',
        prompt: 'Explain why arrays have better cache performance than linked lists. What is spatial locality and how does it apply here?',
        correctAnswer: '',
        explanation: 'Arrays have better cache performance because they store elements in contiguous memory locations. Spatial locality is the principle that when one memory location is accessed, nearby locations are likely to be accessed soon. CPUs take advantage of this by loading blocks of nearby memory into the cache. Since array elements are contiguous, accessing one element brings nearby elements into cache. In contrast, linked list nodes can be scattered throughout memory, so accessing one node doesn\'t help with accessing the next node, resulting in more cache misses.',
        modelAnswer: 'Arrays have better cache performance because they store elements in contiguous memory locations. Spatial locality is the principle that when one memory location is accessed, nearby locations are likely to be accessed soon. CPUs take advantage of this by loading blocks of nearby memory into the cache. Since array elements are contiguous, accessing one element brings nearby elements into cache. In contrast, linked list nodes can be scattered throughout memory, so accessing one node doesn\'t help with accessing the next node, resulting in more cache misses.',
      },
      {
        id: 'mid-q7',
        type: 'written',
        prompt: 'Write a function that finds the middle node of a linked list. If there are two middle nodes, return the second one. Explain your approach.',
        correctAnswer: '',
        explanation: `def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

Use the two-pointer technique: slow pointer moves one step at a time while fast pointer moves two steps. When fast reaches the end, slow will be at the middle. For even-length lists, this returns the second middle node as required.`,
        modelAnswer: `def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

Use the two-pointer technique: slow pointer moves one step at a time while fast pointer moves two steps. When fast reaches the end, slow will be at the middle. For even-length lists, this returns the second middle node as required.`,
      },

      // === TOPIC 2: Stacks and Queues (6 questions) ===
      {
        id: 'mid-q8',
        type: 'multiple_choice',
        prompt: 'Which data structure follows LIFO (Last-In-First-Out) ordering?',
        options: ['Queue', 'Stack', 'Deque', 'Priority Queue'],
        correctAnswer: 1,
        explanation: 'Stacks follow LIFO: the most recently added element is removed first.',
      },
      {
        id: 'mid-q9',
        type: 'code_output',
        prompt: 'What is printed after these operations?',
        codeSnippet: `stack = []
stack.append(10)
stack.append(20)
stack.append(30)
print(stack.pop())
stack.append(40)
print(stack.pop())
print(stack[-1])`,
        correctAnswer: '30\n40\n20',
        explanation: 'Stack: [10,20,30] -> pop 30 -> [10,20] -> append 40 -> [10,20,40] -> pop 40 -> [10,20] -> peek 20.',
      },
      {
        id: 'mid-q10',
        type: 'true_false',
        prompt: 'In Python, using list.pop(0) for queue operations is O(1).',
        correctAnswer: false,
        explanation: 'list.pop(0) is O(n) because all elements must shift. Use collections.deque for O(1) popleft().',
      },
      {
        id: 'mid-q11',
        type: 'multiple_choice',
        prompt: 'Which application is a classic use case for stacks?',
        options: ['BFS traversal', 'Task scheduling', 'Balanced parentheses checking', 'Level-order tree traversal'],
        correctAnswer: 2,
        explanation: 'Stacks are perfect for matching brackets: push opening brackets, pop when closing brackets match.',
      },
      {
        id: 'mid-q12',
        type: 'code_output',
        prompt: 'Evaluate this postfix expression: 3 4 + 2 * 7 -',
        codeSnippet: '# Postfix evaluation using stack',
        correctAnswer: '7',
        explanation: '3+4=7, 7*2=14, 14-7=7. Operations: push 3,4 -> pop,add,push 7 -> push 2 -> pop,mul,push 14 -> push 7 -> pop,sub,push 7.',
      },
      {
        id: 'mid-q13',
        type: 'written',
        prompt: 'Write a function to check if a string of parentheses is valid. A string is valid if every opening bracket has a corresponding closing bracket in the correct order. Explain your approach.',
        modelAnswer: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0

Use a stack to track opening brackets. When encountering a closing bracket, check if the top of the stack has the matching opening bracket. If not, or if stack is empty, return False. At the end, stack should be empty for a valid string.`,
        correctAnswer: '',
        explanation: `def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0

Use a stack to track opening brackets. When encountering a closing bracket, check if the top of the stack has the matching opening bracket. If not, or if stack is empty, return False. At the end, stack should be empty for a valid string.`,
      },

      // === TOPIC 3: Trees (7 questions) ===
      {
        id: 'mid-q14',
        type: 'multiple_choice',
        prompt: 'In a Binary Search Tree, all values in the left subtree of a node are:',
        options: ['Greater than the node', 'Less than the node', 'Equal to the node', 'Random'],
        correctAnswer: 1,
        explanation: 'BST property: left subtree values < node value < right subtree values.',
      },
      {
        id: 'mid-q15',
        type: 'fill_blank',
        prompt: '____ traversal of a BST visits nodes in sorted (ascending) order.',
        correctAnswer: 'inorder',
        explanation: 'Inorder traversal (left-root-right) visits BST nodes in ascending sorted order.',
      },
      {
        id: 'mid-q16',
        type: 'code_output',
        prompt: 'What is the preorder traversal of this BST?\n      5\n     / \\\n    3   7\n   /     \\\n  1       9',
        codeSnippet: '# Preorder: root, left, right',
        correctAnswer: '5 3 1 7 9',
        explanation: 'Preorder visits: 5 (root) -> 3 (left) -> 1 (left of 3) -> 7 (right of 5) -> 9 (right of 7).',
      },
      {
        id: 'mid-q17',
        type: 'true_false',
        prompt: 'The worst-case time complexity for searching in a BST is O(log n).',
        correctAnswer: false,
        explanation: 'Worst case is O(n) when the BST is skewed (degenerates to a linked list). O(log n) is for balanced BSTs.',
      },
      {
        id: 'mid-q18',
        type: 'multiple_choice',
        prompt: 'Which traversal uses a queue to process nodes level by level?',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level-order (BFS)'],
        correctAnswer: 3,
        explanation: 'Level-order traversal uses a queue to process all nodes at each level before moving to the next.',
      },
      {
        id: 'mid-q19',
        type: 'written',
        prompt: 'Explain the difference between a binary tree and a binary search tree. Why is the BST property important for search operations?',
        correctAnswer: '',
        explanation: 'A binary tree is a tree where each node has at most 2 children. A binary search tree (BST) is a special binary tree with the property that for every node, all values in the left subtree are less than the node value, and all values in the right subtree are greater. This BST property enables binary search: at each node, we can eliminate half the tree by comparing the target with the current node and choosing left or right. This gives O(log n) search time in balanced BSTs, compared to O(n) for regular binary trees where we might need to check every node.',
        modelAnswer: 'A binary tree is a tree where each node has at most 2 children. A binary search tree (BST) is a special binary tree with the property that for every node, all values in the left subtree are less than the node value, and all values in the right subtree are greater. This BST property enables binary search: at each node, we can eliminate half the tree by comparing the target with the current node and choosing left or right. This gives O(log n) search time in balanced BSTs, compared to O(n) for regular binary trees where we might need to check every node.',
      },
      {
        id: 'mid-q20',
        type: 'written',
        prompt: 'Write a function to find the maximum depth (height) of a binary tree. Explain your approach.',
        modelAnswer: `def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

Use recursion: The depth of a tree is 0 if it's empty. Otherwise, it's 1 plus the maximum depth of the left and right subtrees. This naturally handles all cases including single nodes (depth 1) and empty trees (depth 0).`,
        correctAnswer: '',
        explanation: `def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

Use recursion: The depth of a tree is 0 if it's empty. Otherwise, it's 1 plus the maximum depth of the left and right subtrees. This naturally handles all cases including single nodes (depth 1) and empty trees (depth 0).`,
      },

      // === TOPIC 4: Hash Tables (6 questions) ===
      {
        id: 'mid-q21',
        type: 'multiple_choice',
        prompt: 'What is the average-case time complexity for hash table lookup?',
        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Hash tables provide O(1) average lookup by computing array index directly from the key.',
      },
      {
        id: 'mid-q22',
        type: 'fill_blank',
        prompt: 'When two different keys produce the same hash value, this is called a ____.',
        correctAnswer: 'collision',
        explanation: 'A collision occurs when hash(key1) == hash(key2) for key1 != key2.',
      },
      {
        id: 'mid-q23',
        type: 'multiple_choice',
        prompt: 'Which collision resolution strategy stores multiple key-value pairs at the same bucket using a linked list?',
        options: ['Linear probing', 'Quadratic probing', 'Chaining', 'Double hashing'],
        correctAnswer: 2,
        explanation: 'Chaining resolves collisions by maintaining a linked list (or other structure) at each bucket.',
      },
      {
        id: 'mid-q24',
        type: 'code_output',
        prompt: 'What does this code print?',
        codeSnippet: `d = {'a': 1, 'b': 2}
d['c'] = 3
d['a'] = 10
print(d.get('a'), d.get('x', 0))`,
        correctAnswer: '10 0',
        explanation: 'd["a"] is overwritten to 10. d.get("x", 0) returns default 0 since "x" doesn\'t exist.',
      },
      {
        id: 'mid-q25',
        type: 'true_false',
        prompt: 'In Python, mutable objects like lists can be used as dictionary keys.',
        correctAnswer: false,
        explanation: 'Dictionary keys must be hashable. Lists are mutable and not hashable, so cannot be keys.',
      },
      {
        id: 'mid-q26',
        type: 'written',
        prompt: 'Write a function that returns the first non-repeating character in a string, or None if all characters repeat. Explain your approach.',
        modelAnswer: `def first_unique(s):
    freq = {}
    for c in s:
        freq[c] = freq.get(c, 0) + 1
    for c in s:
        if freq[c] == 1:
            return c
    return None

Use a hash map to count character frequencies in one pass. Then iterate through the string again and return the first character with frequency 1. This ensures we return the first unique character in order of appearance.`,
        correctAnswer: '',
        explanation: `def first_unique(s):
    freq = {}
    for c in s:
        freq[c] = freq.get(c, 0) + 1
    for c in s:
        if freq[c] == 1:
            return c
    return None

Use a hash map to count character frequencies in one pass. Then iterate through the string again and return the first character with frequency 1. This ensures we return the first unique character in order of appearance.`,
      },
    ],
  },

  {
    id: 'cs104-exam-final',
    subjectId: 'cs104',
    title: 'CS104 Final Exam',
    durationMinutes: 120,
    instructions: [
      'This comprehensive exam covers all 7 topics.',
      'Answer all questions. Passing score is 70% or higher.',
      'For code output questions, provide exact output.',
      'For fill-in-blank questions, use lowercase answers.',
      'Time management: approximately 3 minutes per question.',
    ],
    questions: [
      // === TOPIC 1: Arrays and Linked Lists (6 questions) ===
      {
        id: 'final-q1',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of inserting an element at the beginning of an array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 2,
        explanation: 'Inserting at the beginning requires shifting all n elements, making it O(n).',
      },
      {
        id: 'final-q2',
        type: 'code_output',
        prompt: 'What is printed?',
        codeSnippet: `arr = [1, 2, 3, 4, 5]
arr = arr[-2:] + arr[:-2]
print(arr)`,
        correctAnswer: '[4, 5, 1, 2, 3]',
        explanation: 'arr[-2:] = [4, 5], arr[:-2] = [1, 2, 3]. Concatenation gives right rotation by 2.',
      },
      {
        id: 'final-q3',
        type: 'true_false',
        prompt: 'A doubly linked list requires more memory per node than a singly linked list.',
        correctAnswer: true,
        explanation: 'Doubly linked lists store two pointers (next and prev) vs one (next) in singly linked lists.',
      },
      {
        id: 'final-q4',
        type: 'multiple_choice',
        prompt: 'Floyd\'s cycle detection algorithm uses:',
        options: ['O(n) time, O(n) space', 'O(n) time, O(1) space', 'O(n²) time, O(1) space', 'O(log n) time, O(1) space'],
        correctAnswer: 1,
        explanation: 'Floyd\'s algorithm uses two pointers (O(1) space) and traverses the list once (O(n) time).',
      },
      {
        id: 'final-q5',
        type: 'fill_blank',
        prompt: 'An LRU Cache is typically implemented using a hash map and a ____ linked list.',
        correctAnswer: 'doubly',
        explanation: 'Doubly linked list allows O(1) removal from any position, needed for LRU eviction.',
      },
      {
        id: 'final-q6',
        type: 'written',
        prompt: 'Write a function to reverse a linked list in-place. Explain your approach.',
        correctAnswer: '',
        explanation: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev

Maintain three pointers: prev (initially None), curr (starts at head), and next_node. For each node, save the next node, reverse the link to point to prev, then advance prev and curr. When curr becomes None, prev will be the new head.`,
        modelAnswer: `def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    return prev

Maintain three pointers: prev (initially None), curr (starts at head), and next_node. For each node, save the next node, reverse the link to point to prev, then advance prev and curr. When curr becomes None, prev will be the new head.`,
      },

      // === TOPIC 2: Stacks and Queues (6 questions) ===
      {
        id: 'final-q7',
        type: 'multiple_choice',
        prompt: 'Which algorithm uses a queue for traversal?',
        options: ['Depth-First Search', 'Preorder traversal', 'Breadth-First Search', 'Postorder traversal'],
        correctAnswer: 2,
        explanation: 'BFS uses a queue to explore vertices level by level. DFS uses a stack.',
      },
      {
        id: 'final-q8',
        type: 'code_output',
        prompt: 'What is printed?',
        codeSnippet: `from collections import deque
q = deque([1, 2, 3])
q.append(4)
print(q.popleft())
q.appendleft(0)
print(list(q))`,
        correctAnswer: '1\n[0, 2, 3, 4]',
        explanation: 'Initial: [1,2,3]. append(4): [1,2,3,4]. popleft(): returns 1, leaves [2,3,4]. appendleft(0): [0,2,3,4].',
      },
      {
        id: 'final-q9',
        type: 'true_false',
        prompt: 'A monotonic stack can solve "next greater element" problems in O(n) time.',
        correctAnswer: true,
        explanation: 'Monotonic stack processes each element at most twice (push and pop), giving O(n) overall.',
      },
      {
        id: 'final-q10',
        type: 'multiple_choice',
        prompt: 'A deque (double-ended queue) supports:',
        options: ['Only front operations', 'Only back operations', 'Operations at both ends in O(1)', 'Random access in O(1)'],
        correctAnswer: 2,
        explanation: 'Deque provides O(1) insertion and deletion at both front and back.',
      },
      {
        id: 'final-q11',
        type: 'written',
        prompt: 'Explain how you would implement a queue using two stacks. Describe the time complexity of enqueue and dequeue operations.',
        correctAnswer: '',
        explanation: 'Use two stacks: stack1 for enqueue and stack2 for dequeue. For enqueue, simply push to stack1 (O(1)). For dequeue, if stack2 is empty, transfer all elements from stack1 to stack2 (reversing their order), then pop from stack2. While a single dequeue might take O(n) when transferring, each element is moved at most once from stack1 to stack2, giving amortized O(1) time for dequeue operations.',
        modelAnswer: 'Use two stacks: stack1 for enqueue and stack2 for dequeue. For enqueue, simply push to stack1 (O(1)). For dequeue, if stack2 is empty, transfer all elements from stack1 to stack2 (reversing their order), then pop from stack2. While a single dequeue might take O(n) when transferring, each element is moved at most once from stack1 to stack2, giving amortized O(1) time for dequeue operations.',
      },
      {
        id: 'final-q12',
        type: 'written',
        prompt: 'Implement a MinStack that supports push, pop, top, and getMin in O(1) time. Explain your approach.',
        modelAnswer: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []
    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    def pop(self):
        if self.stack.pop() == self.min_stack[-1]:
            self.min_stack.pop()
    def top(self):
        return self.stack[-1]
    def getMin(self):
        return self.min_stack[-1]

Maintain two stacks: one for all elements and one tracking minimums. When pushing, add to main stack, and add to min_stack if it's the new minimum. When popping, remove from min_stack only if it equals the popped value. This ensures getMin is always O(1).`,
        correctAnswer: '',
        explanation: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []
    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    def pop(self):
        if self.stack.pop() == self.min_stack[-1]:
            self.min_stack.pop()
    def top(self):
        return self.stack[-1]
    def getMin(self):
        return self.min_stack[-1]

Maintain two stacks: one for all elements and one tracking minimums. When pushing, add to main stack, and add to min_stack if it's the new minimum. When popping, remove from min_stack only if it equals the popped value. This ensures getMin is always O(1).`,
      },

      // === TOPIC 3: Trees (6 questions) ===
      {
        id: 'final-q13',
        type: 'multiple_choice',
        prompt: 'Which self-balancing BST uses rotations to maintain balance?',
        options: ['Binary Tree', 'AVL Tree', 'Linked List', 'Hash Table'],
        correctAnswer: 1,
        explanation: 'AVL trees maintain balance (heights differ by at most 1) using rotations after insertions/deletions.',
      },
      {
        id: 'final-q14',
        type: 'code_output',
        prompt: 'What is the inorder traversal of this BST?\n      8\n     / \\\n    4  12\n   /    \\\n  2     14',
        codeSnippet: '# Inorder: left, root, right',
        correctAnswer: '2 4 8 12 14',
        explanation: 'Inorder of BST gives sorted order: 2 -> 4 -> 8 -> 12 -> 14.',
      },
      {
        id: 'final-q15',
        type: 'fill_blank',
        prompt: 'The Lowest Common Ancestor (LCA) of two nodes is the ____ node that has both as descendants.',
        correctAnswer: 'deepest',
        explanation: 'LCA is the deepest (closest to leaves) ancestor that contains both nodes in its subtree.',
      },
      {
        id: 'final-q16',
        type: 'true_false',
        prompt: 'Level-order traversal of a binary tree requires O(n) extra space in the worst case.',
        correctAnswer: true,
        explanation: 'In the worst case (complete tree), the last level has n/2 nodes, all in the queue simultaneously.',
      },
      {
        id: 'final-q17',
        type: 'multiple_choice',
        prompt: 'To validate a BST, what must you check for each node?',
        options: ['Only immediate children are smaller/larger', 'Entire left subtree < node < entire right subtree', 'Height is balanced', 'No duplicate values'],
        correctAnswer: 1,
        explanation: 'BST validation requires ALL left subtree values < node AND ALL right subtree values > node.',
      },
      {
        id: 'final-q18',
        type: 'written',
        prompt: 'Write a function to check if a binary tree is a valid BST. Explain your approach.',
        modelAnswer: `def is_valid_bst(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return validate(node.left, min_val, node.val) and validate(node.right, node.val, max_val)
    return validate(root, float('-inf'), float('inf'))

Use recursion with range validation. Each node must be within a valid range (min_val, max_val). For the left child, update max_val to current node value. For the right child, update min_val to current node value. This ensures the entire subtree satisfies the BST property, not just immediate children.`,
        correctAnswer: '',
        explanation: `def is_valid_bst(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return validate(node.left, min_val, node.val) and validate(node.right, node.val, max_val)
    return validate(root, float('-inf'), float('inf'))

Use recursion with range validation. Each node must be within a valid range (min_val, max_val). For the left child, update max_val to current node value. For the right child, update min_val to current node value. This ensures the entire subtree satisfies the BST property, not just immediate children.`,
      },

      // === TOPIC 4: Hash Tables (6 questions) ===
      {
        id: 'final-q19',
        type: 'multiple_choice',
        prompt: 'What causes hash table operations to degrade to O(n)?',
        options: ['Low load factor', 'Good hash function', 'All keys hash to the same bucket', 'Using chaining'],
        correctAnswer: 2,
        explanation: 'When all keys collide to one bucket, operations must search through all n elements.',
      },
      {
        id: 'final-q20',
        type: 'code_output',
        prompt: 'What is printed?',
        codeSnippet: `from collections import Counter
s = "aabbbcc"
c = Counter(s)
print(c.most_common(2))`,
        correctAnswer: "[('b', 3), ('c', 2)]",
        explanation: 'Counter counts: a:2, b:3, c:2. most_common(2) returns top 2: [(\'b\', 3), (\'c\', 2)] or [(\'b\', 3), (\'a\', 2)].',
      },
      {
        id: 'final-q21',
        type: 'fill_blank',
        prompt: 'The ratio of elements to buckets in a hash table is called the ____ factor.',
        correctAnswer: 'load',
        explanation: 'Load factor = n / capacity. High load factor increases collisions; typically resize at 0.75.',
      },
      {
        id: 'final-q22',
        type: 'true_false',
        prompt: 'Python sets use hash tables internally.',
        correctAnswer: true,
        explanation: 'Python sets are implemented as hash tables with only keys (no values), providing O(1) membership testing.',
      },
      {
        id: 'final-q23',
        type: 'multiple_choice',
        prompt: 'To solve "Two Sum" in O(n) time, you should use:',
        options: ['Sorting', 'Binary search', 'Hash table', 'Brute force'],
        correctAnswer: 2,
        explanation: 'Hash table stores each number\'s index; for each number, check if (target - number) exists in O(1).',
      },
      {
        id: 'final-q24',
        type: 'written',
        prompt: 'Write a function to group anagrams from a list of strings. Explain your approach.',
        modelAnswer: `def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = tuple(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())

Use a hash map where the key is the sorted version of each string (as a tuple). Anagrams will have the same sorted key and be grouped together. For each string, sort it to create the key, then add the original string to that key's list. Finally, return all the grouped lists.`,
        correctAnswer: '',
        explanation: `def group_anagrams(strs):
    groups = {}
    for s in strs:
        key = tuple(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())

Use a hash map where the key is the sorted version of each string (as a tuple). Anagrams will have the same sorted key and be grouped together. For each string, sort it to create the key, then add the original string to that key's list. Finally, return all the grouped lists.`,
      },

      // === TOPIC 5: Graphs (6 questions) ===
      {
        id: 'final-q25',
        type: 'multiple_choice',
        prompt: 'What is the space complexity of an adjacency list for a graph with V vertices and E edges?',
        options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V²)'],
        correctAnswer: 2,
        explanation: 'Adjacency list stores V lists plus E total edges across all lists: O(V + E).',
      },
      {
        id: 'final-q26',
        type: 'fill_blank',
        prompt: 'A directed graph with no cycles is called a ____ (abbreviation).',
        correctAnswer: 'dag',
        explanation: 'DAG stands for Directed Acyclic Graph.',
      },
      {
        id: 'final-q27',
        type: 'true_false',
        prompt: 'BFS finds the shortest path in weighted graphs.',
        correctAnswer: false,
        explanation: 'BFS finds shortest paths only in unweighted graphs. Use Dijkstra\'s for weighted graphs.',
      },
      {
        id: 'final-q28',
        type: 'multiple_choice',
        prompt: 'Topological sort is only possible for:',
        options: ['Undirected graphs', 'Graphs with cycles', 'Directed acyclic graphs', 'Dense graphs'],
        correctAnswer: 2,
        explanation: 'Topological ordering requires a DAG; cycles make linear ordering impossible.',
      },
      {
        id: 'final-q29',
        type: 'code_output',
        prompt: 'How many connected components does this graph have?\nVertices: 0, 1, 2, 3, 4, 5\nEdges: (0,1), (1,2), (3,4)',
        codeSnippet: '# Groups: {0,1,2}, {3,4}, {5}',
        correctAnswer: '3',
        explanation: 'Three components: {0,1,2} connected, {3,4} connected, and {5} isolated.',
      },
      {
        id: 'final-q30',
        type: 'written',
        prompt: 'Write a function to detect if a directed graph has a cycle using DFS. Explain your approach.',
        modelAnswer: `def has_cycle(n, edges):
    graph = {i: [] for i in range(n)}
    for u, v in edges:
        graph[u].append(v)

    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n

    def dfs(node):
        color[node] = GRAY
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK
        return False

    for i in range(n):
        if color[i] == WHITE and dfs(i):
            return True
    return False

Use three-color DFS: WHITE (unvisited), GRAY (in current path), BLACK (fully processed). A cycle exists if we encounter a GRAY node during DFS, indicating a back edge to an ancestor in the current path.`,
        correctAnswer: '',
        explanation: `def has_cycle(n, edges):
    graph = {i: [] for i in range(n)}
    for u, v in edges:
        graph[u].append(v)

    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n

    def dfs(node):
        color[node] = GRAY
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK
        return False

    for i in range(n):
        if color[i] == WHITE and dfs(i):
            return True
    return False

Use three-color DFS: WHITE (unvisited), GRAY (in current path), BLACK (fully processed). A cycle exists if we encounter a GRAY node during DFS, indicating a back edge to an ancestor in the current path.`,
      },

      // === TOPIC 6: Sorting Algorithms (6 questions) ===
      {
        id: 'final-q31',
        type: 'multiple_choice',
        prompt: 'Which sorting algorithm has O(n log n) time complexity in ALL cases?',
        options: ['Quick sort', 'Merge sort', 'Bubble sort', 'Insertion sort'],
        correctAnswer: 1,
        explanation: 'Merge sort is always O(n log n). Quick sort can degrade to O(n²) with poor pivot selection.',
      },
      {
        id: 'final-q32',
        type: 'true_false',
        prompt: 'Insertion sort is efficient for nearly sorted arrays.',
        correctAnswer: true,
        explanation: 'Insertion sort is O(n) for nearly sorted data because elements need minimal movement.',
      },
      {
        id: 'final-q33',
        type: 'fill_blank',
        prompt: 'A sorting algorithm is ____ if equal elements maintain their original relative order.',
        correctAnswer: 'stable',
        explanation: 'Stable sorts preserve the input order of equal elements (e.g., merge sort, insertion sort).',
      },
      {
        id: 'final-q34',
        type: 'code_output',
        prompt: 'After one pass of bubble sort on [5, 1, 4, 2, 8], what is the array?',
        codeSnippet: '# Bubble largest to end in one pass',
        correctAnswer: '[1, 4, 2, 5, 8]',
        explanation: '5>1 swap [1,5,4,2,8] -> 5>4 swap [1,4,5,2,8] -> 5>2 swap [1,4,2,5,8] -> 5<8 no swap -> [1,4,2,5,8].',
      },
      {
        id: 'final-q35',
        type: 'multiple_choice',
        prompt: 'Quick sort\'s worst case O(n²) occurs when:',
        options: ['Array is random', 'Pivot is median', 'Pivot is always min or max', 'Array has no duplicates'],
        correctAnswer: 2,
        explanation: 'Poor pivot selection (always min/max) creates maximally unbalanced partitions.',
      },
      {
        id: 'final-q36',
        type: 'written',
        prompt: 'Write a function to merge two sorted arrays into one sorted array. Explain your approach.',
        modelAnswer: `def merge(arr1, arr2):
    result = []
    i = j = 0
    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            result.append(arr1[i])
            i += 1
        else:
            result.append(arr2[j])
            j += 1
    result.extend(arr1[i:])
    result.extend(arr2[j:])
    return result

Use two pointers, one for each array. Compare elements and append the smaller one to the result. When one array is exhausted, append the remaining elements from the other array. This is O(n+m) time, the core operation in merge sort.`,
        correctAnswer: '',
        explanation: `def merge(arr1, arr2):
    result = []
    i = j = 0
    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            result.append(arr1[i])
            i += 1
        else:
            result.append(arr2[j])
            j += 1
    result.extend(arr1[i:])
    result.extend(arr2[j:])
    return result

Use two pointers, one for each array. Compare elements and append the smaller one to the result. When one array is exhausted, append the remaining elements from the other array. This is O(n+m) time, the core operation in merge sort.`,
      },

      // === TOPIC 7: Heaps and Priority Queues (6 questions) ===
      {
        id: 'final-q37',
        type: 'multiple_choice',
        prompt: 'In a min-heap, the parent is always:',
        options: ['Greater than children', 'Less than or equal to children', 'Equal to children', 'Less than left, greater than right'],
        correctAnswer: 1,
        explanation: 'Min-heap property: parent <= children. Root is always the minimum element.',
      },
      {
        id: 'final-q38',
        type: 'code_output',
        prompt: 'What is printed?',
        codeSnippet: `import heapq
h = [5, 3, 8, 1]
heapq.heapify(h)
print(heapq.heappop(h))
print(heapq.heappop(h))`,
        correctAnswer: '1\n3',
        explanation: 'heapify creates min-heap [1,3,8,5]. First pop returns 1, second pop returns 3.',
      },
      {
        id: 'final-q39',
        type: 'fill_blank',
        prompt: 'For a node at index i in a 0-indexed heap array, its parent is at index ____ (formula using floor division).',
        correctAnswer: '(i-1)//2',
        explanation: 'Parent index = (i-1)//2. Left child = 2i+1, Right child = 2i+2.',
      },
      {
        id: 'final-q40',
        type: 'true_false',
        prompt: 'Building a heap from n elements takes O(n) time, not O(n log n).',
        correctAnswer: true,
        explanation: 'Bottom-up heapify takes O(n). Only inserting n elements one by one takes O(n log n).',
      },
      {
        id: 'final-q41',
        type: 'multiple_choice',
        prompt: 'To find the k largest elements from n elements efficiently, use:',
        options: ['Sort the entire array', 'Max-heap of all n elements', 'Min-heap of size k', 'Quick sort'],
        correctAnswer: 2,
        explanation: 'Min-heap of size k: keep k largest by removing smallest when heap exceeds k. O(n log k).',
      },
      {
        id: 'final-q42',
        type: 'written',
        prompt: 'Write a function to find the kth largest element in an array using a heap. Explain your approach.',
        modelAnswer: `import heapq

def find_kth_largest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]

Maintain a min-heap of size k. For each element, add it to the heap and if the heap exceeds size k, remove the smallest element. The heap will always contain the k largest elements seen so far, with the kth largest at the root. Time: O(n log k), Space: O(k).`,
        correctAnswer: '',
        explanation: `import heapq

def find_kth_largest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]

Maintain a min-heap of size k. For each element, add it to the heap and if the heap exceeds size k, remove the smallest element. The heap will always contain the k largest elements seen so far, with the kth largest at the root. Time: O(n log k), Space: O(k).`,
      },
    ],
  },
];
