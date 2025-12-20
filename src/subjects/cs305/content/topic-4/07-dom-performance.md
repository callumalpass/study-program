# DOM Performance

DOM manipulation can be expensive in terms of performance. Understanding how browsers render content and optimizing DOM operations is crucial for building fast, responsive web applications.

## How Browsers Render Content

### The Critical Rendering Path

When the browser loads a page, it follows these steps:

1. **Parse HTML** → Create DOM tree
2. **Parse CSS** → Create CSSOM tree
3. **Combine DOM + CSSOM** → Create Render tree
4. **Layout** (Reflow) → Calculate position and size of elements
5. **Paint** → Draw pixels on screen
6. **Composite** → Combine layers

```
HTML → DOM Tree ┐
                ├→ Render Tree → Layout → Paint → Composite
CSS → CSSOM ────┘
```

## Reflows and Repaints

### Reflow (Layout)

A reflow occurs when the browser recalculates the position and geometry of elements. This is expensive!

**Triggers for reflow:**
- Adding/removing DOM elements
- Changing element size or position
- Changing content (text, images)
- Changing CSS properties like `width`, `height`, `margin`, `padding`
- Changing font size or family
- Window resize
- Accessing certain properties that force layout calculation

```javascript
// Bad: Multiple reflows
const element = document.getElementById('box');
element.style.width = '100px';    // Reflow
element.style.height = '100px';   // Reflow
element.style.margin = '10px';    // Reflow
element.style.padding = '20px';   // Reflow

// Good: Single reflow using cssText
element.style.cssText = 'width: 100px; height: 100px; margin: 10px; padding: 20px;';

// Or: Single reflow using class
element.className = 'box-style';
```

### Repaint

A repaint occurs when visual changes happen without affecting layout. Less expensive than reflow, but still costs performance.

**Triggers for repaint:**
- Changing `color`
- Changing `background-color`
- Changing `visibility`
- Changing `outline`
- Changing `box-shadow`

```javascript
// Only causes repaint (no reflow)
element.style.backgroundColor = 'red';
element.style.color = 'white';
```

### Properties That Force Reflow

Reading certain properties forces the browser to calculate layout immediately:

```javascript
// These properties trigger synchronous reflow
element.offsetWidth
element.offsetHeight
element.offsetTop
element.offsetLeft
element.clientWidth
element.clientHeight
element.scrollWidth
element.scrollHeight
element.getClientRects()
element.getBoundingClientRect()
window.getComputedStyle(element)

// Bad: Causes multiple reflows
for (let i = 0; i < elements.length; i++) {
  elements[i].style.width = element.offsetWidth + 'px'; // Read, then write
}

// Good: Read once, write multiple times
const width = element.offsetWidth;
for (let i = 0; i < elements.length; i++) {
  elements[i].style.width = width + 'px';
}
```

## Batch DOM Changes

### Problem: Individual Changes

```javascript
// Bad: Causes multiple reflows
const list = document.getElementById('list');

for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  list.appendChild(li); // Reflow on each append!
}
```

### Solution 1: DocumentFragment

A `DocumentFragment` is a lightweight container that can hold DOM nodes but isn't part of the DOM tree. Changes to it don't trigger reflows.

```javascript
// Good: Single reflow using DocumentFragment
const list = document.getElementById('list');
const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li); // No reflow
}

list.appendChild(fragment); // Single reflow
```

### Solution 2: Build HTML String

```javascript
// Good: Single reflow using innerHTML
const list = document.getElementById('list');
let html = '';

for (let i = 0; i < 100; i++) {
  html += `<li>Item ${i}</li>`;
}

list.innerHTML = html; // Single reflow
```

### Solution 3: Clone and Replace

```javascript
// Good: Modify offline, then replace
const list = document.getElementById('list');
const clone = list.cloneNode(true);

for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  clone.appendChild(li);
}

list.parentNode.replaceChild(clone, list); // Single reflow
```

## Minimize DOM Access

### Cache DOM References

```javascript
// Bad: Query DOM multiple times
for (let i = 0; i < 1000; i++) {
  document.getElementById('result').innerHTML += i;
}

// Good: Cache the reference
const result = document.getElementById('result');
let html = '';
for (let i = 0; i < 1000; i++) {
  html += i;
}
result.innerHTML = html;
```

### Cache Array Length

```javascript
// Bad: Access length property on each iteration
const items = document.querySelectorAll('.item');
for (let i = 0; i < items.length; i++) {
  items[i].style.color = 'red';
}

// Good: Cache the length
const items = document.querySelectorAll('.item');
const length = items.length;
for (let i = 0; i < length; i++) {
  items[i].style.color = 'red';
}

// Best: Use for...of
const items = document.querySelectorAll('.item');
for (const item of items) {
  item.style.color = 'red';
}
```

## Use CSS Classes Over Inline Styles

```javascript
// Bad: Multiple style changes
element.style.width = '100px';
element.style.height = '100px';
element.style.backgroundColor = 'blue';
element.style.border = '1px solid black';

// Good: Single class change
element.className = 'styled-box';
// or
element.classList.add('styled-box');
```

```css
/* Define styles in CSS */
.styled-box {
  width: 100px;
  height: 100px;
  background-color: blue;
  border: 1px solid black;
}
```

## Debounce Expensive Operations

For events that fire frequently (scroll, resize, input), use debouncing to limit execution.

```javascript
// Without debouncing: Runs many times per second
window.addEventListener('resize', () => {
  console.log('Window resized');
  // Expensive operation
});

// With debouncing: Runs once after user stops resizing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedResize = debounce(() => {
  console.log('Window resized');
  // Expensive operation
}, 250);

window.addEventListener('resize', debouncedResize);
```

### Throttling

Similar to debouncing, but ensures function executes at regular intervals.

```javascript
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Runs at most once every 100ms
const throttledScroll = throttle(() => {
  console.log('Scroll position:', window.scrollY);
}, 100);

window.addEventListener('scroll', throttledScroll);
```

## Use Event Delegation

Instead of attaching many event listeners, use a single listener on a parent element.

```javascript
// Bad: Many event listeners
const buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
  button.addEventListener('click', handleClick); // 100 listeners
});

// Good: Single event listener
const container = document.getElementById('container');
container.addEventListener('click', (e) => {
  if (e.target.matches('.button')) {
    handleClick(e);
  }
}); // 1 listener
```

## Remove Unused Event Listeners

```javascript
function setupComponent() {
  const button = document.getElementById('myButton');

  function handleClick() {
    console.log('Clicked');
  }

  button.addEventListener('click', handleClick);

  // Return cleanup function
  return () => {
    button.removeEventListener('click', handleClick);
  };
}

const cleanup = setupComponent();

// When component is no longer needed
cleanup();
```

## Virtual DOM Concept

Modern frameworks like React use a "virtual DOM" to optimize updates.

### How Virtual DOM Works

1. **Create virtual representation** of the UI in memory (JavaScript objects)
2. **When state changes**, create new virtual DOM
3. **Diff the old and new** virtual DOM
4. **Update only changed parts** in the real DOM

```javascript
// Simplified concept
const virtualDOM = {
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', children: 'Hello' },
    { type: 'p', children: 'World' }
  ]
};

// When state changes, only update what's different
// Instead of rebuilding entire tree
```

### Benefits

- Batches multiple DOM changes
- Minimizes reflows and repaints
- Makes UI updates more predictable
- Enables optimizations through diffing algorithms

## Use requestAnimationFrame for Animations

For smooth animations, use `requestAnimationFrame` which syncs with the browser's refresh rate.

```javascript
// Bad: Using setInterval
let position = 0;
setInterval(() => {
  position += 1;
  element.style.left = position + 'px';
}, 16); // Trying to hit 60fps

// Good: Using requestAnimationFrame
let position = 0;
function animate() {
  position += 1;
  element.style.left = position + 'px';

  if (position < 500) {
    requestAnimationFrame(animate);
  }
}
requestAnimationFrame(animate);
```

## Practical Performance Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DOM Performance Demo</title>
  <style>
    .item {
      padding: 10px;
      margin: 5px;
      background: #f0f0f0;
      border: 1px solid #ddd;
    }
    .highlight {
      background: #ffeb3b;
    }
    #performance {
      position: fixed;
      top: 10px;
      right: 10px;
      background: white;
      padding: 15px;
      border: 2px solid #333;
      font-family: monospace;
    }
  </style>
</head>
<body>
  <div id="performance">
    <div>Time: <span id="time">0</span>ms</div>
  </div>

  <h1>Performance Comparison</h1>

  <button id="badBtn">Bad Method (Slow)</button>
  <button id="goodBtn">Good Method (Fast)</button>
  <button id="clearBtn">Clear</button>

  <div id="container"></div>

  <script>
    const container = document.getElementById('container');
    const timeDisplay = document.getElementById('time');

    // Bad: Multiple reflows
    document.getElementById('badBtn').addEventListener('click', () => {
      container.innerHTML = '';
      const start = performance.now();

      for (let i = 0; i < 1000; i++) {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = `Item ${i}`;
        container.appendChild(div); // Reflow on each append
      }

      const end = performance.now();
      timeDisplay.textContent = (end - start).toFixed(2);
    });

    // Good: Single reflow using DocumentFragment
    document.getElementById('goodBtn').addEventListener('click', () => {
      container.innerHTML = '';
      const start = performance.now();

      const fragment = document.createDocumentFragment();

      for (let i = 0; i < 1000; i++) {
        const div = document.createElement('div');
        div.className = 'item';
        div.textContent = `Item ${i}`;
        fragment.appendChild(div); // No reflow
      }

      container.appendChild(fragment); // Single reflow

      const end = performance.now();
      timeDisplay.textContent = (end - start).toFixed(2);
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
      container.innerHTML = '';
      timeDisplay.textContent = '0';
    });

    // Demonstrate read/write batching
    function demonstrateBatching() {
      const elements = document.querySelectorAll('.item');

      // Bad: Read, write, read, write (causes layout thrashing)
      console.time('Layout Thrashing');
      for (let i = 0; i < elements.length; i++) {
        const width = elements[i].offsetWidth; // Read (forces layout)
        elements[i].style.width = (width + 10) + 'px'; // Write
      }
      console.timeEnd('Layout Thrashing');

      // Good: Read all, then write all
      console.time('Batched');
      const widths = [];
      for (let i = 0; i < elements.length; i++) {
        widths.push(elements[i].offsetWidth); // Read
      }
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.width = (widths[i] + 10) + 'px'; // Write
      }
      console.timeEnd('Batched');
    }

    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        console.log('Scroll ended at:', window.scrollY);
      }, 100);
    });
  </script>
</body>
</html>
```

## Performance Measurement Tools

### Performance API

```javascript
// Measure operation time
const start = performance.now();

// ... expensive operation ...

const end = performance.now();
console.log(`Operation took ${end - start}ms`);
```

### Chrome DevTools

- **Performance Panel**: Record and analyze runtime performance
- **Rendering Tab**: Show paint flashing, layer borders, FPS meter
- **Console Timing**: Use `console.time()` and `console.timeEnd()`

```javascript
console.time('DOM Operation');
// ... code to measure ...
console.timeEnd('DOM Operation');
```

## Best Practices Summary

1. **Batch DOM changes** using DocumentFragment or build HTML strings
2. **Cache DOM queries** - don't query repeatedly
3. **Use CSS classes** instead of inline styles
4. **Read, then write** - avoid layout thrashing
5. **Use event delegation** for many similar elements
6. **Debounce/throttle** expensive operations on frequent events
7. **Remove unused listeners** to prevent memory leaks
8. **Use requestAnimationFrame** for animations
9. **Minimize reflows** by changing fewer layout-affecting properties
10. **Measure performance** to identify bottlenecks

## Summary

DOM performance optimization is critical for smooth, responsive applications:

- **Reflows** (layout recalculation) are expensive
- **Repaints** (visual updates) are less expensive but still costly
- **Batch DOM modifications** to minimize reflows
- **Cache references** to avoid repeated DOM queries
- **Use CSS for styling** instead of JavaScript when possible
- **Event delegation** reduces memory and improves performance
- **Debounce/throttle** frequent events
- **Virtual DOM** concept helps frameworks optimize updates

Understanding these concepts helps you write performant code that provides a better user experience.
