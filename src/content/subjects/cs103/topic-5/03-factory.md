## The Factory Pattern

**Problem:** You need to create objects without specifying their exact class upfront. The creation logic might be complex, or the type might depend on runtime conditions.

**Solution:** Use a factory method or class that returns the appropriate object type.

---

## Simple Factory Function

The simplest form—a function that creates objects:

```python
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Bird:
    def speak(self):
        return "Tweet!"

def create_animal(animal_type):
    """Factory function."""
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
pet = create_animal('dog')
print(pet.speak())  # Woof!

# Easy to add new types without changing client code
```

---

## Factory Method Pattern

A class with a method that subclasses override to create different objects:

```python
from abc import ABC, abstractmethod

class Document(ABC):
    @abstractmethod
    def create_page(self):
        """Factory method - subclasses create specific page types."""
        pass

    def add_page(self):
        page = self.create_page()
        self.pages.append(page)
        return page

class Resume(Document):
    def __init__(self):
        self.pages = []

    def create_page(self):
        return ResumePage()

class Report(Document):
    def __init__(self):
        self.pages = []

    def create_page(self):
        return ReportPage()

class ResumePage:
    def __init__(self):
        self.type = "resume"

class ReportPage:
    def __init__(self):
        self.type = "report"

# Each document creates its own page type
resume = Resume()
resume.add_page()
print(resume.pages[0].type)  # "resume"
```

---

## Factory Class

Encapsulate creation logic in a dedicated class:

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
        # XML parsing logic
        return {"type": "xml", "data": data}

class CSVParser(Parser):
    def parse(self, data):
        return [line.split(',') for line in data.strip().split('\n')]

class ParserFactory:
    """Factory class with registration."""

    _parsers = {
        'json': JSONParser,
        'xml': XMLParser,
        'csv': CSVParser
    }

    @classmethod
    def create(cls, file_type):
        parser_class = cls._parsers.get(file_type.lower())
        if parser_class is None:
            raise ValueError(f"Unknown file type: {file_type}")
        return parser_class()

    @classmethod
    def register(cls, file_type, parser_class):
        """Allow registering new parsers."""
        cls._parsers[file_type.lower()] = parser_class

# Usage
parser = ParserFactory.create('json')
data = parser.parse('{"key": "value"}')

# Extend with new parser
class YAMLParser(Parser):
    def parse(self, data):
        import yaml
        return yaml.safe_load(data)

ParserFactory.register('yaml', YAMLParser)
```

---

## Abstract Factory

Create families of related objects:

```python
from abc import ABC, abstractmethod

class Button(ABC):
    @abstractmethod
    def render(self):
        pass

class Checkbox(ABC):
    @abstractmethod
    def render(self):
        pass

# Windows family
class WindowsButton(Button):
    def render(self):
        return "[Windows Button]"

class WindowsCheckbox(Checkbox):
    def render(self):
        return "[X] Windows Checkbox"

# Mac family
class MacButton(Button):
    def render(self):
        return "(Mac Button)"

class MacCheckbox(Checkbox):
    def render(self):
        return "☑ Mac Checkbox"

# Abstract factory
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

    @abstractmethod
    def create_checkbox(self) -> Checkbox:
        pass

class WindowsFactory(GUIFactory):
    def create_button(self):
        return WindowsButton()

    def create_checkbox(self):
        return WindowsCheckbox()

class MacFactory(GUIFactory):
    def create_button(self):
        return MacButton()

    def create_checkbox(self):
        return MacCheckbox()

# Client code works with any factory
def create_ui(factory: GUIFactory):
    button = factory.create_button()
    checkbox = factory.create_checkbox()
    return f"{button.render()} {checkbox.render()}"

print(create_ui(WindowsFactory()))  # [Windows Button] [X] Windows Checkbox
print(create_ui(MacFactory()))       # (Mac Button) ☑ Mac Checkbox
```

---

## Real-World Example: Database Connections

```python
class DatabaseConnection(ABC):
    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def query(self, sql):
        pass

class PostgresConnection(DatabaseConnection):
    def connect(self):
        return "Connected to PostgreSQL"

    def query(self, sql):
        return f"PostgreSQL: {sql}"

class MySQLConnection(DatabaseConnection):
    def connect(self):
        return "Connected to MySQL"

    def query(self, sql):
        return f"MySQL: {sql}"

class SQLiteConnection(DatabaseConnection):
    def connect(self):
        return "Connected to SQLite"

    def query(self, sql):
        return f"SQLite: {sql}"

class DatabaseFactory:
    @staticmethod
    def create(db_type, **config):
        databases = {
            'postgres': PostgresConnection,
            'mysql': MySQLConnection,
            'sqlite': SQLiteConnection
        }
        db_class = databases.get(db_type.lower())
        if db_class is None:
            raise ValueError(f"Unknown database: {db_type}")
        return db_class(**config)

# Configuration-driven creation
import os
db_type = os.environ.get('DATABASE_TYPE', 'sqlite')
db = DatabaseFactory.create(db_type)
print(db.connect())
```

---

## Flask's Application Factory

Flask uses the factory pattern for creating applications:

```python
from flask import Flask

def create_app(config_name='default'):
    """Application factory."""
    app = Flask(__name__)

    # Load config based on name
    if config_name == 'production':
        app.config.from_object('config.ProductionConfig')
    elif config_name == 'testing':
        app.config.from_object('config.TestingConfig')
    else:
        app.config.from_object('config.DevelopmentConfig')

    # Initialize extensions
    db.init_app(app)
    login_manager.init_app(app)

    # Register blueprints
    from .main import main_bp
    app.register_blueprint(main_bp)

    return app

# Create different app configurations
app = create_app('production')
test_app = create_app('testing')
```

---

## When to Use Factory

**Good use cases:**
- Object type determined at runtime
- Complex creation logic
- Decoupling client from concrete classes
- Configurable object creation
- Testing with mock objects

**Avoid when:**
- Only one concrete type exists
- Creation is simple
- It adds unnecessary abstraction

---

## Key Takeaways

- Factory pattern creates objects without specifying exact classes
- Simple factory: a function that returns objects
- Factory method: subclasses override creation
- Abstract factory: creates families of related objects
- Use factories when creation logic is complex or type varies
- Python functions are often sufficient for simple factories
