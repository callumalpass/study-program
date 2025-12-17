export { topic5Exercises } from './topic5';
export { topic6Exercises } from './topic6';
export { topic7Exercises } from './topic7';

import { CodingExercise } from '../../../../core/types';
import { topic5Exercises } from './topic5';
import { topic6Exercises } from './topic6';
import { topic7Exercises } from './topic7';

export const cs402Exercises: CodingExercise[] = [
  ...topic5Exercises,
  ...topic6Exercises,
  ...topic7Exercises
];
