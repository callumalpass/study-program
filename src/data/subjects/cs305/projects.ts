import type { Project } from '../../../core/types';

export const cs305Projects: Project[] = [
  {
    id: 'cs305-proj1-portfolio',
    subjectId: 'cs305',
    title: 'Personal Portfolio Website',
    description: 'Create a responsive personal portfolio website showcasing your work, skills, and experience using semantic HTML5, modern CSS3, and responsive design principles. The site should work seamlessly across desktop, tablet, and mobile devices.',
    requirements: [
      'Use semantic HTML5 elements (header, nav, main, section, article, footer)',
      'Implement a fully responsive layout using CSS Grid and/or Flexbox',
      'Include at least 4 sections: About, Projects, Skills, and Contact',
      'Apply mobile-first design with at least 2 breakpoints',
      'Use CSS custom properties (variables) for theming',
      'Include smooth scrolling navigation',
      'Ensure accessibility (proper heading hierarchy, alt text, ARIA labels where needed)',
      'Optimize images for web (proper formats and sizes)',
      'Deploy the site to a hosting platform (GitHub Pages, Netlify, or Vercel)'
    ],
    rubric: [
      {
        name: 'HTML Structure & Semantics',
        weight: 20,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Minimal use of semantic HTML. Relies heavily on divs and spans. Missing essential elements.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Some semantic elements used but inconsistently. Basic structure present but could be improved.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Good use of semantic HTML5 elements. Well-structured document with proper hierarchy.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Excellent use of semantic HTML throughout. Perfect document structure with accessibility considerations.'
          }
        ]
      },
      {
        name: 'CSS & Responsive Design',
        weight: 30,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Layout breaks on different screen sizes. Minimal CSS organization. No responsive design patterns.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Basic responsive design with some breakpoints. Layout mostly works but has issues on some devices.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Solid responsive design using modern CSS. Works well across devices with proper breakpoints.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Exceptional responsive design with mobile-first approach. Polished layouts using Grid/Flexbox. Creative use of CSS features.'
          }
        ]
      },
      {
        name: 'Visual Design & User Experience',
        weight: 25,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor visual hierarchy. Inconsistent spacing and typography. Difficult to navigate.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Basic design with some consistency. Readable but lacks polish. Navigation works but could be clearer.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Clean, professional design with good visual hierarchy. Consistent theming. Intuitive navigation.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Outstanding visual design with excellent typography, color scheme, and spacing. Delightful user experience.'
          }
        ]
      },
      {
        name: 'Accessibility & Best Practices',
        weight: 15,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Missing alt text. Poor heading hierarchy. No ARIA labels. Fails basic accessibility checks.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Some accessibility features present. Alt text on most images. Basic heading structure.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Good accessibility practices. Proper alt text, heading hierarchy, and ARIA where needed. Keyboard navigable.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Exceptional accessibility. Passes WCAG AA standards. Thoughtful ARIA implementation. Focus management.'
          }
        ]
      },
      {
        name: 'Code Quality & Deployment',
        weight: 10,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Messy, unorganized code. Not deployed or deployment has issues. No code comments.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Basic code organization. Deployed but with some issues. Minimal documentation.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Clean, well-organized code. Successfully deployed. Good file structure and naming conventions.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Excellent code organization with clear comments. Perfect deployment. Optimized assets and performance.'
          }
        ]
      }
    ],
    estimatedHours: 15,
    scaffolding: {
      overview: 'This project will help you master the fundamentals of web development by building a complete portfolio site from scratch. You\'ll practice semantic HTML, modern CSS layouts, responsive design, and deployment workflows.',
      gettingStarted: [
        'Sketch a wireframe for your portfolio layout on paper or using a tool like Figma',
        'Create a project folder and set up your basic file structure (index.html, styles.css, assets/)',
        'Start with semantic HTML structure before adding any styles',
        'Use browser DevTools to test responsiveness throughout development'
      ],
      milestones: [
        'Complete HTML structure with all semantic elements and content',
        'Implement mobile-first CSS with basic styling and typography',
        'Add responsive layouts using CSS Grid or Flexbox',
        'Implement navigation and smooth scrolling',
        'Add final polish: animations, optimized images, and accessibility features',
        'Deploy to hosting platform and verify all links work'
      ],
      tips: [
        'Start mobile-first: design for small screens first, then add breakpoints for larger screens',
        'Use CSS custom properties for colors, fonts, and spacing to maintain consistency',
        'Test on real devices, not just browser DevTools - behavior can differ',
        'Use relative units (rem, em, %) instead of px for better scalability',
        'Run your site through Lighthouse in Chrome DevTools to check performance and accessibility',
        'Consider using a CSS reset or normalize.css for cross-browser consistency',
        'Keep your color contrast ratio at least 4.5:1 for normal text (use a contrast checker)',
        'Optimize images using tools like TinyPNG or ImageOptim before adding them to your site'
      ]
    }
  },
  {
    id: 'cs305-proj2-todo-app',
    subjectId: 'cs305',
    title: 'Interactive Todo Application',
    description: 'Build a fully functional todo list application using vanilla JavaScript and the DOM API. The app should allow users to create, edit, delete, and filter tasks, with all data persisted to localStorage so tasks survive page refreshes.',
    requirements: [
      'Add new todos with a form input',
      'Mark todos as complete/incomplete with visual feedback',
      'Edit existing todo text inline',
      'Delete individual todos',
      'Filter todos by status (all, active, completed)',
      'Show todo count and completed count',
      'Clear all completed todos with one action',
      'Persist all data using localStorage',
      'Implement keyboard shortcuts (Enter to add, Escape to cancel edit)',
      'Add basic form validation (no empty todos)',
      'Use event delegation for dynamic elements',
      'Create reusable functions with clear separation of concerns'
    ],
    rubric: [
      {
        name: 'Core Functionality',
        weight: 30,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Missing key features. Can add todos but other operations don\'t work reliably.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Most CRUD operations work but with bugs. Some features missing or incomplete.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'All required features implemented and working correctly. Create, read, update, delete all functional.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Flawless implementation of all features plus thoughtful extras (drag-and-drop, due dates, priorities, etc.).'
          }
        ]
      },
      {
        name: 'DOM Manipulation & Events',
        weight: 25,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor DOM manipulation. No event delegation. Events attached incorrectly or inefficiently.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Basic DOM manipulation works. Some use of event delegation. Occasional inefficiencies.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Efficient DOM manipulation. Proper event delegation used. Clean event handling throughout.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Expert-level DOM manipulation. Perfect event delegation. Optimized rendering and updates.'
          }
        ]
      },
      {
        name: 'Data Persistence & State Management',
        weight: 20,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'localStorage not implemented or doesn\'t work. Data lost on refresh. No state management.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Basic localStorage implementation with bugs. State sometimes out of sync with UI.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Solid localStorage implementation. State properly managed and synchronized with UI.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Excellent state management with error handling. Robust localStorage with migration/versioning strategy.'
          }
        ]
      },
      {
        name: 'Code Architecture & Quality',
        weight: 15,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Monolithic code with no organization. Global variables everywhere. No functions or poor function design.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Some organization with functions. Mixed concerns. Could be more modular.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Well-organized code with clear separation of concerns. Reusable functions. Good naming conventions.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Excellent architecture using modules or revealing module pattern. DRY principles. Highly maintainable.'
          }
        ]
      },
      {
        name: 'User Experience & Error Handling',
        weight: 10,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Poor UX with confusing interface. No validation or error handling. Crashes on invalid input.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Basic UX works but not intuitive. Minimal validation. Some error handling present.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Good UX with clear feedback. Proper validation. Graceful error handling throughout.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Exceptional UX with animations and micro-interactions. Comprehensive validation and error handling. Accessibility features.'
          }
        ]
      }
    ],
    estimatedHours: 20,
    scaffolding: {
      overview: 'This project focuses on JavaScript fundamentals and DOM manipulation. You\'ll learn how to create interactive user interfaces, manage application state, and persist data using the browser\'s localStorage API.',
      gettingStarted: [
        'Create the HTML structure with an input form, todo list container, and filter buttons',
        'Style the interface to make it clean and usable',
        'Start with the "add todo" feature first, rendering static todos before making them interactive',
        'Use an array to store your todos in memory, then sync with localStorage later'
      ],
      milestones: [
        'Complete static HTML/CSS mockup of the todo app',
        'Implement adding todos and rendering them to the DOM',
        'Add toggle complete and delete functionality',
        'Implement edit functionality with inline editing',
        'Add filtering (all, active, completed views)',
        'Integrate localStorage for data persistence',
        'Add keyboard shortcuts and polish the UX',
        'Refactor code for better organization and maintainability'
      ],
      tips: [
        'Use a single array as your source of truth - the DOM should always reflect this array',
        'Create a render() function that clears and rebuilds the todo list from your data array',
        'Use event delegation on the parent container instead of adding listeners to each todo',
        'Store todos as objects with properties like {id, text, completed, timestamp}',
        'Use Date.now() or a counter to generate unique IDs for each todo',
        'JSON.stringify() and JSON.parse() are your friends for localStorage',
        'Handle localStorage errors (QuotaExceededError) gracefully',
        'Consider creating helper functions like getTodos(), saveTodos(), addTodo(), etc.',
        'Use data attributes (data-id) to link DOM elements to your data objects',
        'Test edge cases: empty input, very long text, special characters, rapid clicking'
      ]
    }
  },
  {
    id: 'cs305-proj3-weather-dashboard',
    subjectId: 'cs305',
    title: 'Weather Dashboard with API Integration',
    description: 'Create a weather dashboard application that fetches real-time weather data from a public API using async JavaScript. Users should be able to search for cities, view current conditions and forecasts, and save favorite locations.',
    requirements: [
      'Integrate with a weather API (OpenWeatherMap, WeatherAPI, or similar)',
      'Implement city search with autocomplete or suggestions',
      'Display current weather conditions (temperature, conditions, humidity, wind speed)',
      'Show 5-day weather forecast with daily summaries',
      'Allow users to save favorite cities (persisted to localStorage)',
      'Display weather icons and dynamic backgrounds based on conditions',
      'Show loading states while fetching data',
      'Handle API errors gracefully with user-friendly messages',
      'Implement geolocation to detect user\'s current location',
      'Use async/await for all API calls',
      'Add temperature unit toggle (Celsius/Fahrenheit)',
      'Make the UI responsive across all device sizes'
    ],
    rubric: [
      {
        name: 'API Integration & Async JavaScript',
        weight: 30,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'API integration not working or using callbacks instead of async/await. Frequent errors. No error handling.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Basic API integration works but with issues. Some use of async/await. Minimal error handling.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Solid API integration using async/await. Proper error handling. Data fetched and displayed correctly.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Excellent async patterns with Promise.all for multiple requests. Comprehensive error handling. Request optimization and caching.'
          }
        ]
      },
      {
        name: 'Feature Completeness',
        weight: 25,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Only basic weather display. Missing search, forecast, or favorites. Many required features absent.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Core features present but incomplete. Search works but no favorites, or forecast missing details.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'All required features implemented. Search, forecast, favorites, and geolocation all working.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'All features plus thoughtful additions (hourly forecast, weather alerts, charts, air quality, etc.).'
          }
        ]
      },
      {
        name: 'User Interface & Experience',
        weight: 20,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'Confusing layout. No loading states. Poor mobile experience. Doesn\'t respond to different weather conditions.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Basic UI works but lacks polish. Some loading indicators. Responsive but awkward on some devices.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Clean, intuitive interface. Clear loading states. Fully responsive. Weather icons and visual feedback.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Beautiful, engaging UI with animations. Dynamic backgrounds. Skeleton screens. Perfect mobile experience.'
          }
        ]
      },
      {
        name: 'Data Management & State',
        weight: 15,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'No localStorage or favorites don\'t persist. State management chaotic. Data not organized.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Basic favorites persistence. Some state management but could be cleaner.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Solid state management. Favorites properly saved and loaded. Temperature units persist.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Excellent state management with caching strategy. Optimistic updates. Smart data synchronization.'
          }
        ]
      },
      {
        name: 'Error Handling & Edge Cases',
        weight: 10,
        levels: [
          {
            score: 1,
            label: 'Needs Improvement',
            description: 'App crashes on errors. No validation. Doesn\'t handle network failures or invalid input.'
          },
          {
            score: 2,
            label: 'Developing',
            description: 'Basic error handling. Generic error messages. Some edge cases not covered.'
          },
          {
            score: 3,
            label: 'Proficient',
            description: 'Good error handling with user-friendly messages. Validates input. Handles common edge cases.'
          },
          {
            score: 4,
            label: 'Exemplary',
            description: 'Comprehensive error handling. Specific error messages. Graceful degradation. All edge cases handled.'
          }
        ]
      }
    ],
    estimatedHours: 25,
    scaffolding: {
      overview: 'This project will teach you how to work with external APIs, handle asynchronous JavaScript, and create a data-driven application. You\'ll practice making HTTP requests, processing JSON data, and building a responsive interface around dynamic content.',
      gettingStarted: [
        'Sign up for a free API key from OpenWeatherMap or WeatherAPI',
        'Read the API documentation to understand the endpoints and response format',
        'Test API calls using Postman or in the browser console before building the UI',
        'Create a simple HTML structure and test fetching data for a hardcoded city first'
      ],
      milestones: [
        'Complete API integration for current weather (hardcoded city)',
        'Implement search functionality with user input',
        'Add 5-day forecast display',
        'Implement favorites system with localStorage',
        'Add geolocation to detect user\'s city',
        'Implement loading states and error handling',
        'Add temperature unit toggle and dynamic UI elements',
        'Polish responsive design and add visual enhancements'
      ],
      tips: [
        'Store your API key in a constant at the top of your file (never commit to Git in production!)',
        'Use template literals to build API URLs: `${BASE_URL}?q=${city}&appid=${API_KEY}`',
        'Create a generic fetchWeather(city) function that returns a Promise',
        'Use try/catch blocks with async/await to handle errors',
        'Show loading spinners before fetch, hide them in finally block',
        'Parse the API response and extract only the data you need',
        'Create separate functions for current weather vs forecast data',
        'Use Optional Chaining (?.) to safely access nested API response properties',
        'Debounce the search input to avoid making API calls on every keystroke',
        'Consider caching recent searches in localStorage to reduce API calls',
        'Use the Geolocation API: navigator.geolocation.getCurrentPosition()',
        'Display appropriate icons using the API\'s icon codes or map to your own icon set',
        'Handle different error types: network errors, 404 city not found, API rate limits',
        'Test with cities that have special characters or multiple words in the name'
      ]
    }
  }
];
