import { Topic } from '../../../core/types';
import topic1Content from '../../../content/subjects/cs102/topic-1.md?raw';
import topic2Content from '../../../content/subjects/cs102/topic-2.md?raw';
import topic3Content from '../../../content/subjects/cs102/topic-3.md?raw';
import topic4Content from '../../../content/subjects/cs102/topic-4.md?raw';
import topic5Content from '../../../content/subjects/cs102/topic-5.md?raw';

export const cs102Topics: Topic[] = [
  {
    id: 'cs102-1',
    title: 'Number Systems and Conversion',
    content: topic1Content,
    quizIds: ['cs102-quiz-1'],
    exerciseIds: ['cs102-ex-1', 'cs102-t1-ex02', 'cs102-t1-ex03', 'cs102-t1-ex04', 'cs102-t1-ex05', 'cs102-t1-ex06', 'cs102-t1-ex07', 'cs102-t1-ex08', 'cs102-t1-ex09', 'cs102-t1-ex10', 'cs102-t1-drill-1', 'cs102-t1-drill-2']
  },
  {
    id: 'cs102-2',
    title: 'Binary Arithmetic',
    content: topic2Content,
    quizIds: ['cs102-quiz-2'],
    exerciseIds: ['cs102-ex-2', 'cs102-t2-ex02', 'cs102-t2-ex03', 'cs102-t2-ex04', 'cs102-t2-ex05', 'cs102-t2-ex06', 'cs102-t2-ex07', 'cs102-t2-ex08', 'cs102-t2-ex09', 'cs102-t2-ex10', 'cs102-t2-drill-1', 'cs102-t2-drill-2']
  },
  {
    id: 'cs102-3',
    title: 'Data Representation',
    content: topic3Content,
    quizIds: ['cs102-quiz-3'],
    exerciseIds: ['cs102-ex-3', 'cs102-t3-ex02', 'cs102-t3-ex03', 'cs102-t3-ex04', 'cs102-t3-ex05', 'cs102-t3-ex06', 'cs102-t3-ex07', 'cs102-t3-ex08', 'cs102-t3-ex09', 'cs102-t3-ex10', 'cs102-t3-drill-1', 'cs102-t3-drill-2']
  },
  {
    id: 'cs102-4',
    title: 'Boolean Algebra and Logic Gates',
    content: topic4Content,
    quizIds: ['cs102-quiz-4'],
    exerciseIds: ['cs102-ex-4', 'cs102-t4-ex02', 'cs102-t4-ex03', 'cs102-t4-ex04', 'cs102-t4-ex05', 'cs102-t4-ex06', 'cs102-t4-ex07', 'cs102-t4-ex08', 'cs102-t4-ex09', 'cs102-t4-ex10', 'cs102-t4-ex11', 'cs102-t4-drill-1', 'cs102-t4-drill-2']
  },
  {
    id: 'cs102-5',
    title: 'Basic Computer Architecture',
    content: topic5Content,
    quizIds: ['cs102-quiz-5'],
    exerciseIds: ['cs102-ex-5', 'cs102-t5-ex02', 'cs102-t5-ex03', 'cs102-t5-ex04', 'cs102-t5-ex05', 'cs102-t5-ex06', 'cs102-t5-ex07', 'cs102-t5-ex08', 'cs102-t5-ex09', 'cs102-t5-ex10', 'cs102-t5-drill-1', 'cs102-t5-drill-2']
  }
];
