# Frontend Frameworks Overview

Frontend frameworks provide structure, tools, and patterns for building complex web applications. They handle common tasks like state management, routing, and DOM manipulation, allowing developers to focus on application logic rather than low-level implementation details. Understanding when and why to use frameworks is essential for modern web development.

## Why Use Frameworks?

Frameworks solve common problems and provide standardized approaches.

```javascript
// Without framework - Vanilla JavaScript
// Managing state manually
let todos = [];
const todoList = document.getElementById('todoList');

function addTodo(text) {
    todos.push({ id: Date.now(), text, completed: false });
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        li.className = todo.completed ? 'completed' : '';
        li.onclick = () => toggleTodo(todo.id);
        todoList.appendChild(li);
    });
}

// Problems:
// 1. Manual DOM manipulation
// 2. No separation of concerns
// 3. State management becomes complex
// 4. Hard to test
// 5. No component reusability
```

## React

React is a library for building user interfaces using components.

```javascript
// React component
import { useState } from 'react';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, {
                id: Date.now(),
                text: input,
                completed: false
            }]);
            setInput('');
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <div>
            <h1>Todo List</h1>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        onClick={() => toggleTodo(todo.id)}
                        style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }}
                    >
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
}

// React features:
// - Component-based architecture
// - Virtual DOM for performance
// - Unidirectional data flow
// - JSX syntax
// - Hooks for state and effects
// - Large ecosystem

// React Hooks
import { useState, useEffect, useContext, useReducer } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setLoading(false);
            });
    }, [userId]); // Re-run when userId changes

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </div>
    );
}

// Custom hooks
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

    return (
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            Current theme: {theme}
        </button>
    );
}
```

## Vue

Vue is a progressive framework that's easy to learn and integrate.

```javascript
// Vue 3 Composition API
<template>
  <div>
    <h1>Todo List</h1>
    <input
      v-model="input"
      @keyup.enter="addTodo"
      placeholder="Add todo"
    />
    <button @click="addTodo">Add</button>
    <ul>
      <li
        v-for="todo in todos"
        :key="todo.id"
        @click="toggleTodo(todo.id)"
        :class="{ completed: todo.completed }"
      >
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const todos = ref([]);
const input = ref('');

const addTodo = () => {
  if (input.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: input.value,
      completed: false
    });
    input.value = '';
  }
};

const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>

// Vue features:
// - Template syntax
// - Reactive data binding
// - Component-based
// - Scoped styles
// - Easy to learn
// - Progressive (use as much/little as needed)

// Vue computed properties and watchers
<script setup>
import { ref, computed, watch } from 'vue';

const firstName = ref('John');
const lastName = ref('Doe');

// Computed property - cached, only recalculates when dependencies change
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`;
});

// Watcher - run side effects when data changes
watch(fullName, (newName, oldName) => {
  console.log(`Name changed from ${oldName} to ${newName}`);
});
</script>

// Vue lifecycle hooks
<script setup>
import { onMounted, onUpdated, onUnmounted } from 'vue';

onMounted(() => {
  console.log('Component mounted');
  // Fetch data, set up listeners
});

onUpdated(() => {
  console.log('Component updated');
});

onUnmounted(() => {
  console.log('Component unmounted');
  // Cleanup listeners, timers
});
</script>
```

## Angular

Angular is a full-featured framework with TypeScript and dependency injection.

```typescript
// Angular component
import { Component, OnInit } from '@angular/core';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  template: `
    <div>
      <h1>Todo List</h1>
      <input
        [(ngModel)]="input"
        (keyup.enter)="addTodo()"
        placeholder="Add todo"
      />
      <button (click)="addTodo()">Add</button>
      <ul>
        <li
          *ngFor="let todo of todos"
          (click)="toggleTodo(todo.id)"
          [class.completed]="todo.completed"
        >
          {{ todo.text }}
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .completed {
      text-decoration: line-through;
    }
  `]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  input: string = '';

  ngOnInit() {
    // Initialization logic
  }

  addTodo() {
    if (this.input.trim()) {
      this.todos.push({
        id: Date.now(),
        text: this.input,
        completed: false
      });
      this.input = '';
    }
  }

  toggleTodo(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }
}

// Angular features:
// - TypeScript by default
// - Dependency injection
// - RxJS for reactive programming
// - Two-way data binding
// - Comprehensive CLI
// - Opinionated structure

// Angular service with dependency injection
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  updateUser(id: number, data: Partial<User>): Observable<User> {
    return this.http.patch<User>(`/api/users/${id}`, data);
  }
}

// Using the service
@Component({
  selector: 'app-user-profile',
  template: `
    <div *ngIf="user">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>
  `
})
export class UserProfileComponent implements OnInit {
  user?: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser(1).subscribe(user => {
      this.user = user;
    });
  }
}
```

## Svelte

Svelte compiles components to efficient vanilla JavaScript at build time.

```javascript
<!-- Svelte component -->
<script>
  let todos = [];
  let input = '';

  function addTodo() {
    if (input.trim()) {
      todos = [...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }];
      input = '';
    }
  }

  function toggleTodo(id) {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }
</script>

<div>
  <h1>Todo List</h1>
  <input
    bind:value={input}
    on:keypress={(e) => e.key === 'Enter' && addTodo()}
  />
  <button on:click={addTodo}>Add</button>
  <ul>
    {#each todos as todo (todo.id)}
      <li
        on:click={() => toggleTodo(todo.id)}
        class:completed={todo.completed}
      >
        {todo.text}
      </li>
    {/each}
  </ul>
</div>

<style>
  .completed {
    text-decoration: line-through;
  }
</style>

// Svelte features:
// - No virtual DOM (compiles to vanilla JS)
// - Reactive by default
// - Less boilerplate
// - Smaller bundle sizes
// - Built-in animations
// - Simple syntax

// Svelte reactivity
<script>
  let count = 0;

  // Reactive declaration - automatically updates
  $: doubled = count * 2;

  // Reactive statement - runs when dependencies change
  $: if (count > 10) {
    console.log('Count is over 10!');
  }

  // Reactive block
  $: {
    console.log('Count is:', count);
    console.log('Doubled is:', doubled);
  }
</script>

<button on:click={() => count++}>
  Count: {count}
</button>
<p>Doubled: {doubled}</p>

// Svelte stores (shared state)
// stores.js
import { writable, derived } from 'svelte/store';

export const count = writable(0);
export const doubled = derived(count, $count => $count * 2);

// Component using stores
<script>
  import { count, doubled } from './stores.js';
</script>

<button on:click={() => $count++}>
  Count: {$count}
</button>
<p>Doubled: {$doubled}</p>
```

## When to Use Frameworks

Decision guide for choosing whether and which framework to use.

```javascript
const frameworkDecisionGuide = {
  useFramework: {
    when: [
      'Building complex, interactive applications',
      'Need component reusability',
      'Team collaboration on large projects',
      'Want structured architecture',
      'Need state management',
      'Building single-page applications'
    ],
    skip: [
      'Simple static websites',
      'Content-focused sites (use SSG)',
      'Very small projects',
      'Performance is critical and app is simple',
      'Learning fundamentals'
    ]
  },

  chooseReact: {
    when: [
      'Need maximum flexibility',
      'Want large ecosystem',
      'Building mobile apps (React Native)',
      'Team knows JavaScript well',
      'Need job market advantage'
    ],
    tradeoffs: [
      'More decisions to make',
      'Need to choose additional libraries',
      'JSX learning curve'
    ]
  },

  chooseVue: {
    when: [
      'Want gentle learning curve',
      'Need official routing/state management',
      'Want template syntax',
      'Progressive enhancement',
      'Smaller team or solo developer'
    ],
    tradeoffs: [
      'Smaller ecosystem than React',
      'Less job opportunities',
      'Smaller community'
    ]
  },

  chooseAngular: {
    when: [
      'Large enterprise applications',
      'Team loves TypeScript',
      'Want opinionated structure',
      'Need everything built-in',
      'Long-term maintainability priority'
    ],
    tradeoffs: [
      'Steeper learning curve',
      'More verbose',
      'Larger bundle sizes',
      'More complex setup'
    ]
  },

  chooseSvelte: {
    when: [
      'Performance is critical',
      'Want smallest bundle sizes',
      'Like simple, clean syntax',
      'Building new projects',
      'Want less boilerplate'
    ],
    tradeoffs: [
      'Smaller ecosystem',
      'Fewer jobs',
      'Less mature',
      'Fewer resources/tutorials'
    ]
  }
};
```

## Framework Comparison

```javascript
const comparison = {
  react: {
    type: 'Library',
    language: 'JavaScript (JSX)',
    learning: 'Medium',
    size: 'Small (core only)',
    performance: 'Good',
    ecosystem: 'Largest',
    community: 'Largest',
    jobs: 'Most',
    companies: 'Facebook, Netflix, Airbnb',
    strengths: [
      'Flexibility',
      'Ecosystem',
      'React Native',
      'Community'
    ],
    weaknesses: [
      'Need additional libraries',
      'Frequent changes',
      'JSX learning curve'
    ]
  },

  vue: {
    type: 'Framework',
    language: 'JavaScript (Templates)',
    learning: 'Easy',
    size: 'Small',
    performance: 'Excellent',
    ecosystem: 'Growing',
    community: 'Large',
    jobs: 'Moderate',
    companies: 'Alibaba, GitLab, Adobe',
    strengths: [
      'Easy to learn',
      'Great documentation',
      'Template syntax',
      'Official libraries'
    ],
    weaknesses: [
      'Smaller than React',
      'Less enterprise adoption',
      'Fewer jobs'
    ]
  },

  angular: {
    type: 'Framework',
    language: 'TypeScript',
    learning: 'Hard',
    size: 'Large',
    performance: 'Good',
    ecosystem: 'Complete',
    community: 'Large',
    jobs: 'Many (enterprise)',
    companies: 'Google, Microsoft, Forbes',
    strengths: [
      'Complete solution',
      'TypeScript',
      'Enterprise ready',
      'Opinionated'
    ],
    weaknesses: [
      'Steep learning curve',
      'Verbose',
      'Large bundle',
      'Complex'
    ]
  },

  svelte: {
    type: 'Compiler',
    language: 'JavaScript',
    learning: 'Easy',
    size: 'Smallest',
    performance: 'Excellent',
    ecosystem: 'Small',
    community: 'Growing',
    jobs: 'Few',
    companies: 'Spotify, Apple, New York Times',
    strengths: [
      'Performance',
      'Simple syntax',
      'Small bundles',
      'No virtual DOM'
    ],
    weaknesses: [
      'Small ecosystem',
      'Few jobs',
      'Less mature',
      'Limited resources'
    ]
  }
};
```

## Getting Started

Quick start for each framework.

```bash
# React
npx create-react-app my-app
cd my-app
npm start

# React with Vite (faster)
npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev

# Vue
npm create vue@latest
cd my-app
npm install
npm run dev

# Angular
npm install -g @angular/cli
ng new my-app
cd my-app
ng serve

# Svelte
npm create vite@latest my-app -- --template svelte
cd my-app
npm install
npm run dev
```

## Modern Alternatives

Meta-frameworks built on top of base frameworks.

```javascript
// Next.js (React)
// - Server-side rendering
// - Static site generation
// - API routes
// - File-based routing
export default function Home() {
  return <h1>Welcome to Next.js</h1>;
}

export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  return { props: { data } };
}

// Nuxt (Vue)
// - SSR/SSG for Vue
// - Auto-imports
// - File-based routing
<template>
  <div>
    <h1>{{ data.title }}</h1>
  </div>
</template>

<script setup>
const { data } = await useFetch('/api/data');
</script>

// SvelteKit (Svelte)
// - SSR/SSG for Svelte
// - File-based routing
// - Built-in API routes
<script>
  export let data;
</script>

<h1>{data.title}</h1>

// Astro (Framework-agnostic)
// - Static site generation
// - Partial hydration
// - Use any framework
---
const posts = await fetch('/api/posts').then(r => r.json());
---

<h1>Blog Posts</h1>
{posts.map(post => <article>{post.title}</article>)}
```

## Conclusion

Frontend frameworks provide structure, efficiency, and maintainability for building complex web applications. React offers flexibility and the largest ecosystem, Vue provides an easy learning curve with great documentation, Angular delivers a complete solution for enterprise applications, and Svelte compiles to highly performant vanilla JavaScript. The choice depends on project requirements, team expertise, and specific use cases. Understanding the strengths and tradeoffs of each framework helps make informed decisions for your projects.
