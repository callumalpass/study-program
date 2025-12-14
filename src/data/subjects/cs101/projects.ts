import { Project } from '../../../core/types';

export const cs101Projects: Project[] = [
  {
    id: 'cs101-project-1',
    subjectId: 'cs101',
    title: 'Student Grade Calculator',
    description: 'Build a command-line application that manages student grades. The program should allow users to add students, record their scores for different assignments, calculate averages, and determine letter grades. The application should save data to a file and load it when the program starts.',
    requirements: [
      'Create a menu system with options to add students, add grades, view student records, and calculate class statistics',
      'Store student data in a dictionary with student names as keys',
      'Each student should have a list of assignment scores',
      'Implement a function to calculate the average grade for each student',
      'Convert numeric grades to letter grades (A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: 0-59)',
      'Save all student data to a JSON file when the program exits',
      'Load existing student data from the file when the program starts',
      'Calculate and display class-wide statistics (highest grade, lowest grade, class average)',
      'Handle invalid input gracefully with appropriate error messages',
      'Include clear instructions and formatting for user interaction'
    ],
    rubric: [
      {
        name: 'Functionality',
        weight: 40,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All required features work correctly, including file I/O, grade calculations, and menu navigation'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Most features work with minor bugs, file I/O may have issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic features work but missing some requirements or has significant bugs'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Many features missing or not working properly'
          }
        ]
      },
      {
        name: 'Code Quality',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Well-organized code with clear function definitions, good variable names, and helpful comments'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Code is readable with some organization and comments'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Code works but lacks organization or clear naming conventions'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Code is difficult to read and poorly organized'
          }
        ]
      },
      {
        name: 'Error Handling',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Comprehensive error handling for invalid input, file errors, and edge cases'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Handles most common errors appropriately'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic error handling present but incomplete'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Little to no error handling, program crashes on invalid input'
          }
        ]
      },
      {
        name: 'User Experience',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Clear instructions, well-formatted output, intuitive menu system'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Generally easy to use with decent formatting'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Functional but could be more user-friendly'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Confusing interface or poor output formatting'
          }
        ]
      }
    ],
    estimatedHours: 8,
    scaffolding: {
      overview: 'Use these guardrails to get working persistence and stats quickly; you still choose the structure.',
      gettingStarted: [
        'Define a gradebook shape: { [studentName]: number[] } and pick a JSON filename.',
        'Add two helpers first: load_data(path) -> dict and save_data(path, data) -> None.',
        'Write a minimal menu loop that only prints options and accepts a choice.'
      ],
      milestones: [
        'Load/save works on a small sample gradebook without the menu.',
        'Menu + add/list students and scores (no averages yet).',
        'Per-student averages + letter grades, plus class min/max/avg.',
        'Input validation and friendly errors for missing students or bad scores.',
        'Polish: clear instructions, formatted output, happy-path demo run.'
      ],
      starterResources: [
        { label: 'Function stubs', description: 'load_data(path), save_data(path), add_student(book, name), add_score(book, name, score), class_stats(book)' },
        { label: 'Sample payload', description: '{"Alice": [90, 82], "Bob": [75]}' }
      ],
      tips: [
        'Keep raw scores in one place; derive averages/letters on demand.',
        'Handle file errors gracefully instead of crashing.',
        'Draft a short “demo script” of inputs before coding to stay focused.'
      ]
    }
  },
  {
    id: 'cs101-project-2',
    subjectId: 'cs101',
    title: 'Text-Based Adventure Game',
    description: 'Create an interactive text-based adventure game where players navigate through different rooms, collect items, and solve puzzles. The game should use dictionaries to represent rooms and their connections, lists to track inventory, and functions to handle game logic. Players should be able to move between rooms, examine objects, use items, and win by completing specific objectives.',
    requirements: [
      'Design at least 6 interconnected rooms with descriptions',
      'Create a room system using dictionaries that define exits (north, south, east, west) and items in each room',
      'Implement an inventory system using a list to track collected items',
      'Create commands for movement (go north, go south, etc.), taking items (take key, take sword), examining the current room, and checking inventory',
      'Design at least 3 items that players can collect and use',
      'Implement a win condition that requires collecting specific items or reaching a specific room',
      'Add a lose condition (optional: health system, dangerous rooms, or limited moves)',
      'Use functions to organize different aspects of the game (move, take_item, check_inventory, etc.)',
      'Include a help command that explains available actions',
      'Write the game state to a file to allow save/load functionality'
    ],
    rubric: [
      {
        name: 'Game Design',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Engaging storyline, creative rooms and items, clear objectives, well-balanced difficulty'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Coherent game with functional rooms and items, reasonable challenge'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic game structure with minimal creativity or challenge'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Incomplete or confusing game design'
          }
        ]
      },
      {
        name: 'Technical Implementation',
        weight: 40,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All features work correctly, uses dictionaries and lists effectively, clean function design'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Most features work, good use of data structures with minor issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic functionality present but limited use of appropriate data structures'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Many technical issues, poor use of data structures'
          }
        ]
      },
      {
        name: 'Code Organization',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Excellent function organization, clear separation of concerns, well-commented'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good use of functions with reasonable organization'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Some function use but could be better organized'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Little function use, poorly organized code'
          }
        ]
      },
      {
        name: 'User Experience',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Immersive descriptions, clear feedback, intuitive commands, helpful error messages'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good descriptions and feedback, generally easy to play'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic descriptions and feedback, playable but not polished'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Confusing or frustrating to play, poor feedback'
          }
        ]
      }
    ],
    estimatedHours: 12,
    scaffolding: {
      overview: 'Get a playable loop fast, then layer story and puzzles. Follow the milestones to avoid rabbit holes.',
      gettingStarted: [
        'Define a rooms dictionary: each room has description, exits {n/s/e/w}, and items [].',
        'Create a command registry mapping strings to handler functions.',
        'Add a game state object: current_room, inventory, move_count, flags.'
      ],
      milestones: [
        'Movement only: go north/south and look prints room description.',
        'Inventory basics: take/drop/list items; block taking what is not present.',
        'Win/lose paths: add one win condition and one failure path.',
        'Save/load: write/read game state (room, inventory, flags) to JSON.',
        'Polish: help command, invalid-command handling, 6+ rooms and 3+ items.'
      ],
      starterResources: [
        { label: 'Room seed', description: 'Three-room sample graph with one key item to test movement + take.' },
        { label: 'Command handlers', description: 'Stub signatures: handle_go(dir), handle_take(item), handle_use(item), handle_help().' }
      ],
      tips: [
        'Parse commands as verb + remainder; normalize to lowercase/trim.',
        'Keep room definitions immutable; store current state separately.',
        'Ship one clear objective first; add side puzzles only after the loop works.'
      ]
    }
  },
  {
    id: 'cs101-project-3',
    subjectId: 'cs101',
    title: 'Personal Budget Tracker',
    description: 'Build a personal finance application that helps users track their income and expenses. The program should allow users to add transactions, categorize them, view spending by category, generate monthly reports, and save/load data from files. This project combines all core Python concepts: variables for amounts, functions for calculations, dictionaries for categories, lists for transaction history, and file I/O for persistence.',
    requirements: [
      'Create a menu-driven interface with options: Add Income, Add Expense, View Transactions, View by Category, Monthly Report, Save & Exit',
      'Store each transaction with: date, type (income/expense), amount, category, and description',
      'Implement at least 5 expense categories (Food, Transport, Entertainment, Bills, Other) and 3 income categories (Salary, Freelance, Other)',
      'Calculate and display running balance after each transaction',
      'Create a function to filter and display transactions by category',
      'Generate a monthly summary showing: total income, total expenses, net savings, and breakdown by category',
      'Save all transaction data to a JSON file with proper formatting',
      'Load existing data when the program starts (handle missing file gracefully)',
      'Validate all user input (positive amounts, valid dates, valid categories)',
      'Display amounts formatted as currency with 2 decimal places',
      'Include a search function to find transactions by description keyword'
    ],
    rubric: [
      {
        name: 'Core Functionality',
        weight: 35,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All transaction types work perfectly, categories function correctly, balance calculations are accurate'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Most features work with minor calculation or display issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic add/view functionality works but missing some features'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Core functionality incomplete or has major bugs'
          }
        ]
      },
      {
        name: 'Data Management',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Perfect file save/load, data persists correctly, handles edge cases'
          },
          {
            score: 75,
            label: 'Good',
            description: 'File operations work with minor issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic save/load works but may lose data or crash on errors'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'File operations missing or non-functional'
          }
        ]
      },
      {
        name: 'Code Quality',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Well-structured with clear functions, good naming, appropriate comments'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Reasonable structure with some functions and organization'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Code works but lacks clear organization'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Disorganized code that is hard to follow'
          }
        ]
      },
      {
        name: 'Reports & Analysis',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Clear, well-formatted reports with category breakdowns and useful statistics'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Reports show key information with decent formatting'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic summary available but limited analysis'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'No meaningful reports or summaries'
          }
        ]
      }
    ],
    estimatedHours: 10,
    scaffolding: {
      overview: 'Build the data backbone first, then add reports and search.',
      gettingStarted: [
        'Pick a JSON filename and define a transaction shape: {date, type, amount, category, description}.',
        'Write helpers: load_transactions(path) and save_transactions(path, data).',
        'Create category constants and a validate_category helper.'
      ],
      milestones: [
        'Add/view transactions works with running balance.',
        'Filter by category and search by description keyword.',
        'Monthly summary (income, expenses, net, per-category totals).',
        'Input validation for amounts/dates/categories.',
        'Polish: currency formatting and a clean menu flow.'
      ],
      starterResources: [
        { label: 'Function stubs', description: 'add_transaction(book, txn), list_transactions(book, filter?), monthly_summary(book, month).' },
        { label: 'Sample data', description: '[{"date":"2024-01-02","type":"income","amount":1200,"category":"Salary","description":"Paycheck"}]' }
      ],
      tips: [
        'Normalize category strings once (upper/lower) to avoid mismatches.',
        'Keep calculations pure; format currency at the edge when printing.',
        'Guard file operations with try/except and user-friendly messages.'
      ]
    }
  },
  {
    id: 'cs101-project-4',
    subjectId: 'cs101',
    title: 'Quiz Application',
    description: 'Create an interactive quiz application that loads questions from a file, presents them to users, tracks scores, and maintains a high score leaderboard. This meta-project lets you build something similar to the learning tools you have been using. It reinforces all CS101 concepts: control flow for game logic, functions for organization, dictionaries for questions, lists for tracking, and file I/O for persistence.',
    requirements: [
      'Load quiz questions from a JSON file containing question text, multiple choice options, and correct answers',
      'Create at least 15 questions across 3 different categories/topics',
      'Present questions one at a time with numbered answer options',
      'Track correct answers and calculate percentage score',
      'Implement a timer option that limits time per question (optional bonus)',
      'Display immediate feedback after each answer (correct/incorrect with explanation)',
      'Show final score with grade and personalized message',
      'Maintain a high scores file with top 10 scores (name, score, date)',
      'Allow users to choose quiz category or take a mixed quiz',
      'Implement a "review mistakes" feature at the end showing incorrect answers',
      'Add a practice mode that shows hints and allows retries',
      'Handle all file errors gracefully with helpful messages'
    ],
    rubric: [
      {
        name: 'Quiz Mechanics',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Smooth question flow, accurate scoring, proper answer validation, all modes work'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Core quiz functionality works well with minor issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic quiz works but missing some features'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Quiz has significant bugs or missing core features'
          }
        ]
      },
      {
        name: 'Question Quality',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: '15+ well-written questions, clear wording, good variety, accurate answers'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Adequate questions with reasonable quality'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Minimum questions present but quality could improve'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Too few questions or poor quality'
          }
        ]
      },
      {
        name: 'Data Persistence',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Questions load correctly, high scores save and load perfectly, handles missing files'
          },
          {
            score: 75,
            label: 'Good',
            description: 'File operations work with minor issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic file operations work but error handling is weak'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'File operations missing or frequently fail'
          }
        ]
      },
      {
        name: 'User Experience',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Engaging interface, clear instructions, helpful feedback, polished presentation'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Pleasant to use with clear navigation'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Functional but could be more user-friendly'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Confusing or frustrating user experience'
          }
        ]
      }
    ],
    estimatedHours: 10,
    scaffolding: {
      overview: 'Treat this like a product slice: load questions → play quiz → show results → save scores.',
      gettingStarted: [
        'Define a question shape {text, options[], answer, category, explanation?} and a JSON file layout.',
        'Write question loader with validation and a safe fallback if the file is missing.',
        'Sketch the quiz loop: pick questions, ask, read answer, score, feedback.'
      ],
      milestones: [
        'Load questions and list categories without crashing.',
        'Run a single quiz session (mixed or by category) with scoring.',
        'Add review-mistakes output and simple timer toggle (optional).',
        'High scores file save/load with name, score, date.',
        'Practice mode/hints and polished messaging.'
      ],
      starterResources: [
        { label: 'Function stubs', description: 'load_questions(path), run_quiz(questions), record_high_score(name, score).' },
        { label: 'Sample questions', description: 'Seed 3–5 questions per category to test flow.' }
      ],
      tips: [
        'Keep question selection pure; separate I/O from logic.',
        'When the timer is off, reuse the same loop; avoid branching everywhere.',
        'Persist high scores after each session to avoid losing progress.'
      ]
    }
  }
];
