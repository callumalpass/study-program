# Stack Applications

Stacks are fundamental to many algorithms and applications. Their LIFO nature makes them perfect for problems involving reversal, matching, and backtracking.

## Parentheses Matching

A classic stack application: validating balanced brackets:

```python
def is_balanced(expression):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}

    for char in expression:
        if char in '([{':
            stack.append(char)
        elif char in ')]}':
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()

    return len(stack) == 0

# Examples
print(is_balanced("({[]})"))    # True
print(is_balanced("([)]"))      # False
print(is_balanced("(("))        # False
```

This pattern extends to HTML/XML tag matching, compiler syntax checking, and math expression validation.

## Expression Evaluation

### Infix to Postfix Conversion (Shunting-Yard Algorithm)

Convert `3 + 4 * 2` to `3 4 2 * +`:

```python
def infix_to_postfix(expression):
    precedence = {'+': 1, '-': 1, '*': 2, '/': 2, '^': 3}
    output = []
    operators = []

    for token in expression.split():
        if token.isdigit():
            output.append(token)
        elif token in precedence:
            while (operators and operators[-1] != '(' and
                   operators[-1] in precedence and
                   precedence[operators[-1]] >= precedence[token]):
                output.append(operators.pop())
            operators.append(token)
        elif token == '(':
            operators.append(token)
        elif token == ')':
            while operators and operators[-1] != '(':
                output.append(operators.pop())
            operators.pop()  # Remove '('

    while operators:
        output.append(operators.pop())

    return ' '.join(output)
```

### Postfix Expression Evaluation

```python
def evaluate_postfix(expression):
    stack = []

    for token in expression.split():
        if token.lstrip('-').isdigit():
            stack.append(int(token))
        else:
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            elif token == '/':
                stack.append(int(a / b))

    return stack[0]

# Evaluate: 3 4 2 * + = 3 + (4 * 2) = 11
print(evaluate_postfix("3 4 2 * +"))  # 11
```

## Undo/Redo Mechanism

Implementing editor undo/redo with two stacks:

```python
class TextEditor:
    def __init__(self):
        self.text = ""
        self.undo_stack = []
        self.redo_stack = []

    def type_text(self, chars):
        self.undo_stack.append(('delete', len(chars), self.text[-len(chars):] if len(self.text) >= len(chars) else self.text))
        self.text += chars
        self.redo_stack.clear()  # New action clears redo

    def delete(self, count):
        deleted = self.text[-count:]
        self.undo_stack.append(('insert', deleted))
        self.text = self.text[:-count]
        self.redo_stack.clear()

    def undo(self):
        if not self.undo_stack:
            return
        action = self.undo_stack.pop()
        if action[0] == 'delete':
            self.text = self.text[:-action[1]]
            self.redo_stack.append(('insert', action[2]))
        elif action[0] == 'insert':
            self.text += action[1]
            self.redo_stack.append(('delete', len(action[1])))

    def redo(self):
        if not self.redo_stack:
            return
        action = self.redo_stack.pop()
        if action[0] == 'insert':
            self.text += action[1]
            self.undo_stack.append(('delete', len(action[1])))
        elif action[0] == 'delete':
            self.text = self.text[:-action[1]]
            self.undo_stack.append(('insert', self.text[-action[1]:]))
```

## Browser History

Back/forward navigation using two stacks:

```python
class Browser:
    def __init__(self, homepage):
        self.current = homepage
        self.back_stack = []
        self.forward_stack = []

    def visit(self, url):
        self.back_stack.append(self.current)
        self.current = url
        self.forward_stack.clear()  # Clear forward history

    def back(self):
        if self.back_stack:
            self.forward_stack.append(self.current)
            self.current = self.back_stack.pop()
        return self.current

    def forward(self):
        if self.forward_stack:
            self.back_stack.append(self.current)
            self.current = self.forward_stack.pop()
        return self.current
```

## DFS and Backtracking

Stack-based depth-first search:

```python
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]

    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            print(node)
            # Add neighbors in reverse order for left-to-right traversal
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)

    return visited
```

## Monotonic Stack Problems

Finding the next greater element:

```python
def next_greater_element(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # Stack of indices

    for i in range(n):
        while stack and nums[stack[-1]] < nums[i]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)

    return result

# Example: [4, 5, 2, 25] → [5, 25, 25, -1]
```

This pattern solves many problems:
- Stock span problem
- Largest rectangle in histogram
- Trapping rain water

## Function Call Simulation

Converting recursion to iteration using explicit stack:

```python
# Recursive factorial
def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)

# Iterative with explicit stack
def factorial_iterative(n):
    stack = []
    result = 1

    # Push all values
    while n > 1:
        stack.append(n)
        n -= 1

    # Pop and multiply
    while stack:
        result *= stack.pop()

    return result
```

Converting recursive algorithms to iterative ones with stacks is essential for handling deep recursion without stack overflow.
