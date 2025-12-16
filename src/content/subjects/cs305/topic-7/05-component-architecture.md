# Component Architecture

Component-based architecture is a design pattern that breaks user interfaces into reusable, independent pieces. Components encapsulate structure, styling, and behavior, making applications easier to develop, test, and maintain. Understanding component architecture is fundamental to modern frontend development.

## What are Components?

Components are self-contained, reusable pieces of UI that combine markup, logic, and styles.

```javascript
// Traditional approach - Everything in one file
// HTML
<div id="app">
  <div class="user-card">
    <img src="avatar.jpg" />
    <h3>John Doe</h3>
    <p>john@example.com</p>
  </div>
</div>

// CSS
.user-card { padding: 1rem; border: 1px solid #ccc; }
.user-card img { width: 100px; height: 100px; }

// JavaScript
document.querySelector('.user-card').addEventListener('click', () => {
  console.log('Clicked');
});

// Component approach - Encapsulated, reusable
// UserCard.jsx (React)
function UserCard({ user }) {
  const handleClick = () => {
    console.log('Clicked:', user.name);
  };

  return (
    <div className="user-card" onClick={handleClick}>
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
}

// Usage - Reuse multiple times
<UserCard user={{ name: 'John', email: 'john@example.com', avatar: 'avatar1.jpg' }} />
<UserCard user={{ name: 'Jane', email: 'jane@example.com', avatar: 'avatar2.jpg' }} />
```

## Props (Properties)

Props are how data flows from parent to child components.

```javascript
// React - Props
function Button({ text, onClick, disabled, variant = 'primary' }) {
  const className = `btn btn-${variant}`;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

// Usage
<Button
  text="Click me"
  onClick={() => alert('Clicked')}
  variant="secondary"
/>

// Props validation with PropTypes
import PropTypes from 'prop-types';

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger'])
};

Button.defaultProps = {
  disabled: false,
  variant: 'primary'
};

// TypeScript for type safety
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

function Button({ text, onClick, disabled = false, variant = 'primary' }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

// Children prop - Nested content
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="User Profile">
  <p>Name: John Doe</p>
  <p>Email: john@example.com</p>
  <Button text="Edit" onClick={handleEdit} />
</Card>

// Render props pattern
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return render({ data, loading });
}

// Usage
<DataFetcher
  url="/api/users"
  render={({ data, loading }) =>
    loading ? <div>Loading...</div> : <UserList users={data} />
  }
/>
```

## State Management

State represents data that changes over time within a component.

```javascript
// React - useState hook
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// Complex state
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    setTodos([...todos, {
      id: Date.now(),
      text: input,
      completed: false
    }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// State with useReducer (for complex state logic)
import { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(reducer, { todos: [] });

  return (
    <div>
      <button onClick={() => dispatch({ type: 'ADD_TODO', payload: 'New todo' })}>
        Add Todo
      </button>
      {state.todos.map(todo => (
        <div key={todo.id}>
          <span onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}>
            {todo.text}
          </span>
          <button onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

## Component Composition

Building complex UIs by combining simpler components.

```javascript
// Atomic design approach
// Atoms - Smallest components
function Button({ children, onClick, variant }) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

// Molecules - Combinations of atoms
function SearchBox({ value, onChange, onSearch }) {
  return (
    <div className="search-box">
      <Input
        value={value}
        onChange={onChange}
        placeholder="Search..."
      />
      <Button onClick={onSearch} variant="primary">
        Search
      </Button>
    </div>
  );
}

// Organisms - Complex components
function Header({ user, onLogout }) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header>
      <Logo />
      <SearchBox
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={() => console.log('Searching:', searchTerm)}
      />
      <UserMenu user={user} onLogout={onLogout} />
    </header>
  );
}

// Templates - Page layouts
function DashboardLayout({ children }) {
  return (
    <div className="dashboard">
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

// Pages - Specific instances
function Dashboard() {
  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
      <Stats />
      <RecentActivity />
      <Charts />
    </DashboardLayout>
  );
}

// Composition patterns
// Container/Presentational pattern
// Container - Logic
function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <UserListPresentation
      users={users}
      loading={loading}
      onDelete={handleDelete}
    />
  );
}

// Presentational - UI
function UserListPresentation({ users, loading, onDelete }) {
  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.name}
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

## Higher-Order Components (HOCs)

Functions that take a component and return a new component with additional props or behavior.

```javascript
// HOC for authentication
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch('/api/auth/me')
        .then(res => res.json())
        .then(user => {
          setUser(user);
          setLoading(false);
        })
        .catch(() => {
          window.location.href = '/login';
        });
    }, []);

    if (loading) return <div>Loading...</div>;

    return <Component {...props} user={user} />;
  };
}

// Usage
function Dashboard({ user }) {
  return <h1>Welcome, {user.name}!</h1>;
}

export default withAuth(Dashboard);

// HOC for data fetching
function withData(url) {
  return function(Component) {
    return function DataComponent(props) {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        fetch(url)
          .then(res => res.json())
          .then(data => {
            setData(data);
            setLoading(false);
          })
          .catch(err => {
            setError(err);
            setLoading(false);
          });
      }, []);

      return (
        <Component
          {...props}
          data={data}
          loading={loading}
          error={error}
        />
      );
    };
  };
}

// Usage
function UserList({ data, loading, error }) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

export default withData('/api/users')(UserList);
```

## Custom Hooks (React)

Reusable stateful logic extracted into functions.

```javascript
// useFetch hook
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

// useLocalStorage hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);

  return (
    <div>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <input
        type="number"
        value={fontSize}
        onChange={(e) => setFontSize(parseInt(e.target.value))}
      />
    </div>
  );
}

// useDebounce hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search
      fetch(`/api/search?q=${debouncedSearchTerm}`)
        .then(res => res.json())
        .then(results => console.log(results));
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

## Component Communication

Different patterns for components to communicate.

```javascript
// 1. Parent to Child - Props
function Parent() {
  const message = 'Hello from parent';
  return <Child message={message} />;
}

function Child({ message }) {
  return <div>{message}</div>;
}

// 2. Child to Parent - Callback props
function Parent() {
  const [data, setData] = useState('');

  const handleData = (value) => {
    setData(value);
  };

  return (
    <div>
      <Child onData={handleData} />
      <p>Received: {data}</p>
    </div>
  );
}

function Child({ onData }) {
  return (
    <button onClick={() => onData('Hello from child')}>
      Send Data
    </button>
  );
}

// 3. Sibling communication - Lift state up
function Parent() {
  const [sharedData, setSharedData] = useState('');

  return (
    <div>
      <ChildA data={sharedData} setData={setSharedData} />
      <ChildB data={sharedData} />
    </div>
  );
}

function ChildA({ setData }) {
  return (
    <button onClick={() => setData('Data from A')}>
      Update
    </button>
  );
}

function ChildB({ data }) {
  return <div>Received: {data}</div>;
}

// 4. Context API - Deep component tree
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Main />
      <Footer />
    </ThemeContext.Provider>
  );
}

function DeepNestedComponent() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}

// 5. Global state - Redux, Zustand, etc.
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));

function Counter() {
  const { count, increment, decrement } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## Component Best Practices

```javascript
// 1. Single Responsibility Principle
// Bad - Component does too much
function UserDashboard() {
  // Fetches user data
  // Fetches posts
  // Fetches notifications
  // Renders everything
  // Handles all interactions
}

// Good - Split into focused components
function UserDashboard() {
  return (
    <div>
      <UserProfile />
      <UserPosts />
      <UserNotifications />
    </div>
  );
}

// 2. Keep components small and focused
// Bad - 500 lines in one component
// Good - Multiple smaller components

// 3. Use meaningful names
// Bad
function A() {}
function Thing() {}

// Good
function UserCard() {}
function SearchInput() {}

// 4. Extract reusable logic
// Bad - Duplicate fetch logic everywhere
// Good - Custom hook or utility function
function useFetch(url) {
  // Reusable fetch logic
}

// 5. Avoid prop drilling
// Bad - Passing props through 5 levels
// Good - Context API or state management

// 6. Memoize expensive computations
import { useMemo } from 'react';

function ExpensiveComponent({ data }) {
  const processed = useMemo(() => {
    return data.map(item => /* expensive operation */);
  }, [data]);

  return <div>{processed}</div>;
}

// 7. Use React.memo for expensive renders
const MemoizedComponent = React.memo(function Component({ data }) {
  return <div>{data}</div>;
});

// 8. Keep state as local as possible
// Don't lift state higher than necessary

// 9. Prefer composition over inheritance
// Use composition to reuse behavior

// 10. Write tests for components
import { render, screen, fireEvent } from '@testing-library/react';

test('button increments counter', () => {
  render(<Counter />);
  const button = screen.getByText('Increment');
  fireEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

## Conclusion

Component architecture is fundamental to modern frontend development, providing a way to build complex user interfaces from simple, reusable pieces. Understanding props for data flow, state for managing changes, composition for combining components, and communication patterns for component interaction enables you to build maintainable, scalable applications. Whether using React, Vue, Angular, or another framework, these principles apply universally and are essential for creating well-structured applications.
