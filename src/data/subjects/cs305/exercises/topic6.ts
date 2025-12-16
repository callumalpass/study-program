import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  // 1. Basic Promise Creation
  {
    id: 'cs305-t6-ex01',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Create a Simple Promise',
    description: 'Write a function `delay(ms)` that returns a Promise that resolves after the specified milliseconds.',
    difficulty: 1,
    language: 'javascript',
    starterCode: `function delay(ms) {
  // Your code here
}`,
    solution: `function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}`,
    testCases: [
      { input: '1000', expectedOutput: 'Promise resolves after 1 second', isHidden: false, description: 'Delay for 1 second' },
      { input: '500', expectedOutput: 'Promise resolves after 0.5 seconds', isHidden: false, description: 'Delay for half second' }
    ],
    hints: [
      'Return a new Promise',
      'Use setTimeout to delay the resolve call',
      'Call resolve() when the timeout completes'
    ]
  },

  // 2. Promise Error Handling
  {
    id: 'cs305-t6-ex02',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Random Success or Failure',
    description: 'Create a function `randomPromise()` that returns a Promise that randomly resolves with "Success!" or rejects with "Failed!" (50% chance each).',
    difficulty: 1,
    language: 'javascript',
    starterCode: `function randomPromise() {
  // Your code here
}`,
    solution: `function randomPromise() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Success!');
    } else {
      reject('Failed!');
    }
  });
}`,
    testCases: [
      { input: '', expectedOutput: '"Success!" or throws "Failed!"', isHidden: false, description: 'Random outcome' }
    ],
    hints: [
      'Use Math.random() to generate a random number between 0 and 1',
      'Call resolve() for success',
      'Call reject() for failure'
    ]
  },

  // 3. Basic Async/Await
  {
    id: 'cs305-t6-ex03',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Convert Promise to Async/Await',
    description: 'Write an async function `waitAndReturn(value, ms)` that waits for the specified milliseconds then returns the value.',
    difficulty: 1,
    language: 'javascript',
    starterCode: `async function waitAndReturn(value, ms) {
  // Your code here
}`,
    solution: `async function waitAndReturn(value, ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
  return value;
}`,
    testCases: [
      { input: '"Hello", 1000', expectedOutput: '"Hello" (after 1 second)', isHidden: false, description: 'Wait and return string' },
      { input: '42, 500', expectedOutput: '42 (after 0.5 seconds)', isHidden: false, description: 'Wait and return number' }
    ],
    hints: [
      'Use await with a delay Promise',
      'Return the value after the delay',
      'The function must be declared as async'
    ]
  },

  // 4. Promise.all Usage
  {
    id: 'cs305-t6-ex04',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Fetch Multiple URLs Concurrently',
    description: 'Write an async function `fetchAll(urls)` that takes an array of URLs and returns a Promise that resolves with an array of all responses. Use Promise.all().',
    difficulty: 2,
    language: 'javascript',
    starterCode: `async function fetchAll(urls) {
  // Your code here
}`,
    solution: `async function fetchAll(urls) {
  const promises = urls.map(url => fetch(url).then(res => res.json()));
  return await Promise.all(promises);
}`,
    testCases: [
      { input: '["https://api.example.com/1", "https://api.example.com/2"]', expectedOutput: 'Array of JSON responses', isHidden: false, description: 'Fetch multiple endpoints' }
    ],
    hints: [
      'Map over the URLs array to create fetch promises',
      'Use Promise.all() to wait for all promises',
      'Each fetch should be converted to JSON',
      'Use await to get the final results'
    ]
  },

  // 5. Try/Catch Error Handling
  {
    id: 'cs305-t6-ex05',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Safe Fetch with Error Handling',
    description: 'Create an async function `safeFetch(url)` that fetches data and returns {success: true, data} on success or {success: false, error} on failure.',
    difficulty: 2,
    language: 'javascript',
    starterCode: `async function safeFetch(url) {
  // Your code here
}`,
    solution: `async function safeFetch(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}`,
    testCases: [
      { input: '"https://api.example.com/success"', expectedOutput: '{success: true, data: {...}}', isHidden: false, description: 'Successful fetch' },
      { input: '"https://api.example.com/404"', expectedOutput: '{success: false, error: "..."}', isHidden: false, description: 'Failed fetch' }
    ],
    hints: [
      'Use try/catch to handle errors',
      'Check response.ok to verify HTTP success',
      'Parse JSON in the try block',
      'Return different objects for success and failure'
    ]
  },

  // 6. Promise.race Implementation
  {
    id: 'cs305-t6-ex06',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Fetch with Timeout',
    description: 'Write a function `fetchWithTimeout(url, timeout)` that races a fetch request against a timeout. Reject if timeout is reached first.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `async function fetchWithTimeout(url, timeout) {
  // Your code here
}`,
    solution: `async function fetchWithTimeout(url, timeout) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeout);
  });

  return Promise.race([
    fetch(url).then(res => res.json()),
    timeoutPromise
  ]);
}`,
    testCases: [
      { input: '"https://api.example.com/fast", 5000', expectedOutput: 'Data from API', isHidden: false, description: 'Fast response within timeout' },
      { input: '"https://api.example.com/slow", 1000', expectedOutput: 'Throws "Request timeout"', isHidden: false, description: 'Timeout exceeded' }
    ],
    hints: [
      'Create a timeout promise that rejects after the specified time',
      'Use Promise.race() to race the fetch against the timeout',
      'The first promise to settle wins'
    ]
  },

  // 7. Sequential Async Operations
  {
    id: 'cs305-t6-ex07',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Process Items Sequentially',
    description: 'Write an async function `processSequentially(items, asyncFn)` that processes an array of items one by one (not in parallel) using the provided async function. Return array of results.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `async function processSequentially(items, asyncFn) {
  // Your code here
}`,
    solution: `async function processSequentially(items, asyncFn) {
  const results = [];
  for (const item of items) {
    const result = await asyncFn(item);
    results.push(result);
  }
  return results;
}`,
    testCases: [
      { input: '[1, 2, 3], async (x) => x * 2', expectedOutput: '[2, 4, 6]', isHidden: false, description: 'Sequential processing' }
    ],
    hints: [
      'Use a for...of loop to iterate sequentially',
      'Await each async function call before proceeding',
      'Collect results in an array',
      'Do not use map() as it processes in parallel'
    ]
  },

  // 8. Retry Logic
  {
    id: 'cs305-t6-ex08',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Retry Failed Requests',
    description: 'Create an async function `retryFetch(url, maxRetries)` that retries a failed fetch request up to maxRetries times before giving up.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `async function retryFetch(url, maxRetries) {
  // Your code here
}`,
    solution: `async function retryFetch(url, maxRetries) {
  let lastError;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      return await response.json();
    } catch (error) {
      lastError = error;
      if (i < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }
  throw lastError;
}`,
    testCases: [
      { input: '"https://api.example.com/unreliable", 3', expectedOutput: 'Data or throws after 3 retries', isHidden: false, description: 'Retry up to 3 times' }
    ],
    hints: [
      'Use a for loop from 0 to maxRetries',
      'Try the fetch in each iteration',
      'Catch errors and retry if attempts remain',
      'Add exponential backoff between retries (optional but good practice)',
      'Throw the last error if all retries fail'
    ]
  },

  // 9. Debounced Async Function
  {
    id: 'cs305-t6-ex09',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Create Debounced Fetch',
    description: 'Write a function `createDebouncedFetch(delay)` that returns a debounced fetch function. Multiple calls within the delay period should cancel previous pending requests.',
    difficulty: 4,
    language: 'javascript',
    starterCode: `function createDebouncedFetch(delay) {
  // Your code here
}`,
    solution: `function createDebouncedFetch(delay) {
  let timeoutId;
  let abortController;

  return async function(url) {
    clearTimeout(timeoutId);
    if (abortController) {
      abortController.abort();
    }

    abortController = new AbortController();

    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          const response = await fetch(url, { signal: abortController.signal });
          const data = await response.json();
          resolve(data);
        } catch (error) {
          if (error.name !== 'AbortError') {
            reject(error);
          }
        }
      }, delay);
    });
  };
}`,
    testCases: [
      { input: '500 delay, multiple rapid calls', expectedOutput: 'Only last call executes', isHidden: false, description: 'Debouncing effect' }
    ],
    hints: [
      'Use a closure to maintain timeout and abort controller state',
      'Clear the previous timeout on each call',
      'Use AbortController to cancel pending fetch requests',
      'Return a new promise that resolves with the fetch result'
    ]
  },

  // 10. Parallel with Limit
  {
    id: 'cs305-t6-ex10',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Limit Concurrent Requests',
    description: 'Create an async function `fetchWithConcurrencyLimit(urls, limit)` that fetches URLs with a maximum of `limit` concurrent requests at a time.',
    difficulty: 4,
    language: 'javascript',
    starterCode: `async function fetchWithConcurrencyLimit(urls, limit) {
  // Your code here
}`,
    solution: `async function fetchWithConcurrencyLimit(urls, limit) {
  const results = [];
  const executing = [];

  for (const url of urls) {
    const promise = fetch(url).then(res => res.json());
    results.push(promise);

    if (limit <= urls.length) {
      const e = promise.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= limit) {
        await Promise.race(executing);
      }
    }
  }

  return Promise.all(results);
}`,
    testCases: [
      { input: '10 URLs, limit of 3', expectedOutput: 'Max 3 requests at a time', isHidden: false, description: 'Concurrency control' }
    ],
    hints: [
      'Keep track of currently executing promises',
      'When limit is reached, wait for one to complete before starting another',
      'Use Promise.race() to wait for the first completion',
      'Remove completed promises from the executing array',
      'Use Promise.all() to get all results at the end'
    ]
  },

  // 11. Data Transformation Pipeline
  {
    id: 'cs305-t6-ex11',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Process API Response',
    description: 'Write an async function `fetchAndTransform(url)` that fetches data, filters items where status is "active", and maps to extract only id and name fields.',
    difficulty: 2,
    language: 'javascript',
    starterCode: `async function fetchAndTransform(url) {
  // Your code here
}`,
    solution: `async function fetchAndTransform(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data
    .filter(item => item.status === 'active')
    .map(item => ({ id: item.id, name: item.name }));
}`,
    testCases: [
      { input: '"https://api.example.com/users"', expectedOutput: '[{id: 1, name: "Alice"}, ...]', isHidden: false, description: 'Filter and transform user data' }
    ],
    hints: [
      'Fetch and parse JSON first',
      'Use filter() to keep only active items',
      'Use map() to extract desired fields',
      'Chain the array methods'
    ]
  },

  // 12. Cached Fetch
  {
    id: 'cs305-t6-ex12',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Implement Fetch Cache',
    description: 'Create a function `createCachedFetch()` that returns a fetch function with caching. If the same URL is requested again, return cached data instead of fetching.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `function createCachedFetch() {
  // Your code here
}`,
    solution: `function createCachedFetch() {
  const cache = new Map();

  return async function(url) {
    if (cache.has(url)) {
      return cache.get(url);
    }

    const response = await fetch(url);
    const data = await response.json();
    cache.set(url, data);
    return data;
  };
}`,
    testCases: [
      { input: 'Same URL called twice', expectedOutput: 'Second call returns cached data', isHidden: false, description: 'Cache hit' },
      { input: 'Different URLs', expectedOutput: 'Each URL fetched once', isHidden: false, description: 'Different cache entries' }
    ],
    hints: [
      'Use a Map to store cached responses',
      'Check if URL exists in cache before fetching',
      'Store the parsed data in cache after first fetch',
      'Return cached data on subsequent calls'
    ]
  },

  // 13. Promise Chain Error Recovery
  {
    id: 'cs305-t6-ex13',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Fallback Data Source',
    description: 'Write an async function `fetchWithFallback(primaryUrl, fallbackUrl)` that tries the primary URL first, and falls back to the fallback URL if primary fails.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `async function fetchWithFallback(primaryUrl, fallbackUrl) {
  // Your code here
}`,
    solution: `async function fetchWithFallback(primaryUrl, fallbackUrl) {
  try {
    const response = await fetch(primaryUrl);
    if (!response.ok) throw new Error('Primary failed');
    return await response.json();
  } catch (error) {
    const response = await fetch(fallbackUrl);
    if (!response.ok) throw new Error('Both sources failed');
    return await response.json();
  }
}`,
    testCases: [
      { input: 'Working primary URL', expectedOutput: 'Data from primary', isHidden: false, description: 'Primary success' },
      { input: 'Failed primary, working fallback', expectedOutput: 'Data from fallback', isHidden: false, description: 'Fallback success' }
    ],
    hints: [
      'Try primary URL in a try block',
      'Catch errors and try fallback URL',
      'Check response.ok for both attempts',
      'Throw error if both fail'
    ]
  },

  // 14. Async Iterator
  {
    id: 'cs305-t6-ex14',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Paginated Data Fetcher',
    description: 'Create an async function `fetchAllPages(baseUrl)` that fetches paginated data until there are no more pages. Each response has {data: [], nextPage: url|null}.',
    difficulty: 4,
    language: 'javascript',
    starterCode: `async function fetchAllPages(baseUrl) {
  // Your code here
}`,
    solution: `async function fetchAllPages(baseUrl) {
  const allData = [];
  let url = baseUrl;

  while (url) {
    const response = await fetch(url);
    const page = await response.json();
    allData.push(...page.data);
    url = page.nextPage;
  }

  return allData;
}`,
    testCases: [
      { input: '"https://api.example.com/items?page=1"', expectedOutput: 'All items from all pages', isHidden: false, description: 'Fetch all paginated data' }
    ],
    hints: [
      'Use a while loop to continue fetching while nextPage exists',
      'Accumulate all data in an array',
      'Update the URL to nextPage after each fetch',
      'Stop when nextPage is null'
    ]
  },

  // 15. Promise.allSettled Usage
  {
    id: 'cs305-t6-ex15',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Fetch Multiple with Status',
    description: 'Write an async function `fetchAllWithStatus(urls)` that fetches all URLs and returns results with status for each. Use Promise.allSettled() to get both successes and failures.',
    difficulty: 3,
    language: 'javascript',
    starterCode: `async function fetchAllWithStatus(urls) {
  // Your code here
}`,
    solution: `async function fetchAllWithStatus(urls) {
  const promises = urls.map(url =>
    fetch(url)
      .then(res => res.json())
      .then(data => ({ url, data }))
  );

  const results = await Promise.allSettled(promises);

  return results.map(result => {
    if (result.status === 'fulfilled') {
      return { ...result.value, success: true };
    } else {
      return { url: null, success: false, error: result.reason.message };
    }
  });
}`,
    testCases: [
      { input: '["https://api.example.com/1", "https://api.example.com/fail"]', expectedOutput: '[{success: true, data: ...}, {success: false, error: ...}]', isHidden: false, description: 'Mixed success and failure' }
    ],
    hints: [
      'Map URLs to fetch promises',
      'Use Promise.allSettled() instead of Promise.all()',
      'Check result.status for "fulfilled" or "rejected"',
      'Format the output to include success status and data/error'
    ]
  },

  // 16. Async Queue Processor
  {
    id: 'cs305-t6-ex16',
    subjectId: 'cs305',
    topicId: 'cs305-topic-6',
    title: 'Create Task Queue',
    description: 'Create a class `AsyncQueue` with methods `enqueue(asyncFn)` and `process()`. The process method should execute all queued async functions sequentially and return results.',
    difficulty: 5,
    language: 'javascript',
    starterCode: `class AsyncQueue {
  constructor() {
    // Your code here
  }

  enqueue(asyncFn) {
    // Your code here
  }

  async process() {
    // Your code here
  }
}`,
    solution: `class AsyncQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(asyncFn) {
    this.queue.push(asyncFn);
  }

  async process() {
    const results = [];
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      try {
        const result = await task();
        results.push({ success: true, result });
      } catch (error) {
        results.push({ success: false, error: error.message });
      }
    }
    return results;
  }
}`,
    testCases: [
      { input: 'Queue 3 async functions, call process()', expectedOutput: 'Array of 3 results processed sequentially', isHidden: false, description: 'Sequential task processing' }
    ],
    hints: [
      'Store tasks in an array',
      'Enqueue adds a task to the array',
      'Process uses a while loop to execute tasks one by one',
      'Use try/catch to handle task errors',
      'Return an array of results with success status'
    ]
  }
];
