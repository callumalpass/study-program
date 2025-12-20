---
id: cs204-t4-intro
title: "Introduction to Patterns"
order: 1
---

# Introduction to Design Patterns

Design patterns emerged from the recognition that certain design problems recur across different software projects. Understanding their origins, structure, and purpose is essential for applying them effectively.

## What Are Design Patterns?

A design pattern is a general, reusable solution to a commonly occurring problem within a given context in software design. It's not a finished design that can be transformed directly into code, but rather a description or template for how to solve a problem that can be used in many different situations.

### Characteristics of Design Patterns

**Proven Solutions**: Design patterns have been refined through extensive real-world use. They represent the collective wisdom of experienced developers who have faced similar challenges.

**Language Independent**: While implementations vary by programming language, the concepts behind design patterns transcend specific technologies. A pattern in Java looks different from Python, but solves the same problem.

**Structured Approach**: Patterns provide a formalized way to document design decisions, making them easier to communicate and understand.

### Benefits of Using Design Patterns

- **Faster Development**: Reusing proven solutions saves time compared to inventing new approaches
- **Improved Communication**: Patterns provide a shared vocabulary for developers
- **Better Architecture**: Patterns encourage loose coupling and high cohesion
- **Easier Maintenance**: Well-known patterns make code more understandable to other developers
- **Tested Solutions**: Patterns are battle-tested and have known trade-offs

## The Gang of Four

The modern concept of design patterns in software engineering was popularized by the book "Design Patterns: Elements of Reusable Object-Oriented Software" (1994) by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides, collectively known as the "Gang of Four" (GoF).

### Historical Context

The GoF drew inspiration from architect Christopher Alexander's work on pattern languages in building architecture. Alexander identified recurring design solutions in successful buildings and urban planning. The GoF adapted this concept to software design.

### The Original 23 Patterns

The Gang of Four catalog identified 23 design patterns organized into three categories:

**Creational (5 patterns)**: Abstract Factory, Builder, Factory Method, Prototype, Singleton

**Structural (7 patterns)**: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy

**Behavioral (11 patterns)**: Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor

### Impact and Evolution

The GoF book revolutionized software design by:
- Establishing a common vocabulary for design discussions
- Documenting expert knowledge in an accessible format
- Encouraging object-oriented design principles
- Inspiring additional pattern catalogs and languages

While the original patterns remain relevant, the software development community has continued to identify new patterns for modern challenges, including concurrent programming, distributed systems, and web development.

## Pattern Structure

Design patterns follow a consistent documentation structure that makes them easier to learn and apply.

### Essential Elements

#### 1. Pattern Name

A descriptive name that becomes part of the design vocabulary. Good names are memorable and evocative of the pattern's purpose. For example, "Observer" immediately suggests watching for changes.

#### 2. Intent

A brief statement answering:
- What does the pattern do?
- What problem does it solve?
- What is its rationale and intent?

Example: "Observer: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically."

#### 3. Also Known As

Alternative names for the pattern, if any. For example, "Virtual Proxy" is also known as "Lazy Initialization."

#### 4. Motivation

A scenario illustrating the design problem and how the pattern solves it. This provides context for when and why to use the pattern.

#### 5. Applicability

Situations in which the pattern can be applied. This helps determine if a pattern fits your specific situation.

#### 6. Structure

A graphical representation of the classes and objects in the pattern, typically using UML diagrams. This shows the relationships and interactions between participants.

#### 7. Participants

The classes and objects participating in the pattern and their responsibilities.

#### 8. Collaborations

How participants collaborate to carry out their responsibilities.

#### 9. Consequences

The results and trade-offs of applying the pattern, including:
- Benefits achieved
- Costs incurred
- Flexibility gained or lost
- Impact on system qualities (performance, memory, etc.)

#### 10. Implementation

Techniques, pitfalls, and language-specific considerations for implementing the pattern.

#### 11. Sample Code

Code fragments demonstrating the pattern in a specific programming language.

#### 12. Known Uses

Examples of the pattern in real systems, demonstrating its utility.

#### 13. Related Patterns

Relationships to other patterns, such as:
- Patterns often used together
- Similar patterns with important differences
- Patterns that can be used as alternatives

## Pattern Categories Explained

### Creational Patterns

Creational patterns abstract the instantiation process, making a system independent of how its objects are created, composed, and represented.

**Key Concerns**:
- Encapsulating knowledge about which concrete classes the system uses
- Hiding how instances of classes are created and put together
- Providing flexibility in what gets created, who creates it, and when

**Common Use**: When a system should be independent of how its objects are created or when you want to provide alternative creation mechanisms.

### Structural Patterns

Structural patterns deal with object composition, creating relationships between objects to form larger structures.

**Key Concerns**:
- Composing classes and objects to form larger structures
- Ensuring that when one part changes, the entire structure doesn't need to change
- Making independently developed class libraries work together

**Common Use**: When you need to compose objects to obtain new functionality or adapt interfaces.

### Behavioral Patterns

Behavioral patterns characterize the ways in which classes or objects interact and distribute responsibility.

**Key Concerns**:
- How objects communicate and interact
- Distributing responsibility among objects
- Defining communication patterns between objects

**Common Use**: When you need to define complex control flows or communication protocols between objects.

## Simple Pattern Example

Let's examine a simple pattern to understand the structure. Here's the Singleton pattern implemented in Python:

```python
class DatabaseConnection:
    """Singleton pattern: Ensures only one instance exists"""
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
        self.connection_string = "database://localhost:5432"
        print(f"Connected to {self.connection_string}")

    def query(self, sql):
        return f"Executing: {sql}"

# Usage
db1 = DatabaseConnection()  # Prints: Connected to database://localhost:5432
db2 = DatabaseConnection()  # No output, returns existing instance

print(db1 is db2)  # True - same instance
```

This example demonstrates:
- **Intent**: Ensure a class has only one instance
- **Implementation**: Using `__new__` to control instance creation
- **Benefit**: Controlled access to the sole instance
- **Use Case**: Database connections, configuration managers, logging

## When to Use Design Patterns

### Appropriate Usage

Use design patterns when:
- You recognize a problem that matches a pattern's intent
- The pattern's benefits outweigh its complexity
- The solution needs flexibility for future changes
- You want to communicate design intent clearly

### When Not to Use Patterns

Avoid design patterns when:
- The problem is simple and doesn't need the added complexity
- The pattern doesn't match your specific situation
- You're using patterns just to use patterns (pattern fever)
- The overhead isn't justified by the benefits

## Summary

Design patterns provide a proven vocabulary and set of solutions for common software design problems. Understanding the Gang of Four's foundational work and the standard pattern structure prepares you to learn and apply specific patterns effectively. The key is recognizing when a pattern applies and understanding its trade-offs, not memorizing implementations.
