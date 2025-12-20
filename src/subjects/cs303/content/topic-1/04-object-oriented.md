# Object-Oriented Programming

## The Object-Oriented Paradigm

Object-oriented programming (OOP) emerged in the 1960s and rose to dominance in the 1980s and 1990s as a powerful approach to managing complexity in large software systems. At its core, OOP organizes programs around objects—entities that bundle together data (attributes or fields) and behavior (methods or functions that operate on that data). This paradigm shift from function-centric procedural programming to object-centric design fundamentally changed how developers model, structure, and reason about software systems.

The conceptual foundation of OOP lies in modeling software systems as collections of interacting objects, much like real-world systems consist of interacting physical objects. A banking application might have Account objects, Customer objects, and Transaction objects. Each object encapsulates both the data it contains (account balance, customer name) and the operations it supports (deposit, withdraw, transfer). This modeling approach makes software structure more intuitive, as it often mirrors the problem domain's natural structure.

Several key principles define object-oriented programming, often summarized as the "four pillars of OOP": encapsulation, abstraction, inheritance, and polymorphism. These principles work together to enable code reuse, maintainability, and extensibility—goals that become increasingly important as software systems grow in size and complexity.

**Encapsulation** involves bundling data with the methods that operate on that data, while restricting direct access to some of the object's components. This information hiding principle prevents external code from depending on internal implementation details, enabling changes to those details without breaking dependent code.

**Abstraction** means exposing only essential features while hiding implementation complexity. Users of a class interact with its public interface without needing to understand its internal workings, reducing cognitive load and coupling.

**Inheritance** allows creating new classes based on existing ones, inheriting their attributes and methods while adding or overriding functionality. This mechanism promotes code reuse and establishes hierarchical relationships between concepts.

**Polymorphism** enables treating objects of different types uniformly through shared interfaces, allowing code to work with objects at an abstract level without knowing their concrete types. This flexibility is crucial for extensible architectures.

Understanding OOP deeply requires examining each principle, exploring how they manifest in actual code, and recognizing both their benefits and limitations. Object-oriented programming has proven remarkably successful for certain problem domains while being less suitable for others. Modern software development increasingly adopts multi-paradigm approaches, combining OOP with functional, procedural, and other paradigms as appropriate.

## Encapsulation and Abstraction

Encapsulation and abstraction, while related, represent distinct but complementary principles that work together to manage complexity in object-oriented systems.

**Encapsulation** is the practice of bundling data and methods that operate on that data within a single unit (the class) and controlling access to that unit's internals. Consider a simple BankAccount class:

```java
public class BankAccount {
    private double balance;
    private String accountNumber;

    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }

    public double getBalance() {
        return balance;
    }
}
```

The `balance` field is private, preventing direct external access. External code must use the `deposit` and `withdraw` methods, which enforce business rules (no negative deposits, no overdrafts). This encapsulation provides several benefits:

1. **Data Integrity**: The class can validate all state changes, ensuring invariants hold. No external code can directly set balance to an invalid value.

2. **Implementation Freedom**: Internal representation can change without affecting external code. We could switch from a double to a BigDecimal for precision, or add transaction logging, without modifying client code.

3. **Simplified Interface**: Users of BankAccount need only understand its public methods, not implementation details.

**Access Modifiers** control encapsulation in most OOP languages. Common modifiers include:

- **Private**: Accessible only within the class itself
- **Protected**: Accessible within the class and subclasses
- **Public**: Accessible from anywhere
- **Package/Internal**: Accessible within the same package/module (language-dependent)

Choosing appropriate access levels is crucial. The principle of least privilege suggests making everything as private as possible, exposing only what's necessary through public methods.

**Abstraction** complements encapsulation by hiding complexity behind simplified interfaces. While encapsulation is about access control, abstraction is about conceptual simplification. Consider a high-level interface for data persistence:

```python
class DataStore:
    def save(self, key, value):
        """Save a value associated with a key."""
        pass

    def load(self, key):
        """Load the value associated with a key."""
        pass

    def delete(self, key):
        """Delete the value associated with a key."""
        pass
```

Users of DataStore interact with these abstract operations without needing to know whether data is stored in memory, in a relational database, in a key-value store, or in files. This abstraction enables swapping implementations without changing client code.

**Abstraction Layers** organize systems into levels where each level provides services to the level above while using services from the level below. A typical web application might have:

- Presentation layer (UI components)
- Business logic layer (application services)
- Data access layer (repositories, ORMs)
- Database layer

Each layer abstracts over the complexity of layers beneath it. The presentation layer doesn't need to know SQL; it uses business logic services. Business logic doesn't manage database connections; it uses repositories. This separation of concerns makes systems more maintainable and testable.

**Information Hiding** is the goal of both encapsulation and abstraction. By hiding implementation details, we reduce coupling between system components. Changes to hidden details don't propagate through the system. This modularity enables large teams to work on different components simultaneously without constant coordination.

However, encapsulation and abstraction involve trade-offs. Overly encapsulated designs with tiny, highly granular classes can become unwieldy, with business logic scattered across many objects. Abstraction layers add indirection that can impact performance and make debugging more difficult. Finding the right balance—sufficient abstraction to manage complexity without excessive overhead—requires judgment that comes with experience.

## Inheritance and Class Hierarchies

Inheritance enables creating new classes based on existing ones, establishing "is-a" relationships between types. A Car is a Vehicle, a Manager is an Employee—these natural hierarchies in problem domains map cleanly to inheritance relationships in code.

**Class Inheritance** allows a subclass (derived class) to inherit attributes and methods from a superclass (base class):

```python
class Vehicle:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    def start_engine(self):
        print(f"Starting {self.make} {self.model}")

    def stop_engine(self):
        print(f"Stopping {self.make} {self.model}")

class Car(Vehicle):
    def __init__(self, make, model, year, num_doors):
        super().__init__(make, model, year)
        self.num_doors = num_doors

    def open_trunk(self):
        print("Trunk opened")

class Motorcycle(Vehicle):
    def __init__(self, make, model, year, engine_cc):
        super().__init__(make, model, year)
        self.engine_cc = engine_cc

    def pop_wheelie(self):
        print("Wheelie!")
```

Car and Motorcycle inherit common vehicle functionality while adding their specific attributes and behaviors. This promotes code reuse—the engine starting logic is written once in Vehicle rather than duplicated in every vehicle type.

**Method Overriding** allows subclasses to provide specialized implementations of methods defined in superclasses:

```java
class Animal {
    public void makeSound() {
        System.out.println("Some generic sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Woof!");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Meow!");
    }
}
```

When you call `makeSound()` on a Dog object, you get "Woof!" despite the method being defined in Animal. This enables polymorphism, discussed in the next section.

**Abstract Classes** define interfaces that subclasses must implement, providing partial implementations while deferring some details to subclasses:

```java
abstract class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    // Abstract method - subclasses must implement
    public abstract double getArea();

    // Concrete method - shared by all shapes
    public void display() {
        System.out.println(color + " shape with area " + getArea());
    }
}

class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double getArea() {
        return Math.PI * radius * radius;
    }
}
```

Abstract classes serve as templates, capturing common structure while requiring subclasses to provide specific implementations.

**Multiple Inheritance** allows a class to inherit from multiple superclasses. Some languages support this (C++, Python), while others prohibit it due to complexity (Java, C#). The classic problem is the "diamond problem":

```
    Animal
    /    \
  Mammal  Flyer
    \    /
     Bat
```

If both Mammal and Flyer override a method from Animal, which version does Bat inherit? Different languages resolve this differently. C++ requires explicit disambiguation, while Python uses method resolution order (MRO) based on the C3 linearization algorithm.

**Composition Over Inheritance** has become a guiding principle in modern OOP. Deep inheritance hierarchies become brittle—changes to base classes ripple through many subclasses. Composition, where objects contain instances of other objects, often provides more flexibility:

```java
// Inheritance approach
class GasolineCar extends Car {
    // Coupled to Car implementation
}

// Composition approach
class Vehicle {
    private Engine engine;
    private Transmission transmission;

    public Vehicle(Engine engine, Transmission transmission) {
        this.engine = engine;
        this.transmission = transmission;
    }
}
```

With composition, you can swap engine implementations at runtime, mix and match components, and avoid deep hierarchies. The guideline "favor composition over inheritance" doesn't mean never use inheritance, but rather to consider composition first and use inheritance only when true "is-a" relationships exist.

## Polymorphism and Interfaces

Polymorphism—literally "many forms"—enables treating objects of different types uniformly through shared interfaces. This principle is fundamental to extensible, maintainable object-oriented systems.

**Subtype Polymorphism** allows a variable of a supertype to reference objects of any subtype:

```java
List<Animal> animals = new ArrayList<>();
animals.add(new Dog("Buddy"));
animals.add(new Cat("Whiskers"));
animals.add(new Bird("Tweety"));

for (Animal animal : animals) {
    animal.makeSound();  // Calls appropriate subclass method
}
```

Despite the list containing different animal types, we can iterate uniformly, calling `makeSound()` on each. The runtime system dispatches to the appropriate subclass method—dynamic dispatch or late binding.

**Interfaces** define contracts that classes can implement, specifying method signatures without implementations:

```java
interface Drawable {
    void draw();
}

interface Clickable {
    void onClick();
}

class Button implements Drawable, Clickable {
    @Override
    public void draw() {
        // Rendering logic
    }

    @Override
    public void onClick() {
        // Click handling logic
    }
}
```

Interfaces enable polymorphism without inheritance hierarchies. A function accepting Drawable can work with any object implementing that interface, regardless of its class hierarchy. This decoupling is powerful—you can implement interfaces on classes you don't control, and objects can implement multiple interfaces even in languages without multiple inheritance.

**Duck Typing**, common in dynamic languages like Python, takes polymorphism further: "If it walks like a duck and quacks like a duck, it's a duck." Types are checked at runtime based on available methods rather than explicit declarations:

```python
def process_drawable(obj):
    obj.draw()  # Works for any object with a draw method

class Circle:
    def draw(self):
        print("Drawing circle")

class Square:
    def draw(self):
        print("Drawing square")

process_drawable(Circle())  # Works
process_drawable(Square())  # Works
```

No explicit interface declaration is needed. This flexibility simplifies code but sacrifices compile-time type safety.

**Generic Programming** extends polymorphism to data types, enabling code that works with multiple types while maintaining type safety:

```java
public <T extends Comparable<T>> T findMax(List<T> list) {
    T max = list.get(0);
    for (T item : list) {
        if (item.compareTo(max) > 0) {
            max = item;
        }
    }
    return max;
}
```

This method works with any type implementing Comparable—integers, strings, custom objects—without sacrificing type safety or requiring separate implementations for each type.

**Dependency Injection** leverages polymorphism for loose coupling. Rather than creating dependencies internally, objects receive them through constructors or setters:

```python
class UserService:
    def __init__(self, repository, email_service):
        self.repository = repository
        self.email_service = email_service

    def register_user(self, user_data):
        user = self.repository.save(user_data)
        self.email_service.send_welcome_email(user)
```

UserService depends on interfaces (repository, email_service) rather than concrete implementations. Test code can inject mock implementations, while production code injects real ones. This inversion of control makes systems more modular and testable.

**The Liskov Substitution Principle (LSP)**, one of the SOLID principles, formalizes correct polymorphism: objects of a superclass should be replaceable with objects of a subclass without affecting program correctness. Violating LSP creates subtle bugs:

```python
class Rectangle:
    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height

class Square(Rectangle):
    def set_width(self, width):
        self.width = width
        self.height = width  # Violates LSP!

    def set_height(self, height):
        self.width = height
        self.height = height
```

Code expecting Rectangle behavior breaks with Square, as setting width unexpectedly changes height. Proper design would avoid this problematic inheritance relationship.

Polymorphism makes object-oriented systems extensible—new types can be added without modifying existing code that uses interfaces. It enables frameworks where application code implements interfaces the framework calls (the "Hollywood Principle": "don't call us, we'll call you"). Mastering polymorphism—understanding its forms, benefits, and pitfalls—is essential for effective object-oriented design.
