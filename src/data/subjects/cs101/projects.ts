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
  }
];
