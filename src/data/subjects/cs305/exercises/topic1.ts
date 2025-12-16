import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs305-t1-ex01',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Create a Basic HTML Document',
    difficulty: 1,
    description: 'Create a function that returns a complete HTML document structure with DOCTYPE, html, head, and body tags. The document should have a title "My First Page" and a heading "Hello World" in the body.',
    starterCode: `// Create a function that returns a basic HTML document
function createHTMLDocument() {
  // Your code here
}`,
    solution: `function createHTMLDocument() {
  return \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Page</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>\`;
}`,
    testCases: [
      { input: '', expectedOutput: '<!DOCTYPE html>', isHidden: false, description: 'Document should include DOCTYPE declaration' },
      { input: '', expectedOutput: '<title>My First Page</title>', isHidden: false, description: 'Document should have correct title' },
      { input: '', expectedOutput: '<h1>Hello World</h1>', isHidden: false, description: 'Body should contain h1 with "Hello World"' }
    ],
    hints: [
      'Start with <!DOCTYPE html> to declare HTML5',
      'Use template literals for multiline strings',
      'Include meta tags for charset and viewport'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex02',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Create a Paragraph with Formatting',
    difficulty: 1,
    description: 'Write a function that creates an HTML paragraph with mixed text formatting. Include bold, italic, and underlined text.',
    starterCode: `// Create a formatted paragraph
function createFormattedParagraph(text, boldText, italicText) {
  // Your code here
}`,
    solution: `function createFormattedParagraph(text, boldText, italicText) {
  return \`<p>\${text} <strong>\${boldText}</strong> and <em>\${italicText}</em> text.</p>\`;
}`,
    testCases: [
      { input: 'createFormattedParagraph("This is", "bold", "italic")', expectedOutput: '<p>This is <strong>bold</strong> and <em>italic</em> text.</p>', isHidden: false, description: 'Should create paragraph with strong and em tags' },
      { input: 'createFormattedParagraph("Here is", "important", "emphasized")', expectedOutput: '<p>Here is <strong>important</strong> and <em>emphasized</em> text.</p>', isHidden: false, description: 'Should work with different text' }
    ],
    hints: [
      'Use <strong> for bold text',
      'Use <em> for italic text',
      'Template literals make string interpolation easier'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex03',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Build an Unordered List',
    difficulty: 1,
    description: 'Create a function that takes an array of items and returns an HTML unordered list.',
    starterCode: `// Create an unordered list from array
function createList(items) {
  // Your code here
}`,
    solution: `function createList(items) {
  const listItems = items.map(item => \`  <li>\${item}</li>\`).join('\\n');
  return \`<ul>\\n\${listItems}\\n</ul>\`;
}`,
    testCases: [
      { input: 'createList(["Apple", "Banana", "Orange"])', expectedOutput: '<ul>\n  <li>Apple</li>\n  <li>Banana</li>\n  <li>Orange</li>\n</ul>', isHidden: false, description: 'Should create ul with li elements' },
      { input: 'createList(["First", "Second"])', expectedOutput: '<ul>\n  <li>First</li>\n  <li>Second</li>\n</ul>', isHidden: false, description: 'Should work with different items' }
    ],
    hints: [
      'Use map() to transform array items into <li> tags',
      'Use join() to combine the array into a string',
      'Wrap everything in <ul> tags'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex04',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Create Hyperlinks',
    difficulty: 1,
    description: 'Write a function that creates an anchor tag with proper attributes including href, title, and target.',
    starterCode: `// Create an anchor link
function createLink(url, text, openInNewTab = false) {
  // Your code here
}`,
    solution: `function createLink(url, text, openInNewTab = false) {
  const target = openInNewTab ? ' target="_blank" rel="noopener noreferrer"' : '';
  return \`<a href="\${url}"\${target}>\${text}</a>\`;
}`,
    testCases: [
      { input: 'createLink("https://example.com", "Example")', expectedOutput: '<a href="https://example.com">Example</a>', isHidden: false, description: 'Should create basic link' },
      { input: 'createLink("https://google.com", "Google", true)', expectedOutput: '<a href="https://google.com" target="_blank" rel="noopener noreferrer">Google</a>', isHidden: false, description: 'Should add target blank for new tab' }
    ],
    hints: [
      'Use the href attribute for the URL',
      'Add target="_blank" for new tab',
      'Include rel="noopener noreferrer" for security'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex05',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Create an Image Tag',
    difficulty: 2,
    description: 'Create a function that generates an img tag with src, alt, width, and height attributes.',
    starterCode: `// Create an image element
function createImage(src, alt, width, height) {
  // Your code here
}`,
    solution: `function createImage(src, alt, width, height) {
  return \`<img src="\${src}" alt="\${alt}" width="\${width}" height="\${height}">\`;
}`,
    testCases: [
      { input: 'createImage("photo.jpg", "A photo", 300, 200)', expectedOutput: '<img src="photo.jpg" alt="A photo" width="300" height="200">', isHidden: false, description: 'Should create img with all attributes' },
      { input: 'createImage("logo.png", "Company logo", 150, 150)', expectedOutput: '<img src="logo.png" alt="Company logo" width="150" height="150">', isHidden: false, description: 'Should work with different values' }
    ],
    hints: [
      'The alt attribute is important for accessibility',
      'Width and height should be numbers (no units)',
      'Self-closing tags don\'t need a closing slash in HTML5'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex06',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Build a Simple Table',
    difficulty: 2,
    description: 'Create a function that generates an HTML table from a 2D array. The first row should be table headers.',
    starterCode: `// Create a table from 2D array
function createTable(data) {
  // Your code here
}`,
    solution: `function createTable(data) {
  if (data.length === 0) return '<table></table>';

  const headers = data[0].map(h => \`    <th>\${h}</th>\`).join('\\n');
  const rows = data.slice(1).map(row => {
    const cells = row.map(cell => \`      <td>\${cell}</td>\`).join('\\n');
    return \`  <tr>\\n\${cells}\\n  </tr>\`;
  }).join('\\n');

  return \`<table>
  <thead>
    <tr>
\${headers}
    </tr>
  </thead>
  <tbody>
\${rows}
  </tbody>
</table>\`;
}`,
    testCases: [
      { input: 'createTable([["Name", "Age"], ["Alice", "25"], ["Bob", "30"]])', expectedOutput: '<table>\n  <thead>\n    <tr>\n    <th>Name</th>\n    <th>Age</th>\n    </tr>\n  </thead>\n  <tbody>\n  <tr>\n      <td>Alice</td>\n      <td>25</td>\n  </tr>\n  <tr>\n      <td>Bob</td>\n      <td>30</td>\n  </tr>\n  </tbody>\n</table>', isHidden: false, description: 'Should create table with thead and tbody' }
    ],
    hints: [
      'Use <thead> for headers and <tbody> for data rows',
      'Headers use <th> tags, data uses <td> tags',
      'The first array is the header row'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex07',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Create a Text Input Form',
    difficulty: 2,
    description: 'Write a function that creates a form with a text input field and a submit button. Include proper labels and attributes.',
    starterCode: `// Create a form with text input
function createTextForm(inputName, labelText, placeholder) {
  // Your code here
}`,
    solution: `function createTextForm(inputName, labelText, placeholder) {
  return \`<form>
  <label for="\${inputName}">\${labelText}</label>
  <input type="text" id="\${inputName}" name="\${inputName}" placeholder="\${placeholder}">
  <button type="submit">Submit</button>
</form>\`;
}`,
    testCases: [
      { input: 'createTextForm("username", "Username:", "Enter your username")', expectedOutput: '<form>\n  <label for="username">Username:</label>\n  <input type="text" id="username" name="username" placeholder="Enter your username">\n  <button type="submit">Submit</button>\n</form>', isHidden: false, description: 'Should create form with label and input' }
    ],
    hints: [
      'Associate label with input using "for" and "id" attributes',
      'The name attribute is used for form submission',
      'Use type="submit" for the button'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex08',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Create a Select Dropdown',
    difficulty: 2,
    description: 'Create a function that generates a select dropdown from an array of options. Include a label and option values.',
    starterCode: `// Create a select dropdown
function createSelect(name, label, options) {
  // Your code here
}`,
    solution: `function createSelect(name, label, options) {
  const optionTags = options.map(opt => \`    <option value="\${opt.toLowerCase()}">\${opt}</option>\`).join('\\n');
  return \`<label for="\${name}">\${label}</label>
<select id="\${name}" name="\${name}">
\${optionTags}
</select>\`;
}`,
    testCases: [
      { input: 'createSelect("country", "Country:", ["USA", "Canada", "Mexico"])', expectedOutput: '<label for="country">Country:</label>\n<select id="country" name="country">\n    <option value="usa">USA</option>\n    <option value="canada">Canada</option>\n    <option value="mexico">Mexico</option>\n</select>', isHidden: false, description: 'Should create select with options' }
    ],
    hints: [
      'Use map() to create option tags from the array',
      'Value attribute should be lowercase for consistency',
      'Associate label with select using "for" attribute'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex09',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Semantic Article Structure',
    difficulty: 3,
    description: 'Create a function that builds a semantic article with header, main content, and footer sections.',
    starterCode: `// Create a semantic article
function createArticle(title, author, date, content) {
  // Your code here
}`,
    solution: `function createArticle(title, author, date, content) {
  return \`<article>
  <header>
    <h2>\${title}</h2>
    <p>By <span class="author">\${author}</span> on <time datetime="\${date}">\${date}</time></p>
  </header>
  <main>
    <p>\${content}</p>
  </main>
  <footer>
    <p>Posted on \${date}</p>
  </footer>
</article>\`;
}`,
    testCases: [
      { input: 'createArticle("My Blog Post", "John Doe", "2024-01-15", "This is the content.")', expectedOutput: '<article>\n  <header>\n    <h2>My Blog Post</h2>\n    <p>By <span class="author">John Doe</span> on <time datetime="2024-01-15">2024-01-15</time></p>\n  </header>\n  <main>\n    <p>This is the content.</p>\n  </main>\n  <footer>\n    <p>Posted on 2024-01-15</p>\n  </footer>\n</article>', isHidden: false, description: 'Should create semantic article structure' }
    ],
    hints: [
      'Use <article> to wrap the entire content',
      'Use <header>, <main>, and <footer> for sections',
      'Use <time> tag with datetime attribute for dates'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex10',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Navigation Menu',
    difficulty: 3,
    description: 'Create a semantic navigation menu using nav, ul, and li elements with proper ARIA attributes.',
    starterCode: `// Create a navigation menu
function createNav(links) {
  // links is an array of objects: [{text: "Home", url: "/"}]
  // Your code here
}`,
    solution: `function createNav(links) {
  const items = links.map(link =>
    \`    <li><a href="\${link.url}">\${link.text}</a></li>\`
  ).join('\\n');

  return \`<nav aria-label="Main navigation">
  <ul>
\${items}
  </ul>
</nav>\`;
}`,
    testCases: [
      { input: 'createNav([{text: "Home", url: "/"}, {text: "About", url: "/about"}])', expectedOutput: '<nav aria-label="Main navigation">\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/about">About</a></li>\n  </ul>\n</nav>', isHidden: false, description: 'Should create semantic nav with links' }
    ],
    hints: [
      'Wrap the list in a <nav> element',
      'Use aria-label for accessibility',
      'Each link should be inside an <li> element'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex11',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Registration Form with Validation',
    difficulty: 3,
    description: 'Create a registration form with email, password, and checkbox inputs. Include HTML5 validation attributes.',
    starterCode: `// Create a registration form
function createRegistrationForm() {
  // Your code here
}`,
    solution: `function createRegistrationForm() {
  return \`<form>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" minlength="8" required>
  </div>
  <div>
    <input type="checkbox" id="terms" name="terms" required>
    <label for="terms">I agree to the terms and conditions</label>
  </div>
  <button type="submit">Register</button>
</form>\`;
}`,
    testCases: [
      { input: '', expectedOutput: 'type="email"', isHidden: false, description: 'Should include email input type' },
      { input: '', expectedOutput: 'required', isHidden: false, description: 'Should have required attributes' },
      { input: '', expectedOutput: 'minlength="8"', isHidden: false, description: 'Password should have minimum length' }
    ],
    hints: [
      'Use type="email" for email validation',
      'Add "required" attribute for mandatory fields',
      'Use minlength for password validation'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex12',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Data List with Descriptions',
    difficulty: 3,
    description: 'Create a function that generates a description list (dl, dt, dd) from an object of term-definition pairs.',
    starterCode: `// Create a description list
function createDescriptionList(terms) {
  // terms is an object like {HTML: "HyperText Markup Language"}
  // Your code here
}`,
    solution: `function createDescriptionList(terms) {
  const items = Object.entries(terms).map(([term, definition]) =>
    \`  <dt>\${term}</dt>\\n  <dd>\${definition}</dd>\`
  ).join('\\n');

  return \`<dl>\\n\${items}\\n</dl>\`;
}`,
    testCases: [
      { input: 'createDescriptionList({HTML: "HyperText Markup Language", CSS: "Cascading Style Sheets"})', expectedOutput: '<dl>\n  <dt>HTML</dt>\n  <dd>HyperText Markup Language</dd>\n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets</dd>\n</dl>', isHidden: false, description: 'Should create dl with dt and dd pairs' }
    ],
    hints: [
      'Use Object.entries() to iterate over the object',
      '<dt> is for the term, <dd> is for the definition',
      'Wrap everything in <dl> tags'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex13',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Responsive Image with srcset',
    difficulty: 4,
    description: 'Create a function that generates a responsive image with srcset and sizes attributes for different screen sizes.',
    starterCode: `// Create a responsive image
function createResponsiveImage(baseName, alt, sizes) {
  // sizes is an array like [{width: 400, size: "400w"}, {width: 800, size: "800w"}]
  // Your code here
}`,
    solution: `function createResponsiveImage(baseName, alt, sizes) {
  const srcset = sizes.map(s => \`\${baseName}-\${s.width}.jpg \${s.size}\`).join(', ');
  const sizesAttr = sizes.map((s, i) =>
    i === sizes.length - 1 ? \`\${s.width}px\` : \`(max-width: \${s.width}px) \${s.width}px\`
  ).join(', ');

  return \`<img src="\${baseName}-\${sizes[0].width}.jpg" srcset="\${srcset}" sizes="\${sizesAttr}" alt="\${alt}">\`;
}`,
    testCases: [
      { input: 'createResponsiveImage("photo", "A photo", [{width: 400, size: "400w"}, {width: 800, size: "800w"}])', expectedOutput: '<img src="photo-400.jpg" srcset="photo-400.jpg 400w, photo-800.jpg 800w" sizes="(max-width: 400px) 400px, 800px" alt="A photo">', isHidden: false, description: 'Should create img with srcset and sizes' }
    ],
    hints: [
      'srcset lists multiple image sources with their widths',
      'sizes tells the browser how wide the image will be displayed',
      'Use map() and join() to build the attribute strings'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex14',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Accessible Form with Fieldsets',
    difficulty: 4,
    description: 'Create a contact form using fieldset and legend for grouping related fields. Include proper ARIA labels.',
    starterCode: `// Create an accessible contact form
function createContactForm() {
  // Your code here
}`,
    solution: `function createContactForm() {
  return \`<form aria-labelledby="contact-heading">
  <h2 id="contact-heading">Contact Us</h2>
  <fieldset>
    <legend>Personal Information</legend>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
  </fieldset>
  <fieldset>
    <legend>Message</legend>
    <label for="subject">Subject:</label>
    <input type="text" id="subject" name="subject" required>
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="5" required></textarea>
  </fieldset>
  <button type="submit">Send Message</button>
</form>\`;
}`,
    testCases: [
      { input: '', expectedOutput: '<fieldset>', isHidden: false, description: 'Should use fieldset for grouping' },
      { input: '', expectedOutput: '<legend>', isHidden: false, description: 'Should use legend for group labels' },
      { input: '', expectedOutput: 'aria-labelledby', isHidden: false, description: 'Should include ARIA attributes' }
    ],
    hints: [
      'Use <fieldset> to group related form fields',
      '<legend> provides a caption for the fieldset',
      'aria-labelledby connects the form to its heading'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex15',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Complex Table with colspan and rowspan',
    difficulty: 4,
    description: 'Create a function that generates a table with merged cells using colspan and rowspan attributes.',
    starterCode: `// Create a table with merged cells
function createComplexTable() {
  // Your code here
}`,
    solution: `function createComplexTable() {
  return \`<table>
  <caption>Student Grades</caption>
  <thead>
    <tr>
      <th rowspan="2">Student</th>
      <th colspan="2">Semester 1</th>
      <th colspan="2">Semester 2</th>
    </tr>
    <tr>
      <th>Midterm</th>
      <th>Final</th>
      <th>Midterm</th>
      <th>Final</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>85</td>
      <td>90</td>
      <td>88</td>
      <td>92</td>
    </tr>
  </tbody>
</table>\`;
}`,
    testCases: [
      { input: '', expectedOutput: 'colspan="2"', isHidden: false, description: 'Should use colspan for horizontal merging' },
      { input: '', expectedOutput: 'rowspan="2"', isHidden: false, description: 'Should use rowspan for vertical merging' },
      { input: '', expectedOutput: '<caption>', isHidden: false, description: 'Should include table caption' }
    ],
    hints: [
      'colspan merges cells horizontally',
      'rowspan merges cells vertically',
      'Use <caption> to give the table a title'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t1-ex16',
    subjectId: 'cs305',
    topicId: 'cs305-topic-1',
    title: 'Complete Semantic Page Structure',
    difficulty: 5,
    description: 'Create a complete HTML5 page structure with semantic elements: header, nav, main, article, aside, and footer. Include proper landmark roles.',
    starterCode: `// Create a complete semantic page
function createSemanticPage(title, navLinks, articleContent, asideContent) {
  // Your code here
}`,
    solution: `function createSemanticPage(title, navLinks, articleContent, asideContent) {
  const nav = navLinks.map(link => \`      <li><a href="\${link.url}">\${link.text}</a></li>\`).join('\\n');

  return \`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>\${title}</title>
</head>
<body>
  <header role="banner">
    <h1>\${title}</h1>
    <nav role="navigation" aria-label="Main navigation">
      <ul>
\${nav}
      </ul>
    </nav>
  </header>
  <main role="main">
    <article>
      <h2>Main Content</h2>
      <p>\${articleContent}</p>
    </article>
    <aside role="complementary">
      <h3>Related Information</h3>
      <p>\${asideContent}</p>
    </aside>
  </main>
  <footer role="contentinfo">
    <p>&copy; 2024 \${title}</p>
  </footer>
</body>
</html>\`;
}`,
    testCases: [
      { input: 'createSemanticPage("My Site", [{text: "Home", url: "/"}], "Article text", "Sidebar text")', expectedOutput: 'role="banner"', isHidden: false, description: 'Should include ARIA landmark roles' },
      { input: 'createSemanticPage("My Site", [{text: "Home", url: "/"}], "Article text", "Sidebar text")', expectedOutput: '<main role="main">', isHidden: false, description: 'Should have main element with role' }
    ],
    hints: [
      'Use semantic HTML5 elements: header, nav, main, article, aside, footer',
      'Add ARIA landmark roles for better accessibility',
      'The page should be a complete valid HTML5 document'
    ],
    language: 'javascript'
  }
];
