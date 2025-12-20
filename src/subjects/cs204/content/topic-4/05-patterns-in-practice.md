# Design Patterns in Practice

Understanding when and how to apply design patterns is as important as understanding the patterns themselves. This section explores practical considerations, common pitfalls, and anti-patterns to avoid.

## When to Use Design Patterns

Design patterns are powerful tools, but they're not a silver bullet. Knowing when to apply them requires judgment and experience.

### Pattern Selection Criteria

#### Problem Recognition

The first step is recognizing that you have a problem that matches a pattern's intent. Ask yourself:
- Have I seen this problem before?
- Does this problem involve object creation, structure, or behavior?
- What are the forces at play (flexibility vs. simplicity, performance vs. maintainability)?

#### Context Appropriateness

Consider whether the pattern fits your specific context:

```python
# DON'T use Singleton just for convenience
class ConfigManager:
    """Bad: Using Singleton when a simple module would work"""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# DO use a simple module-level variable in Python
# config.py
_config = {
    'api_url': 'https://api.example.com',
    'timeout': 5000
}

def get(key):
    return _config[key]

def set(key, value):
    _config[key] = value
```

#### Complexity Justification

Patterns add complexity. Ensure the benefits outweigh the costs:

```python
# Simple problem - don't use Strategy pattern
def calculate_discount(amount, customer_type):
    if customer_type == "regular":
        return amount * 0.05
    elif customer_type == "premium":
        return amount * 0.10
    elif customer_type == "vip":
        return amount * 0.20
    return 0

# Complex problem - Strategy pattern justified
class DiscountStrategy:
    """Use when discount logic is complex and likely to change"""
    def calculate(self, amount, purchase_history, season, promotions):
        # Complex calculation involving multiple factors
        pass

class RegularCustomerDiscount(DiscountStrategy):
    def calculate(self, amount, purchase_history, season, promotions):
        base_discount = amount * 0.05
        # Add logic for purchase history, seasonal promotions, etc.
        return base_discount

class PremiumCustomerDiscount(DiscountStrategy):
    def calculate(self, amount, purchase_history, season, promotions):
        base_discount = amount * 0.10
        # More complex premium customer logic
        return base_discount
```

### Signs You Need a Pattern

- **Repeated Code**: Similar code structures appearing in multiple places
- **Rigid Design**: Difficult to modify or extend without affecting existing code
- **Fragile Code**: Changes in one area break unexpected parts of the system
- **Code Smells**: Long methods, large classes, excessive parameters
- **Anticipated Change**: Areas known to require frequent modification

### Signs You Don't Need a Pattern

- **YAGNI Violation**: "You Aren't Gonna Need It" - adding patterns for hypothetical future needs
- **Over-Engineering**: The solution is more complex than the problem
- **Premature Optimization**: Optimizing before understanding actual needs
- **Pattern Fever**: Using patterns because you just learned about them

## Common Pattern Combinations

Patterns often work together. Understanding common combinations helps you build robust designs.

### Factory + Singleton

```python
class DatabaseConnectionFactory:
    """Singleton factory for creating database connections"""
    _instance = None
    _connections = {}

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def get_connection(self, db_type):
        """Factory method within singleton"""
        if db_type not in self._connections:
            if db_type == "mysql":
                self._connections[db_type] = MySQLConnection()
            elif db_type == "postgres":
                self._connections[db_type] = PostgresConnection()
            else:
                raise ValueError(f"Unknown database type: {db_type}")
        return self._connections[db_type]

# Usage
factory = DatabaseConnectionFactory()
mysql_conn = factory.get_connection("mysql")
postgres_conn = factory.get_connection("postgres")
```

### Strategy + Factory

```python
class SortStrategyFactory:
    """Factory for creating sort strategies"""
    @staticmethod
    def create_strategy(data_size):
        """Choose strategy based on data characteristics"""
        if data_size < 100:
            return QuickSortStrategy()
        elif data_size < 10000:
            return MergeSortStrategy()
        else:
            return HeapSortStrategy()

class Sorter:
    def __init__(self, strategy):
        self.strategy = strategy

    def sort(self, data):
        return self.strategy.sort(data)

# Usage
data = list(range(1000))
strategy = SortStrategyFactory.create_strategy(len(data))
sorter = Sorter(strategy)
sorted_data = sorter.sort(data)
```

### Observer + Command

```python
class CommandHistory:
    """Command pattern with Observer for change notifications"""
    def __init__(self):
        self.commands = []
        self.observers = []

    def execute(self, command):
        command.execute()
        self.commands.append(command)
        self._notify_observers()

    def undo(self):
        if self.commands:
            command = self.commands.pop()
            command.undo()
            self._notify_observers()

    def attach_observer(self, observer):
        self.observers.append(observer)

    def _notify_observers(self):
        for observer in self.observers:
            observer.update(self)

# UI can observe command history to update undo/redo buttons
class UIObserver:
    def update(self, history):
        can_undo = len(history.commands) > 0
        print(f"Undo button enabled: {can_undo}")
```

### Composite + Iterator

```python
class Component:
    """Composite pattern with iteration support"""
    def __init__(self, name):
        self.name = name

    def __iter__(self):
        return iter([])

class Composite(Component):
    def __init__(self, name):
        super().__init__(name)
        self.children = []

    def add(self, component):
        self.children.append(component)

    def __iter__(self):
        """Enable iteration over entire tree"""
        yield self
        for child in self.children:
            yield from child

# Usage - iterate over entire tree structure
root = Composite("root")
child1 = Composite("child1")
child2 = Component("child2")

child1.add(Component("grandchild"))
root.add(child1)
root.add(child2)

for component in root:
    print(component.name)
# Output: root, child1, grandchild, child2
```

## Anti-Patterns to Avoid

Anti-patterns are common but ineffective solutions to recurring problems. Recognizing them helps you avoid mistakes.

### Golden Hammer

Using a familiar pattern for every problem, regardless of fit.

```python
# BAD: Using Observer for everything
class UserManager:
    """Don't turn everything into Observer pattern"""
    def __init__(self):
        self.observers = []

    def create_user(self, username):
        user = User(username)
        self._notify(user)  # Unnecessary complexity
        return user

    def _notify(self, user):
        for observer in self.observers:
            observer.update(user)

# GOOD: Simple, direct approach
class UserManager:
    def create_user(self, username):
        return User(username)
```

### God Object Singleton

Creating a Singleton that does everything, violating Single Responsibility Principle.

```python
# BAD: God object Singleton
class ApplicationManager:
    """Anti-pattern: Singleton that does everything"""
    _instance = None

    def __init__(self):
        self.database = None
        self.config = {}
        self.cache = {}
        self.logger = None

    def connect_database(self): pass
    def load_config(self): pass
    def log_message(self): pass
    def cache_data(self): pass
    def send_email(self): pass
    def process_payment(self): pass
    # ... 50 more methods

# GOOD: Separate concerns
class DatabaseManager: pass
class ConfigManager: pass
class CacheManager: pass
class Logger: pass
class EmailService: pass
class PaymentProcessor: pass
```

### Pattern Overload

Using multiple patterns when simple code would suffice.

```python
# BAD: Over-engineered for simple task
class NumberFormatterFactory:
    """Unnecessary pattern for simple formatting"""
    def create_formatter(self, format_type):
        if format_type == "decimal":
            return DecimalFormatterStrategy()
        elif format_type == "hex":
            return HexFormatterStrategy()

class FormatterContext:
    def __init__(self, strategy):
        self.strategy = strategy

    def format(self, number):
        return self.strategy.format(number)

# GOOD: Simple function
def format_number(number, format_type="decimal"):
    """Simple is better than complex"""
    if format_type == "decimal":
        return str(number)
    elif format_type == "hex":
        return hex(number)
    return str(number)
```

### Circular Dependencies

Patterns that create circular dependencies between components.

```python
# BAD: Circular dependency
class OrderObserver:
    def __init__(self, inventory):
        self.inventory = inventory

    def update(self, order):
        self.inventory.notify_order(order)  # Circular!

class Inventory:
    def __init__(self):
        self.observers = []

    def notify_order(self, order):
        for observer in self.observers:
            observer.update(order)  # Calls back to OrderObserver

# GOOD: One-way dependency
class Inventory:
    def update_from_order(self, order):
        """Direct method, no circular dependency"""
        self.reduce_stock(order.items)
```

## Refactoring to Patterns

Often, you don't start with patterns. You refactor to them when complexity emerges.

### Refactoring Example: Extract Strategy

```python
# Before: Conditional logic
class PaymentProcessor:
    def process(self, amount, payment_type, details):
        if payment_type == "credit_card":
            # Validate credit card
            card_number = details['card_number']
            cvv = details['cvv']
            if len(card_number) != 16:
                raise ValueError("Invalid card")
            # Process credit card payment
            print(f"Processing ${amount} via credit card")
        elif payment_type == "paypal":
            # Validate PayPal
            email = details['email']
            if '@' not in email:
                raise ValueError("Invalid email")
            # Process PayPal payment
            print(f"Processing ${amount} via PayPal")
        elif payment_type == "crypto":
            # Validate crypto wallet
            wallet = details['wallet']
            if len(wallet) < 20:
                raise ValueError("Invalid wallet")
            # Process crypto payment
            print(f"Processing ${amount} via crypto")

# After: Strategy pattern
class PaymentStrategy(ABC):
    @abstractmethod
    def validate(self, details):
        pass

    @abstractmethod
    def process(self, amount):
        pass

class CreditCardPayment(PaymentStrategy):
    def __init__(self, details):
        self.details = details
        self.validate(details)

    def validate(self, details):
        if len(details['card_number']) != 16:
            raise ValueError("Invalid card")

    def process(self, amount):
        print(f"Processing ${amount} via credit card")

class PaymentProcessor:
    def process(self, amount, strategy):
        """Now extensible and testable"""
        strategy.process(amount)
```

### Refactoring Example: Introduce Observer

```python
# Before: Tightly coupled notification
class Order:
    def place(self):
        self.status = "placed"
        # Tightly coupled to specific actions
        self.send_confirmation_email()
        self.update_inventory()
        self.notify_warehouse()

# After: Observer pattern
class Order:
    def __init__(self):
        self.status = None
        self.observers = []

    def attach(self, observer):
        self.observers.append(observer)

    def place(self):
        self.status = "placed"
        self.notify_observers()

    def notify_observers(self):
        for observer in self.observers:
            observer.update(self)

# Now loosely coupled
order = Order()
order.attach(EmailNotifier())
order.attach(InventoryUpdater())
order.attach(WarehouseNotifier())
order.place()
```

## Testing Patterns

Design patterns should make code more testable, not less.

### Testing Strategy Pattern

```python
import unittest

class TestPaymentStrategies(unittest.TestCase):
    def test_credit_card_payment(self):
        """Strategy pattern makes testing individual strategies easy"""
        strategy = CreditCardPayment("1234567890123456", "123")

        # Mock the actual payment processing
        result = strategy.validate()
        self.assertTrue(result)

    def test_payment_processor_with_mock_strategy(self):
        """Can inject mock strategies for testing"""
        class MockPaymentStrategy:
            def __init__(self):
                self.was_called = False

            def pay(self, amount):
                self.was_called = True
                return True

        processor = PaymentProcessor()
        mock_strategy = MockPaymentStrategy()
        processor.set_strategy(mock_strategy)
        processor.process_payment(100)

        self.assertTrue(mock_strategy.was_called)
```

### Testing Observer Pattern

```python
class TestObserverPattern(unittest.TestCase):
    def test_observers_notified(self):
        """Test that all observers receive notifications"""
        subject = Subject()

        observer1 = MockObserver()
        observer2 = MockObserver()

        subject.attach(observer1)
        subject.attach(observer2)

        subject.set_state("new_state")

        self.assertTrue(observer1.was_updated)
        self.assertTrue(observer2.was_updated)
        self.assertEqual(observer1.last_state, "new_state")
```

## Summary

Effective use of design patterns requires understanding not just how they work, but when to apply them. Use patterns when they solve real problems and reduce complexity, not just because they exist. Be aware of anti-patterns and common pitfalls. Combine patterns thoughtfully, refactor to patterns when complexity emerges, and ensure patterns make your code more testable. Remember: simple, clear code that solves the problem is always better than complex code that showcases patterns.
