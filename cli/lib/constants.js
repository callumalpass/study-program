export const STUP_DIR = '.stup';
export const STATE_DIR = '.stup/state';
export const ANSWERS_DIR = '.stup/answers';
export const CONTENT_DIR = '.stup/content';
export const PROGRESS_PATH = '.stup/state/progress.json';
export const CONFIG_PATH = '.stup/state/config.json';

export const GIST_FILENAME = 'study-program-progress.json';
export const GIST_DESCRIPTION = 'Study Program Progress';

export const CURRENT_PROGRESS_VERSION = 4;
export const QUIZ_PASSING_SCORE = 70;

export const SUPPORTED_RUNTIME_LANGUAGES = new Set(['python', 'javascript', 'typescript', 'c', 'cpp']);

export const QUESTION_TYPES = new Set([
  'multiple_choice',
  'fill_blank',
  'true_false',
  'code_output',
  'coding',
  'written',
]);
