## Mocks, Fakes, and Test Doubles

Test doubles are stand-in objects used during testing to replace real dependencies. Understanding the different types helps you choose the right approach for each testing scenario.

---

## Types of Test Doubles

| Type | Purpose | Behavior |
|------|---------|----------|
| **Dummy** | Fill parameter lists | Does nothing |
| **Stub** | Provide canned answers | Returns predefined values |
| **Fake** | Working implementation | Simplified but functional |
| **Mock** | Verify interactions | Records and verifies calls |
| **Spy** | Record calls on real object | Wraps real implementation |

---

## Dummies

Dummies are passed around but never used. They fill required parameters:

```python
class Logger:
    def log(self, message: str) -> None:
        pass

class DummyLogger:
    """Does nothing - just satisfies the type requirement."""
    def log(self, message: str) -> None:
        pass

def test_calculator_doesnt_need_logger_for_math():
    # Logger is required but not used for basic math
    dummy = DummyLogger()
    calc = Calculator(logger=dummy)
    assert calc.add(2, 3) == 5
```

---

## Stubs

Stubs return predetermined values:

```python
class WeatherService:
    def get_temperature(self, city: str) -> float:
        # Real implementation calls external API
        pass

class StubWeatherService:
    """Returns fixed temperature for testing."""
    def __init__(self, temperature: float):
        self.temperature = temperature

    def get_temperature(self, city: str) -> float:
        return self.temperature

def test_recommendation_for_cold_weather():
    # Stub always returns cold temperature
    weather = StubWeatherService(temperature=-5.0)
    recommender = ClothingRecommender(weather)

    recommendation = recommender.recommend("New York")

    assert "coat" in recommendation.lower()

def test_recommendation_for_hot_weather():
    weather = StubWeatherService(temperature=35.0)
    recommender = ClothingRecommender(weather)

    recommendation = recommender.recommend("Miami")

    assert "shorts" in recommendation.lower()
```

---

## Fakes

Fakes are working implementations that take shortcuts:

```python
class Database:
    def save(self, data: dict) -> int:
        # Real: writes to actual database
        pass

    def find(self, id: int) -> dict | None:
        # Real: queries actual database
        pass

    def delete(self, id: int) -> bool:
        # Real: deletes from actual database
        pass

class FakeDatabase:
    """In-memory database for testing."""
    def __init__(self):
        self._data = {}
        self._next_id = 1

    def save(self, data: dict) -> int:
        id = self._next_id
        self._next_id += 1
        self._data[id] = data.copy()
        return id

    def find(self, id: int) -> dict | None:
        return self._data.get(id)

    def delete(self, id: int) -> bool:
        if id in self._data:
            del self._data[id]
            return True
        return False

def test_user_repository_crud():
    db = FakeDatabase()
    repo = UserRepository(db)

    # Create
    user_id = repo.create({"name": "Alice", "email": "alice@example.com"})

    # Read
    user = repo.find(user_id)
    assert user["name"] == "Alice"

    # Delete
    repo.delete(user_id)
    assert repo.find(user_id) is None
```

Fakes vs Stubs:
- **Stub:** Returns fixed values
- **Fake:** Actually works, just simpler than the real thing

---

## Mocks

Mocks verify that specific interactions occurred:

```python
class EmailService:
    def send(self, to: str, subject: str, body: str) -> None:
        pass

class MockEmailService:
    """Records calls for verification."""
    def __init__(self):
        self.calls = []

    def send(self, to: str, subject: str, body: str) -> None:
        self.calls.append({
            'to': to,
            'subject': subject,
            'body': body
        })

    def assert_called_once(self):
        assert len(self.calls) == 1, f"Expected 1 call, got {len(self.calls)}"

    def assert_called_with(self, to: str, subject: str):
        matching = [c for c in self.calls if c['to'] == to and c['subject'] == subject]
        assert matching, f"No call matching to={to}, subject={subject}"

def test_order_confirmation_email_sent():
    email_mock = MockEmailService()
    order_service = OrderService(email=email_mock)

    order_service.place_order(Order(customer_email="test@example.com"))

    email_mock.assert_called_once()
    email_mock.assert_called_with(
        to="test@example.com",
        subject="Order Confirmation"
    )
```

---

## Using unittest.mock

Python's `unittest.mock` provides powerful mocking:

```python
from unittest.mock import Mock, patch, MagicMock

# Basic Mock
def test_with_mock():
    mock_db = Mock()
    mock_db.save.return_value = 42

    service = UserService(db=mock_db)
    user_id = service.create_user("Alice")

    assert user_id == 42
    mock_db.save.assert_called_once()

# Verifying call arguments
def test_verify_arguments():
    mock_email = Mock()
    notifier = Notifier(email=mock_email)

    notifier.send_welcome("user@example.com")

    mock_email.send.assert_called_once_with(
        "user@example.com",
        "Welcome!",
        mock.ANY  # Any value is OK
    )

# Patching (replacing during test)
@patch('myapp.services.send_email')
def test_with_patch(mock_send):
    mock_send.return_value = True

    result = process_order(order)

    assert result.email_sent
    mock_send.assert_called_once()
```

---

## When to Use Each Type

| Scenario | Use |
|----------|-----|
| Parameter not used | Dummy |
| Need specific return value | Stub |
| Need working but simple implementation | Fake |
| Need to verify method was called | Mock |
| Need to track calls on real object | Spy |

---

## Fakes vs Mocks: A Comparison

```python
# Testing with a Fake (state verification)
def test_user_saved_with_fake():
    fake_db = FakeDatabase()
    service = UserService(db=fake_db)

    service.create_user("Alice", "alice@example.com")

    # Verify state: was user actually saved?
    users = fake_db.find_all()
    assert len(users) == 1
    assert users[0]['name'] == "Alice"

# Testing with a Mock (behavior verification)
def test_user_saved_with_mock():
    mock_db = Mock()
    service = UserService(db=mock_db)

    service.create_user("Alice", "alice@example.com")

    # Verify behavior: was save() called correctly?
    mock_db.save.assert_called_once()
    call_args = mock_db.save.call_args[0][0]
    assert call_args['name'] == "Alice"
```

**Fakes** check: "Did the right thing happen?"
**Mocks** check: "Was the right method called?"

---

## Best Practices

### 1. Prefer Fakes Over Mocks

Fakes test behavior; mocks test implementation:

```python
# Better: Test actual behavior with fake
def test_order_persisted():
    fake_db = FakeDatabase()
    service = OrderService(db=fake_db)

    service.create_order(items=["book", "pen"])

    orders = fake_db.find_all()
    assert len(orders) == 1

# Fragile: Test implementation details with mock
def test_order_persisted_mock():
    mock_db = Mock()
    service = OrderService(db=mock_db)

    service.create_order(items=["book", "pen"])

    # Breaks if internal method name changes
    mock_db.save.assert_called_once()
```

### 2. Don't Mock What You Don't Own

Don't mock third-party libraries directly:

```python
# Bad: Mocking requests library
@patch('requests.get')
def test_api_client(mock_get):
    mock_get.return_value.json.return_value = {"data": "test"}
    # Brittle - breaks if requests API changes

# Better: Create adapter and mock that
class HttpClient:
    def get_json(self, url: str) -> dict:
        import requests
        return requests.get(url).json()

def test_api_client():
    mock_http = Mock()
    mock_http.get_json.return_value = {"data": "test"}
    client = ApiClient(http=mock_http)
    # Tests your code, not requests library
```

### 3. Keep Test Doubles Simple

```python
# Too complicated - defeats the purpose
class OverEngineeredFakeDb:
    def __init__(self):
        self.data = {}
        self.transaction_log = []
        self.indexes = {}
        self.constraints = []
        # ... 100 more lines

# Simple and effective
class FakeDatabase:
    def __init__(self):
        self._data = {}
        self._next_id = 1

    def save(self, data): ...
    def find(self, id): ...
```

---

## Key Takeaways

- Test doubles replace real dependencies in tests
- Dummies fill parameters; stubs return values; fakes work simply
- Mocks verify interactions occurred
- Prefer fakes for state verification
- Use mocks when you must verify specific calls
- Keep test doubles simple
- Don't mock what you don't own
