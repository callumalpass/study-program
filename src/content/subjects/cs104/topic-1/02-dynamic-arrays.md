# Dynamic Arrays and Amortized Analysis

Dynamic arrays solve one of static arrays' biggest limitations: fixed size. They automatically grow (and sometimes shrink) to accommodate varying amounts of data while still providing O(1) random access.

## How Dynamic Arrays Work

A dynamic array maintains three key pieces of information:
1. **Data pointer**: Points to the underlying array storage
2. **Size (length)**: Number of elements currently stored
3. **Capacity**: Total number of elements the current storage can hold

```python
class DynamicArray:
    def __init__(self):
        self._data = [None] * 4  # Initial capacity of 4
        self._size = 0
        self._capacity = 4

    def __len__(self):
        return self._size

    def __getitem__(self, index):
        if index < 0 or index >= self._size:
            raise IndexError("Index out of range")
        return self._data[index]
```

## Growth Strategy

When a dynamic array reaches capacity, it must resize. The key question is: by how much?

**Doubling strategy (most common)**:
```python
def _resize(self, new_capacity):
    new_data = [None] * new_capacity
    for i in range(self._size):
        new_data[i] = self._data[i]
    self._data = new_data
    self._capacity = new_capacity

def append(self, element):
    if self._size == self._capacity:
        self._resize(2 * self._capacity)  # Double the capacity
    self._data[self._size] = element
    self._size += 1
```

Why doubling? The answer lies in amortized analysis.

## Amortized Analysis

Individual append operations may take O(n) time during resizing, but averaged over many operations, the cost is O(1). This is called **amortized O(1)**.

Consider appending n elements starting from capacity 1 with doubling:
- Resize at size 1: copy 1 element
- Resize at size 2: copy 2 elements
- Resize at size 4: copy 4 elements
- Resize at size 8: copy 8 elements
- ...and so on

Total copy operations: 1 + 2 + 4 + 8 + ... + n/2 = n - 1 ≈ O(n)

For n insertions, we do O(n) total work, so each insertion costs O(n)/n = O(1) amortized.

**Alternative growth factors**:
- **1.5x (Java ArrayList)**: Uses less memory, more frequent resizing
- **2x (Python list, C++ vector)**: Fewer resizes, more wasted space

The choice affects the space-time tradeoff:
- Larger factor: fewer resizes but more wasted space
- Smaller factor: more resizes but less wasted space

## Shrinking Strategy

Some implementations also shrink when the array becomes too empty:

```python
def remove(self, index):
    if index < 0 or index >= self._size:
        raise IndexError("Index out of range")

    # Shift elements left
    for i in range(index, self._size - 1):
        self._data[i] = self._data[i + 1]

    self._size -= 1

    # Shrink if too empty (e.g., 25% full)
    if self._size > 0 and self._size == self._capacity // 4:
        self._resize(self._capacity // 2)
```

Note: We don't shrink at 50% capacity (after doubling) because this would cause **thrashing** if we alternate between adding and removing at the boundary.

## Memory Allocation Patterns

Real-world implementations optimize memory allocation:

1. **Memory pools**: Pre-allocate chunks to reduce allocation overhead
2. **Small buffer optimization**: Store small arrays inline without separate allocation
3. **Alignment**: Ensure elements align with CPU word boundaries

## Comparison with Other Implementations

Different languages implement dynamic arrays differently:

| Language | Implementation | Growth Factor | Notes |
|----------|---------------|---------------|-------|
| Python | list | ~1.125 (varies) | Over-allocates slightly |
| Java | ArrayList | 1.5 | Explicit capacity management |
| C++ | vector | 2 (typical) | Can reserve capacity |
| JavaScript | Array | Implementation-dependent | Sparse array support |

## Performance Considerations

```python
# BAD: O(n²) - many resizes
result = []
for item in huge_list:
    result.append(process(item))

# BETTER: O(n) - pre-allocate if size is known
result = [None] * len(huge_list)
for i, item in enumerate(huge_list):
    result[i] = process(item)

# BEST: Use list comprehension (optimized internally)
result = [process(item) for item in huge_list]
```

When you know the final size, pre-allocating avoids all resize operations:

```python
# Java
ArrayList<Integer> list = new ArrayList<>(1000);  // Initial capacity

# C++
vector<int> vec;
vec.reserve(1000);  // Reserve capacity without changing size
```

## Practical Applications

Dynamic arrays are ideal when:
- You need random access by index
- Primarily appending to the end
- Size is unknown but elements are ordered
- Cache efficiency matters

They're less ideal when:
- Frequent insertions/deletions at the beginning or middle
- Memory is extremely constrained
- You need guaranteed O(1) worst-case (not amortized) operations
