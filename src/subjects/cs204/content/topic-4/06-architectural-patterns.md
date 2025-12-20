# Architectural Patterns

Architectural patterns operate at a higher level than design patterns, addressing the overall structure and organization of applications. These patterns help manage complexity in larger systems and promote maintainability, testability, and scalability.

## Overview of Architectural Patterns

While design patterns focus on relationships between classes and objects, architectural patterns define the fundamental organization of entire systems. They establish the skeleton upon which applications are built.

### Why Architectural Patterns Matter

- **System Organization**: Provide structure for large codebases
- **Separation of Concerns**: Isolate different aspects of the system
- **Testability**: Enable effective unit and integration testing
- **Maintainability**: Make systems easier to understand and modify
- **Team Coordination**: Facilitate parallel development by multiple teams

## Repository Pattern

The Repository pattern mediates between the domain and data mapping layers, providing a collection-like interface for accessing domain objects. It decouples business logic from data access concerns.

### When to Use

- Want to centralize data access logic
- Need to swap data sources without changing business logic
- Want to make business logic testable independent of database
- Multiple data sources need to appear as a single collection

### Implementation in Python

```python
from abc import ABC, abstractmethod
from typing import List, Optional

# Domain model
class User:
    def __init__(self, id: int, name: str, email: str):
        self.id = id
        self.name = name
        self.email = email

    def __repr__(self):
        return f"User(id={self.id}, name='{self.name}', email='{self.email}')"

# Repository interface
class UserRepository(ABC):
    @abstractmethod
    def get_by_id(self, user_id: int) -> Optional[User]:
        pass

    @abstractmethod
    def get_all(self) -> List[User]:
        pass

    @abstractmethod
    def add(self, user: User) -> None:
        pass

    @abstractmethod
    def update(self, user: User) -> None:
        pass

    @abstractmethod
    def delete(self, user_id: int) -> None:
        pass

# Concrete repository - Database implementation
class DatabaseUserRepository(UserRepository):
    def __init__(self, db_connection):
        self.db = db_connection
        self._cache = {}

    def get_by_id(self, user_id: int) -> Optional[User]:
        # Simulate database query
        query = f"SELECT * FROM users WHERE id = {user_id}"
        # In real implementation: result = self.db.execute(query)
        # For demo, return from cache or create
        if user_id in self._cache:
            return self._cache[user_id]
        return None

    def get_all(self) -> List[User]:
        # Simulate: return self.db.execute("SELECT * FROM users")
        return list(self._cache.values())

    def add(self, user: User) -> None:
        # Simulate: self.db.execute(f"INSERT INTO users VALUES (...)")
        self._cache[user.id] = user
        print(f"Added user {user.id} to database")

    def update(self, user: User) -> None:
        # Simulate: self.db.execute(f"UPDATE users SET ... WHERE id={user.id}")
        self._cache[user.id] = user
        print(f"Updated user {user.id} in database")

    def delete(self, user_id: int) -> None:
        # Simulate: self.db.execute(f"DELETE FROM users WHERE id={user_id}")
        if user_id in self._cache:
            del self._cache[user_id]
        print(f"Deleted user {user_id} from database")

# Concrete repository - In-memory implementation (for testing)
class InMemoryUserRepository(UserRepository):
    def __init__(self):
        self._users = {}

    def get_by_id(self, user_id: int) -> Optional[User]:
        return self._users.get(user_id)

    def get_all(self) -> List[User]:
        return list(self._users.values())

    def add(self, user: User) -> None:
        self._users[user.id] = user

    def update(self, user: User) -> None:
        self._users[user.id] = user

    def delete(self, user_id: int) -> None:
        if user_id in self._users:
            del self._users[user_id]

# Service layer using repository
class UserService:
    def __init__(self, user_repository: UserRepository):
        self.repository = user_repository

    def register_user(self, name: str, email: str) -> User:
        # Business logic
        user_id = self._generate_id()
        user = User(user_id, name, email)
        self.repository.add(user)
        return user

    def change_email(self, user_id: int, new_email: str) -> None:
        user = self.repository.get_by_id(user_id)
        if user:
            user.email = new_email
            self.repository.update(user)

    def _generate_id(self) -> int:
        return len(self.repository.get_all()) + 1

# Usage
# Production
db_repo = DatabaseUserRepository(db_connection=None)
service = UserService(db_repo)

user1 = service.register_user("Alice", "alice@example.com")
user2 = service.register_user("Bob", "bob@example.com")

service.change_email(user1.id, "alice.new@example.com")

# Testing - easily swap to in-memory repository
test_repo = InMemoryUserRepository()
test_service = UserService(test_repo)

test_user = test_service.register_user("Test", "test@example.com")
assert test_repo.get_by_id(test_user.id) is not None
```

### Benefits and Trade-offs

**Benefits**:
- Centralizes data access logic
- Makes business logic testable
- Easy to swap data sources
- Provides collection-like interface

**Trade-offs**:
- Additional abstraction layer
- May duplicate ORM functionality
- Can become complex with many entity types

## Unit of Work Pattern

The Unit of Work pattern maintains a list of objects affected by a business transaction and coordinates the writing out of changes and the resolution of concurrency problems.

### When to Use

- Need to track multiple changes across repositories
- Want to commit/rollback changes as a single transaction
- Multiple entities are modified together

### Implementation in Python

```python
from typing import Dict, Set

class UnitOfWork:
    """Coordinates multiple repository operations"""
    def __init__(self):
        self._new_objects: Set[object] = set()
        self._dirty_objects: Set[object] = set()
        self._removed_objects: Set[object] = set()
        self._repositories: Dict[str, object] = {}

    def register_new(self, obj):
        """Track new object to be inserted"""
        self._new_objects.add(obj)

    def register_dirty(self, obj):
        """Track object to be updated"""
        self._dirty_objects.add(obj)

    def register_removed(self, obj):
        """Track object to be deleted"""
        self._removed_objects.add(obj)

    def commit(self):
        """Persist all changes in a single transaction"""
        print("=== Starting transaction ===")

        # Insert new objects
        for obj in self._new_objects:
            print(f"INSERT: {obj}")

        # Update dirty objects
        for obj in self._dirty_objects:
            print(f"UPDATE: {obj}")

        # Delete removed objects
        for obj in self._removed_objects:
            print(f"DELETE: {obj}")

        print("=== Transaction committed ===")

        # Clear tracking sets
        self._new_objects.clear()
        self._dirty_objects.clear()
        self._removed_objects.clear()

    def rollback(self):
        """Discard all changes"""
        print("=== Transaction rolled back ===")
        self._new_objects.clear()
        self._dirty_objects.clear()
        self._removed_objects.clear()

# Domain models
class Order:
    def __init__(self, id: int, customer: str, total: float):
        self.id = id
        self.customer = customer
        self.total = total

    def __repr__(self):
        return f"Order(id={self.id}, customer='{self.customer}', total={self.total})"

class OrderItem:
    def __init__(self, id: int, order_id: int, product: str, quantity: int):
        self.id = id
        self.order_id = order_id
        self.product = product
        self.quantity = quantity

    def __repr__(self):
        return f"OrderItem(id={self.id}, product='{self.product}', qty={self.quantity})"

# Service using Unit of Work
class OrderService:
    def __init__(self, unit_of_work: UnitOfWork):
        self.uow = unit_of_work

    def create_order(self, customer: str, items: list):
        """Create order with multiple items in single transaction"""
        try:
            # Create order
            order = Order(id=1, customer=customer, total=0)
            self.uow.register_new(order)

            # Create order items
            total = 0
            for i, (product, quantity, price) in enumerate(items, 1):
                item = OrderItem(id=i, order_id=order.id,
                               product=product, quantity=quantity)
                self.uow.register_new(item)
                total += quantity * price

            # Update order total
            order.total = total
            self.uow.register_dirty(order)

            # Commit all changes as single transaction
            self.uow.commit()

            return order

        except Exception as e:
            print(f"Error: {e}")
            self.uow.rollback()
            raise

# Usage
uow = UnitOfWork()
service = OrderService(uow)

order = service.create_order(
    customer="Alice",
    items=[
        ("Laptop", 1, 999.99),
        ("Mouse", 2, 29.99),
        ("Keyboard", 1, 79.99)
    ]
)

# Output:
# === Starting transaction ===
# INSERT: Order(id=1, customer='Alice', total=0)
# INSERT: OrderItem(id=1, product='Laptop', qty=1)
# INSERT: OrderItem(id=2, product='Mouse', qty=2)
# INSERT: OrderItem(id=3, product='Keyboard', qty=1)
# UPDATE: Order(id=1, customer='Alice', total=1139.96)
# === Transaction committed ===
```

## Dependency Injection Pattern

Dependency Injection is a technique where an object receives its dependencies from external sources rather than creating them itself. This promotes loose coupling and testability.

### When to Use

- Want to decouple components
- Need to make code testable with mock dependencies
- Want to configure dependencies externally
- Following SOLID principles (especially Dependency Inversion)

### Implementation in Python

```python
from abc import ABC, abstractmethod

# Dependencies (abstractions)
class EmailService(ABC):
    @abstractmethod
    def send(self, to: str, subject: str, body: str):
        pass

class PaymentGateway(ABC):
    @abstractmethod
    def charge(self, amount: float, card_token: str) -> bool:
        pass

# Concrete implementations
class SMTPEmailService(EmailService):
    def send(self, to: str, subject: str, body: str):
        print(f"Sending email via SMTP to {to}: {subject}")

class SendGridEmailService(EmailService):
    def send(self, to: str, subject: str, body: str):
        print(f"Sending email via SendGrid to {to}: {subject}")

class StripePaymentGateway(PaymentGateway):
    def charge(self, amount: float, card_token: str) -> bool:
        print(f"Charging ${amount} via Stripe")
        return True

class PayPalPaymentGateway(PaymentGateway):
    def charge(self, amount: float, card_token: str) -> bool:
        print(f"Charging ${amount} via PayPal")
        return True

# Client class with dependencies injected
class OrderProcessor:
    """Dependencies injected via constructor"""
    def __init__(self, email_service: EmailService,
                 payment_gateway: PaymentGateway):
        self.email_service = email_service
        self.payment_gateway = payment_gateway

    def process_order(self, customer_email: str, amount: float,
                     card_token: str):
        # Process payment
        if self.payment_gateway.charge(amount, card_token):
            # Send confirmation
            self.email_service.send(
                to=customer_email,
                subject="Order Confirmation",
                body=f"Your order of ${amount} has been processed"
            )
            return True
        return False

# Dependency Injection Container (simple implementation)
class Container:
    """Service container for dependency injection"""
    def __init__(self):
        self._services = {}

    def register(self, interface, implementation):
        """Register a service"""
        self._services[interface] = implementation

    def resolve(self, interface):
        """Resolve a service"""
        return self._services.get(interface)

# Configuration and usage
container = Container()

# Register dependencies
container.register(EmailService, SMTPEmailService())
container.register(PaymentGateway, StripePaymentGateway())

# Resolve and inject dependencies
email_service = container.resolve(EmailService)
payment_gateway = container.resolve(PaymentGateway)
processor = OrderProcessor(email_service, payment_gateway)

# Use the configured processor
processor.process_order("customer@example.com", 99.99, "tok_visa")

# Easy to swap implementations
container.register(EmailService, SendGridEmailService())
container.register(PaymentGateway, PayPalPaymentGateway())

email_service = container.resolve(EmailService)
payment_gateway = container.resolve(PaymentGateway)
processor2 = OrderProcessor(email_service, payment_gateway)

processor2.process_order("another@example.com", 149.99, "tok_paypal")
```

### JavaScript Dependency Injection

```javascript
// Dependencies
class Logger {
    log(message) {
        console.log(`[LOG] ${message}`);
    }
}

class Database {
    query(sql) {
        return `Result of: ${sql}`;
    }
}

// Class with dependencies
class UserService {
    constructor(logger, database) {
        this.logger = logger;
        this.database = database;
    }

    getUser(id) {
        this.logger.log(`Fetching user ${id}`);
        return this.database.query(`SELECT * FROM users WHERE id = ${id}`);
    }

    createUser(name, email) {
        this.logger.log(`Creating user ${name}`);
        return this.database.query(`INSERT INTO users VALUES ('${name}', '${email}')`);
    }
}

// Manual injection
const logger = new Logger();
const database = new Database();
const userService = new UserService(logger, database);

userService.getUser(1);
userService.createUser('Alice', 'alice@example.com');

// DI Container
class DIContainer {
    constructor() {
        this.services = new Map();
    }

    register(name, factory) {
        this.services.set(name, factory);
    }

    resolve(name) {
        const factory = this.services.get(name);
        if (!factory) {
            throw new Error(`Service ${name} not found`);
        }
        return factory(this);
    }
}

// Usage with container
const container = new DIContainer();

container.register('logger', () => new Logger());
container.register('database', () => new Database());
container.register('userService', (c) =>
    new UserService(c.resolve('logger'), c.resolve('database'))
);

const service = container.resolve('userService');
service.getUser(1);
```

### Benefits of Dependency Injection

**Benefits**:
- Loose coupling between components
- Easy to test with mock dependencies
- Flexible configuration
- Follows SOLID principles

**Trade-offs**:
- Additional complexity
- Requires understanding of DI concepts
- Can make code flow less obvious

## Combining Architectural Patterns

These patterns often work together in real applications:

```python
class Application:
    """Combining Repository, Unit of Work, and Dependency Injection"""

    def __init__(self):
        # Dependency Injection Container
        self.container = Container()

        # Register repositories
        self.container.register('user_repository',
                               DatabaseUserRepository(db=None))
        self.container.register('order_repository',
                               DatabaseOrderRepository(db=None))

        # Register Unit of Work
        self.container.register('unit_of_work', UnitOfWork())

        # Register services with injected dependencies
        self.container.register('user_service',
            UserService(
                repository=self.container.resolve('user_repository'),
                uow=self.container.resolve('unit_of_work')
            )
        )

    def get_service(self, name):
        return self.container.resolve(name)

# Usage
app = Application()
user_service = app.get_service('user_service')
user = user_service.register_user("Alice", "alice@example.com")
```

## Summary

Architectural patterns provide structure for larger applications. The Repository pattern centralizes data access, Unit of Work coordinates transactional changes across multiple repositories, and Dependency Injection promotes loose coupling and testability. These patterns work together to create maintainable, testable, and scalable applications. While they add complexity, the benefits in larger systems far outweigh the costs, enabling teams to build robust enterprise applications.
