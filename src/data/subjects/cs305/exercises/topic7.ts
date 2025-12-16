import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  // 1. CommonJS Module Export
  {
    id: 'cs305-t7-ex01',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Create CommonJS Module',
    description: 'Write a function that exports a simple calculator object with add and subtract methods using CommonJS module.exports.',
    difficulty: 1,
    language: 'javascript',
    starterCode: `// Create calculator module
function createCalculator() {
  // Your code here
}`,
    solution: `function createCalculator() {
  return {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
  };
}

module.exports = createCalculator();`,
    testCases: [
      { input: 'calculator.add(5, 3)', expectedOutput: '8', isHidden: false, description: 'Addition works' },
      { input: 'calculator.subtract(10, 4)', expectedOutput: '6', isHidden: false, description: 'Subtraction works' }
    ],
    hints: [
      'Create an object with add and subtract methods',
      'Use module.exports to export the object',
      'Each method should take two parameters and return the result'
    ]
  },

  // 2. ES6 Module Export
  {
    id: 'cs305-t7-ex02',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'ES6 Named Exports',
    description: 'Create a utilities module with named exports for formatDate(date) and formatCurrency(amount). Use ES6 export syntax.',
    difficulty: 1,
    language: 'javascript',
    starterCode: `// Create utility functions
// Your code here`,
    solution: `export function formatDate(date) {
  return date.toLocaleDateString('en-US');
}

export function formatCurrency(amount) {
  return \`$\${amount.toFixed(2)}\`;
}`,
    testCases: [
      { input: 'formatDate(new Date("2024-01-15"))', expectedOutput: '"1/15/2024"', isHidden: false, description: 'Format date' },
      { input: 'formatCurrency(19.99)', expectedOutput: '"$19.99"', isHidden: false, description: 'Format currency' }
    ],
    hints: [
      'Use export keyword before each function',
      'formatDate should use toLocaleDateString()',
      'formatCurrency should format to 2 decimal places with $ prefix'
    ]
  },

  // 3. Default Export
  {
    id: 'cs305-t7-ex03',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Create Component with Default Export',
    description: 'Write a function `createButton(text, onClick)` that returns a button configuration object and export it as default.',
    difficulty: 1,
    language: 'javascript',
    starterCode: `function createButton(text, onClick) {
  // Your code here
}

// Add export here`,
    solution: `function createButton(text, onClick) {
  return {
    type: 'button',
    text,
    onClick,
    render() {
      return \`<button onclick="...">\${this.text}</button>\`;
    }
  };
}

export default createButton;`,
    testCases: [
      { input: 'createButton("Click me", () => {})', expectedOutput: '{type: "button", text: "Click me", ...}', isHidden: false, description: 'Create button config' }
    ],
    hints: [
      'Return an object with type, text, and onClick properties',
      'Add a render method that returns HTML string',
      'Use export default to export the function'
    ]
  },

  // 4. Simple Component Pattern
  {
    id: 'cs305-t7-ex04',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Stateful Component Factory',
    description: 'Create a function `createCounter()` that returns a component with state and methods: getCount(), increment(), decrement().',
    difficulty: 2,
    language: 'javascript',
    starterCode: `function createCounter() {
  // Your code here
}`,
    solution: `function createCounter() {
  let count = 0;

  return {
    getCount() {
      return count;
    },
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    }
  };
}`,
    testCases: [
      { input: 'counter.increment(); counter.increment(); counter.getCount()', expectedOutput: '2', isHidden: false, description: 'Increment twice' },
      { input: 'counter.increment(); counter.decrement(); counter.getCount()', expectedOutput: '0', isHidden: false, description: 'Increment then decrement' }
    ],
    hints: [
      'Use closure to maintain private state',
      'Initialize count to 0',
      'Each method should modify or return the count',
      'Increment/decrement should return the new value'
    ]
  },

  // 5. Component Props Validation
  {
    id: 'cs305-t7-ex05',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Validate Component Props',
    description: 'Write a function `validateProps(props, schema)` that validates props against a schema. Schema: {name: "string", age: "number"}. Return {valid: boolean, errors: []}.',
    difficulty: 2,
    language: 'javascript',
    starterCode: `function validateProps(props, schema) {
  // Your code here
}`,
    solution: `function validateProps(props, schema) {
  const errors = [];

  for (const [key, expectedType] of Object.entries(schema)) {
    if (!(key in props)) {
      errors.push(\`Missing required prop: \${key}\`);
    } else if (typeof props[key] !== expectedType) {
      errors.push(\`Invalid type for \${key}: expected \${expectedType}, got \${typeof props[key]}\`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}`,
    testCases: [
      { input: '{name: "Alice", age: 30}, {name: "string", age: "number"}', expectedOutput: '{valid: true, errors: []}', isHidden: false, description: 'Valid props' },
      { input: '{name: "Bob"}, {name: "string", age: "number"}', expectedOutput: '{valid: false, errors: ["Missing required prop: age"]}', isHidden: false, description: 'Missing prop' },
      { input: '{name: "Carol", age: "30"}, {name: "string", age: "number"}', expectedOutput: '{valid: false, errors: ["Invalid type for age: ..."]}', isHidden: false, description: 'Wrong type' }
    ],
    hints: [
      'Iterate through schema entries',
      'Check if each key exists in props',
      'Check if the type matches using typeof',
      'Collect all errors before returning'
    ]
  },

  // 6. Simple Test Helper
  {
    id: 'cs305-t7-ex06',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Create Test Assertion Helper',
    description: 'Write a function `assertEquals(actual, expected, message)` that throws an error if values don\'t match, otherwise logs success.',
    difficulty: 2,
    language: 'javascript',
    starterCode: `function assertEquals(actual, expected, message) {
  // Your code here
}`,
    solution: `function assertEquals(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(\`\${message}: Expected \${expected}, but got \${actual}\`);
  }
  console.log(\`✓ \${message}\`);
}`,
    testCases: [
      { input: 'assertEquals(5, 5, "Math works")', expectedOutput: '"✓ Math works" (logged)', isHidden: false, description: 'Passing test' },
      { input: 'assertEquals(5, 6, "Math broken")', expectedOutput: 'Throws error', isHidden: false, description: 'Failing test' }
    ],
    hints: [
      'Compare actual and expected using strict equality',
      'Throw an Error with descriptive message if they don\'t match',
      'Log success message if they do match',
      'Include the custom message in both cases'
    ]
  },

  // 7. Test Suite Runner
  {
    id: 'cs305-t7-ex07',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Simple Test Runner',
    description: 'Create a function `describe(suiteName, tests)` that runs an object of test functions and reports results. Tests is an object where keys are test names and values are test functions.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `function describe(suiteName, tests) {
  // Your code here
}`,
    solution: `function describe(suiteName, tests) {
  console.log(\`\\nTest Suite: \${suiteName}\`);
  let passed = 0;
  let failed = 0;

  for (const [testName, testFn] of Object.entries(tests)) {
    try {
      testFn();
      console.log(\`  ✓ \${testName}\`);
      passed++;
    } catch (error) {
      console.log(\`  ✗ \${testName}\`);
      console.log(\`    \${error.message}\`);
      failed++;
    }
  }

  console.log(\`\\nResults: \${passed} passed, \${failed} failed\`);
  return { passed, failed };
}`,
    testCases: [
      { input: 'describe("Math", {add: () => assertEquals(2+2, 4, "Addition")})', expectedOutput: '{passed: 1, failed: 0}', isHidden: false, description: 'All tests pass' },
      { input: 'Mixed passing and failing tests', expectedOutput: '{passed: X, failed: Y}', isHidden: false, description: 'Mixed results' }
    ],
    hints: [
      'Iterate through test entries',
      'Wrap each test execution in try/catch',
      'Count passed and failed tests',
      'Log results with visual indicators (✓ and ✗)',
      'Return summary object'
    ]
  },

  // 8. Module Dependency Resolver
  {
    id: 'cs305-t7-ex08',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Resolve Module Dependencies',
    description: 'Write a function `resolveDependencies(modules)` that takes a dependency graph and returns modules in correct load order. Input: {a: [], b: ["a"], c: ["a", "b"]}.',
    difficulty: 4,
    language: 'javascript',
    starterCode: `function resolveDependencies(modules) {
  // Your code here
}`,
    solution: `function resolveDependencies(modules) {
  const resolved = [];
  const visited = new Set();

  function visit(module) {
    if (visited.has(module)) return;
    visited.add(module);

    const deps = modules[module] || [];
    for (const dep of deps) {
      visit(dep);
    }

    resolved.push(module);
  }

  for (const module of Object.keys(modules)) {
    visit(module);
  }

  return resolved;
}`,
    testCases: [
      { input: '{a: [], b: ["a"], c: ["a", "b"]}', expectedOutput: '["a", "b", "c"]', isHidden: false, description: 'Linear dependencies' },
      { input: '{x: ["y"], y: ["z"], z: []}', expectedOutput: '["z", "y", "x"]', isHidden: false, description: 'Chain dependencies' }
    ],
    hints: [
      'Use topological sort algorithm',
      'Track visited modules to avoid duplicates',
      'Recursively visit dependencies first',
      'Add module to result after all dependencies are resolved'
    ]
  },

  // 9. Component Lifecycle Hooks
  {
    id: 'cs305-t7-ex09',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Implement Component Lifecycle',
    description: 'Create a function `createComponent(config)` that supports lifecycle hooks: onMount, onUpdate, onUnmount. Return object with mount(), update(), and unmount() methods.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `function createComponent(config) {
  // Your code here
}`,
    solution: `function createComponent(config) {
  let isMounted = false;

  return {
    mount() {
      if (!isMounted) {
        isMounted = true;
        if (config.onMount) config.onMount();
      }
    },
    update(newData) {
      if (isMounted && config.onUpdate) {
        config.onUpdate(newData);
      }
    },
    unmount() {
      if (isMounted) {
        isMounted = false;
        if (config.onUnmount) config.onUnmount();
      }
    }
  };
}`,
    testCases: [
      { input: 'createComponent({onMount: () => console.log("mounted")})', expectedOutput: 'Calls onMount when mount() is called', isHidden: false, description: 'Mount lifecycle' },
      { input: 'Component with all hooks', expectedOutput: 'All hooks called at appropriate times', isHidden: false, description: 'Full lifecycle' }
    ],
    hints: [
      'Track mounted state with a boolean',
      'Only call onMount when mounting for the first time',
      'Only allow updates when mounted',
      'Only call onUnmount when actually mounted',
      'Check if hooks exist before calling them'
    ]
  },

  // 10. Build Config Generator
  {
    id: 'cs305-t7-ex10',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Generate Build Configuration',
    description: 'Write a function `generateBuildConfig(env)` that returns different build configurations for "development" or "production" environments. Include sourceMap, minify, and outputPath.',
    difficulty: 2,
    language: 'javascript',
    starterCode: `function generateBuildConfig(env) {
  // Your code here
}`,
    solution: `function generateBuildConfig(env) {
  const baseConfig = {
    entry: './src/index.js',
    outputPath: './dist'
  };

  if (env === 'production') {
    return {
      ...baseConfig,
      sourceMap: false,
      minify: true,
      mode: 'production'
    };
  } else {
    return {
      ...baseConfig,
      sourceMap: true,
      minify: false,
      mode: 'development'
    };
  }
}`,
    testCases: [
      { input: '"production"', expectedOutput: '{sourceMap: false, minify: true, mode: "production", ...}', isHidden: false, description: 'Production config' },
      { input: '"development"', expectedOutput: '{sourceMap: true, minify: false, mode: "development", ...}', isHidden: false, description: 'Development config' }
    ],
    hints: [
      'Create a base configuration object',
      'Add environment-specific settings',
      'Production should minify and exclude source maps',
      'Development should include source maps and skip minification',
      'Use object spread to combine base and env-specific config'
    ]
  },

  // 11. Mock Function Creator
  {
    id: 'cs305-t7-ex11',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Create Mock Function',
    description: 'Write a function `createMock(returnValue)` that returns a mock function which tracks calls and arguments. Mock should have .calls array and .calledWith(args) method.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `function createMock(returnValue) {
  // Your code here
}`,
    solution: `function createMock(returnValue) {
  const calls = [];

  const mockFn = function(...args) {
    calls.push(args);
    return returnValue;
  };

  mockFn.calls = calls;
  mockFn.calledWith = (...expectedArgs) => {
    return calls.some(args =>
      args.length === expectedArgs.length &&
      args.every((arg, i) => arg === expectedArgs[i])
    );
  };

  return mockFn;
}`,
    testCases: [
      { input: 'mock = createMock(42); mock(1, 2)', expectedOutput: '42 and tracks call', isHidden: false, description: 'Basic mock usage' },
      { input: 'mock.calledWith(1, 2)', expectedOutput: 'true', isHidden: false, description: 'Verify call arguments' }
    ],
    hints: [
      'Use a closure to maintain calls array',
      'Create a function that records arguments on each call',
      'Add calls and calledWith as properties of the function',
      'calledWith should check if any call matches the expected arguments'
    ]
  },

  // 12. Component State Manager
  {
    id: 'cs305-t7-ex12',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Simple State Management',
    description: 'Create a function `createStore(initialState)` that returns {getState, setState, subscribe}. Subscribers should be called when state changes.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `function createStore(initialState) {
  // Your code here
}`,
    solution: `function createStore(initialState) {
  let state = initialState;
  const subscribers = [];

  return {
    getState() {
      return state;
    },
    setState(newState) {
      state = { ...state, ...newState };
      subscribers.forEach(fn => fn(state));
    },
    subscribe(fn) {
      subscribers.push(fn);
      return () => {
        const index = subscribers.indexOf(fn);
        if (index > -1) subscribers.splice(index, 1);
      };
    }
  };
}`,
    testCases: [
      { input: 'store = createStore({count: 0}); store.setState({count: 1})', expectedOutput: 'State updated and subscribers notified', isHidden: false, description: 'State update' },
      { input: 'Subscribe and unsubscribe', expectedOutput: 'Unsubscribed function not called', isHidden: false, description: 'Subscription management' }
    ],
    hints: [
      'Store state in a closure variable',
      'Maintain an array of subscriber functions',
      'Notify all subscribers when state changes',
      'subscribe should return an unsubscribe function',
      'Use object spread to merge new state with old state'
    ]
  },

  // 13. Plugin System
  {
    id: 'cs305-t7-ex13',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Create Plugin Architecture',
    description: 'Write a function `createApp()` that returns an app with plugin support. App should have use(plugin) method and run() method that executes all plugins in order.',
    difficulty: 4,
    language: 'javascript',
    starterCode: `function createApp() {
  // Your code here
}`,
    solution: `function createApp() {
  const plugins = [];
  const app = {
    context: {}
  };

  return {
    use(plugin) {
      plugins.push(plugin);
      return this;
    },
    run() {
      plugins.forEach(plugin => {
        plugin(app.context);
      });
      return app.context;
    },
    getContext() {
      return app.context;
    }
  };
}`,
    testCases: [
      { input: 'app.use(ctx => ctx.a = 1).use(ctx => ctx.b = 2).run()', expectedOutput: '{a: 1, b: 2}', isHidden: false, description: 'Chain plugins' },
      { input: 'Multiple plugins modifying context', expectedOutput: 'All plugins executed in order', isHidden: false, description: 'Plugin execution order' }
    ],
    hints: [
      'Store plugins in an array',
      'Maintain a shared context object',
      'use() should add plugin to array and return this for chaining',
      'run() should execute each plugin with the context',
      'Plugins are functions that receive the context'
    ]
  },

  // 14. Tree Shaking Analyzer
  {
    id: 'cs305-t7-ex14',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Detect Unused Exports',
    description: 'Write a function `findUnusedExports(moduleExports, imports)` that identifies exports that are never imported. Return array of unused export names.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `function findUnusedExports(moduleExports, imports) {
  // Your code here
}`,
    solution: `function findUnusedExports(moduleExports, imports) {
  const usedExports = new Set(imports.flat());
  return moduleExports.filter(exp => !usedExports.has(exp));
}`,
    testCases: [
      { input: '["a", "b", "c"], [["a"], ["b"]]', expectedOutput: '["c"]', isHidden: false, description: 'One unused export' },
      { input: '["x", "y"], [["x", "y"]]', expectedOutput: '[]', isHidden: false, description: 'All exports used' }
    ],
    hints: [
      'Flatten the imports array to get all imported names',
      'Use a Set for efficient lookup',
      'Filter exports to find those not in the used set'
    ]
  },

  // 15. Code Coverage Calculator
  {
    id: 'cs305-t7-ex15',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Calculate Test Coverage',
    description: 'Create a function `calculateCoverage(totalLines, coveredLines)` that returns coverage statistics: {percentage, covered, total, uncovered}.',
    difficulty: 2,
    language: 'javascript',
    starterCode: `function calculateCoverage(totalLines, coveredLines) {
  // Your code here
}`,
    solution: `function calculateCoverage(totalLines, coveredLines) {
  const percentage = (coveredLines / totalLines) * 100;
  const uncovered = totalLines - coveredLines;

  return {
    percentage: Math.round(percentage * 100) / 100,
    covered: coveredLines,
    total: totalLines,
    uncovered
  };
}`,
    testCases: [
      { input: '100, 80', expectedOutput: '{percentage: 80, covered: 80, total: 100, uncovered: 20}', isHidden: false, description: '80% coverage' },
      { input: '50, 50', expectedOutput: '{percentage: 100, covered: 50, total: 50, uncovered: 0}', isHidden: false, description: '100% coverage' }
    ],
    hints: [
      'Calculate percentage: (covered / total) * 100',
      'Calculate uncovered: total - covered',
      'Round percentage to 2 decimal places',
      'Return object with all statistics'
    ]
  },

  // 16. Bundle Size Optimizer
  {
    id: 'cs305-t7-ex16',
    subjectId: 'cs305',
    topicId: 'cs305-topic-7',
    title: 'Optimize Bundle Configuration',
    description: 'Write a function `optimizeBundle(files)` that takes an array of file objects {name, size, essential} and returns optimized bundle config. Remove non-essential files over 100KB, return {files, totalSize, savings}.',
    difficulty: 4,
    language: 'javascript',
    starterCode: `function optimizeBundle(files) {
  // Your code here
}`,
    solution: `function optimizeBundle(files) {
  const originalSize = files.reduce((sum, f) => sum + f.size, 0);

  const optimized = files.filter(file =>
    file.essential || file.size <= 100
  );

  const totalSize = optimized.reduce((sum, f) => sum + f.size, 0);
  const savings = originalSize - totalSize;

  return {
    files: optimized,
    totalSize,
    savings,
    savingsPercentage: Math.round((savings / originalSize) * 100)
  };
}`,
    testCases: [
      { input: '[{name: "a", size: 150, essential: false}, {name: "b", size: 50, essential: true}]', expectedOutput: 'Removes file "a", keeps "b"', isHidden: false, description: 'Remove large non-essential file' },
      { input: 'All essential files', expectedOutput: 'All files kept regardless of size', isHidden: false, description: 'Keep essential files' }
    ],
    hints: [
      'Calculate original total size first',
      'Filter files: keep if essential OR size <= 100',
      'Calculate new total size after filtering',
      'Calculate savings as difference',
      'Include savings percentage in result'
    ]
  }
];
