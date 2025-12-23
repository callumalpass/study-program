---
id: cs103-t1-intro
title: "Introduction to Classes and Objects"
order: 1
---

## Introduction to Object-Oriented Programming

Everything in the real world can be thought of as an "object": a car has properties (color, speed, model) and behaviors (accelerate, brake, turn). Object-Oriented Programming (OOP) brings this natural way of thinking into code. Instead of writing procedures that operate on data, we create objects that contain both data and the methods to manipulate it.

This paradigm shift—from thinking about procedures to thinking about objects—represents one of the most significant evolutions in programming history. OOP emerged in the 1960s with the Simula language and was popularized by Smalltalk in the 1970s. Today, most mainstream programming languages (Python, Java, C++, JavaScript, C#, Ruby) are either object-oriented or support OOP features heavily.

---

## Why Learn OOP?

OOP is the dominant paradigm in modern software development. From web applications to mobile apps to game engines, understanding classes and objects is essential for writing maintainable, scalable code. Most job interviews will test your OOP knowledge, and most codebases you'll work with use these concepts daily.

**Key benefits of OOP:**
- **Organization:** Code is grouped logically around concepts (User, Product, Order)
- **Reusability:** Define once, use many times through classes and inheritance
- **Maintainability:** Changes to one part don't break others when designed well
- **Modeling:** Natural mapping between real-world concepts and code

**Real-world applications of OOP:**
- **Web frameworks:** Django, Flask, and Rails model requests, responses, users, and sessions as objects
- **Game development:** Characters, items, levels, and game mechanics are all objects interacting with each other
- **GUI applications:** Buttons, windows, menus, and text fields are objects with properties and event handlers
- **Data science:** DataFrames in Pandas, models in scikit-learn, and tensors in PyTorch are all objects
- **Mobile apps:** Activities (Android) and ViewControllers (iOS) manage screen objects and user interactions

Understanding OOP opens doors to working with any of these domains effectively.

---

## The Four Pillars of OOP

Before diving into syntax, understand the four fundamental concepts that make OOP powerful:

### 1. Encapsulation
Bundling data (attributes) and methods (functions) that operate on that data into a single unit (class), while restricting direct access to some components. This protects the internal state of an object from unintended interference and misuse.

**Example concept:** A `BankAccount` class encapsulates the balance and ensures that withdrawals cannot make the balance negative. External code cannot directly set the balance to an invalid value.

### 2. Abstraction
Hiding complex implementation details behind simple interfaces. Users of a class don't need to know *how* it works, just *what* it does.

**Example concept:** When you call `email.send()`, you don't need to understand SMTP protocols, socket programming, or authentication flows. The `Email` class abstracts all that complexity behind a simple method.

### 3. Inheritance
Creating new classes based on existing ones. Child classes inherit attributes and methods from parent classes, enabling code reuse.

**Example concept:** A `SavingsAccount` class can inherit from `BankAccount` and add interest calculation, without rewriting all the deposit and withdrawal logic.

### 4. Polymorphism
The ability for different classes to respond to the same method call in different ways. "Many forms" for a single interface.

**Example concept:** A `draw()` method might render a circle, rectangle, or triangle differently, but calling code can treat all shapes uniformly through a common interface.

We'll explore each of these in depth throughout this course. By the end, you'll not only understand these concepts theoretically but also know when and how to apply them effectively in your own code.

---

## Procedural vs Object-Oriented

To truly appreciate OOP, let's compare it with procedural programming—the style you likely learned in CS101. In procedural code, data and functions are separate. Functions operate on data passed to them, but there's no inherent connection between the two.

Consider tracking students and their grades:

**Procedural approach:**
```python
# Data stored separately from functions
students = []
grades = {}

def add_student(name):
    students.append(name)
    grades[name] = []

def add_grade(name, grade):
    grades[name].append(grade)

def get_average(name):
    return sum(grades[name]) / len(grades[name])

# Usage
add_student("Alice")
add_grade("Alice", 95)
add_grade("Alice", 88)
print(get_average("Alice"))  # 91.5
```

This works, but there are problems:
- The `students` list and `grades` dictionary must be kept in sync manually
- Nothing prevents you from adding a grade for a student that doesn't exist
- As the program grows, tracking which functions operate on which data becomes difficult
- If you need two separate "grade books" (e.g., for different classes), you'd need to duplicate all the data structures

**Object-oriented approach:**
```python
class Student:
    def __init__(self, name):
        self.name = name
        self.grades = []

    def add_grade(self, grade):
        self.grades.append(grade)

    def get_average(self):
        if not self.grades:
            return 0.0
        return sum(self.grades) / len(self.grades)

# Each student is self-contained
alice = Student("Alice")
alice.add_grade(95)
alice.add_grade(88)
print(alice.get_average())  # 91.5

# Easy to create multiple independent students
bob = Student("Bob")
bob.add_grade(78)
```

The OOP version keeps related data and behavior together. Each `Student` object manages its own state. You can't accidentally add grades to a non-existent student, and creating multiple independent students is trivial.

### When to Use OOP vs Procedural

OOP isn't always the answer. Use it when:
- You have entities with both state (data) and behavior (operations)
- You need multiple instances of the same kind of thing
- The problem domain maps naturally to objects (users, products, orders)
- You want to enforce invariants (rules about valid states)

Procedural style is fine for:
- Simple scripts with straightforward logic
- Mathematical computations without state
- One-off data transformations

---

## What You'll Learn

In this topic, you'll master the fundamentals of classes and objects:

1. **Classes:** How to define blueprints for objects, including the class syntax and naming conventions
2. **Objects:** How to create instances from classes and understand object identity
3. **Attributes:** How to store data in objects using instance and class variables
4. **Methods:** How to define behaviors that operate on object state
5. **The `self` parameter:** How Python tracks which object a method is operating on
6. **Constructors:** How to initialize objects with `__init__` and set up initial state
7. **Special methods:** How to integrate your classes with Python's built-in operations like `print()`, `len()`, and `==`

By the end of this topic, you'll be able to design simple classes that model real-world concepts and create objects that maintain their own state independently.

---

## Common Misconceptions

Before we dive in, let's address some common misconceptions about OOP:

**"OOP is always better than procedural programming."**
Not true. OOP adds complexity. For simple scripts or pure functions, procedural code is often cleaner. Choose the right tool for the job.

**"More classes = better design."**
Creating classes for everything leads to over-engineering. A class should represent a meaningful concept with both state and behavior.

**"Inheritance is the main benefit of OOP."**
Actually, encapsulation and composition are often more important. Inheritance can create brittle designs when overused. We'll explore this later in the course.

**"OOP is just about syntax (class, self, __init__)."**
The syntax is the easy part. The real skill is knowing *when* to create a class, what responsibilities it should have, and how objects should collaborate.

---

## Key Takeaways

- OOP organizes code around objects that combine data and behavior
- The four pillars are: encapsulation, abstraction, inheritance, polymorphism
- Classes are blueprints; objects are instances created from those blueprints
- OOP maps naturally to real-world concepts, making code more intuitive
- OOP isn't always the answer—use it when modeling entities with state and behavior
- Understanding OOP concepts is essential for working with modern frameworks and libraries
