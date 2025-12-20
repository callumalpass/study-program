# Unit Testing

Unit testing is the foundation of automated testing, focusing on verifying individual components or units of code in isolation. Effective unit testing catches bugs early, facilitates refactoring, and serves as living documentation of how code should behave.

## What is Unit Testing?

A unit test verifies the behavior of a small, isolated piece of code—typically a single function, method, or class. Unit tests execute quickly, run independently, and provide rapid feedback to developers.

### Characteristics of Good Unit Tests

**F.I.R.S.T. Principles:**

- **Fast**: Run in milliseconds, enabling frequent execution
- **Independent**: No dependencies between tests; run in any order
- **Repeatable**: Produce same results every time
- **Self-Validating**: Pass or fail clearly, no manual interpretation
- **Timely**: Written at the right time (ideally with or before code)

## Unit Testing Principles

### Single Responsibility

Each test should verify one specific behavior:

```python
# Bad: Testing multiple behaviors
def test_user_registration():
    user = register_user("alice@example.com", "password123")
    assert user.email == "alice@example.com"
    assert user.is_active == True
    assert user.created_at is not None
    assert send_email_called == True
    # Too many assertions, unclear what failed

# Good: Separate tests for separate behaviors
def test_user_registration_sets_email():
    user = register_user("alice@example.com", "password123")
    assert user.email == "alice@example.com"

def test_user_registration_activates_user():
    user = register_user("alice@example.com", "password123")
    assert user.is_active == True

def test_user_registration_sends_welcome_email():
    register_user("alice@example.com", "password123")
    assert email_service.sent_to("alice@example.com")
```

### Arrange-Act-Assert (AAA) Pattern

Structure tests for clarity:

```java
@Test
public void testCalculateTotalWithDiscount() {
    // Arrange: Set up test data and preconditions
    ShoppingCart cart = new ShoppingCart();
    cart.addItem(new Item("Widget", 50.00), 2);
    cart.addItem(new Item("Gadget", 30.00), 1);
    Discount discount = new Discount(10); // 10% off

    // Act: Execute the behavior being tested
    double total = cart.calculateTotal(discount);

    // Assert: Verify the expected outcome
    assertEquals(117.00, total, 0.01);
}
```

### Test Naming

Use descriptive names that explain what is tested:

```python
# Bad: Unclear names
def test1():
    pass

def test_calc():
    pass

# Good: Descriptive names
def test_calculate_total_with_empty_cart_returns_zero():
    pass

def test_calculate_total_with_multiple_items_sums_prices():
    pass

def test_calculate_total_throws_exception_for_negative_prices():
    pass
```

## Testing Frameworks

### Python: pytest

```python
import pytest

class Calculator:
    def add(self, a, b):
        return a + b

    def divide(self, a, b):
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b

# Basic tests
def test_add_positive_numbers():
    calc = Calculator()
    assert calc.add(2, 3) == 5

def test_add_negative_numbers():
    calc = Calculator()
    assert calc.add(-2, -3) == -5

# Parametrized tests
@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 5),
    (0, 0, 0),
    (-1, 1, 0),
    (100, 200, 300)
])
def test_add_various_inputs(a, b, expected):
    calc = Calculator()
    assert calc.add(a, b) == expected

# Testing exceptions
def test_divide_by_zero_raises_error():
    calc = Calculator()
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        calc.divide(10, 0)

# Fixtures for setup/teardown
@pytest.fixture
def calculator():
    return Calculator()

def test_with_fixture(calculator):
    assert calculator.add(1, 1) == 2
```

### JavaScript: Jest

```javascript
// calculator.js
class Calculator {
    add(a, b) {
        return a + b;
    }

    divide(a, b) {
        if (b === 0) {
            throw new Error('Cannot divide by zero');
        }
        return a / b;
    }
}

module.exports = Calculator;

// calculator.test.js
const Calculator = require('./calculator');

describe('Calculator', () => {
    let calc;

    beforeEach(() => {
        calc = new Calculator();
    });

    describe('add', () => {
        it('should add two positive numbers', () => {
            expect(calc.add(2, 3)).toBe(5);
        });

        it('should handle negative numbers', () => {
            expect(calc.add(-2, -3)).toBe(-5);
        });

        it.each([
            [1, 1, 2],
            [0, 0, 0],
            [-1, 1, 0],
            [100, 200, 300]
        ])('should add %i and %i to equal %i', (a, b, expected) => {
            expect(calc.add(a, b)).toBe(expected);
        });
    });

    describe('divide', () => {
        it('should divide two numbers', () => {
            expect(calc.divide(10, 2)).toBe(5);
        });

        it('should throw error when dividing by zero', () => {
            expect(() => calc.divide(10, 0))
                .toThrow('Cannot divide by zero');
        });
    });
});
```

### Java: JUnit 5

```java
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    private Calculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }

    @Test
    @DisplayName("Add two positive numbers")
    void testAddPositiveNumbers() {
        assertEquals(5, calculator.add(2, 3));
    }

    @ParameterizedTest
    @CsvSource({
        "2, 3, 5",
        "0, 0, 0",
        "-1, 1, 0",
        "100, 200, 300"
    })
    @DisplayName("Add various number combinations")
    void testAddVariousInputs(int a, int b, int expected) {
        assertEquals(expected, calculator.add(a, b));
    }

    @Test
    @DisplayName("Divide by zero throws exception")
    void testDivideByZeroThrowsException() {
        Exception exception = assertThrows(
            ArithmeticException.class,
            () -> calculator.divide(10, 0)
        );
        assertTrue(exception.getMessage()
            .contains("Cannot divide by zero"));
    }

    @AfterEach
    void tearDown() {
        calculator = null;
    }
}
```

## Test Doubles and Mocking

Test doubles replace dependencies to isolate the unit under test.

### Types of Test Doubles

**Dummy**: Objects passed but never used
```python
def test_user_creation_with_dummy():
    # Logger is passed but not used in this test
    dummy_logger = None
    user = User("alice", dummy_logger)
    assert user.name == "alice"
```

**Stub**: Returns predefined responses
```python
class StubDatabase:
    def get_user(self, user_id):
        return {"id": user_id, "name": "Test User"}

def test_with_stub():
    db = StubDatabase()
    service = UserService(db)
    user = service.get_user(123)
    assert user["name"] == "Test User"
```

**Spy**: Records interactions for verification
```python
class SpyEmailService:
    def __init__(self):
        self.sent_emails = []

    def send(self, to, subject, body):
        self.sent_emails.append((to, subject, body))

def test_with_spy():
    email_spy = SpyEmailService()
    service = NotificationService(email_spy)

    service.notify_user("alice@example.com", "Welcome!")

    assert len(email_spy.sent_emails) == 1
    assert email_spy.sent_emails[0][0] == "alice@example.com"
```

**Mock**: Verifies behavior and interactions
```python
from unittest.mock import Mock, MagicMock

def test_with_mock():
    # Create mock database
    mock_db = Mock()
    mock_db.save.return_value = True

    # Create service with mock
    service = UserService(mock_db)
    user = User("alice", "alice@example.com")

    # Execute
    result = service.create_user(user)

    # Verify interactions
    mock_db.save.assert_called_once_with(user)
    assert result == True
```

**Fake**: Working implementation with shortcuts
```python
class FakeDatabase:
    def __init__(self):
        self.users = {}
        self.next_id = 1

    def save(self, user):
        user.id = self.next_id
        self.users[self.next_id] = user
        self.next_id += 1
        return user.id

    def get(self, user_id):
        return self.users.get(user_id)

def test_with_fake():
    fake_db = FakeDatabase()
    service = UserService(fake_db)

    user_id = service.create_user("alice")
    retrieved = service.get_user(user_id)

    assert retrieved.name == "alice"
```

### Mocking in Practice

```python
from unittest.mock import Mock, patch

class PaymentProcessor:
    def __init__(self, gateway, notifier):
        self.gateway = gateway
        self.notifier = notifier

    def process_payment(self, amount, card):
        try:
            transaction_id = self.gateway.charge(amount, card)
            self.notifier.send_receipt(transaction_id, amount)
            return transaction_id
        except PaymentException as e:
            self.notifier.send_failure_notification(str(e))
            raise

# Test successful payment
def test_successful_payment_sends_receipt():
    # Setup mocks
    mock_gateway = Mock()
    mock_gateway.charge.return_value = "TXN-12345"
    mock_notifier = Mock()

    processor = PaymentProcessor(mock_gateway, mock_notifier)

    # Execute
    txn_id = processor.process_payment(100.00, "4111-1111-1111-1111")

    # Verify
    mock_gateway.charge.assert_called_once_with(
        100.00, "4111-1111-1111-1111"
    )
    mock_notifier.send_receipt.assert_called_once_with(
        "TXN-12345", 100.00
    )
    assert txn_id == "TXN-12345"

# Test payment failure
def test_failed_payment_sends_notification():
    mock_gateway = Mock()
    mock_gateway.charge.side_effect = PaymentException("Insufficient funds")
    mock_notifier = Mock()

    processor = PaymentProcessor(mock_gateway, mock_notifier)

    with pytest.raises(PaymentException):
        processor.process_payment(100.00, "4111-1111-1111-1111")

    mock_notifier.send_failure_notification.assert_called_once_with(
        "Insufficient funds"
    )
```

## Code Coverage

Coverage measures how much code is executed by tests.

```python
# Run pytest with coverage
# pytest --cov=myapp --cov-report=html tests/

def calculate_grade(score):
    if score >= 90:
        return 'A'
    elif score >= 80:
        return 'B'
    elif score >= 70:
        return 'C'
    elif score >= 60:
        return 'D'
    else:
        return 'F'

# Incomplete coverage (only tests one branch)
def test_grade_a():
    assert calculate_grade(95) == 'A'

# Better coverage (tests all branches)
@pytest.mark.parametrize("score,grade", [
    (95, 'A'),
    (85, 'B'),
    (75, 'C'),
    (65, 'D'),
    (55, 'F')
])
def test_all_grades(score, grade):
    assert calculate_grade(score) == grade
```

**Coverage metrics:**
- **Line coverage**: % of code lines executed
- **Branch coverage**: % of decision branches taken
- **Function coverage**: % of functions called
- **Statement coverage**: % of statements executed

**Coverage is necessary but not sufficient** - 100% coverage doesn't guarantee bug-free code!

## Summary

Unit testing forms the foundation of a robust testing strategy. By writing fast, isolated, repeatable tests using established frameworks and patterns, developers can catch bugs early, refactor confidently, and maintain high code quality. Effective use of test doubles and mocking enables testing in isolation, while coverage metrics help identify untested code. Master unit testing to build reliable, maintainable software.
