# Event Delegation

Event delegation is a powerful pattern that leverages event bubbling to handle events efficiently. Instead of attaching event listeners to individual elements, you attach a single listener to a parent element and handle events from its children.

## Event Propagation

Before understanding event delegation, you need to understand how events propagate through the DOM.

### The Three Phases

When an event occurs, it goes through three phases:

1. **Capturing Phase**: Event travels down from the window to the target element
2. **Target Phase**: Event reaches the target element
3. **Bubbling Phase**: Event bubbles up from the target back to the window

```
Window
  ↓ Capture          ↑ Bubble
Document
  ↓                  ↑
<html>
  ↓                  ↑
<body>
  ↓                  ↑
<div>
  ↓                  ↑
<button> ← Target
```

```html
<div id="outer">
  <div id="middle">
    <button id="inner">Click Me</button>
  </div>
</div>

<script>
  const outer = document.getElementById('outer');
  const middle = document.getElementById('middle');
  const inner = document.getElementById('inner');

  // All listeners in bubble phase (default)
  outer.addEventListener('click', () => {
    console.log('Outer clicked');
  });

  middle.addEventListener('click', () => {
    console.log('Middle clicked');
  });

  inner.addEventListener('click', () => {
    console.log('Inner clicked');
  });

  // When button is clicked, output:
  // "Inner clicked"    ← Target
  // "Middle clicked"   ← Bubbling up
  // "Outer clicked"    ← Bubbling up
</script>
```

## Event Bubbling

Most events bubble up the DOM tree. When you click a button inside a div, the click event fires on the button, then the div, then the body, and so on.

```javascript
document.body.addEventListener('click', (e) => {
  console.log('Body clicked');
});

document.querySelector('#container').addEventListener('click', (e) => {
  console.log('Container clicked');
});

document.querySelector('#button').addEventListener('click', (e) => {
  console.log('Button clicked');
});

// Clicking the button triggers all three handlers:
// 1. Button clicked
// 2. Container clicked
// 3. Body clicked
```

### Stopping Propagation

You can stop an event from bubbling further up the tree.

```javascript
button.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log('Button clicked - event stops here');
});

// Container and body handlers won't fire
```

### stopImmediatePropagation

Stops propagation and prevents other handlers on the same element from executing.

```javascript
button.addEventListener('click', (e) => {
  e.stopImmediatePropagation();
  console.log('First handler - stops others');
});

button.addEventListener('click', () => {
  console.log('Second handler - never runs');
});
```

## Event Capturing

By default, event listeners operate during the bubbling phase. You can listen during the capture phase instead.

```javascript
// Listen during capture phase
element.addEventListener('click', handler, { capture: true });

// Or shorthand
element.addEventListener('click', handler, true);
```

```html
<div id="outer">
  <div id="middle">
    <button id="inner">Click Me</button>
  </div>
</div>

<script>
  const outer = document.getElementById('outer');
  const middle = document.getElementById('middle');
  const inner = document.getElementById('inner');

  // Capture phase listeners
  outer.addEventListener('click', () => {
    console.log('Outer (capture)');
  }, true);

  middle.addEventListener('click', () => {
    console.log('Middle (capture)');
  }, true);

  // Bubble phase listener
  inner.addEventListener('click', () => {
    console.log('Inner (bubble)');
  });

  // When button is clicked, output:
  // "Outer (capture)"   ← Capturing down
  // "Middle (capture)"  ← Capturing down
  // "Inner (bubble)"    ← Target
</script>
```

## What is Event Delegation?

Event delegation is a technique where you add a single event listener to a parent element to handle events for all its children, even those added dynamically.

### Without Event Delegation

```javascript
// Inefficient - one listener per item
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', () => {
    console.log('Item clicked:', item.textContent);
  });
});

// Problem: Newly added items won't have listeners
```

### With Event Delegation

```javascript
// Efficient - one listener for all items
const list = document.getElementById('list');

list.addEventListener('click', (e) => {
  // Check if clicked element is an item
  if (e.target.classList.contains('item')) {
    console.log('Item clicked:', e.target.textContent);
  }
});

// Benefit: Works for dynamically added items too!
```

## Event Target vs CurrentTarget

Understanding the difference is crucial for event delegation.

- `event.target`: The element that triggered the event (the actual clicked element)
- `event.currentTarget`: The element that has the event listener attached

```html
<ul id="list">
  <li class="item">
    <span>Item 1</span>
    <button class="delete">Delete</button>
  </li>
</ul>

<script>
  const list = document.getElementById('list');

  list.addEventListener('click', (e) => {
    console.log('Target:', e.target.tagName);
    // Could be: SPAN, BUTTON, or LI

    console.log('CurrentTarget:', e.currentTarget.tagName);
    // Always: UL (the element with the listener)
  });
</script>
```

## Practical Event Delegation Examples

### Example 1: Todo List

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo List with Event Delegation</title>
  <style>
    .todo-item {
      padding: 10px;
      margin: 5px 0;
      border: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
    }
    .delete-btn {
      background: #f44336;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
    }
    .toggle-btn {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      margin-right: 5px;
    }
    .completed {
      text-decoration: line-through;
      opacity: 0.6;
    }
  </style>
</head>
<body>
  <div>
    <input type="text" id="todo-input" placeholder="New todo">
    <button id="add-btn">Add</button>
  </div>

  <ul id="todo-list"></ul>

  <script>
    const todoList = document.getElementById('todo-list');
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');

    // Single event listener for all todo items
    todoList.addEventListener('click', (e) => {
      const target = e.target;

      // Handle delete button clicks
      if (target.classList.contains('delete-btn')) {
        const todoItem = target.closest('.todo-item');
        todoItem.remove();
      }

      // Handle toggle button clicks
      if (target.classList.contains('toggle-btn')) {
        const todoItem = target.closest('.todo-item');
        const textSpan = todoItem.querySelector('.todo-text');
        textSpan.classList.toggle('completed');
        target.textContent = textSpan.classList.contains('completed')
          ? 'Undo'
          : 'Complete';
      }
    });

    // Add new todos
    function addTodo() {
      const text = todoInput.value.trim();
      if (!text) return;

      const li = document.createElement('li');
      li.className = 'todo-item';
      li.innerHTML = `
        <span class="todo-text">${text}</span>
        <div>
          <button class="toggle-btn">Complete</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;

      todoList.appendChild(li);
      todoInput.value = '';
    }

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTodo();
    });
  </script>
</body>
</html>
```

### Example 2: Dynamic Table

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dynamic Table</title>
  <style>
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 20px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }
    th {
      background: #4CAF50;
      color: white;
    }
    tr:hover {
      background: #f5f5f5;
    }
    .edit-btn, .delete-btn {
      padding: 5px 10px;
      margin: 0 2px;
      cursor: pointer;
    }
    .edit-btn {
      background: #2196F3;
      color: white;
      border: none;
    }
    .delete-btn {
      background: #f44336;
      color: white;
      border: none;
    }
  </style>
</head>
<body>
  <h1>User Management</h1>

  <button id="add-user">Add User</button>

  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody id="user-table">
      <tr data-id="1">
        <td>John Doe</td>
        <td>john@example.com</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

  <script>
    const userTable = document.getElementById('user-table');
    const addUserBtn = document.getElementById('add-user');
    let userId = 2;

    // Event delegation for all table buttons
    userTable.addEventListener('click', (e) => {
      const target = e.target;

      // Delete button clicked
      if (target.classList.contains('delete-btn')) {
        const row = target.closest('tr');
        const userId = row.dataset.id;

        if (confirm(`Delete user ${userId}?`)) {
          row.remove();
        }
      }

      // Edit button clicked
      if (target.classList.contains('edit-btn')) {
        const row = target.closest('tr');
        const nameCell = row.cells[0];
        const emailCell = row.cells[1];

        const newName = prompt('Enter new name:', nameCell.textContent);
        const newEmail = prompt('Enter new email:', emailCell.textContent);

        if (newName) nameCell.textContent = newName;
        if (newEmail) emailCell.textContent = newEmail;
      }
    });

    // Add new user
    addUserBtn.addEventListener('click', () => {
      const name = prompt('Enter name:');
      const email = prompt('Enter email:');

      if (name && email) {
        const row = document.createElement('tr');
        row.dataset.id = userId++;
        row.innerHTML = `
          <td>${name}</td>
          <td>${email}</td>
          <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
          </td>
        `;
        userTable.appendChild(row);
      }
    });
  </script>
</body>
</html>
```

## Using Element.matches() for Better Delegation

The `matches()` method helps check if an element matches a CSS selector, making delegation more flexible.

```javascript
const container = document.getElementById('container');

container.addEventListener('click', (e) => {
  // Check if clicked element matches selector
  if (e.target.matches('.button')) {
    console.log('Button clicked');
  }

  if (e.target.matches('a[href^="http"]')) {
    console.log('External link clicked');
  }

  // Works with complex selectors
  if (e.target.matches('.card .title')) {
    console.log('Card title clicked');
  }
});
```

## Using Element.closest() for Delegation

The `closest()` method finds the nearest ancestor matching a selector, useful when clicking nested elements.

```html
<div id="cards">
  <div class="card" data-id="1">
    <h3 class="card-title">Card Title</h3>
    <p class="card-content">Card content...</p>
    <button class="delete">Delete</button>
  </div>
</div>

<script>
  const cards = document.getElementById('cards');

  cards.addEventListener('click', (e) => {
    // Find the card, even if we clicked a child element
    const card = e.target.closest('.card');

    if (!card) return; // Clicked outside any card

    // Check what was clicked within the card
    if (e.target.matches('.delete')) {
      const cardId = card.dataset.id;
      console.log('Delete card', cardId);
      card.remove();
    }

    if (e.target.matches('.card-title')) {
      console.log('Title clicked');
    }
  });
</script>
```

## Benefits of Event Delegation

1. **Performance**: Fewer event listeners = less memory usage
2. **Dynamic Content**: Works with elements added after page load
3. **Simpler Code**: One handler instead of many
4. **Easier Cleanup**: No need to remove individual listeners

```javascript
// Without delegation - 1000 listeners
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('click', handler); // 1000 listeners
});

// With delegation - 1 listener
const container = document.getElementById('container');
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('item')) {
    handler(e);
  }
}); // 1 listener for all items
```

## When Not to Use Event Delegation

Event delegation isn't always the best choice:

1. **Events that don't bubble**: focus, blur, load, scroll (on elements)
2. **Performance-critical handlers**: Some very frequent events might be slower with delegation
3. **Complex logic**: If checking target becomes complicated

```javascript
// These events don't bubble - can't use delegation
element.addEventListener('focus', handler); // Won't work with delegation

// Use focusin/focusout instead (they do bubble)
container.addEventListener('focusin', (e) => {
  if (e.target.matches('input')) {
    handler(e);
  }
});
```

## Summary

Event delegation is a powerful pattern that:
- Uses event bubbling to handle events on parent elements
- Works with `event.target` to identify the actual clicked element
- Reduces memory usage and improves performance
- Automatically works with dynamically added elements
- Simplifies code by reducing the number of event listeners

Key methods for delegation:
- `event.target` - the element that triggered the event
- `event.currentTarget` - the element with the listener
- `element.matches(selector)` - check if element matches selector
- `element.closest(selector)` - find nearest ancestor matching selector
- `event.stopPropagation()` - stop event from bubbling

Understanding event propagation and delegation is essential for building efficient, scalable web applications.
