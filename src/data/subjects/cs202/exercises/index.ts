import { WrittenExercise } from '../../../../core/types';
import { topic1Exercises } from './topic-1-isa';
import { topic2Exercises } from './topic-2-assembly';
import { topic3Exercises } from './topic-3-datapath';
import { topic4Exercises } from './topic-4-pipelining';
import { topic5Exercises } from './topic-5-cache';
import { topic6Exercises } from './topic-6-memory';
import { topic7Exercises } from './topic-7-ilp';

export const cs202Exercises: WrittenExercise[] = [
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
