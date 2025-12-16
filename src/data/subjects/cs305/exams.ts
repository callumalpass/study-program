import type { Exam, QuizQuestion } from '../../../core/types';

const midtermQuestions: QuizQuestion[] = [
  // HTML Fundamentals (7 questions)
  {
    id: 'cs305-mid-q1',
    type: 'multiple_choice',
    prompt: 'What is the correct DOCTYPE declaration for HTML5?',
    options: [
      '<!DOCTYPE html>',
      '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN">',
      '<DOCTYPE html5>',
      '<!DOCTYPE HTML5>'
    ],
    correctAnswer: '<!DOCTYPE html>',
    explanation: 'HTML5 uses the simplified DOCTYPE declaration: <!DOCTYPE html>. This is much simpler than previous HTML versions.',
  },
  {
    id: 'cs305-mid-q2',
    type: 'multiple_choice',
    prompt: 'Which HTML element is used for the largest heading?',
    options: ['<head>', '<h6>', '<h1>', '<heading>'],
    correctAnswer: '<h1>',
    explanation: '<h1> represents the highest level heading, with <h6> being the smallest. Headings range from <h1> to <h6>.',
  },
  {
    id: 'cs305-mid-q3',
    type: 'true_false',
    prompt: 'Semantic HTML elements like <article>, <nav>, and <section> provide meaning to the content structure.',
    correctAnswer: 'true',
    explanation: 'Semantic HTML elements describe their meaning to both the browser and developer, improving accessibility and SEO.',
  },
  {
    id: 'cs305-mid-q4',
    type: 'multiple_choice',
    prompt: 'What is the purpose of the alt attribute in an <img> tag?',
    options: [
      'To specify the image source',
      'To provide alternative text if the image cannot be displayed',
      'To set the image alignment',
      'To define the image dimensions'
    ],
    correctAnswer: 'To provide alternative text if the image cannot be displayed',
    explanation: 'The alt attribute provides alternative text for screen readers and displays when images fail to load, improving accessibility.',
  },
  {
    id: 'cs305-mid-q5',
    type: 'multiple_choice',
    prompt: 'Which attribute is used to open a link in a new tab?',
    options: [
      'target="_new"',
      'target="_blank"',
      'new="true"',
      'tab="new"'
    ],
    correctAnswer: 'target="_blank"',
    explanation: 'The target="_blank" attribute on an <a> tag opens the link in a new browser tab or window.',
  },
  {
    id: 'cs305-mid-q6',
    type: 'fill_blank',
    prompt: 'The _____ element is used to create an ordered list in HTML.',
    correctAnswer: '<ol>',
    explanation: 'The <ol> (ordered list) element creates numbered lists, while <ul> creates unordered (bulleted) lists.',
  },
  {
    id: 'cs305-mid-q7',
    type: 'written',
    prompt: 'Explain the difference between block-level and inline elements in HTML. Provide two examples of each.',
    correctAnswer: 'Block-level elements start on a new line and take up the full width available (e.g., <div>, <p>, <h1>). Inline elements do not start on a new line and only take up as much width as necessary (e.g., <span>, <a>, <strong>).',
    explanation: 'Block elements create "blocks" of content and stack vertically, while inline elements flow within text content horizontally.',
  },

  // CSS Styling (7 questions)
  {
    id: 'cs305-mid-q8',
    type: 'multiple_choice',
    prompt: 'Which CSS selector has the highest specificity?',
    options: [
      'Element selector (p)',
      'Class selector (.class)',
      'ID selector (#id)',
      'Universal selector (*)'
    ],
    correctAnswer: 'ID selector (#id)',
    explanation: 'CSS specificity hierarchy: inline styles > IDs > classes/attributes/pseudo-classes > elements/pseudo-elements > universal selector.',
  },
  {
    id: 'cs305-mid-q9',
    type: 'multiple_choice',
    prompt: 'What is the CSS box model order from innermost to outermost?',
    options: [
      'Content, Padding, Border, Margin',
      'Content, Margin, Padding, Border',
      'Content, Border, Padding, Margin',
      'Margin, Border, Padding, Content'
    ],
    correctAnswer: 'Content, Padding, Border, Margin',
    explanation: 'The CSS box model layers from inside out: content area, padding (inside border), border, and margin (outside border).',
  },
  {
    id: 'cs305-mid-q10',
    type: 'true_false',
    prompt: 'The CSS property "display: none;" removes an element from the document flow, while "visibility: hidden;" keeps the space occupied.',
    correctAnswer: 'true',
    explanation: 'display: none completely removes the element from layout, while visibility: hidden hides it but maintains its space.',
  },
  {
    id: 'cs305-mid-q11',
    type: 'code_output',
    prompt: 'What color will the paragraph be?\n```css\np { color: red; }\n.text { color: blue; }\n#unique { color: green; }\n```\n```html\n<p class="text" id="unique" style="color: yellow;">Hello</p>\n```',
    correctAnswer: 'yellow',
    explanation: 'Inline styles have the highest specificity and override all other CSS rules (except !important).',
  },
  {
    id: 'cs305-mid-q12',
    type: 'multiple_choice',
    prompt: 'Which CSS property is used to change the background color?',
    options: [
      'bgcolor',
      'background-color',
      'color',
      'bg-color'
    ],
    correctAnswer: 'background-color',
    explanation: 'The background-color property sets the background color of an element. The color property sets text color.',
  },
  {
    id: 'cs305-mid-q13',
    type: 'fill_blank',
    prompt: 'To center a block element horizontally, you can set its left and right margins to _____.',
    correctAnswer: 'auto',
    explanation: 'Setting margin-left and margin-right to auto (or margin: 0 auto) centers a block element with a defined width.',
  },
  {
    id: 'cs305-mid-q14',
    type: 'written',
    prompt: 'Explain the difference between relative, absolute, and fixed positioning in CSS.',
    correctAnswer: 'Relative positioning moves an element relative to its normal position. Absolute positioning positions an element relative to its nearest positioned ancestor. Fixed positioning positions an element relative to the viewport and stays in place when scrolling.',
    explanation: 'Position types determine how elements are placed: relative (to self), absolute (to parent), fixed (to viewport), and static (default).',
  },

  // JavaScript Fundamentals (6 questions)
  {
    id: 'cs305-mid-q15',
    type: 'multiple_choice',
    prompt: 'Which keyword is used to declare a block-scoped variable in JavaScript?',
    options: ['var', 'let', 'const', 'Both let and const'],
    correctAnswer: 'Both let and const',
    explanation: 'Both let and const are block-scoped. let allows reassignment while const does not. var is function-scoped.',
  },
  {
    id: 'cs305-mid-q16',
    type: 'code_output',
    prompt: 'What is the output?\n```javascript\nconsole.log(typeof null);\n```',
    correctAnswer: 'object',
    explanation: 'typeof null returns "object" due to a historical bug in JavaScript that has been kept for backward compatibility.',
  },
  {
    id: 'cs305-mid-q17',
    type: 'true_false',
    prompt: 'In JavaScript, "==" compares both value and type, while "===" only compares value.',
    correctAnswer: 'false',
    explanation: 'This is backwards. "==" performs type coercion and only compares values, while "===" (strict equality) compares both value and type.',
  },
  {
    id: 'cs305-mid-q18',
    type: 'multiple_choice',
    prompt: 'What will this code output?\n```javascript\nconst arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr.length);\n```',
    options: ['3', '4', 'Error', 'undefined'],
    correctAnswer: '4',
    explanation: 'const prevents reassignment of the variable, but the array itself is mutable. push() adds an element, making length 4.',
  },
  {
    id: 'cs305-mid-q19',
    type: 'fill_blank',
    prompt: 'The _____ method is used to combine two or more arrays in JavaScript.',
    correctAnswer: 'concat',
    explanation: 'The concat() method merges arrays and returns a new array without modifying the original arrays.',
  },
  {
    id: 'cs305-mid-q20',
    type: 'written',
    prompt: 'Explain the difference between function declarations and function expressions in JavaScript. Provide an example of each.',
    correctAnswer: 'Function declarations are hoisted and can be called before they are defined (function foo() {}). Function expressions are not hoisted and must be defined before use (const foo = function() {}). Arrow functions are also function expressions.',
    explanation: 'Function declarations are hoisted to the top of their scope, while function expressions (including arrow functions) are not.',
  },

  // DOM Manipulation (6 questions)
  {
    id: 'cs305-mid-q21',
    type: 'multiple_choice',
    prompt: 'Which method is used to select a single element by its ID?',
    options: [
      'document.querySelector("#id")',
      'document.getElementById("id")',
      'Both are correct',
      'document.getElement("id")'
    ],
    correctAnswer: 'Both are correct',
    explanation: 'Both document.getElementById("id") and document.querySelector("#id") can select an element by ID, though getElementById is more specific.',
  },
  {
    id: 'cs305-mid-q22',
    type: 'multiple_choice',
    prompt: 'What does the addEventListener() method do?',
    options: [
      'Creates a new DOM element',
      'Attaches an event handler to an element',
      'Removes an element from the DOM',
      'Modifies element attributes'
    ],
    correctAnswer: 'Attaches an event handler to an element',
    explanation: 'addEventListener() registers an event handler for a specific event type on an element, allowing response to user interactions.',
  },
  {
    id: 'cs305-mid-q23',
    type: 'true_false',
    prompt: 'The textContent property is safer than innerHTML because it does not parse HTML.',
    correctAnswer: 'true',
    explanation: 'textContent treats content as plain text, preventing XSS attacks. innerHTML parses and renders HTML, which can be a security risk.',
  },
  {
    id: 'cs305-mid-q24',
    type: 'code_output',
    prompt: 'What will be logged?\n```javascript\nconst div = document.createElement("div");\nconsole.log(div.parentNode);\n```',
    correctAnswer: 'null',
    explanation: 'A newly created element has no parent until it is appended to the DOM. parentNode returns null for detached elements.',
  },
  {
    id: 'cs305-mid-q25',
    type: 'fill_blank',
    prompt: 'To add a CSS class to an element, you can use the _____ method on the element\'s classList.',
    correctAnswer: 'add',
    explanation: 'element.classList.add("className") adds a class. Other methods include remove(), toggle(), and contains().',
  },
  {
    id: 'cs305-mid-q26',
    type: 'written',
    prompt: 'Explain event bubbling in the DOM and how you can stop it.',
    correctAnswer: 'Event bubbling is when an event triggered on a child element propagates up through its parent elements. You can stop it using event.stopPropagation() in the event handler.',
    explanation: 'Events bubble up the DOM tree by default. stopPropagation() prevents further propagation, while stopImmediatePropagation() also prevents other handlers on the same element.',
  }
];

const finalQuestions: QuizQuestion[] = [
  // HTML Fundamentals (5 questions)
  {
    id: 'cs305-final-q1',
    type: 'multiple_choice',
    prompt: 'Which HTML5 element is best for a self-contained composition like a blog post?',
    options: ['<div>', '<section>', '<article>', '<aside>'],
    correctAnswer: '<article>',
    explanation: '<article> represents independent, self-contained content that could be distributed separately, like blog posts or news articles.',
  },
  {
    id: 'cs305-final-q2',
    type: 'true_false',
    prompt: 'The <meta> tag can be used to specify character encoding and viewport settings.',
    correctAnswer: 'true',
    explanation: 'Meta tags provide metadata like charset (UTF-8) and viewport settings crucial for responsive design.',
  },
  {
    id: 'cs305-final-q3',
    type: 'multiple_choice',
    prompt: 'What is the correct way to include an external CSS file?',
    options: [
      '<style src="styles.css">',
      '<link rel="stylesheet" href="styles.css">',
      '<css src="styles.css">',
      '<stylesheet>styles.css</stylesheet>'
    ],
    correctAnswer: '<link rel="stylesheet" href="styles.css">',
    explanation: 'The <link> tag with rel="stylesheet" is used to include external CSS files in the <head> section.',
  },
  {
    id: 'cs305-final-q4',
    type: 'fill_blank',
    prompt: 'The HTML attribute _____ is used to make form inputs required before submission.',
    correctAnswer: 'required',
    explanation: 'The required attribute is a boolean attribute that prevents form submission if the field is empty.',
  },
  {
    id: 'cs305-final-q5',
    type: 'multiple_choice',
    prompt: 'Which input type provides a color picker in HTML5?',
    options: ['<input type="picker">', '<input type="color">', '<input type="palette">', '<color-input>'],
    correctAnswer: '<input type="color">',
    explanation: 'HTML5 introduced type="color" which provides a native color picker interface in supporting browsers.',
  },

  // CSS Styling (6 questions)
  {
    id: 'cs305-final-q6',
    type: 'multiple_choice',
    prompt: 'What is the default value of the position property?',
    options: ['relative', 'absolute', 'static', 'fixed'],
    correctAnswer: 'static',
    explanation: 'static is the default positioning. Elements with static positioning follow the normal document flow.',
  },
  {
    id: 'cs305-final-q7',
    type: 'written',
    prompt: 'Explain the difference between padding and margin. How do they affect the box model?',
    correctAnswer: 'Padding is the space inside an element between the content and border, adding to the element\'s size. Margin is the space outside the border, creating distance between elements. Padding affects background color/image, margin does not.',
    explanation: 'Padding is internal spacing (inside border), margin is external spacing (outside border). box-sizing affects how padding impacts total element size.',
  },
  {
    id: 'cs305-final-q8',
    type: 'multiple_choice',
    prompt: 'Which CSS property controls the stacking order of positioned elements?',
    options: ['stack-order', 'z-index', 'layer', 'depth'],
    correctAnswer: 'z-index',
    explanation: 'z-index determines the stack order of positioned elements. Higher values appear in front of lower values.',
  },
  {
    id: 'cs305-final-q9',
    type: 'true_false',
    prompt: 'Flexbox is a one-dimensional layout method for arranging items in rows or columns.',
    correctAnswer: 'true',
    explanation: 'Flexbox is one-dimensional (row OR column). CSS Grid is two-dimensional (rows AND columns simultaneously).',
  },
  {
    id: 'cs305-final-q10',
    type: 'code_output',
    prompt: 'What will the width be?\n```css\n.box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid black;\n  box-sizing: border-box;\n}\n```',
    correctAnswer: '200px',
    explanation: 'box-sizing: border-box includes padding and border in the specified width, so total width remains 200px.',
  },
  {
    id: 'cs305-final-q11',
    type: 'fill_blank',
    prompt: 'The CSS pseudo-class _____ is used to style an element when the mouse hovers over it.',
    correctAnswer: ':hover',
    explanation: ':hover applies styles when the user hovers over an element. Other pseudo-classes include :focus, :active, and :visited.',
  },

  // JavaScript Fundamentals (6 questions)
  {
    id: 'cs305-final-q12',
    type: 'multiple_choice',
    prompt: 'What is the output of: console.log(1 + "2" + 3)?',
    options: ['6', '"123"', '"15"', 'Error'],
    correctAnswer: '"123"',
    explanation: 'JavaScript converts 1 to string and concatenates: "1" + "2" = "12", then "12" + "3" = "123". Type coercion in action.',
  },
  {
    id: 'cs305-final-q13',
    type: 'true_false',
    prompt: 'Arrow functions have their own "this" binding.',
    correctAnswer: 'false',
    explanation: 'Arrow functions do not have their own "this" binding; they inherit "this" from the enclosing lexical scope.',
  },
  {
    id: 'cs305-final-q14',
    type: 'multiple_choice',
    prompt: 'Which array method creates a new array with all elements that pass a test?',
    options: ['map()', 'filter()', 'reduce()', 'forEach()'],
    correctAnswer: 'filter()',
    explanation: 'filter() returns a new array containing only elements that satisfy the provided testing function. map() transforms, reduce() accumulates.',
  },
  {
    id: 'cs305-final-q15',
    type: 'code_output',
    prompt: 'What is logged?\n```javascript\nlet x = 10;\nfunction test() {\n  console.log(x);\n  let x = 20;\n}\ntest();\n```',
    correctAnswer: 'ReferenceError',
    explanation: 'Temporal dead zone: x is hoisted but not initialized. Accessing it before the let declaration causes ReferenceError.',
  },
  {
    id: 'cs305-final-q16',
    type: 'written',
    prompt: 'Explain closures in JavaScript and provide a practical use case.',
    correctAnswer: 'A closure is when a function retains access to variables from its outer scope even after the outer function has returned. Practical uses include data privacy/encapsulation, creating function factories, and maintaining state in callbacks.',
    explanation: 'Closures allow functions to remember their lexical scope. Common in callbacks, event handlers, and module patterns.',
  },
  {
    id: 'cs305-final-q17',
    type: 'fill_blank',
    prompt: 'The _____ operator is used for optional chaining to safely access nested object properties.',
    correctAnswer: '?.',
    explanation: 'Optional chaining (?.) short-circuits and returns undefined if a reference is null/undefined, preventing errors.',
  },

  // DOM Manipulation (5 questions)
  {
    id: 'cs305-final-q18',
    type: 'multiple_choice',
    prompt: 'What is the difference between querySelector() and querySelectorAll()?',
    options: [
      'querySelector() is faster',
      'querySelector() returns one element, querySelectorAll() returns a NodeList',
      'querySelectorAll() only works with classes',
      'They are the same'
    ],
    correctAnswer: 'querySelector() returns one element, querySelectorAll() returns a NodeList',
    explanation: 'querySelector() returns the first matching element or null. querySelectorAll() returns a NodeList of all matches.',
  },
  {
    id: 'cs305-final-q19',
    type: 'true_false',
    prompt: 'Event delegation involves attaching an event listener to a parent element to handle events on its children.',
    correctAnswer: 'true',
    explanation: 'Event delegation uses event bubbling to handle events on child elements through a single listener on the parent, improving performance.',
  },
  {
    id: 'cs305-final-q20',
    type: 'fill_blank',
    prompt: 'To prevent the default behavior of an event (like form submission), use _____.',
    correctAnswer: 'event.preventDefault()',
    explanation: 'event.preventDefault() stops the default action. For example, preventing form submission or link navigation.',
  },
  {
    id: 'cs305-final-q21',
    type: 'multiple_choice',
    prompt: 'Which property contains the actual text content of an element without HTML tags?',
    options: ['innerHTML', 'textContent', 'innerText', 'nodeValue'],
    correctAnswer: 'textContent',
    explanation: 'textContent returns all text content. innerText is aware of styling (hidden elements). innerHTML includes HTML tags.',
  },
  {
    id: 'cs305-final-q22',
    type: 'code_output',
    prompt: 'What happens?\n```javascript\nconst btn = document.querySelector("button");\nbtn.addEventListener("click", () => console.log("A"));\nbtn.addEventListener("click", () => console.log("B"));\n// Button is clicked once\n```',
    correctAnswer: 'A B',
    explanation: 'Multiple event listeners can be attached to the same element. They execute in the order they were added.',
  },

  // Responsive Design (6 questions)
  {
    id: 'cs305-final-q23',
    type: 'multiple_choice',
    prompt: 'What is the purpose of the viewport meta tag?',
    options: [
      'To set the page title',
      'To control the page dimensions and scaling on mobile devices',
      'To include external CSS',
      'To define SEO keywords'
    ],
    correctAnswer: 'To control the page dimensions and scaling on mobile devices',
    explanation: '<meta name="viewport" content="width=device-width, initial-scale=1.0"> ensures proper rendering on mobile devices.',
  },
  {
    id: 'cs305-final-q24',
    type: 'multiple_choice',
    prompt: 'Which approach to responsive design applies styles to larger screens?',
    options: [
      'Mobile-first (min-width media queries)',
      'Desktop-first (max-width media queries)',
      'Both work the same',
      'Neither uses media queries'
    ],
    correctAnswer: 'Mobile-first (min-width media queries)',
    explanation: 'Mobile-first uses min-width to progressively enhance for larger screens. Desktop-first uses max-width to adapt down to smaller screens.',
  },
  {
    id: 'cs305-final-q25',
    type: 'true_false',
    prompt: 'CSS Grid is better than Flexbox for creating one-dimensional layouts.',
    correctAnswer: 'false',
    explanation: 'Flexbox is ideal for one-dimensional layouts (row or column). Grid excels at two-dimensional layouts (rows and columns).',
  },
  {
    id: 'cs305-final-q26',
    type: 'written',
    prompt: 'Explain the difference between relative units (em, rem, %) and absolute units (px) in responsive design.',
    correctAnswer: 'Relative units scale based on context: em relative to parent font-size, rem relative to root font-size, % relative to parent element. Absolute units like px are fixed. Relative units are preferred for responsive design as they adapt to different screen sizes and user preferences.',
    explanation: 'Relative units create fluid, adaptable layouts. px is fixed. rem is often preferred over em for consistency.',
  },
  {
    id: 'cs305-final-q27',
    type: 'fill_blank',
    prompt: 'The CSS property _____ makes images responsive by preventing them from exceeding their container width.',
    correctAnswer: 'max-width: 100%',
    explanation: 'max-width: 100% ensures images scale down to fit containers while maintaining aspect ratio.',
  },
  {
    id: 'cs305-final-q28',
    type: 'code_output',
    prompt: 'At what screen width does the color change to blue?\n```css\nbody { color: red; }\n@media (min-width: 768px) {\n  body { color: blue; }\n}\n```',
    correctAnswer: '768px and above',
    explanation: 'min-width: 768px applies styles when viewport is 768px or wider. This is mobile-first approach.',
  },

  // Asynchronous JavaScript (7 questions)
  {
    id: 'cs305-final-q29',
    type: 'multiple_choice',
    prompt: 'What is a Promise in JavaScript?',
    options: [
      'A synchronous operation',
      'An object representing the eventual completion or failure of an asynchronous operation',
      'A type of loop',
      'A data structure'
    ],
    correctAnswer: 'An object representing the eventual completion or failure of an asynchronous operation',
    explanation: 'Promises represent async operations that will either resolve (success) or reject (failure) in the future.',
  },
  {
    id: 'cs305-final-q30',
    type: 'multiple_choice',
    prompt: 'Which method is used to handle Promise rejections?',
    options: [
      'then()',
      'catch()',
      'finally()',
      'reject()'
    ],
    correctAnswer: 'catch()',
    explanation: 'catch() handles rejected promises. then() handles resolution, finally() runs regardless of outcome.',
  },
  {
    id: 'cs305-final-q31',
    type: 'true_false',
    prompt: 'async/await is syntactic sugar built on top of Promises.',
    correctAnswer: 'true',
    explanation: 'async/await provides cleaner syntax for working with Promises, making asynchronous code look synchronous.',
  },
  {
    id: 'cs305-final-q32',
    type: 'code_output',
    prompt: 'What order will the logs appear?\n```javascript\nconsole.log("1");\nsetTimeout(() => console.log("2"), 0);\nconsole.log("3");\n```',
    correctAnswer: '1, 3, 2',
    explanation: 'setTimeout is asynchronous and goes to the callback queue. Synchronous code (1, 3) executes first, then event loop processes callbacks (2).',
  },
  {
    id: 'cs305-final-q33',
    type: 'written',
    prompt: 'Explain the JavaScript event loop and how it handles asynchronous operations.',
    correctAnswer: 'The event loop continuously checks the call stack and callback queue. Synchronous code executes on the call stack. Asynchronous operations (like setTimeout, fetch) are handled by Web APIs and their callbacks are placed in the callback queue. When the call stack is empty, the event loop moves callbacks from the queue to the stack for execution.',
    explanation: 'Event loop enables non-blocking async behavior. Call stack → Web APIs → Callback Queue → back to Call Stack.',
  },
  {
    id: 'cs305-final-q34',
    type: 'fill_blank',
    prompt: 'The _____ keyword is used before a function to make it return a Promise automatically.',
    correctAnswer: 'async',
    explanation: 'async functions always return a Promise. Use await inside async functions to wait for Promises to resolve.',
  },
  {
    id: 'cs305-final-q35',
    type: 'multiple_choice',
    prompt: 'What does the fetch() API return?',
    options: [
      'The response data directly',
      'A Promise that resolves to a Response object',
      'A callback function',
      'An XMLHttpRequest object'
    ],
    correctAnswer: 'A Promise that resolves to a Response object',
    explanation: 'fetch() returns a Promise that resolves to a Response object. You need to call .json() or .text() to extract the data.',
  },

  // Modern Web Development (7 questions)
  {
    id: 'cs305-final-q36',
    type: 'multiple_choice',
    prompt: 'What is the purpose of a bundler like Webpack or Vite?',
    options: [
      'To compress images',
      'To bundle and optimize JavaScript, CSS, and assets for production',
      'To test code',
      'To deploy applications'
    ],
    correctAnswer: 'To bundle and optimize JavaScript, CSS, and assets for production',
    explanation: 'Bundlers combine multiple files, optimize code, handle dependencies, and prepare assets for production deployment.',
  },
  {
    id: 'cs305-final-q37',
    type: 'true_false',
    prompt: 'ES6 modules use import/export syntax instead of require().',
    correctAnswer: 'true',
    explanation: 'ES6 modules use import/export (standard JavaScript). CommonJS uses require() (Node.js). Modern development favors ES6 modules.',
  },
  {
    id: 'cs305-final-q38',
    type: 'multiple_choice',
    prompt: 'What is the Virtual DOM used for in frameworks like React?',
    options: [
      'To replace the real DOM entirely',
      'To efficiently update the UI by comparing changes before updating the real DOM',
      'To store user data',
      'To handle routing'
    ],
    correctAnswer: 'To efficiently update the UI by comparing changes before updating the real DOM',
    explanation: 'Virtual DOM is an in-memory representation. Frameworks diff changes and update only what changed in the real DOM for performance.',
  },
  {
    id: 'cs305-final-q39',
    type: 'written',
    prompt: 'Explain the concept of Single Page Applications (SPAs) and their advantages over traditional multi-page applications.',
    correctAnswer: 'SPAs load a single HTML page and dynamically update content without full page reloads. Advantages include faster navigation, better user experience, reduced server load, and ability to work offline with service workers. Disadvantages include SEO challenges and larger initial load.',
    explanation: 'SPAs use client-side routing and dynamic content updates. Examples: Gmail, Twitter. Frameworks like React, Vue, Angular enable SPAs.',
  },
  {
    id: 'cs305-final-q40',
    type: 'fill_blank',
    prompt: 'The _____ API allows web applications to work offline and cache resources.',
    correctAnswer: 'Service Worker',
    explanation: 'Service Workers act as proxy servers between web apps and network, enabling offline functionality, push notifications, and background sync.',
  },
  {
    id: 'cs305-final-q41',
    type: 'multiple_choice',
    prompt: 'What is the primary purpose of localStorage?',
    options: [
      'To store data temporarily for the session',
      'To store data persistently in the browser with no expiration',
      'To store cookies',
      'To cache API responses'
    ],
    correctAnswer: 'To store data persistently in the browser with no expiration',
    explanation: 'localStorage persists data even after browser closes. sessionStorage clears on session end. Both store key-value pairs (strings only).',
  },
  {
    id: 'cs305-final-q42',
    type: 'true_false',
    prompt: 'Cross-Origin Resource Sharing (CORS) is a security feature that restricts web pages from making requests to different domains.',
    correctAnswer: 'true',
    explanation: 'CORS is a browser security mechanism that blocks cross-origin HTTP requests unless the server explicitly allows them via headers.',
  }
];

export const cs305Exams: Exam[] = [
  {
    id: 'cs305-midterm',
    subjectId: 'cs305',
    title: 'CS305 Midterm',
    durationMinutes: 90,
    questions: midtermQuestions
  },
  {
    id: 'cs305-final',
    subjectId: 'cs305',
    title: 'CS305 Final',
    durationMinutes: 180,
    questions: finalQuestions
  }
];
