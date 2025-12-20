## Dependency Injection

Dependency Injection (DI) is a technique where a class receives its dependencies from the outside rather than creating them internally. This simple change dramatically improves testability and flexibility.

---

## The Problem: Hard-Coded Dependencies

```python
class OrderService:
    def __init__(self):
        self.db = PostgresDatabase()  # Hard-coded
        self.email = SMTPEmailService()  # Hard-coded
        self.logger = FileLogger("/var/log/app.log")  # Hard-coded

    def place_order(self, order: Order) -> None:
        self.db.save(order)
        self.email.send(order.customer_email, "Order confirmed")
        self.logger.log(f"Order {order.id} placed")
```

Problems with this approach:

- **Can't test without real database/email/files**
- **Can't swap implementations** (e.g., use different database)
- **Hidden dependencies** - you don't know what OrderService needs
- **Tight coupling** - changes ripple through the codebase

---

## The Solution: Inject Dependencies

```python
class OrderService:
    def __init__(self, db, email, logger):
        self.db = db
        self.email = email
        self.logger = logger

    def place_order(self, order: Order) -> None:
        self.db.save(order)
        self.email.send(order.customer_email, "Order confirmed")
        self.logger.log(f"Order {order.id} placed")

# Production
service = OrderService(
    PostgresDatabase(),
    SMTPEmailService(),
    FileLogger("/var/log/app.log")
)

# Testing
service = OrderService(
    FakeDatabase(),
    FakeEmailService(),
    FakeLogger()
)
```

---

## Types of Dependency Injection

### Constructor Injection (Preferred)

Dependencies passed through `__init__`:

```python
class PaymentProcessor:
    def __init__(self, gateway: PaymentGateway, logger: Logger):
        self._gateway = gateway
        self._logger = logger

    def process(self, amount: int) -> bool:
        self._logger.log(f"Processing {amount}")
        return self._gateway.charge(amount)
```

**Advantages:**
- Dependencies are explicit and required
- Object is fully initialized after construction
- Easy to see what a class needs

### Method Injection

Dependencies passed to specific methods:

```python
class ReportGenerator:
    def generate(self, data: list, formatter: Formatter) -> str:
        return formatter.format(data)

# Different formatters for different calls
generator = ReportGenerator()
html = generator.generate(data, HTMLFormatter())
pdf = generator.generate(data, PDFFormatter())
```

**Use when:** Dependency varies per call, not per instance.

### Property Injection

Dependencies set after construction:

```python
class Application:
    def __init__(self):
        self.logger = None  # Set later

    def run(self):
        if self.logger:
            self.logger.log("Starting")
        # ...

app = Application()
app.logger = FileLogger("app.log")
app.run()
```

**Use sparingly:** Can leave object in invalid state.

---

## Using Type Hints with DI

Type hints make dependencies explicit:

```python
from typing import Protocol

class Database(Protocol):
    def save(self, data: dict) -> int: ...
    def find(self, id: int) -> dict | None: ...

class EmailService(Protocol):
    def send(self, to: str, subject: str, body: str) -> None: ...

class OrderService:
    def __init__(self, db: Database, email: EmailService):
        self._db = db
        self._email = email

    def create_order(self, order_data: dict) -> int:
        order_id = self._db.save(order_data)
        self._email.send(
            order_data['customer_email'],
            "Order Confirmed",
            f"Your order #{order_id} has been placed"
        )
        return order_id
```

---

## Composition Root

Create all dependencies in one place at application startup:

```python
# composition_root.py
def create_app() -> Application:
    # Create low-level dependencies
    db = PostgresDatabase(os.environ['DATABASE_URL'])
    email = SMTPEmailService(os.environ['SMTP_HOST'])
    logger = FileLogger("/var/log/app.log")

    # Create services with dependencies
    user_service = UserService(db, email)
    order_service = OrderService(db, email, logger)
    payment_service = PaymentService(StripeGateway(), logger)

    # Create and return application
    return Application(
        user_service=user_service,
        order_service=order_service,
        payment_service=payment_service
    )

# main.py
if __name__ == "__main__":
    app = create_app()
    app.run()
```

---

## Testing with Dependency Injection

DI makes testing straightforward:

```python
class FakeDatabase:
    def __init__(self):
        self.saved = []
        self.data = {}
        self._next_id = 1

    def save(self, data: dict) -> int:
        id = self._next_id
        self._next_id += 1
        self.data[id] = data
        self.saved.append(data)
        return id

    def find(self, id: int) -> dict | None:
        return self.data.get(id)

class FakeEmailService:
    def __init__(self):
        self.sent = []

    def send(self, to: str, subject: str, body: str) -> None:
        self.sent.append({'to': to, 'subject': subject, 'body': body})

def test_create_order_saves_to_database():
    db = FakeDatabase()
    email = FakeEmailService()
    service = OrderService(db, email)

    order_data = {'customer_email': 'test@example.com', 'items': ['item1']}
    order_id = service.create_order(order_data)

    assert db.find(order_id) == order_data

def test_create_order_sends_confirmation_email():
    db = FakeDatabase()
    email = FakeEmailService()
    service = OrderService(db, email)

    service.create_order({'customer_email': 'test@example.com', 'items': []})

    assert len(email.sent) == 1
    assert email.sent[0]['to'] == 'test@example.com'
    assert 'Order Confirmed' in email.sent[0]['subject']
```

---

## DI Containers (Optional)

For large applications, DI containers automate dependency resolution:

```python
# Simple manual container
class Container:
    def __init__(self):
        self._services = {}

    def register(self, interface, implementation):
        self._services[interface] = implementation

    def resolve(self, interface):
        impl = self._services.get(interface)
        if callable(impl):
            return impl()
        return impl

# Usage
container = Container()
container.register(Database, PostgresDatabase)
container.register(EmailService, SMTPEmailService)

db = container.resolve(Database)  # Returns PostgresDatabase instance
```

For simple applications, manual DI is often clearer than a container.

---

## Common Mistakes

### 1. Service Locator Anti-Pattern

```python
# Bad - hides dependencies
class OrderService:
    def place_order(self, order):
        db = ServiceLocator.get(Database)  # Hidden!
        email = ServiceLocator.get(EmailService)  # Hidden!
```

### 2. Too Many Dependencies

If a class needs many dependencies, it's probably doing too much:

```python
# Too many dependencies = SRP violation
class GodService:
    def __init__(self, db, email, logger, cache, queue,
                 validator, formatter, notifier, ...):
        # This class does too much!
```

### 3. Injecting Concrete Classes

```python
# Bad - still coupled to concrete class
def __init__(self, db: PostgresDatabase):
    self.db = db

# Good - depends on abstraction
def __init__(self, db: Database):
    self.db = db
```

---

## Key Takeaways

- Inject dependencies instead of creating them internally
- Constructor injection is the preferred approach
- Use protocols/ABCs to define dependency interfaces
- Create dependencies at the composition root
- DI enables easy testing with fakes
- Too many dependencies signals design problems
