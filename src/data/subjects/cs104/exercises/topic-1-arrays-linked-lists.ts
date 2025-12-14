import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs104-exercise-1',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Reverse a Linked List',
    difficulty: 3,
    description: 'Implement a function to reverse a singly linked list in-place. The function should take the head of the list and return the new head after reversal.',
    language: 'python',
    starterCode: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\ndef reverse_linked_list(head):\n    # Your code here\n    pass',
    testCases: [
    ],
    hints: ['Use three pointers: previous, current, and next', 'Iterate through the list and reverse the next pointer of each node', "Don't forget to handle the edge case of an empty list"],
    solution: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\ndef reverse_linked_list(head):\n    prev = None\n    current = head\n    \n    while current:\n        next_node = current.next\n        current.next = prev\n        prev = current\n        current = next_node\n    \n    return prev'
  },
  {
    id: 'cs104-t1-ex02',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Find Middle of Linked List',
    difficulty: 1,
    description: 'Find and return the middle node of a linked list. If there are two middle nodes (even length), return the second one.',
    starterCode: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\ndef find_middle(head):\n    # Your code here\n    pass\n\n# Test\nhead = Node(1)\nhead.next = Node(2)\nhead.next.next = Node(3)\nprint(find_middle(head).value)',
    solution: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\ndef find_middle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n    return slow\n\nhead = Node(1)\nhead.next = Node(2)\nhead.next.next = Node(3)\nprint(find_middle(head).value)',
    testCases: [
    ],
    hints: ['Use two pointers: slow and fast', 'Fast moves 2 steps while slow moves 1'],
    language: 'python'
  },
  {
    id: 'cs104-t1-ex03',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Detect Cycle in Linked List',
    difficulty: 2,
    description: 'Determine if a linked list has a cycle. Return True if there is a cycle, False otherwise.',
    starterCode: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\ndef has_cycle(head):\n    # Your code here\n    pass',
    solution: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\ndef has_cycle(head):\n    slow = fast = head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast:\n            return True\n    return False',
    testCases: [
    ],
    hints: ['Use Floyd\'s cycle detection (tortoise and hare)', 'If fast catches up to slow, there\'s a cycle'],
    language: 'python'
  },
  {
    id: 'cs104-t1-ex04',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Array Rotation',
    difficulty: 2,
    description: 'Rotate an array to the right by k positions. For example, [1,2,3,4,5] rotated by 2 becomes [4,5,1,2,3].',
    starterCode: 'def rotate_array(arr, k):\n    # Modify arr in-place\n    pass\n\narr = [1, 2, 3, 4, 5]\nrotate_array(arr, 2)\nprint(arr)',
    solution: 'def rotate_array(arr, k):\n    n = len(arr)\n    k = k % n  # Handle k > n\n    \n    def reverse(start, end):\n        while start < end:\n            arr[start], arr[end] = arr[end], arr[start]\n            start += 1\n            end -= 1\n    \n    reverse(0, n - 1)\n    reverse(0, k - 1)\n    reverse(k, n - 1)\n\narr = [1, 2, 3, 4, 5]\nrotate_array(arr, 2)\nprint(arr)',
    testCases: [
    ],
    hints: ['Use the reversal algorithm: reverse all, then reverse first k, then reverse rest', 'Handle k > array length with modulo'],
    language: 'python'
  },
  {
    id: 'cs104-t1-ex05',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Merge Two Sorted Lists',
    difficulty: 2,
    description: 'Merge two sorted linked lists into one sorted linked list.',
    starterCode: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\ndef merge_sorted(l1, l2):\n    # Your code here\n    pass',
    solution: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\ndef merge_sorted(l1, l2):\n    dummy = Node(0)\n    current = dummy\n    \n    while l1 and l2:\n        if l1.value <= l2.value:\n            current.next = l1\n            l1 = l1.next\n        else:\n            current.next = l2\n            l2 = l2.next\n        current = current.next\n    \n    current.next = l1 if l1 else l2\n    return dummy.next',
    testCases: [
    ],
    hints: ['Use a dummy head node to simplify edge cases', 'Compare values and link the smaller one'],
    language: 'python'
  },
  {
    id: 'cs104-t1-ex06',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 1,
    description: 'Remove duplicates from a sorted array in-place. Return the new length.',
    starterCode: 'def remove_duplicates(nums):\n    # Modify nums in-place, return new length\n    pass\n\nnums = [1, 1, 2, 2, 3]\nlength = remove_duplicates(nums)\nprint(nums[:length])',
    solution: 'def remove_duplicates(nums):\n    if not nums:\n        return 0\n    \n    write_idx = 1\n    for i in range(1, len(nums)):\n        if nums[i] != nums[i-1]:\n            nums[write_idx] = nums[i]\n            write_idx += 1\n    return write_idx\n\nnums = [1, 1, 2, 2, 3]\nlength = remove_duplicates(nums)\nprint(nums[:length])',
    testCases: [
    ],
    hints: ['Use two pointers: one for reading, one for writing', 'Write when current differs from previous'],
    language: 'python'
  },
  {
    id: 'cs104-t1-ex07',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Doubly Linked List',
    difficulty: 3,
    description: 'Implement a doubly linked list with insert_front, insert_back, and delete operations.',
    starterCode: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.prev = None\n        self.next = None\n\nclass DoublyLinkedList:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n    \n    def insert_front(self, value):\n        pass\n    \n    def insert_back(self, value):\n        pass\n    \n    def delete(self, value):\n        pass\n    \n    def to_list(self):\n        result = []\n        current = self.head\n        while current:\n            result.append(current.value)\n            current = current.next\n        return result',
    solution: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.prev = None\n        self.next = None\n\nclass DoublyLinkedList:\n    def __init__(self):\n        self.head = None\n        self.tail = None\n    \n    def insert_front(self, value):\n        node = Node(value)\n        if not self.head:\n            self.head = self.tail = node\n        else:\n            node.next = self.head\n            self.head.prev = node\n            self.head = node\n    \n    def insert_back(self, value):\n        node = Node(value)\n        if not self.tail:\n            self.head = self.tail = node\n        else:\n            node.prev = self.tail\n            self.tail.next = node\n            self.tail = node\n    \n    def delete(self, value):\n        current = self.head\n        while current:\n            if current.value == value:\n                if current.prev:\n                    current.prev.next = current.next\n                else:\n                    self.head = current.next\n                if current.next:\n                    current.next.prev = current.prev\n                else:\n                    self.tail = current.prev\n                return True\n            current = current.next\n        return False\n    \n    def to_list(self):\n        result = []\n        current = self.head\n        while current:\n            result.append(current.value)\n            current = current.next\n        return result',
    testCases: [
    ],
    hints: ['Track both head and tail pointers', 'Update both prev and next when deleting'],
    language: 'python'
  },
  {
    id: 'cs104-t1-ex08',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'LRU Cache Implementation',
    difficulty: 5,
    description: 'Implement an LRU (Least Recently Used) cache using a hash map and doubly linked list. Support get() and put() in O(1) time.',
    starterCode: 'class LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        # Your code here\n    \n    def get(self, key):\n        # Return -1 if not found\n        pass\n    \n    def put(self, key, value):\n        # Evict LRU if at capacity\n        pass\n\ncache = LRUCache(2)\ncache.put(1, 1)\ncache.put(2, 2)\nprint(cache.get(1))\ncache.put(3, 3)  # evicts key 2\nprint(cache.get(2))',
    solution: 'class Node:\n    def __init__(self, key, value):\n        self.key = key\n        self.value = value\n        self.prev = None\n        self.next = None\n\nclass LRUCache:\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.cache = {}\n        self.head = Node(0, 0)\n        self.tail = Node(0, 0)\n        self.head.next = self.tail\n        self.tail.prev = self.head\n    \n    def _remove(self, node):\n        node.prev.next = node.next\n        node.next.prev = node.prev\n    \n    def _add_to_front(self, node):\n        node.next = self.head.next\n        node.prev = self.head\n        self.head.next.prev = node\n        self.head.next = node\n    \n    def get(self, key):\n        if key in self.cache:\n            node = self.cache[key]\n            self._remove(node)\n            self._add_to_front(node)\n            return node.value\n        return -1\n    \n    def put(self, key, value):\n        if key in self.cache:\n            self._remove(self.cache[key])\n        node = Node(key, value)\n        self._add_to_front(node)\n        self.cache[key] = node\n        if len(self.cache) > self.capacity:\n            lru = self.tail.prev\n            self._remove(lru)\n            del self.cache[lru.key]\n\ncache = LRUCache(2)\ncache.put(1, 1)\ncache.put(2, 2)\nprint(cache.get(1))\ncache.put(3, 3)\nprint(cache.get(2))',
    testCases: [
    ],
    hints: ['Use dummy head/tail nodes to avoid edge cases', 'HashMap stores key -> Node for O(1) lookup', 'Move accessed nodes to front'],
    language: 'python'
  }
];
