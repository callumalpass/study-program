---
id: cs104-t1-applications
title: "Practical Applications"
order: 7
---

# Practical Applications and Classic Problems

Arrays and linked lists form the foundation of countless algorithms and data structures. This section explores practical applications and classic problems that demonstrate their real-world utility.

## Classic Linked List Problems

### 1. Reversing a Linked List
One of the most fundamental linked list operations:

```python
def reverse_iterative(head):
    prev = None
    current = head
    while current:
        next_node = current.next  # Save next
        current.next = prev       # Reverse pointer
        prev = current            # Move prev forward
        current = next_node       # Move current forward
    return prev  # New head

def reverse_recursive(head):
    if not head or not head.next:
        return head
    new_head = reverse_recursive(head.next)
    head.next.next = head
    head.next = None
    return new_head
```

### 2. Finding the Middle Node
Using the slow/fast pointer technique:

```python
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # Middle node
```

This technique is crucial for:
- Merge sort on linked lists
- Palindrome checking
- Finding the kth element from end

### 3. Detecting and Removing Cycles
Floyd's cycle detection followed by cycle removal:

```python
def detect_and_remove_cycle(head):
    slow = fast = head

    # Detect cycle
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return False  # No cycle

    # Find cycle start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next

    # Remove cycle (find node before cycle start)
    while fast.next != slow:
        fast = fast.next
    fast.next = None
    return True
```

### 4. Merging Two Sorted Lists
Essential for merge sort:

```python
def merge_sorted(l1, l2):
    dummy = Node(0)
    current = dummy

    while l1 and l2:
        if l1.data <= l2.data:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next

    current.next = l1 or l2
    return dummy.next
```

## Array-Based Problems

### 1. Two Sum
Find two elements that sum to target:

```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

### 2. Sliding Window Maximum
Find maximum in each window of size k:

```python
from collections import deque

def max_sliding_window(nums, k):
    result = []
    dq = deque()  # Store indices

    for i, num in enumerate(nums):
        # Remove elements outside window
        while dq and dq[0] <= i - k:
            dq.popleft()

        # Remove smaller elements
        while dq and nums[dq[-1]] < num:
            dq.pop()

        dq.append(i)

        if i >= k - 1:
            result.append(nums[dq[0]])

    return result
```

### 3. Rotate Array
Rotate array by k positions:

```python
def rotate(nums, k):
    n = len(nums)
    k = k % n

    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1

    reverse(0, n - 1)     # Reverse all
    reverse(0, k - 1)     # Reverse first k
    reverse(k, n - 1)     # Reverse rest
```

## Real-World Applications

### Memory Allocators
Operating systems use linked lists for free memory blocks:

```python
class MemoryBlock:
    def __init__(self, start, size):
        self.start = start
        self.size = size
        self.next = None

class FreeList:
    def __init__(self, total_size):
        self.head = MemoryBlock(0, total_size)

    def allocate(self, size):
        prev = None
        current = self.head
        while current:
            if current.size >= size:
                # Found suitable block
                allocated_start = current.start
                if current.size > size:
                    current.start += size
                    current.size -= size
                else:
                    # Remove block entirely
                    if prev:
                        prev.next = current.next
                    else:
                        self.head = current.next
                return allocated_start
            prev = current
            current = current.next
        return None  # Out of memory
```

### Browser History
Implementing back/forward navigation:

```python
class BrowserHistory:
    def __init__(self, homepage):
        self.current = Node(homepage)

    def visit(self, url):
        new_page = Node(url)
        new_page.prev = self.current
        self.current.next = new_page
        self.current = new_page

    def back(self, steps):
        while steps > 0 and self.current.prev:
            self.current = self.current.prev
            steps -= 1
        return self.current.url

    def forward(self, steps):
        while steps > 0 and self.current.next:
            self.current = self.current.next
            steps -= 1
        return self.current.url
```

### Polynomial Representation
Sparse polynomials are efficiently stored as linked lists:

```python
class PolyTerm:
    def __init__(self, coeff, exp):
        self.coeff = coeff
        self.exp = exp
        self.next = None

def add_polynomials(p1, p2):
    dummy = PolyTerm(0, 0)
    current = dummy

    while p1 and p2:
        if p1.exp > p2.exp:
            current.next = PolyTerm(p1.coeff, p1.exp)
            p1 = p1.next
        elif p2.exp > p1.exp:
            current.next = PolyTerm(p2.coeff, p2.exp)
            p2 = p2.next
        else:
            sum_coeff = p1.coeff + p2.coeff
            if sum_coeff != 0:
                current.next = PolyTerm(sum_coeff, p1.exp)
            p1, p2 = p1.next, p2.next
        if current.next:
            current = current.next

    current.next = p1 or p2
    return dummy.next
```

### Image Processing with 2D Arrays
```python
def rotate_image_90(matrix):
    n = len(matrix)
    # Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Reverse each row
    for row in matrix:
        row.reverse()

def apply_kernel(image, kernel):
    """Convolution operation for filtering"""
    h, w = len(image), len(image[0])
    k = len(kernel)
    offset = k // 2
    result = [[0] * w for _ in range(h)]

    for i in range(offset, h - offset):
        for j in range(offset, w - offset):
            total = 0
            for ki in range(k):
                for kj in range(k):
                    total += image[i + ki - offset][j + kj - offset] * kernel[ki][kj]
            result[i][j] = total
    return result
```

## Summary

Understanding these classic problems and applications builds intuition for when to apply arrays versus linked lists. The key is recognizing patterns:
- **Two-pointer techniques** work brilliantly on both structures
- **In-place algorithms** often prefer arrays
- **Dynamic structures** often prefer linked lists
- **Real-world systems** frequently combine multiple data structures

Mastering these foundations prepares you for more complex data structures and algorithms built upon them.
