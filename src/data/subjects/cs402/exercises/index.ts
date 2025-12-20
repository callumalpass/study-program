export { topic1Exercises } from './topic1';
export { topic2Exercises } from './topic2';
export { topic3Exercises } from './topic3';
export { topic4Exercises } from './topic4';
export { topic5Exercises } from './topic5';
export { topic6Exercises } from './topic6';
export { topic7Exercises } from './topic7';

import { CodingExercise } from '../../../../core/types';
import { topic1Exercises } from './topic1';
import { topic2Exercises } from './topic2';
import { topic3Exercises } from './topic3';
import { topic4Exercises } from './topic4';
import { topic5Exercises } from './topic5';
import { topic6Exercises } from './topic6';
import { topic7Exercises } from './topic7';

export const cs402Exercises: CodingExercise[] = [
  ...topic1Exercises,
  ...topic2Exercises,
  ...topic3Exercises,
  ...topic4Exercises,
  ...topic5Exercises,
  ...topic6Exercises,
  ...topic7Exercises
];
