---
id: cs103-t7-intro
title: "Design Principles Overview"
order: 1
---

## Design Principles and Testing

Good object-oriented code isn't just about using classes—it's about organizing code so it remains easy to understand, modify, and extend over time. This topic covers the principles and practices that separate maintainable OOP code from tangled messes.

---

## Why Design Principles Matter

Code changes constantly. Requirements shift, bugs need fixing, and features get added. Without good design:

- Small changes cascade through the codebase
- Bugs hide in unexpected places
- New features require rewriting existing code
- Tests break constantly

Design principles help you write code that **bends without breaking**.

---

## The Goal: Easy to Change

The ultimate measure of code quality is how easy it is to change safely. Good design:

- **Localizes changes:** Modifications affect few files
- **Reveals intent:** Code explains what it does
- **Enables testing:** You can verify correctness automatically
- **Supports extension:** New features don't break old ones

---

## What You'll Learn

This topic covers four interconnected areas:

### 1. Composition Over Inheritance

When to use "has-a" relationships instead of "is-a" hierarchies. Composition often leads to more flexible designs.

### 2. SOLID Principles

Five guidelines that help identify and fix maintainability problems:

- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### 3. Dependency Injection

How passing dependencies in (instead of creating them internally) improves testability and reduces coupling.

### 4. Testing OOP Code

How to write tests that verify behavior without being brittle:

- Unit testing classes
- Using fakes and mocks
- Testing object collaboration

---

## Principles vs Rules

Design principles are **guidelines, not laws**. They help you:

- Recognize when code is getting hard to change
- Understand *why* something feels wrong
- Know which direction to refactor

But blindly following any principle leads to over-engineering. The real skill is knowing when to apply each principle and when to keep things simple.

```python
# Sometimes simple is better
def calculate_tax(amount: float) -> float:
    return amount * 0.1

# Over-engineered for a simple calculation
class TaxCalculatorFactory:
    def create_calculator(self) -> "TaxCalculator":
        return DefaultTaxCalculator()

class TaxCalculator(ABC):
    @abstractmethod
    def calculate(self, amount: float) -> float: ...

class DefaultTaxCalculator(TaxCalculator):
    def calculate(self, amount: float) -> float:
        return amount * 0.1
```

---

## When to Apply Design Principles

Apply design principles when you feel **design pressure**:

- Adding a feature requires touching many files
- Similar code appears in multiple places
- Tests are hard to write or keep breaking
- Changes in one class force changes in others
- You can't understand code you wrote last month

Don't apply them preemptively to code that works fine and rarely changes.

---

## The Testing Connection

Design and testing reinforce each other:

- **Good design makes testing easier:** Loosely coupled code is easy to test in isolation
- **Testing reveals design problems:** If code is hard to test, it's usually poorly designed
- **Tests enable refactoring:** With tests, you can improve design safely

This is why we cover design principles and testing together—they're two sides of the same coin.

---

## Key Takeaways

- Design principles help code stay easy to change
- The goal is maintainability, not architectural purity
- Apply principles when you feel real design pressure
- Good design and testability go hand in hand
- Start simple; refactor when needed
