import type { WrittenExercise } from '../../../../core/types';

import { topic1Exercises } from './topic-1-limits';
import { topic2Exercises } from './topic-2-derivative-definition';
import { topic3Exercises } from './topic-3-differentiation-rules';
import { topic4Exercises } from './topic-4-applications';
import { topic5Exercises } from './topic-5-optimization';
import { topic6Exercises } from './topic-6-related-rates';
import { topic7Exercises } from './topic-7-curve-sketching';

export const math203Exercises: WrittenExercise[] = [
  ...topic1Exercises,
  ...topic2Exercises,
  ...topic3Exercises,
  ...topic4Exercises,
  ...topic5Exercises,
  ...topic6Exercises,
  ...topic7Exercises
];
