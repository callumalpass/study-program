import { Project } from '../../../core/types';

export const cs105Projects: Project[] = [
  {
    id: 'cs105-project-1',
    subjectId: 'cs105',
    title: 'Student Grade Management System',
    description: 'Build a comprehensive C program that manages student grades. The system should allow users to add students, record grades for different subjects, calculate averages, save data to files, and load data from files. This project integrates all major concepts from the course including structures, pointers, dynamic memory allocation, and file I/O.',
    requirements: [
      'Define a Student structure containing name, ID, and an array of grades',
      'Implement functions to add new students using dynamic memory allocation',
      'Create a function to add grades for a specific student',
      'Implement a function to calculate and display the average grade for each student',
      'Use pointers to pass structures to functions efficiently',
      'Implement file I/O to save all student data to a text file',
      'Implement file I/O to load student data from a file when the program starts',
      'Create a menu-driven interface for user interaction',
      'Properly manage memory by freeing all dynamically allocated memory before exit',
      'Include error handling for file operations and invalid inputs'
    ],
    rubric: [
      {
        name: 'Structure Definition and Data Organization',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Well-designed Student structure with appropriate data types and efficient organization'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Functional structure with minor inefficiencies in data organization'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic structure that works but lacks optimization'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Structure has design flaws affecting functionality'
          }
        ]
      },
      {
        name: 'Memory Management',
        weight: 25,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Perfect memory allocation and deallocation with no leaks, proper use of malloc/free'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Generally good memory management with minor issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic memory management with some leaks or inefficiencies'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Significant memory leaks or improper allocation/deallocation'
          }
        ]
      },
      {
        name: 'Pointer Usage',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Excellent use of pointers for efficient data passing and manipulation'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Correct pointer usage with minor inefficiencies'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic pointer usage, some opportunities for improvement'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Incorrect or inefficient pointer usage'
          }
        ]
      },
      {
        name: 'File I/O Implementation',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Robust file operations with proper error handling and data persistence'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Working file I/O with minor issues in error handling'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic file operations work but lack comprehensive error handling'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'File operations are incomplete or unreliable'
          }
        ]
      },
      {
        name: 'Functionality and Features',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All required features implemented and working perfectly'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Most features work correctly with minor bugs'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic features work but some functionality is missing'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Many features missing or not working correctly'
          }
        ]
      },
      {
        name: 'Code Quality and Documentation',
        weight: 10,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Clean, well-documented code with meaningful comments and proper formatting'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Generally readable code with adequate documentation'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Code works but lacks documentation and consistent formatting'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poorly organized code with little or no documentation'
          }
        ]
      }
    ],
    estimatedHours: 15
  }
];
