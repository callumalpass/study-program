import { Topic, Subtopic } from '../../../core/types';
import topic1Content from '../../../content/subjects/cs101/topic-1.md?raw';
import topic2Content from '../../../content/subjects/cs101/topic-2.md?raw';
import topic3Content from '../../../content/subjects/cs101/topic-3.md?raw';
import topic4Content from '../../../content/subjects/cs101/topic-4.md?raw';
import topic5Content from '../../../content/subjects/cs101/topic-5.md?raw';
import topic6Content from '../../../content/subjects/cs101/topic-6.md?raw';
import topic7Content from '../../../content/subjects/cs101/topic-7.md?raw';

// Topic 1 Subtopics
import t1Introduction from '../../../content/subjects/cs101/topic-1/01-introduction.md?raw';
import t1NamingRules from '../../../content/subjects/cs101/topic-1/02-naming-rules.md?raw';
import t1IntegersFloats from '../../../content/subjects/cs101/topic-1/03-integers-floats.md?raw';
import t1Strings from '../../../content/subjects/cs101/topic-1/04-strings.md?raw';
import t1Booleans from '../../../content/subjects/cs101/topic-1/05-booleans.md?raw';
import t1TypeConversion from '../../../content/subjects/cs101/topic-1/06-type-conversion.md?raw';
import t1Patterns from '../../../content/subjects/cs101/topic-1/07-patterns-best-practices.md?raw';

const topic1Subtopics: Subtopic[] = [
  { id: 'cs101-t1-intro', slug: 'introduction', title: 'Introduction', content: t1Introduction, order: 1 },
  { id: 'cs101-t1-naming', slug: 'naming-rules', title: 'Variable Naming Rules', content: t1NamingRules, order: 2 },
  { id: 'cs101-t1-numbers', slug: 'integers-floats', title: 'Integers & Floats', content: t1IntegersFloats, order: 3 },
  { id: 'cs101-t1-strings', slug: 'strings', title: 'Strings', content: t1Strings, order: 4 },
  { id: 'cs101-t1-bools', slug: 'booleans', title: 'Booleans', content: t1Booleans, order: 5 },
  { id: 'cs101-t1-conversion', slug: 'type-conversion', title: 'Type Conversion', content: t1TypeConversion, order: 6 },
  { id: 'cs101-t1-patterns', slug: 'patterns-best-practices', title: 'Patterns & Best Practices', content: t1Patterns, order: 7 },
];

export const cs101Topics: Topic[] = [
  {
    id: 'cs101-topic-1',
    title: 'Variables and Data Types',
    content: topic1Content,
    subtopics: topic1Subtopics,
    quizIds: ['cs101-quiz-1', 'cs101-quiz-1b', 'cs101-quiz-1c'],
    exerciseIds: ['cs101-exercise-1', 'cs101-t1-ex02', 'cs101-t1-ex03', 'cs101-t1-ex04', 'cs101-t1-ex05', 'cs101-t1-ex06', 'cs101-t1-ex07', 'cs101-t1-ex08', 'cs101-t1-ex09', 'cs101-t1-ex10', 'cs101-t1-ex11', 'cs101-t1-ex12', 'cs101-t1-ex13', 'cs101-t1-ex14', 'cs101-t1-ex15', 'cs101-t1-ex16']
  },
  {
    id: 'cs101-topic-2',
    title: 'Control Flow (if/else, loops)',
    content: topic2Content,
    quizIds: ['cs101-quiz-2', 'cs101-quiz-2b', 'cs101-quiz-2c'],
    exerciseIds: ['cs101-exercise-2', 'cs101-t2-ex02', 'cs101-t2-ex03', 'cs101-t2-ex04', 'cs101-t2-ex05', 'cs101-t2-ex06', 'cs101-t2-ex07', 'cs101-t2-ex08', 'cs101-t2-ex09', 'cs101-t2-ex10', 'cs101-t2-ex11', 'cs101-t2-ex12', 'cs101-t2-ex13', 'cs101-t2-ex14', 'cs101-t2-ex15', 'cs101-t2-ex16']
  },
  {
    id: 'cs101-topic-3',
    title: 'Functions',
    content: topic3Content,
    quizIds: ['cs101-quiz-3', 'cs101-quiz-3b', 'cs101-quiz-3c'],
    exerciseIds: ['cs101-exercise-3', 'cs101-t3-ex02', 'cs101-t3-ex03', 'cs101-t3-ex04', 'cs101-t3-ex05', 'cs101-t3-ex06', 'cs101-t3-ex07', 'cs101-t3-ex08', 'cs101-t3-ex09', 'cs101-t3-ex10', 'cs101-t3-ex11', 'cs101-t3-ex12', 'cs101-t3-ex13', 'cs101-t3-ex14', 'cs101-t3-ex15', 'cs101-t3-ex16']
  },
  {
    id: 'cs101-topic-4',
    title: 'Lists and Dictionaries',
    content: topic4Content,
    quizIds: ['cs101-quiz-4', 'cs101-quiz-4b', 'cs101-quiz-4c'],
    exerciseIds: ['cs101-exercise-4', 'cs101-t4-ex02', 'cs101-t4-ex03', 'cs101-t4-ex04', 'cs101-t4-ex05', 'cs101-t4-ex06', 'cs101-t4-ex07', 'cs101-t4-ex08', 'cs101-t4-ex09', 'cs101-t4-ex10', 'cs101-t4-ex11', 'cs101-t4-ex12', 'cs101-t4-ex13', 'cs101-t4-ex14', 'cs101-t4-ex15', 'cs101-t4-ex16']
  },
  {
    id: 'cs101-topic-5',
    title: 'File I/O',
    content: topic5Content,
    quizIds: ['cs101-quiz-5', 'cs101-quiz-5b', 'cs101-quiz-5c'],
    exerciseIds: ['cs101-exercise-5', 'cs101-t5-ex02', 'cs101-t5-ex03', 'cs101-t5-ex04', 'cs101-t5-ex05', 'cs101-t5-ex06', 'cs101-t5-ex07', 'cs101-t5-ex08', 'cs101-t5-ex09', 'cs101-t5-ex10', 'cs101-t5-ex11', 'cs101-t5-ex12', 'cs101-t5-ex13', 'cs101-t5-ex14', 'cs101-t5-ex15', 'cs101-t5-ex16']
  },
  {
    id: 'cs101-topic-6',
    title: 'Error Handling and Debugging',
    content: topic6Content,
    quizIds: ['cs101-quiz-6', 'cs101-quiz-6b', 'cs101-quiz-6c'],
    exerciseIds: ['cs101-exercise-6', 'cs101-t6-ex02', 'cs101-t6-ex03', 'cs101-t6-ex04', 'cs101-t6-ex05', 'cs101-t6-ex06', 'cs101-t6-ex07', 'cs101-t6-ex08', 'cs101-t6-ex09', 'cs101-t6-ex10', 'cs101-t6-ex11', 'cs101-t6-ex12', 'cs101-t6-ex13', 'cs101-t6-ex14', 'cs101-t6-ex15', 'cs101-t6-ex16']
  },
  {
    id: 'cs101-topic-7',
    title: 'Recursion',
    content: topic7Content,
    quizIds: ['cs101-quiz-7', 'cs101-quiz-7b', 'cs101-quiz-7c'],
    exerciseIds: ['cs101-exercise-7', 'cs101-t7-ex02', 'cs101-t7-ex03', 'cs101-t7-ex04', 'cs101-t7-ex05', 'cs101-t7-ex06', 'cs101-t7-ex07', 'cs101-t7-ex08', 'cs101-t7-ex09', 'cs101-t7-ex10', 'cs101-t7-ex11', 'cs101-t7-ex12', 'cs101-t7-ex13', 'cs101-t7-ex14', 'cs101-t7-ex15', 'cs101-t7-ex16']
  }
];