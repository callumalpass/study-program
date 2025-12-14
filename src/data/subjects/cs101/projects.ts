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
    estimatedHours: 8
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
    estimatedHours: 12
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
    estimatedHours: 10
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
    estimatedHours: 10
  }
];
