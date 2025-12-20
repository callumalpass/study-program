---
id: cs101-t6-debug
title: "Debugging Techniques"
order: 6
---

## Practical Debugging Techniques

Every programmer spends significant time debugging. The difference between a novice and an expert isn't that experts write bug-free code - it's that experts debug efficiently. This subtopic covers practical techniques that help you find and fix bugs faster.

---

## The Debugging Mindset

Before diving into techniques, adopt the right mindset:

1. **Bugs are puzzles, not failures** - Approach them with curiosity
2. **Trust the computer** - If something unexpected happens, your mental model is wrong
3. **Be systematic** - Random changes rarely fix bugs
4. **Reproduce first** - You can't fix what you can't reliably trigger

---

## Print Debugging

The simplest and most universal technique is adding print statements to inspect values:

```python
def calculate_average(numbers):
    print(f"DEBUG: numbers = {numbers}")
    print(f"DEBUG: type = {type(numbers)}")

    total = sum(numbers)
    print(f"DEBUG: total = {total}")

    count = len(numbers)
    print(f"DEBUG: count = {count}")

    result = total / count
    print(f"DEBUG: result = {result}")

    return result
```

### Best Practices for Print Debugging

**Always print both value and type:**

```python
x = "42"  # String, not integer!
print(f"x = {x}, type = {type(x)}")
# x = 42, type = <class 'str'>
```

**Use `repr()` for strings to see invisible characters:**

```python
text = "hello\n"
print(text)        # hello (newline printed)
print(repr(text))  # 'hello\n' (shows the \n)
```

**Add location markers:**

```python
print("=== Starting process_data ===")
# ... code ...
print("=== After loading file ===")
# ... code ...
print("=== Finished process_data ===")
```

**Print inside loops carefully:**

```python
for i, item in enumerate(items):
    if i < 3:  # Only print first few
        print(f"Item {i}: {item}")
    elif i == 3:
        print(f"... and {len(items) - 3} more")
```

---

## Strategic Print Placement

Don't scatter prints randomly. Place them strategically:

### At Function Boundaries

```python
def process_order(order):
    print(f">>> process_order called with: {order}")
    result = validate(order)
    print(f"<<< process_order returning: {result}")
    return result
```

### Before Suspicious Operations

```python
# Crashes somewhere in this block
print(f"About to access items[{index}], len(items)={len(items)}")
item = items[index]
print(f"Got item: {item}")
```

### At Decision Points

```python
if user.is_admin:
    print("Taking admin path")
    # ...
else:
    print("Taking regular user path")
    # ...
```

---

## Binary Search Debugging

When you have a large block of code and don't know where the bug is, use binary search:

1. Add a print halfway through
2. If the print executes, the bug is after it; if not, before it
3. Repeat, halving the search space each time

```python
def complex_function():
    step1()
    step2()
    step3()
    print("=== CHECKPOINT 1 ===")  # Does this print?
    step4()
    step5()
    step6()
    print("=== CHECKPOINT 2 ===")  # How about this?
    step7()
    step8()
```

This quickly narrows down where the crash occurs.

---

## Assertions

Assertions let you verify assumptions about your code:

```python
def calculate_average(values):
    assert len(values) > 0, "values must not be empty"
    assert all(isinstance(v, (int, float)) for v in values), "all values must be numbers"

    return sum(values) / len(values)
```

### Assertions vs Exceptions

- **Assertions** check programmer errors - conditions that should never be False if the code is correct
- **Exceptions** handle expected errors - things that can legitimately go wrong at runtime

```python
def set_age(age):
    # User input - could be invalid (use exception)
    if age < 0:
        raise ValueError("Age cannot be negative")

def internal_calculate(data):
    # Should never be called with empty data (use assertion)
    assert data, "internal_calculate requires data"
```

### Assertions Are Disabled in Production

Python can run with assertions disabled (`python -O`), so never use them for input validation or security checks.

---

## Small Experiments

When you're unsure how something works, don't guess - test it:

```python
# Unsure about string slicing behavior?
>>> "hello"[1:3]
'el'
>>> "hello"[-2:]
'lo'
>>> "hello"[10:]  # What happens here?
''  # Empty string, no error!
```

### Create Minimal Reproductions

When debugging a complex problem, strip away everything unnecessary:

```python
# Instead of debugging your 500-line program:
# 1. Create a new file
# 2. Reproduce just the bug with minimal code

# minimal_test.py
data = {"users": []}
first_user = data["users"][0]  # IndexError!

# Now you understand the bug in isolation
```

---

## The Rubber Duck Method

Explain your code, line by line, to an inanimate object (traditionally a rubber duck). This forces you to verbalize your assumptions, often revealing the bug.

How it works:

1. Place a rubber duck (or any object) near your computer
2. Explain what each line of code is supposed to do
3. When your explanation doesn't match the code, you've found the bug

This works because bugs often hide in the gap between what you *think* the code does and what it *actually* does.

---

## Divide and Conquer

Break complex problems into smaller parts and test each independently:

```python
def process_data(raw_data):
    parsed = parse(raw_data)
    validated = validate(parsed)
    transformed = transform(validated)
    return save(transformed)

# Debug each stage separately
raw = get_test_data()
print("Raw:", raw[:100])

parsed = parse(raw)
print("Parsed:", parsed[:3])

validated = validate(parsed)
print("Validated:", validated[:3])

# Find which stage introduces the bug
```

---

## Common Bug Patterns

Knowing common bug patterns helps you spot them faster:

### Off-by-One Errors

```python
# Bug: skips last item
for i in range(len(items) - 1):  # Should be len(items)
    process(items[i])
```

### Wrong Comparison Operator

```python
# Bug: uses assignment (=) instead of equality (==)
if x = 5:  # SyntaxError in Python, but valid in some languages

# Bug: wrong comparison
if x > 0:  # Should be >= 0
```

### Mutable Default Arguments

```python
# Bug: default list is shared across calls
def add_item(item, items=[]):
    items.append(item)
    return items

# Fix:
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

### Shadowed Variables

```python
# Bug: shadows built-in 'list'
list = [1, 2, 3]
other = list([4, 5])  # TypeError: 'list' object is not callable
```

### Late Binding in Closures

```python
# Bug: all functions print 4
functions = []
for i in range(4):
    functions.append(lambda: print(i))

# Fix: capture i immediately
functions = []
for i in range(4):
    functions.append(lambda i=i: print(i))
```

---

## When You're Stuck

If you've been debugging for a while without progress:

### Take a Break

Walk away for 10-15 minutes. Fresh eyes often spot the problem immediately.

### Explain to Someone

Describe the problem to a colleague. Even if they don't know the answer, articulating the problem often reveals it.

### Check Recent Changes

What changed since the code last worked? Use `git diff` or check your recent edits.

### Question Your Assumptions

The bug is often in something you "know" is correct. Double-check:

- Is the file you're editing the one being run?
- Is the function being called at all?
- Are you testing with the data you think you're testing with?

### Read the Documentation

Maybe the function doesn't work the way you assume.

---

## Preventing Bugs

The best debugging is avoiding bugs in the first place:

- **Write small functions** - Easier to test and debug
- **Test as you write** - Don't write 100 lines then debug
- **Use meaningful names** - Makes bugs more obvious
- **Keep it simple** - Complex code has more places for bugs to hide
- **Write tests** - Catch regressions before they become mysteries

---

## Key Takeaways

- **Print debugging** is simple and effective - print values AND types
- Use **`repr()`** to see invisible characters in strings
- **Assertions** verify programmer assumptions (not user input)
- Create **minimal reproductions** to isolate bugs
- Use **binary search** to narrow down where bugs occur
- Know **common bug patterns** - off-by-one, mutable defaults, shadowing
- When stuck: **take a break**, explain the problem, check recent changes
- **Prevent bugs** by writing small functions and testing as you go

