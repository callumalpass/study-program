## Common Mistakes (And How to Fix Them)

Control flow bugs are usually logic bugs: your code runs without errors, but it does the wrong thing. These are often harder to find than syntax errors. This section covers frequent mistakes and how to avoid them.

---

## Off-by-One Errors

One of the most common bugs in programming - being off by one in your ranges or comparisons.

### `range()` Doesn't Include the Stop Value

```python
# range(5) gives 0, 1, 2, 3, 4 - NOT 1, 2, 3, 4, 5
for i in range(5):
    print(i)
# Output: 0, 1, 2, 3, 4

# If you want 1 to 5:
for i in range(1, 6):  # 6, not 5!
    print(i)
# Output: 1, 2, 3, 4, 5
```

### Fence-Post Problems

```python
# Print numbers with commas between them
numbers = [1, 2, 3, 4, 5]

# Bug: extra comma at the end
for n in numbers:
    print(n, end=", ")
# Output: 1, 2, 3, 4, 5,

# Fix: use join
print(", ".join(str(n) for n in numbers))
# Output: 1, 2, 3, 4, 5

# Or handle first/last specially
for i, n in enumerate(numbers):
    if i > 0:
        print(", ", end="")
    print(n, end="")
```

### Comparison Boundaries

```python
# Is this checking 1-10 inclusive or not?
if 1 <= x <= 10:  # Inclusive: 1, 2, ..., 10
    pass

if 1 < x < 10:    # Exclusive: 2, 3, ..., 9
    pass

# Be explicit about boundaries in comments if it matters
# Valid ages: 0 to 120 inclusive
if 0 <= age <= 120:
    pass
```

---

## Modifying a List While Iterating

This often causes items to be skipped or infinite loops:

```python
# Bug: skips items when removing
numbers = [1, 2, 3, 4, 5, 6]
for n in numbers:
    if n % 2 == 0:
        numbers.remove(n)
print(numbers)  # [1, 3, 5] - seems right

# But try this:
numbers = [2, 4, 6, 8]
for n in numbers:
    if n % 2 == 0:
        numbers.remove(n)
print(numbers)  # [4, 8] - bug! Items were skipped
```

When you remove item at index 0, all items shift left. The loop then moves to index 1, which is now what was at index 2, skipping index 1.

### Safer Alternatives

```python
# Option 1: Iterate over a copy
numbers = [2, 4, 6, 8]
for n in numbers[:]:  # [:] creates a copy
    if n % 2 == 0:
        numbers.remove(n)
print(numbers)  # []

# Option 2: Build a new list (usually best)
numbers = [1, 2, 3, 4, 5, 6]
numbers = [n for n in numbers if n % 2 != 0]
print(numbers)  # [1, 3, 5]

# Option 3: Iterate backwards
numbers = [2, 4, 6, 8]
for i in range(len(numbers) - 1, -1, -1):
    if numbers[i] % 2 == 0:
        del numbers[i]
```

---

## Infinite Loops

### Forgetting to Update Loop Variable

```python
# Bug: n never changes
n = 5
while n > 0:
    print(n)
    # Missing: n -= 1
# Runs forever!

# Fix:
n = 5
while n > 0:
    print(n)
    n -= 1
```

### Condition Never Becomes False

```python
# Bug: wrong comparison direction
n = 5
while n > 0:
    print(n)
    n += 1  # Going the wrong way!
# Runs forever!

# Another bug: testing wrong variable
count = 5
index = 0
while count > 0:
    print(index)
    index += 1  # count never changes!
# Runs forever!
```

### Accidentally Resetting Inside Loop

```python
# Bug: resetting the counter inside the loop
while count < 10:
    count = 0  # Oops! This resets count every iteration
    # ... do stuff
    count += 1
```

---

## Overly Complex Conditions

Complex boolean expressions are hard to read and easy to get wrong:

```python
# Hard to read - what does this even check?
if age >= 18 and age < 65 and (is_employed or has_savings) and not is_student or is_veteran:
    print("Eligible")
```

### Break Into Named Variables

```python
is_working_age = 18 <= age < 65
is_financially_stable = is_employed or has_savings
is_regular_applicant = is_working_age and is_financially_stable and not is_student
is_eligible = is_regular_applicant or is_veteran

if is_eligible:
    print("Eligible")
```

This is:
- Easier to read
- Easier to debug (you can print intermediate values)
- Self-documenting

---

## Wrong Variable in Nested Loops

```python
# Bug: using wrong loop variable
for i in range(3):
    for j in range(3):
        print(f"({i},{i})")  # Bug! Should be (i,j)
```

### Solution: Use Meaningful Names

```python
# Clear names make bugs obvious
for row in range(3):
    for col in range(3):
        print(f"({row},{col})")
```

---

## Checking Equality Wrong

### Using `=` Instead of `==`

```python
# Python prevents this in conditions (SyntaxError)
# if x = 5:  # Error!

# But this is valid and might not do what you expect:
if (result := some_function()) == 5:  # Assignment expression
    pass
```

### Comparing to `True`/`False` Explicitly

```python
# Unnecessary - booleans are already True/False
if is_valid == True:   # Works but redundant
    pass

if is_valid == False:  # Works but redundant
    pass

# Better
if is_valid:
    pass

if not is_valid:
    pass
```

### Using `is` for Value Comparison

```python
# Bug: 'is' checks identity, not equality
x = 1000
y = 1000
if x is y:  # Might be False even though values are equal!
    pass

# Correct: use == for value comparison
if x == y:  # True
    pass

# 'is' is correct for None
if value is None:
    pass
```

---

## Best Practices

### 1. Prefer `for` Over `while` When Iterating

```python
# Prefer: cleaner and can't forget to increment
for i in range(10):
    print(i)

# Avoid when for works:
i = 0
while i < 10:
    print(i)
    i += 1
```

### 2. Use `while True` + `break` for Sentinel Loops

```python
# Clear pattern for "loop until exit condition"
while True:
    user_input = input("Command: ")
    if user_input == "quit":
        break
    process(user_input)
```

### 3. Keep Nesting Shallow

```python
# Deep nesting is hard to follow
if condition1:
    if condition2:
        if condition3:
            do_something()

# Better: use guard clauses
if not condition1:
    return
if not condition2:
    return
if not condition3:
    return
do_something()

# Or combine with and
if condition1 and condition2 and condition3:
    do_something()
```

### 4. Name Intermediate Boolean Expressions

```python
# Unclear
if (age >= 18 and age < 65) and (income > 30000 or has_assets):
    approve()

# Clear
is_adult = age >= 18
is_working_age = is_adult and age < 65
is_financially_qualified = income > 30000 or has_assets

if is_working_age and is_financially_qualified:
    approve()
```

### 5. Use `enumerate()` Instead of Manual Index Tracking

```python
# Avoid:
i = 0
for item in items:
    print(f"{i}: {item}")
    i += 1

# Prefer:
for i, item in enumerate(items):
    print(f"{i}: {item}")
```

### 6. Test Edge Cases

Always test your loops with:
- Empty collections
- Single-element collections
- Collections with duplicates
- Boundary values (0, negative numbers, maximum values)

---

## Key Takeaways

- Off-by-one errors are common - double-check range boundaries
- Never modify a list while iterating over it directly
- Every `while` loop must have a clear termination condition
- Break complex conditions into named boolean variables
- Use meaningful loop variable names to avoid confusion
- Use `for` when iterating over collections; `while` for unknown iterations
- Use `enumerate()` instead of manual index tracking
- Use `==` for value comparison, `is` only for `None`
- Test edge cases: empty, single item, boundaries
