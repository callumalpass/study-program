## Method Overriding and Extension

When a child class defines a method with the same name as a parent method, it **overrides** that method. Understanding when to override vs extend is key to effective inheritance.

---

## Complete Override

Replace parent behavior entirely:

```python
class Bird:
    def move(self):
        return "Walking"

class Eagle(Bird):
    def move(self):
        return "Flying"  # Completely replaces Bird.move()

class Penguin(Bird):
    def move(self):
        return "Swimming"  # Completely replaces Bird.move()

eagle = Eagle()
print(eagle.move())  # "Flying"
```

---

## Extension (Using `super()`)

Add to parent behavior while keeping it:

```python
class DataProcessor:
    def process(self, data):
        # Basic processing
        return data.strip().lower()

class LoggingProcessor(DataProcessor):
    def process(self, data):
        print(f"Processing: {data[:20]}...")
        result = super().process(data)  # Call parent
        print(f"Result: {result[:20]}...")
        return result

processor = LoggingProcessor()
result = processor.process("  HELLO WORLD  ")
# Processing:   HELLO WORLD  ...
# Result: hello world...
```

---

## Override vs Extension: When to Use Each

### Use Complete Override When:
- Parent behavior is wrong for this child
- You need completely different behavior
- Parent method is a placeholder/default

```python
class Shape:
    def area(self):
        return 0  # Placeholder

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14159 * self.radius ** 2  # Complete override
```

### Use Extension When:
- You want to add to parent behavior
- You need preprocessing or postprocessing
- Multiple steps should chain together

```python
class Authenticator:
    def authenticate(self, user, password):
        return self._check_password(user, password)

class TwoFactorAuth(Authenticator):
    def authenticate(self, user, password):
        # First, do normal authentication
        if not super().authenticate(user, password):
            return False
        # Then add 2FA check
        return self._verify_2fa_code(user)
```

---

## The Template Method Pattern

Parent defines structure, children fill in specifics:

```python
class Report:
    def generate(self):
        """Template method - defines the structure."""
        return f"""
{self.header()}
{'-' * 40}
{self.body()}
{'-' * 40}
{self.footer()}
        """

    def header(self):
        return "Report"  # Default, can be overridden

    def body(self):
        raise NotImplementedError("Subclass must implement")

    def footer(self):
        return f"Generated at {datetime.now()}"

class SalesReport(Report):
    def __init__(self, data):
        self.data = data

    def header(self):
        return "SALES REPORT"  # Override

    def body(self):
        return f"Total sales: ${sum(self.data)}"  # Required

class InventoryReport(Report):
    def __init__(self, items):
        self.items = items

    def header(self):
        return "INVENTORY REPORT"

    def body(self):
        return f"Items in stock: {len(self.items)}"
```

---

## Overriding `__init__`

Special care is needed when overriding constructors:

```python
class Vehicle:
    def __init__(self, brand, year):
        self.brand = brand
        self.year = year
        self.mileage = 0

class Car(Vehicle):
    def __init__(self, brand, year, num_doors):
        super().__init__(brand, year)  # Initialize Vehicle
        self.num_doors = num_doors     # Add Car-specific

class ElectricCar(Car):
    def __init__(self, brand, year, num_doors, battery_kwh):
        super().__init__(brand, year, num_doors)  # Initialize Car
        self.battery_kwh = battery_kwh

tesla = ElectricCar("Tesla", 2023, 4, 100)
print(tesla.brand)        # From Vehicle
print(tesla.num_doors)    # From Car
print(tesla.battery_kwh)  # From ElectricCar
```

---

## Overriding Properties

Properties can be overridden just like methods:

```python
class Product:
    def __init__(self, base_price):
        self._base_price = base_price

    @property
    def price(self):
        return self._base_price

class TaxableProduct(Product):
    TAX_RATE = 0.10

    @property
    def price(self):
        return super().price * (1 + self.TAX_RATE)

class DiscountedProduct(Product):
    def __init__(self, base_price, discount):
        super().__init__(base_price)
        self.discount = discount

    @property
    def price(self):
        return super().price * (1 - self.discount)

regular = Product(100)
taxable = TaxableProduct(100)
discounted = DiscountedProduct(100, 0.20)

print(regular.price)     # 100
print(taxable.price)     # 110.0
print(discounted.price)  # 80.0
```

---

## Calling Specific Parent Methods

Sometimes you need to call a specific ancestor's method:

```python
class A:
    def greet(self):
        return "A"

class B(A):
    def greet(self):
        return f"B -> {super().greet()}"

class C(B):
    def greet(self):
        return f"C -> {super().greet()}"

    def greet_skip_to_a(self):
        return f"C -> {A.greet(self)}"  # Skip B, call A directly

c = C()
print(c.greet())           # C -> B -> A
print(c.greet_skip_to_a()) # C -> A
```

**Note:** Skipping classes breaks the MRO contract and should be used sparingly.

---

## Preventing Override

Sometimes a method shouldn't be overridden. Document it:

```python
class SecurityManager:
    def validate_token(self, token):
        """
        DO NOT OVERRIDE: Critical security validation.
        Override validate_permissions() instead.
        """
        if not self._check_signature(token):
            raise SecurityError("Invalid token")
        return self.validate_permissions(token)

    def validate_permissions(self, token):
        """Override this to add custom permission checks."""
        return True
```

Python doesn't enforce this, but clear documentation helps.

---

## Common Mistakes

### Changing Method Signature
```python
class Parent:
    def calculate(self, x, y):
        return x + y

# BAD - different signature breaks substitutability
class Child(Parent):
    def calculate(self, x, y, z):  # Added parameter!
        return x + y + z

# BETTER - use optional parameter
class Child(Parent):
    def calculate(self, x, y, z=0):
        return x + y + z
```

### Forgetting to Return
```python
class Filter:
    def apply(self, data):
        return data

# BUG - forgot to return!
class UpperFilter(Filter):
    def apply(self, data):
        super().apply(data).upper()  # No return!

# CORRECT
class UpperFilter(Filter):
    def apply(self, data):
        return super().apply(data).upper()
```

---

## Key Takeaways

- Override replaces parent behavior completely
- Extension uses `super()` to add to parent behavior
- Template method pattern: parent defines structure, children fill details
- Always call `super().__init__()` when overriding `__init__`
- Properties can be overridden like methods
- Keep method signatures compatible for substitutability
