import { WrittenExercise } from '../../../../core/types';

import { topic1Exercises } from './topic-1-sdlc';
import { topic2Exercises } from './topic-2-requirements';
import { topic3Exercises } from './topic-3-design';
import { topic4Exercises } from './topic-4-patterns';
import { topic5Exercises } from './topic-5-testing';
import { topic6Exercises } from './topic-6-version-control';
import { topic7Exercises } from './topic-7-agile';

export const cs204Exercises: WrittenExercise[] = [
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
