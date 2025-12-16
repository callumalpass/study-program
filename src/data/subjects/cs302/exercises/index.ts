import { CodingExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-network-architecture';
import { topic2Exercises } from './topic-2-data-link';
import { topic3Exercises } from './topic-3-network-layer';
import { topic4Exercises } from './topic-4-transport-layer';
import { topic5Exercises } from './topic-5-advanced-networking';
import { topic6Exercises } from './topic-6-socket-programming';
import { topic7Exercises } from './topic-7-application-layer';

export const cs302Exercises: CodingExercise[] = [
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
