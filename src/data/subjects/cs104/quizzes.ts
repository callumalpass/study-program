import { Quiz } from '../../../core/types';

export const cs104Quizzes: Quiz[] = [
  {
    id: 'cs104-quiz-1',
    subjectId: 'cs104',
    topicId: 'cs104-topic-1',
    title: 'Arrays and Linked Lists Quiz',
    questions: [
      {
        id: 'cs104-q1-1',
        type: 'multiple_choice',
        prompt: 'What is the time complexity of accessing an element by index in an array?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Arrays provide constant-time O(1) access to elements by index because elements are stored in contiguous memory locations, allowing direct calculation of memory addresses.'
      },
      {
        id: 'cs104-q1-2',
        type: 'multiple_choice',
        prompt: 'Which data structure is more efficient for inserting elements at the beginning?',
        options: ['Array', 'Linked List', 'Both are equal', 'Neither supports this operation'],
        correctAnswer: 1,
        explanation: 'Linked lists are more efficient for inserting at the beginning (O(1)) as it only requires updating pointers. Arrays require shifting all elements, resulting in O(n) time complexity.'
      },
      {
        id: 'cs104-q1-3',
        type: 'true_false',
        prompt: 'A doubly linked list allows traversal in both forward and backward directions.',
        correctAnswer: true,
        explanation: 'Doubly linked lists contain both next and previous pointers in each node, enabling bidirectional traversal unlike singly linked lists which only support forward traversal.'
      }
    ]
  },
  {
    id: 'cs104-quiz-2',
    subjectId: 'cs104',
    topicId: 'cs104-topic-2',
    title: 'Stacks and Queues Quiz',
    questions: [
      {
        id: 'cs104-q2-1',
        type: 'multiple_choice',
        prompt: 'Which ordering principle does a stack follow?',
        options: ['FIFO (First-In-First-Out)', 'LIFO (Last-In-First-Out)', 'Priority-based', 'Random'],
        correctAnswer: 1,
        explanation: 'Stacks follow the LIFO (Last-In-First-Out) principle, where the most recently added element is the first to be removed, like a stack of plates.'
      },
      {
        id: 'cs104-q2-2',
        type: 'multiple_choice',
        prompt: 'What are the two primary operations of a queue?',
        options: ['push and pop', 'enqueue and dequeue', 'insert and delete', 'add and remove'],
        correctAnswer: 1,
        explanation: 'Queues use enqueue (add to rear) and dequeue (remove from front) as their primary operations, maintaining the FIFO ordering principle.'
      },
      {
        id: 'cs104-q2-3',
        type: 'code_output',
        prompt: 'What will be output after these stack operations?\n\nstack.push(1)\nstack.push(2)\nstack.push(3)\nstack.pop()\nstack.push(4)\nprint(stack.pop())',
        codeSnippet: 'stack.push(1)\nstack.push(2)\nstack.push(3)\nstack.pop()\nstack.push(4)\nprint(stack.pop())',
        correctAnswer: 4,
        explanation: 'After pushing 1, 2, 3 and popping 3, the stack contains [1, 2]. Pushing 4 makes it [1, 2, 4]. Popping returns 4, the top element.'
      }
    ]
  },
  {
    id: 'cs104-quiz-3',
    subjectId: 'cs104',
    topicId: 'cs104-topic-3',
    title: 'Trees Quiz',
    questions: [
      {
        id: 'cs104-q3-1',
        type: 'multiple_choice',
        prompt: 'In a Binary Search Tree, where are values smaller than the root stored?',
        options: ['Right subtree', 'Left subtree', 'Parent node', 'Randomly distributed'],
        correctAnswer: 1,
        explanation: 'BST property dictates that all values smaller than a node are stored in its left subtree, while larger values go in the right subtree.'
      },
      {
        id: 'cs104-q3-2',
        type: 'multiple_choice',
        prompt: 'What is the average-case time complexity for searching in a balanced BST?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'A balanced BST has O(log n) search time because each comparison eliminates half of the remaining nodes, similar to binary search.'
      },
      {
        id: 'cs104-q3-3',
        type: 'true_false',
        prompt: 'Inorder traversal of a Binary Search Tree visits nodes in ascending order.',
        correctAnswer: true,
        explanation: 'Inorder traversal (left-root-right) of a BST visits nodes in sorted ascending order due to the BST property where left < root < right.'
      }
    ]
  },
  {
    id: 'cs104-quiz-4',
    subjectId: 'cs104',
    topicId: 'cs104-topic-4',
    title: 'Hash Tables Quiz',
    questions: [
      {
        id: 'cs104-q4-1',
        type: 'multiple_choice',
        prompt: 'What is the average-case time complexity for hash table lookups?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
        correctAnswer: 0,
        explanation: 'Hash tables provide O(1) average-case lookup time by using a hash function to compute the index directly, enabling constant-time access.'
      },
      {
        id: 'cs104-q4-2',
        type: 'multiple_choice',
        prompt: 'What occurs when two keys hash to the same index?',
        options: ['Hash overflow', 'Collision', 'Hash failure', 'Index error'],
        correctAnswer: 1,
        explanation: 'A collision occurs when two different keys produce the same hash value. This is resolved through techniques like chaining or open addressing.'
      },
      {
        id: 'cs104-q4-3',
        type: 'true_false',
        prompt: 'Chaining resolves collisions by storing multiple elements at the same index using a linked list.',
        correctAnswer: true,
        explanation: 'Chaining handles collisions by maintaining a linked list (or other structure) at each table index, allowing multiple key-value pairs to coexist at the same location.'
      }
    ]
  },
  {
    id: 'cs104-quiz-5',
    subjectId: 'cs104',
    topicId: 'cs104-topic-5',
    title: 'Graphs Quiz',
    questions: [
      {
        id: 'cs104-q5-1',
        type: 'multiple_choice',
        prompt: 'What is the space complexity of an adjacency matrix for a graph with V vertices?',
        options: ['O(V)', 'O(E)', 'O(V²)', 'O(V + E)'],
        correctAnswer: 2,
        explanation: 'An adjacency matrix requires a V×V 2D array to represent all possible edges, resulting in O(V²) space complexity regardless of actual edge count.'
      },
      {
        id: 'cs104-q5-2',
        type: 'multiple_choice',
        prompt: 'Which graph traversal uses a queue?',
        options: ['Depth-First Search', 'Breadth-First Search', 'Both', 'Neither'],
        correctAnswer: 1,
        explanation: 'Breadth-First Search (BFS) uses a queue to explore vertices level by level. DFS uses a stack (or recursion) for depth-first exploration.'
      },
      {
        id: 'cs104-q5-3',
        type: 'true_false',
        prompt: 'In a directed graph, edges have a specific direction from one vertex to another.',
        correctAnswer: true,
        explanation: 'Directed graphs have edges with specific directions (u → v), meaning you can traverse from u to v but not necessarily from v to u, unlike undirected graphs.'
      }
    ]
  }
];
