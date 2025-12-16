import { WrittenExercise } from '../../../../core/types';

export const topic3Exercises: WrittenExercise[] = [
  {
    id: 'cs204-t3-ex1',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Class Diagram Basics',
    description: 'Design a class diagram for a simple online bookstore. Include at least 5 classes with appropriate attributes and methods. Show relationships including association, aggregation, and composition. Describe the diagram in text format suitable for UML conversion.',
    difficulty: 1,
    hints: [
      'Identify the main entities: Book, Customer, Order, etc.',
      'Use composition for "part-of" relationships that cannot exist independently',
      'Use aggregation for "has-a" relationships where parts can exist independently'
    ],
    solution: `**Online Bookstore Class Diagram**

---

**Classes and Members:**

\`\`\`
┌─────────────────────────────┐
│          Customer           │
├─────────────────────────────┤
│ - customerId: String        │
│ - email: String             │
│ - name: String              │
│ - passwordHash: String      │
│ - shippingAddress: Address  │
├─────────────────────────────┤
│ + register(): void          │
│ + login(): boolean          │
│ + placeOrder(): Order       │
│ + viewOrderHistory(): Order[]│
└─────────────────────────────┘

┌─────────────────────────────┐
│           Book              │
├─────────────────────────────┤
│ - isbn: String              │
│ - title: String             │
│ - author: String            │
│ - price: Decimal            │
│ - stockQuantity: Integer    │
│ - category: String          │
├─────────────────────────────┤
│ + getDetails(): BookInfo    │
│ + updateStock(qty): void    │
│ + isAvailable(): boolean    │
└─────────────────────────────┘

┌─────────────────────────────┐
│           Order             │
├─────────────────────────────┤
│ - orderId: String           │
│ - orderDate: DateTime       │
│ - status: OrderStatus       │
│ - totalAmount: Decimal      │
├─────────────────────────────┤
│ + calculateTotal(): Decimal │
│ + updateStatus(): void      │
│ + addItem(item): void       │
│ + removeItem(item): void    │
└─────────────────────────────┘

┌─────────────────────────────┐
│         OrderItem           │
├─────────────────────────────┤
│ - quantity: Integer         │
│ - unitPrice: Decimal        │
├─────────────────────────────┤
│ + getSubtotal(): Decimal    │
└─────────────────────────────┘

┌─────────────────────────────┐
│         Address             │
├─────────────────────────────┤
│ - street: String            │
│ - city: String              │
│ - state: String             │
│ - zipCode: String           │
│ - country: String           │
├─────────────────────────────┤
│ + format(): String          │
│ + validate(): boolean       │
└─────────────────────────────┘

┌─────────────────────────────┐
│      ShoppingCart           │
├─────────────────────────────┤
│ - createdAt: DateTime       │
├─────────────────────────────┤
│ + addBook(book, qty): void  │
│ + removeBook(book): void    │
│ + getTotal(): Decimal       │
│ + checkout(): Order         │
│ + clear(): void             │
└─────────────────────────────┘
\`\`\`

---

**Relationships:**

1. **Customer → Order (Association, 1 to many)**
   - A Customer places zero or more Orders
   - An Order belongs to exactly one Customer

2. **Order ◆→ OrderItem (Composition)**
   - An Order contains one or more OrderItems
   - OrderItems cannot exist without their Order
   - If Order is deleted, OrderItems are deleted

3. **OrderItem → Book (Association)**
   - An OrderItem references exactly one Book
   - A Book can appear in many OrderItems

4. **Customer ◇→ Address (Aggregation)**
   - A Customer has one or more Addresses
   - Addresses can exist independently (shared with Order)

5. **Customer → ShoppingCart (Association, 1 to 1)**
   - A Customer has one active ShoppingCart
   - ShoppingCart belongs to one Customer

6. **ShoppingCart → Book (Association, many to many)**
   - ShoppingCart contains references to Books with quantities`
  },
  {
    id: 'cs204-t3-ex2',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Sequence Diagram Creation',
    description: 'Create a sequence diagram for the "User Login" use case. Include the following objects: User, LoginPage, AuthenticationService, UserRepository, and SessionManager. Show the messages exchanged for both successful and failed login attempts.',
    difficulty: 2,
    hints: [
      'Start with the user initiating the login',
      'Show synchronous messages with solid arrows',
      'Include return messages',
      'Use alt/opt fragments for conditional flows'
    ],
    solution: `**Sequence Diagram: User Login**

\`\`\`
┌─────┐     ┌───────────┐     ┌─────────────────────┐     ┌────────────────┐     ┌────────────────┐
│User │     │ LoginPage │     │AuthenticationService│     │ UserRepository │     │ SessionManager │
└──┬──┘     └─────┬─────┘     └──────────┬──────────┘     └───────┬────────┘     └───────┬────────┘
   │              │                      │                        │                      │
   │ enterCredentials(email, password)   │                        │                      │
   │─────────────>│                      │                        │                      │
   │              │                      │                        │                      │
   │              │ authenticate(email, password)                 │                      │
   │              │─────────────────────>│                        │                      │
   │              │                      │                        │                      │
   │              │                      │ findByEmail(email)     │                      │
   │              │                      │───────────────────────>│                      │
   │              │                      │                        │                      │
   │              │                      │ user: User             │                      │
   │              │                      │<───────────────────────│                      │
   │              │                      │                        │                      │
╔══╧══════════════╧══════════════════════╧════════════════════════╧══════════════════════╧═══╗
║ alt [user found AND password valid]                                                        ║
╠════════════════════════════════════════════════════════════════════════════════════════════╣
   │              │                      │                        │                      │
   │              │                      │ verifyPassword(hash, password)                │
   │              │                      │────────(internal)──────│                      │
   │              │                      │                        │                      │
   │              │                      │ createSession(userId)  │                      │
   │              │                      │─────────────────────────────────────────────>│
   │              │                      │                        │                      │
   │              │                      │ sessionToken           │                      │
   │              │                      │<─────────────────────────────────────────────│
   │              │                      │                        │                      │
   │              │                      │ updateLastLogin()      │                      │
   │              │                      │───────────────────────>│                      │
   │              │                      │                        │                      │
   │              │ AuthResult(success, token)                    │                      │
   │              │<─────────────────────│                        │                      │
   │              │                      │                        │                      │
   │ displayDashboard()                  │                        │                      │
   │<─────────────│                      │                        │                      │
   │              │                      │                        │                      │
╠════════════════════════════════════════════════════════════════════════════════════════════╣
║ [else: user not found OR password invalid]                                                 ║
╠════════════════════════════════════════════════════════════════════════════════════════════╣
   │              │                      │                        │                      │
   │              │                      │ logFailedAttempt(email)│                      │
   │              │                      │───────────────────────>│                      │
   │              │                      │                        │                      │
   │              │ AuthResult(failure, "Invalid credentials")    │                      │
   │              │<─────────────────────│                        │                      │
   │              │                      │                        │                      │
   │ displayError("Invalid email or password")                    │                      │
   │<─────────────│                      │                        │                      │
   │              │                      │                        │                      │
╚════════════════════════════════════════════════════════════════════════════════════════════╝
\`\`\`

**Key Design Decisions:**

1. **Generic error message**: "Invalid credentials" doesn't reveal whether email or password was wrong (security best practice)

2. **Password never transmitted**: AuthenticationService receives password but verifies against stored hash internally

3. **Audit logging**: Failed attempts are logged for security monitoring

4. **Session creation**: Separate SessionManager handles token generation (single responsibility)

5. **Last login update**: UserRepository tracks login timestamps for security/analytics`
  },
  {
    id: 'cs204-t3-ex3',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'State Machine Diagram',
    description: 'Create a state machine diagram for an Order object in an e-commerce system. The order can be in states: Created, Pending Payment, Paid, Processing, Shipped, Delivered, Cancelled, Refunded. Show all transitions with events/guards/actions.',
    difficulty: 2,
    hints: [
      'Identify valid state transitions',
      'Consider which states can transition to Cancelled',
      'Include guards for conditional transitions',
      'Show entry/exit actions where appropriate'
    ],
    solution: `**State Machine Diagram: Order Lifecycle**

\`\`\`
                          ┌───────────────┐
                          │    [START]    │
                          └───────┬───────┘
                                  │ createOrder()
                                  ▼
                          ┌───────────────┐
                          │    Created    │
                          │───────────────│
                          │entry/         │
                          │ generateOrderId│
                          │ setTimestamp   │
                          └───────┬───────┘
                                  │ submitOrder()
                                  ▼
                          ┌───────────────┐
      cancelOrder()       │    Pending    │       cancelOrder()
    ┌─────────────────────│    Payment    │────────────────────┐
    │                     └───────┬───────┘                    │
    │                             │ receivePayment()           │
    │                             │ [payment valid]            │
    │                             ▼                            │
    │                     ┌───────────────┐                    │
    │   cancelOrder()     │     Paid      │                    │
    │ ┌───────────────────│───────────────│                    │
    │ │                   │entry/         │                    │
    │ │                   │ notifyCustomer│                    │
    │ │                   │ reserveStock  │                    │
    │ │                   └───────┬───────┘                    │
    │ │                           │ processOrder()             │
    │ │                           ▼                            │
    │ │                   ┌───────────────┐                    │
    │ │                   │  Processing   │                    │
    │ │                   │───────────────│                    │
    │ │                   │entry/         │                    │
    │ │                   │ allocateStock │                    │
    │ │                   │ preparePackage│                    │
    │ │                   └───────┬───────┘                    │
    │ │                           │ shipOrder(trackingId)      │
    │ │                           ▼                            │
    │ │                   ┌───────────────┐                    │
    │ │                   │    Shipped    │                    │
    │ │                   │───────────────│                    │
    │ │                   │entry/         │                    │
    │ │                   │ sendShipNotif │                    │
    │ │                   │ saveTracking  │                    │
    │ │                   └───────┬───────┘                    │
    │ │                           │ confirmDelivery()          │
    │ │                           ▼                            │
    │ │                   ┌───────────────┐                    │
    │ │                   │   Delivered   │                    │
    │ │                   │───────────────│                    │
    │ │                   │entry/         │                    │
    │ │                   │ requestReview │                    │
    │ │                   └───────┬───────┘                    │
    │ │                           │                            │
    │ │    ┌──────────────────────┴──────────────────┐         │
    │ │    │ requestRefund()                         │         │
    │ │    │ [within return window]                  │         │
    │ │    ▼                                         │         │
    │ │  ┌───────────────┐                           │         │
    │ │  │   Refunded    │                           │         │
    │ │  │───────────────│                           │         │
    │ │  │entry/         │                           │         │
    │ │  │ processRefund │                           │         │
    │ │  │ restoreStock  │                           │         │
    │ │  └───────┬───────┘                           │         │
    │ │          │                                   │         │
    │ │          ▼                                   ▼         │
    │ │   ┌──────────────────────────────────────────────┐     │
    │ │   │                   [END]                      │     │
    │ │   └──────────────────────────────────────────────┘     │
    │ │                          ▲                             │
    │ └──────────────────────────┼─────────────────────────────┘
    │                            │
    │                   ┌────────┴────────┐
    └──────────────────>│    Cancelled    │
                        │─────────────────│
                        │entry/           │
                        │ releaseStock    │
                        │ refundIfPaid    │
                        │ notifyCustomer  │
                        └─────────────────┘
\`\`\`

---

**Transition Table:**

| From State | Event | Guard | Action | To State |
|------------|-------|-------|--------|----------|
| [Start] | createOrder() | - | generateOrderId() | Created |
| Created | submitOrder() | - | - | Pending Payment |
| Pending Payment | receivePayment() | payment valid | capturePayment() | Paid |
| Pending Payment | cancelOrder() | - | - | Cancelled |
| Paid | processOrder() | - | - | Processing |
| Paid | cancelOrder() | - | initiateRefund() | Cancelled |
| Processing | shipOrder() | - | - | Shipped |
| Shipped | confirmDelivery() | - | - | Delivered |
| Delivered | requestRefund() | within 30 days | - | Refunded |
| * | timeout(24h) | state == Pending Payment | - | Cancelled |

---

**Notes:**
- Cancellation allowed from: Created, Pending Payment, Paid (not after Processing starts)
- Automatic cancellation after 24h in Pending Payment state
- Refund only available within return window (30 days from delivery)`
  },
  {
    id: 'cs204-t3-ex4',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'SOLID Principles Analysis',
    description: 'Analyze the following code snippet and identify which SOLID principles it violates. Explain each violation and provide a refactored design that adheres to SOLID.\n\n```java\nclass Employee {\n  String name;\n  double salary;\n  String department;\n  \n  void calculatePay() { /* calculates salary */ }\n  void saveToDatabase() { /* saves employee */ }\n  void generateReport() { /* creates PDF report */ }\n  void sendEmail(String message) { /* sends email */ }\n}\n```',
    difficulty: 3,
    hints: [
      'SRP: A class should have one reason to change',
      'Consider what responsibilities this class has',
      'Think about what changes if the database, email system, or reporting changes'
    ],
    solution: `**SOLID Principles Violation Analysis**

---

**Violations Identified:**

**1. Single Responsibility Principle (SRP) - VIOLATED**

The Employee class has multiple reasons to change:
- Business rules change (calculatePay)
- Database schema changes (saveToDatabase)
- Report format changes (generateReport)
- Email system changes (sendEmail)

Each of these represents a different responsibility that should be in its own class.

**2. Open/Closed Principle (OCP) - VIOLATED**

To add new pay calculation methods (hourly, salaried, contractor), we must modify the Employee class. The class is not open for extension, closed for modification.

**3. Dependency Inversion Principle (DIP) - VIOLATED**

The class directly implements database, email, and reporting functionality rather than depending on abstractions. High-level policy (Employee) depends on low-level details.

---

**Refactored Design:**

\`\`\`java
// Domain entity - only employee data and identity
class Employee {
    private String id;
    private String name;
    private String department;
    private PaymentStrategy paymentStrategy;

    public Employee(String id, String name, String department) {
        this.id = id;
        this.name = name;
        this.department = department;
    }

    // Getters and setters for data
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }

    public PaymentStrategy getPaymentStrategy() {
        return paymentStrategy;
    }
}

// SRP: Separate class for pay calculation
// OCP: Strategy pattern allows extension without modification
interface PaymentStrategy {
    double calculatePay(Employee employee);
}

class SalariedPayment implements PaymentStrategy {
    private double annualSalary;

    public double calculatePay(Employee employee) {
        return annualSalary / 12;
    }
}

class HourlyPayment implements PaymentStrategy {
    private double hourlyRate;
    private int hoursWorked;

    public double calculatePay(Employee employee) {
        return hourlyRate * hoursWorked;
    }
}

// SRP: Separate repository for persistence
// DIP: Depends on abstraction (interface)
interface EmployeeRepository {
    void save(Employee employee);
    Employee findById(String id);
    List<Employee> findAll();
}

class DatabaseEmployeeRepository implements EmployeeRepository {
    private Database db;

    public void save(Employee employee) {
        // Database-specific implementation
    }
    // ... other methods
}

// SRP: Separate service for reporting
interface ReportGenerator {
    byte[] generate(Employee employee);
}

class PdfEmployeeReport implements ReportGenerator {
    public byte[] generate(Employee employee) {
        // PDF generation logic
    }
}

class CsvEmployeeReport implements ReportGenerator {
    public byte[] generate(Employee employee) {
        // CSV generation logic
    }
}

// SRP: Separate service for notifications
interface NotificationService {
    void send(Employee employee, String message);
}

class EmailNotificationService implements NotificationService {
    public void send(Employee employee, String message) {
        // Email sending logic
    }
}

// Orchestration through service class
class EmployeeService {
    private EmployeeRepository repository;
    private NotificationService notifications;

    public EmployeeService(EmployeeRepository repo, NotificationService notif) {
        this.repository = repo;  // DIP: Injected dependencies
        this.notifications = notif;
    }

    public void processPayroll(Employee employee) {
        double pay = employee.getPaymentStrategy().calculatePay(employee);
        repository.save(employee);
        notifications.send(employee, "Your pay: $" + pay);
    }
}
\`\`\`

---

**Summary of Changes:**

| Principle | Original Issue | Refactored Solution |
|-----------|---------------|---------------------|
| SRP | 5 responsibilities in one class | Separated into 5 focused classes |
| OCP | Must modify for new pay types | Strategy pattern for extensibility |
| LSP | N/A (no inheritance shown) | Base strategies are substitutable |
| ISP | N/A (no interfaces shown) | Focused interfaces defined |
| DIP | Direct implementation of details | Depends on injected abstractions |`
  },
  {
    id: 'cs204-t3-ex5',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Activity Diagram for Business Process',
    description: 'Create an activity diagram for an "Order Fulfillment" business process. Include the following activities: Receive Order, Check Inventory, Pack Order, Arrange Shipping, Send Notification. Include decision points, parallel activities (fork/join), and swimlanes for different departments (Sales, Warehouse, Shipping).',
    difficulty: 3,
    hints: [
      'Use swimlanes to show which department performs each activity',
      'Fork/Join bars show parallel activities',
      'Diamonds represent decision points',
      'Consider exception paths like "out of stock"'
    ],
    solution: `**Activity Diagram: Order Fulfillment Process**

\`\`\`
┌──────────────────┬──────────────────────┬────────────────────────┐
│      SALES       │      WAREHOUSE       │       SHIPPING         │
├──────────────────┼──────────────────────┼────────────────────────┤
│                  │                      │                        │
│    ●(Start)      │                      │                        │
│       │          │                      │                        │
│       ▼          │                      │                        │
│ ┌────────────┐   │                      │                        │
│ │  Receive   │   │                      │                        │
│ │   Order    │   │                      │                        │
│ └─────┬──────┘   │                      │                        │
│       │          │                      │                        │
│       ├──────────┼──────────────────────│                        │
│       │          │       ▼              │                        │
│       │          │ ┌────────────┐       │                        │
│       │          │ │   Check    │       │                        │
│       │          │ │ Inventory  │       │                        │
│       │          │ └─────┬──────┘       │                        │
│       │          │       │              │                        │
│       │          │       ◇              │                        │
│       │          │      /│\\             │                        │
│       │          │ [In  / │ \\ [Out of   │                        │
│       │          │Stock]/ │  \\ Stock]   │                        │
│       │          │     │  │   │         │                        │
│       │          │     ▼  │   │         │                        │
│       │          │ ═══════╤═══│════     │                        │
│       │          │   FORK │   │         │                        │
│       │          │ ═══════╧═══│════     │                        │
│       │          │    │   │   │         │                        │
│       │          │    │   │   ▼         │                        │
│       │          │    │   │  ┌─────────┐│                        │
│       │          │    │   │  │ Reorder ││                        │
│       │          │    │   │  │  Stock  ││                        │
│       │          │    │   │  └────┬────┘│                        │
│       │          │    │   │       │     │                        │
│       │          │    ▼   │       │     │                        │
│       │          │ ┌──────┴──┐    │     │                        │
│       │          │ │  Pick   │    │     │                        │
│       │          │ │  Items  │    │     │                        │
│       │          │ └────┬────┘    │     │                        │
│       │          │      │         │     │                        │
│       │          │      ▼         │     │                        │
│       │          │ ┌────────────┐ │     │                        │
│       │          │ │   Pack     │ │     │                        │
│       │          │ │   Order    │ │     │                        │
│       │          │ └─────┬──────┘ │     │                        │
│       │          │       │        │     │                        │
│       │          │       ├────────┼─────┼────────────────────────│
│       │          │       │        │     │         ▼              │
│       │          │       │        │     │   ┌────────────┐       │
│       │          │       │        │     │   │  Arrange   │       │
│       │          │       │        │     │   │  Shipping  │       │
│       │          │       │        │     │   └─────┬──────┘       │
│       │          │       │        │     │         │              │
│       │          │       │        │     │         ▼              │
│       │          │       │        │     │   ┌────────────┐       │
│       │          │       │        │     │   │  Generate  │       │
│       │          │       │        │     │   │  Tracking  │       │
│       │          │       │        │     │   └─────┬──────┘       │
│       │          │       │        │     │         │              │
│       │          │ ══════╧════════╧═════╧═════════╧══════        │
│       │          │              JOIN                             │
│       │          │ ══════════════╤═══════════════════════        │
│       │          │               │                               │
│       ◄──────────┼───────────────┘                               │
│       │          │                      │                        │
│       ▼          │                      │                        │
│ ┌────────────┐   │                      │                        │
│ │   Send     │   │                      │                        │
│ │Notification│   │                      │                        │
│ └─────┬──────┘   │                      │                        │
│       │          │                      │                        │
│       ▼          │                      │                        │
│   ◉ (End)        │                      │                        │
│                  │                      │                        │
└──────────────────┴──────────────────────┴────────────────────────┘
\`\`\`

---

**Activity Descriptions:**

1. **Receive Order (Sales)**: Order received from customer, validated, logged in system

2. **Check Inventory (Warehouse)**: Verify all items in stock

3. **Decision Point**:
   - [In Stock]: Proceed to fulfillment
   - [Out of Stock]: Trigger reorder, may delay fulfillment

4. **FORK (Parallel Activities)**:
   - Pick Items: Warehouse staff retrieves items
   - Reorder Stock: (If needed) Submit purchase order

5. **Pack Order (Warehouse)**: Items wrapped, packed, labeled

6. **Arrange Shipping (Shipping)**: Select carrier, schedule pickup

7. **Generate Tracking (Shipping)**: Create tracking number

8. **JOIN**: Wait for all parallel activities to complete

9. **Send Notification (Sales)**: Customer receives shipping confirmation with tracking`
  },
  {
    id: 'cs204-t3-ex6',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Component Diagram Design',
    description: 'Design a component diagram for a microservices-based e-commerce application. Include at least 6 components: User Service, Product Service, Order Service, Payment Service, Notification Service, and API Gateway. Show interfaces provided and required by each component.',
    difficulty: 3,
    hints: [
      'Use lollipop notation for provided interfaces',
      'Use socket notation for required interfaces',
      'Show dependencies between components',
      'Consider message queues for async communication'
    ],
    solution: `**Component Diagram: E-Commerce Microservices Architecture**

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                              <<component>>                                  │
│                              API Gateway                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  ○──IAuthentication                                                         │
│  ○──IRouting                                                                │
│  ○──IRateLimiting                                                           │
│                                                                             │
│  Requires:                                                                  │
│  ◐──IUserService                                                            │
│  ◐──IProductService                                                         │
│  ◐──IOrderService                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
          │                    │                     │
          │ HTTP/REST          │ HTTP/REST           │ HTTP/REST
          ▼                    ▼                     ▼
┌────────────────────┐ ┌────────────────────┐ ┌────────────────────┐
│   <<component>>    │ │   <<component>>    │ │   <<component>>    │
│   User Service     │ │  Product Service   │ │   Order Service    │
├────────────────────┤ ├────────────────────┤ ├────────────────────┤
│                    │ │                    │ │                    │
│ ○──IUserService    │ │ ○──IProductService │ │ ○──IOrderService   │
│    - register()    │ │    - getProduct()  │ │    - createOrder() │
│    - login()       │ │    - search()      │ │    - getOrder()    │
│    - getProfile()  │ │    - getInventory()│ │    - updateStatus()│
│                    │ │                    │ │                    │
│ ◐──IDatabase       │ │ ◐──IDatabase       │ │ ◐──IDatabase       │
│ ◐──ICache          │ │ ◐──ISearchEngine   │ │ ◐──IUserService    │
│                    │ │ ◐──ICache          │ │ ◐──IProductService │
│                    │ │                    │ │ ◐──IPaymentService │
│                    │ │                    │ │ ◐──IMessageQueue   │
└────────────────────┘ └────────────────────┘ └─────────┬──────────┘
          │                                             │
          │                                             │ Event: OrderCreated
          ▼                                             ▼
┌────────────────────┐                       ┌────────────────────┐
│   <<component>>    │                       │   <<component>>    │
│   PostgreSQL DB    │                       │   Message Queue    │
├────────────────────┤                       │     (RabbitMQ)     │
│ ○──IDatabase       │                       ├────────────────────┤
│    - query()       │                       │ ○──IMessageQueue   │
│    - execute()     │                       │    - publish()     │
│    - transaction() │                       │    - subscribe()   │
└────────────────────┘                       └─────────┬──────────┘
                                                       │
                        ┌──────────────────────────────┼──────────────────┐
                        │                              │                  │
                        ▼                              ▼                  ▼
            ┌────────────────────┐       ┌────────────────────┐  ┌─────────────────┐
            │   <<component>>    │       │   <<component>>    │  │  <<component>>  │
            │  Payment Service   │       │Notification Service│  │ Inventory Svc   │
            ├────────────────────┤       ├────────────────────┤  ├─────────────────┤
            │                    │       │                    │  │                 │
            │ ○──IPaymentService │       │ ○──INotification   │  │ ○──IInventory   │
            │    - processPayment│       │    - sendEmail()   │  │    - reserve()  │
            │    - refund()      │       │    - sendSMS()     │  │    - release()  │
            │    - getStatus()   │       │    - sendPush()    │  │    - update()   │
            │                    │       │                    │  │                 │
            │ ◐──IPaymentGateway │       │ ◐──IEmailProvider  │  │ ◐──IDatabase    │
            │ ◐──IMessageQueue   │       │ ◐──ISMSProvider    │  │ ◐──IMessageQueue│
            │                    │       │ ◐──IMessageQueue   │  │                 │
            └────────────────────┘       └────────────────────┘  └─────────────────┘
                        │
                        ▼
            ┌────────────────────┐
            │   <<component>>    │
            │   Stripe Gateway   │
            │    (External)      │
            ├────────────────────┤
            │ ○──IPaymentGateway │
            │    - charge()      │
            │    - refund()      │
            └────────────────────┘
\`\`\`

---

**Legend:**
- ○── : Provided Interface (lollipop)
- ◐── : Required Interface (socket)
- ─── : Synchronous dependency
- ─ ─ : Asynchronous (message-based)

---

**Key Design Decisions:**

1. **API Gateway**: Single entry point handles authentication, routing, rate limiting

2. **Service Isolation**: Each service owns its data, no shared databases

3. **Async Communication**: Message queue for event-driven workflows (OrderCreated triggers Payment, Notification, Inventory)

4. **External Integration**: Payment gateway abstracted behind interface (allows switching providers)

5. **Caching**: User and Product services use cache for frequently accessed data`
  },
  {
    id: 'cs204-t3-ex7',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Coupling and Cohesion Analysis',
    description: 'Analyze the following module structure for coupling and cohesion issues. Identify specific problems and propose improvements.\n\nModule A: UserManager\n- registerUser(), loginUser(), updateUserProfile()\n- processPayment(), refundPayment()\n- sendWelcomeEmail(), sendPasswordResetEmail()\n- generateUserReport(), exportUserData()\n\nModule B: Utilities\n- formatDate(), formatCurrency()\n- validateEmail(), validatePhoneNumber()\n- connectToDatabase(), executeQuery()\n- logError(), logInfo()',
    difficulty: 3,
    hints: [
      'High cohesion means related functions grouped together',
      'Low coupling means minimal dependencies between modules',
      'Identify unrelated responsibilities in each module',
      'Consider the Single Responsibility Principle'
    ],
    solution: `**Coupling and Cohesion Analysis**

---

**MODULE A: UserManager - Analysis**

**Cohesion Issues: LOW COHESION (Logical/Coincidental)**

The module groups functions that happen to relate to users but have different responsibilities:

| Function Group | Actual Responsibility |
|---------------|----------------------|
| registerUser, loginUser, updateUserProfile | User account management |
| processPayment, refundPayment | Payment processing |
| sendWelcomeEmail, sendPasswordResetEmail | Email/Notification |
| generateUserReport, exportUserData | Reporting/Data export |

**Problems:**
1. Changes to payment logic require modifying UserManager
2. Email system changes affect user module
3. Reporting changes touch user code
4. Module will grow uncontrollably
5. Hard to test in isolation (needs mock payment gateway, email service)

---

**MODULE B: Utilities - Analysis**

**Cohesion Issues: LOW COHESION (Coincidental)**

Classic "utility" anti-pattern - unrelated functions dumped together:

| Function Group | Actual Domain |
|---------------|---------------|
| formatDate, formatCurrency | Formatting/Presentation |
| validateEmail, validatePhoneNumber | Validation |
| connectToDatabase, executeQuery | Data access |
| logError, logInfo | Logging |

**Problems:**
1. No logical grouping - "utilities" is not a responsibility
2. Database code mixed with formatting code
3. Will become a dumping ground for any "helper" function
4. Changes to logging affect module that does validation
5. Implicit dependencies between unrelated systems

---

**Coupling Issues:**

1. **Content Coupling Risk**: UserManager likely directly calls email system internals
2. **Common Coupling**: Multiple modules will depend on Utilities, creating indirect coupling
3. **Stamp Coupling**: Likely passing entire objects when only some fields needed

---

**PROPOSED REFACTORING:**

\`\`\`
BEFORE:                          AFTER:
──────────                       ──────

┌──────────────┐                ┌──────────────────┐
│  UserManager │                │  UserService     │  (High Cohesion)
│  (12 methods)│                │  - register()    │
└──────────────┘                │  - login()       │
                                │  - updateProfile()│
                                └──────────────────┘

                                ┌──────────────────┐
                                │  PaymentService  │  (High Cohesion)
                                │  - processPayment│
                                │  - refund()      │
                                └──────────────────┘

                                ┌──────────────────┐
                                │NotificationService│ (High Cohesion)
                                │  - sendWelcome() │
                                │  - sendReset()   │
                                └──────────────────┘

                                ┌──────────────────┐
                                │  ReportService   │  (High Cohesion)
                                │  - generateReport│
                                │  - exportData()  │
                                └──────────────────┘

┌──────────────┐                ┌──────────────────┐
│   Utilities  │                │   Formatters     │  (Functional Cohesion)
│  (8 methods) │                │  - formatDate()  │
└──────────────┘                │  - formatCurrency│
                                └──────────────────┘

                                ┌──────────────────┐
                                │   Validators     │  (Functional Cohesion)
                                │  - validateEmail │
                                │  - validatePhone │
                                └──────────────────┘

                                ┌──────────────────┐
                                │  DatabaseClient  │  (Communicational)
                                │  - connect()     │
                                │  - query()       │
                                │  - execute()     │
                                └──────────────────┘

                                ┌──────────────────┐
                                │     Logger       │  (Functional Cohesion)
                                │  - error()       │
                                │  - info()        │
                                │  - debug()       │
                                └──────────────────┘
\`\`\`

---

**Cohesion Types Achieved:**

| Module | Cohesion Type | Description |
|--------|--------------|-------------|
| UserService | Functional | All methods operate on User entity |
| PaymentService | Functional | All methods handle payments |
| Validators | Functional | All methods validate input |
| Logger | Functional | All methods log messages |
| DatabaseClient | Communicational | Methods share database connection |

---

**Coupling Reduction:**

1. Use dependency injection to inject NotificationService into UserService
2. Use interfaces (IPaymentGateway) to decouple from specific implementations
3. Use events/messages instead of direct calls where appropriate`
  },
  {
    id: 'cs204-t3-ex8',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Deployment Diagram',
    description: 'Create a deployment diagram for a three-tier web application. Include: Client Browser, Load Balancer, Web Servers (2), Application Servers (2), Database Server (Primary + Replica), and Cache Server. Show nodes, artifacts, and communication protocols.',
    difficulty: 3,
    hints: [
      'Nodes are shown as 3D boxes',
      'Artifacts (deployed software) go inside nodes',
      'Show communication paths with protocols',
      'Consider redundancy and failover'
    ],
    solution: `**Deployment Diagram: Three-Tier Web Application**

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    CLIENT TIER                                          │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│    ┌─────────────────────┐         ┌─────────────────────┐                             │
│    │     <<device>>      │         │     <<device>>      │                             │
│    │   User Workstation  │         │   Mobile Device     │                             │
│    ├─────────────────────┤         ├─────────────────────┤                             │
│    │  <<artifact>>       │         │  <<artifact>>       │                             │
│    │  Chrome Browser     │         │  iOS/Android App    │                             │
│    │  ┌───────────────┐  │         │  ┌───────────────┐  │                             │
│    │  │ React SPA     │  │         │  │ React Native  │  │                             │
│    │  │ bundle.js     │  │         │  │ App Bundle    │  │                             │
│    │  └───────────────┘  │         │  └───────────────┘  │                             │
│    └──────────┬──────────┘         └──────────┬──────────┘                             │
│               │                               │                                         │
└───────────────┼───────────────────────────────┼─────────────────────────────────────────┘
                │ HTTPS (443)                   │ HTTPS (443)
                │                               │
                └───────────────┬───────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    WEB TIER                                             │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                        ┌─────────────────────────────┐                                  │
│                        │       <<device>>            │                                  │
│                        │    Load Balancer (AWS ALB)  │                                  │
│                        ├─────────────────────────────┤                                  │
│                        │  <<artifact>>               │                                  │
│                        │  nginx.conf                 │                                  │
│                        │  - SSL termination          │                                  │
│                        │  - Round-robin balancing    │                                  │
│                        │  - Health checks            │                                  │
│                        └──────────┬──────────────────┘                                  │
│                                   │                                                     │
│                    ┌──────────────┴──────────────┐                                      │
│                    │ HTTP (80)                   │ HTTP (80)                            │
│                    ▼                             ▼                                      │
│    ┌─────────────────────────────┐ ┌─────────────────────────────┐                      │
│    │       <<device>>            │ │       <<device>>            │                      │
│    │    Web Server 1 (EC2)       │ │    Web Server 2 (EC2)       │                      │
│    ├─────────────────────────────┤ ├─────────────────────────────┤                      │
│    │  <<artifact>>               │ │  <<artifact>>               │                      │
│    │  nginx                      │ │  nginx                      │                      │
│    │  ┌───────────────────────┐  │ │  ┌───────────────────────┐  │                      │
│    │  │ Static Assets         │  │ │  │ Static Assets         │  │                      │
│    │  │ (JS, CSS, images)     │  │ │  │ (JS, CSS, images)     │  │                      │
│    │  └───────────────────────┘  │ │  └───────────────────────┘  │                      │
│    └──────────┬──────────────────┘ └──────────────┬──────────────┘                      │
│               │                                   │                                     │
└───────────────┼───────────────────────────────────┼─────────────────────────────────────┘
                │                                   │
                └───────────────┬───────────────────┘
                                │ HTTP (8080)
                                ▼
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                APPLICATION TIER                                         │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│    ┌─────────────────────────────┐         ┌─────────────────────────────┐              │
│    │       <<device>>            │         │       <<device>>            │              │
│    │    App Server 1 (EC2)       │         │    App Server 2 (EC2)       │              │
│    ├─────────────────────────────┤         ├─────────────────────────────┤              │
│    │  <<execution environment>>  │         │  <<execution environment>>  │              │
│    │  Node.js v18 Runtime        │         │  Node.js v18 Runtime        │              │
│    │  ┌───────────────────────┐  │         │  ┌───────────────────────┐  │              │
│    │  │ <<artifact>>          │  │         │  │ <<artifact>>          │  │              │
│    │  │ app-server.js         │  │         │  │ app-server.js         │  │              │
│    │  │ - REST API            │  │         │  │ - REST API            │  │              │
│    │  │ - Business Logic      │  │         │  │ - Business Logic      │  │              │
│    │  │ - Authentication      │  │         │  │ - Authentication      │  │              │
│    │  └───────────────────────┘  │         │  └───────────────────────┘  │              │
│    └──────────┬──────────────────┘         └──────────────┬──────────────┘              │
│               │                                           │                             │
│               └─────────────────┬─────────────────────────┘                             │
│                                 │                                                       │
└─────────────────────────────────┼───────────────────────────────────────────────────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │ PostgreSQL (5432) │ Redis (6379)      │
              ▼                   ▼                   │
┌─────────────────────────────────────────────────────┼───────────────────────────────────┐
│                              DATA TIER              │                                   │
├─────────────────────────────────────────────────────┼───────────────────────────────────┤
│                                                     │                                   │
│ ┌─────────────────────────────┐ ┌─────────────────────────────────┐  ┌─────────────────┐│
│ │       <<device>>            │ │       <<device>>                │  │   <<device>>    ││
│ │  DB Primary (RDS)           │ │  DB Replica (RDS)               │  │  Cache (Redis)  ││
│ ├─────────────────────────────┤ ├─────────────────────────────────┤  ├─────────────────┤│
│ │  <<artifact>>               │ │  <<artifact>>                   │  │ <<artifact>>    ││
│ │  PostgreSQL 15              │ │  PostgreSQL 15                  │  │ Redis 7.0       ││
│ │  ┌───────────────────────┐  │ │  ┌───────────────────────────┐  │  │ - Session store ││
│ │  │ ecommerce_db          │  │ │  │ ecommerce_db (read-only)  │  │  │ - Query cache   ││
│ │  │ - users table         │  │ │  │ - Async replication       │  │  │ - Rate limiting ││
│ │  │ - products table      │  │ │  │ - Failover ready          │  │  │                 ││
│ │  │ - orders table        │  │ │  └───────────────────────────┘  │  └─────────────────┘│
│ │  └───────────────────────┘  │ │                                 │                     │
│ └────────────┬────────────────┘ └────────────────┬────────────────┘                     │
│              │ Streaming Replication             │                                      │
│              └───────────────────────────────────┘                                      │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
\`\`\`

---

**Communication Protocols:**

| Path | Protocol | Port | Purpose |
|------|----------|------|---------|
| Client → Load Balancer | HTTPS | 443 | Secure client communication |
| Load Balancer → Web Servers | HTTP | 80 | Internal (SSL terminated) |
| Web Servers → App Servers | HTTP | 8080 | API requests |
| App Servers → Database | PostgreSQL | 5432 | Data persistence |
| App Servers → Cache | Redis | 6379 | Caching/sessions |
| DB Primary → DB Replica | Streaming | - | Async replication |

---

**Redundancy Features:**
- 2 web servers (horizontal scaling)
- 2 app servers (horizontal scaling)
- Database replica (read scaling + failover)
- Load balancer eliminates single point of failure`
  },
  {
    id: 'cs204-t3-ex9',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Design for Testability',
    description: 'The following code is difficult to unit test. Identify the testability issues and refactor the code to make it testable. Explain the design principles you applied.\n\n```javascript\nclass OrderProcessor {\n  processOrder(orderId) {\n    const db = new DatabaseConnection();\n    const order = db.query(`SELECT * FROM orders WHERE id = ${orderId}`);\n    \n    const paymentGateway = new StripePaymentGateway();\n    paymentGateway.charge(order.total, order.cardToken);\n    \n    const emailService = new SendGridEmailService();\n    emailService.send(order.customerEmail, "Order confirmed");\n    \n    console.log(`Order ${orderId} processed at ${new Date()}`);\n    return true;\n  }\n}\n```',
    difficulty: 4,
    hints: [
      'Identify hard-coded dependencies',
      'Consider dependency injection',
      'Think about interfaces and abstractions',
      'Consider how you would mock these dependencies in tests'
    ],
    solution: `**Testability Analysis**

---

**Issues Identified:**

1. **Hard-coded Dependencies**: Creates concrete instances inside method
   - \`new DatabaseConnection()\` - can't substitute test database
   - \`new StripePaymentGateway()\` - can't avoid real charges in tests
   - \`new SendGridEmailService()\` - can't avoid sending real emails
   - \`new Date()\` - non-deterministic, can't verify timestamps

2. **SQL Injection Vulnerability**: String interpolation in SQL

3. **No Interface Abstraction**: Tied to specific implementations

4. **Side Effects in Method**: Logging, database, email all mixed

5. **No Error Handling**: If any step fails, state is inconsistent

---

**Refactored Code:**

\`\`\`javascript
// Interfaces (TypeScript style - could be duck-typed in JS)
interface IOrderRepository {
  findById(orderId: string): Promise<Order>;
  save(order: Order): Promise<void>;
}

interface IPaymentGateway {
  charge(amount: number, token: string): Promise<PaymentResult>;
}

interface INotificationService {
  sendOrderConfirmation(email: string, order: Order): Promise<void>;
}

interface ILogger {
  info(message: string): void;
  error(message: string, error: Error): void;
}

interface IClock {
  now(): Date;
}

// Refactored class with dependency injection
class OrderProcessor {
  private orderRepository: IOrderRepository;
  private paymentGateway: IPaymentGateway;
  private notificationService: INotificationService;
  private logger: ILogger;
  private clock: IClock;

  // Dependencies injected through constructor
  constructor(
    orderRepository: IOrderRepository,
    paymentGateway: IPaymentGateway,
    notificationService: INotificationService,
    logger: ILogger,
    clock: IClock
  ) {
    this.orderRepository = orderRepository;
    this.paymentGateway = paymentGateway;
    this.notificationService = notificationService;
    this.logger = logger;
    this.clock = clock;
  }

  async processOrder(orderId: string): Promise<OrderResult> {
    // Fetch order (dependency is injected, can be mocked)
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      return { success: false, error: 'Order not found' };
    }

    // Process payment (can mock to avoid real charges)
    const paymentResult = await this.paymentGateway.charge(
      order.total,
      order.cardToken
    );

    if (!paymentResult.success) {
      return { success: false, error: 'Payment failed' };
    }

    // Update order status
    order.status = 'confirmed';
    order.processedAt = this.clock.now();  // Deterministic in tests
    await this.orderRepository.save(order);

    // Send notification (can mock to avoid real emails)
    await this.notificationService.sendOrderConfirmation(
      order.customerEmail,
      order
    );

    this.logger.info(\`Order \${orderId} processed at \${order.processedAt}\`);

    return { success: true, order };
  }
}

// Production implementations
class PostgresOrderRepository implements IOrderRepository {
  async findById(orderId: string): Promise<Order> {
    // Parameterized query - no SQL injection
    return db.query('SELECT * FROM orders WHERE id = $1', [orderId]);
  }
  // ...
}

class StripePaymentGateway implements IPaymentGateway {
  async charge(amount: number, token: string): Promise<PaymentResult> {
    // Real Stripe implementation
  }
}

// System clock for production
class SystemClock implements IClock {
  now(): Date {
    return new Date();
  }
}
\`\`\`

---

**Test Example:**

\`\`\`javascript
describe('OrderProcessor', () => {
  it('should process valid order successfully', async () => {
    // Arrange - Create mocks
    const mockOrder = {
      id: '123',
      total: 100,
      cardToken: 'tok_test',
      customerEmail: 'test@example.com'
    };

    const mockRepository = {
      findById: jest.fn().mockResolvedValue(mockOrder),
      save: jest.fn().mockResolvedValue(undefined)
    };

    const mockPayment = {
      charge: jest.fn().mockResolvedValue({ success: true })
    };

    const mockNotification = {
      sendOrderConfirmation: jest.fn().mockResolvedValue(undefined)
    };

    const mockLogger = { info: jest.fn(), error: jest.fn() };

    const mockClock = {
      now: () => new Date('2024-01-15T10:00:00Z')  // Fixed time!
    };

    const processor = new OrderProcessor(
      mockRepository,
      mockPayment,
      mockNotification,
      mockLogger,
      mockClock
    );

    // Act
    const result = await processor.processOrder('123');

    // Assert
    expect(result.success).toBe(true);
    expect(mockPayment.charge).toHaveBeenCalledWith(100, 'tok_test');
    expect(mockNotification.sendOrderConfirmation).toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'confirmed',
        processedAt: new Date('2024-01-15T10:00:00Z')
      })
    );
  });
});
\`\`\`

---

**Design Principles Applied:**

| Principle | Application |
|-----------|-------------|
| Dependency Inversion | High-level OrderProcessor depends on abstractions (interfaces), not concrete implementations |
| Dependency Injection | Dependencies passed in constructor, not created internally |
| Single Responsibility | Each interface has one job (payment, notification, data access) |
| Interface Segregation | Focused interfaces for each concern |
| Open/Closed | Can add new payment gateways without modifying OrderProcessor |`
  },
  {
    id: 'cs204-t3-ex10',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Package Diagram Design',
    description: 'Design a package diagram for an enterprise HR management system. Include packages for: Presentation Layer, Business Logic Layer, Data Access Layer, and Common/Shared utilities. Show dependencies between packages and apply the principles of layered architecture.',
    difficulty: 3,
    hints: [
      'Dependencies should flow in one direction (top to bottom)',
      'Lower layers should not depend on upper layers',
      'Common/Shared can be accessed by all layers',
      'Consider sub-packages within each layer'
    ],
    solution: `**Package Diagram: HR Management System**

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              <<package>>                                                │
│                           hr_management_system                                          │
├─────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                         │
│  ┌───────────────────────────────────────────────────────────────────────────────────┐  │
│  │                        <<package>> presentation                                   │  │
│  ├───────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                                   │  │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌─────────────────────┐ │  │
│  │  │  <<package>>  │  │  <<package>>  │  │  <<package>>  │  │    <<package>>      │ │  │
│  │  │    web_ui     │  │  mobile_app   │  │   api_rest    │  │  view_models        │ │  │
│  │  ├───────────────┤  ├───────────────┤  ├───────────────┤  ├─────────────────────┤ │  │
│  │  │ - Controllers │  │ - ViewModels  │  │ - Controllers │  │ - EmployeeVM        │ │  │
│  │  │ - Views       │  │ - Screens     │  │ - DTOs        │  │ - PayrollVM         │ │  │
│  │  │ - Assets      │  │ - Components  │  │ - Middleware  │  │ - LeaveRequestVM    │ │  │
│  │  └───────────────┘  └───────────────┘  └───────────────┘  └─────────────────────┘ │  │
│  │                                                                                   │  │
│  └─────────────────────────────────────────┬─────────────────────────────────────────┘  │
│                                            │                                            │
│                                            │ <<use>>                                    │
│                                            ▼                                            │
│  ┌───────────────────────────────────────────────────────────────────────────────────┐  │
│  │                        <<package>> business_logic                                 │  │
│  ├───────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                                   │  │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌─────────────────────┐ │  │
│  │  │  <<package>>  │  │  <<package>>  │  │  <<package>>  │  │    <<package>>      │ │  │
│  │  │   employee    │  │    payroll    │  │   leave_mgmt  │  │   recruitment       │ │  │
│  │  ├───────────────┤  ├───────────────┤  ├───────────────┤  ├─────────────────────┤ │  │
│  │  │-EmployeeService│ │-PayrollService│  │-LeaveService  │  │ - JobPostingService │ │  │
│  │  │-ProfileService │ │-TaxCalculator │  │-ApprovalFlow  │  │ - ApplicantService  │ │  │
│  │  │-OnboardingFlow │ │-BenefitService│  │-AccrualEngine │  │ - InterviewService  │ │  │
│  │  └───────────────┘  └───────────────┘  └───────────────┘  └─────────────────────┘ │  │
│  │                                                                                   │  │
│  │  ┌───────────────┐  ┌─────────────────────────────────────────────────────────┐   │  │
│  │  │  <<package>>  │  │                    <<package>>                          │   │  │
│  │  │   reporting   │  │                   domain_model                          │   │  │
│  │  ├───────────────┤  ├─────────────────────────────────────────────────────────┤   │  │
│  │  │-ReportGenerator│ │ - Employee, Department, Position (entities)             │   │  │
│  │  │-DashboardService│ │ - LeaveRequest, PayStub, JobPosting (entities)         │   │  │
│  │  │-ExportService  │ │ - IEmployeeRepository, IPayrollRepository (interfaces) │   │  │
│  │  └───────────────┘  └─────────────────────────────────────────────────────────┘   │  │
│  │                                                                                   │  │
│  └─────────────────────────────────────────┬─────────────────────────────────────────┘  │
│                                            │                                            │
│                                            │ <<use>>                                    │
│                                            ▼                                            │
│  ┌───────────────────────────────────────────────────────────────────────────────────┐  │
│  │                        <<package>> data_access                                    │  │
│  ├───────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                                   │  │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌─────────────────────┐ │  │
│  │  │  <<package>>  │  │  <<package>>  │  │  <<package>>  │  │    <<package>>      │ │  │
│  │  │ repositories  │  │    orm        │  │   external    │  │    migrations       │ │  │
│  │  ├───────────────┤  ├───────────────┤  ├───────────────┤  ├─────────────────────┤ │  │
│  │  │-EmployeeRepo  │  │-DbContext     │  │-TaxAPIClient  │  │ - V001_Initial      │ │  │
│  │  │-PayrollRepo   │  │-EntityMappings│  │-PayrollAdapter│  │ - V002_AddLeave     │ │  │
│  │  │-LeaveRepo     │  │-QueryBuilder  │  │-BenefitProvider│ │ - V003_Recruitment  │ │  │
│  │  └───────────────┘  └───────────────┘  └───────────────┘  └─────────────────────┘ │  │
│  │                                                                                   │  │
│  └───────────────────────────────────────────────────────────────────────────────────┘  │
│                                            ▲                                            │
│                                            │ <<use>>                                    │
│  ┌─────────────────────────────────────────┴─────────────────────────────────────────┐  │
│  │                          <<package>> common                                       │  │
│  ├───────────────────────────────────────────────────────────────────────────────────┤  │
│  │                                                                                   │  │
│  │  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐  ┌─────────────────────┐ │  │
│  │  │  <<package>>  │  │  <<package>>  │  │  <<package>>  │  │    <<package>>      │ │  │
│  │  │   utilities   │  │   security    │  │   logging     │  │   configuration     │ │  │
│  │  ├───────────────┤  ├───────────────┤  ├───────────────┤  ├─────────────────────┤ │  │
│  │  │-DateHelpers   │  │-AuthService   │  │-Logger        │  │ - AppSettings       │ │  │
│  │  │-Validators    │  │-Encryption    │  │-AuditTrail    │  │ - FeatureFlags      │ │  │
│  │  │-Formatters    │  │-RoleManager   │  │-Metrics       │  │ - ConnectionStrings │ │  │
│  │  └───────────────┘  └───────────────┘  └───────────────┘  └─────────────────────┘ │  │
│  │                                                                                   │  │
│  └───────────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘
\`\`\`

---

**Dependency Rules:**

| Layer | Can Depend On | Cannot Depend On |
|-------|--------------|------------------|
| Presentation | Business Logic, Common | Data Access (directly) |
| Business Logic | Data Access (via interfaces), Common | Presentation |
| Data Access | Common | Presentation, Business Logic |
| Common | (None - base layer) | All other layers |

---

**Key Design Decisions:**

1. **Dependency Inversion**: Business Logic defines repository interfaces (in domain_model), Data Access implements them

2. **Common Package**: Cross-cutting concerns (logging, security, config) accessible by all layers

3. **Domain Model**: Shared entities and interfaces in business layer, referenced by presentation (DTOs) and data access (mappings)

4. **Sub-packages**: Each layer subdivided by functional area (employee, payroll, leave) for maintainability

5. **External Package**: Adapters for third-party services (tax API, benefits providers) isolated in data layer`
  },
  {
    id: 'cs204-t3-ex11',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Interface Segregation Principle',
    description: 'The following interface violates the Interface Segregation Principle. Identify the problems and refactor into focused interfaces.\n\n```java\ninterface Worker {\n  void work();\n  void eat();\n  void sleep();\n  void attendMeeting();\n  void submitTimesheet();\n  void takeVacation();\n  void getPaid();\n  void performMaintenance();\n}\n```\n\nConsider different types of workers: Human Employees, Contractors, and Robots.',
    difficulty: 3,
    hints: [
      'ISP: Clients should not be forced to depend on methods they don\'t use',
      'Consider what each worker type actually needs',
      'Group related methods together',
      'A robot doesn\'t eat or take vacation'
    ],
    solution: `**Interface Segregation Principle Analysis**

---

**Problems with Current Design:**

1. **Fat Interface**: 8 methods covering unrelated concerns
2. **Forced Implementation**: Robot must implement eat(), sleep(), takeVacation()
3. **Violation of ISP**: Classes forced to depend on methods they don't use
4. **Tight Coupling**: Changes to vacation logic affect Robot class

**Worker Type Analysis:**

| Method | Human Employee | Contractor | Robot |
|--------|---------------|------------|-------|
| work() | ✓ | ✓ | ✓ |
| eat() | ✓ | ✓ | ✗ |
| sleep() | ✓ | ✓ | ✗ |
| attendMeeting() | ✓ | ✓ | ✗ |
| submitTimesheet() | ✓ | ✓ | ✗ |
| takeVacation() | ✓ | ✗ | ✗ |
| getPaid() | ✓ | ✓ | ✗ |
| performMaintenance() | ✗ | ✗ | ✓ |

---

**Refactored Interfaces:**

\`\`\`java
// Core interface - all workers can work
interface Workable {
    void work();
}

// Human biological needs
interface HumanNeeds {
    void eat();
    void sleep();
}

// Office/collaboration activities
interface Collaborator {
    void attendMeeting();
}

// Administrative tasks for paid workers
interface Payable {
    void submitTimesheet();
    void getPaid();
}

// Benefits for full employees only
interface BenefitsEligible {
    void takeVacation();
    int getVacationDaysRemaining();
}

// Machine-specific operations
interface Maintainable {
    void performMaintenance();
    void runDiagnostics();
    MaintenanceReport getMaintenanceStatus();
}

// Composed interfaces for convenience (optional)
interface HumanWorker extends Workable, HumanNeeds, Collaborator, Payable {
    // Combines common human worker interfaces
}

// Concrete implementations
class Employee implements Workable, HumanNeeds, Collaborator, Payable, BenefitsEligible {

    @Override
    public void work() {
        System.out.println("Working on assigned tasks");
    }

    @Override
    public void eat() {
        System.out.println("Taking lunch break");
    }

    @Override
    public void sleep() {
        System.out.println("Resting at home");
    }

    @Override
    public void attendMeeting() {
        System.out.println("Attending team meeting");
    }

    @Override
    public void submitTimesheet() {
        System.out.println("Submitting weekly timesheet");
    }

    @Override
    public void getPaid() {
        System.out.println("Receiving salary deposit");
    }

    @Override
    public void takeVacation() {
        System.out.println("On vacation");
    }

    @Override
    public int getVacationDaysRemaining() {
        return 15;
    }
}

class Contractor implements Workable, HumanNeeds, Collaborator, Payable {
    // Note: Does NOT implement BenefitsEligible

    @Override
    public void work() {
        System.out.println("Working on contract deliverables");
    }

    @Override
    public void eat() {
        System.out.println("Taking break");
    }

    @Override
    public void sleep() {
        System.out.println("Resting");
    }

    @Override
    public void attendMeeting() {
        System.out.println("Joining project meeting");
    }

    @Override
    public void submitTimesheet() {
        System.out.println("Submitting hours for invoice");
    }

    @Override
    public void getPaid() {
        System.out.println("Receiving contractor payment");
    }
}

class Robot implements Workable, Maintainable {
    // Only implements relevant interfaces
    // No eat(), sleep(), takeVacation(), etc.

    @Override
    public void work() {
        System.out.println("Executing programmed tasks");
    }

    @Override
    public void performMaintenance() {
        System.out.println("Running maintenance cycle");
    }

    @Override
    public void runDiagnostics() {
        System.out.println("Running self-diagnostics");
    }

    @Override
    public MaintenanceReport getMaintenanceStatus() {
        return new MaintenanceReport(/* ... */);
    }
}
\`\`\`

---

**Client Code Example:**

\`\`\`java
class WorkScheduler {
    // Only depends on Workable - doesn't care about eating or maintenance
    public void scheduleWork(Workable worker) {
        worker.work();
    }
}

class PayrollSystem {
    // Only depends on Payable - doesn't care if human or robot
    public void processPayment(Payable worker) {
        worker.submitTimesheet();
        worker.getPaid();
    }
}

class MaintenanceScheduler {
    // Only depends on Maintainable - specific to machines
    public void scheduleMaintenance(Maintainable machine) {
        if (machine.getMaintenanceStatus().isDue()) {
            machine.performMaintenance();
        }
    }
}
\`\`\`

---

**Benefits of Refactored Design:**

| Aspect | Before | After |
|--------|--------|-------|
| Robot implementation | Must implement 8 methods, 6 as no-ops | Only 4 relevant methods |
| Adding new worker type | Must implement all 8 methods | Compose only needed interfaces |
| Changing vacation logic | Affects all Worker implementers | Only affects BenefitsEligible |
| Testing | Must mock all 8 methods | Only mock used interface |
| Code clarity | Unclear what each worker supports | Interface clearly shows capabilities |`
  },
  {
    id: 'cs204-t3-ex12',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Communication Diagram',
    description: 'Create a communication diagram (collaboration diagram) for the "Add Item to Cart" use case in an e-commerce system. Include objects: Customer, ShoppingCartController, CartService, ProductRepository, Cart, and CartItem. Show numbered messages indicating the sequence of interactions.',
    difficulty: 4,
    hints: [
      'Communication diagrams show the same info as sequence diagrams but focus on object relationships',
      'Number messages to show sequence (1, 2, 3, or 1.1, 1.2 for nested calls)',
      'Show objects as rectangles with names underlined',
      'Lines represent links, arrows show message direction'
    ],
    solution: `**Communication Diagram: Add Item to Cart**

\`\`\`
                                    1: addToCart(productId, qty)
     ┌───────────────┐     ──────────────────────────────────────>    ┌───────────────────────┐
     │   :Customer   │                                                │ShoppingCartController │
     │               │     <──────────────────────────────────────    │                       │
     └───────────────┘           10: CartResponse                     └───────────┬───────────┘
                                                                                  │
                                                                                  │ 2: addItem(userId, productId, qty)
                                                                                  │
                                                                                  ▼
                                                                      ┌───────────────────────┐
                                                                      │     :CartService      │
                                                                      └───┬───────────────┬───┘
                                                                          │               │
                                              3: findById(productId)      │               │     6: getOrCreate(userId)
                                         ┌────────────────────────────────┘               └─────────────────────┐
                                         │                                                                      │
                                         ▼                                                                      ▼
                              ┌───────────────────────┐                                          ┌───────────────────────┐
                              │  :ProductRepository   │                                          │    :CartRepository    │
                              └───────────┬───────────┘                                          └───────────┬───────────┘
                                          │                                                                  │
                                          │ 4: Product                                                       │ 7: Cart
                                          │                                                                  │
                                          ▼                                                                  ▼
                              ┌───────────────────────┐                                          ┌───────────────────────┐
                              │      :Product         │                                          │        :Cart          │
                              │  ─────────────────    │                                          │  ─────────────────    │
                              │  id: "PROD-001"       │                                          │  userId: "USR-123"    │
                              │  name: "Widget"       │                                          │  items: []            │
                              │  price: 29.99         │                                          │                       │
                              │  stock: 100           │                                          └───────────┬───────────┘
                              └───────────────────────┘                                                      │
                                          │                                                                  │
                                          │                          8: addItem(product, qty)                │
                                          └──────────────────────────────────────────────────────────────────┘
                                                                                  │
                                                                                  │ 8.1: <<create>>
                                                                                  ▼
                                                                      ┌───────────────────────┐
                                                                      │      :CartItem        │
                                                                      │  ─────────────────    │
                                                                      │  product: :Product    │
                                                                      │  quantity: 2          │
                                                                      │  subtotal: 59.98      │
                                                                      └───────────────────────┘
                                                                                  │
                                                                                  │ 9: save(cart)
                                                                      ┌───────────────────────┐
                                                                      │    :CartRepository    │
                                                                      │                       │
                                                                      └───────────────────────┘
\`\`\`

---

**Message Sequence Table:**

| # | From | To | Message | Description |
|---|------|-----|---------|-------------|
| 1 | Customer | CartController | addToCart(productId, qty) | User clicks add to cart |
| 2 | CartController | CartService | addItem(userId, productId, qty) | Controller delegates to service |
| 3 | CartService | ProductRepository | findById(productId) | Fetch product details |
| 4 | ProductRepository | CartService | return Product | Product data returned |
| 5 | CartService | (internal) | validateStock(product, qty) | Check inventory |
| 6 | CartService | CartRepository | getOrCreate(userId) | Get user's cart |
| 7 | CartRepository | CartService | return Cart | Cart object returned |
| 8 | CartService | Cart | addItem(product, qty) | Add item to cart |
| 8.1 | Cart | CartItem | <<create>> | Create new cart item |
| 9 | CartService | CartRepository | save(cart) | Persist updated cart |
| 10 | CartController | Customer | CartResponse | Return success response |

---

**Object Responsibilities:**

| Object | Role |
|--------|------|
| Customer | Initiates action through UI |
| ShoppingCartController | HTTP request handling, validation |
| CartService | Business logic orchestration |
| ProductRepository | Product data access |
| CartRepository | Cart persistence |
| Cart | Aggregate root, manages items |
| CartItem | Value object, item details |
| Product | Entity, product information |`
  },
  {
    id: 'cs204-t3-ex13',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Architectural Style Comparison',
    description: 'Compare and contrast three architectural styles for a new social media platform: Monolithic Architecture, Microservices Architecture, and Event-Driven Architecture. For each, discuss pros, cons, and when it would be appropriate. Make a recommendation with justification.',
    difficulty: 4,
    hints: [
      'Consider factors like team size, scalability needs, and development velocity',
      'Think about operational complexity',
      'Consider the nature of social media (high traffic, real-time updates)',
      'Think about data consistency requirements'
    ],
    solution: `**Architectural Style Comparison: Social Media Platform**

---

**1. MONOLITHIC ARCHITECTURE**

\`\`\`
┌─────────────────────────────────────────────────────┐
│              Social Media Monolith                  │
├─────────────────────────────────────────────────────┤
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────────┐ │
│  │  User   │ │  Posts  │ │Messages │ │Notifications│ │
│  │ Module  │ │ Module  │ │ Module  │ │   Module   │ │
│  └─────────┘ └─────────┘ └─────────┘ └───────────┘ │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐               │
│  │  Feed   │ │ Search  │ │ Ads     │               │
│  │ Module  │ │ Module  │ │ Module  │               │
│  └─────────┘ └─────────┘ └─────────┘               │
├─────────────────────────────────────────────────────┤
│              Shared Database (PostgreSQL)           │
└─────────────────────────────────────────────────────┘
\`\`\`

**Pros:**
- Simple deployment and debugging
- Easy to maintain data consistency
- Lower operational overhead
- Faster initial development
- Single codebase, easier onboarding

**Cons:**
- Cannot scale modules independently
- Single point of failure
- Technology lock-in (one language/framework)
- Deployments require full app restart
- Becomes unwieldy as codebase grows

**Best For:** Early-stage startup, small team (<10 developers), MVP phase

---

**2. MICROSERVICES ARCHITECTURE**

\`\`\`
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│User Service │   │Post Service │   │Feed Service │
│   (Node.js) │   │   (Go)      │   │  (Python)   │
└──────┬──────┘   └──────┬──────┘   └──────┬──────┘
       │                 │                 │
       ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│  Users DB   │   │  Posts DB   │   │  Redis      │
│ (PostgreSQL)│   │ (MongoDB)   │   │  (Cache)    │
└─────────────┘   └─────────────┘   └─────────────┘

┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ Message Svc │   │Notification │   │ Search Svc  │
│  (Elixir)   │   │   Service   │   │(Elasticsearch)
└─────────────┘   └─────────────┘   └─────────────┘
       │                 │                 │
       ▼                 ▼                 ▼
     (Kafka)          (Kafka)        (Kafka/ES)
\`\`\`

**Pros:**
- Independent scaling (scale feed service for viral content)
- Team autonomy (each team owns a service)
- Technology flexibility (best tool for each job)
- Fault isolation (message service down doesn't kill feed)
- Independent deployments

**Cons:**
- Distributed system complexity
- Network latency between services
- Data consistency challenges
- Requires sophisticated DevOps
- Higher infrastructure costs
- Debugging across services is hard

**Best For:** Large organization (100+ developers), high traffic, need for independent scaling

---

**3. EVENT-DRIVEN ARCHITECTURE**

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     Event Backbone (Kafka)                  │
├─────────────────────────────────────────────────────────────┤
│  Topics: user.created, post.created, post.liked,            │
│          user.followed, message.sent, notification.trigger  │
└─────────────────────────────────────────────────────────────┘
       ▲         ▲         ▲         ▲         ▲         ▲
       │         │         │         │         │         │
 ┌─────┴───┐ ┌───┴────┐ ┌──┴─────┐ ┌─┴──────┐ ┌┴────────┐│
 │  User   │ │  Post  │ │  Feed  │ │Notif.  │ │Analytics││
 │ Service │ │ Service│ │ Builder│ │Service │ │ Service ││
 └─────────┘ └────────┘ └────────┘ └────────┘ └─────────┘│
                                                          │
                            ┌─────────────────────────────┘
                            │ Subscribe: post.created, user.followed
                            ▼
                     ┌─────────────────┐
                     │Recommendation   │
                     │    Engine       │
                     └─────────────────┘
\`\`\`

**Pros:**
- Natural fit for social media (events: like, comment, share)
- Loose coupling between services
- Easy to add new consumers (analytics, ML)
- Handles traffic spikes via buffering
- Async processing improves perceived performance
- Excellent audit trail (event log)

**Cons:**
- Eventually consistent (not immediately consistent)
- Complex event schema management
- Debugging event flows is challenging
- Requires understanding of async patterns
- Message ordering can be tricky

**Best For:** Real-time features, high-volume async processing, data pipelines, scalability

---

**COMPARISON MATRIX:**

| Factor | Monolithic | Microservices | Event-Driven |
|--------|------------|---------------|--------------|
| Initial Complexity | Low | High | Medium-High |
| Scalability | Limited | Excellent | Excellent |
| Data Consistency | Strong | Eventual | Eventual |
| Development Speed (early) | Fast | Slow | Medium |
| Development Speed (at scale) | Slow | Fast | Fast |
| Operational Overhead | Low | Very High | High |
| Team Independence | Low | High | High |
| Fault Isolation | Poor | Good | Good |
| Real-time Capability | Limited | Good | Excellent |

---

**RECOMMENDATION: Hybrid Approach**

For a new social media platform, I recommend:

**Phase 1 (MVP):** Start with a well-structured **Modular Monolith**
- Faster time to market
- Validate product-market fit
- Define clear module boundaries internally

**Phase 2 (Growth):** Evolve to **Event-Driven Microservices**
- Extract high-load components (Feed, Notifications) first
- Introduce event backbone (Kafka) for real-time features
- Keep less critical services in monolith longer

**Justification:**
1. Social media is inherently event-driven (posts, likes, comments are events)
2. Real-time feed updates require async processing
3. Viral content requires independent scaling
4. Starting simple avoids premature optimization
5. Event backbone enables analytics, ML, and future features`
  },
  {
    id: 'cs204-t3-ex14',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Object Constraint Language (OCL)',
    description: 'Write OCL constraints for the following class diagram scenario:\n\nA Company has multiple Employees. Each Employee has a salary and a manager (who is also an Employee). The CEO has no manager. Departments have a budget. Write constraints for:\n1. Employee salary must be positive\n2. Manager must have higher salary than subordinates\n3. CEO is the only employee without a manager\n4. Department budget must cover total employee salaries\n5. An employee cannot be their own manager',
    difficulty: 5,
    hints: [
      'OCL uses context to specify which class the constraint applies to',
      'Use self to refer to the current instance',
      'Use forAll, select, exists for collection operations',
      'Use implies for conditional constraints'
    ],
    solution: `**OCL Constraints for Company Structure**

---

**Class Diagram Context:**

\`\`\`
┌─────────────────┐       ┌─────────────────────┐
│    Company      │       │     Department      │
├─────────────────┤       ├─────────────────────┤
│ name: String    │1    * │ name: String        │
│ ceo: Employee   │───────│ budget: Money       │
└─────────────────┘       └──────────┬──────────┘
                                     │ 1
                                     │
                                     │ *
                          ┌──────────┴──────────┐
                          │      Employee       │
                          ├─────────────────────┤
                          │ name: String        │
                          │ salary: Money       │
                          │ title: String       │
                          ├─────────────────────┤
                          │ manager: Employee   │◇─┐
                          │ subordinates: Set   │  │ 0..1
                          └─────────────────────┘──┘
                                     *
\`\`\`

---

**OCL Constraints:**

**1. Employee salary must be positive**

\`\`\`ocl
context Employee
inv PositiveSalary:
    self.salary > 0
\`\`\`

**Explanation:** The invariant ensures that every Employee instance has a salary greater than zero.

---

**2. Manager must have higher salary than all subordinates**

\`\`\`ocl
context Employee
inv ManagerEarnsMore:
    self.subordinates->notEmpty() implies
        self.subordinates->forAll(sub | self.salary > sub.salary)
\`\`\`

**Alternative with select:**
\`\`\`ocl
context Employee
inv ManagerEarnsMore2:
    self.subordinates->select(sub | sub.salary >= self.salary)->isEmpty()
\`\`\`

**Explanation:** If an employee has subordinates (is a manager), then all subordinates must have a lower salary than the manager.

---

**3. CEO is the only employee without a manager**

\`\`\`ocl
context Company
inv SingleCEO:
    self.employees->select(e | e.manager.oclIsUndefined())->size() = 1
    and
    self.employees->select(e | e.manager.oclIsUndefined())->includes(self.ceo)
\`\`\`

**Alternative constraint on Employee:**
\`\`\`ocl
context Employee
inv OnlyCEOHasNoManager:
    self.manager.oclIsUndefined() implies self = self.company.ceo
\`\`\`

**Explanation:** Exactly one employee (the CEO) has no manager. All other employees must have a manager.

---

**4. Department budget must cover total employee salaries**

\`\`\`ocl
context Department
inv BudgetCoversPayroll:
    self.budget >= self.employees->collect(e | e.salary)->sum()
\`\`\`

**With explicit type:**
\`\`\`ocl
context Department
inv BudgetCoversPayroll2:
    let totalSalaries: Money = self.employees.salary->sum()
    in self.budget >= totalSalaries
\`\`\`

**Explanation:** The department's budget must be at least equal to the sum of all employee salaries in that department.

---

**5. An employee cannot be their own manager**

\`\`\`ocl
context Employee
inv NotOwnManager:
    self.manager <> self
\`\`\`

**Extended: No circular management chains**
\`\`\`ocl
context Employee
inv NoCircularManagement:
    not self.allManagers()->includes(self)

context Employee
def: allManagers(): Set(Employee) =
    if self.manager.oclIsUndefined() then
        Set{}
    else
        self.manager.allManagers()->including(self.manager)
    endif
\`\`\`

**Explanation:** An employee cannot be their own manager, and extended version prevents circular chains (A manages B, B manages A).

---

**Additional Useful Constraints:**

**6. Every employee except CEO must have exactly one manager**
\`\`\`ocl
context Employee
inv ExactlyOneManager:
    self <> self.company.ceo implies
        self.manager->size() = 1
\`\`\`

**7. Manager must be in the same company**
\`\`\`ocl
context Employee
inv ManagerSameCompany:
    self.manager.oclIsUndefined() or
        self.manager.company = self.company
\`\`\`

**8. Derivation rule for subordinates**
\`\`\`ocl
context Employee
derive subordinates:
    Employee.allInstances()->select(e | e.manager = self)
\`\`\`

---

**Pre/Post Conditions for Operations:**

\`\`\`ocl
context Employee::promote(newSalary: Money, newTitle: String)
pre ValidRaise:
    newSalary > self.salary
pre HasManager:
    not self.manager.oclIsUndefined()
post SalaryUpdated:
    self.salary = newSalary
post TitleUpdated:
    self.title = newTitle
post StillBelowManager:
    self.salary < self.manager.salary
\`\`\`

---

**Summary Table:**

| Constraint | Type | Enforces |
|------------|------|----------|
| PositiveSalary | Invariant | Data validity |
| ManagerEarnsMore | Invariant | Business rule |
| SingleCEO | Invariant | Cardinality |
| BudgetCoversPayroll | Invariant | Business rule |
| NotOwnManager | Invariant | Data integrity |`
  },
  {
    id: 'cs204-t3-ex15',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'Design Pattern Selection',
    description: 'You are designing a document editor application. For each of the following requirements, identify an appropriate design pattern and explain how you would apply it:\n\n1. Users need to undo/redo their changes\n2. Documents can be saved in multiple formats (PDF, DOCX, HTML)\n3. Different views of the same document (outline, WYSIWYG, source) must stay synchronized\n4. Complex documents have nested structures (sections, paragraphs, images, tables)\n5. Document styling should be applied without modifying document content classes',
    difficulty: 4,
    hints: [
      'Consider behavioral, creational, and structural patterns',
      'Think about the problems each pattern solves',
      'Consider how the patterns might interact',
      'Draw brief class diagrams if helpful'
    ],
    solution: `**Design Pattern Selection for Document Editor**

---

**1. Undo/Redo Functionality → COMMAND PATTERN**

**Problem:** Need to track operations, reverse them, and replay them.

**Solution:**

\`\`\`
┌─────────────────┐     ┌──────────────────────┐
│    Invoker      │     │  <<interface>>       │
│   (Editor)      │────>│     Command          │
├─────────────────┤     ├──────────────────────┤
│ - history: Stack│     │ + execute()          │
│ - redoStack     │     │ + undo()             │
├─────────────────┤     └──────────────────────┘
│ + executeCmd()  │              △
│ + undo()        │              │
│ + redo()        │     ┌────────┼────────┐
└─────────────────┘     │        │        │
                        │        │        │
              ┌─────────┴───┐ ┌──┴────────┴───┐
              │InsertTextCmd│ │DeleteTextCmd  │
              ├─────────────┤ ├──────────────┤
              │- document   │ │- document    │
              │- position   │ │- position    │
              │- text       │ │- deletedText │
              ├─────────────┤ ├──────────────┤
              │+ execute()  │ │+ execute()   │
              │+ undo()     │ │+ undo()      │
              └─────────────┘ └──────────────┘
\`\`\`

**Implementation:**
\`\`\`typescript
interface Command {
  execute(): void;
  undo(): void;
}

class InsertTextCommand implements Command {
  constructor(private doc: Document, private pos: number, private text: string) {}

  execute() { this.doc.insertAt(this.pos, this.text); }
  undo() { this.doc.deleteAt(this.pos, this.text.length); }
}

class Editor {
  private history: Command[] = [];
  private redoStack: Command[] = [];

  executeCommand(cmd: Command) {
    cmd.execute();
    this.history.push(cmd);
    this.redoStack = [];  // Clear redo on new action
  }

  undo() {
    const cmd = this.history.pop();
    if (cmd) { cmd.undo(); this.redoStack.push(cmd); }
  }

  redo() {
    const cmd = this.redoStack.pop();
    if (cmd) { cmd.execute(); this.history.push(cmd); }
  }
}
\`\`\`

---

**2. Multiple Export Formats → STRATEGY PATTERN (or VISITOR)**

**Problem:** Same document exported to different formats without changing Document class.

**Solution:**

\`\`\`
┌─────────────────┐     ┌──────────────────────┐
│    Document     │     │  <<interface>>       │
├─────────────────┤     │   ExportStrategy     │
│ - content       │────>├──────────────────────┤
├─────────────────┤     │ + export(doc): bytes │
│ + export(strat) │     └──────────────────────┘
└─────────────────┘              △
                                 │
               ┌─────────────────┼─────────────────┐
               │                 │                 │
     ┌─────────┴────┐  ┌────────┴─────┐  ┌───────┴──────┐
     │  PDFExporter │  │ DocxExporter │  │ HTMLExporter │
     ├──────────────┤  ├──────────────┤  ├──────────────┤
     │+ export(doc) │  │+ export(doc) │  │+ export(doc) │
     └──────────────┘  └──────────────┘  └──────────────┘
\`\`\`

**Implementation:**
\`\`\`typescript
interface ExportStrategy {
  export(document: Document): Uint8Array;
}

class PDFExporter implements ExportStrategy {
  export(doc: Document): Uint8Array {
    // Convert document to PDF format
  }
}

class Document {
  export(strategy: ExportStrategy): Uint8Array {
    return strategy.export(this);
  }
}

// Usage
const doc = new Document();
doc.export(new PDFExporter());
doc.export(new HTMLExporter());
\`\`\`

---

**3. Synchronized Views → OBSERVER PATTERN**

**Problem:** Multiple views must update when document changes.

**Solution:**

\`\`\`
                    ┌──────────────────────┐
                    │  <<interface>>       │
                    │     Observer         │
                    ├──────────────────────┤
                    │ + update(doc): void  │
                    └──────────────────────┘
                             △
                             │
           ┌─────────────────┼─────────────────┐
           │                 │                 │
┌──────────┴───┐   ┌────────┴─────┐   ┌───────┴──────┐
│ OutlineView  │   │  WYSIWYGView │   │  SourceView  │
├──────────────┤   ├──────────────┤   ├──────────────┤
│+ update(doc) │   │+ update(doc) │   │+ update(doc) │
└──────────────┘   └──────────────┘   └──────────────┘
        ▲                  ▲                  ▲
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │ notifies
                    ┌──────┴──────┐
                    │   Document  │
                    │  (Subject)  │
                    ├─────────────┤
                    │- observers[]│
                    ├─────────────┤
                    │+ attach()   │
                    │+ detach()   │
                    │+ notify()   │
                    └─────────────┘
\`\`\`

**Implementation:**
\`\`\`typescript
interface Observer {
  update(document: Document): void;
}

class Document {
  private observers: Observer[] = [];

  attach(obs: Observer) { this.observers.push(obs); }

  modify(change: Change) {
    // Apply change
    this.notify();
  }

  private notify() {
    this.observers.forEach(obs => obs.update(this));
  }
}

class WYSIWYGView implements Observer {
  update(doc: Document) { this.render(doc); }
}
\`\`\`

---

**4. Nested Document Structure → COMPOSITE PATTERN**

**Problem:** Uniform treatment of simple elements and containers.

**Solution:**

\`\`\`
                    ┌──────────────────────┐
                    │  <<interface>>       │
                    │   DocumentElement    │
                    ├──────────────────────┤
                    │ + render(): void     │
                    │ + getContent(): str  │
                    │ + accept(visitor)    │
                    └──────────────────────┘
                             △
                             │
          ┌──────────────────┼───────────────────┐
          │                  │                   │
┌─────────┴────┐   ┌────────┴──────┐   ┌────────┴─────┐
│   Paragraph  │   │    Image      │   │   Section    │
│   (Leaf)     │   │   (Leaf)      │   │ (Composite)  │
├──────────────┤   ├───────────────┤   ├──────────────┤
│ - text       │   │ - src         │   │ - children[] │
├──────────────┤   ├───────────────┤   ├──────────────┤
│ + render()   │   │ + render()    │   │ + add(elem)  │
│ + getContent()│  │ + getContent()│   │ + remove()   │
└──────────────┘   └───────────────┘   │ + render()   │
                                       │ + getContent()│
                                       └──────────────┘
\`\`\`

**Implementation:**
\`\`\`typescript
interface DocumentElement {
  render(): string;
  getContent(): string;
}

class Paragraph implements DocumentElement {
  constructor(private text: string) {}
  render() { return \`<p>\${this.text}</p>\`; }
  getContent() { return this.text; }
}

class Section implements DocumentElement {
  private children: DocumentElement[] = [];

  add(elem: DocumentElement) { this.children.push(elem); }

  render(): string {
    return \`<section>\${this.children.map(c => c.render()).join('')}</section>\`;
  }

  getContent(): string {
    return this.children.map(c => c.getContent()).join('\\n');
  }
}
\`\`\`

---

**5. Styling Without Modifying Content → DECORATOR PATTERN**

**Problem:** Add styling behavior dynamically without subclassing.

**Solution:**

\`\`\`
┌──────────────────────┐
│   DocumentElement    │
└──────────────────────┘
           △
           │
     ┌─────┴──────┐
     │            │
┌────┴─────┐ ┌────┴────────────────┐
│Paragraph │ │  StyleDecorator     │
└──────────┘ │  (abstract)         │
             ├─────────────────────┤
             │ - wrapped: Element  │
             ├─────────────────────┤
             │ + render()          │
             └─────────────────────┘
                      △
                      │
        ┌─────────────┼─────────────┐
        │             │             │
┌───────┴────┐ ┌──────┴──────┐ ┌────┴──────┐
│BoldDecorator│ │ItalicDecorator│ │ColorDecorator│
└────────────┘ └─────────────┘ └───────────┘
\`\`\`

**Implementation:**
\`\`\`typescript
abstract class StyleDecorator implements DocumentElement {
  constructor(protected wrapped: DocumentElement) {}

  getContent(): string { return this.wrapped.getContent(); }
  abstract render(): string;
}

class BoldDecorator extends StyleDecorator {
  render(): string { return \`<b>\${this.wrapped.render()}</b>\`; }
}

class ColorDecorator extends StyleDecorator {
  constructor(wrapped: DocumentElement, private color: string) {
    super(wrapped);
  }
  render(): string {
    return \`<span style="color:\${this.color}">\${this.wrapped.render()}</span>\`;
  }
}

// Usage - can stack decorators
const para = new Paragraph("Hello");
const styled = new ColorDecorator(new BoldDecorator(para), "red");
styled.render(); // <span style="color:red"><b><p>Hello</p></b></span>
\`\`\`

---

**Pattern Summary:**

| Requirement | Pattern | Category | Key Benefit |
|-------------|---------|----------|-------------|
| Undo/Redo | Command | Behavioral | Encapsulates operations as objects |
| Export formats | Strategy | Behavioral | Algorithms interchangeable at runtime |
| Synchronized views | Observer | Behavioral | Loose coupling, automatic updates |
| Nested structure | Composite | Structural | Uniform tree traversal |
| Styling | Decorator | Structural | Dynamic behavior addition |`
  },
  {
    id: 'cs204-t3-ex16',
    subjectId: 'cs204',
    topicId: 'cs204-topic-3',
    type: 'written',
    title: 'System Design Case Study',
    description: 'Design a URL shortening service (like bit.ly). Your design should include:\n1. High-level architecture diagram\n2. API design (RESTful endpoints)\n3. Data model / database schema\n4. Key algorithms (URL generation)\n5. Scalability considerations\n6. Discussion of trade-offs made',
    difficulty: 5,
    hints: [
      'Consider read-heavy vs write-heavy workload',
      'Think about URL collision handling',
      'Consider caching strategies',
      'Think about analytics requirements'
    ],
    solution: `**System Design: URL Shortening Service**

---

**1. HIGH-LEVEL ARCHITECTURE**

\`\`\`
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENTS                                         │
│        (Web Browser, Mobile App, API Consumers)                             │
└───────────────────────────────┬─────────────────────────────────────────────┘
                                │ HTTPS
                                ▼
┌───────────────────────────────────────────────────────────────────────────────┐
│                           LOAD BALANCER                                       │
│                        (AWS ALB / Nginx)                                      │
└───────────────────────────────┬───────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    ▼                       ▼
          ┌─────────────────┐     ┌─────────────────┐
          │   API Server 1  │     │   API Server N  │
          │    (Node.js)    │     │    (Node.js)    │
          └────────┬────────┘     └────────┬────────┘
                   │                       │
                   └───────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
    ┌─────────────────┐ ┌─────────────┐ ┌─────────────────┐
    │   Redis Cache   │ │   Primary   │ │   PostgreSQL    │
    │  (Short URL →   │ │ PostgreSQL  │ │    Replica      │
    │   Long URL)     │ │             │ │   (Read-only)   │
    └─────────────────┘ └─────────────┘ └─────────────────┘
                               │
                               ▼
                     ┌─────────────────┐
                     │  Analytics      │
                     │  (Kafka → )     │
                     │  ClickHouse)    │
                     └─────────────────┘
\`\`\`

---

**2. API DESIGN**

**Create Short URL**
\`\`\`
POST /api/v1/shorten
Content-Type: application/json

Request:
{
  "long_url": "https://example.com/very/long/path?params=value",
  "custom_alias": "my-link",      // optional
  "expires_at": "2025-12-31",     // optional
}

Response: 201 Created
{
  "short_url": "https://short.ly/abc123",
  "short_code": "abc123",
  "long_url": "https://example.com/very/long/path?params=value",
  "created_at": "2024-01-15T10:30:00Z",
  "expires_at": "2025-12-31T00:00:00Z"
}
\`\`\`

**Redirect (Read)**
\`\`\`
GET /{short_code}
→ 301 Redirect to long_url

GET /{short_code}?no_redirect=true
→ 200 OK { "long_url": "..." }
\`\`\`

**Get Statistics**
\`\`\`
GET /api/v1/stats/{short_code}

Response:
{
  "short_code": "abc123",
  "total_clicks": 15234,
  "unique_visitors": 8921,
  "clicks_by_country": { "US": 5000, "UK": 2000 },
  "clicks_by_day": [{ "date": "2024-01-15", "count": 500 }]
}
\`\`\`

**Delete URL**
\`\`\`
DELETE /api/v1/urls/{short_code}
Authorization: Bearer <token>

Response: 204 No Content
\`\`\`

---

**3. DATA MODEL**

\`\`\`sql
-- Main URL mapping table
CREATE TABLE urls (
    id              BIGSERIAL PRIMARY KEY,
    short_code      VARCHAR(10) UNIQUE NOT NULL,
    long_url        TEXT NOT NULL,
    user_id         UUID REFERENCES users(id),
    created_at      TIMESTAMP DEFAULT NOW(),
    expires_at      TIMESTAMP,
    is_active       BOOLEAN DEFAULT true,

    INDEX idx_short_code (short_code),
    INDEX idx_user_id (user_id)
);

-- Click events (high volume - consider time-series DB)
CREATE TABLE clicks (
    id              BIGSERIAL PRIMARY KEY,
    url_id          BIGINT REFERENCES urls(id),
    clicked_at      TIMESTAMP DEFAULT NOW(),
    ip_address      INET,
    user_agent      TEXT,
    referer         TEXT,
    country         VARCHAR(2),

    INDEX idx_url_id_time (url_id, clicked_at)
);

-- Users (for authenticated features)
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    api_key         VARCHAR(64) UNIQUE NOT NULL,
    created_at      TIMESTAMP DEFAULT NOW(),
    plan            VARCHAR(20) DEFAULT 'free'
);
\`\`\`

---

**4. KEY ALGORITHMS**

**Short Code Generation (Base62 Encoding)**

\`\`\`typescript
// Option A: Counter + Base62 (Sequential, predictable)
class SequentialGenerator {
  private counter = 0;
  private readonly ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  generate(): string {
    let num = ++this.counter;
    let code = '';
    while (num > 0) {
      code = this.ALPHABET[num % 62] + code;
      num = Math.floor(num / 62);
    }
    return code.padStart(6, '0');  // Minimum 6 chars
  }
}

// Option B: Hash-based (Random, requires collision check)
class HashGenerator {
  generate(longUrl: string): string {
    const hash = crypto.createHash('md5').update(longUrl + Date.now()).digest('base64');
    return hash.substring(0, 7).replace(/[+/=]/g, 'X');
  }
}

// Option C: Pre-generated key service (Recommended for scale)
class KeyGenerationService {
  private unusedKeys: string[] = [];
  private usedKeys: Set<string> = new Set();

  // Background job generates keys in batches
  async preGenerateKeys(count: number) {
    while (this.unusedKeys.length < count) {
      const key = this.randomBase62(7);
      if (!this.usedKeys.has(key)) {
        this.unusedKeys.push(key);
      }
    }
  }

  getKey(): string {
    const key = this.unusedKeys.pop()!;
    this.usedKeys.add(key);
    return key;
  }

  private randomBase62(length: number): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * 62)]).join('');
  }
}
\`\`\`

**Capacity Calculation:**
- 7-character Base62 = 62^7 = 3.5 trillion unique URLs
- At 100 URLs/second = 3.15B/year → 1000+ years capacity

---

**5. SCALABILITY CONSIDERATIONS**

**Read-Heavy Optimization (100:1 read:write ratio)**

\`\`\`
Read Path (optimized):
                                    ┌───────────────┐
                    99% hit rate    │    Redis      │
Request ─────────────────────────>  │    Cache      │
    │                               └───────────────┘
    │ cache miss (1%)                      │
    ▼                                      │
┌─────────────────┐                        │
│  PostgreSQL     │ <──────────────────────┘
│  Read Replica   │   populate cache on miss
└─────────────────┘
\`\`\`

**Caching Strategy:**
- Cache: short_code → long_url mapping
- TTL: 24 hours (popular URLs stay hot)
- Eviction: LRU
- Cache-aside pattern

**Database Sharding (for extreme scale):**
- Shard by first character of short_code
- 62 shards (one per Base62 character)
- Or range-based: a-j, k-t, u-9, A-J, etc.

**Geographic Distribution:**
- CDN for static assets
- Regional API servers
- Global Anycast DNS

---

**6. TRADE-OFFS DISCUSSION**

| Decision | Trade-off | Rationale |
|----------|-----------|-----------|
| **Base62 vs Base64** | Slightly fewer chars vs URL-safe | Base62 avoids +/= which need URL encoding |
| **Sequential vs Random keys** | Predictable vs Collision risk | Random chosen - sequential exposes usage patterns |
| **7-char codes** | Storage vs Capacity | 7 chars = 3.5T URLs, sufficient for decades |
| **PostgreSQL vs NoSQL** | ACID vs Scale | Postgres with read replicas handles load; can shard later |
| **Sync vs Async analytics** | Latency vs Complexity | Async via Kafka prevents redirect latency |
| **301 vs 302 redirect** | Caching vs Analytics | 301 allows browser caching but loses click counts; use 302 for analytics |
| **Pre-generated keys** | Memory vs Latency | Pre-gen eliminates collision checks at write time |

**Rate Limiting:**
- Free tier: 100 URLs/day, 1000 redirects/minute
- Paid tier: Higher limits
- Use Redis for distributed rate limiting

**Security Considerations:**
- Validate URLs (no malicious redirects)
- Rate limit by IP and API key
- Scan URLs against malware databases
- HTTPS only for shortened URLs`
  }
];
