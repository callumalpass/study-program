import { CodingExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-classes';
import { topic2Exercises } from './topic-2-encapsulation';
import { topic3Exercises } from './topic-3-inheritance';
import { topic4Exercises } from './topic-4-polymorphism';
import { topic5Exercises } from './topic-5-design-patterns';
import { topic6Exercises } from './topic-6-abstraction-interfaces';
import { topic7Exercises } from './topic-7-design-testing';

export const cs103Exercises: CodingExercise[] = [
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
