## The Strategy Pattern

**Problem:** You need to switch between different algorithms at runtime. Hard-coding algorithms creates inflexible, hard-to-test code.

**Solution:** Encapsulate each algorithm in its own class with a common interface, allowing them to be swapped freely.

---

## Classic Strategy Pattern

```python
from abc import ABC, abstractmethod

class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

class CreditCardPayment(PaymentStrategy):
    def __init__(self, card_number, cvv):
        self.card_number = card_number
        self.cvv = cvv

    def pay(self, amount):
        return f"Paid ${amount} with card ending in {self.card_number[-4:]}"

class PayPalPayment(PaymentStrategy):
    def __init__(self, email):
        self.email = email

    def pay(self, amount):
        return f"Paid ${amount} via PayPal ({self.email})"

class CryptoPayment(PaymentStrategy):
    def __init__(self, wallet_address):
        self.wallet_address = wallet_address

    def pay(self, amount):
        return f"Paid ${amount} in crypto to {self.wallet_address[:10]}..."

class ShoppingCart:
    def __init__(self):
        self.items = []
        self.payment_strategy = None

    def add_item(self, name, price):
        self.items.append({'name': name, 'price': price})

    def set_payment_strategy(self, strategy):
        self.payment_strategy = strategy

    def checkout(self):
        total = sum(item['price'] for item in self.items)
        if self.payment_strategy is None:
            raise ValueError("No payment method selected")
        return self.payment_strategy.pay(total)

# Usage
cart = ShoppingCart()
cart.add_item("Book", 29.99)
cart.add_item("Pen", 4.99)

cart.set_payment_strategy(CreditCardPayment("1234567890123456", "123"))
print(cart.checkout())  # Paid $34.98 with card ending in 3456

cart.set_payment_strategy(PayPalPayment("user@example.com"))
print(cart.checkout())  # Paid $34.98 via PayPal (user@example.com)
```

---

## Pythonic Strategy: Functions

In Python, functions are first-class. Often, you don't need classes:

```python
def credit_card_payment(amount, card_number, cvv):
    return f"Paid ${amount} with card ending in {card_number[-4:]}"

def paypal_payment(amount, email):
    return f"Paid ${amount} via PayPal ({email})"

def crypto_payment(amount, wallet):
    return f"Paid ${amount} in crypto to {wallet[:10]}..."

class ShoppingCart:
    def __init__(self):
        self.items = []
        self.payment_func = None
        self.payment_args = {}

    def set_payment(self, func, **kwargs):
        self.payment_func = func
        self.payment_args = kwargs

    def checkout(self):
        total = sum(item['price'] for item in self.items)
        return self.payment_func(total, **self.payment_args)

# Usage
cart = ShoppingCart()
cart.items = [{'name': 'Book', 'price': 30}]

cart.set_payment(credit_card_payment, card_number="1234567890123456", cvv="123")
print(cart.checkout())

cart.set_payment(paypal_payment, email="user@example.com")
print(cart.checkout())
```

---

## Strategy for Sorting

```python
from abc import ABC, abstractmethod

class SortStrategy(ABC):
    @abstractmethod
    def sort(self, data):
        pass

class AscendingSort(SortStrategy):
    def sort(self, data):
        return sorted(data)

class DescendingSort(SortStrategy):
    def sort(self, data):
        return sorted(data, reverse=True)

class RandomSort(SortStrategy):
    def sort(self, data):
        import random
        result = list(data)
        random.shuffle(result)
        return result

class DataProcessor:
    def __init__(self, sort_strategy=None):
        self.sort_strategy = sort_strategy or AscendingSort()

    def process(self, data):
        sorted_data = self.sort_strategy.sort(data)
        return sorted_data

# Switch strategies at runtime
processor = DataProcessor()
print(processor.process([3, 1, 4, 1, 5]))  # [1, 1, 3, 4, 5]

processor.sort_strategy = DescendingSort()
print(processor.process([3, 1, 4, 1, 5]))  # [5, 4, 3, 1, 1]
```

---

## Strategy for Validation

```python
class ValidationStrategy(ABC):
    @abstractmethod
    def validate(self, value):
        pass

class EmailValidation(ValidationStrategy):
    def validate(self, value):
        if '@' not in value or '.' not in value:
            raise ValueError(f"Invalid email: {value}")
        return True

class PhoneValidation(ValidationStrategy):
    def validate(self, value):
        digits = ''.join(c for c in value if c.isdigit())
        if len(digits) != 10:
            raise ValueError(f"Phone must have 10 digits: {value}")
        return True

class URLValidation(ValidationStrategy):
    def validate(self, value):
        if not value.startswith(('http://', 'https://')):
            raise ValueError(f"Invalid URL: {value}")
        return True

class InputField:
    def __init__(self, name, validation_strategy=None):
        self.name = name
        self.validation = validation_strategy
        self._value = None

    @property
    def value(self):
        return self._value

    @value.setter
    def value(self, new_value):
        if self.validation:
            self.validation.validate(new_value)
        self._value = new_value

# Usage
email_field = InputField("email", EmailValidation())
email_field.value = "user@example.com"  # OK
email_field.value = "invalid"  # ValueError

phone_field = InputField("phone", PhoneValidation())
phone_field.value = "555-123-4567"  # OK
```

---

## Strategy with Lambda Functions

For simple strategies, lambdas work well:

```python
class Processor:
    def __init__(self, transform=None):
        self.transform = transform or (lambda x: x)

    def process(self, data):
        return [self.transform(item) for item in data]

# Different strategies as lambdas
uppercase = Processor(lambda x: x.upper())
double = Processor(lambda x: x * 2)
strip = Processor(lambda x: x.strip())

print(uppercase.process(["hello", "world"]))  # ['HELLO', 'WORLD']
print(double.process([1, 2, 3]))              # [2, 4, 6]
```

---

## Real-World Example: Compression

```python
import gzip
import zlib
import bz2

class CompressionStrategy(ABC):
    @abstractmethod
    def compress(self, data):
        pass

    @abstractmethod
    def decompress(self, data):
        pass

class GzipCompression(CompressionStrategy):
    def compress(self, data):
        return gzip.compress(data.encode())

    def decompress(self, data):
        return gzip.decompress(data).decode()

class ZlibCompression(CompressionStrategy):
    def compress(self, data):
        return zlib.compress(data.encode())

    def decompress(self, data):
        return zlib.decompress(data).decode()

class NoCompression(CompressionStrategy):
    def compress(self, data):
        return data.encode()

    def decompress(self, data):
        return data.decode()

class FileStorage:
    def __init__(self, compression=None):
        self.compression = compression or NoCompression()

    def save(self, filename, data):
        compressed = self.compression.compress(data)
        with open(filename, 'wb') as f:
            f.write(compressed)

    def load(self, filename):
        with open(filename, 'rb') as f:
            data = f.read()
        return self.compression.decompress(data)

# Usage
storage = FileStorage(GzipCompression())
storage.save('data.gz', 'Large text content...')
```

---

## When to Use Strategy

**Good use cases:**
- Multiple algorithms for the same task
- Runtime algorithm selection
- Avoiding conditional logic for behavior
- Testing with different implementations

**Avoid when:**
- Only one algorithm exists
- Algorithms rarely change
- Simple functions suffice

---

## Key Takeaways

- Strategy pattern encapsulates interchangeable algorithms
- Allows runtime algorithm swapping
- In Python, functions often replace strategy classes
- Use for payment methods, sorting, validation, compression, etc.
- Avoids complex conditionals and improves testability
