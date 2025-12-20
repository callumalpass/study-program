---
id: cs104-t2-stack-concept
title: "Stack Concept"
order: 1
---

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

## Stack Terminology Across Languages

Different programming languages use different terminology for stack operations:

| Operation | Python (list) | Java | C++ | Description |
|-----------|--------------|------|-----|-------------|
| Add element | `append()` | `push()` | `push()` | Add to top |
| Remove element | `pop()` | `pop()` | `pop()` | Remove from top |
| View top | `[-1]` | `peek()` | `top()` | See without removing |
| Check empty | `not stack` | `isEmpty()` | `empty()` | Returns boolean |
| Get size | `len()` | `size()` | `size()` | Number of elements |

Note that C++'s `pop()` doesn't return the element—you must call `top()` first if you need the value.

## Stack Memory vs Heap Memory

It's important to distinguish the stack data structure from the memory concepts:

- **Stack data structure**: An abstract data type with LIFO behavior
- **Stack memory**: The region of memory used for function calls, local variables
- **Heap memory**: Dynamically allocated memory for objects with longer lifetimes

The call stack uses stack memory to store function activation records. When you call a function, a new frame is pushed; when the function returns, the frame is popped.

## Time and Space Complexity

| Operation | Time Complexity | Space Complexity |
|-----------|-----------------|------------------|
| Push | O(1) amortized | O(1) |
| Pop | O(1) | O(1) |
| Peek | O(1) | O(1) |
| Is Empty | O(1) | O(1) |
| Search | O(n) | O(1) |
| Size | O(1)* | O(1) |

*O(1) if size is tracked, O(n) if counting nodes

## Key Takeaways

- Stacks follow LIFO: Last In, First Out
- Core operations (push, pop, peek) should all be O(1)
- The call stack manages function execution in all programming languages
- Stacks are ideal for reversing sequences, matching brackets, and backtracking
- Choose between array-based (cache efficient) and linked list-based (guaranteed O(1)) implementations
- Always check if the stack is empty before popping to avoid runtime errors
