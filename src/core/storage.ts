// Progress persistence layer using localStorage

import type {
  UserProgress,
  SubjectProgress,
  QuizAttempt,
  ExamAttempt,
  ExerciseCompletion,
  ProjectSubmission,
  UserSettings,
  AiGrade,
} from './types';
import { githubService } from '../services/github';

const STORAGE_KEY = 'cs_degree_progress';
const CURRENT_VERSION = 2;
const SYNC_DEBOUNCE_MS = 5000; // Sync at most every 5 seconds

export class ProgressStorage {
  private progress: UserProgress;
  private syncTimeout: any = null;

  constructor() {
    this.progress = this.load();
  }

  /**
   * Load progress from localStorage, or return defaults if not found
   */
  load(): UserProgress {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return this.getDefaults();
      }

      const parsed = JSON.parse(stored) as UserProgress;

      // Migrate if needed
      if (parsed.version !== CURRENT_VERSION) {
        return this.migrate(parsed);
      }

      return parsed;
    } catch (error) {
      console.error('Failed to load progress from localStorage:', error);
      return this.getDefaults();
    }
  }

  /**
   * Save progress to localStorage and trigger sync
   */
  save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
      this.triggerSync();
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
    }
  }

  /**
   * Trigger background sync to GitHub Gist
   */
  private triggerSync(): void {
    // Only sync if credentials exist
    if (!this.progress.settings.githubToken || !this.progress.settings.gistId) {
      return;
    }

    // Clear existing timeout
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }

    // Debounce the sync call
    this.syncTimeout = setTimeout(async () => {
      try {
        const { githubToken, gistId } = this.progress.settings;
        if (githubToken && gistId) {
          await githubService.updateGist(githubToken, gistId, this.progress);
          console.log('Progress synced to GitHub Gist');
        }
      } catch (error) {
        console.error('Failed to sync to GitHub Gist:', error);
      }
    }, SYNC_DEBOUNCE_MS);
  }

  /**
   * Get default progress structure
   */
  getDefaults(): UserProgress {
    return {
      version: CURRENT_VERSION,
      startedAt: new Date().toISOString(),
      subjects: {},
      settings: {
        theme: 'auto',
        codeEditorFontSize: 14,
        showCompletedItems: true,
      },
    };
  }

  /**
   * Migrate progress from older versions
   */
  migrate(oldProgress: UserProgress): UserProgress {
    const migrated = { ...oldProgress };
    migrated.version = CURRENT_VERSION;

    // Add any missing fields with defaults
    if (!migrated.settings) {
      migrated.settings = this.getDefaults().settings;
    }

    // Ensure subject containers include new structures
    if (migrated.subjects) {
      Object.keys(migrated.subjects).forEach(subjectId => {
        const subjectProgress = migrated.subjects[subjectId] as SubjectProgress;
        subjectProgress.quizAttempts = subjectProgress.quizAttempts || {};
        subjectProgress.examAttempts = subjectProgress.examAttempts || {};
        subjectProgress.exerciseCompletions = subjectProgress.exerciseCompletions || {};
        subjectProgress.projectSubmissions = subjectProgress.projectSubmissions || {};
      });
    }

    return migrated;
  }

  /**
   * Get the current progress object
   */
  getProgress(): UserProgress {
    return this.progress;
  }

  /**
   * Get progress for a specific subject
   */
  getSubjectProgress(subjectId: string): SubjectProgress | undefined {
    return this.progress.subjects[subjectId];
  }

  /**
   * Initialize or update subject progress
   */
  updateSubjectProgress(subjectId: string, updates: Partial<SubjectProgress>): void {
    if (!this.progress.subjects[subjectId]) {
      this.progress.subjects[subjectId] = {
        status: 'not_started',
        quizAttempts: {},
        examAttempts: {},
        exerciseCompletions: {},
        projectSubmissions: {},
      };
    }

    this.progress.subjects[subjectId] = {
      ...this.progress.subjects[subjectId],
      ...updates,
    };

    // Ensure new collections exist after merge
    if (!this.progress.subjects[subjectId].quizAttempts) {
      this.progress.subjects[subjectId].quizAttempts = {};
    }
    if (!this.progress.subjects[subjectId].examAttempts) {
      this.progress.subjects[subjectId].examAttempts = {};
    }
    if (!this.progress.subjects[subjectId].exerciseCompletions) {
      this.progress.subjects[subjectId].exerciseCompletions = {};
    }
    if (!this.progress.subjects[subjectId].projectSubmissions) {
      this.progress.subjects[subjectId].projectSubmissions = {};
    }

    this.save();
  }

  /**
   * Add a quiz attempt
   */
  addQuizAttempt(subjectId: string, quizId: string, attempt: QuizAttempt): void {
    if (!this.progress.subjects[subjectId]) {
      this.updateSubjectProgress(subjectId, { status: 'in_progress' });
    }

    const subjectProgress = this.progress.subjects[subjectId];
    if (!subjectProgress.quizAttempts[quizId]) {
      subjectProgress.quizAttempts[quizId] = [];
    }

    subjectProgress.quizAttempts[quizId].push(attempt);
    this.save();
  }

  /**
   * Get all attempts for a specific quiz
   */
  getQuizAttempts(subjectId: string, quizId: string): QuizAttempt[] {
    return this.progress.subjects[subjectId]?.quizAttempts[quizId] || [];
  }

  /**
   * Add an exam attempt
   */
  addExamAttempt(subjectId: string, examId: string, attempt: ExamAttempt): void {
    if (!this.progress.subjects[subjectId]) {
      this.updateSubjectProgress(subjectId, { status: 'in_progress' });
    }

    const subjectProgress = this.progress.subjects[subjectId];
    if (!subjectProgress.examAttempts[examId]) {
      subjectProgress.examAttempts[examId] = [];
    }

    subjectProgress.examAttempts[examId].push(attempt);
    this.save();
  }

  /**
   * Get all attempts for a specific exam
   */
  getExamAttempts(subjectId: string, examId: string): ExamAttempt[] {
    return this.progress.subjects[subjectId]?.examAttempts[examId] || [];
  }

  /**
   * Get the best exam attempt (highest score)
   */
  getBestExamAttempt(subjectId: string, examId: string): ExamAttempt | undefined {
    const attempts = this.getExamAttempts(subjectId, examId);
    if (attempts.length === 0) return undefined;

    return attempts.reduce((best, current) =>
      current.score > best.score ? current : best
    );
  }

  /**
   * Update AI grade for a question in the latest exam attempt
   */
  updateExamAiGrade(subjectId: string, examId: string, questionId: string, grade: AiGrade): void {
    const attempts = this.progress.subjects[subjectId]?.examAttempts[examId];
    if (!attempts || attempts.length === 0) return;

    const latestAttempt = attempts[attempts.length - 1];
    if (!latestAttempt.aiGrades) {
      latestAttempt.aiGrades = {};
    }
    latestAttempt.aiGrades[questionId] = grade;
    this.save();
  }

  /**
   * Get the best quiz attempt (highest score)
   */
  getBestQuizAttempt(subjectId: string, quizId: string): QuizAttempt | undefined {
    const attempts = this.getQuizAttempts(subjectId, quizId);
    if (attempts.length === 0) return undefined;

    return attempts.reduce((best, current) =>
      current.score > best.score ? current : best
    );
  }

  /**
   * Save an exercise completion (keeps best attempt based on passed status and test cases)
   */
  addExerciseCompletion(subjectId: string, exerciseId: string, completion: ExerciseCompletion): void {
    if (!this.progress.subjects[subjectId]) {
      this.updateSubjectProgress(subjectId, { status: 'in_progress' });
    }

    const subjectProgress = this.progress.subjects[subjectId];
    const existing = subjectProgress.exerciseCompletions[exerciseId];

    // Determine if new completion is better than existing
    const shouldReplace = !existing ||
      // New is passed, old wasn't
      (completion.passed && !existing.passed) ||
      // Both passed/failed, but new has more test cases passed
      (completion.passed === existing.passed &&
       (completion.passedTestCases ?? 0) > (existing.passedTestCases ?? 0)) ||
      // For written exercises: always update if new has content
      (completion.type === 'written' && completion.code.trim().length > 0);

    if (shouldReplace) {
      // Accumulate total time spent
      const totalTime = (existing?.timeSpentSeconds ?? 0) + completion.timeSpentSeconds;
      subjectProgress.exerciseCompletions[exerciseId] = {
        ...completion,
        timeSpentSeconds: totalTime,
      };
    }

    this.save();
  }

  /**
   * Get completion for a specific exercise
   */
  getExerciseCompletion(subjectId: string, exerciseId: string): ExerciseCompletion | undefined {
    return this.progress.subjects[subjectId]?.exerciseCompletions[exerciseId];
  }

  /**
   * Check if an exercise has been passed
   */
  isExercisePassed(subjectId: string, exerciseId: string): boolean {
    const completion = this.getExerciseCompletion(subjectId, exerciseId);
    return completion?.passed ?? false;
  }

  /**
   * Add a project submission
   */
  addProjectSubmission(subjectId: string, projectId: string, submission: ProjectSubmission): void {
    if (!this.progress.subjects[subjectId]) {
      this.updateSubjectProgress(subjectId, { status: 'in_progress' });
    }

    const subjectProgress = this.progress.subjects[subjectId];
    if (!subjectProgress.projectSubmissions[projectId]) {
      subjectProgress.projectSubmissions[projectId] = [];
    }

    subjectProgress.projectSubmissions[projectId].push(submission);
    this.save();
  }

  /**
   * Get all submissions for a specific project
   */
  getProjectSubmissions(subjectId: string, projectId: string): ProjectSubmission[] {
    return this.progress.subjects[subjectId]?.projectSubmissions[projectId] || [];
  }

  /**
   * Update user settings
   */
  updateSettings(updates: Partial<UserSettings>): void {
    this.progress.settings = {
      ...this.progress.settings,
      ...updates,
    };
    this.save();
  }

  /**
   * Get current settings
   */
  getSettings(): UserSettings {
    return this.progress.settings;
  }

  /**
   * Export progress as JSON string
   */
  exportProgress(): string {
    return JSON.stringify(this.progress, null, 2);
  }

  /**
   * Import progress from JSON string
   */
  importProgress(jsonString: string): boolean {
    try {
      const imported = JSON.parse(jsonString) as UserProgress;

      // Validate basic structure
      if (!imported.version || !imported.subjects || !imported.settings) {
        throw new Error('Invalid progress data structure');
      }

      // Migrate if needed
      this.progress = imported.version !== CURRENT_VERSION
        ? this.migrate(imported)
        : imported;

      this.save();
      return true;
    } catch (error) {
      console.error('Failed to import progress:', error);
      return false;
    }
  }

  /**
   * Reset all progress (with confirmation)
   */
  resetProgress(): void {
    this.progress = this.getDefaults();
    this.save();
  }

  /**
   * Clear a specific subject's progress
   */
  clearSubjectProgress(subjectId: string): void {
    delete this.progress.subjects[subjectId];
    this.save();
  }
}

// Singleton instance
export const progressStorage = new ProgressStorage();

// Export functions for convenience
export const loadProgress = () => progressStorage.getProgress();
export const saveProgress = () => progressStorage.save();
export const exportProgress = () => progressStorage.exportProgress();
export const importProgress = (json: string) => progressStorage.importProgress(json);
export const resetProgress = () => progressStorage.resetProgress();
