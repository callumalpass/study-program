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
  SubtopicView,
  ReviewItem,
} from './types';
import { QUIZ_PASSING_SCORE } from './types';
import { githubService } from '../services/github';

const STORAGE_KEY = 'study_program_progress';
const CURRENT_VERSION = 4;

// All subject IDs for migration (existing users get all subjects selected)
const ALL_SUBJECT_IDS = [
  'cs101', 'math101', 'cs102', 'cs103', 'math102', 'cs104', 'cs105',
  'cs201', 'cs202', 'cs203', 'math203', 'cs204', 'cs205', 'math201', 'math202', 'math204',
  'cs301', 'cs302', 'cs303', 'cs304', 'math301', 'math302', 'cs305', 'cs306', 'cs307', 'math303', 'math304',
  'cs401', 'cs402', 'cs403', 'cs405', 'math401', 'math402', 'cs404', 'cs406', 'cs407', 'math403', 'math404',
];

/**
 * Calculate the next review interval based on streak and pass/fail.
 * Uses a spaced repetition system: 1 day -> 3 days -> 7 days -> 14 days -> 30 days
 *
 * Note: The streak is incremented BEFORE this function is called when passed=true.
 * So streak=1 means the item was just passed for the first time.
 */
function calculateNextInterval(streak: number, passed: boolean): number {
  if (!passed) return 1;  // Failed: review tomorrow

  switch (streak) {
    case 0: return 1;     // Not yet passed (shouldn't happen with current logic)
    case 1: return 3;     // First pass: review in 3 days
    case 2: return 7;     // Second pass: review in 1 week
    case 3: return 14;    // Third pass: review in 2 weeks
    default: return 30;   // Fourth+ pass (mastered): review monthly
  }
}
const SYNC_DEBOUNCE_MS = 5000; // Sync at most every 5 seconds

// Settings that are safe to sync (non-sensitive)
type SyncableSettings = Pick<UserSettings, 'theme' | 'codeEditorFontSize' | 'showCompletedItems' | 'studyPlan'>;

/**
 * Extract non-sensitive settings that are safe to sync to gist
 */
function getSyncableSettings(settings: UserSettings): SyncableSettings {
  return {
    theme: settings.theme,
    codeEditorFontSize: settings.codeEditorFontSize,
    showCompletedItems: settings.showCompletedItems,
    studyPlan: settings.studyPlan,
  };
}

export class ProgressStorage {
  private progress: UserProgress;
  private syncTimeout: ReturnType<typeof setTimeout> | null = null;

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
      this.progress.lastUpdated = new Date().toISOString();
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
   * Immediately sync to GitHub Gist without debounce.
   * Call this on page unload to ensure pending changes are saved.
   */
  flushSync(): void {
    // Cancel any pending debounced sync
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
      this.syncTimeout = null;
    }

    // Only sync if credentials exist
    const { githubToken, gistId } = this.progress.settings;
    if (!githubToken || !gistId) {
      return;
    }

    // Use sendBeacon for reliable delivery during page unload
    // Falls back to synchronous approach if sendBeacon unavailable
    try {
      // Include non-sensitive settings in sync
      const { settings, ...progressWithoutSettings } = this.progress;
      const progressToSave = {
        ...progressWithoutSettings,
        settings: getSyncableSettings(settings),
      };
      const payload = JSON.stringify(progressToSave);
      const url = `https://api.github.com/gists/${gistId}`;
      const body = JSON.stringify({
        files: {
          'study-program-progress.json': {
            content: payload,
          },
        },
      });

      // Use fetch with keepalive to allow request to complete during page unload
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body,
        keepalive: true,
      }).catch(() => {
        // Silent fail - we're unloading anyway
      });
    } catch {
      // Silent fail during unload
    }
  }

  /**
   * Sync progress from GitHub Gist (pull remote changes)
   * Returns { synced: true/false, updated: true/false }
   */
  async syncFromGist(): Promise<{ synced: boolean; updated: boolean }> {
    const { githubToken, gistId } = this.progress.settings;

    // No credentials configured
    if (!githubToken || !gistId) {
      return { synced: false, updated: false };
    }

    try {
      const remoteProgress = await githubService.loadGist(githubToken, gistId);

      if (!remoteProgress) {
        console.log('No remote progress found or failed to load');
        return { synced: false, updated: false };
      }

      // Compare timestamps - remote wins if newer
      const localTimestamp = this.progress.lastUpdated ? new Date(this.progress.lastUpdated).getTime() : 0;
      const remoteTimestamp = remoteProgress.lastUpdated ? new Date(remoteProgress.lastUpdated).getTime() : 0;

      if (remoteTimestamp > localTimestamp) {
        // Remote is newer - import it but preserve local sensitive settings
        const currentSettings = this.progress.settings;
        this.progress = remoteProgress.version !== CURRENT_VERSION
          ? this.migrate(remoteProgress)
          : remoteProgress;

        // Merge settings: use remote non-sensitive settings, preserve local sensitive ones
        this.progress.settings = {
          ...this.progress.settings,
          // Preserve sensitive credentials from local settings
          githubToken: currentSettings.githubToken,
          gistId: currentSettings.gistId,
          geminiApiKey: currentSettings.geminiApiKey,
        };

        // Save to localStorage without triggering sync back to Gist
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
        console.log('Progress updated from GitHub Gist');
        return { synced: true, updated: true };
      }

      console.log('Local progress is up to date');
      return { synced: true, updated: false };
    } catch (error) {
      console.error('Failed to sync from GitHub Gist:', error);
      return { synced: false, updated: false };
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
    const migrated = { ...oldProgress };
    migrated.version = CURRENT_VERSION;

    // Add any missing fields with defaults
    if (!migrated.settings) {
      migrated.settings = this.getDefaults().settings;
    }

    // Add reviewQueue if missing (v3+)
    if (!migrated.reviewQueue) {
      migrated.reviewQueue = [];
    }

    // Add selectedSubjectIds if missing (v4+)
    // Existing users get all subjects selected to preserve current behavior
    if (!migrated.selectedSubjectIds) {
      migrated.selectedSubjectIds = [...ALL_SUBJECT_IDS];
    }

    // Ensure subject containers include new structures
    if (migrated.subjects) {
      Object.keys(migrated.subjects).forEach(subjectId => {
        const subjectProgress = migrated.subjects[subjectId] as SubjectProgress;
        subjectProgress.quizAttempts = subjectProgress.quizAttempts || {};
        subjectProgress.examAttempts = subjectProgress.examAttempts || {};
        subjectProgress.exerciseCompletions = subjectProgress.exerciseCompletions || {};
        subjectProgress.projectSubmissions = subjectProgress.projectSubmissions || {};
        subjectProgress.subtopicViews = subjectProgress.subtopicViews || {};
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
        subtopicViews: {},
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

    // Auto-add to review queue if score below passing threshold
    if (attempt.score < QUIZ_PASSING_SCORE) {
      this.addToReviewQueue({
        itemType: 'quiz',
        itemId: quizId,
        subjectId,
      });
      // Also update review item to reset streak if it exists
      this.updateReviewItem(quizId, 'quiz', false);
    } else {
      // Good score - update review item if it exists (extends interval)
      this.updateReviewItem(quizId, 'quiz', true);
    }

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
    const incomingAiEvaluations = completion.aiEvaluations ?? [];
    const mergedAiEvaluations = incomingAiEvaluations.length > 0
      ? [...(existing?.aiEvaluations ?? []), ...incomingAiEvaluations]
      : existing?.aiEvaluations;
    const hasAiEvaluation = incomingAiEvaluations.length > 0;
    const isAiOnlyCompletion = hasAiEvaluation &&
      completion.passedTestCases === undefined &&
      completion.totalTestCases === undefined;

    // Determine if new completion is better than existing
    const shouldReplace = !existing ||
      // New is passed, old wasn't
      (completion.passed && !existing.passed) ||
      // Both passed/failed, but new has more test cases passed
      (completion.passed === existing.passed &&
       (completion.passedTestCases ?? 0) > (existing.passedTestCases ?? 0)) ||
      // For written exercises: always update if new has content
      (completion.type === 'written' && completion.code.trim().length > 0) ||
      // For AI-evaluated exercises: always update to latest evaluation
      isAiOnlyCompletion;

    if (shouldReplace) {
      // Accumulate total time spent
      const totalTime = (existing?.timeSpentSeconds ?? 0) + completion.timeSpentSeconds;
      subjectProgress.exerciseCompletions[exerciseId] = {
        ...completion,
        timeSpentSeconds: totalTime,
        aiEvaluations: mergedAiEvaluations,
      };
    } else if (mergedAiEvaluations && existing) {
      subjectProgress.exerciseCompletions[exerciseId] = {
        ...existing,
        aiEvaluations: mergedAiEvaluations,
      };
    }

    // Auto-add to review queue if failed
    if (!completion.passed) {
      this.addToReviewQueue({
        itemType: 'exercise',
        itemId: exerciseId,
        subjectId,
      });
      // Also update review item to reset streak if it exists
      this.updateReviewItem(exerciseId, 'exercise', false);
    } else {
      // Passed - update review item if it exists (extends interval)
      this.updateReviewItem(exerciseId, 'exercise', true);
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
   * Record a subtopic view
   */
  recordSubtopicView(subjectId: string, subtopicId: string): void {
    if (!this.progress.subjects[subjectId]) {
      this.updateSubjectProgress(subjectId, { status: 'in_progress' });
    }

    const subjectProgress = this.progress.subjects[subjectId];
    if (!subjectProgress.subtopicViews) {
      subjectProgress.subtopicViews = {};
    }

    const now = new Date().toISOString();
    const existing = subjectProgress.subtopicViews[subtopicId];

    if (existing) {
      existing.lastViewedAt = now;
      existing.viewCount += 1;
    } else {
      subjectProgress.subtopicViews[subtopicId] = {
        firstViewedAt: now,
        lastViewedAt: now,
        viewCount: 1,
      };
    }

    this.save();
  }

  /**
   * Get subtopic view data
   */
  getSubtopicView(subjectId: string, subtopicId: string): SubtopicView | undefined {
    return this.progress.subjects[subjectId]?.subtopicViews?.[subtopicId];
  }

  /**
   * Check if all subtopics in a topic have been viewed
   */
  areAllSubtopicsViewed(subjectId: string, subtopicIds: string[]): boolean {
    const views = this.progress.subjects[subjectId]?.subtopicViews;
    if (!views) return false;
    return subtopicIds.every(id => views[id] !== undefined);
  }

  /**
   * Get the most recently viewed subtopic for a subject.
   * Returns the subtopic ID with the most recent lastViewedAt, or null if none.
   */
  getLastViewedSubtopicForSubject(subjectId: string): { subtopicId: string; lastViewedAt: Date } | null {
    const views = this.progress.subjects[subjectId]?.subtopicViews;
    if (!views || Object.keys(views).length === 0) {
      return null;
    }

    let mostRecent: { subtopicId: string; lastViewedAt: Date } | null = null;

    for (const [subtopicId, view] of Object.entries(views)) {
      const lastViewedAt = new Date(view.lastViewedAt);
      if (!mostRecent || lastViewedAt.getTime() > mostRecent.lastViewedAt.getTime()) {
        mostRecent = { subtopicId, lastViewedAt };
      }
    }

    return mostRecent;
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

  // ==================== Course Selection Methods ====================

  /**
   * Get the list of selected subject IDs
   * Returns empty array for new users, all subjects for migrated users
   */
  getSelectedSubjects(): string[] {
    return this.progress.selectedSubjectIds || [];
  }

  /**
   * Set the complete list of selected subject IDs
   */
  setSelectedSubjects(subjectIds: string[]): void {
    this.progress.selectedSubjectIds = [...subjectIds];
    this.save();
  }

  /**
   * Add a subject to the selection
   */
  addToSelection(subjectId: string): void {
    if (!this.progress.selectedSubjectIds) {
      this.progress.selectedSubjectIds = [];
    }
    if (!this.progress.selectedSubjectIds.includes(subjectId)) {
      this.progress.selectedSubjectIds.push(subjectId);
      this.save();
    }
  }

  /**
   * Remove a subject from the selection
   */
  removeFromSelection(subjectId: string): void {
    if (!this.progress.selectedSubjectIds) return;
    this.progress.selectedSubjectIds = this.progress.selectedSubjectIds.filter(
      id => id !== subjectId
    );
    this.save();
  }

  /**
   * Check if a subject is selected
   */
  isSubjectSelected(subjectId: string): boolean {
    return this.progress.selectedSubjectIds?.includes(subjectId) ?? false;
  }

  /**
   * Check if user has any subjects selected (for onboarding flow)
   */
  hasSelectedSubjects(): boolean {
    return (this.progress.selectedSubjectIds?.length ?? 0) > 0;
  }

  // ==================== End Course Selection Methods ====================

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

  // ==================== Spaced Repetition Methods ====================

  /**
   * Add an item to the review queue (if not already present)
   */
  addToReviewQueue(item: { itemType: 'quiz' | 'exercise'; itemId: string; subjectId: string }): void {
    if (!this.progress.reviewQueue) {
      this.progress.reviewQueue = [];
    }

    // Check if already in queue
    const existing = this.progress.reviewQueue.find(
      r => r.itemId === item.itemId && r.itemType === item.itemType
    );

    if (!existing) {
      this.progress.reviewQueue.push({
        ...item,
        nextReviewAt: new Date().toISOString(), // Due now
        interval: 1,
        streak: 0,
      });
      // Note: save() is called by the parent method
    }
  }

  /**
   * Update a review item after an attempt (recalculates next review date)
   */
  updateReviewItem(itemId: string, itemType: 'quiz' | 'exercise', passed: boolean): void {
    const queue = this.progress.reviewQueue;
    if (!queue) return;

    const item = queue.find(r => r.itemId === itemId && r.itemType === itemType);
    if (!item) return;

    if (passed) {
      item.streak += 1;
    } else {
      item.streak = 0;
    }

    item.interval = calculateNextInterval(item.streak, passed);

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + item.interval);
    item.nextReviewAt = nextDate.toISOString();

    // Note: save() is called by the parent method
  }

  /**
   * Get items due for review (sorted by due date, oldest first)
   */
  getDueReviewItems(limit: number = 10): ReviewItem[] {
    const queue = this.progress.reviewQueue || [];
    const now = new Date();

    return queue
      .filter(item => new Date(item.nextReviewAt) <= now)
      .sort((a, b) => new Date(a.nextReviewAt).getTime() - new Date(b.nextReviewAt).getTime())
      .slice(0, limit);
  }

  /**
   * Get all items in the review queue (including future items)
   */
  getReviewQueue(): ReviewItem[] {
    return this.progress.reviewQueue || [];
  }

  /**
   * Remove an item from the review queue (e.g., when mastered)
   */
  removeFromReviewQueue(itemId: string, itemType: 'quiz' | 'exercise'): void {
    if (!this.progress.reviewQueue) return;

    this.progress.reviewQueue = this.progress.reviewQueue.filter(
      r => !(r.itemId === itemId && r.itemType === itemType)
    );
    this.save();
  }

  /**
   * Get count of items due for review
   */
  getDueReviewCount(): number {
    const queue = this.progress.reviewQueue || [];
    const now = new Date();
    return queue.filter(item => new Date(item.nextReviewAt) <= now).length;
  }

  // ==================== End Spaced Repetition Methods ====================

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
