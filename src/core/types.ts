// Core type definitions for stup Learning Platform

export type SubjectStatus = 'not_started' | 'in_progress' | 'completed';
export type QuestionType = 'multiple_choice' | 'fill_blank' | 'true_false' | 'code_output' | 'coding' | 'written';
export type ProgrammingLanguage = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'c' | 'rust' | 'go' | 'sql' | 'bash' | 'yaml' | 'dockerfile';
export type Theme = 'light' | 'dark' | 'auto';
export type ExerciseDifficulty = 1 | 2 | 3 | 4 | 5; // 1=easiest, 5=hardest (internal use)
export type AssessmentType = 'quiz' | 'exam';
export type SubjectCategory = 'cs' | 'math' | 'physics' | 'philosophy' | 'economics' | 'statistics';

// Subject and Curriculum Types
export interface Subject {
  id: string;
  code: string;
  title: string;
  category: SubjectCategory;
  year: number;
  semester: number;
  prerequisites: string[]; // Array of subject IDs
  description: string;
  learningObjectives: string[];
  topics: Topic[];
  estimatedHours: number;
  examIds?: string[];
  projectIds?: string[];
  tags?: string[]; // e.g., ['ml', 'theory', 'systems', 'foundational']
}

export interface Subtopic {
  id: string;           // e.g., 'cs101-t1-intro'
  slug: string;         // URL-friendly: 'introduction'
  title: string;        // Display title
  content: string;      // Markdown content
  order: number;        // For ordering: 1, 2, 3...
}

// Reading types for academic references
export type ReadingType = 'paper' | 'documentation' | 'textbook' | 'article' | 'rfc' | 'video';

export interface Reading {
  id: string;              // Unique ID: '[subject]-t[N]-reading-[N]'
  title: string;           // Title of the reading
  authors?: string[];      // Author(s) if applicable
  url: string;             // URL to the reading
  type: ReadingType;       // Type of reading material
  year?: number;           // Publication year
  required: boolean;       // Required vs optional reading
  description?: string;    // Brief description of what this reading covers
  estimatedMinutes?: number; // Estimated reading time
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  subtopics?: Subtopic[];  // Optional array of subtopics
  readings?: Reading[];    // Optional academic readings for the topic
  quizIds: string[];
  exerciseIds: string[];
}

// Exam Types (share question structure with quizzes)
export interface Exam {
  id: string;
  subjectId: string;
  topicId?: string;
  title: string;
  durationMinutes?: number;
  instructions?: string[];
  questions: QuizQuestion[];
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
  // Optional fields for coding/written variants
  starterCode?: string;
  testCases?: TestCase[];
  language?: ProgrammingLanguage;
  solution?: string;
  modelAnswer?: string; // Full model answer for AI evaluation of written questions
}

// Coding Exercise Types
export interface CodingExercise {
  id: string;
  subjectId: string;
  topicId: string;
  title: string;
  description: string;
  difficulty?: ExerciseDifficulty;
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
  difficulty?: ExerciseDifficulty;
  hints: string[];
  solution: string;
}

// Union type for all exercises
export type Exercise = CodingExercise | WrittenExercise;

export interface TestCase {
  input: string;
  expectedOutput?: string; // Optional - will be generated from solution if not provided
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
  scaffolding?: ProjectScaffolding;
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

export interface ProjectScaffolding {
  overview?: string;
  gettingStarted?: string[];
  milestones?: string[];
  starterResources?: StarterResource[];
  tips?: string[];
}

export interface StarterResource {
  label: string;
  description?: string;
  link?: string;
}

// Spaced Repetition Types
export interface ReviewItem {
  itemType: 'quiz' | 'exercise';
  itemId: string;
  subjectId: string;
  nextReviewAt: string;      // ISO date string
  interval: number;          // Days until next review
  streak: number;            // Consecutive correct answers
}

// User Progress Types
export interface UserProgress {
  version: number;
  startedAt: string; // ISO date string
  lastUpdated?: string; // ISO date string - for sync conflict resolution
  subjects: Record<string, SubjectProgress>;
  settings: UserSettings;
  reviewQueue?: ReviewItem[]; // Spaced repetition review queue
  selectedSubjectIds?: string[]; // Subjects in user's course plan (undefined = legacy user, migrate to all)
}

export interface SubtopicView {
  firstViewedAt: string;   // ISO date string
  lastViewedAt: string;    // ISO date string
  viewCount: number;
}

export interface SubjectProgress {
  status: SubjectStatus;
  startedAt?: string; // ISO date string
  completedAt?: string; // ISO date string
  quizAttempts: Record<string, QuizAttempt[]>;
  examAttempts: Record<string, ExamAttempt[]>;
  exerciseCompletions: Record<string, ExerciseCompletion>; // Single best/latest attempt per exercise
  projectSubmissions: Record<string, ProjectSubmission[]>;
  subtopicViews?: Record<string, SubtopicView>; // Track subtopic views
}

export interface AiGrade {
  score: number; // 0-100
  passed: boolean;
}

export interface QuizAttempt {
  attemptId: string;
  timestamp: string; // ISO date string
  answers: Record<string, any>;
  score: number; // Percentage
  timeSpentSeconds: number;
  aiGrades?: Record<string, AiGrade>; // AI grades for written questions, keyed by question ID
}

export interface ExamAttempt {
  attemptId: string;
  timestamp: string; // ISO date string
  answers: Record<string, any>;
  score: number; // Percentage
  timeSpentSeconds: number;
  aiGrades?: Record<string, AiGrade>; // AI grades for written questions, keyed by question ID
}

export interface ExerciseCompletion {
  completionId: string;
  timestamp: string; // ISO date string
  code: string;
  passed: boolean;
  passedTestCases?: number; // Optional for written exercises
  totalTestCases?: number; // Optional for written exercises
  timeSpentSeconds: number;
  type?: 'coding' | 'written'; // Type of exercise
}

export interface ProjectAiEvaluation {
  score: number; // 0-100 weighted score
  feedback: string;
  rubricScores: Record<string, { score: number; level: string; justification: string }>;
  strengths: string[];
  improvements: string[];
}

export interface ProjectSubmission {
  submissionId: string;
  timestamp: string; // ISO date string
  description: string;
  repositoryUrl?: string;
  demoUrl?: string;
  selfAssessment: Record<string, number>; // Criterion name -> score
  notes: string;
  aiEvaluation?: ProjectAiEvaluation;
}

// Study Plan Types
export type StudyPace = 'standard' | 'accelerated' | 'intensive';

export interface SubjectScheduleOverride {
  customStartDate?: string;      // ISO date string, overrides calculated start
  customDurationWeeks?: number;  // Override pace-based duration
}

export interface StudyPlanSettings {
  startDate: string;  // ISO date string
  pace: StudyPace;
  subjectOverrides?: Record<string, SubjectScheduleOverride>;
}

// Settings Types
export interface UserSettings {
  theme: Theme;
  codeEditorFontSize: number;
  showCompletedItems: boolean;
  githubToken?: string;
  gistId?: string;
  geminiApiKey?: string;
  studyPlan?: StudyPlanSettings;
}

// Route Types
export interface RouteParams {
  [key: string]: string;
}

export interface Route {
  path: string;
  params: RouteParams;
}

// Typed route parameter interfaces for better type safety
export interface SubjectRouteParams extends RouteParams {
  id: string;
}

export interface TopicRouteParams extends RouteParams {
  id: string;
  topicId: string;
}

export interface SubtopicRouteParams extends RouteParams {
  id: string;
  topicId: string;
  subtopicSlug: string;
}

export interface QuizRouteParams extends RouteParams {
  id: string;
  quizId: string;
}

export interface ExamRouteParams extends RouteParams {
  id: string;
  examId: string;
}

export interface ExerciseRouteParams extends RouteParams {
  id: string;
  exId: string;
}

export interface ProjectRouteParams extends RouteParams {
  id: string;
  projId: string;
}

// Course Builder Types
export interface CourseTemplate {
  id: string;
  name: string;
  description: string;
  subjectIds: string[];
  estimatedHours: number;
  icon?: string;
}
