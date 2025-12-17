export { exercises as topic1Exercises } from './topic1';
export { exercises as topic2Exercises } from './topic2';
export { exercises as topic3Exercises } from './topic3';
export { exercises as topic4Exercises } from './topic4';
export { exercises as topic5Exercises } from './topic5';
export { exercises as topic6Exercises } from './topic6';
export { exercises as topic7Exercises } from './topic7';

import { exercises as t1 } from './topic1';
import { exercises as t2 } from './topic2';
import { exercises as t3 } from './topic3';
import { exercises as t4 } from './topic4';
import { exercises as t5 } from './topic5';
import { exercises as t6 } from './topic6';
import { exercises as t7 } from './topic7';

export const allExercises = [...t1, ...t2, ...t3, ...t4, ...t5, ...t6, ...t7];

export default allExercises;
