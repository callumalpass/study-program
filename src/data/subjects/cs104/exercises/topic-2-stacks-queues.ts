import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs104-exercise-2',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Implement a Stack using Queues',
    difficulty: 3,
    description: 'Implement a stack using only queue operations (enqueue and dequeue). Your stack should support push, pop, and top operations.',
    language: 'python',
    starterCode: 'from collections import deque\n\nclass Stack:\n    def __init__(self):\n        self.queue = deque()\n    \n    def push(self, x):\n        # Your code here\n        pass\n    \n    def pop(self):\n        # Your code here\n        pass\n    \n    def top(self):\n        # Your code here\n        pass',
    testCases: [
      { input: 'push(1), push(2), top()', expectedOutput: '2', isHidden: false, description: 'Top returns most recent element' },
      { input: 'push(1), push(2), pop(), top()', expectedOutput: '1', isHidden: false, description: 'Pop removes top element' },
      { input: 'push(3), push(5), push(7), pop(), pop(), top()', expectedOutput: '3', isHidden: true, description: 'Multiple operations' }
    ],
    hints: ['After adding a new element, rotate the queue to make it the front', 'Use queue size to determine how many rotations are needed', 'The most recently added element should always be at the front'],
    solution: 'from collections import deque\n\nclass Stack:\n    def __init__(self):\n        self.queue = deque()\n    \n    def push(self, x):\n        self.queue.append(x)\n        for _ in range(len(self.queue) - 1):\n            self.queue.append(self.queue.popleft())\n    \n    def pop(self):\n        return self.queue.popleft()\n    \n    def top(self):\n        return self.queue[0]'
  },
  {
    id: 'cs104-t2-ex02',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Valid Parentheses',
    difficulty: 1,
    description: 'Given a string containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. Brackets must close in the correct order.',
    starterCode: 'def is_valid(s):\n    # Your code here\n    pass\n\nprint(is_valid("()[]{}"))\nprint(is_valid("([)]"))',
    solution: 'def is_valid(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    \n    for char in s:\n        if char in mapping:\n            if not stack or stack.pop() != mapping[char]:\n                return False\n        else:\n            stack.append(char)\n    \n    return len(stack) == 0\n\nprint(is_valid("()[]{}"))\nprint(is_valid("([)]"))',
    testCases: [
      { input: '"()[]{}"', expectedOutput: 'True', isHidden: false, description: 'Valid brackets' },
      { input: '"([)]"', expectedOutput: 'False', isHidden: false, description: 'Invalid order' },
      { input: '"((("', expectedOutput: 'False', isHidden: true, description: 'Unclosed brackets' }
    ],
    hints: ['Use a stack to track opening brackets', 'When you see a closing bracket, check if it matches the top of the stack'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex03',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Implement Queue using Stacks',
    difficulty: 2,
    description: 'Implement a queue using only stack operations. Support enqueue, dequeue, and front operations.',
    starterCode: 'class Queue:\n    def __init__(self):\n        self.stack1 = []\n        self.stack2 = []\n    \n    def enqueue(self, x):\n        pass\n    \n    def dequeue(self):\n        pass\n    \n    def front(self):\n        pass',
    solution: 'class Queue:\n    def __init__(self):\n        self.stack1 = []  # For push\n        self.stack2 = []  # For pop\n    \n    def enqueue(self, x):\n        self.stack1.append(x)\n    \n    def dequeue(self):\n        if not self.stack2:\n            while self.stack1:\n                self.stack2.append(self.stack1.pop())\n        return self.stack2.pop()\n    \n    def front(self):\n        if not self.stack2:\n            while self.stack1:\n                self.stack2.append(self.stack1.pop())\n        return self.stack2[-1]',
    testCases: [
      { input: 'q.enqueue(1); q.enqueue(2); q.dequeue()', expectedOutput: '1', isHidden: false, description: 'FIFO order' },
      { input: 'q.enqueue(1); q.enqueue(2); q.front()', expectedOutput: '1', isHidden: true, description: 'Front returns first' }
    ],
    hints: ['Use two stacks', 'Only transfer from stack1 to stack2 when stack2 is empty'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex04',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Min Stack',
    difficulty: 2,
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.',
    starterCode: 'class MinStack:\n    def __init__(self):\n        pass\n    \n    def push(self, val):\n        pass\n    \n    def pop(self):\n        pass\n    \n    def top(self):\n        pass\n    \n    def get_min(self):\n        pass\n\nms = MinStack()\nms.push(3)\nms.push(1)\nms.push(2)\nprint(ms.get_min())',
    solution: 'class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n    \n    def push(self, val):\n        self.stack.append(val)\n        if not self.min_stack or val <= self.min_stack[-1]:\n            self.min_stack.append(val)\n    \n    def pop(self):\n        if self.stack.pop() == self.min_stack[-1]:\n            self.min_stack.pop()\n    \n    def top(self):\n        return self.stack[-1]\n    \n    def get_min(self):\n        return self.min_stack[-1]\n\nms = MinStack()\nms.push(3)\nms.push(1)\nms.push(2)\nprint(ms.get_min())',
    testCases: [
      { input: 'push 3,1,2; get_min()', expectedOutput: '1', isHidden: false, description: 'Get minimum' },
      { input: 'push 3,1,2; pop(); get_min()', expectedOutput: '1', isHidden: true, description: 'Min after pop' }
    ],
    hints: ['Use a secondary stack to track minimums', 'Push to min stack when value <= current min'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex05',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 3,
    description: 'Evaluate an expression in Reverse Polish Notation (postfix). Valid operators are +, -, *, /. Division truncates toward zero.',
    starterCode: 'def eval_rpn(tokens):\n    # Your code here\n    pass\n\nprint(eval_rpn(["2", "1", "+", "3", "*"]))\nprint(eval_rpn(["4", "13", "5", "/", "+"]))',
    solution: 'def eval_rpn(tokens):\n    stack = []\n    operators = {\n        "+": lambda a, b: a + b,\n        "-": lambda a, b: a - b,\n        "*": lambda a, b: a * b,\n        "/": lambda a, b: int(a / b)\n    }\n    \n    for token in tokens:\n        if token in operators:\n            b = stack.pop()\n            a = stack.pop()\n            stack.append(operators[token](a, b))\n        else:\n            stack.append(int(token))\n    \n    return stack[0]\n\nprint(eval_rpn(["2", "1", "+", "3", "*"]))\nprint(eval_rpn(["4", "13", "5", "/", "+"]))',
    testCases: [
      { input: '["2", "1", "+", "3", "*"]', expectedOutput: '9', isHidden: false, description: '(2+1)*3' },
      { input: '["4", "13", "5", "/", "+"]', expectedOutput: '6', isHidden: true, description: '4+(13/5)' }
    ],
    hints: ['Push numbers onto stack', 'Pop two operands for each operator', 'Order matters: second popped is left operand'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex06',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Sliding Window Maximum',
    difficulty: 4,
    description: 'Given an array and a window size k, return the maximum value in each sliding window. Use a deque for O(n) solution.',
    starterCode: 'from collections import deque\n\ndef max_sliding_window(nums, k):\n    # Your code here\n    pass\n\nprint(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))',
    solution: 'from collections import deque\n\ndef max_sliding_window(nums, k):\n    result = []\n    dq = deque()  # Store indices, maintain decreasing order of values\n    \n    for i, num in enumerate(nums):\n        # Remove indices outside window\n        while dq and dq[0] < i - k + 1:\n            dq.popleft()\n        \n        # Remove smaller elements (they can never be max)\n        while dq and nums[dq[-1]] < num:\n            dq.pop()\n        \n        dq.append(i)\n        \n        # Start adding to result once window is full\n        if i >= k - 1:\n            result.append(nums[dq[0]])\n    \n    return result\n\nprint(max_sliding_window([1,3,-1,-3,5,3,6,7], 3))',
    testCases: [
      { input: '[1,3,-1,-3,5,3,6,7], k=3', expectedOutput: '[3, 3, 5, 5, 6, 7]', isHidden: false, description: 'Sliding window max' },
      { input: '[1], k=1', expectedOutput: '[1]', isHidden: true, description: 'Single element' }
    ],
    hints: ['Use deque to store indices, not values', 'Keep deque in decreasing order of values', 'Front of deque is always current max'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex07',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Circular Queue',
    difficulty: 3,
    description: 'Design a circular queue with fixed capacity. Implement enqueue, dequeue, front, rear, isEmpty, and isFull.',
    starterCode: 'class CircularQueue:\n    def __init__(self, k):\n        self.capacity = k\n        # Your code here\n    \n    def enqueue(self, value):\n        pass\n    \n    def dequeue(self):\n        pass\n    \n    def front(self):\n        pass\n    \n    def rear(self):\n        pass\n    \n    def is_empty(self):\n        pass\n    \n    def is_full(self):\n        pass',
    solution: 'class CircularQueue:\n    def __init__(self, k):\n        self.capacity = k\n        self.queue = [None] * k\n        self.head = 0\n        self.tail = -1\n        self.size = 0\n    \n    def enqueue(self, value):\n        if self.is_full():\n            return False\n        self.tail = (self.tail + 1) % self.capacity\n        self.queue[self.tail] = value\n        self.size += 1\n        return True\n    \n    def dequeue(self):\n        if self.is_empty():\n            return False\n        self.head = (self.head + 1) % self.capacity\n        self.size -= 1\n        return True\n    \n    def front(self):\n        return -1 if self.is_empty() else self.queue[self.head]\n    \n    def rear(self):\n        return -1 if self.is_empty() else self.queue[self.tail]\n    \n    def is_empty(self):\n        return self.size == 0\n    \n    def is_full(self):\n        return self.size == self.capacity',
    testCases: [
      { input: 'cq(3); enqueue(1,2,3); dequeue(); enqueue(4); rear()', expectedOutput: '4', isHidden: false, description: 'Circular behavior' },
      { input: 'cq(2); enqueue(1,2); is_full()', expectedOutput: 'True', isHidden: true, description: 'Full check' }
    ],
    hints: ['Use modulo for circular indexing', 'Track size separately for isEmpty/isFull'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex08',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Daily Temperatures',
    difficulty: 4,
    description: 'Given daily temperatures, return how many days you have to wait until a warmer temperature. Use a monotonic stack.',
    starterCode: 'def daily_temperatures(temperatures):\n    # Return list of days until warmer temp\n    pass\n\nprint(daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73]))',
    solution: 'def daily_temperatures(temperatures):\n    n = len(temperatures)\n    result = [0] * n\n    stack = []  # Store indices\n    \n    for i, temp in enumerate(temperatures):\n        while stack and temperatures[stack[-1]] < temp:\n            prev_idx = stack.pop()\n            result[prev_idx] = i - prev_idx\n        stack.append(i)\n    \n    return result\n\nprint(daily_temperatures([73, 74, 75, 71, 69, 72, 76, 73]))',
    testCases: [
      { input: '[73, 74, 75, 71, 69, 72, 76, 73]', expectedOutput: '[1, 1, 4, 2, 1, 1, 0, 0]', isHidden: false, description: 'Days until warmer' },
      { input: '[30, 40, 50, 60]', expectedOutput: '[1, 1, 1, 0]', isHidden: true, description: 'Increasing temps' }
    ],
    hints: ['Use monotonic decreasing stack', 'Stack stores indices, not temperatures', 'Pop and calculate difference when finding warmer day'],
    language: 'python'
  }
];
