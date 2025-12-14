import { CodingExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-c-basics';
import { topic2Exercises } from './topic-2-pointers';
import { topic3Exercises } from './topic-3-memory';
import { topic4Exercises } from './topic-4-structures';
import { topic5Exercises } from './topic-5-file-io';

export const cs105Exercises: CodingExercise[] = [
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
