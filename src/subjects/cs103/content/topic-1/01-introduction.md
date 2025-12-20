---
id: cs103-t1-intro
title: "Introduction to Classes and Objects"
order: 1
---

## Introduction to Object-Oriented Programming

Everything in the real world can be thought of as an "object": a car has properties (color, speed, model) and behaviors (accelerate, brake, turn). Object-Oriented Programming (OOP) brings this natural way of thinking into code. Instead of writing procedures that operate on data, we create objects that contain both data and the methods to manipulate it.

---

## Why Learn OOP?

OOP is the dominant paradigm in modern software development. From web applications to mobile apps to game engines, understanding classes and objects is essential for writing maintainable, scalable code. Most job interviews will test your OOP knowledge, and most codebases you'll work with use these concepts daily.

**Key benefits of OOP:**
- **Organization:** Code is grouped logically around concepts (User, Product, Order)
- **Reusability:** Define once, use many times through classes and inheritance
- **Maintainability:** Changes to one part don't break others when designed well
- **Modeling:** Natural mapping between real-world concepts and code

---

## The Four Pillars of OOP

Before diving into syntax, understand the four fundamental concepts that make OOP powerful:

### 1. Encapsulation
Bundling data (attributes) and methods (functions) that operate on that data into a single unit (class), while restricting direct access to some components.

### 2. Abstraction
Hiding complex implementation details behind simple interfaces. Users of a class don't need to know *how* it works, just *what* it does.

### 3. Inheritance
Creating new classes based on existing ones. Child classes inherit attributes and methods from parent classes, enabling code reuse.

### 4. Polymorphism
The ability for different classes to respond to the same method call in different ways. "Many forms" for a single interface.

We'll explore each of these in depth throughout this course.

---

## Procedural vs Object-Oriented

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
```

**Object-oriented approach:**
```python
class Student:
    def __init__(self, name):
        self.name = name
        self.grades = []

    def add_grade(self, grade):
        self.grades.append(grade)

    def get_average(self):
        return sum(self.grades) / len(self.grades)

# Each student is self-contained
alice = Student("Alice")
alice.add_grade(95)
```

The OOP version keeps related data and behavior together. Each `Student` object manages its own state.

---

## What You'll Learn

In this topic, you'll master the fundamentals:

1. **Classes:** How to define blueprints for objects
2. **Objects:** How to create instances from classes
3. **Attributes:** How to store data in objects
4. **Methods:** How to define behaviors
5. **The `self` parameter:** How Python tracks instance identity
6. **Constructors:** How to initialize objects with `__init__`
7. **Special methods:** How to integrate with Python's built-in operations

---

## Key Takeaways

- OOP organizes code around objects that combine data and behavior
- The four pillars are: encapsulation, abstraction, inheritance, polymorphism
- Classes are blueprints; objects are instances created from those blueprints
- OOP maps naturally to real-world concepts, making code more intuitive
