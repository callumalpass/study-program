# Testing Web Applications

Testing ensures code works correctly, prevents regressions, and improves maintainability. Modern web applications use different types of tests to verify functionality at various levels. Understanding testing fundamentals, tools, and best practices is essential for building reliable applications.

## Types of Tests

Different test types serve different purposes in ensuring application quality.

```javascript
// 1. Unit Tests - Test individual functions/components in isolation
// Example: Testing a utility function
function add(a, b) {
  return a + b;
}

test('add function adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
  expect(add(-1, 1)).toBe(0);
  expect(add(0, 0)).toBe(0);
});

// 2. Integration Tests - Test multiple units working together
// Example: Testing component with API
test('UserList fetches and displays users', async () => {
  // Mock API response
  fetch.mockResolvedValueOnce({
    json: async () => [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ]
  });

  render(<UserList />);

  // Wait for users to load
  expect(await screen.findByText('John')).toBeInTheDocument();
  expect(await screen.findByText('Jane')).toBeInTheDocument();
});

// 3. End-to-End (E2E) Tests - Test complete user workflows
// Example: Cypress test
describe('Login flow', () => {
  it('allows user to log in', () => {
    cy.visit('/login');
    cy.get('#email').type('user@example.com');
    cy.get('#password').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome').should('be.visible');
  });
});
```

## Jest

Jest is a popular testing framework for JavaScript with built-in features.

```javascript
// Basic Jest test structure
describe('Calculator', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('subtracts 5 - 2 to equal 3', () => {
    expect(subtract(5, 2)).toBe(3);
  });

  it('multiplies 3 * 4 to equal 12', () => {
    expect(multiply(3, 4)).toBe(12);
  });
});

// Matchers
test('various matchers', () => {
  // Equality
  expect(2 + 2).toBe(4);
  expect({ name: 'John' }).toEqual({ name: 'John' });

  // Truthiness
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();
  expect('hello').toBeDefined();

  // Numbers
  expect(10).toBeGreaterThan(5);
  expect(5).toBeLessThan(10);
  expect(0.1 + 0.2).toBeCloseTo(0.3);

  // Strings
  expect('team').toMatch(/tea/);
  expect('hello world').toContain('world');

  // Arrays
  expect(['apple', 'banana']).toContain('apple');
  expect([1, 2, 3]).toHaveLength(3);

  // Objects
  expect({ name: 'John', age: 30 }).toHaveProperty('name');
  expect({ name: 'John' }).toMatchObject({ name: 'John' });

  // Exceptions
  expect(() => {
    throw new Error('Error');
  }).toThrow('Error');
});

// Async testing
test('async function resolves correctly', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('async function with promises', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});

test('async function rejects', async () => {
  await expect(fetchDataThatFails()).rejects.toThrow('error');
});

// Setup and teardown
describe('Database tests', () => {
  beforeAll(() => {
    // Runs once before all tests
    return initializeDatabase();
  });

  afterAll(() => {
    // Runs once after all tests
    return closeDatabase();
  });

  beforeEach(() => {
    // Runs before each test
    return clearDatabase();
  });

  afterEach(() => {
    // Runs after each test
    return cleanupTest();
  });

  test('user can be created', () => {
    const user = createUser({ name: 'John' });
    expect(user.name).toBe('John');
  });

  test('user can be deleted', () => {
    const user = createUser({ name: 'John' });
    deleteUser(user.id);
    expect(getUser(user.id)).toBeNull();
  });
});
```

## Mocking

Mocking replaces real implementations with test doubles.

```javascript
// Mock functions
const mockCallback = jest.fn(x => x + 1);

test('mock function', () => {
  [1, 2].forEach(mockCallback);

  // Function was called twice
  expect(mockCallback.mock.calls.length).toBe(2);

  // First call, first argument was 1
  expect(mockCallback.mock.calls[0][0]).toBe(1);

  // Second call, first argument was 2
  expect(mockCallback.mock.calls[1][0]).toBe(2);

  // First call returned 2
  expect(mockCallback.mock.results[0].value).toBe(2);
});

// Mock return values
const myMock = jest.fn();
myMock.mockReturnValueOnce(10)
  .mockReturnValueOnce(20)
  .mockReturnValue(30);

console.log(myMock(), myMock(), myMock(), myMock());
// 10, 20, 30, 30

// Mock implementations
const mockFn = jest.fn(x => x * 2);
mockFn(2); // 4
mockFn.mockImplementation(x => x + 1);
mockFn(2); // 3

// Mock modules
// __mocks__/axios.js
export default {
  get: jest.fn(() => Promise.resolve({ data: { users: [] } }))
};

// In test file
jest.mock('axios');
import axios from 'axios';

test('fetches users', async () => {
  const users = [{ id: 1, name: 'John' }];
  axios.get.mockResolvedValue({ data: users });

  const result = await getUsers();
  expect(result).toEqual(users);
  expect(axios.get).toHaveBeenCalledWith('/api/users');
});

// Spy on methods
const calculator = {
  add: (a, b) => a + b
};

test('spy on add method', () => {
  const spy = jest.spyOn(calculator, 'add');

  calculator.add(2, 3);

  expect(spy).toHaveBeenCalledWith(2, 3);
  expect(spy).toHaveReturnedWith(5);

  spy.mockRestore();
});

// Mock timers
jest.useFakeTimers();

test('waits 1 second', () => {
  const callback = jest.fn();

  setTimeout(callback, 1000);

  // Fast-forward time
  jest.advanceTimersByTime(1000);

  expect(callback).toHaveBeenCalled();
});

jest.useRealTimers();
```

## React Testing Library

React Testing Library encourages testing from the user's perspective.

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Testing component rendering
test('renders button with text', () => {
  render(<Button text="Click me" />);

  const button = screen.getByText('Click me');
  expect(button).toBeInTheDocument();
});

// Testing user interactions
test('button click updates counter', () => {
  render(<Counter />);

  const button = screen.getByRole('button', { name: /increment/i });
  const count = screen.getByText(/count: 0/i);

  fireEvent.click(button);

  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});

// Testing forms
test('form submission', async () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /submit/i });

  await userEvent.type(emailInput, 'user@example.com');
  await userEvent.type(passwordInput, 'password123');
  await userEvent.click(submitButton);

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'user@example.com',
    password: 'password123'
  });
});

// Testing async operations
test('loads and displays user data', async () => {
  render(<UserProfile userId={1} />);

  // Initially shows loading
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for user data to load
  const userName = await screen.findByText('John Doe');
  expect(userName).toBeInTheDocument();

  // Loading disappears
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});

// Testing with waitFor
test('error message appears after failed request', async () => {
  global.fetch = jest.fn(() =>
    Promise.reject(new Error('API Error'))
  );

  render(<DataFetcher />);

  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});

// Querying elements
test('different query methods', () => {
  render(<MyComponent />);

  // getBy* - throws error if not found
  screen.getByText('Hello');
  screen.getByRole('button');
  screen.getByLabelText('Email');
  screen.getByPlaceholderText('Enter email');
  screen.getByTestId('custom-element');

  // queryBy* - returns null if not found
  const element = screen.queryByText('Not here');
  expect(element).not.toBeInTheDocument();

  // findBy* - async, waits for element
  await screen.findByText('Async content');

  // getAllBy*, queryAllBy*, findAllBy* - for multiple elements
  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(3);
});

// Testing context
import { ThemeContext } from './ThemeContext';

test('component uses theme from context', () => {
  render(
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      <ThemedButton />
    </ThemeContext.Provider>
  );

  const button = screen.getByRole('button');
  expect(button).toHaveClass('btn-dark');
});

// Testing custom hooks
import { renderHook, act } from '@testing-library/react';

test('useCounter hook', () => {
  const { result } = renderHook(() => useCounter());

  expect(result.current.count).toBe(0);

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

## Snapshot Testing

Snapshot tests capture component output and detect unexpected changes.

```javascript
import renderer from 'react-test-renderer';

test('Button component matches snapshot', () => {
  const tree = renderer
    .create(<Button text="Click me" variant="primary" />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

// First run creates snapshot file:
// exports[`Button component matches snapshot 1`] = `
// <button
//   className="btn btn-primary"
// >
//   Click me
// </button>
// `;

// Subsequent runs compare against snapshot
// If output changes, test fails unless snapshot is updated

// Update snapshots
// npm test -- -u

// Inline snapshots
test('inline snapshot', () => {
  expect({ name: 'John', age: 30 }).toMatchInlineSnapshot(`
    Object {
      "age": 30,
      "name": "John",
    }
  `);
});
```

## Test Coverage

Measuring how much code is covered by tests.

```javascript
// Run tests with coverage
// npm test -- --coverage

// Coverage report shows:
// - Statements: % of statements executed
// - Branches: % of conditional branches tested
// - Functions: % of functions called
// - Lines: % of lines executed

// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/**/*.test.{js,jsx}'
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80
    }
  }
};

// Testing edge cases for coverage
function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

describe('divide', () => {
  test('divides two numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('throws error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });

  test('handles negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  test('handles decimal results', () => {
    expect(divide(5, 2)).toBe(2.5);
  });
});
```

## Test-Driven Development (TDD)

Writing tests before implementation.

```javascript
// 1. Write failing test
describe('User validation', () => {
  test('validates email format', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('user@example.com')).toBe(true);
  });
});

// 2. Write minimal code to pass
function validateEmail(email) {
  return email.includes('@');
}

// 3. Refactor
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 4. Add more tests
test('validates complex emails', () => {
  expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
  expect(validateEmail('user@')).toBe(false);
  expect(validateEmail('@example.com')).toBe(false);
});

// TDD cycle: Red -> Green -> Refactor
```

## E2E Testing with Cypress

Cypress tests complete user workflows in a real browser.

```javascript
// cypress/integration/login.spec.js
describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('displays login form', () => {
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('shows error for invalid credentials', () => {
    cy.get('input[name="email"]').type('wrong@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('successfully logs in valid user', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Welcome').should('be.visible');
  });

  it('remembers user with remember me', () => {
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[type="checkbox"]').check();
    cy.get('button[type="submit"]').click();

    // Verify token stored
    cy.getCookie('authToken').should('exist');
  });
});

// Network stubbing
describe('User list', () => {
  it('displays users from API', () => {
    cy.intercept('GET', '/api/users', {
      statusCode: 200,
      body: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ]
    });

    cy.visit('/users');
    cy.contains('John Doe').should('be.visible');
    cy.contains('Jane Smith').should('be.visible');
  });

  it('handles API error', () => {
    cy.intercept('GET', '/api/users', {
      statusCode: 500,
      body: { error: 'Server error' }
    });

    cy.visit('/users');
    cy.contains('Failed to load users').should('be.visible');
  });
});

// Custom commands
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Use custom command
it('user can view profile', () => {
  cy.login('user@example.com', 'password123');
  cy.visit('/profile');
  cy.contains('My Profile').should('be.visible');
});
```

## Best Practices

```javascript
// 1. Test behavior, not implementation
// Bad - Tests internal state
test('counter state', () => {
  const counter = new Counter();
  expect(counter.state.count).toBe(0);
});

// Good - Tests observable behavior
test('counter displays zero initially', () => {
  render(<Counter />);
  expect(screen.getByText('0')).toBeInTheDocument();
});

// 2. Use descriptive test names
// Bad
test('test1', () => {});

// Good
test('displays error message when email is invalid', () => {});

// 3. Follow AAA pattern (Arrange, Act, Assert)
test('user can add todo', () => {
  // Arrange
  render(<TodoApp />);
  const input = screen.getByPlaceholderText('Add todo');

  // Act
  userEvent.type(input, 'Buy milk');
  userEvent.click(screen.getByText('Add'));

  // Assert
  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});

// 4. Keep tests independent
// Bad - Tests depend on each other
let user;
test('creates user', () => {
  user = createUser();
});
test('updates user', () => {
  updateUser(user); // Depends on previous test
});

// Good - Each test is independent
test('creates user', () => {
  const user = createUser();
  expect(user).toBeDefined();
});
test('updates user', () => {
  const user = createUser();
  updateUser(user);
  expect(user.updated).toBe(true);
});

// 5. Test edge cases
test('handles empty array', () => {
  expect(processArray([])).toEqual([]);
});
test('handles null input', () => {
  expect(() => processArray(null)).toThrow();
});
test('handles very large numbers', () => {
  expect(add(Number.MAX_VALUE, 1)).toBeDefined();
});

// 6. Don't test external libraries
// Bad
test('lodash map works', () => {
  expect(_.map([1, 2], x => x * 2)).toEqual([2, 4]);
});

// Good - Test your code that uses the library
test('doubles all prices', () => {
  const items = [{ price: 10 }, { price: 20 }];
  expect(doublePrices(items)).toEqual([{ price: 20 }, { price: 40 }]);
});

// 7. Use data-testid sparingly
// Prefer accessible queries
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/email/i);

// Use testid only when necessary
screen.getByTestId('custom-complex-component');

// 8. Keep tests fast
// Avoid unnecessary delays, use mocks for slow operations

// 9. Test one thing at a time
// Bad - Tests multiple things
test('form validation and submission', () => {
  // Tests validation
  // Tests submission
  // Tests error handling
});

// Good - Separate tests
test('validates email format', () => {});
test('submits form with valid data', () => {});
test('displays error on submission failure', () => {});
```

## Conclusion

Testing is essential for building reliable web applications. Unit tests verify individual functions and components, integration tests ensure parts work together correctly, and end-to-end tests validate complete user workflows. Jest provides a powerful testing framework, React Testing Library encourages testing from the user's perspective, and Cypress enables comprehensive E2E testing. Following best practices like testing behavior over implementation, keeping tests independent, and maintaining good coverage helps create a robust test suite that provides confidence in your code and prevents regressions.
