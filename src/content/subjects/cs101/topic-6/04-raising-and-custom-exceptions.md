## Raising Exceptions (Signaling Errors Yourself)

You can raise exceptions when input is invalid:

```python
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age
```

Raising early makes bugs show up closer to where they start.

---

## Custom Exceptions

Custom exceptions make error handling clearer:

```python
class InvalidEmailError(Exception):
    pass

def validate_email(email):
    if "@" not in email:
        raise InvalidEmailError(f"Invalid email: {email}")
```

You generally create custom exceptions when:
- the error is domain-specific (e.g. “insufficient funds”)
- callers need to handle it differently than built-in errors

