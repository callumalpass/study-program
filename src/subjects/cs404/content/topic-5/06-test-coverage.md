---
id: cs404-t5-test-coverage
title: "Test Coverage"
order: 6
---

# Test Coverage

Test coverage is a metric that measures how much of your codebase is exercised when your test suite runs. It provides visibility into which parts of your code are tested and which remain untested. While coverage numbers alone do not guarantee quality, they are a useful tool for identifying gaps in your testing strategy and ensuring critical paths are verified.

## Understanding Coverage Metrics

Test coverage tools track which lines, branches, and functions execute during tests. The main types of coverage are:

**Line Coverage**: The percentage of executable lines that were run during tests. This is the most basic and commonly reported metric.

**Branch Coverage**: The percentage of decision branches (if/else, switch cases, ternary operators) that were taken. A line with an if statement might show as covered even if only one branch was tested.

**Function Coverage**: The percentage of functions that were called at least once during tests.

**Statement Coverage**: Similar to line coverage, but counts individual statements (a single line may contain multiple statements).

Consider this example:

```typescript
function calculateDiscount(price: number, membership: string): number {
  if (price <= 0) {
    throw new Error('Price must be positive');
  }

  if (membership === 'premium') {
    return price * 0.20;  // 20% discount
  } else if (membership === 'standard') {
    return price * 0.10;  // 10% discount
  } else {
    return 0;  // No discount
  }
}
```

A test that only checks `calculateDiscount(100, 'premium')` would show 100% line coverage for the happy path but miss the error handling and other membership levels. Branch coverage would reveal that only one of four branches was tested.

## Setting Up Coverage Tools

Most testing frameworks integrate with coverage tools. For JavaScript/TypeScript projects using Jest, enable coverage with a simple flag:

```bash
# Run tests with coverage
npm test -- --coverage

# Or add to package.json scripts
{
  "scripts": {
    "test": "jest",
    "test:coverage": "jest --coverage"
  }
}
```

Configure Jest to collect coverage from your source files:

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts',       // Entry points often hard to test
    '!src/**/*.stories.*'  // Storybook files
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 80,
      statements: 80
    }
  }
};
```

The coverage threshold setting causes tests to fail if coverage drops below specified percentages. This enforces coverage standards in your CI pipeline.

## Interpreting Coverage Reports

Coverage tools generate reports showing exactly which lines are covered. Most tools produce HTML reports you can open in a browser:

```bash
npm test -- --coverage
open coverage/lcov-report/index.html
```

The report color-codes lines: green for covered, red for uncovered, and yellow for partially covered (like branches where only one path was taken).

Use these reports strategically. When you see uncovered code, ask:

1. Is this code actually reachable? Dead code should be removed.
2. Is this an important code path? Critical functionality needs testing.
3. Is this difficult to test? Refactor to make it testable, or accept the gap.

## Coverage Goals and Anti-Patterns

A common question is "what coverage percentage should we target?" There is no universal answer, but general guidance includes:

**70-80% line coverage** is a reasonable goal for most projects. This catches most regressions while acknowledging that some code is genuinely hard to test (error handlers for unlikely scenarios, UI edge cases).

**100% coverage is not a worthwhile goal**. Chasing 100% often leads to tests that verify implementation details rather than behavior, making refactoring harder. Some code—like retry logic for network failures—is legitimately difficult to test without excessive mocking.

**Focus on critical paths**. Business logic, data transformations, and validation rules should have high coverage. Configuration boilerplate and simple getters/setters may not need tests.

Common anti-patterns to avoid:

**Coverage without assertions**: Running code without checking results inflates coverage numbers but does not verify behavior. Every test should assert something meaningful.

```typescript
// Bad: Covers code but verifies nothing
test('processes data', () => {
  processData(sampleInput);  // No assertion!
});

// Good: Verifies behavior
test('processes data correctly', () => {
  const result = processData(sampleInput);
  expect(result.status).toBe('completed');
  expect(result.items).toHaveLength(3);
});
```

**Testing implementation instead of behavior**: Tests that break when you refactor without changing behavior are brittle and slow development.

**Ignoring branch coverage**: 100% line coverage with 50% branch coverage means many conditional paths are untested.

## Coverage in CI/CD

Integrate coverage into your continuous integration pipeline to prevent regressions:

```yaml
# GitHub Actions example
- name: Run tests with coverage
  run: npm test -- --coverage --coverageReporters=text-lcov

- name: Check coverage thresholds
  run: npm test -- --coverage --coverageThreshold='{"global":{"lines":80}}'
```

Some teams upload coverage reports to services like Codecov or Coveralls, which track coverage over time and comment on pull requests showing how changes affect coverage.

## Coverage for Your Capstone

For capstone projects, recommended practices include:

1. Set up coverage reporting early, even before you have many tests
2. Establish a minimum threshold (60-70% is reasonable for student projects)
3. Focus coverage on core business logic rather than boilerplate
4. Review coverage reports weekly to identify undertested areas
5. Use coverage gaps as a guide, not a requirement to fill every gap

Consider adding a coverage badge to your README:

```markdown
[![Coverage](https://img.shields.io/badge/coverage-75%25-green)](./coverage/lcov-report/index.html)
```

This signals to evaluators that you take testing seriously.

## Summary

Test coverage measures how thoroughly your tests exercise your code. While not a guarantee of quality, coverage metrics help identify untested code paths and maintain testing discipline. For capstone projects, aim for 70-80% line coverage focused on critical business logic, integrate coverage into your CI pipeline, and use reports to guide—not dictate—your testing efforts. Remember that meaningful tests with assertions matter more than high coverage numbers from tests that just run code.
