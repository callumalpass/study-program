---
id: cs404-t4-refactoring
title: "Code Refactoring"
order: 7
---

# Code Refactoring

Refactoring is the process of restructuring existing code without changing its external behavior. It improves the internal structure—making code more readable, maintainable, and extensible—while keeping functionality identical. For capstone projects, regular refactoring prevents technical debt from accumulating and makes adding new features significantly easier.

## Why Refactoring Matters

During initial development, you often write code to make something work without fully understanding the problem domain. As your understanding deepens, you recognize better ways to structure the code. Refactoring allows you to apply that improved understanding.

Without refactoring, codebases gradually become harder to work with. Each quick fix or hastily-added feature increases complexity. Eventually, adding new functionality becomes slow and error-prone because you spend more time understanding existing code than writing new code. This accumulation of suboptimal code is called technical debt.

For capstone projects, refactoring is particularly valuable because you are learning as you build. What seemed like a good design decision in week two may look questionable by week eight. Refactoring gives you permission to improve your past decisions without guilt.

## When to Refactor

The best time to refactor is before adding new functionality. The "Red-Green-Refactor" cycle from Test-Driven Development illustrates this: first write a failing test (red), then make it pass with minimal code (green), then improve the code structure (refactor). This keeps code quality high without disrupting feature development.

Specific triggers that indicate refactoring is needed include:

**Duplicate Code**: When you find yourself copying and pasting code, extract a common function or class. Duplication makes bugs harder to fix because you must update multiple locations.

**Long Methods**: Methods longer than 20-30 lines often do too much. Break them into smaller, focused methods with descriptive names. Each method should do one thing well.

**Large Classes**: Classes with many methods and instance variables have too many responsibilities. Split them into smaller, focused classes that collaborate.

**Feature Envy**: When a method uses more data from another class than its own, consider moving the method to that class.

**Excessive Comments**: Comments explaining what code does often indicate the code is unclear. Refactor to make the code self-documenting through better names and structure.

## Common Refactoring Patterns

### Extract Method

The most common refactoring. Take a code fragment and turn it into a method with a name that explains what it does.

```typescript
// Before: Long method with mixed concerns
function processOrder(order: Order): void {
  // Validate order
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items');
  }
  if (!order.customer.email) {
    throw new Error('Customer email required');
  }

  // Calculate total
  let total = 0;
  for (const item of order.items) {
    total += item.price * item.quantity;
  }
  if (order.discount) {
    total *= (1 - order.discount);
  }

  // Save order
  database.save(order);
  emailService.sendConfirmation(order.customer.email, total);
}

// After: Extracted methods with clear responsibilities
function processOrder(order: Order): void {
  validateOrder(order);
  const total = calculateTotal(order);
  saveAndNotify(order, total);
}

function validateOrder(order: Order): void {
  if (!order.items || order.items.length === 0) {
    throw new Error('Order must have items');
  }
  if (!order.customer.email) {
    throw new Error('Customer email required');
  }
}

function calculateTotal(order: Order): number {
  let total = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return order.discount ? total * (1 - order.discount) : total;
}

function saveAndNotify(order: Order, total: number): void {
  database.save(order);
  emailService.sendConfirmation(order.customer.email, total);
}
```

### Rename

Good names are essential for readable code. Rename variables, methods, and classes when you find better names. Modern IDEs make this safe with automated refactoring tools.

```typescript
// Before: Unclear names
function calc(d: number[]): number {
  let t = 0;
  for (const x of d) {
    t += x;
  }
  return t / d.length;
}

// After: Descriptive names
function calculateAverage(numbers: number[]): number {
  let total = 0;
  for (const value of numbers) {
    total += value;
  }
  return total / numbers.length;
}
```

### Replace Conditional with Polymorphism

When you have switch statements or if-else chains that check type or category, consider using polymorphism instead.

```typescript
// Before: Type-checking switch statement
function calculateShipping(order: Order): number {
  switch (order.shippingMethod) {
    case 'standard':
      return order.weight * 0.5;
    case 'express':
      return order.weight * 1.0 + 5;
    case 'overnight':
      return order.weight * 2.0 + 15;
    default:
      throw new Error('Unknown shipping method');
  }
}

// After: Polymorphic shipping strategies
interface ShippingStrategy {
  calculate(weight: number): number;
}

class StandardShipping implements ShippingStrategy {
  calculate(weight: number): number {
    return weight * 0.5;
  }
}

class ExpressShipping implements ShippingStrategy {
  calculate(weight: number): number {
    return weight * 1.0 + 5;
  }
}

class OvernightShipping implements ShippingStrategy {
  calculate(weight: number): number {
    return weight * 2.0 + 15;
  }
}
```

## Safe Refactoring Practices

Refactoring is only safe when you can verify the behavior remains unchanged. This requires a good test suite. Before refactoring, ensure you have tests covering the code you are about to change. Run tests after each small change to catch regressions immediately.

Make small, incremental changes rather than large rewrites. A refactoring should take minutes, not hours. If you find yourself making large changes, break them into smaller steps.

Use version control effectively. Commit frequently during refactoring so you can easily revert if something goes wrong. Consider creating a branch for larger refactoring efforts.

Use your IDE's refactoring tools. Modern IDEs can safely rename variables across an entire codebase, extract methods, and perform other refactorings automatically. These tools are safer than manual find-and-replace.

## Refactoring in Your Capstone

Schedule regular refactoring sessions rather than letting code quality degrade until a major cleanup is needed. A good practice is spending 15-30 minutes at the end of each coding session improving code you touched that day.

Keep a "code smells" list as you work. When you notice something that could be improved but don't want to interrupt your current task, write it down. Address these items during dedicated refactoring time.

Document significant refactorings in your commit messages. Explain why the change was made and what improvement it provides. This helps team members understand the evolution of the codebase.

## Summary

Refactoring is essential for maintaining code quality over a project's lifetime. By continuously improving code structure, you prevent technical debt from accumulating and keep the codebase pleasant to work with. The key principles are: refactor in small steps, always have tests to verify behavior, use IDE tools when available, and make refactoring a regular habit rather than a rare event. For capstone projects, investing time in refactoring pays off through faster feature development and fewer bugs as the project grows.
