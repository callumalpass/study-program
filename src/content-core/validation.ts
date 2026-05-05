import type { Exam, Exercise, Project, Quiz, QuizQuestion, Subject } from '@/core/types';
import {
  bundledExams,
  bundledExercises,
  bundledPackManifest,
  bundledProjects,
  bundledQuizzes,
  bundledSubjects,
  bundledTracks,
  type ContentPackManifest,
  type ContentTrack,
} from './bundled-pack';

export type ValidationSeverity = 'error' | 'warning';

export interface ValidationIssue {
  severity: ValidationSeverity;
  code: string;
  message: string;
  id?: string;
}

export interface ValidationResult {
  ok: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  stats: {
    subjects: number;
    topics: number;
    quizzes: number;
    exercises: number;
    exams: number;
    projects: number;
    tracks: number;
  };
}

interface ContentGraphInput {
  manifest: ContentPackManifest;
  subjects: Subject[];
  tracks: ContentTrack[];
  quizzes: Quiz[];
  exercises: Exercise[];
  exams: Exam[];
  projects: Project[];
}

function issue(
  issues: ValidationIssue[],
  severity: ValidationSeverity,
  code: string,
  message: string,
  id?: string,
): void {
  issues.push({ severity, code, message, id });
}

function addDuplicateIdIssues(
  issues: ValidationIssue[],
  code: string,
  label: string,
  ids: string[],
): void {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const id of ids) {
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  }
  for (const id of duplicates) {
    issue(issues, 'error', code, `Duplicate ${label} id: ${id}`, id);
  }
}

function validateQuestion(
  issues: ValidationIssue[],
  question: QuizQuestion,
  ownerId: string,
): void {
  if (!question.id) {
    issue(issues, 'error', 'question.missing_id', `${ownerId} has a question without an id`);
  }
  if (!question.type) {
    issue(issues, 'error', 'question.missing_type', `Question ${question.id || '(missing id)'} has no type`, question.id);
  }
  const hasWrittenModelAnswer = question.type === 'written' && Boolean(question.modelAnswer);
  if (question.correctAnswer === undefined && !hasWrittenModelAnswer) {
    issue(issues, 'error', 'question.missing_correct_answer', `Question ${question.id} has no correctAnswer`, question.id);
  }
  if (!question.explanation && !hasWrittenModelAnswer) {
    issue(issues, 'error', 'question.missing_explanation', `Question ${question.id} has no explanation`, question.id);
  }
  if (question.type === 'multiple_choice') {
    if (!Array.isArray(question.options) || question.options.length === 0) {
      issue(issues, 'error', 'question.missing_options', `Multiple-choice question ${question.id} has no options`, question.id);
    }
    if (typeof question.correctAnswer === 'number') {
      const optionCount = question.options?.length ?? 0;
      if (question.correctAnswer < 0 || question.correctAnswer >= optionCount) {
        issue(issues, 'error', 'question.invalid_correct_answer', `Question ${question.id} correctAnswer is outside its options`, question.id);
      }
    }
  }
  if (question.type === 'true_false' && typeof question.correctAnswer !== 'boolean') {
    issue(issues, 'error', 'question.invalid_true_false_answer', `True/false question ${question.id} must use a boolean correctAnswer`, question.id);
  }
}

function validateAssessmentQuestions(
  issues: ValidationIssue[],
  owner: Pick<Quiz | Exam, 'id' | 'questions'>,
): void {
  if (!Array.isArray(owner.questions) || owner.questions.length === 0) {
    issue(issues, 'error', 'assessment.empty_questions', `Assessment ${owner.id} has no questions`, owner.id);
    return;
  }
  addDuplicateIdIssues(
    issues,
    'question.duplicate_id',
    `question in ${owner.id}`,
    owner.questions.map((question) => question.id).filter(Boolean),
  );
  owner.questions.forEach((question) => validateQuestion(issues, question, owner.id));
}

export function validateContentGraph(input: ContentGraphInput): ValidationResult {
  const issues: ValidationIssue[] = [];
  const topicIds = input.subjects.flatMap((subject) => subject.topics.map((topic) => topic.id));
  const subjectIds = input.subjects.map((subject) => subject.id);
  const quizIds = input.quizzes.map((quiz) => quiz.id);
  const exerciseIds = input.exercises.map((exercise) => exercise.id);
  const examIds = input.exams.map((exam) => exam.id);
  const projectIds = input.projects.map((project) => project.id);
  const subjectIdSet = new Set(subjectIds);
  const quizIdSet = new Set(quizIds);
  const exerciseIdSet = new Set(exerciseIds);
  const examIdSet = new Set(examIds);
  const projectIdSet = new Set(projectIds);

  if (!input.manifest.id) {
    issue(issues, 'error', 'pack.missing_id', 'pack.yaml must define id');
  }
  if (!input.manifest.schemaVersion) {
    issue(issues, 'error', 'pack.missing_schema_version', 'pack.yaml must define schemaVersion');
  }

  addDuplicateIdIssues(issues, 'subject.duplicate_id', 'subject', subjectIds);
  addDuplicateIdIssues(issues, 'topic.duplicate_id', 'topic', topicIds);
  addDuplicateIdIssues(issues, 'quiz.duplicate_id', 'quiz', quizIds);
  addDuplicateIdIssues(issues, 'exercise.duplicate_id', 'exercise', exerciseIds);
  addDuplicateIdIssues(issues, 'exam.duplicate_id', 'exam', examIds);
  addDuplicateIdIssues(issues, 'project.duplicate_id', 'project', projectIds);

  for (const subject of input.subjects) {
    if (!subject.code || !subject.title) {
      issue(issues, 'error', 'subject.missing_identity', `Subject ${subject.id} must define code and title`, subject.id);
    }
    for (const prerequisiteId of subject.prerequisites) {
      if (!subjectIdSet.has(prerequisiteId)) {
        issue(issues, 'error', 'subject.missing_prerequisite', `Subject ${subject.id} references missing prerequisite ${prerequisiteId}`, subject.id);
      }
    }
    for (const examId of subject.examIds ?? []) {
      if (!examIdSet.has(examId)) {
        issue(issues, 'error', 'subject.missing_exam', `Subject ${subject.id} references missing exam ${examId}`, subject.id);
      }
    }
    for (const projectId of subject.projectIds ?? []) {
      if (!projectIdSet.has(projectId)) {
        issue(issues, 'error', 'subject.missing_project', `Subject ${subject.id} references missing project ${projectId}`, subject.id);
      }
    }
    for (const topic of subject.topics) {
      for (const quizId of topic.quizIds) {
        if (!quizIdSet.has(quizId)) {
          issue(issues, 'error', 'topic.missing_quiz', `Topic ${topic.id} references missing quiz ${quizId}`, topic.id);
        }
      }
      for (const exerciseId of topic.exerciseIds) {
        if (!exerciseIdSet.has(exerciseId)) {
          issue(issues, 'error', 'topic.missing_exercise', `Topic ${topic.id} references missing exercise ${exerciseId}`, topic.id);
        }
      }
    }
  }

  for (const track of input.tracks) {
    if (!track.id || !track.title) {
      issue(issues, 'error', 'track.missing_identity', `Track ${track.id || '(missing id)'} must define id and title`, track.id);
    }
    for (const subjectId of track.subjects ?? []) {
      if (!subjectIdSet.has(subjectId)) {
        issue(issues, 'error', 'track.missing_subject', `Track ${track.id} references missing subject ${subjectId}`, track.id);
      }
    }
  }

  input.quizzes.forEach((quiz) => validateAssessmentQuestions(issues, quiz));
  input.exams.forEach((exam) => validateAssessmentQuestions(issues, exam));

  for (const exercise of input.exercises) {
    if (!exercise.id || !exercise.title) {
      issue(issues, 'error', 'exercise.missing_identity', `Exercise ${exercise.id || '(missing id)'} must define id and title`, exercise.id);
    }
    if ('testCases' in exercise && (!Array.isArray(exercise.testCases) || exercise.testCases.length === 0)) {
      issue(issues, 'warning', 'exercise.empty_test_cases', `Coding exercise ${exercise.id} has no test cases`, exercise.id);
    }
  }

  for (const project of input.projects) {
    if (!project.id || !project.title) {
      issue(issues, 'error', 'project.missing_identity', `Project ${project.id || '(missing id)'} must define id and title`, project.id);
    }
    const totalWeight = project.rubric?.reduce((sum, criterion) => sum + criterion.weight, 0) ?? 0;
    if (project.rubric?.length && totalWeight !== 100) {
      issue(issues, 'warning', 'project.rubric_weight_total', `Project ${project.id} rubric weights sum to ${totalWeight}`, project.id);
    }
  }

  const errors = issues.filter((item) => item.severity === 'error');
  const warnings = issues.filter((item) => item.severity === 'warning');

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    stats: {
      subjects: input.subjects.length,
      topics: topicIds.length,
      quizzes: input.quizzes.length,
      exercises: input.exercises.length,
      exams: input.exams.length,
      projects: input.projects.length,
      tracks: input.tracks.length,
    },
  };
}

export function validateBundledContentPack(): ValidationResult {
  return validateContentGraph({
    manifest: bundledPackManifest,
    subjects: bundledSubjects,
    tracks: bundledTracks,
    quizzes: bundledQuizzes,
    exercises: bundledExercises,
    exams: bundledExams,
    projects: bundledProjects,
  });
}
