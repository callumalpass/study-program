# Design Principles

Software design principles provide guidelines for creating maintainable, flexible, and robust systems. These principles, particularly the SOLID principles, form the foundation of good object-oriented design and help developers avoid common pitfalls that lead to rigid, fragile code.

## SOLID Principles

### Single Responsibility Principle (SRP)

The Single Responsibility Principle states that a class should have only one reason to change. Each class should focus on a single concern or responsibility, making it easier to understand, test, and modify.

**Poor Design:**
```
class Employee {
    calculatePay()
    saveToDatabase()
    generateReport()
    sendEmail()
}
```

**Better Design:**
```
class Employee {
    calculatePay()
}
class EmployeeRepository {
    saveToDatabase()
}
class ReportGenerator {
    generateReport()
}
class EmailService {
    sendEmail()
}
```

When a class has multiple responsibilities, changes to one responsibility can affect the others, creating ripple effects throughout the codebase. By separating concerns, each class becomes more focused and changes are isolated.

### Open/Closed Principle (OCP)

Software entities should be open for extension but closed for modification. You should be able to add new functionality without changing existing code, typically through inheritance, interfaces, or composition.

**Poor Design:**
```
class DiscountCalculator {
    calculateDiscount(customerType, amount) {
        if (customerType === "regular") {
            return amount * 0.05
        } else if (customerType === "premium") {
            return amount * 0.10
        } else if (customerType === "vip") {
            return amount * 0.20
        }
    }
}
```

**Better Design:**
```
interface DiscountStrategy {
    calculateDiscount(amount)
}

class RegularDiscount implements DiscountStrategy {
    calculateDiscount(amount) { return amount * 0.05 }
}

class PremiumDiscount implements DiscountStrategy {
    calculateDiscount(amount) { return amount * 0.10 }
}

class VIPDiscount implements DiscountStrategy {
    calculateDiscount(amount) { return amount * 0.20 }
}
```

The improved design allows adding new discount types without modifying existing classes, reducing the risk of introducing bugs.

### Liskov Substitution Principle (LSP)

Objects of a superclass should be replaceable with objects of its subclasses without breaking the application. Subtypes must maintain the behavioral contract of their base types.

**Violation Example:**
```
class Rectangle {
    setWidth(w) { this.width = w }
    setHeight(h) { this.height = h }
    getArea() { return this.width * this.height }
}

class Square extends Rectangle {
    setWidth(w) {
        this.width = w
        this.height = w  // Violates LSP
    }
    setHeight(h) {
        this.width = h
        this.height = h  // Violates LSP
    }
}
```

Code expecting a Rectangle may fail with a Square because setting width affects height, violating the expected behavior. The solution is to reconsider the inheritance hierarchy or use composition instead.

### Interface Segregation Principle (ISP)

Clients should not be forced to depend on interfaces they do not use. Large, monolithic interfaces should be split into smaller, more specific ones.

**Poor Design:**
```
interface Worker {
    work()
    eat()
    sleep()
    attendMeeting()
}

class Robot implements Worker {
    work() { /* implementation */ }
    eat() { /* robots don't eat - forced to implement */ }
    sleep() { /* robots don't sleep - forced to implement */ }
    attendMeeting() { /* implementation */ }
}
```

**Better Design:**
```
interface Workable {
    work()
}

interface Feedable {
    eat()
}

interface Restable {
    sleep()
}

class Robot implements Workable {
    work() { /* implementation */ }
}

class Human implements Workable, Feedable, Restable {
    work() { /* implementation */ }
    eat() { /* implementation */ }
    sleep() { /* implementation */ }
}
```

Smaller interfaces prevent classes from implementing methods they don't need, improving clarity and reducing coupling.

### Dependency Inversion Principle (DIP)

High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details; details should depend on abstractions.

**Poor Design:**
```
class MySQLDatabase {
    connect() { /* MySQL-specific code */ }
}

class UserService {
    constructor() {
        this.database = new MySQLDatabase()  // Direct dependency
    }
}
```

**Better Design:**
```
interface Database {
    connect()
}

class MySQLDatabase implements Database {
    connect() { /* MySQL-specific code */ }
}

class PostgreSQLDatabase implements Database {
    connect() { /* PostgreSQL-specific code */ }
}

class UserService {
    constructor(database: Database) {  // Depends on abstraction
        this.database = database
    }
}
```

By depending on abstractions, the UserService can work with any database implementation, improving flexibility and testability.

## Separation of Concerns

Separation of concerns is a fundamental principle that involves dividing a program into distinct sections, each addressing a separate concern. A concern is a set of information that affects the code of a program.

### Benefits

**Modularity:** Each component handles a specific aspect of functionality, making the system easier to understand and maintain.

**Reusability:** Well-separated components can be reused in different contexts without modification.

**Testability:** Isolated concerns are easier to test independently, improving test coverage and reliability.

**Parallel Development:** Different team members can work on separate concerns simultaneously without conflicts.

### Application Layers

Modern applications typically separate concerns into layers:

**Presentation Layer:** User interface and user interaction logic. Handles displaying data and capturing user input.

**Business Logic Layer:** Core application rules and processes. Contains domain models and business rules independent of presentation or data storage.

**Data Access Layer:** Database operations and data persistence. Manages how data is stored and retrieved.

**Service Layer:** Optional layer that coordinates application activities and provides a facade to external systems.

Each layer depends only on the layer directly beneath it, creating a clear separation of responsibilities.

## Coupling and Cohesion

### Cohesion

Cohesion measures how closely related the responsibilities of a single module are. High cohesion is desirable because it indicates that a module has a well-defined purpose.

**Types of Cohesion (from best to worst):**

**Functional Cohesion:** All elements contribute to a single, well-defined task (best).

**Sequential Cohesion:** Elements form a sequence where output from one becomes input to another.

**Communicational Cohesion:** Elements operate on the same data.

**Procedural Cohesion:** Elements follow a particular sequence of execution.

**Temporal Cohesion:** Elements are related by timing (e.g., initialization routines).

**Logical Cohesion:** Elements are logically categorized but differ in nature.

**Coincidental Cohesion:** Elements have no meaningful relationship (worst).

### Coupling

Coupling measures the degree of interdependence between modules. Low coupling is desirable because it makes systems more maintainable and flexible.

**Types of Coupling (from best to worst):**

**No Coupling:** Modules are completely independent.

**Data Coupling:** Modules share data through parameters (best practical coupling).

**Stamp Coupling:** Modules share a composite data structure.

**Control Coupling:** One module controls the flow of another by passing control information.

**Common Coupling:** Modules share global data.

**Content Coupling:** One module modifies another's internal data (worst).

### Design Goal

The ideal design exhibits high cohesion and low coupling. Each module should have a clear, focused purpose (high cohesion) while minimizing dependencies on other modules (low coupling). This combination creates systems that are easier to understand, test, modify, and extend.

## Design by Contract

Design by Contract (DbC) is a methodology where software components collaborate based on precisely defined specifications called contracts. Each component has preconditions, postconditions, and invariants.

**Preconditions:** What must be true before a method executes. The caller's responsibility.

**Postconditions:** What the method guarantees to be true after execution. The method's responsibility.

**Invariants:** Conditions that must always be true for an object.

This approach clarifies responsibilities, improves reliability, and provides a foundation for automated testing and verification.

## Conclusion

Design principles provide a foundation for creating software that withstands change and growth. The SOLID principles guide object-oriented design decisions, while separation of concerns, cohesion, and coupling metrics help evaluate design quality. By applying these principles consistently, developers create systems that are easier to understand, test, maintain, and extend over time.
