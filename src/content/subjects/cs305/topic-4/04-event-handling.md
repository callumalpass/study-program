# Event Handling

Events are actions or occurrences that happen in the browser that your JavaScript code can respond to. Event handling is fundamental to creating interactive web applications.

## What Are Events?

Events are signals that something has happened. Common events include:
- User interactions: clicks, keypresses, mouse movements
- Page lifecycle: page load, DOM ready, unload
- Form events: submit, input changes, focus
- Media events: play, pause, volume change
- Network events: online, offline, fetch complete

## addEventListener Method

The modern and preferred way to attach event handlers to elements.

```javascript
const button = document.getElementById('myButton');

button.addEventListener('click', function() {
  console.log('Button clicked!');
});
```

### Syntax

```javascript
element.addEventListener(eventType, handler, options);
```

- `eventType`: String name of the event (e.g., 'click', 'keydown')
- `handler`: Function to call when event occurs
- `options`: Optional configuration object or boolean

```html
<button id="btn">Click Me</button>

<script>
  const btn = document.getElementById('btn');

  // Basic event listener
  btn.addEventListener('click', function() {
    console.log('Clicked!');
  });

  // Using arrow function
  btn.addEventListener('click', () => {
    console.log('Clicked with arrow function!');
  });

  // Named function (can be removed later)
  function handleClick() {
    console.log('Clicked with named function!');
  }
  btn.addEventListener('click', handleClick);
</script>
```

### Multiple Handlers

You can attach multiple event handlers to the same element and event.

```javascript
const button = document.getElementById('btn');

button.addEventListener('click', () => {
  console.log('First handler');
});

button.addEventListener('click', () => {
  console.log('Second handler');
});

// Both handlers will execute in order
```

## The Event Object

When an event occurs, an event object is automatically passed to the handler function containing information about the event.

```javascript
button.addEventListener('click', function(event) {
  console.log(event.type); // 'click'
  console.log(event.target); // The element clicked
  console.log(event.currentTarget); // The element with the listener
  console.log(event.timeStamp); // When event occurred
});
```

### Common Event Object Properties

```javascript
element.addEventListener('click', (e) => {
  // Event type
  console.log(e.type); // 'click'

  // Element that triggered the event
  console.log(e.target);

  // Element with the event listener
  console.log(e.currentTarget);

  // Mouse position
  console.log(e.clientX, e.clientY); // Relative to viewport
  console.log(e.pageX, e.pageY); // Relative to page
  console.log(e.screenX, e.screenY); // Relative to screen

  // Modifier keys
  console.log(e.ctrlKey); // true if Ctrl held
  console.log(e.shiftKey); // true if Shift held
  console.log(e.altKey); // true if Alt held
  console.log(e.metaKey); // true if Meta/Cmd held
});
```

### Event Methods

```javascript
element.addEventListener('click', (e) => {
  // Prevent default browser behavior
  e.preventDefault();

  // Stop event from bubbling up
  e.stopPropagation();

  // Stop other handlers on same element
  e.stopImmediatePropagation();
});
```

## Common Event Types

### Mouse Events

```javascript
const element = document.getElementById('box');

// Click events
element.addEventListener('click', (e) => {
  console.log('Single click');
});

element.addEventListener('dblclick', (e) => {
  console.log('Double click');
});

// Mouse button events
element.addEventListener('mousedown', (e) => {
  console.log('Mouse button pressed');
});

element.addEventListener('mouseup', (e) => {
  console.log('Mouse button released');
});

// Mouse movement
element.addEventListener('mousemove', (e) => {
  console.log(`Mouse at ${e.clientX}, ${e.clientY}`);
});

element.addEventListener('mouseenter', (e) => {
  console.log('Mouse entered element');
});

element.addEventListener('mouseleave', (e) => {
  console.log('Mouse left element');
});

element.addEventListener('mouseover', (e) => {
  console.log('Mouse over (bubbles)');
});

element.addEventListener('mouseout', (e) => {
  console.log('Mouse out (bubbles)');
});
```

### Keyboard Events

```javascript
const input = document.getElementById('textInput');

input.addEventListener('keydown', (e) => {
  console.log('Key pressed:', e.key);
  console.log('Key code:', e.code);

  // Check for specific keys
  if (e.key === 'Enter') {
    console.log('Enter pressed');
  }

  if (e.key === 'Escape') {
    console.log('Escape pressed');
  }

  // Check for modifier combinations
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault(); // Prevent browser save
    console.log('Ctrl+S pressed');
  }
});

input.addEventListener('keypress', (e) => {
  console.log('Character input:', e.key);
});

input.addEventListener('keyup', (e) => {
  console.log('Key released:', e.key);
});
```

### Form Events

```javascript
const form = document.getElementById('myForm');
const input = document.getElementById('nameInput');

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent page reload
  console.log('Form submitted');
  // Handle form data
});

// Input value changes
input.addEventListener('input', (e) => {
  console.log('Current value:', e.target.value);
});

// Input loses focus
input.addEventListener('blur', (e) => {
  console.log('Input lost focus');
});

// Input gains focus
input.addEventListener('focus', (e) => {
  console.log('Input gained focus');
});

// Value changed and focus lost
input.addEventListener('change', (e) => {
  console.log('Value changed:', e.target.value);
});
```

### Focus Events

```javascript
const input = document.querySelector('input');

input.addEventListener('focus', () => {
  console.log('Input focused');
  input.style.borderColor = 'blue';
});

input.addEventListener('blur', () => {
  console.log('Input blurred');
  input.style.borderColor = '';
});

// focusin and focusout bubble (unlike focus and blur)
input.addEventListener('focusin', () => {
  console.log('Focus in (bubbles)');
});

input.addEventListener('focusout', () => {
  console.log('Focus out (bubbles)');
});
```

### Document and Window Events

```javascript
// Page fully loaded (including images, styles)
window.addEventListener('load', () => {
  console.log('Page fully loaded');
});

// DOM ready (before images load)
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready');
});

// Page about to unload
window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  e.returnValue = ''; // Show confirmation dialog
});

// Window resized
window.addEventListener('resize', () => {
  console.log('Window size:', window.innerWidth, window.innerHeight);
});

// Page scrolled
window.addEventListener('scroll', () => {
  console.log('Scroll position:', window.scrollY);
});
```

## Removing Event Listeners

To remove an event listener, you must use a named function reference.

```javascript
function handleClick() {
  console.log('Clicked');
}

const button = document.getElementById('btn');

// Add listener
button.addEventListener('click', handleClick);

// Remove listener (must use same function reference)
button.removeEventListener('click', handleClick);

// This won't work (different function instance):
button.addEventListener('click', () => console.log('Click'));
button.removeEventListener('click', () => console.log('Click'));
```

## Event Listener Options

### Once Option

Execute handler only once, then automatically remove it.

```javascript
button.addEventListener('click', () => {
  console.log('This runs only once');
}, { once: true });
```

### Passive Option

Indicates the handler won't call `preventDefault()`, allowing browser optimizations.

```javascript
// Good for scroll and touch events
document.addEventListener('touchstart', (e) => {
  // Don't call preventDefault
  console.log('Touch started');
}, { passive: true });
```

### Capture Option

Listen during the capture phase instead of bubble phase (covered in next lesson).

```javascript
element.addEventListener('click', handler, { capture: true });
// Or shorthand:
element.addEventListener('click', handler, true);
```

## Practical Example: Interactive Button

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Interactive Demo</title>
  <style>
    #display {
      padding: 20px;
      margin: 20px 0;
      border: 2px solid #333;
      min-height: 100px;
    }
    .key-info {
      font-family: monospace;
      background: #f0f0f0;
      padding: 10px;
      margin: 5px 0;
    }
    button {
      margin: 5px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover {
      background: #e0e0e0;
    }
    button:active {
      transform: scale(0.95);
    }
  </style>
</head>
<body>
  <h1>Event Handling Demo</h1>

  <div>
    <button id="clickBtn">Click Me</button>
    <button id="dblClickBtn">Double Click Me</button>
    <button id="removeBtn">Remove Listener</button>
  </div>

  <div>
    <input type="text" id="textInput" placeholder="Type something...">
  </div>

  <div id="display">
    <p>Event information will appear here</p>
  </div>

  <script>
    const display = document.getElementById('display');
    const clickBtn = document.getElementById('clickBtn');
    const dblClickBtn = document.getElementById('dblClickBtn');
    const removeBtn = document.getElementById('removeBtn');
    const textInput = document.getElementById('textInput');

    function log(message) {
      const p = document.createElement('p');
      p.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
      display.insertBefore(p, display.firstChild);
    }

    // Click event
    let clickCount = 0;
    function handleClick(e) {
      clickCount++;
      log(`Button clicked ${clickCount} times`);
      log(`Mouse position: (${e.clientX}, ${e.clientY})`);
    }
    clickBtn.addEventListener('click', handleClick);

    // Double click event
    dblClickBtn.addEventListener('dblclick', (e) => {
      log('Button double-clicked!');
      e.target.style.background = '#' + Math.floor(Math.random()*16777215).toString(16);
    });

    // Remove listener
    removeBtn.addEventListener('click', () => {
      clickBtn.removeEventListener('click', handleClick);
      log('Click listener removed from first button');
    });

    // Keyboard events
    textInput.addEventListener('keydown', (e) => {
      const modifiers = [];
      if (e.ctrlKey) modifiers.push('Ctrl');
      if (e.shiftKey) modifiers.push('Shift');
      if (e.altKey) modifiers.push('Alt');

      const modStr = modifiers.length ? modifiers.join('+') + '+' : '';
      log(`Key pressed: ${modStr}${e.key} (code: ${e.code})`);
    });

    // Input event
    textInput.addEventListener('input', (e) => {
      log(`Input value: "${e.target.value}"`);
    });

    // Mouse enter/leave for visual feedback
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        log(`Mouse entered: ${btn.textContent}`);
      });
    });
  </script>
</body>
</html>
```

## Summary

Event handling is essential for creating interactive web pages:

- Use `addEventListener()` for attaching event handlers
- The event object provides detailed information about the event
- Common events: click, input, submit, keydown, load, scroll
- Remove listeners with `removeEventListener()` using named functions
- Options like `once`, `passive`, and `capture` provide additional control
- Always use `preventDefault()` when you want to stop default browser behavior

Understanding events and how to handle them effectively is crucial for building responsive, interactive web applications.
