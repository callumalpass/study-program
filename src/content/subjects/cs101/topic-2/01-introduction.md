## Control Flow: The Big Picture

Control flow is how a program decides *what to do next*. Without control flow, your code runs top-to-bottom exactly once. With control flow, your program can:

- Choose between different paths (branching with `if/elif/else`)
- Repeat work (looping with `for` and `while`)
- Stop early or skip work (`break` / `continue`)

This topic is about writing programs that **react to data** (conditions) and **work with collections** (loops).

---

## How Python Chooses a Path

At any moment, Python is executing one statement at a time. A conditional statement asks a question (a boolean expression) and selects a block:

```python
age = 16

if age >= 18:
    print("Adult")
else:
    print("Minor")
```

### Indentation Creates Blocks

Python uses indentation (typically 4 spaces) to group statements into a block:

```python
if True:
    print("This is inside the if-block")
    print("Still inside")
print("This is outside")
```

If you accidentally mis-indent, Python will either raise an `IndentationError` or do something different to what you intended.

---

## How Python Repeats Work

### `for` Loops: Iterate Over a Sequence

Use `for` when you have something to iterate over (a list, a string, a `range`, a file, etc.):

```python
for letter in "hello":
    print(letter)
```

### `while` Loops: Repeat Until a Condition Changes

Use `while` when you keep going “until something happens”:

```python
count = 3
while count > 0:
    print(count)
    count -= 1
print("Go!")
```

---

## A Mental Model That Helps

When writing control flow, ask yourself:

1. **What data do I have?** (variables, input, list of items)
2. **What decision must be made?** (what condition splits the paths?)
3. **What repeats?** (which steps should run again?)
4. **What stops repetition?** (how does the loop end?)

Most bugs in control flow happen because (3) or (4) is unclear.

---

## Common Goals You’ll Build Toward

By the end of this topic, you should feel comfortable writing patterns like:

- Input validation loops (“keep asking until valid”)
- Searching a list for an item (“find first match” / “find all matches”)
- Counting and summarizing (“how many passed?” / “what’s the total?”)
- Menu-based programs (a simple text UI)

