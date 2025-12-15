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
    ],
    hints: ['Use monotonic decreasing stack', 'Stack stores indices, not temperatures', 'Pop and calculate difference when finding warmer day'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex09',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Simplify Path',
    difficulty: 2,
    description: 'Given an absolute Unix path, simplify it. Handle "." (current dir), ".." (parent dir), multiple slashes, and trailing slashes.',
    starterCode: 'def simplify_path(path):\n    # Return canonical path\n    pass\n\nprint(simplify_path("/home//foo/"))\nprint(simplify_path("/a/./b/../../c/"))',
    solution: 'def simplify_path(path):\n    stack = []\n    parts = path.split("/")\n    \n    for part in parts:\n        if part == "..":\n            if stack:\n                stack.pop()\n        elif part and part != ".":\n            stack.append(part)\n    \n    return "/" + "/".join(stack)\n\nprint(simplify_path("/home//foo/"))\nprint(simplify_path("/a/./b/../../c/"))',
    testCases: [],
    hints: ['Split path by "/" to get components', 'Use stack: push directories, pop on ".."', 'Ignore empty strings and "."'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex10',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Largest Rectangle in Histogram',
    difficulty: 5,
    description: 'Given an array of heights representing a histogram, find the area of the largest rectangle that can be formed.',
    starterCode: 'def largest_rectangle_area(heights):\n    # Return max area\n    pass\n\nprint(largest_rectangle_area([2, 1, 5, 6, 2, 3]))',
    solution: 'def largest_rectangle_area(heights):\n    stack = []  # Store indices\n    max_area = 0\n    \n    for i, h in enumerate(heights):\n        start = i\n        while stack and stack[-1][1] > h:\n            idx, height = stack.pop()\n            max_area = max(max_area, height * (i - idx))\n            start = idx\n        stack.append((start, h))\n    \n    # Process remaining bars\n    for idx, height in stack:\n        max_area = max(max_area, height * (len(heights) - idx))\n    \n    return max_area\n\nprint(largest_rectangle_area([2, 1, 5, 6, 2, 3]))',
    testCases: [],
    hints: ['Use monotonic increasing stack', 'When popping, calculate area with popped height', 'Track start index for each bar in rectangle'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex11',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Basic Calculator',
    difficulty: 4,
    description: 'Implement a basic calculator to evaluate a string expression with +, -, parentheses, and spaces. E.g., "(1+(4+5+2)-3)+(6+8)"',
    starterCode: 'def calculate(s):\n    # Return result\n    pass\n\nprint(calculate("(1+(4+5+2)-3)+(6+8)"))',
    solution: 'def calculate(s):\n    stack = []\n    num = 0\n    sign = 1\n    result = 0\n    \n    for char in s:\n        if char.isdigit():\n            num = num * 10 + int(char)\n        elif char == "+":\n            result += sign * num\n            num = 0\n            sign = 1\n        elif char == "-":\n            result += sign * num\n            num = 0\n            sign = -1\n        elif char == "(":\n            stack.append(result)\n            stack.append(sign)\n            result = 0\n            sign = 1\n        elif char == ")":\n            result += sign * num\n            num = 0\n            result *= stack.pop()  # sign before parenthesis\n            result += stack.pop()  # result before parenthesis\n    \n    return result + sign * num\n\nprint(calculate("(1+(4+5+2)-3)+(6+8)"))',
    testCases: [],
    hints: ['Track current number, sign, and running result', 'On "(", push result and sign to stack', 'On ")", apply saved sign and add to saved result'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex12',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Decode String',
    difficulty: 3,
    description: 'Decode an encoded string. The encoding rule is: k[encoded_string], where k copies of encoded_string are produced. E.g., "3[a2[c]]" = "accaccacc"',
    starterCode: 'def decode_string(s):\n    # Return decoded string\n    pass\n\nprint(decode_string("3[a2[c]]"))\nprint(decode_string("2[abc]3[cd]ef"))',
    solution: 'def decode_string(s):\n    stack = []\n    current_string = ""\n    current_num = 0\n    \n    for char in s:\n        if char.isdigit():\n            current_num = current_num * 10 + int(char)\n        elif char == "[":\n            stack.append((current_string, current_num))\n            current_string = ""\n            current_num = 0\n        elif char == "]":\n            prev_string, num = stack.pop()\n            current_string = prev_string + current_string * num\n        else:\n            current_string += char\n    \n    return current_string\n\nprint(decode_string("3[a2[c]]"))\nprint(decode_string("2[abc]3[cd]ef"))',
    testCases: [],
    hints: ['Use stack to handle nested brackets', 'On "[", push current string and multiplier', 'On "]", pop and repeat current string'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex13',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Remove All Adjacent Duplicates',
    difficulty: 2,
    description: 'Remove all adjacent duplicates in a string repeatedly until no more duplicates exist. E.g., "abbaca" → "ca"',
    starterCode: 'def remove_duplicates(s):\n    # Return string with no adjacent duplicates\n    pass\n\nprint(remove_duplicates("abbaca"))',
    solution: 'def remove_duplicates(s):\n    stack = []\n    for char in s:\n        if stack and stack[-1] == char:\n            stack.pop()\n        else:\n            stack.append(char)\n    return "".join(stack)\n\nprint(remove_duplicates("abbaca"))',
    testCases: [],
    hints: ['Use a stack to build result', 'If top of stack matches current char, pop', 'Otherwise push current char'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex14',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Next Greater Element',
    difficulty: 3,
    description: 'Given a circular array, return the next greater element for each element. The next greater element is the first greater number to its right (wrapping around).',
    starterCode: 'def next_greater_elements(nums):\n    # Return list where result[i] is next greater element, or -1\n    pass\n\nprint(next_greater_elements([1, 2, 1]))',
    solution: 'def next_greater_elements(nums):\n    n = len(nums)\n    result = [-1] * n\n    stack = []  # Store indices\n    \n    # Process array twice for circular behavior\n    for i in range(2 * n):\n        idx = i % n\n        while stack and nums[stack[-1]] < nums[idx]:\n            result[stack.pop()] = nums[idx]\n        if i < n:\n            stack.append(idx)\n    \n    return result\n\nprint(next_greater_elements([1, 2, 1]))',
    testCases: [],
    hints: ['Use monotonic decreasing stack', 'Process array twice for circular behavior', 'Only push indices in first pass'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex15',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Implement Deque',
    difficulty: 2,
    description: 'Implement a double-ended queue with append_left, append_right, pop_left, pop_right operations. All should be O(1).',
    starterCode: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.prev = None\n        self.next = None\n\nclass Deque:\n    def __init__(self):\n        pass\n    \n    def append_left(self, value):\n        pass\n    \n    def append_right(self, value):\n        pass\n    \n    def pop_left(self):\n        pass\n    \n    def pop_right(self):\n        pass\n    \n    def is_empty(self):\n        pass',
    solution: 'class Node:\n    def __init__(self, value):\n        self.value = value\n        self.prev = None\n        self.next = None\n\nclass Deque:\n    def __init__(self):\n        self.head = Node(0)  # Dummy head\n        self.tail = Node(0)  # Dummy tail\n        self.head.next = self.tail\n        self.tail.prev = self.head\n        self.size = 0\n    \n    def append_left(self, value):\n        node = Node(value)\n        node.next = self.head.next\n        node.prev = self.head\n        self.head.next.prev = node\n        self.head.next = node\n        self.size += 1\n    \n    def append_right(self, value):\n        node = Node(value)\n        node.prev = self.tail.prev\n        node.next = self.tail\n        self.tail.prev.next = node\n        self.tail.prev = node\n        self.size += 1\n    \n    def pop_left(self):\n        if self.is_empty():\n            return None\n        node = self.head.next\n        self.head.next = node.next\n        node.next.prev = self.head\n        self.size -= 1\n        return node.value\n    \n    def pop_right(self):\n        if self.is_empty():\n            return None\n        node = self.tail.prev\n        self.tail.prev = node.prev\n        node.prev.next = self.tail\n        self.size -= 1\n        return node.value\n    \n    def is_empty(self):\n        return self.size == 0',
    testCases: [],
    hints: ['Use doubly linked list with dummy head and tail', 'Dummy nodes eliminate edge cases', 'Track size for O(1) isEmpty check'],
    language: 'python'
  },
  {
    id: 'cs104-t2-ex16',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Asteroid Collision',
    difficulty: 3,
    description: 'Given an array of asteroids where positive means moving right and negative means moving left, simulate collisions. When two asteroids meet, the smaller one explodes. Same size = both explode.',
    starterCode: 'def asteroid_collision(asteroids):\n    # Return surviving asteroids\n    pass\n\nprint(asteroid_collision([5, 10, -5]))\nprint(asteroid_collision([8, -8]))\nprint(asteroid_collision([10, 2, -5]))',
    solution: 'def asteroid_collision(asteroids):\n    stack = []\n    \n    for asteroid in asteroids:\n        # Handle collision: only when stack has positive and current is negative\n        while stack and stack[-1] > 0 and asteroid < 0:\n            if stack[-1] < -asteroid:\n                stack.pop()\n                continue\n            elif stack[-1] == -asteroid:\n                stack.pop()\n            break\n        else:\n            stack.append(asteroid)\n    \n    return stack\n\nprint(asteroid_collision([5, 10, -5]))\nprint(asteroid_collision([8, -8]))\nprint(asteroid_collision([10, 2, -5]))',
    testCases: [],
    hints: ['Collision only when positive asteroid meets negative', 'Use stack to track surviving asteroids', 'Handle all three cases: first wins, second wins, both explode'],
    language: 'python'
  }
];
