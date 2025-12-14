import { CodingExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-variables';
import { topic2Exercises } from './topic-2-control-flow';
import { topic3Exercises } from './topic-3-functions';
import { topic4Exercises } from './topic-4-lists-dicts';
import { topic5Exercises } from './topic-5-file-io';

export const cs101Exercises: CodingExercise[] = [
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
