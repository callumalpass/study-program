import { CodingExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-variables';
import { topic2Exercises } from './topic-2-control-flow';
import { topic3Exercises } from './topic-3-functions';
import { topic4Exercises } from './topic-4-lists-dicts';
import { topic5Exercises } from './topic-5-file-io';
import { topic6Exercises } from './topic-6-error-handling';
import { topic7Exercises } from './topic-7-recursion';

export const cs101Exercises: CodingExercise[] = [
  ...topic1Exercises,
  ...topic2Exercises,
  ...topic3Exercises,
  ...topic4Exercises,
  ...topic5Exercises,
  ...topic6Exercises,
  ...topic7Exercises,
];

export {
  topic1Exercises,
  topic2Exercises,
  topic3Exercises,
  topic4Exercises,
  topic5Exercises,
  topic6Exercises,
  topic7Exercises,
};
