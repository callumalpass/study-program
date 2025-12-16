# Modifying the DOM

Once you can select elements, the next step is modifying them. JavaScript provides numerous methods to change content, structure, attributes, and styles of DOM elements dynamically.

## Changing Content

### innerHTML

The `innerHTML` property gets or sets the HTML content inside an element. It parses the string as HTML.

```javascript
const container = document.getElementById('container');

// Get HTML content
console.log(container.innerHTML);

// Set HTML content
container.innerHTML = '<h1>New Heading</h1><p>New paragraph</p>';

// Append to existing content
container.innerHTML += '<p>Additional paragraph</p>';
```

```html
<div id="content">
  <p>Original content</p>
</div>

<script>
  const content = document.getElementById('content');

  // Replace content
  content.innerHTML = '<h2>Updated</h2><p>New text</p>';

  // Warning: This can be dangerous with user input
  // const userInput = '<img src=x onerror="alert(\'XSS\')">';
  // content.innerHTML = userInput; // Security risk!
</script>
```

### textContent

The `textContent` property gets or sets the text content of an element and its descendants. It does not parse HTML.

```javascript
const paragraph = document.querySelector('p');

// Get text (without HTML tags)
console.log(paragraph.textContent);

// Set text (HTML characters are escaped)
paragraph.textContent = '<strong>This will not be bold</strong>';
// Displays: <strong>This will not be bold</strong>
```

```html
<div id="message">
  <p>Hello <strong>World</strong></p>
</div>

<script>
  const message = document.getElementById('message');

  // Get all text content
  console.log(message.textContent); // "Hello World"

  // Set text content (removes all child elements)
  message.textContent = 'Plain text only';

  // Safe for user input (no XSS risk)
  const userInput = '<script>alert("XSS")</script>';
  message.textContent = userInput; // Displayed as plain text
</script>
```

### innerText vs textContent

`innerText` considers styling and is slower than `textContent`.

```javascript
const element = document.querySelector('.hidden');

// textContent returns text even if hidden
console.log(element.textContent); // Returns text

// innerText respects CSS display
console.log(element.innerText); // May return empty string if display: none
```

## Creating Elements

### createElement

Creates a new element node that you can then configure and insert into the DOM.

```javascript
// Create a new paragraph
const newParagraph = document.createElement('p');
newParagraph.textContent = 'This is a new paragraph';
newParagraph.className = 'highlight';

// Create an image
const img = document.createElement('img');
img.src = 'photo.jpg';
img.alt = 'Description';
img.width = 300;
```

### createTextNode

Creates a text node (though using `textContent` is usually simpler).

```javascript
const textNode = document.createTextNode('Hello World');
const paragraph = document.createElement('p');
paragraph.appendChild(textNode);
```

## Inserting Elements

### appendChild

Adds a node as the last child of a parent element.

```javascript
const container = document.getElementById('container');
const newDiv = document.createElement('div');
newDiv.textContent = 'New content';

container.appendChild(newDiv);
```

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<script>
  const list = document.getElementById('list');

  // Create and append new list item
  const newItem = document.createElement('li');
  newItem.textContent = 'Item 3';
  list.appendChild(newItem);

  // Result:
  // <ul id="list">
  //   <li>Item 1</li>
  //   <li>Item 2</li>
  //   <li>Item 3</li>  ← Added here
  // </ul>
</script>
```

### insertBefore

Inserts a node before a specified child node.

```javascript
const list = document.getElementById('list');
const newItem = document.createElement('li');
newItem.textContent = 'Item 0';

// Insert before the first child
const firstItem = list.firstElementChild;
list.insertBefore(newItem, firstItem);
```

### append and prepend (Modern)

More flexible methods that can accept multiple nodes and strings.

```javascript
const container = document.getElementById('container');

// Prepend (add to beginning)
container.prepend('Text at start', document.createElement('hr'));

// Append (add to end)
container.append('Text at end', document.createElement('hr'));

// Can accept multiple arguments
const div1 = document.createElement('div');
const div2 = document.createElement('div');
container.append(div1, 'Some text', div2);
```

### insertAdjacentHTML

Inserts HTML at a specified position relative to an element.

```javascript
const element = document.getElementById('target');

// beforebegin: before the element itself
element.insertAdjacentHTML('beforebegin', '<p>Before</p>');

// afterbegin: inside the element, before its first child
element.insertAdjacentHTML('afterbegin', '<p>First child</p>');

// beforeend: inside the element, after its last child
element.insertAdjacentHTML('beforeend', '<p>Last child</p>');

// afterend: after the element itself
element.insertAdjacentHTML('afterend', '<p>After</p>');
```

```html
<!-- Before -->
<div id="target">
  <p>Original content</p>
</div>

<script>
  const target = document.getElementById('target');

  target.insertAdjacentHTML('beforebegin', '<div>Before target</div>');
  target.insertAdjacentHTML('afterbegin', '<p>First inside</p>');
  target.insertAdjacentHTML('beforeend', '<p>Last inside</p>');
  target.insertAdjacentHTML('afterend', '<div>After target</div>');
</script>

<!-- After -->
<div>Before target</div>
<div id="target">
  <p>First inside</p>
  <p>Original content</p>
  <p>Last inside</p>
</div>
<div>After target</div>
```

## Removing Elements

### removeChild

Removes a child node from the DOM.

```javascript
const list = document.getElementById('list');
const firstItem = list.firstElementChild;
list.removeChild(firstItem);
```

### remove (Modern)

Removes the element directly without needing parent reference.

```javascript
const element = document.getElementById('unwanted');
element.remove(); // Simpler!
```

```html
<ul id="list">
  <li class="item">Item 1</li>
  <li class="item">Item 2</li>
  <li class="item">Item 3</li>
</ul>

<button id="removeFirst">Remove First</button>
<button id="removeAll">Remove All</button>

<script>
  const list = document.getElementById('list');

  // Remove first item
  document.getElementById('removeFirst').addEventListener('click', () => {
    const firstItem = list.firstElementChild;
    if (firstItem) {
      firstItem.remove();
    }
  });

  // Remove all items
  document.getElementById('removeAll').addEventListener('click', () => {
    const items = list.querySelectorAll('.item');
    items.forEach(item => item.remove());
  });
</script>
```

## Replacing Elements

### replaceChild

Replaces one child element with another.

```javascript
const list = document.getElementById('list');
const oldItem = list.children[1];
const newItem = document.createElement('li');
newItem.textContent = 'Replacement';

list.replaceChild(newItem, oldItem);
```

### replaceWith (Modern)

Replaces an element with one or more nodes.

```javascript
const oldElement = document.querySelector('.old');
const newElement = document.createElement('div');
newElement.textContent = 'New content';

oldElement.replaceWith(newElement);

// Can replace with multiple nodes
oldElement.replaceWith('Text', document.createElement('hr'), 'More text');
```

## Cloning Elements

### cloneNode

Creates a copy of an element.

```javascript
const original = document.getElementById('template');

// Shallow clone (element only, no children)
const shallowClone = original.cloneNode(false);

// Deep clone (element and all descendants)
const deepClone = original.cloneNode(true);

document.body.appendChild(deepClone);
```

```html
<div id="template" class="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>

<div id="container"></div>

<button id="duplicate">Duplicate Card</button>

<script>
  document.getElementById('duplicate').addEventListener('click', () => {
    const template = document.getElementById('template');
    const container = document.getElementById('container');

    // Deep clone to include all children
    const clone = template.cloneNode(true);

    // Modify the clone
    clone.id = ''; // Remove ID to avoid duplicates
    clone.querySelector('h3').textContent = 'Cloned Card';

    container.appendChild(clone);
  });
</script>
```

## Modifying Attributes

### setAttribute and getAttribute

```javascript
const link = document.querySelector('a');

// Get attribute
const href = link.getAttribute('href');

// Set attribute
link.setAttribute('href', 'https://example.com');
link.setAttribute('target', '_blank');
link.setAttribute('data-id', '123');

// Remove attribute
link.removeAttribute('target');

// Check if attribute exists
if (link.hasAttribute('href')) {
  console.log('Link has href');
}
```

### Direct Property Access

For common attributes, you can use properties directly.

```javascript
const img = document.querySelector('img');

// Using properties (preferred for standard attributes)
img.src = 'photo.jpg';
img.alt = 'A photo';
img.width = 300;
img.className = 'thumbnail';

// Using attributes (needed for custom attributes)
img.setAttribute('data-category', 'nature');
```

## Practical Example: Dynamic Content Generation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Todo List</title>
  <style>
    .todo-item {
      padding: 10px;
      margin: 5px 0;
      border: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .completed {
      text-decoration: line-through;
      opacity: 0.6;
    }
    button {
      margin-left: 10px;
      padding: 5px 10px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <h1>Todo List</h1>

  <div id="input-area">
    <input type="text" id="todo-input" placeholder="Enter a task">
    <button id="add-btn">Add</button>
  </div>

  <div id="todo-list"></div>

  <script>
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');

    function createTodoItem(text) {
      // Create container div
      const todoItem = document.createElement('div');
      todoItem.className = 'todo-item';

      // Create text span
      const textSpan = document.createElement('span');
      textSpan.textContent = text;

      // Create button container
      const buttonContainer = document.createElement('div');

      // Create complete button
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Complete';
      completeBtn.addEventListener('click', () => {
        textSpan.classList.toggle('completed');
        completeBtn.textContent = textSpan.classList.contains('completed')
          ? 'Undo'
          : 'Complete';
      });

      // Create delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        todoItem.remove();
      });

      // Assemble the elements
      buttonContainer.appendChild(completeBtn);
      buttonContainer.appendChild(deleteBtn);
      todoItem.appendChild(textSpan);
      todoItem.appendChild(buttonContainer);

      return todoItem;
    }

    function addTodo() {
      const text = todoInput.value.trim();

      if (text) {
        const todoItem = createTodoItem(text);
        todoList.appendChild(todoItem);
        todoInput.value = '';
        todoInput.focus();
      }
    }

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  </script>
</body>
</html>
```

## Summary

DOM modification is a core skill in web development. Key methods include:

- **Content**: `innerHTML`, `textContent`
- **Creating**: `createElement()`, `createTextNode()`
- **Inserting**: `appendChild()`, `insertBefore()`, `append()`, `prepend()`, `insertAdjacentHTML()`
- **Removing**: `removeChild()`, `remove()`
- **Replacing**: `replaceChild()`, `replaceWith()`
- **Cloning**: `cloneNode()`
- **Attributes**: `setAttribute()`, `getAttribute()`, direct property access

Choose the appropriate method based on your needs, considering performance and security implications.
