---
id: cs103-t5-when-not
title: "When Not to Use Patterns"
order: 7
---

## When NOT to Use Patterns

Design patterns are powerful tools, but overusing them creates unnecessarily complex code. The best solution is often the simplest one.

---

## The Pattern Trap

New developers often fall into this trap:

1. Learn a pattern
2. Get excited about it
3. Apply it everywhere
4. Create complex, hard-to-maintain code

**Remember:** Patterns solve specific problems. If you don't have the problem, you don't need the pattern.

---

## Signs You're Overusing Patterns

### 1. Pattern for Two Types
```python
# OVERKILL: Factory for just two types
class AnimalFactory:
    @staticmethod
    def create(animal_type):
        if animal_type == 'dog':
            return Dog()
        elif animal_type == 'cat':
            return Cat()
        raise ValueError(f"Unknown: {animal_type}")

# SIMPLER: Just use a dict or direct instantiation
animals = {'dog': Dog, 'cat': Cat}
pet = animals[animal_type]()

# Or even simpler
pet = Dog() if animal_type == 'dog' else Cat()
```

### 2. Single Observer
```python
# OVERKILL: Observer pattern for one observer
class Subject:
    def __init__(self):
        self._observers = []
    # ... complex observer machinery

# SIMPLER: Just call the method directly
class Stock:
    def __init__(self, dashboard):
        self.dashboard = dashboard

    def update_price(self, price):
        self.price = price
        self.dashboard.refresh(price)  # Direct call
```

### 3. Strategy with No Swapping
```python
# OVERKILL: Strategy when algorithm never changes
class SortStrategy:
    def sort(self, data):
        raise NotImplementedError

class QuickSortStrategy(SortStrategy):
    def sort(self, data):
        return sorted(data)

class DataProcessor:
    def __init__(self, strategy):
        self.strategy = strategy
    # ...

# SIMPLER: Just sort directly
class DataProcessor:
    def process(self, data):
        return sorted(data)  # Done!
```

---

## Python Has Better Alternatives

Many patterns have simpler Python equivalents:

### Singleton → Module
```python
# Pattern approach
class Singleton:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# Python approach
# config.py
config = {'debug': True, 'timeout': 30}

# Other files
from config import config
```

### Factory → Function
```python
# Pattern approach
class ParserFactory:
    @staticmethod
    def create(type):
        # ...

# Python approach
def create_parser(type):
    parsers = {'json': JSONParser, 'xml': XMLParser}
    return parsers[type]()
```

### Strategy → First-Class Functions
```python
# Pattern approach
class SortStrategy:
    def sort(self, data): pass

class AscendingSort(SortStrategy):
    def sort(self, data):
        return sorted(data)

# Python approach
def process(data, sort_func=sorted):
    return sort_func(data)

process(data, sort_func=lambda x: sorted(x, reverse=True))
```

### Command → Lambdas
```python
# Pattern approach
class Command:
    def execute(self): pass

class PrintCommand(Command):
    def __init__(self, message):
        self.message = message
    def execute(self):
        print(self.message)

# Python approach
commands = [
    lambda: print("Hello"),
    lambda: print("World")
]
for cmd in commands:
    cmd()
```

---

## Questions Before Using a Pattern

Ask yourself:

1. **Do I have the problem this pattern solves?**
   - Singleton: Do I really need exactly one instance?
   - Factory: Will I have many types or complex creation?
   - Observer: Are there really multiple observers?

2. **Is there a simpler solution?**
   - Can a function replace a class?
   - Can a dict replace a factory?
   - Can a module replace a singleton?

3. **Will this code change?**
   - If it won't change, YAGNI (You Aren't Gonna Need It)
   - Patterns prepare for change—if change won't come, skip them

4. **Does my team understand this?**
   - Patterns aid communication—if the team doesn't know them, they add confusion

---

## Real Code Examples

### Over-Engineered
```python
# Way too much for a config loader
class ConfigLoaderFactory:
    @staticmethod
    def create(config_type):
        if config_type == 'json':
            return JSONConfigLoader()
        elif config_type == 'yaml':
            return YAMLConfigLoader()
        raise ValueError(f"Unknown: {config_type}")

class ConfigLoader(ABC):
    @abstractmethod
    def load(self, path):
        pass

class JSONConfigLoader(ConfigLoader):
    def load(self, path):
        with open(path) as f:
            return json.load(f)

class YAMLConfigLoader(ConfigLoader):
    def load(self, path):
        with open(path) as f:
            return yaml.safe_load(f)

# Usage
loader = ConfigLoaderFactory.create('json')
config = loader.load('config.json')
```

### Just Right
```python
def load_config(path):
    """Load config from JSON or YAML file."""
    if path.endswith('.json'):
        with open(path) as f:
            return json.load(f)
    elif path.endswith(('.yml', '.yaml')):
        with open(path) as f:
            return yaml.safe_load(f)
    raise ValueError(f"Unknown format: {path}")

# Usage
config = load_config('config.json')
```

---

## The Right Balance

**Use patterns when:**
- You have the specific problem they solve
- The code will likely change in ways the pattern handles
- The team understands the pattern
- The pattern makes code clearer, not more complex

**Skip patterns when:**
- The problem is simple
- You have two types, one observer, one algorithm
- Python has a simpler idiom
- You're adding abstraction for hypothetical futures

---

## The Golden Rule

> "The best code is the simplest code that solves the problem."

Patterns are tools. Use them when they help, skip them when they don't.

---

## Key Takeaways

- Patterns solve specific problems—no problem, no pattern
- Python's features often replace traditional patterns
- Ask: Is this the simplest solution?
- Don't design for hypothetical future requirements
- Simpler code is easier to understand and maintain
- When in doubt, start simple and refactor when needed
