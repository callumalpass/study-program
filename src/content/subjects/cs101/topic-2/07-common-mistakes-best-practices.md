## Common Mistakes (And How to Fix Them)

Control flow bugs are usually logic bugs: your code runs, but it does the wrong thing. These sections show frequent beginner mistakes.

---

## Off-by-One Errors

```python
# range(5) gives 0..4, not 1..5
for i in range(5):
    print(i)
```

Fix by choosing the right range:

```python
for i in range(1, 6):
    print(i)  # 1..5
```

---

## Modifying a List While Iterating

This often causes items to be skipped:

```python
numbers = [1, 2, 3, 4, 5]
for n in numbers:
    if n % 2 == 0:
        numbers.remove(n)
```

Safer alternatives:

```python
# Option 1: iterate over a copy
for n in numbers[:]:
    if n % 2 == 0:
        numbers.remove(n)

# Option 2: build a new list
numbers = [n for n in numbers if n % 2 != 0]
```

---

## Overly Complex Conditions

If a condition is hard to read, break it into named pieces:

```python
is_eligible_age = age >= 18
has_access = is_admin or score > 50
can_drive = is_eligible_age and has_license and (not is_suspended) and has_access
```

Readable code is easier to debug.

---

## Best Practices

1. Prefer `for` loops when iterating over a collection.
2. Use `while True` + `break` for sentinel loops (menu loops, input validation).
3. Keep nesting shallow with guard clauses.
4. Name intermediate boolean expressions when they help readability.
5. Use `enumerate()` instead of manual index tracking.

---

## Practice Exercises

1. **FizzBuzz**: Print 1–100; multiples of 3 → `"Fizz"`, multiples of 5 → `"Buzz"`, both → `"FizzBuzz"`.
2. **Number guessing**: Randomly choose 1–100 and loop until the user guesses it; print “higher/lower”.
3. **Find-first / find-all**: Given a list, find the first negative number and also build a list of all negatives.
4. **Menu loop**: Build a mini app with options (view/add/remove/quit).
5. **Prime checker**: Ask for a number and determine if it’s prime using a loop.

