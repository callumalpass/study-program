import { CodingExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-classes';
import { topic2Exercises } from './topic-2-encapsulation';
import { topic3Exercises } from './topic-3-inheritance';
import { topic4Exercises } from './topic-4-polymorphism';
import { topic5Exercises } from './topic-5-design-patterns';

export const cs103Exercises: CodingExercise[] = [
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
