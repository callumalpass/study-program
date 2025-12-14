import { Topic } from '../../../core/types';
import topic1Content from '../../../content/subjects/cs101/topic-1.md?raw';
import topic2Content from '../../../content/subjects/cs101/topic-2.md?raw';
import topic3Content from '../../../content/subjects/cs101/topic-3.md?raw';
import topic4Content from '../../../content/subjects/cs101/topic-4.md?raw';
import topic5Content from '../../../content/subjects/cs101/topic-5.md?raw';

export const cs101Topics: Topic[] = [
  {
    id: 'cs101-topic-1',
    title: 'Variables and Data Types',
    content: topic1Content,
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
  }
];