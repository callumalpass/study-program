# Testing Fundamentals

Understanding the fundamental concepts of software testing is essential for developing high-quality software. Testing fundamentals provide the theoretical foundation and core principles that underpin all testing activities, from simple unit tests to complex system validation.

## What is Software Testing?

Software testing is the process of evaluating a software system or its components to determine whether it satisfies specified requirements and to identify defects. More broadly, testing assesses software quality and provides stakeholders with information about the product's readiness for release.

### Testing vs. Debugging

It's crucial to distinguish between testing and debugging:

- **Testing**: The process of finding defects by executing the software
- **Debugging**: The process of locating and fixing the cause of defects

Testing reveals that problems exist; debugging identifies and resolves them.

## Verification vs. Validation

Two complementary approaches form the foundation of software testing:

### Verification

**"Are we building the product right?"**

Verification ensures that software correctly implements specific functions. It checks that the product conforms to its specification through reviews, inspections, and testing.

**Key characteristics:**
- Focuses on consistency, completeness, and correctness of software artifacts
- Performed without executing code (static testing) or with execution (dynamic testing)
- Answers: Does the output match the input specifications?
- Examples: Code reviews, design inspections, unit testing

### Validation

**"Are we building the right product?"**

Validation ensures that the software meets the user's actual needs and requirements. It checks whether the product satisfies its intended use in the target environment.

**Key characteristics:**
- Focuses on stakeholder needs and business value
- Always involves actual execution of software
- Answers: Does this software solve the user's problem?
- Examples: User acceptance testing, beta testing, usability testing

## Test Levels

Testing occurs at multiple levels, each targeting different aspects of the system:

### Unit Testing

Tests individual components or functions in isolation.

```python
def calculate_discount(price, discount_percent):
    """Calculate discounted price."""
    if discount_percent < 0 or discount_percent > 100:
        raise ValueError("Discount must be between 0 and 100")
    return price * (1 - discount_percent / 100)

# Unit test
def test_calculate_discount():
    assert calculate_discount(100, 20) == 80
    assert calculate_discount(50, 10) == 45

def test_invalid_discount():
    try:
        calculate_discount(100, 150)
        assert False, "Should raise ValueError"
    except ValueError:
        pass  # Expected
```

**Characteristics:**
- Smallest testable units
- Fast execution
- High test coverage
- Developer-written
- Forms the base of the test pyramid

### Integration Testing

Tests interactions between components or systems.

```java
public class OrderService {
    private PaymentGateway paymentGateway;
    private InventoryService inventoryService;

    public Order processOrder(Cart cart, PaymentInfo payment) {
        // Check inventory
        if (!inventoryService.checkAvailability(cart.getItems())) {
            throw new OutOfStockException();
        }

        // Process payment
        PaymentResult result = paymentGateway.charge(
            payment, cart.getTotal()
        );

        if (result.isSuccessful()) {
            inventoryService.reserveItems(cart.getItems());
            return new Order(cart, result.getTransactionId());
        }

        throw new PaymentFailedException();
    }
}

// Integration test
@Test
public void testSuccessfulOrderProcessing() {
    // Use real or realistic test doubles
    PaymentGateway gateway = new TestPaymentGateway();
    InventoryService inventory = new TestInventoryService();
    OrderService service = new OrderService(gateway, inventory);

    Cart cart = createTestCart();
    PaymentInfo payment = createTestPayment();

    Order order = service.processOrder(cart, payment);

    assertNotNull(order);
    assertTrue(inventory.isReserved(cart.getItems()));
}
```

**Characteristics:**
- Tests component interactions
- Identifies interface defects
- Moderate execution speed
- Can use test doubles or real components

### System Testing

Tests the complete integrated system against requirements.

**Characteristics:**
- End-to-end functionality
- Includes both functional and non-functional testing
- Performed in environment similar to production
- Black-box testing approach

### Acceptance Testing

Validates that the system meets business requirements and is ready for delivery.

**Types:**
- **User Acceptance Testing (UAT)**: End users verify the system
- **Operational Acceptance Testing**: IT staff verify deployment readiness
- **Contract Acceptance Testing**: Verify contractual requirements
- **Compliance Acceptance Testing**: Regulatory compliance verification

## Testing Types

### Functional Testing

Verifies what the system does—its features and functions.

```javascript
// E-commerce functional test example
describe('Shopping Cart', () => {
    it('should add items to cart', () => {
        const cart = new ShoppingCart();
        const item = { id: 1, name: 'Widget', price: 29.99 };

        cart.addItem(item, 2);

        expect(cart.getItemCount()).toBe(2);
        expect(cart.getTotal()).toBe(59.98);
    });

    it('should apply coupon codes', () => {
        const cart = new ShoppingCart();
        cart.addItem({ id: 1, price: 100 }, 1);

        cart.applyCoupon('SAVE20');

        expect(cart.getTotal()).toBe(80);
    });
});
```

### Non-Functional Testing

Verifies how well the system performs—its quality attributes.

**Performance Testing:**
```python
import time

def test_response_time():
    """Verify API responds within acceptable time."""
    start = time.time()
    response = api.get('/users')
    duration = time.time() - start

    assert duration < 0.5, f"Response took {duration}s, expected < 0.5s"
    assert response.status_code == 200
```

**Load Testing:**
```python
from locust import HttpUser, task, between

class WebsiteUser(HttpUser):
    wait_time = between(1, 5)

    @task
    def view_homepage(self):
        self.client.get("/")

    @task(3)  # 3x weight
    def view_product(self):
        self.client.get("/products/123")

    @task
    def search(self):
        self.client.get("/search?q=laptop")
```

**Security Testing:**
- Vulnerability scanning
- Penetration testing
- Authentication/authorization testing
- SQL injection and XSS prevention

**Usability Testing:**
- User interface evaluation
- Accessibility compliance
- User experience assessment

## Test Design Techniques

### Black-Box Testing

Tests functionality without knowledge of internal implementation.

**Equivalence Partitioning:**
```python
def test_age_validation():
    """Test age input with equivalence classes."""
    validator = AgeValidator()

    # Valid partition: 0-120
    assert validator.is_valid(25) == True
    assert validator.is_valid(0) == True
    assert validator.is_valid(120) == True

    # Invalid partitions
    assert validator.is_valid(-1) == False
    assert validator.is_valid(121) == False
```

**Boundary Value Analysis:**
```python
def test_boundary_values():
    """Test boundaries of acceptable input ranges."""
    # For range 1-100, test: 0, 1, 100, 101
    assert is_valid_percentage(0) == False
    assert is_valid_percentage(1) == True
    assert is_valid_percentage(100) == True
    assert is_valid_percentage(101) == False
```

### White-Box Testing

Tests with knowledge of internal structure and implementation.

**Coverage Metrics:**

Code coverage measures what percentage of code is executed by tests:

$$
\text{Statement Coverage} = \frac{\text{Statements Executed}}{\text{Total Statements}} \times 100\%
$$

$$
\text{Branch Coverage} = \frac{\text{Branches Taken}}{\text{Total Branches}} \times 100\%
$$

$$
\text{Path Coverage} = \frac{\text{Paths Tested}}{\text{Total Possible Paths}} \times 100\%
$$

**Statement Coverage:**
```python
def absolute_value(x):
    if x < 0:          # Line 1
        return -x      # Line 2
    return x           # Line 3

# Tests for 100% statement coverage
def test_statement_coverage():
    assert absolute_value(-5) == 5   # Covers lines 1, 2
    assert absolute_value(5) == 5    # Covers lines 1, 3
```

**Branch Coverage:**
```python
def classify_grade(score):
    if score >= 90:
        return 'A'
    elif score >= 80:
        return 'B'
    elif score >= 70:
        return 'C'
    else:
        return 'F'

# Tests for branch coverage
def test_all_branches():
    assert classify_grade(95) == 'A'  # First branch
    assert classify_grade(85) == 'B'  # Second branch
    assert classify_grade(75) == 'C'  # Third branch
    assert classify_grade(65) == 'F'  # Else branch
```

## Error Guessing and Exploratory Testing

### Error Guessing

Using experience to anticipate likely defects:

```python
def test_common_errors():
    """Test commonly problematic scenarios."""
    # Empty inputs
    assert process_list([]) == []

    # Null/None values
    assert handle_user(None) raises ValueError

    # Special characters
    assert sanitize_input("'; DROP TABLE--") is safe

    # Very large numbers
    assert calculate(10**100) handles correctly

    # Concurrent access
    # Test race conditions, deadlocks
```

### Exploratory Testing

Simultaneous learning, test design, and execution where testers actively explore the software to discover defects.

## Test Oracle Problem

How do we know if a test passed? The test oracle is the mechanism for determining expected results.

**Types of oracles:**
- **Specification-based**: Compare to documented requirements
- **Heuristic**: Use rules of thumb and patterns
- **Consistency**: Compare with previous versions
- **Comparable products**: Compare with similar systems

## Summary

Testing fundamentals establish the conceptual framework for all testing activities. Understanding verification versus validation, test levels, testing types, and design techniques enables testers to make informed decisions about testing strategies. These principles apply regardless of specific technologies, frameworks, or methodologies—they represent timeless concepts in software quality assurance.
