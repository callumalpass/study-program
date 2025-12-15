## Practical Debugging Techniques

---

## Print Debugging

Print the value *and the type* when you’re unsure:

```python
def average(values):
    print("DEBUG values:", values, type(values))
    total = sum(values)
    print("DEBUG total:", total)
    return total / len(values)
```

### `repr()` for More Detail

`repr()` shows a representation that’s often more precise than `print()`:

```python
text = "hi\n"
print(text)        # prints newline
print(repr(text))  # 'hi\\n'
```

---

## Use Small Experiments

If you’re unsure how something works, create a tiny script with 5–10 lines and test it. Debugging gets easier when you isolate the problem.

---

## Assertions (For Programmer Mistakes)

Assertions help you catch assumptions:

```python
def mean(values):
    assert len(values) > 0, "values must not be empty"
    return sum(values) / len(values)
```

Assertions are not a replacement for user-facing validation; they are for conditions that should be true if your code is correct.

