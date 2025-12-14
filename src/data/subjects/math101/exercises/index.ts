import type { WrittenExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-propositional-logic';
import { topic2Exercises } from './topic-2-proof-techniques';
import { topic3Exercises } from './topic-3-sets';
import { topic4Exercises } from './topic-4-relations';
import { topic5Exercises } from './topic-5-functions';

export const math101Exercises: WrittenExercise[] = [
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
