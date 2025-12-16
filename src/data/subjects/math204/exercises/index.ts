import type { WrittenExercise } from '../../../../core/types';

import { topic1Exercises } from './topic-1';
import { topic2Exercises } from './topic-2';
import { topic3Exercises } from './topic-3';
import { topic4Exercises } from './topic-4';
import { topic5Exercises } from './topic-5';
import { topic6Exercises } from './topic-6';
import { topic7Exercises } from './topic-7';

export const math204Exercises: WrittenExercise[] = [
  ...topic1Exercises,
  ...topic2Exercises,
  ...topic3Exercises,
  ...topic4Exercises,
  ...topic5Exercises,
  ...topic6Exercises,
  ...topic7Exercises
];
