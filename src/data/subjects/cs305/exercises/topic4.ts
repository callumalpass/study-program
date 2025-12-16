import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  {
    id: 'cs305-t4-ex01',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Select Element by ID',
    difficulty: 1,
    description: 'Create a function that selects an element by its ID and returns its text content.',
    starterCode: `// Get text content of element with ID
function getTextById(id) {
  // Your code here
}`,
    solution: `function getTextById(id) {
  const element = document.getElementById(id);
  return element ? element.textContent : null;
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<div id="test">Hello</div>\'; getTextById("test")', expectedOutput: 'Hello', isHidden: false, description: 'Should get text content by ID' },
      { input: 'getTextById("nonexistent")', expectedOutput: 'null', isHidden: false, description: 'Should return null for missing element' }
    ],
    hints: [
      'Use document.getElementById()',
      'Check if element exists before accessing properties',
      'textContent gets the text inside an element'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex02',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Select Elements by Class',
    difficulty: 1,
    description: 'Create a function that counts how many elements have a specific class.',
    starterCode: `// Count elements with a class
function countByClass(className) {
  // Your code here
}`,
    solution: `function countByClass(className) {
  const elements = document.getElementsByClassName(className);
  return elements.length;
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<div class="item"></div><div class="item"></div>\'; countByClass("item")', expectedOutput: '2', isHidden: false, description: 'Should count elements by class' },
      { input: 'countByClass("missing")', expectedOutput: '0', isHidden: false, description: 'Should return 0 for missing class' }
    ],
    hints: [
      'Use document.getElementsByClassName()',
      'Returns an HTMLCollection',
      'Access length property to count'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex03',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Query Selector',
    difficulty: 1,
    description: 'Use querySelector to find the first paragraph inside a div with class "container".',
    starterCode: `// Find first paragraph in container
function findFirstParagraph() {
  // Your code here
}`,
    solution: `function findFirstParagraph() {
  return document.querySelector('.container p');
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<div class="container"><p>First</p><p>Second</p></div>\'; findFirstParagraph().textContent', expectedOutput: 'First', isHidden: false, description: 'Should find first paragraph in container' }
    ],
    hints: [
      'querySelector uses CSS selector syntax',
      'Space between selectors means descendant',
      'Returns only the first matching element'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex04',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Query Selector All',
    difficulty: 1,
    description: 'Use querySelectorAll to get all list items and return their text content as an array.',
    starterCode: `// Get text from all list items
function getAllListItemsText() {
  // Your code here
}`,
    solution: `function getAllListItemsText() {
  const items = document.querySelectorAll('li');
  return Array.from(items).map(item => item.textContent);
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<ul><li>A</li><li>B</li><li>C</li></ul>\'; getAllListItemsText()', expectedOutput: '["A", "B", "C"]', isHidden: false, description: 'Should get all li text content' }
    ],
    hints: [
      'querySelectorAll returns a NodeList',
      'Convert NodeList to array with Array.from()',
      'Use map() to extract text from each element'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex05',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Modify Element Text',
    difficulty: 2,
    description: 'Create a function that changes the text content of an element.',
    starterCode: `// Change element text
function changeText(id, newText) {
  // Your code here
}`,
    solution: `function changeText(id, newText) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = newText;
    return true;
  }
  return false;
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<div id="msg">Old</div>\'; changeText("msg", "New"); document.getElementById("msg").textContent', expectedOutput: 'New', isHidden: false, description: 'Should change text content' }
    ],
    hints: [
      'Use getElementById to find the element',
      'Set textContent property to change text',
      'Check if element exists before modifying'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex06',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Add and Remove Classes',
    difficulty: 2,
    description: 'Create functions to add and remove classes from an element.',
    starterCode: `// Toggle class on element
function toggleClass(id, className) {
  // Your code here
}`,
    solution: `function toggleClass(id, className) {
  const element = document.getElementById(id);
  if (element) {
    element.classList.toggle(className);
    return element.classList.contains(className);
  }
  return false;
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<div id="box"></div>\'; toggleClass("box", "active")', expectedOutput: 'true', isHidden: false, description: 'Should add class when not present' },
      { input: 'document.body.innerHTML = \'<div id="box" class="active"></div>\'; toggleClass("box", "active")', expectedOutput: 'false', isHidden: false, description: 'Should remove class when present' }
    ],
    hints: [
      'Use element.classList to work with classes',
      'toggle() adds class if missing, removes if present',
      'contains() checks if class exists'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex07',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Modify Element Attributes',
    difficulty: 2,
    description: 'Create a function that sets multiple attributes on an element.',
    starterCode: `// Set multiple attributes
function setAttributes(id, attributes) {
  // attributes is an object like {href: "...", target: "..."}
  // Your code here
}`,
    solution: `function setAttributes(id, attributes) {
  const element = document.getElementById(id);
  if (element) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    return true;
  }
  return false;
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<a id="link">Link</a>\'; setAttributes("link", {href: "https://example.com", target: "_blank"}); document.getElementById("link").href', expectedOutput: 'https://example.com', isHidden: false, description: 'Should set href attribute' }
    ],
    hints: [
      'Use setAttribute(name, value) to set attributes',
      'Use Object.entries() to iterate over attributes object',
      'forEach() to apply each attribute'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex08',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Create and Append Elements',
    difficulty: 2,
    description: 'Create a function that creates a new paragraph element and appends it to a container.',
    starterCode: `// Create and append paragraph
function addParagraph(containerId, text) {
  // Your code here
}`,
    solution: `function addParagraph(containerId, text) {
  const container = document.getElementById(containerId);
  if (container) {
    const p = document.createElement('p');
    p.textContent = text;
    container.appendChild(p);
    return p;
  }
  return null;
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<div id="container"></div>\'; addParagraph("container", "Hello"); document.getElementById("container").children.length', expectedOutput: '1', isHidden: false, description: 'Should append paragraph to container' }
    ],
    hints: [
      'Use document.createElement() to create elements',
      'Set textContent to add text',
      'Use appendChild() to add element to parent'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex09',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Simple Click Event Handler',
    difficulty: 3,
    description: 'Add a click event listener to a button that increments a counter.',
    starterCode: `// Add click handler to increment counter
function setupCounter(buttonId, counterId) {
  let count = 0;
  // Your code here
}`,
    solution: `function setupCounter(buttonId, counterId) {
  let count = 0;
  const button = document.getElementById(buttonId);
  const counter = document.getElementById(counterId);

  if (button && counter) {
    button.addEventListener('click', () => {
      count++;
      counter.textContent = count;
    });
  }
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<button id="btn"></button><span id="count">0</span>\'; setupCounter("btn", "count"); document.getElementById("btn").click(); document.getElementById("count").textContent', expectedOutput: '1', isHidden: false, description: 'Should increment counter on click' }
    ],
    hints: [
      'Use addEventListener("click", callback)',
      'Update textContent in the event handler',
      'Use closure to maintain count variable'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex10',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Input Event Handler',
    difficulty: 3,
    description: 'Add an input event listener that displays the current value in real-time.',
    starterCode: `// Mirror input value to display element
function mirrorInput(inputId, displayId) {
  // Your code here
}`,
    solution: `function mirrorInput(inputId, displayId) {
  const input = document.getElementById(inputId);
  const display = document.getElementById(displayId);

  if (input && display) {
    input.addEventListener('input', (e) => {
      display.textContent = e.target.value;
    });
  }
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<input id="inp"><div id="disp"></div>\'; mirrorInput("inp", "disp"); const inp = document.getElementById("inp"); inp.value = "test"; inp.dispatchEvent(new Event("input")); document.getElementById("disp").textContent', expectedOutput: 'test', isHidden: false, description: 'Should mirror input value' }
    ],
    hints: [
      'Use "input" event for real-time updates',
      'Event object has target.value for input value',
      'Update display element in event handler'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex11',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Remove Elements',
    difficulty: 3,
    description: 'Create a function that removes all elements with a specific class.',
    starterCode: `// Remove all elements with class
function removeElementsByClass(className) {
  // Your code here
}`,
    solution: `function removeElementsByClass(className) {
  const elements = document.querySelectorAll(\`.\${className}\`);
  elements.forEach(element => element.remove());
  return elements.length;
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<div class="remove"></div><div class="remove"></div><div class="keep"></div>\'; removeElementsByClass("remove")', expectedOutput: '2', isHidden: false, description: 'Should remove elements and return count' }
    ],
    hints: [
      'Use querySelectorAll to find all elements',
      'Call remove() method on each element',
      'forEach works on NodeLists'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex12',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Dynamic List Creation',
    difficulty: 3,
    description: 'Create a function that generates a list from an array of items.',
    starterCode: `// Create ul with li elements from array
function createList(containerId, items) {
  // Your code here
}`,
    solution: `function createList(containerId, items) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const ul = document.createElement('ul');
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });

  container.appendChild(ul);
  return ul;
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<div id="list"></div>\'; createList("list", ["A", "B", "C"]); document.querySelectorAll("li").length', expectedOutput: '3', isHidden: false, description: 'Should create list with 3 items' }
    ],
    hints: [
      'Create ul element first',
      'Loop through items array',
      'Create li for each item and append to ul'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex13',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Event Delegation',
    difficulty: 4,
    description: 'Use event delegation to handle clicks on dynamically added list items.',
    starterCode: `// Setup event delegation for list clicks
function setupListClickHandler(listId, callback) {
  // callback receives the clicked item's text
  // Your code here
}`,
    solution: `function setupListClickHandler(listId, callback) {
  const list = document.getElementById(listId);
  if (!list) return;

  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      callback(e.target.textContent);
    }
  });
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<ul id="list"><li>Item 1</li></ul>\'; let result; setupListClickHandler("list", (text) => result = text); document.querySelector("li").click(); result', expectedOutput: 'Item 1', isHidden: false, description: 'Should handle li click via delegation' }
    ],
    hints: [
      'Add listener to parent element (ul)',
      'Check e.target.tagName to filter clicks',
      'Event bubbles up from child to parent'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex14',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Form Validation',
    difficulty: 4,
    description: 'Create a form validation function that checks if required fields are filled.',
    starterCode: `// Validate form fields
function validateForm(formId) {
  // Return object with isValid and errors array
  // Your code here
}`,
    solution: `function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return { isValid: false, errors: ['Form not found'] };

  const errors = [];
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      errors.push(\`\${field.name || field.id} is required\`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<form id="f"><input name="email" required value=""></form>\'; validateForm("f").isValid', expectedOutput: 'false', isHidden: false, description: 'Should fail validation for empty required field' },
      { input: 'document.body.innerHTML = \'<form id="f"><input name="email" required value="test@test.com"></form>\'; validateForm("f").isValid', expectedOutput: 'true', isHidden: false, description: 'Should pass validation when filled' }
    ],
    hints: [
      'Use querySelectorAll("[required]") to find required fields',
      'Check if value.trim() is empty',
      'Build errors array with field names'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex15',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Prevent Default Form Submission',
    difficulty: 4,
    description: 'Create a form submit handler that prevents default submission and processes data.',
    starterCode: `// Handle form submission
function handleFormSubmit(formId, callback) {
  // callback receives form data as object
  // Your code here
}`,
    solution: `function handleFormSubmit(formId, callback) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    callback(data);
  });
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<form id="f"><input name="username" value="john"></form>\'; let result; handleFormSubmit("f", (data) => result = data); document.getElementById("f").dispatchEvent(new Event("submit")); result.username', expectedOutput: 'john', isHidden: false, description: 'Should pass form data to callback' }
    ],
    hints: [
      'Use e.preventDefault() to stop form submission',
      'FormData API extracts form values',
      'Object.fromEntries converts FormData to object'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t4-ex16',
    subjectId: 'cs305',
    topicId: 'cs305-topic-4',
    title: 'Complete Todo List Manager',
    difficulty: 5,
    description: 'Create a complete todo list manager with add, remove, and toggle functionality.',
    starterCode: `// Create todo list manager
function createTodoList(containerId) {
  // Return object with methods: addTodo, removeTodo, toggleTodo, render
  // Your code here
}`,
    solution: `function createTodoList(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return null;

  let todos = [];
  let nextId = 1;

  function render() {
    container.innerHTML = '';
    const ul = document.createElement('ul');

    todos.forEach(todo => {
      const li = document.createElement('li');
      li.style.textDecoration = todo.completed ? 'line-through' : 'none';
      li.textContent = todo.text;
      li.dataset.id = todo.id;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.onclick = () => removeTodo(todo.id);

      li.onclick = () => toggleTodo(todo.id);
      li.appendChild(deleteBtn);
      ul.appendChild(li);
    });

    container.appendChild(ul);
  }

  function addTodo(text) {
    todos.push({ id: nextId++, text, completed: false });
    render();
  }

  function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    render();
  }

  function toggleTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      render();
    }
  }

  render();

  return {
    addTodo,
    removeTodo,
    toggleTodo,
    render,
    getTodos: () => todos
  };
}`,
    testCases: [
      { input: 'document.body.innerHTML = \'<div id="todos"></div>\'; const mgr = createTodoList("todos"); mgr.addTodo("Test"); mgr.getTodos().length', expectedOutput: '1', isHidden: false, description: 'Should add todo' },
      { input: 'document.body.innerHTML = \'<div id="todos"></div>\'; const mgr = createTodoList("todos"); mgr.addTodo("Test"); mgr.toggleTodo(1); mgr.getTodos()[0].completed', expectedOutput: 'true', isHidden: false, description: 'Should toggle todo completion' }
    ],
    hints: [
      'Maintain todos array as state',
      'Each todo needs unique id, text, and completed status',
      'render() recreates DOM from current state',
      'Event handlers call methods that update state and re-render',
      'Return object with public methods'
    ],
    language: 'javascript'
  }
];
