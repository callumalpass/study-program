import { WrittenExercise } from '../../../../core/types';

import { topic1Exercises } from './topic-1-finite-automata';
import { topic2Exercises } from './topic-2-regular-languages';
import { topic3Exercises } from './topic-3-context-free-grammars';
import { topic4Exercises } from './topic-4-pushdown-automata';
import { topic5Exercises } from './topic-5-turing-machines';
import { topic6Exercises } from './topic-6-decidability';
import { topic7Exercises } from './topic-7-complexity';

export const cs203Exercises: WrittenExercise[] = [
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
