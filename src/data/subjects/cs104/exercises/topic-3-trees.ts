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
    ],
    hints: ['Use preorder: process root, then left, then right', 'Use "null" marker for empty nodes', 'Use iterator for deserialization'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex09',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Balanced Binary Tree',
    difficulty: 2,
    description: 'Determine if a binary tree is height-balanced (the depth of the two subtrees of every node never differs by more than 1).',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef is_balanced(root):\n    # Your code here\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef is_balanced(root):\n    def check_height(node):\n        if not node:\n            return 0\n        \n        left_height = check_height(node.left)\n        if left_height == -1:\n            return -1\n        \n        right_height = check_height(node.right)\n        if right_height == -1:\n            return -1\n        \n        if abs(left_height - right_height) > 1:\n            return -1\n        \n        return max(left_height, right_height) + 1\n    \n    return check_height(root) != -1',
    testCases: [],
    hints: ['Return -1 to indicate unbalanced subtree', 'Check balance at each node during height calculation', 'This is O(n) - each node visited once'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex10',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'BST Delete',
    difficulty: 3,
    description: 'Delete a node with a given value from a BST. Return the root of the modified tree.',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef delete_node(root, key):\n    # Your code here\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef delete_node(root, key):\n    if not root:\n        return None\n    \n    if key < root.value:\n        root.left = delete_node(root.left, key)\n    elif key > root.value:\n        root.right = delete_node(root.right, key)\n    else:\n        # Node to delete found\n        if not root.left:\n            return root.right\n        if not root.right:\n            return root.left\n        \n        # Two children: find inorder successor\n        successor = root.right\n        while successor.left:\n            successor = successor.left\n        root.value = successor.value\n        root.right = delete_node(root.right, successor.value)\n    \n    return root',
    testCases: [],
    hints: ['Three cases: no children, one child, two children', 'For two children, replace with inorder successor', 'Inorder successor is smallest node in right subtree'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex11',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Path Sum',
    difficulty: 2,
    description: 'Determine if the tree has a root-to-leaf path such that the sum of node values equals a given target.',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef has_path_sum(root, target_sum):\n    # Your code here\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef has_path_sum(root, target_sum):\n    if not root:\n        return False\n    \n    # Check if leaf node\n    if not root.left and not root.right:\n        return root.value == target_sum\n    \n    # Recurse on children with reduced target\n    remaining = target_sum - root.value\n    return (has_path_sum(root.left, remaining) or \n            has_path_sum(root.right, remaining))',
    testCases: [],
    hints: ['Subtract current node value from target as you go', 'A leaf node must have exactly the remaining sum', 'Empty tree has no paths'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex12',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Construct Binary Tree from Preorder and Inorder',
    difficulty: 4,
    description: 'Given preorder and inorder traversals of a tree, construct the binary tree.',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(preorder, inorder):\n    # Your code here\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef build_tree(preorder, inorder):\n    if not preorder or not inorder:\n        return None\n    \n    # First element of preorder is root\n    root = TreeNode(preorder[0])\n    \n    # Find root in inorder to split left/right\n    mid = inorder.index(preorder[0])\n    \n    # Recursively build subtrees\n    root.left = build_tree(preorder[1:mid+1], inorder[:mid])\n    root.right = build_tree(preorder[mid+1:], inorder[mid+1:])\n    \n    return root',
    testCases: [],
    hints: ['Preorder: root is first element', 'Inorder: elements left of root are in left subtree', 'Use recursion with appropriate slices'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex13',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Kth Smallest Element in BST',
    difficulty: 2,
    description: 'Return the kth smallest element in a BST (1-indexed).',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef kth_smallest(root, k):\n    # Your code here\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef kth_smallest(root, k):\n    stack = []\n    current = root\n    count = 0\n    \n    while stack or current:\n        # Go to leftmost node\n        while current:\n            stack.append(current)\n            current = current.left\n        \n        current = stack.pop()\n        count += 1\n        \n        if count == k:\n            return current.value\n        \n        current = current.right\n    \n    return None',
    testCases: [],
    hints: ['Inorder traversal of BST gives sorted order', 'Use iterative inorder with early termination', 'Count nodes as you traverse'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex14',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Binary Tree Right Side View',
    difficulty: 3,
    description: 'Return the values of the nodes you can see from the right side of the tree (ordered from top to bottom).',
    starterCode: 'from collections import deque\n\nclass TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef right_side_view(root):\n    # Your code here\n    pass',
    solution: 'from collections import deque\n\nclass TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef right_side_view(root):\n    if not root:\n        return []\n    \n    result = []\n    queue = deque([root])\n    \n    while queue:\n        level_size = len(queue)\n        for i in range(level_size):\n            node = queue.popleft()\n            if i == level_size - 1:  # Last node in level\n                result.append(node.value)\n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n    \n    return result',
    testCases: [],
    hints: ['Use level order traversal (BFS)', 'Keep track of the last node at each level', 'The rightmost node at each level is visible'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex15',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Flatten Binary Tree to Linked List',
    difficulty: 3,
    description: 'Flatten a binary tree to a "linked list" in-place. The linked list should use the right child pointer and be in preorder.',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef flatten(root):\n    # Modify tree in-place\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef flatten(root):\n    if not root:\n        return\n    \n    current = root\n    while current:\n        if current.left:\n            # Find rightmost node of left subtree\n            rightmost = current.left\n            while rightmost.right:\n                rightmost = rightmost.right\n            \n            # Connect left subtree\'s rightmost to current\'s right\n            rightmost.right = current.right\n            current.right = current.left\n            current.left = None\n        \n        current = current.right',
    testCases: [],
    hints: ['For each node with a left child, find the rightmost of left subtree', 'Connect it to current right subtree', 'Move left subtree to right, clear left'],
    language: 'python'
  },
  {
    id: 'cs104-t3-ex16',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Count Complete Tree Nodes',
    difficulty: 3,
    description: 'Count the number of nodes in a complete binary tree in better than O(n) time.',
    starterCode: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef count_nodes(root):\n    # Your code here - try to do better than O(n)\n    pass',
    solution: 'class TreeNode:\n    def __init__(self, value):\n        self.value = value\n        self.left = None\n        self.right = None\n\ndef count_nodes(root):\n    if not root:\n        return 0\n    \n    def get_height(node, go_left):\n        height = 0\n        while node:\n            height += 1\n            node = node.left if go_left else node.right\n        return height\n    \n    left_height = get_height(root, True)\n    right_height = get_height(root, False)\n    \n    if left_height == right_height:\n        # Perfect tree: 2^h - 1 nodes\n        return (1 << left_height) - 1\n    else:\n        # Recurse on subtrees\n        return 1 + count_nodes(root.left) + count_nodes(root.right)',
    testCases: [],
    hints: ['A complete tree has either a perfect left or right subtree', 'Compare left and right heights (always going left/right)', 'If heights equal, it\'s perfect: 2^h - 1 nodes'],
    language: 'python'
  }
];
