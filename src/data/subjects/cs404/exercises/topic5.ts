import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  // D1 Exercises (3)
  {
    id: 'cs404-t5-ex01',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Basic Unit Test for Pure Function',
    difficulty: 1,
    description: 'Write unit tests for a simple calculator function. Learn the fundamentals of testing pure functions with Jest.',
    starterCode: `// Calculator function to test
function add(a: number, b: number): number {
  return a + b;
}

// Write your tests here
describe('Calculator', () => {
  // TODO: Write test cases for the add function
  // Test: should add two positive numbers
  // Test: should add negative numbers
  // Test: should handle zero
});`,
    solution: `// Calculator function to test
function add(a: number, b: number): number {
  return a + b;
}

// Complete test suite
describe('Calculator', () => {
  test('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(10, 15)).toBe(25);
  });

  test('should add negative numbers', () => {
    expect(add(-5, -3)).toBe(-8);
    expect(add(-10, 5)).toBe(-5);
  });

  test('should handle zero', () => {
    expect(add(0, 0)).toBe(0);
    expect(add(5, 0)).toBe(5);
    expect(add(0, 7)).toBe(7);
  });

  test('should add decimal numbers', () => {
    expect(add(1.5, 2.3)).toBeCloseTo(3.8);
  });
});`,
    hints: [
      'Use describe() to group related tests together',
      'Each test() should verify a specific behavior',
      'Use expect() and toBe() for exact equality checks',
      'For decimal numbers, use toBeCloseTo() instead of toBe()'
    ],
    testCases: [
      {
        input: 'add(2, 3)',
        expectedOutput: '5',
        description: 'Should add two positive numbers'
      },
      {
        input: 'add(-5, -3)',
        expectedOutput: '-8',
        description: 'Should add negative numbers'
      },
      {
        input: 'add(0, 7)',
        expectedOutput: '7',
        description: 'Should handle zero'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t5-ex02',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Test Fixture Creation',
    difficulty: 1,
    description: 'Create reusable test fixtures for user data. Learn how to set up common test data that can be used across multiple tests.',
    starterCode: `interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// TODO: Create test fixtures
// Create a function createTestUser() that generates a user with default values
// Allow overriding specific properties
function createTestUser(overrides?: Partial<User>): User {
  // Your implementation here
}

// TODO: Write tests using the fixture
describe('User Fixtures', () => {
  // Test: should create default user
  // Test: should override specific properties
});`,
    solution: `interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

// Test fixture factory function
function createTestUser(overrides?: Partial<User>): User {
  return {
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    ...overrides
  };
}

// Tests using the fixture
describe('User Fixtures', () => {
  test('should create default user', () => {
    const user = createTestUser();
    expect(user.id).toBe('123');
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
    expect(user.role).toBe('user');
  });

  test('should override specific properties', () => {
    const admin = createTestUser({ role: 'admin', name: 'Admin User' });
    expect(admin.role).toBe('admin');
    expect(admin.name).toBe('Admin User');
    expect(admin.email).toBe('test@example.com'); // default value
  });

  test('should create multiple unique users', () => {
    const user1 = createTestUser({ id: '1', email: 'user1@example.com' });
    const user2 = createTestUser({ id: '2', email: 'user2@example.com' });
    expect(user1.id).not.toBe(user2.id);
    expect(user1.email).not.toBe(user2.email);
  });
});`,
    hints: [
      'Use the spread operator (...) to merge default values with overrides',
      'Partial<User> allows optional override of any User property',
      'Test fixtures reduce code duplication across tests',
      'Factory functions make it easy to create test data with sensible defaults'
    ],
    testCases: [
      {
        input: 'createTestUser()',
        expectedOutput: '{ id: "123", name: "Test User", email: "test@example.com", role: "user" }',
        description: 'Should create user with default values'
      },
      {
        input: 'createTestUser({ role: "admin" })',
        expectedOutput: '{ id: "123", name: "Test User", email: "test@example.com", role: "admin" }',
        description: 'Should override role while keeping other defaults'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t5-ex03',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Bug Report Template Generator',
    difficulty: 1,
    description: 'Create a function that generates structured bug report templates. Learn how to standardize bug reporting for QA processes.',
    starterCode: `interface BugReport {
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  stepsToReproduce: string[];
  expectedBehavior: string;
  actualBehavior: string;
  environment: string;
}

// TODO: Implement the bug report generator
function generateBugReport(data: Partial<BugReport>): string {
  // Return a formatted markdown string
}

// TODO: Write tests for the generator
describe('Bug Report Generator', () => {
  // Test: should generate complete report
  // Test: should handle missing optional fields
});`,
    solution: `interface BugReport {
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  stepsToReproduce: string[];
  expectedBehavior: string;
  actualBehavior: string;
  environment: string;
}

// Bug report generator
function generateBugReport(data: Partial<BugReport>): string {
  const report = \`# Bug Report: \${data.title || 'Untitled'}

**Severity:** \${data.severity || 'medium'}

## Description
\${data.description || 'No description provided'}

## Steps to Reproduce
\${data.stepsToReproduce?.map((step, i) => \`\${i + 1}. \${step}\`).join('\\n') || 'No steps provided'}

## Expected Behavior
\${data.expectedBehavior || 'Not specified'}

## Actual Behavior
\${data.actualBehavior || 'Not specified'}

## Environment
\${data.environment || 'Not specified'}
\`;
  return report;
}

// Tests
describe('Bug Report Generator', () => {
  test('should generate complete report', () => {
    const report = generateBugReport({
      title: 'Login fails with valid credentials',
      severity: 'high',
      description: 'Users cannot log in',
      stepsToReproduce: ['Navigate to login page', 'Enter valid credentials', 'Click submit'],
      expectedBehavior: 'User should be logged in',
      actualBehavior: 'Error message displayed',
      environment: 'Chrome 120, Windows 11'
    });

    expect(report).toContain('# Bug Report: Login fails with valid credentials');
    expect(report).toContain('**Severity:** high');
    expect(report).toContain('1. Navigate to login page');
  });

  test('should handle missing optional fields', () => {
    const report = generateBugReport({ title: 'Test Bug' });
    expect(report).toContain('# Bug Report: Test Bug');
    expect(report).toContain('**Severity:** medium');
    expect(report).toContain('No description provided');
  });
});`,
    hints: [
      'Use template literals for formatted string output',
      'Provide default values for missing fields',
      'Use array.map() to format the steps to reproduce list',
      'Check if fields exist before accessing them with optional chaining (?.)'
    ],
    testCases: [
      {
        input: 'generateBugReport({ title: "Test Bug", severity: "critical" })',
        expectedOutput: 'String containing "# Bug Report: Test Bug" and "**Severity:** critical"',
        description: 'Should generate report with provided fields'
      },
      {
        input: 'generateBugReport({})',
        expectedOutput: 'String containing default values',
        description: 'Should handle empty input with defaults'
      }
    ],
    language: 'typescript'
  },

  // D2 Exercises (3)
  {
    id: 'cs404-t5-ex04',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Testing Async Functions with Jest',
    difficulty: 2,
    description: 'Write tests for asynchronous functions using async/await. Learn to test promises and handle asynchronous behavior in tests.',
    starterCode: `// Async function to fetch user data
async function fetchUser(id: string): Promise<{ id: string; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: \`User \${id}\` });
    }, 100);
  });
}

// TODO: Write async tests
describe('Async Functions', () => {
  // Test: should fetch user successfully
  // Test: should handle multiple async calls
  // Use async/await pattern
});`,
    solution: `// Async function to fetch user data
async function fetchUser(id: string): Promise<{ id: string; name: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, name: \`User \${id}\` });
    }, 100);
  });
}

// Complete async test suite
describe('Async Functions', () => {
  test('should fetch user successfully', async () => {
    const user = await fetchUser('123');
    expect(user.id).toBe('123');
    expect(user.name).toBe('User 123');
  });

  test('should handle multiple async calls', async () => {
    const users = await Promise.all([
      fetchUser('1'),
      fetchUser('2'),
      fetchUser('3')
    ]);

    expect(users).toHaveLength(3);
    expect(users[0].id).toBe('1');
    expect(users[1].id).toBe('2');
    expect(users[2].id).toBe('3');
  });

  test('should resolve promises correctly', async () => {
    await expect(fetchUser('999')).resolves.toEqual({
      id: '999',
      name: 'User 999'
    });
  });

  test('should complete within timeout', async () => {
    const start = Date.now();
    await fetchUser('123');
    const duration = Date.now() - start;
    expect(duration).toBeGreaterThanOrEqual(100);
    expect(duration).toBeLessThan(200);
  }, 300);
});`,
    hints: [
      'Mark test functions as async when testing async code',
      'Use await keyword to wait for promises to resolve',
      'Use expect().resolves for promise matchers',
      'Promise.all() can test multiple async operations in parallel'
    ],
    testCases: [
      {
        input: 'await fetchUser("123")',
        expectedOutput: '{ id: "123", name: "User 123" }',
        description: 'Should return user object with correct data'
      },
      {
        input: 'await Promise.all([fetchUser("1"), fetchUser("2")])',
        expectedOutput: 'Array with 2 user objects',
        description: 'Should handle multiple async calls'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t5-ex05',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Snapshot Testing for UI Components',
    difficulty: 2,
    description: 'Implement snapshot testing for UI components. Learn how to detect unintended UI changes automatically.',
    starterCode: `interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

// Simple button renderer
function renderButton(props: ButtonProps): string {
  const className = \`btn btn-\${props.variant}\${props.disabled ? ' btn-disabled' : ''}\`;
  return \`<button class="\${className}">\${props.label}</button>\`;
}

// TODO: Implement snapshot tests
describe('Button Snapshots', () => {
  // Test: should match snapshot for primary button
  // Test: should match snapshot for disabled button
  // Use toMatchInlineSnapshot() or toMatchSnapshot()
});`,
    solution: `interface ButtonProps {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

// Simple button renderer
function renderButton(props: ButtonProps): string {
  const className = \`btn btn-\${props.variant}\${props.disabled ? ' btn-disabled' : ''}\`;
  return \`<button class="\${className}">\${props.label}</button>\`;
}

// Snapshot tests
describe('Button Snapshots', () => {
  test('should match snapshot for primary button', () => {
    const output = renderButton({ label: 'Click me', variant: 'primary' });
    expect(output).toMatchInlineSnapshot(
      \`"<button class="btn btn-primary">Click me</button>"\`
    );
  });

  test('should match snapshot for secondary button', () => {
    const output = renderButton({ label: 'Cancel', variant: 'secondary' });
    expect(output).toMatchInlineSnapshot(
      \`"<button class="btn btn-secondary">Cancel</button>"\`
    );
  });

  test('should match snapshot for disabled button', () => {
    const output = renderButton({
      label: 'Submit',
      variant: 'primary',
      disabled: true
    });
    expect(output).toMatchInlineSnapshot(
      \`"<button class="btn btn-primary btn-disabled">Submit</button>"\`
    );
  });

  test('should match snapshot for danger button', () => {
    const output = renderButton({ label: 'Delete', variant: 'danger' });
    expect(output).toMatchInlineSnapshot(
      \`"<button class="btn btn-danger">Delete</button>"\`
    );
  });
});`,
    hints: [
      'Snapshot tests capture the output and compare it on subsequent runs',
      'Use toMatchInlineSnapshot() to store snapshots directly in the test file',
      'Snapshots help detect unintended UI changes',
      'Update snapshots with jest -u when changes are intentional'
    ],
    testCases: [
      {
        input: 'renderButton({ label: "Click me", variant: "primary" })',
        expectedOutput: '<button class="btn btn-primary">Click me</button>',
        description: 'Should render primary button correctly'
      },
      {
        input: 'renderButton({ label: "Submit", variant: "primary", disabled: true })',
        expectedOutput: '<button class="btn btn-primary btn-disabled">Submit</button>',
        description: 'Should render disabled button with correct classes'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t5-ex06',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Code Coverage Report Analysis',
    difficulty: 2,
    description: 'Analyze code coverage and write tests to improve coverage. Learn to identify untested code paths and edge cases.',
    starterCode: `// Function with multiple branches
function calculateDiscount(price: number, customerType: 'regular' | 'premium' | 'vip'): number {
  if (price <= 0) {
    throw new Error('Price must be positive');
  }

  let discount = 0;

  if (customerType === 'premium') {
    discount = price * 0.1;
  } else if (customerType === 'vip') {
    discount = price * 0.2;
  }

  if (price > 1000) {
    discount += 50;
  }

  return discount;
}

// TODO: Write comprehensive tests to achieve 100% coverage
// Cover all branches: regular/premium/vip customers
// Cover edge cases: price <= 0, price > 1000
describe('Calculate Discount', () => {
  // Add tests here
});`,
    solution: `// Function with multiple branches
function calculateDiscount(price: number, customerType: 'regular' | 'premium' | 'vip'): number {
  if (price <= 0) {
    throw new Error('Price must be positive');
  }

  let discount = 0;

  if (customerType === 'premium') {
    discount = price * 0.1;
  } else if (customerType === 'vip') {
    discount = price * 0.2;
  }

  if (price > 1000) {
    discount += 50;
  }

  return discount;
}

// Comprehensive test suite with 100% coverage
describe('Calculate Discount', () => {
  describe('Error cases', () => {
    test('should throw error for zero price', () => {
      expect(() => calculateDiscount(0, 'regular')).toThrow('Price must be positive');
    });

    test('should throw error for negative price', () => {
      expect(() => calculateDiscount(-10, 'regular')).toThrow('Price must be positive');
    });
  });

  describe('Regular customers', () => {
    test('should return 0 discount for regular customer', () => {
      expect(calculateDiscount(100, 'regular')).toBe(0);
    });

    test('should return 50 bonus for regular customer with price > 1000', () => {
      expect(calculateDiscount(1500, 'regular')).toBe(50);
    });
  });

  describe('Premium customers', () => {
    test('should return 10% discount for premium customer', () => {
      expect(calculateDiscount(100, 'premium')).toBe(10);
    });

    test('should return 10% + 50 bonus for premium customer with price > 1000', () => {
      expect(calculateDiscount(1500, 'premium')).toBe(200); // 150 + 50
    });
  });

  describe('VIP customers', () => {
    test('should return 20% discount for vip customer', () => {
      expect(calculateDiscount(100, 'vip')).toBe(20);
    });

    test('should return 20% + 50 bonus for vip customer with price > 1000', () => {
      expect(calculateDiscount(1500, 'vip')).toBe(350); // 300 + 50
    });
  });
});`,
    hints: [
      'Test each branch condition separately (if/else statements)',
      'Test boundary conditions (price = 0, price = 1000, price = 1001)',
      'Test error cases with expect(() => fn()).toThrow()',
      'Organize tests with nested describe() blocks for clarity'
    ],
    testCases: [
      {
        input: 'calculateDiscount(100, "regular")',
        expectedOutput: '0',
        description: 'Regular customer gets no discount'
      },
      {
        input: 'calculateDiscount(100, "premium")',
        expectedOutput: '10',
        description: 'Premium customer gets 10% discount'
      },
      {
        input: 'calculateDiscount(1500, "vip")',
        expectedOutput: '350',
        description: 'VIP customer gets 20% + 50 bonus'
      }
    ],
    language: 'typescript'
  },

  // D3 Exercises (4)
  {
    id: 'cs404-t5-ex07',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Mocking Dependencies with Jest',
    difficulty: 3,
    description: 'Learn to mock external dependencies and isolate units under test. Practice using jest.mock() and mock functions.',
    starterCode: `// External API module
const API = {
  fetchUser: async (id: string) => {
    // Actual implementation would call external API
    throw new Error('Should be mocked in tests');
  }
};

// Service that uses the API
class UserService {
  async getUserName(id: string): Promise<string> {
    const user = await API.fetchUser(id);
    return user.name;
  }

  async isAdmin(id: string): Promise<boolean> {
    const user = await API.fetchUser(id);
    return user.role === 'admin';
  }
}

// TODO: Write tests with mocked API
// Mock the API.fetchUser function
// Test UserService methods without calling real API
describe('UserService with Mocks', () => {
  // Setup mocks and tests here
});`,
    solution: `// External API module
const API = {
  fetchUser: async (id: string) => {
    // Actual implementation would call external API
    throw new Error('Should be mocked in tests');
  }
};

// Service that uses the API
class UserService {
  async getUserName(id: string): Promise<string> {
    const user = await API.fetchUser(id);
    return user.name;
  }

  async isAdmin(id: string): Promise<boolean> {
    const user = await API.fetchUser(id);
    return user.role === 'admin';
  }
}

// Tests with mocked dependencies
describe('UserService with Mocks', () => {
  let service: UserService;
  let mockFetchUser: jest.SpyInstance;

  beforeEach(() => {
    service = new UserService();
    // Mock the API.fetchUser function
    mockFetchUser = jest.spyOn(API, 'fetchUser');
  });

  afterEach(() => {
    // Restore original implementation
    mockFetchUser.mockRestore();
  });

  describe('getUserName', () => {
    test('should return user name from API', async () => {
      mockFetchUser.mockResolvedValue({ id: '1', name: 'John Doe', role: 'user' });

      const name = await service.getUserName('1');

      expect(name).toBe('John Doe');
      expect(mockFetchUser).toHaveBeenCalledWith('1');
      expect(mockFetchUser).toHaveBeenCalledTimes(1);
    });

    test('should handle API errors', async () => {
      mockFetchUser.mockRejectedValue(new Error('API Error'));

      await expect(service.getUserName('1')).rejects.toThrow('API Error');
    });
  });

  describe('isAdmin', () => {
    test('should return true for admin user', async () => {
      mockFetchUser.mockResolvedValue({ id: '1', name: 'Admin', role: 'admin' });

      const isAdmin = await service.isAdmin('1');

      expect(isAdmin).toBe(true);
    });

    test('should return false for regular user', async () => {
      mockFetchUser.mockResolvedValue({ id: '2', name: 'User', role: 'user' });

      const isAdmin = await service.isAdmin('2');

      expect(isAdmin).toBe(false);
    });
  });

  test('should verify mock was called with correct arguments', async () => {
    mockFetchUser.mockResolvedValue({ id: '123', name: 'Test', role: 'user' });

    await service.getUserName('123');

    expect(mockFetchUser).toHaveBeenCalledWith('123');
  });
});`,
    hints: [
      'Use jest.spyOn() to mock methods on existing objects',
      'mockResolvedValue() sets the resolved value for async functions',
      'mockRejectedValue() simulates errors from async functions',
      'Use beforeEach() and afterEach() to set up and clean up mocks'
    ],
    testCases: [
      {
        input: 'service.getUserName("1") with mocked API returning { name: "John" }',
        expectedOutput: '"John"',
        description: 'Should return mocked user name'
      },
      {
        input: 'service.isAdmin("1") with mocked API returning { role: "admin" }',
        expectedOutput: 'true',
        description: 'Should identify admin users'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t5-ex08',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Integration Test for API Endpoints',
    difficulty: 3,
    description: 'Write integration tests for REST API endpoints. Test the full request/response cycle including routing and data handling.',
    starterCode: `// Simple in-memory store
const users: { [id: string]: { id: string; name: string; email: string } } = {};

// API endpoint handlers
const api = {
  createUser: (req: { body: { name: string; email: string } }) => {
    const id = Math.random().toString(36).substr(2, 9);
    users[id] = { id, ...req.body };
    return { status: 201, data: users[id] };
  },

  getUser: (req: { params: { id: string } }) => {
    const user = users[req.params.id];
    if (!user) {
      return { status: 404, error: 'User not found' };
    }
    return { status: 200, data: user };
  },

  updateUser: (req: { params: { id: string }; body: Partial<{ name: string; email: string }> }) => {
    const user = users[req.params.id];
    if (!user) {
      return { status: 404, error: 'User not found' };
    }
    users[req.params.id] = { ...user, ...req.body };
    return { status: 200, data: users[req.params.id] };
  }
};

// TODO: Write integration tests for the API
describe('User API Integration Tests', () => {
  beforeEach(() => {
    // Clear users before each test
  });

  // Test: should create a new user
  // Test: should get user by id
  // Test: should return 404 for non-existent user
  // Test: should update user
});`,
    solution: `// Simple in-memory store
const users: { [id: string]: { id: string; name: string; email: string } } = {};

// API endpoint handlers
const api = {
  createUser: (req: { body: { name: string; email: string } }) => {
    const id = Math.random().toString(36).substr(2, 9);
    users[id] = { id, ...req.body };
    return { status: 201, data: users[id] };
  },

  getUser: (req: { params: { id: string } }) => {
    const user = users[req.params.id];
    if (!user) {
      return { status: 404, error: 'User not found' };
    }
    return { status: 200, data: user };
  },

  updateUser: (req: { params: { id: string }; body: Partial<{ name: string; email: string }> }) => {
    const user = users[req.params.id];
    if (!user) {
      return { status: 404, error: 'User not found' };
    }
    users[req.params.id] = { ...user, ...req.body };
    return { status: 200, data: users[req.params.id] };
  }
};

// Integration tests
describe('User API Integration Tests', () => {
  beforeEach(() => {
    // Clear users before each test
    Object.keys(users).forEach(key => delete users[key]);
  });

  describe('POST /users', () => {
    test('should create a new user', () => {
      const response = api.createUser({
        body: { name: 'John Doe', email: 'john@example.com' }
      });

      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('id');
      expect(response.data.name).toBe('John Doe');
      expect(response.data.email).toBe('john@example.com');
    });

    test('should store created user', () => {
      const createResponse = api.createUser({
        body: { name: 'Jane Doe', email: 'jane@example.com' }
      });

      const getResponse = api.getUser({ params: { id: createResponse.data.id } });

      expect(getResponse.status).toBe(200);
      expect(getResponse.data).toEqual(createResponse.data);
    });
  });

  describe('GET /users/:id', () => {
    test('should get user by id', () => {
      const createResponse = api.createUser({
        body: { name: 'Test User', email: 'test@example.com' }
      });

      const response = api.getUser({ params: { id: createResponse.data.id } });

      expect(response.status).toBe(200);
      expect(response.data.id).toBe(createResponse.data.id);
      expect(response.data.name).toBe('Test User');
    });

    test('should return 404 for non-existent user', () => {
      const response = api.getUser({ params: { id: 'nonexistent' } });

      expect(response.status).toBe(404);
      expect(response.error).toBe('User not found');
    });
  });

  describe('PUT /users/:id', () => {
    test('should update user', () => {
      const createResponse = api.createUser({
        body: { name: 'Original Name', email: 'original@example.com' }
      });

      const updateResponse = api.updateUser({
        params: { id: createResponse.data.id },
        body: { name: 'Updated Name' }
      });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.data.name).toBe('Updated Name');
      expect(updateResponse.data.email).toBe('original@example.com');
    });

    test('should return 404 when updating non-existent user', () => {
      const response = api.updateUser({
        params: { id: 'nonexistent' },
        body: { name: 'New Name' }
      });

      expect(response.status).toBe(404);
      expect(response.error).toBe('User not found');
    });
  });
});`,
    hints: [
      'Integration tests verify that multiple components work together',
      'Use beforeEach() to reset state between tests',
      'Test the complete flow: create, retrieve, update',
      'Test both success and error cases (404, validation errors)'
    ],
    testCases: [
      {
        input: 'api.createUser({ body: { name: "John", email: "john@example.com" } })',
        expectedOutput: '{ status: 201, data: { id: "...", name: "John", email: "john@example.com" } }',
        description: 'Should create user and return 201 status'
      },
      {
        input: 'api.getUser({ params: { id: "nonexistent" } })',
        expectedOutput: '{ status: 404, error: "User not found" }',
        description: 'Should return 404 for missing user'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t5-ex09',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Test-Driven Development (TDD) Practice',
    difficulty: 3,
    description: 'Practice TDD by writing tests first, then implementing code to make them pass. Build a shopping cart with TDD methodology.',
    starterCode: `interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// TODO: Implement ShoppingCart class using TDD
// First write the tests below, then implement the class
class ShoppingCart {
  // Your implementation here
}

// TODO: Write tests FIRST following TDD
describe('ShoppingCart TDD', () => {
  // Test: should start with empty cart
  // Test: should add item to cart
  // Test: should increase quantity if item exists
  // Test: should calculate total
  // Test: should remove item from cart
  // Test: should apply discount
});`,
    solution: `interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

// Implementation (written AFTER tests)
class ShoppingCart {
  private items: CartItem[] = [];
  private discountPercent: number = 0;

  addItem(item: Omit<CartItem, 'quantity'>, quantity: number = 1): void {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ ...item, quantity });
    }
  }

  removeItem(id: string): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotal(): number {
    const subtotal = this.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    return subtotal * (1 - this.discountPercent / 100);
  }

  applyDiscount(percent: number): void {
    this.discountPercent = percent;
  }

  clear(): void {
    this.items = [];
    this.discountPercent = 0;
  }
}

// Tests (written FIRST in TDD)
describe('ShoppingCart TDD', () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    cart = new ShoppingCart();
  });

  test('should start with empty cart', () => {
    expect(cart.getItems()).toEqual([]);
    expect(cart.getTotal()).toBe(0);
  });

  test('should add item to cart', () => {
    cart.addItem({ id: '1', name: 'Apple', price: 1.5 }, 2);

    const items = cart.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('1');
    expect(items[0].quantity).toBe(2);
  });

  test('should increase quantity if item exists', () => {
    cart.addItem({ id: '1', name: 'Apple', price: 1.5 }, 2);
    cart.addItem({ id: '1', name: 'Apple', price: 1.5 }, 3);

    const items = cart.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(5);
  });

  test('should calculate total', () => {
    cart.addItem({ id: '1', name: 'Apple', price: 1.5 }, 2);
    cart.addItem({ id: '2', name: 'Banana', price: 0.5 }, 3);

    expect(cart.getTotal()).toBe(4.5); // 1.5*2 + 0.5*3 = 4.5
  });

  test('should remove item from cart', () => {
    cart.addItem({ id: '1', name: 'Apple', price: 1.5 }, 2);
    cart.addItem({ id: '2', name: 'Banana', price: 0.5 }, 3);

    cart.removeItem('1');

    const items = cart.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe('2');
  });

  test('should apply discount', () => {
    cart.addItem({ id: '1', name: 'Apple', price: 10 }, 1);
    cart.applyDiscount(10); // 10% discount

    expect(cart.getTotal()).toBe(9);
  });

  test('should handle multiple operations', () => {
    cart.addItem({ id: '1', name: 'Apple', price: 2 }, 5);
    cart.addItem({ id: '2', name: 'Banana', price: 1 }, 10);
    cart.removeItem('1');
    cart.applyDiscount(20);

    expect(cart.getTotal()).toBe(8); // (10 * 1) * 0.8 = 8
  });
});`,
    hints: [
      'TDD cycle: Write test -> Watch it fail -> Write minimal code -> Pass test -> Refactor',
      'Write tests that describe the desired behavior before implementation',
      'Start with simple tests and gradually add complexity',
      'Each test should verify one specific behavior'
    ],
    testCases: [
      {
        input: 'cart.addItem({ id: "1", name: "Apple", price: 1.5 }, 2); cart.getTotal()',
        expectedOutput: '3',
        description: 'Should calculate correct total'
      },
      {
        input: 'cart.addItem({ id: "1", name: "Apple", price: 10 }, 1); cart.applyDiscount(10); cart.getTotal()',
        expectedOutput: '9',
        description: 'Should apply discount correctly'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t5-ex10',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Regression Test Suite',
    difficulty: 3,
    description: 'Create a regression test suite to prevent previously fixed bugs from reoccurring. Learn to document and test bug fixes.',
    starterCode: `// Date utility function with historical bugs
class DateUtils {
  // Bug fix #1: Handle month boundaries correctly
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // Bug fix #2: Handle leap years
  static isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  // Bug fix #3: Calculate business days (excluding weekends)
  static addBusinessDays(date: Date, days: number): Date {
    const result = new Date(date);
    let added = 0;

    while (added < days) {
      result.setDate(result.getDate() + 1);
      const dayOfWeek = result.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        added++;
      }
    }

    return result;
  }
}

// TODO: Create regression tests for each historical bug
describe('DateUtils Regression Tests', () => {
  // Document each bug and create test to prevent regression
});`,
    solution: `// Date utility function with historical bugs
class DateUtils {
  // Bug fix #1: Handle month boundaries correctly
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // Bug fix #2: Handle leap years
  static isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  // Bug fix #3: Calculate business days (excluding weekends)
  static addBusinessDays(date: Date, days: number): Date {
    const result = new Date(date);
    let added = 0;

    while (added < days) {
      result.setDate(result.getDate() + 1);
      const dayOfWeek = result.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        added++;
      }
    }

    return result;
  }
}

// Regression tests for historical bugs
describe('DateUtils Regression Tests', () => {
  describe('Bug #1: Month boundary handling', () => {
    // Original bug: Adding days at end of month caused incorrect dates
    test('should correctly add days across month boundary', () => {
      const jan31 = new Date(2024, 0, 31); // January 31
      const result = DateUtils.addDays(jan31, 1);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(1);
    });

    test('should handle end of year boundary', () => {
      const dec31 = new Date(2024, 11, 31); // December 31
      const result = DateUtils.addDays(dec31, 1);
      expect(result.getFullYear()).toBe(2025);
      expect(result.getMonth()).toBe(0); // January
      expect(result.getDate()).toBe(1);
    });
  });

  describe('Bug #2: Leap year calculation', () => {
    // Original bug: Only checked divisibility by 4, not century exceptions
    test('should correctly identify leap years', () => {
      expect(DateUtils.isLeapYear(2024)).toBe(true);  // Divisible by 4
      expect(DateUtils.isLeapYear(2000)).toBe(true);  // Divisible by 400
    });

    test('should correctly identify non-leap years', () => {
      expect(DateUtils.isLeapYear(2023)).toBe(false); // Not divisible by 4
      expect(DateUtils.isLeapYear(1900)).toBe(false); // Divisible by 100 but not 400
      expect(DateUtils.isLeapYear(2100)).toBe(false); // Century year exception
    });
  });

  describe('Bug #3: Business days calculation', () => {
    // Original bug: Didn't skip weekends correctly
    test('should skip weekends when adding business days', () => {
      const friday = new Date(2024, 0, 5); // Friday, January 5, 2024
      const result = DateUtils.addBusinessDays(friday, 1);

      expect(result.getDay()).toBe(1); // Monday
      expect(result.getDate()).toBe(8); // January 8
    });

    test('should handle multiple weeks', () => {
      const monday = new Date(2024, 0, 8); // Monday, January 8, 2024
      const result = DateUtils.addBusinessDays(monday, 5);

      expect(result.getDate()).toBe(15); // Next Monday (skipped weekend)
    });

    test('should handle starting from weekend', () => {
      const saturday = new Date(2024, 0, 6); // Saturday, January 6, 2024
      const result = DateUtils.addBusinessDays(saturday, 1);

      expect(result.getDay()).toBe(1); // Should be Monday
    });
  });

  describe('Integration regression tests', () => {
    test('should handle leap year February correctly', () => {
      const feb28_2024 = new Date(2024, 1, 28); // Feb 28 in leap year
      const result = DateUtils.addDays(feb28_2024, 1);
      expect(result.getDate()).toBe(29); // Should be Feb 29
    });
  });
});`,
    hints: [
      'Regression tests prevent old bugs from coming back',
      'Document each bug with comments explaining the original issue',
      'Test edge cases that previously caused failures',
      'Group related regression tests with describe() blocks'
    ],
    testCases: [
      {
        input: 'DateUtils.addDays(new Date(2024, 0, 31), 1)',
        expectedOutput: 'Date with month=1 (February) and date=1',
        description: 'Should handle month boundary correctly'
      },
      {
        input: 'DateUtils.isLeapYear(1900)',
        expectedOutput: 'false',
        description: 'Should correctly identify century year exception'
      }
    ],
    language: 'typescript'
  },

  // D4 Exercises (3)
  {
    id: 'cs404-t5-ex11',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Testing React Components with Testing Library',
    difficulty: 4,
    description: 'Write comprehensive tests for React components using Testing Library. Learn to test user interactions and component behavior.',
    starterCode: `// Simple Counter component
interface CounterProps {
  initialValue?: number;
  step?: number;
  onCountChange?: (count: number) => void;
}

function Counter({ initialValue = 0, step = 1, onCountChange }: CounterProps) {
  const [count, setCount] = React.useState(initialValue);

  const increment = () => {
    const newCount = count + step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const decrement = () => {
    const newCount = count - step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const reset = () => {
    setCount(initialValue);
    onCountChange?.(initialValue);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// TODO: Write comprehensive component tests
describe('Counter Component', () => {
  // Test: should render with initial value
  // Test: should increment count when button clicked
  // Test: should decrement count
  // Test: should reset to initial value
  // Test: should call onCountChange callback
  // Test: should use custom step value
});`,
    solution: `// Simple Counter component
interface CounterProps {
  initialValue?: number;
  step?: number;
  onCountChange?: (count: number) => void;
}

function Counter({ initialValue = 0, step = 1, onCountChange }: CounterProps) {
  const [count, setCount] = React.useState(initialValue);

  const increment = () => {
    const newCount = count + step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const decrement = () => {
    const newCount = count - step;
    setCount(newCount);
    onCountChange?.(newCount);
  };

  const reset = () => {
    setCount(initialValue);
    onCountChange?.(initialValue);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// Comprehensive component tests
describe('Counter Component', () => {
  test('should render with default initial value', () => {
    const { getByText } = render(<Counter />);
    expect(getByText('Count: 0')).toBeInTheDocument();
  });

  test('should render with custom initial value', () => {
    const { getByText } = render(<Counter initialValue={10} />);
    expect(getByText('Count: 10')).toBeInTheDocument();
  });

  test('should increment count when button clicked', () => {
    const { getByText } = render(<Counter />);
    const incrementButton = getByText('Increment');

    fireEvent.click(incrementButton);
    expect(getByText('Count: 1')).toBeInTheDocument();

    fireEvent.click(incrementButton);
    expect(getByText('Count: 2')).toBeInTheDocument();
  });

  test('should decrement count when button clicked', () => {
    const { getByText } = render(<Counter initialValue={5} />);
    const decrementButton = getByText('Decrement');

    fireEvent.click(decrementButton);
    expect(getByText('Count: 4')).toBeInTheDocument();
  });

  test('should reset to initial value', () => {
    const { getByText } = render(<Counter initialValue={10} />);

    fireEvent.click(getByText('Increment'));
    fireEvent.click(getByText('Increment'));
    expect(getByText('Count: 12')).toBeInTheDocument();

    fireEvent.click(getByText('Reset'));
    expect(getByText('Count: 10')).toBeInTheDocument();
  });

  test('should call onCountChange callback', () => {
    const mockCallback = jest.fn();
    const { getByText } = render(<Counter onCountChange={mockCallback} />);

    fireEvent.click(getByText('Increment'));
    expect(mockCallback).toHaveBeenCalledWith(1);

    fireEvent.click(getByText('Decrement'));
    expect(mockCallback).toHaveBeenCalledWith(0);

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });

  test('should use custom step value', () => {
    const { getByText } = render(<Counter initialValue={0} step={5} />);

    fireEvent.click(getByText('Increment'));
    expect(getByText('Count: 5')).toBeInTheDocument();

    fireEvent.click(getByText('Increment'));
    expect(getByText('Count: 10')).toBeInTheDocument();

    fireEvent.click(getByText('Decrement'));
    expect(getByText('Count: 5')).toBeInTheDocument();
  });

  test('should handle multiple interactions', () => {
    const mockCallback = jest.fn();
    const { getByText } = render(
      <Counter initialValue={100} step={10} onCountChange={mockCallback} />
    );

    fireEvent.click(getByText('Increment')); // 110
    fireEvent.click(getByText('Increment')); // 120
    fireEvent.click(getByText('Decrement')); // 110
    fireEvent.click(getByText('Reset'));     // 100

    expect(getByText('Count: 100')).toBeInTheDocument();
    expect(mockCallback).toHaveBeenCalledTimes(4);
    expect(mockCallback).toHaveBeenLastCalledWith(100);
  });
});`,
    hints: [
      'Use render() from Testing Library to render components',
      'Use getByText() to find elements by their text content',
      'Use fireEvent.click() to simulate user clicks',
      'Mock callback functions with jest.fn() to verify they are called'
    ],
    testCases: [
      {
        input: 'Click increment button once',
        expectedOutput: 'Count: 1 displayed',
        description: 'Should increment count on button click'
      },
      {
        input: 'Click increment twice, then reset',
        expectedOutput: 'Count: 0 displayed',
        description: 'Should reset to initial value'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t5-ex12',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Database Integration Test Setup',
    difficulty: 4,
    description: 'Set up and write integration tests for database operations. Learn to test CRUD operations with a test database.',
    starterCode: `// Simple in-memory database
class Database {
  private data: Map<string, any> = new Map();

  async connect(): Promise<void> {
    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  async disconnect(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  async insert(table: string, record: any): Promise<string> {
    const id = Math.random().toString(36).substr(2, 9);
    const key = \`\${table}:\${id}\`;
    this.data.set(key, { id, ...record });
    return id;
  }

  async findById(table: string, id: string): Promise<any | null> {
    return this.data.get(\`\${table}:\${id}\`) || null;
  }

  async update(table: string, id: string, updates: any): Promise<boolean> {
    const key = \`\${table}:\${id}\`;
    const existing = this.data.get(key);
    if (!existing) return false;
    this.data.set(key, { ...existing, ...updates });
    return true;
  }

  async delete(table: string, id: string): Promise<boolean> {
    return this.data.delete(\`\${table}:\${id}\`);
  }

  async clear(): Promise<void> {
    this.data.clear();
  }
}

// TODO: Write database integration tests
describe('Database Integration Tests', () => {
  let db: Database;

  // Setup: connect before all tests
  // Cleanup: clear after each test, disconnect after all

  // Test: should insert and retrieve record
  // Test: should update existing record
  // Test: should delete record
  // Test: should return null for non-existent record
  // Test: should handle concurrent operations
});`,
    solution: `// Simple in-memory database
class Database {
  private data: Map<string, any> = new Map();

  async connect(): Promise<void> {
    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  async disconnect(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  async insert(table: string, record: any): Promise<string> {
    const id = Math.random().toString(36).substr(2, 9);
    const key = \`\${table}:\${id}\`;
    this.data.set(key, { id, ...record });
    return id;
  }

  async findById(table: string, id: string): Promise<any | null> {
    return this.data.get(\`\${table}:\${id}\`) || null;
  }

  async update(table: string, id: string, updates: any): Promise<boolean> {
    const key = \`\${table}:\${id}\`;
    const existing = this.data.get(key);
    if (!existing) return false;
    this.data.set(key, { ...existing, ...updates });
    return true;
  }

  async delete(table: string, id: string): Promise<boolean> {
    return this.data.delete(\`\${table}:\${id}\`);
  }

  async clear(): Promise<void> {
    this.data.clear();
  }
}

// Database integration tests
describe('Database Integration Tests', () => {
  let db: Database;

  beforeAll(async () => {
    db = new Database();
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  afterEach(async () => {
    await db.clear();
  });

  describe('CRUD Operations', () => {
    test('should insert and retrieve record', async () => {
      const id = await db.insert('users', { name: 'John', email: 'john@example.com' });

      const user = await db.findById('users', id);

      expect(user).not.toBeNull();
      expect(user.id).toBe(id);
      expect(user.name).toBe('John');
      expect(user.email).toBe('john@example.com');
    });

    test('should update existing record', async () => {
      const id = await db.insert('users', { name: 'Jane', email: 'jane@example.com' });

      const updated = await db.update('users', id, { name: 'Jane Smith' });
      expect(updated).toBe(true);

      const user = await db.findById('users', id);
      expect(user.name).toBe('Jane Smith');
      expect(user.email).toBe('jane@example.com'); // unchanged
    });

    test('should delete record', async () => {
      const id = await db.insert('users', { name: 'Bob' });

      const deleted = await db.delete('users', id);
      expect(deleted).toBe(true);

      const user = await db.findById('users', id);
      expect(user).toBeNull();
    });

    test('should return null for non-existent record', async () => {
      const user = await db.findById('users', 'nonexistent');
      expect(user).toBeNull();
    });

    test('should return false when updating non-existent record', async () => {
      const updated = await db.update('users', 'nonexistent', { name: 'Test' });
      expect(updated).toBe(false);
    });

    test('should return false when deleting non-existent record', async () => {
      const deleted = await db.delete('users', 'nonexistent');
      expect(deleted).toBe(false);
    });
  });

  describe('Multiple records', () => {
    test('should handle multiple inserts', async () => {
      const id1 = await db.insert('users', { name: 'User 1' });
      const id2 = await db.insert('users', { name: 'User 2' });
      const id3 = await db.insert('users', { name: 'User 3' });

      const user1 = await db.findById('users', id1);
      const user2 = await db.findById('users', id2);
      const user3 = await db.findById('users', id3);

      expect(user1.name).toBe('User 1');
      expect(user2.name).toBe('User 2');
      expect(user3.name).toBe('User 3');
    });

    test('should isolate different tables', async () => {
      const userId = await db.insert('users', { name: 'John' });
      const productId = await db.insert('products', { name: 'Widget' });

      const user = await db.findById('users', userId);
      const product = await db.findById('products', productId);

      expect(user.name).toBe('John');
      expect(product.name).toBe('Widget');

      // Should not find user in products table
      const notFound = await db.findById('products', userId);
      expect(notFound).toBeNull();
    });
  });

  describe('Concurrent operations', () => {
    test('should handle concurrent inserts', async () => {
      const promises = [
        db.insert('users', { name: 'User 1' }),
        db.insert('users', { name: 'User 2' }),
        db.insert('users', { name: 'User 3' })
      ];

      const ids = await Promise.all(promises);

      expect(ids).toHaveLength(3);
      expect(new Set(ids).size).toBe(3); // All IDs should be unique
    });
  });
});`,
    hints: [
      'Use beforeAll() to set up database connection once',
      'Use afterEach() to clear data between tests for isolation',
      'Test all CRUD operations: Create, Read, Update, Delete',
      'Test error cases like non-existent records'
    ],
    testCases: [
      {
        input: 'await db.insert("users", { name: "John" }); await db.findById("users", id)',
        expectedOutput: '{ id: "...", name: "John" }',
        description: 'Should insert and retrieve record'
      },
      {
        input: 'await db.update("users", "nonexistent", { name: "Test" })',
        expectedOutput: 'false',
        description: 'Should return false for non-existent record'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t5-ex13',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'E2E User Flow Test',
    difficulty: 4,
    description: 'Write end-to-end tests for a complete user flow. Test a multi-step user journey from start to finish.',
    starterCode: `// Simple application state
class AppState {
  private user: any = null;
  private cart: any[] = [];
  private orders: any[] = [];

  // User authentication
  login(email: string, password: string): boolean {
    if (password === 'password123') {
      this.user = { email, id: '123' };
      return true;
    }
    return false;
  }

  logout(): void {
    this.user = null;
    this.cart = [];
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  // Shopping cart
  addToCart(product: { id: string; name: string; price: number }): void {
    if (!this.isLoggedIn()) throw new Error('Must be logged in');
    this.cart.push(product);
  }

  getCart(): any[] {
    return [...this.cart];
  }

  // Checkout
  checkout(): { orderId: string; total: number } {
    if (!this.isLoggedIn()) throw new Error('Must be logged in');
    if (this.cart.length === 0) throw new Error('Cart is empty');

    const total = this.cart.reduce((sum, item) => sum + item.price, 0);
    const orderId = Math.random().toString(36).substr(2, 9);

    this.orders.push({ orderId, items: [...this.cart], total });
    this.cart = [];

    return { orderId, total };
  }

  getOrders(): any[] {
    if (!this.isLoggedIn()) throw new Error('Must be logged in');
    return [...this.orders];
  }
}

// TODO: Write E2E test for complete user flow
describe('E2E User Flow Tests', () => {
  // Test complete flow: login -> add items -> checkout -> verify order
  // Test error cases: not logged in, empty cart, etc.
});`,
    solution: `// Simple application state
class AppState {
  private user: any = null;
  private cart: any[] = [];
  private orders: any[] = [];

  // User authentication
  login(email: string, password: string): boolean {
    if (password === 'password123') {
      this.user = { email, id: '123' };
      return true;
    }
    return false;
  }

  logout(): void {
    this.user = null;
    this.cart = [];
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  // Shopping cart
  addToCart(product: { id: string; name: string; price: number }): void {
    if (!this.isLoggedIn()) throw new Error('Must be logged in');
    this.cart.push(product);
  }

  getCart(): any[] {
    return [...this.cart];
  }

  // Checkout
  checkout(): { orderId: string; total: number } {
    if (!this.isLoggedIn()) throw new Error('Must be logged in');
    if (this.cart.length === 0) throw new Error('Cart is empty');

    const total = this.cart.reduce((sum, item) => sum + item.price, 0);
    const orderId = Math.random().toString(36).substr(2, 9);

    this.orders.push({ orderId, items: [...this.cart], total });
    this.cart = [];

    return { orderId, total };
  }

  getOrders(): any[] {
    if (!this.isLoggedIn()) throw new Error('Must be logged in');
    return [...this.orders];
  }
}

// E2E User Flow Tests
describe('E2E User Flow Tests', () => {
  let app: AppState;

  beforeEach(() => {
    app = new AppState();
  });

  describe('Happy Path: Complete Purchase Flow', () => {
    test('should complete full purchase journey', () => {
      // Step 1: User logs in
      const loginSuccess = app.login('user@example.com', 'password123');
      expect(loginSuccess).toBe(true);
      expect(app.isLoggedIn()).toBe(true);

      // Step 2: User adds items to cart
      app.addToCart({ id: '1', name: 'Product 1', price: 29.99 });
      app.addToCart({ id: '2', name: 'Product 2', price: 49.99 });
      app.addToCart({ id: '3', name: 'Product 3', price: 19.99 });

      const cart = app.getCart();
      expect(cart).toHaveLength(3);
      expect(cart[0].name).toBe('Product 1');

      // Step 3: User proceeds to checkout
      const order = app.checkout();
      expect(order.orderId).toBeDefined();
      expect(order.total).toBe(99.97); // 29.99 + 49.99 + 19.99

      // Step 4: Cart is cleared after checkout
      expect(app.getCart()).toHaveLength(0);

      // Step 5: Order appears in order history
      const orders = app.getOrders();
      expect(orders).toHaveLength(1);
      expect(orders[0].orderId).toBe(order.orderId);
      expect(orders[0].items).toHaveLength(3);
    });

    test('should handle multiple orders', () => {
      app.login('user@example.com', 'password123');

      // First order
      app.addToCart({ id: '1', name: 'Product 1', price: 10 });
      const order1 = app.checkout();

      // Second order
      app.addToCart({ id: '2', name: 'Product 2', price: 20 });
      app.addToCart({ id: '3', name: 'Product 3', price: 30 });
      const order2 = app.checkout();

      const orders = app.getOrders();
      expect(orders).toHaveLength(2);
      expect(orders[0].total).toBe(10);
      expect(orders[1].total).toBe(50);
    });
  });

  describe('Error Cases', () => {
    test('should prevent adding to cart when not logged in', () => {
      expect(() => {
        app.addToCart({ id: '1', name: 'Product', price: 10 });
      }).toThrow('Must be logged in');
    });

    test('should prevent checkout when not logged in', () => {
      expect(() => {
        app.checkout();
      }).toThrow('Must be logged in');
    });

    test('should prevent checkout with empty cart', () => {
      app.login('user@example.com', 'password123');

      expect(() => {
        app.checkout();
      }).toThrow('Cart is empty');
    });

    test('should fail login with wrong password', () => {
      const loginSuccess = app.login('user@example.com', 'wrongpassword');
      expect(loginSuccess).toBe(false);
      expect(app.isLoggedIn()).toBe(false);
    });

    test('should clear cart on logout', () => {
      app.login('user@example.com', 'password123');
      app.addToCart({ id: '1', name: 'Product', price: 10 });

      expect(app.getCart()).toHaveLength(1);

      app.logout();
      expect(app.isLoggedIn()).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    test('should handle single item purchase', () => {
      app.login('user@example.com', 'password123');
      app.addToCart({ id: '1', name: 'Single Product', price: 99.99 });

      const order = app.checkout();
      expect(order.total).toBe(99.99);
    });

    test('should calculate correct total for many items', () => {
      app.login('user@example.com', 'password123');

      for (let i = 0; i < 10; i++) {
        app.addToCart({ id: \`\${i}\`, name: \`Product \${i}\`, price: 10 });
      }

      const order = app.checkout();
      expect(order.total).toBe(100);
    });
  });
});`,
    hints: [
      'E2E tests verify complete user journeys from start to finish',
      'Test the happy path (successful flow) and error cases',
      'Each step should verify the expected state before moving to next step',
      'Test that side effects occur correctly (cart cleared after checkout)'
    ],
    testCases: [
      {
        input: 'login -> addToCart (3 items) -> checkout',
        expectedOutput: 'Order created with correct total, cart cleared',
        description: 'Should complete full purchase journey'
      },
      {
        input: 'addToCart without login',
        expectedOutput: 'Error: Must be logged in',
        description: 'Should prevent unauthorized actions'
      }
    ],
    language: 'typescript'
  },

  // D5 Exercises (3)
  {
    id: 'cs404-t5-ex14',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'E2E Test with Playwright Basics',
    difficulty: 5,
    description: 'Write end-to-end browser tests using Playwright. Learn to automate browser interactions and test real user scenarios.',
    starterCode: `// Playwright test structure for a login form
// This is pseudocode to demonstrate the testing approach

interface LoginPage {
  navigate(): Promise<void>;
  fillEmail(email: string): Promise<void>;
  fillPassword(password: string): Promise<void>;
  clickSubmit(): Promise<void>;
  getErrorMessage(): Promise<string | null>;
  isLoggedIn(): Promise<boolean>;
}

// TODO: Implement LoginPage class and write E2E tests
class LoginPageImpl implements LoginPage {
  // Implement page object methods
  // Use selectors like: '#email', '#password', 'button[type="submit"]'
}

// TODO: Write E2E tests
describe('Login E2E Tests', () => {
  let page: LoginPage;

  // Setup browser before tests
  // Test: successful login with valid credentials
  // Test: error message with invalid credentials
  // Test: validation for empty fields
  // Test: navigation after successful login
});`,
    solution: `// Playwright test structure for a login form
interface LoginPage {
  navigate(): Promise<void>;
  fillEmail(email: string): Promise<void>;
  fillPassword(password: string): Promise<void>;
  clickSubmit(): Promise<void>;
  getErrorMessage(): Promise<string | null>;
  isLoggedIn(): Promise<boolean>;
}

// Mock implementation simulating Playwright page interactions
class LoginPageImpl implements LoginPage {
  private formState = {
    email: '',
    password: '',
    submitted: false,
    loggedIn: false,
    error: null as string | null
  };

  async navigate(): Promise<void> {
    // Simulate: await page.goto('http://localhost:3000/login')
    this.formState = {
      email: '',
      password: '',
      submitted: false,
      loggedIn: false,
      error: null
    };
  }

  async fillEmail(email: string): Promise<void> {
    // Simulate: await page.fill('#email', email)
    this.formState.email = email;
  }

  async fillPassword(password: string): Promise<void> {
    // Simulate: await page.fill('#password', password)
    this.formState.password = password;
  }

  async clickSubmit(): Promise<void> {
    // Simulate: await page.click('button[type="submit"]')
    this.formState.submitted = true;

    if (!this.formState.email || !this.formState.password) {
      this.formState.error = 'Email and password are required';
      return;
    }

    if (this.formState.email === 'test@example.com' &&
        this.formState.password === 'password123') {
      this.formState.loggedIn = true;
      this.formState.error = null;
    } else {
      this.formState.error = 'Invalid email or password';
    }
  }

  async getErrorMessage(): Promise<string | null> {
    // Simulate: await page.textContent('.error-message')
    return this.formState.error;
  }

  async isLoggedIn(): Promise<boolean> {
    // Simulate: await page.isVisible('.user-dashboard')
    return this.formState.loggedIn;
  }
}

// E2E tests using Page Object pattern
describe('Login E2E Tests', () => {
  let page: LoginPage;

  beforeEach(async () => {
    page = new LoginPageImpl();
    await page.navigate();
  });

  describe('Successful Login', () => {
    test('should login with valid credentials', async () => {
      await page.fillEmail('test@example.com');
      await page.fillPassword('password123');
      await page.clickSubmit();

      const isLoggedIn = await page.isLoggedIn();
      expect(isLoggedIn).toBe(true);

      const error = await page.getErrorMessage();
      expect(error).toBeNull();
    });

    test('should redirect to dashboard after login', async () => {
      await page.fillEmail('test@example.com');
      await page.fillPassword('password123');
      await page.clickSubmit();

      // Verify user is on dashboard
      expect(await page.isLoggedIn()).toBe(true);
    });
  });

  describe('Failed Login', () => {
    test('should show error with invalid credentials', async () => {
      await page.fillEmail('wrong@example.com');
      await page.fillPassword('wrongpassword');
      await page.clickSubmit();

      const error = await page.getErrorMessage();
      expect(error).toBe('Invalid email or password');

      const isLoggedIn = await page.isLoggedIn();
      expect(isLoggedIn).toBe(false);
    });

    test('should show error with wrong password', async () => {
      await page.fillEmail('test@example.com');
      await page.fillPassword('wrongpassword');
      await page.clickSubmit();

      const error = await page.getErrorMessage();
      expect(error).toBe('Invalid email or password');
    });

    test('should show error with wrong email', async () => {
      await page.fillEmail('wrong@example.com');
      await page.fillPassword('password123');
      await page.clickSubmit();

      const error = await page.getErrorMessage();
      expect(error).toBe('Invalid email or password');
    });
  });

  describe('Validation', () => {
    test('should require email field', async () => {
      await page.fillPassword('password123');
      await page.clickSubmit();

      const error = await page.getErrorMessage();
      expect(error).toBe('Email and password are required');
      expect(await page.isLoggedIn()).toBe(false);
    });

    test('should require password field', async () => {
      await page.fillEmail('test@example.com');
      await page.clickSubmit();

      const error = await page.getErrorMessage();
      expect(error).toBe('Email and password are required');
      expect(await page.isLoggedIn()).toBe(false);
    });

    test('should require both fields', async () => {
      await page.clickSubmit();

      const error = await page.getErrorMessage();
      expect(error).toBe('Email and password are required');
    });
  });

  describe('User Flow', () => {
    test('should allow retry after failed login', async () => {
      // First attempt with wrong credentials
      await page.fillEmail('wrong@example.com');
      await page.fillPassword('wrongpassword');
      await page.clickSubmit();

      expect(await page.getErrorMessage()).toBe('Invalid email or password');

      // Second attempt with correct credentials
      await page.navigate(); // Reset form
      await page.fillEmail('test@example.com');
      await page.fillPassword('password123');
      await page.clickSubmit();

      expect(await page.isLoggedIn()).toBe(true);
      expect(await page.getErrorMessage()).toBeNull();
    });
  });
});

/*
Real Playwright test would look like:

import { test, expect } from '@playwright/test';

test('should login successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await expect(page.locator('.user-dashboard')).toBeVisible();
});
*/`,
    hints: [
      'Use Page Object pattern to encapsulate page interactions',
      'Test real user flows: fill form, submit, verify results',
      'Wait for navigation and element visibility in real browser tests',
      'Test both success and failure scenarios'
    ],
    testCases: [
      {
        input: 'Fill email and password, click submit',
        expectedOutput: 'User logged in, no error message',
        description: 'Should login with valid credentials'
      },
      {
        input: 'Click submit without filling fields',
        expectedOutput: 'Error: Email and password are required',
        description: 'Should validate required fields'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t5-ex15',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'Performance Testing Utilities',
    difficulty: 5,
    description: 'Create utilities for performance testing and benchmarking. Learn to measure execution time, memory usage, and detect performance regressions.',
    starterCode: `// Performance testing utilities
interface PerformanceResult {
  name: string;
  duration: number;
  iterations: number;
  avgTime: number;
  minTime: number;
  maxTime: number;
  memoryUsed?: number;
}

// TODO: Implement performance testing utilities
class PerformanceTester {
  // Measure execution time of a function
  async benchmark(
    name: string,
    fn: () => any,
    iterations: number = 100
  ): Promise<PerformanceResult> {
    // Your implementation here
  }

  // Compare two implementations
  async compare(
    name1: string,
    fn1: () => any,
    name2: string,
    fn2: () => any,
    iterations: number = 100
  ): Promise<{ winner: string; speedup: number }> {
    // Your implementation here
  }

  // Assert performance threshold
  assertPerformance(
    result: PerformanceResult,
    maxAvgTime: number
  ): void {
    // Your implementation here
  }
}

// TODO: Write performance tests
describe('Performance Tests', () => {
  // Test: benchmark a function
  // Test: compare two implementations
  // Test: assert performance thresholds
  // Test: detect performance regressions
});`,
    solution: `// Performance testing utilities
interface PerformanceResult {
  name: string;
  duration: number;
  iterations: number;
  avgTime: number;
  minTime: number;
  maxTime: number;
  memoryUsed?: number;
}

// Performance testing utilities
class PerformanceTester {
  // Measure execution time of a function
  async benchmark(
    name: string,
    fn: () => any,
    iterations: number = 100
  ): Promise<PerformanceResult> {
    const times: number[] = [];
    const startMemory = process.memoryUsage?.().heapUsed || 0;
    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      const iterStart = performance.now();
      await fn();
      const iterEnd = performance.now();
      times.push(iterEnd - iterStart);
    }

    const endTime = performance.now();
    const endMemory = process.memoryUsage?.().heapUsed || 0;

    return {
      name,
      duration: endTime - startTime,
      iterations,
      avgTime: times.reduce((a, b) => a + b, 0) / times.length,
      minTime: Math.min(...times),
      maxTime: Math.max(...times),
      memoryUsed: endMemory - startMemory
    };
  }

  // Compare two implementations
  async compare(
    name1: string,
    fn1: () => any,
    name2: string,
    fn2: () => any,
    iterations: number = 100
  ): Promise<{ winner: string; speedup: number; results: [PerformanceResult, PerformanceResult] }> {
    const result1 = await this.benchmark(name1, fn1, iterations);
    const result2 = await this.benchmark(name2, fn2, iterations);

    const winner = result1.avgTime < result2.avgTime ? name1 : name2;
    const speedup = result1.avgTime < result2.avgTime
      ? result2.avgTime / result1.avgTime
      : result1.avgTime / result2.avgTime;

    return { winner, speedup, results: [result1, result2] };
  }

  // Assert performance threshold
  assertPerformance(
    result: PerformanceResult,
    maxAvgTime: number
  ): void {
    if (result.avgTime > maxAvgTime) {
      throw new Error(
        \`Performance regression: \${result.name} took \${result.avgTime.toFixed(2)}ms ` +
        \`(expected < \${maxAvgTime}ms)\`
      );
    }
  }

  // Generate performance report
  generateReport(results: PerformanceResult[]): string {
    let report = '\\n=== Performance Report ===\\n';
    results.forEach(result => {
      report += \`\\n\${result.name}:\\n\`;
      report += \`  Iterations: \${result.iterations}\\n\`;
      report += \`  Total: \${result.duration.toFixed(2)}ms\\n\`;
      report += \`  Average: \${result.avgTime.toFixed(2)}ms\\n\`;
      report += \`  Min: \${result.minTime.toFixed(2)}ms\\n\`;
      report += \`  Max: \${result.maxTime.toFixed(2)}ms\\n\`;
      if (result.memoryUsed) {
        report += \`  Memory: \${(result.memoryUsed / 1024).toFixed(2)}KB\\n\`;
      }
    });
    return report;
  }
}

// Performance tests
describe('Performance Tests', () => {
  let tester: PerformanceTester;

  beforeEach(() => {
    tester = new PerformanceTester();
  });

  describe('Benchmarking', () => {
    test('should benchmark a simple function', async () => {
      const result = await tester.benchmark(
        'Simple addition',
        () => {
          let sum = 0;
          for (let i = 0; i < 1000; i++) sum += i;
          return sum;
        },
        50
      );

      expect(result.iterations).toBe(50);
      expect(result.avgTime).toBeGreaterThan(0);
      expect(result.minTime).toBeLessThanOrEqual(result.avgTime);
      expect(result.maxTime).toBeGreaterThanOrEqual(result.avgTime);
    });

    test('should benchmark async function', async () => {
      const result = await tester.benchmark(
        'Async operation',
        async () => {
          await new Promise(resolve => setTimeout(resolve, 1));
        },
        10
      );

      expect(result.avgTime).toBeGreaterThan(1);
      expect(result.iterations).toBe(10);
    });
  });

  describe('Performance Comparison', () => {
    test('should compare two implementations', async () => {
      // Slower implementation
      const slowSort = () => {
        const arr = Array.from({ length: 100 }, () => Math.random());
        return arr.sort((a, b) => a - b);
      };

      // Faster implementation (same result, but we'll simulate)
      const fastSort = () => {
        const arr = Array.from({ length: 100 }, () => Math.random());
        return arr.sort((a, b) => a - b);
      };

      const comparison = await tester.compare(
        'Implementation A',
        slowSort,
        'Implementation B',
        fastSort,
        20
      );

      expect(comparison.winner).toBeDefined();
      expect(comparison.speedup).toBeGreaterThan(0);
      expect(comparison.results).toHaveLength(2);
    });

    test('should identify faster implementation', async () => {
      const slow = () => {
        let result = 0;
        for (let i = 0; i < 10000; i++) {
          result += Math.sqrt(i);
        }
      };

      const fast = () => {
        let result = 0;
        for (let i = 0; i < 1000; i++) {
          result += i;
        }
      };

      const comparison = await tester.compare('Slow', slow, 'Fast', fast, 10);
      expect(comparison.winner).toBe('Fast');
    });
  });

  describe('Performance Assertions', () => {
    test('should pass when performance is acceptable', async () => {
      const result = await tester.benchmark(
        'Fast operation',
        () => 1 + 1,
        100
      );

      expect(() => {
        tester.assertPerformance(result, 10); // Very generous threshold
      }).not.toThrow();
    });

    test('should throw when performance threshold exceeded', async () => {
      const result = await tester.benchmark(
        'Slow operation',
        () => {
          let sum = 0;
          for (let i = 0; i < 100000; i++) sum += i;
        },
        10
      );

      expect(() => {
        tester.assertPerformance(result, 0.001); // Unrealistic threshold
      }).toThrow('Performance regression');
    });
  });

  describe('Performance Regression Detection', () => {
    test('should detect performance regression', async () => {
      // Baseline performance
      const baseline = await tester.benchmark(
        'Baseline',
        () => {
          let sum = 0;
          for (let i = 0; i < 1000; i++) sum += i;
        },
        20
      );

      // Simulated regression (10x slower)
      const regressed = await tester.benchmark(
        'Regressed',
        () => {
          let sum = 0;
          for (let i = 0; i < 10000; i++) sum += i;
        },
        20
      );

      // Allow 2x slowdown, but 10x should fail
      expect(() => {
        tester.assertPerformance(regressed, baseline.avgTime * 2);
      }).toThrow();
    });
  });

  describe('Report Generation', () => {
    test('should generate performance report', async () => {
      const result1 = await tester.benchmark('Test 1', () => 1 + 1, 10);
      const result2 = await tester.benchmark('Test 2', () => 2 + 2, 10);

      const report = tester.generateReport([result1, result2]);

      expect(report).toContain('Performance Report');
      expect(report).toContain('Test 1');
      expect(report).toContain('Test 2');
      expect(report).toContain('Average:');
    });
  });
});`,
    hints: [
      'Use performance.now() for high-resolution timing',
      'Run multiple iterations to get stable averages',
      'Track min, max, and average times for comprehensive analysis',
      'Use process.memoryUsage() to measure memory consumption (Node.js)'
    ],
    testCases: [
      {
        input: 'tester.benchmark("Test", () => sum += 1, 100)',
        expectedOutput: 'PerformanceResult with avgTime, minTime, maxTime',
        description: 'Should measure function performance'
      },
      {
        input: 'tester.compare("Slow", slowFn, "Fast", fastFn, 50)',
        expectedOutput: '{ winner: "Fast", speedup: 2.5, ... }',
        description: 'Should identify faster implementation'
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t5-ex16',
    subjectId: 'cs404',
    topicId: 'topic-5',
    title: 'CI Test Pipeline Configuration',
    difficulty: 5,
    description: 'Create a CI/CD test pipeline configuration. Learn to automate testing, generate coverage reports, and enforce quality gates.',
    starterCode: `// CI Pipeline configuration and testing utilities
interface TestResult {
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  duration: number;
  coverage?: {
    lines: number;
    branches: number;
    functions: number;
    statements: number;
  };
}

interface PipelineConfig {
  stages: string[];
  testCommand: string;
  coverageThreshold: number;
  failOnWarnings: boolean;
}

// TODO: Implement CI pipeline utilities
class CIPipeline {
  constructor(private config: PipelineConfig) {}

  // Run test suite and collect results
  async runTests(): Promise<TestResult> {
    // Simulate running tests
  }

  // Generate coverage report
  async generateCoverage(): Promise<TestResult['coverage']> {
    // Simulate coverage generation
  }

  // Check if quality gates pass
  checkQualityGates(result: TestResult): { passed: boolean; reasons: string[] } {
    // Implement quality gate checks
  }

  // Run full pipeline
  async run(): Promise<{ success: boolean; result: TestResult }> {
    // Implement pipeline execution
  }
}

// TODO: Write tests for CI pipeline
describe('CI Pipeline Tests', () => {
  // Test: should run all test stages
  // Test: should fail if coverage below threshold
  // Test: should enforce quality gates
  // Test: should generate coverage report
});`,
    solution: `// CI Pipeline configuration and testing utilities
interface TestResult {
  passed: number;
  failed: number;
  skipped: number;
  total: number;
  duration: number;
  coverage?: {
    lines: number;
    branches: number;
    functions: number;
    statements: number;
  };
}

interface PipelineConfig {
  stages: string[];
  testCommand: string;
  coverageThreshold: number;
  failOnWarnings: boolean;
}

// CI pipeline utilities
class CIPipeline {
  constructor(private config: PipelineConfig) {}

  // Run test suite and collect results
  async runTests(): Promise<TestResult> {
    // Simulate running tests with some randomness for realism
    const total = 100;
    const failed = Math.floor(Math.random() * 5);
    const skipped = Math.floor(Math.random() * 3);
    const passed = total - failed - skipped;

    return {
      passed,
      failed,
      skipped,
      total,
      duration: 1500 + Math.random() * 500
    };
  }

  // Generate coverage report
  async generateCoverage(): Promise<TestResult['coverage']> {
    return {
      lines: 85 + Math.random() * 15,
      branches: 80 + Math.random() * 15,
      functions: 90 + Math.random() * 10,
      statements: 85 + Math.random() * 15
    };
  }

  // Check if quality gates pass
  checkQualityGates(result: TestResult): { passed: boolean; reasons: string[] } {
    const reasons: string[] = [];

    // Check for test failures
    if (result.failed > 0) {
      reasons.push(\`\${result.failed} test(s) failed\`);
    }

    // Check coverage threshold
    if (result.coverage) {
      const avgCoverage = (
        result.coverage.lines +
        result.coverage.branches +
        result.coverage.functions +
        result.coverage.statements
      ) / 4;

      if (avgCoverage < this.config.coverageThreshold) {
        reasons.push(
          \`Coverage \${avgCoverage.toFixed(2)}% below threshold \${this.config.coverageThreshold}%\`
        );
      }
    }

    // Check for warnings (skipped tests)
    if (this.config.failOnWarnings && result.skipped > 0) {
      reasons.push(\`\${result.skipped} test(s) skipped\`);
    }

    return {
      passed: reasons.length === 0,
      reasons
    };
  }

  // Run full pipeline
  async run(): Promise<{ success: boolean; result: TestResult; report: string }> {
    console.log('Starting CI Pipeline...');

    let report = '=== CI Pipeline Report ===\\n\\n';

    // Execute stages
    for (const stage of this.config.stages) {
      report += \`Stage: \${stage}\\n\`;

      if (stage === 'test') {
        const result = await this.runTests();
        report += \`  Tests: \${result.passed}/\${result.total} passed\\n\`;
        if (result.failed > 0) report += \`  Failed: \${result.failed}\\n\`;
        if (result.skipped > 0) report += \`  Skipped: \${result.skipped}\\n\`;
      }

      if (stage === 'coverage') {
        const coverage = await this.generateCoverage();
        report += \`  Coverage:\\n\`;
        report += \`    Lines: \${coverage.lines.toFixed(2)}%\\n\`;
        report += \`    Branches: \${coverage.branches.toFixed(2)}%\\n\`;
        report += \`    Functions: \${coverage.functions.toFixed(2)}%\\n\`;
      }
    }

    // Get final results
    const testResult = await this.runTests();
    testResult.coverage = await this.generateCoverage();

    const qualityGates = this.checkQualityGates(testResult);

    report += \`\\nQuality Gates: \${qualityGates.passed ? 'PASSED' : 'FAILED'}\\n\`;
    if (!qualityGates.passed) {
      report += 'Reasons:\\n';
      qualityGates.reasons.forEach(reason => {
        report += \`  - \${reason}\\n\`;
      });
    }

    return {
      success: qualityGates.passed,
      result: testResult,
      report
    };
  }
}

// Tests for CI pipeline
describe('CI Pipeline Tests', () => {
  describe('Test Execution', () => {
    test('should run all test stages', async () => {
      const pipeline = new CIPipeline({
        stages: ['lint', 'test', 'coverage'],
        testCommand: 'npm test',
        coverageThreshold: 80,
        failOnWarnings: false
      });

      const result = await pipeline.runTests();

      expect(result.total).toBeGreaterThan(0);
      expect(result.passed + result.failed + result.skipped).toBe(result.total);
      expect(result.duration).toBeGreaterThan(0);
    });

    test('should generate coverage report', async () => {
      const pipeline = new CIPipeline({
        stages: ['test', 'coverage'],
        testCommand: 'npm test',
        coverageThreshold: 80,
        failOnWarnings: false
      });

      const coverage = await pipeline.generateCoverage();

      expect(coverage).toBeDefined();
      expect(coverage.lines).toBeGreaterThan(0);
      expect(coverage.lines).toBeLessThanOrEqual(100);
      expect(coverage.branches).toBeGreaterThan(0);
      expect(coverage.functions).toBeGreaterThan(0);
      expect(coverage.statements).toBeGreaterThan(0);
    });
  });

  describe('Quality Gates', () => {
    test('should pass quality gates with good results', () => {
      const pipeline = new CIPipeline({
        stages: ['test'],
        testCommand: 'npm test',
        coverageThreshold: 80,
        failOnWarnings: false
      });

      const result: TestResult = {
        passed: 100,
        failed: 0,
        skipped: 0,
        total: 100,
        duration: 1500,
        coverage: {
          lines: 90,
          branches: 85,
          functions: 95,
          statements: 90
        }
      };

      const gates = pipeline.checkQualityGates(result);

      expect(gates.passed).toBe(true);
      expect(gates.reasons).toHaveLength(0);
    });

    test('should fail quality gates with test failures', () => {
      const pipeline = new CIPipeline({
        stages: ['test'],
        testCommand: 'npm test',
        coverageThreshold: 80,
        failOnWarnings: false
      });

      const result: TestResult = {
        passed: 95,
        failed: 5,
        skipped: 0,
        total: 100,
        duration: 1500,
        coverage: {
          lines: 90,
          branches: 85,
          functions: 95,
          statements: 90
        }
      };

      const gates = pipeline.checkQualityGates(result);

      expect(gates.passed).toBe(false);
      expect(gates.reasons).toContain('5 test(s) failed');
    });

    test('should fail quality gates with low coverage', () => {
      const pipeline = new CIPipeline({
        stages: ['test', 'coverage'],
        testCommand: 'npm test',
        coverageThreshold: 90,
        failOnWarnings: false
      });

      const result: TestResult = {
        passed: 100,
        failed: 0,
        skipped: 0,
        total: 100,
        duration: 1500,
        coverage: {
          lines: 70,
          branches: 65,
          functions: 75,
          statements: 70
        }
      };

      const gates = pipeline.checkQualityGates(result);

      expect(gates.passed).toBe(false);
      expect(gates.reasons.some(r => r.includes('Coverage'))).toBe(true);
    });

    test('should fail on warnings when configured', () => {
      const pipeline = new CIPipeline({
        stages: ['test'],
        testCommand: 'npm test',
        coverageThreshold: 80,
        failOnWarnings: true
      });

      const result: TestResult = {
        passed: 95,
        failed: 0,
        skipped: 5,
        total: 100,
        duration: 1500
      };

      const gates = pipeline.checkQualityGates(result);

      expect(gates.passed).toBe(false);
      expect(gates.reasons).toContain('5 test(s) skipped');
    });
  });

  describe('Full Pipeline Execution', () => {
    test('should run complete pipeline', async () => {
      const pipeline = new CIPipeline({
        stages: ['lint', 'test', 'coverage', 'build'],
        testCommand: 'npm test',
        coverageThreshold: 70,
        failOnWarnings: false
      });

      const execution = await pipeline.run();

      expect(execution.success).toBeDefined();
      expect(execution.result).toBeDefined();
      expect(execution.report).toContain('CI Pipeline Report');
      expect(execution.report).toContain('Quality Gates');
    });

    test('should generate detailed report', async () => {
      const pipeline = new CIPipeline({
        stages: ['test', 'coverage'],
        testCommand: 'npm test',
        coverageThreshold: 80,
        failOnWarnings: false
      });

      const execution = await pipeline.run();

      expect(execution.report).toContain('Stage: test');
      expect(execution.report).toContain('Stage: coverage');
      expect(execution.report).toContain('Coverage:');
      expect(execution.report).toContain('Lines:');
    });
  });

  describe('Configuration Scenarios', () => {
    test('should handle minimal configuration', async () => {
      const pipeline = new CIPipeline({
        stages: ['test'],
        testCommand: 'npm test',
        coverageThreshold: 0,
        failOnWarnings: false
      });

      const execution = await pipeline.run();
      expect(execution).toBeDefined();
    });

    test('should handle strict configuration', async () => {
      const pipeline = new CIPipeline({
        stages: ['lint', 'test', 'coverage', 'security', 'build'],
        testCommand: 'npm test',
        coverageThreshold: 95,
        failOnWarnings: true
      });

      const execution = await pipeline.run();
      expect(execution.report).toContain('lint');
      expect(execution.report).toContain('security');
    });
  });
});`,
    hints: [
      'CI pipelines automate testing, coverage, and quality checks',
      'Quality gates prevent merging code that fails standards',
      'Coverage thresholds ensure code is adequately tested',
      'Generate detailed reports for debugging pipeline failures'
    ],
    testCases: [
      {
        input: 'pipeline.checkQualityGates({ passed: 100, failed: 0, coverage: 90% })',
        expectedOutput: '{ passed: true, reasons: [] }',
        description: 'Should pass with good metrics'
      },
      {
        input: 'pipeline.checkQualityGates({ passed: 95, failed: 5, coverage: 70% })',
        expectedOutput: '{ passed: false, reasons: ["5 test(s) failed", "Coverage below threshold"] }',
        description: 'Should fail with failures and low coverage'
      }
    ],
    language: 'typescript'
  }
];
