// Core type definitions for CS Degree Learning Platform

export type SubjectStatus = 'not_started' | 'in_progress' | 'completed';
export type QuestionType = 'multiple_choice' | 'fill_blank' | 'true_false' | 'code_output';
export type ProgrammingLanguage = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'c' | 'rust' | 'go';
export type Theme = 'light' | 'dark' | 'auto';

// Subject and Curriculum Types
export interface Subject {
  id: string;
  code: string;
  title: string;
  year: number;
  semester: number;
  prerequisites: string[]; // Array of subject IDs
  description: string;
  learningObjectives: string[];
  topics: Topic[];
  estimatedHours: number;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  quizIds: string[];
  exerciseIds: string[];
}

// Quiz Types
export interface Quiz {
  id: string;
  subjectId: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[]; // For multiple_choice
  correctAnswer: string | number | boolean;
  explanation: string;
  codeSnippet?: string; // For code_output questions
}

// Coding Exercise Types
export interface CodingExercise {
  id: string;
  subjectId: string;
  topicId: string;
  title: string;
  description: string;
  starterCode: string;
  testCases: TestCase[];
  hints: string[];
  solution: string;
  language: ProgrammingLanguage;
}

// Written Exercise Types (for math/theory subjects)
export interface WrittenExercise {
  id: string;
  subjectId: string;
  topicId: string;
  type: 'written';
  title: string;
  description: string;
  hints: string[];
  solution: string;
}

// Union type for all exercises
export type Exercise = CodingExercise | WrittenExercise;

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  description: string;
}

// Project Types
export interface Project {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  requirements: string[];
  rubric: RubricCriterion[];
  estimatedHours: number;
}

export interface RubricCriterion {
  name: string;
  weight: number; // Percentage of total grade
  levels: RubricLevel[];
}

export interface RubricLevel {
  score: number;
  label: string;
  description: string;
}

// User Progress Types
export interface UserProgress {
  version: number;
  startedAt: string; // ISO date string
  subjects: Record<string, SubjectProgress>;
  settings: UserSettings;
}

export interface SubjectProgress {
  status: SubjectStatus;
  startedAt?: string; // ISO date string
  completedAt?: string; // ISO date string
  quizAttempts: Record<string, QuizAttempt[]>;
  exerciseCompletions: Record<string, ExerciseCompletion[]>;
  projectSubmissions: Record<string, ProjectSubmission[]>;
}

export interface QuizAttempt {
  attemptId: string;
  timestamp: string; // ISO date string
  answers: Record<string, string | number | boolean>;
  score: number; // Percentage
  timeSpentSeconds: number;
}

export interface ExerciseCompletion {
  completionId: string;
  timestamp: string; // ISO date string
  code: string;
  passed: boolean;
  passedTestCases: number;
  totalTestCases: number;
  timeSpentSeconds: number;
}

export interface ProjectSubmission {
  submissionId: string;
  timestamp: string; // ISO date string
  description: string;
  repositoryUrl?: string;
  demoUrl?: string;
  selfAssessment: Record<string, number>; // Criterion name -> score
  notes: string;
}

// Settings Types
export interface UserSettings {
  theme: Theme;
  codeEditorFontSize: number;
  showCompletedItems: boolean;
}

// Route Types
export interface RouteParams {
  [key: string]: string;
}

export interface Route {
  path: string;
  params: RouteParams;
}
