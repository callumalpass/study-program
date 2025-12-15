## Introduction

Experienced developers notice that certain problems come up repeatedly: "I need exactly one instance of this class," "I need to create objects without knowing their exact type," "I need to notify multiple objects when something changes." Design patterns are proven solutions to these recurring problems—a shared vocabulary that makes code easier to design, discuss, and maintain.

**Why This Matters:**
Design patterns aren't just academic—they're the building blocks of professional software. Frameworks like Django, React, and Java's standard library use patterns extensively. Understanding patterns helps you recognize good architecture, communicate effectively with other developers, and avoid reinventing the wheel.

## Learning Objectives

- Understand what design patterns are and when to use them
- Implement the Singleton pattern for global state
- Use the Factory pattern to create objects flexibly
- Apply the Observer pattern for event-driven programming
- Recognize patterns in existing codebases
- Know when NOT to use patterns

---

## Core Concepts

### What Are Design Patterns?

Design patterns are **reusable solutions** to common software design problems. They're not finished code—they're templates you adapt to your specific situation.

Patterns are typically categorized as:
- **Creational:** How objects are created (Singleton, Factory, Builder)
- **Structural:** How objects are composed (Adapter, Decorator, Facade)
- **Behavioral:** How objects communicate (Observer, Strategy, Command)

### The Singleton Pattern

**Problem:** You need exactly one instance of a class, accessible globally (database connections, configuration, logging).

**Solution:** Control instantiation so only one instance exists.

```python
class DatabaseConnection:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
        self._initialized = True
        print("Connecting to database...")
        self.connection = "Connected"

    def query(self, sql):
        return f"Executing: {sql}"

# Same instance every time
db1 = DatabaseConnection()  # Prints: Connecting to database...
db2 = DatabaseConnection()  # No print - reuses existing instance
print(db1 is db2)  # True
```

**Simpler approach with a module:**
```python
# database.py
class _DatabaseConnection:
    def __init__(self):
        self.connection = "Connected"

connection = _DatabaseConnection()  # Single instance at import

# Other files
from database import connection
connection.query("SELECT *")
```

### The Factory Pattern

**Problem:** You need to create objects without specifying their exact class upfront.

**Solution:** Use a factory method that returns the appropriate object type.

```python
class Animal:
    def speak(self):
        raise NotImplementedError

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

class Bird(Animal):
    def speak(self):
        return "Tweet!"

class AnimalFactory:
    @staticmethod
    def create(animal_type):
        animals = {
            'dog': Dog,
            'cat': Cat,
            'bird': Bird
        }
        animal_class = animals.get(animal_type.lower())
        if animal_class is None:
            raise ValueError(f"Unknown animal: {animal_type}")
        return animal_class()

# Client code doesn't need to know specific classes
pet = AnimalFactory.create('dog')
print(pet.speak())  # Woof!

# Easy to add new types without changing client code
```

**Real-world use case: Parsing different file formats:**
```python
class Parser:
    def parse(self, data):
        raise NotImplementedError

class JSONParser(Parser):
    def parse(self, data):
        import json
        return json.loads(data)

class XMLParser(Parser):
    def parse(self, data):
        # Parse XML...
        return {"parsed": "xml"}

class ParserFactory:
    @staticmethod
    def create(file_type):
        parsers = {'json': JSONParser, 'xml': XMLParser}
        return parsers.get(file_type, JSONParser)()

# Usage
parser = ParserFactory.create('json')
data = parser.parse('{"key": "value"}')
```

### The Observer Pattern

**Problem:** Multiple objects need to react when another object's state changes.

**Solution:** Define a subscription mechanism where observers register for updates.

```python
class Subject:
    """The object being observed"""
    def __init__(self):
        self._observers = []
        self._state = None

    def attach(self, observer):
        self._observers.append(observer)

    def detach(self, observer):
        self._observers.remove(observer)

    def notify(self):
        for observer in self._observers:
            observer.update(self._state)

    @property
    def state(self):
        return self._state

    @state.setter
    def state(self, value):
        self._state = value
        self.notify()  # Automatically notify on change

class Observer:
    """Base class for observers"""
    def update(self, state):
        raise NotImplementedError

class EmailNotifier(Observer):
    def update(self, state):
        print(f"Sending email: State changed to {state}")

class Logger(Observer):
    def update(self, state):
        print(f"[LOG] State changed to {state}")

class Dashboard(Observer):
    def update(self, state):
        print(f"Dashboard updated: {state}")

# Usage
stock = Subject()
stock.attach(EmailNotifier())
stock.attach(Logger())
stock.attach(Dashboard())

stock.state = "AAPL: $150"
# Output:
# Sending email: State changed to AAPL: $150
# [LOG] State changed to AAPL: $150
# Dashboard updated: AAPL: $150
```

---

## Additional Patterns

### The Strategy Pattern

**Problem:** You need to switch between different algorithms at runtime.

**Solution:** Encapsulate each algorithm in its own class.

```python
class PaymentStrategy:
    def pay(self, amount):
        raise NotImplementedError

class CreditCardPayment(PaymentStrategy):
    def __init__(self, card_number):
        self.card_number = card_number

    def pay(self, amount):
        return f"Paid ${amount} with credit card {self.card_number[-4:]}"

class PayPalPayment(PaymentStrategy):
    def __init__(self, email):
        self.email = email

    def pay(self, amount):
        return f"Paid ${amount} via PayPal ({self.email})"

class ShoppingCart:
    def __init__(self):
        self.items = []
        self.payment_strategy = None

    def set_payment(self, strategy):
        self.payment_strategy = strategy

    def checkout(self):
        total = sum(item['price'] for item in self.items)
        return self.payment_strategy.pay(total)

# Usage
cart = ShoppingCart()
cart.items = [{'name': 'Book', 'price': 20}]
cart.set_payment(CreditCardPayment("1234567890123456"))
print(cart.checkout())  # Paid $20 with credit card 3456
```

### The Decorator Pattern

**Problem:** Add behavior to objects dynamically without changing their class.

**Solution:** Wrap objects with decorator classes that add functionality.

```python
class Coffee:
    def cost(self):
        return 5

    def description(self):
        return "Coffee"

class MilkDecorator:
    def __init__(self, coffee):
        self._coffee = coffee

    def cost(self):
        return self._coffee.cost() + 1

    def description(self):
        return self._coffee.description() + ", Milk"

class SugarDecorator:
    def __init__(self, coffee):
        self._coffee = coffee

    def cost(self):
        return self._coffee.cost() + 0.5

    def description(self):
        return self._coffee.description() + ", Sugar"

# Build up a complex order
order = Coffee()
order = MilkDecorator(order)
order = SugarDecorator(order)
order = SugarDecorator(order)  # Double sugar!

print(order.description())  # Coffee, Milk, Sugar, Sugar
print(order.cost())         # 7.0
```

**Python's built-in decorators (`@decorator`) are related but different—they wrap functions, not objects.**

---

## Common Mistakes and Pitfalls

### Mistake 1: Pattern Overuse

```python
# OVERKILL: Singleton for a simple config
class ConfigSingleton:
    _instance = None
    # ... lots of boilerplate

# BETTER: Just use a module
# config.py
DEBUG = True
DATABASE_URL = "..."
```

**Rule:** Use the simplest solution that works. Patterns add complexity.

### Mistake 2: Wrong Pattern for the Job

```python
# BAD: Using Observer when you just need a callback
class Button:
    def __init__(self):
        self._observers = []
    # ... complex observer setup

# BETTER: Simple callback
class Button:
    def __init__(self, on_click):
        self.on_click = on_click

    def click(self):
        self.on_click()
```

### Mistake 3: Ignoring Python's Built-in Patterns

Python has idiomatic solutions that replace formal patterns:

```python
# Singleton? Use a module
# Factory? Use a function
def create_animal(animal_type):
    return {'dog': Dog, 'cat': Cat}[animal_type]()

# Strategy? Use first-class functions
def process(data, strategy_func):
    return strategy_func(data)

process(data, lambda x: x.upper())  # No class needed!
```

### Mistake 4: Not Adapting Patterns to Python

```python
# JAVA-STYLE (verbose)
class Singleton:
    _instance = None

    @classmethod
    def getInstance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

# PYTHONIC
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
```

---

## Best Practices

1. **Understand the problem first:** Don't start with "I'll use a Factory." Start with "I need to create objects flexibly."

2. **Use Python's strengths:** Functions are first-class, modules are singletons, duck typing reduces need for abstract factories.

3. **Keep it simple:** If a pattern feels like overkill, it probably is.

4. **Learn to recognize patterns:** Seeing patterns in existing code helps you understand it faster.

5. **Document pattern usage:** When you do use a pattern, note it for future maintainers.

6. **Combine patterns thoughtfully:** Factory + Singleton, Observer + Strategy—patterns often work together.

---

## Patterns in the Wild

**Django (Observer):**
```python
# Signals are the Observer pattern
from django.db.models.signals import post_save

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
```

**Flask (Factory):**
```python
def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    return app  # Factory method!
```

**Requests Library (Facade):**
```python
# Hides complexity of HTTP behind simple interface
response = requests.get('https://api.example.com')
```

---

## When NOT to Use Patterns

1. **The problem is simple:** Don't use Factory for two object types.
2. **You're the only developer:** Some patterns aid team communication.
3. **Requirements are stable:** Patterns often prepare for change—if change won't come, skip them.
4. **Python has a better way:** Decorators, context managers, generators often replace patterns.

---

## Summary

- Design patterns are reusable design templates, not copy/paste code.
- Patterns provide shared vocabulary and reduce accidental complexity when used appropriately.
- Singleton, Factory, and Observer solve common creation and communication problems.
- Avoid patterns when they don’t add clarity or flexibility.

## Further Exploration

- **"Gang of Four" Book:** Design Patterns: Elements of Reusable Object-Oriented Software
- **Python-specific patterns:** Borg pattern (shared state singleton), context managers
- **Architectural patterns:** MVC, Repository, Dependency Injection
- **Anti-patterns:** Learn what NOT to do (God Object, Spaghetti Code)
