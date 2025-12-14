import { CodingExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-arrays-linked-lists';
import { topic2Exercises } from './topic-2-stacks-queues';
import { topic3Exercises } from './topic-3-trees';
import { topic4Exercises } from './topic-4-hash-tables';
import { topic5Exercises } from './topic-5-graphs';

export const cs104Exercises: CodingExercise[] = [
  ...topic1Exercises,
  ...topic2Exercises,
  ...topic3Exercises,
  ...topic4Exercises,
  ...topic5Exercises,
];

export {
  topic1Exercises,
  topic2Exercises,
  topic3Exercises,
  topic4Exercises,
  topic5Exercises,
};
