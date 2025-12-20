---
id: cs103-t7-unit-testing
title: "Unit Testing OOP Code"
order: 5
---

## Unit Testing OOP Code

Unit tests verify that individual classes and methods work correctly. In OOP, effective testing focuses on behavior and public interfaces, not implementation details.

---

## What Makes a Good Unit Test?

Good unit tests are:

- **Fast:** Run in milliseconds
- **Isolated:** Don't depend on external systems (databases, networks)
- **Repeatable:** Same result every time
- **Self-checking:** Pass or fail automatically
- **Focused:** Test one behavior per test

---

## Testing Classes: The Basics

```python
class Calculator:
    def add(self, a: int, b: int) -> int:
        return a + b

    def divide(self, a: int, b: int) -> float:
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b

# Tests
def test_add_positive_numbers():
    calc = Calculator()
    result = calc.add(2, 3)
    assert result == 5

def test_add_negative_numbers():
    calc = Calculator()
    result = calc.add(-2, -3)
    assert result == -5

def test_divide_normal():
    calc = Calculator()
    result = calc.divide(10, 2)
    assert result == 5.0

def test_divide_by_zero_raises_error():
    calc = Calculator()
    try:
        calc.divide(10, 0)
        assert False, "Expected ValueError"
    except ValueError as e:
        assert "Cannot divide by zero" in str(e)
```

---

## Test Structure: Arrange-Act-Assert

Structure tests with three clear phases:

```python
def test_bank_account_withdrawal():
    # Arrange - set up the test
    account = BankAccount(initial_balance=100)

    # Act - perform the action
    account.withdraw(30)

    # Assert - verify the result
    assert account.balance == 70

def test_shopping_cart_calculates_total():
    # Arrange
    cart = ShoppingCart()
    cart.add_item(Item("Book", price=20))
    cart.add_item(Item("Pen", price=5))

    # Act
    total = cart.calculate_total()

    # Assert
    assert total == 25
```

---

## Testing State Changes

Verify that operations change object state correctly:

```python
class Counter:
    def __init__(self, start: int = 0):
        self._count = start

    @property
    def count(self) -> int:
        return self._count

    def increment(self) -> None:
        self._count += 1

    def decrement(self) -> None:
        self._count -= 1

    def reset(self) -> None:
        self._count = 0

# Tests
def test_increment_increases_count():
    counter = Counter(start=5)
    counter.increment()
    assert counter.count == 6

def test_decrement_decreases_count():
    counter = Counter(start=5)
    counter.decrement()
    assert counter.count == 4

def test_reset_sets_count_to_zero():
    counter = Counter(start=100)
    counter.reset()
    assert counter.count == 0
```

---

## Testing Return Values

Verify methods return expected values:

```python
class StringFormatter:
    def title_case(self, text: str) -> str:
        return text.title()

    def truncate(self, text: str, max_length: int) -> str:
        if len(text) <= max_length:
            return text
        return text[:max_length - 3] + "..."

# Tests
def test_title_case():
    formatter = StringFormatter()
    result = formatter.title_case("hello world")
    assert result == "Hello World"

def test_truncate_short_text_unchanged():
    formatter = StringFormatter()
    result = formatter.truncate("hello", max_length=10)
    assert result == "hello"

def test_truncate_long_text_adds_ellipsis():
    formatter = StringFormatter()
    result = formatter.truncate("hello world", max_length=8)
    assert result == "hello..."
    assert len(result) == 8
```

---

## Testing Exceptions

Verify that errors are raised correctly:

```python
import pytest

class Validator:
    def validate_age(self, age: int) -> None:
        if age < 0:
            raise ValueError("Age cannot be negative")
        if age > 150:
            raise ValueError("Age seems unrealistic")

    def validate_email(self, email: str) -> None:
        if '@' not in email:
            raise ValueError("Invalid email format")

# Tests using pytest
def test_negative_age_raises_error():
    validator = Validator()
    with pytest.raises(ValueError) as exc_info:
        validator.validate_age(-5)
    assert "negative" in str(exc_info.value)

def test_valid_age_passes():
    validator = Validator()
    validator.validate_age(25)  # Should not raise

def test_invalid_email_raises_error():
    validator = Validator()
    with pytest.raises(ValueError):
        validator.validate_email("not-an-email")
```

---

## Testing with Dependencies

When a class has dependencies, inject fakes:

```python
class UserService:
    def __init__(self, repository, email_sender):
        self._repository = repository
        self._email_sender = email_sender

    def register(self, name: str, email: str) -> User:
        user = User(name=name, email=email)
        self._repository.save(user)
        self._email_sender.send(email, "Welcome!", "Thanks for registering")
        return user

# Fake implementations for testing
class FakeRepository:
    def __init__(self):
        self.saved_users = []

    def save(self, user):
        self.saved_users.append(user)

class FakeEmailSender:
    def __init__(self):
        self.sent_emails = []

    def send(self, to, subject, body):
        self.sent_emails.append({'to': to, 'subject': subject, 'body': body})

# Tests
def test_register_saves_user():
    repo = FakeRepository()
    email = FakeEmailSender()
    service = UserService(repo, email)

    user = service.register("Alice", "alice@example.com")

    assert len(repo.saved_users) == 1
    assert repo.saved_users[0].name == "Alice"

def test_register_sends_welcome_email():
    repo = FakeRepository()
    email = FakeEmailSender()
    service = UserService(repo, email)

    service.register("Alice", "alice@example.com")

    assert len(email.sent_emails) == 1
    assert email.sent_emails[0]['to'] == "alice@example.com"
    assert "Welcome" in email.sent_emails[0]['subject']
```

---

## Testing Private Methods?

Generally, **don't test private methods directly**. Test them through public interfaces:

```python
class PriceCalculator:
    def calculate_final_price(self, base_price: float, quantity: int) -> float:
        subtotal = self._calculate_subtotal(base_price, quantity)
        discount = self._apply_bulk_discount(subtotal, quantity)
        return subtotal - discount

    def _calculate_subtotal(self, price: float, qty: int) -> float:
        return price * qty

    def _apply_bulk_discount(self, subtotal: float, qty: int) -> float:
        if qty >= 10:
            return subtotal * 0.1
        return 0

# Test through public method
def test_bulk_discount_applied_for_10_or_more():
    calc = PriceCalculator()
    # 10 items at $10 each = $100, with 10% discount = $90
    result = calc.calculate_final_price(10.0, 10)
    assert result == 90.0

def test_no_discount_for_small_orders():
    calc = PriceCalculator()
    result = calc.calculate_final_price(10.0, 5)
    assert result == 50.0  # No discount
```

---

## Test Organization

Group related tests logically:

```python
class TestBankAccount:
    """Tests for BankAccount class."""

    def test_initial_balance(self):
        account = BankAccount(100)
        assert account.balance == 100

    def test_deposit_increases_balance(self):
        account = BankAccount(100)
        account.deposit(50)
        assert account.balance == 150

    def test_withdraw_decreases_balance(self):
        account = BankAccount(100)
        account.withdraw(30)
        assert account.balance == 70

    def test_withdraw_insufficient_funds_raises_error(self):
        account = BankAccount(100)
        with pytest.raises(InsufficientFundsError):
            account.withdraw(150)
```

---

## Key Takeaways

- Test public behavior, not implementation details
- Use Arrange-Act-Assert structure
- Test both normal operation and error cases
- Inject fake dependencies for isolation
- Avoid testing private methods directly
- One behavior per test
- Fast, isolated, repeatable tests
