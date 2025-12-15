import { Topic } from '../../../core/types';
import topic1Content from '../../../content/subjects/cs201/topic-1.md?raw';
import topic2Content from '../../../content/subjects/cs201/topic-2.md?raw';
import topic3Content from '../../../content/subjects/cs201/topic-3.md?raw';
import topic4Content from '../../../content/subjects/cs201/topic-4.md?raw';
import topic5Content from '../../../content/subjects/cs201/topic-5.md?raw';
import topic6Content from '../../../content/subjects/cs201/topic-6.md?raw';
import topic7Content from '../../../content/subjects/cs201/topic-7.md?raw';
import topic8Content from '../../../content/subjects/cs201/topic-8.md?raw';

export const cs201Topics: Topic[] = [
  {
    id: 'cs201-1',
    title: 'Algorithm Analysis and Big-O',
    content: topic1Content,
    quizIds: ['cs201-quiz-1-1', 'cs201-quiz-1-2', 'cs201-quiz-1-3'],
    exerciseIds: ['cs201-ex-1-1', 'cs201-ex-1-2', 'cs201-ex-1-3', 'cs201-ex-1-4', 'cs201-ex-1-5', 'cs201-ex-1-6', 'cs201-ex-1-7', 'cs201-ex-1-8', 'cs201-ex-1-9', 'cs201-ex-1-10', 'cs201-ex-1-11', 'cs201-ex-1-12', 'cs201-ex-1-13', 'cs201-ex-1-14', 'cs201-ex-1-15', 'cs201-ex-1-16']
  },
  {
    id: 'cs201-2',
    title: 'Sorting Algorithms',
    content: topic2Content,
    quizIds: ['cs201-quiz-2-1', 'cs201-quiz-2-2', 'cs201-quiz-2-3'],
    exerciseIds: ['cs201-ex-2-1', 'cs201-ex-2-2', 'cs201-ex-2-3', 'cs201-ex-2-4', 'cs201-ex-2-5', 'cs201-ex-2-6', 'cs201-ex-2-7', 'cs201-ex-2-8', 'cs201-ex-2-9', 'cs201-ex-2-10', 'cs201-ex-2-11', 'cs201-ex-2-12', 'cs201-ex-2-13', 'cs201-ex-2-14', 'cs201-ex-2-15', 'cs201-ex-2-16']
  },
  {
    id: 'cs201-3',
    title: 'Searching Algorithms',
    content: topic3Content,
    quizIds: ['cs201-quiz-3-1', 'cs201-quiz-3-2', 'cs201-quiz-3-3'],
    exerciseIds: ['cs201-ex-3-1', 'cs201-ex-3-2', 'cs201-ex-3-3', 'cs201-ex-3-4', 'cs201-ex-3-5', 'cs201-ex-3-6', 'cs201-ex-3-7', 'cs201-ex-3-8', 'cs201-ex-3-9', 'cs201-ex-3-10', 'cs201-ex-3-11', 'cs201-ex-3-12', 'cs201-ex-3-13', 'cs201-ex-3-14', 'cs201-ex-3-15', 'cs201-ex-3-16']
  },
  {
    id: 'cs201-4',
    title: 'Divide and Conquer',
    content: topic4Content,
    quizIds: ['cs201-quiz-4-1', 'cs201-quiz-4-2', 'cs201-quiz-4-3'],
    exerciseIds: ['cs201-ex-4-1', 'cs201-ex-4-2', 'cs201-ex-4-3', 'cs201-ex-4-4', 'cs201-ex-4-5', 'cs201-ex-4-6', 'cs201-ex-4-7', 'cs201-ex-4-8', 'cs201-ex-4-9', 'cs201-ex-4-10', 'cs201-ex-4-11', 'cs201-ex-4-12', 'cs201-ex-4-13', 'cs201-ex-4-14', 'cs201-ex-4-15', 'cs201-ex-4-16']
  },
  {
    id: 'cs201-5',
    title: 'Dynamic Programming',
    content: topic5Content,
    quizIds: ['cs201-quiz-5-1', 'cs201-quiz-5-2', 'cs201-quiz-5-3'],
    exerciseIds: ['cs201-ex-5-1', 'cs201-ex-5-2', 'cs201-ex-5-3', 'cs201-ex-5-4', 'cs201-ex-5-5', 'cs201-ex-5-6', 'cs201-ex-5-7', 'cs201-ex-5-8', 'cs201-ex-5-9', 'cs201-ex-5-10', 'cs201-ex-5-11', 'cs201-ex-5-12', 'cs201-ex-5-13', 'cs201-ex-5-14', 'cs201-ex-5-15', 'cs201-ex-5-16']
  },
  {
    id: 'cs201-6',
    title: 'Greedy Algorithms',
    content: topic6Content,
    quizIds: ['cs201-quiz-6-1', 'cs201-quiz-6-2', 'cs201-quiz-6-3'],
    exerciseIds: ['cs201-ex-6-1', 'cs201-ex-6-2', 'cs201-ex-6-3', 'cs201-ex-6-4', 'cs201-ex-6-5', 'cs201-ex-6-6', 'cs201-ex-6-7', 'cs201-ex-6-8', 'cs201-ex-6-9', 'cs201-ex-6-10', 'cs201-ex-6-11', 'cs201-ex-6-12', 'cs201-ex-6-13', 'cs201-ex-6-14', 'cs201-ex-6-15', 'cs201-ex-6-16']
  },
  {
    id: 'cs201-7',
    title: 'Graph Algorithms',
    content: topic7Content,
    quizIds: ['cs201-quiz-7-1', 'cs201-quiz-7-2', 'cs201-quiz-7-3'],
    exerciseIds: ['cs201-ex-7-1', 'cs201-ex-7-2', 'cs201-ex-7-3', 'cs201-ex-7-4', 'cs201-ex-7-5', 'cs201-ex-7-6', 'cs201-ex-7-7', 'cs201-ex-7-8', 'cs201-ex-7-9', 'cs201-ex-7-10', 'cs201-ex-7-11', 'cs201-ex-7-12', 'cs201-ex-7-13', 'cs201-ex-7-14', 'cs201-ex-7-15', 'cs201-ex-7-16']
  },
  {
    id: 'cs201-8',
    title: 'Algorithm Correctness and Completeness',
    content: topic8Content,
    quizIds: ['cs201-quiz-8-1', 'cs201-quiz-8-2', 'cs201-quiz-8-3'],
    exerciseIds: ['cs201-ex-8-1', 'cs201-ex-8-2', 'cs201-ex-8-3', 'cs201-ex-8-4', 'cs201-ex-8-5', 'cs201-ex-8-6', 'cs201-ex-8-7', 'cs201-ex-8-8', 'cs201-ex-8-9', 'cs201-ex-8-10', 'cs201-ex-8-11', 'cs201-ex-8-12', 'cs201-ex-8-13', 'cs201-ex-8-14', 'cs201-ex-8-15', 'cs201-ex-8-16']
  }
];