---
id: cs204-t5-integration
title: "Integration Testing"
order: 3
---

# Integration Testing

Integration testing verifies that different components, modules, or services work correctly together. While unit tests validate individual pieces in isolation, integration tests expose problems in the interactions and interfaces between components.

## What is Integration Testing?

Integration testing focuses on the communication paths, data flows, and interactions between software modules. It reveals defects in interfaces, data formats, timing issues, and incorrect assumptions about how components interact.

### Why Integration Testing Matters

Even when individual units work perfectly, integration can fail due to:
- **Interface mismatches**: Different data formats or protocols
- **Timing issues**: Race conditions, deadlocks, timeout problems
- **Configuration errors**: Environment-specific issues
- **Integration logic bugs**: Incorrect coordination between components
- **External system issues**: Third-party API changes or failures

## Integration Testing Strategies

### Big Bang Integration

All components are integrated simultaneously and tested as a whole.

```python
# Big Bang approach
def test_entire_order_system():
    """Test complete order processing flow at once."""
    # Setup all components
    database = Database()
    inventory = InventoryService(database)
    payment = PaymentGateway(config)
    shipping = ShippingService(config)
    order_service = OrderService(database, inventory, payment, shipping)

    # Test entire workflow
    cart = create_test_cart()
    order = order_service.process_order(cart, payment_info, address)

    assert order.status == "CONFIRMED"
    assert inventory.is_reserved(order.items)
    assert payment.is_charged(order.total)
    assert shipping.is_scheduled(order.id)
```

**Advantages:**
- Simple approach
- Tests complete functionality
- Good for small systems

**Disadvantages:**
- Hard to isolate failures
- Late integration = late bug discovery
- Debugging is difficult
- Risky for large systems

### Incremental Integration

Components are integrated and tested progressively.

#### Top-Down Integration

Start with top-level modules, integrate lower-level modules progressively.

```python
# Top-down integration example
class OrderController:
    """Top-level controller."""
    def __init__(self, order_service):
        self.order_service = order_service

    def create_order(self, request):
        return self.order_service.process(request.cart)

# Phase 1: Test controller with stub service
class StubOrderService:
    def process(self, cart):
        return {"id": "123", "status": "SUCCESS"}

def test_controller_with_stub():
    service = StubOrderService()
    controller = OrderController(service)
    result = controller.create_order(mock_request)
    assert result["status"] == "SUCCESS"

# Phase 2: Replace stub with real service, stub lower levels
class OrderService:
    def __init__(self, payment_stub, inventory_stub):
        self.payment = payment_stub
        self.inventory = inventory_stub

    def process(self, cart):
        # Real logic with stubbed dependencies
        if self.inventory.check(cart):
            if self.payment.charge(cart.total):
                return {"status": "SUCCESS"}
        return {"status": "FAILED"}

# Phase 3: Progressively replace stubs with real implementations
```

**Advantages:**
- Early testing of major control flow
- User interface tested early
- Easier to demonstrate progress

**Disadvantages:**
- Requires many stubs initially
- Lower-level utilities tested late
- Stubs can hide integration issues

#### Bottom-Up Integration

Start with low-level modules, integrate higher-level modules progressively.

```python
# Bottom-up integration example

# Phase 1: Test low-level components
def test_database_connection():
    db = Database()
    db.connect()
    assert db.is_connected()

def test_database_queries():
    db = Database()
    result = db.query("SELECT * FROM users WHERE id = ?", [1])
    assert result is not None

# Phase 2: Test mid-level services using real database
def test_user_repository():
    db = Database()  # Real database
    repo = UserRepository(db)

    user = repo.create(User("alice", "alice@example.com"))
    retrieved = repo.find_by_id(user.id)

    assert retrieved.name == "alice"

# Phase 3: Test high-level services
def test_user_service():
    db = Database()
    repo = UserRepository(db)
    service = UserService(repo)

    user_id = service.register("alice", "alice@example.com", "password")
    user = service.get_user(user_id)

    assert user.email == "alice@example.com"
```

**Advantages:**
- Lower-level modules tested thoroughly first
- No stubs needed for lower levels
- Easier to observe test results

**Disadvantages:**
- Higher-level logic tested late
- Requires test drivers
- System behavior visible late

#### Sandwich/Hybrid Integration

Combines top-down and bottom-up approaches.

```python
# Test critical middle layer from both directions

# From top: Test with stubs below
def test_order_service_from_top():
    payment_stub = StubPaymentGateway()
    inventory_stub = StubInventoryService()
    service = OrderService(payment_stub, inventory_stub)

    result = service.process_order(cart)
    assert result.status == "SUCCESS"

# From bottom: Test with drivers above
def test_payment_gateway_from_bottom():
    gateway = PaymentGateway(config)
    # Use test driver to simulate order service
    result = gateway.charge(100.00, test_card)
    assert result.is_successful()

# Finally: Integrate real components
def test_full_integration():
    gateway = PaymentGateway(config)
    inventory = InventoryService(db)
    service = OrderService(gateway, inventory)

    result = service.process_order(cart)
    assert result.status == "SUCCESS"
```

## Testing Component Interactions

### API Integration Testing

Testing REST API integrations:

```python
import requests
import pytest

class TestAPIIntegration:
    BASE_URL = "http://api.example.com"

    def test_create_and_retrieve_user(self):
        # Create user via API
        create_response = requests.post(
            f"{self.BASE_URL}/users",
            json={
                "name": "Alice",
                "email": "alice@example.com"
            }
        )

        assert create_response.status_code == 201
        user_id = create_response.json()["id"]

        # Retrieve user via API
        get_response = requests.get(
            f"{self.BASE_URL}/users/{user_id}"
        )

        assert get_response.status_code == 200
        user = get_response.json()
        assert user["name"] == "Alice"
        assert user["email"] == "alice@example.com"

    def test_update_user(self):
        # Create user
        user = self._create_test_user()

        # Update user
        update_response = requests.put(
            f"{self.BASE_URL}/users/{user['id']}",
            json={"name": "Alice Updated"}
        )

        assert update_response.status_code == 200

        # Verify update
        get_response = requests.get(
            f"{self.BASE_URL}/users/{user['id']}"
        )
        assert get_response.json()["name"] == "Alice Updated"

    def test_error_handling(self):
        # Test 404 for non-existent user
        response = requests.get(
            f"{self.BASE_URL}/users/99999"
        )
        assert response.status_code == 404

        # Test 400 for invalid data
        response = requests.post(
            f"{self.BASE_URL}/users",
            json={"name": ""}  # Invalid: empty name
        )
        assert response.status_code == 400
```

### Database Integration Testing

Testing database interactions:

```python
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

class TestDatabaseIntegration:
    @pytest.fixture(autouse=True)
    def setup_database(self):
        # Setup test database
        self.engine = create_engine('sqlite:///:memory:')
        Base.metadata.create_all(self.engine)
        Session = sessionmaker(bind=self.engine)
        self.session = Session()

        yield

        # Teardown
        self.session.close()
        Base.metadata.drop_all(self.engine)

    def test_user_creation_and_retrieval(self):
        # Create user
        user = User(name="Alice", email="alice@example.com")
        self.session.add(user)
        self.session.commit()

        # Retrieve user
        retrieved = self.session.query(User).filter_by(
            email="alice@example.com"
        ).first()

        assert retrieved is not None
        assert retrieved.name == "Alice"

    def test_relationship_loading(self):
        # Create user with orders
        user = User(name="Alice")
        order1 = Order(user=user, total=100.00)
        order2 = Order(user=user, total=50.00)

        self.session.add_all([user, order1, order2])
        self.session.commit()

        # Test relationship
        retrieved_user = self.session.query(User).filter_by(
            name="Alice"
        ).first()

        assert len(retrieved_user.orders) == 2
        assert sum(o.total for o in retrieved_user.orders) == 150.00

    def test_transaction_rollback(self):
        user = User(name="Alice")
        self.session.add(user)

        try:
            # Simulate error during transaction
            self.session.flush()
            raise Exception("Simulated error")
        except:
            self.session.rollback()

        # User should not be persisted
        count = self.session.query(User).count()
        assert count == 0
```

### Message Queue Integration

Testing asynchronous messaging:

```python
import pytest
from unittest.mock import Mock, patch
import json

class TestMessageQueueIntegration:
    def test_publish_and_consume_message(self):
        # Setup
        queue = MessageQueue("test_queue")
        received_messages = []

        def message_handler(message):
            received_messages.append(message)

        queue.subscribe(message_handler)

        # Publish message
        test_message = {
            "type": "ORDER_CREATED",
            "order_id": "123",
            "total": 100.00
        }
        queue.publish(test_message)

        # Wait for async processing
        queue.wait_for_processing()

        # Verify
        assert len(received_messages) == 1
        assert received_messages[0]["order_id"] == "123"

    def test_message_processing_error_handling(self):
        queue = MessageQueue("test_queue")
        errors = []

        def failing_handler(message):
            raise ValueError("Processing failed")

        def error_handler(error):
            errors.append(error)

        queue.subscribe(failing_handler)
        queue.on_error(error_handler)

        # Publish message
        queue.publish({"data": "test"})
        queue.wait_for_processing()

        # Verify error was captured
        assert len(errors) == 1
        assert isinstance(errors[0], ValueError)
```

## Testing External Dependencies

### Mock External Services

```python
import responses
import requests

class TestExternalServiceIntegration:
    @responses.activate
    def test_third_party_api_integration(self):
        # Mock external API
        responses.add(
            responses.GET,
            'https://api.external.com/data',
            json={'result': 'success', 'data': [1, 2, 3]},
            status=200
        )

        # Test code that calls external API
        client = ExternalAPIClient()
        result = client.get_data()

        assert result['result'] == 'success'
        assert len(result['data']) == 3

    @responses.activate
    def test_api_timeout_handling(self):
        # Mock timeout
        responses.add(
            responses.GET,
            'https://api.external.com/data',
            body=requests.exceptions.Timeout()
        )

        client = ExternalAPIClient()

        with pytest.raises(APITimeoutError):
            client.get_data()
```

### Contract Testing

Verify that services meet agreed-upon contracts:

```python
# Provider test (API service)
def test_user_api_contract():
    """Verify API provides expected contract."""
    response = requests.get("/api/users/1")

    assert response.status_code == 200
    data = response.json()

    # Verify contract schema
    assert "id" in data
    assert "name" in data
    assert "email" in data
    assert isinstance(data["id"], int)
    assert isinstance(data["name"], str)

# Consumer test (client code)
def test_client_expects_correct_contract():
    """Verify client handles API contract correctly."""
    mock_response = {
        "id": 1,
        "name": "Alice",
        "email": "alice@example.com"
    }

    client = UserAPIClient()
    user = client.parse_user_response(mock_response)

    assert user.id == 1
    assert user.name == "Alice"
```

## Integration Test Best Practices

### Use Test Containers

```python
from testcontainers.postgres import PostgresContainer

def test_with_real_database():
    with PostgresContainer("postgres:13") as postgres:
        engine = create_engine(postgres.get_connection_url())
        # Run tests with real PostgreSQL instance
        # Container automatically cleaned up after test
```

### Isolate Test Data

```python
@pytest.fixture
def clean_database():
    """Ensure clean state for each test."""
    db.clear_all_tables()
    yield
    db.clear_all_tables()

def test_with_isolation(clean_database):
    # Test runs with clean database
    user = create_user("alice")
    assert user.id is not None
```

### Test Realistic Scenarios

```python
def test_realistic_order_workflow():
    """Test realistic multi-step workflow."""
    # Step 1: Browse products
    products = catalog.search("laptop")

    # Step 2: Add to cart
    cart = ShoppingCart()
    cart.add(products[0], quantity=1)

    # Step 3: Apply coupon
    cart.apply_coupon("SAVE10")

    # Step 4: Checkout
    order = checkout.process(cart, payment_info, shipping_address)

    # Step 5: Verify complete workflow
    assert order.status == "CONFIRMED"
    assert inventory.is_reserved(order.items)
    assert payment.is_charged(order.total)
    assert notification.was_sent_to(user.email)
```

## Summary

Integration testing validates that components work together correctly, revealing issues that unit tests cannot detect. By employing appropriate integration strategies—whether top-down, bottom-up, or hybrid—and testing realistic interactions between components, databases, APIs, and external services, teams can build confidence that their systems function correctly as a whole. Effective integration testing balances thoroughness with maintainability, using techniques like contract testing and test containers to create reliable, repeatable tests.
