/**
 * Central registry for all subject content.
 *
 * To add a new subject:
 * 1. Create the subject folder with standard files (topics.ts, quizzes.ts, exercises/, projects.ts, exams.ts)
 * 2. Create an index.ts that exports: {subjectId}Topics, {subjectId}Quizzes, {subjectId}Exercises, {subjectId}Projects, {subjectId}Exams
 * 3. Import and add to the arrays below
 *
 * That's it - main.ts and other files import from here automatically.
 */

import type { Quiz, Exercise, Project, Exam } from '../core/types';

// Year 1 - Semester 1
import { cs101Quizzes, cs101Exercises, cs101Projects, cs101Exams } from './cs101';
import { math101Quizzes, math101Exercises, math101Exams } from './math101';
import { cs102Quizzes, cs102Exercises, cs102Projects, cs102Exams } from './cs102';

// Year 1 - Semester 2
import { cs103Quizzes, cs103Exercises, cs103Projects, cs103Exams } from './cs103';
import { math102Quizzes, math102Exercises, math102Projects, math102Exams } from './math102';
import { cs104Quizzes, cs104Exercises, cs104Projects, cs104Exams } from './cs104';
import { cs105Quizzes, cs105Exercises, cs105Projects, cs105Exams } from './cs105';

// Year 2 - Semester 1
import { cs201Quizzes, cs201Exercises, cs201Projects, cs201Exams } from './cs201';
import { cs202Quizzes, cs202Exercises, cs202Projects, cs202Exams } from './cs202';
import { cs203Quizzes, cs203Exercises, cs203Projects, cs203Exams } from './cs203';
import { math203Quizzes, math203Exercises, math203Projects, math203Exams } from './math203';

// Year 2 - Semester 2
import { cs204Quizzes, cs204Exercises, cs204Projects, cs204Exams } from './cs204';
import { cs205Quizzes, cs205Exercises, cs205Projects, cs205Exams } from './cs205';
import { math201Quizzes, math201Exercises, math201Exams } from './math201';
import { math202Quizzes, math202Exercises, math202Exams } from './math202';
import { math204Quizzes, math204Exercises, math204Exams } from './math204';

// Year 3 - Semester 1
import { cs301Quizzes, cs301Exercises, cs301Projects, cs301Exams } from './cs301';
import { cs302Quizzes, cs302Exercises, cs302Projects, cs302Exams } from './cs302';
import { cs303Quizzes, cs303Exercises, cs303Projects, cs303Exams } from './cs303';
import { cs304Quizzes, cs304Exercises, cs304Projects, cs304Exams } from './cs304';

// Year 3 - Semester 2
import { cs305Quizzes, cs305Exercises, cs305Projects, cs305Exams } from './cs305';
import { cs306Quizzes, cs306Exercises, cs306Projects, cs306Exams } from './cs306';
import { cs307Quizzes, cs307Exercises, cs307Projects, cs307Exams } from './cs307';
import { math301Quizzes, math301Exercises, math301Exams } from './math301';
import { math302Quizzes, math302Exercises, math302Exams } from './math302';
import { math303Quizzes, math303Exercises, math303Exams } from './math303';
import { math304Quizzes, math304Exercises, math304Exams } from './math304';

// Year 4
import { cs401Quizzes, cs401Exercises, cs401Projects, cs401Exams } from './cs401';
import { cs402Quizzes, cs402Exercises, cs402Projects, cs402Exams } from './cs402';
import { cs403Quizzes, cs403Exercises, cs403Projects, cs403Exams } from './cs403';
import { cs404Quizzes, cs404Exercises, cs404Projects, cs404Exams } from './cs404';
import { cs405Quizzes, cs405Exercises, cs405Projects, cs405Exams } from './cs405';
import { cs406Quizzes, cs406Exercises, cs406Projects, cs406Exams } from './cs406';
import { cs407Quizzes, cs407Exercises, cs407Projects, cs407Exams } from './cs407';
import { math401Quizzes, math401Exercises, math401Exams } from './math401';
import { math402Quizzes, math402Exercises, math402Exams } from './math402';
import { math403Quizzes, math403Exercises, math403Exams } from './math403';
import { math404Quizzes, math404Exercises, math404Exams } from './math404';

// Aggregate all quizzes
export const allQuizzes: Quiz[] = [
  // Year 1
  ...cs101Quizzes,
  ...math101Quizzes,
  ...cs102Quizzes,
  ...cs103Quizzes,
  ...math102Quizzes,
  ...cs104Quizzes,
  ...cs105Quizzes,
  // Year 2
  ...cs201Quizzes,
  ...cs202Quizzes,
  ...cs203Quizzes,
  ...cs204Quizzes,
  ...cs205Quizzes,
  ...math201Quizzes,
  ...math202Quizzes,
  ...math203Quizzes,
  ...math204Quizzes,
  // Year 3
  ...cs301Quizzes,
  ...cs302Quizzes,
  ...cs303Quizzes,
  ...cs304Quizzes,
  ...cs305Quizzes,
  ...cs306Quizzes,
  ...cs307Quizzes,
  ...math301Quizzes,
  ...math302Quizzes,
  ...math303Quizzes,
  ...math304Quizzes,
  // Year 4
  ...cs401Quizzes,
  ...cs402Quizzes,
  ...cs403Quizzes,
  ...cs404Quizzes,
  ...cs405Quizzes,
  ...cs406Quizzes,
  ...cs407Quizzes,
  ...math401Quizzes,
  ...math402Quizzes,
  ...math403Quizzes,
  ...math404Quizzes,
];

// Aggregate all exams
export const allExams: Exam[] = [
  // Year 1
  ...cs101Exams,
  ...math101Exams,
  ...cs102Exams,
  ...cs103Exams,
  ...math102Exams,
  ...cs104Exams,
  ...cs105Exams,
  // Year 2
  ...cs201Exams,
  ...cs202Exams,
  ...cs203Exams,
  ...cs204Exams,
  ...cs205Exams,
  ...math201Exams,
  ...math202Exams,
  ...math203Exams,
  ...math204Exams,
  // Year 3
  ...cs301Exams,
  ...cs302Exams,
  ...cs303Exams,
  ...cs304Exams,
  ...cs305Exams,
  ...cs306Exams,
  ...cs307Exams,
  ...math301Exams,
  ...math302Exams,
  ...math303Exams,
  ...math304Exams,
  // Year 4
  ...cs401Exams,
  ...cs402Exams,
  ...cs403Exams,
  ...cs404Exams,
  ...cs405Exams,
  ...cs406Exams,
  ...cs407Exams,
  ...math401Exams,
  ...math402Exams,
  ...math403Exams,
  ...math404Exams,
];

// Aggregate all exercises
export const allExercises: Exercise[] = [
  // Year 1
  ...cs101Exercises,
  ...math101Exercises,
  ...cs102Exercises,
  ...cs103Exercises,
  ...math102Exercises,
  ...cs104Exercises,
  ...cs105Exercises,
  // Year 2
  ...cs201Exercises,
  ...cs202Exercises,
  ...cs203Exercises,
  ...cs204Exercises,
  ...cs205Exercises,
  ...math201Exercises,
  ...math202Exercises,
  ...math203Exercises,
  ...math204Exercises,
  // Year 3
  ...cs301Exercises,
  ...cs302Exercises,
  ...cs303Exercises,
  ...cs304Exercises,
  ...cs305Exercises,
  ...cs306Exercises,
  ...cs307Exercises,
  ...math301Exercises,
  ...math302Exercises,
  ...math303Exercises,
  ...math304Exercises,
  // Year 4
  ...cs401Exercises,
  ...cs402Exercises,
  ...cs403Exercises,
  ...cs404Exercises,
  ...cs405Exercises,
  ...cs406Exercises,
  ...cs407Exercises,
  ...math401Exercises,
  ...math402Exercises,
  ...math403Exercises,
  ...math404Exercises,
];

// Aggregate all projects
export const allProjects: Project[] = [
  // Year 1
  ...cs101Projects,
  ...cs102Projects,
  ...cs103Projects,
  ...math102Projects,
  ...cs104Projects,
  ...cs105Projects,
  // Year 2
  ...cs201Projects,
  ...cs202Projects,
  ...cs203Projects,
  ...cs204Projects,
  ...cs205Projects,
  ...math203Projects,
  // Year 3
  ...cs301Projects,
  ...cs302Projects,
  ...cs303Projects,
  ...cs304Projects,
  ...cs305Projects,
  ...cs306Projects,
  ...cs307Projects,
  // Year 4
  ...cs401Projects,
  ...cs402Projects,
  ...cs403Projects,
  ...cs404Projects,
  ...cs405Projects,
  ...cs406Projects,
  ...cs407Projects,
];
