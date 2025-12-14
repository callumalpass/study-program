import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs104-exercise-3',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Binary Search Tree Validation',
    difficulty: 3,
    description: 'Write a function to determine if a binary tree is a valid Binary Search Tree. A valid BST has all left descendants less than the node, and all right descendants greater than the node.',
    language: 'python',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef is_valid_bst(root):\n    # Your code here\n    pass',
    testCases: [
      { input: 'Tree: 2, 1, 3', expectedOutput: 'True', isHidden: false, description: 'Valid BST' },
      { input: 'Tree: 5, 1, 4, None, None, 3, 6', expectedOutput: 'False', isHidden: false, description: 'Invalid BST - right subtree has smaller value' },
      { input: 'Tree: 10, 5, 15, None, None, 6, 20', expectedOutput: 'False', isHidden: true, description: 'Invalid BST - left value in right subtree' }
    ],
    hints: ['Use a helper function that tracks the valid range for each node', 'For each node, update the min and max constraints for its children', 'All nodes in left subtree must be less than current, not just the immediate child'],
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef is_valid_bst(root):\n    def validate(node, min_val, max_val):\n        if not node:\n            return True\n        \n        if node.value <= min_val or node.value >= max_val:\n            return False\n        \n        return (validate(node.left, min_val, node.value) and\n                validate(node.right, node.value, max_val))\n    \n    return validate(root, float(\'-inf\'), float(\'inf\'))'
  },
  {
    id: 'cs104-t3-ex02',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Inorder Traversal',
    difficulty: 1,
    description: 'Implement inorder traversal of a binary tree. Return the values as a list.',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef inorder(root):\n    # Your code here\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef inorder(root):\n    result = []\n    def traverse(node):\n        if node:\n            traverse(node.left)\n            result.append(node.value)\n            traverse(node.right)\n    traverse(root)\n    return result',
    testCases: [
      { input: 'Tree: 1, None, 2, 3', expectedOutput: '[1, 3, 2]', isHidden: false, description: 'Inorder traversal' },
      { input: 'Tree: 4, 2, 6, 1, 3', expectedOutput: '[1, 2, 3, 4, 6]', isHidden: true, description: 'BST gives sorted' }
    ],
    hints: ['Inorder: left, root, right', 'Use recursion or a stack'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex03',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 1,
    description: 'Find the maximum depth (height) of a binary tree. The depth is the number of nodes along the longest path from root to leaf.',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef max_depth(root):\n    # Your code here\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef max_depth(root):\n    if not root:\n        return 0\n    return 1 + max(max_depth(root.left), max_depth(root.right))',
    testCases: [
      { input: 'Tree: 3, 9, 20, None, None, 15, 7', expectedOutput: '3', isHidden: false, description: 'Depth of 3' },
      { input: 'Tree: 1', expectedOutput: '1', isHidden: true, description: 'Single node' }
    ],
    hints: ['Base case: empty tree has depth 0', 'Depth = 1 + max(left depth, right depth)'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex04',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Level Order Traversal',
    difficulty: 2,
    description: 'Return the level order (BFS) traversal of a binary tree as a list of lists, where each inner list contains values at that level.',
    starterCode: 'from collections import deque\n\nclass TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef level_order(root):\n    # Your code here\n    pass',
    solution: 'from collections import deque\n\nclass TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef level_order(root):\n    if not root:\n        return []\n    \n    result = []\n    queue = deque([root])\n    \n    while queue:\n        level_size = len(queue)\n        level = []\n        for _ in range(level_size):\n            node = queue.popleft()\n            level.append(node.value)\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n        result.append(level)\n    \n    return result',
    testCases: [
      { input: 'Tree: 3, 9, 20, None, None, 15, 7', expectedOutput: '[[3], [9, 20], [15, 7]]', isHidden: false, description: 'Level order' },
      { input: 'Tree: 1', expectedOutput: '[[1]]', isHidden: true, description: 'Single node' }
    ],
    hints: ['Use a queue for BFS', 'Track level size before processing'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex05',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'BST Insert and Search',
    difficulty: 2,
    description: 'Implement insert and search operations for a Binary Search Tree.',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, value):\n        pass\n    \n    def search(self, value):\n        # Return True if found, False otherwise\n        pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\nclass BST:\n    def __init__(self):\n        self.root = None\n    \n    def insert(self, value):\n        if not self.root:\n            self.root = TreeNode(value)\n            return\n        \n        current = self.root\n        while True:\n            if value < current.value:\n                if current.left:\n                    current = current.left\n                else:\n                    current.left = TreeNode(value)\n                    return\n            else:\n                if current.right:\n                    current = current.right\n                else:\n                    current.right = TreeNode(value)\n                    return\n    \n    def search(self, value):\n        current = self.root\n        while current:\n            if value == current.value:\n                return True\n            elif value < current.value:\n                current = current.left\n            else:\n                current = current.right\n        return False',
    testCases: [
      { input: 'bst.insert(5,3,7); bst.search(3)', expectedOutput: 'True', isHidden: false, description: 'Find inserted value' },
      { input: 'bst.insert(5,3,7); bst.search(4)', expectedOutput: 'False', isHidden: true, description: 'Value not found' }
    ],
    hints: ['Compare value with current node to decide left or right', 'Insert at first empty position found'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex06',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Lowest Common Ancestor (BST)',
    difficulty: 3,
    description: 'Find the lowest common ancestor of two nodes in a BST. The LCA is the deepest node that has both p and q as descendants.',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef lca_bst(root, p, q):\n    # p and q are values, not nodes\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef lca_bst(root, p, q):\n    current = root\n    while current:\n        if p < current.value and q < current.value:\n            current = current.left\n        elif p > current.value and q > current.value:\n            current = current.right\n        else:\n            return current.value\n    return None',
    testCases: [
      { input: 'Tree: 6,2,8,0,4,7,9; LCA(2,8)', expectedOutput: '6', isHidden: false, description: 'LCA is root' },
      { input: 'Tree: 6,2,8,0,4,7,9; LCA(2,4)', expectedOutput: '2', isHidden: true, description: 'LCA is one of the nodes' }
    ],
    hints: ['Use BST property: left < root < right', 'If both values are smaller, go left; if both larger, go right', 'Otherwise, current node is LCA'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex07',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Invert Binary Tree',
    difficulty: 2,
    description: 'Invert a binary tree (mirror it). Every left child becomes right child and vice versa.',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef invert_tree(root):\n    # Modify tree in-place and return root\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef invert_tree(root):\n    if not root:\n        return None\n    \n    root.left, root.right = root.right, root.left\n    invert_tree(root.left)\n    invert_tree(root.right)\n    \n    return root',
    testCases: [
      { input: 'Tree: 4,2,7,1,3,6,9', expectedOutput: '[4,7,2,9,6,3,1]', isHidden: false, description: 'Inverted tree' },
      { input: 'None', expectedOutput: 'None', isHidden: true, description: 'Empty tree' }
    ],
    hints: ['Swap left and right children', 'Recursively invert subtrees'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex08',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Serialize and Deserialize Binary Tree',
    difficulty: 5,
    description: 'Design functions to serialize a binary tree to a string and deserialize it back. Use preorder traversal with markers for null.',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef serialize(root):\n    # Return string representation\n    pass\n\ndef deserialize(data):\n    # Return TreeNode root\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef serialize(root):\n    def helper(node):\n        if not node:\n            return ["null"]\n        return [str(node.value)] + helper(node.left) + helper(node.right)\n    return ",".join(helper(root))\n\ndef deserialize(data):\n    values = iter(data.split(","))\n    \n    def helper():\n        val = next(values)\n        if val == "null":\n            return None\n        node = TreeNode(int(val))\n        node.left = helper()\n        node.right = helper()\n        return node\n    \n    return helper()',
    testCases: [
      { input: 'serialize then deserialize [1,2,3,null,null,4,5]', expectedOutput: 'Same tree structure', isHidden: false, description: 'Round trip works' }
    ],
    hints: ['Use preorder: process root, then left, then right', 'Use "null" marker for empty nodes', 'Use iterator for deserialization'],
    language: 'python'
  }
];
