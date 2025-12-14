import { Topic } from '../../../core/types';
import topic1Content from '../../../content/subjects/cs103/topic-1.md?raw';
import topic2Content from '../../../content/subjects/cs103/topic-2.md?raw';
import topic3Content from '../../../content/subjects/cs103/topic-3.md?raw';
import topic4Content from '../../../content/subjects/cs103/topic-4.md?raw';
import topic5Content from '../../../content/subjects/cs103/topic-5.md?raw';

export const cs103Topics: Topic[] = [
  {
    id: 'cs103-1',
    title: 'Classes and Objects',
    content: topic1Content,
    quizIds: ['cs103-quiz-1'],
    exerciseIds: ['cs103-ex-1', 'cs103-t1-ex02', 'cs103-t1-ex03', 'cs103-t1-ex04', 'cs103-t1-ex05', 'cs103-t1-ex06', 'cs103-t1-ex07', 'cs103-t1-ex08', 'cs103-t1-ex09', 'cs103-t1-ex10', 'cs103-t1-drill-1', 'cs103-t1-drill-2']
  },
  {
    id: 'cs103-2',
    title: 'Encapsulation',
    content: topic2Content,
    quizIds: ['cs103-quiz-2'],
    exerciseIds: ['cs103-ex-2', 'cs103-t2-ex02', 'cs103-t2-ex03', 'cs103-t2-ex04', 'cs103-t2-ex05', 'cs103-t2-ex06', 'cs103-t2-ex07', 'cs103-t2-ex08', 'cs103-t2-ex09', 'cs103-t2-ex10', 'cs103-t2-drill-1', 'cs103-t2-drill-2']
  },
  {
    id: 'cs103-3',
    title: 'Inheritance',
    content: topic3Content,
    quizIds: ['cs103-quiz-3'],
    exerciseIds: ['cs103-ex-3', 'cs103-t3-ex02', 'cs103-t3-ex03', 'cs103-t3-ex04', 'cs103-t3-ex05', 'cs103-t3-ex06', 'cs103-t3-ex07', 'cs103-t3-ex08', 'cs103-t3-ex09', 'cs103-t3-ex10', 'cs103-t3-drill-1', 'cs103-t3-drill-2']
  },
  {
    id: 'cs103-4',
    title: 'Polymorphism',
    content: topic4Content,
    quizIds: ['cs103-quiz-4'],
    exerciseIds: ['cs103-ex-4', 'cs103-t4-ex02', 'cs103-t4-ex03', 'cs103-t4-ex04', 'cs103-t4-ex05', 'cs103-t4-ex06', 'cs103-t4-ex07', 'cs103-t4-ex08', 'cs103-t4-ex09', 'cs103-t4-ex10', 'cs103-t4-drill-1', 'cs103-t4-drill-2']
  },
  {
    id: 'cs103-5',
    title: 'Design Patterns Intro',
    content: topic5Content,
    quizIds: ['cs103-quiz-5'],
    exerciseIds: ['cs103-ex-5', 'cs103-t5-ex02', 'cs103-t5-ex03', 'cs103-t5-ex04', 'cs103-t5-ex05', 'cs103-t5-ex06', 'cs103-t5-ex07', 'cs103-t5-ex08', 'cs103-t5-ex09', 'cs103-t5-ex10', 'cs103-t5-drill-1', 'cs103-t5-drill-2']
  }
];
