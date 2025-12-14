import type { WrittenExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-propositional-logic';
import { topic2Exercises } from './topic-2-proof-techniques';
import { topic3Exercises } from './topic-3-sets';
import { topic4Exercises } from './topic-4-relations';
import { topic5Exercises } from './topic-5-functions';
import { topic6Exercises } from './topic-6-predicate-logic';
import { topic7Exercises } from './topic-7-sequences-summations';

export const math101Exercises: WrittenExercise[] = [
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