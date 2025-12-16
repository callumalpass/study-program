import { WrittenExercise } from '../../../../core/types';

export const topic5Exercises: WrittenExercise[] = [
  {
    id: 'cs204-t5-ex1',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Testing Levels',
    description: 'Explain the four main levels of software testing (unit, integration, system, acceptance). For each level, describe its purpose and who typically performs it.',
    difficulty: 1,
    hints: [
      'Consider scope of each level',
      'Think about what defects each level catches',
      'Consider the testing pyramid'
    ],
    solution: `**Unit Testing**: Tests individual functions/methods in isolation. Catches logic errors. Performed by developers.

**Integration Testing**: Tests interaction between components/modules. Catches interface mismatches. Performed by developers or QA.

**System Testing**: Tests complete integrated system against requirements. Catches end-to-end issues. Performed by QA team.

**Acceptance Testing**: Validates system meets business needs. Performed by customers/end-users (UAT) or automated (ATDD).`
  },
  {
    id: 'cs204-t5-ex2',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Black-box vs White-box',
    description: 'Compare black-box and white-box testing approaches. Give two techniques used in each and explain when to prefer one over the other.',
    difficulty: 2,
    hints: [
      'Black-box ignores internal structure',
      'White-box examines code paths',
      'Consider who performs each type'
    ],
    solution: `**Black-box Testing**: Tests functionality without knowledge of internal implementation.
- Techniques: Equivalence partitioning, boundary value analysis
- When to use: Functional testing, UAT, when testers don't have code access

**White-box Testing**: Tests with knowledge of internal code structure.
- Techniques: Statement coverage, branch coverage, path testing
- When to use: Unit testing, security testing, when aiming for code coverage

**Key difference**: Black-box tests WHAT the system does; white-box tests HOW it does it.`
  },
  {
    id: 'cs204-t5-ex3',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Test-Driven Development',
    description: 'Describe the TDD cycle (Red-Green-Refactor). Implement a simple example: write tests first for a function that calculates factorial.',
    difficulty: 2,
    hints: [
      'Red: write failing test first',
      'Green: write minimal code to pass',
      'Refactor: improve code without changing behavior'
    ],
    solution: `**TDD Cycle:**
1. **Red**: Write a failing test for desired functionality
2. **Green**: Write minimal code to make test pass
3. **Refactor**: Clean up code while keeping tests green

**Example:**
// RED - Write test first
test('factorial of 5 is 120', () => {
  expect(factorial(5)).toBe(120);
});
test('factorial of 0 is 1', () => {
  expect(factorial(0)).toBe(1);
});

// GREEN - Minimal implementation
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// REFACTOR - Optimize if needed (iterative version, memoization)`
  },
  {
    id: 'cs204-t5-ex4',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Equivalence Partitioning',
    description: 'A function validates age for a website (valid range: 13-120). Apply equivalence partitioning to identify test cases that minimize redundancy while maximizing coverage.',
    difficulty: 2,
    hints: [
      'Identify valid and invalid partitions',
      'One test per partition is sufficient',
      'Consider boundary between partitions'
    ],
    solution: `**Partitions Identified:**
1. Invalid (below range): age < 13
2. Valid: 13 ≤ age ≤ 120
3. Invalid (above range): age > 120
4. Invalid (non-numeric or negative): age < 0

**Test Cases (one per partition):**
- age = 10 → Invalid (below)
- age = 50 → Valid
- age = 130 → Invalid (above)
- age = -5 → Invalid (negative)

**Rationale:** Values within same partition should behave identically. Testing age=50 is representative of all valid ages 13-120.`
  },
  {
    id: 'cs204-t5-ex5',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Boundary Value Analysis',
    description: 'Using the same age validation (13-120), apply boundary value analysis to identify additional test cases beyond equivalence partitioning.',
    difficulty: 2,
    hints: [
      'Test at exact boundaries',
      'Test one value on each side of boundary',
      'Boundaries are where defects often hide'
    ],
    solution: `**Boundary Values for age 13-120:**

Lower boundary (13):
- age = 12 → Invalid (just below)
- age = 13 → Valid (at boundary)
- age = 14 → Valid (just above)

Upper boundary (120):
- age = 119 → Valid (just below)
- age = 120 → Valid (at boundary)
- age = 121 → Invalid (just above)

**Additional boundaries:**
- age = 0 → Invalid (zero boundary)
- age = -1 → Invalid (negative boundary)

**Rationale:** Off-by-one errors are common; BVA specifically targets these boundaries.`
  },
  {
    id: 'cs204-t5-ex6',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Code Coverage Metrics',
    description: 'Explain statement coverage, branch coverage, and path coverage. Given a function with an if-else statement, show what tests achieve each coverage level.',
    difficulty: 3,
    hints: [
      'Statement: every line executed',
      'Branch: every decision outcome',
      'Path: every possible route through code'
    ],
    solution: `function checkValue(x: number): string {
  if (x > 0) {
    return "positive";
  } else {
    return "non-positive";
  }
}

**Statement Coverage** (execute every statement):
- Test: x=1 → covers lines 2,3
- Test: x=-1 → covers lines 4,5
- Result: 100% statement coverage

**Branch Coverage** (every decision true/false):
- Test: x=1 → if branch (true)
- Test: x=-1 → else branch (false)
- Result: 100% branch coverage

**Path Coverage** (all execution paths):
Same as branch for simple if-else.
For nested conditionals or loops, path count grows exponentially.

**Relationship**: Path ⊃ Branch ⊃ Statement`
  },
  {
    id: 'cs204-t5-ex7',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Test Doubles',
    description: 'Explain the differences between stubs, mocks, and fakes. Provide an example scenario where each would be appropriate.',
    difficulty: 3,
    hints: [
      'Stubs provide canned answers',
      'Mocks verify interactions',
      'Fakes have working implementations'
    ],
    solution: `**Stub**: Returns predefined data; no behavior verification.
- Use case: Testing code that reads from database. Stub returns fixed user object.

**Mock**: Verifies specific interactions occurred.
- Use case: Testing email service was called with correct parameters after user registration.
- expect(emailMock).toHaveBeenCalledWith("welcome@...", user.email)

**Fake**: Working implementation unsuitable for production.
- Use case: In-memory database for integration tests instead of real database.

**Spy**: Real object with tracked interactions.
- Use case: Verify real logger was called without replacing it.

**Key**: Stubs for state verification; Mocks for behavior verification; Fakes for realistic substitutes.`
  },
  {
    id: 'cs204-t5-ex8',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Testing Legacy Code',
    description: 'You inherit code with no tests and tight coupling. Describe strategies for safely adding tests without major refactoring.',
    difficulty: 4,
    hints: [
      'Characterization tests capture current behavior',
      'Seams allow dependency injection',
      'Start with highest-risk areas'
    ],
    solution: `**Strategies:**

1. **Characterization Tests**: Write tests that document current behavior (even if buggy). Establishes safety net before changes.

2. **Find Seams**: Identify points where behavior can be changed without editing code:
   - Constructor injection
   - Method parameter injection
   - Subclass and override

3. **Extract and Override**: Create protected methods for dependencies, override in test subclass.

4. **Sprout Methods/Classes**: Add new functionality in testable new code that existing code calls.

5. **Prioritize by Risk**: Start testing critical paths, frequently changed code, or bug-prone areas.

**Key principle**: Make minimal changes to enable testing; larger refactoring comes after test coverage exists.`
  },
  {
    id: 'cs204-t5-ex9',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Integration Testing Strategies',
    description: 'Compare top-down, bottom-up, and sandwich integration testing approaches. Discuss stubs vs drivers needed for each.',
    difficulty: 3,
    hints: [
      'Top-down starts from UI/main',
      'Bottom-up starts from utilities',
      'Consider stub/driver overhead'
    ],
    solution: `**Top-Down Integration:**
- Start with high-level modules, integrate downward
- Requires: Stubs for lower modules not yet integrated
- Pros: Early validation of main control flow
- Cons: Low-level functionality tested late

**Bottom-Up Integration:**
- Start with low-level utilities, integrate upward
- Requires: Drivers to call lower modules
- Pros: Thoroughly tests foundation first
- Cons: Working system visible only at end

**Sandwich (Hybrid):**
- Simultaneous top-down and bottom-up, meeting in middle
- Requires: Both stubs and drivers
- Pros: Balances early visibility with thorough testing
- Cons: More complex coordination`
  },
  {
    id: 'cs204-t5-ex10',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Regression Testing',
    description: 'Explain what regression testing is and why it matters. Describe strategies for managing a growing regression test suite.',
    difficulty: 2,
    hints: [
      'Regression catches unintended side effects',
      'Automation is essential',
      'Test selection reduces execution time'
    ],
    solution: `**Regression Testing**: Re-running tests after code changes to ensure existing functionality still works.

**Why it matters:**
- Code changes can break existing features
- Dependencies create unexpected side effects
- Confidence to refactor and improve code

**Management Strategies:**
1. **Automation**: Manual regression is unsustainable; automate test execution
2. **Prioritization**: Run critical tests first; full suite nightly
3. **Test Selection**: Run only tests affected by changes (risk-based)
4. **Test Maintenance**: Remove obsolete tests; update for requirement changes
5. **Continuous Integration**: Run regression on every commit

**Balance**: Comprehensive coverage vs. execution time. Use smoke tests for fast feedback, full regression periodically.`
  },
  {
    id: 'cs204-t5-ex11',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Performance Testing Types',
    description: 'Differentiate between load testing, stress testing, and endurance testing. Explain what each measures and when to use it.',
    difficulty: 3,
    hints: [
      'Load: expected conditions',
      'Stress: beyond capacity',
      'Endurance: sustained load over time'
    ],
    solution: `**Load Testing:**
- Tests system under expected user load
- Measures: Response time, throughput at normal capacity
- Use: Verify performance meets SLAs under typical conditions

**Stress Testing:**
- Tests beyond normal capacity until failure
- Measures: Breaking point, failure behavior, recovery
- Use: Find system limits, ensure graceful degradation

**Endurance (Soak) Testing:**
- Tests sustained load over extended period
- Measures: Memory leaks, resource exhaustion, degradation over time
- Use: Detect issues that only appear after hours/days of operation

**Related: Spike Testing** - sudden load increases
**Related: Scalability Testing** - performance vs. resource changes`
  },
  {
    id: 'cs204-t5-ex12',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Test Case Design',
    description: 'Write comprehensive test cases for a login function that accepts username and password. Include positive, negative, and edge cases.',
    difficulty: 3,
    hints: [
      'Valid credentials scenario',
      'Invalid credentials variations',
      'Edge cases: empty, special chars, SQL injection'
    ],
    solution: `**Positive Tests:**
- Valid username + valid password → login success
- Case sensitivity: Username "User" vs "user" (per requirements)

**Negative Tests:**
- Valid username + wrong password → fail with message
- Invalid username + any password → fail (same message for security)
- Empty username → validation error
- Empty password → validation error
- Both empty → validation error

**Edge Cases:**
- Max length username/password → should work
- Exceeds max length → validation error
- Special characters in password → should work
- SQL injection attempt: "'; DROP TABLE--" → sanitized, fails safely
- Account locked after N failures → lockout message

**Security Tests:**
- Timing attack: same response time for valid/invalid usernames
- No password in error messages or logs`
  },
  {
    id: 'cs204-t5-ex13',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Continuous Integration Testing',
    description: 'Design a CI/CD pipeline test strategy. What tests run on commit, on PR, nightly, and before release?',
    difficulty: 4,
    hints: [
      'Fast feedback for frequent events',
      'Comprehensive testing less frequently',
      'Consider test execution time'
    ],
    solution: `**On Every Commit (< 5 min):**
- Linting and static analysis
- Unit tests
- Build verification

**On Pull Request (< 15 min):**
- All commit checks
- Integration tests
- Code coverage check
- Security scanning (SAST)

**Nightly (< 2 hours):**
- Full regression suite
- Performance benchmarks
- End-to-end UI tests
- Dependency vulnerability scan

**Before Release:**
- All of above
- Smoke tests in staging environment
- Penetration testing
- UAT sign-off
- Load/stress testing

**Key Principle**: Fast tests run often; slow comprehensive tests run less frequently but before release.`
  },
  {
    id: 'cs204-t5-ex14',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Mutation Testing',
    description: 'Explain mutation testing and how it evaluates test suite quality. What are mutants, and what does it mean to kill a mutant?',
    difficulty: 4,
    hints: [
      'Mutants are modified versions of code',
      'Good tests should detect (kill) mutants',
      'Surviving mutants indicate weak tests'
    ],
    solution: `**Mutation Testing**: Evaluates test quality by introducing small code changes (mutations) and checking if tests detect them.

**Process:**
1. Create mutants: modify code (change + to -, < to <=, etc.)
2. Run tests against each mutant
3. Mutant "killed" if tests fail; "survives" if tests pass

**Mutation Operators:**
- Arithmetic: + → -
- Relational: < → <=
- Logical: && → ||
- Statement deletion

**Mutation Score** = killed mutants / total mutants

**Interpretation:**
- High score (>80%): Tests effectively detect changes
- Surviving mutants: Indicate missing test cases or dead code
- Better quality metric than code coverage alone

**Limitation**: Computationally expensive (run tests N times per mutant)`
  },
  {
    id: 'cs204-t5-ex15',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Testing Anti-patterns',
    description: 'Identify and explain three common testing anti-patterns. For each, describe why it is problematic and how to fix it.',
    difficulty: 4,
    hints: [
      'Flaky tests, slow tests, brittle tests',
      'Consider maintenance burden',
      'Think about test independence'
    ],
    solution: `**1. Flaky Tests**
- Problem: Tests pass/fail randomly without code changes
- Causes: Timing dependencies, shared state, external services
- Fix: Isolate tests, use deterministic data, mock external dependencies

**2. Testing Implementation Details**
- Problem: Tests break when refactoring even if behavior unchanged
- Causes: Testing private methods, asserting on internal state
- Fix: Test public interface and observable behavior only

**3. Slow Test Suite**
- Problem: Tests take too long, developers skip them
- Causes: Real database/network calls, unnecessary setup
- Fix: Use test doubles, optimize setup, parallelize tests

**Also common:**
- Interdependent tests (order matters)
- No assertions (tests that can't fail)
- Testing the framework (verifying library behavior)`
  },
  {
    id: 'cs204-t5-ex16',
    subjectId: 'cs204',
    topicId: 'cs204-topic-5',
    type: 'written' as const,
    title: 'Test Plan Creation',
    description: 'Create a test plan outline for a new e-commerce checkout feature. Include scope, approach, resources, schedule, and risk assessment.',
    difficulty: 5,
    hints: [
      'Define what is/isn\'t being tested',
      'Identify test types needed',
      'Consider dependencies and risks'
    ],
    solution: `**Test Plan: E-commerce Checkout Feature**

**1. Scope**
- In scope: Cart→checkout flow, payment processing, order confirmation
- Out of scope: Inventory management, shipping carrier integration

**2. Test Approach**
- Unit: Payment calculation, validation logic
- Integration: Payment gateway, order service
- E2E: Complete purchase flow
- Performance: Checkout under 100 concurrent users
- Security: Payment data handling, PCI compliance

**3. Entry/Exit Criteria**
- Entry: Feature code complete, test environment ready
- Exit: 95% test pass rate, no critical bugs, coverage >80%

**4. Resources**
- Team: 2 QA engineers, 1 automation engineer
- Tools: Jest, Cypress, k6 for load testing
- Environments: Dev, staging with payment sandbox

**5. Risks**
- Payment gateway sandbox availability
- Test data management for orders
- Mitigation: Mock payment service, automated data cleanup`
  }
];
