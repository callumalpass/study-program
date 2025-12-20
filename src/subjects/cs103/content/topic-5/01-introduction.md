---
id: cs103-t5-intro
title: "Introduction to Design Patterns"
order: 1
---

## Introduction to Design Patterns

Experienced developers notice that certain problems come up repeatedly: "I need exactly one instance of this class," "I need to create objects without knowing their exact type," "I need to notify multiple objects when something changes." Design patterns are proven solutions to these recurring problems—a shared vocabulary that makes code easier to design, discuss, and maintain.

---

## What Are Design Patterns?

Design patterns are **reusable solutions** to common software design problems. They're not finished code—they're templates you adapt to your specific situation.

Think of patterns like architectural blueprints: a "two-story house with attached garage" is a pattern. The actual implementation varies, but the core concept remains the same.

---

## Why Learn Patterns?

### 1. Shared Vocabulary
Instead of explaining "I have a class that creates different types of objects based on input," you can say "I'm using a Factory."

### 2. Proven Solutions
Patterns have been refined over decades. They handle edge cases and problems you might not anticipate.

### 3. Framework Understanding
Frameworks like Django, React, and the Python standard library use patterns extensively. Understanding patterns helps you use frameworks effectively.

### 4. Better Design Discussions
Patterns give teams a common language for discussing architecture.

---

## Pattern Categories

The "Gang of Four" (GoF) book categorizes patterns into three types:

### Creational Patterns
How objects are created:
- **Singleton:** One instance only
- **Factory:** Create without specifying exact class
- **Builder:** Construct complex objects step by step
- **Prototype:** Clone existing objects

### Structural Patterns
How objects are composed:
- **Adapter:** Make incompatible interfaces work together
- **Decorator:** Add behavior dynamically
- **Facade:** Simplify complex subsystems
- **Proxy:** Control access to objects

### Behavioral Patterns
How objects communicate:
- **Observer:** Notify multiple objects of changes
- **Strategy:** Swap algorithms at runtime
- **Command:** Encapsulate requests as objects
- **Iterator:** Access elements sequentially

---

## Patterns in This Topic

We'll focus on the most useful patterns for everyday Python development:

1. **Singleton:** Global, unique instance (database connections, configuration)
2. **Factory:** Flexible object creation
3. **Observer:** Event-driven programming
4. **Strategy:** Swappable algorithms
5. **Decorator:** Add behavior without inheritance

---

## Python's Pattern Philosophy

Python has built-in features that replace or simplify many patterns:

| Pattern | Python Alternative |
|---------|-------------------|
| Singleton | Module (natural singleton) |
| Iterator | Generators, `__iter__` |
| Command | First-class functions |
| Strategy | Functions as arguments |
| Decorator | `@decorator` syntax |

This doesn't mean patterns are useless—it means Python often provides more elegant implementations.

---

## The Anti-Pattern Warning

Patterns can be overused. Don't:
- Use a pattern just because you learned it
- Add complexity where simplicity works
- Force patterns where they don't fit

**The best code uses the simplest solution that works.**

---

## What You'll Learn

In this topic, you'll master:

1. **When** each pattern is appropriate
2. **How** to implement patterns in Python
3. **Pythonic** alternatives to traditional patterns
4. **When NOT** to use patterns
5. **Recognizing** patterns in existing code

---

## Key Takeaways

- Patterns are reusable solutions, not copy-paste code
- They provide shared vocabulary for design discussions
- Python often has simpler alternatives to traditional patterns
- Don't overuse patterns—simplicity is valuable
- Understanding patterns helps you work with frameworks
