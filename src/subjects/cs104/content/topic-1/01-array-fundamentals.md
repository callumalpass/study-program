---
id: cs104-t1-arrays
title: "Array Fundamentals"
order: 1
---

# Array Fundamentals

Arrays are the most fundamental data structure in computer science, providing a way to store collections of elements in contiguous memory locations. Understanding arrays deeply is essential as they form the basis for many other data structures.

## Memory Layout and Organization

An array stores elements sequentially in memory, with each element occupying a fixed amount of space determined by its data type. This contiguous layout enables one of arrays' most powerful features: constant-time random access.

When you declare an array, the system allocates a block of memory large enough to hold all elements. The memory address of any element can be calculated using a simple formula:

```
element_address = base_address + (index × element_size)
```

For example, if an integer array starts at memory address 1000 and each integer occupies 4 bytes:
- Element at index 0: 1000 + (0 × 4) = 1000
- Element at index 1: 1000 + (1 × 4) = 1004
- Element at index 2: 1000 + (2 × 4) = 1008

This arithmetic calculation happens in constant time, regardless of the array size, which is why array access is O(1).

## Static vs Dynamic Arrays

**Static arrays** have a fixed size determined at creation time. In languages like C, you must specify the array size:

```c
int numbers[100];  // Fixed size of 100 integers
```

Static arrays cannot grow or shrink after creation. If you need more space, you must create a new, larger array and copy elements over.

**Dynamic arrays** (like Python lists, Java ArrayList, or C++ vector) automatically resize when needed. They typically:
1. Start with an initial capacity
2. When full, allocate a new array (usually 2x the size)
3. Copy existing elements to the new array
4. Free the old array

```python
# Python lists are dynamic arrays
numbers = []  # Starts empty
for i in range(1000):
    numbers.append(i)  # Automatically resizes as needed
```

## Time Complexity Analysis

Understanding array operations' time complexities is crucial for algorithm design:

| Operation | Time Complexity | Explanation |
|-----------|-----------------|-------------|
| Access by index | O(1) | Direct memory calculation |
| Search (unsorted) | O(n) | Must check each element |
| Search (sorted) | O(log n) | Binary search |
| Insert at end | O(1) amortized | May trigger resize |
| Insert at start | O(n) | Must shift all elements |
| Insert at middle | O(n) | Must shift elements after |
| Delete at end | O(1) | Just decrement size |
| Delete at start | O(n) | Must shift all elements |
| Delete at middle | O(n) | Must shift elements after |

The "amortized O(1)" for end insertion means that while individual insertions might occasionally take O(n) time during resizing, the average cost over many insertions is O(1).

## Cache Efficiency and Locality

Arrays excel at cache efficiency due to **spatial locality**. Modern CPUs don't fetch individual bytes from memory; they fetch entire cache lines (typically 64 bytes). When you access an array element, neighboring elements are also loaded into cache.

```python
# Good cache usage - sequential access
total = 0
for i in range(len(arr)):
    total += arr[i]  # Adjacent elements already in cache

# Poor cache usage - random access
total = 0
for i in random_indices:
    total += arr[i]  # May cause cache misses
```

This cache-friendly behavior makes arrays significantly faster in practice than their theoretical complexity might suggest, especially compared to linked structures with scattered memory locations.

## Multi-dimensional Arrays

Arrays can have multiple dimensions, commonly used for matrices, images, and tables:

```python
# 2D array (matrix)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# Access element at row 1, column 2
element = matrix[1][2]  # Returns 6
```

**Row-major vs Column-major order**: Different languages store 2D arrays differently in memory:
- **Row-major** (C, Python): Elements of each row are contiguous
- **Column-major** (Fortran, MATLAB): Elements of each column are contiguous

For optimal performance, iterate in the order that matches your language's memory layout.

## Common Pitfalls

1. **Index out of bounds**: Accessing index >= length or < 0
2. **Off-by-one errors**: Common in loop bounds
3. **Forgetting arrays are zero-indexed**: First element is at index 0
4. **Modifying array while iterating**: Can skip elements or cause infinite loops
5. **Shallow vs deep copying**: Arrays of objects may share references

## Practical Applications

Arrays are ubiquitous in programming:
- **Buffers**: Storing incoming network packets or file data
- **Lookup tables**: Pre-computed values for fast access
- **Strings**: Often implemented as character arrays
- **Stacks/queues**: Can be implemented using arrays
- **Hash tables**: Arrays of buckets for O(1) average lookup

Understanding arrays deeply provides the foundation for mastering more complex data structures built upon them.
