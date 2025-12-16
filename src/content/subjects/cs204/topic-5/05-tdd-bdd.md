# Test-Driven Development and Behavior-Driven Development

Test-Driven Development (TDD) and Behavior-Driven Development (BDD) represent paradigm shifts in how we approach software development. Rather than writing tests after code, these methodologies place testing at the center of the development process, fundamentally changing how we design and build software.

## Test-Driven Development (TDD)

TDD is a software development approach where tests are written before the production code. This practice shapes design, clarifies requirements, and ensures high test coverage from the start.

### The TDD Cycle: Red-Green-Refactor

The core of TDD follows a simple three-step cycle:

**1. Red - Write a Failing Test**
```python
# test_calculator.py
def test_add_two_numbers():
    calc = Calculator()
    result = calc.add(2, 3)
    assert result == 5
```

Running this test fails because `Calculator` doesn't exist yet. This is expected and correct—we write the test first.

**2. Green - Write Minimal Code to Pass**
```python
# calculator.py
class Calculator:
    def add(self, a, b):
        return a + b
```

Write just enough code to make the test pass. Nothing more.

**3. Refactor - Improve Code Quality**
```python
# If needed, refactor while keeping tests green
class Calculator:
    def add(self, a: float, b: float) -> float:
        """Add two numbers and return the sum."""
        return a + b
```

Improve code structure, add type hints, enhance readability—all while ensuring tests remain green.

### TDD in Practice: Building a String Calculator

Let's build a string calculator using TDD, starting with the simplest functionality and gradually adding complexity.

**Iteration 1: Empty String**
```python
# Test first
def test_empty_string_returns_zero():
    calc = StringCalculator()
    assert calc.add("") == 0

# Implementation
class StringCalculator:
    def add(self, numbers: str) -> int:
        return 0
```

**Iteration 2: Single Number**
```python
# Test
def test_single_number_returns_value():
    calc = StringCalculator()
    assert calc.add("1") == 1
    assert calc.add("5") == 5

# Implementation
class StringCalculator:
    def add(self, numbers: str) -> int:
        if not numbers:
            return 0
        return int(numbers)
```

**Iteration 3: Two Numbers**
```python
# Test
def test_two_numbers_returns_sum():
    calc = StringCalculator()
    assert calc.add("1,2") == 3
    assert calc.add("5,10") == 15

# Implementation
class StringCalculator:
    def add(self, numbers: str) -> int:
        if not numbers:
            return 0
        parts = numbers.split(',')
        return sum(int(x) for x in parts)
```

**Iteration 4: Multiple Numbers**
```python
# Test
def test_multiple_numbers_returns_sum():
    calc = StringCalculator()
    assert calc.add("1,2,3") == 6
    assert calc.add("1,2,3,4,5") == 15

# Implementation already handles this! Test passes without changes.
```

**Iteration 5: Newline Delimiters**
```python
# Test
def test_newline_delimiter():
    calc = StringCalculator()
    assert calc.add("1\n2,3") == 6

# Implementation
class StringCalculator:
    def add(self, numbers: str) -> int:
        if not numbers:
            return 0
        # Handle both comma and newline
        numbers = numbers.replace('\n', ',')
        parts = numbers.split(',')
        return sum(int(x) for x in parts)
```

**Iteration 6: Negative Numbers**
```python
# Test
def test_negative_numbers_throw_exception():
    calc = StringCalculator()
    with pytest.raises(ValueError, match="Negatives not allowed: -2, -5"):
        calc.add("1,-2,3,-5")

# Implementation
class StringCalculator:
    def add(self, numbers: str) -> int:
        if not numbers:
            return 0

        numbers = numbers.replace('\n', ',')
        parts = numbers.split(',')
        values = [int(x) for x in parts]

        negatives = [x for x in values if x < 0]
        if negatives:
            raise ValueError(
                f"Negatives not allowed: {', '.join(map(str, negatives))}"
            )

        return sum(values)
```

### Benefits of TDD

**Design Improvement**
```python
# TDD encourages better design
# Without TDD - might write this:
class UserService:
    def create_user(self, name, email):
        # Direct database access, hard to test
        db = Database()
        db.insert("users", {"name": name, "email": email})

# With TDD - leads to this:
class UserService:
    def __init__(self, user_repository):
        self.repository = user_repository

    def create_user(self, name, email):
        # Dependency injection makes testing easy
        user = User(name, email)
        return self.repository.save(user)
```

**Living Documentation**
```python
class TestShoppingCart:
    def test_new_cart_is_empty(self):
        """A newly created cart should have no items."""
        cart = ShoppingCart()
        assert cart.item_count == 0

    def test_adding_item_increases_count(self):
        """Adding an item should increase the cart count."""
        cart = ShoppingCart()
        cart.add_item(Item("Widget", 10.00))
        assert cart.item_count == 1

    def test_total_calculates_sum_of_items(self):
        """Total should be the sum of all item prices."""
        cart = ShoppingCart()
        cart.add_item(Item("Widget", 10.00))
        cart.add_item(Item("Gadget", 15.00))
        assert cart.total == 25.00
```

The tests serve as documentation showing exactly how the `ShoppingCart` should behave.

### TDD with Legacy Code

Applying TDD to existing code requires characterization tests:

```python
# Legacy code without tests
def calculate_shipping(weight, distance, is_expedited):
    cost = weight * 0.5
    if distance > 100:
        cost += 10
    if is_expedited:
        cost *= 2
    if weight > 50:
        cost += 25
    return cost

# Characterization tests document current behavior
def test_shipping_standard_short_distance():
    """Document current behavior."""
    assert calculate_shipping(10, 50, False) == 5.0

def test_shipping_standard_long_distance():
    assert calculate_shipping(10, 150, False) == 15.0

def test_shipping_expedited():
    assert calculate_shipping(10, 50, True) == 10.0

def test_shipping_heavy_package():
    assert calculate_shipping(60, 50, False) == 55.0

# Now we can refactor safely
def calculate_shipping(weight, distance, is_expedited):
    """Calculate shipping cost based on weight, distance, and speed."""
    base_cost = weight * 0.5

    if distance > 100:
        base_cost += 10

    if weight > 50:
        base_cost += 25

    return base_cost * 2 if is_expedited else base_cost
```

## Behavior-Driven Development (BDD)

BDD extends TDD by focusing on system behavior from a stakeholder perspective. It uses natural language to describe features and scenarios, making tests understandable to both technical and non-technical team members.

### The Three Amigos

BDD emphasizes collaboration between:
- **Business** (Product Owner): What should it do?
- **Development** (Developer): How will we build it?
- **Testing** (QA): What could go wrong?

### Gherkin: Given-When-Then

BDD uses Gherkin syntax to describe behavior:

```gherkin
Feature: Shopping Cart
  As a customer
  I want to add items to my cart
  So that I can purchase multiple products at once

  Scenario: Adding a product to an empty cart
    Given the shopping cart is empty
    When I add a "Laptop" priced at $999.99 to the cart
    Then the cart should contain 1 item
    And the cart total should be $999.99

  Scenario: Adding multiple products
    Given the shopping cart is empty
    When I add a "Laptop" priced at $999.99 to the cart
    And I add a "Mouse" priced at $29.99 to the cart
    Then the cart should contain 2 items
    And the cart total should be $1029.98

  Scenario: Applying a discount code
    Given the shopping cart contains:
      | Product  | Price   | Quantity |
      | Laptop   | $999.99 | 1        |
      | Mouse    | $29.99  | 1        |
    When I apply the discount code "SAVE10"
    Then the discount should be 10%
    And the cart total should be $926.98
```

### Implementing BDD with Python (behave)

```python
# features/shopping_cart.feature
Feature: Shopping Cart
  Scenario: Adding a product to an empty cart
    Given the shopping cart is empty
    When I add a "Laptop" priced at $999.99 to the cart
    Then the cart should contain 1 item
    And the cart total should be $999.99

# features/steps/cart_steps.py
from behave import given, when, then
from shopping_cart import ShoppingCart, Product

@given('the shopping cart is empty')
def step_empty_cart(context):
    context.cart = ShoppingCart()

@when('I add a "{product_name}" priced at ${price:f} to the cart')
def step_add_product(context, product_name, price):
    product = Product(product_name, price)
    context.cart.add(product)

@then('the cart should contain {count:d} item')
@then('the cart should contain {count:d} items')
def step_verify_count(context, count):
    assert context.cart.item_count == count

@then('the cart total should be ${total:f}')
def step_verify_total(context, total):
    assert abs(context.cart.total - total) < 0.01
```

### BDD with JavaScript (Cucumber)

```javascript
// features/shopping_cart.feature
Feature: Shopping Cart
  Scenario: Adding a product to an empty cart
    Given the shopping cart is empty
    When I add a "Laptop" priced at $999.99 to the cart
    Then the cart should contain 1 item
    And the cart total should be $999.99

// features/step_definitions/cart_steps.js
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const ShoppingCart = require('../../src/ShoppingCart');
const Product = require('../../src/Product');

Given('the shopping cart is empty', function() {
    this.cart = new ShoppingCart();
});

When('I add a {string} priced at ${float} to the cart',
    function(productName, price) {
        const product = new Product(productName, price);
        this.cart.add(product);
    }
);

Then('the cart should contain {int} item(s)', function(count) {
    expect(this.cart.itemCount).to.equal(count);
});

Then('the cart total should be ${float}', function(total) {
    expect(this.cart.total).to.be.closeTo(total, 0.01);
});
```

### Advanced BDD: Scenario Outlines

Test multiple variations with examples:

```gherkin
Feature: Discount Calculator

  Scenario Outline: Calculate discount based on order total
    Given I have an order totaling $<total>
    When I apply the standard discount rules
    Then I should receive a <discount>% discount
    And my final total should be $<final>

    Examples:
      | total  | discount | final   |
      | 50.00  | 0        | 50.00   |
      | 100.00 | 5        | 95.00   |
      | 250.00 | 10       | 225.00  |
      | 500.00 | 15       | 425.00  |
      | 1000.00| 20       | 800.00  |
```

### BDD for API Testing

```gherkin
Feature: User API
  Scenario: Creating a new user
    Given I am authenticated as an admin
    When I send a POST request to "/api/users" with:
      """
      {
        "name": "Alice Smith",
        "email": "alice@example.com",
        "role": "user"
      }
      """
    Then the response status should be 201
    And the response should contain:
      """
      {
        "id": <any number>,
        "name": "Alice Smith",
        "email": "alice@example.com",
        "role": "user",
        "created_at": "<any ISO date>"
      }
      """

  Scenario: Cannot create user with duplicate email
    Given a user exists with email "existing@example.com"
    When I send a POST request to "/api/users" with:
      """
      {
        "name": "Duplicate User",
        "email": "existing@example.com"
      }
      """
    Then the response status should be 409
    And the response should contain an error "Email already exists"
```

Implementation:

```python
from behave import given, when, then
import requests
import json

@given('I am authenticated as an admin')
def step_authenticate_admin(context):
    context.token = get_admin_token()

@when('I send a POST request to "{endpoint}" with')
def step_post_request(context, endpoint):
    headers = {'Authorization': f'Bearer {context.token}'}
    data = json.loads(context.text)
    context.response = requests.post(
        f"{BASE_URL}{endpoint}",
        json=data,
        headers=headers
    )

@then('the response status should be {status:d}')
def step_verify_status(context, status):
    assert context.response.status_code == status

@then('the response should contain')
def step_verify_response_contains(context):
    expected = json.loads(context.text)
    actual = context.response.json()

    for key, value in expected.items():
        if value == "<any number>":
            assert isinstance(actual[key], (int, float))
        elif value.startswith("<any "):
            # Handle dynamic matchers
            pass
        else:
            assert actual[key] == value
```

## TDD vs BDD: When to Use Each

### Use TDD When:
- Building low-level components and utilities
- Working on algorithmic solutions
- Developing libraries or frameworks
- Team is primarily technical

### Use BDD When:
- Defining user-facing features
- Collaborating with non-technical stakeholders
- Acceptance criteria need to be clear
- Business rules are complex

### Use Both:
```gherkin
# BDD for high-level behavior
Feature: Order Processing
  Scenario: Processing a valid order
    Given I have items in my cart
    When I complete the checkout process
    Then my order should be confirmed
    And I should receive a confirmation email
```

```python
# TDD for implementation details
def test_order_total_calculation():
    order = Order()
    order.add_item(Item("Widget", 10.00), quantity=2)
    order.add_item(Item("Gadget", 15.00), quantity=1)
    assert order.subtotal == 35.00

def test_apply_tax():
    order = Order()
    order.add_item(Item("Widget", 100.00))
    order.apply_tax(0.08)  # 8% tax
    assert order.total == 108.00

def test_apply_discount_code():
    order = Order()
    order.add_item(Item("Widget", 100.00))
    order.apply_discount("SAVE20")
    assert order.total == 80.00
```

## Common Pitfalls and Best Practices

### Pitfall: Testing Implementation Details
```python
# Bad: Tests implementation
def test_uses_correct_algorithm():
    calc = Calculator()
    assert calc.add(2, 3) == calc.num1 + calc.num2  # Testing how

# Good: Tests behavior
def test_adds_two_numbers():
    calc = Calculator()
    assert calc.add(2, 3) == 5  # Testing what
```

### Pitfall: Tests Too Large
```python
# Bad: Tests everything at once
def test_entire_user_workflow():
    # 50 lines of setup and assertions
    # Hard to debug when it fails

# Good: Small, focused tests
def test_user_registration_creates_account():
    user = register("alice@example.com")
    assert user.is_active

def test_registered_user_can_login():
    register("alice@example.com", "password")
    session = login("alice@example.com", "password")
    assert session.is_authenticated
```

### Best Practice: Test Behavior, Not Implementation
Focus on what the code does, not how it does it. This allows refactoring without breaking tests.

## Summary

TDD and BDD transform testing from an afterthought into a design tool. TDD's Red-Green-Refactor cycle produces well-designed, thoroughly tested code. BDD's Given-When-Then syntax bridges communication gaps between stakeholders and developers. Together, they create a comprehensive approach to building software that meets requirements, maintains quality, and remains maintainable over time. These practices require discipline but pay dividends in code quality, design clarity, and team collaboration.
