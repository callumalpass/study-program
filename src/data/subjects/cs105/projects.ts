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
  },
  {
    id: 'cs105-project-2',
    subjectId: 'cs105',
    title: 'Linked List Library',
    description: 'Implement a complete generic linked list library in C. This project focuses on mastering pointer manipulation, dynamic memory allocation, and creating reusable data structures. You will build a singly linked list with various operations that can be used with different data types using void pointers.',
    requirements: [
      'Define a Node structure containing a void* data field and a pointer to the next node',
      'Define a LinkedList structure containing head, tail, and size fields',
      'Implement list_create() to create and initialize a new empty list',
      'Implement list_destroy() to free all nodes and the list structure',
      'Implement list_push_front() and list_push_back() for inserting elements',
      'Implement list_pop_front() and list_pop_back() for removing elements',
      'Implement list_get() to access an element at a given index',
      'Implement list_insert_at() and list_remove_at() for operations at arbitrary positions',
      'Implement list_size() and list_is_empty() utility functions',
      'Implement list_foreach() to apply a function to each element',
      'Implement list_reverse() to reverse the list in-place',
      'Create a test program demonstrating all operations with different data types',
      'Ensure all memory is properly freed with no leaks (verify with valgrind)'
    ],
    rubric: [
      {
        name: 'Core Operations Implementation',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'All list operations (push, pop, insert, remove, get) work correctly for all edge cases'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Operations work correctly with minor edge case issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic operations work but some functions have bugs'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Many operations are incomplete or broken'
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
            description: 'Zero memory leaks, proper allocation and deallocation for all operations'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Minor memory issues that do not affect functionality'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Some memory leaks in certain operations'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Significant memory leaks or double-free issues'
          }
        ]
      },
      {
        name: 'Generic Implementation (void* usage)',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Clean generic implementation that works with any data type'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Generic implementation with minor type-handling issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Works with basic types but struggles with complex data'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Not truly generic, hardcoded for specific types'
          }
        ]
      },
      {
        name: 'Edge Case Handling',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Handles all edge cases: empty list, single element, NULL inputs, out-of-bounds'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Handles most edge cases correctly'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Some edge cases cause crashes or undefined behavior'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor edge case handling, frequently crashes'
          }
        ]
      },
      {
        name: 'Test Coverage and Documentation',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Comprehensive tests for all operations, clear documentation and comments'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good test coverage with adequate documentation'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic tests present, minimal documentation'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Little testing, poor or no documentation'
          }
        ]
      }
    ],
    estimatedHours: 12
  },
  {
    id: 'cs105-project-3',
    subjectId: 'cs105',
    title: 'Simple Memory Allocator',
    description: 'Implement a simple memory allocator that manages a fixed-size memory pool. This project provides deep insight into how malloc/free work under the hood. You will create functions to allocate and free memory blocks from a pre-allocated buffer, learning about memory fragmentation, block headers, and allocation strategies.',
    requirements: [
      'Create a fixed-size memory pool (e.g., 64KB) using a static or heap-allocated buffer',
      'Define a block header structure containing size, is_free flag, and pointer to next block',
      'Implement my_malloc(size_t size) that returns a pointer to usable memory or NULL if allocation fails',
      'Implement my_free(void* ptr) that marks a block as free',
      'Implement block coalescing: merge adjacent free blocks to reduce fragmentation',
      'Implement first-fit allocation strategy (optionally add best-fit as a bonus)',
      'Handle alignment requirements (8-byte or 16-byte aligned allocations)',
      'Implement my_realloc(void* ptr, size_t new_size) to resize allocations',
      'Implement a debug function to print the current state of the memory pool',
      'Create comprehensive tests demonstrating allocation, freeing, and reallocation',
      'Track and report statistics: total allocations, frees, current fragmentation'
    ],
    rubric: [
      {
        name: 'Allocation and Free Implementation',
        weight: 30,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'my_malloc and my_free work correctly, handle edge cases, and maintain pool integrity'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Basic allocation works with minor issues in edge cases'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Simple allocations work but fragmentation handling is poor'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Allocation or free operations have significant bugs'
          }
        ]
      },
      {
        name: 'Block Coalescing',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Adjacent free blocks are always merged, minimizing fragmentation'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Coalescing works in most cases'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic coalescing attempted but incomplete'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'No coalescing or broken implementation'
          }
        ]
      },
      {
        name: 'Memory Alignment and Headers',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Proper alignment enforced, headers correctly managed, no corruption'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Alignment handled with minor issues'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic structure works but alignment may cause issues on some platforms'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Poor header management or alignment causing corruption'
          }
        ]
      },
      {
        name: 'Realloc Implementation',
        weight: 15,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'my_realloc handles growing, shrinking, NULL ptr, and zero size correctly'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Realloc works for common cases'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic realloc attempted but incomplete'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Realloc missing or broken'
          }
        ]
      },
      {
        name: 'Testing and Debug Output',
        weight: 20,
        levels: [
          {
            score: 100,
            label: 'Excellent',
            description: 'Thorough tests, clear debug output showing pool state, useful statistics'
          },
          {
            score: 75,
            label: 'Good',
            description: 'Good test coverage with useful debug information'
          },
          {
            score: 50,
            label: 'Satisfactory',
            description: 'Basic tests present, minimal debugging support'
          },
          {
            score: 25,
            label: 'Needs Improvement',
            description: 'Inadequate testing or no debug capabilities'
          }
        ]
      }
    ],
    estimatedHours: 15
  }
];
