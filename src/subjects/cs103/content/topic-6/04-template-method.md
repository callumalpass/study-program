---
id: cs103-t6-template
title: "Template Method Pattern"
order: 4
---

## The Template Method Pattern

The Template Method pattern defines the skeleton of an algorithm in a parent class, letting subclasses fill in specific steps without changing the overall structure.

---

## The Pattern

```python
from abc import ABC, abstractmethod

class DataMiner(ABC):
    """Template method pattern: mine data from various sources."""

    def mine(self, path):
        """Template method - defines the algorithm structure."""
        file = self.open_file(path)
        raw_data = self.extract_data(file)
        data = self.parse_data(raw_data)
        analysis = self.analyze_data(data)
        self.send_report(analysis)
        self.close_file(file)

    # Concrete steps - shared implementation
    def analyze_data(self, data):
        """Default analysis - can be overridden."""
        return {'count': len(data), 'data': data}

    def send_report(self, analysis):
        """Send report - shared implementation."""
        print(f"Report: {analysis['count']} items processed")

    # Abstract steps - subclasses must implement
    @abstractmethod
    def open_file(self, path):
        pass

    @abstractmethod
    def extract_data(self, file):
        pass

    @abstractmethod
    def parse_data(self, raw_data):
        pass

    @abstractmethod
    def close_file(self, file):
        pass
```

---

## Concrete Implementations

```python
class CSVMiner(DataMiner):
    def open_file(self, path):
        return open(path, 'r')

    def extract_data(self, file):
        return file.read()

    def parse_data(self, raw_data):
        lines = raw_data.strip().split('\n')
        return [line.split(',') for line in lines]

    def close_file(self, file):
        file.close()

class JSONMiner(DataMiner):
    def open_file(self, path):
        return open(path, 'r')

    def extract_data(self, file):
        return file.read()

    def parse_data(self, raw_data):
        import json
        return json.loads(raw_data)

    def close_file(self, file):
        file.close()

class DatabaseMiner(DataMiner):
    def open_file(self, connection_string):
        # "File" is actually a database connection
        return self._connect(connection_string)

    def extract_data(self, connection):
        return connection.execute("SELECT * FROM data")

    def parse_data(self, raw_data):
        return [dict(row) for row in raw_data]

    def close_file(self, connection):
        connection.close()

    def _connect(self, connection_string):
        # Database connection logic
        pass
```

---

## Hook Methods

Optional methods that provide default behavior but can be overridden:

```python
from abc import ABC, abstractmethod

class GameAI(ABC):
    """AI for turn-based games."""

    def turn(self):
        """Template method with hooks."""
        self.before_turn()       # Hook
        action = self.decide()   # Abstract
        self.execute(action)     # Abstract
        self.after_turn()        # Hook

    # Hooks - optional to override
    def before_turn(self):
        """Called before each turn. Override to add setup."""
        pass

    def after_turn(self):
        """Called after each turn. Override to add cleanup."""
        pass

    # Abstract - must override
    @abstractmethod
    def decide(self):
        """Decide on an action."""
        pass

    @abstractmethod
    def execute(self, action):
        """Execute the decided action."""
        pass

class AggressiveAI(GameAI):
    def before_turn(self):
        print("Calculating attack options...")

    def decide(self):
        return "attack_strongest_enemy"

    def execute(self, action):
        print(f"Executing: {action}")

class DefensiveAI(GameAI):
    def decide(self):
        return "fortify_weakest_position"

    def execute(self, action):
        print(f"Executing: {action}")
    # Uses default before_turn and after_turn
```

---

## Report Generation Example

```python
from abc import ABC, abstractmethod

class Report(ABC):
    """Generate reports in different formats."""

    def generate(self, data):
        """Template method."""
        header = self.create_header()
        body = self.create_body(data)
        footer = self.create_footer()
        return self.combine(header, body, footer)

    # Hook with default implementation
    def create_footer(self):
        from datetime import datetime
        return f"Generated: {datetime.now()}"

    # Abstract methods
    @abstractmethod
    def create_header(self):
        pass

    @abstractmethod
    def create_body(self, data):
        pass

    @abstractmethod
    def combine(self, header, body, footer):
        pass

class HTMLReport(Report):
    def create_header(self):
        return "<html><head><title>Report</title></head><body>"

    def create_body(self, data):
        rows = ''.join(f"<tr><td>{item}</td></tr>" for item in data)
        return f"<table>{rows}</table>"

    def create_footer(self):
        base = super().create_footer()
        return f"<footer>{base}</footer></body></html>"

    def combine(self, header, body, footer):
        return header + body + footer

class MarkdownReport(Report):
    def create_header(self):
        return "# Report\n\n"

    def create_body(self, data):
        return '\n'.join(f"- {item}" for item in data)

    def combine(self, header, body, footer):
        return f"{header}{body}\n\n---\n{footer}"

# Usage
html_report = HTMLReport()
print(html_report.generate(["Item 1", "Item 2", "Item 3"]))

md_report = MarkdownReport()
print(md_report.generate(["Item 1", "Item 2", "Item 3"]))
```

---

## Testing Framework Example

```python
from abc import ABC, abstractmethod

class TestCase(ABC):
    """Template for test cases."""

    def run(self):
        """Template method for running tests."""
        try:
            self.setUp()
            self.runTest()
            print(f"✓ {self.__class__.__name__} passed")
        except AssertionError as e:
            print(f"✗ {self.__class__.__name__} failed: {e}")
        except Exception as e:
            print(f"✗ {self.__class__.__name__} error: {e}")
        finally:
            self.tearDown()

    # Hooks
    def setUp(self):
        """Set up test fixtures. Override as needed."""
        pass

    def tearDown(self):
        """Clean up after test. Override as needed."""
        pass

    # Abstract
    @abstractmethod
    def runTest(self):
        """The actual test. Must override."""
        pass

class TestAddition(TestCase):
    def runTest(self):
        assert 2 + 2 == 4

class TestDatabase(TestCase):
    def setUp(self):
        self.db = MockDatabase()
        self.db.connect()

    def runTest(self):
        result = self.db.query("SELECT 1")
        assert result == 1

    def tearDown(self):
        self.db.disconnect()

# Run tests
TestAddition().run()  # ✓ TestAddition passed
TestDatabase().run()  # ✓ TestDatabase passed
```

---

## Benefits

1. **Code reuse:** Common algorithm structure in one place
2. **Consistency:** All implementations follow the same structure
3. **Flexibility:** Subclasses customize specific steps
4. **Inversion of control:** Parent class controls flow, children provide details

---

## Key Takeaways

- Template method defines algorithm skeleton in parent
- Abstract methods are steps subclasses must implement
- Hook methods have defaults but can be overridden
- Parent controls the flow, children fill in the blanks
- Great for frameworks, testing, report generation
