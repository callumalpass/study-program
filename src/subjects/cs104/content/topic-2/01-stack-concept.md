# The Stack Concept: LIFO Principle

A stack is an abstract data type that follows the Last-In-First-Out (LIFO) principle. The last element added is the first one to be removed, like a stack of plates where you can only add or remove from the top.

## Core Operations

Every stack implementation must support these fundamental operations:

```python
class Stack:
    def push(self, item):
        """Add item to the top of the stack"""
        pass

    def pop(self):
        """Remove and return the top item"""
        pass

    def peek(self):
        """Return top item without removing it"""
        pass

    def is_empty(self):
        """Check if stack is empty"""
        pass

    def size(self):
        """Return number of items"""
        pass
```

All operations should be O(1) time complexity.

## The LIFO Mental Model

Visualize a stack like a vertical column where operations happen only at the top:

```
        push(40)         pop()
           ↓               ↑
        ┌────┐          ┌────┐
        │ 40 │ ← top    │    │
        ├────┤          ├────┤
        │ 30 │          │ 30 │ ← new top
        ├────┤          ├────┤
        │ 20 │          │ 20 │
        ├────┤          ├────┤
        │ 10 │          │ 10 │
        └────┘          └────┘
```

Key insight: You can only access the most recently added element.

## Real-World Stack Examples

1. **Stack of plates**: Take from top, add to top
2. **Browser back button**: Pages visited form a stack
3. **Undo in text editors**: Actions stored in a stack
4. **Book pile**: Most recent book on top

## The Call Stack

The most important stack in computing is the call stack, which manages function calls:

```python
def function_a():
    x = 10
    function_b()  # Push function_b onto call stack
    return x

def function_b():
    y = 20
    function_c()  # Push function_c onto call stack
    return y

def function_c():
    z = 30
    return z      # Pop function_c, return to function_b

function_a()      # Push function_a onto call stack
```

Call stack during execution:
```
Step 1: [function_a]
Step 2: [function_a, function_b]
Step 3: [function_a, function_b, function_c]
Step 4: [function_a, function_b]  (after function_c returns)
Step 5: [function_a]               (after function_b returns)
Step 6: []                         (after function_a returns)
```

Stack overflow occurs when too many functions are called (typically from infinite recursion).

## Stack Interface in Different Languages

**Python** (using list):
```python
stack = []
stack.append(1)    # push
stack.append(2)
top = stack[-1]    # peek
item = stack.pop() # pop
```

**Java**:
```java
Stack<Integer> stack = new Stack<>();
stack.push(1);
stack.push(2);
int top = stack.peek();
int item = stack.pop();
```

**C++**:
```cpp
stack<int> s;
s.push(1);
s.push(2);
int top = s.top();
s.pop();  // Note: returns void in C++
```

## Stack vs Other Data Structures

| Feature | Stack | Queue | Array | Linked List |
|---------|-------|-------|-------|-------------|
| Access pattern | LIFO (top only) | FIFO (front/rear) | Random | Sequential |
| Insertion | Top only (O(1)) | Rear only (O(1)) | Any (O(n) avg) | Any (O(n) avg) |
| Deletion | Top only (O(1)) | Front only (O(1)) | Any (O(n) avg) | Any (O(n) avg) |
| Primary use | Reversing, backtracking | Scheduling, BFS | General storage | Dynamic size |

## When to Use a Stack

**Use a stack when:**
- Order of processing is "last in, first out"
- You need to reverse a sequence
- Tracking state for backtracking (DFS, undo)
- Matching paired symbols (parentheses, tags)
- Managing function calls or recursion

**Don't use a stack when:**
- You need random access to elements
- Processing order is FIFO (use queue)
- You need to search for specific elements
- Elements need to be sorted

## Common Mistakes

1. **Popping from empty stack**: Always check `is_empty()` first
2. **Forgetting stack is LIFO**: Drawing diagrams helps
3. **Using list.pop(0) as stack**: That's a queue operation (O(n))
4. **Confusing peek and pop**: Peek doesn't remove the element
