## Slicing (Extracting Parts of a List)

Slicing uses `[start:end:step]` and creates a new list.

```python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

nums[2:5]   # [2, 3, 4]
nums[:3]    # [0, 1, 2]
nums[7:]    # [7, 8, 9]
nums[::2]   # [0, 2, 4, 6, 8]
nums[::-1]  # reversed list
```

---

## Aliasing vs Copying (A Common Bug)

Assigning a list to a new variable does **not** copy it:

```python
a = [1, 2, 3]
b = a        # b points to the same list
b.append(4)
print(a)     # [1, 2, 3, 4]
```

To copy:

```python
a = [1, 2, 3]
b = a[:]         # shallow copy
c = list(a)      # shallow copy
d = a.copy()     # shallow copy
```

---

## Shallow vs Deep Copies

A shallow copy copies the outer list, but inner lists are still shared:

```python
grid = [[0, 0], [0, 0]]
copy_grid = grid[:]

copy_grid[0][0] = 9
print(grid)  # [[9, 0], [0, 0]]  (surprise!)
```

For nested structures, you often need a deep copy (advanced):

```python
import copy
deep = copy.deepcopy(grid)
```

---

## Building 2D Lists Safely

Avoid this:

```python
# Bug: repeats the same inner list
grid = [[0] * 3] * 2
```

Prefer:

```python
grid = [[0] * 3 for _ in range(2)]
```

