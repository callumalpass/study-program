import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  // D1 Exercises (3)
  {
    id: 'cs404-t4-ex01',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Debounce User Input',
    difficulty: 1,
    description: 'Create a debounce function that delays the execution of a callback until after a specified wait time has elapsed since the last invocation. This is commonly used for search inputs to reduce API calls.',
    starterCode: `function debounce(func: Function, wait: number): Function {
  // TODO: Implement debounce logic
  // Return a function that delays calling func
}

// Example usage:
const search = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);`,
    solution: `function debounce(func: Function, wait: number): Function {
  let timeout: NodeJS.Timeout | null = null;

  return function(this: any, ...args: any[]) {
    const context = this;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Example usage:
const search = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);`,
    hints: [
      'Use a timeout variable to track the delayed execution',
      'Clear the previous timeout before setting a new one',
      'Use setTimeout to delay the function execution',
      'Preserve the context (this) and arguments when calling the function'
    ],
    testCases: [
      {
        input: 'Multiple rapid calls should execute only once',
        expected: 'Function executes only after wait period',
        passed: false
      },
      {
        input: 'Debounced function with 100ms wait',
        expected: 'Executes after 100ms of inactivity',
        passed: false
      },
      {
        input: 'Context and arguments preserved',
        expected: 'Original function receives correct this and args',
        passed: false
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t4-ex02',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Basic Input Validation',
    difficulty: 1,
    description: 'Create a simple input validator that checks if a user registration form has valid data. Validate email format, password length, and username requirements.',
    starterCode: `interface UserInput {
  username: string;
  email: string;
  password: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateUserInput(input: UserInput): ValidationResult {
  // TODO: Implement validation logic
  // Username: 3-20 characters, alphanumeric
  // Email: valid email format
  // Password: minimum 8 characters
}`,
    solution: `interface UserInput {
  username: string;
  email: string;
  password: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

function validateUserInput(input: UserInput): ValidationResult {
  const errors: string[] = [];

  // Validate username
  if (input.username.length < 3 || input.username.length > 20) {
    errors.push('Username must be 3-20 characters');
  }
  if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
    errors.push('Username must be alphanumeric');
  }

  // Validate email
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(input.email)) {
    errors.push('Invalid email format');
  }

  // Validate password
  if (input.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}`,
    hints: [
      'Create an errors array to collect validation messages',
      'Use regular expressions to validate email format',
      'Check string length for username and password constraints',
      'Return both validity status and error messages'
    ],
    testCases: [
      {
        input: '{ username: "ab", email: "test@test.com", password: "password123" }',
        expected: '{ isValid: false, errors: ["Username must be 3-20 characters"] }',
        passed: false
      },
      {
        input: '{ username: "john", email: "invalid-email", password: "password123" }',
        expected: '{ isValid: false, errors: ["Invalid email format"] }',
        passed: false
      },
      {
        input: '{ username: "john", email: "john@example.com", password: "pass" }',
        expected: '{ isValid: false, errors: ["Password must be at least 8 characters"] }',
        passed: false
      },
      {
        input: '{ username: "john", email: "john@example.com", password: "password123" }',
        expected: '{ isValid: true, errors: [] }',
        passed: false
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t4-ex03',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'ARIA Label Generator',
    difficulty: 1,
    description: 'Create a function that generates appropriate ARIA attributes for common UI elements to improve accessibility. Handle buttons, inputs, and navigation elements.',
    starterCode: `type ElementType = 'button' | 'input' | 'nav';

interface AriaAttributes {
  role?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

function generateAriaAttributes(
  type: ElementType,
  label: string,
  description?: string
): AriaAttributes {
  // TODO: Generate appropriate ARIA attributes
}`,
    solution: `type ElementType = 'button' | 'input' | 'nav';

interface AriaAttributes {
  role?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

function generateAriaAttributes(
  type: ElementType,
  label: string,
  description?: string
): AriaAttributes {
  const attributes: AriaAttributes = {
    'aria-label': label
  };

  if (type === 'button') {
    attributes.role = 'button';
  } else if (type === 'input') {
    attributes.role = 'textbox';
  } else if (type === 'nav') {
    attributes.role = 'navigation';
  }

  if (description) {
    attributes['aria-describedby'] = \`\${type}-description\`;
  }

  return attributes;
}`,
    hints: [
      'Set appropriate role based on element type',
      'Always include aria-label with the provided label',
      'Add aria-describedby only when description is provided',
      'Return an object with ARIA attribute key-value pairs'
    ],
    testCases: [
      {
        input: 'type: "button", label: "Submit Form"',
        expected: '{ role: "button", "aria-label": "Submit Form" }',
        passed: false
      },
      {
        input: 'type: "input", label: "Email Address", description: "Enter your email"',
        expected: '{ role: "textbox", "aria-label": "Email Address", "aria-describedby": "input-description" }',
        passed: false
      },
      {
        input: 'type: "nav", label: "Main Navigation"',
        expected: '{ role: "navigation", "aria-label": "Main Navigation" }',
        passed: false
      }
    ],
    language: 'typescript'
  },

  // D2 Exercises (3)
  {
    id: 'cs404-t4-ex04',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'React.memo Optimization',
    difficulty: 2,
    description: 'Implement a React component that uses React.memo to prevent unnecessary re-renders. Create a custom comparison function to handle complex props.',
    starterCode: `import React from 'react';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    metadata: Record<string, any>;
  };
  onSelect: (id: number) => void;
}

// TODO: Implement UserCard with React.memo
// Use custom comparison to check only id, name, and email
const UserCard: React.FC<UserCardProps> = ({ user, onSelect }) => {
  return (
    <div onClick={() => onSelect(user.id)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export default UserCard;`,
    solution: `import React from 'react';

interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    metadata: Record<string, any>;
  };
  onSelect: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onSelect }) => {
  console.log('Rendering UserCard:', user.id);

  return (
    <div onClick={() => onSelect(user.id)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

// Custom comparison function
function arePropsEqual(
  prevProps: UserCardProps,
  nextProps: UserCardProps
): boolean {
  return (
    prevProps.user.id === nextProps.user.id &&
    prevProps.user.name === nextProps.user.name &&
    prevProps.user.email === nextProps.user.email &&
    prevProps.onSelect === nextProps.onSelect
  );
}

export default React.memo(UserCard, arePropsEqual);`,
    hints: [
      'Use React.memo() to wrap the component',
      'Create a custom comparison function as the second argument',
      'Compare only the relevant props (id, name, email)',
      'Return true if props are equal (skip re-render), false otherwise',
      'Don\'t forget to compare the onSelect callback'
    ],
    testCases: [
      {
        input: 'Props with same id, name, email but different metadata',
        expected: 'Component does not re-render',
        passed: false
      },
      {
        input: 'Props with different name',
        expected: 'Component re-renders',
        passed: false
      },
      {
        input: 'Props with different onSelect callback',
        expected: 'Component re-renders',
        passed: false
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t4-ex05',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Keyboard Navigation Handler',
    difficulty: 2,
    description: 'Create a keyboard navigation handler for a dropdown menu. Support arrow keys for navigation, Enter for selection, and Escape to close.',
    starterCode: `interface MenuItem {
  id: string;
  label: string;
  action: () => void;
}

class KeyboardNavigator {
  private items: MenuItem[];
  private currentIndex: number = -1;

  constructor(items: MenuItem[]) {
    this.items = items;
  }

  handleKeyDown(event: KeyboardEvent): void {
    // TODO: Implement keyboard navigation
    // ArrowDown: move to next item
    // ArrowUp: move to previous item
    // Enter: select current item
    // Escape: reset selection
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }
}`,
    solution: `interface MenuItem {
  id: string;
  label: string;
  action: () => void;
}

class KeyboardNavigator {
  private items: MenuItem[];
  private currentIndex: number = -1;

  constructor(items: MenuItem[]) {
    this.items = items;
  }

  handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.currentIndex = Math.min(
          this.currentIndex + 1,
          this.items.length - 1
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.currentIndex = Math.max(this.currentIndex - 1, 0);
        break;

      case 'Enter':
        event.preventDefault();
        if (this.currentIndex >= 0 && this.currentIndex < this.items.length) {
          this.items[this.currentIndex].action();
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.currentIndex = -1;
        break;
    }
  }

  getCurrentIndex(): number {
    return this.currentIndex;
  }
}`,
    hints: [
      'Use a switch statement to handle different key events',
      'Prevent default behavior for navigation keys',
      'Use Math.min and Math.max to keep index within bounds',
      'Execute the action of the currently selected item on Enter',
      'Reset currentIndex to -1 on Escape'
    ],
    testCases: [
      {
        input: 'ArrowDown from initial state',
        expected: 'currentIndex becomes 0',
        passed: false
      },
      {
        input: 'ArrowUp when at index 0',
        expected: 'currentIndex stays at 0',
        passed: false
      },
      {
        input: 'ArrowDown at last item',
        expected: 'currentIndex stays at last index',
        passed: false
      },
      {
        input: 'Enter at index 1',
        expected: 'items[1].action() is called',
        passed: false
      },
      {
        input: 'Escape key',
        expected: 'currentIndex becomes -1',
        passed: false
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t4-ex06',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Simple Translation System',
    difficulty: 2,
    description: 'Create a basic internationalization (i18n) system that supports multiple languages and nested translation keys.',
    starterCode: `type Translations = {
  [key: string]: string | Translations;
};

class I18n {
  private translations: Record<string, Translations>;
  private currentLocale: string;

  constructor(translations: Record<string, Translations>, defaultLocale: string) {
    this.translations = translations;
    this.currentLocale = defaultLocale;
  }

  setLocale(locale: string): void {
    // TODO: Set the current locale
  }

  t(key: string): string {
    // TODO: Get translation for key (supports dot notation like "user.welcome")
    // Return the key itself if translation not found
  }
}

// Example usage:
const i18n = new I18n({
  en: {
    user: {
      welcome: 'Welcome',
      goodbye: 'Goodbye'
    }
  },
  es: {
    user: {
      welcome: 'Bienvenido',
      goodbye: 'Adiós'
    }
  }
}, 'en');`,
    solution: `type Translations = {
  [key: string]: string | Translations;
};

class I18n {
  private translations: Record<string, Translations>;
  private currentLocale: string;

  constructor(translations: Record<string, Translations>, defaultLocale: string) {
    this.translations = translations;
    this.currentLocale = defaultLocale;
  }

  setLocale(locale: string): void {
    if (this.translations[locale]) {
      this.currentLocale = locale;
    }
  }

  t(key: string): string {
    const keys = key.split('.');
    let value: any = this.translations[this.currentLocale];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  }
}

// Example usage:
const i18n = new I18n({
  en: {
    user: {
      welcome: 'Welcome',
      goodbye: 'Goodbye'
    }
  },
  es: {
    user: {
      welcome: 'Bienvenido',
      goodbye: 'Adiós'
    }
  }
}, 'en');`,
    hints: [
      'Split the key by dots to handle nested paths',
      'Traverse the translations object using each key segment',
      'Return the key itself if translation is not found',
      'Check if the locale exists before setting it',
      'Ensure the final value is a string before returning'
    ],
    testCases: [
      {
        input: 'i18n.t("user.welcome") with locale "en"',
        expected: '"Welcome"',
        passed: false
      },
      {
        input: 'i18n.setLocale("es"); i18n.t("user.goodbye")',
        expected: '"Adiós"',
        passed: false
      },
      {
        input: 'i18n.t("user.nonexistent")',
        expected: '"user.nonexistent"',
        passed: false
      }
    ],
    language: 'typescript'
  },

  // D3 Exercises (4)
  {
    id: 'cs404-t4-ex07',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'useMemo and useCallback Optimization',
    difficulty: 3,
    description: 'Optimize a React component that performs expensive calculations and passes callbacks to child components. Use useMemo for calculations and useCallback for event handlers.',
    starterCode: `import React, { useState, useMemo, useCallback } from 'react';

interface DataItem {
  id: number;
  value: number;
  category: string;
}

interface Props {
  data: DataItem[];
}

// Expensive calculation (simulated)
function calculateStatistics(data: DataItem[]) {
  console.log('Calculating statistics...');
  return {
    total: data.reduce((sum, item) => sum + item.value, 0),
    average: data.reduce((sum, item) => sum + item.value, 0) / data.length,
    max: Math.max(...data.map(item => item.value)),
    min: Math.min(...data.map(item => item.value))
  };
}

const DataDashboard: React.FC<Props> = ({ data }) => {
  const [filter, setFilter] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // TODO: Memoize filtered data
  const filteredData = data.filter(item =>
    item.category.toLowerCase().includes(filter.toLowerCase())
  );

  // TODO: Memoize statistics calculation
  const stats = calculateStatistics(filteredData);

  // TODO: Memoize callback
  const handleSelect = (id: number) => {
    setSelectedId(id);
    console.log('Selected:', id);
  };

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by category"
      />
      <div>Total: {stats.total}</div>
      <div>Average: {stats.average}</div>
      {/* Child components would use handleSelect */}
    </div>
  );
};`,
    solution: `import React, { useState, useMemo, useCallback } from 'react';

interface DataItem {
  id: number;
  value: number;
  category: string;
}

interface Props {
  data: DataItem[];
}

// Expensive calculation (simulated)
function calculateStatistics(data: DataItem[]) {
  console.log('Calculating statistics...');
  return {
    total: data.reduce((sum, item) => sum + item.value, 0),
    average: data.reduce((sum, item) => sum + item.value, 0) / data.length,
    max: Math.max(...data.map(item => item.value)),
    min: Math.min(...data.map(item => item.value))
  };
}

const DataDashboard: React.FC<Props> = ({ data }) => {
  const [filter, setFilter] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Memoize filtered data - only recalculate when data or filter changes
  const filteredData = useMemo(() => {
    console.log('Filtering data...');
    return data.filter(item =>
      item.category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  // Memoize statistics - only recalculate when filtered data changes
  const stats = useMemo(() => {
    return calculateStatistics(filteredData);
  }, [filteredData]);

  // Memoize callback - prevent child re-renders
  const handleSelect = useCallback((id: number) => {
    setSelectedId(id);
    console.log('Selected:', id);
  }, []); // No dependencies as it only uses setSelectedId (stable)

  return (
    <div>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by category"
      />
      <div>Total: {stats.total}</div>
      <div>Average: {stats.average}</div>
      {/* Child components would use handleSelect */}
    </div>
  );
};`,
    hints: [
      'Use useMemo for the filtered data with [data, filter] dependencies',
      'Use useMemo for statistics with [filteredData] dependency',
      'Use useCallback for handleSelect to maintain referential equality',
      'setSelectedId is stable, so handleSelect needs no dependencies',
      'Add console.logs to verify optimizations are working'
    ],
    testCases: [
      {
        input: 'Typing in filter input',
        expected: 'Filtering runs, stats recalculated, handleSelect reference unchanged',
        passed: false
      },
      {
        input: 'selectedId state change',
        expected: 'No filtering or stats recalculation',
        passed: false
      },
      {
        input: 'data prop changes',
        expected: 'Filtering and stats recalculated',
        passed: false
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t4-ex08',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Error Boundary Implementation',
    difficulty: 3,
    description: 'Implement a React Error Boundary component that catches errors in child components, logs them, and displays a fallback UI. Include error recovery functionality.',
    starterCode: `import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  // TODO: Implement static getDerivedStateFromError

  // TODO: Implement componentDidCatch

  // TODO: Implement reset method

  render() {
    // TODO: Render fallback UI or children
  }
}

export default ErrorBoundary;`,
    solution: `import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state to trigger fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console or error reporting service
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo.componentStack);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback or default error UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{ padding: '20px', border: '2px solid red' }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={this.resetError}>Try Again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;`,
    hints: [
      'getDerivedStateFromError should return the new state object',
      'componentDidCatch is for side effects like logging',
      'Store both hasError flag and error object in state',
      'Provide a reset method to clear the error state',
      'Check for custom fallback prop before rendering default UI'
    ],
    testCases: [
      {
        input: 'Child component throws error',
        expected: 'Fallback UI is displayed',
        passed: false
      },
      {
        input: 'Custom fallback provided',
        expected: 'Custom fallback is rendered instead of default',
        passed: false
      },
      {
        input: 'Reset button clicked',
        expected: 'Error cleared, children re-rendered',
        passed: false
      },
      {
        input: 'onError callback provided',
        expected: 'Callback is called with error and errorInfo',
        passed: false
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t4-ex09',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Database Query Optimizer',
    difficulty: 3,
    description: 'Analyze SQL-like query objects and suggest optimizations such as adding indexes, avoiding SELECT *, and fixing N+1 query problems.',
    starterCode: `interface Query {
  table: string;
  select: string[];
  where?: Record<string, any>;
  joins?: Array<{
    table: string;
    on: string;
  }>;
}

interface Optimization {
  type: 'index' | 'select' | 'n+1';
  message: string;
  suggestion: string;
}

function analyzeQuery(query: Query, tableColumns: Record<string, string[]>): Optimization[] {
  // TODO: Analyze the query and return optimization suggestions
  // 1. Check if SELECT * is used
  // 2. Check if WHERE clauses would benefit from indexes
  // 3. Suggest using JOINs instead of multiple queries
}`,
    solution: `interface Query {
  table: string;
  select: string[];
  where?: Record<string, any>;
  joins?: Array<{
    table: string;
    on: string;
  }>;
}

interface Optimization {
  type: 'index' | 'select' | 'n+1';
  message: string;
  suggestion: string;
}

function analyzeQuery(query: Query, tableColumns: Record<string, string[]>): Optimization[] {
  const optimizations: Optimization[] = [];

  // Check for SELECT *
  if (query.select.includes('*')) {
    optimizations.push({
      type: 'select',
      message: 'Using SELECT * returns unnecessary columns',
      suggestion: \`Specify only needed columns: [\${tableColumns[query.table].slice(0, 3).join(', ')}...]\`
    });
  }

  // Check WHERE clauses for potential indexes
  if (query.where) {
    const whereColumns = Object.keys(query.where);
    whereColumns.forEach(column => {
      optimizations.push({
        type: 'index',
        message: \`WHERE clause on '\${column}' may benefit from an index\`,
        suggestion: \`CREATE INDEX idx_\${query.table}_\${column} ON \${query.table}(\${column})\`
      });
    });
  }

  // Check for potential N+1 problems (no joins when filtering on foreign keys)
  if (query.where && !query.joins) {
    const potentialForeignKeys = Object.keys(query.where).filter(
      col => col.endsWith('_id') || col.endsWith('Id')
    );

    if (potentialForeignKeys.length > 0) {
      potentialForeignKeys.forEach(fk => {
        const relatedTable = fk.replace(/_id$|Id$/, '');
        optimizations.push({
          type: 'n+1',
          message: \`Filtering on '\${fk}' without JOIN may cause N+1 queries\`,
          suggestion: \`Add JOIN with \${relatedTable} table to fetch related data in single query\`
        });
      });
    }
  }

  return optimizations;
}`,
    hints: [
      'Check if the select array includes "*"',
      'Iterate through WHERE clause keys to suggest indexes',
      'Look for foreign key patterns (_id or Id suffix)',
      'Suggest JOINs when filtering on foreign keys without existing joins',
      'Return an array of optimization objects with type, message, and suggestion'
    ],
    testCases: [
      {
        input: '{ table: "users", select: ["*"] }',
        expected: 'Optimization suggesting specific columns instead of *',
        passed: false
      },
      {
        input: '{ table: "orders", select: ["id", "total"], where: { user_id: 123 } }',
        expected: 'Suggestions for index on user_id and potential N+1 problem',
        passed: false
      },
      {
        input: '{ table: "posts", select: ["id"], where: { author_id: 5 }, joins: [{ table: "authors", on: "id" }] }',
        expected: 'No N+1 warning (JOIN already present), but index suggestion',
        passed: false
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t4-ex10',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Color Contrast Checker',
    difficulty: 3,
    description: 'Create a WCAG 2.1 compliant color contrast checker that validates if text is readable against a background color. Calculate relative luminance and contrast ratio.',
    starterCode: `interface ColorRGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

interface ContrastResult {
  ratio: number;
  passAANormal: boolean;    // 4.5:1
  passAALarge: boolean;     // 3:1
  passAAANormal: boolean;   // 7:1
  passAAALarge: boolean;    // 4.5:1
}

function hexToRgb(hex: string): ColorRGB {
  // TODO: Convert hex color to RGB
}

function calculateLuminance(color: ColorRGB): number {
  // TODO: Calculate relative luminance (WCAG formula)
  // For each channel: if <= 0.03928, divide by 12.92, else ((value + 0.055) / 1.055) ^ 2.4
  // Luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function checkContrast(foreground: string, background: string): ContrastResult {
  // TODO: Calculate contrast ratio and check WCAG compliance
  // Contrast ratio = (lighter + 0.05) / (darker + 0.05)
}`,
    solution: `interface ColorRGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

interface ContrastResult {
  ratio: number;
  passAANormal: boolean;    // 4.5:1
  passAALarge: boolean;     // 3:1
  passAAANormal: boolean;   // 7:1
  passAAALarge: boolean;    // 4.5:1
}

function hexToRgb(hex: string): ColorRGB {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  return {
    r: parseInt(cleanHex.substring(0, 2), 16),
    g: parseInt(cleanHex.substring(2, 4), 16),
    b: parseInt(cleanHex.substring(4, 6), 16)
  };
}

function calculateLuminance(color: ColorRGB): number {
  // Normalize RGB values to 0-1 range
  const r = color.r / 255;
  const g = color.g / 255;
  const b = color.b / 255;

  // Apply gamma correction
  const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  // Calculate luminance using WCAG formula
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

function checkContrast(foreground: string, background: string): ContrastResult {
  const fgRgb = hexToRgb(foreground);
  const bgRgb = hexToRgb(background);

  const fgLuminance = calculateLuminance(fgRgb);
  const bgLuminance = calculateLuminance(bgRgb);

  // Calculate contrast ratio
  const lighter = Math.max(fgLuminance, bgLuminance);
  const darker = Math.min(fgLuminance, bgLuminance);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    ratio: Math.round(ratio * 100) / 100,
    passAANormal: ratio >= 4.5,
    passAALarge: ratio >= 3,
    passAAANormal: ratio >= 7,
    passAAALarge: ratio >= 4.5
  };
}`,
    hints: [
      'Remove the # from hex strings before parsing',
      'Parse hex in pairs: first 2 chars for R, next 2 for G, last 2 for B',
      'Normalize RGB values by dividing by 255',
      'Apply gamma correction with the WCAG formula',
      'Contrast ratio uses the lighter and darker luminance values',
      'Round the final ratio to 2 decimal places'
    ],
    testCases: [
      {
        input: 'foreground: "#000000", background: "#FFFFFF"',
        expected: 'ratio: 21, all WCAG levels pass',
        passed: false
      },
      {
        input: 'foreground: "#777777", background: "#FFFFFF"',
        expected: 'ratio: ~4.48, only AA Large passes',
        passed: false
      },
      {
        input: 'foreground: "#595959", background: "#FFFFFF"',
        expected: 'ratio: ~7.0, AA passes, AAA Normal passes',
        passed: false
      }
    ],
    language: 'typescript'
  },

  // D4 Exercises (3)
  {
    id: 'cs404-t4-ex11',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Input Validation with Zod',
    difficulty: 4,
    description: 'Create a comprehensive validation system using Zod schemas for a complex form with nested objects, arrays, and custom validation rules.',
    starterCode: `import { z } from 'zod';

// TODO: Create Zod schemas for the following requirements:
// 1. User profile with email, age (18-100), username (3-20 chars)
// 2. Nested address object (street, city, zipCode, country)
// 3. Array of skills (min 1, max 10, each 2-50 chars)
// 4. Phone number (optional, format: +1-XXX-XXX-XXXX or similar)
// 5. Password with custom validation (min 8 chars, 1 uppercase, 1 number, 1 special char)

const userProfileSchema = z.object({
  // TODO: Define schema
});

type UserProfile = z.infer<typeof userProfileSchema>;

function validateUserProfile(data: unknown): {
  success: boolean;
  data?: UserProfile;
  errors?: string[]
} {
  // TODO: Validate data and return formatted result
}`,
    solution: `import { z } from 'zod';

// Custom password validator
const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

// Phone number validator (optional)
const phoneSchema = z.string()
  .regex(/^\\+?[1-9]\\d{0,3}-?\\d{3}-?\\d{3}-?\\d{4}$/, 'Invalid phone format')
  .optional();

// Address schema
const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().regex(/^\\d{5}(-\\d{4})?$/, 'Invalid zip code'),
  country: z.string().min(2, 'Country code must be at least 2 characters')
});

// Skills array schema
const skillsSchema = z.array(
  z.string().min(2, 'Skill must be at least 2 characters')
    .max(50, 'Skill must not exceed 50 characters')
).min(1, 'At least one skill is required')
  .max(10, 'Maximum 10 skills allowed');

// Main user profile schema
const userProfileSchema = z.object({
  email: z.string().email('Invalid email format'),
  age: z.number()
    .int('Age must be an integer')
    .min(18, 'Must be at least 18 years old')
    .max(100, 'Age must not exceed 100'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  address: addressSchema,
  skills: skillsSchema,
  phone: phoneSchema,
  password: passwordSchema
});

type UserProfile = z.infer<typeof userProfileSchema>;

function validateUserProfile(data: unknown): {
  success: boolean;
  data?: UserProfile;
  errors?: string[]
} {
  try {
    const validData = userProfileSchema.parse(data);
    return {
      success: true,
      data: validData
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => \`\${err.path.join('.')}: \${err.message}\`)
      };
    }
    return {
      success: false,
      errors: ['Unknown validation error']
    };
  }
}`,
    hints: [
      'Use z.string().regex() for pattern matching (password, phone, zip)',
      'Chain validation methods like .min(), .max(), .email()',
      'Use z.array() with min/max for the skills array',
      'Nest schemas using z.object() for the address',
      'Use .optional() for the phone field',
      'Catch ZodError and format errors with path and message',
      'Use z.infer to extract the TypeScript type from schema'
    ],
    testCases: [
      {
        input: 'Valid complete user profile',
        expected: 'success: true with parsed data',
        passed: false
      },
      {
        input: 'Invalid email format',
        expected: 'success: false with email error message',
        passed: false
      },
      {
        input: 'Age = 17 (under minimum)',
        expected: 'success: false with age error',
        passed: false
      },
      {
        input: 'Password without special character',
        expected: 'success: false with password error',
        passed: false
      },
      {
        input: 'Empty skills array',
        expected: 'success: false with skills minimum error',
        passed: false
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t4-ex12',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Code Splitting Implementation',
    difficulty: 4,
    description: 'Implement a dynamic module loader with code splitting that loads modules on-demand, handles loading states, errors, and caching.',
    starterCode: `interface Module {
  default: any;
  [key: string]: any;
}

interface LoaderState<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}

class DynamicModuleLoader {
  private cache: Map<string, Promise<Module>>;
  private loadedModules: Map<string, Module>;

  constructor() {
    this.cache = new Map();
    this.loadedModules = new Map();
  }

  async loadModule<T = any>(modulePath: string): Promise<LoaderState<T>> {
    // TODO: Implement dynamic module loading
    // 1. Check if module is already loaded (cache)
    // 2. If loading, return existing promise
    // 3. Otherwise, create new import() promise
    // 4. Handle success and errors
    // 5. Store in cache
  }

  preload(modulePaths: string[]): void {
    // TODO: Preload modules without waiting
  }

  clearCache(modulePath?: string): void {
    // TODO: Clear cache for specific module or all modules
  }
}`,
    solution: `interface Module {
  default: any;
  [key: string]: any;
}

interface LoaderState<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}

class DynamicModuleLoader {
  private cache: Map<string, Promise<Module>>;
  private loadedModules: Map<string, Module>;

  constructor() {
    this.cache = new Map();
    this.loadedModules = new Map();
  }

  async loadModule<T = any>(modulePath: string): Promise<LoaderState<T>> {
    // Return cached module if already loaded
    if (this.loadedModules.has(modulePath)) {
      return {
        loading: false,
        data: this.loadedModules.get(modulePath)!.default as T,
        error: null
      };
    }

    // Return in-progress load if already loading
    if (this.cache.has(modulePath)) {
      try {
        const module = await this.cache.get(modulePath)!;
        return {
          loading: false,
          data: module.default as T,
          error: null
        };
      } catch (error) {
        return {
          loading: false,
          data: null,
          error: error as Error
        };
      }
    }

    // Start new module load
    const loadPromise = import(/* webpackChunkName: "[request]" */ modulePath);
    this.cache.set(modulePath, loadPromise);

    try {
      const module = await loadPromise;
      this.loadedModules.set(modulePath, module);
      this.cache.delete(modulePath); // Remove from in-progress cache

      return {
        loading: false,
        data: module.default as T,
        error: null
      };
    } catch (error) {
      this.cache.delete(modulePath); // Remove failed load

      return {
        loading: false,
        data: null,
        error: error as Error
      };
    }
  }

  preload(modulePaths: string[]): void {
    modulePaths.forEach(path => {
      if (!this.loadedModules.has(path) && !this.cache.has(path)) {
        const loadPromise = import(/* webpackChunkName: "[request]" */ path);
        this.cache.set(path, loadPromise);

        loadPromise
          .then(module => {
            this.loadedModules.set(path, module);
            this.cache.delete(path);
          })
          .catch(() => {
            this.cache.delete(path);
          });
      }
    });
  }

  clearCache(modulePath?: string): void {
    if (modulePath) {
      this.cache.delete(modulePath);
      this.loadedModules.delete(modulePath);
    } else {
      this.cache.clear();
      this.loadedModules.clear();
    }
  }
}`,
    hints: [
      'Use two separate caches: one for in-progress loads, one for loaded modules',
      'Check loadedModules first for instant returns',
      'Check cache for in-progress loads to avoid duplicate requests',
      'Use dynamic import() with webpack magic comments for chunk names',
      'Remove from cache after successful load or error',
      'Preload should fire-and-forget without blocking',
      'Handle both specific and global cache clearing'
    ],
    testCases: [
      {
        input: 'Load module for first time',
        expected: 'loading: false, data: module content, cached',
        passed: false
      },
      {
        input: 'Load same module again',
        expected: 'Instant return from cache',
        passed: false
      },
      {
        input: 'Concurrent loads of same module',
        expected: 'Only one network request made',
        passed: false
      },
      {
        input: 'Preload array of modules',
        expected: 'All modules load in background',
        passed: false
      },
      {
        input: 'clearCache with specific path',
        expected: 'Only that module removed from cache',
        passed: false
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t4-ex13',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Defensive Programming with Type Guards',
    difficulty: 4,
    description: 'Implement defensive programming patterns using TypeScript type guards, runtime validation, and error handling for external API data.',
    starterCode: `// External API response (unknown shape)
interface ApiResponse {
  data: unknown;
  status: number;
  message?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  metadata?: {
    lastLogin?: string;
    preferences?: Record<string, any>;
  };
}

// TODO: Implement type guards
function isString(value: unknown): value is string {
  // TODO
}

function isNumber(value: unknown): value is number {
  // TODO
}

function isValidRole(value: unknown): value is 'admin' | 'user' | 'guest' {
  // TODO
}

function isUser(value: unknown): value is User {
  // TODO: Comprehensive validation
}

// TODO: Safe parser with detailed error messages
function parseUserResponse(response: ApiResponse): User {
  // TODO: Validate and parse safely, throw descriptive errors
}`,
    solution: `// External API response (unknown shape)
interface ApiResponse {
  data: unknown;
  status: number;
  message?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  metadata?: {
    lastLogin?: string;
    preferences?: Record<string, any>;
  };
}

// Type guards
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

function isValidRole(value: unknown): value is 'admin' | 'user' | 'guest' {
  return value === 'admin' || value === 'user' || value === 'guest';
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isUser(value: unknown): value is User {
  if (!isObject(value)) {
    return false;
  }

  // Check required fields
  if (!isNumber(value.id) || !isString(value.name) ||
      !isString(value.email) || !isValidRole(value.role)) {
    return false;
  }

  // Validate email format
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(value.email)) {
    return false;
  }

  // Check optional metadata
  if (value.metadata !== undefined) {
    if (!isObject(value.metadata)) {
      return false;
    }

    if (value.metadata.lastLogin !== undefined &&
        !isString(value.metadata.lastLogin)) {
      return false;
    }

    if (value.metadata.preferences !== undefined &&
        !isObject(value.metadata.preferences)) {
      return false;
    }
  }

  return true;
}

// Safe parser with detailed error messages
function parseUserResponse(response: ApiResponse): User {
  // Check response status
  if (response.status !== 200) {
    throw new Error(
      \`API error: status \${response.status}\${
        response.message ? \`, \${response.message}\` : ''
      }\`
    );
  }

  // Check data exists
  if (!response.data) {
    throw new Error('API response missing data field');
  }

  // Validate data structure
  if (!isObject(response.data)) {
    throw new Error(
      \`Expected data to be an object, got \${typeof response.data}\`
    );
  }

  const data = response.data;

  // Validate required fields with specific errors
  if (!isNumber(data.id)) {
    throw new Error(
      \`Invalid id: expected number, got \${typeof data.id}\`
    );
  }

  if (!isString(data.name)) {
    throw new Error(
      \`Invalid name: expected string, got \${typeof data.name}\`
    );
  }

  if (!isString(data.email)) {
    throw new Error(
      \`Invalid email: expected string, got \${typeof data.email}\`
    );
  }

  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error(\`Invalid email format: \${data.email}\`);
  }

  if (!isValidRole(data.role)) {
    throw new Error(
      \`Invalid role: expected 'admin', 'user', or 'guest', got \${data.role}\`
    );
  }

  // Use type guard for final validation
  if (!isUser(data)) {
    throw new Error('Data failed comprehensive user validation');
  }

  return data;
}`,
    hints: [
      'Type guards use "value is Type" return type syntax',
      'Check typeof for primitives, but remember typeof null === "object"',
      'For objects, verify it\'s not null and not an array',
      'Validate optional fields only when they exist',
      'Throw specific errors for each validation failure',
      'Use type guards to narrow types progressively',
      'Final validation can use comprehensive isUser guard'
    ],
    testCases: [
      {
        input: 'Valid user response with all fields',
        expected: 'Returns parsed User object',
        passed: false
      },
      {
        input: 'Response with status 500',
        expected: 'Throws error with status code',
        passed: false
      },
      {
        input: 'Invalid email format',
        expected: 'Throws "Invalid email format" error',
        passed: false
      },
      {
        input: 'Invalid role value',
        expected: 'Throws error about expected roles',
        passed: false
      },
      {
        input: 'Missing required field (name)',
        expected: 'Throws specific error about name field',
        passed: false
      }
    ],
    language: 'typescript'
  },

  // D5 Exercises (3)
  {
    id: 'cs404-t4-ex14',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'N+1 Query Detection and Fix',
    difficulty: 5,
    description: 'Build a system that detects N+1 query problems in ORM-like code and automatically suggests JOIN-based solutions. Analyze query patterns and generate optimized versions.',
    starterCode: `interface Query {
  type: 'select' | 'insert' | 'update' | 'delete';
  table: string;
  where?: Record<string, any>;
  select?: string[];
}

interface QueryLog {
  queries: Query[];
  executionOrder: number[];
}

interface N1Problem {
  initialQuery: Query;
  repeatedQueries: Query[];
  count: number;
  foreignKey: string;
  optimizedQuery: string;
}

class QueryAnalyzer {
  analyzeQueryLog(log: QueryLog): N1Problem[] {
    // TODO: Detect N+1 patterns
    // 1. Find initial query that returns multiple rows
    // 2. Find subsequent queries in loop with WHERE on foreign key
    // 3. Group by pattern
    // 4. Generate optimized JOIN query
  }

  private generateOptimizedQuery(problem: N1Problem): string {
    // TODO: Generate SQL with JOIN to eliminate N+1
  }

  private detectForeignKey(initialTable: string, repeatedQuery: Query): string | null {
    // TODO: Identify foreign key relationship
  }
}`,
    solution: `interface Query {
  type: 'select' | 'insert' | 'update' | 'delete';
  table: string;
  where?: Record<string, any>;
  select?: string[];
}

interface QueryLog {
  queries: Query[];
  executionOrder: number[];
}

interface N1Problem {
  initialQuery: Query;
  repeatedQueries: Query[];
  count: number;
  foreignKey: string;
  optimizedQuery: string;
}

class QueryAnalyzer {
  analyzeQueryLog(log: QueryLog): N1Problem[] {
    const problems: N1Problem[] = [];
    const queries = log.queries;

    for (let i = 0; i < queries.length - 1; i++) {
      const current = queries[i];

      // Only analyze SELECT queries
      if (current.type !== 'select') continue;

      // Look for repeated pattern in next queries
      const pattern = this.findRepeatedPattern(queries, i + 1);

      if (pattern.queries.length >= 2) {
        const foreignKey = this.detectForeignKey(current.table, pattern.queries[0]);

        if (foreignKey) {
          const problem: N1Problem = {
            initialQuery: current,
            repeatedQueries: pattern.queries,
            count: pattern.queries.length,
            foreignKey,
            optimizedQuery: ''
          };

          problem.optimizedQuery = this.generateOptimizedQuery(problem);
          problems.push(problem);

          // Skip past analyzed queries
          i += pattern.queries.length;
        }
      }
    }

    return problems;
  }

  private findRepeatedPattern(
    queries: Query[],
    startIndex: number
  ): { queries: Query[] } {
    const repeated: Query[] = [];

    if (startIndex >= queries.length) {
      return { queries: repeated };
    }

    const pattern = queries[startIndex];

    // Find all queries matching the pattern
    for (let i = startIndex; i < queries.length; i++) {
      const q = queries[i];

      // Check if query matches pattern (same table and similar WHERE structure)
      if (q.type === pattern.type &&
          q.table === pattern.table &&
          q.where && pattern.where &&
          this.hasSimilarWhereClause(q.where, pattern.where)) {
        repeated.push(q);
      } else if (repeated.length > 0) {
        // Pattern broken
        break;
      }
    }

    return { queries: repeated };
  }

  private hasSimilarWhereClause(
    where1: Record<string, any>,
    where2: Record<string, any>
  ): boolean {
    const keys1 = Object.keys(where1);
    const keys2 = Object.keys(where2);

    // Same WHERE clause structure (same keys, different values)
    return keys1.length === keys2.length &&
           keys1.every(key => keys2.includes(key));
  }

  private detectForeignKey(initialTable: string, repeatedQuery: Query): string | null {
    if (!repeatedQuery.where) return null;

    const whereKeys = Object.keys(repeatedQuery.where);

    // Look for foreign key patterns
    for (const key of whereKeys) {
      // Pattern 1: table_id (e.g., user_id when initial table is users)
      if (key === \`\${initialTable}_id\` || key === \`\${initialTable}Id\`) {
        return key;
      }

      // Pattern 2: ends with _id or Id
      if (key.endsWith('_id') || key.endsWith('Id')) {
        // Check if it could reference the initial table
        const possibleTable = key.replace(/_id$|Id$/, '');
        if (possibleTable === initialTable ||
            possibleTable === initialTable.slice(0, -1)) { // singular form
          return key;
        }
      }
    }

    return null;
  }

  private generateOptimizedQuery(problem: N1Problem): string {
    const { initialQuery, repeatedQueries, foreignKey } = problem;

    // Get columns from both queries
    const initialColumns = (initialQuery.select || ['*'])
      .map(col => \`\${initialQuery.table}.\${col}\`)
      .join(', ');

    const repeatedColumns = (repeatedQueries[0].select || ['*'])
      .map(col => \`\${repeatedQueries[0].table}.\${col}\`)
      .join(', ');

    // Build JOIN query
    let optimized = \`SELECT \${initialColumns}, \${repeatedColumns}\\n\`;
    optimized += \`FROM \${initialQuery.table}\\n\`;
    optimized += \`LEFT JOIN \${repeatedQueries[0].table} \`;
    optimized += \`ON \${initialQuery.table}.id = \${repeatedQueries[0].table}.\${foreignKey}\`;

    // Add WHERE clause from initial query if exists
    if (initialQuery.where) {
      const whereConditions = Object.entries(initialQuery.where)
        .map(([key, value]) =>
          \`\${initialQuery.table}.\${key} = \${JSON.stringify(value)}\`
        )
        .join(' AND ');
      optimized += \`\\nWHERE \${whereConditions}\`;
    }

    return optimized;
  }
}`,
    hints: [
      'Look for a SELECT query followed by multiple similar SELECTs',
      'Repeated queries have same table and WHERE clause structure',
      'Foreign keys often follow patterns like table_id or tableId',
      'Group consecutive repeated queries together',
      'Generate LEFT JOIN to include all initial rows',
      'Combine columns from both tables in SELECT',
      'Preserve WHERE conditions from initial query',
      'Skip already-analyzed queries to avoid duplicate detection'
    ],
    testCases: [
      {
        input: 'SELECT users, then SELECT posts WHERE user_id for each user',
        expected: 'Detects N+1, suggests LEFT JOIN users with posts',
        passed: false
      },
      {
        input: 'Single query only',
        expected: 'No N+1 problems detected',
        passed: false
      },
      {
        input: 'Multiple different queries',
        expected: 'No N+1 problems (no pattern)',
        passed: false
      },
      {
        input: 'SELECT orders, then 10x SELECT order_items WHERE order_id',
        expected: 'Detects N+1 with count=10, generates JOIN query',
        passed: false
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t4-ex15',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Advanced Code Refactoring Tool',
    difficulty: 5,
    description: 'Create a code analysis tool that detects code duplication, extracts common patterns into reusable functions, and suggests refactoring opportunities.',
    starterCode: `interface CodeBlock {
  code: string;
  startLine: number;
  endLine: number;
}

interface DuplicationReport {
  duplicates: Array<{
    pattern: string;
    occurrences: CodeBlock[];
    suggestion: string;
  }>;
  complexity: number;
  recommendations: string[];
}

class CodeRefactoringAnalyzer {
  analyze(code: string, minDuplicateLength: number = 3): DuplicationReport {
    // TODO: Analyze code for refactoring opportunities
    // 1. Detect duplicated code blocks
    // 2. Calculate code complexity
    // 3. Suggest extracted functions
  }

  private findDuplicates(lines: string[], minLength: number): Array<{
    pattern: string;
    occurrences: CodeBlock[];
  }> {
    // TODO: Find duplicate code blocks (ignoring whitespace/variables)
  }

  private normalizeCode(code: string): string {
    // TODO: Normalize for comparison (remove whitespace, generalize variables)
  }

  private calculateComplexity(code: string): number {
    // TODO: Calculate cyclomatic complexity
  }

  private generateExtractedFunction(pattern: string, index: number): string {
    // TODO: Generate extracted function suggestion
  }
}`,
    solution: `interface CodeBlock {
  code: string;
  startLine: number;
  endLine: number;
}

interface DuplicationReport {
  duplicates: Array<{
    pattern: string;
    occurrences: CodeBlock[];
    suggestion: string;
  }>;
  complexity: number;
  recommendations: string[];
}

class CodeRefactoringAnalyzer {
  analyze(code: string, minDuplicateLength: number = 3): DuplicationReport {
    const lines = code.split('\\n');
    const duplicates = this.findDuplicates(lines, minDuplicateLength);
    const complexity = this.calculateComplexity(code);
    const recommendations: string[] = [];

    // Generate suggestions for each duplicate
    const duplicatesWithSuggestions = duplicates.map((dup, index) => {
      const suggestion = this.generateExtractedFunction(dup.pattern, index);
      return {
        ...dup,
        suggestion
      };
    });

    // Add recommendations based on analysis
    if (duplicates.length > 0) {
      recommendations.push(
        \`Found \${duplicates.length} duplicate code patterns. Consider extracting to functions.\`
      );
    }

    if (complexity > 10) {
      recommendations.push(
        \`Cyclomatic complexity is \${complexity}. Consider breaking down into smaller functions.\`
      );
    }

    if (complexity > 20) {
      recommendations.push(
        'High complexity detected. Urgent refactoring recommended.'
      );
    }

    return {
      duplicates: duplicatesWithSuggestions,
      complexity,
      recommendations
    };
  }

  private findDuplicates(lines: string[], minLength: number): Array<{
    pattern: string;
    occurrences: CodeBlock[];
  }> {
    const patterns = new Map<string, CodeBlock[]>();

    // Check all possible windows of size >= minLength
    for (let size = minLength; size <= Math.floor(lines.length / 2); size++) {
      for (let i = 0; i <= lines.length - size; i++) {
        const block = lines.slice(i, i + size).join('\\n');
        const normalized = this.normalizeCode(block);

        // Skip if too simple (empty or just braces)
        if (normalized.trim().length < 10) continue;

        const codeBlock: CodeBlock = {
          code: block,
          startLine: i + 1,
          endLine: i + size
        };

        if (patterns.has(normalized)) {
          // Check if this overlaps with existing occurrences
          const existing = patterns.get(normalized)!;
          const overlaps = existing.some(exist =>
            (codeBlock.startLine >= exist.startLine &&
             codeBlock.startLine <= exist.endLine) ||
            (codeBlock.endLine >= exist.startLine &&
             codeBlock.endLine <= exist.endLine)
          );

          if (!overlaps) {
            existing.push(codeBlock);
          }
        } else {
          patterns.set(normalized, [codeBlock]);
        }
      }
    }

    // Filter to only patterns with 2+ occurrences
    const duplicates: Array<{ pattern: string; occurrences: CodeBlock[] }> = [];

    patterns.forEach((occurrences, pattern) => {
      if (occurrences.length >= 2) {
        duplicates.push({ pattern, occurrences });
      }
    });

    // Sort by number of occurrences (most duplicated first)
    return duplicates.sort((a, b) => b.occurrences.length - a.occurrences.length);
  }

  private normalizeCode(code: string): string {
    return code
      // Remove comments
      .replace(/\\/\\/.*$/gm, '')
      .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '')
      // Normalize whitespace
      .replace(/\\s+/g, ' ')
      // Remove variable names (replace with placeholder)
      .replace(/\\b[a-z][a-zA-Z0-9]*\\b/g, 'VAR')
      // Remove string literals
      .replace(/"[^"]*"/g, '"STR"')
      .replace(/'[^']*'/g, "'STR'")
      // Remove numbers
      .replace(/\\b\\d+\\b/g, 'NUM')
      .trim();
  }

  private calculateComplexity(code: string): number {
    let complexity = 1; // Base complexity

    // Decision points increase complexity
    const decisionKeywords = [
      /\\bif\\b/g,
      /\\belse\\s+if\\b/g,
      /\\bfor\\b/g,
      /\\bwhile\\b/g,
      /\\bcase\\b/g,
      /\\bcatch\\b/g,
      /\\b&&\\b/g,
      /\\b\\|\\|\\b/g,
      /\\?/g, // Ternary operator
    ];

    decisionKeywords.forEach(keyword => {
      const matches = code.match(keyword);
      if (matches) {
        complexity += matches.length;
      }
    });

    return complexity;
  }

  private generateExtractedFunction(pattern: string, index: number): string {
    // Identify potential parameters (look for variables)
    const variables = new Set<string>();
    const varMatches = pattern.matchAll(/\\b[a-z][a-zA-Z0-9]*\\b/g);

    for (const match of varMatches) {
      if (!['const', 'let', 'var', 'function', 'return', 'if', 'else',
           'for', 'while', 'do', 'switch', 'case'].includes(match[0])) {
        variables.add(match[0]);
      }
    }

    const params = Array.from(variables).slice(0, 3).join(', '); // Limit to 3 params

    return \`function extracted_\${index + 1}(\${params}) {
  // TODO: Implement extracted logic
  \${pattern.split('\\n').map(line => '  ' + line).join('\\n')}
}\`;
  }
}`,
    hints: [
      'Use sliding windows to find duplicate blocks of different sizes',
      'Normalize code by removing whitespace, comments, and variable names',
      'Replace literals (strings, numbers) with placeholders for comparison',
      'Track line numbers for each code block',
      'Avoid overlapping duplicates in the same location',
      'Calculate cyclomatic complexity by counting decision points',
      'Count if, for, while, case, catch, &&, ||, and ternary operators',
      'Generate function names like extracted_1, extracted_2',
      'Extract variable names from pattern for function parameters'
    ],
    testCases: [
      {
        input: 'Code with identical blocks repeated 3 times',
        expected: 'Detects 1 pattern with 3 occurrences',
        passed: false
      },
      {
        input: 'Code with high nesting (if/for/while)',
        expected: 'High complexity score, recommendations generated',
        passed: false
      },
      {
        input: 'Unique code with no duplication',
        expected: 'No duplicates found, low complexity',
        passed: false
      },
      {
        input: 'Similar code with different variable names',
        expected: 'Detects as duplicate after normalization',
        passed: false
      }
    ],
    language: 'typescript'
  },
  {
    id: 'cs404-t4-ex16',
    subjectId: 'cs404',
    topicId: 'topic-4',
    title: 'Performance Profiler and Optimizer',
    difficulty: 5,
    description: 'Build a comprehensive performance profiler that tracks function execution times, memory usage, identifies bottlenecks, and suggests optimizations.',
    starterCode: `interface PerformanceMetric {
  functionName: string;
  executionTime: number;
  callCount: number;
  averageTime: number;
  memoryUsed?: number;
}

interface PerformanceReport {
  metrics: PerformanceMetric[];
  bottlenecks: string[];
  optimizationSuggestions: Array<{
    function: string;
    issue: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  totalTime: number;
}

class PerformanceProfiler {
  private metrics: Map<string, {
    times: number[];
    memory: number[];
  }>;

  constructor() {
    this.metrics = new Map();
  }

  profile<T>(functionName: string, fn: () => T): T {
    // TODO: Profile function execution
    // Track time, memory, call count
  }

  async profileAsync<T>(functionName: string, fn: () => Promise<T>): Promise<T> {
    // TODO: Profile async function execution
  }

  generateReport(): PerformanceReport {
    // TODO: Analyze metrics and generate report
    // Identify bottlenecks (>100ms or >10% of total time)
    // Suggest optimizations based on patterns
  }

  private analyzeBottlenecks(metrics: PerformanceMetric[]): string[] {
    // TODO: Identify performance bottlenecks
  }

  private generateOptimizations(metrics: PerformanceMetric[]): Array<{
    function: string;
    issue: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
  }> {
    // TODO: Generate optimization suggestions
  }

  reset(): void {
    this.metrics.clear();
  }
}`,
    solution: `interface PerformanceMetric {
  functionName: string;
  executionTime: number;
  callCount: number;
  averageTime: number;
  memoryUsed?: number;
}

interface PerformanceReport {
  metrics: PerformanceMetric[];
  bottlenecks: string[];
  optimizationSuggestions: Array<{
    function: string;
    issue: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  totalTime: number;
}

class PerformanceProfiler {
  private metrics: Map<string, {
    times: number[];
    memory: number[];
  }>;

  constructor() {
    this.metrics = new Map();
  }

  profile<T>(functionName: string, fn: () => T): T {
    const startTime = performance.now();
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

    try {
      const result = fn();

      const endTime = performance.now();
      const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

      this.recordMetric(
        functionName,
        endTime - startTime,
        endMemory - startMemory
      );

      return result;
    } catch (error) {
      // Record even if function throws
      const endTime = performance.now();
      this.recordMetric(functionName, endTime - startTime, 0);
      throw error;
    }
  }

  async profileAsync<T>(functionName: string, fn: () => Promise<T>): Promise<T> {
    const startTime = performance.now();
    const startMemory = (performance as any).memory?.usedJSHeapSize || 0;

    try {
      const result = await fn();

      const endTime = performance.now();
      const endMemory = (performance as any).memory?.usedJSHeapSize || 0;

      this.recordMetric(
        functionName,
        endTime - startTime,
        endMemory - startMemory
      );

      return result;
    } catch (error) {
      const endTime = performance.now();
      this.recordMetric(functionName, endTime - startTime, 0);
      throw error;
    }
  }

  private recordMetric(functionName: string, time: number, memory: number): void {
    if (!this.metrics.has(functionName)) {
      this.metrics.set(functionName, {
        times: [],
        memory: []
      });
    }

    const metric = this.metrics.get(functionName)!;
    metric.times.push(time);
    metric.memory.push(memory);
  }

  generateReport(): PerformanceReport {
    const metrics: PerformanceMetric[] = [];
    let totalTime = 0;

    // Calculate metrics for each function
    this.metrics.forEach((data, functionName) => {
      const executionTime = data.times.reduce((a, b) => a + b, 0);
      const averageTime = executionTime / data.times.length;
      const averageMemory = data.memory.length > 0
        ? data.memory.reduce((a, b) => a + b, 0) / data.memory.length
        : undefined;

      totalTime += executionTime;

      metrics.push({
        functionName,
        executionTime,
        callCount: data.times.length,
        averageTime,
        memoryUsed: averageMemory
      });
    });

    // Sort by total execution time (descending)
    metrics.sort((a, b) => b.executionTime - a.executionTime);

    const bottlenecks = this.analyzeBottlenecks(metrics, totalTime);
    const optimizationSuggestions = this.generateOptimizations(metrics, totalTime);

    return {
      metrics,
      bottlenecks,
      optimizationSuggestions,
      totalTime
    };
  }

  private analyzeBottlenecks(metrics: PerformanceMetric[], totalTime: number): string[] {
    const bottlenecks: string[] = [];

    metrics.forEach(metric => {
      const percentOfTotal = (metric.executionTime / totalTime) * 100;

      // Bottleneck if >100ms or >10% of total time
      if (metric.executionTime > 100 || percentOfTotal > 10) {
        bottlenecks.push(
          \`\${metric.functionName}: \${metric.executionTime.toFixed(2)}ms (\${percentOfTotal.toFixed(1)}% of total)\`
        );
      }
    });

    return bottlenecks;
  }

  private generateOptimizations(
    metrics: PerformanceMetric[],
    totalTime: number
  ): Array<{
    function: string;
    issue: string;
    suggestion: string;
    priority: 'high' | 'medium' | 'low';
  }> {
    const suggestions: Array<{
      function: string;
      issue: string;
      suggestion: string;
      priority: 'high' | 'medium' | 'low';
    }> = [];

    metrics.forEach(metric => {
      const percentOfTotal = (metric.executionTime / totalTime) * 100;

      // High priority: slow functions called frequently
      if (metric.callCount > 100 && metric.averageTime > 10) {
        suggestions.push({
          function: metric.functionName,
          issue: \`Called \${metric.callCount} times with \${metric.averageTime.toFixed(2)}ms average\`,
          suggestion: 'Consider memoization or caching results',
          priority: 'high'
        });
      }

      // High priority: major bottleneck
      if (percentOfTotal > 20) {
        suggestions.push({
          function: metric.functionName,
          issue: \`Consumes \${percentOfTotal.toFixed(1)}% of total execution time\`,
          suggestion: 'Critical optimization target. Consider algorithm improvements or code splitting',
          priority: 'high'
        });
      }

      // Medium priority: moderate performance impact
      if (metric.averageTime > 50 && metric.averageTime <= 100) {
        suggestions.push({
          function: metric.functionName,
          issue: \`Average execution time of \${metric.averageTime.toFixed(2)}ms\`,
          suggestion: 'Consider optimizing algorithms or reducing complexity',
          priority: 'medium'
        });
      }

      // Memory-based suggestions
      if (metric.memoryUsed && metric.memoryUsed > 1000000) { // >1MB
        suggestions.push({
          function: metric.functionName,
          issue: \`High memory usage: \${(metric.memoryUsed / 1000000).toFixed(2)}MB\`,
          suggestion: 'Check for memory leaks or large object allocations',
          priority: 'medium'
        });
      }

      // Low priority: minor optimizations
      if (metric.callCount > 50 && metric.averageTime > 5 && metric.averageTime <= 10) {
        suggestions.push({
          function: metric.functionName,
          issue: \`Frequent calls (\${metric.callCount}) with small overhead\`,
          suggestion: 'Consider batching operations or debouncing',
          priority: 'low'
        });
      }
    });

    // Sort by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    suggestions.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return suggestions;
  }

  reset(): void {
    this.metrics.clear();
  }
}`,
    hints: [
      'Use performance.now() for high-resolution timing',
      'Access memory via performance.memory API (Chrome-specific)',
      'Store arrays of times and memory for each function',
      'Calculate averages, totals, and percentages in report',
      'Bottlenecks are functions >100ms or >10% of total time',
      'High priority: functions called frequently with high average time',
      'Medium priority: moderate execution time or high memory',
      'Low priority: minor optimizations for frequently called functions',
      'Record metrics even if function throws error',
      'Sort metrics by total execution time descending'
    ],
    testCases: [
      {
        input: 'Profile fast function called 1000 times',
        expected: 'High call count, suggestion for memoization',
        passed: false
      },
      {
        input: 'Profile slow function taking 200ms',
        expected: 'Identified as bottleneck, high priority optimization',
        passed: false
      },
      {
        input: 'Profile multiple functions, one consuming 50% of time',
        expected: 'Critical optimization suggestion for dominant function',
        passed: false
      },
      {
        input: 'Profile async function',
        expected: 'Correctly measures async execution time',
        passed: false
      },
      {
        input: 'Generate report after multiple profiled functions',
        expected: 'Metrics sorted by total time, bottlenecks identified',
        passed: false
      }
    ],
    language: 'typescript'
  }
];
