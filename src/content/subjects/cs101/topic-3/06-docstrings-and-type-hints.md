## Docstrings (Function Documentation)

A docstring explains what a function does, what inputs it expects, and what it returns.

```python
def calculate_bmi(weight_kg, height_m):
    """
    Calculate Body Mass Index (BMI).

    Args:
        weight_kg: Weight in kilograms
        height_m: Height in meters

    Returns:
        BMI value as a float.
    """
    return weight_kg / (height_m ** 2)
```

Docstrings show up in interactive help (`help(calculate_bmi)`).

---

## Naming and Design

Good function names are usually verbs:

- `calculate_total()`
- `is_valid_email()`
- `format_address()`

Keep parameters minimal. If you have many parameters, consider whether you can group data into a dict or a small object (later topics).

---

## Type Hints (Optional, but Very Helpful)

Type hints describe expected types:

```python
def full_name(first: str, last: str) -> str:
    return f"{first} {last}"

def mean(values: list[float]) -> float:
    return sum(values) / len(values)
```

Python doesn’t enforce these at runtime by default, but editors and tools can use them to catch mistakes early.

