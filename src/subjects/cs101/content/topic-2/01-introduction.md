---
id: cs101-t2-intro
title: "Control Flow: Big Picture"
order: 1
---

## Control Flow: The Big Picture

Control flow is how a program decides *what to do next*. Without control flow, your code runs top-to-bottom exactly once - every line executes in order, and then the program ends. With control flow, your program becomes dynamic and responsive. It can:

- **Choose between different paths** (branching with `if/elif/else`)
- **Repeat work** (looping with `for` and `while`)
- **Stop early or skip work** (`break` and `continue`)
- **React to data** (making decisions based on user input, file contents, or calculations)

Control flow transforms a simple script into an interactive program. This topic is about writing programs that **react to conditions** and **work with collections of data**.

---

## How Python Executes Code

By default, Python executes code sequentially - one statement after another, from top to bottom:

```python
print("First")   # Runs first
print("Second")  # Runs second
print("Third")   # Runs third
```

Control flow statements change this linear execution. They allow Python to:
- Skip certain lines entirely
- Execute some lines multiple times
- Choose which lines to run based on conditions

---

## How Python Chooses a Path (Conditionals)

At any moment, Python is executing one statement at a time. A conditional statement asks a question (evaluates a boolean expression) and selects which block of code to run:

```python
age = 16

if age >= 18:
    print("Adult")      # This block runs if condition is True
else:
    print("Minor")      # This block runs if condition is False
```

The condition `age >= 18` evaluates to either `True` or `False`. Based on this boolean result, Python chooses which indented block to execute.

### Indentation Creates Blocks

Python uses indentation (typically 4 spaces) to group statements into a block. This is different from many other languages that use braces `{}`:

```python
if True:
    print("This is inside the if-block")
    print("Still inside - same indentation")
    print("Also inside")
print("This is outside - back to original indentation")
```

The indented lines form a single block that executes together when the condition is true. When Python encounters a line with less indentation, it knows the block has ended.

### Indentation Errors

If you accidentally mis-indent, Python will either raise an `IndentationError` or your code will do something different than you intended:

```python
# IndentationError - inconsistent indentation
if True:
    print("First")
  print("Second")  # Error! Unexpected indent

# Logic error - unintended behavior
if age >= 18:
    print("Adult")
print("Welcome!")  # This always runs - it's outside the if block!
```

---

## How Python Repeats Work (Loops)

Loops allow you to execute the same block of code multiple times without writing it out repeatedly.

### `for` Loops: Iterate Over a Sequence

Use `for` when you have something to iterate over - a list, a string, a `range`, a file, or any other iterable:

```python
# Iterate over a string (character by character)
for letter in "hello":
    print(letter)
# Output: h, e, l, l, o (each on new line)

# Iterate over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(f"I like {fruit}")

# Iterate over a range of numbers
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4
```

The `for` loop automatically handles:
- Getting the next item from the sequence
- Assigning it to the loop variable
- Detecting when the sequence is exhausted

### `while` Loops: Repeat Until a Condition Changes

Use `while` when you keep going "until something happens" - when you don't know in advance how many iterations you need:

```python
count = 3
while count > 0:
    print(count)
    count -= 1
print("Go!")
# Output: 3, 2, 1, Go!
```

The `while` loop:
1. Checks the condition (`count > 0`)
2. If true, executes the block
3. Returns to step 1
4. If false, exits the loop and continues with the next statement

---

## Loop Control: `break` and `continue`

Sometimes you need more control over loop execution:

```python
# break - exit the loop immediately
for i in range(10):
    if i == 5:
        break
    print(i)
# Output: 0, 1, 2, 3, 4 (stops at 5)

# continue - skip to the next iteration
for i in range(5):
    if i == 2:
        continue
    print(i)
# Output: 0, 1, 3, 4 (skips 2)
```

---

## A Mental Model That Helps

When writing control flow, ask yourself these questions:

1. **What data do I have?** (variables, user input, lists of items)
2. **What decision must be made?** (what condition splits the paths?)
3. **What repeats?** (which steps should run again?)
4. **What stops repetition?** (how does the loop end?)

Most bugs in control flow happen because questions 3 or 4 are unclear. Always be able to answer: "How does this loop eventually stop?"

---

## Common Goals You'll Build Toward

By the end of this topic, you should feel comfortable writing patterns like:

| Pattern | Description | Example Use |
|---------|-------------|-------------|
| **Input validation** | Keep asking until valid | "Enter a number between 1-10" |
| **Search** | Find first/all matches | "Find all even numbers in list" |
| **Accumulation** | Count, sum, or build | "Calculate total price" |
| **Menu loop** | Simple text UI | "1) Add 2) Remove 3) Quit" |
| **Filtering** | Keep items matching criteria | "Get all users over 18" |

---

## Why Control Flow Matters

Without control flow, you'd need to write every possible scenario explicitly. With control flow:

```python
# Without loops - repetitive and limited
print(1)
print(2)
print(3)
# What if you need to print 1000 numbers?

# With loops - flexible and scalable
for i in range(1, 1001):
    print(i)
```

Control flow is what makes programs:
- **Interactive** - responding to user input
- **Flexible** - handling different data
- **Efficient** - avoiding code repetition
- **Powerful** - solving complex problems with simple patterns

---

## Key Takeaways

- Control flow lets programs make decisions and repeat actions
- **Conditionals** (`if/elif/else`) choose which code to run based on boolean expressions
- **Loops** (`for`, `while`) repeat code multiple times
- Python uses **indentation** (4 spaces) to define code blocks
- `break` exits a loop early; `continue` skips to the next iteration
- Always know how your loop will eventually terminate
- Master a few key patterns (validation, search, accumulation) and you can solve most problems
