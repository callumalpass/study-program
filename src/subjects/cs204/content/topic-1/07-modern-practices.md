---
id: cs204-t1-modern
title: "Modern Practices"
order: 7
---

# Modern Software Development Practices

Software development has evolved dramatically in the 21st century. Modern practices emphasize automation, collaboration, and continuous delivery of value. Understanding these practices is essential for contemporary software engineering.

## The DevOps Revolution

DevOps represents a cultural and technical movement that breaks down traditional barriers between development and operations teams.

### The Traditional Problem

**Before DevOps:**
```
Development Team:
- Goal: Deliver new features quickly
- Measured on: Velocity, feature count
- Attitude: "Change is good"

Operations Team:
- Goal: Keep systems stable and running
- Measured on: Uptime, reliability
- Attitude: "Change is risky"

Result: Conflict and slow, painful deployments
```

**The Wall of Confusion:**
- Developers "throw code over the wall" to operations
- Operations blocks deployments to maintain stability
- Long lead times from code complete to production
- Painful, infrequent releases
- Finger-pointing when problems occur

### DevOps Principles

**Culture:**
- Shared responsibility for outcomes
- Collaboration over silos
- Trust and transparency
- Learning from failures

**Automation:**
- Automate repetitive tasks
- Infrastructure as code
- Automated testing and deployment
- Monitoring and alerting

**Measurement:**
- Monitor everything
- Data-driven decisions
- Continuous feedback
- Share metrics across teams

**Sharing:**
- Knowledge sharing
- Common tools and practices
- Cross-functional teams
- Blameless post-mortems

### DevOps Practices

**Infrastructure as Code (IaC):**
```yaml
# Example: Terraform configuration
resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "WebServer"
    Environment = "Production"
  }
}

# Infrastructure is versioned, reviewed, and tested like code
# Changes are tracked in version control
# Environments are reproducible
```

**Configuration Management:**
```yaml
# Example: Ansible playbook
- name: Configure web server
  hosts: webservers
  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present

    - name: Copy configuration
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify: restart nginx

    - name: Ensure nginx is running
      service:
        name: nginx
        state: started
        enabled: yes
```

**Containerization:**
```dockerfile
# Example: Dockerfile
FROM node:16-alpine

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Run as non-root user
USER node

# Expose port
EXPOSE 3000

# Start application
CMD ["node", "server.js"]

# Benefits:
# - Consistent environments
# - Isolation
# - Portability
# - Efficient resource usage
```

## Continuous Integration (CI)

Continuous Integration is the practice of frequently integrating code changes into a shared repository, with automated verification.

### Core Principles

**Integrate Frequently:**
- Multiple times per day
- Small, incremental changes
- Reduces integration conflicts
- Easier to identify issues

**Automate the Build:**
```yaml
# Example: GitHub Actions CI workflow
name: CI
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'

    - name: Install dependencies
      run: npm ci

    - name: Run linter
      run: npm run lint

    - name: Run tests
      run: npm test

    - name: Build
      run: npm run build

    - name: Upload coverage
      uses: codecov/codecov-action@v2
```

**Make the Build Self-Testing:**
- Automated unit tests
- Integration tests
- Code quality checks
- Security scanning

**Everyone Commits to Mainline Every Day:**
- No long-lived feature branches
- Use feature flags for incomplete features
- Keeps codebase integrated

**Keep the Build Fast:**
- Optimize test execution
- Parallel test runs
- Fail fast on errors
- Feedback in minutes, not hours

**Fix Broken Builds Immediately:**
- Highest priority when build breaks
- Stop the line mentality
- Don't commit on top of broken build

### CI Benefits

**Early Bug Detection:**
```
Without CI:
Developer A commits code Monday
Developer B commits code Tuesday
Integration happens Friday
Conflict discovered Friday afternoon
Debug time: Hours to days

With CI:
Developer A commits code Monday 9:00 AM
Developer B commits code Monday 10:00 AM
Conflict detected Monday 10:05 AM
Fixed Monday 10:30 AM
Debug time: Minutes
```

**Reduced Integration Risk:**
- Small changes easier to debug
- Continuous verification
- Confidence in codebase

**Higher Code Quality:**
- Automated code reviews (linting)
- Test coverage tracking
- Consistent standards

## Continuous Delivery (CD)

Continuous Delivery extends CI to ensure code is always in a deployable state, automating the path to production.

### Continuous Delivery vs. Continuous Deployment

**Continuous Delivery:**
- Code can be deployed at any time
- Deployment requires manual approval
- Release when business decides

**Continuous Deployment:**
- Every change automatically deployed to production
- No manual gate
- Requires high confidence in automation

### Deployment Pipeline

```
┌─────────────┐    ┌──────────┐    ┌─────────────┐    ┌────────────┐
│   Commit    │ -> │   Build  │ -> │    Test     │ -> │   Deploy   │
│   Code      │    │ & Unit   │    │ Integration │    │   Staging  │
│             │    │  Tests   │    │  & System   │    │            │
└─────────────┘    └──────────┘    └─────────────┘    └────────────┘
                                                              │
                                                              v
                                                    ┌────────────────┐
                                                    │  Manual Gate   │
                                                    │  (Approval)    │
                                                    └────────────────┘
                                                              │
                                                              v
                                                    ┌────────────────┐
                                                    │    Deploy      │
                                                    │   Production   │
                                                    └────────────────┘
```

### Pipeline Stages

**Commit Stage:**
```yaml
# Fast feedback (< 10 minutes)
- Compile code
- Run unit tests
- Code quality analysis
- Build artifacts
```

**Acceptance Stage:**
```yaml
# Thorough testing (< 1 hour)
- Deploy to test environment
- Run integration tests
- Run functional tests
- Performance tests
- Security scans
```

**Production Stage:**
```yaml
# Safe deployment
- Deploy to production
- Smoke tests
- Monitor metrics
- Automatic rollback if issues
```

### Deployment Strategies

**Blue-Green Deployment:**
```
Blue Environment (Current Production)
└── Serving 100% of traffic

Deploy to Green Environment
└── New version ready
└── Test on green

Switch traffic to Green
└── Green now serving 100% of traffic
└── Blue remains as instant rollback option
```

**Canary Deployment:**
```
Version 1 (Current)
└── 95% of traffic

Version 2 (Canary)
└── 5% of traffic
└── Monitor metrics

If successful:
└── Gradually increase Version 2 to 100%

If problems:
└── Route all traffic back to Version 1
```

**Rolling Deployment:**
```
Instances: [V1] [V1] [V1] [V1]
           [V2] [V1] [V1] [V1]
           [V2] [V2] [V1] [V1]
           [V2] [V2] [V2] [V1]
           [V2] [V2] [V2] [V2]

Gradual replacement
Always some instances available
Rollback by reversing
```

### Feature Flags

Feature flags decouple deployment from release:

```javascript
// Example: Feature flag implementation
class FeatureFlags {
  constructor(config) {
    this.flags = config;
  }

  isEnabled(featureName, userId = null) {
    const flag = this.flags[featureName];
    if (!flag) return false;

    // Simple on/off
    if (flag.enabled === false) return false;

    // Percentage rollout
    if (flag.percentage) {
      const hash = this.hashUser(userId);
      return hash < flag.percentage;
    }

    // User whitelist
    if (flag.users && userId) {
      return flag.users.includes(userId);
    }

    return true;
  }
}

// Usage in application
if (featureFlags.isEnabled('newCheckout', user.id)) {
  return renderNewCheckout();
} else {
  return renderOldCheckout();
}

// Benefits:
// - Deploy incomplete features safely
// - A/B testing
// - Gradual rollouts
// - Quick feature kill switch
```

## Modern Testing Practices

### Test Pyramid

```
          /\
         /  \
        / UI \          Few: Slow, brittle, expensive
       /______\
      /        \
     / Service \       More: API/integration tests
    /          \
   /____________\
  /              \
 /      Unit      \    Most: Fast, reliable, cheap
/__________________\
```

**Unit Tests:**
- Test individual functions/methods
- Fast execution (milliseconds)
- Run on every commit
- High coverage (80%+ typically)

**Integration Tests:**
- Test component interactions
- Database, API, service tests
- Slower (seconds to minutes)
- Cover critical paths

**End-to-End Tests:**
- Test complete user workflows
- UI automation
- Slowest (minutes)
- Cover critical business scenarios only

### Test-Driven Development (TDD)

```
Red-Green-Refactor Cycle:

1. Red: Write failing test
   test('should calculate total with tax', () => {
     expect(calculateTotal(100, 0.08)).toBe(108);
   });
   // Test fails: calculateTotal not implemented

2. Green: Write minimal code to pass
   function calculateTotal(amount, taxRate) {
     return amount + (amount * taxRate);
   }
   // Test passes

3. Refactor: Improve code quality
   function calculateTotal(amount, taxRate) {
     if (amount < 0 || taxRate < 0) {
       throw new Error('Values must be positive');
     }
     return Number((amount * (1 + taxRate)).toFixed(2));
   }
   // Test still passes, code is better

Repeat for next requirement
```

**TDD Benefits:**
- Tests written before code
- Higher test coverage
- Better design (testable code is better code)
- Confidence in refactoring

### Behavior-Driven Development (BDD)

```gherkin
# Example: Gherkin syntax
Feature: Shopping Cart
  As a customer
  I want to add items to my cart
  So that I can purchase them

  Scenario: Adding item increases cart total
    Given the cart is empty
    When I add a $50 item to the cart
    And I add a $30 item to the cart
    Then the cart total should be $80

  Scenario: Removing item decreases cart total
    Given the cart contains:
      | Item      | Price |
      | Widget    | $50   |
      | Gadget    | $30   |
    When I remove the Widget
    Then the cart total should be $30
```

**BDD Benefits:**
- Tests in business language
- Living documentation
- Shared understanding between technical and non-technical
- Tests as specifications

## Monitoring and Observability

Modern systems must be observable to operate effectively.

### The Three Pillars

**Metrics:**
```javascript
// Example: Application metrics
const metrics = {
  counters: {
    'http.requests.total': 1523412,
    'http.requests.errors': 234,
    'orders.completed': 45612
  },
  gauges: {
    'system.memory.usage': 0.72,
    'database.connections.active': 23,
    'queue.depth': 156
  },
  histograms: {
    'http.request.duration': [10, 25, 50, 75, 90, 95, 99]  // percentiles
  }
};
```

**Logs:**
```json
{
  "timestamp": "2025-12-16T10:23:45.123Z",
  "level": "ERROR",
  "service": "order-service",
  "traceId": "abc123xyz",
  "userId": "user456",
  "message": "Payment processing failed",
  "error": {
    "type": "PaymentGatewayError",
    "message": "Gateway timeout",
    "code": "GATEWAY_TIMEOUT"
  },
  "context": {
    "orderId": "order789",
    "amount": 99.99,
    "gateway": "stripe"
  }
}
```

**Traces:**
```
Request: GET /api/orders/123
├─ API Gateway (5ms)
│  └─ Authentication (15ms)
├─ Order Service (150ms)
│  ├─ Database Query (45ms)
│  ├─ Cache Check (2ms)
│  └─ Inventory Service (80ms)
│     └─ Database Query (65ms)
└─ Response (3ms)

Total: 173ms
Bottleneck: Inventory Service database query
```

### Site Reliability Engineering (SRE)

**Service Level Indicators (SLIs):**
- Request latency
- Error rate
- System throughput
- Data durability

**Service Level Objectives (SLOs):**
```
Example SLOs:
- 99.9% of requests complete in < 200ms
- 99.99% of requests return successful response
- 99.999% of data writes are durable

SLO = Target level for SLI
```

**Error Budgets:**
```
SLO: 99.9% uptime = 0.1% downtime allowed

Error Budget:
- Monthly: 43.2 minutes of downtime
- Quarterly: 129.6 minutes

Usage:
- Spent 10 minutes on incident
- Remaining: 33.2 minutes this month

If budget exhausted:
- Freeze feature releases
- Focus on reliability
- Until budget restores
```

## Microservices and Cloud-Native

### Microservices Architecture

**Principles:**
- Single responsibility per service
- Independent deployment
- Decentralized data management
- Technology diversity

**Example:**
```
E-commerce Platform:

Monolith (Before):
└── Single application
    ├── User management
    ├── Product catalog
    ├── Shopping cart
    ├── Order processing
    ├── Payment
    └── Shipping

Microservices (After):
├── User Service
│   └── Node.js, PostgreSQL
├── Product Service
│   └── Java, MongoDB
├── Cart Service
│   └── Go, Redis
├── Order Service
│   └── Python, PostgreSQL
├── Payment Service
│   └── Java, PostgreSQL
└── Shipping Service
    └── Node.js, PostgreSQL

API Gateway
└── Routes requests to services
```

**Benefits:**
- Independent scaling
- Technology flexibility
- Team autonomy
- Faster deployment

**Challenges:**
- Distributed system complexity
- Data consistency
- Network latency
- Operational overhead

### Cloud-Native Practices

**Twelve-Factor App Principles:**
1. Codebase: One codebase tracked in version control
2. Dependencies: Explicitly declare and isolate dependencies
3. Config: Store config in environment
4. Backing services: Treat as attached resources
5. Build, release, run: Strict separation
6. Processes: Execute as stateless processes
7. Port binding: Export services via port binding
8. Concurrency: Scale out via process model
9. Disposability: Fast startup and shutdown
10. Dev/prod parity: Keep environments similar
11. Logs: Treat logs as event streams
12. Admin processes: Run as one-off processes

## Summary

Modern software development practices have revolutionized how we build and deliver software. DevOps culture breaks down silos and emphasizes collaboration. Continuous Integration and Continuous Delivery automate the path from code to production, enabling rapid, reliable releases. Modern testing practices ensure quality at every level. Observability through metrics, logs, and traces enables us to understand and operate complex systems. Cloud-native and microservices architectures provide flexibility and scalability. These practices work together to enable organizations to deliver value faster, more reliably, and with higher quality than ever before. Mastering these modern practices is essential for any software engineer working in today's fast-paced environment.
