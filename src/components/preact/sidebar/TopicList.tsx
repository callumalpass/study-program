import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import type { Subject, SubjectProgress, Quiz, Exercise, Exam, Project } from '@/core/types';
import { Icons } from '@/components/icons';
import {
  navigateToTopic,
  navigateToQuiz,
  navigateToExercise,
  navigateToExam,
  navigateToProject,
} from '@/core/router';

interface TopicListProps {
  subject: Subject;
  progress?: SubjectProgress;
  quizzes: Quiz[];
  exercises: Exercise[];
  exams: Exam[];
  projects: Project[];
  currentPath: string;
}

const INITIAL_EXERCISE_COUNT = 5;

export function TopicList({
  subject,
  progress,
  quizzes,
  exercises,
  exams,
  projects,
  currentPath,
}: TopicListProps) {
  const [showAllExercises, setShowAllExercises] = useState(false);

  const subjectQuizzes = quizzes.filter((q) => q.subjectId === subject.id);
  const subjectExercises = exercises.filter((e) => e.subjectId === subject.id);
  const subjectExams = exams.filter((e) => e.subjectId === subject.id);
  const subjectProjects = projects.filter((p) => p.subjectId === subject.id);

  const toggleExercises = useCallback((e: Event) => {
    e.preventDefault();
    setShowAllExercises((prev) => !prev);
  }, []);

  const isTopicCompleted = (topicId: string): boolean => {
    if (!progress) return false;
    const topic = subject.topics.find((t) => t.id === topicId);
    if (!topic) return false;

    // A topic is "complete" if all its quizzes and exercises are done
    const quizzesComplete = topic.quizIds.every((qid) => {
      const attempts = progress.quizAttempts?.[qid];
      return attempts && attempts.length > 0;
    });
    const exercisesComplete = topic.exerciseIds.every((eid) => {
      const completion = progress.exerciseCompletions?.[eid];
      return completion?.passed;
    });

    return quizzesComplete && exercisesComplete;
  };

  const isQuizAttempted = (quizId: string): boolean => {
    const attempts = progress?.quizAttempts?.[quizId];
    return Boolean(attempts && attempts.length > 0);
  };

  const isExerciseComplete = (exerciseId: string): boolean => {
    const completion = progress?.exerciseCompletions?.[exerciseId];
    return Boolean(completion?.passed);
  };

  const isExamAttempted = (examId: string): boolean => {
    const attempts = progress?.examAttempts?.[examId];
    return Boolean(attempts && attempts.length > 0);
  };

  const isCurrentTopic = (topicId: string): boolean => {
    return currentPath.includes(`/subject/${subject.id}/topic/${topicId}`);
  };

  const handleTopicClick = (e: Event, topicId: string) => {
    e.preventDefault();
    navigateToTopic(subject.id, topicId);
  };

  const handleQuizClick = (e: Event, quizId: string) => {
    e.preventDefault();
    navigateToQuiz(subject.id, quizId);
  };

  const handleExerciseClick = (e: Event, exerciseId: string) => {
    e.preventDefault();
    navigateToExercise(subject.id, exerciseId);
  };

  const handleExamClick = (e: Event, examId: string) => {
    e.preventDefault();
    navigateToExam(subject.id, examId);
  };

  const handleProjectClick = (e: Event, projectId: string) => {
    e.preventDefault();
    navigateToProject(subject.id, projectId);
  };

  return (
    <div class="topic-list-inner">
      {/* Topics Section */}
      {subject.topics.length > 0 && (
        <div class="topic-section">
          <div class="topic-section-header">
            <span class="section-icon" dangerouslySetInnerHTML={{ __html: Icons.AcademicCap }} />
            <span>Topics</span>
          </div>
          <div class="topic-items">
            {subject.topics.map((topic, index) => {
              const completed = isTopicCompleted(topic.id);
              const isCurrent = isCurrentTopic(topic.id);

              return (
                <a
                  key={topic.id}
                  href={`#/subject/${subject.id}/topic/${topic.id}`}
                  class={`topic-item ${completed ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                  onClick={(e) => handleTopicClick(e, topic.id)}
                >
                  <span class="topic-number">{index + 1}</span>
                  <span class="topic-title">{topic.title}</span>
                  {completed && (
                    <span class="topic-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                  )}
                  {isCurrent && <span class="current-indicator" />}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Quizzes Section */}
      {subjectQuizzes.length > 0 && (
        <div class="topic-section">
          <div class="topic-section-header">
            <span class="section-icon" dangerouslySetInnerHTML={{ __html: Icons.StatQuiz }} />
            <span>Quizzes</span>
            <span class="section-count">{subjectQuizzes.length}</span>
          </div>
          <div class="topic-items">
            {subjectQuizzes.map((quiz) => {
              const attempted = isQuizAttempted(quiz.id);
              return (
                <a
                  key={quiz.id}
                  href={`#/subject/${subject.id}/quiz/${quiz.id}`}
                  class={`topic-item ${attempted ? 'completed' : ''}`}
                  onClick={(e) => handleQuizClick(e, quiz.id)}
                >
                  <span class="topic-title">{quiz.title}</span>
                  {attempted && (
                    <span class="topic-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Exercises Section */}
      {subjectExercises.length > 0 && (
        <div class="topic-section">
          <div class="topic-section-header">
            <span class="section-icon" dangerouslySetInnerHTML={{ __html: Icons.StatCode }} />
            <span>Exercises</span>
            <span class="section-count">{subjectExercises.length}</span>
          </div>
          <div class="topic-items">
            {(showAllExercises ? subjectExercises : subjectExercises.slice(0, INITIAL_EXERCISE_COUNT)).map((exercise) => {
              const completed = isExerciseComplete(exercise.id);
              return (
                <a
                  key={exercise.id}
                  href={`#/subject/${subject.id}/exercise/${exercise.id}`}
                  class={`topic-item ${completed ? 'completed' : ''}`}
                  onClick={(e) => handleExerciseClick(e, exercise.id)}
                >
                  <span class="topic-title">{exercise.title}</span>
                  {completed && (
                    <span class="topic-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                  )}
                </a>
              );
            })}
            {subjectExercises.length > INITIAL_EXERCISE_COUNT && (
              <button class="topic-item more expand-toggle" onClick={toggleExercises}>
                {showAllExercises
                  ? 'Show less'
                  : `+${subjectExercises.length - INITIAL_EXERCISE_COUNT} more exercises`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Exams Section */}
      {subjectExams.length > 0 && (
        <div class="topic-section">
          <div class="topic-section-header">
            <span class="section-icon" dangerouslySetInnerHTML={{ __html: Icons.Beaker }} />
            <span>Exams</span>
            <span class="section-count">{subjectExams.length}</span>
          </div>
          <div class="topic-items">
            {subjectExams.map((exam) => {
              const attempted = isExamAttempted(exam.id);
              return (
                <a
                  key={exam.id}
                  href={`#/subject/${subject.id}/exam/${exam.id}`}
                  class={`topic-item ${attempted ? 'completed' : ''}`}
                  onClick={(e) => handleExamClick(e, exam.id)}
                >
                  <span class="topic-title">{exam.title}</span>
                  {attempted && (
                    <span class="topic-check" dangerouslySetInnerHTML={{ __html: Icons.Check }} />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {subjectProjects.length > 0 && (
        <div class="topic-section">
          <div class="topic-section-header">
            <span class="section-icon" dangerouslySetInnerHTML={{ __html: Icons.StatProject }} />
            <span>Projects</span>
            <span class="section-count">{subjectProjects.length}</span>
          </div>
          <div class="topic-items">
            {subjectProjects.map((project) => (
              <a
                key={project.id}
                href={`#/subject/${subject.id}/project/${project.id}`}
                class="topic-item"
                onClick={(e) => handleProjectClick(e, project.id)}
              >
                <span class="topic-title">{project.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
