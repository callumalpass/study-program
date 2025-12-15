import { CodingExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-combinatorics';
import { topic2Exercises } from './topic-2-recurrence';
import { topic3Exercises } from './topic-3-graph-theory';
import { topic4Exercises } from './topic-4-graph-algorithms';
import { topic5Exercises } from './topic-5-number-theory';
import { topic6Exercises } from './topic-6-advanced-counting';
import { topic7Exercises } from './topic-7-probability';

export const math102Exercises: CodingExercise[] = [
  ...topic1Exercises,
  ...topic2Exercises,
  ...topic3Exercises,
  ...topic4Exercises,
  ...topic5Exercises,
  ...topic6Exercises,
  ...topic7Exercises,
];
