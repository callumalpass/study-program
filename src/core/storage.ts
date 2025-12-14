// Progress persistence layer using localStorage

import type {
  UserProgress,
  SubjectProgress,
  QuizAttempt,
  ExerciseCompletion,
  ProjectSubmission,
  UserSettings,
} from './types';

const STORAGE_KEY = 'cs_degree_progress';
const CURRENT_VERSION = 1;

export class ProgressStorage {
  private progress: UserProgress;

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
   * Save progress to localStorage
   */
  save(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
    }
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
    // Currently only version 1 exists, but this allows for future migrations
    const migrated = { ...oldProgress };
    migrated.version = CURRENT_VERSION;

    // Add any missing fields with defaults
    if (!migrated.settings) {
      migrated.settings = this.getDefaults().settings;
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
        exerciseCompletions: {},
        projectSubmissions: {},
      };
    }

    this.progress.subjects[subjectId] = {
      ...this.progress.subjects[subjectId],
      ...updates,
    };

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
   * Add an exercise completion
   */
  addExerciseCompletion(subjectId: string, exerciseId: string, completion: ExerciseCompletion): void {
    if (!this.progress.subjects[subjectId]) {
      this.updateSubjectProgress(subjectId, { status: 'in_progress' });
    }

    const subjectProgress = this.progress.subjects[subjectId];
    if (!subjectProgress.exerciseCompletions[exerciseId]) {
      subjectProgress.exerciseCompletions[exerciseId] = [];
    }

    subjectProgress.exerciseCompletions[exerciseId].push(completion);
    this.save();
  }

  /**
   * Get all completions for a specific exercise
   */
  getExerciseCompletions(subjectId: string, exerciseId: string): ExerciseCompletion[] {
    return this.progress.subjects[subjectId]?.exerciseCompletions[exerciseId] || [];
  }

  /**
   * Check if an exercise has been passed
   */
  isExercisePassed(subjectId: string, exerciseId: string): boolean {
    const completions = this.getExerciseCompletions(subjectId, exerciseId);
    return completions.some(c => c.passed);
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
