import { CodingExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-number-systems';
import { topic2Exercises } from './topic-2-binary-arithmetic';
import { topic3Exercises } from './topic-3-data-representation';
import { topic4Exercises } from './topic-4-boolean-logic';
import { topic5Exercises } from './topic-5-architecture';

export const cs102Exercises: CodingExercise[] = [
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
